import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — the live search from the session, assembled end to end
 * (knowledge pack 03: debounceTime, distinctUntilChanged, switchMap,
 * catchError — the canonical reactive search).
 */
export const fnRx009BossLiveSearch: MissionDefinition = {
  id: 'rx-009-boss-live-search',
  campaignId: 'rxjs-reactive',
  title: 'Boss: The Live Search, End to End',
  summary:
    'Assemble the canonical typeahead: calm the keystrokes, cancel the stale, survive the failures, clean up after yourself.',
  difficulty: 'boss',
  learningObjectives: [
    'Order debounceTime, distinctUntilChanged and switchMap correctly',
    'Keep the stream alive through per-request failures',
    'Sign off a search contract that cannot leak or race',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Finale: the search box that started every RxJS conversation this team has ever had. Build it properly, once, and let it be the reference implementation.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Requirements on the sheet: at most one request per typing pause, no request for unchanged text, latest query always wins, one failure never kills the box, and the template consumes it without a manual subscribe.',
    },
  ],
  contextArtefacts: [
    {
      id: 'requirements',
      type: 'code',
      title: 'The requirements sheet',
      language: 'text',
      content:
        '1. wait for a 300ms typing pause\n2. skip unchanged queries\n3. latest query wins — cancel stale requests\n4. a failed request yields [] and the box keeps working\n5. no manual subscribe in the component',
    },
  ],
  challenges: [
    {
      id: 'rx-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Order the Operators',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'Requirements 1–3 fix the operator order. Prove it.',
      prompt: 'Which pipe implements requirements 1–3 correctly?',
      options: [
        {
          id: 'a',
          label:
            'query$.pipe(\n  switchMap((q) => this.api.search(q)),\n  debounceTime(300),\n  distinctUntilChanged()\n)',
          isCorrect: false,
          feedback:
            'Debouncing AFTER switchMap fires a request per keystroke and merely delays the rows — the network never felt the pause.',
        },
        {
          id: 'b',
          label:
            'query$.pipe(\n  debounceTime(300),\n  distinctUntilChanged(),\n  switchMap((q) => this.api.search(q))\n)',
          isCorrect: true,
          feedback:
            'Calm first (debounce), dedupe second, then latest-only requests — each operator guards the one after it.',
        },
        {
          id: 'c',
          label:
            'query$.pipe(\n  distinctUntilChanged(),\n  switchMap((q) => this.api.search(q)),\n  debounceTime(300)\n)',
          isCorrect: false,
          feedback:
            'Requests still fire per (distinct) keystroke; the debounce now just delays RESULTS — rows lag 300ms for no benefit.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Operators guard what comes AFTER them. What must be guarded from keystrokes?' },
        {
          level: 2,
          title: 'Concept',
          content: 'debounce and distinct shape the query stream BEFORE any request exists; switchMap then races only real queries.',
        },
        { level: 3, title: 'Specific clue', content: 'If debounceTime sits after switchMap, count the requests per keystroke.' },
        { level: 4, title: 'Guided solution', content: 'debounceTime → distinctUntilChanged → switchMap.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Order proven' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'A request per keystroke hammered the API during the launch demo.',
        },
      ],
      helpLinks: [{ topicId: 'rx.flattening', label: 'switchMap & friends' }],
      successFeedback: 'Calm, dedupe, cancel — the canonical order, and you can say why.',
      failureFeedback: 'Trace one fast keystroke burst through each option and count the network requests.',
    },
    {
      id: 'rx-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Candidate',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'A candidate implementation is up for the reference slot. Hold it to the sheet.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'candidate',
          type: 'code',
          title: 'search.component.ts (candidate)',
          language: 'ts',
          content:
            "readonly results = toSignal(\n  this.query$.pipe(\n    debounceTime(300),\n    distinctUntilChanged(),\n    switchMap((q) => this.api.search(q)),\n    catchError(() => of([]))\n  ),\n  { initialValue: [] }\n);\nngOnInit() {\n  this.results$sub = this.query$.subscribe((q) => localStorage.setItem('lastQuery', q));\n}",
        },
      ],
      findings: [
        {
          id: 'outer-catch',
          label: 'catchError sits on the outer pipe — the first failed request still kills the search stream',
          isCorrect: true,
          feedback:
            'Mission 6’s exact lesson: the catch must ride the inner search(q), or requirement 4 fails on the first 500.',
        },
        {
          id: 'raw-subscribe',
          label: 'The ngOnInit subscribe has no cleanup — a leak the moment the component is destroyed',
          isCorrect: true,
          feedback:
            'Requirement 5 in spirit: the side channel needs takeUntilDestroyed (or to become part of the pipe).',
        },
        {
          id: 'initial-empty',
          label: 'initialValue: [] hides loading state and should be removed',
          isCorrect: false,
          feedback:
            'An empty list is an honest pre-emission value for a results signal — removing it reintroduces undefined.',
        },
        {
          id: 'distinct-wrong',
          label: 'distinctUntilChanged compares by reference and never works on strings',
          isCorrect: false,
          feedback: 'Strings compare by value with ===; the default comparison is exactly right here.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check the sheet line by line — requirements 4 and 5 are the suspects.' },
        {
          level: 2,
          title: 'Concept',
          content: 'Catch placement decides survival; every raw subscribe must answer “who unsubscribes?”.',
        },
        { level: 3, title: 'Specific clue', content: 'One issue is a level, the other a lifetime.' },
        { level: 4, title: 'Guided solution', content: 'Flag the outer catchError and the uncleaned subscribe.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Candidate reviewed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The near-miss candidate became the reference, and its two flaws became the house style.',
        },
      ],
      helpLinks: [
        { topicId: 'rx.operators', label: 'RxJS operators' },
        { topicId: 'rx.subscriptions', label: 'Subscription cleanup' },
      ],
      successFeedback: 'Two campaign lessons caught in one review — this is what the sessions were for.',
      failureFeedback: 'Requirements 4 and 5 each have a violation. Mission 6 and mission 3 name them.',
    },
    {
      id: 'rx-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the Reference',
      difficulty: 'boss',
      tags: ['angular', 'api'],
      storyContext: 'Two final candidates. One becomes the team’s reference typeahead. Sign it off.',
      prompt: 'Which implementation meets every line of the sheet?',
      options: [
        {
          id: 'a',
          label:
            'debounceTime(300) → distinctUntilChanged() → switchMap(q => search(q).pipe(catchError(() => of([])))) → toSignal(…, { initialValue: [] })',
          isCorrect: false,
          feedback:
            'Solid — every sheet line passes. But junk input still reaches the network: “ angular ” and “angular” count as different queries, and a single character fires a full search. The reference candidate gates both before the request.',
        },
        {
          id: 'b',
          label:
            'debounceTime(300) → switchMap(q => search(q)) → catchError(() => of([])) → subscribe(r => this.rows = r) in ngOnInit',
          isCorrect: false,
          feedback:
            'Three sheet violations at once: no dedupe, an outer catch that dies on first failure, and a manual subscribe writing a mutable field.',
        },
        {
          id: 'c',
          label:
            'map(q => q.trim()) → debounceTime(300) → distinctUntilChanged() → switchMap(q => q.length < 2 ? of([]) : search(q).pipe(catchError(() => of([])))) → toSignal(…, { initialValue: [] })',
          isCorrect: true,
          feedback:
            'Every line of the sheet, plus the production touches: trimmed input, a short-query gate that never hits the network, inner catch, honest initial value.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Hold each candidate against all five sheet lines — then prefer the one that is production-honest about tiny queries.' },
        {
          level: 2,
          title: 'Concept',
          content: 'The reference implementation gates junk input BEFORE the network and catches failure INSIDE the projection.',
        },
        { level: 3, title: 'Specific clue', content: 'One candidate violates three lines. Of the remaining two, one handles empty/short queries; one does not.' },
        { level: 4, title: 'Guided solution', content: 'Sign off the trim + short-query-gate + inner-catch + toSignal candidate.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Reference signed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The lesser candidate shipped as the reference, and every future search inherited its gaps.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The reference implementation needed a follow-up fix within a week.',
        },
      ],
      helpLinks: [
        { topicId: 'rx.flattening', label: 'switchMap & friends' },
        { topicId: 'rx.operators', label: 'RxJS operators' },
      ],
      successFeedback:
        'Calm, dedupe, gate, cancel, survive, clean up — the reference typeahead, signed. Campaign complete.',
      failureFeedback:
        'Score each candidate against the five sheet lines, then look for the short-query gate.',
    },
  ],
  reflectionPrompt: 'Which of the five sheet requirements does your current search implementation miss?',
  rewards: [{ type: 'xp', amount: 25, label: 'Reference established' }],
};
