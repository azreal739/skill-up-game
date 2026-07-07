import { MissionDefinition } from '@academy/content-model';

/** Component Forge 1 — "The UI Blueprint" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const cfMission001UiBlueprint: MissionDefinition = {
  id: 'component-forge-001-ui-blueprint',
  campaignId: 'component-forge',
  title: 'The UI Blueprint',
  summary: 'Before building, decide how a customer tile splits into reusable parts.',
  difficulty: 'easy',
  learningObjectives: [
    'Separate what a component renders from where its data comes from',
    'Recognise a reusable component boundary',
    'Plan a component tree before writing code',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The UI guild is standardising the platform on reusable components. Your first assignment is a blueprint, not code: the customer dashboard needs a tile that shows a customer and their status.',
    },
    {
      speaker: 'Mission Control',
      text: 'Decide how to split it so the tile can be reused on three different screens, each of which loads its data differently.',
    },
  ],
  contextArtefacts: [
    {
      id: 'requirement',
      type: 'ticket',
      title: 'UI-Guild-11 — Customer tile',
      content:
        'The tile shows: name, tier badge, and an online/offline status dot.\nIt must appear on the ops dashboard, the search results page, and the account page.\nEach screen already loads customers a different way.',
    },
  ],
  challenges: [
    {
      id: 'component-forge-001-c1',
      type: 'multiple-choice',
      title: 'Draw the Boundary',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext: 'The tile must render the same everywhere but get its data from three different owners.',
      prompt: 'How should the tile be designed so all three screens can reuse it?',
      options: [
        {
          id: 'a',
          label:
            'A presentational CustomerTile that takes the customer as an @Input; each screen fetches its own data and passes it in',
          isCorrect: true,
          feedback:
            'The tile stays dependency-free and reusable; the differing data-loading lives in each screen (the container). That is the reusable boundary.',
        },
        {
          id: 'b',
          label: 'A CustomerTile that injects CustomerService and fetches its own customer by id',
          isCorrect: false,
          feedback:
            'Baking the fetch into the tile ties it to one data source — the search and account screens load customers differently, so it would not reuse.',
        },
        {
          id: 'c',
          label: 'Three separate tile components, one per screen, copied and adjusted',
          isCorrect: false,
          feedback:
            'Three copies means three places to fix every future change — the opposite of a reusable component.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Separate what the tile shows from where the data comes from.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'A presentational component receives data via @Input and stays free of service dependencies, so any container can supply the data. That is what makes it reusable.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'The three screens load data differently — so the tile must NOT do the loading itself.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Pick the presentational tile that takes the customer as an @Input and lets each screen fetch and pass it.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Blueprint drawn' }],
      consequences: [
        { type: 'technical-debt', delta: 10, reason: 'A tile coupled to one data source blocked reuse.' },
      ],
      helpLinks: [
        { topicId: 'angular.presentational-vs-container', label: 'Presentational vs container' },
        { topicId: 'angular.inputs-outputs', label: 'Inputs and outputs' },
      ],
      successFeedback: 'A presentational tile plus per-screen containers — reusable by design.',
      failureFeedback: 'The reusable part is the one that takes data in and does not fetch it itself.',
    },
  ],
  reflectionPrompt: 'Which parts of your current UI are hard to reuse because they fetch their own data?',
  rewards: [{ type: 'xp', amount: 5, label: 'Forge lit' }],
};
