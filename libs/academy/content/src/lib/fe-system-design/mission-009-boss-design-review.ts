import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — design a real system end to end: gather requirements,
 * choose an architecture, review it, and defend the design.
 */
export const fnSys009BossDesignReview: MissionDefinition = {
  id: 'sys-009-boss-design-review',
  campaignId: 'fe-system-design',
  title: 'Boss: Design the System',
  summary:
    'A full front-end system design — a collaborative project tool — from requirements through architecture to a defended decision record, applying the whole block.',
  difficulty: 'boss',
  learningObjectives: [
    'Design a system from requirements to architecture',
    'Review an architecture against the block’s principles',
    'Sign off a design as a defensible decision record',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The block finale is the real interview and the real job: design a collaborative project-management tool (think shared boards, live cursors, comments, a public marketing site, and a data-heavy dashboard). Gather requirements, choose each architecture deliberately, and produce a decision record you could defend to any reviewer.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The sheet is the whole block: requirements before boxes; rendering strategy per surface; a coherent data layer; the right real-time transport for each live feature; a codebase structure that scales to teams; a performance budget; resilience for failure; and every decision tied to a requirement with its tradeoff named. There is no single right answer — there is a defensible one.',
    },
  ],
  contextArtefacts: [
    {
      id: 'design-sheet',
      type: 'code',
      title: 'The system design sheet',
      language: 'text',
      content:
        'SURFACES  public marketing site · auth’d app (boards) · data-heavy dashboard\nLIVE      board updates + live cursors (two-way) · notifications (one-way) · CI badge (rare)\nSCALE     many teams building it; global users on varied devices/networks\nREQS      marketing: SEO+fast · app: private+interactive+real-time · dashboard: heavy data\nGOAL      per-surface rendering · coherent data layer · right transport per feature ·\n          team-scalable structure · perf budget · resilience · every choice defended',
    },
  ],
  challenges: [
    {
      id: 'sys-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Choose the Architecture',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'The sheet’s surfaces and live features decide the core architecture. Choose it.',
      prompt: 'Which architecture matches the requirements?',
      options: [
        {
          id: 'a',
          label:
            'Per-surface rendering: SSG/prerender for the marketing site (SEO + fast), CSR for the auth’d interactive app, and CSR (or hybrid) for the private dashboard. WebSockets for board updates + live cursors (two-way, sub-second), SSE for notifications (one-way push), polling for the CI badge (rare). A normalized client data layer (entities once by id) with mutation-driven invalidation. Monorepo with enforced module boundaries (Nx tags) for the many teams — micro-frontends only if independent deploy becomes a hard need. A CI perf budget, per-section failure isolation, each choice tied to its requirement.',
          isCorrect: true,
          feedback:
            'Every surface and feature matched to its requirement: static where SEO+stable, client where private+interactive, the right transport per frequency+direction, normalized data, team-scalable structure without premature micro-frontends, plus budget and resilience. Defensible end to end.',
        },
        {
          id: 'b',
          label:
            'SSR everywhere (best SEO + first paint uniformly), WebSockets for all live features (one capable transport), a caching library, and micro-frontends per team from day one (future-proof for the many teams).',
          isCorrect: false,
          feedback:
            'Uniform SSR overpays on the private app/dashboard; WebSockets over-build the one-way notifications and rare CI badge; and day-one micro-frontends impose runtime-integration cost with no proven independent-deploy need. Powerful, uniform, and mismatched — the opposite of per-requirement fit.',
        },
        {
          id: 'c',
          label:
            'CSR for all three surfaces (simplest, one strategy), polling everywhere at 2s (uniform real-time), five feature stores each caching what they need, and separate repos per team.',
          isCorrect: false,
          feedback:
            'CSR fails the marketing site’s SEO; 2s polling can’t do live cursors (two-way, sub-second) and wastes requests on the rare CI badge; five separate caches recreate the entity-drift problem; separate repos fragment shared code. Uniform-simple that violates several requirements.',
        },
        {
          id: 'd',
          label:
            'Per-surface rendering and per-feature transports as in the strong option, but with five independent feature stores each holding their own copy of shared entities, and no performance budget (optimise later if needed).',
          isCorrect: false,
          feedback:
            'Close on rendering and transports, but two regressions: denormalized per-store entity copies bring back the coherence/drift problem the data-layer session solved, and "optimise later" re-invites the grow-then-trim bundle cycle a budget prevents. Normalize the data layer and set the budget.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Match each SURFACE to a rendering strategy and each LIVE feature to a transport by its requirement.' },
        { level: 2, title: 'Concept', content: 'Per-surface rendering, per-feature transport, normalized data, enforced boundaries, budget, resilience.' },
        { level: 3, title: 'Specific clue', content: 'Which live feature is two-way sub-second (sockets) vs one-way (SSE) vs rare (poll)?' },
        { level: 4, title: 'Guided solution', content: 'Pick the per-requirement architecture with normalized data and a budget.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Architecture chosen' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The uniform SSR + all-sockets + day-one micro-frontends design shipped — months of complexity for capabilities most surfaces never used.',
        },
      ],
      helpLinks: [
        { topicId: 'sysd.rendering', label: 'Rendering strategies' },
        { topicId: 'sysd.realtime', label: 'Real-time transports' },
      ],
      successFeedback: 'Per-surface, per-feature, normalized, bounded, budgeted, resilient — stage 1 clear.',
      failureFeedback: 'The strong design matches each surface and feature to its OWN requirement. Which option does that without regressions?',
    },
    {
      id: 'sys-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Design Doc',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'The team’s design doc for the tool lands. Review its decisions against the whole block.',
      prompt: 'Select every WEAK/unjustified decision — and leave the sound ones.',
      artefacts: [
        {
          id: 'system-doc',
          type: 'code',
          title: 'project-tool design doc (excerpt)',
          language: 'text',
          content:
            '1. Marketing site: SSG — SEO + fast first paint, content changes weekly (rebuild).\n2. Live cursors + board sync: WebSockets — two-way, sub-second, many editors.\n3. Real-time reliability: we’ll add reconnection "if users report issues".\n4. Shared entities (users, projects): one normalized entity cache, referenced by id.\n5. Dashboard first paint: no perf budget; we’ll run a perf sprint each quarter.',
          },
        ],
      findings: [
        {
          id: 'reconnection-later',
          label:
            'Decision 3 defers reconnection/gap-recovery until "users report issues" — but persistent connections WILL drop on mobile, silently losing live updates; reconnection + gap recovery (last-event-id) is core to the real-time design, not a reactive patch',
          isCorrect: true,
          feedback:
            'The real-time session’s lesson: a live feature is done when it survives a flaky connection, not a stable demo. Deferring reconnection guarantees silent data loss in production — it must be designed in, not added after complaints.',
        },
        {
          id: 'no-perf-budget',
          label:
            'Decision 5 (no budget, quarterly perf sprints) is the grow-then-trim anti-pattern — nothing prevents bundle/critical-path growth between sprints; a CI-enforced performance budget should catch bloat at PR time instead',
          isCorrect: true,
          feedback:
            'The performance session: a budget makes speed a standing constraint; quarterly sprints are perpetual firefighting the bundle out-grows. As written, decision 5 designs in the exact cycle the block says to end.',
        },
        {
          id: 'ssg-marketing',
          label: 'Decision 1 (SSG for marketing) is wrong — weekly content changes mean it will always be stale; use SSR for freshness',
          isCorrect: false,
          feedback:
            'Backwards: SSG with a rebuild on weekly content changes is exactly right — it delivers SEO + fast first paint at near-zero server cost, and "stale until rebuild" is a non-issue when you rebuild on the weekly change. SSR would pay per-request rendering for content that changes weekly. Decision 1 is sound.',
        },
        {
          id: 'normalized-cache',
          label: 'Decision 4 (one normalized entity cache) is over-engineering — each feature should own its data for team independence',
          isCorrect: false,
          feedback:
            'The opposite: a single normalized entity cache is the CORRECT data-layer design — it guarantees coherence (no five-copies-of-a-user drift) and is compatible with team independence (teams own FEATURES, not duplicate copies of shared entities). Per-feature entity copies are the drift bug the data-layer session fixed. Decision 4 is sound.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each decision: designed in from requirements, or deferred "until users complain"?' },
        { level: 2, title: 'Concept', content: 'Reconnection and perf budgets are designed in; SSG-on-rebuild and normalized cache are sound.' },
        { level: 3, title: 'Specific clue', content: 'Two decisions defer core concerns to "later"; two are correct designs a reviewer might wrongly attack.' },
        { level: 4, title: 'Guided solution', content: 'Flag the deferred reconnection and the missing perf budget.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Doc reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Reconnection and the perf budget were deferred — live updates silently dropped on mobile and the dashboard bundle grew unchecked.',
        },
      ],
      helpLinks: [
        { topicId: 'sysd.realtime', label: 'Real-time transports' },
        { topicId: 'sysd.performance', label: 'Performance as architecture' },
      ],
      successFeedback: 'Deferred essentials flagged, sound designs spared — the doc reviewed against the whole block.',
      failureFeedback: 'Two decisions push core concerns to "later"; two (SSG-on-rebuild, normalized cache) are correct. Sort them.',
    },
    {
      id: 'sys-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the Design',
      difficulty: 'boss',
      tags: ['angular'],
      storyContext: 'Two versions of the final design record remain. Sign off the one that is genuinely defensible.',
      prompt: 'Which design record ships?',
      options: [
        {
          id: 'a',
          label:
            'A record where every decision states: the choice, the requirement it serves, the tradeoff accepted, and the alternative rejected and why — per-surface rendering (SSG marketing / CSR app+dashboard), per-feature transport (sockets/SSE/poll) with reconnection+gap-recovery designed in, a normalized data layer, a monorepo with enforced boundaries (micro-frontends deferred until a real deploy-independence need), a CI perf budget, and per-section resilience. It explicitly notes what would CHANGE the decisions (e.g. "if the app needed SEO, revisit CSR").',
          isCorrect: true,
          feedback:
            'The senior artifact: not "the best architecture" but a defensible DECISION RECORD — each choice tied to a requirement with its tradeoff and rejected alternative named, and the conditions that would revise it. It survives any reviewer because it argues from fit, and it stays maintainable because future readers know WHY.',
        },
        {
          id: 'b',
          label:
            'A record that lists the same technology choices but justifies them as "current best practices for modern, scalable Angular apps", omitting the per-decision requirement/tradeoff reasoning to keep the doc concise.',
          isCorrect: false,
          feedback:
            'Same tech, no defense: "best practices/modern/scalable" is the exact red flag the block names — a reader (or a future maintainer deciding whether to change something) learns nothing about WHY, cannot defend it in review, and cannot tell when the decision no longer fits. Conciseness that drops the reasoning drops the value.',
        },
        {
          id: 'c',
          label:
            'The fully-reasoned record from option A, but hedged: for each decision it lists 2–3 options and says "we can go either way; the team should pick during implementation" to stay flexible.',
          isCorrect: false,
          feedback:
            'A design record that decides nothing is not a design — deferring every choice to "implementation" pushes the hard tradeoff work onto whoever codes it, with no shared rationale, guaranteeing inconsistency and re-litigation. Flexibility is naming what would CHANGE a decision (option A does this), not refusing to make it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which record could you DEFEND to any reviewer and a future maintainer could understand?' },
        { level: 2, title: 'Concept', content: 'A decision record: choice + requirement + tradeoff + rejected alternative + what would change it.' },
        { level: 3, title: 'Specific clue', content: 'One record justifies by slogans; one refuses to actually decide.' },
        { level: 4, title: 'Guided solution', content: 'Sign the per-decision requirement+tradeoff record.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Design signed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The slogan-justified record shipped — six months later nobody could explain or safely revisit the architecture’s choices.',
        },
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The undecided "go either way" record led to three teams implementing the same concern three incompatible ways.',
        },
      ],
      helpLinks: [
        { topicId: 'sysd.tradeoffs', label: 'Articulating tradeoffs' },
        { topicId: 'sysd.requirements', label: 'Requirements first' },
      ],
      successFeedback:
        'Requirements gathered, each surface and feature designed to fit, every decision defended with its tradeoff and the conditions that would revise it — a system design that survives review and time. Campaign complete.',
      failureFeedback:
        'The defensible record ties each choice to a requirement and names what would change it. Which option does that — versus sloganeering or refusing to decide?',
    },
  ],
  reflectionPrompt: 'Could we write a one-page decision record for our app’s architecture where every choice names its requirement, tradeoff, and rejected alternative — or would some entries just say "best practice"?',
  rewards: [{ type: 'xp', amount: 25, label: 'System designed' }],
};
