import { MissionDefinition } from '@academy/content-model';

/** Nx Monorepo Maze 1 — "Apps vs Libs" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const nxMission001AppsVsLibs: MissionDefinition = {
  id: 'nx-monorepo-maze-001-apps-vs-libs',
  campaignId: 'nx-monorepo-maze',
  title: 'Apps vs Libs',
  summary: 'The app has swollen with logic that belongs in libraries. Decide what moves.',
  difficulty: 'easy',
  learningObjectives: [
    'Keep applications thin',
    'Move reusable logic into libraries',
    'Recognise what belongs where',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The monorepo is growing and the main app has become a dumping ground — services, models and shared components all live inside it. Start untangling by deciding what belongs in a library.',
    },
  ],
  contextArtefacts: [
    {
      id: 'app-contents',
      type: 'diagram',
      title: 'apps/portal/src (today)',
      content:
        'app.component + routes            (app shell)\nservices/order.service.ts         (used by 3 features)\nmodels/order.ts                   (shared types)\nui/order-tile.component.ts        (reused UI)',
    },
  ],
  challenges: [
    {
      id: 'nx-monorepo-maze-001-c1',
      type: 'multiple-choice',
      title: 'Thin the App',
      difficulty: 'easy',
      tags: ['nx'],
      storyContext: 'An app should wire libraries together, not own reusable code.',
      prompt: 'Which items should move out of the app into libraries?',
      options: [
        {
          id: 'a',
          label: 'The order service, the order models, and the reusable tile — into data-access, util and ui libraries',
          isCorrect: true,
          feedback:
            'Shared services, types and UI belong in libraries so they can be owned, tagged, tested and reused. The app keeps only the shell and routing.',
        },
        {
          id: 'b',
          label: 'Nothing — keeping everything in the app is simpler',
          isCorrect: false,
          feedback:
            'A fat app blocks reuse and independent ownership, and every change rebuilds everything. That is the maze this campaign untangles.',
        },
        {
          id: 'c',
          label: 'Move the app shell and routes into a library, leave the services in the app',
          isCorrect: false,
          feedback: 'Backwards — the shell/routing is exactly what stays in the app; the reusable code is what moves out.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What in here is reused by more than the app itself?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Apps are thin shells that compose libraries. Reusable services, models and UI belong in data-access, util and ui libraries respectively.',
        },
        { level: 3, title: 'Specific clue', content: 'The service, models and tile are all reused — they move; the shell stays.' },
        { level: 4, title: 'Guided solution', content: 'Move the service, models and tile into libraries.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'App thinned' }],
      consequences: [{ type: 'technical-debt', delta: 10, reason: 'A fat app kept reusable code locked away from other teams.' }],
      helpLinks: [{ topicId: 'nx.apps-vs-libs', label: 'Apps vs libraries' }],
      successFeedback: 'Shell in the app, everything reusable in libraries — the maze begins to open up.',
      failureFeedback: 'Reusable services, types and UI move to libraries; the app keeps only the shell.',
    },
  ],
  reflectionPrompt: 'What is currently trapped inside your app that three features would happily share?',
  rewards: [{ type: 'xp', amount: 5, label: 'Into the maze' }],
};
