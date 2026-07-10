import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — Observables as streams (knowledge pack 03: "an Observable is
 * a producer of values over time"; mistakes: thinking it is a value,
 * forgetting it is lazy until subscribed).
 */
export const fnRx001Streams: MissionDefinition = {
  id: 'rx-001-streams-not-values',
  campaignId: 'rxjs-reactive',
  title: 'Streams, Not Values',
  summary:
    'The mental model the whole session hinged on: an Observable produces values over time — and does nothing until someone subscribes.',
  difficulty: 'intro',
  learningObjectives: [
    'Read Observable<User[]> as emissions over time',
    'Explain laziness: no subscriber, no work',
    'Use the $ naming convention to keep streams visible',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'The RxJS session started with the question that trips everyone: users$ — what IS that? Not users. Not a promise of users. A producer that will emit user arrays over time, each time something changes.',
    },
    {
      speaker: 'Team Lead',
      text: 'And the twin surprise: an Observable is lazy. Build the fanciest pipeline you like — until something subscribes, not one line of it runs.',
    },
  ],
  contextArtefacts: [
    {
      id: 'users-stream',
      type: 'code',
      title: 'From the session slides',
      language: 'ts',
      content:
        'const users$: Observable<User[]> = this.api.getUsers();\n\nconst loud$ = users$.pipe(\n  map((users) => users.filter((u) => u.active))\n);\n// …no network request has happened yet.',
    },
  ],
  challenges: [
    {
      id: 'rx-001-c1',
      type: 'multiple-choice',
      title: 'What Is users$?',
      difficulty: 'intro',
      tags: ['angular', 'typescript'],
      storyContext:
        'A teammate writes users$.length, expecting the number of users. The compiler objects.',
      prompt: 'What does users$: Observable<User[]> actually represent?',
      options: [
        {
          id: 'a',
          label: 'The current array of users, fetched when the file loaded.',
          isCorrect: false,
          feedback:
            'That is the exact confusion the session opened with — users$ is not a value you can index into.',
        },
        {
          id: 'b',
          label:
            'A stream that, once subscribed, emits User[] values over time — possibly many, possibly none yet.',
          isCorrect: true,
          feedback:
            'Emissions over time, starting at subscription — the mental model everything else builds on.',
        },
        {
          id: 'c',
          label: 'A Promise<User[]> with a different name and the same behaviour.',
          isCorrect: false,
          feedback:
            'Promises settle once; streams can emit many times, be cancelled, retried and composed — different animal.',
        },
        {
          id: 'd',
          label: 'A configuration object the HTTP client reads to know which endpoint to call.',
          isCorrect: false,
          feedback:
            'It is the producer itself, not its configuration — subscribing is what triggers the call.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Ask “what does this stream emit?”, never “what is this value?”' },
        {
          level: 2,
          title: 'Concept',
          content: 'Observable<T> is a producer of T values over time; the $ suffix marks it as a stream.',
        },
        { level: 3, title: 'Specific clue', content: 'A promise settles exactly once. Can users$ emit again after a refresh?' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Pick the emissions-over-time option — many values, starting when subscribed.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Stream understood' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The value-vs-stream confusion resurfaced in review after review.',
        },
      ],
      helpLinks: [{ topicId: 'rx.observables', label: 'Observables' }],
      successFeedback: 'What does it emit, and when — you are asking the right questions now.',
      failureFeedback: 'Replace “what is this value” with “what does this stream emit over time”.',
    },
    {
      id: 'rx-001-c2',
      type: 'multiple-choice',
      title: 'The Pipeline That Never Ran',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'A teammate adds tap(() => audit.log("fetched")) to loud$ in the artefact — and the log line never appears.',
      prompt: 'Why is nothing logged?',
      options: [
        {
          id: 'a',
          label: 'tap is a side-effect operator, and RxJS strips side effects in production builds.',
          isCorrect: false,
          feedback: 'RxJS strips nothing — tap runs fine, but only when the stream actually runs.',
        },
        {
          id: 'b',
          label: 'The map before it filtered out every emission, so tap had nothing to observe.',
          isCorrect: false,
          feedback:
            'map transforms — it never removes emissions. And even a filter would not explain zero pipeline activity.',
        },
        {
          id: 'c',
          label: 'audit.log must be registered as an Angular provider before operators may call it.',
          isCorrect: false,
          feedback: 'Operators call plain functions — no registration involved.',
        },
        {
          id: 'd',
          label: 'Nothing has subscribed to loud$ — an Observable is lazy, so the pipeline has never executed.',
          isCorrect: true,
          feedback:
            'Laziness in one sentence: no subscriber, no request, no tap, no log. Subscription is the on-switch.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Search the artefact for a subscribe (or an async pipe). Find one?' },
        {
          level: 2,
          title: 'Concept',
          content: 'Cold Observables run their producer once per subscription — and zero times for zero subscriptions.',
        },
        { level: 3, title: 'Specific clue', content: 'The comment under the artefact already told you: no request yet.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose the laziness option — the pipeline is defined but has never been switched on.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Laziness learned' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'An “obviously running” audit pipeline silently never executed.',
        },
      ],
      helpLinks: [{ topicId: 'rx.observables', label: 'Observables' }],
      successFeedback: 'Define, then subscribe — you know where the on-switch is.',
      failureFeedback: 'Pipelines are recipes. Who, in this code, ever started cooking?',
    },
  ],
  reflectionPrompt: 'Say aloud what your most-used stream at work emits, and when it stops.',
  rewards: [{ type: 'xp', amount: 5, label: 'Reactive footing' }],
};
