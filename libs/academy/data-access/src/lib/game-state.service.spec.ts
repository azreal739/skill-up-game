import { TestBed } from '@angular/core/testing';
import { GameStateService } from './game-state.service';
import { ContentService } from './content.service';

describe('GameStateService', () => {
  let service: GameStateService;
  let content: ContentService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStateService);
    content = TestBed.inject(ContentService);
  });

  afterEach(() => localStorage.clear());

  it('starts with no profile', () => {
    expect(service.hasProfile()).toBeFalse();
    expect(service.xp()).toBe(0);
  });

  it('creates a Graduate Engineer profile and persists it', () => {
    service.createProfile('Avery');
    expect(service.hasProfile()).toBeTrue();
    expect(service.rank().id).toBe('graduate-engineer');
    expect(localStorage.getItem('engineering-academy:save')).toContain('Avery');
  });

  it('credits full XP for a first completion and records the mission', () => {
    service.createProfile('Avery');
    const outcome = service.completeMission(
      { missionId: 'm1', scoreRatio: 1, xpEarned: 120, perfect: true, noHints: true },
      ['type-guardian']
    );
    expect(outcome.xpAwarded).toBe(120);
    expect(outcome.newBadges).toEqual(['type-guardian']);
    expect(outcome.rankAfter.id).toBe('junior-engineer');
    expect(service.isMissionCompleted('m1')).toBeTrue();
  });

  it('credits only the improvement on replays', () => {
    service.createProfile('Avery');
    service.completeMission(
      { missionId: 'm1', scoreRatio: 0.5, xpEarned: 60, perfect: false, noHints: false },
      []
    );
    const worse = service.completeMission(
      { missionId: 'm1', scoreRatio: 0.5, xpEarned: 40, perfect: false, noHints: false },
      []
    );
    expect(worse.xpAwarded).toBe(0);
    const better = service.completeMission(
      { missionId: 'm1', scoreRatio: 1, xpEarned: 100, perfect: true, noHints: true },
      []
    );
    expect(better.xpAwarded).toBe(40);
    expect(service.xp()).toBe(100);
    expect(service.missionRecord('m1')?.bestXp).toBe(100);
    expect(service.missionRecord('m1')?.timesCompleted).toBe(3);
  });

  it('does not award the same badge twice', () => {
    service.createProfile('Avery');
    service.completeMission(
      { missionId: 'm1', scoreRatio: 1, xpEarned: 10, perfect: false, noHints: false },
      ['type-guardian']
    );
    const second = service.completeMission(
      { missionId: 'm2', scoreRatio: 1, xpEarned: 10, perfect: false, noHints: false },
      ['type-guardian']
    );
    expect(second.newBadges).toEqual([]);
    expect(service.badges()).toEqual(['type-guardian']);
  });

  it('unlocks missions in campaign order', () => {
    service.createProfile('Avery');
    const campaign = content.campaigns()[0];
    const [first, second] = campaign.missions;
    expect(service.isMissionUnlocked(campaign, first)).toBeTrue();
    expect(service.isMissionUnlocked(campaign, second)).toBeFalse();

    service.completeMission(
      { missionId: first, scoreRatio: 1, xpEarned: 10, perfect: false, noHints: false },
      []
    );
    expect(service.isMissionUnlocked(campaign, second)).toBeTrue();
  });

  it('applies consequences to the platform meters', () => {
    service.createProfile('Avery');
    service.applyConsequences([{ type: 'stability', delta: -20, reason: 'incident' }]);
    expect(service.meters().stability).toBe(80);
  });

  it('resets progress completely', () => {
    service.createProfile('Avery');
    service.resetProgress();
    expect(service.hasProfile()).toBeFalse();
    expect(localStorage.getItem('engineering-academy:save')).toBeNull();
  });

  describe('campaign unlocking', () => {
    it('always unlocks a campaign with no prerequisite', () => {
      service.createProfile('Avery');
      const foundations = content.campaigns().find((c) => c.id === 'foundations')!;
      expect(service.isCampaignUnlocked(foundations)).toBeTrue();
    });

    it('locks a gated campaign until its prerequisite is complete', () => {
      service.createProfile('Avery');
      const foundations = content.campaignById('foundations')!;
      const zodGate = content.campaignById('zod-gate')!;

      expect(zodGate.requiredCampaignId).toBe('foundations');
      expect(service.isCampaignUnlocked(zodGate, foundations)).toBeFalse();

      // Complete every Foundations mission.
      for (const missionId of foundations.missions) {
        service.completeMission(
          { missionId, scoreRatio: 1, xpEarned: 10, perfect: true, noHints: true },
          []
        );
      }

      expect(service.isCampaignUnlocked(zodGate, foundations)).toBeTrue();
    });

    it('treats a gated campaign as locked when the prerequisite is not provided', () => {
      service.createProfile('Avery');
      const zodGate = content.campaignById('zod-gate')!;
      expect(service.isCampaignUnlocked(zodGate)).toBeFalse();
    });
  });
});
