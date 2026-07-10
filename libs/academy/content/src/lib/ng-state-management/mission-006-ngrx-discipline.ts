import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — NgRx discipline: actions as events not commands, pure
 * reducers, effects at the edge — and the review that keeps them honest.
 */
export const fnSt006NgrxDiscipline: MissionDefinition = {
  id: 'st-006-ngrx-discipline',
  campaignId: 'ng-state-management',
  title: 'Events, Not Commands',
  summary:
    'The log is only worth its ceremony if actions record what happened, reducers stay pure folds, and effects keep the world at the edge.',
  difficulty: 'medium',
  learningObjectives: [
    'Name actions as past-tense events with source context',
    'Keep reducers pure — no I/O, no mutation, no randomness',
    'Review a store slice for command-actions and impure folds',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session six was for the team that already HAS NgRx — the dispatch board crew brought their slice for a public audit. Brave, and worth it.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The audit found the usual erosion. Actions named like commands — setOrders, updateFilter — which turn the event log into a remote control. And a reducer calling Date.now(), which quietly breaks replay: fold the same log twice, get two different states. The disciplines are not style; they are what keeps the log a log.',
    },
  ],
  contextArtefacts: [
    {
      id: 'event-vs-command',
      type: 'code',
      title: 'From the audit slide',
      language: 'ts',
      content:
        "// COMMANDS (remote control — who wanted this? why?)\ncreateAction('[Orders] Set Orders')\ncreateAction('[Orders] Update Filter')\n\n// EVENTS (facts with provenance)\ncreateAction('[Orders API] Orders Loaded Successfully')\ncreateAction('[Order List] Status Filter Changed')\n// the reducer decides what a fact MEANS; many effects can react to one fact",
    },
  ],
  challenges: [
    {
      id: 'st-006-c1',
      type: 'multiple-choice',
      title: 'Why Past Tense Matters',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'A dispatch-board dev pushes back: “setOrders and ordersLoaded dispatch the same payload to the same reducer — the name is cosmetic.”',
      prompt: 'What does event-naming actually change?',
      options: [
        {
          id: 'a',
          label: 'Only the devtools display — past-tense names read better in the log but carry no structural difference.',
          isCorrect: false,
          feedback:
            'The log-reading experience matters, but the structural difference is real: it changes who is allowed to decide state.',
        },
        {
          id: 'b',
          label:
            'Commands centralise the DECISION in the dispatcher: setOrders means some component already decided the new state, reducing the reducer to an assignment and the log to a list of overwrites. Events record what happened and let the REDUCER own what it means — so one fact can update orders, reset retry counters and bump metrics, and the log reads as history instead of a remote control.',
          isCorrect: true,
          feedback:
            'Naming is architecture here: events keep decisions in reducers (testable, in one place) and make the log answer “what happened” — the entire reason the machinery was bought.',
        },
        {
          id: 'c',
          label: 'Type safety — past-tense factory names generate narrower payload types.',
          isCorrect: false,
          feedback: 'Payload types are identical either way — the tense changes semantics, not typings.',
        },
        {
          id: 'd',
          label: 'Performance — event actions batch better in the devtools serialiser.',
          isCorrect: false,
          feedback: 'No serialisation difference exists — the cost of commands is architectural, not computational.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Ask WHERE the “what should state become” decision lives under each naming.' },
        { level: 2, title: 'Concept', content: 'Events: reducers decide meaning. Commands: dispatchers decide, reducers obey.' },
        { level: 3, title: 'Specific clue', content: 'Read a log of ten setOrders. Now ten ordersLoaded/orderCancelled/…. Which explains the bug?' },
        { level: 4, title: 'Guided solution', content: 'Pick the decision-placement answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Tense defended' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'Command-actions spread; six months later the “event log” was a list of set calls nobody could reconstruct a bug from.',
        },
      ],
      helpLinks: [{ topicId: 'state.when-ngrx', label: 'When NgRx' }],
      successFeedback: 'The name places the decision — events keep the log a history and the reducer a brain.',
      failureFeedback: 'Debug from each log: “setOrders(…)” × 10 versus a sequence of named facts. Which tells you what went wrong?',
    },
    {
      id: 'st-006-c2',
      type: 'code-review',
      title: 'Audit the Slice',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'The dispatch board’s orders slice, as submitted for the public audit.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'orders-slice',
          type: 'code',
          title: 'orders.reducer.ts + effect (submitted)',
          language: 'ts',
          content:
            "on(orderAssigned, (state, { orderId, driverId }) => {\n  const order = state.orders.find((o) => o.id === orderId);\n  order.driverId = driverId; // found it, assign it\n  return { ...state, lastAssignmentAt: Date.now() };\n});\n\non(ordersLoaded, (state, { orders, loadedAt }) => ({ ...state, orders, loadedAt }));\n\nassignOrder$ = createEffect(() =>\n  this.actions$.pipe(\n    ofType(orderAssigned),\n    switchMap(({ orderId, driverId }) => this.api.assign(orderId, driverId)),\n    map(() => assignmentPersisted())\n  )\n);",
        },
      ],
      findings: [
        {
          id: 'reducer-mutation',
          label:
            'The orderAssigned reducer MUTATES the found order in place (order.driverId = driverId) — the state “update” keeps the old array and object references, so memoised selectors and OnPush components sleep through the assignment',
          isCorrect: true,
          feedback:
            'The signals equality lesson at store scale: reducers return NEW state built immutably — map the array, spread the changed order. In-place writes make the fold a lie the UI cannot see.',
        },
        {
          id: 'reducer-datenow',
          label:
            'Date.now() inside the reducer makes the fold impure — replaying the same action log yields different states, breaking time-travel and replay-based debugging; timestamps belong ON the action when it is created',
          isCorrect: true,
          feedback:
            'A reducer must be a pure function of (state, action) — same inputs, same state, forever. Clock reads happen where facts are born (the action creator or effect), so the fact carries its time.',
        },
        {
          id: 'effect-switchmap',
          label: 'The effect uses switchMap — a second rapid assignment cancels the first API call mid-flight, but assignment persistence must never be cancelled: this needs concatMap/mergeMap',
          isCorrect: false,
          feedback:
            'A real design discussion — but not this audit’s defect: re-assigning the same order arguably SHOULD supersede the in-flight call, and either flattening choice can be defended. Cancellation semantics are a conversation; the two purity breaks are violations.',
        },
        {
          id: 'loaded-spread',
          label: 'ordersLoaded replaces the whole orders array in one spread — it should merge order-by-order to preserve references for unchanged orders',
          isCorrect: false,
          feedback:
            'Replacing the collection on a fresh load is the normal, correct fold — reference-preserving merges are an optimisation with real complexity cost, not a requirement. Note this line also does timestamps RIGHT: loadedAt arrives on the action, keeping the reducer pure.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Audit the reducers for the two purity laws: no mutation, no ambient inputs.' },
        { level: 2, title: 'Concept', content: 'Pure fold: new references for changed paths, no clocks, no I/O.' },
        { level: 3, title: 'Specific clue', content: 'Replay the log twice in your head — which line gives two different answers?' },
        { level: 4, title: 'Guided solution', content: 'Flag the in-place mutation and the Date.now().' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Slice audited' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Assignments “saved but not shown” — the board’s flagship feature undermined by a reference the UI never saw change.',
        },
      ],
      helpLinks: [
        { topicId: 'state.when-ngrx', label: 'When NgRx' },
        { topicId: 'fp.pure-functions', label: 'Pure functions' },
      ],
      successFeedback: 'Purity audited where it is load-bearing — the log stays replayable and the UI stays awake.',
      failureFeedback: 'Two findings are purity breaks with production symptoms; two are design debates. Sort them.',
    },
  ],
  reflectionPrompt: 'Open our action log (or store method list): how many entries are commands in disguise — and could you reconstruct yesterday’s incident from what remains?',
  rewards: [{ type: 'xp', amount: 10, label: 'Log honest' }],
};
