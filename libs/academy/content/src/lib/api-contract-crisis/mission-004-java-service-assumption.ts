import { MissionDefinition } from '@academy/content-model';

/** API Contract Crisis 4 — "Java Service Assumption" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const apiMission004JavaAssumption: MissionDefinition = {
  id: 'api-contract-crisis-004-java-service-assumption',
  campaignId: 'api-contract-crisis',
  title: 'Java Service Assumption',
  summary: 'Compare the front-end model against the Java DTO and find where they disagree.',
  difficulty: 'medium',
  learningObjectives: [
    'Compare a front-end model against a back-end DTO side by side',
    'Recognise classic Java serialisation drift (numbers as strings, epoch millis, null)',
    'Locate every point of disagreement, not just the first',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The Payments team ships a Java service and the client was written from a whiteboard sketch, not the real DTO. Put the two contracts side by side and mark exactly where the front end assumes something the back end never promised.',
    },
  ],
  contextArtefacts: [
    {
      id: 'java-dto',
      type: 'code',
      title: 'PaymentDto.java (source of truth)',
      language: 'java',
      content:
        'public class PaymentDto {\n  private String amount;      // "49.99"\n  private String currency;    // "EUR"\n  private long createdAt;     // epoch millis, e.g. 1751846400000\n  private String receiptUrl;  // nullable\n  private boolean refunded;\n}',
    },
    {
      id: 'fe-model',
      type: 'code',
      title: 'payment.model.ts (front-end assumption)',
      language: 'ts',
      content:
        'interface Payment {\n  amount: number;\n  currency: string;\n  createdAt: string;   // expects ISO date\n  receiptUrl: string;\n  refunded: boolean;\n}',
    },
  ],
  challenges: [
    {
      id: 'api-contract-crisis-004-c1',
      type: 'contract-comparison',
      title: 'Reconcile the Contracts',
      difficulty: 'medium',
      tags: ['api', 'java'],
      storyContext: 'The DTO is the source of truth. Every field where the front-end model disagrees is a runtime bug waiting to happen.',
      prompt: 'Select every field where the front-end model disagrees with the Java DTO.',
      options: [
        {
          id: 'amount',
          label: 'amount — model says number, DTO serialises a string ("49.99")',
          isCorrect: true,
          feedback: 'A numeric string is not a number until you coerce it. Arithmetic on "49.99" concatenates or yields NaN.',
        },
        {
          id: 'createdAt',
          label: 'createdAt — model expects an ISO string, DTO sends epoch millis (a number)',
          isCorrect: true,
          feedback: 'new Date("1751846400000") is Invalid Date; new Date(1751846400000) is correct. The type and meaning both differ.',
        },
        {
          id: 'receiptUrl',
          label: 'receiptUrl — model says non-null string, DTO marks it nullable',
          isCorrect: true,
          feedback: 'A nullable field read as a guaranteed string crashes the moment a payment has no receipt yet.',
        },
        {
          id: 'currency',
          label: 'currency — both are string',
          isCorrect: false,
          feedback: 'currency is a String on both sides. No disagreement here.',
        },
        {
          id: 'refunded',
          label: 'refunded — both are boolean',
          isCorrect: false,
          feedback: 'boolean on both sides — this field matches.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Go field by field: same name, but same type and nullability?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Classic Java drift: BigDecimal/amount serialised as a String, timestamps as epoch millis (a long), and nullable fields the front end treats as guaranteed. Compare types, not names.',
        },
        { level: 3, title: 'Specific clue', content: 'Three fields disagree; currency and refunded match.' },
        { level: 4, title: 'Guided solution', content: 'Flag amount (string vs number), createdAt (millis vs ISO), and receiptUrl (nullable).' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Contracts reconciled' }],
      consequences: [{ type: 'technical-debt', delta: 10, reason: 'A model built from assumptions rather than the DTO carried three latent bugs.' }],
      helpLinks: [
        { topicId: 'api.contract-drift', label: 'API contract drift' },
        { topicId: 'api.dto', label: 'Reading a DTO' },
      ],
      successFeedback: 'You found all three real disagreements — amount, createdAt and receiptUrl — and left the matching fields alone.',
      failureFeedback: 'Three fields disagree by type or nullability (amount, createdAt, receiptUrl); currency and refunded already match.',
    },
  ],
  reflectionPrompt: 'How much of contract drift comes down to reading a field’s name and skipping its type?',
  rewards: [{ type: 'xp', amount: 5, label: 'Assumption corrected' }],
};
