import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — E2E: a handful of critical journeys, stable selectors,
 * setup through APIs, and why big E2E suites rot.
 */
export const fnTe007E2eJourneys: MissionDefinition = {
  id: 'te-007-e2e-journeys',
  campaignId: 'ng-testing',
  title: 'The Expensive Few',
  summary:
    'E2E buys certainty nothing else can — whole-system journeys — at a price that only a handful of tests can justify.',
  difficulty: 'hard',
  learningObjectives: [
    'Select the journeys that justify E2E price',
    'Build E2E tests that resist UI churn: testids, API setup',
    'Explain why hundred-test E2E suites rot into re-run culture',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session seven autopsy: our old Protractor suite. 212 tests at its peak, 40 minutes, ~7 random failures per run. The team’s coping strategy — documented in the wiki! — was “re-run twice before investigating”. It died un-mourned.',
    },
    {
      speaker: 'Senior Dev',
      text: 'E2E is the only level where “a real user can actually check out” is provable — and every test costs seconds, touches every layer, and inherits every layer’s flakiness. The maths only works for a HANDFUL: the journeys whose breakage is a company incident. Sign-in. Checkout. The search-to-detail spine. Each hardened: data-testid selectors, setup through APIs not clicks, no sleeps.',
    },
  ],
  contextArtefacts: [
    {
      id: 'hardened-journey',
      type: 'code',
      title: 'A hardened journey',
      language: 'ts',
      content:
        "test('a signed-in user completes checkout', async ({ page, request }) => {\n  // setup through the API — 200ms, deterministic, not a UI tour\n  const user = await seedUser(request);\n  const cart = await seedCart(request, user, [SKU.basic]);\n  await signInViaApi(page, user);\n\n  await page.goto('/checkout');\n  await page.getByTestId('pay-now').click();\n  await expect(page.getByTestId('order-confirmation')).toContainText('Order #');\n});",
    },
  ],
  challenges: [
    {
      id: 'te-007-c1',
      type: 'multiple-choice',
      title: 'Why 212 Tests Rotted',
      difficulty: 'hard',
      tags: ['testing'],
      storyContext: 'The autopsy. Each of the 212 was individually reasonable — someone’s feature, protected end to end.',
      prompt: 'What killed the suite, structurally?',
      options: [
        {
          id: 'a',
          label: 'Protractor itself — the same 212 tests on Playwright’s faster, auto-waiting runner would have stayed healthy.',
          isCorrect: false,
          feedback:
            'Playwright halves the pain and changes no math: 212 whole-system tests still multiply every layer’s failure rate into daily red noise.',
        },
        {
          id: 'b',
          label:
            'Compound probability: each test crosses every layer, so per-test flake rates COMPOUND across 212 — at even 99.9% per-test reliability the RUN fails constantly for non-bug reasons. Red stopped meaning “bug”, re-running became policy, and a suite whose red means nothing protects nothing. E2E count must stay small enough that red is always news.',
          isCorrect: true,
          feedback:
            'The rot is arithmetic, not tooling: whole-system tests inherit whole-system flakiness, and volume converts it into noise. The handful survives BECAUSE it is a handful.',
        },
        {
          id: 'c',
          label: 'Missing test independence — shared seed data let tests corrupt each other; isolation would have scaled to 212.',
          isCorrect: false,
          feedback:
            'Shared state was A source of flakes (mission 8 hunts it) — but perfectly isolated browser tests still inherit network, rendering and timing noise that compounds with count.',
        },
        {
          id: 'd',
          label: 'Ownership — E2E tests belonged to no team, so nobody fixed them; a rotation would have kept 212 green.',
          isCorrect: false,
          feedback:
            'Ownership helps maintenance but cannot repeal the arithmetic — a rotation assigned to un-flake 212 whole-system tests is a permanent full-time job.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Compute: 212 tests × every layer’s reliability. What is the RUN’s pass rate?' },
        { level: 2, title: 'Concept', content: 'Red must mean news — volume converts inherited flakiness into noise.' },
        { level: 3, title: 'Specific clue', content: 'The wiki said re-run twice. What did red mean by then?' },
        { level: 4, title: 'Guided solution', content: 'Pick the compounding-probability answer.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Rot explained' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The replacement suite was seeded with 60 tests “to be safe” — the wiki page about re-running got a new header.',
        },
      ],
      helpLinks: [{ topicId: 'test.e2e', label: 'E2E strategy' }],
      successFeedback: 'The handful is a mathematical necessity, not a style — red stays news.',
      failureFeedback: '0.999^212 per layer, several layers. Do the multiplication before choosing.',
    },
    {
      id: 'te-007-c2',
      type: 'multiple-choice',
      title: 'Harden the Journey',
      difficulty: 'hard',
      tags: ['testing'],
      storyContext:
        'The new checkout journey test drafts in review: it signs in through the login FORM, builds the cart by clicking through the catalogue (14 clicks), selects elements by CSS classes, and waits with page.waitForTimeout(2000) before asserting.',
      prompt: 'Which hardening rules does the draft violate, and why do they matter?',
      options: [
        {
          id: 'a',
          label: 'Only the timeout — Playwright auto-waits on assertions, so the sleep is redundant; the rest is realistic user behaviour worth keeping.',
          isCorrect: false,
          feedback:
            'The sleep is the worst line but not the only one — 14 catalogue clicks make this test fail whenever the CATALOGUE changes, though it tests CHECKOUT.',
        },
        {
          id: 'b',
          label: 'The CSS selectors only — swap classes for testids and the journey is production-grade.',
          isCorrect: false,
          feedback:
            'Selectors are one of three violations: the UI-tour setup and the wall-clock wait each independently rot the test.',
        },
        {
          id: 'c',
          label: 'Nothing — E2E means end-to-end: the more UI the test traverses, the more it protects.',
          isCorrect: false,
          feedback:
            '“More UI traversed” means more unrelated surfaces whose changes break THIS test — protection of checkout diluted by fragility everywhere else.',
        },
        {
          id: 'd',
          label:
            'Three violations: setup must go through APIs (seed the cart, sign in via request — the test PROVES checkout, not the catalogue’s clickability); selectors must be testids (classes are styling, renamed without warning); and waits must be event-based auto-waiting assertions (wall-clock sleeps are load-dependent flakes). Each rule removes a failure mode unrelated to the journey under test.',
          isCorrect: true,
          feedback:
            'A hardened journey fails for exactly one reason: the journey broke. Everything else — setup, selectors, timing — is engineered out of the blast radius.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'List everything that could turn this test red. Cross out what is NOT checkout.' },
        { level: 2, title: 'Concept', content: 'Setup via API, selectors via testid, waits via events.' },
        { level: 3, title: 'Specific clue', content: 'The catalogue redesign ships next sprint. Which lines of this test die?' },
        { level: 4, title: 'Guided solution', content: 'All three hardening rules.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Journey hardened' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The catalogue redesign broke the checkout test five times in a month — the team re-learned the re-run habit.',
        },
      ],
      helpLinks: [{ topicId: 'test.e2e', label: 'E2E strategy' }],
      successFeedback: 'One test, one reason to fail — the journey guards checkout and nothing else can break it.',
      failureFeedback: 'Whose changes can redden this test as drafted? Count the teams.',
    },
  ],
  reflectionPrompt: 'List our E2E tests: for each, is its breakage a company incident — and when it last failed, was it news?',
  rewards: [{ type: 'xp', amount: 15, label: 'Few kept expensive' }],
};
