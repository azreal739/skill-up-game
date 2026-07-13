import { Injectable, OnDestroy, inject, signal } from '@angular/core';

import { personaForSpeaker } from '@academy/content-model';

import { GameStateService } from './game-state.service';

export type SpeechStatus = 'off' | 'loading' | 'ready' | 'error';

interface ChunkHandler {
  onChunk(wav: ArrayBuffer): void;
  onDone(): void;
  onError(): void;
}

/**
 * On-device neural narration (Kokoro-82M via kokoro-js). The model runs in a
 * web worker; this service owns the worker lifecycle, playback, and the
 * status/progress signals the voice-setup screen renders.
 *
 * Latency design: the worker streams audio sentence by sentence, so playback
 * starts after the first sentence; finished lines are cached for the session;
 * `prefetch()` lets the dialogue generate the NEXT line while the current one
 * plays (the worker queue is serial, so prefetches naturally fill playback
 * gaps); and a warm-up generation runs right after the engine loads so the
 * first real line doesn't pay the one-off session-compilation cost.
 * Everything is opt-in: nothing loads until `enable()`.
 */
@Injectable({ providedIn: 'root' })
export class SpeechService implements OnDestroy {
  private readonly gameState = inject(GameStateService);

  private worker: Worker | null = null;
  private requestId = 0;
  private readonly requests = new Map<number, ChunkHandler>();
  /** Generated audio per voice+text — replaying a line is instant. */
  private readonly cache = new Map<string, Blob[]>();
  /** In-flight generations (speak or prefetch), awaitable by later speaks. */
  private readonly inFlight = new Map<string, Promise<Blob[] | null>>();
  private current: { audio: HTMLAudioElement; url: string; finish: () => void } | null = null;
  /** Bumped by cancel(); an in-flight speak() stops playing when stale. */
  private playToken = 0;

  readonly status = signal<SpeechStatus>('off');
  /** Model download/init progress, 0–100, meaningful while status is 'loading'. */
  readonly progress = signal(0);

  /** True when the engine can speak right now. */
  active(): boolean {
    return this.status() === 'ready';
  }

  /** Boot the engine (idempotent). Retries from the 'error' state. */
  enable(): void {
    if (this.status() === 'error') {
      this.teardownWorker();
    }
    if (this.worker || typeof Worker === 'undefined') {
      if (typeof Worker === 'undefined') {
        this.status.set('error');
      }
      return;
    }
    this.status.set('loading');
    this.progress.set(0);
    this.worker = new Worker(new URL('./speech.worker', import.meta.url), { type: 'module' });
    this.worker.onmessage = ({ data }) => this.onWorkerMessage(data);
    this.worker.onerror = () => {
      this.status.set('error');
    };
    this.worker.postMessage({ type: 'init' });
  }

  /** Stop speaking and unload the engine. */
  disable(): void {
    this.cancel();
    this.teardownWorker();
    this.status.set('off');
    this.progress.set(0);
  }

  /**
   * Speak one briefing block in its persona's voice. Resolves when playback
   * finishes — or immediately when the engine is off/loading, so callers can
   * always await it. Never rejects; a failed line is a silent line.
   */
  async speak(speaker: string, text: string): Promise<void> {
    if (!this.active() || !text.trim()) {
      return;
    }
    this.cancel();
    const token = ++this.playToken;
    const key = this.keyFor(speaker, text);

    const ready = this.cache.get(key);
    if (ready) {
      await this.playChunks(ready, token);
      return;
    }

    const pending = this.inFlight.get(key);
    if (pending) {
      // A prefetch already started this line — stream-play is lost, but the
      // generation is typically well underway; play when it lands.
      const chunks = await pending;
      if (chunks && token === this.playToken) {
        await this.playChunks(chunks, token);
      }
      return;
    }

    // Fresh generation: play each sentence as it arrives.
    let playback: Promise<void> = Promise.resolve();
    await this.generate(key, speaker, text, (blob) => {
      if (token === this.playToken) {
        playback = playback.then(() => this.playBlob(blob, token));
      }
    });
    await playback;
  }

