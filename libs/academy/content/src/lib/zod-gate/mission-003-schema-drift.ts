import { MissionDefinition } from '@academy/content-model';

/** Zod Gate 3 — "Schema Drift" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const zodMission003SchemaDrift: MissionDefinition = {
  id: 'zod-gate-003-schema-drift',
  campaignId: 'zod-gate',
  title: 'Schema Drift',
  summary: 'The API added a field and renamed another. Reconcile the schema with reality.',
  difficulty: 'medium',
  learningObjectives: [
    'Diagnose drift between a payload and a schema',
    'Decide which schema changes are safe',
    'Avoid over-tightening a schema against fields you do not use',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The customers endpoint shipped a release. Validation now fails for everyone, and the dashboard is showing the fallback for all customers.',
    },
    {
      speaker: 'Mission Control',
      text: 'Compare the new payload with the schema, find the drift, and choose the change that fixes it without breaking next week.',
    },
  ],
  contextArtefacts: [
    {
      id: 'new-payload',
      type: 'api-response',
      title: 'New payload — GET /api/customers/42',
      language: 'json',
      content:
        '{\n  "id": "42",\n  "fullName": "Avery Chen",\n  "score": 720,\n  "tier": "gold"\n}',
    },
    {
      id: 'current-schema',
      type: 'code',
      title: 'customer.schema.ts (current)',
      language: 'ts',
      content:
        'export const CustomerSchema = z.object({\n  id: z.string(),\n  name: z.string(),\n  score: z.number(),\n});',
    },
  ],
  challenges: [
    {
      id: 'zod-gate-003-c1',
      type: 'contract-comparison',
      title: 'Diagnose the Drift',
      difficulty: 'medium',
      tags: ['zod', 'api', 'java'],
      storyContext: 'Every field the schema requires must be present with the right type.',
      prompt: 'Why is validation failing for every customer?',
      options: [
        {
          id: 'a',
          label: 'The payload renamed "name" to "fullName", so the required name field is now missing',
          isCorrect: true,
          feedback:
            'The schema requires name; the payload no longer has it. Every parse fails on the missing required field.',
        },
        {
          id: 'b',
          label: 'The new "tier" field is not in the schema, and Zod rejects unknown keys',
          isCorrect: false,
          feedback:
            'By default z.object ignores unknown keys — an extra "tier" is harmless. The failure is a missing required field, not an extra one.',
        },
        {
          id: 'c',
          label: 'score changed from a string to a number',
          isCorrect: false,
          feedback: 'score is 720 (a number) and the schema expects a number — that field agrees.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each required schema field against the payload keys.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'z.object requires its declared keys and, by default, ignores extra ones. Drift usually bites when a required field is renamed or removed, not when a new field appears.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'The schema wants name. Scan the payload for it.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'name was renamed to fullName, so the required field is absent. Select that.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Drift diagnosed' }],
      consequences: [
        {
          type: 'stability',
          delta: -10,
          reason: 'The fallback showed for all customers while the drift went unfixed.',
        },
      ],
      helpLinks: [
        { topicId: 'api.contract-drift', label: 'Contract drift' },
        { topicId: 'zod.runtime-validation', label: 'Runtime validation' },
      ],
      successFeedback: 'A renamed required field — the schema and payload no longer agree on name.',
      failureFeedback: 'One required field is missing under a new name; the extra field is a red herring.',
    },
    {
      id: 'zod-gate-003-c2',
      type: 'multiple-choice',
      title: 'Fix Without Over-Tightening',
      difficulty: 'medium',
      tags: ['zod'],
      storyContext:
        'You use the customer name and score. You do not use tier today, but product might tomorrow.',
      prompt: 'Which schema change fixes validation without creating future breakage?',
      options: [
        {
          id: 'a',
          label:
            'z.object({ id: z.string(), name: z.string(), score: z.number() }).transform(c => c)\n// and ask the API team to rename fullName back',
          isCorrect: false,
          feedback:
            'Waiting on the back end leaves customers on the fallback now, and a no-op transform changes nothing.',
        },
        {
          id: 'b',
          label:
            'z.object({\n  id: z.string(),\n  name: z.string(),   // mapped from fullName\n  score: z.number(),\n}) with .transform() reading fullName, leaving tier unspecified',
          isCorrect: true,
          feedback:
            'Map the renamed field to your internal name and let the unused tier pass through ignored. You fix today’s break without coupling to a field you do not consume.',
        },
        {
          id: 'c',
          label:
            'z.object({ id: z.string(), fullName: z.string(), score: z.number(), tier: z.string() }).strict()',
          isCorrect: false,
          feedback:
            '.strict() rejects any future unknown field, so the next harmless API addition breaks you again — over-tightening.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Fix what you consume; ignore what you do not.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'A resilient boundary maps the fields you use to your internal names and tolerates extra fields. .strict() and coupling to unused fields both make the schema brittle to normal API growth.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'The right answer reads fullName into name and says nothing about tier.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Map fullName → name via transform and leave tier unspecified so it is ignored. Choose that.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Schema realigned' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 10,
          reason: 'An over-strict schema was merged and broke on the next API addition.',
        },
      ],
      helpLinks: [
        { topicId: 'zod.transform', label: 'Transforming with Zod' },
        { topicId: 'zod.default-values', label: 'Defaults and optional fields' },
      ],
      successFeedback:
        'Mapped what you use, ignored what you do not — resilient to the next release.',
      failureFeedback:
        'Waiting on the back end or locking the schema with .strict() both trade this outage for the next one.',
    },
  ],
  reflectionPrompt: 'Why is .strict() sometimes a trap even though it sounds safer?',
  rewards: [
    { type: 'xp', amount: 5, label: 'Drift contained' },
    { type: 'badge', id: 'refactor-ranger', label: 'Refactor Ranger' },
  ],
};
