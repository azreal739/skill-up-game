import { MissionDefinition } from '@academy/content-model';

/** Mission — "First Test Run" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const mission009FirstTestRun: MissionDefinition = {
  id: 'foundations-009-first-test-run',
  campaignId: 'foundations',
  title: 'First Test Run',
  summary: 'Review a new spec file and decide which test actually protects the platform.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise tests that assert nothing',
    'Spot non-deterministic tests before they poison CI',
    'Choose the most valuable test to write first for a bug',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The scoring service finally got its first spec file — but CI has started failing at random, and one “passing” test never actually checks anything.',
    },
    {
      speaker: 'Mission Control',
      text: 'A test suite the team cannot trust is worse than no suite. Review the specs, then pick the right first test for a fresh bug report.',
    },
  ],
  contextArtefacts: [
    {
      id: 'score-spec',
      type: 'code',
      title: 'score.service.spec.ts (as merged)',
      language: 'ts',
      content:
        "describe('calculateScore', () => {\n  it('works', () => {\n    const result = calculateScore([10, 20]);\n  });\n\n  it('labels today', () => {\n    expect(labelForDay(new Date())).toBe('Weekday special');\n  });\n\n  it('applies the bonus', () => {\n    expect(calculateScore([10, 20], { bonus: 5 })).toBe(35);\n  });\n});",
    },
  ],
  challenges: [
    {
      id: 'foundations-009-c1',
      type: 'code-review',
      title: 'Audit the Spec File',
      difficulty: 'medium',
      tags: ['testing'],
      storyContext: 'Two of these tests undermine the suite; one is genuinely good.',
      prompt: 'Select every real problem in score.service.spec.ts.',
      findings: [
        {
          id: 'exact-assert',
          label: "The bonus test asserts an exact value (toBe(35)) — too strict",
          isCorrect: false,
          feedback:
            'Exact assertions on deterministic maths are ideal — this is the healthiest test in the file.',
        },
        {
          id: 'no-assertion',
          label: "The 'works' test calls the function but never asserts anything",
          isCorrect: true,
          feedback:
            'It passes as long as the code does not throw — a green light that verifies nothing. Every test needs an expectation.',
        },
        {
          id: 'real-date',
          label: 'The day-label test depends on the real current date',
          isCorrect: true,
          feedback:
            'new Date() makes the result change with the calendar — this is the random CI failure. Pass a fixed date into the test instead.',
        },
        {
          id: 'describe-name',
          label: "Using describe('calculateScore') as the suite name is wrong",
          isCorrect: false,
          feedback: 'Naming the suite after the unit under test is exactly the convention.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Ask two questions of each test: does it check anything, and will it give the same answer tomorrow?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'A useful test is deterministic and asserts an outcome. Missing expectations create false confidence; real clocks and randomness create flakes that erode trust in every red build.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: "One test has no expect at all; another calls new Date() inside the expectation.",
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            "Flag the assertion-free 'works' test and the current-date test. The exact bonus assertion and the describe name are fine.",
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Spec audited' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 10,
          reason: 'Untrustworthy tests were merged and CI red became normal.',
        },
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'Engineers started re-running CI instead of reading failures.',
        },
      ],
      helpLinks: [
        { topicId: 'testing.unit-tests', label: 'Unit tests' },
        { topicId: 'testing.flaky-tests', label: 'Flaky tests' },
      ],
      successFeedback:
        'The suite is trustworthy again: every test asserts, every run is deterministic.',
      failureFeedback:
        'Re-check each test for a missing expectation or an input that changes between runs.',
    },
    {
      id: 'foundations-009-c2',
      type: 'multiple-choice',
      title: 'Pick the First Test',
      difficulty: 'medium',
      tags: ['testing'],
      storyContext:
        'Bug report: “Dashboard crashes when a customer has an empty score history.” You are about to fix calculateScore.',
      prompt: 'Which test do you write first?',
      options: [
        {
          id: 'a',
          label: 'A test asserting the private helper normalises its internal cache correctly',
          isCorrect: false,
          feedback:
            'Testing internals couples the suite to the implementation — refactors break tests without breaking behaviour.',
        },
        {
          id: 'b',
          label: 'A full-page screenshot test of the dashboard',
          isCorrect: false,
          feedback:
            'Slow, broad and brittle — it might catch the crash but tells you almost nothing about where or why.',
        },
        {
          id: 'c',
          label:
            "calculateScore([]) — a failing regression test that reproduces the empty-history crash, written before the fix",
          isCorrect: true,
          feedback:
            'Reproduce first: the failing test proves you understand the bug, then proves the fix, then guards it forever.',
        },
        {
          id: 'd',
          label: 'No test — fix the crash first and add tests when there is time',
          isCorrect: false,
          feedback:
            '“When there is time” is how the same crash returns in six months with nothing to catch it.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'The bug report hands you the exact input that fails.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'A regression test reproduces a bug as a failing test before the fix. It confirms the diagnosis, verifies the fix, and permanently guards against reoccurrence.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'The crashing input is an empty array — one option calls the function with exactly that.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Write calculateScore([]) as a failing test first, then fix the function until it passes.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Regression pinned' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The empty-history crash shipped again in a later release.',
        },
      ],
      helpLinks: [{ topicId: 'testing.unit-tests', label: 'Unit tests' }],
      successFeedback: 'Reproduce, fix, guard — the unhappy path is covered for good.',
      failureFeedback:
        'The most valuable first test is the one that fails for exactly the reported reason.',
    },
  ],
  reflectionPrompt:
    'Why is a test with no assertion more dangerous than having no test at all?',
  rewards: [
    { type: 'xp', amount: 5, label: 'First test run complete' },
    { type: 'badge', id: 'ci-champion', label: 'CI Champion' },
  ],
};
