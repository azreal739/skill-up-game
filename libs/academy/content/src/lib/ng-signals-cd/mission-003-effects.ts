import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — effects (knowledge pack 03: effects are for side effects —
 * logging, storage, non-Angular integration; deriving state in an effect is
 * the classic misuse, total = price * quantity belongs in computed).
 */
export const fnSig003Effects: MissionDefinition = {
  id: 'sig-003-effects',
  campaignId: 'ng-signals-cd',
  title: 'Effects at the Edge',
  summary:
    'effect() runs when the signals it reads change — reserve it for side effects, never for deriving state.',
  difficulty: 'easy',
  learningObjectives: [
    'Identify which jobs genuinely belong in an effect',
    'Spot derived-state-in-an-effect and convert it to computed',
    'Explain why an effect-set value is a second source of truth',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session three drew a border on the whiteboard: inside it, signals and computed — pure state. Outside it, the world: localStorage, analytics, the console. effect() is the border crossing.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The test we agreed on: if the lambda produces a VALUE the app needs, it is a computed. If it makes something happen elsewhere, it is an effect. Logging a change — effect. total from price × quantity — computed, always.',
    },
  ],
  contextArtefacts: [
    {
      id: 'effect-border',
      type: 'code',
      title: 'From the session — one of each, done right',
      language: 'ts',
      content:
        "readonly total = computed(() => this.price() * this.quantity());\n\nconstructor() {\n  effect(() => {\n    localStorage.setItem('theme', this.theme());\n  });\n}",
    },
  ],
  challenges: [
    {
      id: 'sig-003-c1',
      type: 'multiple-choice',
      title: 'Which Job Crosses the Border',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext: 'Four tickets on the board. Only one of them should become an effect.',
      prompt: 'Which job belongs in effect()?',
      options: [
        {
          id: 'a',
          label: 'Compute the order total whenever price or quantity changes.',
          isCorrect: false,
          feedback: 'The session’s own example of the misuse: a value the app renders is a computed, full stop.',
        },
        {
          id: 'b',
          label: 'Keep a filtered view of the products list in sync with the search box.',
          isCorrect: false,
          feedback: 'A filtered list is derived state — computed(() => …filter…), no effect required.',
        },
        {
          id: 'c',
          label: 'Format the selected date for display in the header.',
          isCorrect: false,
          feedback: 'Formatting is a pure derivation of the date signal — computed (or a pure pipe).',
        },
        {
          id: 'd',
          label: 'Persist the chosen theme to localStorage whenever it changes.',
          isCorrect: true,
          feedback:
            'Writing to storage is the world outside the graph — exactly what effect() exists for. The other three all produce values.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Apply the session test: value the app needs, or something happening elsewhere?' },
        { level: 2, title: 'Concept', content: 'Effects are for logging, storage sync, analytics, non-Angular integration.' },
        { level: 3, title: 'Specific clue', content: 'Three tickets end with a value on screen. One ends outside the app.' },
        { level: 4, title: 'Guided solution', content: 'Pick the localStorage ticket.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Border drawn' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Derivations written as effects spread through the feature — every one a sync bug in waiting.',
        },
      ],
      helpLinks: [{ topicId: 'signals.effects', label: 'Effects' }],
      successFeedback: 'Values inside, actions at the edge — the border holds.',
      failureFeedback: 'For each ticket ask: does the app RENDER the result, or does the result leave the app?',
    },
    {
      id: 'sig-003-c2',
      type: 'multiple-choice',
      title: 'The Effect That Should Be a Computed',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'A PR lands: total is a writable signal, kept current by effect(() => this.total.set(this.price() * this.qty())).',
      prompt: 'It renders the right numbers in the demo. What is actually wrong?',
      options: [
        {
          id: 'a',
          label: 'Nothing structural — but the effect should also read shipping cost before setting total.',
          isCorrect: false,
          feedback: 'Adding dependencies deepens the hole. The structure itself — derive-by-writing — is the defect.',
        },
        {
          id: 'b',
          label:
            'total is now a second, writable source of truth that updates a beat late: any code can set it to anything, and readers can observe the stale value between change and effect run. computed(() => price() * qty()) makes drift impossible.',
          isCorrect: true,
          feedback:
            'The session verdict, verbatim: deriving state in an effect recreates the 4-vs-5 dashboard bug with extra steps. Effects act; computed derives.',
        },
        {
          id: 'c',
          label: 'Effects are forbidden from calling set on any signal — this fails at runtime.',
          isCorrect: false,
          feedback:
            'Writing OTHER state from an effect is legal and sometimes right — what is wrong here is manufacturing derived state that computed derives for free.',
        },
        {
          id: 'd',
          label: 'The multiplication should live in the template so change detection keeps it current.',
          isCorrect: false,
          feedback: 'That trades a sync bug for a re-runs-every-cycle template expression — mission 5 has opinions about those.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The numbers are right today. Ask what ELSE can write total tomorrow.' },
        { level: 2, title: 'Concept', content: 'An effect-set value is writable, late, and trusting — a computed is none of those.' },
        { level: 3, title: 'Specific clue', content: 'Between qty changing and the effect running, what does total hold?' },
        { level: 4, title: 'Guided solution', content: 'Choose the second-source-of-truth answer with the computed fix.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Derivation reclaimed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'A checkout flow read total in the stale window and charged the pre-update amount.',
        },
      ],
      helpLinks: [
        { topicId: 'signals.effects', label: 'Effects' },
        { topicId: 'signals.computed', label: 'Computed signals' },
      ],
      successFeedback: 'You can now smell derive-by-writing from across a PR. That nose earns its keep.',
      failureFeedback: 'Compare guarantees: what does computed promise that a writable-plus-effect cannot?',
    },
  ],
  reflectionPrompt: 'Which effect in our codebase produces a value something else renders — a computed wearing a disguise?',
  rewards: [{ type: 'xp', amount: 10, label: 'Edges only' }],
};
