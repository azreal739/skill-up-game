import { MissionDefinition } from '@academy/content-model';

/** Field Notes — generics (knowledge pack 02/03: generic functions, constraints). */
export const fnTs007Generics: MissionDefinition = {
  id: 'ts-fund-007-generics',
  campaignId: 'ts-fundamentals',
  title: 'Generics Without Fear',
  summary:
    'Write functions that keep the caller’s type instead of collapsing to any — and constrain what they accept.',
  difficulty: 'medium',
  learningObjectives: [
    'Parameterise a function over the types it preserves',
    'Constrain a type parameter with extends',
    'Spot where any masquerades as generic',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'Generics scared half the room until we reframed them: a generic is just a function argument for types. The caller passes a type in; the signature promises to give it back.',
    },
    {
      speaker: 'Team Lead',
      text: 'The refactor that convinced everyone: our firstOrDefault helper returned any — every call site cast the result. One type parameter deleted eleven casts.',
    },
  ],
  contextArtefacts: [
    {
      id: 'helper-before',
      type: 'code',
      title: 'firstOrDefault, before the session',
      language: 'ts',
      content:
        'function firstOrDefault(items: any[], fallback: any): any {\n  return items.length > 0 ? items[0] : fallback;\n}',
    },
  ],
  challenges: [
    {
      id: 'tsf-007-c1',
      type: 'multiple-choice',
      title: 'De-any the Helper',
      difficulty: 'hard',
      tags: ['typescript'],
      storyContext:
        'Rewrite firstOrDefault so tickets.length checks compile again on the result — with zero casts at call sites.',
      prompt: 'Which signature preserves the element type end to end?',
      options: [
        {
          id: 'a',
          label: 'function firstOrDefault(items: unknown[], fallback: unknown): unknown',
          isCorrect: false,
          feedback:
            'Safer than any, but the type still dies at the boundary — every caller must narrow the result by hand.',
        },
        {
          id: 'b',
          label: 'function firstOrDefault(items: object[], fallback: object): object',
          isCorrect: false,
          feedback:
            'object erases the element type too — and rejects arrays of primitives entirely.',
        },
        {
          id: 'c',
          label: 'function firstOrDefault<T>(items: T[], fallback: T): T',
          isCorrect: true,
          feedback:
            'T flows from the argument to the result: pass Ticket[], get Ticket back. Eleven casts, deleted.',
        },
        {
          id: 'd',
          label: 'function firstOrDefault<T>(items: T[], fallback: T): any',
          isCorrect: false,
          feedback:
            'The parameter is generic but the promise is broken at the return — any at the exit undoes the whole point.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The element type must appear in the parameters AND the return.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'A type parameter <T> is inferred from the arguments and threads through the signature unchanged.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Check the return type of each option — only one returns the same T it accepted.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Pick <T>(items: T[], fallback: T): T — type in, same type out.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Helper made generic' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'Call-site casts multiplied around the untyped helper.',
        },
      ],
      helpLinks: [{ topicId: 'typescript.generics', label: 'Generics' }],
      successFeedback:
        'The caller’s type survives the round trip — that is the entire promise of generics.',
      failureFeedback:
        'Follow the type through the signature: where does it enter, and does the return give it back?',
    },
    {
      id: 'tsf-007-c2',
      type: 'multiple-choice',
      title: 'Constrain It',
      difficulty: 'hard',
      tags: ['typescript'],
      storyContext:
        'New helper: pluckId should accept anything with an id: string and return that id. pluckId(42) must not compile.',
      prompt: 'Which signature accepts exactly the right inputs?',
      options: [
        {
          id: 'a',
          label: 'function pluckId<T>(entity: T): string',
          isCorrect: false,
          feedback:
            'Unconstrained T accepts 42 happily — and the body cannot even read .id without an error.',
        },
        {
          id: 'b',
          label: 'function pluckId(entity: { id: string }): string',
          isCorrect: false,
          feedback:
            'Close — it works, but loses T for richer signatures later (returning entity, arrays of T). The session standard keeps the parameter.',
        },
        {
          id: 'c',
          label: 'function pluckId<T extends object>(entity: T): string',
          isCorrect: false,
          feedback:
            'object rules out 42 but says nothing about id — the body still cannot read entity.id safely.',
        },
        {
          id: 'd',
          label: 'function pluckId<T extends { id: string }>(entity: T): string',
          isCorrect: true,
          feedback:
            'extends { id: string } admits any shape carrying a string id and rejects everything else at compile time.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The constraint must mention the id property.' },
        {
          level: 2,
          title: 'Concept',
          content:
            '<T extends Shape> keeps the flexibility of a type parameter while guaranteeing Shape’s members exist.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Test each option against pluckId(42): which ones fail to reject it, or fail to read .id?',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose <T extends { id: string }> — constraint and flexibility together.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Constraint applied' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'An unconstrained helper accepted a number and returned undefined ids downstream.',
        },
      ],
      helpLinks: [{ topicId: 'typescript.generics', label: 'Generics' }],
      successFeedback:
        'You kept T and told the compiler what T must at least be — constraints are contracts on type parameters.',
      failureFeedback:
        'Two tests for each option: does pluckId(42) fail to compile, and can the body legally read entity.id?',
    },
  ],
  reflectionPrompt:
    'Find one any-returning helper we still have. What would its generic signature be?',
  rewards: [{ type: 'xp', amount: 15, label: 'Types made portable' }],
};
