import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — reimplementing HOFs with loops (knowledge pack 05:
 * mapLoop/filterLoop/reduceLoop; common mistakes: returning any[],
 * mutating input, failing to type the accumulator).
 */
export const fnFp005UnderTheHood: MissionDefinition = {
  id: 'fp-005-under-the-hood',
  campaignId: 'fp-typescript',
  title: 'HOFs Under the Hood',
  summary:
    'Rebuild mapLoop and reduceLoop with generics and for-loops — the exercise that removed the magic.',
  difficulty: 'medium',
  learningObjectives: [
    'Implement map as a disciplined loop',
    'Type a generic accumulator honestly',
    'Explain HOFs as patterns, not magic',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'The single best exercise of the series: build mapLoop, filterLoop and reduceLoop yourself. Once you have written them, the built-ins stop being magic and start being patterns.',
    },
    {
      speaker: 'Team Lead',
      text: 'The three mistakes everyone made on the first try: returning any[], mutating the input, and leaving the accumulator untyped. Watch for all three.',
    },
  ],
  contextArtefacts: [
    {
      id: 'goal',
      type: 'code',
      title: 'The target behaviour',
      language: 'ts',
      content:
        "mapLoop([1, 2, 3], (n) => n * 2)        // [2, 4, 6]\nmapLoop(['a', 'b'], (s) => s.length)    // [1, 1]\nreduceLoop([1, 2, 3], (a, n) => a + n, 0) // 6",
    },
  ],
  challenges: [
    {
      id: 'fp-005-c1',
      type: 'multiple-choice',
      title: 'Build mapLoop',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext: 'mapLoop must work for any input type and any output type — no any allowed.',
      prompt: 'Which implementation earns full marks?',
      options: [
        {
          id: 'a',
          label:
            'function mapLoop<T>(items: T[], fn: (item: T) => T): T[] {\n  const out: T[] = [];\n  for (const item of items) out.push(fn(item));\n  return out;\n}',
          isCorrect: false,
          feedback:
            'One type parameter forces output to equal input — (s) => s.length on strings no longer compiles.',
        },
        {
          id: 'b',
          label:
            'function mapLoop(items: any[], fn: (item: any) => any): any[] {\n  const out = [];\n  for (const item of items) out.push(fn(item));\n  return out;\n}',
          isCorrect: false,
          feedback:
            'Mistake #1 from the session, verbatim: it runs, and every caller downstream loses their types.',
        },
        {
          id: 'c',
          label:
            'function mapLoop<T, U>(items: T[], fn: (item: T) => U): U[] {\n  items.forEach((item, i) => (items[i] = fn(item) as never));\n  return items as unknown as U[];\n}',
          isCorrect: false,
          feedback:
            'Two casts and an input mutation — mistake #2 wearing generic syntax as a disguise.',
        },
        {
          id: 'd',
          label:
            'function mapLoop<T, U>(items: T[], fn: (item: T) => U): U[] {\n  const out: U[] = [];\n  for (const item of items) out.push(fn(item));\n  return out;\n}',
          isCorrect: true,
          feedback:
            'Two type parameters, a fresh output array, input untouched — the model answer from the session.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The examples change the element type — count the type parameters needed.' },
        {
          level: 2,
          title: 'Concept',
          content: 'map is T[] → U[]: input type in, possibly different output type out, new array returned.',
        },
        { level: 3, title: 'Specific clue', content: 'Rule out any implementation writing into items.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose <T, U> with const out: U[] = [] and a push per element.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'mapLoop built' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The any[] helper spread through the utils folder and callers re-typed by hand.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.generics', label: 'Generics' },
        { topicId: 'fp.higher-order-functions', label: 'map, filter, reduce' },
      ],
      successFeedback: 'You have now written map. The built-in will never be magic again.',
      failureFeedback: 'Check the three session mistakes in order: any[]? mutation? single type parameter?',
    },
    {
      id: 'fp-005-c2',
      type: 'multiple-choice',
      title: 'Type the Accumulator',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext:
        'reduceLoop is next. The accumulator type is the whole puzzle: fold Ticket[] into a number, or into a Map, or into a string.',
      prompt: 'Which signature types reduceLoop correctly?',
      options: [
        {
          id: 'a',
          label: 'function reduceLoop<T>(items: T[], fn: (acc: T, item: T) => T, seed: T): T',
          isCorrect: false,
          feedback:
            'Accumulator locked to the element type — folding tickets into a count no longer compiles.',
        },
        {
          id: 'b',
          label:
            'function reduceLoop<T, A>(items: T[], fn: (acc: A, item: T) => A, seed: A): A',
          isCorrect: true,
          feedback:
            'Two independent parameters: elements are T, the accumulator is A, and the seed pins A for inference.',
        },
        {
          id: 'c',
          label:
            'function reduceLoop<T>(items: T[], fn: (acc: unknown, item: T) => unknown, seed: unknown): unknown',
          isCorrect: false,
          feedback:
            'unknown forces every caller to cast the result — mistake #3 was an UNtyped accumulator; this is one with extra steps.',
        },
        {
          id: 'd',
          label: 'function reduceLoop<A>(items: A[], fn: (acc: A, item: A) => A, seed?: A): A',
          isCorrect: false,
          feedback:
            'Same single-type trap plus an optional seed — mission 4 just showed why the seed must not be optional.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Elements and accumulator are different things. How many parameters is that?' },
        {
          level: 2,
          title: 'Concept',
          content: 'reduce is (A, T) → A repeated: the accumulator type is independent of the element type.',
        },
        { level: 3, title: 'Specific clue', content: 'The seed argument is what lets the compiler infer A.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose <T, A> with a required seed: A — the fold’s full contract in one line.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Accumulator typed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'A single-type reduce helper forced awkward workarounds in every non-numeric fold.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.generics', label: 'Generics' },
        { topicId: 'fp.higher-order-functions', label: 'map, filter, reduce' },
      ],
      successFeedback: 'T for elements, A for the fold — reduce’s type is its documentation.',
      failureFeedback: 'Try folding Ticket[] into a number under each signature. Only one allows it.',
    },
  ],
  reflectionPrompt: 'Having written mapLoop, describe built-in map in one sentence — no “magic” allowed.',
  rewards: [{ type: 'xp', amount: 10, label: 'Magic removed' }],
};
