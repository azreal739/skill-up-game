import { Injectable, computed, inject, signal } from '@angular/core';
import {
  CampaignDefinition,
  ChallengeAttempt,
  ChallengeProgress,
  ConsequenceDefinition,
  MissionRecord,
  PlayerSettings,
  PlayerState,
  Rank,
  TechnicalDebtItem,
  applyConsequence,
  createPlayerState,
  initialMeters,
  levelForXp,
  levelProgress,
  migrateSave,
  nextRank,
  playerStateSchema,
  rankForXp,
  rankProgress,
} from '@academy/content-model';
import { PersistenceService } from './persistence.service';
import { createId } from './id';

export interface MissionCompletionInput {
  missionId: string;
  scoreRatio: number;
  xpEarned: number;
  perfect: boolean;
  noHints: boolean;
}

export interface MissionCompletionOutcome {
  /** XP actually credited (replays only credit improvements over the best run). */
  xpAwarded: number;
  newBadges: string[];
  rankBefore: Rank;
  rankAfter: Rank;
}

/**
 * A single challenge decision to record: the answer, whether it was correct,
 * and the context needed to file a Technical Debt item if it was a first-try
 * miss during a mission (Review Loop spec 03/04).
 */
export interface ChallengeOutcomeInput {
  challengeId: string;
  missionId: string;
  campaignId: string;
  challengeTitle: string;
  conceptTags: string[];
  selectedAnswerIds: string[];
  correctAnswerIds: string[];
  isCorrect: boolean;
  /** Challenge XP this decision earns (0 for a first-try miss — see spec 08). */
  xpAwarded: number;
  /** Consequences to apply to the meters (only on a wrong answer). */
  consequences: ConsequenceDefinition[];
  explanation: string;
  whyItMatters: string;
  relatedHelpTopicIds: string[];
}

export interface ChallengeOutcomeResult {
  attempt: ChallengeAttempt;
  /** The debt item created or reopened by a first-try miss, if any. */
  debtItem: TechnicalDebtItem | null;
}

/**
 * Central player state store built on signals. Every transition is an
 * explicit method that updates the signal and persists the result
 * (11_TECHNICAL_ARCHITECTURE.md: keep state transitions explicit).
 */
@Injectable({ providedIn: 'root' })
export class GameStateService {
  private readonly persistence = inject(PersistenceService);

  private readonly stateSignal = signal<PlayerState | null>(this.persistence.load());

  readonly state = this.stateSignal.asReadonly();
  readonly hasProfile = computed(() => this.stateSignal() !== null);
  readonly xp = computed(() => this.stateSignal()?.xp ?? 0);
  readonly rank = computed(() => rankForXp(this.xp()));
  readonly nextRank = computed(() => nextRank(this.xp()));
  readonly rankProgress = computed(() => rankProgress(this.xp()));
  readonly level = computed(() => levelForXp(this.xp()));
  readonly levelProgress = computed(() => levelProgress(this.xp()));
  readonly badges = computed(() => this.stateSignal()?.badges ?? []);
  readonly meters = computed(() => this.stateSignal()?.meters ?? initialMeters());
  readonly settings = computed(
    () => this.stateSignal()?.settings ?? createPlayerState('').settings
  );

  // Technical Debt Review Loop read surface (Review Loop spec 04/07).
  readonly technicalDebtItems = computed(() => this.stateSignal()?.technicalDebtItems ?? []);
  readonly challengeProgress = computed(() => this.stateSignal()?.challengeProgress ?? []);
  readonly challengeAttempts = computed(() => this.stateSignal()?.challengeAttempts ?? []);
  readonly notes = computed(() => this.stateSignal()?.notes ?? []);
  /** Debt still awaiting remediation (open or reopened). */
  readonly openDebtCount = computed(
    () =>
      this.technicalDebtItems().filter(
        (item) => item.status === 'open' || item.status === 'reopened'
      ).length
  );

  debtItemById(id: string): TechnicalDebtItem | undefined {
    return this.technicalDebtItems().find((item) => item.id === id);
  }

  /** The open/reopened/in-review debt item for a challenge, if one exists. */
  activeDebtForChallenge(challengeId: string): TechnicalDebtItem | undefined {
    return this.technicalDebtItems().find(
      (item) => item.challengeId === challengeId && item.status !== 'remediated'
    );
  }

  progressForChallenge(challengeId: string): ChallengeProgress | undefined {
    return this.challengeProgress().find((p) => p.challengeId === challengeId);
  }

