import { Injectable, computed, inject, signal } from '@angular/core';
import {
  ChallengeDefinition,
  EvaluationResult,
  HintDefinition,
  MissionDefinition,
  MissionScore,
  evaluateChallenge,
  missionScore,
} from '@academy/content-model';
import { GameStateService, MissionCompletionOutcome } from './game-state.service';
import { ContentService } from './content.service';

export type MissionPhase = 'briefing' | 'challenge' | 'results';

/** Mission end states (03_GAMEPLAY_SYSTEMS.md — no hard failure screens). */
export type MissionOutcome = 'perfect' | 'stable' | 'partial';

export interface ChallengeRun {
  challenge: ChallengeDefinition;
  attempts: number;
  hintsRevealed: number;
  completed: boolean;
  firstTryCorrect: boolean;
  finalScoreRatio: number;
  lastEvaluation: EvaluationResult | null;
}

export interface MissionResult {
  outcome: MissionOutcome;
  score: MissionScore;
  missionXpBonus: number;
  totalXp: number;
  completion: MissionCompletionOutcome;
}

/** Attempts after which the player may accept a partial result and move on. */
const PARTIAL_ACCEPT_ATTEMPTS = 2;

/**
 * Runtime state machine for playing one mission:
 * briefing → challenges (submit / hint / retry) → results.
 */
@Injectable({ providedIn: 'root' })
export class MissionSessionService {
  private readonly gameState = inject(GameStateService);
  private readonly content = inject(ContentService);

  private readonly missionSignal = signal<MissionDefinition | null>(null);
  private readonly phaseSignal = signal<MissionPhase>('briefing');
  private readonly indexSignal = signal(0);
  private readonly runsSignal = signal<ChallengeRun[]>([]);
  private readonly resultSignal = signal<MissionResult | null>(null);

  readonly mission = this.missionSignal.asReadonly();
  readonly phase = this.phaseSignal.asReadonly();
  readonly challengeIndex = this.indexSignal.asReadonly();
  readonly runs = this.runsSignal.asReadonly();
  readonly result = this.resultSignal.asReadonly();

  readonly currentRun = computed<ChallengeRun | null>(
    () => this.runsSignal()[this.indexSignal()] ?? null
  );

  readonly totalChallenges = computed(() => this.runsSignal().length);

  readonly revealedHints = computed<HintDefinition[]>(() => {
    const run = this.currentRun();
    if (!run) {
      return [];
    }
    return sortedHints(run.challenge).slice(0, run.hintsRevealed);
  });

  readonly nextHint = computed<HintDefinition | null>(() => {
    const run = this.currentRun();
    if (!run) {
      return null;
    }
    return sortedHints(run.challenge)[run.hintsRevealed] ?? null;
  });

  readonly canAcceptPartial = computed(() => {
    const run = this.currentRun();
    return (
      !!run &&
      !run.completed &&
      run.attempts >= PARTIAL_ACCEPT_ATTEMPTS &&
      run.lastEvaluation !== null
    );
  });

  start(mission: MissionDefinition): void {
    this.missionSignal.set(mission);
    this.phaseSignal.set('briefing');
    this.indexSignal.set(0);
    this.resultSignal.set(null);
    this.runsSignal.set(
      mission.challenges.map((challenge) => ({
        challenge,
        attempts: 0,
        hintsRevealed: 0,
        completed: false,
        firstTryCorrect: false,
        finalScoreRatio: 0,
        lastEvaluation: null,
      }))
    );
  }

  beginChallenges(): void {
    this.phaseSignal.set('challenge');
  }

  revealNextHint(): HintDefinition | null {
    const hint = this.nextHint();
    if (!hint) {
      return null;
    }
    this.updateCurrentRun((run) => ({ ...run, hintsRevealed: run.hintsRevealed + 1 }));
    return hint;
  }

