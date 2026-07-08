import { MissionDefinition } from '@academy/content-model';

/** TypeScript Trials 7 — "Type Review" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const ttMission007TypeReview: MissionDefinition = {
  id: 'typescript-trials-007-type-review',
  campaignId: 'typescript-trials',
  title: 'Type Review',
  summary: 'Review a model file for every weakness this campaign covered.',
  difficulty: 'hard',
  learningObjectives: [
    'Combine unknown, unions, narrowing, generics and optionals in one review',
    'Judge a shared type definition',
    'Catch weaknesses before they spread',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'A core models file is up for review. It underpins the whole app, so every weakness here multiplies. Apply everything the Trials taught.',
    },
  ],
  contextArtefacts: [
    {
      id: 'models',
      type: 'code',
      title: 'models.ts (proposed)',
      language: 'ts',
      content:
        'export interface Order {\n  id: string;\n  status: string;              // any string allowed\n  total: any;                  // untyped\n  coupon: { code: string };    // sometimes absent, not marked optional\n}\n\nexport function parse(json: any): Order {\n  return json as Order;\n}',
    },
  ],
  challenges: [
    {
      id: 'typescript-trials-007-c1',
      type: 'code-review',
      title: 'Review the Model Layer',
      difficulty: 'hard',
      tags: ['typescript'],
      storyContext: 'Four candidates; three are genuine weaknesses.',
      prompt: 'Select every real type weakness in this file.',
      findings: [
        {
          id: 'coupon-required',
          label: 'coupon is required but is sometimes absent',
          isCorrect: true,
          feedback:
            'If a coupon can be missing, model it coupon?: { code: string } so the compiler forces a check.',
        },
        {
          id: 'id-string',
          label: 'id should be a number, not a string',
          isCorrect: false,
          feedback:
            'String ids are a perfectly valid, common choice — not a weakness.',
        },
        {
          id: 'total-any',
          label: 'total is typed any',
          isCorrect: true,
          feedback:
            'any on a money field is dangerous — it should be number, checked everywhere it is used.',
        },
        {
          id: 'status-string',
          label: 'status is a loose string instead of a union of valid states',
          isCorrect: true,
          feedback:
            'A union type would restrict status to real values and catch typos at compile time.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Scan for loose strings, any, and mis-marked optionals.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'The Trials in one file: prefer unions over loose strings, precise types over any, and mark genuinely-optional fields optional. The parse-by-cast is the boundary sin from Unknown Data.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'Three weaknesses: status string, total any, required-but-absent coupon.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Flag status, total and coupon. The string id is fine.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Model reviewed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 15,
          reason: 'A weak core model spread untyped values through the app.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.union-types', label: 'Union types' },
        {
          topicId: 'typescript.strict-null-checks',
          label: 'Strict null checks',
        },
      ],
      successFeedback:
        'The core model is now precise — weaknesses caught before they multiplied.',
      failureFeedback:
        'Look for the loose string, the any, and the required-but-optional field.',
    },
  ],
  reflectionPrompt:
    'Why does a weakness in a shared model cost more than the same weakness in a leaf component?',
  rewards: [{ type: 'xp', amount: 5, label: 'Reviewer’s eye' }],
};
