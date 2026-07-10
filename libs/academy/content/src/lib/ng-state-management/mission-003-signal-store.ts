import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — the service-with-signals store: private writable, public
 * readonly, computed selectors, mutations as named methods.
 */
export const fnSt003SignalStore: MissionDefinition = {
  id: 'st-003-signal-store',
  campaignId: 'ng-state-management',
  title: 'The House Store',
  summary:
    'The team default: a service holding private writable signals, exposing readonly views and computed selectors, mutating only through named methods.',
  difficulty: 'easy',
  learningObjectives: [
    'Build a signal store with a private-writable/public-readonly split',
    'Expose derived data as computed selectors',
    'Explain why mutations go through named methods',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session three built the pattern we now call the house store — on the cart, of course. The whole design fits on one slide, which is most of why it won.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Three rules. State is PRIVATE and writable — only the store touches it. The world gets READONLY views and computed selectors. And every change goes through a METHOD with a business name: addItem, not set. The method names become the complete list of everything that can happen to the cart — that list is worth more than any devtool.',
    },
  ],
  contextArtefacts: [
    {
      id: 'house-store',
      type: 'code',
      title: 'The house store, whole',
      language: 'ts',
      content:
        "@Injectable({ providedIn: 'root' })\nexport class CartStore {\n  private readonly _items = signal<CartItem[]>([]);\n\n  readonly items = this._items.asReadonly();\n  readonly count = computed(() => this._items().length);\n  readonly total = computed(() => this._items().reduce((s, i) => s + i.price * i.qty, 0));\n\n  addItem(item: CartItem) {\n    this._items.update((list) => [...list, item]);\n  }\n\n  removeItem(id: string) {\n    this._items.update((list) => list.filter((i) => i.id !== id));\n  }\n}",
    },
  ],
  challenges: [
    {
      id: 'st-003-c1',
      type: 'multiple-choice',
      title: 'Why the Split',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'A reviewer asks: “why the _items/items dance? Expose the writable signal and skip the ceremony.”',
      prompt: 'What does the private-writable/public-readonly split actually buy?',
      options: [
        {
          id: 'a',
          label:
            'It makes the store the ONLY writer: every possible change is one of its named methods, so the mutation surface is enumerable — debugging “who changed the cart” reads one class, and invariants (no negative qty) have exactly one place to live.',
          isCorrect: true,
          feedback:
            'Bounded writers is the whole game — the same reason mission 2 kept scope narrow. asReadonly() is one line of ceremony buying a complete list of everything that can happen.',
        },
        {
          id: 'b',
          label: 'Performance — readonly signals skip equality checks that writable ones must run.',
          isCorrect: false,
          feedback: 'asReadonly() is the same signal minus set/update — identical runtime, different contract.',
        },
        {
          id: 'c',
          label: 'It prevents memory leaks — writable signals held by components outlive them; readonly views do not.',
          isCorrect: false,
          feedback: 'Lifetime is identical — leaks were never the concern; write access was.',
        },
        {
          id: 'd',
          label: 'Nothing enforceable — consumers can cast the readonly view back to writable, so it is documentation at best.',
          isCorrect: false,
          feedback:
            'A determined cast can defeat any TS boundary — the split makes the RIGHT thing the easy thing and turns violations into greppable, reviewable casts.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The cart count is wrong in production. Compare the two debugging sessions.' },
        { level: 2, title: 'Concept', content: 'One writer, named mutations, enumerable change surface.' },
        { level: 3, title: 'Specific clue', content: 'Where does a “qty must be positive” rule live if anyone can set()?' },
        { level: 4, title: 'Guided solution', content: 'Pick the only-writer/enumerable-mutations answer.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Split justified' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The writable signal went public — within a month, four components set() the cart directly, one wrongly.',
        },
      ],
      helpLinks: [{ topicId: 'state.signal-store', label: 'Signal stores' }],
      successFeedback: 'Enumerable mutations — the store’s method list IS the documentation.',
      failureFeedback: 'The question is not “can it be broken” but “what does the easy path allow?”',
    },
    {
      id: 'st-003-c2',
      type: 'multiple-choice',
      title: 'Extend the Store',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'New requirement: a discount code. When applied, totals shrink 10%, the badge shows a tag icon, and checkout needs the code string. A teammate asks where each piece goes in the house pattern.',
      prompt: 'Which extension follows the pattern?',
      options: [
        {
          id: 'a',
          label:
            'Components call cartStore.items() and apply the 10% themselves where needed — keeping the store unaware of pricing concerns.',
          isCorrect: false,
          feedback:
            'Three components re-deriving the discount is the drift factory — the checkout and the badge WILL disagree by one forgotten update.',
        },
        {
          id: 'b',
          label: 'Add a public discountedTotal writable signal that applyDiscount() sets alongside the existing total.',
          isCorrect: false,
          feedback:
            'A stored derivable, freshly minted — mission 1 c2 just buried this. total must become discount-aware, not gain a sibling to drift against.',
        },
        {
          id: 'c',
          label:
            'One new private signal _discountCode; readonly discountCode view; total’s computed extended to read it (10% off when set); applyDiscount(code) and clearDiscount() as the only writers.',
          isCorrect: true,
          feedback:
            'One new FACT (the code), derivations extended to consume it, two named mutations — the pattern absorbs the feature without a new category of anything.',
        },
        {
          id: 'd',
          label: 'The discount belongs in a separate DiscountStore — one store per concern keeps CartStore single-responsibility.',
          isCorrect: false,
          feedback:
            'total now needs BOTH stores, so every consumer joins them by hand — a discount without a cart is meaningless; cohesion beats ceremony here.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Sort the feature: which part is a fact, which parts are consequences?' },
        { level: 2, title: 'Concept', content: 'New fact → private signal + named mutations; consequences → existing computeds.' },
        { level: 3, title: 'Specific clue', content: 'The 10%-off total is DERIVED — it must not be settable.' },
        { level: 4, title: 'Guided solution', content: 'Private code signal, discount-aware total, two methods.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Store extended' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The badge showed discounted totals while checkout charged full price — two derivations, one updated.',
        },
      ],
      helpLinks: [
        { topicId: 'state.signal-store', label: 'Signal stores' },
        { topicId: 'signals.computed', label: 'Computed signals' },
      ],
      successFeedback: 'Facts in, consequences computed, mutations named — the pattern held under its first real feature.',
      failureFeedback: 'Ask of each design: after applyDiscount, how many places KNOW the discount math?',
    },
  ],
  reflectionPrompt: 'Which of our shared services exposes a writable signal or subject — and what would its method list look like if it stopped?',
  rewards: [{ type: 'xp', amount: 10, label: 'House built' }],
};
