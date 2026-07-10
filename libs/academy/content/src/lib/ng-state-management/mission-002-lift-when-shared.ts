import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — state placement: keep state as local as possible, lift it
 * only when a second consumer genuinely appears.
 */
export const fnSt002LiftWhenShared: MissionDefinition = {
  id: 'st-002-lift-when-shared',
  campaignId: 'ng-state-management',
  title: 'As Local as Possible',
  summary:
    'State earns promotion by acquiring consumers — component-local until shared, service-owned when two views need one truth, never global “just in case”.',
  difficulty: 'easy',
  learningObjectives: [
    'Default state to the narrowest scope that works',
    'Recognise the moment state genuinely needs lifting',
    'Name the costs of premature globalisation',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session two opened on our own global store file: 1,900 lines. We audited it live. Half the entries had exactly one reader and one writer — the same component.',
    },
    {
      speaker: 'Senior Dev',
      text: 'State placement is a scope question, like variable declarations: as local as possible, promoted only by real demand. A wizard’s current step is the wizard’s business. The moment the header ALSO needs the cart count — that is the promotion interview. “Might need it globally someday” is how 1,900-line files happen.',
    },
  ],
  contextArtefacts: [
    {
      id: 'promotion-ladder',
      type: 'code',
      title: 'The promotion ladder',
      language: 'text',
      content:
        'component signal      one view owns it          (wizard step, accordion open)\n   ↓ promoted when a sibling needs it\nparent component      two siblings, one parent   (master-detail selection)\n   ↓ promoted when distant views need it\nshared service        cross-page truth           (cart, session, feature flags)\n   ↓ promoted when event flows demand it\nstore machinery       many writers, audit needs  (mission 5)',
    },
  ],
  challenges: [
    {
      id: 'st-002-c1',
      type: 'multiple-choice',
      title: 'The Promotion Interview',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'Four states from the audit. Only one has earned a promotion OUT of its component. Which?',
      prompt: 'Which state genuinely needs to leave its component?',
      options: [
        {
          id: 'a',
          label: 'The checkout wizard’s current step — checkout is the app’s most important flow, so its state is important too.',
          isCorrect: false,
          feedback:
            'Importance is not consumership: only the wizard reads or writes its step. Globalising it adds reach nothing uses — and stale steps to reset on re-entry.',
        },
        {
          id: 'b',
          label: 'The search page’s “advanced filters expanded” boolean — persisting it globally would remember the preference.',
          isCorrect: false,
          feedback:
            'A preference argument for a UI toggle — if remembering matters, that is localStorage via one effect, not a promotion to shared truth.',
        },
        {
          id: 'c',
          label: 'The data table’s sort column — other tables might want to share sorting logic someday.',
          isCorrect: false,
          feedback:
            'Sharing LOGIC is a function export; sharing STATE would make two tables sort together — a bug wearing a refactor’s clothes. And it is URL state anyway.',
        },
        {
          id: 'd',
          label:
            'The cart items — the header badge, the cart page and the checkout summary all read them, and product cards write them: multiple distant consumers, one truth required.',
          isCorrect: true,
          feedback:
            'Four consumers across three pages — the definition of earned promotion. This is service-with-signals territory (next mission builds it).',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Count CONSUMERS for each, not importance or hypotheticals.' },
        { level: 2, title: 'Concept', content: 'Promotion is demand-driven: a second distant consumer is the interview.' },
        { level: 3, title: 'Specific clue', content: 'Three options have exactly one real consumer today.' },
        { level: 4, title: 'Guided solution', content: 'The cart — many readers, many writers, one truth.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Promotion earned' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'All four went global “for consistency” — the 1,900-line file gained a hundred more.',
        },
      ],
      helpLinks: [{ topicId: 'state.kinds', label: 'Kinds of state' }],
      successFeedback: 'Consumers promote state; importance and prophecy do not.',
      failureFeedback: 'For each candidate: list who reads it and who writes it, today, by file name.',
    },
    {
      id: 'st-002-c2',
      type: 'multiple-choice',
      title: 'The Cost of Too High',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'A teammate pushes back: “putting everything in the global store is harmless — unused reach costs nothing, and we never have to refactor when needs grow.”',
      prompt: 'What does over-lifted state actually cost?',
      options: [
        {
          id: 'a',
          label: 'Mostly bundle size — global stores serialise more state into memory than components would.',
          isCorrect: false,
          feedback: 'Memory is the cheapest item on the bill — the expensive ones are about reasoning, not bytes.',
        },
        {
          id: 'b',
          label:
            'Reasoning and lifecycle: anyone can write it, so every bug hunt searches the whole app for writers; it outlives its views, so wizards resume at step 3 and searches show stale filters unless someone remembers to reset; and every reader couples to a shape that one team can no longer safely change.',
          isCorrect: true,
          feedback:
            'The 1,900-line file’s real interest rate: unbounded writers, immortal lifetimes, and coupling — paid on every debugging session and every refactor.',
        },
        {
          id: 'c',
          label: 'Nothing measurable — the objection is aesthetic, and consistency of one big store outweighs it.',
          isCorrect: false,
          feedback:
            'The audit measured it: reset-bugs (“wizard resumes mid-flow”) were a recurring ticket category traced to component state living globally.',
        },
        {
          id: 'd',
          label: 'Change detection — every component reading the store re-renders when ANY field changes.',
          isCorrect: false,
          feedback:
            'Fine-grained signals mostly solved that — subscribers track the fields they read. The remaining costs are human, which is why they persist.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Think about debugging “who changed this?” in each design.' },
        { level: 2, title: 'Concept', content: 'Scope bounds writers, lifetime, and coupling — the three real costs.' },
        { level: 3, title: 'Specific clue', content: 'Why does a globally-stored wizard resume at step 3 tomorrow?' },
        { level: 4, title: 'Guided solution', content: 'Pick the writers/lifecycle/coupling answer.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Costs named' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: '“Harmless” won the argument — the next quarter’s top ticket was a wizard resuming into stale state.',
        },
      ],
      helpLinks: [{ topicId: 'state.kinds', label: 'Kinds of state' }],
      successFeedback: 'Scope is a reasoning tool — the narrower the state, the shorter every future bug hunt.',
      failureFeedback: 'Play the debugging game: the cart count is wrong. How many files COULD have written it, per design?',
    },
  ],
  reflectionPrompt: 'Open our largest store or state service: how many entries have exactly one reader-writer pair — and what would moving them home cost?',
  rewards: [{ type: 'xp', amount: 5, label: 'Scope minimal' }],
};
