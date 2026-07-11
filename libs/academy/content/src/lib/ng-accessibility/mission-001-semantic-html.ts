import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — semantic HTML: the free accessibility of the right
 * element, and the div-with-handlers that throws it away.
 */
export const fnA11y001SemanticHtml: MissionDefinition = {
  id: 'a11y-001-semantic-html',
  campaignId: 'ng-accessibility',
  title: 'The Right Element Is Free',
  summary:
    'Native elements ship accessibility built in — keyboard, focus, roles, states — so a <div (click)> re-implements what a <button> already did for free.',
  difficulty: 'intro',
  learningObjectives: [
    'List what a native button provides that a div does not',
    'Recognise the div-with-click-handler anti-pattern',
    'Reach for the semantic element before the ARIA patch',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'New block: accessibility. It opened with a live screen-reader demo of our own app. The "Save" control — a styled div with a click handler — was completely invisible to the reader. A keyboard user could not reach it. We had shipped a button nobody could press.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The first rule is almost free: use the right element. A native <button> is focusable, Enter/Space activate it, it announces "button" with its label, it exposes disabled and pressed states — all of that, unwritten. A div is a rectangle. Every div (click) is a promise to re-implement the button, and it never gets fully kept.',
    },
  ],
  contextArtefacts: [
    {
      id: 'div-vs-button',
      type: 'code',
      title: 'What the div owes',
      language: 'html',
      content:
        '<!-- the invisible save control -->\n<div class="btn" (click)="save()">Save</div>\n<!-- owes: tabindex, keydown Enter/Space, role="button", :focus-visible,\n     disabled semantics, aria-pressed if toggling… -->\n\n<!-- the whole debt, prepaid -->\n<button type="button" (click)="save()">Save</button>',
    },
  ],
  challenges: [
    {
      id: 'a11y-001-c1',
      type: 'multiple-choice',
      title: 'The Button Nobody Could Press',
      difficulty: 'intro',
      tags: ['a11y'],
      storyContext: 'The screen-reader demo: <div class="btn" (click)="save()">Save</div>. Silent to the reader, unreachable by keyboard.',
      prompt: 'What is the correct fix, and why not just patch the div?',
      options: [
        {
          id: 'a',
          label: 'Add (keydown.enter)="save()" and tabindex="0" — that restores keyboard access, which was the real gap.',
          isCorrect: false,
          feedback:
            'That patches two of six holes: still no role announcement, no Space key, no disabled semantics, no focus-visible. Each patch is a line you must remember, forever, everywhere.',
        },
        {
          id: 'b',
          label: 'Add role="button" and aria-label="Save" so the screen reader announces it properly.',
          isCorrect: false,
          feedback:
            'role tells the reader it is a button but does not MAKE it one — still no keyboard, no activation, no states. ARIA describes; it does not implement.',
        },
        {
          id: 'c',
          label:
            'Use a native <button>: it is focusable, Enter and Space activate it, it announces as a button with its text label, and it exposes disabled/pressed states — the entire debt the div owed, prepaid and maintained by the platform.',
          isCorrect: true,
          feedback:
            'The first rule of ARIA is "don’t use ARIA" — reach for the element that already IS the thing. A styled button gets you the look without abandoning the behaviour.',
        },
        {
          id: 'd',
          label: 'Keep the div but wrap it in an Angular CDK a11y directive that adds the missing behaviours.',
          isCorrect: false,
          feedback:
            'A directive re-implementing button semantics onto a div is the long way to <button> — and CDK’s own guidance is to use the native element first.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Count everything a real button does that this div does not.' },
        { level: 2, title: 'Concept', content: 'Native elements ship behaviour; ARIA only ships description.' },
        { level: 3, title: 'Specific clue', content: 'Two options describe the button without becoming one.' },
        { level: 4, title: 'Guided solution', content: 'Pick the native <button>.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Element restored' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'The patched div shipped — keyboard users could tab to it but Space did nothing, a bug reported as “Save is broken”.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.semantics', label: 'Semantic HTML' }],
      successFeedback: 'The right element, free forever — the button works for everyone again.',
      failureFeedback: 'List the button’s six free behaviours. How many does each patch actually restore?',
    },
    {
      id: 'a11y-001-c2',
      type: 'multiple-choice',
      title: 'Structure Is Semantics Too',
      difficulty: 'easy',
      tags: ['a11y'],
      storyContext:
        'A screen-reader user tries to navigate our article page by headings — and jumps nowhere. The page styles text with <div class="h1-style">, <div class="h2-style">, and lists with styled <div>s.',
      prompt: 'Why does heading navigation fail, and what is the fix?',
      options: [
        {
          id: 'a',
          label:
            'Screen readers build navigation from STRUCTURE — headings (h1–h6), lists, landmarks (nav/main/aside) — which lets users jump between sections and skim as sighted users do. Styled divs have the look but none of the structure, so the whole navigational skeleton is invisible. Use real h1–h6, ul/li and landmark elements; style those.',
          isCorrect: true,
          feedback:
            'Semantics is not just interactive controls — it is the document outline. A page of divs is a wall of text to a reader, however clear it looks on screen.',
        },
        {
          id: 'b',
          label: 'Add aria-label to each styled div describing its level, e.g. aria-label="Heading level 2".',
          isCorrect: false,
          feedback:
            'A label is not a heading role — the reader still cannot BUILD the heading list to jump through. role="heading" aria-level="2" would fake one div; real h2 gives it for free.',
        },
        {
          id: 'c',
          label: 'The reader is misconfigured — heading navigation is a power-user feature, not something pages must support.',
          isCorrect: false,
          feedback:
            'Heading navigation is how most screen-reader users skim EVERY page — it is a baseline expectation, and the page simply provides nothing to navigate.',
        },
        {
          id: 'd',
          label: 'Add a visible table of contents with anchor links — sighted structure serves everyone equally.',
          isCorrect: false,
          feedback:
            'A ToC is a nice addition but does not restore heading-jump, list semantics, or landmark navigation — and building it from div anchors repeats the original sin.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'How does a screen-reader user SKIM a long page?' },
        { level: 2, title: 'Concept', content: 'Headings, lists and landmarks are the navigable document outline.' },
        { level: 3, title: 'Specific clue', content: 'What can the reader build from an h2 that it cannot build from div.h2-style?' },
        { level: 4, title: 'Guided solution', content: 'Real h1–h6, lists and landmarks.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Outline restored' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'The div-styled article shipped — screen-reader users read every paragraph to find one section, then left.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.semantics', label: 'Semantic HTML' }],
      successFeedback: 'A real outline — readers skim the page the way its authors intended.',
      failureFeedback: 'The user navigated by HEADINGS. What must exist in the DOM for that to work?',
    },
  ],
  reflectionPrompt: 'Grep our templates for (click) on non-button elements: each one is a button’s worth of behaviour we owe.',
  rewards: [{ type: 'xp', amount: 5, label: 'Semantics first' }],
};
