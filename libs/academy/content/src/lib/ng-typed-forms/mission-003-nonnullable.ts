import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — NonNullableFormBuilder (knowledge pack 07: "Use
 * NonNullableFormBuilder or handle string | null explicitly").
 */
export const fnTf003NonNullable: MissionDefinition = {
  id: 'tf-003-nonnullable',
  campaignId: 'ng-typed-forms',
  title: 'Opting Out of null',
  summary:
    'When a control should never be null, say so at construction — and reset() starts returning the initial value instead.',
  difficulty: 'easy',
  learningObjectives: [
    'Build non-nullable controls deliberately',
    'Predict reset() behaviour for nonNullable controls',
    'Choose between handling null and forbidding it',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'After the Clear-button incident we had two choices per control: handle the null at every read, or forbid it at the source. For controls with a sensible initial value, forbidding wins.',
    },
    {
      speaker: 'Senior Dev',
      text: 'NonNullableFormBuilder makes it the default for a whole form: every control types as T, and reset() returns to the INITIAL value — the behaviour everyone always assumed reset had.',
    },
  ],
  contextArtefacts: [
    {
      id: 'nnfb',
      type: 'code',
      title: 'The migration, one form at a time',
      language: 'ts',
      content:
        "private fb = inject(NonNullableFormBuilder);\n\nreadonly filterForm = this.fb.group({\n  query: [''],\n  inStockOnly: [false],\n});\n// query: FormControl<string>  — reset() → ''\n// inStockOnly: FormControl<boolean> — reset() → false",
    },
  ],
  challenges: [
    {
      id: 'tf-003-c1',
      type: 'multiple-choice',
      title: 'reset(), Reformed',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext: 'Same Clear button, new builder. The team retests the incident path.',
      prompt: 'After this.filterForm.reset(), what is query.value?',
      options: [
        {
          id: 'a',
          label: "'' — nonNullable controls reset to their initial value, and the type stays plain string.",
          isCorrect: true,
          feedback:
            'The reform in one line: initial value on reset, null gone from the type, Clear button finally safe.',
        },
        {
          id: 'b',
          label: 'null — reset() always installs null; the builder only changes the compile-time type.',
          isCorrect: false,
          feedback:
            'The builder changes RUNTIME reset behaviour too — type and behaviour move together, which is the point.',
        },
        {
          id: 'c',
          label: 'undefined — nonNullable swaps null for undefined to satisfy strict checks.',
          isCorrect: false,
          feedback: 'No third value appears — the initial value returns, exactly as constructed.',
        },
        {
          id: 'd',
          label: 'Whatever the user last typed — reset() only clears validation state on nonNullable forms.',
          isCorrect: false,
          feedback: 'reset() still resets values; it just finally resets them to something sensible.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'nonNullable changes what reset() installs. To what?' },
        {
          level: 2,
          title: 'Concept',
          content: 'Non-nullable controls remember their initial value and return to it on reset.',
        },
        { level: 3, title: 'Specific clue', content: 'Type and runtime agree — no null anywhere means no null on reset.' },
        { level: 4, title: 'Guided solution', content: "Choose '' with the initial-value reasoning." },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Reset reformed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Half the team kept writing ?? guards on controls that could no longer be null.',
        },
      ],
      helpLinks: [{ topicId: 'forms.nullability', label: 'Form nullability' }],
      successFeedback: 'Initial value on reset — the behaviour everyone assumed, now real.',
      failureFeedback: 'The builder is not just types: what does reset() now have to return to?',
    },
    {
      id: 'tf-003-c2',
      type: 'multiple-choice',
      title: 'When NOT to Forbid null',
      difficulty: 'medium',
      tags: ['angular', 'typescript'],
      storyContext:
        'A date-of-birth control on an optional profile section: unfilled genuinely means “not provided”.',
      prompt: 'What is the right modelling?',
      options: [
        {
          id: 'a',
          label: "nonNullable with initial new Date(0) — 1970 obviously means 'not provided'.",
          isCorrect: false,
          feedback:
            "A sentinel date is a lie wearing a type: some code WILL treat 1970 as a birthday. We met this bug in the wild.",
        },
        {
          id: 'b',
          label: "nonNullable with initial '' cast as unknown as Date to satisfy the type.",
          isCorrect: false,
          feedback: 'A double assertion to fake absence — the ts-8 audit would flag this in seconds.',
        },
        {
          id: 'c',
          label:
            'A default nullable FormControl<Date | null> — null IS the honest “not provided”, handled at reads.',
          isCorrect: true,
          feedback:
            'Absence is real data here, so the type says so. nonNullable is for controls where absence is meaningless.',
        },
        {
          id: 'd',
          label: 'Two controls: a hasDob boolean plus a nonNullable date, kept in sync manually.',
          isCorrect: false,
          feedback:
            'Two fields that must agree is the invalid-states-representable trap — one nullable field says it all.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is “not provided” a real state of this data? Then model it.' },
        {
          level: 2,
          title: 'Concept',
          content: 'nonNullable suits controls with a meaningful default; nullable suits genuinely optional data.',
        },
        { level: 3, title: 'Specific clue', content: 'Sentinel values (epoch dates, empty strings as dates) are the trap options.' },
        { level: 4, title: 'Guided solution', content: 'Choose the honest Date | null control.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Absence modelled' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'A 1970 sentinel birthday appeared on real profiles within the month.',
        },
      ],
      helpLinks: [
        { topicId: 'forms.nullability', label: 'Form nullability' },
        { topicId: 'typescript.strict-null-checks', label: 'Strict null checks' },
      ],
      successFeedback: 'Forbid null when absence is meaningless; keep it when absence is data. You chose by meaning.',
      failureFeedback: 'Ask what null MEANS for a birthday. Is that meaning worth keeping in the type?',
    },
  ],
  reflectionPrompt: 'Sort three controls you own into: sensible default (nonNullable) vs genuine absence (nullable).',
  rewards: [{ type: 'xp', amount: 10, label: 'Nullability by choice' }],
};
