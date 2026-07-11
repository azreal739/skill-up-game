import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — scaling the front-end codebase: monorepos, module
 * boundaries, and micro-frontends as an org-scale tradeoff.
 */
export const fnSys005ScalingFrontend: MissionDefinition = {
  id: 'sys-005-scaling-frontend',
  campaignId: 'fe-system-design',
  title: 'Scaling the Codebase, Not Just the App',
  summary:
    'As teams grow, the front-end architecture must scale to PEOPLE — module boundaries, monorepo structure, and micro-frontends are org-shaped decisions.',
  difficulty: 'hard',
  learningObjectives: [
    'Scale architecture to team structure, not just app size',
    'Use enforced module boundaries to keep a large codebase coherent',
    'Weigh micro-frontends against their real coordination cost',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session five, the scaling nobody plans for: not more users — more ENGINEERS. Our app was fine technically but eight teams were stepping on each other in one tangled codebase, every merge a conflict, every change rippling unpredictably. The architecture scaled to traffic and failed to scale to people.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Codebase architecture is org architecture (Conway’s law: your system mirrors your communication structure). The tools: enforced MODULE BOUNDARIES (our Nx tag rules — a library can only depend on what it is allowed to, so a feature team cannot reach into another’s internals), clear MONOREPO structure (feature libs, shared libs, boundaries between them), and — at the far end — MICRO-FRONTENDS (independently deployable apps per team). Each buys team autonomy at a coordination cost; the cost must be justified by the team scale.',
    },
  ],
  contextArtefacts: [
    {
      id: 'scaling-people',
      type: 'code',
      title: 'Scaling to people',
      language: 'text',
      content:
        'MODULE BOUNDARIES  enforced deps (Nx tags): feature libs can’t reach into\n                   each other’s internals → teams change safely in parallel\nMONOREPO STRUCTURE feature / shared / ui / data-access layers, boundaries\n                   enforced by lint → one repo, many teams, no tangle\nMICRO-FRONTENDS    independently built+deployed apps per team\n                   + full autonomy, independent deploys\n                   − runtime integration, shared-dep drift, coordination cost\n\nConway: the architecture mirrors the org — design boundaries around teams',
    },
  ],
  challenges: [
    {
      id: 'sys-005-c1',
      type: 'multiple-choice',
      title: 'Eight Teams, One Tangle',
      difficulty: 'hard',
      tags: ['angular', 'nx'],
      storyContext:
        'Eight teams in one Angular codebase constantly break each other: a change to a "shared" util ripples into three features, teams import directly into each other’s components, and no one can change anything safely. A senior proposes splitting into eight separately deployed micro-frontends.',
      prompt: 'What is the right first move?',
      options: [
        {
          id: 'a',
          label:
            'Before the heavy hammer of micro-frontends, establish and ENFORCE module boundaries within the monorepo: organise into feature libraries with clear public APIs, and use dependency constraints (Nx tag rules) so a feature can only depend on what it’s allowed to — no reaching into another team’s internals, shared code lives in explicitly shared libs. This gives teams parallel-change safety and clear ownership at a fraction of micro-frontends’ runtime-integration and coordination cost. Reach for micro-frontends only if independent DEPLOYMENT (not just independent development) is a proven need.',
          isCorrect: true,
          feedback:
            'The tangle is a BOUNDARY problem, and enforced module boundaries solve it in-repo — the Nx module-boundary lesson at org scale. Micro-frontends add independent deployment plus significant integration cost; solve the boundary problem first and only escalate if deployment independence is genuinely required.',
        },
        {
          id: 'b',
          label: 'Split into eight micro-frontends now — independent deployment is the only way eight teams stop blocking each other.',
          isCorrect: false,
          feedback:
            'Micro-frontends grant deployment independence but bring runtime integration, shared-dependency version drift, cross-app routing, and heavy coordination — a large cost that a monorepo with enforced boundaries avoids while still giving parallel-change safety. Don’t buy deployment independence you may not need to fix a boundary tangle.',
        },
        {
          id: 'c',
          label: 'Split the codebase into eight separate repositories so each team owns theirs completely.',
          isCorrect: false,
          feedback:
            'Eight repos (polyrepo) fragments shared code, complicates cross-cutting changes, and drifts dependencies — often worse than the tangle. A monorepo with enforced boundaries keeps shared code coherent AND gives teams safe parallel work; separate repos throw away the coordination benefits.',
        },
        {
          id: 'd',
          label: 'Assign a senior architect to review every cross-team change so nothing breaks unexpectedly.',
          isCorrect: false,
          feedback:
            'A human review bottleneck does not scale to eight teams and cannot enforce boundaries reliably — it is "be more careful" as architecture. Enforce boundaries with tooling (lint-level dependency constraints) so violations fail the build, not a reviewer’s attention.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The tangle is teams reaching into each other’s code. What ENFORCES separation without runtime cost?' },
        { level: 2, title: 'Concept', content: 'Enforced module boundaries (Nx tags) before the micro-frontend hammer.' },
        { level: 3, title: 'Specific clue', content: 'What does independent DEPLOYMENT add that independent DEVELOPMENT (enforced boundaries) does not?' },
        { level: 4, title: 'Guided solution', content: 'Enforce module boundaries in-monorepo first.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Boundaries enforced' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The team jumped to micro-frontends — shared-dependency drift and runtime integration became a bigger tangle than the original.',
        },
      ],
      helpLinks: [
        { topicId: 'sysd.scaling', label: 'Scaling the codebase' },
        { topicId: 'nx.tag-rules', label: 'Nx tag rules' },
      ],
      successFeedback: 'Boundaries enforced in-repo — eight teams change in parallel, no runtime-integration tax.',
      failureFeedback: 'The problem is teams reaching into each other. What is the lightest thing that STRUCTURALLY prevents that?',
    },
    {
      id: 'sys-005-c2',
      type: 'multiple-choice',
      title: 'When Micro-Frontends Earn It',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'A different org: a large enterprise with teams on DIFFERENT release cadences (one ships hourly, one needs a quarterly regulated release), partly different tech stacks, and separate deployment pipelines. They ask whether micro-frontends are justified here.',
      prompt: 'Is this a case where micro-frontends earn their cost?',
      options: [
        {
          id: 'a',
          label:
            'Yes — this is the case micro-frontends exist for: independent DEPLOYMENT is a hard requirement (an hourly team cannot be coupled to a quarterly regulated release train), teams have divergent stacks, and pipelines are already separate. Here the runtime-integration and coordination cost buys something essential that enforced monorepo boundaries cannot: truly independent build+deploy per team. The tradeoff flips when deployment independence is a genuine constraint, not a preference.',
          isCorrect: true,
          feedback:
            'Micro-frontends are justified by DEPLOYMENT independence and stack divergence, not by "large team" alone. When one team literally cannot ship on another’s cadence, the coordination cost is worth the autonomy — the opposite of the previous scenario, where a monorepo sufficed.',
        },
        {
          id: 'b',
          label: 'No — micro-frontends are always more trouble than they are worth; enforce monorepo boundaries here too.',
          isCorrect: false,
          feedback:
            'A monorepo forces a shared build+deploy cadence — which directly violates the hard requirement that the hourly and quarterly-regulated teams deploy independently. "Always avoid micro-frontends" ignores the exact constraint that justifies them here.',
        },
        {
          id: 'c',
          label: 'Only if they unify on one framework first — micro-frontends require a shared stack to integrate.',
          isCorrect: false,
          feedback:
            'Stack independence is one of micro-frontends’ SELLING points (teams can differ) — forcing a shared framework removes a benefit and contradicts a stated need. They integrate at runtime across stacks; unification is not required.',
        },
        {
          id: 'd',
          label: 'Yes, but only because the org is large — team size is the deciding factor.',
          isCorrect: false,
          feedback:
            'Team size alone does NOT justify micro-frontends (the previous scenario had eight teams and a monorepo sufficed). The deciding factors are independent-deployment need and stack divergence — this org has both, which is why it qualifies; size is incidental.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What can these teams NOT do in a shared monorepo build?' },
        { level: 2, title: 'Concept', content: 'Micro-frontends earn their cost when independent DEPLOYMENT is a hard requirement.' },
        { level: 3, title: 'Specific clue', content: 'Can an hourly team share a build cadence with a quarterly regulated release?' },
        { level: 4, title: 'Guided solution', content: 'Yes — deployment independence + stack divergence justify them.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Tradeoff judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The org forced a monorepo on teams with incompatible release cadences — the quarterly-regulated team blocked the hourly team’s deploys for months.',
        },
      ],
      helpLinks: [{ topicId: 'sysd.scaling', label: 'Scaling the codebase' }],
      successFeedback: 'Deployment independence as a hard requirement — the case where micro-frontends’ cost is worth paying.',
      failureFeedback: 'The deciding factor is not team size (a monorepo handled eight teams). What can these teams not share?',
    },
  ],
  reflectionPrompt: 'Does our codebase enforce module boundaries with tooling, or rely on discipline — and do any of our teams have a genuine independent-deployment need?',
  rewards: [{ type: 'xp', amount: 15, label: 'Codebase scaled' }],
};
