import { MissionDefinition } from '@academy/content-model';

/** Zod Gate 6 — "Transforming Responses" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const zodMission006TransformingResponses: MissionDefinition = {
  id: 'zod-gate-006-transforming-responses',
  campaignId: 'zod-gate',
  title: 'Transforming Responses',
  summary: 'Stop patching payload quirks in components. Normalise them once, at the gate.',
  difficulty: 'hard',
  learningObjectives: [
    'Coerce and reshape data inside the schema',
    'Supply defaults for optional fields at the boundary',
    'Keep components free of payload-shape workarounds',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The Java service is quirky: timestamps arrive as strings, an optional discount is sometimes missing, and score occasionally comes as a numeric string. Components are littered with little fixups.',
    },
    {
      speaker: 'Mission Control',
      text: 'Every one of those fixups is a bug waiting to happen. Move the normalisation into the schema so components only ever see clean data.',
    },
  ],
  contextArtefacts: [
    {
      id: 'quirky-payload',
      type: 'api-response',
      title: 'Quirky payload',
      language: 'json',
      content:
        '{\n  "id": "42",\n  "name": "Avery Chen",\n  "score": "720",\n  "createdAt": "2026-01-15T09:30:00Z"\n}',
    },
    {
      id: 'component-fixups',
      type: 'code',
      title: 'Scattered component workarounds (what we want to delete)',
      language: 'ts',
      content:
        "const score = Number(customer.score);\nconst created = new Date(customer.createdAt);\nconst discount = customer.discount ?? 0;",
    },
  ],
  challenges: [
    {
      id: 'zod-gate-006-c1',
      type: 'multiple-choice',
      title: 'Normalise at the Gate',
      difficulty: 'hard',
      tags: ['zod'],
      storyContext:
        'The goal: components receive score as number, createdAt as Date, discount always present.',
      prompt: 'Which schema does all the normalisation at the boundary?',
      options: [
        {
          id: 'a',
          label:
            'z.object({\n  id: z.string(),\n  name: z.string(),\n  score: z.coerce.number(),\n  createdAt: z.coerce.date(),\n  discount: z.number().default(0),\n})',
          isCorrect: true,
          feedback:
            'z.coerce.number() fixes the string score, z.coerce.date() parses the timestamp, and .default(0) fills the missing discount — components get clean data with zero inline fixups.',
        },
        {
          id: 'b',
          label:
            'z.object({\n  id: z.string(),\n  name: z.string(),\n  score: z.number(),\n  createdAt: z.string(),\n  discount: z.number().optional(),\n})',
          isCorrect: false,
          feedback:
            'This rejects the string score, leaves createdAt as a string, and pushes the discount ?? 0 fixup back into components — nothing is normalised.',
        },
        {
          id: 'c',
          label:
            'z.object({ id: z.string(), name: z.string() }).passthrough()\n// let components coerce the rest',
          isCorrect: false,
          feedback:
            'passthrough plus component-side coercion is exactly the scattered-fixup problem this mission exists to remove.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Each quirk has a matching Zod tool: coercion, date parsing, defaults.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'z.coerce.number()/date() convert as they validate; .default(v) supplies a value for a missing field. Doing this in the schema means every consumer receives canonical types.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Look for the schema using coerce on score and createdAt and default on discount.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose the schema with z.coerce.number(), z.coerce.date() and .default(0).',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Responses normalised' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 15,
          reason: 'Payload fixups stayed scattered across components and drifted apart.',
        },
      ],
      helpLinks: [
        { topicId: 'zod.transform', label: 'Transforming with Zod' },
        { topicId: 'zod.default-values', label: 'Defaults and optional fields' },
      ],
      successFeedback:
        'One schema normalises everything — the component fixups can be deleted for good.',
      failureFeedback:
        'The right schema converts the quirks itself; leaving them for components just relocates the bug.',
    },
  ],
  reflectionPrompt:
    'What is the cost of every inline `Number(x)` and `x ?? default` scattered through your components?',
  rewards: [{ type: 'xp', amount: 5, label: 'Boundary canonical' }],
};
