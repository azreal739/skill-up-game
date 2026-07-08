import { TestBed } from '@angular/core/testing';
import { MissionDefinition } from '@academy/content-model';
import { AcademyReviewService } from './academy-review.service';
import { GameStateService } from './game-state.service';
import { MissionSessionService } from './mission-session.service';
import { ContentService } from './content.service';

describe('AcademyReviewService', () => {
  let review: AcademyReviewService;
  let gameState: GameStateService;
  let session: MissionSessionService;
  let mission: MissionDefinition;

  /** Play the first challenge wrong so a debt item exists to review. */
  function fileDebtByMissing(): string {
    session.start(mission);
    session.beginChallenges();
    session.submit(['b']); // wrong (correct is 'a')
    return gameState.technicalDebtItems()[0].id;
  }

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    review = TestBed.inject(AcademyReviewService);
    gameState = TestBed.inject(GameStateService);
    session = TestBed.inject(MissionSessionService);
    gameState.createProfile('Avery');
    mission = TestBed.inject(ContentService).missionById('foundations-001-welcome')!;
    session.reset();
  });

  afterEach(() => localStorage.clear());

  it('remediates a debt item on a correct review and credits XP once', () => {
    const debtId = fileDebtByMissing();
    const xpBefore = gameState.xp();

    const first = review.review(debtId, ['a']); // correct
    expect(first?.remediated).toBeTrue();
    expect(first?.status).toBe('remediated');
    expect(first?.xpAwarded).toBeGreaterThan(0);
    expect(gameState.xp()).toBe(xpBefore + (first?.xpAwarded ?? 0));
    expect(gameState.openDebtCount()).toBe(0);

    // Progress records the remediation but the first attempt stays incorrect.
    const progress = gameState.progressForChallenge(mission.challenges[0].id);
    expect(progress?.isRemediated).toBeTrue();
    expect(progress?.firstAttemptCorrect).toBeFalse();

    // Reviewing again grants no further XP.
    const xpAfter = gameState.xp();
    const second = review.review(debtId, ['a']);
    expect(second?.xpAwarded).toBe(0);
    expect(gameState.xp()).toBe(xpAfter);
  });

  it('reopens a debt item on an incorrect review and grants no XP', () => {
    const debtId = fileDebtByMissing();
    const xpBefore = gameState.xp();

    const outcome = review.review(debtId, ['c']); // still wrong
    expect(outcome?.remediated).toBeFalse();
    expect(outcome?.status).toBe('reopened');
    expect(outcome?.xpAwarded).toBe(0);
    expect(gameState.xp()).toBe(xpBefore);
    expect(gameState.openDebtCount()).toBe(1);
    expect(gameState.progressForChallenge(mission.challenges[0].id)?.isRemediated).toBeFalse();
  });

  it('marks an item In Review when a review begins', () => {
    const debtId = fileDebtByMissing();
    review.beginReview(debtId);
    expect(gameState.debtItemById(debtId)?.status).toBe('in-review');
    // In-review items are still counted as unresolved debt.
    expect(gameState.openDebtCount()).toBe(0);
  });

  it('never restores the original first attempt when remediating', () => {
    const debtId = fileDebtByMissing();
    review.review(debtId, ['a']);
    const attempts = gameState.challengeAttempts();
    const firstAttempt = attempts.find((a) => a.mode === 'mission');
    expect(firstAttempt?.isCorrect).toBeFalse();
    expect(attempts.some((a) => a.mode === 'review' && a.isCorrect)).toBeTrue();
  });
});
