import { MissionDefinition } from '@academy/content-model';

/** TypeScript Trials 2 — "Union Gate" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const ttMission002UnionGate: MissionDefinition = {
  id: 'typescript-trials-002-union-gate',
  campaignId: 'typescript-trials',
  title: 'Union Gate',
  summary:
    'A "status" string accepts any value. Turn it into a checked vocabulary.',
  difficulty: 'easy',
  learningObjectives: [
    'Model a fixed set of values with a union type',
    'Let the compiler enforce exhaustive handling',
    'Replace loose strings with precise types',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'A deployment status is typed string, so typos like "sucess" slip through and the dashboard shows nothing. Tighten the type so only real statuses are allowed.',
    },
  ],
  contextArtefacts: [
    {
      id: 'status-usage',
      type: 'code',
      title: 'deployment.ts',
      language: 'ts',
      content:
        "interface Deployment {\n  status: string; // 'queued' | 'running' | 'succeeded' | 'failed'\n}\n\nfunction badge(d: Deployment) {\n  if (d.status === 'sucess') return 'green'; // typo compiles fine\n}",
    },
  ],
  challenges: [
    {
      id: 'typescript-trials-002-c1',
      type: 'multiple-choice',
      title: 'Close the Gate',
      difficulty: 'easy',
      tags: ['typescript'],
      storyContext:
        'Only four statuses are valid, but any string compiles today.',
      prompt:
        'Which change makes invalid statuses (and typos) a compile error?',
      options: [
        {
          id: 'b',
          label: 'Add a runtime if-check that throws on unknown statuses',
          isCorrect: false,
          feedback:
            'A runtime guard helps at runtime but the typo still compiles and ships. A union catches it at build time.',
        },
        {
          id: 'c',
          label: 'Rename the field to statusText: string for clarity',
          isCorrect: false,
          feedback:
            'Renaming a loose string is still a loose string — any value, including typos, remains valid.',
        },
        {
          id: 'a',
          label:
            "type DeploymentStatus = 'queued' | 'running' | 'succeeded' | 'failed';\n// status: DeploymentStatus",
          isCorrect: true,
          feedback:
            'A union type restricts status to the four real values — comparing against "sucess" now fails to compile.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'You want the compiler to reject any value outside the four.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'A union of string literals defines an exact vocabulary. Assigning or comparing anything outside it is a compile error, and switches over it can be made exhaustive.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'The fix lists the four valid statuses as a type.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Define a DeploymentStatus union of the four literals.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Gate closed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'A status typo shipped and blanked the deployment badge.',
        },
      ],
      helpLinks: [{ topicId: 'typescript.union-types', label: 'Union types' }],
      successFeedback:
        'The status is now a checked vocabulary — typos fail to compile.',
      failureFeedback:
        'Runtime checks and renames leave the string loose. A union type is the compile-time gate.',
    },
  ],
  reflectionPrompt:
    'What loose strings in your code would become safer as unions?',
  rewards: [{ type: 'xp', amount: 5, label: 'Vocabulary defined' }],
};
