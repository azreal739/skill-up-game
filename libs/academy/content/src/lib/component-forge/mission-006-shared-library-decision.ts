import { MissionDefinition } from '@academy/content-model';

/** Component Forge 6 — "Shared Library Decision" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const cfMission006SharedLibrary: MissionDefinition = {
  id: 'component-forge-006-shared-library-decision',
  campaignId: 'component-forge',
  title: 'Shared Library Decision',
  summary: 'Two teams want the tile. Decide where it should live in the monorepo.',
  difficulty: 'medium',
  learningObjectives: [
    'Place shared UI in a ui library, not inside a feature',
    'Respect Nx dependency boundaries',
    'Avoid feature-to-feature coupling',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The ops team built the tile inside their feature library. Now the search team wants it too. Where should the tile live so both can use it without tangling the monorepo?',
    },
  ],
  contextArtefacts: [
    {
      id: 'current-location',
      type: 'diagram',
      title: 'Current dependency picture',
      content:
        'libs/features/ops-dashboard  ← contains CustomerTile\nlibs/features/search          ← wants to import CustomerTile from ops-dashboard',
    },
  ],
  challenges: [
    {
      id: 'component-forge-006-c1',
      type: 'multiple-choice',
      title: 'Choose Its Home',
      difficulty: 'medium',
      tags: ['nx', 'angular'],
      storyContext: 'Nx boundary rules forbid one feature library importing from another.',
      prompt: 'Where should the reusable tile live?',
      options: [
        {
          id: 'a',
          label:
            'Move CustomerTile into a shared libs/ui/customer-tile library that both features depend on',
          isCorrect: true,
          feedback:
            'Shared presentational UI belongs in a ui library both features may import — no feature-to-feature edge, clean boundaries.',
        },
        {
          id: 'b',
          label: 'Let search import CustomerTile directly from the ops-dashboard feature library',
          isCorrect: false,
          feedback:
            'Feature-to-feature imports are exactly what Nx boundaries forbid — it tangles ownership and the dependency graph.',
        },
        {
          id: 'c',
          label: 'Copy the tile into the search feature so each team owns its own version',
          isCorrect: false,
          feedback: 'Two copies drift apart and double every future fix — the reuse you wanted is lost.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Shared things belong somewhere both teams may depend on.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'In Nx, features may depend on ui/data-access/util libraries but not on each other. Shared presentational components live in a ui library.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Only one option creates a library that both features can legally import.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Move the tile into a shared libs/ui/customer-tile library.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Home chosen' }],
      consequences: [
        { type: 'technical-debt', delta: 15, reason: 'A feature-to-feature import tangled the dependency graph.' },
      ],
      helpLinks: [{ topicId: 'nx.libraries-boundaries', label: 'Nx libraries and boundaries' }],
      successFeedback: 'Shared UI in a ui library — both features depend inward, no tangle.',
      failureFeedback: 'Cross-feature imports and copies both fail. Promote shared UI into a ui library.',
    },
  ],
  reflectionPrompt: 'Why do feature libraries importing each other cause problems as a codebase grows?',
  rewards: [{ type: 'xp', amount: 5, label: 'Library placed' }],
};
