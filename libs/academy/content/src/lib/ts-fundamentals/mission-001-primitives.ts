import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes mission — sourced from the team's TypeScript skill-up session
 * (knowledge pack 01/02: primitives, object types; 07: implicit any).
 */
export const fnTs001Primitives: MissionDefinition = {
  id: 'ts-fund-001-primitives',
  campaignId: 'ts-fundamentals',
  title: 'Primitives & Object Shapes',
  summary:
    'Start where the team started: describe real data with primitive and object types instead of leaving the compiler guessing.',
  difficulty: 'intro',
  learningObjectives: [
    'Choose the right primitive type for a value',
    'Describe an object with property types',
    'Recognise what an untyped parameter costs you',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'These campaigns are different: they are our own field notes. Every lesson here comes from a real session this team ran — including the mistakes we actually made.',
    },
    {
      speaker: 'Senior Dev',
      text: 'First session, first principle: TypeScript types describe what values are valid. Model the data accurately and the compiler becomes a teammate instead of a linter you fight.',
    },
  ],
  contextArtefacts: [
    {
      id: 'session-ticket',
      type: 'code',
      title: 'The data a session ticket actually carries',
      language: 'ts',
      content:
        "const ticket = {\n  attendee: 'Sam',\n  seats: 2,\n  paid: false,\n  joinedAt: '2025-11-03T09:30:00Z'\n};",
    },
  ],
  challenges: [
    {
      id: 'tsf-001-c1',
      type: 'multiple-choice',
      title: 'Type the Ticket',
      difficulty: 'intro',
      tags: ['typescript'],
      storyContext:
        'The sign-up page crashed in the demo because someone passed seats as a string. The ticket needs a real type.',
      prompt: 'Which type accurately describes the ticket data?',
      options: [
        {
          id: 'a',
          label:
            'interface Ticket {\n  attendee: string;\n  seats: string;\n  paid: string;\n  joinedAt: string;\n}',
          isCorrect: false,
          feedback:
            'Everything-is-a-string is how the demo crashed: 2 is a number and false is a boolean.',
        },
        {
          id: 'b',
          label:
            'interface Ticket {\n  attendee: string;\n  seats: number;\n  paid: boolean;\n  joinedAt: string;\n}',
          isCorrect: true,
          feedback:
            'Each property gets the primitive that matches its value — the compiler can now reject bad tickets at build time.',
        },
        {
          id: 'c',
          label: 'type Ticket = object;',
          isCorrect: false,
          feedback:
            '`object` accepts nearly anything and describes nothing — no property is checked.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Look at each value in the artefact and name its kind: text, count, yes/no.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'TypeScript has primitive types — string, number, boolean — and object types built from them. A good type mirrors the runtime value exactly.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: "2 is a number and false is a boolean — rule out any option that calls them strings.",
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Pick the interface with attendee: string, seats: number, paid: boolean, joinedAt: string — the only one matching every value.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Ticket typed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'An inaccurate model let a string reach arithmetic on seat counts.',
        },
      ],
      helpLinks: [{ topicId: 'typescript.interfaces', label: 'TypeScript interfaces' }],
      successFeedback:
        'The type mirrors the data, so bad tickets now fail at compile time instead of in the demo.',
      failureFeedback:
        'Match each property to the kind of value it holds — text, count or yes/no — and the right option stands out.',
    },
    {
      id: 'tsf-001-c2',
      type: 'multiple-choice',
      title: 'The Silent any',
      difficulty: 'easy',
      tags: ['typescript'],
      storyContext:
        'A helper from the session: function total(seats) { return seats * 55; } — no type on the parameter, and noImplicitAny is off.',
      prompt: 'What does TypeScript infer for the untyped seats parameter — and what does that cost?',
      options: [
        {
          id: 'a',
          label: 'It infers number, because seats is multiplied — the code is fully safe.',
          isCorrect: false,
          feedback:
            'Inference works on values, not on how a parameter is used later. Usage does not type a parameter.',
        },
        {
          id: 'b',
          label: 'It infers unknown, so every caller is forced to narrow before passing.',
          isCorrect: false,
          feedback:
            'unknown would be the safe boundary type — but implicit fallback is any, not unknown.',
        },
        {
          id: 'c',
          label: "It infers any — total('two') compiles and returns NaN at runtime.",
          isCorrect: true,
          feedback:
            'Exactly the failure from our session: any switches the checker off, and the bug ships as NaN.',
        },
        {
          id: 'd',
          label: 'It is a compile error in every TypeScript project, so this cannot ship.',
          isCorrect: false,
          feedback:
            'Only with noImplicitAny (or strict) enabled — the story says it is off, so this compiles quietly.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Ask what type the compiler assigns when you tell it nothing at all.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Without an annotation or a value to infer from, a parameter falls back to any — and any disables checking everywhere it flows.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: "Try total('two') in your head: 'two' * 55 is a runtime NaN, not a compile error.",
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            "The parameter becomes any, so a string slips through and the multiplication yields NaN — pick the option that says exactly that.",
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Implicit any spotted' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'An untyped parameter left a NaN pricing bug for the next engineer to find.',
        },
      ],
      helpLinks: [{ topicId: 'typescript.unknown-vs-any', label: 'unknown vs any' }],
      successFeedback:
        'You named the real cost: any is not a type, it is the absence of checking.',
      failureFeedback:
        'A parameter with no annotation and nothing to infer from falls back to any — reason from there.',
    },
  ],
  reflectionPrompt:
    'Where in our own codebase would an accurate object type have caught a bug you remember?',
  rewards: [{ type: 'xp', amount: 5, label: 'Field notes opened' }],
};
