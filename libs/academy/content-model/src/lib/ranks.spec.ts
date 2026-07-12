import {
  LEVELS,
  RANKS,
  levelForXp,
  levelProgress,
  nextLevel,
  nextRank,
  rankForXp,
  rankProgress,
} from './ranks';

describe('ranks', () => {
  it('starts every engineer as Junior I', () => {
    expect(rankForXp(0).id).toBe('junior-1');
  });

  it('promotes at each threshold', () => {
    expect(rankForXp(119).id).toBe('junior-1');
    expect(rankForXp(120).id).toBe('junior-2');
    expect(rankForXp(39499).id).toBe('distinguished-2');
    expect(rankForXp(39500).id).toBe('distinguished-3');
  });

  it('has 18 strictly increasing tiers in I/II/III bands', () => {
    expect(RANKS.length).toBe(18);
    for (let i = 1; i < RANKS.length; i++) {
      expect(RANKS[i].minXp).toBeGreaterThan(RANKS[i - 1].minXp);
    }
    expect(RANKS.filter((rank) => rank.title.endsWith('III')).length).toBe(6);
  });

  it('reports the next rank and progress towards it', () => {
    expect(nextRank(0)?.id).toBe('junior-2');
    expect(rankProgress(60)).toBe(0.5);
    expect(nextRank(99999)).toBeNull();
    expect(rankProgress(99999)).toBe(1);
  });
});

describe('levels', () => {
  it('starts at level 1, Bootloader', () => {
    expect(levelForXp(0)).toEqual(jasmine.objectContaining({ level: 1, codename: 'Bootloader' }));
  });

  it('levels strictly increase in XP and number', () => {
    for (let i = 1; i < LEVELS.length; i++) {
      expect(LEVELS[i].minXp).toBeGreaterThan(LEVELS[i - 1].minXp);
      expect(LEVELS[i].level).toBe(LEVELS[i - 1].level + 1);
    }
  });

  it('reports the next level and progress towards it', () => {
    expect(levelForXp(150).level).toBe(2);
    expect(nextLevel(0)?.level).toBe(2);
    expect(levelProgress(75)).toBe(0.5);
    expect(nextLevel(99999)).toBeNull();
    expect(levelProgress(99999)).toBe(1);
  });

  it('cycles levels faster than rank tiers early on', () => {
    // A player finishing Foundations (~1445 XP perfect) should have levelled
    // several times but sit mid-ladder on ranks.
    expect(levelForXp(1445).level).toBeGreaterThanOrEqual(6);
    expect(rankForXp(1445).id).toBe('senior-1');
  });
});
