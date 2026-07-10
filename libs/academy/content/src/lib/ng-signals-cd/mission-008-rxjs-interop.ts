import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — signals ↔ RxJS interop (toSignal with initialValue,
 * toObservable for operator pipelines; streams for events over time,
 * signals for current state).
 */
export const fnSig008RxjsInterop: MissionDefinition = {
  id: 'sig-008-rxjs-interop',
  campaignId: 'ng-signals-cd',
  title: 'Two Worlds, One Bridge',
  summary:
    'toSignal turns streams into current state; toObservable lends signals the operator toolkit — each world doing what it is best at.',
  difficulty: 'hard',
  learningObjectives: [
    'Bring an HTTP stream into a template as a signal, safely seeded',
    'Send a signal through RxJS operators with toObservable',
    'Choose stream or signal by what the data IS, not by fashion',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Last regular session: the RxJS block and the signals block finally met. The rule we landed on — signals hold what things ARE, streams describe what HAPPENS. The bridges carry data between the two.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Two bridges, two directions. toSignal: stream in, current-value out — and it manages the subscription for you, cleaning up with the component. toObservable: signal in, stream out — for when a value needs debouncing, switching, all the RxJS machinery.',
    },
  ],
  contextArtefacts: [
    {
      id: 'two-bridges',
      type: 'code',
      title: 'Both bridges, from the slides',
      language: 'ts',
      content:
        "// stream → signal: current state for the template\nreadonly users = toSignal(this.api.users$, { initialValue: [] as User[] });\n\n// signal → stream: borrow the operator toolkit\nreadonly results = toSignal(\n  toObservable(this.query).pipe(\n    debounceTime(300),\n    switchMap((q) => this.api.search(q))\n  ),\n  { initialValue: [] as Result[] }\n);",
    },
  ],
  challenges: [
    {
      id: 'sig-008-c1',
      type: 'multiple-choice',
      title: 'Crossing Stream → Signal',
      difficulty: 'hard',
      tags: ['angular', 'rxjs'],
      storyContext:
        'Ticket: the members page loads users over HTTP and renders {{ users().length }} members immediately, before the response lands.',
      prompt: 'Which implementation is right?',
      options: [
        {
          id: 'a',
          label:
            'readonly users = toSignal(this.api.users$, { initialValue: [] as User[] }) — the signal is [] until the stream emits, so users().length is honestly 0 from the first render.',
          isCorrect: true,
          feedback:
            'Seeded, subscription-managed, template-ready — and the empty array is a true statement about pre-response state, not a lie waiting to crash.',
        },
        {
          id: 'b',
          label: 'readonly users = computed(() => this.api.users$) — computed will unwrap the observable when it resolves.',
          isCorrect: false,
          feedback:
            'computed never subscribes to anything — the “value” is the cold Observable object itself, and users().length is undefined forever.',
        },
        {
          id: 'c',
          label: 'Subscribe in the constructor and assign a plain property: this.api.users$.subscribe(u => (this.users = u)).',
          isCorrect: false,
          feedback:
            'A plain-property write is invisible to OnPush (mission 6’s freeze, again) and the subscription outlives nothing on purpose — toSignal does both jobs correctly for free.',
        },
        {
          id: 'd',
          label: 'readonly users = toSignal(this.api.users$) with users()!.length — the non-null assertion covers the loading gap.',
          isCorrect: false,
          feedback:
            'Without initialValue the signal IS undefined until first emission — the ! silences the compiler and ships the crash. The RxJS campaign buried this exact pattern.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The page renders BEFORE the response. What must users() return then?' },
        { level: 2, title: 'Concept', content: 'toSignal + initialValue: a current value at every moment of the component’s life.' },
        { level: 3, title: 'Specific clue', content: 'One option hides the gap with !, one never subscribes at all.' },
        { level: 4, title: 'Guided solution', content: 'Pick toSignal with the typed empty-array seed.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Bridge crossed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The members page crashed on cold loads — undefined.length, found only on slow connections.',
        },
      ],
      helpLinks: [
        { topicId: 'signals.rxjs-interop', label: 'Signals ↔ RxJS interop' },
        { topicId: 'rx.observables', label: 'Observables' },
      ],
      successFeedback: 'Every render answered honestly, no subscription to babysit — the bridge as designed.',
      failureFeedback: 'Two questions per option: who subscribes, and what is the value before first emission?',
    },
    {
      id: 'sig-008-c2',
      type: 'code-review',
      title: 'Review the Border Post',
      difficulty: 'hard',
      tags: ['angular', 'rxjs'],
      storyContext: 'A teammate wires the org-switcher: pick an org, fetch its projects, render a count. Review the crossings.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'org-switcher',
          type: 'code',
          title: 'org-switcher.component.ts (proposed)',
          language: 'ts',
          content:
            "readonly orgId = signal('acme');\n\nreadonly projects = toSignal(\n  toObservable(this.orgId).pipe(\n    debounceTime(200),\n    switchMap((id) => this.api.projects(id))\n  )\n);\n\nreadonly projectCount = computed(() => {\n  this.api.trackView('projects').subscribe();\n  return this.projects()!.length;\n});",
        },
      ],
      findings: [
        {
          id: 'no-initial-value',
          label:
            'toSignal has no initialValue, so projects() is undefined until the first response — and projectCount dereferences it with ! on first render',
          isCorrect: true,
          feedback:
            'The undefined window is real: debounce plus HTTP means whole seconds of projects() === undefined, and the ! converts that into a crash instead of a compile error.',
        },
        {
          id: 'toobservable-pipeline',
          label: 'Piping toObservable(orgId) through debounceTime and switchMap defeats the point of signals — the fetch should react to the signal directly',
          isCorrect: false,
          feedback:
            'This is the bridge used exactly as designed: signals cannot debounce or cancel; the operator pipeline is WHY toObservable exists. This line is the healthiest in the file.',
        },
        {
          id: 'subscribe-in-computed',
          label: 'projectCount fires an analytics call and subscribes inside computed — a side effect and a leaked subscription inside a pure derivation',
          isCorrect: true,
          feedback:
            'computed must derive, nothing else: this one calls the network on every recalculation and abandons each subscription. Analytics belongs in an effect (or the click handler).',
        },
        {
          id: 'missing-cleanup',
          label: 'Neither toSignal call is paired with takeUntilDestroyed — both subscriptions leak when the component dies',
          isCorrect: false,
          feedback:
            'toSignal cleans up after itself: it subscribes when created and unsubscribes with the component’s DestroyRef. Bolting takeUntilDestroyed on is redundant, not required.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Audit each crossing: what is the value before first emission, and who cleans up?' },
        { level: 2, title: 'Concept', content: 'toSignal manages its own subscription; computed must stay pure.' },
        { level: 3, title: 'Specific clue', content: 'The operator pipeline is fine. The problems are a missing seed and a side effect.' },
        { level: 4, title: 'Guided solution', content: 'Flag the missing initialValue and the subscribe-inside-computed.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Border secured' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The analytics-in-computed pattern was copied to four more derivations before anyone traced the duplicate events.',
        },
      ],
      helpLinks: [
        { topicId: 'signals.rxjs-interop', label: 'Signals ↔ RxJS interop' },
        { topicId: 'signals.computed', label: 'Computed signals' },
      ],
      successFeedback: 'Seeds checked, purity enforced, bridges trusted to do their own cleanup — reviewed like a local.',
      failureFeedback: 'One flagged line is actually the textbook use of toObservable. Which two lines genuinely misbehave?',
    },
  ],
  reflectionPrompt: 'Where does our app hand-roll a bridge — a subscribe assigning a property — that toSignal would make honest?',
  rewards: [{ type: 'xp', amount: 15, label: 'Worlds joined' }],
};
