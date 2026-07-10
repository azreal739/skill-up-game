import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — network performance: reading waterfalls, breaking request
 * chains, and parallelising what never needed to queue.
 */
export const fnPf007NetworkPerf: MissionDefinition = {
  id: 'pf-007-network-perf',
  campaignId: 'ng-performance',
  title: 'Read the Waterfall',
  summary:
    'The network tab’s waterfall shows requests queuing behind each other — most slow pages are chains that should have been fans.',
  difficulty: 'hard',
  learningObjectives: [
    'Read a request waterfall for chains and dead time',
    'Parallelise independent requests with forkJoin',
    'Break data-dependency chains with API shape changes when needed',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session seven, one screenshot: the project page’s waterfall. Four requests in a perfect staircase — profile, THEN projects, THEN members, THEN permissions. 350ms each, 1.4 seconds total. Three of the four never needed to wait.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Staircases happen one innocent line at a time: somebody awaits A before starting B because the code READ better that way. The waterfall is where the innocence shows up as user time. Rule: requests queue only when the DATA depends; everything else fans out together.',
    },
  ],
  contextArtefacts: [
    {
      id: 'staircase-to-fan',
      type: 'code',
      title: 'Staircase → fan',
      language: 'ts',
      content:
        "// STAIRCASE — 4 × 350ms = 1400ms\nconst profile = await firstValueFrom(this.api.profile());\nconst projects = await firstValueFrom(this.api.projects());\nconst members = await firstValueFrom(this.api.members());\n\n// FAN — max(350ms) = 350ms; only true dependencies wait\nreadonly page = toSignal(\n  forkJoin({\n    profile: this.api.profile(),\n    projects: this.api.projects(),\n    members: this.api.members(),\n  }),\n  { initialValue: null }\n);",
    },
  ],
  challenges: [
    {
      id: 'pf-007-c1',
      type: 'multiple-choice',
      title: 'The Innocent Staircase',
      difficulty: 'hard',
      tags: ['angular', 'api'],
      storyContext:
        'The four-step staircase: profile → projects → members → permissions. Inspection shows only ONE true dependency: permissions needs the project ids from projects. Profile and members depend on nothing.',
      prompt: 'What is the optimal request shape?',
      options: [
        {
          id: 'a',
          label: 'forkJoin all four — modern APIs tolerate out-of-order calls, and 4 × parallel beats any staircase.',
          isCorrect: false,
          feedback:
            'Permissions needs project ids that do not exist yet — full parallel sends it with nothing to ask about. Dependencies are facts, not preferences.',
        },
        {
          id: 'b',
          label: 'Keep the staircase but add HTTP/2 — multiplexing parallelises the connection layer automatically.',
          isCorrect: false,
          feedback:
            'Multiplexing parallelises CONCURRENT requests — the staircase never issues any: each await withholds the next request until the previous returns. The protocol cannot fix the code’s sequencing.',
        },
        {
          id: 'c',
          label:
            'Fan out profile + projects + members in one forkJoin; chain ONLY permissions behind projects (switchMap on the ids). Total: ~700ms — the depth of the one true dependency, not the count of requests.',
          isCorrect: true,
          feedback:
            'The waterfall now shows the data’s real shape: one dependency, one step. Page time equals the longest CHAIN, so chains hold only what data forces into them.',
        },
        {
          id: 'd',
          label: 'Cache all four responses so the staircase only costs its 1.4s on first visit.',
          isCorrect: false,
          feedback:
            'First visits are most visits for a landing page — and the staircase re-runs on every cache miss. Fix the shape; cache on top if warranted.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Draw the DATA dependencies, then make the requests match that drawing.' },
        { level: 2, title: 'Concept', content: 'Page time = longest dependency chain, not request count.' },
        { level: 3, title: 'Specific clue', content: 'Which request literally cannot be constructed before another finishes?' },
        { level: 4, title: 'Guided solution', content: 'Fan of three, chain of one.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Staircase felled' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The 1.4s staircase shipped on the app’s front door — the first impression queued politely, four times.',
        },
      ],
      helpLinks: [
        { topicId: 'perf.measure-first', label: 'Measure first' },
        { topicId: 'rx.flattening', label: 'Flattening strategies' },
      ],
      successFeedback: 'Requests shaped like the data, not like the code — the waterfall reads as a fan with one step.',
      failureFeedback: 'For each request ask: what INPUT does it need, and when does that input exist?',
    },
    {
      id: 'pf-007-c2',
      type: 'multiple-choice',
      title: 'The Chain the Client Can’t Break',
      difficulty: 'hard',
      tags: ['angular', 'api'],
      storyContext:
        'Next waterfall: the org chart. Fetch the root team, then each subteam, then THEIR subteams — N sequential rounds for N levels of depth, 3.5s for the big org. Every request genuinely depends on the previous round’s ids.',
      prompt: 'The dependencies are real — what now?',
      options: [
        {
          id: 'a',
          label:
            'The chain is real but only because the API is shaped per-node: this is a client-side JOIN over HTTP. Change the contract — one GET /org-tree (or ?depth=full) returns the tree in a single round trip; the server assembles it next to the data, where the joins are cheap.',
          isCorrect: true,
          feedback:
            'When the waterfall’s shape is forced by the API’s shape, the fix moves up a layer — the HTTP campaign’s contract lessons in service of performance. One round trip beats N clever ones.',
        },
        {
          id: 'b',
          label: 'Parallelise within each level — fetch all of level 2’s teams in one forkJoin, then level 3’s.',
          isCorrect: false,
          feedback:
            'Real but bounded: depth still costs one round trip per LEVEL — the 6-level org pays 6 × latency. Good triage while the contract change ships; not the destination.',
        },
        {
          id: 'c',
          label: 'Prefetch the whole org nightly into localStorage — the chart reads locally and syncs in the background.',
          isCorrect: false,
          feedback:
            'A day-stale org chart shows yesterday’s reorg — and the first visit still pays full price. Heavy machinery around an API shape one endpoint would fix.',
        },
        {
          id: 'd',
          label: 'Render level by level as each round lands — progressive display makes the 3.5s feel fine.',
          isCorrect: false,
          feedback:
            'Progressive rendering is good MANNERS (and worth doing) — but the deep levels still arrive at 3.5s, and the user looking for a leaf team waits the full chain.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The client is performing a JOIN over HTTP. Who else could perform it?' },
        { level: 2, title: 'Concept', content: 'When request shape is forced by contract shape, change the contract.' },
        { level: 3, title: 'Specific clue', content: 'Where are the parent-child joins cheapest — across the internet, or next to the database?' },
        { level: 4, title: 'Guided solution', content: 'One tree endpoint, one round trip.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Chain unforged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The per-level parallel “fix” shipped as final — every org deeper than five levels kept its multi-second chart.',
        },
      ],
      helpLinks: [
        { topicId: 'http.contract-design', label: 'API contract design' },
        { topicId: 'http.list-design', label: 'List endpoint design' },
      ],
      successFeedback: 'The best network optimisation is fewer round trips — sometimes that is an API design decision.',
      failureFeedback: 'Count round trips per option for a 6-level org. One option answers “one”.',
    },
  ],
  reflectionPrompt: 'Open our slowest page’s waterfall: which requests form a staircase — and which steps does the DATA actually require?',
  rewards: [{ type: 'xp', amount: 15, label: 'Waterfall read' }],
};
