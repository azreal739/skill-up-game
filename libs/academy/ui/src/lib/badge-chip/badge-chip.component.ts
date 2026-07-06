import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeDefinition } from '@academy/content-model';

@Component({
  selector: 'ea-badge-chip',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="badge" [class.badge--locked]="locked" [title]="badge.description">
      <span class="badge__icon" aria-hidden="true">{{ badge.icon }}</span>
      <span class="badge__title">{{ badge.title }}</span>
      <span class="badge__state" *ngIf="locked">(locked)</span>
    </span>
  `,
  styleUrls: ['./badge-chip.component.scss'],
})
export class BadgeChipComponent {
  @Input({ required: true }) badge!: BadgeDefinition;
  @Input() locked = false;
}
