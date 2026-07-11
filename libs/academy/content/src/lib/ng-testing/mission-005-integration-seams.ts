import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — integration tests: real collaborators at the seams where
 * unit tests lie, and HttpTestingController at the wire.
 */
export const fnTe005IntegrationSeams: MissionDefinition = {
  id: 'te-005-integration-seams',
  campaignId: 'ng-testing',
  title: 'Where the Wires Meet',
  summary:
    'Integration tests keep collaborators real across one seam — the store with its service, the service with the HTTP layer — to catch what isolated tests cannot.',
  difficulty: 'medium',
  learningObjectives: [
    'Choose which seam an integration test keeps real',
    'Test HTTP services against HttpTestingController',
    'Recognise bugs that only live BETWEEN units',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session five’s trigger bug: the cart store’s unit tests were green (stubbed pricing service), the pricing service’s unit tests were green (stubbed http), and production carts showed prices in the wrong currency. Every unit was right; the HANDSHAKE was wrong.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The store passed currency as a param; the service expected it in the payload. Both stubs agreed with their own test’s assumptions — stubs always do. Integration tests exist for the handshakes: pick ONE seam, keep both sides real, and verify the conversation. At the wire, HttpTestingController plays the server: real HttpClient, real interceptors, scripted responses, asserted requests.',
    },
  ],
  contextArtefacts: [
    {
      id: 'http-testing',
      type: 'code',
      title: 'The wire seam, kept honest',
      language: 'ts',
      content:
        "TestBed.configureTestingModule({\n  providers: [provideHttpClient(withInterceptors([authInterceptor])), provideHttpClientTesting()],\n});\nconst http = TestBed.inject(HttpTestingController);\n\nservice.loadPrices('EUR').subscribe();\n\nconst req = http.expectOne('/api/prices?currency=EUR'); // the REQUEST is the assertion\nexpect(req.request.headers.get('Authorization')).toMatch(/^Bearer /); // interceptor ran\nreq.flush(prices);\nhttp.verify(); // no unexpected requests escaped",
    },
  ],
  challenges: [
    {
      id: 'te-005-c1',
      type: 'multiple-choice',
      title: 'The Handshake Bug',
      difficulty: 'medium',
      tags: ['testing', 'angular'],
      storyContext: 'The currency bug post-mortem. Both unit suites green, production wrong. The team asks what test WOULD have caught it.',
      prompt: 'What is the right addition?',
      options: [
        {
          id: 'a',
          label: 'Stricter unit stubs — the store’s pricing stub should have validated the arguments it received.',
          isCorrect: false,
          feedback:
            'The stub validating against the SAME test author’s assumption is the existing failure with extra steps — both sides of a handshake cannot be played by one imagination.',
        },
        {
          id: 'b',
          label: 'An E2E checkout test asserting the final price — the only level where the whole truth is visible.',
          isCorrect: false,
          feedback:
            'It would catch it — at browser price, with “total is wrong” as the diagnosis. The handshake has a cheaper, sharper home one level down.',
        },
        {
          id: 'c',
          label:
            'An integration test across exactly that seam: real store + real pricing service, doubled only at the wire (HttpTestingController). The store calls loadPrices; the test asserts the actual REQUEST carries the currency where the API expects it. The mismatch turns red in milliseconds with a request diff as the message.',
          isCorrect: true,
          feedback:
            'One seam kept real, one bug class eliminated: handshake tests verify the conversation both stubs were faking.',
        },
        {
          id: 'd',
          label: 'Shared TypeScript types between store and service — the compiler catches parameter mismatches for free.',
          isCorrect: false,
          feedback:
            'Types help and were probably present — “currency: string” in a param and “currency: string” in a payload both compile; WHERE the value travels is runtime shape, the type system’s blind spot (the HTTP campaign’s whole lesson).',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Both units were right alone. Where does “alone” end?' },
        { level: 2, title: 'Concept', content: 'Integration = one real seam, doubled only at its far edge.' },
        { level: 3, title: 'Specific clue', content: 'What artefact shows the currency in the wrong place? The outgoing request.' },
        { level: 4, title: 'Guided solution', content: 'Store + service real, HttpTestingController at the wire.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Handshake tested' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The seam stayed untested — the next handshake bug (headers vs params) shipped the same way six weeks later.',
        },
      ],
      helpLinks: [{ topicId: 'test.integration', label: 'Integration seams' }],
      successFeedback: 'The conversation itself under test — the bug class, not just the bug, is closed.',
      failureFeedback: 'Draw the two stubs and what each assumed. What test contains BOTH real sides?',
    },
    {
      id: 'te-005-c2',
      type: 'multiple-choice',
      title: 'How Real Is Too Real',
      difficulty: 'medium',
      tags: ['testing', 'angular'],
      storyContext:
        'Encouraged, a teammate proposes the integration suite hit a real staging API — “HttpTestingController is still a mock; staging is the truth.”',
      prompt: 'Where does the realness budget stop, and why?',
      options: [
        {
          id: 'a',
          label:
            'At the process boundary: HttpTestingController keeps everything IN-PROCESS real (client, interceptors, serialisation — where our bugs live) while scripting the far side. Staging adds network flakes, shared mutable state and someone else’s deploy schedule to every CI run — the failures stop meaning “our code broke”. Cross-process truth belongs to a handful of contract/smoke tests, not the suite.',
          isCorrect: true,
          feedback:
            'The suite’s job is verdicts about OUR code: deterministic, isolated, fast. Realness beyond the process boundary buys truth about infrastructure at the cost of truth about the diff.',
        },
        {
          id: 'b',
          label: 'Staging is right — tests against mocks can never fail for real reasons, and CI flakiness is a price of honesty.',
          isCorrect: false,
          feedback:
            '“Fails when staging redeploys” is not honesty, it is noise — and noisy suites train teams to re-run until green, which un-tests everything.',
        },
        {
          id: 'c',
          label: 'Spin up the real backend in Docker per CI run — realness without sharing staging with anyone.',
          isCorrect: false,
          feedback:
            'Solves the SHARING problem, keeps the layer confusion: the frontend suite now fails on backend migrations and seeds — legitimate tests, wrong repo. (As a separate contract-test pipeline: great.)',
        },
        {
          id: 'd',
          label: 'Record real staging responses once and replay them — cassettes give real payloads with mock determinism.',
          isCorrect: false,
          feedback:
            'Cassettes drift silently: the API changes, the recording stays green, and the suite certifies a conversation nobody has anymore. Better as an occasional refresh tool than a foundation.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'When this suite goes red, what must that MEAN?' },
        { level: 2, title: 'Concept', content: 'The process boundary: in-process real, far side scripted.' },
        { level: 3, title: 'Specific clue', content: 'Whose deploy schedule can turn your PR red under each option?' },
        { level: 4, title: 'Guided solution', content: 'HttpTestingController for the suite; contract tests for the far side.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Budget set' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The staging suite shipped — within a month, “re-run CI” was muscle memory and red meant nothing.',
        },
      ],
      helpLinks: [
        { topicId: 'test.integration', label: 'Integration seams' },
        { topicId: 'testing.contract-tests', label: 'Contract tests' },
      ],
      successFeedback: 'Real to the process edge, scripted beyond — red means the diff again.',
      failureFeedback: 'Complete the sentence for each option: “this test failed, therefore ___”. Which stays about your code?',
    },
  ],
  reflectionPrompt: 'Name our last bug that lived BETWEEN two green units: which seam, and does a test hold it real today?',
  rewards: [{ type: 'xp', amount: 10, label: 'Seams held' }],
};
