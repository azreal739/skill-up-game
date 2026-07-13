import { Injectable, OnDestroy, inject, signal } from '@angular/core';

import { personaForSpeaker } from '@academy/content-model';

import { GameStateService } from './game-state.service';

export type SpeechStatus = 'off' | 'loading' | 'ready' | 'error';

/**
 * On-device neural narration (Kokoro-82M via kokoro-js). The model runs in a
 * web worker; this service owns the worker lifecycle, one-at-a-time playback,
 * an in-memory audio cache, and the status/progress signals the voice-setup
 * screen renders. Everything is opt-in: nothing loads until `enable()`.
 */
@Injectable({ providedIn: 'root' })
export class SpeechService implements OnDestroy {
  private readonly gameState = inject(GameStateService);

  private worker: Worker | null = null;
  private requestId = 0;
  private readonly pendingWavs = new Map<number, (wav: ArrayBuffer | null) => void>();
  /** Generated audio per voice+text — replaying a briefing is instant. */
  private readonly cache = new Map<string, Blob>();
  private current: { audio: HTMLAudioElement; url: string; finish: () => void } | null = null;
  /** Bumped by cancel(); an in-flight speak() aborts when its token is stale. */
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

    const voiceId = personaForSpeaker(speaker).voiceId;
    const key = `${voiceId}|${text}`;
    let blob = this.cache.get(key);
    if (!blob) {
      const wav = await this.requestWav(voiceId, text);
      if (!wav) {
        return;
      }
      blob = new Blob([wav], { type: 'audio/wav' });
      this.cache.set(key, blob);
    }
    if (token !== this.playToken) {
      return; // cancelled while generating
    }
    await this.play(blob, token);
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

  private play(blob: Blob, token: number): Promise<void> {
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

  private requestWav(voice: string, text: string): Promise<ArrayBuffer | null> {
    return new Promise((resolve) => {
      if (!this.worker) {
        resolve(null);
        return;
      }
      const id = ++this.requestId;
      this.pendingWavs.set(id, resolve);
      this.worker.postMessage({ type: 'generate', id, voice, text });
    });
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
        break;
      case 'init-error':
        console.error('Voice engine failed to initialise:', message.message);
        this.status.set('error');
        break;
      case 'audio':
        this.pendingWavs.get(message.id)?.(message.wav);
        this.pendingWavs.delete(message.id);
        break;
      case 'audio-error':
        console.error('Voice generation failed:', message.message);
        this.pendingWavs.get(message.id)?.(null);
        this.pendingWavs.delete(message.id);
        break;
    }
  }

  private teardownWorker(): void {
    this.worker?.terminate();
    this.worker = null;
    for (const resolve of this.pendingWavs.values()) {
      resolve(null);
    }
    this.pendingWavs.clear();
  }
}
