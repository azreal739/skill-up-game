import { MissionDefinition } from '@academy/content-model';

/**
 * Component Forge boss — "Build the Reusable Tile System"
 * (13_CAMPAIGN_CONTENT_PACKS.md). Combines the campaign: split, type,
 * make accessible, and place it correctly.
 */
export const cfMission008BossTileSystem: MissionDefinition = {
  id: 'component-forge-008-boss-tile-system',
  campaignId: 'component-forge',
  title: 'Boss: Build the Reusable Tile System',
  summary:
    'Ship the tile system the whole platform will adopt — split, typed, accessible, well-placed.',
  difficulty: 'boss',
  learningObjectives: [
    'Combine smart/dumb separation, typing, a11y and boundaries',
    'Make platform-wide component decisions',
    'Deliver a component others can safely build on',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'This is the deliverable the whole campaign built toward: a reusable tile system every team will adopt. Four calls stand between you and shipping it.',
    },
    {
      speaker: 'Mission Control',
      text: 'Get the split right, type the API, make it accessible, and place it correctly in the monorepo. No shortcuts — everyone depends on this one.',
    },
  ],
  contextArtefacts: [
    {
      id: 'brief',
      type: 'ticket',
      title: 'FORGE-99 — Platform tile system',
      content:
        'Deliver a reusable tile used by ops, search and account screens.\nMust be: reusable across data sources, strongly typed, keyboard + screen-reader accessible, and correctly placed for shared use.',
    },
  ],
  challenges: [
    {
      id: 'component-forge-008-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — The Split',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'Three screens, three ways of loading customers.',
      prompt: 'What is the correct component split?',
      options: [
        {
          id: 'b',
          label: 'One Tile that injects the service and fetches by id',
          isCorrect: false,
          feedback:
            'Couples the tile to one data source — the three screens load differently.',
        },
        {
          id: 'a',
          label:
            'A presentational Tile (@Input customer, @Output selected) + a per-screen container that loads data',
          isCorrect: true,
          feedback:
            'Dumb tile, smart containers — reusable across every data source.',
        },
        {
          id: 'c',
          label: 'A Tile per screen to keep each team independent',
          isCorrect: false,
          feedback: 'Copies drift and defeat reuse.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Separate rendering from data-loading.',
        },
        {
          level: 2,
          title: 'Concept',
          content: 'Presentational inputs + container fetching = reusable.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'The tile takes a resolved customer and emits selection.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Pick the presentational tile + per-screen container.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Split right' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 10,
          reason: 'A coupled tile blocked reuse.',
        },
      ],
      helpLinks: [
        {
          topicId: 'angular.presentational-vs-container',
          label: 'Presentational vs container',
        },
      ],
      successFeedback: 'Dumb tile, smart containers.',
      failureFeedback: 'The reusable tile renders a customer it is given.',
    },
    {
      id: 'component-forge-008-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Type the API',
      difficulty: 'medium',
      tags: ['angular', 'typescript'],
      storyContext: 'Every team will bind to this public API.',
      prompt: 'Which public API is correctly typed?',
      options: [
        {
          id: 'b',
          label:
            '@Input() customer: any;\n@Output() selected = new EventEmitter<any>();',
          isCorrect: false,
          feedback:
            'any on a shared API removes safety for everyone binding to it.',
        },
        {
          id: 'c',
          label: '@Input() customerJson: string; // parse inside the tile',
          isCorrect: false,
          feedback:
            'Passing JSON strings pushes parsing into the presentational component — wrong layer and untyped.',
        },
        {
          id: 'a',
          label:
            '@Input({ required: true }) customer!: Customer;\n@Output() selected = new EventEmitter<Customer>();',
          isCorrect: true,
          feedback:
            'A required, typed input and a typed output — consumers get full compile-time safety.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Shared APIs deserve precise types.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Required typed inputs and typed outputs protect every consumer.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Look for Customer and EventEmitter<Customer>, no any.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Pick the required Customer input + EventEmitter<Customer>.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'API typed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 10,
          reason: 'An any-typed shared API weakened every consumer.',
        },
      ],
      helpLinks: [{ topicId: 'typescript.interfaces', label: 'Interfaces' }],
      successFeedback: 'A typed, required API — safe to build on.',
      failureFeedback: 'Avoid any and stringly-typed inputs on a shared API.',
    },
    {
      id: 'component-forge-008-c3',
      type: 'code-review',
      title: 'Stage 3 — Make It Accessible',
      difficulty: 'hard',
      tags: ['a11y', 'angular'],
      storyContext: 'Final a11y pass before adoption.',
      artefacts: [
        {
          id: 'boss-template',
          type: 'code',
          title: 'tile.component.html',
          language: 'html',
          content:
            '<div class="tile" (click)="selected.emit(customer)">\n  <span>{{ customer.name }}</span>\n  <span class="dot" [class.online]="customer.online"></span>\n</div>',
        },
      ],
      prompt: 'Select every accessibility blocker.',
      findings: [
        {
          id: 'div',
          label: 'Clickable <div> is not keyboard-operable',
          isCorrect: true,
          feedback: 'Use a <button> for a focusable, operable control.',
        },
        {
          id: 'name',
          label: 'No accessible name for the action',
          isCorrect: true,
          feedback: 'Add aria-label="Open {{ customer.name }}".',
        },
        {
          id: 'gap',
          label: 'The gap between name and dot is too small',
          isCorrect: false,
          feedback:
            'Spacing is a visual-polish concern, not an accessibility blocker.',
        },
        {
          id: 'colour',
          label: 'Status conveyed by dot colour alone',
          isCorrect: true,
          feedback: 'Add text/label — never colour alone.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Keyboard, name, and non-colour status.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Semantic control + accessible name + status not by colour alone.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Three blockers; the spacing note is not one.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Flag the div, the missing name, and the colour-only status.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Accessible' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason:
            'An inaccessible shared tile would exclude users platform-wide.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.semantics', label: 'Accessible markup' }],
      successFeedback:
        'Operable, named, and status conveyed in more than colour.',
      failureFeedback:
        'Keyboard access, an accessible name, and non-colour status are the three blockers.',
    },
    {
      id: 'component-forge-008-c4',
      type: 'multiple-choice',
      title: 'Stage 4 — Place It',
      difficulty: 'boss',
      tags: ['nx'],
      storyContext: 'Ops, search and account all need it.',
      prompt: 'Where does the finished tile system belong?',
      options: [
        {
          id: 'a',
          label: 'A shared libs/ui/tile library all three features depend on',
          isCorrect: true,
          feedback:
            'Shared UI in a ui library, depended on inward by every feature — clean boundaries, one source of truth.',
        },
        {
          id: 'b',
          label: 'Inside the ops-dashboard feature, imported by the others',
          isCorrect: false,
          feedback:
            'Feature-to-feature imports violate Nx boundaries and tangle ownership.',
        },
        {
          id: 'c',
          label: 'Directly in the app so any component can reach it',
          isCorrect: false,
          feedback:
            'App-level components are not shareable as a library and blur the boundary between app and reusable UI.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Shared UI has one correct kind of home.',
        },
        {
          level: 2,
          title: 'Concept',
          content: 'Features depend on ui libraries, never on each other.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'The answer is a ui library.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Place it in libs/ui/tile.',
        },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Tile system shipped' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 10,
          reason: 'Misplacing shared UI tangles the graph for every team.',
        },
      ],
      helpLinks: [
        {
          topicId: 'nx.libraries-boundaries',
          label: 'Nx libraries and boundaries',
        },
      ],
      successFeedback:
        'A reusable, typed, accessible tile system in a shared ui library — the whole platform can build on it. The Forge is complete.',
      failureFeedback:
        'Shared UI belongs in a ui library, not inside a feature or the app.',
    },
  ],
  reflectionPrompt:
    'Across the Forge — which single property (reusability, typing, accessibility, placement) do teams most often skip, and what does skipping it cost?',
  rewards: [{ type: 'xp', amount: 25, label: 'Forge master' }],
};
