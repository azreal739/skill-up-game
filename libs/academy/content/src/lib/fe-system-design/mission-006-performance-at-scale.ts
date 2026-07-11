import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — performance as an architectural budget: code splitting,
 * the critical path, and CDN/edge as design decisions.
 */
export const fnSys006PerformanceAtScale: MissionDefinition = {
  id: 'sys-006-performance-at-scale',
  campaignId: 'fe-system-design',
  title: 'Performance Is a Budget, Not a Patch',
  summary:
    'At system scale, performance is designed in — a loading-time budget, a defended critical path, and delivery at the edge — not optimised in afterward.',
  difficulty: 'hard',
  learningObjectives: [
    'Set and defend a performance budget as an architectural constraint',
    'Design the critical rendering path deliberately',
    'Use CDN/edge delivery as a design decision',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session six elevated the performance campaign from "fix slow pages" to "design for speed". The difference: the perf block was a firefighter’s toolkit — measure, then cut. System design is the fire MARSHAL — build so the fire is unlikely. A budget the architecture must respect, not a cleanup after it is already 3MB.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Three architectural levers. A PERFORMANCE BUDGET — a hard limit (initial JS under X KB, LCP under Y) enforced in CI, so features are designed within it, not measured against it after bloating. The CRITICAL PATH — what MUST load for first meaningful paint, deliberately minimised (route-level code splitting, deferred non-critical JS, prioritised LCP asset). And DELIVERY — a CDN/edge serving static assets and cached responses close to users, because geography is latency. Speed becomes a property of the design, not a rescue mission.',
    },
  ],
  contextArtefacts: [
    {
      id: 'perf-architecture',
      type: 'code',
      title: 'Performance as architecture',
      language: 'text',
      content:
        'BUDGET        hard CI limit (initial JS ≤ X KB, LCP ≤ Y) → design within it\n              → a feature that blows the budget is a design problem, pre-merge\nCRITICAL PATH minimise what’s needed for first paint: route-split, defer\n              non-critical JS, prioritise the LCP asset (the perf campaign, by design)\nDELIVERY      CDN/edge: static assets + cached responses near the user\n              → geography is latency; move bytes closer\n\ndesign for speed; don’t optimise it in after it’s already slow',
    },
  ],
  challenges: [
    {
      id: 'sys-006-c1',
      type: 'multiple-choice',
      title: 'Budget Before Bloat',
      difficulty: 'hard',
      tags: ['angular', 'cicd'],
      storyContext:
        'A large app’s initial bundle has crept to 3MB over two years; every quarter someone runs a "perf sprint" to trim it, and every quarter it grows back. The team asks how to stop the cycle architecturally.',
      prompt: 'What breaks the grow-then-trim cycle?',
      options: [
        {
          id: 'a',
          label:
            'A performance BUDGET enforced in CI: set a hard limit (e.g. initial JS ≤ 250KB, LCP ≤ 2.5s on the target device) that fails the build when exceeded. Now every feature is designed WITHIN the budget — a change that would blow it is caught at PR time as a design decision (lazy-load it? defer it? is it worth the bytes?), not discovered a quarter later. The budget converts performance from a periodic cleanup into a standing constraint the architecture must satisfy, ending the ratchet.',
          isCorrect: true,
          feedback:
            'The grow-then-trim cycle exists because nothing PREVENTS growth between sprints. A CI-enforced budget makes the limit continuous — bloat fails the build on the PR that introduces it, so features are shaped to fit rather than trimmed after. Design within the budget, don’t clean up after.',
        },
        {
          id: 'b',
          label: 'Schedule the perf sprint monthly instead of quarterly — trimming more often keeps the bundle smaller.',
          isCorrect: false,
          feedback:
            'More frequent trimming is more firefighting, not fire prevention — the bundle still grows between sprints and the team spends more time cleaning up. A continuous budget catches growth at the source; a faster cleanup cadence does not.',
        },
        {
          id: 'c',
          label: 'Rewrite the app to be smaller once, thoroughly, so it starts fresh under 1MB.',
          isCorrect: false,
          feedback:
            'A one-time rewrite resets the number but installs no mechanism to KEEP it down — without an enforced budget it grows right back, exactly like the quarterly trims did. The fix is a standing constraint, not a bigger cleanup.',
        },
        {
          id: 'd',
          label: 'Lazy-load every feature module — if everything is lazy, the initial bundle stays minimal automatically.',
          isCorrect: false,
          feedback:
            'Aggressive lazy-loading helps (and is often part of the answer), but without a budget nothing STOPS the initial/critical bundle from creeping (a big shared dep, an eagerly-imported library) — and over-splitting has its own costs. The enforcing mechanism is the budget; lazy-loading is one technique used to meet it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The cycle exists because nothing PREVENTS growth between cleanups. What would?' },
        { level: 2, title: 'Concept', content: 'A CI-enforced performance budget: bloat fails the build at PR time.' },
        { level: 3, title: 'Specific clue', content: 'When should a budget-blowing change be caught — on the PR, or a quarter later?' },
        { level: 4, title: 'Guided solution', content: 'Pick the CI-enforced performance budget.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Budget set' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The quarterly trim cycle continued with no budget — the bundle hit 4MB and the perf sprints got longer each time.',
        },
      ],
      helpLinks: [
        { topicId: 'sysd.performance', label: 'Performance as architecture' },
        { topicId: 'perf.bundle-size', label: 'Bundle size' },
      ],
      successFeedback: 'Budget enforced in CI — bloat is a build failure on its PR, not a quarterly cleanup.',
      failureFeedback: 'Every option except one is a better CLEANUP. Which one PREVENTS the growth?',
    },
    {
      id: 'sys-006-c2',
      type: 'multiple-choice',
      title: 'Design the Critical Path',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'A global app’s dashboard has a slow first paint. Analysis: the initial load pulls the entire app bundle (all routes), fetches all dashboard widgets’ data sequentially before showing anything, loads a charting library on the critical path though charts are below the fold, and serves all assets from a single origin in one region.',
      prompt: 'Which combination of design changes most improves first paint?',
      options: [
        {
          id: 'a',
          label:
            'Attack the critical path on all fronts: route-level code splitting so the initial bundle carries only THIS route (not all routes); fetch only the above-the-fold widgets’ data first (parallel, not sequential — the waterfall/fan lesson) and lazy-load the rest; defer the charting library until charts are near the viewport (it’s below the fold, off the critical path); and serve static assets + cached responses from a CDN/edge near each user (geography is latency). Each removes weight or distance from the path to first meaningful paint.',
          isCorrect: true,
          feedback:
            'First paint is decided by the critical path — everything NOT needed for it (other routes, below-fold charts, non-critical data) should be off it, and what IS needed should travel the shortest distance (edge). This is the perf campaign’s techniques applied as deliberate architecture.',
        },
        {
          id: 'b',
          label: 'Add a full-screen loading spinner until everything is ready, so users see instant feedback instead of a slow paint.',
          isCorrect: false,
          feedback:
            'A spinner is perceived-performance theatre that here just gates the whole page on its slowest part (the all-widgets-sequential fetch) — it does not shorten the critical path, and users stare at a spinner instead of content. Fix the path, don’t decorate the wait.',
        },
        {
          id: 'c',
          label: 'Upgrade the server hardware and increase its memory so it responds faster to the initial request.',
          isCorrect: false,
          feedback:
            'The bottlenecks are client-side critical-path weight (whole-app bundle, sequential fetches, below-fold charting lib) and geographic distance — a faster origin server barely touches those. Bigger hardware cannot fix an oversized critical path or the speed of light across regions.',
        },
        {
          id: 'd',
          label: 'Only add the CDN — serving assets from the edge is the single highest-impact change and the rest are minor.',
          isCorrect: false,
          feedback:
            'The CDN helps distance, but it still delivers the WHOLE-app bundle and the below-fold charting library on the critical path, and does nothing about the sequential data fetch — a smaller, faster-delivered-but-still-huge payload. The critical-path weight problems must be fixed too; the edge is one lever of several.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For first paint, what on this list is NOT needed yet — and what travels too far?' },
        { level: 2, title: 'Concept', content: 'Minimise critical-path weight (split, defer, parallelise) + shorten distance (edge).' },
        { level: 3, title: 'Specific clue', content: 'Charts are below the fold. Should the charting library be on the first-paint path?' },
        { level: 4, title: 'Guided solution', content: 'Pick the combined route-split + parallel-critical-data + defer-charts + CDN answer.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Critical path designed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Only the spinner was added — first paint stayed slow behind it, and global users still waited on a whole-app bundle from one region.',
        },
      ],
      helpLinks: [
        { topicId: 'sysd.performance', label: 'Performance as architecture' },
        { topicId: 'cdn.static-hosting', label: 'CDN static hosting' },
      ],
      successFeedback: 'Critical path minimised and delivered from the edge — first paint carries only what it needs, close to the user.',
      failureFeedback: 'What is on the first-paint path that does not need to be, and how far do the bytes travel? Fix both.',
    },
  ],
  reflectionPrompt: 'Do we have a CI-enforced performance budget, or quarterly trim sprints — and is our critical path deliberately minimised or accidentally everything?',
  rewards: [{ type: 'xp', amount: 15, label: 'Performance budgeted' }],
};
