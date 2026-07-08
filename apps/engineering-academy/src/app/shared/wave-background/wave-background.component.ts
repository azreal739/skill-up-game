import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { GameStateService } from '@academy/data-access';
import { WaveStateService } from './wave-state.service';

interface WaveSpec {
  /** Vertical anchor as a fraction of the viewport height. */
  baseY: number;
  amplitude: number;
  wavelength: number;
  speed: number;
  /** Phase seed so the waves never move in lockstep. */
  seed: number;
  color: string;
}

const WAVES: WaveSpec[] = [
  { baseY: 0.42, amplitude: 26, wavelength: 780, speed: 0.00022, seed: 0.0, color: '34, 211, 238' },
  { baseY: 0.58, amplitude: 34, wavelength: 620, speed: 0.0003, seed: 2.1, color: '167, 139, 250' },
  { baseY: 0.72, amplitude: 22, wavelength: 900, speed: 0.00026, seed: 4.4, color: '34, 211, 238' },
  { baseY: 0.86, amplitude: 30, wavelength: 540, speed: 0.00034, seed: 5.9, color: '167, 139, 250' },
];

/** Horizontal sampling step in CSS pixels — small enough to look smooth. */
const SEGMENT_PX = 14;

/**
 * Neon telemetry waves behind the whole app. Sine lines whose speed, jitter
 * and brightness follow the platform mood from WaveStateService, smoothed
 * per-frame so every transition eases rather than snaps. Runs its rAF loop
 * outside Angular, pauses when the tab is hidden, and renders one static
 * frame under reduced motion.
 */
@Component({
  selector: 'ea-wave-background',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas class="waves" aria-hidden="true"></canvas>`,
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        display: block;
      }

      .waves {
        width: 100%;
        height: 100%;
        display: block;
      }
    `,
  ],
})
export class WaveBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly zone = inject(NgZone);
  private readonly waveState = inject(WaveStateService);
  private readonly gameState = inject(GameStateService);

  private ctx: CanvasRenderingContext2D | null = null;
  private frame = 0;
  private running = false;
  private width = 0;
  private height = 0;
  private dpr = 1;

  // Per-frame smoothed mood — lerped towards the sampled target so pulses
  // and meter changes ease in and out instead of snapping.
  private energy = 0.35;
  private turbulence = 0;
  private brightness = 0.5;

  private readonly onResize = () => this.resize();
  private readonly onVisibility = () => {
    if (document.hidden) {
      this.stop();
    } else {
      this.startIfAllowed();
    }
  };
  private readonly onPointerDown = (event: PointerEvent) => {
    // Button presses ripple the waves; ignore plain background clicks.
    if ((event.target as HTMLElement | null)?.closest('button, a')) {
      this.waveState.pulse('click');
    }
  };

  constructor() {
    // Start/stop with the reduced-motion setting; render a calm static
    // frame instead of animating when it is on.
    effect(() => {
      const reduced = this.gameState.settings().reducedMotion;
      if (!this.ctx) {
        return;
      }
      if (reduced) {
        this.stop();
        this.drawFrame(0, true);
      } else {
        this.startIfAllowed();
      }
    });
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.resize();

    this.zone.runOutsideAngular(() => {
      window.addEventListener('resize', this.onResize, { passive: true });
      document.addEventListener('visibilitychange', this.onVisibility);
      document.addEventListener('pointerdown', this.onPointerDown, { passive: true });
      if (this.gameState.settings().reducedMotion) {
        this.drawFrame(0, true);
      } else {
        this.startIfAllowed();
      }
    });
  }

  ngOnDestroy(): void {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('visibilitychange', this.onVisibility);
    document.removeEventListener('pointerdown', this.onPointerDown);
  }

  private startIfAllowed(): void {
    if (this.running || !this.ctx || this.gameState.settings().reducedMotion) {
      return;
    }
    this.running = true;
    this.zone.runOutsideAngular(() => {
      const loop = (now: number) => {
        if (!this.running) {
          return;
        }
        this.drawFrame(now, false);
        this.frame = requestAnimationFrame(loop);
      };
      this.frame = requestAnimationFrame(loop);
    });
  }

  private stop(): void {
    this.running = false;
    cancelAnimationFrame(this.frame);
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = Math.round(this.width * this.dpr);
    canvas.height = Math.round(this.height * this.dpr);
    this.ctx?.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (!this.running) {
      this.drawFrame(0, this.gameState.settings().reducedMotion);
    }
  }

  private drawFrame(now: number, still: boolean): void {
    const ctx = this.ctx;
    if (!ctx) {
      return;
    }

    const target = this.waveState.sample(now);
    if (still) {
      this.energy = 0;
      this.turbulence = 0;
      this.brightness = 0.4;
    } else {
      // Ease towards the target — the source of the "smooth" feel.
      this.energy += (target.energy - this.energy) * 0.045;
      this.turbulence += (target.turbulence - this.turbulence) * 0.06;
      this.brightness += (target.brightness - this.brightness) * 0.05;
    }

    ctx.clearRect(0, 0, this.width, this.height);
    ctx.lineCap = 'round';

    for (const wave of WAVES) {
      this.drawWave(ctx, wave, now);
    }
  }

  private drawWave(ctx: CanvasRenderingContext2D, wave: WaveSpec, now: number): void {
    const t = now * wave.speed * (0.6 + this.energy);
    const baseY = wave.baseY * this.height;
    const k = (Math.PI * 2) / wave.wavelength;
    // Turbulence layers a faster, shorter ripple on top of the main swell.
    const rippleAmp = wave.amplitude * 0.55 * this.turbulence;
    const kRipple = k * 3.7;

    const alpha = 0.05 + this.brightness * 0.1;

    // Two passes: a wide faint stroke as glow, a thin brighter core.
    for (const pass of [
      { width: 4.5, alpha: alpha * 0.5 },
      { width: 1.6, alpha },
    ]) {
      ctx.beginPath();
      for (let x = 0; x <= this.width + SEGMENT_PX; x += SEGMENT_PX) {
        const y =
          baseY +
          wave.amplitude * Math.sin(x * k + wave.seed + t) +
          rippleAmp * Math.sin(x * kRipple + wave.seed * 3 + t * 2.6);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = `rgba(${wave.color}, ${pass.alpha})`;
      ctx.lineWidth = pass.width;
      ctx.stroke();
    }
  }
}
