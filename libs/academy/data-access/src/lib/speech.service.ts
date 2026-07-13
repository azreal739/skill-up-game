import { Injectable, OnDestroy, inject, signal } from '@angular/core';

import { personaForSpeaker } from '@academy/content-model';

import { GameStateService } from './game-state.service';
import { SpeechAudioCache } from './speech-audio-cache';

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
  /** …and persisted across sessions, so reloads never regenerate a line. */
  private readonly audioCache = new SpeechAudioCache();
  /** In-flight generations (speak or prefetch), awaitable by later speaks. */
  private readonly inFlight = new Map<string, Promise<Blob[] | null>>();
  private current: { audio: HTMLAudioElement; url: string; finish: () => void } | null = null;
  /** Bumped by cancel(); an in-flight speak() stops playing when stale. */
  private playToken = 0;

  readonly status = signal<SpeechStatus>('off');
  /** Model download/init progress, 0–100, meaningful while status is 'loading'. */
  readonly progress = signal(0);
  /** True during the post-download warm-up phase of loading. */
  readonly warming = signal(false);
  /** True while the calibration screen's audible voice check is playing. */
  readonly voiceCheck = signal(false);

  /** speak() calls parked while the engine finishes loading. */
  private readyWaiters: Array<() => void> = [];
  /** Cap on how long a briefing line waits for the engine to finish loading. */
  private static readonly READY_WAIT_MS = 60_000;

  /**
   * True when narration is worth requesting: engine ready, or still loading —
   * speak() waits for readiness so briefings that start during the boot
   * warm-up get voice instead of typing through in silence.
   */
  active(): boolean {
    const status = this.status();
    return status === 'ready' || status === 'loading';
  }

  /**
   * Boot the engine (idempotent). Retries from the 'error' state. Pass
   * `voiceCheck: true` on a user-initiated enable so calibration ends with
   * the check line spoken aloud (never on app boot — no surprise audio).
   */
  enable(options: { voiceCheck?: boolean } = {}): void {
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
    this.warming.set(false);
    this.voiceCheck.set(false);
    this.worker = new Worker(new URL('./speech.worker', import.meta.url), { type: 'module' });
    this.worker.onmessage = ({ data }) => this.onWorkerMessage(data);
    this.worker.onerror = () => {
      this.status.set('error');
      this.settleReadyWaiters();
    };
    this.worker.postMessage({ type: 'init', voiceCheck: options.voiceCheck ?? false });
  }

  /** Stop speaking and unload the engine. */
  disable(): void {
    this.cancel();
    this.teardownWorker();
    this.status.set('off');
    this.progress.set(0);
    this.warming.set(false);
    this.voiceCheck.set(false);
    this.settleReadyWaiters();
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
    if (this.status() === 'loading') {
      // Engine still booting (e.g. a briefing opened right after page load):
      // hold this line until it's ready rather than skipping it silently.
      await this.waitForReady();
      if (this.status() !== 'ready') {
        return;
      }
    }
    this.cancel();
    const token = ++this.playToken;
    const key = this.keyFor(speaker, text);

    const ready = this.cache.get(key);
    if (ready) {
      await this.playChunks(ready, token);
      return;
    }

    // Resolve the line (persistent cache → in-flight prefetch → fresh
    // generation). A fresh generation streams: sentences play as they land.
    let streamed = false;
    let playback: Promise<void> = Promise.resolve();
    const chunks = await this.ensureChunks(key, speaker, text, (blob) => {
      streamed = true;
      if (token === this.playToken) {
        playback = playback.then(() => this.playBlob(blob, token));
      }
    });
    if (streamed) {
      await playback;
    } else if (chunks && token === this.playToken) {
      await this.playChunks(chunks, token);
    }
  }

  /**
   * Generate a line into the cache without playing it. Called by the dialogue
   * for the NEXT block while the current one plays, hiding generation time.
   */
  prefetch(speaker: string, text: string): void {
    // During 'loading' this still queues usefully: the worker processes it
    // right after init, so the audio is ready the moment the engine is.
    if (!this.active() || !text.trim()) {
      return;
    }
    const key = this.keyFor(speaker, text);
    if (this.cache.has(key) || this.inFlight.has(key)) {
      return;
    }
    void this.ensureChunks(key, speaker, text);
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
   * Resolve a line's audio, deduped per key: persistent cache first, then a
   * fresh generation. `onChunk` observes sentences live only on the
   * generation path — a cache hit resolves with the full chunk list instead.
   */
  private ensureChunks(
    key: string,
    speaker: string,
    text: string,
    onChunk?: (blob: Blob) => void
  ): Promise<Blob[] | null> {
    const pending = this.inFlight.get(key);
    if (pending) {
      return pending;
    }
    const task = (async () => {
      const stored = await this.audioCache.load(key);
      if (stored) {
        this.cache.set(key, stored);
        return stored;
      }
      return this.generate(key, speaker, text, onChunk);
    })().finally(() => this.inFlight.delete(key));
    this.inFlight.set(key, task);
    return task;
  }

  /**
   * Run one generation in the worker, filling both caches; resolves with the
   * chunks when done (null on failure). `onChunk` observes sentences live.
   */
  private generate(
    key: string,
    speaker: string,
    text: string,
    onChunk?: (blob: Blob) => void
  ): Promise<Blob[] | null> {
    return new Promise<Blob[] | null>((resolve) => {
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
            void this.audioCache.save(key, chunks);
          }
          resolve(chunks.length ? chunks : null);
        },
        onError: () => {
          console.warn(`Voice line failed (${speaker}): "${text.slice(0, 60)}…"`);
          resolve(null);
        },
      });
      this.worker.postMessage({
        type: 'generate',
        id,
        voice: personaForSpeaker(speaker).voiceId,
        text,
      });
    });
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

  /** Resolves when loading settles (ready/error/off) or the cap elapses. */
  private waitForReady(): Promise<void> {
    return new Promise((resolve) => {
      const timer = setTimeout(() => resolve(), SpeechService.READY_WAIT_MS);
      this.readyWaiters.push(() => {
        clearTimeout(timer);
        resolve();
      });
    });
  }

  private settleReadyWaiters(): void {
    const waiters = this.readyWaiters;
    this.readyWaiters = [];
    for (const release of waiters) {
      release();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private onWorkerMessage(message: any): void {
    switch (message.type) {
      case 'progress':
        this.progress.set(message.progress);
        break;
      case 'warming':
        this.progress.set(100);
        this.warming.set(true);
        break;
      case 'ready': {
        this.progress.set(100);
        this.warming.set(false);
        console.info(`Voice engine ready (${message.device})`);
        const finishReady = () => {
          this.voiceCheck.set(false);
          // Only complete if the user didn't toggle off mid-check.
          if (this.status() === 'loading') {
            this.status.set('ready');
            this.settleReadyWaiters();
          }
        };
        const warmupWav: ArrayBuffer | undefined = message.warmupWav;
        if (warmupWav) {
          // Audible voice check: speak the calibration line before the setup
          // overlay (bound to status === 'loading') closes.
          this.voiceCheck.set(true);
          const token = ++this.playToken;
          void this.playBlob(new Blob([warmupWav], { type: 'audio/wav' }), token).then(
            finishReady
          );
        } else {
          finishReady();
        }
        break;
      }
      case 'init-error':
        console.error('Voice engine failed to initialise:', message.message);
        this.warming.set(false);
        this.voiceCheck.set(false);
        this.status.set('error');
        this.settleReadyWaiters();
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
