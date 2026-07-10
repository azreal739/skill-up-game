import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — route params: snapshot vs the params stream, and the
 * classic same-component navigation bug.
 */
export const fnRt002RouteParams: MissionDefinition = {
  id: 'rt-002-route-params',
  campaignId: 'ng-routing',
  title: 'Params Change, Components Don’t',
  summary:
    'Navigating project/1 → project/2 REUSES the component — read params as a stream (or input), not a constructor-time snapshot.',
  difficulty: 'easy',
  learningObjectives: [
    'Explain component reuse on same-route param changes',
    'Choose between snapshot and reactive param reads',
    'Wire withComponentInputBinding to receive params as inputs',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session two, a bug everyone in the room had shipped at least once: the “next project” button. Click it on project 1 and the URL says project/2 — while the page still shows project 1.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Because the router is efficient: same route, same component — it does NOT destroy and recreate, it just updates the params. Code that read the id once in the constructor read it once, forever. Params are a stream; treat them like one.',
    },
  ],
  contextArtefacts: [
    {
      id: 'stale-detail',
      type: 'code',
      title: 'The stale detail page',
      language: 'ts',
      content:
        "// BUG: reads once, at construction\nreadonly id = this.route.snapshot.paramMap.get('id');\n\n// FIX 1: params as a stream → signal\nreadonly id = toSignal(\n  this.route.paramMap.pipe(map((p) => p.get('id'))),\n  { initialValue: null }\n);\n\n// FIX 2: withComponentInputBinding() in the router config\n// @Input() set id(value: string) { … } — router writes it on every change",
    },
  ],
  challenges: [
    {
      id: 'rt-002-c1',
      type: 'multiple-choice',
      title: 'The Frozen Detail Page',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext: 'URL: /project/2. Page: project 1. The constructor reads route.snapshot.paramMap.get("id").',
      prompt: 'Why is the page frozen on the old project?',
      options: [
        {
          id: 'a',
          label: 'The router batches param updates and flushes them on the next user interaction.',
          isCorrect: false,
          feedback: 'Params updated instantly — the stream emitted. Nobody in this component was listening.',
        },
        {
          id: 'b',
          label: 'snapshot is cached too aggressively; calling snapshot.paramMap.get again inside ngOnInit returns the fresh value.',
          isCorrect: false,
          feedback:
            'ngOnInit runs ONCE per component instance too — and the instance survives the navigation. Any read-once strategy shares the bug.',
        },
        {
          id: 'c',
          label: 'project/1 and project/2 should have been separate route entries; parameterised paths cannot re-render.',
          isCorrect: false,
          feedback:
            'Parameterised routes re-render fine — when the code SUBSCRIBES to the change instead of photographing the first value.',
        },
        {
          id: 'd',
          label:
            'Same route + same component = the router reuses the instance and only updates the params. The snapshot was a photo taken at construction; construction never re-ran. Read paramMap as a stream (or router-bound @Input) so id changes flow into the data load.',
          isCorrect: true,
          feedback:
            'Reuse is a feature — scroll position, focus and child state survive. The contract is: params are live data, not constructor arguments.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Did the component get destroyed on navigation? Check the URL vs the page.' },
        { level: 2, title: 'Concept', content: 'Same route, same instance — the router swaps params, not components.' },
        { level: 3, title: 'Specific clue', content: '“snapshot” is the word doing the damage — photos don’t update.' },
        { level: 4, title: 'Guided solution', content: 'Pick component-reuse + read-params-as-stream.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Freeze thawed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Users compared project 2’s URL against project 1’s numbers in a client meeting.',
        },
      ],
      helpLinks: [{ topicId: 'routing.params', label: 'Route params' }],
      successFeedback: 'Instance reused, params streamed — the next-button bug is retired from your future.',
      failureFeedback: 'The URL changed and the page did not. What survived the navigation that you expected to die?',
    },
    {
      id: 'rt-002-c2',
      type: 'multiple-choice',
      title: 'Choose the Read',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'Two pages: (A) a settings page reachable only via full navigation from elsewhere; (B) the project detail page with prev/next buttons.',
      prompt: 'Which param-reading strategy fits each page?',
      options: [
        {
          id: 'a',
          label: 'Both must use the paramMap stream — snapshot is deprecated and unsafe everywhere.',
          isCorrect: false,
          feedback:
            'snapshot is neither deprecated nor unsafe — it is a correct read whenever the component cannot outlive one param value.',
        },
        {
          id: 'b',
          label:
            'A can read snapshot safely — a fresh instance per visit means the photo is always current. B needs the live read: paramMap stream (or a router-bound input), because the instance survives prev/next.',
          isCorrect: true,
          feedback:
            'Strategy follows lifetime: ask “can this instance see a SECOND id?” — no → snapshot fine; yes → stream or input binding.',
        },
        {
          id: 'c',
          label: 'Both can use snapshot if B’s buttons call location.reload() to force fresh instances.',
          isCorrect: false,
          feedback: 'Reloading the app to dodge a subscription is the href white-flash, self-inflicted.',
        },
        {
          id: 'd',
          label: 'B should navigate with skipLocationChange so params never change and snapshot stays valid.',
          isCorrect: false,
          feedback:
            'skipLocationChange hides the URL change from the address bar — the params still change, and now the URL lies too.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The question behind the question: when is a snapshot photo guaranteed fresh?' },
        { level: 2, title: 'Concept', content: 'Snapshot is safe exactly when the instance dies before params can change.' },
        { level: 3, title: 'Specific clue', content: 'Prev/next on the SAME route is the reuse case from c1.' },
        { level: 4, title: 'Guided solution', content: 'Snapshot for A, stream/input for B.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Read chosen' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'A blanket “never snapshot” rule spawned boilerplate streams for params that could never change.',
        },
      ],
      helpLinks: [{ topicId: 'routing.params', label: 'Route params' }],
      successFeedback: 'Lifetime decides the read — a rule you can apply in one glance at the route.',
      failureFeedback: 'For each page ask: can THIS component instance ever observe a second id value?',
    },
  ],
  reflectionPrompt: 'Which of our detail pages would freeze today if someone added a “next” button to it?',
  rewards: [{ type: 'xp', amount: 5, label: 'Params streamed' }],
};
