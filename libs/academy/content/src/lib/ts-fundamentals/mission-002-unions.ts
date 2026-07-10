import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — union & literal types (knowledge pack 02/07: "Using string
 * where a union is appropriate" was one of the team's recurring mistakes).
 */
export const fnTs002Unions: MissionDefinition = {
  id: 'ts-fund-002-unions',
  campaignId: 'ts-fundamentals',
  title: 'Unions Kill Magic Strings',
  summary:
    'Replace stringly-typed status fields with literal unions so invalid states stop compiling.',
  difficulty: 'easy',
  learningObjectives: [
    'Model a controlled set of values as a literal union',
    'Explain why string invites typos the compiler cannot see',
    'Choose a union over an enum-of-strings by default',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: "The bug that started this session: a request spent a week 'in review' and never surfaced, because one code path wrote the status 'reviewing' and another checked for 'in-review'.",
    },
    {
      speaker: 'Team Lead',
      text: 'A union type makes the valid values part of the contract. The typo that cost us a week would have been a compile error.',
    },
  ],
  contextArtefacts: [
    {
      id: 'status-writes',
      type: 'code',
      title: 'Two files, two spellings',
      language: 'ts',
      content:
        "// review.service.ts\nrequest.status = 'reviewing';\n\n// review-list.component.ts\nconst open = requests.filter(r => r.status === 'in-review');",
    },
  ],
  challenges: [
    {
      id: 'tsf-002-c1',
      type: 'multiple-choice',
      title: 'Fix the Status Field',
      difficulty: 'easy',
      tags: ['typescript'],
      storyContext:
        'The request model currently declares status: string. The team wants the compiler to catch the next spelling drift.',
      prompt: 'Which declaration makes the invalid spelling a compile-time error?',
      options: [
        {
          id: 'a',
          label: "status: 'draft' | 'in-review' | 'approved' | 'rejected';",
          isCorrect: true,
          feedback:
            "A literal union: assigning 'reviewing' is now a compile error at the exact line that drifts.",
        },
        {
          id: 'b',
          label: 'status: string; // documented in the wiki',
          isCorrect: false,
          feedback:
            'Documentation cannot fail a build. string still accepts every typo it accepted before.',
        },
        {
          id: 'c',
          label: "status: String; // the object wrapper is stricter",
          isCorrect: false,
          feedback:
            'String (the wrapper object) is looser, not stricter — and still places no limit on the value.',
        },
        {
          id: 'd',
          label: 'status: string[]; // track every status it has been',
          isCorrect: false,
          feedback:
            'An array changes the shape, not the safety — each element is still any spelling at all.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The fix must list the valid spellings in the type itself.' },
        {
          level: 2,
          title: 'Concept',
          content:
            "A union of string literals ('a' | 'b') is a type with exactly those values. Anything else fails to compile.",
        },
        {
          level: 3,
          title: 'Specific clue',
          content: "After the fix, request.status = 'reviewing' must be a red squiggle. Which option does that?",
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            "Pick the literal union 'draft' | 'in-review' | 'approved' | 'rejected' — the only declaration that constrains the value set.",
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Union locked in' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: "The status drift stayed possible, and reviewers kept double-checking strings by hand.",
        },
      ],
      helpLinks: [{ topicId: 'typescript.union-types', label: 'Union types' }],
      successFeedback:
        'Valid states are now part of the contract — the week-long "reviewing" bug cannot recur.',
      failureFeedback:
        'Ask which declaration would make the misspelled assignment fail to compile. Only one does.',
    },
    {
      id: 'tsf-002-c2',
      type: 'code-review',
      title: 'Review: Stringly-Typed Signals',
      difficulty: 'easy',
      tags: ['typescript'],
      storyContext:
        'A teammate opened a PR touching the request model. Review it with the session lesson fresh in mind.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'pr-model',
          type: 'code',
          title: 'request.model.ts (PR diff)',
          language: 'ts',
          content:
            "export interface ReviewRequest {\n  id: string;\n  priority: string; // 'low' | 'medium' | 'high' someday\n  kind: 'bug' | 'feature' | 'chore';\n  assignee: string;\n}",
        },
      ],
      findings: [
        {
          id: 'priority-string',
          label: "priority: string with the real values living in a comment",
          isCorrect: true,
          feedback:
            "The comment knows it is a controlled set — the type should say 'low' | 'medium' | 'high', not string.",
        },
        {
          id: 'kind-union',
          label: "kind uses a literal union instead of string",
          isCorrect: false,
          feedback: 'That is the pattern we want — kind is the healthy line in this diff.',
        },
        {
          id: 'comment-contract',
          label: 'A code comment is carrying a contract the compiler could enforce',
          isCorrect: true,
          feedback:
            'Comments drift and never fail builds. Contracts belong in types, where drift is a compile error.',
        },
        {
          id: 'assignee-string',
          label: 'assignee: string should also be a literal union of team members',
          isCorrect: false,
          feedback:
            'Assignees are open-ended data, not a fixed value set — string is the right call there.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Compare how priority and kind declare their valid values.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Use literal unions for controlled value sets; keep string for genuinely open-ended data like names.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'Two findings are real: one about the priority declaration, one about where its contract lives.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Select the stringly-typed priority and the comment-as-contract findings. kind and assignee are both correct as written.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Review filed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'A stringly-typed priority merged, and the "someday" union never came.',
        },
      ],
      helpLinks: [{ topicId: 'typescript.union-types', label: 'Union types' }],
      successFeedback:
        'You separated controlled value sets from open data — the review a senior would have left.',
      failureFeedback:
        'Ask of each field: is this a fixed set of values or open-ended data? Flag only the fixed set typed as string.',
    },
  ],
  reflectionPrompt: 'Which string field in our codebase is really a union in disguise?',
  rewards: [{ type: 'xp', amount: 5, label: 'Magic strings retired' }],
};
