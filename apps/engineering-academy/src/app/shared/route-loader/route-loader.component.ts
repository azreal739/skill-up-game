import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
  signal,
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

/** Only show the loader if navigation is slow enough to notice (avoids flash). */
const SHOW_DELAY_MS = 140;
/** Keep it up at least this long once shown, so it never strobes. */
const MIN_VISIBLE_MS = 360;

/**
 * Route-transition loader: concentric sine waves wrapped into rotating rings,
 * in the mission-control palette with a soft glow — a telemetry "tuning in"
 * beat rather than a vanilla spinner. Shown only while a navigation is in
 * flight (debounced), and renders a single static frame under reduced motion.
 */
@Component({
  selector: 'ea-route-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <div class="route-loader" role="status" aria-label="Loading">
        <canvas #canvas class="route-loader__canvas" aria-hidden="true"></canvas>
        <span class="route-loader__label">Tuning in…</span>
      </div>
    }
  `,
  styleUrls: ['./route-loader.component.scss'],
})
export class RouteLoaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvasRef?: ElementRef<HTMLCanvasElement>;

  private readonly router = inject(Router);
  private readonly zone = inject(NgZone);

  protected readonly visible = signal(false);

  private sub?: Subscription;
  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private activeNavigationId: number | null = null;
  private shownAt = 0;
  private raf = 0;

  constructor() {
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.activeNavigationId = event.id;
        this.clearHideTimer();
        this.scheduleShow();
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
  }

  ngAfterViewInit(): void {
    // Canvas only exists while visible; the render loop (re)starts on show.
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.clearShowTimer();
    this.clearHideTimer();
    cancelAnimationFrame(this.raf);
  }

  private scheduleShow(): void {
    if (this.visible() || this.showTimer) {
      return;
    }
    this.showTimer = setTimeout(() => {
      this.showTimer = null;
      this.shownAt = performance.now();
      this.visible.set(true);
      // Canvas renders after the @if adds it to the DOM.
      queueMicrotask(() => this.startRender());
    }, SHOW_DELAY_MS);
  }

  private scheduleHide(): void {
    if (this.showTimer) {
      // Navigation finished before the loader ever appeared — nothing to show.
      this.clearShowTimer();
      return;
    }
    if (!this.visible()) {
      return;
    }
    const elapsed = performance.now() - this.shownAt;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
    this.hideTimer = setTimeout(() => {
      this.hideTimer = null;
      if (this.activeNavigationId !== null) {
        return;
      }
      this.visible.set(false);
      cancelAnimationFrame(this.raf);
    }, wait);
  }

  private clearShowTimer(): void {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
  }

  private clearHideTimer(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  private startRender(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }
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
