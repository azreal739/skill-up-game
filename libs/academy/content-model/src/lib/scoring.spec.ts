import { challengeXp, hintCost, missionScore } from './scoring';
import { HintDefinition } from './types';

const hint = (level: 1 | 2 | 3 | 4, cost?: number): HintDefinition => ({
  level,
  title: `hint ${level}`,
  content: 'content',
  cost,
});

describe('scoring', () => {
  describe('hintCost', () => {
    it('uses the standard ladder by level', () => {
      expect(hintCost(hint(1))).toBe(0);
      expect(hintCost(hint(2))).toBe(5);
      expect(hintCost(hint(3))).toBe(10);
      expect(hintCost(hint(4))).toBe(20);
    });

    it('lets content override the cost', () => {
      expect(hintCost(hint(4, 3))).toBe(3);
    });
  });

  describe('challengeXp', () => {
    it('awards base XP by difficulty for a clean solve', () => {
      expect(challengeXp({ difficulty: 'easy', scoreRatio: 1, hintsUsed: [] })).toBe(10);
      expect(challengeXp({ difficulty: 'medium', scoreRatio: 1, hintsUsed: [] })).toBe(25);
      expect(challengeXp({ difficulty: 'hard', scoreRatio: 1, hintsUsed: [] })).toBe(50);
      expect(challengeXp({ difficulty: 'boss', scoreRatio: 1, hintsUsed: [] })).toBe(100);
    });

    it('scales by score ratio', () => {
      expect(challengeXp({ difficulty: 'hard', scoreRatio: 0.5, hintsUsed: [] })).toBe(25);
    });

    it('subtracts hint costs', () => {
      expect(
        challengeXp({ difficulty: 'hard', scoreRatio: 1, hintsUsed: [hint(1), hint(2), hint(3)] })
      ).toBe(35);
    });

    it('never goes negative — hints must not block progress', () => {
      expect(
        challengeXp({
          difficulty: 'easy',
          scoreRatio: 1,
          hintsUsed: [hint(2), hint(3), hint(4)],
        })
      ).toBe(0);
    });
  });

  describe('missionScore', () => {
    it('adds perfect and no-hint bonuses to the challenge total', () => {
      const score = missionScore({
        perfect: true,
        challenges: [
          { difficulty: 'easy', scoreRatio: 1, hintsUsed: [] },
          { difficulty: 'medium', scoreRatio: 1, hintsUsed: [] },
        ],
      });
      expect(score.challengeXp).toBe(35);
      expect(score.perfectBonus).toBe(50);
      expect(score.noHintBonus).toBe(25);
      expect(score.totalXp).toBe(110);
    });

    it('drops the no-hint bonus when any hint was used', () => {
      const score = missionScore({
        perfect: false,
        challenges: [{ difficulty: 'easy', scoreRatio: 1, hintsUsed: [hint(1)] }],
      });
      expect(score.noHintBonus).toBe(0);
      expect(score.perfectBonus).toBe(0);
    });
  });
});
