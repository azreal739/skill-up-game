import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — kinds of state: server, client/UI, derived, and URL state
 * are different problems wearing one word.
 */
export const fnSt001KindsOfState: MissionDefinition = {
  id: 'st-001-kinds-of-state',
  campaignId: 'ng-state-management',
  title: 'One Word, Four Problems',
  summary:
    '“State” hides four different problems — server data, UI state, derived values and URL state — and each has a different right home.',
  difficulty: 'intro',
  learningObjectives: [
    'Classify a piece of state as server, UI, derived or URL state',
    'Explain why each kind wants a different owner',
    'Spot state stored in the wrong category',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'New block, and it starts with an argument I refereed twice last quarter: “we need NgRx” vs “signals are enough”. Both sides said “state” forty times and meant different things every time.',
    },
    {
      speaker: 'Senior Dev',
      text: 'So session one was a taxonomy, not a tool. Server state: lives on the server, you hold a CACHE of it. UI state: the accordion is open, the modal is showing — born and dies in the client. Derived state: computable from the others — never stored. URL state: filters, tabs, selection that should survive refresh and be shareable. Four problems. The tool argument dissolves once you name which one you are solving.',
    },
  ],
  contextArtefacts: [
    {
      id: 'state-taxonomy',
      type: 'code',
      title: 'The taxonomy, from the board',
      language: 'text',
      content:
        'SERVER STATE   orders, projects, user profile   → you hold a CACHE (staleness, invalidation)\nUI STATE       modal open, accordion expanded     → component/local signal, dies with the view\nDERIVED STATE  cart total, filtered list, canSave  → computed(), never stored\nURL STATE      active tab, filters, selected id    → router params — refresh-proof, shareable',
    },
  ],
  challenges: [
    {
      id: 'st-001-c1',
      type: 'multiple-choice',
      title: 'Name the Problem',
      difficulty: 'intro',
      tags: ['angular'],
      storyContext:
        'Ticket triage with the taxonomy: “the orders page loses its status filter when the user refreshes or shares the link.”',
      prompt: 'What kind of state is the status filter, and where should it live?',
      options: [
        {
          id: 'a',
          label: 'UI state — a signal in the orders component; refresh loss is normal for client-side state.',
          isCorrect: false,
          feedback:
            'The ticket ASKS for refresh survival and shareability — declaring the loss normal rejects the requirement instead of meeting it.',
        },
        {
          id: 'b',
          label: 'Server state — persist the filter to the user’s profile via the API so it follows them across devices.',
          isCorrect: false,
          feedback:
            'A round-trip per filter click, and shared links STILL would not carry the filter — the person you send it to has your saved filter, not the link’s.',
        },
        {
          id: 'c',
          label:
            'URL state — put it in query params (?status=open): refresh restores it, links carry it, back/forward navigate it, and the component reads it like any other route input.',
          isCorrect: true,
          feedback:
            'Both requirements fall out of the category: the URL is the one store the browser persists and shares for free. Filters, tabs, selection — URL first.',
        },
        {
          id: 'd',
          label: 'Derived state — compute the filter from the visible orders instead of storing it anywhere.',
          isCorrect: false,
          feedback:
            'Backwards: the visible orders are derived FROM the filter. A user choice is an input, and inputs cannot be computed from their own outputs.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Read the requirements: survive refresh, shareable. Which store does the browser give you for free?' },
        { level: 2, title: 'Concept', content: 'URL state = choices that should outlive the session and travel in links.' },
        { level: 3, title: 'Specific clue', content: 'What happens when you paste ?status=open to a teammate?' },
        { level: 4, title: 'Guided solution', content: 'Query params — URL state.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Problem named' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The filter went into a global store “to be safe” — refresh still lost it, and the ticket bounced back.',
        },
      ],
      helpLinks: [{ topicId: 'state.kinds', label: 'Kinds of state' }],
      successFeedback: 'Category first, home second — the ticket resolves itself once named.',
      failureFeedback: 'The requirements name the category: what survives refresh and travels in a link?',
    },
    {
      id: 'st-001-c2',
      type: 'multiple-choice',
      title: 'The Stored Derivable',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'Code tour: a cart service holds items, itemCount, totalPrice and hasDiscount as four separate writable signals, each updated in addItem() and removeItem().',
      prompt: 'What does the taxonomy say about this service?',
      options: [
        {
          id: 'a',
          label:
            'Three of the four are derived state being STORED: itemCount, totalPrice and hasDiscount are computable from items — as writable signals they are three drift opportunities updated by hand in every mutation. Only items is real state; the rest become computed().',
          isCorrect: true,
          feedback:
            'The signals campaign’s 4-vs-5 bug, taxonomised: derived state is never stored. One source, three computeds, and addItem shrinks to one line.',
        },
        {
          id: 'b',
          label: 'Correct as designed — precomputing on write is cheaper than recomputing on every read.',
          isCorrect: false,
          feedback:
            'computed() memoises: it recomputes only when items changes — same cost profile, minus the drift risk and the double-length mutations.',
        },
        {
          id: 'c',
          label: 'The four signals are fine; the flaw is that they live in a service instead of the component.',
          isCorrect: false,
          feedback:
            'A cart is shared state — the service is the right OWNER. The flaw is three copies of facts that one signal already implies.',
        },
        {
          id: 'd',
          label: 'All four should merge into one writable object signal so updates stay atomic.',
          isCorrect: false,
          feedback:
            'One object with four hand-maintained fields is the same drift with fewer names — the derivations still need deleting, not merging.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each signal ask: could a computed produce this from the others?' },
        { level: 2, title: 'Concept', content: 'Derived state is NEVER stored — it is computed from real state.' },
        { level: 3, title: 'Specific clue', content: 'What does addItem have to remember to update today? That list is the smell.' },
        { level: 4, title: 'Guided solution', content: 'items stays writable; the other three become computed.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Derivables freed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'A new discount rule updated totalPrice in two of the three mutation paths — the third shipped the drift.',
        },
      ],
      helpLinks: [
        { topicId: 'state.kinds', label: 'Kinds of state' },
        { topicId: 'signals.computed', label: 'Computed signals' },
      ],
      successFeedback: 'Store the facts, compute the consequences — the taxonomy’s first commandment.',
      failureFeedback: 'Count the update sites for totalPrice. Now count them for a computed. That is the argument.',
    },
  ],
  reflectionPrompt: 'Pick our most complex page: sort every piece of its state into the four boxes. Which pieces are in the wrong box?',
  rewards: [{ type: 'xp', amount: 5, label: 'State named' }],
};
