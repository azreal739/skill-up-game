import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — ARIA done right: name/role/state, the first rule of ARIA,
 * and the ways bad ARIA is worse than none.
 */
export const fnA11y003Aria: MissionDefinition = {
  id: 'a11y-003-aria',
  campaignId: 'ng-accessibility',
  title: 'ARIA Describes, It Doesn’t Implement',
  summary:
    'ARIA supplies name, role and state to the accessibility tree — powerful where native semantics fall short, and actively harmful when it lies.',
  difficulty: 'medium',
  learningObjectives: [
    'Apply the first rule of ARIA: prefer native semantics',
    'Use aria-label, role and state attributes correctly',
    'Recognise ARIA that lies as worse than no ARIA',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session three, the cautionary tale: a well-meaning teammate had sprinkled ARIA everywhere to "boost accessibility" — role="button" on links, aria-label duplicating visible text, aria-expanded that never updated. The audit score went DOWN. Confident wrong labels are worse than silence.',
    },
    {
      speaker: 'Senior Dev',
      text: 'ARIA writes three things into the accessibility tree: NAME (what the reader calls it), ROLE (what kind of thing it is), STATE (expanded, checked, disabled, busy). Rule one: don’t use ARIA if a native element gives it for free. Rule two: if you do, keep it TRUE — an aria-expanded="false" on an open menu tells the user the opposite of reality, and they trust it.',
    },
  ],
  contextArtefacts: [
    {
      id: 'aria-truth',
      type: 'code',
      title: 'ARIA that stays true',
      language: 'html',
      content:
        '<!-- custom disclosure: no native element fits, so ARIA earns its place -->\n<button\n  [attr.aria-expanded]="open()"        <!-- STATE, bound to the truth -->\n  aria-controls="panel-1"\n>\n  Filters\n</button>\n<div id="panel-1" [hidden]="!open()">…</div>\n\n<!-- an icon-only button needs a NAME the visible label can\'t give -->\n<button aria-label="Close dialog">✕</button>',
    },
  ],
  challenges: [
    {
      id: 'a11y-003-c1',
      type: 'multiple-choice',
      title: 'The ARIA That Lowered the Score',
      difficulty: 'medium',
      tags: ['a11y'],
      storyContext:
        'Three of the audit’s new failures: role="button" on an <a href> that navigates; aria-label="Submit" on a <button>Submit</button>; aria-expanded="false" hardcoded on a menu toggle.',
      prompt: 'Why is each one harmful, not just useless?',
      options: [
        {
          id: 'a',
          label:
            'Each lies to the reader. role="button" on a link makes the reader announce "button" then the link navigates (Enter behaves unexpectedly, no button activation). aria-label="Submit" OVERRIDES the visible text — fine here, but the moment the button text changes to "Send" the reader still says "Submit". aria-expanded="false" that never updates tells users the menu is collapsed while it is open. Fixes: drop role from the link, drop the redundant label, BIND aria-expanded to the real state.',
          isCorrect: true,
          feedback:
            'Bad ARIA is not neutral — users can’t see the screen, so they trust the reader completely. A confident wrong label sends them to the wrong place with certainty.',
        },
        {
          id: 'b',
          label: 'They are merely redundant — harmless duplication that a linter can clean up when convenient.',
          isCorrect: false,
          feedback:
            'The static aria-expanded is not redundant, it is FALSE — and the role changes announced behaviour. Redundant would be safe; these mislead.',
        },
        {
          id: 'c',
          label: 'The problem is quantity — too much ARIA overwhelms the reader; thinning it out fixes the score.',
          isCorrect: false,
          feedback:
            'Volume is not the issue; TRUTH is. One correct aria-expanded beats ten, and one lying one harms more than a hundred honest ones.',
        },
        {
          id: 'd',
          label: 'These need aria-live regions added so the reader re-announces them when they change.',
          isCorrect: false,
          feedback:
            'Live regions are for content that updates asynchronously — they do not fix a wrong role, a redundant label, or a state attribute that is simply never bound to reality.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each, ask: does it tell the reader something FALSE or misleading?' },
        { level: 2, title: 'Concept', content: 'Users trust the reader completely — wrong ARIA is confident misdirection.' },
        { level: 3, title: 'Specific clue', content: 'Which attribute claims the menu is closed while it is open?' },
        { level: 4, title: 'Guided solution', content: 'Pick the each-one-lies answer with its three fixes.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Lies removed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The static aria-expanded shipped — screen-reader users were told the menu was closed and never opened it.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.aria', label: 'ARIA name/role/state' }],
      successFeedback: 'ARIA kept true and minimal — the tree finally matches the screen.',
      failureFeedback: 'A blind user obeys the reader. Which of these three would send them somewhere wrong?',
    },
    {
      id: 'a11y-003-c2',
      type: 'multiple-choice',
      title: 'When ARIA Earns Its Place',
      difficulty: 'medium',
      tags: ['a11y', 'angular'],
      storyContext:
        'A genuinely custom widget: a multi-select "chips" combobox with no native equivalent. The team, chastened, now wants to add ZERO ARIA "to be safe".',
      prompt: 'What is the right amount of ARIA here?',
      options: [
        {
          id: 'a',
          label: 'Zero — the lesson was that ARIA causes problems, so avoid it and let the browser do its best.',
          isCorrect: false,
          feedback:
            'Over-correction: with no native combobox element, "the browser’s best" is a pile of divs announcing nothing. Silence here is as broken as lies were before.',
        },
        {
          id: 'b',
          label:
            'The full, TRUE ARIA pattern: role="combobox" with aria-expanded bound to the popup state, aria-controls pointing at the listbox, the listbox as role="listbox" with role="option" children, aria-selected bound per chip, and aria-activedescendant tracking the focused option. Follow the WAI-ARIA authoring pattern for combobox exactly — and keep every attribute bound to real state.',
          isCorrect: true,
          feedback:
            'This is precisely where ARIA is essential: no native element models it, so ARIA IS the accessibility. The rule was never "avoid ARIA" — it was "prefer native, and when you must use ARIA, keep it true and complete".',
        },
        {
          id: 'c',
          label: 'Just aria-label on the whole widget describing what it does — one honest label beats a complex pattern.',
          isCorrect: false,
          feedback:
            'A label names the widget but leaves the reader unable to operate it — no expanded state, no options, no selection feedback. A combobox needs the combobox pattern, not a caption.',
        },
        {
          id: 'd',
          label: 'Rebuild it on a native <select multiple> and accept the styling limitations — never hand-roll ARIA widgets.',
          isCorrect: false,
          feedback:
            'Genuinely a good instinct WHERE it fits — but multi-select native selects are notoriously unusable and cannot do chips/search. Some widgets legitimately require the ARIA pattern; this is one.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is there a native element that IS a chips-combobox? If not, what supplies the semantics?' },
        { level: 2, title: 'Concept', content: 'No native equivalent = ARIA is mandatory, complete, and bound to state.' },
        { level: 3, title: 'Specific clue', content: 'The authoring patterns exist for exactly these custom widgets.' },
        { level: 4, title: 'Guided solution', content: 'Pick the full true combobox pattern.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Pattern applied' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The zero-ARIA combobox shipped — screen-reader users met an unlabelled div soup and filed it as “search is broken”.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.aria', label: 'ARIA name/role/state' }],
      successFeedback: 'Native first, ARIA where it must, always true — the rule stated in full.',
      failureFeedback: 'The lesson was about TRUTH and preference, not avoidance. What models a chips-combobox natively?',
    },
  ],
  reflectionPrompt: 'Grep our templates for aria-expanded and aria-selected: how many are bound to state, and how many are hardcoded strings?',
  rewards: [{ type: 'xp', amount: 10, label: 'ARIA honest' }],
};
