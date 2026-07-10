import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — the project board: one feature containing all four
 * state kinds, designed, reviewed and signed off with the block's matrix.
 */
export const fnSt009BossProjectBoard: MissionDefinition = {
  id: 'st-009-boss-project-board',
  campaignId: 'ng-state-management',
  title: 'Boss: The Project Board',
  summary:
    'The kanban board holds every state kind at once — sort each piece into its home, review the build, and sign the architecture.',
  difficulty: 'boss',
  learningObjectives: [
    'Partition a real feature across all four state kinds',
    'Review a mixed state implementation against the block',
    'Sign off a state architecture argued from the matrix',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The block finale: the project board — our kanban. Columns of task cards, drag to move, a filter bar, a detail drawer. It has died twice in rewrites because ALL its state went into whatever store was fashionable that year. This time we sort first.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The sheet: tasks are server truth with optimistic drag moves that survive failure honestly; filters shareable by link; the drawer’s open/closed is nobody’s business but the board’s; totals per column derived, never stored; and ops wants drag moves auditable — who moved what where, replayable.',
    },
  ],
  contextArtefacts: [
    {
      id: 'board-sheet',
      type: 'code',
      title: 'The project board requirements sheet',
      language: 'text',
      content:
        '1. tasks: server-owned; board shows a cache with staleness + invalidation rules\n2. drag moves: optimistic — instant on screen, honest rollback on API failure\n3. filter bar: shareable via link, survives refresh\n4. drawer open/expanded panels: local, dies with the board\n5. per-column counts/WIP totals: derived, never stored\n6. drag moves auditable: who, what, where, in order — replayable for ops',
    },
  ],
  challenges: [
    {
      id: 'st-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Sort the State',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'Six sheet lines, four state kinds. Choose the partition.',
      prompt: 'Which architecture matches the sheet?',
      options: [
        {
          id: 'a',
          label: 'Everything in one NgRx store — line 6 demands actions anyway, and splitting state kinds across mechanisms fragments the feature.',
          isCorrect: false,
          feedback:
            'Line 6 buys actions for the MOVES — not for the drawer boolean (line 4 wants it local and mortal) or the filters (line 3 wants them in the URL, which the store cannot share by link).',
        },
        {
          id: 'b',
          label: 'Everything in signals — a board store with tasks, filters, drawer and an audit array of moves appended by an effect.',
          isCorrect: false,
          feedback:
            'The hand-rolled audit array is mission 5’s trap: a log without action types, replay tooling or provenance. And URL-shareable filters (line 3) cannot live in a signal alone.',
        },
        {
          id: 'c',
          label:
            'By kind: task data as a Remote<T> cache (invalidation on mutations); drag moves dispatched as NgRx actions on a board slice — taskMoved facts giving ops its replayable log, with optimistic reducer + rollback action; filters in query params; drawer state as component signals; counts as computed/selectors only.',
          isCorrect: true,
          feedback:
            'Six lines, four kinds, each in its native home — and NgRx bought for exactly the slice whose question (auditable, replayable moves) justifies it.',
        },
        {
          id: 'd',
          label: 'Split by data source: one store for API data, one for user input, one for UI — three stores with a coordinator service.',
          isCorrect: false,
          feedback:
            '“Source” is not the matrix’s axis — this puts shareable filters and the private drawer in the same “user input” store, satisfying neither line 3 nor line 4, plus a coordinator to keep three stores agreeing.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Sort each sheet line into a state kind BEFORE reading the options.' },
        { level: 2, title: 'Concept', content: 'Kinds don’t share homes: URL, component, cache shape, and a log-worthy slice.' },
        { level: 3, title: 'Specific clue', content: 'Line 6 is the only line that buys NgRx — and it buys it for one slice.' },
        { level: 4, title: 'Guided solution', content: 'Pick the by-kind partition.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'State sorted' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'Rewrite number three put everything in one store again — the board’s curse survived another generation.',
        },
      ],
      helpLinks: [
        { topicId: 'state.kinds', label: 'Kinds of state' },
        { topicId: 'state.when-ngrx', label: 'When NgRx' },
      ],
      successFeedback: 'Four kinds, four homes, one justified log — stage 1 clear.',
      failureFeedback: 'Test each option against lines 3, 4 and 6 — the three lines that name different homes.',
    },
    {
      id: 'st-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Optimistic Move',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'The drag-move slice arrives — the optimistic heart of the board. Review it against lines 2 and 6.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'move-slice',
          type: 'code',
          title: 'board moves (proposed)',
          language: 'ts',
          content:
            "// dispatched by the drag handler\nexport const taskMoved = createAction(\n  '[Board] Task Moved',\n  props<{ taskId: string; from: Column; to: Column; movedBy: string }>()\n);\n\non(taskMoved, (state, m) => moveTask(state, m)); // pure, immutable helper\n\nmoveTask$ = createEffect(() =>\n  this.actions$.pipe(\n    ofType(taskMoved),\n    mergeMap((m) =>\n      this.api.moveTask(m.taskId, m.to).pipe(\n        map(() => moveConfirmed({ taskId: m.taskId })),\n        catchError(() => of(moveFailed({ taskId: m.taskId })))\n      )\n    )\n  )\n);\n\non(moveFailed, (state, { taskId }) => state); // TODO: toast is shown by a moveFailed$ effect",
        },
      ],
      findings: [
        {
          id: 'no-rollback',
          label:
            'moveFailed returns state unchanged — the optimistic move is never undone: the card stays in the new column on screen while the server still has it in the old one, and the toast apologises for a failure the board doesn’t visually admit',
          isCorrect: true,
          feedback:
            'Line 2 said honest rollback: the moveFailed fold must return the card (it has from/to on the original action — carry them through) or re-sync from the server. Optimism without rollback is just lying faster.',
        },
        {
          id: 'mergemap-ordering',
          label:
            'mergeMap lets two rapid moves of the SAME task race — the confirmations can arrive out of order and the server’s final position may be the FIRST drag, not the last one the user sees; per-task ordering (concatMap per taskId, or switchMap keyed by task) is needed',
          isCorrect: true,
          feedback:
            'The flattening-strategy lesson with real stakes: unordered persistence of ordered user actions. Group by taskId and serialise within the group — cross-task moves may still run concurrently.',
        },
        {
          id: 'movedby-on-action',
          label: 'movedBy on the action duplicates session state — the effect should read the current user when persisting instead of carrying it in the payload',
          isCorrect: false,
          feedback:
            'Line 6 wants WHO in the audit log — provenance belongs ON the fact (the reducer-purity lesson: facts carry their context). Reading ambient session state later would break replay.',
        },
        {
          id: 'optimistic-reducer',
          label: 'The reducer applies the move before the API confirms — state should only change on moveConfirmed to stay truthful',
          isCorrect: false,
          feedback:
            'That deletes line 2: apply-on-confirm is pessimistic UI — the drag snaps back until the network answers. Optimistic-apply with honest rollback is the required design, not a defect.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Walk one failed move and two rapid moves of one card through the code.' },
        { level: 2, title: 'Concept', content: 'Optimism requires rollback; per-entity ordering requires keyed flattening.' },
        { level: 3, title: 'Specific clue', content: 'Two findings attack the sheet’s own requirements — do not take their bait.' },
        { level: 4, title: 'Guided solution', content: 'Flag the empty moveFailed fold and the unkeyed mergeMap.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Moves reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'Failed moves kept cards in columns the server never agreed to — Monday’s board differed from Friday’s memory.',
        },
      ],
      helpLinks: [
        { topicId: 'state.when-ngrx', label: 'When NgRx' },
        { topicId: 'rx.flattening', label: 'Flattening strategies' },
      ],
      successFeedback: 'Rollback demanded, ordering keyed, provenance kept on the fact — the optimistic heart beats honestly.',
      failureFeedback: 'The two real defects both live in FAILURE paths. What does the user see when the API says no — or answers out of order?',
    },
    {
      id: 'st-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the Board',
      difficulty: 'boss',
      tags: ['angular'],
      storyContext: 'Two complete board architectures survived review. All six sheet lines decide.',
      prompt: 'Which board ships?',
      options: [
        {
          id: 'a',
          label:
            'Remote<Task[]> cache invalidated by confirmed moves; taskMoved/moveConfirmed/moveFailed slice with optimistic apply + rollback and per-task ordered effects; filters in query params read as router inputs; drawer signals in the board component; counts as selectors — and a devtools-visible action log ops can export.',
          isCorrect: false,
          feedback:
            'Read again — this candidate is nearly perfect but for one seam: the task CACHE is invalidated by confirmed moves, refetching the whole board per drag. The signed design reconciles the confirmed move into the cache (it already knows from/to) and reserves refetch for conflicts. Costly, not wrong — but the other candidate does everything here WITH the reconciling cache.',
        },
        {
          id: 'b',
          label:
            'Everything from candidate A, but the cache reconciles confirmed moves in place (refetching only on conflict or moveFailed re-sync) — drag storms stay cheap; plus the same URL filters, local drawer, derived counts, and the exportable ordered action log.',
          isCorrect: true,
          feedback:
            'All six lines at their best: optimistic and honest, ordered and auditable, shareable, mortal where it should be, derived where it must be — and the cache updated by reconciliation instead of panic refetches. Signed.',
        },
        {
          id: 'c',
          label:
            'Candidate B’s architecture, except filters live in the board store with a copy-link button that serialises them into a URL on demand, keeping the router untouched.',
          isCorrect: false,
          feedback:
            'Serialise-on-demand gives shareable links but fails the other half of line 3: refresh restores nothing (the store died), back/forward do not navigate filter changes, and the URL on screen lies about the board it shows. Native URL state has no substitute.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'All three are strong — differentiate on line 1’s cache behaviour and line 3’s full meaning.' },
        { level: 2, title: 'Concept', content: '“Shareable via link” includes refresh and history; caches reconcile before they refetch.' },
        { level: 3, title: 'Specific clue', content: 'What does a 30-card drag session cost under each cache policy?' },
        { level: 4, title: 'Guided solution', content: 'Sign the reconciling-cache, native-URL candidate.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Board signed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The refetch-per-drag board shipped — busy sprint days turned every reorder into a loading shimmer.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Rewrite three underperformed rewrite two — the block’s credibility rode on this board.',
        },
      ],
      helpLinks: [
        { topicId: 'state.server-state', label: 'Server state' },
        { topicId: 'state.single-source', label: 'Single source of truth' },
        { topicId: 'routing.params', label: 'Route params' },
      ],
      successFeedback:
        'Cache reconciled, moves audited, filters in the URL, drawer mortal, counts derived — the board that ends the rewrite curse. Campaign complete.',
      failureFeedback:
        'Two candidates differ only in cache policy; one differs in what “shareable” means. Walk a refresh and a drag storm through each.',
    },
  ],
  reflectionPrompt: 'Take our most state-tangled feature: sort its state into the four kinds on paper. How many pieces are living in the wrong home right now?',
  rewards: [{ type: 'xp', amount: 25, label: 'Board shipped' }],
};
