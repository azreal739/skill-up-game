import { MissionDefinition } from '@academy/content-model';

/** API Contract Crisis 1 — "Read the DTO" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const apiMission001ReadTheDto: MissionDefinition = {
  id: 'api-contract-crisis-001-read-the-dto',
  campaignId: 'api-contract-crisis',
  title: 'Read the DTO',
  summary:
    'A new integration is failing. Before writing a model, read what the API actually sends.',
  difficulty: 'easy',
  learningObjectives: [
    'Read a back-end DTO precisely',
    'Model the wire shape you receive, not the one you wish for',
    'Notice types and nullability, not just field names',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The Orders integration went live and the dashboard is throwing on real data. The back-end team sent over the DTO they serialise. Before you touch a line of the front-end model, read it carefully — the answer is usually in the shape.',
    },
  ],
  contextArtefacts: [
    {
      id: 'dto',
      type: 'code',
      title: 'OrderDto.java (what the API sends)',
      language: 'java',
      content:
        'public class OrderDto {\n  private String id;\n  private String total;      // e.g. "129.90"\n  private Integer itemCount;\n  private String status;     // "PENDING" | "PAID" | "CANCELLED"\n  private String customerRef; // nullable\n}',
    },
    {
      id: 'fe-model',
      type: 'code',
      title: 'order.model.ts (current front-end assumption)',
      language: 'ts',
      content:
        'interface Order {\n  id: string;\n  total: number;\n  itemCount: number;\n  status: string;\n  customerRef: string;\n}',
    },
  ],
  challenges: [
    {
      id: 'api-contract-crisis-001-c1',
      type: 'multiple-choice',
      title: 'Spot the Mismatch',
      difficulty: 'easy',
      tags: ['api'],
      storyContext:
        'The front-end interface was written from a wishlist, not from the DTO.',
      prompt:
        'Reading the DTO against the front-end model, what is actually wrong?',
      options: [
        {
          id: 'a',
          label:
            'total arrives as a numeric string ("129.90"), and customerRef can be null — the model claims number and non-null string',
          isCorrect: true,
          feedback:
            'The DTO serialises total as a String and marks customerRef nullable. The front-end model assumed number and a guaranteed string — the exact drift crashing the dashboard.',
        },
        {
          id: 'b',
          label: 'Nothing — the field names match, so the model is correct',
          isCorrect: false,
          feedback:
            'Matching names is not a matching contract. A number and a numeric string are different types, and a nullable field is not a guaranteed one.',
        },
        {
          id: 'c',
          label:
            'itemCount should be a string because everything from Java is a string',
          isCorrect: false,
          feedback:
            'Not everything — itemCount is an Integer and arrives as a number. Read each field on its own merits.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'Compare each field’s type and nullability, not just its name.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'A DTO promises exact types and nullability. total is a String here; customerRef is nullable. TypeScript types are erased at runtime, so a wrong assumption becomes a production error, not a compile error.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'Look at total (String vs number) and customerRef (nullable vs required).',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'total is a numeric string; customerRef can be null. The model is wrong on both.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'DTO read' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason:
            'A model written from assumptions crashed on the real payload.',
        },
      ],
      helpLinks: [{ topicId: 'api.dto', label: 'Reading a DTO' }],
      successFeedback:
        'You read the wire shape as it is: total is a string, customerRef is nullable. Now the model can be honest.',
      failureFeedback:
        'Compare types and nullability field by field — total is a String, customerRef is nullable.',
    },
  ],
  reflectionPrompt:
    'When a payload surprises you, is the fix usually in your code or in reading the contract more carefully first?',
  rewards: [{ type: 'xp', amount: 5, label: 'Contract crisis begins' }],
};
