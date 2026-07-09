import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PercentPipe } from '@angular/common';
import {
  ContentService,
  GameStateService,
  LearningAnalyticsService,
} from '@academy/data-access';
import { MissionDefinition } from '@academy/content-model';
import { CampaignEmblemComponent } from './campaign-emblem.component';

interface MissionNode {
  mission: MissionDefinition;
  index: number;
  unlocked: boolean;
  completed: boolean;
  perfect: boolean;
  /** Completed, but not every first decision was correct — debt was filed. */
  partial: boolean;
  /** Debt from this mission still awaiting remediation (open/reopened/in-review). */
  outstandingDebt: number;
  bestXp: number | null;
}

@Component({
  selector: 'ea-campaign-detail',
  standalone: true,
  imports: [RouterLink, PercentPipe, CampaignEmblemComponent],
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss'],
})
export class CampaignDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);
  private readonly gameState = inject(GameStateService);
  private readonly analytics = inject(LearningAnalyticsService);

  private readonly campaignId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('campaignId') ?? '')),
    { initialValue: '' }
  );

  protected readonly campaign = computed(() => this.content.campaignById(this.campaignId()));

  protected readonly nodes = computed<MissionNode[]>(() => {
    const campaign = this.campaign();
    if (!campaign) {
      return [];
    }
    const debt = this.gameState.technicalDebtItems();
    return this.content.missionsForCampaign(campaign.id).map((mission, index) => {
      const record = this.gameState.missionRecord(mission.id);
      const completed = record !== undefined;
      const perfect = record?.perfect ?? false;
      const outstandingDebt = debt.filter(
        (item) =>
          item.missionId === mission.id &&
          (item.status === 'open' || item.status === 'reopened' || item.status === 'in-review')
      ).length;
      return {
        mission,
        index,
        unlocked: this.gameState.isMissionUnlocked(campaign, mission.id),
        completed,
        perfect,
        partial: completed && !perfect,
        outstandingDebt,
        bestXp: record?.bestXp ?? null,
      };
    });
  });

  protected readonly campaignComplete = computed(() => {
    const campaign = this.campaign();
    return campaign ? this.gameState.isCampaignCompleted(campaign) : false;
  });

  /** First-attempt vs after-review learning stats for this campaign (spec 07). */
  protected readonly learning = computed(() => this.analytics.campaignLearning(this.campaignId()));

  protected readonly locked = computed(() => {
    const campaign = this.campaign();
    if (!campaign) {
      return false;
    }
    const prerequisite = campaign.requiredCampaignId
      ? this.content.campaignById(campaign.requiredCampaignId)
      : undefined;
    return !this.gameState.isCampaignUnlocked(campaign, prerequisite);
  });

  protected readonly prerequisiteTitle = computed(() => {
    const campaign = this.campaign();
    return campaign?.requiredCampaignId
      ? (this.content.campaignById(campaign.requiredCampaignId)?.title ?? null)
      : null;
  });
}
