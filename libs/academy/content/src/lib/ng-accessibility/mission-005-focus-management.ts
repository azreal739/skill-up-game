import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — focus management in a SPA: routing focus, dynamic content,
 * and not stealing focus from users.
 */
export const fnA11y005FocusManagement: MissionDefinition = {
  id: 'a11y-005-focus-management',
  campaignId: 'ng-accessibility',
  title: 'Where Did Focus Go?',
  summary:
    'Single-page apps break the browser’s built-in focus handling — route changes, dialogs and injected content must move focus deliberately, and never steal it.',
  difficulty: 'hard',
  learningObjectives: [
    'Restore focus behaviour that SPA navigation removes',
    'Move focus to new content without stealing it mid-interaction',
    'Manage focus around removed elements',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session five, the subtle one. In a multi-page app, clicking a link loads a new document and the browser resets focus to the top. Our SPA swaps the outlet and leaves focus wherever it was — often on a nav link that no longer relates to anything. A reader user "navigates" and is told nothing changed.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The SPA inherited the browser’s job and dropped it. Route change: move focus to the new view’s heading (or a skip target) and announce it. Async content arriving: if the USER asked for it (clicked "load more"), you may move focus to it; if it arrived on its own (a poll), you must NOT — stealing focus mid-task is worse than staying put. The rule: focus follows the user’s intent, never surprises it.',
    },
  ],
  contextArtefacts: [
    {
      id: 'route-focus',
      type: 'code',
      title: 'Restoring focus on navigation',
      language: 'ts',
      content:
        "// on each successful navigation, move focus to the new view's h1\nrouter.events.pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed())\n  .subscribe(() => {\n    const heading = document.querySelector<HTMLElement>('main h1');\n    heading?.setAttribute('tabindex', '-1'); // focusable, not tab-stop\n    heading?.focus();                         // reader announces the new page\n  });\n// plus a visible \"Skip to main content\" link as the first focusable element",
    },
  ],
  challenges: [
    {
      id: 'a11y-005-c1',
      type: 'multiple-choice',
      title: 'The Navigation That Announced Nothing',
      difficulty: 'hard',
      tags: ['a11y', 'angular'],
      storyContext:
        'A reader user activates "Reports" in the nav. The URL changes, the view swaps, focus stays on the (now unrelated) nav link. The reader says nothing — the user believes the click failed and tries again.',
      prompt: 'What is the correct focus behaviour on SPA navigation?',
      options: [
        {
          id: 'a',
          label:
            'On each NavigationEnd, move focus into the new view — typically its main heading, made focusable with tabindex="-1" (focusable programmatically, not a tab stop) — so the reader announces the new page and subsequent Tab starts from the content. Pair it with a "Skip to main content" link as the first focusable element for users who want to bypass the nav entirely.',
          isCorrect: true,
          feedback:
            'The SPA must re-do what the browser did on full navigation: put focus at the top of the new content and let the reader announce arrival. tabindex="-1" makes the heading focusable without adding it to the tab sequence.',
        },
        {
          id: 'b',
          label: 'Add an aria-live region that announces the route name on every navigation, leaving focus where it is.',
          isCorrect: false,
          feedback:
            'A live announcement helps, but leaving focus on a stale nav link means the next Tab continues from the old location — the user’s focus and the page’s content have diverged.',
        },
        {
          id: 'c',
          label: 'Call document.body.focus() after each navigation to reset to a neutral position.',
          isCorrect: false,
          feedback:
            'Focusing the body drops the user ABOVE all content with nothing announced — better than a stale link, but they must tab through the whole nav again to reach the page. Aim at the content.',
        },
        {
          id: 'd',
          label: 'Scroll to top on navigation — restoring scroll position is what users actually notice is missing.',
          isCorrect: false,
          feedback:
            'Scroll restoration is a real (separate) concern for sighted users, but it does nothing for focus or announcement — the reader user is still stranded on the old link.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What did the browser do to focus on a full-page navigation?' },
        { level: 2, title: 'Concept', content: 'Move focus to the new view’s heading; announce arrival.' },
        { level: 3, title: 'Specific clue', content: 'Why tabindex="-1" on the heading rather than "0"?' },
        { level: 4, title: 'Guided solution', content: 'Focus the new main heading + skip link.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Arrival announced' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Navigation stayed silent for reader users — every route change felt like a broken link, and they stopped exploring.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.focus-management', label: 'Focus management' }],
      successFeedback: 'Focus lands on the new page, the reader announces it — SPA navigation feels like navigation again.',
      failureFeedback: 'After the route swaps, where is focus, and what does the reader say? Both must change.',
    },
    {
      id: 'a11y-005-c2',
      type: 'multiple-choice',
      title: 'Don’t Steal My Focus',
      difficulty: 'hard',
      tags: ['a11y', 'angular'],
      storyContext:
        'Two features move focus. (A) A "Load 20 more" button that appends results — a teammate proposes focusing the first new result. (B) A live activity feed that polls every 15s and prepends items — the same teammate proposes focusing each new item "for consistency".',
      prompt: 'Which focus moves are right?',
      options: [
        {
          id: 'a',
          label:
            '(A) is appropriate: the user ASKED for more, so moving focus to the first new result (or a "20 results added" live message, then focus stays reachable) matches their intent. (B) is wrong: the poll arrived WITHOUT the user asking, so stealing focus interrupts whatever they were reading or typing — announce new items with a POLITE aria-live region (aria-live="polite") that never moves focus. Focus follows user intent; unrequested changes only whisper.',
          isCorrect: true,
          feedback:
            'The distinction is who initiated it. User-triggered → focus may follow. System-triggered → announce politely, never grab. A feed that yanks focus every 15s makes the app unusable for anyone typing.',
        },
        {
          id: 'b',
          label: 'Both should move focus — consistency means new content always receives focus so users never miss it.',
          isCorrect: false,
          feedback:
            'Consistency at the cost of control: the polling feed would rip focus from a user mid-sentence every 15 seconds. Unrequested focus theft is a top accessibility complaint.',
        },
        {
          id: 'c',
          label: 'Neither should move focus — announce both with aria-live and leave focus alone in all cases.',
          isCorrect: false,
          feedback:
            'Too timid for (A): when the user explicitly requested more content, moving focus (or offering a clear path to it) is helpful and expected. The line is intent, not a blanket rule.',
        },
        {
          id: 'd',
          label: 'Use aria-live="assertive" for both so the reader interrupts to announce new content immediately.',
          isCorrect: false,
          feedback:
            'assertive interrupts the user’s current reading — appropriate only for urgent alerts (errors, timeouts). A results append and a routine feed are both "polite" at most; assertive here is its own kind of rudeness.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each, ask: did the USER trigger this content, or did the system?' },
        { level: 2, title: 'Concept', content: 'User-initiated may move focus; system-initiated announces politely, never grabs.' },
        { level: 3, title: 'Specific clue', content: 'Imagine typing a comment while the feed polls every 15s and steals focus.' },
        { level: 4, title: 'Guided solution', content: '(A) focus/announce, (B) polite live region only.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Intent respected' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The feed focus-steal shipped — users trying to type in the composer were interrupted every 15 seconds and gave up.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.focus-management', label: 'Focus management' }],
      successFeedback: 'Focus follows intent, the system only whispers — new content without the ambush.',
      failureFeedback: 'One content change was requested, one was not. Which one earns the right to move focus?',
    },
  ],
  reflectionPrompt: 'Where does our app move focus programmatically — and is each move something the user asked for, or a surprise?',
  rewards: [{ type: 'xp', amount: 15, label: 'Focus intentional' }],
};
