import { MissionDefinition } from '@academy/content-model';

/** Nx Monorepo Maze 6 — "Dependency Graph" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const nxMission006Graph: MissionDefinition = {
  id: 'nx-monorepo-maze-006-dependency-graph',
  campaignId: 'nx-monorepo-maze',
  title: 'Dependency Graph',
  summary: 'Read the graph to find why a tiny change rebuilds half the repo.',
  difficulty: 'medium',
  learningObjectives: [
    'Read a dependency graph',
    'Spot an over-shared "god" library',
    'Use the graph to guide refactoring',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Even with affected builds, editing one util still triggers 20 projects. The dependency graph will show why.',
    },
  ],
  contextArtefacts: [
    {
      id: 'graph',
      type: 'diagram',
      title: 'nx graph (excerpt)',
      content:
        'libs/util/shared  ←  imported by 20 of 30 projects\n  exports: formatMoney, Logger, DateUtils, ApiClient, FeatureFlags, everything…',
    },
  ],
  challenges: [
    {
      id: 'nx-monorepo-maze-006-c1',
      type: 'multiple-choice',
      title: 'Diagnose the Blast Radius',
      difficulty: 'medium',
      tags: ['nx'],
      storyContext:
        'One util library exports unrelated things and is imported almost everywhere.',
      prompt:
        'Why does a one-line change here rebuild 20 projects, and what fixes it?',
      options: [
        {
          id: 'a',
          label:
            'util/shared is a "god" library many projects depend on; split it into focused libraries so each consumer depends only on what it uses',
          isCorrect: true,
          feedback:
            'A grab-bag library makes everyone a dependent, so any change affects all of them. Splitting by concern shrinks each change’s blast radius.',
        },
        {
          id: 'b',
          label: 'Nx is miscalculating affected; disable the affected check',
          isCorrect: false,
          feedback:
            'The graph is correct — 20 projects really do import this library. Disabling the check hides real risk.',
        },
        {
          id: 'c',
          label:
            'Add more exports to util/shared so fewer libraries are needed',
          isCorrect: false,
          feedback:
            'Making the god library bigger deepens the problem — more consumers, larger blast radius.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Ask why so many projects depend on one library.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'A library that exports many unrelated things becomes a dependency for everyone, so every change ripples widely. Splitting it by concern lets consumers depend only on what they need.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'The fix reduces how many projects depend on the changed code.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Split the god util library into focused libraries.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Blast radius understood' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 10,
          reason: 'A god library kept every change expensive and risky.',
        },
      ],
      helpLinks: [
        {
          topicId: 'nx.affected-graph',
          label: 'Affected builds and the graph',
        },
      ],
      successFeedback:
        'Split by concern, each change now touches only its real dependents.',
      failureFeedback:
        'The graph is right — the god library is the problem. Split it, don’t hide it.',
    },
  ],
  reflectionPrompt:
    'What does the shape of your dependency graph tell you about how changes will ripple?',
  rewards: [{ type: 'xp', amount: 5, label: 'Graph read' }],
};
