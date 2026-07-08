import { Injectable, computed, inject, signal } from '@angular/core';
import {
  CampaignDefinition,
  ConsequenceDefinition,
  MissionRecord,
  PlayerSettings,
  PlayerState,
  Rank,
  applyConsequence,
  createPlayerState,
  initialMeters,
  levelForXp,
  levelProgress,
  nextRank,
  playerStateSchema,
  rankForXp,
  rankProgress,
} from '@academy/content-model';
import { PersistenceService } from './persistence.service';

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
    const result = playerStateSchema.safeParse(parsed);
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
