import { MissionDefinition } from '@academy/content-model';

/** Nx Monorepo Maze 2 — "Shared UI Library" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const nxMission002SharedUi: MissionDefinition = {
  id: 'nx-monorepo-maze-002-shared-ui-library',
  campaignId: 'nx-monorepo-maze',
  title: 'Shared UI Library',
  summary: 'Give the reusable tile a proper home and a sensible tag.',
  difficulty: 'easy',
  learningObjectives: [
    'Place shared UI in a ui-tagged library',
    'Choose a library type that matches its role',
    'Keep UI libraries dependency-light',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The order tile is moving out of the app. Where it lands — and how it is tagged — decides who can use it and what it may depend on.',
    },
  ],
  contextArtefacts: [
    {
      id: 'lib-types',
      type: 'message',
      title: 'Nx library types in this workspace',
      content: 'type:feature · type:ui · type:data-access · type:util',
    },
  ],
  challenges: [
    {
      id: 'nx-monorepo-maze-002-c1',
      type: 'multiple-choice',
      title: 'Tag the Library',
      difficulty: 'easy',
      tags: ['nx'],
      storyContext: 'The tile is presentational and used by several features.',
      prompt: 'What library and tag should the shared tile get?',
      options: [
        {
          id: 'b',
          label: 'A type:feature library, so it can fetch its own data too',
          isCorrect: false,
          feedback:
            'Feature libraries own flows and data; a reusable presentational tile should stay dumb and UI-tagged.',
        },
        {
          id: 'c',
          label: 'A type:data-access library, since it shows customer data',
          isCorrect: false,
          feedback:
            'Showing data is not accessing it — data-access is for services/state, not presentational components.',
        },
        {
          id: 'a',
          label:
            'A libs/ui/order-tile library tagged type:ui — it may depend on util, but not on features or data-access',
          isCorrect: true,
          feedback:
            'A presentational component is a ui library; the ui tag keeps it dependency-light so any feature can safely import it.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'What kind of thing is a presentational tile?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Library type follows role: ui for presentational components, data-access for services/state, feature for flows, util for helpers. The tag drives what it may depend on.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'A dumb, reusable component is type:ui.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Place it in a type:ui library.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Library tagged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 10,
          reason: 'A mis-tagged UI library was allowed to depend on features.',
        },
      ],
      helpLinks: [
        { topicId: 'nx.tag-rules', label: 'Tags and boundary rules' },
        {
          topicId: 'nx.libraries-boundaries',
          label: 'Nx libraries and boundaries',
        },
      ],
      successFeedback:
        'A ui-tagged library, dependency-light and importable by any feature.',
      failureFeedback:
        'A presentational, reusable component is a ui library — not feature or data-access.',
    },
  ],
  reflectionPrompt:
    'Why does the library type you choose matter as much as the code inside it?',
  rewards: [{ type: 'xp', amount: 5, label: 'UI library placed' }],
};
