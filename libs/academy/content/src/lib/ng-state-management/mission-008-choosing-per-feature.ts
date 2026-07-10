import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — choosing per feature: the decision matrix applied, and a
 * review of a store that chose wrong in both directions at once.
 */
export const fnSt008ChoosingPerFeature: MissionDefinition = {
  id: 'st-008-choosing-per-feature',
  campaignId: 'ng-state-management',
  title: 'The Matrix, Applied',
  summary:
    'The block’s decision matrix meets real features — and a review of state code that globalised the local while hand-rolling the cache.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply the state decision matrix to unfamiliar features',
    'Argue a placement decision from consumers and questions, not taste',
    'Review a feature’s state code against the whole block',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session eight, the drill: I read out feature briefs, the room answers with a placement and a JUSTIFICATION — category, consumers, questions asked. “Because signals are modern” loses a point; “because two distant views write it” scores.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The matrix in short: name the state kind. Count real consumers. Ask whether anyone needs the event history. URL for shareable choices, component signals for view-local, house store for shared client truth, Remote<T> cache shapes for server data, NgRx where the log itself is a requirement. Every answer defensible in one sentence.',
    },
  ],
  contextArtefacts: [
    {
      id: 'decision-matrix',
      type: 'code',
      title: 'The matrix, condensed',
      language: 'text',
      content:
        'KIND?        server → cache shape (Remote<T>, invalidation triggers)\n             shareable choice → URL\n             view-local → component signal\nCONSUMERS?   one view → stay local · distant views/writers → house store\nQUESTIONS?   "what happened, in order, replayable" → NgRx for that slice\nDEFAULTS:    smallest thing that answers today\'s question; promote on demand',
    },
  ],
  challenges: [
    {
      id: 'st-008-c1',
      type: 'multiple-choice',
      title: 'The Drill',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'Brief: a document editor adds collaborative presence — coloured cursors of other editors, updated over a socket several times per second, shown only inside the open editor, gone when it closes. A history of cursor movements is explicitly worthless.',
      prompt: 'Where does presence state live?',
      options: [
        {
          id: 'a',
          label: 'NgRx — multi-user data flowing over sockets is the many-writers case the matrix routes to the event log.',
          isCorrect: false,
          feedback:
            '“Many HUMANS” is not “many code writers” — one socket handler writes it all, and the brief EXPLICITLY voids the history question. Reducing 20 cursor moves a second into a log nobody wants is ceremony as pure cost.',
        },
        {
          id: 'b',
          label: 'The house CartStore-style root service — presence is shared truth like any other, and consistency of pattern matters.',
          isCorrect: false,
          feedback:
            'Shared with WHOM? Only the editor renders it. A root singleton keeps ghost cursors alive after the editor closes — the lifetime is wrong, not just the ceremony.',
        },
        {
          id: 'c',
          label:
            'A component-scoped signal store: a PresenceService in the editor route’s providers, holding a cursors signal fed by the socket, born and destroyed with the editor. Server-owned but ephemeral — the socket IS the freshness mechanism, and nothing outside the editor may consume it.',
          isCorrect: true,
          feedback:
            'Every matrix row lands here: view-local consumers, no history question, lifetime = the editor’s, and the DI campaign’s route-scoped providers give the destruction for free.',
        },
        {
          id: 'd',
          label: 'URL state — encode cursor positions in query params so a shared link shows collaborators in place.',
          isCorrect: false,
          feedback:
            'Twenty updates a second into the browser history is a denial-of-service on the back button — and a link snapshot of cursor positions is stale before it is pasted.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Run the three matrix questions in order: kind, consumers, questions.' },
        { level: 2, title: 'Concept', content: 'Lifetime is part of placement — who must OUTLIVE whom?' },
        { level: 3, title: 'Specific clue', content: '“History is explicitly worthless” answers the NgRx row for you.' },
        { level: 4, title: 'Guided solution', content: 'Route-scoped service with a signal, dies with the editor.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Drill passed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'Presence went into the global store — ghost cursors haunted the dashboard, and the cleanup action arrived two sprints later.',
        },
      ],
      helpLinks: [
        { topicId: 'state.kinds', label: 'Kinds of state' },
        { topicId: 'di.injector-tree', label: 'Injector hierarchy' },
      ],
      successFeedback: 'Kind, consumers, questions, lifetime — four sentences, one defensible answer.',
      failureFeedback: 'Which components render a cursor? What should exist one second after the editor closes?',
    },
    {
      id: 'st-008-c2',
      type: 'code-review',
      title: 'Review the Feature’s State',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'The team-settings feature lands for review. Hold its state decisions against the whole block.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'team-settings-state',
          type: 'code',
          title: 'team-settings.store.ts (proposed)',
          language: 'ts',
          content:
            "@Injectable({ providedIn: 'root' })\nexport class TeamSettingsStore {\n  // which accordion section is expanded on the settings page\n  readonly expandedSection = signal<string | null>(null);\n\n  private readonly _members = signal<Member[]>([]);\n  readonly members = this._members.asReadonly();\n  readonly admins = computed(() => this._members().filter((m) => m.role === 'admin'));\n\n  private loaded = false;\n  loadMembers() {\n    if (this.loaded) return; // cache: only fetch once per app run\n    this.loaded = true;\n    this.http.get<Member[]>('/api/team/members').subscribe((m) => this._members.set(m));\n  }\n\n  promoteToAdmin(id: string) {\n    return this.http.patch(`/api/team/members/${id}`, { role: 'admin' });\n  }\n}",
        },
      ],
      findings: [
        {
          id: 'ui-state-in-root',
          label:
            'expandedSection is view-local UI state living in a root singleton — public, writable, and immortal: any code can poke the settings page’s accordion, and it re-opens on the section a user expanded last week',
          isCorrect: true,
          feedback:
            'Mission 2’s promotion ladder read backwards: one view consumes it, so it belongs in the component. As shipped it is also a raw writable on a store — both house rules broken by one line.',
        },
        {
          id: 'stale-forever-cache',
          label:
            'The loaded-flag caches members forever with no invalidation — and promoteToAdmin PATCHes the server WITHOUT touching the cache, so the admins list is stale immediately after the app’s own mutation',
          isCorrect: true,
          feedback:
            'A hand-rolled cache missing the one rule that matters: mutations reset the memory they falsify. The store lies to itself — its own promote leaves its own admins computed wrong.',
        },
        {
          id: 'derived-admins',
          label: 'admins as a computed re-filters on every read — with large teams this belongs in a stored field updated on load',
          isCorrect: false,
          feedback:
            'computed memoises: it filters once per _members change, not per read. Storing it would recreate mission 1’s drift for a performance problem that does not exist.',
        },
        {
          id: 'subscribe-in-service',
          label: 'The service subscribes to the GET itself instead of exposing the observable — stores must stay subscription-free and let components subscribe',
          isCorrect: false,
          feedback:
            'A store consuming its own fetch into a signal is the standard signal-store pattern — the alternative (every component subscribing) re-executes the cold GET per consumer. The subscribe is fine; the missing invalidation (already flagged) is the defect.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each field against the matrix, then walk promoteToAdmin’s aftermath.' },
        { level: 2, title: 'Concept', content: 'UI state stays local; caches are reset by the mutations that falsify them.' },
        { level: 3, title: 'Specific clue', content: 'After a successful promote, what does admins() return?' },
        { level: 4, title: 'Guided solution', content: 'Flag the root-level accordion and the never-invalidated cache.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Feature reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'Fresh admins vanished on next visit and reappeared on refresh — the classic never-invalidated cache, shipped anyway.',
        },
      ],
      helpLinks: [
        { topicId: 'state.signal-store', label: 'Signal stores' },
        { topicId: 'state.server-state', label: 'Server state' },
      ],
      successFeedback: 'Placement and freshness both audited — the two failure directions of one store, both caught.',
      failureFeedback: 'One flagged line is textbook-correct store plumbing. The real defects are a misplaced field and a missing reset.',
    },
  ],
  reflectionPrompt: 'Run the drill on the next feature brief in our backlog: kind, consumers, questions — can you defend the placement in one sentence each?',
  rewards: [{ type: 'xp', amount: 15, label: 'Matrix internalised' }],
};