  submit(selectedIds: string[]): EvaluationResult | null {
    const run = this.currentRun();
    if (!run || run.completed) {
      return null;
    }

    const evaluation = evaluateChallenge(run.challenge, { selectedIds });
    const attempts = run.attempts + 1;

    this.updateCurrentRun((current) => ({
      ...current,
      attempts,
      lastEvaluation: evaluation,
      completed: evaluation.correct,
      firstTryCorrect: evaluation.correct && attempts === 1,
      finalScoreRatio: evaluation.correct ? 1 : current.finalScoreRatio,
    }));

    if (!evaluation.correct) {
      this.gameState.applyConsequences(run.challenge.consequences);
    }

    return evaluation;
  }

  /** Accept a partial result after repeated attempts and move on. */
  acceptPartial(): void {
    const run = this.currentRun();
    if (!run || !this.canAcceptPartial()) {
      return;
    }
    this.updateCurrentRun((current) => ({
      ...current,
      completed: true,
      finalScoreRatio: current.lastEvaluation?.scoreRatio ?? 0,
    }));
  }

  /** Advance to the next challenge, or finish the mission on the last one. */
  advance(): void {
    const mission = this.missionSignal();
    if (!mission) {
      return;
    }
    if (this.indexSignal() < this.runsSignal().length - 1) {
      this.indexSignal.update((index) => index + 1);
    } else {
      this.finish(mission);
    }
  }

  reset(): void {
    this.missionSignal.set(null);
    this.runsSignal.set([]);
    this.resultSignal.set(null);
    this.phaseSignal.set('briefing');
    this.indexSignal.set(0);
  }

  private finish(mission: MissionDefinition): void {
    const runs = this.runsSignal();

    const score = missionScore({
      perfect: runs.every((run) => run.firstTryCorrect),
      challenges: runs.map((run) => ({
        difficulty: run.challenge.difficulty,
        scoreRatio: run.finalScoreRatio,
        hintsUsed: sortedHints(run.challenge).slice(0, run.hintsRevealed),
      })),
    });

    const missionXpBonus = mission.rewards
      .filter((reward) => reward.type === 'xp')
      .reduce((sum, reward) => sum + (reward.amount ?? 0), 0);
    const totalXp = score.totalXp + missionXpBonus;

    const outcome: MissionOutcome = runs.every((run) => run.firstTryCorrect)
      ? 'perfect'
      : runs.every((run) => run.finalScoreRatio === 1)
        ? 'stable'
        : 'partial';

    const badgeIds = mission.rewards
      .filter((reward) => reward.type === 'badge' && reward.id)
      .map((reward) => reward.id as string);

    const completion = this.gameState.completeMission(
      {
        missionId: mission.id,
        scoreRatio: average(runs.map((run) => run.finalScoreRatio)),
        xpEarned: totalXp,
        perfect: outcome === 'perfect',
        noHints: runs.every((run) => run.hintsRevealed === 0),
      },
      [...badgeIds, ...this.campaignBadges(mission)]
    );

    // Completing a mission is a recovery action: the platform breathes again.
    this.gameState.applyConsequences([
      { type: 'stability', delta: 5, reason: 'Mission resolved' },
      { type: 'team-confidence', delta: 5, reason: 'Clear engineering communication' },
    ]);

    this.resultSignal.set({ outcome, score, missionXpBonus, totalXp, completion });
    this.phaseSignal.set('results');
  }

  /** Campaign badges unlock when this mission completes its campaign. */
  private campaignBadges(mission: MissionDefinition): string[] {
    const campaign = this.content.campaignById(mission.campaignId);
    if (!campaign) {
      return [];
    }
    const remaining = campaign.missions.filter(
      (missionId) => missionId !== mission.id && !this.gameState.isMissionCompleted(missionId)
    );
    if (remaining.length > 0) {
      return [];
    }
    return campaign.rewards
      .filter((reward) => reward.type === 'badge' && reward.id)
      .map((reward) => reward.id as string);
  }

  private updateCurrentRun(update: (run: ChallengeRun) => ChallengeRun): void {
    const index = this.indexSignal();
    this.runsSignal.update((runs) =>
      runs.map((run, i) => (i === index ? update(run) : run))
    );
  }
}

function sortedHints(challenge: ChallengeDefinition): HintDefinition[] {
  return [...challenge.hints].sort((a, b) => a.level - b.level);
}

function average(values: number[]): number {
  return values.length === 0 ? 0 : values.reduce((sum, v) => sum + v, 0) / values.length;
}
