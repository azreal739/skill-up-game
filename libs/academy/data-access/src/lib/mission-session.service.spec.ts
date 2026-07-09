import { TestBed } from '@angular/core/testing';
import { MissionDefinition } from '@academy/content-model';
import { MissionSessionService } from './mission-session.service';
import { GameStateService } from './game-state.service';
import { ContentService } from './content.service';

describe('MissionSessionService', () => {
  let session: MissionSessionService;
  let gameState: GameStateService;
  let mission: MissionDefinition;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    session = TestBed.inject(MissionSessionService);
    gameState = TestBed.inject(GameStateService);
    gameState.createProfile('Avery');
    // Use real validated content: the first Foundations mission (one
    // multiple-choice challenge whose correct option is 'a').
    mission = TestBed.inject(ContentService).missionById('foundations-001-welcome')!;
    session.reset();
  });

  afterEach(() => localStorage.clear());

  it('walks briefing → challenge → results for a perfect run', () => {
    session.start(mission);
    expect(session.phase()).toBe('briefing');

    session.beginChallenges();
    expect(session.phase()).toBe('challenge');

    const evaluation = session.submit(['a']);
    expect(evaluation?.correct).toBeTrue();

    session.advance();
    expect(session.phase()).toBe('results');

    const result = session.result();
    expect(result?.outcome).toBe('perfect');
    // 10 XP (intro) + 50 perfect + 25 no-hint + 5 mission bonus.
    expect(result?.totalXp).toBe(90);
    expect(result?.completion.xpAwarded).toBe(90);
    expect(gameState.isMissionCompleted(mission.id)).toBeTrue();
  });

  it('awards the First Attempt Hero achievement for a flawless mission', () => {
    session.start(mission);
    session.beginChallenges();
    session.submit(['a']); // correct first try
    session.advance();

    expect(session.result()?.completion.newBadges).toContain('first-attempt-hero');
    expect(gameState.badges()).toContain('first-attempt-hero');
  });

  it('does not award First Attempt Hero when a decision was missed', () => {
    session.start(mission);
    session.beginChallenges();
    session.submit(['b']); // wrong
    session.advance();

    expect(gameState.badges()).not.toContain('first-attempt-hero');
  });

  it('locks the first attempt: a wrong answer files debt and cannot be retried', () => {
    session.start(mission);
    session.beginChallenges();

    const wrong = session.submit(['b']);
    expect(wrong?.correct).toBeFalse();
    // Consequence applied once; the challenge is now locked.
    expect(gameState.meters().stability).toBeLessThan(100);
    const stabilityAfterMiss = gameState.meters().stability;
    expect(session.currentRun()?.completed).toBeTrue();

    // A second submission is a no-op — no brute-force retry, no double penalty.
    const retry = session.submit(['a']);
    expect(retry).toBeNull();
    expect(gameState.meters().stability).toBe(stabilityAfterMiss);

    // Exactly one open Technical Debt item was filed for this challenge.
    const debt = gameState.technicalDebtItems();
    expect(debt.length).toBe(1);
    expect(debt[0].challengeId).toBe(mission.challenges[0].id);
    expect(debt[0].status).toBe('open');
    expect(gameState.openDebtCount()).toBe(1);

    session.advance();
    expect(session.result()?.outcome).toBe('partial');
    expect(session.result()?.score.perfectBonus).toBe(0);
    // The miss earns no challenge XP (consequence-only).
    expect(session.result()?.score.challengeXp).toBe(0);
  });

  it('records a first-attempt-correct challenge without filing debt', () => {
    session.start(mission);
    session.beginChallenges();

    session.submit(['a']);
    expect(gameState.technicalDebtItems().length).toBe(0);
    const progress = gameState.progressForChallenge(mission.challenges[0].id);
    expect(progress?.firstAttemptCorrect).toBeTrue();
    expect(progress?.totalAttempts).toBe(1);
  });

  it('charges for hints through the score', () => {
    session.start(mission);
    session.beginChallenges();

    session.revealNextHint(); // level 1, free
    session.revealNextHint(); // level 2, -5
    session.submit(['a']);
    session.advance();

    const result = session.result();
    expect(result?.score.noHintBonus).toBe(0);
    // 10 - 0 - 5 = 5 challenge XP + 50 perfect (first try) + 5 mission bonus.
    expect(result?.score.challengeXp).toBe(5);
  });

  it('reveals hints in ladder order and stops at the last one', () => {
    session.start(mission);
    session.beginChallenges();
    expect(session.revealNextHint()?.level).toBe(1);
    expect(session.revealNextHint()?.level).toBe(2);
    expect(session.revealNextHint()?.level).toBe(3);
    expect(session.revealNextHint()?.level).toBe(4);
    expect(session.revealNextHint()).toBeNull();
  });
});
