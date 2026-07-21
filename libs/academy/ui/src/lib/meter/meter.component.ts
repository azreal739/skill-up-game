import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  signal,
} from '@angular/core';

import { MeterHealth } from '@academy/content-model';

/**
 * Labelled platform meter. Health is conveyed by label text as well as
 * colour — never colour alone (16_ACCESSIBILITY_AND_INCLUSION.md).
 * When the value changes mid-session (a consequence landing), the meter
 * pulses briefly so the change is felt, not just re-rendered.
 */
@Component({
  selector: 'ea-meter',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="meter" [attr.data-health]="health" [attr.data-pulse]="pulse()">
      <div class="meter__row">
        <span class="meter__label">{{ label }}</span>
        <span class="meter__value">{{ value }}<span class="meter__max">/100</span></span>
      </div>
      <div
        class="meter__track"
        role="meter"
        [attr.aria-label]="label"
        [attr.aria-valuenow]="value"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div class="meter__fill" [style.width.%]="value"></div>
      </div>
    </div>
  `,
  styleUrls: ['./meter.component.scss'],
})
export class MeterComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: number;
  @Input({ required: true }) health!: MeterHealth;

  /** 'up' | 'down' while the change-pulse plays, null when settled. */
  protected readonly pulse = signal<'up' | 'down' | null>(null);
  private pulseTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['value'];
    if (!change || change.firstChange || change.previousValue === change.currentValue) {
      return;
    }
    this.pulse.set(change.currentValue > change.previousValue ? 'up' : 'down');
    if (this.pulseTimer) {
      clearTimeout(this.pulseTimer);
    }
    this.pulseTimer = setTimeout(() => {
      this.pulseTimer = null;
      this.pulse.set(null);
    }, 950);
  }

  ngOnDestroy(): void {
    if (this.pulseTimer) {
      clearTimeout(this.pulseTimer);
    }
  }
}
