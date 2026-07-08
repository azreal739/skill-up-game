import { MissionDefinition } from '@academy/content-model';

/** Mission 1 — adapted from Sample Mission 1 (14_SAMPLE_MISSIONS.md). */
export const mission001Welcome: MissionDefinition = {
  id: 'foundations-001-welcome',
  campaignId: 'foundations',
  title: 'Welcome to the Academy',
  summary:
    'Inspect your first platform component and confirm it displays safe, typed data.',
  difficulty: 'intro',
  learningObjectives: [
    'Understand the mission format',
    'Recognise TypeScript interfaces',
    'Connect typed data to Angular components',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Welcome to Engineering Academy. You have joined the platform team responsible for a customer-facing Angular application used by thousands of people every day.',
    },
    {
      speaker: 'Mission Control',
      text: 'Your first simulation is simple: inspect a dashboard card and confirm that it displays safe, typed data. Take your time — the Help Centre is always one click away.',
    },
  ],
  contextArtefacts: [
    {
      id: 'customer-data',
      type: 'code',
      title: 'Data received by the dashboard card',
      language: 'ts',
      content: "const customer = {\n  name: 'Avery',\n  score: 720\n};",
    },
  ],
  challenges: [
    {
      id: 'foundations-001-c1',
      type: 'multiple-choice',
      title: 'Choose the Interface',
      difficulty: 'intro',
      tags: ['typescript'],
      storyContext:
        'The dashboard card needs a typed customer model before it can ship.',
      prompt: 'Which TypeScript interface best describes the customer data?',
      options: [
        {
          id: 'b',
          label: 'interface Customer {\n  name: number;\n  score: string;\n}',
          isCorrect: false,
          feedback:
            'The property types are reversed — Avery is text and 720 is a number.',
        },
        {
          id: 'a',
          label: 'interface Customer {\n  name: string;\n  score: number;\n}',
          isCorrect: true,
          feedback:
            'The shape matches the data exactly, so the compiler can protect the card.',
        },
        {
          id: 'c',
          label: 'interface Customer {\n  id: string;\n}',
          isCorrect: false,
          feedback:
            'This describes a different shape entirely; the card would lose its data.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'Look at the value of each property in the artefact and ask what kind of data it is.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'A TypeScript interface describes the shape of an object: each property name and the type of its value. The interface must mirror the real data.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            "'Avery' is a string and 720 is a number — find the interface that says exactly that.",
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'The data has name (a string) and score (a number). Only one option declares name: string and score: number. Select it and submit.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Interface selected' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason:
            'A mistyped model let a rendering defect reach the dashboard.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.interfaces', label: 'TypeScript interfaces' },
      ],
      successFeedback:
        'The interface matches the expected shape and gives the component compile-time safety.',
      failureFeedback:
        'Compare each property in the data with the types the interface declares — they must agree.',
    },
  ],
  reflectionPrompt:
    'In your own words: what does a TypeScript interface protect you from, and what does it not protect you from?',
  rewards: [{ type: 'xp', amount: 5, label: 'First mission complete' }],
};
