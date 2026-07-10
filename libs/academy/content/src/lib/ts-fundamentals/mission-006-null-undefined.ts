import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — optionality, null/undefined, and the ??/|| precedence error
 * the team actually hit (knowledge pack 07: "Mixing ?? and || without
 * parentheses"; Nx troubleshooting notes).
 */
export const fnTs006NullUndefined: MissionDefinition = {
  id: 'ts-fund-006-null-undefined',
  campaignId: 'ts-fundamentals',
  title: 'Null, Undefined & Fallbacks',
  summary:
    'Handle absence honestly: optional properties, strict null checks, and the ?? vs || footgun from our own build log.',
  difficulty: 'medium',
  learningObjectives: [
    'Declare optionality with ?: and read what it implies',
    'Choose ?? or || deliberately',
    'Fix the ambiguous-mixing error the team hit in CI',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: "This one is straight from our build log: \"'||' and '??' operations cannot be mixed without parentheses.\" CI failed at 4:50 on a Friday.",
    },
    {
      speaker: 'Senior Dev',
      text: 'The deeper lesson: || falls back on every falsy value — 0, empty string, false — while ?? falls back only on null or undefined. They are different questions, not different spellings.',
    },
  ],
  contextArtefacts: [
    {
      id: 'ci-error',
      type: 'log',
      title: 'The CI failure',
      language: 'text',
      content:
        "app/settings.component.ts:14:31 - error TS5076:\n'||' and '??' operations cannot be mixed without parentheses.\n\n14   const perPage = saved ?? env.pageSize || 25;",
    },
  ],
  challenges: [
    {
      id: 'tsf-006-c1',
      type: 'multiple-choice',
      title: 'Fix Friday’s Build',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext:
        'saved is number | undefined and a saved value of 0 (show all) is legal. env.pageSize is number | undefined. Default is 25.',
      prompt: 'Which line compiles AND respects a saved value of 0?',
      options: [
        {
          id: 'a',
          label: 'const perPage = saved ?? (env.pageSize ?? 25);',
          isCorrect: true,
          feedback:
            'Parentheses satisfy the compiler, and ?? at both steps means a legal 0 survives every fallback.',
        },
        {
          id: 'b',
          label: 'const perPage = (saved ?? env.pageSize) || 25;',
          isCorrect: false,
          feedback:
            'It compiles — but the trailing || turns a saved 0 into 25, silently overriding "show all".',
        },
        {
          id: 'c',
          label: 'const perPage = saved || env.pageSize || 25;',
          isCorrect: false,
          feedback:
            'All-|| compiles too, and discards 0 twice. Falsy is not the same as absent.',
        },
        {
          id: 'd',
          label: 'const perPage = saved ?? env.pageSize ?? 0 || 25;',
          isCorrect: false,
          feedback:
            'This is the original error again — ?? and || mixed without parentheses does not compile.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Two requirements: it must compile, and 0 must be a respected value.' },
        {
          level: 2,
          title: 'Concept',
          content:
            '|| falls back on any falsy value (0, "", false); ?? only on null/undefined. Mixing them needs parentheses.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Any option containing || will treat the legal 0 as missing. That narrows it fast.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Pick the all-?? chain with parentheses: saved ?? (env.pageSize ?? 25).',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Build unbroken' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'A || fallback erased users’ "show all" setting on every load.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.strict-null-checks', label: 'Strict null checks' },
      ],
      successFeedback:
        'Compiles, and zero survives — you answered the question ?? was made for.',
      failureFeedback:
        'Ask of each operator: does it fall back on falsy, or only on absent? 0 is falsy but not absent.',
    },
    {
      id: 'tsf-006-c2',
      type: 'multiple-choice',
      title: 'What ?: Really Means',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext:
        'interface Profile { nickname?: string } — and a teammate writes profile.nickname.toUpperCase().',
      prompt: 'Under strict null checks, what happens and what is the right fix?',
      options: [
        {
          id: 'a',
          label:
            'It compiles; optional just means callers may omit it when constructing the object.',
          isCorrect: false,
          feedback:
            'Optional changes the read side too: the property’s type is string | undefined at every access.',
        },
        {
          id: 'b',
          label:
            'Compile error — nickname is string | undefined; guard it or use profile.nickname?.toUpperCase().',
          isCorrect: true,
          feedback:
            'Exactly: ?: adds undefined to the type, and optional chaining (or a guard) is the honest read.',
        },
        {
          id: 'c',
          label: 'Runtime error only — TypeScript cannot track optional properties.',
          isCorrect: false,
          feedback:
            'Tracking optionality is precisely what strict null checks do — the mistake never reaches runtime.',
        },
        {
          id: 'd',
          label: 'It compiles if you add // @ts-ignore, which is acceptable for UI code.',
          isCorrect: false,
          feedback:
            '@ts-ignore does not fix the undefined — it just moves the crash from compile time to a user’s session.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What is the TYPE of profile.nickname when you read it?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'nickname?: string means string | undefined on read. Strict null checks force you to deal with the undefined.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'The ?. operator exists for exactly this: call it if present, yield undefined if not.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Choose the compile-error option with the ?. fix — absence is part of the type, handled at the read.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Absence handled' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: "Reading toUpperCase on an absent nickname crashed the profile page.",
        },
      ],
      helpLinks: [
        { topicId: 'typescript.strict-null-checks', label: 'Strict null checks' },
      ],
      successFeedback:
        'You read ?: the way the compiler does: the value might not be there, so the code must say what then.',
      failureFeedback:
        'Optional is not only about construction — it changes the type you get back on every read.',
    },
  ],
  reflectionPrompt:
    'When did || silently eat a legitimate falsy value on you? What would ?? have done instead?',
  rewards: [{ type: 'xp', amount: 10, label: 'Fallbacks by intent' }],
};
