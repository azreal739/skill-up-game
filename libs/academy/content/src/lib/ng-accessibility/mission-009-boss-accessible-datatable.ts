import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — the accessible data table: semantics, keyboard, live
 * updates and testing, assembled into one genuinely usable component.
 */
export const fnA11y009BossAccessibleDataTable: MissionDefinition = {
  id: 'a11y-009-boss-accessible-datatable',
  campaignId: 'ng-accessibility',
  title: 'Boss: The Accessible Data Table',
  summary:
    'Make the sortable, filterable, paginated data table usable for everyone — semantics, keyboard, announcements and honest testing, signed off.',
  difficulty: 'boss',
  learningObjectives: [
    'Assemble the block’s techniques into one accessible component',
    'Review an a11y implementation for real usability, not checkbox compliance',
    'Sign off an accessibility strategy that stays true over time',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The block finale is the component that touches everything: the data table. Sortable columns, a filter box, pagination, row actions, live result counts. Every accessibility lesson from the block meets here — and it is the component blind users complain about most.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The sheet: real table semantics so the structure is navigable; sort controls operable by keyboard and announcing their state; the filter announcing result counts without flooding; pagination that manages focus; and testing that proves USABILITY, not just a green scan. Build it so a screen-reader user can actually get their work done.',
    },
  ],
  contextArtefacts: [
    {
      id: 'table-sheet',
      type: 'code',
      title: 'The accessible table requirements sheet',
      language: 'text',
      content:
        '1. semantics: real <table>/<th scope>/<caption> — structure the reader can navigate\n2. sort: <th> header buttons, keyboard-operable, aria-sort reflecting current state\n3. filter: announce "N results" politely on settled filter, never per keystroke\n4. pagination: on page change, manage focus + announce the new page/range\n5. testing: axe in CI (floor) + keyboard & screen-reader passes (ceiling)',
    },
  ],
  challenges: [
    {
      id: 'a11y-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Build the Semantics',
      difficulty: 'hard',
      tags: ['a11y', 'angular'],
      storyContext: 'Sheet lines 1 and 2 decide the foundation. Choose it.',
      prompt: 'Which structure matches the sheet?',
      options: [
        {
          id: 'a',
          label:
            'A real <table> with <caption>, <th scope="col"> headers, and <td> cells; each sortable header contains a real <button> that toggles sort and whose <th> carries aria-sort="ascending|descending|none" bound to state; the sort change announced via a live region. Native table semantics give row/column navigation for free; the header buttons give keyboard sort with honest state.',
          isCorrect: true,
          feedback:
            'Every line served by the platform: <table> supplies the navigable grid, <th scope> maps headers to cells, real buttons give keyboard operation, aria-sort keeps state true. Reach for semantics before ARIA, then ARIA only for what semantics lacks (the sort state).',
        },
        {
          id: 'b',
          label:
            'A grid of <div>s styled as a table with role="table"/role="row"/role="cell" applied throughout, and role="button" on clickable header divs with keydown handlers for sorting.',
          isCorrect: false,
          feedback:
            'This hand-rebuilds everything <table> and <button> already provide, via ARIA that must be kept perfectly in sync — mission 1 and 3’s exact anti-pattern at scale. Correct role soup is still soup; use the elements.',
        },
        {
          id: 'c',
          label:
            'A <table> for structure, but sorting handled by making the whole <th> clickable (click handler on the th, no inner button) to keep the markup clean.',
          isCorrect: false,
          feedback:
            'A clickable <th> with no button is the div-with-click-handler problem in a table hat: not keyboard-focusable, not activatable by Enter/Space, no button semantics. The header needs a real interactive element inside it.',
        },
        {
          id: 'd',
          label:
            'A <table> with aria-label per column instead of <th> elements, so screen readers announce column names without needing header rows.',
          isCorrect: false,
          feedback:
            'Replacing <th> with per-cell labels discards the header→cell ASSOCIATION that lets a reader say "Status: Down" when landing on a cell — real <th scope> is what wires columns to their data.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What gives row/column navigation and header association for free?' },
        { level: 2, title: 'Concept', content: 'Native <table>/<th scope>/<button>; ARIA only for sort state.' },
        { level: 3, title: 'Specific clue', content: 'The sortable header needs a REAL interactive element inside the <th>.' },
        { level: 4, title: 'Guided solution', content: 'Pick the real-table + header-buttons + aria-sort answer.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Semantics built' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The div-grid table shipped — the ARIA drifted out of sync within two sprints and the reader announced nonsense.',
        },
      ],
      helpLinks: [
        { topicId: 'a11y.semantics', label: 'Semantic HTML' },
        { topicId: 'a11y.aria', label: 'ARIA name/role/state' },
      ],
      successFeedback: 'Native grid, real buttons, honest sort state — stage 1 clear.',
      failureFeedback: 'For each option, count what the platform gives free vs what you must hand-maintain in ARIA.',
    },
    {
      id: 'a11y-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Interactions',
      difficulty: 'hard',
      tags: ['a11y', 'angular'],
      storyContext: 'The table’s filter, pagination and announcements land for review. Hold them against the sheet and the block.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'table-interactions',
          type: 'code',
          title: 'data-table interactions (proposed)',
          language: 'html',
          content:
            '<!-- filter -->\n<label for="q">Filter</label>\n<input id="q" (input)="onFilter($event)" />\n<p aria-live="assertive">{{ filtered().length }} results</p>\n\n<!-- sortable header -->\n<th [attr.aria-sort]="sortState()">\n  <button (click)="sortBy(\'name\')">Name</button>\n</th>\n\n<!-- pagination -->\n<button (click)="nextPage()">Next</button>\n<!-- on next page: rows re-render; focus stays on the Next button -->\n\n<!-- row action -->\n<td><button [attr.aria-label]="\'Delete \' + row.name" (click)="del(row)">🗑</button></td>',
        },
      ],
      findings: [
        {
          id: 'filter-assertive-perkey',
          label:
            'The result-count region is aria-live="assertive" and bound to filtered().length which updates on every keystroke — so typing interrupts the reader with a stuttering count per character (mission 7’s cried-wolf region, at maximum rudeness)',
          isCorrect: true,
          feedback:
            'Two fixes at once: politeness must be "polite" (a count is never urgent), and it must announce the SETTLED count (on debounced filter resolve), not every optimistic per-key length. Assertive-per-keystroke is the worst of both lessons.',
        },
        {
          id: 'pagination-focus-lost',
          label:
            'On "Next", the rows re-render but focus stays on the Next button while the entire table content changed beneath it — a reader user hears nothing and has no idea the page advanced; focus should move to the table (or its caption/first row) with the new range announced',
          isCorrect: true,
          feedback:
            'Sheet line 4, unmet: a page change is like a mini-navigation (mission 5) — move focus into the new content and announce "Page 2, showing 21–40". Leaving focus on Next makes pagination silent and disorienting.',
        },
        {
          id: 'row-action-label',
          label: 'The delete button’s aria-label duplicates work — the visible 🗑 emoji already conveys "delete", so the label is redundant',
          isCorrect: false,
          feedback:
            'Backwards: an emoji-only button has no reliable accessible NAME (readers announce 🗑 inconsistently, and "Delete" alone would not say WHICH row) — aria-label="Delete {{row.name}}" is exactly right, giving each action a unique, meaningful name. This line is the artefact’s best.',
        },
        {
          id: 'aria-sort-binding',
          label: 'aria-sort is bound to sortState() rather than a hardcoded string — this dynamic binding is fragile and should be a static attribute',
          isCorrect: false,
          feedback:
            'Exactly inverted: aria-sort MUST be bound to the live sort state (mission 3’s keep-it-true rule) — a static aria-sort would lie the moment the user sorts. The binding is correct and required.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check the live region’s politeness+frequency, then trace focus after "Next".' },
        { level: 2, title: 'Concept', content: 'Polite settled announcements; page change moves focus; dynamic aria stays true.' },
        { level: 3, title: 'Specific clue', content: 'Two findings attack CORRECT code (the row label and the sort binding) — spare them.' },
        { level: 4, title: 'Guided solution', content: 'Flag the assertive-per-keystroke region and the lost pagination focus.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Interactions reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The silent pagination shipped — reader users paged through data believing nothing was changing.',
        },
      ],
      helpLinks: [
        { topicId: 'a11y.live-regions', label: 'Live regions' },
        { topicId: 'a11y.focus-management', label: 'Focus management' },
      ],
      successFeedback: 'Region calmed, pagination focus managed, correct code spared — review at block standard.',
      failureFeedback: 'Type in the filter and hit Next as a reader user. Which two moments betray you — and which two lines are already right?',
    },
    {
      id: 'a11y-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the Strategy',
      difficulty: 'boss',
      tags: ['a11y', 'testing'],
      storyContext: 'The table works. Two proposals for how accessibility is verified and kept — sheet line 5 decides.',
      prompt: 'Which strategy ships?',
      options: [
        {
          id: 'a',
          label:
            'axe in CI on the table’s rendered states (empty, filtered, sorted, paginated) so mechanical regressions fail the build; PLUS a documented manual checklist run on any change to the table — keyboard-only pass (sort, filter, paginate, delete, all reachable/visible/untrapped), a screen-reader pass verifying announcements and header association make the table USABLE, and a 200% zoom pass; with the checklist owned by the team, not a quarterly external audit.',
          isCorrect: true,
          feedback:
            'Both layers of mission 8: automation guards the mechanical floor continuously, human passes verify the usability ceiling per change, and ownership keeps a11y in the daily workflow. This keeps the table accessible as it evolves, not just on launch day.',
        },
        {
          id: 'b',
          label:
            'axe in CI with a strict zero-violations gate on every state, plus a snapshot test of the accessibility tree — full automation means no manual step can be forgotten or skipped under deadline.',
          isCorrect: false,
          feedback:
            'The mission-8 trap: automation cannot judge whether the sort announcement is TIMELY, the tab order SENSIBLE, or the experience USABLE — a mechanically perfect, experientially broken table passes this gate. (And a11y-tree snapshots freeze implementations, the design-system-card lesson.) No amount of automation reaches the ceiling.',
        },
        {
          id: 'c',
          label:
            'A thorough manual accessibility audit by a specialist before each major release, replacing automated checks — expert human judgement is the gold standard and automation only gives false confidence.',
          isCorrect: false,
          feedback:
            'Drops the continuous floor: between releases, a removed <th scope> or a broken aria-sort rides to production and lives until the next audit. Expert audits are a valuable ADDITION, never a replacement for cheap per-push regression catching — and they remove the team’s own a11y muscle.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which proposal has BOTH a continuous floor and a human-judged ceiling?' },
        { level: 2, title: 'Concept', content: 'Automation continuous + manual per-change + team ownership.' },
        { level: 3, title: 'Specific clue', content: 'What catches a broken aria-sort on the push that breaks it — and what catches an unusable announcement?' },
        { level: 4, title: 'Guided solution', content: 'Sign axe-in-CI + owned manual checklist.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Strategy signed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The automation-only gate shipped — the table passed every check and remained unusable to the blind users it was rebuilt for.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The a11y block’s capstone declared victory on a green scan — the same false confidence that opened session eight.',
        },
      ],
      helpLinks: [
        { topicId: 'a11y.testing', label: 'Testing accessibility' },
        { topicId: 'a11y.semantics', label: 'Semantic HTML' },
      ],
      successFeedback:
        'Native semantics, keyboard-operable, politely announced, focus-managed, floor-automated and ceiling-tested — a data table everyone can actually use. Campaign complete.',
      failureFeedback:
        'Line 5 names two testing layers. Which proposal keeps both — and which mistakes a green scan for a usable table?',
    },
  ],
  reflectionPrompt: 'Take our real data table: drive it with a screen reader and a keyboard. Where does a real user get stuck — and would a green axe run have told us?',
  rewards: [{ type: 'xp', amount: 25, label: 'Table accessible' }],
};
