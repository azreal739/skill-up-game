import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — why dependency injection exists: asking for dependencies
 * instead of constructing them, and the inject() function as the modern ask.
 */
export const fnDi001WhyInject: MissionDefinition = {
  id: 'di-001-why-inject',
  campaignId: 'ng-di-providers',
  title: 'Ask, Don’t Build',
  summary:
    'Dependency injection in one move: classes ASK for what they need, and the injector decides what arrives.',
  difficulty: 'intro',
  learningObjectives: [
    'Explain what a class gains by injecting instead of newing',
    'Use inject() to request a dependency',
    'Predict which classes share one service instance',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'New block: dependency injection. It started with an audit — we found four components each doing new AnalyticsService(), which means four separate buffers, four flush timers, and a test suite that hits real analytics.',
    },
    {
      speaker: 'Senior Dev',
      text: 'DI inverts that: the class declares WHAT it needs — private analytics = inject(AnalyticsService) — and the injector decides WHICH instance shows up. Same code serves production, tests and storybooks, because the decision moved out of the class.',
    },
  ],
  contextArtefacts: [
    {
      id: 'ask-dont-build',
      type: 'code',
      title: 'From the session — the inversion',
      language: 'ts',
      content:
        '// before: the class decides — and hard-wires — its collaborator\nprivate analytics = new AnalyticsService(new HttpClient(/* … */));\n\n// after: the class asks; the injector decides\nprivate analytics = inject(AnalyticsService);',
    },
  ],
  challenges: [
    {
      id: 'di-001-c1',
      type: 'multiple-choice',
      title: 'What the Inversion Buys',
      difficulty: 'intro',
      tags: ['angular'],
      storyContext: 'A teammate shrugs at the audit: “new AnalyticsService() works fine. Why complicate it?”',
      prompt: 'What does injecting actually buy over constructing?',
      options: [
        {
          id: 'a',
          label: 'Speed — the injector caches construction, so injected services instantiate faster.',
          isCorrect: false,
          feedback:
            'Construction cost is noise. The four-buffers bug and the untestable suite are the real bill for new.',
        },
        {
          id: 'b',
          label: 'Nothing functional — it is an Angular style convention that keeps constructors uniform.',
          isCorrect: false,
          feedback: 'The audit disproves this: four instances where one was intended IS a functional difference.',
        },
        {
          id: 'c',
          label: 'Lazier loading — injected services are only created when a template first reads them.',
          isCorrect: false,
          feedback: 'Injector instances are created on first REQUEST, not first template read — and that is not the point.',
        },
        {
          id: 'd',
          label:
            'The decision of WHICH instance moves out of the class: everyone asking gets the shared instance, tests substitute a fake without touching the class, and the class stops knowing how its dependency is built.',
          isCorrect: true,
          feedback:
            'All three audit findings answered at once: one buffer, swappable in tests, and no hard-wired constructor chain.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Reread the audit: what went wrong four times?' },
        { level: 2, title: 'Concept', content: 'new makes the class choose its collaborator; inject makes it ask.' },
        { level: 3, title: 'Specific clue', content: 'Think about what a TEST can do to an injected dependency.' },
        { level: 4, title: 'Guided solution', content: 'Pick the decision-moves-out answer.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Inversion understood' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: '“DI is ceremony” stuck, and the fifth hand-built service appeared within the sprint.',
        },
      ],
      helpLinks: [{ topicId: 'angular.services-di', label: 'Services & DI' }],
      successFeedback: 'Ask, don’t build — the sentence the whole block hangs from.',
      failureFeedback: 'Count what the audit found: how many buffers, and how do the tests reach real analytics?',
    },
    {
      id: 'di-001-c2',
      type: 'multiple-choice',
      title: 'Who Shares an Instance',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'CartService is @Injectable({ providedIn: "root" }). HeaderComponent, CartPageComponent and CheckoutService all inject it.',
      prompt: 'How many CartService instances exist, and why?',
      options: [
        {
          id: 'a',
          label: 'Three — each inject() call constructs a fresh instance for its caller.',
          isCorrect: false,
          feedback:
            'inject() does not construct — it RESOLVES against the injector, and the root injector holds one instance for everyone.',
        },
        {
          id: 'b',
          label:
            'One — providedIn: "root" registers a single instance in the root injector, and every inject(CartService) anywhere in the app resolves to it.',
          isCorrect: true,
          feedback:
            'The singleton-by-default story: one badge count, one source of cart truth, shared by components and services alike.',
        },
        {
          id: 'c',
          label: 'Two — components share one instance, but services injecting services always get their own copy.',
          isCorrect: false,
          feedback: 'The injector does not care who is asking — CheckoutService resolves against the same root injector.',
        },
        {
          id: 'd',
          label: 'One per lazy-loaded route the three classes happen to live in.',
          isCorrect: false,
          feedback:
            'providedIn: "root" stays app-wide even with lazy routes — route-scoped instances take deliberate provider work (mission 3).',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Where does providedIn: "root" put the instance?' },
        { level: 2, title: 'Concept', content: 'inject() resolves; it never constructs on its own.' },
        { level: 3, title: 'Specific clue', content: 'If header and cart page had different instances, what would the badge show?' },
        { level: 4, title: 'Guided solution', content: 'One instance, root injector, everyone shares.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Singleton counted' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'The team “fixed” a stale badge by re-providing CartService — creating the second cart it feared.',
        },
      ],
      helpLinks: [{ topicId: 'angular.services-di', label: 'Services & DI' }],
      successFeedback: 'One injector entry, many askers — sharing is the default, not the exception.',
      failureFeedback: 'Separate “who asks” from “who holds the instance”. Only one thing holds it.',
    },
  ],
  reflectionPrompt: 'Which class in our app still constructs a collaborator with new — and what would its test look like if it asked instead?',
  rewards: [{ type: 'xp', amount: 5, label: 'Dependencies asked' }],
};
