import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — lazy loading: loadComponent/loadChildren, what the dynamic
 * import does to the bundle, and when the chunk actually downloads.
 */
export const fnRt004LazyLoading: MissionDefinition = {
  id: 'rt-004-lazy-loading',
  campaignId: 'ng-routing',
  title: 'Pay As You Navigate',
  summary:
    'loadComponent and loadChildren split routes into chunks the browser downloads on first navigation — the admin area stops taxing the login page.',
  difficulty: 'medium',
  learningObjectives: [
    'Convert eager routes to loadComponent / loadChildren',
    'Explain what the dynamic import() does at build time',
    'Predict when a lazy chunk downloads — and what the user sees',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session four opened with our bundle analysis on the projector: the initial download included the admin area, the report designer and a charting library — for every user, including the 90% who never open any of them.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The fix is a function call: loadComponent: () => import("./admin/admin.component").then(m => m.AdminComponent). The dynamic import is a BUILD instruction — the bundler cuts everything reachable only through it into a separate chunk, and the router downloads that chunk on first navigation to the route.',
    },
  ],
  contextArtefacts: [
    {
      id: 'lazy-routes',
      type: 'code',
      title: 'Eager vs lazy',
      language: 'ts',
      content:
        "// eager: AdminComponent lands in the main bundle\n{ path: 'admin', component: AdminComponent }\n\n// lazy: its own chunk, fetched on first visit\n{\n  path: 'admin',\n  loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),\n}",
    },
  ],
  challenges: [
    {
      id: 'rt-004-c1',
      type: 'multiple-choice',
      title: 'What import() Buys',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'A teammate asks why wrapping the same component in () => import(...) changes anything: “it still ships to the user eventually.”',
      prompt: 'What does the dynamic import actually change?',
      options: [
        {
          id: 'a',
          label: 'It compresses the admin code harder — chunks use a stronger algorithm than the main bundle.',
          isCorrect: false,
          feedback: 'Compression is identical. The change is WHEN bytes travel, not how small they are.',
        },
        {
          id: 'b',
          label:
            'It is a build-time split point: the bundler moves everything reachable only through the import into a separate chunk, so the initial bundle shrinks and the chunk downloads only when the router first matches that route.',
          isCorrect: true,
          feedback:
            'Two effects, one syntax: smaller first paint for everyone, deferred cost paid only by users who actually navigate there.',
        },
        {
          id: 'c',
          label: 'It defers EXECUTION only — the bytes still arrive in the initial download but run later.',
          isCorrect: false,
          feedback:
            'That would leave the login page paying full price. The split moves the bytes themselves out of the initial bundle.',
        },
        {
          id: 'd',
          label: 'It marks the route as server-side rendered, so the admin HTML streams from the server instead.',
          isCorrect: false,
          feedback: 'SSR is a different machine entirely — lazy loading is about JS chunk delivery in the same SPA.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Think like the bundler: what can it prove about code behind import()?' },
        { level: 2, title: 'Concept', content: 'Dynamic import = split point; router match = download trigger.' },
        { level: 3, title: 'Specific clue', content: '“Eventually” is the point — 90% of users’ eventually is never.' },
        { level: 4, title: 'Guided solution', content: 'Pick the build-split + on-navigation-download answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Split understood' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The initial bundle kept growing until the login page took eight seconds on hotel wifi.',
        },
      ],
      helpLinks: [{ topicId: 'routing.lazy-loading', label: 'Lazy loading' }],
      successFeedback: 'Bytes move when routes match — the bundle now grows only where users actually go.',
      failureFeedback: 'Separate the two costs: download and execution. Which one does the split move?',
    },
    {
      id: 'rt-004-c2',
      type: 'multiple-choice',
      title: 'The First Click Stutter',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'After the lazy refactor, QA reports: “first click on Reports hangs ~2s on slow connections, then loads. Second visit is instant.”',
      prompt: 'What is happening, and what is the measured, honest fix?',
      options: [
        {
          id: 'a',
          label: 'A bug — lazy chunks should be cached by the service worker before first use; file it against the build.',
          isCorrect: false,
          feedback:
            'Nothing is broken: the chunk downloads on first navigation by design. Pre-caching everything re-creates the eager bundle with extra steps.',
        },
        {
          id: 'b',
          label: 'Revert reports to an eager route — 2 seconds once is worse than 200ms for everyone at startup.',
          isCorrect: false,
          feedback:
            'That trade is backwards for a page most users never open — and “everyone at startup” includes the login-page users the refactor just rescued.',
        },
        {
          id: 'c',
          label: 'Move the import() call into main.ts so the chunk starts downloading during bootstrap.',
          isCorrect: false,
          feedback:
            'Importing it at bootstrap puts its download back on the critical first-load path — eager loading wearing a lazy costume.',
        },
        {
          id: 'd',
          label:
            'Expected behaviour: the first navigation awaits the chunk download. Soften it with a preloading strategy — PreloadAllModules (or a custom on-idle/on-hover strategy) fetches lazy chunks AFTER the app is interactive, so first clicks find them already cached.',
          isCorrect: true,
          feedback:
            'The full trade: initial load stays lean, chunks arrive in the idle gap, first clicks stop stuttering. Preloading is mission 8’s whole topic — this is the doorway.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the 2s a defect or the design? Answer that before picking a fix.' },
        { level: 2, title: 'Concept', content: 'Preloading = download lazily-SPLIT chunks eagerly-in-idle, after interactive.' },
        { level: 3, title: 'Specific clue', content: 'Two options secretly restore the eager bundle. One files a bug against physics.' },
        { level: 4, title: 'Guided solution', content: 'Keep the split; add a preloading strategy.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Stutter softened' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The revert-to-eager “fix” shipped, and the login bundle regained everything the refactor removed.',
        },
      ],
      helpLinks: [
        { topicId: 'routing.lazy-loading', label: 'Lazy loading' },
        { topicId: 'routing.preloading', label: 'Preloading strategies' },
      ],
      successFeedback: 'Split for first paint, preload for first click — both users win.',
      failureFeedback: 'The second visit is instant — what does that tell you about where the 2s went?',
    },
  ],
  reflectionPrompt: 'Run the bundle analyzer on our app: which route’s code is every user paying for that almost nobody visits?',
  rewards: [{ type: 'xp', amount: 10, label: 'Bundle split' }],
};
