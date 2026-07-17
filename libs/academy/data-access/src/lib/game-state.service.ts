import { Injectable, computed, inject, signal } from '@angular/core';
import {
  CampaignDefinition,
  ChallengeAttempt,
  ChallengeProgress,
  ConsequenceDefinition,
  MissionRecord,
  NoteLinkType,
  PlayerNote,
  PlayerSettings,
  PlayerState,
  Rank,
  TechnicalDebtItem,
  TechnicalDebtStatus,
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

/** A remediation attempt against a filed debt item (Review Loop spec 05/08). */
export interface ReviewOutcomeInput {
  debtItemId: string;
  challengeId: string;
  missionId: string;
  campaignId: string;
  selectedAnswerIds: string[];
  isCorrect: boolean;
  /** Remediation XP to credit — only on the first successful remediation. */
  remediationXp: number;
}

export interface ReviewOutcomeResult {
  attempt: ChallengeAttempt;
  remediated: boolean;
  /** Remediation XP credited for this attempt (0 for a miss or a repeat). */
  xpAwarded: number;
  /** One-time milestone bonus for clearing a mission's / campaign's debt. */
  bonusXp: number;
  /** Achievement badges newly unlocked by this review. */
  newBadges: string[];
  rankBefore: Rank;
  rankAfter: Rank;
}

/** One-time XP bonuses for clearing all debt in a mission / campaign (spec 08). */
const MISSION_REMEDIATION_BONUS = 20;
const CAMPAIGN_REMEDIATION_BONUS = 75;
/** Remediations needed for the Review Champion achievement. */
const REVIEW_CHAMPION_THRESHOLD = 10;

/** The fields a player supplies when writing a note (Review Loop spec 06). */
export interface NoteInput {
  title: string;
  body: string;
  tags: string[];
  pinned?: boolean;
  linkedEntityType: NoteLinkType;
  /** Empty for a `general` note. */
  linkedEntityId: string;
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

  /** Adopt a validated accountless save after the player explicitly opts in. */
  adoptUnscopedSave(): boolean {
    const state = this.persistence.adoptUnscopedSave();
    if (!state) {
      return false;
    }
    this.stateSignal.set(state);
    return true;
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

  /** Mark a debt item as being worked on when the player opens Review. */
  markDebtInReview(debtItemId: string): void {
    const item = this.debtItemById(debtItemId);
    if (!item || (item.status !== 'open' && item.status !== 'reopened')) {
      return; // Nothing to change — avoid a needless write.
    }
    const now = new Date().toISOString();
    this.mutate((state) => ({
      ...state,
      technicalDebtItems: state.technicalDebtItems.map((i) =>
        i.id === debtItemId ? { ...i, status: 'in-review', updatedAt: now } : i
      ),
    }));
  }

  /**
   * Records an Academy Review attempt: appends a review attempt, updates the
   * challenge's progress and the debt item's status, and — on the first
   * successful remediation only — credits remediation XP. The original first
   * attempt is never touched, and a correct review does not restore
   * perfect-mission eligibility (Review Loop spec 05/08).
   */
  recordReviewOutcome(input: ReviewOutcomeInput): ReviewOutcomeResult {
    const state = this.requireState();
    const now = new Date().toISOString();
    const item = state.technicalDebtItems.find((i) => i.id === input.debtItemId);
    const alreadyRemediated = item?.status === 'remediated';
    const willAward = input.isCorrect && !alreadyRemediated;
    const xpAwarded = willAward ? input.remediationXp : 0;

    const attempt: ChallengeAttempt = {
      id: createId('att'),
      challengeId: input.challengeId,
      missionId: input.missionId,
      campaignId: input.campaignId,
      mode: 'review',
      selectedAnswerIds: input.selectedAnswerIds,
      isCorrect: input.isCorrect,
      submittedAt: now,
      xpAwarded,
    };

    const existing = state.challengeProgress.find((p) => p.challengeId === input.challengeId);
    const progress: ChallengeProgress = existing
      ? {
          ...existing,
          latestAttemptId: attempt.id,
          latestAttemptCorrect: input.isCorrect,
          totalAttempts: existing.totalAttempts + 1,
          reviewAttempts: existing.reviewAttempts + 1,
          isRemediated: existing.isRemediated || input.isCorrect,
          remediatedAt: existing.isRemediated
            ? existing.remediatedAt
            : input.isCorrect
              ? now
              : existing.remediatedAt,
          technicalDebtItemId: existing.technicalDebtItemId ?? input.debtItemId,
        }
      : {
          challengeId: input.challengeId,
          missionId: input.missionId,
          campaignId: input.campaignId,
          latestAttemptId: attempt.id,
          latestAttemptCorrect: input.isCorrect,
          totalAttempts: 1,
          reviewAttempts: 1,
          isRemediated: input.isCorrect,
          remediatedAt: input.isCorrect ? now : undefined,
          technicalDebtItemId: input.debtItemId,
        };
    const challengeProgress = existing
      ? state.challengeProgress.map((p) => (p.challengeId === input.challengeId ? progress : p))
      : [...state.challengeProgress, progress];

    const technicalDebtItems = state.technicalDebtItems.map((i) => {
      if (i.id !== input.debtItemId) {
        return i;
      }
      const status: TechnicalDebtStatus = alreadyRemediated
        ? 'remediated'
        : input.isCorrect
          ? 'remediated'
          : 'reopened';
      return {
        ...i,
        status,
        updatedAt: now,
        remediatedAt: input.isCorrect ? (i.remediatedAt ?? now) : i.remediatedAt,
        reviewAttemptIds: [...i.reviewAttemptIds, attempt.id],
      };
    });

    // Remediation milestones (spec 08): clearing the last open debt for a
    // mission or campaign earns a one-time bonus + achievement. Gated on the
    // badge so reopening and re-remediating can't farm the bonus.
    let bonusXp = 0;
    const newBadges: string[] = [];
    const earn = (id: string) => {
      if (!state.badges.includes(id) && !newBadges.includes(id)) {
        newBadges.push(id);
      }
    };
    if (input.isCorrect) {
      const remediatedCount = technicalDebtItems.filter((i) => i.status === 'remediated').length;
      if (
        allDebtRemediated(technicalDebtItems, (i) => i.missionId === input.missionId) &&
        !state.badges.includes('lesson-learned')
      ) {
        earn('lesson-learned');
        bonusXp += MISSION_REMEDIATION_BONUS;
      }
      if (
        allDebtRemediated(technicalDebtItems, (i) => i.campaignId === input.campaignId) &&
        !state.badges.includes('debt-destroyer')
      ) {
        earn('debt-destroyer');
        bonusXp += CAMPAIGN_REMEDIATION_BONUS;
      }
      if (remediatedCount >= REVIEW_CHAMPION_THRESHOLD) {
        earn('review-champion');
      }
    }

    const rankBefore = rankForXp(state.xp);
    const nextXp = state.xp + xpAwarded + bonusXp;
    this.commit({
      ...state,
      xp: nextXp,
      badges: [...state.badges, ...newBadges],
      challengeAttempts: [...state.challengeAttempts, attempt],
      challengeProgress,
      technicalDebtItems,
    });

    return {
      attempt,
      remediated: input.isCorrect,
      xpAwarded,
      bonusXp,
      newBadges,
      rankBefore,
      rankAfter: rankForXp(nextXp),
    };
  }

  /** Notes attached to a given entity, newest first (Review Loop spec 06). */
  notesForEntity(type: NoteLinkType, id: string): PlayerNote[] {
    return this.notes()
      .filter((note) => note.linkedEntityType === type && note.linkedEntityId === id)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  noteById(id: string): PlayerNote | undefined {
    return this.notes().find((note) => note.id === id);
  }

  /**
   * Creates a note. When it links to a Technical Debt item the item's
   * `noteIds` list is kept in sync in the same commit so the backlog can show
   * that the concept has captured reflections.
   */
  createNote(input: NoteInput): PlayerNote {
    const now = new Date().toISOString();
    const note: PlayerNote = {
      id: createId('note'),
      title: input.title,
      body: input.body,
      tags: input.tags,
      pinned: input.pinned ?? false,
      linkedEntityType: input.linkedEntityType,
      linkedEntityId: input.linkedEntityId,
      createdAt: now,
      updatedAt: now,
    };
    this.mutate((state) => ({
      ...state,
      notes: [...state.notes, note],
      technicalDebtItems: linkNoteToDebt(state.technicalDebtItems, note),
    }));
    return note;
  }

  /** Updates the editable fields of a note; leaves links and timestamps intact. */
  updateNote(
    id: string,
    patch: Partial<Pick<PlayerNote, 'title' | 'body' | 'tags' | 'pinned'>>
  ): void {
    const now = new Date().toISOString();
    this.mutate((state) => ({
      ...state,
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...patch, updatedAt: now } : note
      ),
    }));
  }

  toggleNotePin(id: string): void {
    const now = new Date().toISOString();
    this.mutate((state) => ({
      ...state,
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned, updatedAt: now } : note
      ),
    }));
  }

  deleteNote(id: string): void {
    this.mutate((state) => ({
      ...state,
      notes: state.notes.filter((note) => note.id !== id),
      technicalDebtItems: state.technicalDebtItems.map((item) =>
        item.noteIds.includes(id)
          ? { ...item, noteIds: item.noteIds.filter((n) => n !== id) }
          : item
      ),
    }));
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

/**
 * True when a scope (mission or campaign, chosen by `inScope`) has at least one
 * debt item and every item in that scope is remediated — i.e. the last one was
 * just cleared.
 */
function allDebtRemediated(
  items: TechnicalDebtItem[],
  inScope: (item: TechnicalDebtItem) => boolean
): boolean {
  const scoped = items.filter(inScope);
  return scoped.length > 0 && scoped.every((item) => item.status === 'remediated');
}

/** Adds a note's id to its linked Technical Debt item, if it links to one. */
function linkNoteToDebt(items: TechnicalDebtItem[], note: PlayerNote): TechnicalDebtItem[] {
  if (note.linkedEntityType !== 'technical-debt') {
    return items;
  }
  return items.map((item) =>
    item.id === note.linkedEntityId && !item.noteIds.includes(note.id)
      ? { ...item, noteIds: [...item.noteIds, note.id] }
      : item
  );
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
