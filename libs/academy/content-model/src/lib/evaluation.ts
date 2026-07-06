/**
 * Deterministic, pure challenge evaluation (05_CHALLENGE_ENGINE.md).
 * Answers are sets of selected option/finding IDs — no free text in v1.
 */
import { ChallengeDefinition, ChallengeOption } from './types';

export interface ChallengeAnswer {
  selectedIds: string[];
}

export interface OptionOutcome {
  id: string;
  label: string;
  wasSelected: boolean;
  isCorrect: boolean;
  feedback?: string;
}

export interface EvaluationResult {
  correct: boolean;
  /** 0..1 — proportion of the reward the answer earns. */
  scoreRatio: number;
  summary: string;
  options: OptionOutcome[];
}

function optionsFor(challenge: ChallengeDefinition): ChallengeOption[] {
  return challenge.type === 'code-review' ? challenge.findings : challenge.options;
}

/**
 * Exact-set evaluation: the selection must match the correct set exactly.
 * Used for multiple choice and contract comparison.
 */
function evaluateExactSet(options: ChallengeOption[], selected: Set<string>): EvaluationResult {
  const correctIds = new Set(options.filter((o) => o.isCorrect).map((o) => o.id));
  const correct =
    selected.size === correctIds.size && [...selected].every((id) => correctIds.has(id));

  return {
    correct,
    scoreRatio: correct ? 1 : 0,
    summary: correct ? 'Correct.' : 'Not quite.',
    options: toOutcomes(options, selected),
  };
}

/**
 * Partial-credit evaluation for code review: every real issue found scores,
 * every false positive costs. correct only when the sets match exactly.
 */
function evaluateFindings(options: ChallengeOption[], selected: Set<string>): EvaluationResult {
  const issueIds = new Set(options.filter((o) => o.isCorrect).map((o) => o.id));
  let truePositives = 0;
  let falsePositives = 0;
  for (const id of selected) {
    if (issueIds.has(id)) {
      truePositives++;
    } else {
      falsePositives++;
    }
  }

  const correct = truePositives === issueIds.size && falsePositives === 0;
  const scoreRatio = issueIds.size === 0 ? 0 : Math.max(0, (truePositives - falsePositives) / issueIds.size);

  let summary: string;
  if (correct) {
    summary = 'Review complete — every issue found, no false positives.';
  } else if (falsePositives > 0 && truePositives === issueIds.size) {
    summary = 'You found every issue, but flagged healthy code too.';
  } else if (truePositives > 0) {
    summary = `You found ${truePositives} of ${issueIds.size} issues.`;
  } else {
    summary = 'No real issues identified yet.';
  }

  return { correct, scoreRatio, summary, options: toOutcomes(options, selected) };
}

function toOutcomes(options: ChallengeOption[], selected: Set<string>): OptionOutcome[] {
  return options.map((option) => ({
    id: option.id,
    label: option.label,
    wasSelected: selected.has(option.id),
    isCorrect: option.isCorrect,
    feedback: option.feedback,
  }));
}

export function evaluateChallenge(
  challenge: ChallengeDefinition,
  answer: ChallengeAnswer
): EvaluationResult {
  const selected = new Set(answer.selectedIds);
  const options = optionsFor(challenge);

  const result =
    challenge.type === 'code-review'
      ? evaluateFindings(options, selected)
      : evaluateExactSet(options, selected);

  return {
    ...result,
    summary: result.correct
      ? `${result.summary} ${challenge.successFeedback}`
      : `${result.summary} ${challenge.failureFeedback}`,
  };
}
