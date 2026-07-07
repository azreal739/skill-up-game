import { MissionDefinition } from '@academy/content-model';

/** Nx Monorepo Maze 3 — "Feature Library Boundary" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const nxMission003FeatureBoundary: MissionDefinition = {
  id: 'nx-monorepo-maze-003-feature-library-boundary',
  campaignId: 'nx-monorepo-maze',
  title: 'Feature Library Boundary',
  summary: 'One feature reaches into another. Restore the boundary.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise a forbidden feature-to-feature import',
    'Extract shared code to the right layer',
    'Keep features independent',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The checkout feature imports a helper straight out of the orders feature. The dependency graph now shows the two tangled together. Fix it the right way.',
    },
  ],
  contextArtefacts: [
    {
      id: 'bad-import',
      type: 'code',
      title: 'libs/features/checkout/src/lib/checkout.ts',
      language: 'ts',
      content: "import { formatMoney } from '@org/features/orders'; // reaching into another feature",
    },
  ],
  challenges: [
    {
      id: 'nx-monorepo-maze-003-c1',
      type: 'multiple-choice',
      title: 'Restore the Boundary',
      difficulty: 'medium',
      tags: ['nx'],
      storyContext: 'formatMoney is a pure helper both features need.',
      prompt: 'How should the shared helper be made available to both features?',
      options: [
        {
          id: 'a',
          label: 'Move formatMoney into a libs/util/money library both features import',
          isCorrect: true,
          feedback:
            'Shared pure helpers belong in a util library. Both features depend inward on util — no feature-to-feature edge.',
        },
        {
          id: 'b',
          label: 'Add checkout → orders to the allowed dependencies so the import is legal',
          isCorrect: false,
          feedback: 'Legalising a feature-to-feature dependency spreads the tangle instead of removing it.',
        },
        {
          id: 'c',
          label: 're-export formatMoney from checkout so others import it from there instead',
          isCorrect: false,
          feedback: 'That just moves the coupling around — features still depend on each other via re-exports.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Shared pure helpers have a natural home that is not a feature.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Features must not depend on each other. Shared behaviour is extracted to util (pure helpers), ui (components) or data-access (services) — layers features are allowed to depend on.',
        },
        { level: 3, title: 'Specific clue', content: 'formatMoney is a pure function — which library type is that?' },
        { level: 4, title: 'Guided solution', content: 'Extract formatMoney to a util library.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Boundary restored' }],
      consequences: [{ type: 'technical-debt', delta: 15, reason: 'A feature-to-feature import tangled two teams’ code.' }],
      helpLinks: [
        { topicId: 'nx.libraries-boundaries', label: 'Nx libraries and boundaries' },
        { topicId: 'nx.tag-rules', label: 'Tags and boundary rules' },
      ],
      successFeedback: 'The helper lives in util; both features depend inward — no tangle.',
      failureFeedback: 'Legalising or re-exporting the cross-feature import keeps the coupling. Extract to util.',
    },
  ],
  reflectionPrompt: 'What makes feature-to-feature dependencies so corrosive as a monorepo scales?',
  rewards: [{ type: 'xp', amount: 5, label: 'Features independent' }],
};
