import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — value vs getRawValue (knowledge pack 07: "Confusing
 * form.value and getRawValue()" — value may exclude disabled controls).
 */
export const fnTf005ValueVsRaw: MissionDefinition = {
  id: 'tf-005-value-vs-raw',
  campaignId: 'ng-typed-forms',
  title: 'value vs getRawValue',
  summary:
    'The team’s shipping-address bug: a disabled control vanished from value, and the API received half an address.',
  difficulty: 'medium',
  learningObjectives: [
    'Predict which controls appear in value',
    'Use getRawValue when disabled values must be included',
    'Choose per call site, not by habit',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The bug that named this session: “same as billing” disabled the shipping fields — sensible UX. Submit then sent form.value, and the shipping address simply was not in it.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Both accessors are correct — for different questions. value answers “what did the user actively edit?”; getRawValue answers “what is the complete state of this form?”. Submit usually wants the second.',
    },
  ],
  contextArtefacts: [
    {
      id: 'shipping',
      type: 'code',
      title: 'The half-address incident',
      language: 'ts',
      content:
        "onSameAsBilling(checked: boolean) {\n  checked ? this.shipping.disable() : this.shipping.enable();\n}\n\nsubmit() {\n  this.api.placeOrder(this.checkoutForm.value); // shipping missing when disabled\n}",
    },
  ],
  challenges: [
    {
      id: 'tf-005-c1',
      type: 'multiple-choice',
      title: 'Where Did Shipping Go?',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'QA reports: orders with “same as billing” ticked have no shipping address at all.',
      prompt: 'What happened to the shipping fields?',
      options: [
        {
          id: 'a',
          label:
            'disable() removed the shipping group from form.value — value only reports enabled controls, exactly as its Partial type warned.',
          isCorrect: true,
          feedback:
            'Mission 4’s optionality, cashing out at runtime: disabled ⇒ excluded ⇒ missing keys in the payload.',
        },
        {
          id: 'b',
          label: 'disable() cleared the controls’ values to empty strings before submit.',
          isCorrect: false,
          feedback: 'Disabling PRESERVES values — the data survives; it is only excluded from this accessor.',
        },
        {
          id: 'c',
          label: 'The API stripped the fields server-side when a sameAsBilling flag was present.',
          isCorrect: false,
          feedback: 'The payload logged client-side already lacked the keys — the loss happened before the wire.',
        },
        {
          id: 'd',
          label: 'Angular serialises disabled controls as undefined and JSON.stringify dropped them.',
          isCorrect: false,
          feedback:
            'No undefined is produced — the keys are absent from the value object itself, one step earlier.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Recall mission 4: what does value do with disabled controls?' },
        {
          level: 2,
          title: 'Concept',
          content: 'form.value = enabled controls only. Disabling is exclusion, not erasure.',
        },
        { level: 3, title: 'Specific clue', content: 'The values still exist on the controls — check where they were lost.' },
        { level: 4, title: 'Guided solution', content: 'Choose the excluded-from-value explanation.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Loss located' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Orders shipped with no shipping address until support noticed the pattern.',
        },
      ],
      helpLinks: [{ topicId: 'forms.value-vs-raw', label: 'value vs getRawValue' }],
      successFeedback: 'Excluded, not erased — you found the exact step where the address vanished.',
      failureFeedback: 'The data never left the controls. Which accessor refused to report it?',
    },
    {
      id: 'tf-005-c2',
      type: 'multiple-choice',
      title: 'Fix the Submit',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'Keep the disable-on-checkbox UX. The API must receive the full address either way.',
      prompt: 'Which submit is correct?',
      options: [
        {
          id: 'a',
          label: 'Re-enable everything just before submit, read value, then re-disable in a finally block.',
          isCorrect: false,
          feedback:
            'An enable/disable dance around every submit — flicker, edge cases, and a workaround for an accessor that already exists.',
        },
        {
          id: 'b',
          label: 'Keep the fields enabled but visually greyed with CSS so value always includes them.',
          isCorrect: false,
          feedback:
            'Fake-disabled fields still accept focus, edits and validation — the UX lie creates worse bugs than the payload one.',
        },
        {
          id: 'c',
          label:
            'this.api.placeOrder(this.checkoutForm.getRawValue()); — the complete state, disabled controls included.',
          isCorrect: true,
          feedback:
            'The accessor built for exactly this question — and its return type has no optional properties, either.',
        },
        {
          id: 'd',
          label: 'Spread the billing values over form.value manually whenever the checkbox is ticked.',
          isCorrect: false,
          feedback:
            'A hand-maintained copy of framework behaviour — it drifts the first time the form gains a field.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The question at submit is “complete state?” — which accessor answers it?' },
        {
          level: 2,
          title: 'Concept',
          content: 'getRawValue() includes every control, disabled or not, and types without optionality.',
        },
        { level: 3, title: 'Specific clue', content: 'Two options fight the framework; one asks it the right question.' },
        { level: 4, title: 'Guided solution', content: 'Choose getRawValue() at the submit site.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Submit fixed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The enable/disable dance shipped and broke twice when the form grew.',
        },
      ],
      helpLinks: [{ topicId: 'forms.value-vs-raw', label: 'value vs getRawValue' }],
      successFeedback: 'Right accessor for the right question — and the Partial disappears from the type too.',
      failureFeedback: 'Do not fight disable(). One accessor already includes disabled controls.',
    },
  ],
  reflectionPrompt: 'Audit your submits: which ones send value where the API expects the complete form?',
  rewards: [{ type: 'xp', amount: 10, label: 'Accessors mastered' }],
};
