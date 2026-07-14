import { InjectionToken } from '@angular/core';

/** Lifecycle of one spoken line, as surfaced to play/pause UI. */
export type EaSpeechPhase = 'generating' | 'playing' | 'paused';

export interface EaNowPlaying {
  speaker: string;
  text: string;
  phase: EaSpeechPhase;
}

/** One narratable line: a persona speaker plus what they say. */
export interface EaSpeechLine {
  speaker: string;
  text: string;
}

/**
 * Port the mentor dialogue uses to narrate briefing blocks aloud. The ui lib
 * stays presentational: the app provides `SpeechService` (data-access) under
 * this token, and when nothing is provided the dialogue simply types
 * silently as before.
 */
export interface EaSpeechPlayer {
  /**
   * True when narration is worth requesting: engine ready, or still warming
   * up (in which case speak() holds the line until it's ready).
   */
  active(): boolean;
  /** Speak a block in its persona's voice; resolves when playback ends. */
  speak(speaker: string, text: string): Promise<void>;
  /** Optionally pre-generate an upcoming block's audio (never plays it). */
  prefetch?(speaker: string, text: string): void;
  /**
   * Speak a sequence of lines (e.g. a whole briefing) back to back, each in
   * its own persona's voice; resolves when the last line finishes or the
   * sequence is cancelled.
   */
  speakAll?(lines: readonly EaSpeechLine[]): Promise<void>;
  /** Stop playback immediately (skip, navigation, destroy). */
  cancel(): void;
  /**
   * The line currently being generated/played via speak(), if any — a signal
   * read, so templates using it re-render on change. Backs play/pause UI.
   */
  nowPlaying?(): EaNowPlaying | null;
  /** Pause/resume the currently playing line (no-ops when nothing plays). */
  pause?(): void;
  resume?(): void;
}

export const EA_SPEECH_PLAYER = new InjectionToken<EaSpeechPlayer>('EA_SPEECH_PLAYER');