  createProfile(name: string, callsign = ''): void {
    this.commit(createPlayerState(name, callsign));
  }

  resetProgress(): void {
    this.persistence.clear();
    this.stateSignal.set(null);
  }

  /** Serialise the current save for export (facilitation / backup). */
  exportState(): string {
    return JSON.stringify(this.requireState(), null, 2);
  }

  /**
   * Validate and load an exported save. Returns false (and changes nothing)
   * if the JSON is malformed or fails player-state validation — the same
   * boundary discipline the game teaches.
   */
  importState(rawJson: string): boolean {
    let parsed: unknown;
    try {
      parsed = JSON.parse(rawJson);
    } catch {
      return false;
    }
    const result = playerStateSchema.safeParse(migrateSave(parsed));
    if (!result.success) {
      return false;
    }
    this.commit(result.data);
    return true;
  }

  updateSettings(patch: Partial<PlayerSettings>): void {
    this.mutate((state) => ({ ...state, settings: { ...state.settings, ...patch } }));
  }

  applyConsequences(consequences: ConsequenceDefinition[]): void {
    if (consequences.length === 0) {
      return;
    }
    this.mutate((state) => ({
      ...state,
      meters: consequences.reduce(applyConsequence, state.meters),
    }));
  }

  missionRecord(missionId: string): MissionRecord | undefined {
    return this.stateSignal()?.completedMissions[missionId];
  }

  isMissionCompleted(missionId: string): boolean {
    return this.missionRecord(missionId) !== undefined;
  }

  /** Missions unlock in campaign order; the first is always available. */
  isMissionUnlocked(campaign: CampaignDefinition, missionId: string): boolean {
    const index = campaign.missions.indexOf(missionId);
    if (index <= 0) {
      return index === 0;
    }
    return this.isMissionCompleted(campaign.missions[index - 1]);
  }

  campaignProgress(campaign: CampaignDefinition): number {
    if (campaign.missions.length === 0) {
      return 0;
    }
    const done = campaign.missions.filter((id) => this.isMissionCompleted(id)).length;
    return done / campaign.missions.length;
  }

  isCampaignCompleted(campaign: CampaignDefinition): boolean {
    return campaign.missions.every((id) => this.isMissionCompleted(id));
  }

  /**
   * A campaign is unlocked when it has no prerequisite, or its prerequisite
   * campaign is complete. The caller resolves the prerequisite definition
   * (data-access has no content lookup of its own).
   */
  isCampaignUnlocked(
    campaign: CampaignDefinition,
    prerequisite?: CampaignDefinition
  ): boolean {
    if (!campaign.requiredCampaignId) {
      return true;
    }
    return prerequisite ? this.isCampaignCompleted(prerequisite) : false;
  }

  /**
   * Records a mission run. First completions credit their full XP; replays
   * credit only the improvement over the best previous run, so grinding a
   * mission cannot farm XP but a better score is always worth replaying.
   */
  completeMission(
    input: MissionCompletionInput,
    badgeIds: string[]
  ): MissionCompletionOutcome {
    const state = this.requireState();
    const rankBefore = rankForXp(state.xp);
    const previous = state.completedMissions[input.missionId];
    const xpAwarded = previous
      ? Math.max(0, input.xpEarned - previous.bestXp)
      : input.xpEarned;

    const record: MissionRecord = {
      missionId: input.missionId,
      bestScoreRatio: Math.max(previous?.bestScoreRatio ?? 0, input.scoreRatio),
      bestXp: Math.max(previous?.bestXp ?? 0, input.xpEarned),
      timesCompleted: (previous?.timesCompleted ?? 0) + 1,
      perfect: (previous?.perfect ?? false) || input.perfect,
      noHints: (previous?.noHints ?? false) || input.noHints,
      completedAt: new Date().toISOString(),
    };

    const newBadges = badgeIds.filter((id) => !state.badges.includes(id));

    const next: PlayerState = {
      ...state,
      xp: state.xp + xpAwarded,
      badges: [...state.badges, ...newBadges],
      completedMissions: { ...state.completedMissions, [input.missionId]: record },
    };
    this.commit(next);

    return { xpAwarded, newBadges, rankBefore, rankAfter: rankForXp(next.xp) };
  }

