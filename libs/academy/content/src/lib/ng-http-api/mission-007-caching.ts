import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — caching: shareReplay's sharp edges, cache invalidation on
 * mutation, and letting HTTP itself cache with ETags/304.
 */
export const fnHt007Caching: MissionDefinition = {
  id: 'ht-007-caching',
  campaignId: 'ng-http-api',
  title: 'Remembering Is a Liability',
  summary:
    'Every cache is a promise to serve the past — shareReplay, service caches and ETags each keep it differently, and mutations must break it on purpose.',
  difficulty: 'hard',
  learningObjectives: [
    'Share one in-flight request across consumers without staleness traps',
    'Invalidate client caches when mutations land',
    'Use ETag/304 revalidation instead of hand-rolled caching where it fits',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session seven, two exhibits. One: the config endpoint, fetched 14 times per page load by 14 widgets. Two: a user renames a project, and the sidebar shows the old name until refresh. Too little caching and too much — same day.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Correction from the floor: same DAY, yes — same ROOT CAUSE. Caching is remembering, and remembering is a liability with a maturity date. Share the config fetch once — shareReplay(1) — and every widget reads one answer. But the project list cached the same way must be BROKEN by the rename mutation, or the sidebar serves the past.',
    },
  ],
  contextArtefacts: [
    {
      id: 'cache-invalidate',
      type: 'code',
      title: 'A cache with a reset switch',
      language: 'ts',
      content:
        "private readonly refresh$ = new BehaviorSubject<void>(undefined);\n\nreadonly projects$ = this.refresh$.pipe(\n  switchMap(() => this.http.get<Project[]>('/api/projects')),\n  shareReplay({ bufferSize: 1, refCount: true })\n);\n\nrename(id: string, name: string) {\n  return this.http.patch(`/api/projects/${id}`, { name }).pipe(\n    tap(() => this.refresh$.next()) // mutation breaks the memory\n  );\n}",
    },
  ],
  challenges: [
    {
      id: 'ht-007-c1',
      type: 'multiple-choice',
      title: 'Fourteen Fetches, One Answer',
      difficulty: 'hard',
      tags: ['angular', 'api'],
      storyContext:
        'The config endpoint: 14 widgets inject ConfigService and each subscribes to config$. Proposal: readonly config$ = this.http.get<Config>("/api/config").pipe(shareReplay(1)).',
      prompt: 'Does shareReplay(1) fix the 14 fetches — and what are its sharp edges here?',
      options: [
        {
          id: 'a',
          label: 'It does not help — shareReplay shares emissions, but each new subscriber still triggers its own HTTP execution.',
          isCorrect: false,
          feedback:
            'Sharing execution is precisely what it does: one subscription upstream, the latest value replayed to every later subscriber.',
        },
        {
          id: 'b',
          label: 'It works but only within one component — service-level shareReplay cannot span injector boundaries.',
          isCorrect: false,
          feedback:
            'The service is a root singleton (the DI campaign counted its instances) — every injector sees the same observable and the same replay.',
        },
        {
          id: 'c',
          label:
            'Yes: the first subscriber executes the request once and all 14 read the shared replay. Sharp edges: an ERROR is replayed to every future subscriber forever (no built-in re-attempt), and the cached value lives as long as the app unless something resets it — fine for boot-time config, wrong for data that mutates.',
          isCorrect: true,
          feedback:
            'The full picture: right tool for read-mostly config, with its two liabilities named — cached errors and immortal memory. Both have known antidotes (retry-before-share, refresh triggers).',
        },
        {
          id: 'd',
          label: 'shareReplay is deprecated for HTTP — the supported pattern is caching the resolved value in a service field.',
          isCorrect: false,
          feedback:
            'Not deprecated — and the hand-rolled field is the same cache with fewer guarantees: no in-flight sharing, so 14 simultaneous widgets still race 14 fetches.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Two questions: does it deduplicate the executions, and what does it do with failure?' },
        { level: 2, title: 'Concept', content: 'shareReplay = one upstream subscription + replay of the last value to newcomers.' },
        { level: 3, title: 'Specific clue', content: 'Imagine the config fetch 500s once at boot. What do widgets 2–14 receive?' },
        { level: 4, title: 'Guided solution', content: 'Pick yes-with-two-named-edges.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Fetches deduped' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'A boot-time blip got cached — every widget replayed the same error until users hard-refreshed.',
        },
      ],
      helpLinks: [
        { topicId: 'http.caching', label: 'Caching & revalidation' },
        { topicId: 'rx.operators', label: 'RxJS operators' },
      ],
      successFeedback: 'One execution, named liabilities — caching chosen with eyes open.',
      failureFeedback: 'Sharing works. The exam is about what ELSE gets shared — including failures.',
    },
    {
      id: 'ht-007-c2',
      type: 'multiple-choice',
      title: 'The Stale Sidebar',
      difficulty: 'hard',
      tags: ['angular', 'api'],
      storyContext:
        'Exhibit two: projects$ is shareReplay-cached; rename() PATCHes the server and… the sidebar keeps the old name until a full refresh.',
      prompt: 'What completes the design?',
      options: [
        {
          id: 'a',
          label: 'Shorten the cache with a TTL — expire projects$ every 30 seconds so renames appear within half a minute.',
          isCorrect: false,
          feedback:
            'A TTL trades correctness for luck: 29 seconds of staleness after every mutation, plus refetch churn when nothing changed. The app KNOWS the exact moment truth changed — use that.',
        },
        {
          id: 'b',
          label:
            'Tie mutation to memory: rename() taps this.refresh$.next() on success, the switchMap re-executes the fetch, and every subscriber — sidebar included — receives the new list through the same shared stream. (Optimistic local patching is the latency upgrade on top, not a replacement.)',
          isCorrect: true,
          feedback:
            'The cache’s reset switch belongs to the mutations — the one place that knows precisely when remembering became lying.',
        },
        {
          id: 'c',
          label: 'Have the sidebar bypass the cache with its own direct GET — components that must be fresh should not share.',
          isCorrect: false,
          feedback:
            'Now the sidebar and the page can DISAGREE, and every future must-be-fresh component adds a fetch — the 14-widget problem rebuilt one exemption at a time.',
        },
        {
          id: 'd',
          label: 'After a PATCH, mutate the replayed array in place — find the project in the cached emission and update its name.',
          isCorrect: false,
          feedback:
            'Reaching into a replay buffer to mutate its contents is the signals in-place push at stream scale — same reference, no re-emission, and OnPush subscribers sleep through it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Who KNOWS the exact moment the cached list became wrong?' },
        { level: 2, title: 'Concept', content: 'Mutations own invalidation — refresh triggers re-execute the shared fetch.' },
        { level: 3, title: 'Specific clue', content: 'The artefact’s BehaviorSubject is the whole pattern.' },
        { level: 4, title: 'Guided solution', content: 'Pick the mutation-taps-refresh design.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Sidebar honest' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'Per-component cache bypasses accumulated — three sources of truth for one project list within a quarter.',
        },
      ],
      helpLinks: [{ topicId: 'http.caching', label: 'Caching & revalidation' }],
      successFeedback: 'Mutations break the memory they falsify — cache coherence in one BehaviorSubject.',
      failureFeedback: 'The rename call is the only code that knows the cache just became a lie. What should it do about that?',
    },
  ],
  reflectionPrompt: 'List our shareReplay and service-field caches: for each, which mutation should be resetting it — and does it?',
  rewards: [{ type: 'xp', amount: 15, label: 'Memory managed' }],
};
