import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — the typed checkout, assembled from every forms lesson:
 * nonNullable groups, honest nullability, value-vs-raw, pure validators,
 * valueChanges previews and a guarded submit.
 */
export const fnTf009BossCheckout: MissionDefinition = {
  id: 'tf-009-boss-checkout',
  campaignId: 'ng-typed-forms',
  title: 'Boss: The Typed Checkout',
  summary:
    'Rebuild the checkout that started the forms session — every field typed, every lesson applied, nothing left to luck.',
  difficulty: 'boss',
  learningObjectives: [
    'Design a form model with deliberate nullability per control',
    'Wire a live preview from valueChanges without the classic gaps',
    'Sign off a submit contract that survives review',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The finale is the form that caused the confession, the half-address and the loop of legend: checkout. Rebuild it as if the sessions had come first.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The sheet: quantities and emails always have values; gift message is genuinely optional; shipping disables under “same as billing”; the total previews live; and submit sends the complete form exactly once per attempt.',
    },
  ],
  contextArtefacts: [
    {
      id: 'checkout-sheet',
      type: 'code',
      title: 'The checkout requirements sheet',
      language: 'text',
      content:
        '1. email, qty: always present — sensible defaults, no null\n2. giftMessage: genuinely optional — absence is data\n3. shipping group disables under “same as billing”\n4. total$ previews live, including on first render\n5. submit: complete form state, once per attempt, button honest',
    },
  ],
  challenges: [
    {
      id: 'tf-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Model the Form',
      difficulty: 'hard',
      tags: ['angular', 'typescript'],
      storyContext: 'Requirements 1–2 decide the builders. Choose the model.',
      prompt: 'Which construction matches the sheet?',
      options: [
        {
          id: 'a',
          label:
            'Everything from NonNullableFormBuilder, giftMessage included — initial \'\' means “no message”.',
          isCorrect: false,
          feedback:
            "'' as “no message” is the sentinel trap from mission 3 — someone WILL print the empty gift card. Absence deserves null.",
        },
        {
          id: 'b',
          label:
            'nnfb.group({ email: [\'\'], qty: [1] }) for the always-present fields, plus giftMessage: new FormControl<string | null>(null) — nullability chosen per control.',
          isCorrect: true,
          feedback:
            'Deliberate per-field nullability: defaults where absence is meaningless, honest null where absence is data.',
        },
        {
          id: 'c',
          label: 'Default FormBuilder throughout — every field as T | null keeps the model uniform.',
          isCorrect: false,
          feedback:
            'Uniformly nullable means ?? guards on qty and email forever — requirement 1 said always present.',
        },
        {
          id: 'd',
          label: 'Skip reactive forms; two-way bind ngModel to a typed interface for full control.',
          isCorrect: false,
          feedback:
            'Template-driven forms trade away the typed group, statusChanges and the whole session’s toolkit.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Requirement 1 and requirement 2 want OPPOSITE nullability. Model both.' },
        {
          level: 2,
          title: 'Concept',
          content: 'nonNullable for meaningful defaults; nullable for genuine absence — per control, not per form.',
        },
        { level: 3, title: 'Specific clue', content: 'Beware the empty-string gift message — sentinels lie.' },
        { level: 4, title: 'Guided solution', content: 'Mixed builders: nnfb for email/qty, nullable control for giftMessage.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Model chosen' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'A uniform model forced null-guards on fields that could never be null.',
        },
      ],
      helpLinks: [{ topicId: 'forms.nullability', label: 'Form nullability' }],
      successFeedback: 'Nullability by meaning, field by field — the model carries the requirements.',
      failureFeedback: 'Check each option against BOTH requirement 1 and requirement 2.',
    },
    {
      id: 'tf-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Preview',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'A teammate wired requirement 4, the live total. Review against the campaign.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'preview',
          type: 'code',
          title: 'total preview (proposed)',
          language: 'ts',
          content:
            "readonly total = toSignal(\n  this.form.valueChanges.pipe(\n    map(() => this.priceOf(this.form.getRawValue())),\n    tap((t) => this.form.controls.qty.setValue(Math.min(this.form.getRawValue().qty, 99)))\n  ),\n  { initialValue: this.priceOf(this.form.getRawValue()) }\n);",
        },
      ],
      findings: [
        {
          id: 'setvalue-loop',
          label: 'The tap calls setValue inside the form’s own valueChanges pipeline — the loop of legend, again',
          isCorrect: true,
          feedback:
            'Every qty change re-triggers the pipe that changes qty. Clamping belongs in a validator or an emitEvent:false write — not a preview tap.',
        },
        {
          id: 'initial-value',
          label: 'Computing initialValue from getRawValue duplicates the map logic and will drift',
          isCorrect: false,
          feedback:
            'Seeding the signal with the same pricing function is the startWith lesson done via toSignal — intentional and correct.',
        },
        {
          id: 'raw-in-map',
          label: 'Using getRawValue inside the map ignores the emitted value parameter',
          isCorrect: false,
          feedback:
            'Deliberate here: the emitted value is Partial (disabled shipping!), while pricing needs the complete state. Reading raw is the honest source.',
        },
        {
          id: 'preview-side-effect',
          label: 'A preview pipeline carrying a write is doing two jobs — derivation and mutation — in one stream',
          isCorrect: true,
          feedback:
            'Even without the loop, a total-preview that edits the form violates one-job-per-stream; nobody will look for a qty clamp here.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'One line does something no preview should do. Both issues live there.' },
        {
          level: 2,
          title: 'Concept',
          content: 'Derivations read; they never write. Writes inside valueChanges need emitEvent:false at minimum.',
        },
        { level: 3, title: 'Specific clue', content: 'The seeding and the raw read are the healthy parts.' },
        { level: 4, title: 'Guided solution', content: 'Flag the setValue tap twice: as a loop and as a misplaced job.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Preview purified' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The clamping preview froze checkout for any quantity above 99.',
        },
      ],
      helpLinks: [
        { topicId: 'forms.valuechanges', label: 'valueChanges' },
        { topicId: 'fp.pure-functions', label: 'Pure functions' },
      ],
      successFeedback: 'Previews read, validators judge, writes stay out — stage 2 clear.',
      failureFeedback: 'Find the write inside the read. Then say why it is wrong twice over.',
    },
    {
      id: 'tf-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the Submit',
      difficulty: 'boss',
      tags: ['angular', 'api'],
      storyContext: 'Two submit implementations remain. Requirement 5 decides.',
      prompt: 'Which submit meets the sheet?',
      options: [
        {
          id: 'a',
          label:
            'submitClicks$.pipe(\n  filter(() => this.form.valid),\n  exhaustMap(() => this.api.placeOrder(this.form.getRawValue()).pipe(\n    catchError(() => { this.showRetry(); return EMPTY; })\n  )),\n  takeUntilDestroyed()\n)',
          isCorrect: true,
          feedback:
            'Every line earns its place: validity gate, ignore-while-busy, complete payload, inner catch that keeps the stream alive, lifetime bound. Signed.',
        },
        {
          id: 'b',
          label:
            'submitClicks$.pipe(\n  exhaustMap(() => this.api.placeOrder(this.form.value)),\n  takeUntilDestroyed()\n)',
          isCorrect: false,
          feedback:
            'Two sheet violations: value drops the disabled shipping group, and the first failed order errors the stream dead — no retry will ever fire.',
        },
        {
          id: 'c',
          label:
            'onSubmit() { if (this.form.valid) { this.api.placeOrder(this.form.getRawValue()).subscribe(); } }',
          isCorrect: false,
          feedback:
            'The payload is right, but every click spawns an unguarded, uncleaned subscription — double-click double-orders, and nobody unsubscribes.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Score each against requirement 5: complete state, once per attempt, survivable failure.' },
        {
          level: 2,
          title: 'Concept',
          content: 'The house submit: gate on validity, exhaustMap, getRawValue, inner catchError, bound lifetime.',
        },
        { level: 3, title: 'Specific clue', content: 'One candidate dies on first failure; one multiplies orders on double-click.' },
        { level: 4, title: 'Guided solution', content: 'Sign the gated exhaustMap + getRawValue + inner-catch candidate.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Checkout signed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The lesser submit shipped: a failed order silenced the button until refresh.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The rebuilt checkout needed a hotfix in week one — the sessions deserved better.',
        },
      ],
      helpLinks: [
        { topicId: 'forms.value-vs-raw', label: 'value vs getRawValue' },
        { topicId: 'rx.flattening', label: 'switchMap & friends' },
        { topicId: 'rx.operators', label: 'RxJS operators' },
      ],
      successFeedback:
        'Typed model, honest preview, guarded submit — the checkout that started it all, rebuilt right. Campaign complete.',
      failureFeedback:
        'Hold each candidate against requirement 5, then check what happens on the first FAILED order.',
    },
  ],
  reflectionPrompt: 'Of the five sheet lines, which one does your team’s biggest form currently violate?',
  rewards: [{ type: 'xp', amount: 25, label: 'Checkout rebuilt' }],
};
