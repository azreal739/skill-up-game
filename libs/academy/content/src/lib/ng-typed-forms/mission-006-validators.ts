import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — validators (knowledge pack 01: validators on typed forms;
 * custom validators as pure functions returning ValidationErrors | null).
 */
export const fnTf006Validators: MissionDefinition = {
  id: 'tf-006-validators',
  campaignId: 'ng-typed-forms',
  title: 'Validators as Pure Functions',
  summary:
    'A validator is a pure function: control in, ValidationErrors | null out — the calculator lesson wearing Angular clothes.',
  difficulty: 'medium',
  learningObjectives: [
    'Write a custom validator with the correct signature',
    'Return null for valid — not an empty errors object',
    'Read errors from the control that owns them',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'Validators clicked for the room when we said it in campaign-2 words: a validator is a pure function from control state to ValidationErrors | null. No side effects, no HTTP, no toasts — just a verdict.',
    },
    {
      speaker: 'Team Lead',
      text: 'And the convention that saves debugging hours: null means valid. An empty object {} is TRUTHY — return it and the control is invalid with no visible reason.',
    },
  ],
  contextArtefacts: [
    {
      id: 'validator-shape',
      type: 'code',
      title: 'The shape on the whiteboard',
      language: 'ts',
      content:
        "const callsign: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {\n  const value = String(control.value ?? '');\n  return /^[A-Z]{2}-\\d{3}$/.test(value)\n    ? null\n    : { callsign: { requiredFormat: 'AA-000' } };\n};",
    },
  ],
  challenges: [
    {
      id: 'tf-006-c1',
      type: 'multiple-choice',
      title: 'The Truthy Trap',
      difficulty: 'medium',
      tags: ['angular', 'typescript'],
      storyContext:
        'A teammate’s validator returns {} for valid input “to keep the return type consistent”. The field shows as invalid with no message.',
      prompt: 'Why does {} break the form?',
      options: [
        {
          id: 'a',
          label: 'An empty object fails ValidationErrors’ schema and throws at runtime.',
          isCorrect: false,
          feedback: 'Nothing throws — ValidationErrors is just an object type; the damage is quieter.',
        },
        {
          id: 'b',
          label:
            'Angular treats ANY non-null return as “errors present” — {} is truthy, so the control is invalid, with no keys to display a message from.',
          isCorrect: true,
          feedback:
            'The convention IS the contract: null = valid, object = invalid. An empty object is invisible invalidity.',
        },
        {
          id: 'c',
          label: '{} overwrites the errors of every other validator on the control.',
          isCorrect: false,
          feedback:
            'Validator results MERGE — the problem is the verdict {} carries, not what it overwrites.',
        },
        {
          id: 'd',
          label: 'Returning {} forces the validator to run on every keystroke, degrading performance.',
          isCorrect: false,
          feedback: 'Run frequency is unchanged — only the verdict is wrong.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'How does Angular decide valid vs invalid from the return value?' },
        {
          level: 2,
          title: 'Concept',
          content: 'The contract is nullability: null means valid; any object — even empty — means invalid.',
        },
        { level: 3, title: 'Specific clue', content: 'Boolean({}) is true. That is the whole bug.' },
        { level: 4, title: 'Guided solution', content: 'Choose the truthy-object-means-invalid option.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Contract learned' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'A permanently-invalid field blocked sign-ups with no error message to explain itself.',
        },
      ],
      helpLinks: [{ topicId: 'forms.validators', label: 'Validators' }],
      successFeedback: 'null means valid — the convention is the contract, and now you hold it.',
      failureFeedback: 'Ask what Angular does with a non-null return. Then ask what {} is.',
    },
    {
      id: 'tf-006-c2',
      type: 'code-review',
      title: 'Review: The Password Validator',
      difficulty: 'medium',
      tags: ['angular', 'typescript'],
      storyContext: 'A registration-form validator is up for review. Hold it to the whiteboard shape.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'password-validator',
          type: 'code',
          title: 'password-strength.validator.ts',
          language: 'ts',
          content:
            "export const passwordStrength: ValidatorFn = (control) => {\n  const value = String(control.value ?? '');\n  if (value.length < 12) {\n    control.parent?.get('hint')?.setValue('Try a longer password');\n    return { passwordStrength: { minLength: 12 } };\n  }\n  analytics.track('password-valid');\n  return null;\n};",
        },
      ],
      findings: [
        {
          id: 'side-effect-setvalue',
          label: 'The validator writes into a sibling control — a side effect inside a verdict function',
          isCorrect: true,
          feedback:
            'Validators run on every value change; this one now mutates the form mid-validation, retriggering validation. Verdicts must not edit the world.',
        },
        {
          id: 'analytics-call',
          label: 'analytics.track fires on every keystroke once the password is long enough — another side effect',
          isCorrect: true,
          feedback:
            'A pure verdict became a telemetry cannon. Side effects belong to submit handlers or valueChanges taps, never validators.',
        },
        {
          id: 'nullish-string',
          label: "String(control.value ?? '') is an unsafe way to read the control",
          isCorrect: false,
          feedback:
            'Normalising the possibly-null value before testing is exactly right — the whiteboard shape does the same.',
        },
        {
          id: 'error-shape',
          label: 'The error object should be a bare boolean: { passwordStrength: true }',
          isCorrect: false,
          feedback:
            'Carrying details ({ minLength: 12 }) is encouraged — templates can render the requirement from it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'A validator is control → verdict. Find everything that is not a verdict.' },
        {
          level: 2,
          title: 'Concept',
          content: 'Pure functions: no writes to other controls, no I/O, no telemetry — campaign 2, mission 1.',
        },
        { level: 3, title: 'Specific clue', content: 'Both real issues are side effects; the reads and the error shape are fine.' },
        { level: 4, title: 'Guided solution', content: 'Flag the sibling setValue and the analytics call.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Verdict purified' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The side-effecting validator caused a validation loop that took a day to trace.',
        },
      ],
      helpLinks: [
        { topicId: 'forms.validators', label: 'Validators' },
        { topicId: 'fp.pure-functions', label: 'Pure functions' },
      ],
      successFeedback: 'Verdicts, purified — validation loops can no longer start here.',
      failureFeedback: 'The shape is fine; the purity is not. Hunt the two side effects.',
    },
  ],
  reflectionPrompt: 'Write your gnarliest validation rule as control → ValidationErrors | null. What resists?',
  rewards: [{ type: 'xp', amount: 10, label: 'Verdicts pure' }],
};
