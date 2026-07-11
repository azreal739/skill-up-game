import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — front-end system design starts with requirements: clarify
 * scope, users, and constraints before drawing a single box.
 */
export const fnSys001Requirements: MissionDefinition = {
  id: 'sys-001-requirements',
  campaignId: 'fe-system-design',
  title: 'Draw the Boundaries First',
  summary:
    'A system design starts with requirements, not architecture — who uses it, at what scale, under what constraints — because the answer changes everything downstream.',
  difficulty: 'intro',
  learningObjectives: [
    'Clarify functional and non-functional requirements before designing',
    'Surface scale, device, and constraint assumptions explicitly',
    'Resist jumping to a solution before the problem is bounded',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'New block: front-end system design — the skill that separates "I can build this component" from "I can architect this product". It opened with a mock interview: "design a news feed". Half the room started drawing components in ten seconds. The interviewer stopped them: "for whom, at what scale, on what devices, with what constraints?" They had no idea.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The first move in any design is REQUIREMENTS, not boxes. Functional: what must it DO (post, scroll, react, real-time updates?). Non-functional: how WELL — scale (100 users or 100 million?), devices (desktop only or low-end mobile on 3G?), constraints (offline support? accessibility? SEO?). Every one of these flips the architecture. Designing before you know them is drawing a house without knowing if it is a cabin or a skyscraper.',
    },
  ],
  contextArtefacts: [
    {
      id: 'requirements-first',
      type: 'code',
      title: 'Clarify before you architect',
      language: 'text',
      content:
        'FUNCTIONAL   what must it do? (core flows, real-time?, edit?, offline?)\nNON-FUNCTIONAL\n  scale      100 users vs 100M — changes caching, pagination, everything\n  devices    desktop only vs low-end mobile on 3G — changes bundle budget\n  constraints SEO/SSR? offline/PWA? accessibility? i18n? regulatory?\n  latency    what feels acceptable, and to whom?\n\nrule: the same feature name hides ten different systems — bound it first',
    },
  ],
  challenges: [
    {
      id: 'sys-001-c1',
      type: 'multiple-choice',
      title: 'Design a News Feed',
      difficulty: 'intro',
      tags: ['angular'],
      storyContext: 'The mock interview: "design a news feed". A candidate immediately starts listing components: FeedComponent, PostComponent, a service, a store.',
      prompt: 'What should the candidate do FIRST instead?',
      options: [
        {
          id: 'a',
          label:
            'Clarify requirements before designing anything: who are the users and how many (a company intranet feed vs a global social network are utterly different systems)? What must it do (real-time updates? infinite scroll? posting, or read-only?)? What devices and networks (low-end mobile on 3G changes the whole budget)? What constraints (SEO/SSR, offline, accessibility)? The answers determine caching, pagination, rendering strategy, and bundle size — jumping to components bakes in assumptions that may be wrong.',
          isCorrect: true,
          feedback:
            'Requirements first is the entire discipline. "News feed" names ten different systems; the components you draw for a 100-user intranet feed are wrong for a 100-million-user real-time network. Bound the problem before solving it.',
        },
        {
          id: 'b',
          label: 'Start with the data model — get the Post and User entities right and the components follow naturally.',
          isCorrect: false,
          feedback:
            'The data model is downstream of requirements too: does a post have real-time reactions? threaded comments? offline drafts? You cannot model entities correctly until you know what the system must DO and at what scale.',
        },
        {
          id: 'c',
          label: 'Pick the state management approach (signals vs NgRx) first, since that decision shapes everything else.',
          isCorrect: false,
          feedback:
            'That is the state campaign’s exact mistake — choosing the tool before the problem. Whether you even need heavy state management depends on requirements (real-time? many writers?) you have not gathered yet.',
        },
        {
          id: 'd',
          label: 'Sketch the component tree quickly to show structure, then refine as questions come up.',
          isCorrect: false,
          feedback:
            'Sketching structure first anchors everyone on an architecture built from assumptions — and refining a wrong foundation is harder than starting from requirements. The boxes should be the OUTPUT of the requirements, not the first move.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does "news feed" describe ONE system, or many depending on scale and constraints?' },
        { level: 2, title: 'Concept', content: 'Requirements (functional + non-functional) come before any architecture.' },
        { level: 3, title: 'Specific clue', content: 'How different is a 100-user intranet feed from a 100M-user real-time network?' },
        { level: 4, title: 'Guided solution', content: 'Pick clarify-requirements-first.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Scope bounded' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The team built for an intranet-scale feed; requirements later revealed millions of users, and the architecture was rebuilt from scratch.',
        },
      ],
      helpLinks: [{ topicId: 'sysd.requirements', label: 'Requirements first' }],
      successFeedback: 'Requirements before boxes — the same feature name hides ten systems until you bound it.',
      failureFeedback: 'Which of these can you decide WITHOUT knowing users, scale, devices, and constraints? (None.)',
    },
    {
      id: 'sys-001-c2',
      type: 'multiple-choice',
      title: 'The Constraint That Changes Everything',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'Mid-design of a content site, a stakeholder mentions in passing: "and of course it needs to rank on Google and load fast on the marketing pages". The design so far is a standard client-rendered Angular SPA.',
      prompt: 'How much does this constraint change the design?',
      options: [
        {
          id: 'a',
          label:
            'Substantially — an SEO + fast-first-paint requirement for content pages pushes toward server-side rendering or static generation (SSR/SSG/prerendering), because a pure client-rendered SPA ships an empty shell that crawlers and slow devices see blank until JS executes. This is a NON-FUNCTIONAL requirement that reshapes the rendering architecture, routing, and data-fetching — exactly why constraints must surface EARLY, not "of course" late.',
          isCorrect: true,
          feedback:
            'A single constraint mentioned in passing can invert the rendering strategy. SEO/first-paint for content is the classic SSR/SSG driver — discovered late, it is a rewrite; discovered in the requirements phase, it is a design input.',
        },
        {
          id: 'b',
          label: 'Barely — add prerendering as a build step at the end; the SPA architecture is unaffected.',
          isCorrect: false,
          feedback:
            'Prerendering/SSR is not a bolt-on build step for a SPA built without it — data fetching, state hydration, and route structure all differ. Treating a rendering-strategy requirement as an afterthought is how late constraints become rewrites.',
        },
        {
          id: 'c',
          label: 'Not much — modern crawlers execute JavaScript, so a client-rendered SPA ranks fine without changes.',
          isCorrect: false,
          feedback:
            'Some crawlers execute JS imperfectly and slowly, and "load fast on marketing pages" (first paint on real devices) is a separate, real requirement a blank-then-hydrate SPA fails. The constraint stands and reshapes the design.',
        },
        {
          id: 'd',
          label: 'Only the marketing pages matter — make those static HTML by hand and keep the SPA for the app.',
          isCorrect: false,
          feedback:
            'Splitting static marketing from the app is a legitimate ARCHITECTURE (and may be the answer) — but "make them static by hand" ignores that they likely share components/data and need a real SSG/SSR strategy. The point stands: the constraint reshapes the design and needed surfacing early.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What does a crawler (or a slow device) SEE when a pure client-rendered SPA first loads?' },
        { level: 2, title: 'Concept', content: 'SEO / first-paint is a non-functional requirement that drives SSR/SSG.' },
        { level: 3, title: 'Specific clue', content: 'Can you bolt SSR onto a SPA architected without it, at the end, for free?' },
        { level: 4, title: 'Guided solution', content: 'Pick "substantially — pushes toward SSR/SSG".' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Constraint weighed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The SEO requirement surfaced after the SPA was built — retrofitting SSR became a multi-sprint rearchitecture.',
        },
      ],
      helpLinks: [{ topicId: 'sysd.requirements', label: 'Requirements first' }],
      successFeedback: 'One late constraint can invert the rendering strategy — which is why you surface them early.',
      failureFeedback: 'A pure SPA ships a blank shell until JS runs. What does that do to SEO and first paint?',
    },
  ],
  reflectionPrompt: 'For a feature we are about to build: have we written down its scale, devices, and constraints — or are we drawing components on assumptions?',
  rewards: [{ type: 'xp', amount: 5, label: 'Requirements first' }],
};
