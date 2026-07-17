import { TestBed } from '@angular/core/testing';
import { GameStateService } from './game-state.service';
import { ContentService } from './content.service';
import { MissionSessionService } from './mission-session.service';

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

  it('persists pre-enrolment settings and applies them to the new profile', () => {
    service.updateSettings({ voiceEnabled: false, reducedMotion: true });

    expect(service.hasProfile()).toBeFalse();
    expect(service.settings().voiceEnabled).toBeFalse();
    expect(localStorage.getItem('engineering-academy:preferences')).toContain('voiceEnabled');

    service.createProfile('Avery');
    expect(service.settings().voiceEnabled).toBeFalse();
    expect(service.settings().reducedMotion).toBeTrue();
    expect(localStorage.getItem('engineering-academy:preferences')).toBeNull();
  });

  it('creates a Deck Initiate I profile and persists it', () => {
    service.createProfile('Avery');
    expect(service.hasProfile()).toBeTrue();
    expect(service.rank().id).toBe('junior-1');
    expect(service.level().level).toBe(1);
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
    expect(outcome.rankAfter.id).toBe('junior-2');
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

  describe('export / import', () => {
    it('round-trips a save through export and import', () => {
      service.createProfile('Avery', 'NullPointer');
      service.completeMission(
        { missionId: 'm1', scoreRatio: 1, xpEarned: 120, perfect: true, noHints: true },
        ['type-guardian']
      );
      const exported = service.exportState();

      service.resetProgress();
      expect(service.hasProfile()).toBeFalse();

      expect(service.importState(exported)).toBeTrue();
      expect(service.hasProfile()).toBeTrue();
      expect(service.xp()).toBe(120);
      expect(service.badges()).toContain('type-guardian');
      expect(service.state()?.profile.callsign).toBe('NullPointer');
    });

    it('persists an imported save to storage', () => {
      service.createProfile('Avery');
      const exported = service.exportState();
      service.resetProgress();

      service.importState(exported);
      expect(localStorage.getItem('engineering-academy:save')).toContain('Avery');
    });

    it('rejects malformed JSON without changing state', () => {
      service.createProfile('Keeper');
      expect(service.importState('{ not json')).toBeFalse();
      expect(service.state()?.profile.name).toBe('Keeper');
    });

    it('rejects a well-formed file that fails player-state validation', () => {
      service.createProfile('Keeper');
      expect(service.importState(JSON.stringify({ version: 1, xp: -10 }))).toBeFalse();
      expect(service.state()?.profile.name).toBe('Keeper');
    });
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
      const componentForge = content.campaignById('component-forge')!;

      expect(componentForge.requiredCampaignId).toBe('foundations');
      expect(service.isCampaignUnlocked(componentForge, foundations)).toBeFalse();

      // Complete every Foundations mission.
      for (const missionId of foundations.missions) {
        service.completeMission(
          { missionId, scoreRatio: 1, xpEarned: 10, perfect: true, noHints: true },
          []
        );
      }

      expect(service.isCampaignUnlocked(componentForge, foundations)).toBeTrue();
    });

    it('treats a gated campaign as locked when the prerequisite is not provided', () => {
      service.createProfile('Avery');
      const componentForge = content.campaignById('component-forge')!;
      expect(service.isCampaignUnlocked(componentForge)).toBeFalse();
    });
  });

  describe('notes (Review Loop spec 06)', () => {
    beforeEach(() => service.createProfile('Avery'));

    it('creates a general note and persists it across a reload', () => {
      const note = service.createNote({
        title: 'Runtime boundary lesson',
        body: 'Validate at the edge.',
        tags: ['zod', 'boundaries'],
        linkedEntityType: 'general',
        linkedEntityId: '',
      });

      expect(service.notes().length).toBe(1);
      expect(note.pinned).toBeFalse();

      // A fresh store instance (new injector) rehydrates from localStorage.
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const reloaded = TestBed.inject(GameStateService);
      expect(reloaded.notes().length).toBe(1);
      expect(reloaded.notes()[0].title).toBe('Runtime boundary lesson');
    });

    it('edits, pins and deletes a note', () => {
      const note = service.createNote({
        title: 'Draft',
        body: '',
        tags: [],
        linkedEntityType: 'general',
        linkedEntityId: '',
      });

      service.updateNote(note.id, { title: 'Final', tags: ['typescript'] });
      expect(service.noteById(note.id)?.title).toBe('Final');
      expect(service.noteById(note.id)?.tags).toEqual(['typescript']);

      service.toggleNotePin(note.id);
      expect(service.noteById(note.id)?.pinned).toBeTrue();
      service.toggleNotePin(note.id);
      expect(service.noteById(note.id)?.pinned).toBeFalse();

      service.deleteNote(note.id);
      expect(service.notes().length).toBe(0);
    });

    it('filters notes by linked entity', () => {
      service.createNote({
        title: 'A',
        body: '',
        tags: [],
        linkedEntityType: 'mission',
        linkedEntityId: 'm1',
      });
      service.createNote({
        title: 'B',
        body: '',
        tags: [],
        linkedEntityType: 'help-topic',
        linkedEntityId: 'topic-1',
      });

      expect(service.notesForEntity('mission', 'm1').map((n) => n.title)).toEqual(['A']);
      expect(service.notesForEntity('help-topic', 'topic-1').map((n) => n.title)).toEqual(['B']);
      expect(service.notesForEntity('mission', 'other')).toEqual([]);
    });

    it('links a note to its Technical Debt item and unlinks it on delete', () => {
      // File a debt item by missing the first challenge of a real mission.
      const session = TestBed.inject(MissionSessionService);
      const mission = content.missionById('foundations-001-welcome')!;
      session.start(mission);
      session.beginChallenges();
      session.submit(['b']); // wrong
      const debt = service.technicalDebtItems()[0];
      expect(debt.noteIds).toEqual([]);

      const note = service.createNote({
        title: 'What changed',
        body: 'string vs number.',
        tags: [],
        linkedEntityType: 'technical-debt',
        linkedEntityId: debt.id,
      });
      expect(service.debtItemById(debt.id)?.noteIds).toEqual([note.id]);

      service.deleteNote(note.id);
      expect(service.debtItemById(debt.id)?.noteIds).toEqual([]);
    });
  });
});
