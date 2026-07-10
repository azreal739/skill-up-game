import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — when NgRx: the actions/reducers/selectors model, what it
 * buys, and the honest decision criteria versus the house store.
 */
export const fnSt005WhenNgrx: MissionDefinition = {
  id: 'st-005-when-ngrx',
  campaignId: 'ng-state-management',
  title: 'When the Machinery Earns Itself',
  summary:
    'NgRx trades ceremony for an event log: actions describe what happened, reducers compute what is, selectors expose it — worth it when the questions demand it.',
  difficulty: 'medium',
  learningObjectives: [
    'Describe the action → reducer → selector cycle accurately',
    'Name what the event-log model buys over direct mutation',
    'Apply honest criteria for choosing NgRx over the house store',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session five — the referee session. I banned the phrases “NgRx is bloated” and “signals don’t scale” at the door, and made both camps articulate the OTHER side’s best case.',
    },
    {
      speaker: 'Senior Dev',
      text: 'NgRx in one breath: components dispatch ACTIONS — past-tense facts like orderSubmitted. REDUCERS are pure functions folding each action into new state. SELECTORS are the read side. The house store answers “what is the state?”; the action log also answers “what HAPPENED, in what order, dispatched by whom?” — pay the ceremony only when you need the second question answered.',
    },
  ],
  contextArtefacts: [
    {
      id: 'ngrx-cycle',
      type: 'code',
      title: 'The cycle, minimal',
      language: 'ts',
      content:
        "// action — a fact, past tense\nexport const orderSubmitted = createAction('[Checkout] Order Submitted', props<{ order: Order }>());\n\n// reducer — pure fold: (state, fact) → state\non(orderSubmitted, (state, { order }) => ({ ...state, pending: [...state.pending, order] }))\n\n// selector — the read side\nexport const selectPendingCount = createSelector(selectOrders, (s) => s.pending.length);",
    },
  ],
  challenges: [
    {
      id: 'st-005-c1',
      type: 'multiple-choice',
      title: 'What the Log Buys',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'The signals camp asks their honest question: “our house store also has one writer and named methods — what does dispatch/reduce ADD?”',
      prompt: 'What does the action model genuinely add over named store methods?',
      options: [
        {
          id: 'a',
          label: 'Purity — store methods can have side effects while reducers cannot, making NgRx state transitions testable.',
          isCorrect: false,
          feedback:
            'House-store methods can be kept just as pure by discipline — purity is available in both; only one ENFORCES a log.',
        },
        {
          id: 'b',
          label: 'Performance — memoised selectors recompute less than computed signals on large state trees.',
          isCorrect: false,
          feedback: 'Both memoise; neither wins categorically. The differentiator is not speed.',
        },
        {
          id: 'c',
          label:
            'Actions as data: every change is a serialisable fact that EXISTS — so the devtools show the full history (time-travel debugging), many features can react to one fact without the dispatcher knowing them, and “what happened before the bug” is a scrollable log instead of a reconstruction.',
          isCorrect: true,
          feedback:
            'The method call vanishes after it runs; the action persists as data. History, decoupled reactions, replay — everything NgRx buys flows from changes-as-facts.',
        },
        {
          id: 'd',
          label: 'Type safety — createAction generates types that plain method signatures cannot express.',
          isCorrect: false,
          feedback: 'A typed method signature is at least as safe — the generated types serve the log, they do not surpass methods.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'A method call happens and is gone. What is an action after it is dispatched?' },
        { level: 2, title: 'Concept', content: 'Changes as serialisable facts → history, replay, many-listeners.' },
        { level: 3, title: 'Specific clue', content: 'What exactly do the devtools SHOW that a store cannot?' },
        { level: 4, title: 'Guided solution', content: 'Pick actions-as-data with its three consequences.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Log valued' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'The camps kept arguing slogans — the next architecture decision was made by whoever spoke loudest.',
        },
      ],
      helpLinks: [{ topicId: 'state.when-ngrx', label: 'When NgRx' }],
      successFeedback: 'Facts that persist versus calls that vanish — the real difference, stated fairly.',
      failureFeedback: 'Steelman it: what question can the action log answer that the store’s method list cannot?',
    },
    {
      id: 'st-005-c2',
      type: 'multiple-choice',
      title: 'The Decision, Applied',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Two real features on the table. A: the notification preferences page — one form, one API, one team. B: the live dispatch board — 6 widgets react to driver/vehicle/order events from 3 teams’ features, ops demands an audit trail of every state change, and QA replays production incidents from logs.',
      prompt: 'Where does the machinery earn itself?',
      options: [
        {
          id: 'a',
          label:
            'B and only B: many independent writers, cross-team event flows, an audit requirement and replay-from-log are exactly the questions the action log answers. A is a house store (arguably component state) — NgRx there is ceremony with no question to answer.',
          isCorrect: true,
          feedback:
            'The criteria doing their job: the dispatch board NEEDS what-happened-in-order; the preferences form only needs what-is. Per-feature decisions, not app-wide dogma.',
        },
        {
          id: 'b',
          label: 'Both — mixing state approaches in one app costs more than either approach; consistency wins.',
          isCorrect: false,
          feedback:
            '“Consistency” here means every one-form feature pays the dispatch board’s tax forever. The store boundary is per feature-slice by design — mixing is the intended usage.',
        },
        {
          id: 'c',
          label: 'Neither — signals handle both; the audit trail can be an effect appending store changes to a log array.',
          isCorrect: false,
          feedback:
            'The hand-built log re-implements NgRx’s core artefact without its guarantees — no action types, no replay tooling, and every store must remember to append. B’s requirements ARE the buy signal.',
        },
        {
          id: 'd',
          label: 'A and only A — small features are safe places to learn NgRx; the dispatch board is too critical for heavy machinery.',
          isCorrect: false,
          feedback:
            'Machinery inverted: the critical, many-writer, audited feature is precisely where the guarantees pay, and the learning-exercise store on a form is how 1,900-line files start.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each feature: does anyone need to know WHAT HAPPENED, or only WHAT IS?' },
        { level: 2, title: 'Concept', content: 'Buy signals: many writers, cross-feature reactions, audit, replay.' },
        { level: 3, title: 'Specific clue', content: '“QA replays production incidents” is the strongest single tell in the brief.' },
        { level: 4, title: 'Guided solution', content: 'B only.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Decision made' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'All-or-nothing won: every feature got actions and reducers, and the preferences form took three files per field.',
        },
      ],
      helpLinks: [
        { topicId: 'state.when-ngrx', label: 'When NgRx' },
        { topicId: 'state.signal-store', label: 'Signal stores' },
      ],
      successFeedback: 'Tools matched to questions, per feature — the referee session’s whole point.',
      failureFeedback: 'List B’s requirements one by one and ask which a house store answers. Then do the same for A.',
    },
  ],
  reflectionPrompt: 'Which of our features genuinely needs “what happened, in order” — and which are paying for that answer without ever asking the question?',
  rewards: [{ type: 'xp', amount: 10, label: 'Machinery priced' }],
};
