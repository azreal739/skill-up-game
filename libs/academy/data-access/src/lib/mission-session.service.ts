import { Injectable, computed, inject, signal } from '@angular/core';
import {
  ChallengeDefinition,
  EvaluationResult,
  HintDefinition,
  MissionDefinition,
  MissionScore,
  TechnicalDebtItem,
  XP_BY_DIFFICULTY,
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
  /** Technical Debt item filed when this challenge was missed, if any. */
  debtItem: TechnicalDebtItem | null;
}

export interface MissionResult {
  outcome: MissionOutcome;
  score: MissionScore;
  missionXpBonus: number;
  totalXp: number;
  completion: MissionCompletionOutcome;
}

/**
 * Runtime state machine for playing one mission:
 * briefing → challenges (submit / hint) → results. The first answer to each
 * challenge is locked in — a miss is recorded as Technical Debt and the
 * mission continues rather than allowing an immediate retry (Review Loop
 * spec 02).
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
        debtItem: null,
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

  /**
   * Submit the answer for the current challenge. The first submission is
   * final: a correct answer scores full credit, a miss scores nothing, files
   * Technical Debt and applies its consequence once. A locked challenge
   * ignores further submissions (no brute-force retry).
   */
  submit(selectedIds: string[]): EvaluationResult | null {
    const mission = this.missionSignal();
    const run = this.currentRun();
    if (!mission || !run || run.completed) {
      return null;
    }

    const evaluation = evaluateChallenge(run.challenge, { selectedIds });
    const { challenge } = run;

    const outcome = this.gameState.recordMissionOutcome({
      challengeId: challenge.id,
      missionId: mission.id,
      campaignId: mission.campaignId,
      challengeTitle: challenge.title,
      conceptTags: challenge.tags,
      selectedAnswerIds: selectedIds,
      correctAnswerIds: correctAnswerIds(challenge),
      isCorrect: evaluation.correct,
      xpAwarded: evaluation.correct ? XP_BY_DIFFICULTY[challenge.difficulty] : 0,
      consequences: challenge.consequences,
      explanation: challenge.failureFeedback,
      whyItMatters: whyItMatters(challenge),
      relatedHelpTopicIds: challenge.helpLinks.map((link) => link.topicId),
    });

    this.updateCurrentRun((current) => ({
      ...current,
      attempts: current.attempts + 1,
      lastEvaluation: evaluation,
      completed: true,
      firstTryCorrect: evaluation.correct,
      finalScoreRatio: evaluation.correct ? 1 : 0,
      debtItem: outcome.debtItem,
    }));

    return evaluation;
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

    // Clearing a mission with every first decision correct is a mastery
    // achievement (Review Loop spec 08).
    if (outcome === 'perfect') {
      badgeIds.push('first-attempt-hero');
    }

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

/** The ids of every correct option/finding for a challenge. */
function correctAnswerIds(challenge: ChallengeDefinition): string[] {
  const options = challenge.type === 'code-review' ? challenge.findings : challenge.options;
  return options.filter((option) => option.isCorrect).map((option) => option.id);
}

/**
 * Why a miss matters: the authored consequence reasons (phrased as the
 * failure's real-world cost) fall back to the challenge's failure feedback.
 */
function whyItMatters(challenge: ChallengeDefinition): string {
  const reasons = challenge.consequences.map((c) => c.reason).filter(Boolean);
  return reasons.length > 0 ? reasons.join(' ') : challenge.failureFeedback;
}

function average(values: number[]): number {
  return values.length === 0 ? 0 : values.reduce((sum, v) => sum + v, 0) / values.length;
}
