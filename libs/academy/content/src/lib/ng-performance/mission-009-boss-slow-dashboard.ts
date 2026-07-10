import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — the slow dashboard: triage from real measurements,
 * review the fixes, and sign off the performance plan.
 */
export const fnPf009BossSlowDashboard: MissionDefinition = {
  id: 'pf-009-boss-slow-dashboard',
  campaignId: 'ng-performance',
  title: 'Boss: The Slow Dashboard',
  summary:
    'The ops dashboard, measured end to end — rank the costs, review the fixes, and sign the plan that spends effort where the numbers point.',
  difficulty: 'boss',
  learningObjectives: [
    'Triage a full performance profile into a ranked plan',
    'Review performance fixes for cures that miss their disease',
    'Sign off a plan that respects measurement over fashion',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The block finale is our own ops dashboard — the 8-hour-shift tab. We measured everything this time: field vitals, waterfall, heap growth, CD profile. The boss fight is spending one sprint where the numbers say, not where the arguments are loudest.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The measurements, ranked: field LCP p75 5.2s (hero chart lazy-loaded + 4-step request staircase); INP p75 700ms (mousemove ticking 400 components — still!); heap +220MB/hour (socket listeners, unbounded incident cache); CLS 0.02 (fine). One sprint. Choose.',
    },
  ],
  contextArtefacts: [
    {
      id: 'dashboard-profile',
      type: 'code',
      title: 'The dashboard, measured',
      language: 'text',
      content:
        'FIELD (p75):  LCP 5.2s  ·  INP 700ms  ·  CLS 0.02\nwaterfall:    auth → layout → widgets → data (4 × ~400ms staircase)\n              hero chart img: loading="lazy" (!)\nCD profile:   mousemove → tick → ~400 components, 60/s while charting\nheap:         +220MB/hour; retainers → socket listeners[], incident Map\nbundle:       1.9MB initial (analyzer: charting lib in main, used by 1 widget)',
    },
  ],
  challenges: [
    {
      id: 'pf-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Rank the Sprint',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'Every number above is real. The sprint fits roughly three work streams.',
      prompt: 'Which plan spends the sprint where the measurements point?',
      options: [
        {
          id: 'a',
          label: 'Migrate the dashboard to zoneless signals first — it is the platform direction and would eventually improve every number at once.',
          isCorrect: false,
          feedback:
            '“Eventually improves everything” is the fashion answer the block exists to retire: a quarter-long migration consuming the sprint while the lazy hero — a one-attribute fix for the worst number — waits.',
        },
        {
          id: 'b',
          label: 'Fix the heap first — leaks compound over 8-hour shifts, making memory strictly more severe than any load-time number.',
          isCorrect: false,
          feedback:
            'The leaks matter (they made the cut) — but “compounding beats everything” skips the ranking: LCP 5.2s greets every user at hour zero; the ops team restarts tabs at lunch. Both ship this sprint; neither is the whole sprint.',
        },
        {
          id: 'c',
          label:
            'Triage by impact-per-effort: (1) LCP — un-lazy the hero (attribute) + fan the staircase’s independent steps: big win, small cost; (2) INP — crosshair out of the zone (mission 5’s fix, still unshipped); (3) heap — deregister socket listeners + bound the incident cache. Defer: bundle split of the charting lib (real but smaller), zoneless (ratchet, not sprint).',
          isCorrect: true,
          feedback:
            'The whole block in one plan: worst field numbers first, cheapest decisive fixes first within them, fashionable work ratcheted rather than sprinted. Every line traces to a measurement.',
        },
        {
          id: 'd',
          label: 'Split the charting library out of the main bundle first — 1.9MB initial is the root cause behind both LCP and INP.',
          isCorrect: false,
          feedback:
            'The bundle is worth splitting — but it is not the root of a 5.2s LCP whose hero is EXPLICITLY lazy-loaded behind a 1.6s staircase, nor of an INP dominated by mousemove ticks. The analyzer line ranked below both.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Rank by (field impact × users affected) ÷ effort — for each measurement.' },
        { level: 2, title: 'Concept', content: 'Cheap decisive fixes for the worst numbers beat structural work for future numbers.' },
        { level: 3, title: 'Specific clue', content: 'One LCP cause is literally an attribute. Where does that rank?' },
        { level: 4, title: 'Guided solution', content: 'Pick the triage plan.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Sprint ranked' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The migration ate the sprint; the lazy hero shipped to another quarter of users, one attribute away from fixed.',
        },
      ],
      helpLinks: [
        { topicId: 'perf.measure-first', label: 'Measure first' },
        { topicId: 'perf.web-vitals', label: 'Web vitals & assets' },
      ],
      successFeedback: 'Numbers ranked, effort priced, fashion deferred — stage 1 clear.',
      failureFeedback: 'For each plan: which p75 number moves, by roughly how much, at what cost? Fill the table before choosing.',
    },
    {
      id: 'pf-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Fixes',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'The sprint’s PR arrives: four fixes claiming the plan. Review them against it.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'fixes-pr',
          type: 'code',
          title: 'perf sprint PR (proposed)',
          language: 'ts',
          content:
            "// fix 1: hero chart\n<img ngSrc=\"hero-chart.webp\" width=\"960\" height=\"480\" priority />\n\n// fix 2: the staircase\nconst layout = await firstValueFrom(this.api.layout());\nconst page = await firstValueFrom(\n  forkJoin({ widgets: this.api.widgets(), data: this.api.data(), auth: this.api.refreshAuth() })\n);\n\n// fix 3: crosshair\nzone.runOutsideAngular(() => {\n  fromEvent<MouseEvent>(canvas, 'mousemove').subscribe((e) => {\n    this.drawCrosshair(e);\n    this.hoveredPoint.set(nearestPoint(e)); // tooltip data for the template\n  });\n});\n\n// fix 4: incident cache\nrecord(incident: IncidentDetail) {\n  if (this.viewed.size >= 500) {\n    const oldest = this.viewed.keys().next().value;\n    this.viewed.delete(oldest);\n  }\n  this.viewed.set(incident.id, incident);\n}",
        },
      ],
      findings: [
        {
          id: 'auth-in-forkjoin',
          label:
            'Fix 2 moved refreshAuth INTO the parallel fan — but widgets and data need the refreshed token: on a stale session, all three fire together and two come back 401. The dependency was auth → everything, not layout → everything',
          isCorrect: true,
          feedback:
            'Parallelising a true dependency is the staircase bug inverted: the fan must respect the one real edge (auth first, THEN the fan of layout/widgets/data). Read the dependency graph, not the request list.',
        },
        {
          id: 'signal-write-outside-zone',
          label:
            'Fix 3 sets hoveredPoint — template-rendered state — from inside runOutsideAngular on every mousemove: the signal write re-engages the very machinery the fix was escaping (or, pre-zoneless, risks a stale tooltip), and the tooltip now ticks at mouse frequency again',
          isCorrect: true,
          feedback:
            'Half in, half out: drawing belongs outside; STATE writes re-enter (throttled — tooltip data does not need 60/s). The fix as written smuggles the old cost back through the signal.',
        },
        {
          id: 'priority-plus-dimensions',
          label: 'Fix 1 sets both priority and explicit width/height — redundant together, since prioritised images skip layout reservation',
          isCorrect: false,
          feedback:
            'Independent concerns: priority orders the FETCH; width/height reserve the SPACE (CLS). Both belong on the hero — this line is the PR at its best.',
        },
        {
          id: 'fifo-not-lru',
          label: 'Fix 4 evicts insertion-order (FIFO) rather than true LRU — repeatedly re-viewed incidents can be evicted while stale ones survive; the cache needs a recency-ordered structure',
          isCorrect: false,
          feedback:
            'True — and immaterial: the defect was UNBOUNDED growth, now capped at 500. FIFO-vs-LRU on a 500-entry lookup cache is a refinement discussion, not a review blocker.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Walk a stale-token session through fix 2, then count what fix 3 still does per mousemove.' },
        { level: 2, title: 'Concept', content: 'Fans must respect true edges; escaping the zone means not writing ticked state per event.' },
        { level: 3, title: 'Specific clue', content: 'Two findings are refinements of correct fixes — spare them.' },
        { level: 4, title: 'Guided solution', content: 'Flag the auth edge and the signal write.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Fixes reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The parallel 401s shipped — every expired session greeted ops with three failed widgets and a working spinner.',
        },
      ],
      helpLinks: [
        { topicId: 'perf.rendering', label: 'Rendering performance' },
        { topicId: 'rx.flattening', label: 'Flattening strategies' },
      ],
      successFeedback: 'Dependencies honoured, escapes kept honest, refinements tolerated — the sprint survives review.',
      failureFeedback: 'Fix 2 and fix 3 each undo themselves in one line. Find the line in each.',
    },
    {
      id: 'pf-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the Plan',
      difficulty: 'boss',
      tags: ['angular'],
      storyContext: 'Sprint done, numbers re-measured. Two proposals for what performance work becomes from here.',
      prompt: 'Which ongoing plan ships?',
      options: [
        {
          id: 'a',
          label:
            'Institutionalise the loop: field vitals on the dashboard team’s own dashboard, reviewed monthly; CI budgets on bundle size and the LCP lab proxy to catch regressions; the zoneless ratchet as the default for new/touched components; and one measured perf item per sprint from the standing ranked list — re-ranked whenever field numbers move.',
          isCorrect: true,
          feedback:
            'Performance as a loop, not an event: field truth watched, regressions gated, the strategic migration ratcheting, and every sprint’s perf spend justified by the current ranking. The block’s rule one made permanent.',
        },
        {
          id: 'b',
          label:
            'Declare the initiative complete: numbers are green, so remove the perf line from sprints and re-run the full audit annually — steady-state apps do not need continuous measurement.',
          isCorrect: false,
          feedback:
            'Green today measures today’s code — next quarter’s features regress unwatched for a year, and the annual audit rediscovers this block from scratch. The 3pm crash was once green too.',
        },
        {
          id: 'c',
          label:
            'Prevent regressions structurally: freeze a strict performance checklist into review (no template function calls, OnPush everywhere, every image ngSrc, every list virtualised) — with the checklist enforced, measurement becomes redundant.',
          isCorrect: false,
          feedback:
            'A checklist without measurement is rule one inverted: virtualise-everything and OnPush-everywhere are costs where profiles never asked for them, while the NEXT real bottleneck (a staircase, a leak) sails past — checklists catch yesterday’s bugs.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which proposal still has an instrument attached next quarter?' },
        { level: 2, title: 'Concept', content: 'Budgets gate the known; field data finds the unknown; ratchets move the strategic.' },
        { level: 3, title: 'Specific clue', content: 'What catches a regression the checklist has no rule for?' },
        { level: 4, title: 'Guided solution', content: 'Sign the measured-loop proposal.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Plan signed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The initiative was declared done — two quarters later the dashboard was slow again and nobody could say since when.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The block ended as an event, not a practice — the next perf argument was hunches again, verbatim.',
        },
      ],
      helpLinks: [
        { topicId: 'perf.measure-first', label: 'Measure first' },
        { topicId: 'perf.bundle-size', label: 'Bundle size' },
      ],
      successFeedback:
        'Watched in the field, gated in CI, ratcheted by default, ranked every sprint — performance became a practice. Campaign complete.',
      failureFeedback:
        'Test each proposal against a regression arriving in month two: who notices, and how fast?',
    },
  ],
  reflectionPrompt: 'If our app’s field vitals regressed 20% this week — what, honestly, would notice first: a dashboard, a budget, or a customer?',
  rewards: [{ type: 'xp', amount: 25, label: 'Dashboard fast' }],
};
