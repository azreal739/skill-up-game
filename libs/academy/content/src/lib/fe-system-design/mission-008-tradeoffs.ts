import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — articulating tradeoffs: there is no best, only fit; and
 * defending a design in a review.
 */
export const fnSys008Tradeoffs: MissionDefinition = {
  id: 'sys-008-tradeoffs',
  campaignId: 'fe-system-design',
  title: 'There Is No Best, Only Fit',
  summary:
    'Senior system design is not knowing the “right” answer — it is naming the tradeoffs, tying each choice to a requirement, and defending it against the alternatives.',
  difficulty: 'hard',
  learningObjectives: [
    'Frame design decisions as tradeoffs tied to requirements',
    'Defend a design by naming what it optimises and sacrifices',
    'Review a proposed design for unjustified choices',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session eight, the meta-skill the whole block was building toward: articulating tradeoffs. A junior asks "what is the BEST state management / rendering / real-time approach?" and the honest, senior answer is always the same three words: "it depends — on what?" Naming the "on what" IS the skill.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Every design decision in this block was a tradeoff: SSR buys SEO and first paint, costs server complexity; WebSockets buy two-way low latency, cost connection management; micro-frontends buy deploy autonomy, cost coordination. There is no globally best — there is FIT to requirements. Senior design work is: state what you optimise FOR, name what you SACRIFICE, tie both to a requirement, and be ready to defend it against the alternative someone will propose. "Because it is modern" is not a defense.',
    },
  ],
  contextArtefacts: [
    {
      id: 'tradeoff-frame',
      type: 'code',
      title: 'How to state a design decision',
      language: 'text',
      content:
        'FOR each choice, say:\n  I chose ___  which OPTIMISES ___ (tied to requirement ___)\n  and SACRIFICES ___ (acceptable because ___)\n  the alternative ___ would instead ___ — worse here because ___\n\nred flags in a design: "best practice" / "modern" / "everyone uses it"\n  with no requirement named → a choice you cannot defend or revisit',
    },
  ],
  challenges: [
    {
      id: 'sys-008-c1',
      type: 'multiple-choice',
      title: 'Defend the Design',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'In a design review, an engineer presents: "For the new dashboard I chose CSR with a signal store, polling for updates, and a hand-rolled cache." A reviewer asks "why not SSR, WebSockets, and a caching library?" The engineer freezes.',
      prompt: 'What does a strong defense of the original design look like?',
      options: [
        {
          id: 'a',
          label:
            'Tie each choice to a requirement and name its tradeoff: "CSR because the dashboard is private (no SEO need) and highly interactive — SSR would add server complexity for a first-paint gain that is minor behind a login. Polling because the data updates every few minutes — WebSockets’ connection management would be unjustified for that frequency. Hand-rolled cache because we have ~4 endpoints — a caching library’s power would be dependency overhead for a small surface." Each is defended by a requirement, with the sacrifice acknowledged; the alternatives aren’t wrong globally, just wrong HERE.',
          isCorrect: true,
          feedback:
            'A strong defense names the requirement each choice serves and the tradeoff accepted — and shows the alternatives were considered and rejected for THIS context, not ignored. That is senior design: fit, argued, not "best" asserted.',
        },
        {
          id: 'b',
          label: '"These are the simpler, more standard choices, and simpler is always better until proven otherwise."',
          isCorrect: false,
          feedback:
            '"Simpler is always better" is a slogan, not a defense — it names no requirement and cannot explain WHY CSR/polling/hand-rolled fit THIS dashboard versus another. The reviewer’s alternatives are also defensible; you must argue from requirements, not a blanket principle.',
        },
        {
          id: 'c',
          label: 'Concede and switch to SSR, WebSockets, and a caching library — the reviewer is more senior and named more powerful tools.',
          isCorrect: false,
          feedback:
            'Switching to "more powerful" tools because a senior named them is the opposite of the skill — the powerful options may be WORSE fits (SSR complexity behind a login, sockets for minute-apart data). Defend or revise based on REQUIREMENTS, not the seniority or power of the alternative.',
        },
        {
          id: 'd',
          label: '"I chose them because they are current best practices for modern Angular apps."',
          isCorrect: false,
          feedback:
            '"Best practices / modern" with no requirement is exactly the red flag the session names — it is a choice you cannot defend or revisit, and it is not even accurate (there is no single best practice across all dashboards). Name the requirement each choice serves.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each choice, what REQUIREMENT does it serve, and what does it sacrifice?' },
        { level: 2, title: 'Concept', content: 'Defend by requirement + acknowledged tradeoff, not by "simpler" or "modern".' },
        { level: 3, title: 'Specific clue', content: 'Is the dashboard public (SEO) or private? Does its data change per second or per few minutes?' },
        { level: 4, title: 'Guided solution', content: 'Pick the requirement-tied, tradeoff-named defense.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Design defended' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'The engineer conceded to "more powerful" tools with no requirement basis — the dashboard got SSR and sockets it did not need.',
        },
      ],
      helpLinks: [{ topicId: 'sysd.tradeoffs', label: 'Articulating tradeoffs' }],
      successFeedback: 'Every choice tied to a requirement, every sacrifice named — a design that survives review on its merits.',
      failureFeedback: 'The reviewer’s tools are more POWERFUL. Are they a better FIT here? Defend from requirements, not power.',
    },
    {
      id: 'sys-008-c2',
      type: 'code-review',
      title: 'Review the Design Doc',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'A design doc for a new internal admin tool. Review its stated decisions for tradeoff reasoning.',
      prompt: 'Select every decision that is UNJUSTIFIED as written — and leave the well-reasoned ones.',
      artefacts: [
        {
          id: 'design-doc',
          type: 'code',
          title: 'admin tool design doc (excerpt)',
          language: 'text',
          content:
            '1. Rendering: CSR. It’s an internal, auth-gated tool — no SEO need, highly\n   interactive — so we accept a blank-shell first paint behind the login.\n2. State: NgRx, because it’s the industry-standard state management for Angular.\n3. Real-time: none — data changes when an admin edits it; we refetch on\n   navigation. No live requirement, so no polling/SSE/socket complexity.\n4. Micro-frontends: yes, to be future-proof and modern as the tool grows.',
          },
        ],
      findings: [
        {
          id: 'ngrx-industry-standard',
          label:
            'Decision 2 (NgRx "because it’s industry-standard") names no requirement — an internal admin tool may have simple state a signal store handles, so the choice isn’t tied to what THIS tool needs (many writers? audit log? cross-feature events?); "industry-standard" is a red-flag non-justification',
          isCorrect: true,
          feedback:
            'The state campaign’s exact lesson: NgRx is justified by needs (event log, many writers, replay), not by being standard. As written, the doc can’t say why this tool needs it over a simpler signal store — the requirement is missing.',
        },
        {
          id: 'micro-frontends-future-proof',
          label:
            'Decision 4 (micro-frontends "to be future-proof and modern") is unjustified — it names no independent-deployment or team-autonomy requirement, and "future-proof/modern" is precisely the defend-nothing red flag; it commits a single tool to heavy runtime-integration cost for a hypothetical',
          isCorrect: true,
          feedback:
            'Micro-frontends earn their cost via a real deployment-independence need (mission 5), not "future-proof". Adopting them for one growing internal tool on a modernity vibe is unjustified architecture that will be expensive to unwind.',
        },
        {
          id: 'csr-decision',
          label: 'Decision 1 (CSR) is unjustified — a blank-shell first paint is bad UX and should be avoided regardless of SEO',
          isCorrect: false,
          feedback:
            'Backwards: decision 1 is WELL-reasoned — it names the requirement (internal, auth-gated, no SEO, highly interactive) and explicitly accepts the tradeoff (blank-shell paint behind a login, where first paint matters little). That is exactly how a decision should be stated; leave it.',
        },
        {
          id: 'no-realtime-decision',
          label: 'Decision 3 (no real-time) is a gap — every modern tool should have live updates, so "refetch on navigation" is under-built',
          isCorrect: false,
          feedback:
            'Also well-reasoned: it names the requirement (data changes only when an admin edits it — no live requirement) and rejects real-time complexity for it. "Every tool should be live" is the modernity reflex the session warns against; the doc correctly matched the transport (none) to the update pattern.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each decision, is there a REQUIREMENT named, or a slogan ("standard", "modern", "future-proof")?' },
        { level: 2, title: 'Concept', content: 'Justified = tied to a requirement with a named tradeoff; unjustified = a slogan.' },
        { level: 3, title: 'Specific clue', content: 'Two decisions cite a requirement; two cite "industry-standard" / "future-proof".' },
        { level: 4, title: 'Guided solution', content: 'Flag the NgRx and micro-frontends decisions.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Doc reviewed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The slogan-justified choices shipped — NgRx and micro-frontends added complexity to a small internal tool that never needed either.',
        },
      ],
      helpLinks: [{ topicId: 'sysd.tradeoffs', label: 'Articulating tradeoffs' }],
      successFeedback: 'Slogan-justified choices flagged, requirement-tied ones spared — review by fit, not fashion.',
      failureFeedback: 'Two decisions name a requirement and a tradeoff (good). Two lean on "standard/modern/future-proof" (red flags). Which is which?',
    },
  ],
  reflectionPrompt: 'Look at our last architecture decision: was it defended by a named requirement and tradeoff, or by "best practice" / "modern" / "everyone uses it"?',
  rewards: [{ type: 'xp', amount: 15, label: 'Tradeoffs articulated' }],
};
