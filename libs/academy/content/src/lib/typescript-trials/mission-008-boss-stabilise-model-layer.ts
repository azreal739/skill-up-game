import { MissionDefinition } from '@academy/content-model';

/**
 * TypeScript Trials boss — "Stabilise the Model Layer"
 * (13_CAMPAIGN_CONTENT_PACKS.md). Combines the campaign: boundary typing,
 * unions, narrowing and generics on one failing model layer.
 */
export const ttMission008BossStabilise: MissionDefinition = {
  id: 'typescript-trials-008-boss-stabilise-model-layer',
  campaignId: 'typescript-trials',
  title: 'Boss: Stabilise the Model Layer',
  summary: 'Defects are escaping through a weakly-typed model layer. Stabilise it end to end.',
  difficulty: 'boss',
  learningObjectives: [
    'Type an untyped boundary, then narrow it',
    'Replace loose strings with unions',
    'Restore type safety across a shared layer',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Weak typing has let defects into the platform’s model layer and QA is drowning. This is the campaign’s final trial: stabilise it, boundary to consumer.',
    },
    {
      speaker: 'Mission Control',
      text: 'Type the boundary, model the states, narrow before use, and keep helpers generic. Four moves to a codebase the compiler can defend.',
    },
  ],
  contextArtefacts: [
    {
      id: 'model-layer',
      type: 'code',
      title: 'order-api.ts (as found)',
      language: 'ts',
      content:
        "export function loadOrder(json: any): Order {\n  return json as Order;\n}\ntype OrderStatus = string;\nfunction pick(items: any[]) { return items[0]; }",
    },
  ],
  challenges: [
    {
      id: 'typescript-trials-008-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Type the Boundary',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext: 'loadOrder takes any and casts.',
      prompt: 'How should loadOrder treat its input?',
      options: [
        {
          id: 'a',
          label: 'Accept json: unknown and validate it into an Order before returning',
          isCorrect: true,
          feedback: 'unknown forces validation at the boundary — no untyped value reaches consumers.',
        },
        {
          id: 'b',
          label: 'Keep json: any and cast as Order',
          isCorrect: false,
          feedback: 'any + cast is the original sin — it asserts a shape without checking it.',
        },
        {
          id: 'c',
          label: 'Type json as Order directly in the parameter',
          isCorrect: false,
          feedback: 'Claiming the raw input is already an Order is the same lie as the cast.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'External input should be unknown until proven.' },
        { level: 2, title: 'Concept', content: 'unknown + validation guards the boundary.' },
        { level: 3, title: 'Specific clue', content: 'The safe option validates before returning.' },
        { level: 4, title: 'Guided solution', content: 'Take unknown and validate into an Order.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Boundary typed' }],
      consequences: [{ type: 'stability', delta: -5, reason: 'An unvalidated cast let malformed orders through.' }],
      helpLinks: [{ topicId: 'typescript.unknown-vs-any', label: 'unknown vs any' }],
      successFeedback: 'The boundary is guarded — only validated Orders pass.',
      failureFeedback: 'any and direct-typing both skip validation. Use unknown and check.',
    },
    {
      id: 'typescript-trials-008-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Model the States',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext: 'OrderStatus is just string.',
      prompt: 'How should OrderStatus be defined?',
      options: [
        {
          id: 'a',
          label: "type OrderStatus = 'pending' | 'paid' | 'shipped' | 'cancelled';",
          isCorrect: true,
          feedback: 'A union restricts status to real states and makes switches exhaustive.',
        },
        {
          id: 'b',
          label: 'type OrderStatus = string;',
          isCorrect: false,
          feedback: 'Any string, including typos, remains valid — no safety gained.',
        },
        {
          id: 'c',
          label: 'type OrderStatus = any;',
          isCorrect: false,
          feedback: 'Even weaker than string — it disables checking entirely.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'List the real states as a type.' },
        { level: 2, title: 'Concept', content: 'A union is a checked vocabulary.' },
        { level: 3, title: 'Specific clue', content: 'The answer enumerates the valid statuses.' },
        { level: 4, title: 'Guided solution', content: 'Define a union of the valid statuses.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'States modelled' }],
      consequences: [{ type: 'stability', delta: -5, reason: 'A loose status string let typos ship.' }],
      helpLinks: [{ topicId: 'typescript.union-types', label: 'Union types' }],
      successFeedback: 'Status is a precise vocabulary now.',
      failureFeedback: 'string and any both stay loose. Use a union.',
    },
    {
      id: 'typescript-trials-008-c3',
      type: 'multiple-choice',
      title: 'Stage 3 — Narrow Before Use',
      difficulty: 'hard',
      tags: ['typescript'],
      storyContext: 'A consumer must read a field that only exists on paid orders.',
      prompt: 'How should it access the paid-only field?',
      options: [
        {
          id: 'a',
          label: "if (order.status === 'paid') { use(order.paidAt); }",
          isCorrect: true,
          feedback: 'Narrowing on the discriminant makes the paid-only field safe to read.',
        },
        {
          id: 'b',
          label: 'use((order as PaidOrder).paidAt);',
          isCorrect: false,
          feedback: 'A cast asserts the variant without checking — crashes on non-paid orders.',
        },
        {
          id: 'c',
          label: 'use(order.paidAt!);',
          isCorrect: false,
          feedback: 'The ! asserts presence and throws when the order is not paid.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check the status before reading paid-only fields.' },
        { level: 2, title: 'Concept', content: 'Discriminant narrowing makes variant fields safe.' },
        { level: 3, title: 'Specific clue', content: "The safe option checks status === 'paid' first." },
        { level: 4, title: 'Guided solution', content: 'Narrow on status before using paidAt.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Narrowed' }],
      consequences: [{ type: 'stability', delta: -5, reason: 'A cast read a field missing on unpaid orders.' }],
      helpLinks: [{ topicId: 'typescript.narrowing', label: 'Narrowing' }],
      successFeedback: 'Checked before use — no cast, no crash.',
      failureFeedback: 'Casts and ! skip the check. Narrow on the status.',
    },
    {
      id: 'typescript-trials-008-c4',
      type: 'multiple-choice',
      title: 'Stage 4 — Keep Helpers Generic',
      difficulty: 'boss',
      tags: ['typescript'],
      storyContext: 'pick(items: any[]) is used across the model layer.',
      prompt: 'How should pick be typed so callers keep their element type?',
      options: [
        {
          id: 'a',
          label: 'function pick<T>(items: T[]): T | undefined { return items[0]; }',
          isCorrect: true,
          feedback: 'The generic preserves each caller’s type, ending the any leak across the whole layer.',
        },
        {
          id: 'b',
          label: 'function pick(items: any[]): any { return items[0]; }',
          isCorrect: false,
          feedback: 'any in, any out — every caller loses its type.',
        },
        {
          id: 'c',
          label: 'function pick(items: unknown[]): unknown { return items[0]; }',
          isCorrect: false,
          feedback: 'Safer than any but still drops the element type; callers must re-narrow.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The return type should match the element type passed in.' },
        { level: 2, title: 'Concept', content: 'A generic carries the caller’s type through.' },
        { level: 3, title: 'Specific clue', content: 'Look for <T>, T[] and T | undefined.' },
        { level: 4, title: 'Guided solution', content: 'Make pick generic over T.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Model layer stabilised' }],
      consequences: [{ type: 'technical-debt', delta: 10, reason: 'An any-returning helper kept leaking untyped values.' }],
      helpLinks: [{ topicId: 'typescript.generics', label: 'Generics' }],
      successFeedback:
        'Boundary typed, states modelled, narrowing enforced, helpers generic — the model layer is stable and the compiler can defend it. Trials complete.',
      failureFeedback: 'any and unknown both drop the element type. A generic preserves it.',
    },
  ],
  reflectionPrompt:
    'Across the Trials — which weakness (loose strings, any, missing narrowing, absent optionals) causes the most production defects in your experience?',
  rewards: [
    { type: 'xp', amount: 25, label: 'Trials champion' },
    { type: 'badge', id: 'type-guardian', label: 'Type Guardian' },
  ],
};
