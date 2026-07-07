import { MissionDefinition } from '@academy/content-model';

/** Nx Monorepo Maze 4 — "Circular Dependency" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const nxMission004Circular: MissionDefinition = {
  id: 'nx-monorepo-maze-004-circular-dependency',
  campaignId: 'nx-monorepo-maze',
  title: 'Circular Dependency',
  summary: 'Two libraries import each other. Break the cycle cleanly.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise a circular dependency',
    'Break a cycle by extracting shared code',
    'Avoid quick fixes that hide the loop',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The build just started failing with a circular dependency error: util/format imports util/currency, and util/currency imports util/format. Break the loop.',
    },
  ],
  contextArtefacts: [
    {
      id: 'cycle',
      type: 'diagram',
      title: 'The cycle',
      content:
        'util/format  → imports formatCurrency from util/currency\nutil/currency → imports padNumber from util/format\n(each needs one function from the other)',
    },
  ],
  challenges: [
    {
      id: 'nx-monorepo-maze-004-c1',
      type: 'multiple-choice',
      title: 'Break the Cycle',
      difficulty: 'medium',
      tags: ['nx'],
      storyContext: 'Each library needs exactly one helper from the other.',
      prompt: 'What is the clean way to break the circular dependency?',
      options: [
        {
          id: 'a',
          label: 'Move the two shared helpers into a lower-level util/primitives library both depend on',
          isCorrect: true,
          feedback:
            'Extracting the mutually-needed helpers to a shared lower layer removes the cycle — both libs now depend downward, not on each other.',
        },
        {
          id: 'b',
          label: 'Use a dynamic import() inside one library to defer the other',
          isCorrect: false,
          feedback: 'A lazy import hides the cycle from the bundler but the design is still circular — the coupling remains.',
        },
        {
          id: 'c',
          label: 'Merge both libraries into one so there is no import between them',
          isCorrect: false,
          feedback: 'Merging unrelated concerns to dodge a cycle creates a grab-bag library — it treats the symptom, not the design.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'If A needs B and B needs A, what could both depend on instead?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Cycles are broken by extracting the shared pieces to a lower layer both sides depend on, turning a loop into a tree. Lazy imports and merging only mask the coupling.',
        },
        { level: 3, title: 'Specific clue', content: 'Pull the two shared helpers down into a common library.' },
        { level: 4, title: 'Guided solution', content: 'Extract both helpers into a shared lower-level util library.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Cycle broken' }],
      consequences: [{ type: 'stability', delta: -10, reason: 'The build stayed broken while the cycle was patched over.' }],
      helpLinks: [{ topicId: 'nx.affected-graph', label: 'Dependency graph' }],
      successFeedback: 'Shared helpers pulled to a lower layer — the loop is now a tree, and the build is green.',
      failureFeedback: 'Lazy imports and merging hide the cycle. Extract the shared pieces to a lower layer.',
    },
  ],
  reflectionPrompt: 'Why is a circular dependency a design smell, not just a build error?',
  rewards: [{ type: 'xp', amount: 5, label: 'Loop untied' }],
};
