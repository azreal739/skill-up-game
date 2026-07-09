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

/** How one challenge (stage) in a mission ended up. */
type StageResult = 'clean' | 'remediated' | 'open';

/** Completion quality of a finished mission. */
type MissionStatus = 'perfect' | 'remediated' | 'partial';

interface MissionNode {
  mission: MissionDefinition;
  index: number;
  unlocked: boolean;
  completed: boolean;
  /** Null until the mission is completed; otherwise its completion quality. */
  status: MissionStatus | null;
  /** Per-stage results, in challenge order. */
  stages: StageResult[];
  /** Stages still awaiting remediation (open debt). */
  outstandingDebt: number;
  /** e.g. "3 stages · 2 first-try · 1 remediated". */
  stageSummary: string;
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
    const progress = this.gameState.challengeProgress();
    const debt = this.gameState.technicalDebtItems();
    return this.content.missionsForCampaign(campaign.id).map((mission, index) => {
      const record = this.gameState.missionRecord(mission.id);
      const completed = record !== undefined;

      // Per-stage results come from each challenge's persisted progress. Older
      // saves completed before the Review Loop have no progress rows, so only
      // trust the breakdown when every stage is accounted for; otherwise fall
      // back to the record's perfect flag.
      const perStage = mission.challenges.map((challenge) => {
        const p = progress.find((entry) => entry.challengeId === challenge.id);
        if (!p) {
          return null;
        }
        if (p.firstAttemptCorrect) {
          return 'clean' as StageResult;
        }
        return (p.isRemediated ? 'remediated' : 'open') as StageResult;
      });
      const haveAllStages =
        completed && perStage.every((s): s is StageResult => s !== null);
      const stages: StageResult[] = haveAllStages ? (perStage as StageResult[]) : [];

      const outstandingDebt = debt.filter(
        (item) =>
          item.missionId === mission.id &&
          (item.status === 'open' || item.status === 'reopened' || item.status === 'in-review')
      ).length;

      let status: MissionStatus | null = null;
      if (completed) {
        if (haveAllStages) {
          const open = stages.filter((s) => s === 'open').length;
          const remediated = stages.filter((s) => s === 'remediated').length;
          status = open > 0 ? 'partial' : remediated > 0 ? 'remediated' : 'perfect';
        } else {
          status = record?.perfect ? 'perfect' : 'partial';
        }
      }

      return {
        mission,
        index,
        unlocked: this.gameState.isMissionUnlocked(campaign, mission.id),
        completed,
        status,
        stages,
        outstandingDebt,
        stageSummary: summariseStages(stages),
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

/** "3 stages · 2 first-try · 1 remediated · 1 to review" — zero parts dropped. */
function summariseStages(stages: StageResult[]): string {
  if (stages.length === 0) {
    return '';
  }
  const clean = stages.filter((s) => s === 'clean').length;
  const remediated = stages.filter((s) => s === 'remediated').length;
  const open = stages.filter((s) => s === 'open').length;
  const parts = [`${stages.length} stage${stages.length === 1 ? '' : 's'}`];
  if (clean) {
    parts.push(`${clean} first-try`);
  }
  if (remediated) {
    parts.push(`${remediated} remediated`);
  }
  if (open) {
    parts.push(`${open} to review`);
  }
  return parts.join(' · ');
}
