import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — the checkout testing strategy: allocate the pyramid,
 * review the suite, and sign off the CI discipline.
 */
export const fnTe009BossCheckoutStrategy: MissionDefinition = {
  id: 'te-009-boss-checkout-strategy',
  campaignId: 'ng-testing',
  title: 'Boss: The Checkout Strategy',
  summary:
    'Design the whole testing strategy for checkout — promises allocated across the pyramid, the suite reviewed, the CI discipline signed.',
  difficulty: 'boss',
  learningObjectives: [
    'Allocate a feature’s promises across test levels',
    'Review a mixed suite against the block’s standards',
    'Sign off a CI strategy that keeps red meaningful at scale',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The block finale is the feature that cannot break: checkout. Pricing rules, payment API, address forms, the confirmation flow. Design its testing strategy from scratch — every promise placed deliberately.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The sheet: pricing math provably correct across all rules and edges; the store↔API handshakes verified; the UI contract (form to confirmation) guarded; ONE journey proving the whole spine; and a CI setup where red always means news. Place every promise at its cheapest sufficient level.',
    },
  ],
  contextArtefacts: [
    {
      id: 'strategy-sheet',
      type: 'code',
      title: 'The checkout strategy sheet',
      language: 'text',
      content:
        '1. pricing rules + edges: provably correct (6 countries × rounding cases)\n2. store ↔ payment-API handshakes: request shape verified, incl. interceptors\n3. UI contract: address form validation, pay button states, confirmation render\n4. one E2E: signed-in user completes a real checkout (hardened)\n5. CI: red = news; flakes quarantined same-day; suite under 90s',
    },
  ],
  challenges: [
    {
      id: 'te-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Allocate the Promises',
      difficulty: 'hard',
      tags: ['testing'],
      storyContext: 'Sheet lines 1–4 name the promises. Place them.',
      prompt: 'Which allocation matches the sheet?',
      options: [
        {
          id: 'a',
          label: 'Everything as component tests — checkout is UI, and component tests exercise logic, wiring and render in one style.',
          isCorrect: false,
          feedback:
            'Pricing’s ~20 rule-edge combinations at component price (TestBed + DOM per case) is the VAT mistake from mission 1 — and component tests cannot verify the outgoing request shape at all.',
        },
        {
          id: 'b',
          label:
            'Pricing: unit tests against the pure pricing core — every rule and edge at millisecond price. Handshakes: integration specs, real store + real service + HttpTestingController asserting the actual requests through real interceptors. UI contract: component tests on the bench — DOM-driven, contract-asserting. The spine: ONE hardened Playwright journey. Each promise at its cheapest sufficient level.',
          isCorrect: true,
          feedback:
            'The sheet mapped onto the pyramid with nothing bought twice: math at unit price, conversations at integration price, contracts at component price, existence-of-the-whole at journey price.',
        },
        {
          id: 'c',
          label:
            'Pricing and handshakes as units with mocks; UI and spine as a shared set of 12 E2E scenarios covering the main form variations.',
          isCorrect: false,
          feedback:
            'Mocked “handshake” tests are the currency bug all over again (both sides imagined by one author) — and 12 E2E scenarios re-prove one spine eleven redundant times at the rot-prone level.',
        },
        {
          id: 'd',
          label:
            'Snapshot tests for the UI, contract tests against a staging backend for handshakes, units for pricing, one journey.',
          isCorrect: false,
          feedback:
            'Two known failures smuggled in: DOM snapshots freeze implementations (the design-system card lesson), and staging in CI makes red mean “someone deployed” (mission 5’s budget line).',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Take each sheet line and ask: cheapest level that can enforce THIS?' },
        { level: 2, title: 'Concept', content: 'Math→unit, conversation→integration, contract→component, spine→journey.' },
        { level: 3, title: 'Specific clue', content: 'Which level can see an outgoing request’s actual shape? Only one.' },
        { level: 4, title: 'Guided solution', content: 'Pick the per-level allocation.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Promises placed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The 12-scenario E2E plan shipped — checkout CI crossed eight minutes by summer and re-runs became policy.',
        },
      ],
      helpLinks: [
        { topicId: 'test.pyramid', label: 'The test pyramid' },
        { topicId: 'test.integration', label: 'Integration seams' },
      ],
      successFeedback: 'Every promise priced and placed — stage 1 clear.',
      failureFeedback: 'For each option, find the promise bought at the wrong price — or not enforceable at that level at all.',
    },
    {
      id: 'te-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Suite',
      difficulty: 'hard',
      tags: ['testing'],
      storyContext: 'The strategy lands as code. Four excerpts from the checkout suite arrive for block-standard review.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'suite-excerpts',
          type: 'code',
          title: 'checkout suite excerpts (proposed)',
          language: 'ts',
          content:
            "// (1) pricing unit\nit('rounds half-cents up for DE VAT', () => {\n  expect(priceOrder(makeOrder({ country: 'DE', net: 10.005 })).gross).toBe(11.91);\n});\n\n// (2) handshake integration\nit('sends payment with idempotency key', () => {\n  store.placeOrder(makeCmd());\n  const req = http.expectOne('/api/payments');\n  expect(req.request.headers.get('Idempotency-Key')).toBeTruthy();\n  req.flush(ok());\n  // NOTE: asserts header EXISTS — value is random per attempt anyway\n});\n\n// (3) component\nit('disables pay while submitting', fakeAsync(() => {\n  component.submitting.set(true);\n  fixture.detectChanges();\n  expect(component.canPay()).toBe(false);\n}));\n\n// (4) journey\ntest('checkout completes', async ({ page, request }) => {\n  await seedCartViaApi(request);\n  await page.goto('/checkout');\n  await page.getByTestId('pay-now').click();\n  await expect(page.getByTestId('order-confirmation')).toBeVisible();\n});",
        },
      ],
      findings: [
        {
          id: 'component-skips-dom',
          label:
            'Excerpt 3 sets a signal directly and asserts a computed — never rendering the disabled state or clicking anything: the template binding ([disabled]) is exactly what goes unguarded, so a template that loses it stays green',
          isCorrect: true,
          feedback:
            'The architecture block’s toggle() shortcut, reborn: drive the DOM (submit the form), assert the DOM (the button’s disabled attribute). Signals-in, computed-out is a unit test wearing a component costume.',
        },
        {
          id: 'journey-no-auth',
          label:
            'Excerpt 4 seeds a cart but never signs in — the sheet’s journey is “a SIGNED-IN user completes checkout”: either the test passes because checkout accidentally works unauthenticated (a bug blessed), or it depends on ambient auth state from another test (an order flake planted)',
          isCorrect: true,
          feedback:
            'Journeys prove the spine as SPECIFIED: signInViaApi is one line, and without it the test either certifies an auth hole or gambles on leftovers. Both futures are worse than the line.',
        },
        {
          id: 'idempotency-exists-only',
          label: 'Excerpt 2 only asserts the idempotency header EXISTS — it must assert the exact key value to be a real promise',
          isCorrect: false,
          feedback:
            'The note is right: the key is client-generated per intent — its exact value is not the contract; its PRESENCE and per-intent stability are. (A stronger spec might assert stability across a retry — an enhancement, not a defect.) Existence here is an honest promise.',
        },
        {
          id: 'pricing-magic-number',
          label: 'Excerpt 1 hardcodes 11.91 — the expected gross should be computed from the VAT table so the test tracks rate changes',
          isCorrect: false,
          feedback:
            'Mission 6’s exemplar again: literal expectations ARE the promise. Deriving the expectation from the same table the code reads makes the test agree by construction — a rate typo would pass. 11.91 is the point.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check excerpt 3 against the bench rules and excerpt 4 against the sheet’s own words.' },
        { level: 2, title: 'Concept', content: 'Components are driven through DOM; journeys match their specification exactly.' },
        { level: 3, title: 'Specific clue', content: 'Two findings relitigate correct choices from missions 6 and the HTTP boss.' },
        { level: 4, title: 'Guided solution', content: 'Flag the DOM-skipping component test and the unauthenticated journey.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Suite reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The pay button’s [disabled] binding was lost in a refactor — green suite, double-charged QA card, familiar story.',
        },
      ],
      helpLinks: [
        { topicId: 'arch.testing-contracts', label: 'Testing contracts' },
        { topicId: 'test.e2e', label: 'E2E strategy' },
      ],
      successFeedback: 'DOM driven, spec matched, honest promises spared — the suite holds block standard.',
      failureFeedback: 'Excerpt 3: what user-visible thing does it never touch? Excerpt 4: read the sheet’s line 4 word by word.',
    },
    {
      id: 'te-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the CI Discipline',
      difficulty: 'boss',
      tags: ['testing'],
      storyContext: 'The suite exists. Two proposals for how it runs in CI — sheet line 5 decides.',
      prompt: 'Which CI discipline ships?',
      options: [
        {
          id: 'a',
          label:
            'Run everything on every push with auto-retry (2×) on any failure — retries absorb flakes invisibly, keeping the pipeline green and developers unblocked.',
          isCorrect: false,
          feedback:
            'Auto-retry-everything is institutionalised flake tolerance: real intermittent bugs (the race that fails 1-in-3) get absorbed too, the flaky-test list never surfaces, and “green” now means “passed at least once in three attempts” — line 5’s red-means-news, inverted.',
        },
        {
          id: 'b',
          label:
            'Units + integration on every push (fast, no retries — red means news); component suite on every push (same rule); the E2E journeys on every MERGE to main plus hourly on main; flakes quarantined same-day by policy with a ticket and a sprint deadline (fix or delete); suite-time budget alarmed at 90s so growth is a decision, not a drift.',
          isCorrect: true,
          feedback:
            'Line 5 as machinery: no retry blur at the levels that must be deterministic, journeys where their cost fits, quarantine keeping the credibility tax at zero, and the time budget making suite growth visible. Red is news at every level. Signed.',
        },
        {
          id: 'c',
          label:
            'Full suite including E2E nightly only — pushes run lint and types; test failures reach the team each morning as a digest, keeping the inner loop instant.',
          isCorrect: false,
          feedback:
            'The instant inner loop costs the outer one everything: a morning digest of “someone in yesterday’s twelve merges broke pricing” is archaeology, not feedback — the suite exists to make the BREAKING PUSH red.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Line 5 has three clauses: red=news, same-day quarantine, 90s. Score each proposal on all three.' },
        { level: 2, title: 'Concept', content: 'Retries hide; quarantine surfaces. Feedback belongs on the push that caused it.' },
        { level: 3, title: 'Specific clue', content: 'Under proposal A, how would you ever LEARN a test is flaky?' },
        { level: 4, title: 'Guided solution', content: 'Sign the no-retry, quarantine-policy, budgeted pipeline.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Discipline signed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The auto-retry pipeline shipped — a genuine 1-in-3 payment race passed CI for a month before production found it at scale.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The testing block’s own capstone taught the team to stop reading red — the poll’s hands will all rise again next year.',
        },
      ],
      helpLinks: [
        { topicId: 'test.flaky-discipline', label: 'Flaky tests' },
        { topicId: 'test.pyramid', label: 'The test pyramid' },
      ],
      successFeedback:
        'Promises placed, suite honest, red meaningful at every level — checkout is guarded by a strategy, not a pile. Campaign complete.',
      failureFeedback:
        'For each proposal, tell the story of a 1-in-3 intermittent payment bug: when does each pipeline first show it to a human?',
    },
  ],
  reflectionPrompt: 'Write our own feature-critical sheet: for the flow that cannot break, where does each of its promises live today — and where is nothing standing guard?',
  rewards: [{ type: 'xp', amount: 25, label: 'Strategy shipped' }],
};
