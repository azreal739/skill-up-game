import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — testing with DI: TestBed provider overrides, useValue
 * fakes, and why DI is the reason component tests are possible at all.
 */
export const fnDi008TestingWithDi: MissionDefinition = {
  id: 'di-008-testing-with-di',
  campaignId: 'ng-di-providers',
  title: 'The Payoff: Tests',
  summary:
    'Everything the block taught pays out in tests: TestBed is an injector you configure, and overriding providers swaps reality for fakes.',
  difficulty: 'hard',
  learningObjectives: [
    'Configure TestBed providers to substitute dependencies',
    'Fake a service with useValue and assert against it',
    'Review a test setup for DI mistakes that bite later',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Final regular session, and the punchline of the whole block: the reason our old tests hit real analytics was the new AnalyticsService() from session one. The class chose its collaborator, so no test could choose otherwise.',
    },
    {
      speaker: 'Senior Dev',
      text: 'TestBed.configureTestingModule is literally “build me an injector with THESE recipes”. Every pattern from the block applies verbatim: useValue to hand in a fake, useFactory for configurable fakes, tokens for config. The class under test cannot tell the difference — that is the whole point.',
    },
  ],
  contextArtefacts: [
    {
      id: 'testbed-injector',
      type: 'code',
      title: 'TestBed is an injector you configure',
      language: 'ts',
      content:
        "const fakeCart = {\n  items: signal<CartItem[]>([]),\n  add: jasmine.createSpy('add'),\n};\n\nTestBed.configureTestingModule({\n  imports: [ProductCardComponent],\n  providers: [{ provide: CartService, useValue: fakeCart }],\n});\n\n// component code runs unchanged — inject(CartService) resolves the fake",
    },
  ],
  challenges: [
    {
      id: 'di-008-c1',
      type: 'multiple-choice',
      title: 'Swap Reality Out',
      difficulty: 'hard',
      tags: ['angular', 'testing'],
      storyContext:
        'ProductCardComponent injects CartService (providedIn: "root"). The spec must verify add() is called on click — without a real cart, and without touching the component.',
      prompt: 'How does the test take control of the dependency?',
      options: [
        {
          id: 'a',
          label: 'Subclass ProductCardComponent in the spec and override a protected getCart() hook that returns the fake.',
          isCorrect: false,
          feedback:
            'Test-only subclassing means the tested class is not the shipped class — and no such hook exists. The injector is the substitution point.',
        },
        {
          id: 'b',
          label: 'Monkey-patch CartService.prototype.add before creating the component, and restore it after.',
          isCorrect: false,
          feedback:
            'Prototype patching leaks across specs and skips DI entirely — flaky-test folklore is built on this move.',
        },
        {
          id: 'c',
          label: 'providedIn: "root" services cannot be faked — the spec must assert against the real CartService state.',
          isCorrect: false,
          feedback:
            'providedIn: "root" is just a default recipe — a TestBed provider for the same token shadows it, nearest-wins, like any injector.',
        },
        {
          id: 'd',
          label:
            'TestBed.configureTestingModule({ providers: [{ provide: CartService, useValue: fakeCart }] }) — the test injector maps the token to the fake, the component’s inject(CartService) resolves it, and the spy records the click.',
          isCorrect: true,
          feedback:
            'Session one’s promise kept: because the component ASKS, the test decides what arrives. No component changes, no patching.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Where did the “which instance” decision move to, back in mission 1?' },
        { level: 2, title: 'Concept', content: 'TestBed builds the injector for the spec — providers there win resolution.' },
        { level: 3, title: 'Specific clue', content: 'The component must run UNCHANGED — two options modify or patch it.' },
        { level: 4, title: 'Guided solution', content: 'Provide { provide: CartService, useValue: fakeCart } in TestBed.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Reality swapped' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'Prototype-patching spread through the spec suite — tests passed alone and failed in any other order.',
        },
      ],
      helpLinks: [
        { topicId: 'di.testing', label: 'Overriding providers in tests' },
        { topicId: 'testing.unit-tests', label: 'Unit tests' },
      ],
      successFeedback: 'The injector was always the seam — tests just configure it.',
      failureFeedback: 'The component asks the injector. Which option answers as the injector?',
    },
    {
      id: 'di-008-c2',
      type: 'code-review',
      title: 'Review the Spec Setup',
      difficulty: 'hard',
      tags: ['angular', 'testing'],
      storyContext: 'A teammate’s spec for CheckoutComponent. It passes locally. Review the DI decisions before it merges.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'checkout-spec',
          type: 'code',
          title: 'checkout.component.spec.ts (proposed)',
          language: 'ts',
          content:
            "beforeEach(() => {\n  TestBed.configureTestingModule({\n    imports: [CheckoutComponent],\n    providers: [\n      PaymentService, // the real one — 'mocking it felt dishonest'\n      { provide: APP_CONFIG, useValue: { apiUrl: 'https://api.dmm.dev', retries: 5 } },\n      { provide: OrderService, useValue: { submit: () => of({ id: 1 }) } },\n    ],\n  });\n  fixture = TestBed.createComponent(CheckoutComponent);\n});\n\nit('submits the order', () => {\n  fixture.componentInstance.pay();\n  expect(TestBed.inject(OrderService).submit).toHaveBeenCalled();\n});",
        },
      ],
      findings: [
        {
          id: 'real-payment-service',
          label:
            'Providing the real PaymentService means the spec exercises real payment logic — and its HttpClient dependency chain — turning a component unit test into an integration test that fails wherever the network does',
          isCorrect: true,
          feedback:
            '“Mocking felt dishonest” inverts the lesson: the unit under test is the COMPONENT; the fake keeps the test about the component. Honest is a spy that records the interaction.',
        },
        {
          id: 'config-usevalue',
          label: 'APP_CONFIG pointing at the production apiUrl in a spec risks real requests to production',
          isCorrect: false,
          feedback:
            'A useValue config object cannot make requests by itself — with dependencies faked, the URL is inert data. Providing a token in a spec is the pattern working as intended (a placeholder URL would be tidier, not safer).',
        },
        {
          id: 'submit-not-spy',
          label:
            'The OrderService fake’s submit is a plain arrow function, but the test asserts toHaveBeenCalled() — that matcher needs a spy, so the assertion throws “Expected a spy” on every run',
          isCorrect: true,
          feedback:
            'jasmine.createSpy(…).and.returnValue(of({ id: 1 })) records calls AND returns the stream — a plain function does only half the job the test relies on.',
        },
        {
          id: 'testbed-inject-assert',
          label: 'Asserting via TestBed.inject(OrderService) is wrong — the test must reach the instance through the component to prove wiring',
          isCorrect: false,
          feedback:
            'TestBed.inject resolves against the same injector the component used — same token, same instance. Reaching “through the component” would test private structure, not behaviour.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'One provider is too real; one fake is not fake enough.' },
        { level: 2, title: 'Concept', content: 'Fakes isolate the unit; spies record interactions — a fake without a spy asserts nothing.' },
        { level: 3, title: 'Specific clue', content: 'Run the assertion in your head: what does toHaveBeenCalled need its target to be?' },
        { level: 4, title: 'Guided solution', content: 'Flag the real PaymentService and the spy-less submit.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Setup reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The spec hit the payment sandbox from CI — rate limits made the whole pipeline flaky for a week.',
        },
      ],
      helpLinks: [
        { topicId: 'di.testing', label: 'Overriding providers in tests' },
        { topicId: 'testing.flaky-tests', label: 'Flaky tests' },
      ],
      successFeedback: 'Real where it must be, fake where it should be, spies where you assert — spec setup as provider design.',
      failureFeedback: 'Two findings describe healthy patterns. Check what each provider actually DOES in this spec.',
    },
  ],
  reflectionPrompt: 'Which of our specs provides a real service out of politeness — and what does its failure actually indicate when it goes red?',
  rewards: [{ type: 'xp', amount: 15, label: 'Payoff collected' }],
};
