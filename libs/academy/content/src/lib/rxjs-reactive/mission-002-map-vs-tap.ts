import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — map vs tap (knowledge pack 07: "Using tap to transform data"
 * — tap ignores returned values; map changes data, tap observes it).
 */
export const fnRx002MapVsTap: MissionDefinition = {
  id: 'rx-002-map-vs-tap',
  campaignId: 'rxjs-reactive',
  title: 'map Changes, tap Observes',
  summary:
    'The session’s most-repeated correction: tap ignores whatever you return. Transformations belong in map.',
  difficulty: 'easy',
  learningObjectives: [
    'Transform emissions with map',
    'Reserve tap for side effects only',
    'Diagnose the silent tap-return bug',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'The bug we chased for an hour: a tap that returned a beautifully transformed object — which RxJS silently threw away. tap receives values; it never changes what flows on.',
    },
    {
      speaker: 'Team Lead',
      text: 'The phrase that stuck: map changes data, tap observes data. Say it before every pipe you write this week.',
    },
  ],
  contextArtefacts: [
    {
      id: 'tap-bug',
      type: 'code',
      title: 'The hour-long bug, as merged',
      language: 'ts',
      content:
        "readonly prices$ = this.api.prices$.pipe(\n  tap((p) => ({ ...p, amount: p.amount * 1.15 })),\n);\n// downstream still sees untaxed prices…",
    },
  ],
  challenges: [
    {
      id: 'rx-002-c1',
      type: 'multiple-choice',
      title: 'Fix the Silent tap',
      difficulty: 'easy',
      tags: ['angular', 'typescript'],
      storyContext: 'Downstream must receive taxed prices. Repair the pipe from the artefact.',
      prompt: 'Which pipe delivers taxed prices downstream?',
      options: [
        {
          id: 'a',
          label: 'this.api.prices$.pipe(\n  map((p) => ({ ...p, amount: p.amount * 1.15 }))\n)',
          isCorrect: true,
          feedback:
            'map collects your returned value into the stream — the transformation finally leaves the building.',
        },
        {
          id: 'b',
          label: 'this.api.prices$.pipe(\n  tap((p) => { p.amount = p.amount * 1.15; })\n)',
          isCorrect: false,
          feedback:
            'It “works” by mutating the shared object — the campaign-2 leak smuggled into a stream. Downstream and every other subscriber now share spooky state.',
        },
        {
          id: 'c',
          label: 'this.api.prices$.pipe(\n  tap((p) => ({ ...p, amount: p.amount * 1.15 })),\n  tap((p) => p)\n)',
          isCorrect: false,
          feedback: 'Two taps ignore two return values — twice the ceremony, same missing tax.',
        },
        {
          id: 'd',
          label: 'Subscribe early, transform in the subscription, and re-emit with a Subject.',
          isCorrect: false,
          feedback:
            'A subject relay for a one-line transform adds state and a leak surface where one operator would do.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which operator’s contract is “returned value flows on”?' },
        {
          level: 2,
          title: 'Concept',
          content: 'map emits what you return; tap runs your function and forwards the ORIGINAL value.',
        },
        { level: 3, title: 'Specific clue', content: 'Beware the mutating “fix” — it changes objects other code holds.' },
        { level: 4, title: 'Guided solution', content: 'Replace tap with map and keep the spread copy.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Transformation restored' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Untaxed prices reached checkout while the transform died inside a tap.',
        },
      ],
      helpLinks: [{ topicId: 'rx.operators', label: 'RxJS operators' }],
      successFeedback: 'map changes data — and now it actually does.',
      failureFeedback: 'tap forwards the original value no matter what you return. Which operator does not?',
    },
    {
      id: 'rx-002-c2',
      type: 'multiple-choice',
      title: 'A Legitimate tap',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'Same pipe, new requirement: log every price emission to telemetry WITHOUT changing what subscribers receive.',
      prompt: 'Where does the logging belong?',
      options: [
        {
          id: 'a',
          label: 'In map: map((p) => { telemetry.log(p); return p; }) — one operator does both jobs.',
          isCorrect: false,
          feedback:
            'It works, but hides a side effect inside a transformer — the next reader trusts map to be pure and misses the logging entirely.',
        },
        {
          id: 'b',
          label: 'Nowhere in the pipe — logging must happen in subscribe, or not at all.',
          isCorrect: false,
          feedback:
            'subscribe works for the final consumer, but a mid-pipe observation point is exactly what tap provides.',
        },
        {
          id: 'c',
          label: 'In tap: tap((p) => telemetry.log(p)) — observe the emission, forward it untouched.',
          isCorrect: true,
          feedback:
            'The one job tap is for: a side effect on the way past, with the stream’s data untouched.',
        },
        {
          id: 'd',
          label: 'In filter: filter((p) => { telemetry.log(p); return true; }) — it runs per emission too.',
          isCorrect: false,
          feedback:
            'A filter that always passes is a tap in a trench coat — it misstates intent to everyone who reads it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'You want observation without transformation.' },
        {
          level: 2,
          title: 'Concept',
          content: 'Side effects mid-stream (logging, metrics, debugging) are tap’s entire purpose.',
        },
        { level: 3, title: 'Specific clue', content: 'Reject anything that hides the side effect inside another operator’s contract.' },
        { level: 4, title: 'Guided solution', content: 'Choose the tap that calls telemetry.log and returns nothing.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Side effect placed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Side effects hidden inside map made every transformer suspect in review.',
        },
      ],
      helpLinks: [{ topicId: 'rx.operators', label: 'RxJS operators' }],
      successFeedback: 'Observation in tap, transformation in map — each operator says what it does.',
      failureFeedback: 'Intent matters: which operator TELLS the reader “side effect here, data unchanged”?',
    },
  ],
  reflectionPrompt: 'Finish the mantra and keep it: “map changes data, tap ___ data.”',
  rewards: [{ type: 'xp', amount: 5, label: 'Mantra earned' }],
};