  /**
   * Generate a line into the cache without playing it. Called by the dialogue
   * for the NEXT block while the current one plays, hiding generation time.
   */
  prefetch(speaker: string, text: string): void {
    if (!this.active() || !text.trim()) {
      return;
    }
    const key = this.keyFor(speaker, text);
    if (this.cache.has(key) || this.inFlight.has(key)) {
      return;
    }
    void this.generate(key, speaker, text);
  }

  /** Stop current playback and invalidate any in-flight speak(). */
  cancel(): void {
    this.playToken++;
    if (this.current) {
      const { audio, url, finish } = this.current;
      this.current = null;
      audio.pause();
      URL.revokeObjectURL(url);
      finish();
    }
  }

  ngOnDestroy(): void {
    this.disable();
  }

  /**
   * Run one generation in the worker, filling the cache; resolves with the
   * chunks when done (null on failure). `onChunk` observes sentences live.
   */
  private generate(
    key: string,
    speaker: string,
    text: string,
    onChunk?: (blob: Blob) => void
  ): Promise<Blob[] | null> {
    const task = new Promise<Blob[] | null>((resolve) => {
      if (!this.worker) {
        resolve(null);
        return;
      }
      const id = ++this.requestId;
      const chunks: Blob[] = [];
      this.requests.set(id, {
        onChunk: (wav) => {
          const blob = new Blob([wav], { type: 'audio/wav' });
          chunks.push(blob);
          onChunk?.(blob);
        },
        onDone: () => {
          if (chunks.length) {
            this.cache.set(key, chunks);
          }
          resolve(chunks.length ? chunks : null);
        },
        onError: () => resolve(null),
      });
      this.worker.postMessage({
        type: 'generate',
        id,
        voice: personaForSpeaker(speaker).voiceId,
        text,
      });
    }).finally(() => this.inFlight.delete(key));
    this.inFlight.set(key, task);
    return task;
  }

  private async playChunks(chunks: readonly Blob[], token: number): Promise<void> {
    for (const blob of chunks) {
      if (token !== this.playToken) {
        return;
      }
      await this.playBlob(blob, token);
    }
  }

  private playBlob(blob: Blob, token: number): Promise<void> {
    return new Promise((resolve) => {
      if (token !== this.playToken) {
        resolve();
        return;
      }
      const settings = this.gameState.settings();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.volume = settings.muted ? 0 : settings.masterVolume;
      const finish = () => {
        if (this.current?.audio === audio) {
          this.current = null;
          URL.revokeObjectURL(url);
        }
        resolve();
      };
      this.current = { audio, url, finish };
      audio.onended = finish;
      audio.onerror = finish;
      audio.play().catch(finish);
    });
  }

  private keyFor(speaker: string, text: string): string {
    return `${personaForSpeaker(speaker).voiceId}|${text}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private onWorkerMessage(message: any): void {
    switch (message.type) {
      case 'progress':
        this.progress.set(message.progress);
        break;
      case 'ready':
        this.progress.set(100);
        this.status.set('ready');
        console.info(`Voice engine ready (${message.device})`);
        // Warm-up: the first generation pays one-off session-compilation
        // costs; spend them now so the first real line starts fast.
        this.prefetch('Mission Control', 'Voice systems calibrated and online.');
        break;
      case 'init-error':
        console.error('Voice engine failed to initialise:', message.message);
        this.status.set('error');
        break;
      case 'audio-chunk':
        this.requests.get(message.id)?.onChunk(message.wav);
        break;
      case 'audio-done':
        this.requests.get(message.id)?.onDone();
        this.requests.delete(message.id);
        break;
      case 'audio-error':
        console.error('Voice generation failed:', message.message);
        this.requests.get(message.id)?.onError();
        this.requests.delete(message.id);
        break;
    }
  }

  private teardownWorker(): void {
    this.worker?.terminate();
    this.worker = null;
    for (const handler of this.requests.values()) {
      handler.onError();
    }
    this.requests.clear();
  }
}
