import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — composing validators (knowledge pack 02 advanced:
 * validators as pure Result-returning functions, chained into pipelines
 * instead of nested conditionals).
 */
export const fnFp008ValidatorPipelines: MissionDefinition = {
  id: 'fp-008-validator-pipelines',
  campaignId: 'fp-typescript',
  title: 'Validators as Pipelines',
  summary:
    'Chain small Result-returning validators into one pipeline — and retire the nested-if pyramid.',
  difficulty: 'hard',
  learningObjectives: [
    'Design validators as pure Result-returning steps',
    'Chain Results so failures short-circuit',
    'Replace nested conditionals with a flat pipeline',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'End of the calculator exercise, we hit real input: user-entered amounts. The first draft was a pyramid of nested ifs, four levels deep, each with its own error string.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The rewrite: each rule became a tiny pure function returning ok(value) or err(reason), and a chain ran them in order — first failure wins, value flows through on success.',
    },
  ],
  contextArtefacts: [
    {
      id: 'chain-helper',
      type: 'code',
      title: 'The chain helper from the session',
      language: 'ts',
      content:
        "type Validator<T> = (value: T) => Result<T>;\n\nfunction chain<T>(...validators: Validator<T>[]): Validator<T> {\n  return (value) => {\n    let current: Result<T> = { kind: 'ok', value };\n    for (const validate of validators) {\n      if (current.kind === 'err') return current;\n      current = validate(current.value);\n    }\n    return current;\n  };\n}",
    },
  ],
  challenges: [
    {
      id: 'fp-008-c1',
      type: 'multiple-choice',
      title: 'Write One Step',
      difficulty: 'hard',
      tags: ['typescript'],
      storyContext:
        'The pipeline needs a positive-amount rule to slot into chain(parseAmount, positive, belowLimit).',
      prompt: 'Which implementation is a correct pipeline step?',
      options: [
        {
          id: 'a',
          label:
            "const positive: Validator<number> = (n) =>\n  n >= 0 ? { kind: 'ok', value: n } : { kind: 'err', reason: 'amount must be positive' };",
          isCorrect: false,
          feedback:
            'The >= lets zero through — “positive” means strictly greater than zero, and a zero-amount transfer reached the gateway.',
        },
        {
          id: 'b',
          label:
            "const positive: Validator<number> = (n) => {\n  if (n <= 0) throw new Error('amount must be positive');\n  return { kind: 'ok', value: n };\n};",
          isCorrect: false,
          feedback:
            'A throw inside a Result pipeline is a trapdoor — the chain promises failures come back as err, and this one escapes sideways.',
        },
        {
          id: 'c',
          label: 'const positive = (n: number): boolean => n > 0;',
          isCorrect: false,
          feedback:
            'A boolean cannot slot into chain — it neither carries the value forward nor names the failure.',
        },
        {
          id: 'd',
          label:
            "const positive: Validator<number> = (n) =>\n  n > 0 ? { kind: 'ok', value: n } : { kind: 'err', reason: 'amount must be positive' };",
          isCorrect: true,
          feedback:
            'Pure, strictly positive, Result-returning, and it passes the value through on success — a perfect link in the chain.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'A step must fit Validator<T>: value in, Result of the SAME value out.' },
        {
          level: 2,
          title: 'Concept',
          content: 'Pipeline steps never throw and never return bare booleans — failures are err values.',
        },
        { level: 3, title: 'Specific clue', content: 'Two options are honest Results; prefer the one proven over its whole range.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose the tested ternary Result — pure, explicit, and chain-compatible.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Step forged' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'A throwing step escaped the chain and surfaced as an unhandled exception in checkout.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.discriminated-unions', label: 'Result types' },
        { topicId: 'fp.composition', label: 'Composition' },
      ],
      successFeedback: 'ok flows on, err short-circuits — your step honours the chain’s contract.',
      failureFeedback: 'Check each option against the Validator<T> contract: no throws, no booleans, value passed through.',
    },
    {
      id: 'fp-008-c2',
      type: 'code-review',
      title: 'Review: The Pyramid',
      difficulty: 'hard',
      tags: ['typescript'],
      storyContext:
        'The pre-session validator, found still alive in a feature branch. Review it against the pipeline standard.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'pyramid',
          type: 'code',
          title: 'validate-transfer.ts (feature branch)',
          language: 'ts',
          content:
            "export function validateTransfer(raw: string): number | null {\n  const n = Number(raw);\n  if (!Number.isNaN(n)) {\n    if (n > 0) {\n      if (n <= LIMIT) {\n        return n;\n      } else {\n        console.error('over limit');\n        return null;\n      }\n    }\n    return null;\n  }\n  return null;\n}",
        },
      ],
      findings: [
        {
          id: 'null-collapses',
          label: 'Every failure collapses to null — the caller cannot tell bad parse from over-limit',
          isCorrect: true,
          feedback:
            'Three distinct failures, one null. err(reason) exists precisely so callers can react differently.',
        },
        {
          id: 'isnan-guard',
          label: 'Number.isNaN is the wrong guard for a failed parse',
          isCorrect: false,
          feedback: 'The guard is correct — it is what happens on failure that loses information.',
        },
        {
          id: 'console-side-effect',
          label: 'console.error buries the failure reason in a side effect instead of the return value',
          isCorrect: true,
          feedback:
            'The reason exists — it just leaves through the wrong door. Pipelines return reasons as data.',
        },
        {
          id: 'nesting-style',
          label: 'Nested ifs are always a bug and must be linted away project-wide',
          isCorrect: false,
          feedback:
            'Nesting is a readability smell here, not a defect class — the real issues are the collapsed failures and the side-channel reason.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Follow each failure path: what does the caller receive, and what do they know?' },
        {
          level: 2,
          title: 'Concept',
          content: 'The pipeline standard: failures are values with reasons, not nulls plus console noise.',
        },
        { level: 3, title: 'Specific clue', content: 'One issue is what failures return; the other is where the reason goes.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Flag the null collapse and the console side-channel. The NaN guard and nesting style stand.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Pyramid reviewed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 9,
          reason: 'The null-collapsing validator shipped, and support tickets could not say why transfers failed.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.discriminated-unions', label: 'Result types' },
      ],
      successFeedback: 'Reasons as data, one exit channel — you reviewed like the session taught.',
      failureFeedback:
        'Judge information flow, not indentation: which findings are about lost failure detail?',
    },
  ],
  reflectionPrompt: 'Rewrite validateTransfer’s signature in Result style. What are its three err reasons?',
  rewards: [{ type: 'xp', amount: 15, label: 'Pipeline standard set' }],
};
