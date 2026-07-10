import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — submission patterns (knowledge pack 01/03: forms + RxJS +
 * signals; exhaustMap submits; disable-while-saving done right).
 */
export const fnTf008Submission: MissionDefinition = {
  id: 'tf-008-submission',
  campaignId: 'ng-typed-forms',
  title: 'Submission Under Pressure',
  summary:
    'Submit is where forms meet the RxJS strategies: one save per click-burst, honest disabled state, no leaks.',
  difficulty: 'hard',
  learningObjectives: [
    'Guard submission with the right flattening strategy',
    'Represent in-flight state without duplicating truth',
    'Review a submit flow end to end',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'Everything converges at the submit button: the double-click lesson (exhaustMap), the cleanup lesson (who unsubscribes?), and the forms lesson (which accessor?). One handler, three campaigns.',
    },
    {
      speaker: 'Team Lead',
      text: 'Our standard now: clicks are a stream, exhaustMap guards the request, the form disables while in flight, and the button state derives from the form — not from a parallel boolean that can drift.',
    },
  ],
  contextArtefacts: [
    {
      id: 'submit-standard',
      type: 'code',
      title: 'The house submit, sketched',
      language: 'ts',
      content:
        'readonly submitting = signal(false);\n\nsubmit$ = this.submitClicks$.pipe(\n  exhaustMap(() => this.save())\n);\n// …the review question is everything around this core.',
    },
  ],
  challenges: [
    {
      id: 'tf-008-c1',
      type: 'multiple-choice',
      title: 'Disable, Derively',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'The Save button must disable while the form is invalid OR a save is in flight. Four wirings are proposed.',
      prompt: 'Which wiring cannot drift?',
      options: [
        {
          id: 'a',
          label:
            'Set this.canSave = form.valid && !this.saving manually inside every handler that touches either.',
          isCorrect: false,
          feedback:
            'A cached conjunction maintained by hand — the third handler someone adds will forget it, guaranteed.',
        },
        {
          id: 'b',
          label:
            '[disabled]="!statusSignal() || submitting()" where statusSignal = toSignal(form.statusChanges.pipe(map(s => s === \'VALID\')), { initialValue: form.valid })',
          isCorrect: true,
          feedback:
            'Both inputs live where they belong (form status stream, in-flight signal) and the button DERIVES — nothing to forget, nothing to drift.',
        },
        {
          id: 'c',
          label: '[disabled]="form.invalid" — in-flight protection is exhaustMap’s job alone.',
          isCorrect: false,
          feedback:
            'exhaustMap guards the REQUEST, but the button stays clickable and lies to the user mid-save — feedback matters too.',
        },
        {
          id: 'd',
          label: 'Disable the button in the click handler and re-enable it in the subscribe callback.',
          isCorrect: false,
          feedback:
            'Imperative toggling forgets the error path — one failed save and the button is disabled forever.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'State should be DERIVED from sources of truth, not cached beside them.' },
        {
          level: 2,
          title: 'Concept',
          content: 'statusChanges is the validity stream; toSignal + an in-flight signal compose in the template.',
        },
        { level: 3, title: 'Specific clue', content: 'Ask of each option: what happens on the save that FAILS?' },
        { level: 4, title: 'Guided solution', content: 'Choose the derived statusSignal + submitting() binding.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Button derived' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'A hand-toggled disabled flag stuck on after a failed save, locking users out of retry.',
        },
      ],
      helpLinks: [
        { topicId: 'forms.valuechanges', label: 'valueChanges & statusChanges' },
        { topicId: 'angular.signals', label: 'Angular signals' },
      ],
      successFeedback: 'Two sources of truth, one derived button — drift is structurally impossible.',
      failureFeedback: 'Hunt the option with no cached booleans and no forgotten error path.',
    },
    {
      id: 'tf-008-c2',
      type: 'code-review',
      title: 'Review: The Whole Submit',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'A feature branch proposes this submit flow. Review it with all three campaigns in hand.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'submit-flow',
          type: 'code',
          title: 'checkout.component.ts (proposed)',
          language: 'ts',
          content:
            "readonly submitting = signal(false);\n\nngOnInit() {\n  this.submitClicks$\n    .pipe(\n      switchMap(() => {\n        this.submitting.set(true);\n        return this.api.placeOrder(this.form.value);\n      }),\n      takeUntilDestroyed(this.destroyRef)\n    )\n    .subscribe({\n      next: () => this.submitting.set(false),\n      error: () => this.submitting.set(false),\n    });\n}",
        },
      ],
      findings: [
        {
          id: 'switchmap-submit',
          label: 'switchMap lets a second click CANCEL an in-flight order instead of ignoring the click',
          isCorrect: true,
          feedback:
            'The payment lesson: cancel-mid-charge is the worst policy for a submit. exhaustMap ignores the burst instead.',
        },
        {
          id: 'value-not-raw',
          label: 'placeOrder(this.form.value) drops disabled controls — the half-address bug returns',
          isCorrect: true,
          feedback:
            'Mission 5, resurfacing in review: submit wants the complete state — getRawValue().',
        },
        {
          id: 'takeuntil-fine',
          label: 'takeUntilDestroyed(this.destroyRef) is unnecessary ceremony inside ngOnInit',
          isCorrect: false,
          feedback:
            'Outside a constructor injection context, passing DestroyRef explicitly is exactly how it is done — this line is right.',
        },
        {
          id: 'error-reset',
          label: 'Resetting submitting in both next and error is redundant; error alone suffices',
          isCorrect: false,
          feedback:
            'Both paths must clear the flag — handling success AND failure is the part this code gets right.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Two campaigns each contributed one bug here. Name them.' },
        {
          level: 2,
          title: 'Concept',
          content: 'Submit = exhaustMap (ignore while busy) + getRawValue (complete state).',
        },
        { level: 3, title: 'Specific clue', content: 'The cleanup and the flag-clearing are the healthy parts.' },
        { level: 4, title: 'Guided solution', content: 'Flag the switchMap and the form.value payload.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Submit reviewed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The cancellable submit shipped and a double-click voided a real order mid-flight.',
        },
      ],
      helpLinks: [
        { topicId: 'rx.flattening', label: 'switchMap & friends' },
        { topicId: 'forms.value-vs-raw', label: 'value vs getRawValue' },
      ],
      successFeedback: 'Both cross-campaign bugs caught — this is the review the standard exists for.',
      failureFeedback: 'One bug is an operator policy, the other an accessor choice. Missions 5 (here) and 5 (RxJS).',
    },
  ],
  reflectionPrompt: 'Does your submit handler survive: a double click, a failed save, AND a disabled section?',
  rewards: [{ type: 'xp', amount: 15, label: 'Submits hardened' }],
};
