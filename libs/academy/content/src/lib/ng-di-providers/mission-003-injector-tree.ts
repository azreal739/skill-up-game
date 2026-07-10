import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — the injector tree: resolution walks upward from the asking
 * component; component/route providers deliberately scope instances.
 */
export const fnDi003InjectorTree: MissionDefinition = {
  id: 'di-003-injector-tree',
  campaignId: 'ng-di-providers',
  title: 'The Injector Tree',
  summary:
    'Resolution walks up from the asker: nearest provider wins, root is the last stop, and a provider on the way down scopes a fresh instance.',
  difficulty: 'easy',
  learningObjectives: [
    'Trace a dependency request up the injector tree',
    'Use component providers to scope state per component on purpose',
    'Diagnose duplicated-service bugs as accidental scoping',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session three, the whiteboard grew a tree: root injector at the top, route injectors below, component injectors at the leaves. Every inject() is a walk up that tree from wherever the asker sits.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Nearest provider wins the walk. That is a footgun when it happens by accident — and a power tool on purpose: put TabStateService in the providers of TabComponent and every tab gets its own state, created and destroyed with the tab. Scoping is a feature; surprise scoping is a bug.',
    },
  ],
  contextArtefacts: [
    {
      id: 'tree-walk',
      type: 'code',
      title: 'Per-tab state, scoped on purpose',
      language: 'ts',
      content:
        "@Component({\n  selector: 'app-tab',\n  providers: [TabStateService], // each <app-tab> gets its OWN instance\n})\nexport class TabComponent {\n  // resolves to THIS tab's instance — the walk stops here\n  readonly state = inject(TabStateService);\n}",
    },
  ],
  challenges: [
    {
      id: 'di-003-c1',
      type: 'multiple-choice',
      title: 'Trace the Walk',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'FilterPanel (inside ProductsPage) injects FilterService. FilterService is providedIn: "root", and ProductsPage ALSO lists it in its providers array.',
      prompt: 'Which instance does FilterPanel get?',
      options: [
        {
          id: 'a',
          label: 'The root instance — providedIn: "root" always outranks local providers arrays.',
          isCorrect: false,
          feedback: 'Rank runs the other way: the walk starts at the asker and stops at the FIRST provider it meets.',
        },
        {
          id: 'b',
          label:
            'ProductsPage’s instance — resolution walks up from FilterPanel, meets the provider on ProductsPage first, and stops; root is only reached when nothing closer provides.',
          isCorrect: true,
          feedback:
            'Nearest-wins, exactly. Every product page gets its own filters while the rest of the app never notices — that is the tree doing its job.',
        },
        {
          id: 'c',
          label: 'Both — Angular merges the two registrations into one shared instance.',
          isCorrect: false,
          feedback: 'Injectors never merge instances — two registrations at two levels mean two potential instances.',
        },
        {
          id: 'd',
          label: 'It throws a multiple-providers error at bootstrap.',
          isCorrect: false,
          feedback: 'Shadowing a higher provider is legal and common — deliberate scoping depends on it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Start the walk at the ASKER, not at root.' },
        { level: 2, title: 'Concept', content: 'inject() climbs: component → parents → route → root. First hit wins.' },
        { level: 3, title: 'Specific clue', content: 'ProductsPage is on the path between FilterPanel and root.' },
        { level: 4, title: 'Guided solution', content: 'Pick nearest-provider-wins.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Walk traced' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Resolution stayed folklore — the next scoping bug was debugged by deleting providers until it worked.',
        },
      ],
      helpLinks: [{ topicId: 'di.injector-tree', label: 'Injector hierarchy' }],
      successFeedback: 'Asker up to root, first provider wins — you can now predict any resolution in the app.',
      failureFeedback: 'Walk it: FilterPanel → ProductsPage → … where is the first FilterService recipe?',
    },
    {
      id: 'di-003-c2',
      type: 'multiple-choice',
      title: 'The Accidental Second Cart',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Bug report: items added from the product page vanish on the cart page. Git blame finds providers: [CartService] added to ProductCardComponent “because the import was missing”.',
      prompt: 'What happened, and what is the fix?',
      options: [
        {
          id: 'a',
          label: 'CartService lost its root registration when the local provider was added; restoring providedIn: "root" alone fixes it.',
          isCorrect: false,
          feedback:
            'Root registration was never lost — the local provider SHADOWED it for every product card. Both registrations coexisted; that was the problem.',
        },
        {
          id: 'b',
          label: 'The cart page unsubscribed from the cart stream too early; the provider change is a red herring.',
          isCorrect: false,
          feedback:
            'The blame line is the whole story: items went into per-card instances that no other component could see.',
        },
        {
          id: 'c',
          label: 'Angular created the card instances asynchronously, so early clicks landed before the shared cart existed.',
          isCorrect: false,
          feedback: 'No async construction races here — just two different instances holding two different item lists.',
        },
        {
          id: 'd',
          label:
            'Every ProductCardComponent got its own private CartService — add-to-cart wrote into per-card instances while the cart page read the untouched root one. Fix: delete the local provider; the “missing import” was a TS import, not a DI registration.',
          isCorrect: true,
          feedback:
            'Accidental scoping, textbook case — and the diagnosis names the real confusion: TypeScript imports and injector providers are unrelated mechanisms.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Apply mission logic: who provides, who asks, who wins the walk?' },
        { level: 2, title: 'Concept', content: 'A providers entry on a component mints an instance PER component instance.' },
        { level: 3, title: 'Specific clue', content: '“The import was missing” — which kind of import does providers NOT fix?' },
        { level: 4, title: 'Guided solution', content: 'Per-card carts shadowing root; remove the provider.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Cart reunited' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Vanishing cart items reached production — the exact bug DI scoping causes when added as an import fix.',
        },
      ],
      helpLinks: [
        { topicId: 'di.injector-tree', label: 'Injector hierarchy' },
        { topicId: 'angular.services-di', label: 'Services & DI' },
      ],
      successFeedback: 'Shadowing found, mechanisms untangled — the tree holds no more accidents for you.',
      failureFeedback: 'How many CartService instances exist after that PR? Count the product cards.',
    },
  ],
  reflectionPrompt: 'Grep our app for component providers: which entries scope state on purpose, and which are import-fixes waiting to bite?',
  rewards: [{ type: 'xp', amount: 10, label: 'Tree mapped' }],
};
