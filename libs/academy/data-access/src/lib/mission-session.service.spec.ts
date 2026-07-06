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

  it('applies consequences on a wrong answer and downgrades the outcome', () => {
    session.start(mission);
    session.beginChallenges();

    const wrong = session.submit(['b']);
    expect(wrong?.correct).toBeFalse();
    expect(gameState.meters().stability).toBeLessThan(100);

    const right = session.submit(['a']);
    expect(right?.correct).toBeTrue();

    session.advance();
    expect(session.result()?.outcome).toBe('stable');
    expect(session.result()?.score.perfectBonus).toBe(0);
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

  it('offers partial acceptance after repeated failures', () => {
    session.start(mission);
    session.beginChallenges();

    session.submit(['b']);
    expect(session.canAcceptPartial()).toBeFalse();
    session.submit(['c']);
    expect(session.canAcceptPartial()).toBeTrue();

    session.acceptPartial();
    session.advance();
    expect(session.phase()).toBe('results');
    expect(session.result()?.outcome).toBe('partial');
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
