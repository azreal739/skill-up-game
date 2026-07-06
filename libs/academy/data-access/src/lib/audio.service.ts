import { Injectable, inject } from '@angular/core';
import { GameStateService } from './game-state.service';

export type SfxEvent =
  | 'click'
  | 'correct'
  | 'incorrect'
  | 'xp'
  | 'badge'
  | 'hint'
  | 'mission-complete'
  | 'rank-up'
  | 'alert';

interface Tone {
  frequency: number;
  /** seconds */
  duration: number;
  /** seconds after the previous tone starts */
  delay: number;
  type: OscillatorType;
}

/**
 * Sound-effect manager (08_AUDIO_ANIMATION_AND_FEEDBACK.md). No audio assets
 * are available, so short WebAudio tone patterns stand in — the manager and
 * volume/mute plumbing are the real deliverable; swapping in real samples
 * later only touches this file. No information is audio-only (doc 16).
 */
@Injectable({ providedIn: 'root' })
export class AudioService {
  private readonly gameState = inject(GameStateService);
  private context: AudioContext | null = null;

  play(event: SfxEvent): void {
    const settings = this.gameState.settings();
    const volume = settings.muted ? 0 : settings.masterVolume * settings.sfxVolume;
    if (volume <= 0) {
      return;
    }

    const context = this.ensureContext();
    if (!context) {
      return;
    }

    for (const tone of PATTERNS[event]) {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const start = context.currentTime + tone.delay;
      oscillator.type = tone.type;
      oscillator.frequency.value = tone.frequency;
      // Soft attack/decay envelope to avoid clicks.
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.18 * volume, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, start + tone.duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + tone.duration + 0.05);
    }
  }

  private ensureContext(): AudioContext | null {
    if (this.context) {
      return this.context;
    }
    try {
      this.context = new AudioContext();
      return this.context;
    } catch {
      // Audio is unavailable (e.g. no user gesture yet, headless test browser).
      return null;
    }
  }
}

const PATTERNS: Record<SfxEvent, Tone[]> = {
  click: [{ frequency: 520, duration: 0.06, delay: 0, type: 'square' }],
  hint: [
    { frequency: 660, duration: 0.1, delay: 0, type: 'sine' },
    { frequency: 880, duration: 0.12, delay: 0.09, type: 'sine' },
  ],
  correct: [
    { frequency: 523, duration: 0.12, delay: 0, type: 'sine' },
    { frequency: 659, duration: 0.12, delay: 0.1, type: 'sine' },
    { frequency: 784, duration: 0.18, delay: 0.2, type: 'sine' },
  ],
  incorrect: [
    { frequency: 220, duration: 0.18, delay: 0, type: 'triangle' },
    { frequency: 174, duration: 0.24, delay: 0.14, type: 'triangle' },
  ],
  xp: [
    { frequency: 880, duration: 0.08, delay: 0, type: 'sine' },
    { frequency: 1174, duration: 0.1, delay: 0.07, type: 'sine' },
  ],
  badge: [
    { frequency: 587, duration: 0.12, delay: 0, type: 'sine' },
    { frequency: 784, duration: 0.12, delay: 0.11, type: 'sine' },
    { frequency: 987, duration: 0.2, delay: 0.22, type: 'sine' },
  ],
  'mission-complete': [
    { frequency: 523, duration: 0.14, delay: 0, type: 'sine' },
    { frequency: 659, duration: 0.14, delay: 0.12, type: 'sine' },
    { frequency: 784, duration: 0.14, delay: 0.24, type: 'sine' },
    { frequency: 1046, duration: 0.28, delay: 0.36, type: 'sine' },
  ],
  'rank-up': [
    { frequency: 392, duration: 0.14, delay: 0, type: 'sine' },
    { frequency: 523, duration: 0.14, delay: 0.12, type: 'sine' },
    { frequency: 659, duration: 0.14, delay: 0.24, type: 'sine' },
    { frequency: 784, duration: 0.3, delay: 0.36, type: 'sine' },
  ],
  alert: [
    { frequency: 440, duration: 0.16, delay: 0, type: 'sawtooth' },
    { frequency: 440, duration: 0.16, delay: 0.24, type: 'sawtooth' },
  ],
};
