import { evaluateChallenge } from './evaluation';
import { CodeReviewChallenge, MultipleChoiceChallenge } from './types';

const baseChallenge = {
  id: 'c1',
  title: 'Test challenge',
  difficulty: 'easy' as const,
  tags: ['typescript'],
  storyContext: 'story',
  prompt: 'prompt',
  hints: [{ level: 1 as const, title: 'h', content: 'c' }],
  rewards: [],
  consequences: [],
  helpLinks: [{ topicId: 'typescript.interfaces', label: 'Interfaces' }],
  successFeedback: 'Well done.',
  failureFeedback: 'Look again.',
};

const multipleChoice: MultipleChoiceChallenge = {
  ...baseChallenge,
  type: 'multiple-choice',
  options: [
    { id: 'a', label: 'right', isCorrect: true },
    { id: 'b', label: 'wrong', isCorrect: false },
    { id: 'c', label: 'also wrong', isCorrect: false },
  ],
};

const codeReview: CodeReviewChallenge = {
  ...baseChallenge,
  type: 'code-review',
  findings: [
    { id: 'issue-1', label: 'real issue', isCorrect: true },
    { id: 'issue-2', label: 'another real issue', isCorrect: true },
    { id: 'fine-1', label: 'perfectly fine', isCorrect: false },
  ],
};

describe('evaluateChallenge', () => {
  describe('multiple choice (exact set)', () => {
    it('accepts the correct option', () => {
      const result = evaluateChallenge(multipleChoice, { selectedIds: ['a'] });
      expect(result.correct).toBeTrue();
      expect(result.scoreRatio).toBe(1);
      expect(result.summary).toContain('Well done.');
    });

    it('rejects a wrong option and appends failure feedback', () => {
      const result = evaluateChallenge(multipleChoice, { selectedIds: ['b'] });
      expect(result.correct).toBeFalse();
      expect(result.scoreRatio).toBe(0);
      expect(result.summary).toContain('Look again.');
    });

    it('rejects selecting the right answer plus a wrong one', () => {
      const result = evaluateChallenge(multipleChoice, { selectedIds: ['a', 'b'] });
      expect(result.correct).toBeFalse();
    });

    it('reports per-option outcomes', () => {
      const result = evaluateChallenge(multipleChoice, { selectedIds: ['b'] });
      const optionA = result.options.find((o) => o.id === 'a');
      const optionB = result.options.find((o) => o.id === 'b');
      expect(optionA?.isCorrect).toBeTrue();
      expect(optionA?.wasSelected).toBeFalse();
      expect(optionB?.wasSelected).toBeTrue();
      expect(optionB?.isCorrect).toBeFalse();
    });
  });

  describe('code review (partial credit)', () => {
    it('is correct only with every issue and no false positives', () => {
      const result = evaluateChallenge(codeReview, { selectedIds: ['issue-1', 'issue-2'] });
      expect(result.correct).toBeTrue();
      expect(result.scoreRatio).toBe(1);
    });

    it('gives partial credit for finding some issues', () => {
      const result = evaluateChallenge(codeReview, { selectedIds: ['issue-1'] });
      expect(result.correct).toBeFalse();
      expect(result.scoreRatio).toBe(0.5);
    });

    it('penalises false positives', () => {
      const result = evaluateChallenge(codeReview, {
        selectedIds: ['issue-1', 'issue-2', 'fine-1'],
      });
      expect(result.correct).toBeFalse();
      expect(result.scoreRatio).toBe(0.5);
    });

    it('never returns a negative ratio', () => {
      const result = evaluateChallenge(codeReview, { selectedIds: ['fine-1'] });
      expect(result.scoreRatio).toBe(0);
    });
  });
});
