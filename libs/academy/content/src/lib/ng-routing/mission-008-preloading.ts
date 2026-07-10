import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — preloading strategies and route-level providers: idle-time
 * chunk fetching, custom strategies, and DI scoped to a route subtree.
 */
export const fnRt008Preloading: MissionDefinition = {
  id: 'rt-008-preloading',
  campaignId: 'ng-routing',
  title: 'Idle Hands, Warm Chunks',
  summary:
    'Preloading fetches lazy chunks after the app turns interactive — and route-level providers scope services to the subtree that needs them.',
  difficulty: 'hard',
  learningObjectives: [
    'Choose and configure a preloading strategy',
    'Write a custom strategy driven by route data',
    'Scope services to a route subtree with route providers',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session eight tied the block together. Two leftovers on the board: the first-click stutter from the lazy session, and a DI question — “the reports area needs its own ReportCacheService, alive exactly while the user is IN reports.”',
    },
    {
      speaker: 'Senior Dev',
      text: 'Preloading answers the first: withPreloading(PreloadAllModules) downloads every lazy chunk in the idle time after startup. When “all” is too much — mobile, metered data — a custom strategy reads route data and preloads selectively. And route providers answer the second: a providers array ON THE ROUTE creates an injector for the subtree; enter and it exists, shared by every child.',
    },
  ],
  contextArtefacts: [
    {
      id: 'preload-and-providers',
      type: 'code',
      title: 'Both tools',
      language: 'ts',
      content:
        "// selective preloading — routes opt in via data\nexport const flagPreload: PreloadingStrategy = {\n  preload: (route, load) => (route.data?.['preload'] ? load() : of(null)),\n};\nprovideRouter(routes, withPreloading(flagPreload));\n\n// route-scoped service — one instance for the reports subtree\n{\n  path: 'reports',\n  providers: [ReportCacheService],\n  loadChildren: () => import('./reports/reports.routes').then((m) => m.REPORT_ROUTES),\n  data: { preload: true },\n}",
    },
  ],
  challenges: [
    {
      id: 'rt-008-c1',
      type: 'multiple-choice',
      title: 'Choose the Strategy',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'The app: 12 lazy areas. Analytics says 80% of sessions visit Dashboard and Reports; the other 10 areas serve niche roles. Mobile traffic is 60%.',
      prompt: 'Which preloading setup fits the data?',
      options: [
        {
          id: 'a',
          label: 'No preloading — 60% mobile means every speculative byte is hostile; first clicks can pay their own way.',
          isCorrect: false,
          feedback:
            'That re-accepts the stutter for the two areas that 80% of sessions WILL visit — the analytics is telling you which bytes are not speculative.',
        },
        {
          id: 'b',
          label: 'PreloadAllModules — chunks are small after splitting, so download all 12 in idle time and be done.',
          isCorrect: false,
          feedback:
            'Defensible on desktop wifi, but with 60% mobile it fetches 10 areas most sessions never open — “all” ignores exactly what the analytics measured.',
        },
        {
          id: 'c',
          label:
            'A custom strategy preloading routes flagged data: { preload: true } — flag Dashboard and Reports: the near-certain visits arrive warm in idle time, and the 10 niche areas stay strictly pay-on-visit.',
          isCorrect: true,
          feedback:
            'Preloading budget spent where probability is measured highest — the strategy encodes the analytics instead of a mood.',
        },
        {
          id: 'd',
          label: 'Preload on hover — start each chunk download when the user’s pointer enters its nav link.',
          isCorrect: false,
          feedback:
            'Clever on desktop, silent on the 60% with no hover — as the ONLY strategy it abandons the majority platform.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The analytics gives you probabilities. Which option reads them?' },
        { level: 2, title: 'Concept', content: 'Custom strategies decide per route — data flags make the decision declarative.' },
        { level: 3, title: 'Specific clue', content: '80% visit two areas; 60% are on mobile. Both numbers must survive your choice.' },
        { level: 4, title: 'Guided solution', content: 'Flag-driven strategy, preload the two hot areas.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Strategy fitted' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Preload-everything shipped; mobile users paid for the report designer to warm a cache they never opened.',
        },
      ],
      helpLinks: [
        { topicId: 'routing.preloading', label: 'Preloading strategies' },
        { topicId: 'routing.lazy-loading', label: 'Lazy loading' },
      ],
      successFeedback: 'Idle bandwidth spent by the numbers — both stutter and waste addressed.',
      failureFeedback: 'Score each option against BOTH stats: the 80% visit pattern and the 60% mobile share.',
    },
    {
      id: 'rt-008-c2',
      type: 'code-review',
      title: 'Review the Reports Wiring',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'A teammate implements the route-scoped cache plus preloading flags. Review the config.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'reports-route',
          type: 'code',
          title: 'reports route config (proposed)',
          language: 'ts',
          content:
            "// report-cache.service.ts\n@Injectable({ providedIn: 'root' })\nexport class ReportCacheService { /* holds parsed report data */ }\n\n// app.routes.ts\n{\n  path: 'reports',\n  providers: [ReportCacheService],\n  canMatch: [authGuard],\n  data: { preload: true },\n  loadChildren: () => import('./reports/reports.routes').then((m) => m.REPORT_ROUTES),\n}\n\n// custom strategy registered elsewhere:\n// preload: (route, load) => route.data?.['preload'] ? load() : of(null)",
        },
      ],
      findings: [
        {
          id: 'root-plus-route',
          label:
            'ReportCacheService is BOTH providedIn: "root" and in the route providers — code outside reports resolves the root instance while the subtree uses the route one: two caches, and the “dies on leaving reports” goal quietly broken for anyone injecting it elsewhere',
          isCorrect: true,
          feedback:
            'Pick one home. For subtree-scoped-and-collected, drop providedIn: "root" — the double registration mints the DI campaign’s two-instances bug at route scale.',
        },
        {
          id: 'preload-vs-canmatch',
          label:
            'data: { preload: true } together with canMatch: [authGuard] preloads the chunk for users the guard will refuse — logged-out users download reports code they can never enter',
          isCorrect: true,
          feedback:
            'Preloading bypasses the navigation-time canMatch bandwidth win: the strategy calls load() directly. Either drop the flag here or make the strategy consult auth state before loading.',
        },
        {
          id: 'canmatch-on-lazy',
          label: 'canMatch cannot be used on loadChildren routes — it requires an eagerly known component to match against',
          isCorrect: false,
          feedback:
            'canMatch is DESIGNED for lazy routes — rejecting before the chunk downloads is its headline feature. This line is correct.',
        },
        {
          id: 'data-flag-typo-risk',
          label: 'Driving preloading from a loose data flag is fragile — a typo like preloud silently disables it; the strategy should throw on unknown keys',
          isCorrect: false,
          feedback:
            'A typo risk is real but throwing on unknown data keys would break every OTHER use of route data — data is a shared bag by design. Convention plus a lint rule is the proportionate answer; the config as written is fine.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check the service’s two registrations, then walk a logged-out user through preload.' },
        { level: 2, title: 'Concept', content: 'One token, one home; preloading runs OUTSIDE navigation, so guards don’t gate it.' },
        { level: 3, title: 'Specific clue', content: 'The canMatch usage itself is textbook-correct.' },
        { level: 4, title: 'Guided solution', content: 'Flag the double registration and the preload-despite-guard.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Wiring reviewed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'Two report caches diverged for a quarter — “stale after navigating away and back” resisted every fix aimed at one of them.',
        },
      ],
      helpLinks: [
        { topicId: 'routing.preloading', label: 'Preloading strategies' },
        { topicId: 'di.injector-tree', label: 'Injector hierarchy' },
      ],
      successFeedback: 'Scope singular, preloads gated — routing and DI reviewed as one system, which they are.',
      failureFeedback: 'Two findings are the healthy lines. Trace instance counts, then trace a logged-out user’s downloads.',
    },
  ],
  reflectionPrompt: 'Which lazy chunk in our app would analytics tell us to preload — and does anything preload chunks our guards would refuse?',
  rewards: [{ type: 'xp', amount: 15, label: 'Chunks warmed' }],
};
