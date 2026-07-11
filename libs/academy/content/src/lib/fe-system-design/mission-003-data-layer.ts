import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — the data layer: client caching, normalization, and
 * keeping server state coherent as a design concern.
 */
export const fnSys003DataLayer: MissionDefinition = {
  id: 'sys-003-data-layer',
  campaignId: 'fe-system-design',
  title: 'The Cache Is Architecture',
  summary:
    'How a front end caches, normalizes and invalidates server data is a system-design decision — it determines coherence, freshness, and how much the app re-fetches.',
  difficulty: 'medium',
  learningObjectives: [
    'Treat the client data/cache layer as an architectural component',
    'Normalize shared entities to keep views coherent',
    'Design invalidation as part of the data layer',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session three connected the HTTP and state campaigns into a design concern: the data layer. Our app had the same user object cached in five different feature stores, each fetched separately, each drifting — the profile page showed a new avatar the sidebar did not. Five copies of one entity is a design failure, not a bug to whack-a-mole.',
    },
    {
      speaker: 'Senior Dev',
      text: 'At scale, the client data layer is real architecture. Three concerns: CACHING (avoid re-fetching what you have — the server-state-as-cache lesson), NORMALIZATION (store each entity ONCE by id, so all views read the same user; denormalized copies drift), and INVALIDATION (when a mutation lands, which cached data is now stale?). A coherent data layer — whether hand-built or a library — makes "the same entity everywhere" a property of the architecture, not a hope.',
    },
  ],
  contextArtefacts: [
    {
      id: 'data-layer',
      type: 'code',
      title: 'The three data-layer concerns',
      language: 'text',
      content:
        'CACHING       hold fetched data; don’t re-request what’s fresh (Remote<T>, TTL,\n              shareReplay) — but know when it’s stale\nNORMALIZATION store each entity ONCE, keyed by id; views reference by id\n              → one user object, every view coherent (denormalized = drift)\nINVALIDATION  a mutation marks dependent cache stale → refetch/patch\n              → the mutation owns what it falsifies\n\ndesign question: is "same entity, same value, everywhere" guaranteed or hoped?',
    },
  ],
  challenges: [
    {
      id: 'sys-003-c1',
      type: 'multiple-choice',
      title: 'Five Copies of One User',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'The avatar bug: the same user is fetched and cached separately in the profile store, sidebar store, comments store, header store, and settings store. Update it in one, the others show stale. The team keeps adding sync code between them.',
      prompt: 'What is the architectural fix?',
      options: [
        {
          id: 'a',
          label:
            'Normalize: store each entity ONCE, keyed by id, in a single source (an entity cache). Every view references the user BY ID and reads from that one place, so an update to user 42 is instantly coherent everywhere — there are no copies to sync because there is only one. This replaces the growing web of inter-store sync code with a structural guarantee. It’s the single-source-of-truth lesson applied to the whole app’s server data.',
          isCorrect: true,
          feedback:
            'Denormalized copies REQUIRE sync code, and sync code always eventually misses a case (the drift). Normalization removes the copies, so coherence is structural — the update lands in one place all views already read.',
        },
        {
          id: 'b',
          label: 'Add an event bus so any store updating a user broadcasts the change and the others refresh their copy.',
          isCorrect: false,
          feedback:
            'An event bus is more sync machinery — every store still holds a copy, every mutation type needs a broadcast, and any missed subscription re-creates the drift. It automates the symptom instead of removing the copies.',
        },
        {
          id: 'c',
          label: 'Have each store re-fetch the user on every render so they always show fresh data.',
          isCorrect: false,
          feedback:
            'Five re-fetches of the same user per render is a performance disaster (the config-fetched-14-times problem) and still races — this fixes coherence by hammering the server. Normalize to fetch once and share.',
        },
        {
          id: 'd',
          label: 'Deep-copy the user into each store and add a "last updated" timestamp to detect staleness.',
          isCorrect: false,
          feedback:
            'Copies with timestamps still need something to ACT on the staleness (re-fetch or sync), so you are back to sync machinery — and five copies means five places to update. The copies themselves are the problem.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The bug exists because there are FIVE copies. What removes the copies?' },
        { level: 2, title: 'Concept', content: 'Normalize: one entity per id, views reference by id.' },
        { level: 3, title: 'Specific clue', content: 'If there is only ONE user object, how many places must an update touch?' },
        { level: 4, title: 'Guided solution', content: 'Pick normalize-to-a-single-entity-cache.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Normalized' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The inter-store sync web kept growing — the sixth store forgot a case and the avatar drift returned.',
        },
      ],
      helpLinks: [
        { topicId: 'sysd.data-layer', label: 'The data layer' },
        { topicId: 'state.single-source', label: 'Single source of truth' },
      ],
      successFeedback: 'One entity, keyed by id, referenced everywhere — coherence became structural.',
      failureFeedback: 'Every option except one keeps five copies and syncs them. Which one deletes the copies?',
    },
    {
      id: 'sys-003-c2',
      type: 'multiple-choice',
      title: 'Build or Buy the Data Layer',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Designing a new large app’s data layer. The team debates: hand-roll caching/normalization/invalidation in services, or adopt a data-fetching/caching library (TanStack Query-style, Apollo for GraphQL, etc.).',
      prompt: 'How should this decision be reasoned about?',
      options: [
        {
          id: 'a',
          label:
            'By requirements and scale, not dogma. A small app with a few endpoints can hand-roll a Remote<T>-style cache with mutation invalidation — cheap and dependency-free. A large app with many entities, shared caching, background refetch, pagination, and optimistic updates is re-implementing a mature caching library badly if it hand-rolls — adopt a proven one (matched to REST vs GraphQL) and inherit normalization, invalidation, dedup, and devtools. The decision is: does the app’s data complexity justify the dependency? Both are valid; the answer follows the requirements.',
          isCorrect: true,
          feedback:
            'Caching, invalidation and dedup are genuinely hard and well-solved by libraries — at scale, hand-rolling means re-solving them worse. But a small surface doesn’t justify the dependency. Match the tool to the data complexity, per the state campaign’s decision-matrix spirit.',
        },
        {
          id: 'b',
          label: 'Always hand-roll — a custom data layer avoids a heavy dependency and keeps full control.',
          isCorrect: false,
          feedback:
            '"Full control" over caching/invalidation/dedup/pagination means re-implementing a caching library’s hardest problems, usually with more bugs and no devtools. For a large data surface that is cost, not control.',
        },
        {
          id: 'c',
          label: 'Always adopt a library — data-fetching libraries are industry standard, so use one regardless of app size.',
          isCorrect: false,
          feedback:
            'For a tiny app with three endpoints, a full caching library is a dependency and mental-model tax bigger than the problem — the state campaign’s "don’t buy machinery you don’t need". Size the decision to the data complexity.',
        },
        {
          id: 'd',
          label: 'Use whichever the team already knows — familiarity beats theoretical fit for delivery speed.',
          isCorrect: false,
          feedback:
            'Familiarity is a real tiebreaker, but it cannot override a fundamental mismatch (hand-rolling a huge normalized cache the team will maintain forever, or importing Apollo for a three-endpoint REST app). Requirements first, then familiarity as a tiebreak.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'How many entities, and do you need dedup/background refetch/optimistic updates?' },
        { level: 2, title: 'Concept', content: 'Match the data-layer tool to the data complexity, not to dogma.' },
        { level: 3, title: 'Specific clue', content: 'What does hand-rolling a LARGE normalized cache actually re-implement?' },
        { level: 4, title: 'Guided solution', content: 'Pick the requirements-and-scale answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Layer decided' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'A large app hand-rolled its cache "for control" — it spent a quarter re-implementing dedup and invalidation a library provided free.',
        },
      ],
      helpLinks: [{ topicId: 'sysd.data-layer', label: 'The data layer' }],
      successFeedback: 'Data-layer tool sized to the data complexity — build small, buy at scale.',
      failureFeedback: 'What do caching libraries solve that is genuinely hard — and does this app have enough of it to justify one?',
    },
  ],
  reflectionPrompt: 'How many places in our app cache the same entity separately — and is coherence guaranteed by normalization or hoped for by sync code?',
  rewards: [{ type: 'xp', amount: 10, label: 'Data layer designed' }],
};
