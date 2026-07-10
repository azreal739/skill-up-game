import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — server state is a cache: staleness, invalidation and
 * request-status shape are its real problems, whatever store holds it.
 */
export const fnSt007ServerState: MissionDefinition = {
  id: 'st-007-server-state',
  campaignId: 'ng-state-management',
  title: 'You Only Hold a Cache',
  summary:
    'Server data in the client is a cache wearing a store’s clothes — its problems are staleness, invalidation and request status, not dispatch ceremony.',
  difficulty: 'hard',
  learningObjectives: [
    'Treat client-held server data as a cache with explicit freshness rules',
    'Model request status as data the UI can render honestly',
    'Avoid rebuilding cache semantics accidentally inside a store',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session seven connected two blocks: the HTTP campaign’s caching lessons and this block’s stores. Trigger ticket: “projects list shows deleted project; also the spinner never stops on slow connections; also switching workspaces shows the previous workspace’s data for a second.” Three symptoms, one confusion.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The confusion: treating server data as OWNED state. You do not own it — the server does; you hold a copy with a timestamp. So the design questions are cache questions: when is it stale, what invalidates it, and what does the UI show while the answer is in flight? Model the status — idle, loading, loaded, error — as DATA next to the data. A boolean isLoading cannot say “loaded but refreshing” or “errored with a stale copy worth showing”.',
    },
  ],
  contextArtefacts: [
    {
      id: 'status-shape',
      type: 'code',
      title: 'Request status as data',
      language: 'ts',
      content:
        "type Remote<T> =\n  | { status: 'idle' }\n  | { status: 'loading' }                          // first load — nothing to show\n  | { status: 'loaded'; data: T; fetchedAt: number; refreshing: boolean }\n  | { status: 'error'; error: AppError; stale?: T }; // keep the last good copy\n\nreadonly projects = signal<Remote<Project[]>>({ status: 'idle' });",
    },
  ],
  challenges: [
    {
      id: 'st-007-c1',
      type: 'multiple-choice',
      title: 'Three Symptoms, One Confusion',
      difficulty: 'hard',
      tags: ['angular', 'api'],
      storyContext:
        'The store: projects = signal<Project[]>([]) plus isLoading = signal(false), loaded once on app start, updated by hand after some mutations.',
      prompt: 'Which redesign addresses all three symptoms?',
      options: [
        {
          id: 'a',
          label: 'Poll the projects endpoint every 10 seconds — staleness cannot survive a refresh loop.',
          isCorrect: false,
          feedback:
            'Polling narrows the stale window at permanent bandwidth cost and fixes neither the eternal spinner nor the workspace flash — the SHAPE is still wrong.',
        },
        {
          id: 'b',
          label: 'Move the slice to NgRx — entity adapters and effects are built for exactly this data.',
          isCorrect: false,
          feedback:
            'The same three bugs port to NgRx unchanged — a store swap does not add freshness rules, status modelling or key-scoped invalidation. The problem is cache thinking, not store choice.',
        },
        {
          id: 'c',
          label: 'Initialise projects to null instead of [] so the UI can distinguish “not loaded” from “empty” — the rest is cosmetic.',
          isCorrect: false,
          feedback:
            'That fixes one ambiguity of four. The eternal spinner, the stale deletion and the workspace flash all remain unmodelled.',
        },
        {
          id: 'd',
          label:
            'Model it as a cache: Remote<Project[]> status union (kills the eternal spinner — error is a state, not a forgotten boolean); invalidation wired to mutations AND workspace switch (deleting refreshes, switching resets to loading instead of showing the old tenant); fetchedAt so “stale after N” is a rule, not a hope.',
          isCorrect: true,
          feedback:
            'All three symptoms are missing cache semantics: no error state, no invalidation triggers, no keying by workspace. The union + triggers make each impossible rather than unlikely.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Diagnose each symptom: which missing cache concept causes it?' },
        { level: 2, title: 'Concept', content: 'Cache semantics = status union + invalidation triggers + freshness stamps.' },
        { level: 3, title: 'Specific clue', content: 'The eternal spinner is isLoading=true with no error path — a shape bug.' },
        { level: 4, title: 'Guided solution', content: 'Pick the Remote<T> + invalidation redesign.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Cache named' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The workspace flash shipped to a multi-tenant customer — a second of someone else’s project names is a trust incident.',
        },
      ],
      helpLinks: [
        { topicId: 'state.server-state', label: 'Server state' },
        { topicId: 'http.caching', label: 'Caching & invalidation' },
      ],
      successFeedback: 'Named as a cache, modelled as a cache — three tickets closed by one shape.',
      failureFeedback: 'Take the eternal spinner alone: what state was the request in, and could the store even represent it?',
    },
    {
      id: 'st-007-c2',
      type: 'multiple-choice',
      title: 'The Refresh Compromise',
      difficulty: 'hard',
      tags: ['angular', 'api'],
      storyContext:
        'With Remote<T> landed, UX asks: “when data refreshes (workspace regained focus after an hour), do NOT blank the list behind a spinner — but do NOT silently swap rows under a user mid-click either.”',
      prompt: 'Which pattern honours both?',
      options: [
        {
          id: 'a',
          label:
            'Stale-while-revalidate: keep showing the loaded data with refreshing: true driving a subtle indicator; when the fresh copy lands, swap it in. If the user is mid-interaction (open row menu, active selection), hold the swap until the interaction closes — freshness yields to intent for the seconds that matter.',
          isCorrect: true,
          feedback:
            'The loaded+refreshing state exists for exactly this: the old data is not a lie, it is a cache being honest about its age — and the swap defers to the one thing more important than freshness: the user’s hands.',
        },
        {
          id: 'b',
          label: 'Blank to the loading state on every refetch — showing possibly-outdated rows is worse than showing nothing.',
          isCorrect: false,
          feedback:
            'An hourly full-blank of a list the user is reading — the cure UX explicitly rejected, and strictly worse than data that is one hour old and 99% identical.',
        },
        {
          id: 'c',
          label: 'Diff the fresh response against the displayed rows and patch changed cells in place, avoiding any swap moment.',
          isCorrect: false,
          feedback:
            'Cell-patching mid-interaction still moves rows under clicks (sorts change), and the diff machinery is a rendering layer the status union was meant to replace.',
        },
        {
          id: 'd',
          label: 'Only refresh on explicit user action — a refresh button removes the surprise entirely.',
          isCorrect: false,
          feedback:
            'Manual-only refresh reintroduces symptom one: the deleted project lives until someone thinks to press a button nobody presses.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Both requirements are about WHEN the fresh copy becomes visible.' },
        { level: 2, title: 'Concept', content: 'Stale-while-revalidate + interaction-deferred swap.' },
        { level: 3, title: 'Specific clue', content: 'The refreshing: true flag in the artefact is half of this answer.' },
        { level: 4, title: 'Guided solution', content: 'Show stale, refresh behind, swap when hands are clear.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Refresh humane' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Silent row swaps shipped — a dispatcher assigned the wrong order when the list reordered under the click.',
        },
      ],
      helpLinks: [{ topicId: 'state.server-state', label: 'Server state' }],
      successFeedback: 'Fresh data, steady hands — the cache serves the human, not the other way round.',
      failureFeedback: 'The row-moves-under-the-click is the hard case. Which options even address it?',
    },
  ],
  reflectionPrompt: 'Take our most-read server data: what is its staleness rule, what invalidates it, and can its store shape express “error with a stale copy”?',
  rewards: [{ type: 'xp', amount: 15, label: 'Cache honest' }],
};
