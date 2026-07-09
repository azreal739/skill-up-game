import { Injectable, inject } from '@angular/core';
import { ChallengeProgress, TechnicalDebtItem } from '@academy/content-model';
import { GameStateService } from './game-state.service';
import { ContentService } from './content.service';

/** A correct/total pair with its derived ratio (0 when nothing attempted). */
export interface AccuracyStat {
  correct: number;
  total: number;
  ratio: number;
}

/** Concept (tag) mastery, split into strong and shaky sets. */
export interface ConceptMastery {
  mastered: string[];
  needingReview: string[];
}

export interface DebtSummary {
  open: number;
  inReview: number;
  remediated: number;
  reopened: number;
  total: number;
  /** Concepts appearing most often in still-open debt, worst first. */
  highestRiskConcepts: string[];
  /** Items still awaiting remediation (open or reopened), newest first. */
  reviewQueue: TechnicalDebtItem[];
}

export interface CampaignLearning {
  firstAttempt: AccuracyStat;
  afterReview: AccuracyStat;
  openDebt: number;
  remediatedDebt: number;
  strongestConcepts: string[];
  weakestConcepts: string[];
  /** Fraction of this campaign's debt that has been remediated (0 when none). */
  reviewCompletion: number;
}

/**
 * Derives the learning-dashboard metrics (Review Loop spec 07/08) from the
 * persisted challenge progress and debt backlog. Read-only: it aggregates
 * GameStateService data and resolves concept tags through ContentService, so
 * the store stays a pure persistence layer.
 */
@Injectable({ providedIn: 'root' })
export class LearningAnalyticsService {
  private readonly gameState = inject(GameStateService);
  private readonly content = inject(ContentService);

  /** Whether a challenge is "known": right first time, or since remediated. */
  private isGood(progress: ChallengeProgress): boolean {
    return progress.firstAttemptCorrect === true || progress.isRemediated;
  }

  private accuracy(progress: ChallengeProgress[], good: (p: ChallengeProgress) => boolean): AccuracyStat {
    const total = progress.length;
    const correct = progress.filter(good).length;
    return { correct, total, ratio: total === 0 ? 0 : correct / total };
  }

  /** Accuracy on the decision that counts: the first attempt. */
  firstAttemptAccuracy(progress = this.gameState.challengeProgress()): AccuracyStat {
    return this.accuracy(progress, (p) => p.firstAttemptCorrect === true);
  }

  /** Accuracy once Academy Review remediations are folded in. */
  afterReviewAccuracy(progress = this.gameState.challengeProgress()): AccuracyStat {
    return this.accuracy(progress, (p) => this.isGood(p));
  }

  private tagsFor(progress: ChallengeProgress): string[] {
    return this.content.challengeById(progress.missionId, progress.challengeId)?.tags ?? [];
  }

  /**
   * Rolls challenge progress up to concept tags. A concept is mastered when
   * every attempted challenge carrying that tag is known; it needs review when
   * at least one is not.
   */
  conceptMastery(progress = this.gameState.challengeProgress()): ConceptMastery {
    const totals = new Map<string, { total: number; good: number }>();
    for (const p of progress) {
      const good = this.isGood(p);
      for (const tag of this.tagsFor(p)) {
        const entry = totals.get(tag) ?? { total: 0, good: 0 };
        entry.total += 1;
        entry.good += good ? 1 : 0;
        totals.set(tag, entry);
      }
    }
    const mastered: string[] = [];
    const needingReview: string[] = [];
    for (const [tag, { total, good }] of totals) {
      (good === total ? mastered : needingReview).push(tag);
    }
    return { mastered: mastered.sort(), needingReview: needingReview.sort() };
  }

  /** Backlog rolled up by status, with the riskiest concepts surfaced. */
  debtSummary(items = this.gameState.technicalDebtItems()): DebtSummary {
    const count = (status: TechnicalDebtItem['status']) =>
      items.filter((item) => item.status === status).length;

    const openItems = items.filter(
      (item) => item.status === 'open' || item.status === 'reopened'
    );
    const riskByTag = new Map<string, number>();
    for (const item of openItems) {
      for (const tag of item.conceptTags) {
        riskByTag.set(tag, (riskByTag.get(tag) ?? 0) + 1);
      }
    }
    const highestRiskConcepts = [...riskByTag.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag]) => tag);

    return {
      open: count('open'),
      inReview: count('in-review'),
      remediated: count('remediated'),
      reopened: count('reopened'),
      total: items.length,
      highestRiskConcepts,
      reviewQueue: openItems
        .slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    };
  }

  /** Everything the profile / campaign screens show for one campaign. */
  campaignLearning(campaignId: string): CampaignLearning {
    const progress = this.gameState
      .challengeProgress()
      .filter((p) => p.campaignId === campaignId);
    const debt = this.gameState
      .technicalDebtItems()
      .filter((item) => item.campaignId === campaignId);

    const remediatedDebt = debt.filter((item) => item.status === 'remediated').length;
    const openDebt = debt.filter(
      (item) => item.status === 'open' || item.status === 'reopened'
    ).length;
    const concepts = this.conceptMastery(progress);

    return {
      firstAttempt: this.firstAttemptAccuracy(progress),
      afterReview: this.afterReviewAccuracy(progress),
      openDebt,
      remediatedDebt,
      strongestConcepts: concepts.mastered,
      weakestConcepts: concepts.needingReview,
      reviewCompletion: debt.length === 0 ? 0 : remediatedDebt / debt.length,
    };
  }
}
