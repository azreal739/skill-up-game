import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — switchMap for latest-only work (knowledge pack 07: "Using
 * mergeMap for search by default" — old requests finish late and overwrite
 * newer results).
 */
export const fnRx004SwitchMap: MissionDefinition = {
  id: 'rx-004-switchmap-search',
  campaignId: 'rxjs-reactive',
  title: 'switchMap and the Stale Search',
  summary:
    'The out-of-order search bug: slow old requests overwrite fresh results — unless the operator cancels them.',
  difficulty: 'medium',
  learningObjectives: [
    'Explain how out-of-order responses corrupt UI state',
    'Use switchMap for latest-only async work',
    'Say precisely what switchMap cancels, and when',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'The classic, and we shipped it: type “ang”, then “angular”. The “ang” request is slower, lands last, and the list proudly shows results for a query nobody is looking at.',
    },
    {
      speaker: 'Team Lead',
      text: 'mergeMap keeps every in-flight request alive. switchMap unsubscribes the previous inner Observable the moment a new value arrives — latest input wins, always.',
    },
  ],
  contextArtefacts: [
    {
      id: 'stale-search',
      type: 'code',
      title: 'The search pipe, as shipped',
      language: 'ts',
      content:
        'readonly results$ = this.query$.pipe(\n  mergeMap((q) => this.api.search(q))\n);\n// "ang" resolves after "angular" → stale rows win',
    },
  ],
  challenges: [
    {
      id: 'rx-004-c1',
      type: 'multiple-choice',
      title: 'Diagnose the Ghost Results',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'Reproduce it in your head before fixing it: “ang” (slow), then “angular” (fast).',
      prompt: 'Why does the list end up showing results for “ang”?',
      options: [
        {
          id: 'a',
          label: 'The API cached “ang” and replayed it after “angular”, overriding the newer payload.',
          isCorrect: false,
          feedback:
            'No cache needed — plain network variance is enough. The bug lives in the operator, not the server.',
        },
        {
          id: 'b',
          label: 'debounceTime is missing, and without it RxJS delivers emissions in reverse order.',
          isCorrect: false,
          feedback:
            'Debounce reduces request COUNT; it cannot reorder completions. Emissions were in order — completions were not.',
        },
        {
          id: 'c',
          label:
            'mergeMap keeps both requests subscribed; whichever completes last writes the list — here, the older “ang”.',
          isCorrect: true,
          feedback:
            'Exactly: merge means “all alive at once”, so completion order decides the UI. Slow-old beats fast-new.',
        },
        {
          id: 'd',
          label: 'Angular change detection batched the two responses and applied them alphabetically.',
          isCorrect: false,
          feedback:
            'Change detection renders what state says — the state itself was overwritten by the late response.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Track both inner requests: which is still subscribed when each lands?' },
        {
          level: 2,
          title: 'Concept',
          content: 'mergeMap subscribes every inner Observable and forwards whatever lands, whenever it lands.',
        },
        { level: 3, title: 'Specific clue', content: 'The last write wins — and “last” here means slowest, not newest.' },
        { level: 4, title: 'Guided solution', content: 'Choose the mergeMap-keeps-both explanation.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Race diagnosed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'The ghost-results bug was blamed on the backend for a full sprint.',
        },
      ],
      helpLinks: [{ topicId: 'rx.flattening', label: 'switchMap & friends' }],
      successFeedback: 'You can now explain the race, which is the hard half of fixing it.',
      failureFeedback: 'Both requests are alive under mergeMap. Ask which one writes state LAST.',
    },
    {
      id: 'rx-004-c2',
      type: 'multiple-choice',
      title: 'Fix It — and Say Why',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'One word changes, but the review asks you to defend it.',
      prompt: 'Which fix is right, for the right reason?',
      options: [
        {
          id: 'a',
          label:
            'switchMap((q) => this.api.search(q)) — a new query unsubscribes the previous inner request, so only the latest query can ever populate the list.',
          isCorrect: true,
          feedback:
            'Fix and reason in one: cancellation of the PREVIOUS inner Observable is the whole mechanism.',
        },
        {
          id: 'b',
          label:
            'concatMap((q) => this.api.search(q)) — queueing requests guarantees responses arrive in order.',
          isCorrect: false,
          feedback:
            'Ordered, yes — but every stale query still executes and renders before the latest one. A fast typist queues a slideshow.',
        },
        {
          id: 'c',
          label:
            'exhaustMap((q) => this.api.search(q)) — ignoring new queries while one runs prevents any race.',
          isCorrect: false,
          feedback:
            'exhaustMap DROPS new input while busy — the search box would ignore what the user just typed. Backwards for search.',
        },
        {
          id: 'd',
          label: 'Keep mergeMap but add distinctUntilChanged() — deduplication removes the race.',
          isCorrect: false,
          feedback:
            'Dedup trims repeats; “ang” and “angular” are different values, so both still fly and the slow one still wins.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Search wants latest-only. Which strategy cancels the past?' },
        {
          level: 2,
          title: 'Concept',
          content: 'switchMap = cancel previous; concatMap = queue; exhaustMap = ignore new; mergeMap = all at once.',
        },
        { level: 3, title: 'Specific clue', content: 'Two options fix ordering but punish the user’s newest input. Reject them.' },
        { level: 4, title: 'Guided solution', content: 'Pick switchMap with the cancellation reasoning.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Latest-only locked' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The “ordered” fix queued stale searches and made the box feel broken on slow networks.',
        },
      ],
      helpLinks: [{ topicId: 'rx.flattening', label: 'switchMap & friends' }],
      successFeedback: 'Latest input wins because the previous request is unsubscribed — you said the why.',
      failureFeedback: 'The requirement is latest-only. Match each operator’s strategy to that requirement.',
    },
  ],
  reflectionPrompt: 'Name one flow you own where the LATEST value is the only one that matters.',
  rewards: [{ type: 'xp', amount: 10, label: 'Races retired' }],
};
