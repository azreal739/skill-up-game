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
});
