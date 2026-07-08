import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  signal,
} from '@angular/core';

/**
 * Animated number: eases from its previous value to the new one, so XP and
 * scores feel earned rather than stamped. `instant` (reduced motion) skips
 * straight to the target.
 */
@Component({
  selector: 'ea-count-up',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="count" [class.count--live]="animating()">{{ prefix }}{{ shown() }}{{ suffix }}</span>`,
  styles: [
    `
      .count {
        font-variant-numeric: tabular-nums;
      }

      .count--live {
        text-shadow: 0 0 12px rgba(34, 211, 238, 0.55);
      }
    `,
  ],
})
export class CountUpComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) value = 0;
  @Input() duration = 750;
  @Input() prefix = '';
  @Input() suffix = '';
  /** Skip the animation (reduced motion). */
  @Input() instant = false;

  protected readonly shown = signal(0);
  protected readonly animating = signal(false);

  private frame = 0;

  ngOnChanges(): void {
    cancelAnimationFrame(this.frame);
    if (this.instant || this.duration <= 0) {
      this.shown.set(this.value);
      return;
    }
    const from = this.shown();
    const to = this.value;
    if (from === to) {
      return;
    }
    const start = performance.now();
    this.animating.set(true);
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / this.duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.shown.set(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        this.frame = requestAnimationFrame(tick);
      } else {
        this.animating.set(false);
      }
    };
    this.frame = requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
  }
}
