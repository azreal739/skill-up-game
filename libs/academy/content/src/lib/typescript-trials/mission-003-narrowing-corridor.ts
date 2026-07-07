import { MissionDefinition } from '@academy/content-model';

/** TypeScript Trials 3 — "Narrowing Corridor" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const ttMission003Narrowing: MissionDefinition = {
  id: 'typescript-trials-003-narrowing-corridor',
  campaignId: 'typescript-trials',
  title: 'Narrowing Corridor',
  summary: 'A union is handled with casts. Walk it through proper narrowing instead.',
  difficulty: 'medium',
  learningObjectives: [
    'Narrow a union before using member-specific fields',
    'Use discriminants and type guards',
    'Avoid casts that skip the check',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'A notification can be an email or an SMS. The renderer casts to reach fields that may not exist, and it crashes on the wrong variant. Narrow it properly.',
    },
  ],
  contextArtefacts: [
    {
      id: 'notification-types',
      type: 'code',
      title: 'notification.ts',
      language: 'ts',
      content:
        "type Notification =\n  | { kind: 'email'; address: string }\n  | { kind: 'sms'; phone: string };\n\nfunction render(n: Notification) {\n  return (n as { address: string }).address; // crashes for sms\n}",
    },
  ],
  challenges: [
    {
      id: 'typescript-trials-003-c1',
      type: 'multiple-choice',
      title: 'Narrow the Union',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext: 'The two variants share no fields except the discriminant kind.',
      prompt: 'How should render handle both variants safely?',
      options: [
        {
          id: 'a',
          label:
            "if (n.kind === 'email') return n.address;\nreturn n.phone; // TS knows this branch is the sms variant",
          isCorrect: true,
          feedback:
            'Checking the discriminant narrows the union: inside each branch TypeScript knows exactly which variant it is, and the fields are safe.',
        },
        {
          id: 'b',
          label: 'return (n as { address: string }).address;',
          isCorrect: false,
          feedback: 'The cast asserts a field that the sms variant lacks — it compiles but crashes at runtime.',
        },
        {
          id: 'c',
          label: "return n.address ?? n.phone;",
          isCorrect: false,
          feedback: 'Neither field exists on both variants, so this does not type-check without narrowing first.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check what kind of notification it is before reading its fields.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'A discriminated union carries a common tag (kind). Testing that tag narrows the type in each branch so member fields become safely accessible.',
        },
        { level: 3, title: 'Specific clue', content: "The safe option branches on n.kind === 'email'." },
        { level: 4, title: 'Guided solution', content: 'Branch on n.kind and return the field for that variant.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Union narrowed' }],
      consequences: [{ type: 'stability', delta: -5, reason: 'A cast crashed the renderer on SMS notifications.' }],
      helpLinks: [{ topicId: 'typescript.narrowing', label: 'Narrowing' }],
      successFeedback: 'Discriminant checked, each branch typed — no casts, no crashes.',
      failureFeedback: 'Casts skip the check and the ?? does not type-check. Branch on the discriminant.',
    },
  ],
  reflectionPrompt: 'Why is a discriminated union safer than a bag of optional fields?',
  rewards: [{ type: 'xp', amount: 5, label: 'Corridor cleared' }],
};
