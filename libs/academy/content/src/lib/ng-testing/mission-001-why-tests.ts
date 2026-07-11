import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — why tests exist: executable specifications that fail for
 * the right reason, and the pyramid as a cost model.
 */
export const fnTe001WhyTests: MissionDefinition = {
  id: 'te-001-why-tests',
  campaignId: 'ng-testing',
  title: 'Tests Are Executable Promises',
  summary:
    'A good test is a promise the code must keep — it fails when behaviour breaks, passes when implementation changes, and reads as the spec.',
  difficulty: 'intro',
  learningObjectives: [
    'State what a test suite actually buys a team',
    'Judge a test by when it fails, not that it passes',
    'Read the pyramid as a cost model, not a ritual',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'New block: testing. It started with an uncomfortable poll — “who has shipped a bug through a green suite this quarter?” Every hand went up. So the first session asked what the suite is even FOR.',
    },
    {
      speaker: 'Senior Dev',
      text: 'A test is an executable promise: THIS input produces THAT behaviour, forever, or the build goes red. The suite’s value is the sum of promises it enforces — not its count, not its coverage number. And the pyramid is not ideology; it is a cost model: fast cheap unit promises by the hundred, slower integration promises by the dozen, expensive end-to-end promises by the handful.',
    },
  ],
  contextArtefacts: [
    {
      id: 'pyramid-costs',
      type: 'code',
      title: 'The pyramid as a bill',
      language: 'text',
      content:
        'E2E        ~seconds each · breaks on any layer · handful: critical journeys\nintegration ~100ms each  · real collaborators    · dozens: seams and wiring\nunit        ~1ms each    · one promise apiece    · hundreds: logic and edges\n\nsame promise, three prices — buy each promise at its cheapest level',
    },
  ],
  challenges: [
    {
      id: 'te-001-c1',
      type: 'multiple-choice',
      title: 'The Green Suite That Lied',
      difficulty: 'intro',
      tags: ['testing'],
      storyContext:
        'The poll’s worst story: a currency-rounding bug shipped through 800 green tests. Post-mortem finding: no test anywhere asserted rounding behaviour — dozens asserted the rounding function was CALLED.',
      prompt: 'What does the story say about test value?',
      options: [
        {
          id: 'a',
          label: '800 tests was too few for the codebase size — coverage thresholds would have forced the missing test into existence.',
          isCorrect: false,
          feedback:
            'The calling code WAS covered — coverage counts execution, not promises. A threshold would have been satisfied by the same useless assertions.',
        },
        {
          id: 'b',
          label: 'The bug class was untestable — rounding edge cases belong to QA checklists, not automated suites.',
          isCorrect: false,
          feedback: 'expect(roundMoney(2.675)).toBe(2.68) is a one-line promise — few bug classes are MORE testable.',
        },
        {
          id: 'c',
          label:
            'A suite’s value is the behaviours it PROMISES, and “the function was called” promises nothing about what the function does. Green is only meaningful if red was possible — the suite had no way to go red on wrong rounding, so it was silent, not passing.',
          isCorrect: true,
          feedback:
            'The question to ask of any test: what bug would make THIS fail? If the honest answer is “a renamed method”, it guards furniture, not money.',
        },
        {
          id: 'd',
          label: 'Interaction tests are fine — the failure was not ALSO having an E2E test that exercised a real checkout total.',
          isCorrect: false,
          feedback:
            'An E2E would likely have caught this one — at the most expensive level, latest moment, with the vaguest diagnosis. The cheap unit promise was the missing piece.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Ask of the existing tests: what bug could make them fail?' },
        { level: 2, title: 'Concept', content: 'A test’s value = the behaviour it can catch breaking.' },
        { level: 3, title: 'Specific clue', content: '“Was called” versus “returns 2.68” — which one can catch wrong rounding?' },
        { level: 4, title: 'Guided solution', content: 'Pick the promises-not-executions answer.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Value defined' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The retro blamed “not enough tests” — and the team wrote 200 more of the same kind.',
        },
      ],
      helpLinks: [{ topicId: 'test.pyramid', label: 'The test pyramid' }],
      successFeedback: 'Green means something only where red was possible — the block’s first sentence.',
      failureFeedback: 'Take one of the was-called tests. Write down the bug that would turn it red. Struggle noted?',
    },
    {
      id: 'te-001-c2',
      type: 'multiple-choice',
      title: 'Buy at the Right Level',
      difficulty: 'easy',
      tags: ['testing'],
      storyContext:
        'Ticket: “validate that VAT calculation handles all 6 country rules and the 3 rounding edge cases”. A teammate starts writing 9 Playwright E2E tests, one per rule, through the full checkout UI.',
      prompt: 'What does the pyramid’s cost model say?',
      options: [
        {
          id: 'a',
          label:
            'Nine VAT rules are nine unit promises against the pure calculation function — milliseconds each, precise failures, every edge cheap to add. E2E buys ONE journey: “a checkout with VAT completes and shows a correct total” — proving the wiring once, not the math nine times.',
          isCorrect: true,
          feedback:
            'Same promises, bought at their cheapest level: logic at the unit price, wiring at the E2E price. The FP campaign’s pure core exists exactly so math never needs a browser.',
        },
        {
          id: 'b',
          label: 'The 9 E2E tests are right — VAT errors reach users through the UI, so the UI is where they must be caught.',
          isCorrect: false,
          feedback:
            'Bugs REACH users through the UI; they LIVE in the calculation. Nine browser journeys re-prove the same wiring eight redundant times, minutes per run, vaguest possible failures.',
        },
        {
          id: 'c',
          label: 'Split the difference: 9 integration tests through the checkout component with a real VAT service.',
          isCorrect: false,
          feedback:
            'Better than nine browsers, still paying component-price for function-promises — and the rounding edges get harder to set up, so they quietly get skipped.',
        },
        {
          id: 'd',
          label: 'Whichever level the team writes fastest — consistency of habit beats theoretical level-matching.',
          isCorrect: false,
          feedback:
            'The costs are not theoretical: they are CI minutes forever and diagnosis time per failure — habit does not discount them.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Separate the promises: 9 about math, 1 about wiring.' },
        { level: 2, title: 'Concept', content: 'Buy each promise at the cheapest level that can enforce it.' },
        { level: 3, title: 'Specific clue', content: 'Where does the VAT logic actually live — and can a function call reach it?' },
        { level: 4, title: 'Guided solution', content: 'Nine unit promises + one journey.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Level matched' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The nine browser tests shipped — CI gained four minutes, and rule ten arrived with “tests skipped, too slow”.',
        },
      ],
      helpLinks: [{ topicId: 'test.pyramid', label: 'The test pyramid' }],
      successFeedback: 'Math at unit price, wiring at journey price — the bill stays payable as rules grow.',
      failureFeedback: 'Price the suite at rule twenty: what does each option cost per CI run, and what fails when rule 14 breaks?',
    },
  ],
  reflectionPrompt: 'Pick a green test from our suite at random: what bug would turn it red? How long did it take you to answer?',
  rewards: [{ type: 'xp', amount: 5, label: 'Promises audited' }],
};
