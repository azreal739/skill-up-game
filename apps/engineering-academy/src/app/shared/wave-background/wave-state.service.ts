import { Injectable, computed, inject } from '@angular/core';
import { GameStateService } from '@academy/data-access';

export type WavePulseKind = 'correct' | 'incorrect' | 'click';

interface WavePulse {
  kind: WavePulseKind;
  at: number;
}

/** How long each pulse influences the waves, in ms. */
const PULSE_LIFETIME: Record<WavePulseKind, number> = {
  correct: 2600,
  incorrect: 1800,
  click: 700,
};

export interface WaveMood {
  /** 0..1 — wave speed and liveliness. */
  energy: number;
  /** 0..1 — jitter and irregularity (platform in trouble). */
  turbulence: number;
  /** 0..1 — line brightness. */
  brightness: number;
}

/**
 * Presentation state for the neon telemetry waves. The baseline mood is
 * derived from the platform meters (unstable platform → erratic waves);
 * short-lived pulses layer on top for answer feedback and clicks. Pure
 * reads — the canvas samples this every frame and does its own smoothing.
 */
@Injectable({ providedIn: 'root' })
export class WaveStateService {
  private readonly gameState = inject(GameStateService);

  private pulses: WavePulse[] = [];

  /** Baseline mood from the platform meters. */
  readonly base = computed<WaveMood>(() => {
    const meters = this.gameState.meters();
    const instability = (100 - meters.stability) / 100;
    const debt = meters.technicalDebt / 100;
    const severity = meters.severityIndex / 5;
    return {
      energy: 0.35 + severity * 0.25,
      turbulence: Math.min(1, instability * 0.55 + debt * 0.3 + severity * 0.3),
      brightness: 0.5,
    };
  });

  pulse(kind: WavePulseKind): void {
    const now = performance.now();
    this.pulses = [
      ...this.pulses.filter((pulse) => now - pulse.at < PULSE_LIFETIME[pulse.kind]),
      { kind, at: now },
    ];
  }

  /**
   * The mood right now: baseline plus decaying pulse contributions.
   * Called once per animation frame by the canvas.
   */
  sample(now: number): WaveMood {
    const mood = { ...this.base() };
    let alive = false;

    for (const pulse of this.pulses) {
      const life = PULSE_LIFETIME[pulse.kind];
      const age = now - pulse.at;
      if (age >= life) {
        continue;
      }
      alive = true;
      // Ease-out decay: strong at first, settling smoothly to zero.
      const strength = Math.pow(1 - age / life, 2);
      switch (pulse.kind) {
        case 'correct':
          // A calm, bright swell — the platform breathes easier.
          mood.energy += 0.25 * strength;
          mood.brightness += 0.45 * strength;
          mood.turbulence = Math.max(0, mood.turbulence - 0.5 * strength);
          break;
        case 'incorrect':
          // A sharp, unstable jolt.
          mood.turbulence += 0.7 * strength;
          mood.energy += 0.35 * strength;
          break;
        case 'click':
          mood.energy += 0.12 * strength;
          mood.brightness += 0.1 * strength;
          break;
      }
    }

    if (!alive && this.pulses.length > 0) {
      this.pulses = [];
    }

    mood.energy = Math.min(1.2, mood.energy);
    mood.turbulence = Math.min(1.2, mood.turbulence);
    mood.brightness = Math.min(1, mood.brightness);
    return mood;
  }
}
