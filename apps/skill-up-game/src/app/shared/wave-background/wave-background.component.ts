import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';

interface WaveSpec {
  /** Vertical anchor as a fraction of the viewport height. */
  baseY: number;
  amplitude: number;
  wavelength: number;
  speed: number;
  /** Phase seed so the waves never move in lockstep. */
  seed: number;
  /** Calm palette [r,g,b] and the alert palette it blends toward. */
  calm: [number, number, number];
  hot: [number, number, number];
}

const CYAN: [number, number, number] = [34, 211, 238];
const VIOLET: [number, number, number] = [167, 139, 250];
const ORANGE: [number, number, number] = [251, 146, 60];
const RED: [number, number, number] = [248, 113, 113];

const WAVES: WaveSpec[] = [
  { baseY: 0.28, amplitude: 18, wavelength: 980, speed: 0.00018, seed: 1.2, calm: VIOLET, hot: ORANGE },
  { baseY: 0.42, amplitude: 26, wavelength: 780, speed: 0.00022, seed: 0.0, calm: CYAN, hot: ORANGE },
  { baseY: 0.58, amplitude: 34, wavelength: 620, speed: 0.0003, seed: 2.1, calm: VIOLET, hot: RED },
  { baseY: 0.72, amplitude: 22, wavelength: 900, speed: 0.00026, seed: 4.4, calm: CYAN, hot: ORANGE },
  { baseY: 0.86, amplitude: 30, wavelength: 540, speed: 0.00034, seed: 5.9, calm: VIOLET, hot: RED },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: WaveSpec['calm'];
  /** Base opacity; twinkles around this value. */
  alpha: number;
  twinkle: number;
}

interface NodePulse {
  x: number;
  y: number;
  born: number;
}

/** Horizontal sampling step in CSS pixels — small enough to look smooth. */
const SEGMENT_PX = 14;
const PARTICLE_COUNT = 26;
const NODE_LIFETIME = 2400;
const NODE_INTERVAL = 3400;

/**
 * The ambient mission-control environment behind the app: flowing telemetry
 * waves, drifting signal particles and occasional pulsing network nodes on a
 * canvas, plus CSS grid and scan-line overlays. Ported from the Engineering
 * Academy shell and made self-contained — it reads reduced motion from
 * `matchMedia` (drawing a single static frame when on) and drives its own calm
 * mood, with a gentle ripple on button/link presses. The rAF loop runs outside
 * Angular and pauses when the tab is hidden.
 */
