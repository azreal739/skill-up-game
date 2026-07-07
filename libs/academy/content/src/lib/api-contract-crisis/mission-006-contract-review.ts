import { MissionDefinition } from '@academy/content-model';

/** API Contract Crisis 6 — "Contract Review" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const apiMission006ContractReview: MissionDefinition = {
  id: 'api-contract-crisis-006-contract-review',
  campaignId: 'api-contract-crisis',
  title: 'Contract Review',
  summary: 'Review the boundary adapter and its schema before it merges. Find what still lets drift through.',
  difficulty: 'hard',
  learningObjectives: [
    'Review a validation schema for gaps that let bad data through',
    'Recognise a contract test as the thing that catches future drift',
    'Tell a genuine problem from a stylistic nit',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'A teammate wrote the boundary adapter you agreed on and opened a PR. Review it. The goal is not just "does it work today" but "will it catch the next silent drift before customers do?"',
    },
  ],
  contextArtefacts: [
    {
      id: 'schema',
      type: 'code',
      title: 'payment.schema.ts (proposed)',
      language: 'ts',
      content:
        "const PaymentDtoSchema = z.object({\n  amount: z.string(),                 // left as a string\n  currency: z.string(),\n  createdAt: z.number(),\n  receiptUrl: z.string(),             // no .nullable()\n  refunded: z.boolean(),\n});\n\nexport function toPayment(raw: unknown): Payment {\n  const dto = PaymentDtoSchema.parse(raw); // throws on any mismatch\n  return { ...dto, createdAt: new Date(dto.createdAt) };\n}",
    },
  ],
  challenges: [
    {
      id: 'api-contract-crisis-006-c1',
      type: 'code-review',
      title: 'Review the Adapter',
      difficulty: 'hard',
      tags: ['api'],
      storyContext: 'The adapter is meant to hand the app a clean model and to fail loudly and safely when the contract drifts.',
      prompt: 'Select every genuine problem with this adapter and schema.',
      findings: [
        {
          id: 'amount-not-coerced',
          label: 'amount is validated as a string but never coerced to a number, so the app still receives "49.99"',
          isCorrect: true,
          feedback:
            'The whole point of the adapter was to hand the app a clean model. Use z.coerce.number() (or a transform) so amount becomes a real number.',
        },
        {
          id: 'receipturl-nullable',
          label: 'receiptUrl is z.string() with no .nullable(), so a null receipt throws on a perfectly normal payment',
          isCorrect: true,
          feedback:
            'The DTO marks receiptUrl nullable. Without .nullable() (or .nullish()) the adapter rejects valid data — turning a designed "no receipt yet" state into a crash.',
        },
        {
          id: 'parse-throws',
          label: 'parse() throws on mismatch instead of safeParse with a fallback, so one drifted field takes the whole screen down',
          isCorrect: true,
          feedback:
            'At a runtime boundary, prefer safeParse and branch to a safe fallback UI, so unexpected drift degrades gracefully instead of throwing into the render path.',
        },
        {
          id: 'no-contract-test',
          label: 'currency should be an enum of ISO codes, not a plain string',
          isCorrect: false,
          feedback:
            'Tightening currency to an enum is a nice-to-have, but the DTO promises only a string and unknown-but-valid codes shouldn’t be rejected. This is a preference, not a defect.',
        },
        {
          id: 'style-naming',
          label: 'The schema constant should be named PaymentSchema, not PaymentDtoSchema',
          isCorrect: false,
          feedback: 'A naming preference with no effect on correctness — DtoSchema is arguably clearer since it describes the wire shape.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does the adapter actually produce the clean model, and does it fail safely?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'A good boundary adapter (a) transforms the wire shape to a clean model (coerce amount), (b) accepts the real contract including nullables, and (c) fails gracefully with safeParse rather than throwing into the UI.',
        },
        { level: 3, title: 'Specific clue', content: 'Three real problems: amount not coerced, receiptUrl not nullable, and parse() throwing.' },
        { level: 4, title: 'Guided solution', content: 'Flag the un-coerced amount, the missing .nullable() on receiptUrl, and the throwing parse(). Ignore the two style nits.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Adapter reviewed' }],
      consequences: [{ type: 'technical-debt', delta: 15, reason: 'An adapter that neither cleaned nor tolerated the real contract would have shipped three bugs.' }],
      helpLinks: [
        { topicId: 'zod.safe-parse', label: 'Zod safeParse' },
        { topicId: 'testing.contract-tests', label: 'Contract test thinking' },
      ],
      successFeedback: 'You caught the three real defects and left the preferences alone — the adapter will clean data and fail safely.',
      failureFeedback: 'Focus on correctness: amount isn’t coerced, receiptUrl isn’t nullable, and parse() throws into the UI. The naming and enum points are preferences.',
    },
  ],
  reflectionPrompt: 'In a review, how do you separate "this is wrong" from "this is how I’d have written it"?',
  rewards: [{ type: 'xp', amount: 5, label: 'Review complete' }],
};
