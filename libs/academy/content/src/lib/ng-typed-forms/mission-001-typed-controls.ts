import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — typed form controls (knowledge pack 01: model user input
 * safely; typed forms prevent runtime form-value mistakes).
 */
export const fnTf001TypedControls: MissionDefinition = {
  id: 'tf-001-typed-controls',
  campaignId: 'ng-typed-forms',
  title: 'Controls With Types',
  summary:
    'Angular forms carry types now — read FormControl<string> the way you read Observable<string>.',
  difficulty: 'intro',
  learningObjectives: [
    'Read the type parameter on FormControl',
    'Say what typed forms prevent that untyped ones allowed',
    'Let inference set the control type from its initial value',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The forms session opened with a confession: our old checkout read form.value.qty as a number for two years. It was a string the whole time — every browser input is.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Typed forms end that class of bug: FormControl<string> means value, valueChanges and setValue all agree on string — and lying to any of them is a compile error.',
    },
  ],
  contextArtefacts: [
    {
      id: 'typed-control',
      type: 'code',
      title: 'From the session slides',
      language: 'ts',
      content:
        "const name = new FormControl('Avery');\n// inferred: FormControl<string | null>\n\nname.setValue('Sam');   // ok\nname.setValue(42);      // compile error",
    },
  ],
  challenges: [
    {
      id: 'tf-001-c1',
      type: 'multiple-choice',
      title: 'What the Type Buys',
      difficulty: 'intro',
      tags: ['angular', 'typescript'],
      storyContext:
        'A teammate asks why we migrated: “the form worked before typed controls existed.”',
      prompt: 'What do typed controls actually prevent?',
      options: [
        {
          id: 'a',
          label: 'Invalid user input — typing the control rejects bad values in the browser.',
          isCorrect: false,
          feedback:
            'Users can still type anything; validators judge input. The TYPE protects the code around the control.',
        },
        {
          id: 'b',
          label: 'Template typos — typed controls make formControlName checked at runtime.',
          isCorrect: false,
          feedback:
            'formControlName strings are a separate hazard — control types do not validate template wiring.',
        },
        {
          id: 'c',
          label:
            'Code-level lies: reading value as the wrong type, or setValue with a value the control cannot hold, both fail to compile.',
          isCorrect: true,
          feedback:
            'The two-year qty bug, retired: value, setValue and valueChanges now share one contract the compiler enforces.',
        },
        {
          id: 'd',
          label: 'Change detection cycles — typed controls update the view without zone.js.',
          isCorrect: false,
          feedback: 'Typing is a compile-time contract; scheduling is a different machine entirely.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Who is protected: the user typing, or the developer reading?' },
        {
          level: 2,
          title: 'Concept',
          content: 'FormControl<T> types value (T), setValue (T) and valueChanges (Observable<T>) together.',
        },
        { level: 3, title: 'Specific clue', content: 'Remember the confession: the bug was in CODE that read the value.' },
        { level: 4, title: 'Guided solution', content: 'Pick the compile-time contract option.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Contract read' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Typed forms stayed “migration busywork” in half the team’s heads.',
        },
      ],
      helpLinks: [{ topicId: 'forms.typed-controls', label: 'Typed controls' }],
      successFeedback: 'The type protects every reader and writer of the control — that is the sale.',
      failureFeedback: 'Validators judge users; types judge code. Which option is about code?',
    },
    {
      id: 'tf-001-c2',
      type: 'multiple-choice',
      title: 'Read the Inference',
      difficulty: 'easy',
      tags: ['angular', 'typescript'],
      storyContext: 'Same slide, sharper question: new FormControl(0) — what is its exact type?',
      prompt: 'What does inference produce, and why?',
      options: [
        {
          id: 'a',
          label:
            'FormControl<number | null> — the initial value fixes number, and reset() can put null back in unless the control is nonNullable.',
          isCorrect: true,
          feedback:
            'Both halves right: inference from the initial value, plus the null that reset() can reintroduce — next mission’s whole topic.',
        },
        {
          id: 'b',
          label: 'FormControl<number> — the initial value is a number, end of story.',
          isCorrect: false,
          feedback:
            'Half right: number comes from inference, but reset() can set null — so null is in the type unless you opt out.',
        },
        {
          id: 'c',
          label: 'FormControl<unknown> — controls cannot infer types from values.',
          isCorrect: false,
          feedback: 'They infer exactly like variables do — the initial value is the evidence.',
        },
        {
          id: 'd',
          label: 'FormControl<string | null> — form values are always strings underneath.',
          isCorrect: false,
          feedback:
            'INPUT elements yield strings; the CONTROL holds whatever type you construct it with — here, a number.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Two questions: what does 0 fix, and what can reset() do later?' },
        {
          level: 2,
          title: 'Concept',
          content: 'Default controls are nullable: reset() returns them to null, so null joins the value type.',
        },
        { level: 3, title: 'Specific clue', content: 'The surprising member of the union is the mission-2 cliffhanger.' },
        { level: 4, title: 'Guided solution', content: 'Choose number | null with the reset() reasoning.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Inference read' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Code assumed number where null could arrive, and the first reset() proved it.',
        },
      ],
      helpLinks: [{ topicId: 'forms.nullability', label: 'Form nullability' }],
      successFeedback: 'number from the value, null from reset — you read the whole union.',
      failureFeedback: 'Inference is only half the type. What value does reset() install?',
    },
  ],
  reflectionPrompt: 'Which form in our app still reads its values through any?',
  rewards: [{ type: 'xp', amount: 5, label: 'Forms typed' }],
};
