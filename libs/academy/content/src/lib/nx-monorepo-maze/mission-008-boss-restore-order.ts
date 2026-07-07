import { MissionDefinition } from '@academy/content-model';

/**
 * Nx Monorepo Maze boss — "Restore Monorepo Order"
 * (13_CAMPAIGN_CONTENT_PACKS.md). Combines the campaign: place code, break a
 * cycle, scope CI, and enforce boundaries.
 */
export const nxMission008BossRestoreOrder: MissionDefinition = {
  id: 'nx-monorepo-maze-008-boss-restore-order',
  campaignId: 'nx-monorepo-maze',
  title: 'Boss: Restore Monorepo Order',
  summary: 'The monorepo is chaos — fat app, a cycle, slow CI, no rules. Restore order.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply library placement, cycle-breaking, affected CI and boundaries together',
    'Make workspace-wide structural decisions',
    'Leave the monorepo maintainable',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The monorepo has grown without rules and it shows: logic trapped in the app, a circular dependency, CI rebuilding everything, and no enforced boundaries.',
    },
    {
      speaker: 'Mission Control',
      text: 'Four moves restore order: place the code, break the cycle, scope CI, and encode the boundaries. Bring the maze under control.',
    },
  ],
  contextArtefacts: [
    {
      id: 'state',
      type: 'ticket',
      title: 'MAZE-42 — Monorepo cleanup',
      content:
        'Symptoms: shared service lives in the app; util/a ↔ util/b cycle; CI runs all 30 projects per PR; features import each other freely.',
    },
  ],
  challenges: [
    {
      id: 'nx-monorepo-maze-008-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Place the Code',
      difficulty: 'medium',
      tags: ['nx'],
      storyContext: 'A shared OrderService sits in the app.',
      prompt: 'Where should the shared service go?',
      options: [
        {
          id: 'a',
          label: 'A libs/data-access/orders library tagged type:data-access',
          isCorrect: true,
          feedback: 'Shared services belong in a data-access library, out of the thin app.',
        },
        {
          id: 'b',
          label: 'Leave it in the app; features can import from the app',
          isCorrect: false,
          feedback: 'Features importing from the app inverts the dependency direction.',
        },
        {
          id: 'c',
          label: 'A type:ui library, since features render its data',
          isCorrect: false,
          feedback: 'A service is data-access, not UI.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'A shared service has a library type.' },
        { level: 2, title: 'Concept', content: 'Services live in data-access libraries.' },
        { level: 3, title: 'Specific clue', content: 'type:data-access.' },
        { level: 4, title: 'Guided solution', content: 'Move it to a data-access library.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Placed' }],
      consequences: [{ type: 'technical-debt', delta: 10, reason: 'A service trapped in the app blocked reuse.' }],
      helpLinks: [{ topicId: 'nx.apps-vs-libs', label: 'Apps vs libraries' }],
      successFeedback: 'Service in data-access, app stays thin.',
      failureFeedback: 'A shared service belongs in a data-access library.',
    },
    {
      id: 'nx-monorepo-maze-008-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Break the Cycle',
      difficulty: 'medium',
      tags: ['nx'],
      storyContext: 'util/a and util/b import one function from each other.',
      prompt: 'How do you break the cycle?',
      options: [
        {
          id: 'a',
          label: 'Extract the two shared functions into a lower util both depend on',
          isCorrect: true,
          feedback: 'A shared lower layer turns the loop into a tree.',
        },
        {
          id: 'b',
          label: 'Lazy-import one side to hide the cycle from the bundler',
          isCorrect: false,
          feedback: 'The design is still circular.',
        },
        {
          id: 'c',
          label: 'Merge util/a and util/b',
          isCorrect: false,
          feedback: 'Merging to dodge a cycle creates a grab-bag library.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Both could depend on a third thing.' },
        { level: 2, title: 'Concept', content: 'Extract shared pieces to a lower layer.' },
        { level: 3, title: 'Specific clue', content: 'Pull the shared functions down.' },
        { level: 4, title: 'Guided solution', content: 'Extract to a shared lower util.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Cycle broken' }],
      consequences: [{ type: 'stability', delta: -5, reason: 'A hidden cycle kept the build fragile.' }],
      helpLinks: [{ topicId: 'nx.affected-graph', label: 'Dependency graph' }],
      successFeedback: 'Loop turned into a tree.',
      failureFeedback: 'Extract the shared pieces to a lower layer.',
    },
    {
      id: 'nx-monorepo-maze-008-c3',
      type: 'multiple-choice',
      title: 'Stage 3 — Scope CI',
      difficulty: 'hard',
      tags: ['nx', 'cicd'],
      storyContext: 'CI runs all 30 projects per PR.',
      prompt: 'How should CI scope its work?',
      options: [
        {
          id: 'a',
          label: 'nx affected — changed projects plus their downstream dependents',
          isCorrect: true,
          feedback: 'Minimum work that still catches real breakage.',
        },
        {
          id: 'b',
          label: 'Only the files that changed, no dependents',
          isCorrect: false,
          feedback: 'Unsafe — misses breakage in consumers.',
        },
        {
          id: 'c',
          label: 'Keep --all, add machines',
          isCorrect: false,
          feedback: 'Expensive and wasteful.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Build what a change can affect.' },
        { level: 2, title: 'Concept', content: 'affected = changed + downstream.' },
        { level: 3, title: 'Specific clue', content: 'Includes dependents.' },
        { level: 4, title: 'Guided solution', content: 'Use nx affected.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'CI scoped' }],
      consequences: [{ type: 'team-confidence', delta: -5, reason: 'Slow CI kept blocking merges.' }],
      helpLinks: [{ topicId: 'nx.affected-graph', label: 'Affected builds' }],
      successFeedback: 'CI runs the minimum that stays safe.',
      failureFeedback: 'affected includes downstream dependents — the safe, scoped choice.',
    },
    {
      id: 'nx-monorepo-maze-008-c4',
      type: 'multiple-choice',
      title: 'Stage 4 — Enforce the Boundaries',
      difficulty: 'boss',
      tags: ['nx'],
      storyContext: 'Nothing stops features importing each other.',
      prompt: 'How do you prevent forbidden dependencies from here on?',
      options: [
        {
          id: 'a',
          label: 'Tag every project and add enforce-module-boundaries depConstraints that forbid feature→feature and upward deps',
          isCorrect: true,
          feedback:
            'Tags plus the boundary lint rule turn the architecture into an automated check — violations fail CI, not just review.',
        },
        {
          id: 'b',
          label: 'Write a CONTRIBUTING.md asking people not to cross boundaries',
          isCorrect: false,
          feedback: 'A document enforces nothing; the tangle returns the first busy week.',
        },
        {
          id: 'c',
          label: 'Review every PR manually for boundary violations',
          isCorrect: false,
          feedback: 'Manual vigilance does not scale and misses cases — automate it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Make the rules a check, not a hope.' },
        { level: 2, title: 'Concept', content: 'Tags + enforce-module-boundaries automate architecture.' },
        { level: 3, title: 'Specific clue', content: 'The answer involves depConstraints in lint.' },
        { level: 4, title: 'Guided solution', content: 'Tag projects and add boundary lint rules.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Order restored' }],
      consequences: [{ type: 'technical-debt', delta: 10, reason: 'Unenforced rules let the tangle creep back.' }],
      helpLinks: [{ topicId: 'nx.tag-rules', label: 'Tags and boundary rules' }],
      successFeedback:
        'Code placed, cycle broken, CI scoped, boundaries enforced by lint — the monorepo is orderly and stays that way. The maze is solved.',
      failureFeedback: 'Docs and manual review do not scale. Encode the boundaries as lint rules.',
    },
  ],
  reflectionPrompt:
    'Across the Maze — which is the biggest force keeping a monorepo healthy: placement, no cycles, scoped CI, or enforced boundaries? Defend your pick.',
  rewards: [
    { type: 'xp', amount: 25, label: 'Maze master' },
    { type: 'badge', id: 'nx-cartographer', label: 'Nx Cartographer' },
  ],
};
