import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — FormGroup typing (knowledge pack 01: FormGroup, typed
 * group values; why group.value is Partial).
 */
export const fnTf004GroupTyping: MissionDefinition = {
  id: 'tf-004-group-typing',
  campaignId: 'ng-typed-forms',
  title: 'Groups and Their Partial Truth',
  summary:
    'A FormGroup’s value type has a surprise: every property is optional — and the reason is disabled controls.',
  difficulty: 'medium',
  learningObjectives: [
    'Read the value type of a typed FormGroup',
    'Explain why group.value properties are optional',
    'Access one control with strong typing via controls',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'The session’s double-take moment: our group of two nonNullable controls produced value type { query?: string; inStockOnly?: boolean }. Optional? We made them non-nullable!',
    },
    {
      speaker: 'Team Lead',
      text: 'The resolution: value EXCLUDES disabled controls. Since any control might be disabled at runtime, the type marks every property optional. That design decision drives the whole next mission.',
    },
  ],
  contextArtefacts: [
    {
      id: 'partial',
      type: 'code',
      title: 'The double-take, verbatim',
      language: 'ts',
      content:
        "readonly filterForm = this.fb.group({\n  query: [''],\n  inStockOnly: [false],\n});\n\nconst v = this.filterForm.value;\n// v: { query?: string; inStockOnly?: boolean }  ← why optional?",
    },
  ],
  challenges: [
    {
      id: 'tf-004-c1',
      type: 'multiple-choice',
      title: 'Why Optional?',
      difficulty: 'medium',
      tags: ['angular', 'typescript'],
      storyContext: 'Answer the room’s double-take with the real reason.',
      prompt: 'Why does group.value mark every property optional?',
      options: [
        {
          id: 'a',
          label: 'A leftover from untyped forms — the Angular team plans to remove the optionality.',
          isCorrect: false,
          feedback: 'It is deliberate and current — the design encodes a runtime behaviour, not legacy debt.',
        },
        {
          id: 'b',
          label: 'Controls added with addControl later cannot be known statically, so all keys soften.',
          isCorrect: false,
          feedback:
            'Dynamically-added controls affect different typings (Record forms) — this group’s keys are fully static.',
        },
        {
          id: 'c',
          label: 'Because valueChanges may not have emitted yet, values may be absent initially.',
          isCorrect: false,
          feedback: 'Group values exist from construction — there is no pre-emission gap on value.',
        },
        {
          id: 'd',
          label:
            'value omits DISABLED controls, and any control might be disabled at runtime — so the type must allow each property to be missing.',
          isCorrect: true,
          feedback:
            'The honest encoding of a runtime rule: disabled ⇒ excluded from value ⇒ optional in the type.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What runtime state removes a control from value?' },
        {
          level: 2,
          title: 'Concept',
          content: 'group.value is the value of ENABLED controls only; the type says so with ?.',
        },
        { level: 3, title: 'Specific clue', content: 'The answer is one word: disabled.' },
        { level: 4, title: 'Guided solution', content: 'Choose the disabled-controls-excluded option.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Partial explained' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The optionality stayed a mystery, and ! assertions bloomed around group.value.',
        },
      ],
      helpLinks: [{ topicId: 'forms.value-vs-raw', label: 'value vs getRawValue' }],
      successFeedback: 'Optional because disabled — the type is documenting runtime behaviour.',
      failureFeedback: 'Think about what value does with a disabled control. The type is telling you.',
    },
    {
      id: 'tf-004-c2',
      type: 'multiple-choice',
      title: 'One Control, Strongly',
      difficulty: 'medium',
      tags: ['angular', 'typescript'],
      storyContext:
        'You need the query control itself — typed — to call setValue and read valueChanges.',
      prompt: 'Which access is fully typed?',
      options: [
        {
          id: 'a',
          label: "this.filterForm.get('query') — the classic accessor.",
          isCorrect: false,
          feedback:
            'get() returns AbstractControl<any> | null — the classic accessor is also the classic type hole.',
        },
        {
          id: 'b',
          label: 'this.filterForm.controls.query — the typed controls map.',
          isCorrect: true,
          feedback:
            'controls preserves the group’s type: query is FormControl<string>, no null, no any.',
        },
        {
          id: 'c',
          label: "this.filterForm.get('query') as FormControl<string> — assert what you know.",
          isCorrect: false,
          feedback:
            'It works until the control is renamed — then the string key silently misses and the assertion hides it. The typed map catches renames at compile time.',
        },
        {
          id: 'd',
          label: "this.filterForm.value.query — the value IS the control for reading purposes.",
          isCorrect: false,
          feedback:
            'That is a possibly-absent VALUE snapshot — no setValue, no valueChanges, and optional to boot.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'You want the CONTROL object, through an accessor that keeps types.' },
        {
          level: 2,
          title: 'Concept',
          content: 'group.controls is a typed map of the actual control instances; get(string) erases types.',
        },
        { level: 3, title: 'Specific clue', content: 'Renaming the control should break the access at compile time. Which access breaks?' },
        { level: 4, title: 'Guided solution', content: 'Choose .controls.query.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Control accessed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: "get('query') as FormControl<string> spread as the house pattern, hiding two renames.",
        },
      ],
      helpLinks: [{ topicId: 'forms.typed-controls', label: 'Typed controls' }],
      successFeedback: 'The typed map keeps the compiler in the loop — renames now fail loudly.',
      failureFeedback: 'One accessor survives a rename with a compile error. That is the one you want.',
    },
  ],
  reflectionPrompt: 'Search your feature for get(\'…\') — which calls could become .controls today?',
  rewards: [{ type: 'xp', amount: 10, label: 'Groups typed' }],
};
