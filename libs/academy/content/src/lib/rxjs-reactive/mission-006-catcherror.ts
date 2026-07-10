import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — error handling placement (knowledge pack 03: "placing
 * catchError in the wrong location" kills the outer stream).
 */
export const fnRx006CatchError: MissionDefinition = {
  id: 'rx-006-catcherror-placement',
  campaignId: 'rxjs-reactive',
  title: 'catchError: Location, Location',
  summary:
    'An error completes a stream. Where you catch decides whether one failed request kills the whole feature.',
  difficulty: 'medium',
  learningObjectives: [
    'Explain why an uncaught error terminates the outer stream',
    'Place catchError on the inner Observable to survive per-request failures',
    'Choose a sane fallback emission',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'The search box died again — differently this time. One 500 from the API and the box never searched again until refresh. The stream had errored, and an errored stream is a finished stream.',
    },
    {
      speaker: 'Team Lead',
      text: 'The catch was there — just one level too high. Catch on the OUTER pipe and the outer stream still terminates. Catch on the INNER request and only that request is sacrificed.',
    },
  ],
  contextArtefacts: [
    {
      id: 'dead-search',
      type: 'code',
      title: 'The fix that did not fix it',
      language: 'ts',
      content:
        "readonly results$ = this.query$.pipe(\n  switchMap((q) => this.api.search(q)),\n  catchError(() => of([]))\n);\n// one 500 → results$ completes → box dead until refresh",
    },
  ],
  challenges: [
    {
      id: 'rx-006-c1',
      type: 'multiple-choice',
      title: 'Why the Box Died',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'The artefact HAS a catchError — yet the box still dies after one failure. Explain it.',
      prompt: 'What actually happens on the first 500?',
      options: [
        {
          id: 'a',
          label:
            'The error reaches the outer pipe; catchError replaces the WHOLE stream with of([]), which emits once and completes — query$ is no longer listened to.',
          isCorrect: true,
          feedback:
            'Exactly: catchError swaps in the fallback stream at the level it sits. Outer level = outer funeral.',
        },
        {
          id: 'b',
          label: 'of([]) is asynchronous, so the empty result arrives too late to keep the stream alive.',
          isCorrect: false,
          feedback:
            'of() emits synchronously — timing is not the issue; the swap-and-complete semantics are.',
        },
        {
          id: 'c',
          label: 'switchMap swallows errors from inner Observables, so the catchError never fires at all.',
          isCorrect: false,
          feedback:
            'switchMap forwards inner errors outward — that forwarding is precisely how the outer stream got killed.',
        },
        {
          id: 'd',
          label: 'catchError only handles HttpErrorResponse; a 500 arrives as a different error type.',
          isCorrect: false,
          feedback:
            'catchError catches anything thrown or errored — the type of the error never decides whether it fires.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'catchError returns a REPLACEMENT stream. Replacement for what, here?' },
        {
          level: 2,
          title: 'Concept',
          content: 'An error travels up until caught; whatever pipe level catches it is the level that gets replaced.',
        },
        { level: 3, title: 'Specific clue', content: 'After of([]) completes, who is still subscribed to query$? Nobody.' },
        { level: 4, title: 'Guided solution', content: 'Choose the outer-replacement explanation.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Death explained' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The “fixed” search box kept dying quietly after transient API errors.',
        },
      ],
      helpLinks: [{ topicId: 'rx.operators', label: 'RxJS operators' }],
      successFeedback: 'Streams end where errors are caught — you found the level that died.',
      failureFeedback: 'Ask WHAT catchError replaced. The fallback emitted fine — then what completed?',
    },
    {
      id: 'rx-006-c2',
      type: 'multiple-choice',
      title: 'Catch at the Right Level',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'Rewrite so one failed request yields an empty result — and the NEXT keystroke searches again.',
      prompt: 'Which pipe survives per-request failures?',
      options: [
        {
          id: 'a',
          label:
            'query$.pipe(\n  retry(Infinity),\n  switchMap((q) => this.api.search(q))\n)',
          isCorrect: false,
          feedback:
            'retry resubscribes after the outer stream errors — an infinite hammer that replays requests and still loses in-flight state.',
        },
        {
          id: 'b',
          label:
            'query$.pipe(\n  switchMap((q) => this.api.search(q).pipe(\n    catchError(() => of([]))\n  ))\n)',
          isCorrect: true,
          feedback:
            'The catch rides the INNER request: a 500 becomes an empty page, the inner stream completes, and the outer keeps listening.',
        },
        {
          id: 'c',
          label:
            'query$.pipe(\n  switchMap((q) => this.api.search(q)),\n  catchError((e) => { console.error(e); return of([]); })\n)',
          isCorrect: false,
          feedback:
            'Logging does not move the catch — it is still on the outer pipe, and the box still dies (now with a console entry).',
        },
        {
          id: 'd',
          label:
            'Wrap the subscribe callback in try/catch — errors in streams are just exceptions underneath.',
          isCorrect: false,
          feedback:
            'Stream errors arrive through the error channel, not as thrown exceptions in next — try/catch never sees them.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which stream can you afford to lose? Only the single request.' },
        {
          level: 2,
          title: 'Concept',
          content: 'Put catchError inside the switchMap projection, on the inner Observable itself.',
        },
        { level: 3, title: 'Specific clue', content: 'The correct option has a pipe INSIDE the switchMap.' },
        { level: 4, title: 'Guided solution', content: 'Choose the inner catchError returning of([]).' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Failure contained' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The outer-level catch pattern was copied to three other request pipes.',
        },
      ],
      helpLinks: [{ topicId: 'rx.operators', label: 'RxJS operators' }],
      successFeedback: 'Sacrifice the request, save the feature — the catch is finally standing in the right place.',
      failureFeedback: 'The fallback must replace the INNER request only. Find the pipe inside the projection.',
    },
  ],
  reflectionPrompt: 'For each catchError you own: what exactly does its fallback replace?',
  rewards: [{ type: 'xp', amount: 10, label: 'Errors contained' }],
};
