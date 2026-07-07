import { MissionDefinition } from '@academy/content-model';

/** TypeScript Trials 4 — "Generic Utility" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const ttMission004Generic: MissionDefinition = {
  id: 'typescript-trials-004-generic-utility',
  campaignId: 'typescript-trials',
  title: 'Generic Utility',
  summary: 'A shared helper returns any, poisoning every caller. Make it generic.',
  difficulty: 'medium',
  learningObjectives: [
    'Preserve caller types with a generic',
    'Recognise where any leaks type safety',
    'Write reusable helpers without widening to any',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'A first() utility used across the platform returns any, so every caller loses its element type and defects slip through downstream. Fix the helper at the source.',
    },
  ],
  contextArtefacts: [
    {
      id: 'first-util',
      type: 'code',
      title: 'array-utils.ts',
      language: 'ts',
      content: 'export function first(items: any[]): any {\n  return items[0];\n}\n\nconst name = first(customers).nam; // typo not caught — any',
    },
  ],
  challenges: [
    {
      id: 'typescript-trials-004-c1',
      type: 'multiple-choice',
      title: 'Make It Generic',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext: 'first(customers) should return Customer | undefined, not any.',
      prompt: 'Which signature preserves the caller’s element type?',
      options: [
        {
          id: 'a',
          label: 'export function first<T>(items: T[]): T | undefined {\n  return items[0];\n}',
          isCorrect: true,
          feedback:
            'The generic T flows from the argument to the return, so first(customers) is Customer | undefined and the .nam typo is caught.',
        },
        {
          id: 'b',
          label: 'export function first(items: unknown[]): unknown {\n  return items[0];\n}',
          isCorrect: false,
          feedback:
            'unknown is safer than any but still loses the element type — callers must re-narrow every result.',
        },
        {
          id: 'c',
          label: 'export function first(items: any[]): any { return items[0]; } // add a JSDoc @returns',
          isCorrect: false,
          feedback: 'A comment does not restore type safety — the return is still any and typos still compile.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The return type should match whatever element type was passed in.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'A generic type parameter <T> captures the caller’s type and carries it through, so the relationship between input and output is preserved instead of collapsing to any.',
        },
        { level: 3, title: 'Specific clue', content: 'The right signature has <T>, takes T[] and returns T | undefined.' },
        { level: 4, title: 'Guided solution', content: 'Make first generic over T.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Helper genericised' }],
      consequences: [{ type: 'technical-debt', delta: 10, reason: 'An any-returning helper spread untyped values across callers.' }],
      helpLinks: [
        { topicId: 'typescript.generics', label: 'Generics' },
        { topicId: 'typescript.unknown-vs-any', label: 'unknown vs any' },
      ],
      successFeedback: 'The generic preserves each caller’s type — typos downstream now fail to compile.',
      failureFeedback: 'unknown and comments both drop the element type. A generic <T> carries it through.',
    },
  ],
  reflectionPrompt: 'Which shared helpers in your code return any and quietly weaken every caller?',
  rewards: [{ type: 'xp', amount: 5, label: 'Generic mastered' }],
};
