import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeterHealth } from '@academy/content-model';

/**
 * Labelled platform meter. Health is conveyed by label text as well as
 * colour — never colour alone (16_ACCESSIBILITY_AND_INCLUSION.md).
 */
@Component({
  selector: 'ea-meter',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="meter" [attr.data-health]="health">
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
export class MeterComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: number;
  @Input({ required: true }) health!: MeterHealth;
}
