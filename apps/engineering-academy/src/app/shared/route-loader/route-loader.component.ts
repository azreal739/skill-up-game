import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';

/** Palette shared with the ambient wave background. */
const CYAN: [number, number, number] = [34, 211, 238];
const VIOLET: [number, number, number] = [167, 139, 250];

interface Ring {
  /** Lobes around the circle. */
  lobes: number;
  /** Radial wave amplitude in px. */
  amplitude: number;
  /** Radians/ms the ring rotates (sign = direction). */
  speed: number;
  colour: [number, number, number];
  /** Phase seed so rings don't align. */
  seed: number;
}

const RINGS: Ring[] = [
  { lobes: 6, amplitude: 7, speed: 0.0016, colour: CYAN, seed: 0 },
  { lobes: 9, amplitude: 5, speed: -0.0022, colour: VIOLET, seed: 1.7 },
  { lobes: 4, amplitude: 9, speed: 0.0011, colour: CYAN, seed: 3.4 },
];

/** Keep the loader up at least this long once shown — SPA navigations are
 *  near-instant, so this beat is what actually makes the state visible. */
const MIN_VISIBLE_MS = 420;
/** Shorter hold under reduced motion: still a visible state, less of a beat. */
const MIN_VISIBLE_REDUCED_MS = 200;
/** How long the fade-out class stays on before the element is removed. */
const FADE_OUT_MS = 180;

/**
 * Route-transition loader: concentric sine waves wrapped into rotating rings,
 * in the mission-control palette with a soft glow — a telemetry "tuning in"
 * beat rather than a vanilla spinner. Shows on every navigation and holds for
 * a short minimum so the state is actually perceivable (it is
 * pointer-transparent, so it never blocks input), then fades out. Renders a
 * single static frame under reduced motion.
 */
@Component({
  selector: 'ea-route-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <div class="route-loader" [class.route-loader--out]="leaving()" role="status" aria-label="Loading">
        <div class="route-loader__orb">
          <span class="route-loader__halo" aria-hidden="true"></span>
          <canvas #canvas class="route-loader__canvas" aria-hidden="true"></canvas>
        </div>
        <span class="route-loader__label">Tuning in…</span>
      </div>
    }
  `,
  styleUrls: ['./route-loader.component.scss'],
})
export class RouteLoaderComponent implements OnDestroy {
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  private readonly router = inject(Router);
  private readonly zone = inject(NgZone);

  protected readonly visible = signal(false);
  protected readonly leaving = signal(false);

  private sub?: Subscription;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private fadeTimer: ReturnType<typeof setTimeout> | null = null;
  private activeNavigationId: number | null = null;
  private shownAt = 0;
  private raf = 0;

  constructor() {
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.activeNavigationId = event.id;
        this.clearTimers();
        this.leaving.set(false);
        if (!this.visible()) {
          this.shownAt = performance.now();
          this.visible.set(true);
        }
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        if (event.id !== this.activeNavigationId) {
          return;
        }
        this.activeNavigationId = null;
        this.scheduleHide();
      }
    });

    // The canvas only exists while the @if is rendered; starting the render
    // from an effect on the viewChild signal (rather than a microtask racing
    // change detection) guarantees we draw once it is actually in the DOM.
    effect(() => {
      const canvas = this.canvasRef()?.nativeElement;
      if (this.visible() && canvas) {
        untracked(() => this.startRender(canvas));
      } else {
        cancelAnimationFrame(this.raf);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.clearTimers();
    cancelAnimationFrame(this.raf);
  }

  private scheduleHide(): void {
    if (!this.visible()) {
      return;
    }
    const reduced = document.documentElement.classList.contains('ea-reduced-motion');
    const minVisible = reduced ? MIN_VISIBLE_REDUCED_MS : MIN_VISIBLE_MS;
    const elapsed = performance.now() - this.shownAt;
    const wait = Math.max(0, minVisible - elapsed);
    this.hideTimer = setTimeout(() => {
      this.hideTimer = null;
      if (this.activeNavigationId !== null) {
        return;
      }
      if (reduced) {
        this.hide();
        return;
      }
      // Fade the overlay out, then remove it from the DOM.
      this.leaving.set(true);
      this.fadeTimer = setTimeout(() => {
        this.fadeTimer = null;
        if (this.activeNavigationId === null) {
          this.hide();
        }
      }, FADE_OUT_MS);
    }, wait);
  }

  private hide(): void {
    this.visible.set(false);
    this.leaving.set(false);
    cancelAnimationFrame(this.raf);
  }

  private clearTimers(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    if (this.fadeTimer) {
      clearTimeout(this.fadeTimer);
      this.fadeTimer = null;
    }
  }

  private startRender(canvas: HTMLCanvasElement): void {
    cancelAnimationFrame(this.raf);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 120;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const reduced = document.documentElement.classList.contains('ea-reduced-motion');
    const draw = (now: number) => {
      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;
      const baseR = 30;
      for (const ring of RINGS) {
        const phase = reduced ? ring.seed : ring.seed + now * ring.speed;
        ctx.beginPath();
        for (let a = 0; a <= 360; a += 4) {
          const theta = (a * Math.PI) / 180;
          const r = baseR + ring.amplitude * Math.sin(ring.lobes * theta + phase);
          const x = cx + r * Math.cos(theta);
          const y = cy + r * Math.sin(theta);
          if (a === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        const [r, g, b] = ring.colour;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.85)`;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.9)`;
        ctx.shadowBlur = 8;
        ctx.stroke();
      }
      if (!reduced) {
        this.raf = requestAnimationFrame(draw);
      }
    };

    this.zone.runOutsideAngular(() => {
      this.raf = requestAnimationFrame(draw);
    });
  }
}
