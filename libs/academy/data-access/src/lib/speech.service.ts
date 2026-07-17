import { Injectable, OnDestroy, inject, signal } from '@angular/core';

import { personaForSpeaker } from '@academy/content-model';

import { GameStateService } from './game-state.service';
import { SpeechAudioCache } from './speech-audio-cache';
import { toSpokenText } from './speech-text';

export type SpeechStatus = 'off' | 'loading' | 'ready' | 'error';

/** One line that has been spoken aloud, for the comms-log / speaker HUD. */
export interface SpokenLine {
  id: number;
  speaker: string;
  text: string;
}

/** How many recent spoken lines the comms log keeps. */
const HISTORY_LIMIT = 20;

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
 * `speakAll()` starts the requested line first, then generates later lines
 * while it plays (the worker queue is serial, so ordering is important); and
 * a warm-up generation runs right after the engine loads so the first real
 * line doesn't pay the one-off session-compilation cost.
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
  /** Recent spoken lines (most recent last), for the speaker HUD / comms log. */
  readonly spokenHistory = signal<SpokenLine[]>([]);
  private historyId = 0;
  /** The speak() line in flight, for play/pause UI (null when idle). */
  private readonly nowPlayingState = signal<{
    speaker: string;
    text: string;
    phase: 'generating' | 'playing' | 'paused';
  } | null>(null);

  /**
   * The pending "ambient" line (screen-arrival conversation). Ambient lines
   * are polite: they never interrupt the line being spoken — the newest one
   * waits its turn instead, and a newer ambient line replaces a waiting one.
   */
  private pendingAmbient: { speaker: string; text: string } | null = null;
  private ambientDraining = false;

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
    try {
      this.worker = new Worker(new URL('./speech.worker', import.meta.url), { type: 'module' });
    } catch {
      // Worker construction can throw synchronously (blocked origin, test
      // environments) — surface it as the same error state as a failed init.
      this.status.set('error');
      this.settleReadyWaiters();
      return;
    }
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
  speak(speaker: string, text: string): Promise<void> {
    return this.speakAll([{ speaker, text }]);
  }

  /**
   * Speak an ambient conversation line (screen arrivals: the greeting, hub
   * recommendation, path/campaign drill-ins, backlog nudge). Unlike speak(),
   * it never cuts off whatever is currently being said — it queues behind it.
   * Only ONE ambient line waits at a time: a newer one replaces it (the
   * player has moved on), and any explicit speak()/cancel() clears it.
   */
  sayAmbient(speaker: string, text: string): void {
    if (!this.active() || !text.trim()) {
      return;
    }
    this.pendingAmbient = { speaker, text };
    this.maybeDrainAmbient();
  }

  /** Start playing the waiting ambient line if nothing else is speaking. */
  private maybeDrainAmbient(): void {
    if (this.ambientDraining || !this.pendingAmbient || this.nowPlayingState() !== null) {
      return;
    }
    void this.drainAmbient();
  }

  private async drainAmbient(): Promise<void> {
    this.ambientDraining = true;
    try {
      // A new ambient line queued while this one plays is picked up next.
      while (this.pendingAmbient) {
        const line = this.pendingAmbient;
        this.pendingAmbient = null;
        await this.speakAll([line]);
      }
    } finally {
      this.ambientDraining = false;
    }
  }

  /**
   * Speak a sequence of lines back to back (e.g. a whole briefing), each in
   * its own persona's voice, as ONE cancellable playback: skip, navigation
   * or another speak() stops the entire sequence. Later lines are prefetched
   * while earlier ones play.
   */
  async speakAll(lines: readonly { speaker: string; text: string }[]): Promise<void> {
    const playable = lines.filter((line) => line.text.trim());
    if (!this.active() || !playable.length) {
      return;
    }
    this.cancel();
    const token = ++this.playToken;

    try {
      if (this.status() === 'loading') {
        // Engine still booting (e.g. a briefing opened right after page
        // load): hold until it's ready rather than skipping silently —
        // surfaced as 'generating' so play buttons show a spinner.
        this.nowPlayingState.set({ ...playable[0], phase: 'generating' });
        await this.waitForReady();
        if (this.status() !== 'ready' || token !== this.playToken) {
          return;
        }
      }
      const [first, ...remaining] = playable;
      let prefetched = false;
      const prefetchRemaining = () => {
        if (prefetched || token !== this.playToken) {
          return;
        }
        prefetched = true;
        for (const line of remaining) {
          this.prefetch(line.speaker, line.text);
        }
      };

      // Do not put background work ahead of the line the player asked to
      // hear. Once its audio is ready, the serial worker can safely fill its
      // queue with later lines while the first one is playing.
      await this.speakLine(first.speaker, first.text, token, prefetchRemaining);
      if (token !== this.playToken) {
        return;
      }
      prefetchRemaining();

      for (const line of remaining) {
        if (token !== this.playToken) {
          return;
        }
        await this.speakLine(line.speaker, line.text, token);
      }
    } finally {
      if (token === this.playToken) {
        this.nowPlayingState.set(null);
        // An ambient line may have queued up politely while this played.
        this.maybeDrainAmbient();
      }
    }
  }

  /** One line of a speak sequence; assumes the engine is ready. */
  private async speakLine(
    speaker: string,
    text: string,
    token: number,
    onPlaybackStart?: () => void
  ): Promise<void> {
    const key = this.keyFor(speaker, text);
    let playbackStarted = false;
    const markPlaybackStarted = () => {
      if (!playbackStarted) {
        playbackStarted = true;
        this.recordSpoken(speaker, text);
        onPlaybackStart?.();
      }
    };
    const setPhase = (phase: 'generating' | 'playing' | 'paused') => {
      if (token === this.playToken) {
        this.nowPlayingState.set({ speaker, text, phase });
      }
    };

    const ready = this.cache.get(key);
    if (ready) {
      if (token !== this.playToken) {
        return;
      }
      markPlaybackStarted();
      setPhase('playing');
      await this.playChunks(ready, token);
      return;
    }

    setPhase('generating');
    // Resolve the line (persistent cache → in-flight prefetch → fresh
    // generation). A fresh generation streams: sentences play as they land.
    // Everything below is token-guarded: a line cancelled while its audio was
    // still generating must not play OR be recorded in the comms log.
    let streamed = false;
    let playback: Promise<void> = Promise.resolve();
    const chunks = await this.ensureChunks(key, speaker, text, (blob) => {
      if (token !== this.playToken) {
        return;
      }
      if (!streamed) {
        streamed = true;
        markPlaybackStarted();
        setPhase('playing');
      }
      playback = playback.then(() => this.playBlob(blob, token));
    });
    if (streamed) {
      await playback;
    } else if (chunks && token === this.playToken) {
      markPlaybackStarted();
      setPhase('playing');
      await this.playChunks(chunks, token);
    }
  }

  /** The line currently generating/playing/paused via speak(), if any. */
  nowPlaying(): { speaker: string; text: string; phase: 'generating' | 'playing' | 'paused' } | null {
    return this.nowPlayingState();
  }

  /**
   * Append a line to the comms-log history when it starts playing. Skips an
   * immediate duplicate (e.g. replaying the newest line) so the log doesn't
   * stutter, and caps the list at HISTORY_LIMIT.
   */
  private recordSpoken(speaker: string, text: string): void {
    this.spokenHistory.update((list) => {
      const last = list[list.length - 1];
      if (last && last.speaker === speaker && last.text === text) {
        return list;
      }
      const next = [...list, { id: ++this.historyId, speaker, text }];
      return next.length > HISTORY_LIMIT ? next.slice(next.length - HISTORY_LIMIT) : next;
    });
  }

  /** Pause the current line's audio (resume() continues where it stopped). */
  pause(): void {
    const state = this.nowPlayingState();
    if (this.current && state?.phase === 'playing') {
      this.current.audio.pause();
      this.nowPlayingState.set({ ...state, phase: 'paused' });
    }
  }

  resume(): void {
    const state = this.nowPlayingState();
    if (this.current && state?.phase === 'paused') {
      void this.current.audio.play().catch(() => this.cancel());
      this.nowPlayingState.set({ ...state, phase: 'playing' });
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
    // Whatever was waiting its turn belongs to a moment the player just
    // dismissed / replaced — drop it rather than surprise them later.
    this.pendingAmbient = null;
    this.nowPlayingState.set(null);
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
        // Code-flavoured prose is rewritten for the voice only — displayed
        // text everywhere keeps the author's original wording.
        text: toSpokenText(text),
        speed: this.voiceSpeed(),
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
    // Speed is baked into the audio, so it must be part of the cache key —
    // changing the setting naturally regenerates rather than replaying stale.
    return `${personaForSpeaker(speaker).voiceId}|${this.voiceSpeed()}|${text}`;
  }

  private voiceSpeed(): number {
    return this.gameState.settings().voiceSpeed ?? 1;
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
