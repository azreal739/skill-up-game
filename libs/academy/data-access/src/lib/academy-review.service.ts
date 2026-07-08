import { Injectable, inject } from '@angular/core';
import {
  ChallengeDefinition,
  EvaluationResult,
  Rank,
  TechnicalDebtItem,
  TechnicalDebtStatus,
  XP_BY_DIFFICULTY,
  evaluateChallenge,
} from '@academy/content-model';
import { GameStateService } from './game-state.service';
import { ContentService } from './content.service';

/** Fraction of the challenge's difficulty XP granted for a remediation. */
export const REMEDIATION_RATIO = 0.4;

export interface ReviewResult {
  evaluation: EvaluationResult;
  remediated: boolean;
  xpAwarded: number;
  status: TechnicalDebtStatus;
  rankBefore: Rank;
  rankAfter: Rank;
}

/**
 * Academy Review mode (Review Loop spec 05): replay a filed Technical Debt
 * item's challenge and remediate it. This service owns the content lookup and
 * evaluation; GameStateService owns the persisted state transition.
 */
@Injectable({ providedIn: 'root' })
export class AcademyReviewService {
  private readonly gameState = inject(GameStateService);
  private readonly content = inject(ContentService);

  /** The challenge behind a debt item, if the content still resolves. */
  challengeForItem(item: TechnicalDebtItem): ChallengeDefinition | undefined {
    return this.content.challengeById(item.missionId, item.challengeId);
  }

  /** XP a successful remediation of this challenge would earn. */
  remediationXpFor(challenge: ChallengeDefinition): number {
    return Math.max(1, Math.floor(XP_BY_DIFFICULTY[challenge.difficulty] * REMEDIATION_RATIO));
  }

  /** Mark the item In Review when the player opens the review screen. */
  beginReview(debtItemId: string): void {
    this.gameState.markDebtInReview(debtItemId);
  }

  /**
   * Submit a review answer. Returns null if the item or its content cannot be
   * resolved. On success the item is remediated and remediation XP is credited
   * once; on a miss it is reopened with no XP.
   */
  review(debtItemId: string, selectedIds: string[]): ReviewResult | null {
    const item = this.gameState.debtItemById(debtItemId);
    if (!item) {
      return null;
    }
    const challenge = this.challengeForItem(item);
    if (!challenge) {
      return null;
    }

    const evaluation = evaluateChallenge(challenge, { selectedIds });
    const outcome = this.gameState.recordReviewOutcome({
      debtItemId,
      challengeId: challenge.id,
      missionId: item.missionId,
      campaignId: item.campaignId,
      selectedAnswerIds: selectedIds,
      isCorrect: evaluation.correct,
      remediationXp: this.remediationXpFor(challenge),
    });

    return {
      evaluation,
      remediated: outcome.remediated,
      xpAwarded: outcome.xpAwarded,
      status: this.gameState.debtItemById(debtItemId)?.status ?? item.status,
      rankBefore: outcome.rankBefore,
      rankAfter: outcome.rankAfter,
    };
  }
}
