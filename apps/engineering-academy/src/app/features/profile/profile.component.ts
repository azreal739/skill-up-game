import { Component, computed, inject } from '@angular/core';
import { DatePipe, PercentPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BADGES } from '@academy/content-model';
import { ContentService, GameStateService } from '@academy/data-access';
import { BadgeChipComponent } from '@academy/ui';

@Component({
  selector: 'ea-profile',
  standalone: true,
  imports: [RouterLink, DatePipe, PercentPipe, BadgeChipComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  protected readonly gameState = inject(GameStateService);
  private readonly content = inject(ContentService);
  private readonly router = inject(Router);

  protected readonly allBadges = BADGES;

  protected readonly initial = computed(() =>
    (this.gameState.state()?.profile.name ?? '?').charAt(0).toUpperCase()
  );

  protected readonly missionsCompleted = computed(
    () => Object.keys(this.gameState.state()?.completedMissions ?? {}).length
  );

  protected readonly perfectMissions = computed(
    () =>
      Object.values(this.gameState.state()?.completedMissions ?? {}).filter(
        (record) => record.perfect
      ).length
  );

  protected readonly campaignStats = computed(() =>
    this.content.campaigns().map((campaign) => ({
      campaign,
      progress: this.gameState.campaignProgress(campaign),
    }))
  );

  protected readonly xpToNext = computed(() => {
    const next = this.gameState.nextRank();
    return next ? next.minXp - this.gameState.xp() : null;
  });

  hasBadge(badgeId: string): boolean {
    return this.gameState.badges().includes(badgeId);
  }

  resetProgress(): void {
    if (confirm('Reset all Academy progress on this device? This cannot be undone.')) {
      this.gameState.resetProgress();
      this.router.navigateByUrl('/');
    }
  }
}
