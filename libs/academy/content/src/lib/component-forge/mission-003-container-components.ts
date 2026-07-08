import { MissionDefinition } from '@academy/content-model';

/** Component Forge 3 — "Container Components" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const cfMission003Container: MissionDefinition = {
  id: 'component-forge-003-container-components',
  campaignId: 'component-forge',
  title: 'Container Components',
  summary:
    'Now build the smart half: the container that feeds the reusable tile.',
  difficulty: 'medium',
  learningObjectives: [
    'Give the container responsibility for data and state',
    'Keep presentational children free of services',
    'Pass data down and handle events coming up',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The tile is now purely presentational. The ops dashboard needs a container that loads its customers and renders a tile for each — and reacts when a tile is clicked.',
    },
  ],
  contextArtefacts: [
    {
      id: 'tile-api',
      type: 'code',
      title: 'The presentational tile’s public API',
      language: 'ts',
      content:
        '@Input({ required: true }) customer!: Customer;\n@Output() selected = new EventEmitter<Customer>();',
    },
  ],
  challenges: [
    {
      id: 'component-forge-003-c1',
      type: 'multiple-choice',
      title: 'Wire the Container',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'The dashboard container has customers$ from the service and an openCustomer() handler.',
      prompt:
        'Which container template correctly uses the presentational tile?',
      options: [
        {
          id: 'b',
          label:
            '@for (id of customerIds(); track id) {\n  <app-customer-tile [customerId]="id" />\n}',
          isCorrect: false,
          feedback:
            'The tile no longer takes an id or fetches — that was the coupling we removed. Pass the resolved customer.',
        },
        {
          id: 'a',
          label:
            '@for (c of customers(); track c.id) {\n  <app-customer-tile [customer]="c" (selected)="openCustomer($event)" />\n}',
          isCorrect: true,
          feedback:
            'The container loads the data and passes each customer in via [customer], and handles the (selected) event coming back up. Clean smart/dumb split.',
        },
        {
          id: 'c',
          label:
            '<app-customer-tile></app-customer-tile>\n// the tile injects the service and loops internally',
          isCorrect: false,
          feedback:
            'That pushes data-loading back into the presentational tile — exactly the anti-pattern we fixed.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'The container owns the data; the tile just renders one customer.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Containers fetch and hold state, then pass resolved data down with property bindings and listen to child events with (output) bindings.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'Look for the option that binds [customer] and listens to (selected).',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Pick the @for that passes [customer]="c" and handles (selected)="openCustomer($event)".',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Container wired' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'A misused tile rendered blank rows on the dashboard.',
        },
      ],
      helpLinks: [
        {
          topicId: 'angular.presentational-vs-container',
          label: 'Presentational vs container',
        },
        { topicId: 'angular.inputs-outputs', label: 'Inputs and outputs' },
      ],
      successFeedback:
        'Data down, events up — the container feeds a dumb, reusable tile.',
      failureFeedback:
        'The tile takes a resolved customer and emits selection; the container owns everything else.',
    },
  ],
  reflectionPrompt:
    'What belongs in a container that should never leak into a presentational child?',
  rewards: [{ type: 'xp', amount: 5, label: 'Smart/dumb split complete' }],
};
