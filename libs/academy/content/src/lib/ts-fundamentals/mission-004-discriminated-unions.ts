import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — discriminated unions & the Result type. Straight from the
 * team's calculator exercise (knowledge pack 05/07: boolean validators lose
 * error details; model success/failure as data).
 */
export const fnTs004DiscriminatedUnions: MissionDefinition = {
  id: 'ts-fund-004-discriminated-unions',
  campaignId: 'ts-fundamentals',
  title: 'Result: Success as Data',
  summary:
    "Rebuild the session's Result<T> type: a discriminated union that makes failure explicit and impossible to ignore.",
  difficulty: 'medium',
  learningObjectives: [
    'Design a discriminated union with a literal tag',
    'Explain why Result beats booleans and thrown errors for expected failures',
    'Let the discriminant drive exhaustive handling',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: "The calculator exercise had one big idea: divide(10, 0) should not throw and should not return false. It should return a value that says what happened — ok with the answer, or err with the reason.",
    },
    {
      speaker: 'Team Lead',
      text: 'A discriminated union carries one literal tag field. Switch on the tag and the compiler proves you handled every case.',
    },
  ],
  contextArtefacts: [
    {
      id: 'result-type',
      type: 'code',
      title: 'The Result type from the session',
      language: 'ts',
      content:
        "type Result<T> =\n  | { kind: 'ok'; value: T }\n  | { kind: 'err'; reason: string };",
    },
  ],
  challenges: [
    {
      id: 'tsf-004-c1',
      type: 'multiple-choice',
      title: 'Why the Tag Works',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext:
        "A teammate asks why result.kind === 'ok' lets them read result.value without any cast.",
      prompt: 'What makes the discriminated union narrow so cleanly?',
      options: [
        {
          id: 'a',
          label:
            'kind is a literal type in each branch, so comparing it tells the compiler exactly which object shape you hold.',
          isCorrect: true,
          feedback:
            "Exactly: 'ok' and 'err' are literal types, and the equality check is runtime evidence tied to one branch each.",
        },
        {
          id: 'b',
          label: 'TypeScript checks the shapes at runtime whenever a union is involved.',
          isCorrect: false,
          feedback:
            'Types are erased at runtime — the narrowing happens in the compiler, powered by your own equality check.',
        },
        {
          id: 'c',
          label: 'value and reason are optional properties, so reading either is always allowed.',
          isCorrect: false,
          feedback:
            'Neither property is optional — and if they were, every read would need a null check. The tag is what narrows.',
        },
        {
          id: 'd',
          label: 'The generic <T> parameter tells the compiler which branch is active.',
          isCorrect: false,
          feedback:
            'Generics parameterise the value type; they say nothing about which union member you hold.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Focus on the kind field — what type does it have in each branch?' },
        {
          level: 2,
          title: 'Concept',
          content:
            "In a discriminated union every member carries a unique literal tag. Comparing the tag narrows to that member.",
        },
        {
          level: 3,
          title: 'Specific clue',
          content: "kind is not string — in one branch its type is exactly 'ok', in the other exactly 'err'.",
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Choose the option about literal tags: the equality check on a literal-typed field is what tells the compiler which shape you hold.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Discriminant understood' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason:
            'The pattern stayed folklore instead of understanding, and the next union was built without a tag.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.discriminated-unions', label: 'Discriminated unions' },
      ],
      successFeedback:
        'You can now explain the pattern, not just copy it — the tag is a literal, the check is evidence.',
      failureFeedback:
        'Look at the type of kind inside each branch of the union. It is narrower than string.',
    },
    {
      id: 'tsf-004-c2',
      type: 'code-review',
      title: 'Review: The Boolean Validator',
      difficulty: 'medium',
      tags: ['typescript', 'testing'],
      storyContext:
        'This validator predates the session. Review it against the Result lesson before it spreads further.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'validator',
          type: 'code',
          title: 'amount-validator.ts',
          language: 'ts',
          content:
            "export function validateAmount(input: string): boolean {\n  const amount = Number(input);\n  if (Number.isNaN(amount)) {\n    return false;\n  }\n  if (amount <= 0) {\n    throw new Error('amount must be positive');\n  }\n  return true;\n}",
        },
      ],
      findings: [
        {
          id: 'boolean-loses-detail',
          label: 'Returning boolean discards why validation failed and the parsed value itself',
          isCorrect: true,
          feedback:
            'The session lesson exactly: false cannot say what went wrong, and the caller must re-parse the input.',
        },
        {
          id: 'number-cast',
          label: 'Number(input) is unsafe and should be parseFloat',
          isCorrect: false,
          feedback:
            'Number() is a fine parse here — its NaN result is even checked. The problem is what happens after.',
        },
        {
          id: 'throw-mixed',
          label: 'One failure returns false while another throws — two error channels in one function',
          isCorrect: true,
          feedback:
            'Callers must both check the return and wrap in try/catch. Result<number> makes one explicit channel.',
        },
        {
          id: 'isnan-check',
          label: 'Number.isNaN is the wrong API for detecting a failed parse',
          isCorrect: false,
          feedback:
            'Number.isNaN is exactly right — unlike global isNaN it does not coerce its argument.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Trace what a caller learns in each failure case.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Expected domain failures should come back as data (Result), on a single channel, with the reason attached.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Both real issues are about how failure leaves the function, not how the number is parsed.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Flag the boolean return and the mixed throw/return channels. The parsing lines are healthy.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Validator reviewed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason:
            'The two-channel validator became the template for six more validators before anyone objected.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.discriminated-unions', label: 'Discriminated unions' },
        { topicId: 'zod.error-handling', label: 'Errors as data' },
      ],
      successFeedback:
        'You caught both channels. ok(value) | err(reason) gives callers one honest path.',
      failureFeedback:
        'Count the ways this function can fail and how each reaches the caller. The parse itself is fine.',
    },
  ],
  reflectionPrompt:
    'What is one function in our codebase that throws where a Result would serve callers better?',
  rewards: [{ type: 'xp', amount: 10, label: 'Failure made explicit' }],
};
