import { TestBed } from '@angular/core/testing';
import { MissionDefinition } from '@academy/content-model';
import { LearningAnalyticsService } from './learning-analytics.service';
import { GameStateService } from './game-state.service';
import { MissionSessionService } from './mission-session.service';
import { AcademyReviewService } from './academy-review.service';
import { ContentService } from './content.service';

describe('LearningAnalyticsService', () => {
  let analytics: LearningAnalyticsService;
  let gameState: GameStateService;
  let session: MissionSessionService;
  let review: AcademyReviewService;
  let mission: MissionDefinition;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    analytics = TestBed.inject(LearningAnalyticsService);
    gameState = TestBed.inject(GameStateService);
    session = TestBed.inject(MissionSessionService);
    review = TestBed.inject(AcademyReviewService);
    gameState.createProfile('Avery');
    mission = TestBed.inject(ContentService).missionById('foundations-001-welcome')!;
    session.reset();
  });

  afterEach(() => localStorage.clear());

  it('counts a first-attempt miss as inaccurate and its concept as needing review', () => {
    session.start(mission);
    session.beginChallenges();
    session.submit(['b']); // wrong (correct is 'a')

    const first = analytics.firstAttemptAccuracy();
    expect(first.total).toBe(1);
    expect(first.correct).toBe(0);
    expect(first.ratio).toBe(0);

    const concepts = analytics.conceptMastery();
    expect(concepts.mastered).toEqual([]);
    for (const tag of mission.challenges[0].tags) {
      expect(concepts.needingReview).toContain(tag);
    }
  });

  it('folds a remediation into after-review accuracy without changing first-attempt', () => {
    session.start(mission);
    session.beginChallenges();
    session.submit(['b']); // wrong
    const debt = gameState.technicalDebtItems()[0];
    review.review(debt.id, debt.correctAnswerIds); // correct

    expect(analytics.firstAttemptAccuracy().correct).toBe(0); // record is preserved
    expect(analytics.afterReviewAccuracy().correct).toBe(1);

    const concepts = analytics.conceptMastery();
    for (const tag of mission.challenges[0].tags) {
      expect(concepts.mastered).toContain(tag);
    }
    expect(concepts.needingReview).toEqual([]);
  });

  it('summarises campaign learning and debt', () => {
    session.start(mission);
    session.beginChallenges();
    session.submit(['b']); // wrong → files debt

    let learning = analytics.campaignLearning(mission.campaignId);
    expect(learning.firstAttempt.correct).toBe(0);
    expect(learning.afterReview.correct).toBe(0);
    expect(learning.openDebt).toBe(1);
    expect(learning.remediatedDebt).toBe(0);

    const debt = gameState.technicalDebtItems()[0];
    review.review(debt.id, debt.correctAnswerIds); // remediate

    learning = analytics.campaignLearning(mission.campaignId);
    expect(learning.afterReview.correct).toBe(1);
    expect(learning.openDebt).toBe(0);
    expect(learning.remediatedDebt).toBe(1);
    expect(learning.reviewCompletion).toBe(1);
  });

  it('flags the riskiest open concepts in the debt summary', () => {
    session.start(mission);
    session.beginChallenges();
    session.submit(['b']); // wrong

    const summary = analytics.debtSummary();
    expect(summary.open).toBe(1);
    expect(summary.remediated).toBe(0);
    expect(summary.reviewQueue.length).toBe(1);
    expect(summary.highestRiskConcepts.length).toBeGreaterThan(0);
  });
});
