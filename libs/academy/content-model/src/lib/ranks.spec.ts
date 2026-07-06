import { RANKS, nextRank, rankForXp, rankProgress } from './ranks';

describe('ranks', () => {
  it('starts every engineer as a Graduate', () => {
    expect(rankForXp(0).id).toBe('graduate-engineer');
  });

  it('promotes at each threshold', () => {
    expect(rankForXp(99).id).toBe('graduate-engineer');
    expect(rankForXp(100).id).toBe('junior-engineer');
    expect(rankForXp(5000).id).toBe('distinguished-engineer');
  });

  it('has 12 strictly increasing ranks', () => {
    expect(RANKS.length).toBe(12);
    for (let i = 1; i < RANKS.length; i++) {
      expect(RANKS[i].minXp).toBeGreaterThan(RANKS[i - 1].minXp);
    }
  });

  it('reports the next rank and progress towards it', () => {
    expect(nextRank(0)?.id).toBe('junior-engineer');
    expect(rankProgress(50)).toBe(0.5);
    expect(nextRank(99999)).toBeNull();
    expect(rankProgress(99999)).toBe(1);
  });
});
