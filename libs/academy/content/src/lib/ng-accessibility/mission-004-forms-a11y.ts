import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — accessible forms: labels, error association, and required
 * state that reaches assistive tech.
 */
export const fnA11y004FormsA11y: MissionDefinition = {
  id: 'a11y-004-forms-a11y',
  campaignId: 'ng-accessibility',
  title: 'Forms That Speak Their Errors',
  summary:
    'An accessible field has a programmatic label, announces its required and invalid states, and ties each error to the input that caused it.',
  difficulty: 'medium',
  learningObjectives: [
    'Associate labels with inputs programmatically, not visually',
    'Wire validation errors to inputs with aria-describedby',
    'Expose required and invalid state to assistive tech',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session four connected to the forms campaign — from the other side of the screen. Our signup form: placeholder text instead of labels (gone the moment you type), a red border for errors (invisible to a reader), and an asterisk for required (announced as "star"). A screen-reader user could not tell what any field was, that it was required, or why it rejected them.',
    },
    {
      speaker: 'Senior Dev',
      text: 'A field the reader can use needs three links. A LABEL, programmatically tied (<label for> or aria-labelledby) — placeholders are not labels. REQUIRED and INVALID state via the required attribute and aria-invalid, so the reader announces them. And the ERROR text tied to the input with aria-describedby, so "email is already taken" is read WITH the field, not orphaned somewhere in the DOM.',
    },
  ],
  contextArtefacts: [
    {
      id: 'field-links',
      type: 'code',
      title: 'A field wired for the reader',
      language: 'html',
      content:
        '<label for="email">Email</label>\n<input\n  id="email"\n  type="email"\n  required\n  [attr.aria-invalid]="emailInvalid()"\n  [attr.aria-describedby]="emailInvalid() ? \'email-error\' : null"\n/>\n@if (emailInvalid()) {\n  <p id="email-error" role="alert">That email is already registered.</p>\n}',
    },
  ],
  challenges: [
    {
      id: 'a11y-004-c1',
      type: 'multiple-choice',
      title: 'The Placeholder Is Not a Label',
      difficulty: 'medium',
      tags: ['a11y', 'angular'],
      storyContext:
        'The signup fields use <input placeholder="Email">. A teammate argues placeholders are cleaner and "the reader can read the placeholder anyway".',
      prompt: 'Why is a placeholder not an acceptable label?',
      options: [
        {
          id: 'a',
          label:
            'A placeholder is a hint, not a name: support for reading it varies across readers, it VANISHES as soon as the user types (so anyone who forgets the field mid-entry has nothing), it fails contrast requirements by design (it looks grey/secondary), and it does not create the label→input programmatic association. Use a real <label for>; keep the placeholder only as an example ("name@work.com") if useful.',
          isCorrect: true,
          feedback:
            'Placeholders solve a visual-density preference by removing the field’s permanent, reliable name — the one thing every user, sighted or not, needs to stay oriented.',
        },
        {
          id: 'b',
          label: 'It is fine — add aria-label matching the placeholder and the accessibility gap closes.',
          isCorrect: false,
          feedback:
            'aria-label restores the programmatic NAME but leaves the visual problems (vanishing on type, low contrast) for sighted and low-vision users. A visible <label> serves everyone at once.',
        },
        {
          id: 'c',
          label: 'Only low-vision users are affected — for fully blind users the reader announces the placeholder, so it is sufficient for them.',
          isCorrect: false,
          feedback:
            'Reader support for placeholders is inconsistent, and even when read, it disappears from the accessibility tree once the field has a value — mid-form review leaves the field nameless.',
        },
        {
          id: 'd',
          label: 'Move the placeholder into a tooltip on focus so it persists — tooltips are accessible and keep the clean look.',
          isCorrect: false,
          feedback:
            'Focus tooltips are their own accessibility minefield (timing, dismissal, hover-vs-focus) and still are not a programmatic label — you have traded one gap for two.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What happens to the placeholder the instant the user types a character?' },
        { level: 2, title: 'Concept', content: 'A label is permanent, contrast-compliant, and programmatically tied.' },
        { level: 3, title: 'Specific clue', content: 'A user reviewing a filled form — what names each field?' },
        { level: 4, title: 'Guided solution', content: 'Real <label for>; placeholder as optional example only.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Labels restored' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The placeholder-only form shipped — users who tabbed back to check a field found unlabeled boxes and abandoned signup.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.forms', label: 'Accessible forms' }],
      successFeedback: 'A permanent, tied, readable name on every field — everyone stays oriented.',
      failureFeedback: 'Fill the field, then tab away and back. What does a screen reader (or a distracted human) now see?',
    },
    {
      id: 'a11y-004-c2',
      type: 'multiple-choice',
      title: 'The Orphaned Error',
      difficulty: 'medium',
      tags: ['a11y', 'angular'],
      storyContext:
        'Validation shows errors by turning the input border red and rendering <p class="error">Password too weak</p> below it. A reader user submits, hears nothing change, and cannot find why the form rejected them.',
      prompt: 'What makes the error accessible?',
      options: [
        {
          id: 'a',
          label:
            'Three things together: set aria-invalid on the input so the reader announces the field as invalid; tie the error text to the input with aria-describedby (pointing at the error’s id) so it is read WITH the field on focus; and make the error container announce on appearance (role="alert" or an aria-live region) so submitting an invalid form speaks the problem immediately, not silently.',
          isCorrect: true,
          feedback:
            'Invalid state + described-by association + live announcement — the field says it is wrong, says why, and says it at the moment it matters. Red borders convey none of this.',
        },
        {
          id: 'b',
          label: 'Add role="alert" to the error paragraph — that announces it, which is the whole gap.',
          isCorrect: false,
          feedback:
            'role="alert" announces the error ONCE on appearance — but a user who tabs back to the field later hears no connection between input and error without aria-describedby, and the field never reports aria-invalid.',
        },
        {
          id: 'c',
          label: 'Change the border to also add an ⚠️ icon and the word "Error" — visible reinforcement covers everyone.',
          isCorrect: false,
          feedback:
            'More VISIBLE cues help sighted and colour-blind users (good!) but still deliver nothing to the accessibility tree — the reader user is exactly as lost.',
        },
        {
          id: 'd',
          label: 'Move focus to the first invalid field on submit — landing on it is enough for the user to understand.',
          isCorrect: false,
          feedback:
            'Focusing the field is a GREAT addition, but without aria-invalid and aria-describedby the reader announces the field’s label with no hint that it is wrong or why.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The reader must learn THREE things: which field, that it is invalid, and why.' },
        { level: 2, title: 'Concept', content: 'aria-invalid + aria-describedby + live announcement.' },
        { level: 3, title: 'Specific clue', content: 'What TIES the error paragraph to the input in the accessibility tree?' },
        { level: 4, title: 'Guided solution', content: 'Pick the three-things-together answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Errors voiced' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The red-border errors shipped — reader users re-submitted the same invalid form repeatedly, never told what was wrong.',
        },
      ],
      helpLinks: [
        { topicId: 'a11y.forms', label: 'Accessible forms' },
        { topicId: 'forms.validators', label: 'Validators' },
      ],
      successFeedback: 'Which field, that it’s wrong, and why — the error finally reaches the person who needs it.',
      failureFeedback: 'A reader user submits and hears silence. What three facts is the form failing to convey?',
    },
  ],
  reflectionPrompt: 'Tab through our main form with a screen reader on: does each field announce its name, its required state, and its error?',
  rewards: [{ type: 'xp', amount: 10, label: 'Forms speak' }],
};
