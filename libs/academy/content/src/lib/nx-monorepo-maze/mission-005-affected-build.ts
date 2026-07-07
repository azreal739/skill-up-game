import { MissionDefinition } from '@academy/content-model';

/** Nx Monorepo Maze 5 — "Affected Build" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const nxMission005Affected: MissionDefinition = {
  id: 'nx-monorepo-maze-005-affected-build',
  campaignId: 'nx-monorepo-maze',
  title: 'Affected Build',
  summary: 'CI rebuilds the whole repo on every PR. Make it build only what changed.',
  difficulty: 'medium',
  learningObjectives: [
    'Use nx affected to scope CI work',
    'Understand what "affected" includes',
    'Speed up CI without losing safety',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'CI takes 40 minutes because every PR builds and tests all 30 projects — even a one-line change in one library. Scope it down without missing real breakage.',
    },
  ],
  contextArtefacts: [
    {
      id: 'ci-step',
      type: 'code',
      title: '.ci current step',
      language: 'text',
      content: 'nx run-many -t build test lint --all',
    },
  ],
  challenges: [
    {
      id: 'nx-monorepo-maze-005-c1',
      type: 'multiple-choice',
      title: 'Scope the Pipeline',
      difficulty: 'medium',
      tags: ['nx', 'cicd'],
      storyContext: 'A change to one library can only break that library and things that depend on it.',
      prompt: 'How should CI scope its work safely?',
      options: [
        {
          id: 'a',
          label: 'nx affected -t build test lint — build/test only the changed projects and everything downstream of them',
          isCorrect: true,
          feedback:
            'affected uses the dependency graph to run only the projects a change can impact — fast, and still safe because downstream projects are included.',
        },
        {
          id: 'b',
          label: 'Only build the exact projects whose files changed, ignore dependents',
          isCorrect: false,
          feedback:
            'Skipping dependents is unsafe — a change to a shared lib can break its consumers, which you would no longer test.',
        },
        {
          id: 'c',
          label: 'Keep --all but add more CI machines to make it faster',
          isCorrect: false,
          feedback: 'Throwing hardware at a whole-repo build is expensive and still wasteful — most projects were unaffected.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What can a change actually break? Build that, and only that.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'nx affected computes the changed projects plus everything downstream in the dependency graph, so CI runs the minimum that still catches real breakage.',
        },
        { level: 3, title: 'Specific clue', content: 'The safe option includes downstream dependents, not just changed files.' },
        { level: 4, title: 'Guided solution', content: 'Use nx affected for build, test and lint.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'CI scoped' }],
      consequences: [{ type: 'team-confidence', delta: -5, reason: 'A 40-minute pipeline slowed every merge.' }],
      helpLinks: [{ topicId: 'nx.affected-graph', label: 'Affected builds and the graph' }],
      successFeedback: 'CI now runs only what a change can affect — fast and still safe.',
      failureFeedback: 'Ignoring dependents is unsafe; more machines is wasteful. affected is the scoped, safe answer.',
    },
  ],
  reflectionPrompt: 'Why is "changed files only" unsafe, but "changed plus downstream" safe?',
  rewards: [{ type: 'xp', amount: 5, label: 'Pipeline scoped' }],
};
