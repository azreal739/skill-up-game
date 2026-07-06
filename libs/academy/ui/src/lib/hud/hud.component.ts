import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PlatformMeters,
  Rank,
  debtHealth,
  severityLabel,
  stabilityHealth,
} from '@academy/content-model';
import { MeterComponent } from '../meter/meter.component';

/**
 * Mission HUD (07_UI_UX_SPECIFICATION.md): rank, XP, platform stability,
 * technical debt, incident severity and hint usage at a glance.
 */
@Component({
  selector: 'ea-hud',
  standalone: true,
  imports: [CommonModule, MeterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hud">
      <div class="hud__identity">
        <span class="hud__rank">{{ rank.title }}</span>
        <span class="hud__xp">{{ xp }} XP</span>
        <div class="hud__xpbar" role="progressbar" aria-label="Progress to next rank"
             [attr.aria-valuenow]="xpProgressPercent" aria-valuemin="0" aria-valuemax="100">
          <div class="hud__xpfill" [style.width.%]="xpProgressPercent"></div>
        </div>
      </div>

      <ea-meter label="Stability" [value]="meters.stability" [health]="stabilityHealth" />
      <ea-meter label="Tech Debt" [value]="meters.technicalDebt" [health]="debtHealth" />

      <div class="hud__severity" [attr.data-critical]="isCriticalSeverity">
        <span class="hud__severity-label">Severity</span>
        <span class="hud__severity-value">{{ severity }}</span>
      </div>

      <div class="hud__slot" *ngIf="missionTitle">
        <span class="hud__slot-label">Mission</span>
        <span class="hud__slot-value">{{ missionTitle }}</span>
      </div>

      <div class="hud__slot" *ngIf="hintsUsed !== null">
        <span class="hud__slot-label">Hints</span>
        <span class="hud__slot-value">{{ hintsUsed }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./hud.component.scss'],
})
export class HudComponent {
  @Input({ required: true }) rank!: Rank;
  @Input({ required: true }) xp!: number;
  @Input({ required: true }) rankProgress = 0;
  @Input({ required: true }) meters!: PlatformMeters;
  @Input() missionTitle: string | null = null;
  @Input() hintsUsed: number | null = null;

  get xpProgressPercent(): number {
    return Math.round(this.rankProgress * 100);
  }

  get stabilityHealth() {
    return stabilityHealth(this.meters.stability);
  }

  get debtHealth() {
    return debtHealth(this.meters.technicalDebt);
  }

  get severity(): string {
    return severityLabel(this.meters);
  }

  get isCriticalSeverity(): boolean {
    return this.meters.severityIndex >= 4;
  }
}
