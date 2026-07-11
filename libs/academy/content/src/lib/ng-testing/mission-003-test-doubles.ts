import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — test doubles: stubs answer, spies record, fakes behave —
 * and over-mocking welds tests to implementations.
 */
export const fnTe003TestDoubles: MissionDefinition = {
  id: 'te-003-test-doubles',
  campaignId: 'ng-testing',
  title: 'Stand-ins With Job Titles',
  summary:
    'Stubs answer questions, spies record calls, fakes implement behaviour — choose by what the test needs, and mock as little as the seam allows.',
  difficulty: 'easy',
  learningObjectives: [
    'Distinguish stubs, spies and fakes by the job each does',
    'Choose the lightest double that serves the assertion',
    'Recognise over-mocking as implementation coupling',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session three began with a spec file where the setup was 90 lines of mocks and the assertion was one line. The mocks mocked services that called mocked services. Changing ANY internal call broke thirty tests that all still “passed the behaviour”.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Doubles have job titles. STUB: answers a question the code will ask (getUser returns this). SPY: records that something happened, for outbound effects you cannot observe otherwise (analytics fired). FAKE: a working lightweight implementation (in-memory repo) when interactions are too rich to script. The discipline: double only at the SEAM — the boundary your test defined — and let everything inside it be real.',
    },
  ],
  contextArtefacts: [
    {
      id: 'double-jobs',
      type: 'code',
      title: 'Job titles',
      language: 'ts',
      content:
        "// STUB — answers: for state the code reads\nconst clock = { now: () => new Date('2026-01-01') };\n\n// SPY — records: for outbound effects you assert on\nconst analytics = { track: jasmine.createSpy('track') };\n\n// FAKE — behaves: when the interaction is too rich to script\nclass InMemoryCartRepo implements CartRepo {\n  private items: CartItem[] = [];\n  add(i: CartItem) { this.items.push(i); }\n  list() { return [...this.items]; }\n}",
    },
  ],
  challenges: [
    {
      id: 'te-003-c1',
      type: 'multiple-choice',
      title: 'Ninety Lines of Setup',
      difficulty: 'easy',
      tags: ['testing'],
      storyContext:
        'The projected spec tests OrderSummaryComponent. It mocks: the store, the pricing service THE STORE uses, the http client THE PRICING SERVICE uses, and the config THE HTTP LAYER reads. The assertion: the rendered total is "€25.00".',
      prompt: 'What went wrong, and what is the right seam?',
      options: [
        {
          id: 'a',
          label: 'Nothing — deep mocking gives full control; 90 lines is the honest price of isolating a component completely.',
          isCorrect: false,
          feedback:
            '“Complete isolation” isolated the test from reality too: the mocks re-implement three layers’ interactions, so the suite verifies the mocks agree with themselves.',
        },
        {
          id: 'b',
          label: 'The component should be tested E2E instead — components with deep dependency trees are not unit-testable.',
          isCorrect: false,
          feedback:
            'The tree is deep only because the test dug through it — the component itself touches ONE collaborator.',
        },
        {
          id: 'c',
          label: 'Replace the hand-mocks with an auto-mocking library — generated mocks track internal call changes automatically.',
          isCorrect: false,
          feedback:
            'Automating the weld does not un-weld it: thirty tests still break per internal refactor, now with generated diffs.',
        },
        {
          id: 'd',
          label:
            'The test mocked THROUGH the seam instead of AT it: the component’s boundary is the store — stub the store’s signals with plain values ({ total: signal(25) }) and everything below it stops existing for this test. One line of setup, and internal refactors of pricing/http/config touch nothing.',
          isCorrect: true,
          feedback:
            'Doubles live at the component’s own boundary — what IT injects. Deeper layers are other tests’ business, at their own seams.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What does the COMPONENT inject? That is the only seam this test owns.' },
        { level: 2, title: 'Concept', content: 'Double at the seam; below it, nothing exists for this test.' },
        { level: 3, title: 'Specific clue', content: 'Why does the test know the pricing service uses HttpClient at all?' },
        { level: 4, title: 'Guided solution', content: 'Stub the store; delete the other 85 lines.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Seam found' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The deep-mock style spread — the pricing refactor broke 200 tests, zero of them for behaviour reasons.',
        },
      ],
      helpLinks: [{ topicId: 'test.doubles', label: 'Test doubles' }],
      successFeedback: 'One seam, one stub, one assertion — the test knows exactly as much as the component does.',
      failureFeedback: 'List what the component injects. Now count how many layers the spec mocked. The gap is the problem.',
    },
    {
      id: 'te-003-c2',
      type: 'multiple-choice',
      title: 'Pick the Double',
      difficulty: 'medium',
      tags: ['testing'],
      storyContext:
        'Three tests to write: (1) “shows the user’s name” — component reads UserService.currentUser; (2) “reports a search to analytics with the query” — service calls Analytics.track; (3) “merging two carts keeps the newer quantity per item” — CartMergeService drives a repo through adds, reads and removes.',
      prompt: 'Which double does each test want?',
      options: [
        {
          id: 'a',
          label: 'Spies for all three — one tool, uniform style, and every interaction gets recorded for free.',
          isCorrect: false,
          feedback:
            'Test 1 needs an ANSWER, not a recording; test 3’s rich sequence scripted through spies becomes 40 lines of returnValues — the fake exists for exactly that pain.',
        },
        {
          id: 'b',
          label:
            '(1) a stub — currentUser answers with a fixed user, assert the rendered name; (2) a spy — assert track was called with the query, because the OUTBOUND call IS the behaviour; (3) a fake — an in-memory repo that actually behaves, so the merge logic runs against honest state.',
          isCorrect: true,
          feedback:
            'Job matched to need: reads want stubs, outbound effects want spies, rich interactions want fakes. Note test 2 is the one place was-called is RIGHT — the call is the contract.',
        },
        {
          id: 'c',
          label: 'Fakes for all three — real behaviour everywhere beats scripted answers on principle.',
          isCorrect: false,
          feedback:
            'A faked UserService for one property read is ceremony; and a faked Analytics that “behaves” gives you nothing to assert — the spy’s recording was the point.',
        },
        {
          id: 'd',
          label: '(1) stub, (2) stub returning success, (3) spy on every repo method with scripted returns.',
          isCorrect: false,
          feedback:
            'Test 2 with a stub has NO assertion left (nothing observable changed), and test 3’s scripted spy returns re-implement the repo badly — the two misfits swapped tools.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Per test: does the code READ from it, CALL OUT to it, or CONVERSE with it?' },
        { level: 2, title: 'Concept', content: 'Read → stub. Outbound effect → spy. Conversation → fake.' },
        { level: 3, title: 'Specific clue', content: 'What is the assertable OUTPUT of “reports to analytics”? Only a recording.' },
        { level: 4, title: 'Guided solution', content: 'Stub, spy, fake — in that order.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Doubles cast' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The all-spies style scripted the cart repo wrong — the merge bug lived happily inside the mock’s blessing.',
        },
      ],
      helpLinks: [{ topicId: 'test.doubles', label: 'Test doubles' }],
      successFeedback: 'Reads stubbed, effects spied, conversations faked — each double doing its actual job.',
      failureFeedback: 'For each test write the assertion line first. What must the double provide for that line to work?',
    },
  ],
  reflectionPrompt: 'Open our longest spec setup: which mocks sit below the component’s own seam — and whose job are those layers really?',
  rewards: [{ type: 'xp', amount: 10, label: 'Stand-ins hired' }],
};