  /**
   * Records one mission-mode challenge decision: appends the attempt, upserts
   * the challenge's progress, and — on a first-attempt miss — files (or reuses)
   * a Technical Debt item and applies the wrong-answer consequences. The whole
   * transition is one commit so the meters, history and backlog never drift.
   * First attempts are never overwritten by replays (Review Loop spec 05).
   */
  recordMissionOutcome(input: ChallengeOutcomeInput): ChallengeOutcomeResult {
    const state = this.requireState();
    const now = new Date().toISOString();

    const attempt: ChallengeAttempt = {
      id: createId('att'),
      challengeId: input.challengeId,
      missionId: input.missionId,
      campaignId: input.campaignId,
      mode: 'mission',
      selectedAnswerIds: input.selectedAnswerIds,
      isCorrect: input.isCorrect,
      submittedAt: now,
      xpAwarded: input.xpAwarded,
    };

    const existing = state.challengeProgress.find((p) => p.challengeId === input.challengeId);
    const isFirstAttempt = !existing || existing.firstAttemptId === undefined;

    let debtItems = state.technicalDebtItems;
    let debtItem: TechnicalDebtItem | null = null;
    if (isFirstAttempt && !input.isCorrect) {
      // Dedupe: never open a second live item for the same challenge.
      const active = debtItems.find(
        (item) => item.challengeId === input.challengeId && item.status !== 'remediated'
      );
      if (active) {
        debtItem = active;
      } else {
        debtItem = {
          id: createId('debt'),
          campaignId: input.campaignId,
          missionId: input.missionId,
          challengeId: input.challengeId,
          challengeTitle: input.challengeTitle,
          conceptTags: input.conceptTags,
          status: 'open',
          playerAnswerIds: input.selectedAnswerIds,
          correctAnswerIds: input.correctAnswerIds,
          explanation: input.explanation,
          whyItMatters: input.whyItMatters,
          relatedHelpTopicIds: input.relatedHelpTopicIds,
          consequenceSummary: summariseConsequences(input.consequences),
          createdAt: now,
          updatedAt: now,
          reviewAttemptIds: [],
          noteIds: [],
        };
        debtItems = [...debtItems, debtItem];
      }
    }

    const progress: ChallengeProgress = existing
      ? {
          ...existing,
          latestAttemptId: attempt.id,
          latestAttemptCorrect: input.isCorrect,
          totalAttempts: existing.totalAttempts + 1,
          technicalDebtItemId: existing.technicalDebtItemId ?? debtItem?.id,
        }
      : {
          challengeId: input.challengeId,
          missionId: input.missionId,
          campaignId: input.campaignId,
          firstAttemptId: attempt.id,
          firstAttemptCorrect: input.isCorrect,
          firstAttemptSubmittedAt: now,
          latestAttemptId: attempt.id,
          latestAttemptCorrect: input.isCorrect,
          totalAttempts: 1,
          reviewAttempts: 0,
          isRemediated: false,
          technicalDebtItemId: debtItem?.id,
        };

    const challengeProgress = existing
      ? state.challengeProgress.map((p) => (p.challengeId === input.challengeId ? progress : p))
      : [...state.challengeProgress, progress];

    const meters =
      !input.isCorrect && input.consequences.length > 0
        ? input.consequences.reduce(applyConsequence, state.meters)
        : state.meters;

    this.commit({
      ...state,
      meters,
      challengeAttempts: [...state.challengeAttempts, attempt],
      challengeProgress,
      technicalDebtItems: debtItems,
    });

    return { attempt, debtItem };
  }

  private mutate(update: (state: PlayerState) => PlayerState): void {
    this.commit(update(this.requireState()));
  }

  private requireState(): PlayerState {
    const state = this.stateSignal();
    if (!state) {
      throw new Error('No player profile exists yet');
    }
    return state;
  }

  private commit(state: PlayerState): void {
    this.stateSignal.set(state);
    this.persistence.save(state);
  }
}

const CONSEQUENCE_LABELS: Record<ConsequenceDefinition['type'], string> = {
  stability: 'Platform Stability',
  'technical-debt': 'Technical Debt',
  severity: 'Incident Severity',
  'team-confidence': 'Team Confidence',
  time: 'Delivery Time',
};

/**
 * Human-readable one-liner for a debt item's meter impact, e.g.
 * "Platform Stability −5 · Technical Debt +8". Signs are explicit so the
 * cost of the decision reads clearly on the backlog.
 */
function summariseConsequences(consequences: ConsequenceDefinition[]): string {
  if (consequences.length === 0) {
    return 'No lasting platform impact — but the concept still needs review.';
  }
  return consequences
    .map((c) => {
      const sign = c.delta > 0 ? '+' : '−';
      return `${CONSEQUENCE_LABELS[c.type]} ${sign}${Math.abs(c.delta)}`;
    })
    .join(' · ');
}
