import { MissionDefinition } from '@academy/content-model';

/** Zod Gate 2 — "Safe Parse" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const zodMission002SafeParse: MissionDefinition = {
  id: 'zod-gate-002-safe-parse',
  campaignId: 'zod-gate',
  title: 'Safe Parse',
  summary:
    'Choose between parse and safeParse — and handle the result without crashing.',
  difficulty: 'easy',
  learningObjectives: [
    'Know when parse throws and when safeParse does not',
    'Branch on a safeParse result correctly',
    'Keep components off the invalid-data path',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'You have a CustomerSchema. Now wire it into the service so bad payloads stop at the gate instead of reaching the dashboard.',
    },
    {
      speaker: 'Mission Control',
      text: 'The team disagrees about parse vs safeParse. Settle it, then handle the result the right way.',
    },
  ],
  contextArtefacts: [
    {
      id: 'schema',
      type: 'code',
      title: 'customer.schema.ts',
      language: 'ts',
      content:
        'export const CustomerSchema = z.object({\n  id: z.string(),\n  name: z.string(),\n  score: z.number(),\n});\nexport type Customer = z.infer<typeof CustomerSchema>;',
    },
  ],
  challenges: [
    {
      id: 'zod-gate-002-c1',
      type: 'multiple-choice',
      title: 'parse or safeParse?',
      difficulty: 'easy',
      tags: ['zod'],
      storyContext:
        'The dashboard must degrade gracefully when a customer payload is malformed — never white-screen.',
      prompt:
        'Which approach validates the response without letting one bad payload crash the view?',
      options: [
        {
          id: 'b',
          label:
            'const customer = CustomerSchema.parse(data);\nreturn customer;',
          isCorrect: false,
          feedback:
            'parse throws on invalid data. Without a surrounding try/catch that becomes an unhandled error and a blank screen.',
        },
        {
          id: 'c',
          label: 'const customer = data as Customer;\nreturn customer;',
          isCorrect: false,
          feedback:
            'A cast validates nothing — this is the very hole the Zod Gate exists to close.',
        },
        {
          id: 'a',
          label:
            'const result = CustomerSchema.safeParse(data);\nif (!result.success) return this.showError();\nreturn result.data;',
          isCorrect: true,
          feedback:
            'safeParse returns a discriminated result instead of throwing, so you branch into a designed error state and never surface an exception to the user.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Which option can report failure without throwing?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'parse throws a ZodError on bad data; safeParse returns { success, data | error }. For UI boundaries you usually want the non-throwing form so you can render a fallback.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'Look for the option that checks result.success before using result.data.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Choose the safeParse version that returns an error state when success is false.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Parsed safely' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason:
            'An unguarded parse threw and blanked the dashboard for a customer.',
        },
      ],
      helpLinks: [
        { topicId: 'zod.safe-parse', label: 'Using safeParse' },
        { topicId: 'zod.error-handling', label: 'Handling validation errors' },
      ],
      successFeedback:
        'safeParse turns a would-be crash into a handled, designed outcome.',
      failureFeedback:
        'parse and casts both fail the “never white-screen” test — you need the result you can branch on.',
    },
  ],
  reflectionPrompt:
    'When would parse (the throwing form) actually be the right choice?',
  rewards: [{ type: 'xp', amount: 5, label: 'Gate reinforced' }],
};
