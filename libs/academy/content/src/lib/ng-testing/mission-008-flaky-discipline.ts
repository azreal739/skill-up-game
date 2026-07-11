import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — flaky tests: the four sources (time, order, shared state,
 * network), and the quarantine discipline that keeps red meaningful.
 */
export const fnTe008FlakyDiscipline: MissionDefinition = {
  id: 'te-008-flaky-discipline',
  campaignId: 'ng-testing',
  title: 'Red Must Mean News',
  summary:
    'Flaky tests train teams to ignore red — hunt the four sources, quarantine ruthlessly, and fix root causes or delete.',
  difficulty: 'hard',
  learningObjectives: [
    'Diagnose flakes by their source: time, order, shared state, network',
    'Run a quarantine policy that protects the suite’s meaning',
    'Review tests for flake sources before they ship',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session eight’s number: our suite had 4 known flaky tests, and our incident review found engineers had dismissed a REAL failure as “probably the flaky ones” — for three days. Four bad tests taxed the credibility of two thousand good ones.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Every flake has a source, and there are only four: TIME (sleeps, real dates, timezone luck), ORDER (test B needs test A’s leftovers), SHARED STATE (globals, singletons, un-reset stores), NETWORK (anything off-process). The policy: a flake is quarantined the DAY it flakes — skipped with a ticket — then root-caused within the sprint or deleted. An ignored flake is not a test; it is a credibility leak.',
    },
  ],
  contextArtefacts: [
    {
      id: 'four-sources',
      type: 'code',
      title: 'The four sources, with tells',
      language: 'text',
      content:
        'TIME          passes locally, fails in CI at 2am; new Date() anywhere; sleeps\nORDER         passes alone, fails in the suite (or vice versa); .skip changes OTHER results\nSHARED STATE  fails only after certain tests; singletons, static caches, localStorage\nNETWORK       fails on slow CI days; any real endpoint, DNS, or clock server\n\npolicy: flake observed → quarantine same day (skip + ticket) → root-cause or delete within sprint',
    },
  ],
  challenges: [
    {
      id: 'te-008-c1',
      type: 'multiple-choice',
      title: 'Diagnose by Tell',
      difficulty: 'hard',
      tags: ['testing'],
      storyContext:
        '“expires trial accounts after 30 days” fails every run between midnight and 1am UTC, passes all day otherwise. It creates an account, sets createdAt to new Date(), subtracts 30 days, and asserts expiry.',
      prompt: 'What is the source, and what is the fix?',
      options: [
        {
          id: 'a',
          label:
            'TIME — the test computes “30 days ago” from the real clock, and around midnight the subtraction crosses a date boundary differently than the code’s day-granular comparison expects. Fix: inject the clock (the DI campaign built this door) — the test pins now to a fixed instant and asserts against deterministic dates. Real time never enters a unit test.',
          isCorrect: true,
          feedback:
            'The 2am-only failure is time’s signature tell. A clock injected as a dependency turns “sometimes” into “always or never” — the only two acceptable test outcomes.',
        },
        {
          id: 'b',
          label: 'ORDER — a slow midnight cron in CI reorders the specs; enforcing alphabetical execution stabilises it.',
          isCorrect: false,
          feedback:
            'Order flakes change with the TEST SET, not the wall clock — and enforcing an order hides order-dependence rather than fixing it.',
        },
        {
          id: 'c',
          label: 'SHARED STATE — the account row persists between runs; a truncate-before-each fixes it.',
          isCorrect: false,
          feedback:
            'Leftover state fails at any hour — nothing about residue cares that it is midnight UTC. The clock correlation acquits this suspect.',
        },
        {
          id: 'd',
          label: 'NETWORK — CI’s NTP sync drifts at midnight; mocking the fetch layer removes the dependency.',
          isCorrect: false,
          feedback:
            'No network call exists in the test — and NTP drift is milliseconds, not the hour-wide window observed.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The failure correlates with the WALL CLOCK. Which source owns that tell?' },
        { level: 2, title: 'Concept', content: 'Real time in a test = a different test every run.' },
        { level: 3, title: 'Specific clue', content: 'What is special about date arithmetic performed just after midnight?' },
        { level: 4, title: 'Guided solution', content: 'Inject the clock; pin now.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Source named' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The midnight flake got a retry annotation instead of a clock — it kept flaking, now invisibly.',
        },
      ],
      helpLinks: [
        { topicId: 'test.flaky-discipline', label: 'Flaky tests' },
        { topicId: 'di.provider-recipes', label: 'Provider recipes' },
      ],
      successFeedback: 'Tell read, clock injected — the test now runs in a universe you control.',
      failureFeedback: 'Match the correlation: WHAT varies between a noon run and a 00:30 run of this exact code?',
    },
    {
      id: 'te-008-c2',
      type: 'code-review',
      title: 'Review for Flake Sources',
      difficulty: 'hard',
      tags: ['testing'],
      storyContext: 'A new spec file heads for the suite. Review it for the four sources before they bite.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'flake-candidates',
          type: 'code',
          title: 'session.service.spec.ts (proposed)',
          language: 'ts',
          content:
            "describe('SessionService', () => {\n  const service = new SessionService(); // shared across all specs in this file\n\n  it('stores the auth token', () => {\n    service.start('token-abc');\n    expect(service.token()).toBe('token-abc');\n  });\n\n  it('reports anonymous before start', () => {\n    expect(service.isAnonymous()).toBe(true); // relies on running BEFORE the spec above\n  });\n\n  it('expires after the configured ttl', fakeAsync(() => {\n    service.start('t', { ttlMs: 1000 });\n    tick(1001);\n    expect(service.isAnonymous()).toBe(true);\n  }));\n});",
        },
      ],
      findings: [
        {
          id: 'shared-instance',
          label:
            'One SessionService is constructed at describe-time and shared by every spec — each test inherits the previous test’s session state: the classic shared-state flake, waiting for any reorder or .only to expose it',
          isCorrect: true,
          feedback:
            'Fresh instance per test (beforeEach or a factory) is the iron rule: tests must own their world. Shared instances make the suite one long test wearing several names.',
        },
        {
          id: 'order-dependent-anon',
          label:
            '“reports anonymous before start” only passes if it runs before the token spec — it encodes an ORDER dependency on its sibling, and jasmine’s random-order mode (or a future .only) flips it red with zero code changes',
          isCorrect: true,
          feedback:
            'The two findings share one root cause — the shared instance — but this spec adds the explicit order bet. With a fresh instance per test, “anonymous before start” becomes trivially, permanently true.',
        },
        {
          id: 'fakeasync-ttl',
          label: 'The ttl spec uses fakeAsync/tick — simulated time can mask real timer bugs; the ttl deserves one real-time test with an actual 1s wait',
          isCorrect: false,
          feedback:
            'Backwards: tick(1001) is the CURE for time flakes — deterministic, instant, precise. A real 1s sleep is the disease this mission exists to eradicate. This spec is the file’s healthiest.',
        },
        {
          id: 'magic-token-string',
          label: 'Hardcoded token strings ("token-abc") should come from a shared fixtures module to avoid duplication across specs',
          isCorrect: false,
          feedback:
            'A literal string in the arrange and the assert of ONE test is clarity, not duplication — extracting it to a fixtures module adds indirection where a reader wants immediacy. Style preference at most.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Find what outlives a single test, then find who depends on the running order.' },
        { level: 2, title: 'Concept', content: 'Fresh world per test; no test may know its siblings exist.' },
        { level: 3, title: 'Specific clue', content: 'Run the file with random order in your head. Which specs survive?' },
        { level: 4, title: 'Guided solution', content: 'Flag the shared instance and the order-dependent spec.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Sources swept' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The shared-instance style copied itself into twelve spec files — the random-order upgrade a year later turned forty tests red at once.',
        },
      ],
      helpLinks: [{ topicId: 'test.flaky-discipline', label: 'Flaky tests' }],
      successFeedback: 'Worlds per test, order irrelevant, time simulated — the suite stays boringly deterministic.',
      failureFeedback: 'One flagged item attacks the file’s best practice. The real defects both trace to one shared line.',
    },
  ],
  reflectionPrompt: 'How many currently-flaky tests does our suite tolerate — and what did the LAST dismissed-as-flaky failure turn out to be?',
  rewards: [{ type: 'xp', amount: 15, label: 'Red restored' }],
};
