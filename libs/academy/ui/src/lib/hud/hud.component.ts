import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  PlatformMeters,
  PlayerLevel,
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
  imports: [MeterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hud">
      <div class="hud__identity">
        @if (level) {
          <span class="hud__level">LV {{ level.level }} · {{ level.codename }}</span>
        }
        <span class="hud__rank">{{ rank.title }}</span>
        <span class="hud__xp">{{ xp }} XP</span>
        <div class="hud__xpbar" role="progressbar" [attr.aria-label]="progressLabel"
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
    
      @if (missionTitle) {
        <div class="hud__slot">
          <span class="hud__slot-label">Mission</span>
          <span class="hud__slot-value">{{ missionTitle }}</span>
        </div>
      }
    
      @if (hintsUsed !== null) {
        <div class="hud__slot">
          <span class="hud__slot-label">Hints</span>
          <span class="hud__slot-value">{{ hintsUsed }}</span>
        </div>
      }

      <div class="hud__actions">
        <ng-content select="[hud-actions]" />
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
  /** Game level track; when present the XP bar tracks level progress. */
  @Input() level: PlayerLevel | null = null;
  @Input() levelProgress: number | null = null;
  @Input() missionTitle: string | null = null;
  @Input() hintsUsed: number | null = null;

  get xpProgressPercent(): number {
    const progress = this.level && this.levelProgress !== null ? this.levelProgress : this.rankProgress;
    return Math.round(progress * 100);
  }

  get progressLabel(): string {
    return this.level ? 'Progress to next level' : 'Progress to next rank';
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
