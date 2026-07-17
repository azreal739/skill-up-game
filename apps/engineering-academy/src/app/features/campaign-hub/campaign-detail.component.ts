import { Component, computed, effect, inject, untracked } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PercentPipe } from '@angular/common';
import {
  ContentService,
  GameStateService,
  LearningAnalyticsService,
  SpeechService,
} from '@academy/data-access';
import { MissionDefinition, debtHealth, stabilityHealth } from '@academy/content-model';
import { MeterComponent } from '@academy/ui';
import { CampaignEmblemComponent } from './campaign-emblem.component';

/** How one challenge (stage) in a mission ended up. */
type StageResult = 'clean' | 'remediated' | 'open' | 'not-started';

/** Completion quality of a finished mission. */
type MissionStatus = 'perfect' | 'remediated' | 'partial';

/** Where the player is with a mission overall. */
type MissionState = 'completed' | 'in-progress' | 'available' | 'locked';

interface MissionNode {
  mission: MissionDefinition;
  index: number;
  unlocked: boolean;
  completed: boolean;
  state: MissionState;
  /** Call-to-action label: Replay / Resume / Start. */
  actionLabel: string;
  /** Null until the mission is completed; otherwise its completion quality. */
  status: MissionStatus | null;
  /** Per-stage results, in challenge order (empty for locked / legacy). */
  stages: StageResult[];
  /** Stages still awaiting remediation (open debt). */
  outstandingDebt: number;
  /** e.g. "3 stages · 2 first-try · 1 remediated" or "1 / 2 stages". */
  stageSummary: string;
  bestXp: number | null;
}

@Component({
  selector: 'ea-campaign-detail',
  standalone: true,
  imports: [RouterLink, PercentPipe, MeterComponent, CampaignEmblemComponent],
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss'],
})
export class CampaignDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);
  private readonly gameState = inject(GameStateService);
  private readonly analytics = inject(LearningAnalyticsService);
  private readonly speech = inject(SpeechService);

  private readonly campaignId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('campaignId') ?? '')),
    { initialValue: '' }
  );

  constructor() {
    // Drilling into a campaign keeps the conversation going: Mission Control
    // briefs the campaign once per visit (voice + auto-play on) — where you
    // stand and which mission to fly next.
    let spokenFor = '';
    effect(() => {
      const campaign = this.campaign();
      const settings = this.gameState.settings();
      if (
        !campaign ||
        !settings.voiceEnabled ||
        !settings.autoPlay ||
        !this.speech.active() ||
        spokenFor === campaign.id
      ) {
        return;
      }
      spokenFor = campaign.id;
      untracked(() => this.speech.sayAmbient('Mission Control', this.campaignBriefLine()));
    });
  }

  /** The spoken drill-in line: campaign standing + the next actionable mission. */
  private campaignBriefLine(): string {
    const campaign = this.campaign();
    if (!campaign) {
      return '';
    }
    if (this.locked()) {
      const prerequisite = this.prerequisiteTitle();
      return `${campaign.title} is still locked. Complete ${prerequisite ?? 'its prerequisite'} first and I'll open it up.`;
    }
    const { done, total } = this.progress();
    const next = this.nodes().find(
      (node) => node.state === 'in-progress' || node.state === 'available'
    );
    if (this.campaignComplete() || !next) {
      return `${campaign.title}: all ${total} missions complete. Replay any of them for a perfect, hint-free run.`;
    }
    const standing =
      done === 0 ? 'No missions flown yet' : `${done} of ${total} missions complete`;
    const verb = next.state === 'in-progress' ? 'Resume' : 'Next up';
    return `${campaign.title}. ${standing}. ${verb}: ${next.mission.title}.`;
  }

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
      const unlocked = this.gameState.isMissionUnlocked(campaign, mission.id);

      // Per-stage results from each challenge's persisted progress; a challenge
      // with no progress row yet is 'not-started' (a grey dot).
      const perStage: StageResult[] = mission.challenges.map((challenge) => {
        const p = progress.find((entry) => entry.challengeId === challenge.id);
        if (!p) {
          return 'not-started';
        }
        if (p.firstAttemptCorrect) {
          return 'clean';
        }
        return p.isRemediated ? 'remediated' : 'open';
      });
      const attempted = perStage.filter((s) => s !== 'not-started').length;
      // Older saves completed before the Review Loop have no progress rows, so
      // only trust a completed breakdown when every stage is accounted for.
      const haveAllStages = completed && attempted === mission.challenges.length;

      const state: MissionState = completed
        ? 'completed'
        : !unlocked
          ? 'locked'
          : attempted > 0
            ? 'in-progress'
            : 'available';

      // Stages to render as dots: results for a fully-tracked completion, the
      // in-progress mix, all grey for an untouched available mission, none for
      // locked or legacy completions.
      const stages: StageResult[] =
        state === 'locked' || (state === 'completed' && !haveAllStages) ? [] : perStage;

      const outstandingDebt = debt.filter(
        (item) =>
          item.missionId === mission.id &&
          (item.status === 'open' || item.status === 'reopened' || item.status === 'in-review')
      ).length;

      let status: MissionStatus | null = null;
      if (completed) {
        if (haveAllStages) {
          const open = perStage.filter((s) => s === 'open').length;
          const remediated = perStage.filter((s) => s === 'remediated').length;
          status = open > 0 ? 'partial' : remediated > 0 ? 'remediated' : 'perfect';
        } else {
          status = record?.perfect ? 'perfect' : 'partial';
        }
      }

      return {
        mission,
        index,
        unlocked,
        completed,
        state,
        actionLabel: ACTION_LABELS[state],
        status,
        stages,
        outstandingDebt,
        stageSummary:
          state === 'completed'
            ? haveAllStages
              ? summariseStages(perStage)
              : ''
            : state === 'locked'
              ? ''
              : `${attempted} / ${mission.challenges.length} stage${mission.challenges.length === 1 ? '' : 's'}`,
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

  /** Whether the player has attempted anything in this campaign yet. */
  protected readonly hasAttempted = computed(() => this.learning().firstAttempt.total > 0);

  /** Campaign completion: how many of its missions are done, and the ratio. */
  protected readonly progress = computed(() => {
    const campaign = this.campaign();
    if (!campaign) {
      return { done: 0, total: 0, ratio: 0 };
    }
    const done = campaign.missions.filter((id) => this.gameState.isMissionCompleted(id)).length;
    return { done, total: campaign.missions.length, ratio: this.gameState.campaignProgress(campaign) };
  });

  // Live platform meters (03_GAMEPLAY_SYSTEMS.md) — the heartbeat of the run.
  protected readonly meters = computed(() => this.gameState.meters());
  protected readonly stabilityHealth = computed(() => stabilityHealth(this.meters().stability));
  protected readonly debtHealth = computed(() => debtHealth(this.meters().technicalDebt));

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

const ACTION_LABELS: Record<MissionState, string> = {
  completed: 'Replay',
  'in-progress': 'Resume',
  available: 'Start',
  locked: 'Start',
};

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
