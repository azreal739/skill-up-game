import { MissionDefinition } from '@academy/content-model';

/** Field Notes — narrowing (knowledge pack 02: typeof guards, in checks). */
export const fnTs003Narrowing: MissionDefinition = {
  id: 'ts-fund-003-narrowing',
  campaignId: 'ts-fundamentals',
  title: 'Narrowing the Possibilities',
  summary:
    'Teach the compiler which branch of a union you are in — with typeof, in, and honest control flow.',
  difficulty: 'easy',
  learningObjectives: [
    'Narrow a primitive union with typeof',
    'Narrow object unions with the in operator',
    'Read what the compiler knows inside each branch',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'Unions gave us honest types — now we need to work with them. Narrowing is how you convince the compiler, branch by branch, which member of a union you actually hold.',
    },
    {
      speaker: 'Team Lead',
      text: 'The rule from the session: narrow with evidence the runtime can check — typeof, in, equality — not with assertions that just silence the checker.',
    },
  ],
  contextArtefacts: [
    {
      id: 'raw-input',
      type: 'code',
      title: 'The search box hands us this',
      language: 'ts',
      content: 'function runSearch(query: string | number) {\n  // ...\n}',
    },
  ],
  challenges: [
    {
      id: 'tsf-003-c1',
      type: 'multiple-choice',
      title: 'Guard the Query',
      difficulty: 'easy',
      tags: ['typescript'],
      storyContext:
        'runSearch receives string | number. You need .trim() on strings and .toFixed(0) on numbers — safely.',
      prompt: 'Which body narrows the union correctly?',
      options: [
        {
          id: 'a',
          label: 'return (query as string).trim();',
          isCorrect: false,
          feedback:
            'An assertion is a promise, not a check — when query is 42, .trim() still explodes at runtime.',
        },
        {
          id: 'b',
          label: 'if (query.length !== undefined) { return query.trim(); }',
          isCorrect: false,
          feedback:
            'The compiler rejects this: .length does not exist on string | number, so the guard never compiles.',
        },
        {
          id: 'c',
          label: 'return query.toString().trim();',
          isCorrect: false,
          feedback:
            'This compiles but erases the distinction — numbers silently become trimmed strings instead of taking their own path.',
        },
        {
          id: 'd',
          label:
            "if (typeof query === 'string') { return query.trim(); }\nreturn query.toFixed(0);",
          isCorrect: true,
          feedback:
            'typeof is runtime evidence: inside the if, query is string; after it, number. Both branches are safe.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The compiler needs a check it can trust at runtime.' },
        {
          level: 2,
          title: 'Concept',
          content:
            "typeof narrows primitive unions: within if (typeof x === 'string'), x is string; in the else, the remaining members.",
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Rule out anything using `as` — an assertion narrows nothing at runtime.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            "Choose the typeof branch: trim() in the string case, toFixed() in the remaining number case.",
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Union narrowed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'An unguarded .trim() on a number threw in production search.',
        },
      ],
      helpLinks: [{ topicId: 'typescript.narrowing', label: 'Type narrowing' }],
      successFeedback: 'Runtime evidence, compile-time certainty — that is narrowing done right.',
      failureFeedback:
        'Prefer a check the runtime can actually make (typeof) over a promise the runtime never verifies (as).',
    },
    {
      id: 'tsf-003-c2',
      type: 'multiple-choice',
      title: 'Two Shapes, One Parameter',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext:
        'notify(target: EmailContact | SlackContact) — EmailContact has address, SlackContact has channel. No shared discriminant field yet.',
      prompt: 'Without changing the types, which check narrows to SlackContact?',
      options: [
        {
          id: 'a',
          label: "if (typeof target === 'object') { target.channel; }",
          isCorrect: false,
          feedback:
            'Both contacts are objects — typeof cannot tell two object shapes apart.',
        },
        {
          id: 'b',
          label: "if ('channel' in target) { target.channel; }",
          isCorrect: true,
          feedback:
            "The in operator checks for the distinguishing property at runtime, and TypeScript narrows the branch to SlackContact.",
        },
        {
          id: 'c',
          label: 'if (target instanceof SlackContact) { target.channel; }',
          isCorrect: false,
          feedback:
            'instanceof needs a class; these are plain interfaces — there is no constructor to test against at runtime.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What runtime difference exists between the two shapes?' },
        {
          level: 2,
          title: 'Concept',
          content:
            "For object unions without a discriminant, the in operator ('prop' in value) is the runtime check TypeScript understands.",
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Interfaces vanish at runtime — anything that needs a class or a typeof difference is out.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: "Select the 'channel' in target check — the only evidence both the runtime and the compiler accept.",
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Shape distinguished' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'A brittle shape check survived review and breaks the day contacts gain a field.',
        },
      ],
      helpLinks: [{ topicId: 'typescript.narrowing', label: 'Type narrowing' }],
      successFeedback:
        "You picked evidence over assertion again — 'in' narrowing scales to any structural union.",
      failureFeedback:
        'Interfaces do not exist at runtime. Find the check that inspects the object itself.',
    },
  ],
  reflectionPrompt:
    'Next mission adds a discriminant field on purpose. What would you name it, and why is that easier than in-checks?',
  rewards: [{ type: 'xp', amount: 10, label: 'Branches proven safe' }],
};