@Component({
  selector: 'app-wave-background',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <canvas #canvas class="waves" aria-hidden="true"></canvas>
    <div class="grid" aria-hidden="true"></div>
    <div class="scanlines" aria-hidden="true"></div>
    <div class="vignette" aria-hidden="true"></div>
  `,
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
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
      }

      /* Faint engineering grid, fading out toward the top of the screen. */
      .grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(148, 163, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(148, 163, 255, 0.05) 1px, transparent 1px);
        background-size: 56px 56px;
        mask-image: linear-gradient(180deg, transparent 12%, rgba(0, 0, 0, 0.5) 55%, black 100%);
        -webkit-mask-image: linear-gradient(
          180deg,
          transparent 12%,
          rgba(0, 0, 0, 0.5) 55%,
          black 100%
        );
        animation: grid-drift 60s linear infinite;
      }

      /* CRT-style scan lines, barely visible, slowly drifting. */
      .scanlines {
        position: absolute;
        inset: -8px 0;
        background: repeating-linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.022) 0,
          rgba(255, 255, 255, 0.022) 1px,
          transparent 1px,
          transparent 4px
        );
        animation: scan-drift 9s linear infinite;
      }

      /* Keeps the centre legible while letting the waves burn a little
         brighter around the edges of the command deck. */
      .vignette {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse at 50% 45%, transparent 28%, rgba(7, 10, 20, 0.2) 76%),
          linear-gradient(180deg, rgba(7, 10, 20, 0.12), transparent 24%, rgba(7, 10, 20, 0.2));
      }

      @keyframes grid-drift {
        from {
          background-position: 0 0;
        }

        to {
          background-position: 56px 56px;
        }
      }

      @keyframes scan-drift {
        from {
          transform: translateY(0);
        }

        to {
          transform: translateY(8px);
        }
      }
    `,
  ],
})
export class WaveBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly zone = inject(NgZone);

  private ctx: CanvasRenderingContext2D | null = null;
  private frame = 0;
  private running = false;
  private width = 0;
  private height = 0;
  private dpr = 1;
  private reducedMotion = false;

  // Per-frame smoothed mood — lerped towards the sampled target so pulses
  // ease in and out instead of snapping.
  private energy = 0.35;
  private turbulence = 0;
  private brightness = 0.5;
  private alert = 0;

  // A decaying "excitement" bumped by clicks, feeding the mood target so
  // the deck reacts a little to interaction.
  private pulse = 0;
  private lastPulseAt = 0;

  private particles: Particle[] = [];
  private nodes: NodePulse[] = [];
  private nextNodeAt = 0;

  private readonly reducedMotionQuery =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;

  private readonly onResize = () => this.resize();
  private readonly onVisibility = () => {
    if (document.hidden) {
      this.stop();
    } else {
      this.startIfAllowed();
    }
  };
  private readonly onReducedMotionChange = (event: MediaQueryListEvent) => {
    this.reducedMotion = event.matches;
    if (!this.ctx) {
      return;
    }
    if (this.reducedMotion) {
      this.stop();
      this.drawFrame(0, true);
    } else {
      this.startIfAllowed();
    }
  };
  private readonly onPointerDown = (event: PointerEvent) => {
    // Button presses ripple the waves; ignore plain background clicks.
    if ((event.target as HTMLElement | null)?.closest('button, a')) {
      this.pulse = Math.min(1, this.pulse + 0.6);
      this.lastPulseAt = performance.now();
    }
  };

  ngAfterViewInit(): void {
    this.reducedMotion = this.reducedMotionQuery?.matches ?? false;
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.resize();
    this.seedParticles();

    this.zone.runOutsideAngular(() => {
      window.addEventListener('resize', this.onResize, { passive: true });
      document.addEventListener('visibilitychange', this.onVisibility);
      document.addEventListener('pointerdown', this.onPointerDown, { passive: true });
      this.reducedMotionQuery?.addEventListener('change', this.onReducedMotionChange);
      if (this.reducedMotion) {
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
    this.reducedMotionQuery?.removeEventListener('change', this.onReducedMotionChange);
  }

  private seedParticles(): void {
    this.particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: -(6 + Math.random() * 14),
      vy: -(2 + Math.random() * 6),
      radius: 0.8 + Math.random() * 1.4,
      color: i % 2 === 0 ? CYAN : VIOLET,
      alpha: 0.16 + Math.random() * 0.2,
      twinkle: Math.random() * Math.PI * 2,
    }));
  }

  private startIfAllowed(): void {
    if (this.running || !this.ctx || this.reducedMotion) {
      return;
    }
    this.running = true;
    this.zone.runOutsideAngular(() => {
      let last = performance.now();
      const loop = (now: number) => {
        if (!this.running) {
          return;
        }
        const dt = Math.min(64, now - last);
        last = now;
        this.step(now, dt);
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
      this.drawFrame(0, this.reducedMotion);
    }
  }

  /** The calm baseline mood plus a decaying click pulse. */
  private sample(now: number): {
    energy: number;
    turbulence: number;
    brightness: number;
    alert: number;
  } {
    // Exponential decay of the click excitement (half-life ~700ms).
    if (this.pulse > 0.0001) {
      const elapsed = now - this.lastPulseAt;
      this.pulse = this.pulse * Math.pow(0.5, elapsed / 700);
      this.lastPulseAt = now;
    } else {
      this.pulse = 0;
    }
    const p = this.pulse;
    return {
      energy: 0.32 + p * 0.5,
      turbulence: p * 0.7,
      brightness: 0.5 + p * 0.4,
      alert: p * 0.35,
    };
  }

  /** Advance particles and node pulses; dt in ms. */
  private step(now: number, dt: number): void {
    const speedScale = (0.5 + this.energy) * (dt / 1000);
    for (const particle of this.particles) {
      particle.x += particle.vx * speedScale;
      particle.y += particle.vy * speedScale;
      particle.twinkle += dt * 0.002;
      if (particle.x < -4) {
        particle.x = this.width + 4;
        particle.y = Math.random() * this.height;
      }
      if (particle.y < -4) {
        particle.y = this.height + 4;
      }
    }

    if (now >= this.nextNodeAt) {
      const wave = WAVES[Math.floor(Math.random() * WAVES.length)];
      this.nodes.push({
        x: Math.random() * this.width,
        y: wave.baseY * this.height + (Math.random() - 0.5) * wave.amplitude * 2,
        born: now,
      });
      this.nextNodeAt = now + NODE_INTERVAL * (0.6 + Math.random() * 0.8) * (1 - this.alert * 0.5);
    }
    this.nodes = this.nodes.filter((node) => now - node.born < NODE_LIFETIME);
  }

  private drawFrame(now: number, still: boolean): void {
    const ctx = this.ctx;
    if (!ctx) {
      return;
    }

    if (still) {
      this.energy = 0;
      this.turbulence = 0;
      this.brightness = 0.4;
      this.alert = 0;
    } else {
      const target = this.sample(now);
      // Ease towards the target — the source of the "smooth" feel.
      this.energy += (target.energy - this.energy) * 0.045;
      this.turbulence += (target.turbulence - this.turbulence) * 0.06;
      this.brightness += (target.brightness - this.brightness) * 0.05;
      this.alert += (target.alert - this.alert) * 0.03;
    }

    ctx.clearRect(0, 0, this.width, this.height);
    ctx.lineCap = 'round';
    ctx.globalCompositeOperation = 'lighter';

    for (const wave of WAVES) {
      this.drawWave(ctx, wave, now);
    }

    if (!still) {
      this.drawParticles(ctx);
      this.drawNodes(ctx, now);
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  private blend(calm: [number, number, number], hot: [number, number, number]): string {
    const a = this.alert;
    const r = Math.round(calm[0] + (hot[0] - calm[0]) * a);
    const g = Math.round(calm[1] + (hot[1] - calm[1]) * a);
    const b = Math.round(calm[2] + (hot[2] - calm[2]) * a);
    return `${r}, ${g}, ${b}`;
  }

  private drawWave(ctx: CanvasRenderingContext2D, wave: WaveSpec, now: number): void {
    const t = now * wave.speed * (0.6 + this.energy);
    const baseY = wave.baseY * this.height;
    const k = (Math.PI * 2) / wave.wavelength;
    // Turbulence layers a faster, shorter ripple on top of the main swell.
    const rippleAmp = wave.amplitude * 0.55 * this.turbulence;
    const kRipple = k * 3.7;

    const color = this.blend(wave.calm, wave.hot);
    const alpha = 0.075 + this.brightness * 0.14;

    // Three passes: an atmospheric bloom, a readable wave, then a crisp
    // carrier core. The additive canvas blend makes crossings light up.
    for (const pass of [
      { width: 9, alpha: alpha * 0.16 },
      { width: 3.5, alpha: alpha * 0.45 },
      { width: 1.15, alpha },
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
      ctx.strokeStyle = `rgba(${color}, ${pass.alpha})`;
      ctx.lineWidth = pass.width;
      ctx.stroke();
    }

    // A sparse stream of bright telemetry packets rides each sine wave.
    ctx.setLineDash([2, 34]);
    ctx.lineDashOffset = -(now * wave.speed * 42 + wave.seed * 18);
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
    ctx.strokeStyle = `rgba(${color}, ${alpha * 1.9})`;
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.setLineDash([]);
  }

  private drawParticles(ctx: CanvasRenderingContext2D): void {
    for (const particle of this.particles) {
      const twinkle = 0.7 + 0.3 * Math.sin(particle.twinkle);
      const alpha = particle.alpha * twinkle * (0.7 + this.brightness * 0.6);
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.blend(particle.color, ORANGE)}, ${alpha})`;
      ctx.fill();
    }
  }

  private drawNodes(ctx: CanvasRenderingContext2D, now: number): void {
    for (const node of this.nodes) {
      const life = (now - node.born) / NODE_LIFETIME;
      const radius = 3 + life * 26;
      const alpha = 0.28 * (1 - life);
      const color = this.blend(CYAN, RED);
      // Expanding ring + a small core dot: a network node lighting up.
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${color}, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(node.x, node.y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${alpha * 2})`;
      ctx.fill();
    }
  }
}
