import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — pure functions (knowledge pack 01/02: same input, same
 * output, no hidden state; 07: "FP is not fancy syntax").
 */
export const fnFp001PureFunctions: MissionDefinition = {
  id: 'fp-001-pure-functions',
  campaignId: 'fp-typescript',
  title: 'Pure Functions First',
  summary:
    'The session’s opening move: functions that depend on nothing hidden and change nothing outside themselves.',
  difficulty: 'intro',
  learningObjectives: [
    'State the two rules of a pure function',
    'Spot the hidden dependency that makes a function impure',
    'Say why purity is about predictability, not syntax',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'We opened the functional programming session with a warning: FP is not arrow functions and clever one-liners. It is a promise — same input, same output, nothing touched on the way.',
    },
    {
      speaker: 'Team Lead',
      text: 'Every refactor in this campaign comes from our calculator exercise. Pure functions are the foundation the rest builds on.',
    },
  ],
  contextArtefacts: [
    {
      id: 'two-adders',
      type: 'code',
      title: 'Two functions from the warm-up',
      language: 'ts',
      content:
        'let taxRate = 0.15;\n\nfunction addTaxA(price: number): number {\n  return price * (1 + taxRate);\n}\n\nfunction addTaxB(price: number, rate: number): number {\n  return price * (1 + rate);\n}',
    },
  ],
  challenges: [
    {
      id: 'fp-001-c1',
      type: 'multiple-choice',
      title: 'Which One Is Pure?',
      difficulty: 'intro',
      tags: ['typescript'],
      storyContext:
        'The warm-up asked the room: one of these is pure, one is a bug factory. Which, and why?',
      prompt: 'Which statement is right?',
      options: [
        {
          id: 'a',
          label: 'Both are pure — neither one mutates anything.',
          isCorrect: false,
          feedback:
            'Not mutating is only half the promise. addTaxA also has to give the same answer for the same input — it does not.',
        },
        {
          id: 'b',
          label: 'addTaxA is pure because it is shorter and uses no extra parameter.',
          isCorrect: false,
          feedback: 'Purity is not brevity — the hidden taxRate is exactly the problem.',
        },
        {
          id: 'c',
          label:
            'addTaxB is pure: everything it depends on arrives as a parameter, so the same inputs always give the same output.',
          isCorrect: true,
          feedback:
            'That is the definition. addTaxA silently changes behaviour whenever someone edits taxRate.',
        },
        {
          id: 'd',
          label: 'Neither is pure, because multiplication rounds floating-point numbers.',
          isCorrect: false,
          feedback:
            'Floating-point is deterministic — the same inputs still give the same output, which is all purity asks.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Find the value one function reads that is not a parameter.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Pure means: output depends only on inputs, and nothing outside is read from or written to.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Change taxRate to 0.2 — which function’s answer just changed without its inputs changing?',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'addTaxB takes the rate as a parameter — pick the option that says so.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Purity defined' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'A hidden rate change altered prices in three screens at once.',
        },
      ],
      helpLinks: [{ topicId: 'fp.pure-functions', label: 'Pure functions' }],
      successFeedback: 'Inputs in, output out, nothing else — you can now test this function with one line.',
      failureFeedback: 'Ask: if I call it twice with the same argument, can the answers differ? Why?',
    },
    {
      id: 'fp-001-c2',
      type: 'multiple-choice',
      title: 'Why the Team Cared',
      difficulty: 'easy',
      tags: ['typescript'],
      storyContext:
        'A junior asked, fairly: “the impure one works — why rewrite it?” The room answered with one word.',
      prompt: 'What is the practical payoff of keeping core logic pure?',
      options: [
        {
          id: 'a',
          label:
            'Predictability: pure functions can be tested with plain assertions, reused anywhere, and composed without surprises.',
          isCorrect: true,
          feedback:
            'That was the word — predictable. Test without setup, reuse without fear, compose without side effects.',
        },
        {
          id: 'b',
          label: 'Performance: pure functions compile to faster JavaScript.',
          isCorrect: false,
          feedback:
            'Purity is about correctness, not speed — engines do not reward it with faster code.',
        },
        {
          id: 'c',
          label: 'Style points: modern codebases simply expect arrow functions everywhere.',
          isCorrect: false,
          feedback:
            'The session’s first warning: FP as fashion misses the point entirely. Syntax is secondary.',
        },
        {
          id: 'd',
          label: 'Smaller bundles: pure functions tree-shake better than classes.',
          isCorrect: false,
          feedback:
            'Tree-shaking cares about imports, not purity — a side-effectful function shakes just the same.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Think about what a test for addTaxB needs. Now one for addTaxA.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'No hidden state means no setup, no mocks, no ordering — behaviour you can hold in your head.',
        },
        { level: 3, title: 'Specific clue', content: 'The payoff is a property of behaviour, not of the compiled output.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Pick predictability — testable, reusable, composable is the whole sale.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Purpose stated' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'FP stayed “a style choice” in the team’s heads, and the next core module shipped stateful.',
        },
      ],
      helpLinks: [{ topicId: 'fp.pure-functions', label: 'Pure functions' }],
      successFeedback: 'Predictability is the product — everything else in this campaign builds on it.',
      failureFeedback: 'The honest answers are about behaviour under test and reuse, not speed or fashion.',
    },
  ],
  reflectionPrompt: 'Name one function you own that reads module-level state. What would its pure signature be?',
  rewards: [{ type: 'xp', amount: 5, label: 'Foundation laid' }],
};
