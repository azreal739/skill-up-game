import { InjectionToken } from '@angular/core';

/**
 * Port the mentor dialogue uses to narrate briefing blocks aloud. The ui lib
 * stays presentational: the app provides `SpeechService` (data-access) under
 * this token, and when nothing is provided the dialogue simply types
 * silently as before.
 */
export interface EaSpeechPlayer {
  /** True when narration should play right now (enabled + engine ready). */
  active(): boolean;
  /** Speak a block in its persona's voice; resolves when playback ends. */
  speak(speaker: string, text: string): Promise<void>;
  /** Optionally pre-generate an upcoming block's audio (never plays it). */
  prefetch?(speaker: string, text: string): void;
  /** Stop playback immediately (skip, navigation, destroy). */
  cancel(): void;
}

export const EA_SPEECH_PLAYER = new InjectionToken<EaSpeechPlayer>('EA_SPEECH_PLAYER');
