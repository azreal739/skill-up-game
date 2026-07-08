import { MissionDefinition } from '@academy/content-model';

/** TypeScript Trials 6 — "Refactor Without Fear" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const ttMission006Refactor: MissionDefinition = {
  id: 'typescript-trials-006-refactor-without-fear',
  campaignId: 'typescript-trials',
  title: 'Refactor Without Fear',
  summary:
    'Rename a field across the codebase and let the compiler find every caller.',
  difficulty: 'medium',
  learningObjectives: [
    'Use types as a refactoring safety net',
    'Let the compiler enumerate breakage',
    'See why any / casts sabotage refactors',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Product wants Customer.name split into firstName and lastName. It is used in dozens of places. The safest refactor uses the type system as your checklist.',
    },
  ],
  contextArtefacts: [
    {
      id: 'refactor-context',
      type: 'code',
      title: 'The change',
      language: 'ts',
      content:
        '// before\ninterface Customer { name: string; }\n// after\ninterface Customer { firstName: string; lastName: string; }',
    },
  ],
  challenges: [
    {
      id: 'typescript-trials-006-c1',
      type: 'multiple-choice',
      title: 'Refactor Safely',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext:
        'Some call sites use customer.name via strongly typed code; a few go through an any-typed helper.',
      prompt: 'What is the safest way to complete this refactor?',
      options: [
        {
          id: 'b',
          label: 'Find-and-replace "name" with "firstName" across the repo',
          isCorrect: false,
          feedback:
            'Text replace hits unrelated names and misses computed access — it is blind to types and semantics.',
        },
        {
          id: 'c',
          label:
            'Add firstName/lastName but keep name too, cast where needed, and clean up later',
          isCorrect: false,
          feedback:
            'Keeping both fields and casting defers the work and leaves the codebase in a confusing half-migrated state.',
        },
        {
          id: 'a',
          label:
            'Change the interface first, then fix every compile error the type system reports — and remove the any helper so it stops hiding call sites',
          isCorrect: true,
          feedback:
            'The compiler becomes an exhaustive checklist of broken call sites — but only for typed code. Removing the any helper exposes the call sites it was hiding.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Let the compiler tell you exactly what broke.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'When a typed shape changes, every dependent call site becomes a compile error — a precise, exhaustive to-do list. any-typed code opts out of that list, so it must be removed to be safe.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'The safe answer changes the type first AND removes the any hiding places.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Change the interface, fix each compile error, and drop the any helper.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Refactored fearlessly' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 10,
          reason:
            'A blind find-replace left broken and half-migrated call sites.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.interfaces', label: 'Interfaces' },
        { topicId: 'typescript.unknown-vs-any', label: 'unknown vs any' },
      ],
      successFeedback:
        'The compiler drove the refactor — every real call site fixed, nothing missed.',
      failureFeedback:
        'Text replace and keep-both-and-cast both dodge the type system. Let it enumerate the breakage.',
    },
  ],
  reflectionPrompt:
    'How does even one any-typed helper undermine an otherwise type-safe refactor?',
  rewards: [
    { type: 'xp', amount: 5, label: 'Fearless' },
    { type: 'badge', id: 'refactor-ranger', label: 'Refactor Ranger' },
  ],
};
