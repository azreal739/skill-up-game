import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — keyboard access: tab order, focus visibility, and the
 * traps that strand keyboard-only users.
 */
export const fnA11y002Keyboard: MissionDefinition = {
  id: 'a11y-002-keyboard',
  campaignId: 'ng-accessibility',
  title: 'Everything Without a Mouse',
  summary:
    'Every interaction must work by keyboard — reachable in a logical order, visibly focused, and never trapped in a component the user cannot leave.',
  difficulty: 'easy',
  learningObjectives: [
    'Verify a feature is fully operable by keyboard alone',
    'Keep focus visible and tab order logical',
    'Diagnose and fix focus traps',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session two, the challenge I set the room: unplug your mouse for the whole meeting and use the app. Within five minutes three people were stuck — one in a modal they could tab out of into the page behind it, one on a custom dropdown that swallowed the arrow keys, one who lost track of where focus even was.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Keyboard access has three health checks. REACHABLE: can you tab to every control, in an order that matches the visual flow? VISIBLE: can you always SEE which element has focus? UNTRAPPED: can you always get back OUT — a modal must trap focus WHILE open and release it on close. Fail any one and a keyboard-only user is stranded.',
    },
  ],
  contextArtefacts: [
    {
      id: 'focus-checks',
      type: 'code',
      title: 'The three checks',
      language: 'text',
      content:
        'REACHABLE  Tab visits every control; order follows the visual flow\n           (never fix order with tabindex="5" — fix the DOM order)\nVISIBLE    :focus-visible outline on everything; never `outline: none`\n           without a replacement — the invisible-focus sin\nUNTRAPPED  modal traps focus while open (CDK cdkTrapFocus), returns focus\n           to the trigger on close; user is never stuck behind an overlay',
    },
  ],
  challenges: [
    {
      id: 'a11y-002-c1',
      type: 'multiple-choice',
      title: 'The Invisible Focus',
      difficulty: 'easy',
      tags: ['a11y', 'scss'],
      storyContext:
        'A global stylesheet has * { outline: none; } — added years ago because "the focus rings looked ugly". The mouse-free tester could not tell which control was active anywhere in the app.',
      prompt: 'What is the right fix?',
      options: [
        {
          id: 'a',
          label: 'Keep outline: none but add a subtle box-shadow on :hover so users can see where they are.',
          isCorrect: false,
          feedback:
            ':hover requires a mouse — the exact device the keyboard user does not have. Focus and hover are different states for different inputs.',
        },
        {
          id: 'b',
          label:
            'Remove the blanket outline: none; restore visible focus with a styled :focus-visible indicator (a ring or outline that meets contrast) — :focus-visible shows the ring for keyboard focus while suppressing it for mouse clicks, so it looks clean AND keyboard users can always see their position.',
          isCorrect: true,
          feedback:
            ':focus-visible is the reconciliation the "ugly rings" complaint wanted: keyboard users get the indicator, mouse users do not see it on click. Never ship suppressed focus without a replacement.',
        },
        {
          id: 'c',
          label: 'Add a custom "you are here" cursor element that follows focus via JavaScript.',
          isCorrect: false,
          feedback:
            'A hand-rolled focus tracker re-implements the browser’s outline with new bugs (scroll, resize, dynamic content) — the platform already solved this.',
        },
        {
          id: 'd',
          label: 'Leave it — modern users know Tab moves focus and can infer position from context.',
          isCorrect: false,
          feedback:
            '“Infer position” is exactly what the tester COULDN’T do — invisible focus is disorientation, not a solvable puzzle. It is a WCAG failure.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The tester needs to SEE focus with no mouse. Which state applies?' },
        { level: 2, title: 'Concept', content: ':focus-visible shows the ring for keyboard, hides it for mouse clicks.' },
        { level: 3, title: 'Specific clue', content: 'Two options rely on hover or inference — both need a mouse or luck.' },
        { level: 4, title: 'Guided solution', content: 'Restore a styled :focus-visible indicator.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Focus revealed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'outline: none stayed — keyboard users navigated blind, and the form-completion rate for that cohort cratered.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.keyboard', label: 'Keyboard access' }],
      successFeedback: 'Clean for the mouse, visible for the keyboard — the “ugly rings” complaint finally answered right.',
      failureFeedback: 'The user has no mouse. Which options depend on hover, or on guessing?',
    },
    {
      id: 'a11y-002-c2',
      type: 'multiple-choice',
      title: 'The Modal That Wouldn’t Let Go',
      difficulty: 'medium',
      tags: ['a11y', 'angular'],
      storyContext:
        'The confirm dialog: opening it leaves focus on the page behind (users tab through the whole background before reaching the dialog); Tab inside it eventually escapes back to the page; and closing it drops focus to the top of the document.',
      prompt: 'What is the complete focus contract for a modal, and which parts are broken?',
      options: [
        {
          id: 'a',
          label:
            'All three focus behaviours are broken. Correct contract: on OPEN, move focus INTO the dialog (its first control or heading); WHILE open, TRAP focus so Tab cycles within it and the background is inert; on CLOSE, RETURN focus to the element that opened it. Angular CDK’s cdkTrapFocus + FocusMonitor (or the Dialog service) implement all three.',
          isCorrect: true,
          feedback:
            'Enter, contain, return — the modal contract. Each broken piece strands the keyboard user somewhere they did not ask to be; the CDK Dialog does the whole dance correctly.',
        },
        {
          id: 'b',
          label: 'Only the trap is broken — add cdkTrapFocus and the open/close focus will sort themselves out.',
          isCorrect: false,
          feedback:
            'Trapping fixes the middle but not the ends: without moving focus IN on open, the trap has nothing to contain yet; without returning focus on close, the user lands at the document top.',
        },
        {
          id: 'c',
          label: 'Set autofocus on the dialog’s confirm button — the browser handles the rest of the focus lifecycle.',
          isCorrect: false,
          feedback:
            'autofocus helps the OPEN step (and can be jarring if it lands on a destructive button) but does nothing for trapping or return-on-close.',
        },
        {
          id: 'd',
          label: 'Give the background aria-hidden="true" while the dialog is open so screen readers ignore it.',
          isCorrect: false,
          feedback:
            'aria-hidden hides the background from the READER but does not stop TAB from reaching it — and applied wrong it can hide the dialog too. Inert-ness plus a focus trap is the mechanism.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Trace focus at three moments: open, while open, close.' },
        { level: 2, title: 'Concept', content: 'Modal contract: move in, trap within, return to trigger.' },
        { level: 3, title: 'Specific clue', content: 'Each of the three described bugs maps to one of the three contract steps.' },
        { level: 4, title: 'Guided solution', content: 'Pick the all-three-broken answer with the CDK fix.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Modal contract kept' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The leaky modal shipped — keyboard users answered the dialog by accident while trying to reach the page behind it.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.keyboard', label: 'Keyboard access' }],
      successFeedback: 'In, contained, returned — the dialog holds focus exactly as long as it should.',
      failureFeedback: 'Three bugs, three moments in the modal’s life. Which contract step does each break?',
    },
  ],
  reflectionPrompt: 'Unplug your mouse and use our app for ten minutes. Where do you get stuck, lost, or stranded?',
  rewards: [{ type: 'xp', amount: 10, label: 'Keyboard whole' }],
};
