import { MissionDefinition } from '@academy/content-model';

/** TypeScript Trials 1 — "Unknown Data" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const ttMission001UnknownData: MissionDefinition = {
  id: 'typescript-trials-001-unknown-data',
  campaignId: 'typescript-trials',
  title: 'Unknown Data',
  summary: 'Untyped data enters the app. Choose the type that keeps the compiler on.',
  difficulty: 'easy',
  learningObjectives: [
    'Prefer unknown over any at untyped boundaries',
    'Understand why any hides bugs',
    'Force a check before using external data',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The platform reads a cached blob from localStorage and JSON.parses it. Right now it is typed any, and defects keep escaping. Strengthen the boundary.',
    },
  ],
  contextArtefacts: [
    {
      id: 'parse-call',
      type: 'code',
      title: 'cache.service.ts',
      language: 'ts',
      content: 'const raw = localStorage.getItem(key);\nconst data: any = raw ? JSON.parse(raw) : null;\nreturn data.customer.name;',
    },
  ],
  challenges: [
    {
      id: 'typescript-trials-001-c1',
      type: 'multiple-choice',
      title: 'Type the Boundary',
      difficulty: 'easy',
      tags: ['typescript'],
      storyContext: 'JSON.parse returns whatever was stored — the compiler cannot know its shape.',
      prompt: 'How should the parsed value be typed so the compiler stays useful?',
      options: [
        {
          id: 'a',
          label: 'const data: unknown = raw ? JSON.parse(raw) : null; then validate/narrow before use',
          isCorrect: true,
          feedback:
            'unknown accepts anything but forbids using it until you narrow it — so data.customer.name won’t compile until you prove the shape.',
        },
        {
          id: 'b',
          label: 'Keep any — it is the same thing and less typing',
          isCorrect: false,
          feedback:
            'any silences the compiler entirely: data.customer.name compiles even when data is null, and crashes at runtime.',
        },
        {
          id: 'c',
          label: 'Cast it: const data = JSON.parse(raw) as CachedBlob',
          isCorrect: false,
          feedback: 'A cast asserts a shape the data may not have — it lies to the compiler rather than checking.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'You want a type that refuses to be used until it is checked.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'unknown and any both accept any value, but unknown will not let you access properties until you narrow it. any turns checking off.',
        },
        { level: 3, title: 'Specific clue', content: 'Only one option requires a check before data.customer.name.' },
        { level: 4, title: 'Guided solution', content: 'Type it unknown and narrow before use.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Boundary typed' }],
      consequences: [{ type: 'stability', delta: -5, reason: 'An any-typed parse crashed on a null cache.' }],
      helpLinks: [
        { topicId: 'typescript.unknown-vs-any', label: 'unknown vs any' },
        { topicId: 'typescript.narrowing', label: 'Narrowing' },
      ],
      successFeedback: 'unknown keeps the compiler on: you must prove the shape before you trust it.',
      failureFeedback: 'any and casts both skip the check. unknown forces you to narrow first.',
    },
  ],
  reflectionPrompt: 'Where in your codebase does any sit at a boundary that unknown would guard better?',
  rewards: [{ type: 'xp', amount: 5, label: 'Trial begun' }],
};
