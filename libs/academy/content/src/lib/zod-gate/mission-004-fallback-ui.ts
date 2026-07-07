import { MissionDefinition } from '@academy/content-model';

/** Zod Gate 4 — "Fallback UI" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const zodMission004FallbackUi: MissionDefinition = {
  id: 'zod-gate-004-fallback-ui',
  campaignId: 'zod-gate',
  title: 'Fallback UI',
  summary: 'Validation caught the bad data. Now design what the customer actually sees.',
  difficulty: 'medium',
  learningObjectives: [
    'Turn a validation failure into a designed UI state',
    'Avoid both blank screens and misleading empty states',
    'Keep a diagnostic trail for engineers',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The gate is holding — bad payloads no longer crash the app. But right now a rejected payload just renders nothing, and support is fielding “the page is broken” tickets.',
    },
    {
      speaker: 'Mission Control',
      text: 'Catching bad data is half the job. Decide what the customer sees, and make sure engineers can still find out what happened.',
    },
  ],
  contextArtefacts: [
    {
      id: 'current-handling',
      type: 'code',
      title: 'dashboard.component.ts (current)',
      language: 'ts',
      content:
        "load(id: string) {\n  this.service.getCustomer(id).subscribe(result => {\n    const parsed = CustomerSchema.safeParse(result);\n    if (parsed.success) {\n      this.customer = parsed.data;\n    }\n    // else: nothing happens\n  });\n}",
    },
  ],
  challenges: [
    {
      id: 'zod-gate-004-c1',
      type: 'multiple-choice',
      title: 'Design the Failure State',
      difficulty: 'medium',
      tags: ['zod', 'angular'],
      storyContext: 'A rejected payload should neither crash nor silently vanish.',
      prompt: 'What should happen when safeParse fails?',
      options: [
        {
          id: 'a',
          label:
            'Set an error state the template renders as “We couldn’t load this dashboard — try again”, and console.error the ZodError for engineers',
          isCorrect: true,
          feedback:
            'A visible, honest error state plus a developer-facing log: the customer is informed and the diagnostic trail survives.',
        },
        {
          id: 'b',
          label: 'Leave it as is — showing nothing is better than showing an error',
          isCorrect: false,
          feedback:
            'A blank screen reads as “broken” and generates the exact support tickets you are trying to prevent.',
        },
        {
          id: 'c',
          label: 'Fall back to an empty customer object ({ id: "", name: "", score: 0 })',
          isCorrect: false,
          feedback:
            'Fabricating data is worse than none — the customer sees a score of 0 as if it were real, and the failure is hidden from engineers too.',
        },
        {
          id: 'd',
          label: 'Retry the request forever until it validates',
          isCorrect: false,
          feedback:
            'If the payload is structurally wrong, retrying hammers the API and never succeeds. The data is bad, not late.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Two audiences need to learn about this failure: the customer and the engineer.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'A good failure state is honest to the user and diagnostic for the developer. Blank screens, fabricated data and infinite retries all hide the truth from one audience or both.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Only one option both renders a message and logs the ZodError.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Show an error state to the customer and console.error the ZodError for engineers. Choose that.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Fallback designed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'Silent failures kept generating “page is broken” tickets.',
        },
      ],
      helpLinks: [
        { topicId: 'zod.error-handling', label: 'Handling validation errors' },
        { topicId: 'zod.safe-parse', label: 'Using safeParse' },
      ],
      successFeedback: 'Honest to the user, diagnostic for the engineer — the failure state does real work.',
      failureFeedback:
        'Blank screens, fake data and endless retries each hide the problem from someone who needs to know.',
    },
  ],
  reflectionPrompt:
    'Why is a fabricated empty object often more dangerous than showing an explicit error?',
  rewards: [{ type: 'xp', amount: 5, label: 'Customer protected' }],
};
