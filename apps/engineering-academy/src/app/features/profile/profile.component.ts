import { Component, computed, inject } from '@angular/core';
import { DatePipe, PercentPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BADGES, TechnicalDebtItem } from '@academy/content-model';
import {
  ContentService,
  GameStateService,
  LearningAnalyticsService,
  TrackProgressService,
} from '@academy/data-access';
import { BadgeChipComponent, ToastService } from '@academy/ui';

@Component({
  selector: 'ea-profile',
  standalone: true,
  imports: [RouterLink, DatePipe, PercentPipe, BadgeChipComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  protected readonly gameState = inject(GameStateService);
  private readonly toast = inject(ToastService);
  private readonly content = inject(ContentService);
  private readonly analytics = inject(LearningAnalyticsService);
  private readonly tracks = inject(TrackProgressService);
  private readonly router = inject(Router);

  protected readonly allBadges = BADGES;

  protected readonly initial = computed(() =>
    (this.gameState.state()?.profile.name ?? '?').charAt(0).toUpperCase()
  );

  /** Academy ID: a stable, human-readable handle derived from the profile. */
  protected readonly academyId = computed(() => {
    const state = this.gameState.state();
    if (!state) {
      return 'EA-0000';
    }
    const seed = `${state.profile.name}${state.profile.createdAt}`;
    let hash = 0;
    for (const ch of seed) {
      hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff;
    }
    return `EA-${hash.toString().padStart(4, '0')}`;
  });

  /** The next campaign to work on: first unlocked, not-yet-complete campaign. */
  protected readonly currentCampaign = computed(() => {
    const campaigns = this.content.campaigns();
    for (const campaign of campaigns) {
      const prerequisite = campaign.requiredCampaignId
        ? this.content.campaignById(campaign.requiredCampaignId)
        : undefined;
      if (
        this.gameState.isCampaignUnlocked(campaign, prerequisite) &&
        !this.gameState.isCampaignCompleted(campaign)
      ) {
        return campaign;
      }
    }
    return campaigns[campaigns.length - 1] ?? null;
  });

  protected readonly firstAttempt = computed(() => this.analytics.firstAttemptAccuracy());
  protected readonly afterReview = computed(() => this.analytics.afterReviewAccuracy());
  protected readonly concepts = computed(() => this.analytics.conceptMastery());
  protected readonly debt = computed(() => this.analytics.debtSummary());

  protected readonly pinnedNotes = computed(() =>
    this.gameState.notes().filter((note) => note.pinned)
  );
  protected readonly recentNotes = computed(() =>
    this.gameState
      .notes()
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 5)
  );

  protected debtTitle(item: TechnicalDebtItem): string {
    return item.challengeTitle;
  }

  protected readonly missionsCompleted = computed(
    () => Object.keys(this.gameState.state()?.completedMissions ?? {}).length
  );

  protected readonly perfectMissions = computed(
    () =>
      Object.values(this.gameState.state()?.completedMissions ?? {}).filter(
        (record) => record.perfect
      ).length
  );

  /** Campaigns grouped by path, so the profile mirrors the two-path structure. */
  protected readonly pathGroups = computed(() =>
    this.tracks.summaries().map((summary) => ({
      track: summary.track,
      campaignsDone: summary.campaignsDone,
      campaignsTotal: summary.campaignsTotal,
      ratio: summary.ratio,
      campaigns: summary.campaigns.map((campaign) => ({
        campaign,
        progress: this.gameState.campaignProgress(campaign),
      })),
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
      this.toast.show('All progress on this device was reset', 'warn');
      this.router.navigateByUrl('/');
    }
  }
}
