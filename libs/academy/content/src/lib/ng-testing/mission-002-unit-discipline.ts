import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — unit test discipline: arrange-act-assert, one behaviour
 * per test, names that read as specification.
 */
export const fnTe002UnitDiscipline: MissionDefinition = {
  id: 'te-002-unit-discipline',
  campaignId: 'ng-testing',
  title: 'Small Promises, Well Written',
  summary:
    'Unit tests earn their volume through discipline — one behaviour each, arrange-act-assert, named so failures read as bug reports.',
  difficulty: 'easy',
  learningObjectives: [
    'Structure tests as arrange-act-assert with one behaviour each',
    'Name tests so the red list reads as a specification',
    'Keep the pure core the easiest thing in the repo to test',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session two projected a failing CI run from last month: "✗ should work correctly (2 of 2)". Nobody in the room — including the author — could say what had broken without opening the file.',
    },
    {
      speaker: 'Senior Dev',
      text: 'A unit test is read a hundred times for every time it is written, and mostly read when RED. So the disciplines serve the reader-at-3am: one behaviour per test (a failure names one thing), arrange-act-assert (setup, the move, the check — visually separate), and names shaped like “does X when Y” so the failing list IS the bug report. And notice how the FP campaign pays out here: pure functions test in three lines.',
    },
  ],
  contextArtefacts: [
    {
      id: 'aaa-shape',
      type: 'code',
      title: 'The shape, and the payoff of purity',
      language: 'ts',
      content:
        "it('applies the highest single discount when several match', () => {\n  // arrange\n  const cart = makeCart({ total: 100, coupons: ['SAVE10', 'SAVE25'] });\n  // act\n  const priced = priceCart(cart);\n  // assert\n  expect(priced.discount).toBe(25);\n});\n// pure function: no TestBed, no fakes, no async — three readable lines",
    },
  ],
  challenges: [
    {
      id: 'te-002-c1',
      type: 'multiple-choice',
      title: 'The Test Nobody Could Read',
      difficulty: 'easy',
      tags: ['testing'],
      storyContext:
        'The projected offender: it("should work correctly") containing 40 lines — creates a cart, adds items, applies a coupon, removes an item, asserts total, asserts count, asserts the coupon still applies, asserts an analytics spy.',
      prompt: 'What is wrong, and what is the rewrite?',
      options: [
        {
          id: 'a',
          label: 'Only the name — rename it to describe the scenario and the 40 lines are fine as a thorough journey.',
          isCorrect: false,
          feedback:
            'No name can summarise four assertions honestly — and when assertion two fails, three and four never RUN, hiding their status behind the first failure.',
        },
        {
          id: 'b',
          label:
            'Four promises are stapled together: when one fails you learn “something in cart flow” — and the later assertions go untested behind the first failure. Split into four tests, each arrange-act-assert with a does-X-when-Y name; shared setup goes in a builder (makeCart), not a mega-test.',
          isCorrect: true,
          feedback:
            'One behaviour per test converts a red run into a bug report: “✗ keeps the coupon when an item is removed” needs no file-opening at 3am.',
        },
        {
          id: 'c',
          label: 'The problem is the analytics assertion — remove it and the remaining three form a coherent story test.',
          isCorrect: false,
          feedback:
            'The analytics spy IS the most suspect assertion (mission 1’s was-called trap) — but removing it leaves three stapled promises with the same failure-masking.',
        },
        {
          id: 'd',
          label: 'Story tests are a legitimate style — the fix is comments marking each chapter so readers can navigate.',
          isCorrect: false,
          feedback:
            'Comments help the READER but not the RUNNER: the first failed chapter still silences all later chapters.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What do you KNOW when this test fails? What do you not know?' },
        { level: 2, title: 'Concept', content: 'One behaviour per test — failures should name one thing.' },
        { level: 3, title: 'Specific clue', content: 'Assertion 2 fails. What is the status of assertions 3 and 4?' },
        { level: 4, title: 'Guided solution', content: 'Split into four, share setup via builders.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Promises unstapled' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The mega-test grew to sixty lines — every cart bug hunt started with twenty minutes of archaeology.',
        },
      ],
      helpLinks: [{ topicId: 'test.behaviour', label: 'Testing behaviour' }],
      successFeedback: 'Four small promises, each with a name — the red list became the bug report.',
      failureFeedback: 'Simulate the failure: which line goes red, and what exactly does CI’s output tell you?',
    },
    {
      id: 'te-002-c2',
      type: 'multiple-choice',
      title: 'The Edge Case Budget',
      difficulty: 'easy',
      tags: ['testing'],
      storyContext:
        'The pure priceCart function gets its suite. The happy path is covered. The team debates which OTHER cases earn tests: empty cart, one expired coupon, coupon > total, two coupons tie, negative quantity (impossible via UI), 10,000 items.',
      prompt: 'Which cases earn tests, and on what principle?',
      options: [
        {
          id: 'a',
          label:
            'Empty cart, coupon > total, and the two-coupon tie — cases where the CORRECT answer is genuinely decidable and non-obvious (boundaries and rule interactions). Negative quantity earns a test only if the function CONTRACTS to reject it (then test the rejection); 10,000 items is a perf question, not a correctness promise.',
          isCorrect: true,
          feedback:
            'Edges earn tests where behaviour could plausibly be wrong or ambiguous — boundaries, interactions, and contracted rejections. “Impossible via UI” inputs still deserve a decided answer if the function accepts them.',
        },
        {
          id: 'b',
          label: 'All six — edge cases are cheap for pure functions, so exhaustiveness is the point of having a pure core.',
          isCorrect: false,
          feedback:
            'Cheap to WRITE, forever to maintain: a 10,000-item timing test in a unit suite is noise, and untriaged exhaustiveness buries the boundary cases that matter under filler.',
        },
        {
          id: 'c',
          label: 'Only the happy path — edge cases belong to property-based testing tools, not example tests.',
          isCorrect: false,
          feedback:
            'Property tests complement examples, but “coupon exceeds total returns zero, not negative” is a DECISION the team made — an example test documents it where property generators cannot.',
        },
        {
          id: 'd',
          label: 'Whichever cases have caused production bugs before — regression-driven testing keeps the suite honest.',
          isCorrect: false,
          feedback:
            'Regression tests are mandatory ADDITIONS, but waiting for production to find your boundaries outsources the thinking to your users.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each case: is there a decided, non-obvious correct answer to enforce?' },
        { level: 2, title: 'Concept', content: 'Boundaries, rule interactions and contracted rejections earn tests.' },
        { level: 3, title: 'Specific clue', content: 'What SHOULD priceCart return for coupon > total? If the team had to decide, test it.' },
        { level: 4, title: 'Guided solution', content: 'The three decidable edges + contract-dependent rejection.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Edges budgeted' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'The coupon-exceeds-total case went untested — production briefly issued negative totals as store credit.',
        },
      ],
      helpLinks: [
        { topicId: 'test.behaviour', label: 'Testing behaviour' },
        { topicId: 'fp.pure-functions', label: 'Pure functions' },
      ],
      successFeedback: 'Tests where decisions live — the suite documents the team’s answers, not its typing stamina.',
      failureFeedback: 'For each candidate case ask: did the team have to DECIDE what happens here?',
    },
  ],
  reflectionPrompt: 'Read our last red CI run: did the failing test names tell the story, or did someone have to open files?',
  rewards: [{ type: 'xp', amount: 5, label: 'Discipline set' }],
};
