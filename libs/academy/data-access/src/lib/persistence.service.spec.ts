import { TestBed } from '@angular/core/testing';
import { createPlayerState } from '@academy/content-model';
import { PersistenceService } from './persistence.service';

describe('PersistenceService', () => {
  let service: PersistenceService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistenceService);
  });

  afterEach(() => localStorage.clear());

  it('round-trips a valid player state', () => {
    const state = createPlayerState('Avery', 'NullPointer');
    service.save(state);
    expect(service.load()).toEqual(state);
  });

  it('returns null when nothing is saved', () => {
    expect(service.load()).toBeNull();
  });

  it('discards corrupted JSON', () => {
    localStorage.setItem('engineering-academy:save', '{not json');
    expect(service.load()).toBeNull();
  });

  it('discards saves that fail Zod validation', () => {
    localStorage.setItem(
      'engineering-academy:save',
      JSON.stringify({ version: 1, profile: { name: '' }, xp: -5 })
    );
    expect(service.load()).toBeNull();
  });

  it('clears the save', () => {
    service.save(createPlayerState('Avery'));
    service.clear();
    expect(service.load()).toBeNull();
  });

  it('migrates a v1 save forward, preserving progress and adding empty collections', () => {
    // A pre-Review-Loop (v1) save: no attempts/debt/notes collections.
    const legacy = {
      version: 1,
      profile: { name: 'Avery', callsign: 'NullPointer', createdAt: '2025-01-01T00:00:00.000Z' },
      xp: 640,
      badges: ['platform-initiate'],
      completedMissions: {
        'foundations-001-welcome': {
          missionId: 'foundations-001-welcome',
          bestScoreRatio: 1,
          bestXp: 90,
          timesCompleted: 1,
          perfect: true,
          noHints: true,
          completedAt: '2025-01-02T00:00:00.000Z',
        },
      },
      settings: {
        masterVolume: 0.8,
        musicVolume: 0.5,
        sfxVolume: 0.8,
        muted: false,
        reducedMotion: false,
        highContrast: false,
        textScale: 1,
      },
      meters: { stability: 100, technicalDebt: 0, severityIndex: 0, teamConfidence: 50 },
    };
    localStorage.setItem('engineering-academy:save', JSON.stringify(legacy));

    const loaded = service.load();
    expect(loaded).not.toBeNull();
    expect(loaded?.version).toBe(2);
    // Existing progress survives untouched.
    expect(loaded?.xp).toBe(640);
    expect(loaded?.badges).toEqual(['platform-initiate']);
    expect(loaded?.completedMissions['foundations-001-welcome'].bestXp).toBe(90);
    // New collections initialise empty.
    expect(loaded?.challengeAttempts).toEqual([]);
    expect(loaded?.challengeProgress).toEqual([]);
    expect(loaded?.technicalDebtItems).toEqual([]);
    expect(loaded?.notes).toEqual([]);
  });
});
