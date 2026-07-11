import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — announcing dynamic changes: aria-live, politeness levels,
 * and Angular's LiveAnnouncer.
 */
export const fnA11y007LiveRegions: MissionDefinition = {
  id: 'a11y-007-live-regions',
  campaignId: 'ng-accessibility',
  title: 'Telling the Reader What Changed',
  summary:
    'When content updates without a page load, a screen reader hears nothing unless a live region announces it — at the right politeness, without flooding.',
  difficulty: 'hard',
  learningObjectives: [
    'Choose polite vs assertive live announcements correctly',
    'Use Angular’s LiveAnnouncer for imperative announcements',
    'Avoid over-announcing that drowns the important',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session seven: the silent successes and silent failures. Save a form — a green toast flashes and fades. Search — results quietly replace. A reader user gets NO signal for any of it: no "Saved", no "12 results", no "Save failed". The app was talking only to eyes.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Dynamic updates need a LIVE REGION — a container the reader watches and announces when its content changes. Politeness matters: aria-live="polite" waits for a pause (results counts, "Saved") — most things; aria-live="assertive" interrupts immediately (errors, session-expiry) — rare, because interrupting is rude. Angular’s LiveAnnouncer does this imperatively. And the discipline: announce what MATTERS — a region that fires on every keystroke becomes noise the user tunes out.',
    },
  ],
  contextArtefacts: [
    {
      id: 'live-announcer',
      type: 'code',
      title: 'Imperative announcements, right politeness',
      language: 'ts',
      content:
        "private readonly announcer = inject(LiveAnnouncer);\n\nonSaved()  { this.announcer.announce('Changes saved'); }              // polite (default)\nonResults(n: number) { this.announcer.announce(`${n} results`); }     // polite\nonError()  { this.announcer.announce('Save failed', 'assertive'); }    // interrupts\n\n// declarative alternative for a status area:\n// <p aria-live=\"polite\">{{ statusMessage() }}</p>",
    },
  ],
  challenges: [
    {
      id: 'a11y-007-c1',
      type: 'multiple-choice',
      title: 'Polite or Assertive',
      difficulty: 'hard',
      tags: ['a11y', 'angular'],
      storyContext:
        'Four updates to announce: (1) "14 results" after a search; (2) "Draft saved" after autosave; (3) "Your session expires in 60 seconds"; (4) "Payment failed — card declined" on checkout.',
      prompt: 'Which politeness does each need, and why?',
      options: [
        {
          id: 'a',
          label:
            'Polite for (1) and (2) — informational updates that should wait for a natural pause, never interrupting the user’s current reading. Assertive for (3) and (4) — time-critical warnings the user must hear NOW, even mid-sentence, because acting late has real cost (lost session, failed purchase). Politeness matches urgency: interrupt only when NOT interrupting would harm the user.',
          isCorrect: true,
          feedback:
            'The test for assertive: does the user suffer if they hear it a few seconds later? Results and autosave — no; session expiry and payment failure — yes. Default to polite; reserve assertive for genuine urgency.',
        },
        {
          id: 'b',
          label: 'All four assertive — better to guarantee the user hears everything than risk them missing an update.',
          isCorrect: false,
          feedback:
            'Four interruptions train the user to tune out the region — so when the payment failure fires, it lands in the same ignored channel as "draft saved". Assertive overuse destroys assertive’s value.',
        },
        {
          id: 'c',
          label: 'All four polite — assertive is jarring and inaccessible; polite covers everything safely.',
          isCorrect: false,
          feedback:
            'Polite queues behind current speech — a session-expiry warning that waits for the user to finish reading a long paragraph may fire after the session is gone. Some messages genuinely cannot wait.',
        },
        {
          id: 'd',
          label: 'Only announce (3) and (4); (1) and (2) are visible on screen so they need no announcement.',
          isCorrect: false,
          feedback:
            '“Visible on screen” is exactly what a reader user cannot perceive — the search count and save confirmation are precisely the silent successes this session is about.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each: does the user suffer if they hear it a few seconds late?' },
        { level: 2, title: 'Concept', content: 'Polite waits for a pause; assertive interrupts — reserve it for urgency.' },
        { level: 3, title: 'Specific clue', content: 'Which two have a time cost for hearing late?' },
        { level: 4, title: 'Guided solution', content: 'Polite for 1–2, assertive for 3–4.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Politeness matched' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Everything was announced assertive — users tuned out the region entirely and missed a real payment failure.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.live-regions', label: 'Live regions' }],
      successFeedback: 'Urgency mapped to politeness — the important interrupts, the routine waits, the region stays trusted.',
      failureFeedback: 'Rank the four by "cost of hearing this late". The two costly ones are assertive.',
    },
    {
      id: 'a11y-007-c2',
      type: 'multiple-choice',
      title: 'The Region That Cried Wolf',
      difficulty: 'hard',
      tags: ['a11y', 'angular'],
      storyContext:
        'A search box wires <p aria-live="polite">{{ resultCount() }} results</p>, and resultCount recomputes on every keystroke as the user types the query (debounced fetch, but the count signal also reflects an optimistic local filter per character).',
      prompt: 'What goes wrong, and what is the fix?',
      options: [
        {
          id: 'a',
          label:
            'The live region announces on EVERY content change — so typing "reports" fires "0 results, 1 result, 3 results…" letter by letter, a torrent that buries the one announcement that matters (the final count). Fix: announce only settled, meaningful states — update the live region when the debounced search RESOLVES, not on each optimistic per-keystroke change (announce the final count, or a brief "Searching…" then the result).',
          isCorrect: true,
          feedback:
            'A live region is a megaphone: point it at meaningful moments, not every intermediate render. Over-announcing is how a well-intentioned region becomes noise the user learns to ignore.',
        },
        {
          id: 'b',
          label: 'Switch it to aria-live="assertive" so each update replaces the last before it finishes — no pile-up.',
          isCorrect: false,
          feedback:
            'assertive makes it WORSE — now every keystroke interrupts the previous announcement, a stuttering barrage. The problem is announcement FREQUENCY, not politeness.',
        },
        {
          id: 'c',
          label: 'Remove the live region — result counts are not important enough to announce.',
          isCorrect: false,
          feedback:
            'The count IS valuable feedback for a reader user (did my search find anything?) — the fix is to announce it once, when settled, not to remove it.',
        },
        {
          id: 'd',
          label: 'Add aria-busy="true" during typing so the reader ignores updates until done.',
          isCorrect: false,
          feedback:
            'aria-busy on the region can help suppress intermediate reads, but the root cause is announcing an optimistic count per keystroke at all — drive the region from the settled result and the busy juggling is unnecessary.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'How many times does the region’s content change while typing one word?' },
        { level: 2, title: 'Concept', content: 'Announce settled, meaningful states — not every intermediate render.' },
        { level: 3, title: 'Specific clue', content: 'When should the count speak: per keystroke, or when the search resolves?' },
        { level: 4, title: 'Guided solution', content: 'Announce on resolved search, not optimistic per-key updates.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Noise silenced' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The per-keystroke region shipped — reader users described search as “a machine gun of numbers” and disabled announcements.',
        },
      ],
      helpLinks: [{ topicId: 'a11y.live-regions', label: 'Live regions' }],
      successFeedback: 'The megaphone aimed at meaning — one clear count, heard and trusted.',
      failureFeedback: 'Count the content changes per typed word. That is how many times the region speaks.',
    },
  ],
  reflectionPrompt: 'Which of our silent successes and failures (saves, searches, errors) does a screen-reader user currently hear nothing about?',
  rewards: [{ type: 'xp', amount: 15, label: 'Changes announced' }],
};
