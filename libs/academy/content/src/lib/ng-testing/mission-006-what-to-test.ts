import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — what to test: coverage as byproduct, behaviour over
 * implementation, and the review that prunes theatre.
 */
export const fnTe006WhatToTest: MissionDefinition = {
  id: 'te-006-what-to-test',
  campaignId: 'ng-testing',
  title: 'Coverage Is a Byproduct',
  summary:
    'Chasing a coverage number produces tests that execute code without promising anything — write promises, and coverage follows as exhaust.',
  difficulty: 'medium',
  learningObjectives: [
    'Use coverage as a gap-finder, never as a target',
    'Identify test theatre: execution without assertion of behaviour',
    'Review a suite for promises versus performances',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session six, a confession from management — mine: two years ago I mandated 90% coverage. The number was reached in a quarter. The escaped-bug rate did not move. We measured HARDER and it still did not move.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Goodhart’s law, test edition: make coverage the target and it stops measuring anything. Coverage counts lines EXECUTED, and executing a line is not promising anything about it. Coverage is a fine gap-FINDER — “this branch has no test at all” is real information. As a target it manufactures theatre: tests that run code and assert the code ran.',
    },
  ],
  contextArtefacts: [
    {
      id: 'theatre-exhibit',
      type: 'code',
      title: 'Theatre, from our own repo',
      language: 'ts',
      content:
        "it('should call calculateTotals', () => {\n  const spy = spyOn(service, 'calculateTotals').and.callThrough();\n  service.checkout(cart);\n  expect(spy).toHaveBeenCalled(); // 14 lines now 'covered'. zero promised.\n});\n\nit('should create', () => {\n  expect(component).toBeTruthy(); // the whole template: covered.\n});",
    },
  ],
  challenges: [
    {
      id: 'te-006-c1',
      type: 'multiple-choice',
      title: 'The Number That Stopped Measuring',
      difficulty: 'medium',
      tags: ['testing'],
      storyContext: 'The 90%-and-no-improvement story. The team debates what to do with the coverage tooling now.',
      prompt: 'What is coverage actually FOR?',
      options: [
        {
          id: 'a',
          label: 'Raise the mandate to 100% — 90% left exactly the gaps where the bugs lived.',
          isCorrect: false,
          feedback:
            'The bugs lived in COVERED lines whose tests promised nothing — more of the metric buys more of the theatre that gamed it.',
        },
        {
          id: 'b',
          label: 'Delete the tooling — a metric that can be gamed measures nothing and its ceremony costs real time.',
          isCorrect: false,
          feedback:
            'Overcorrection: “this error branch has never executed under ANY test” is genuine information no other tool provides.',
        },
        {
          id: 'c',
          label: 'Keep the mandate but audit tests manually in review — human judgement compensates for the metric’s blindness.',
          isCorrect: false,
          feedback:
            'The mandate keeps GENERATING what the audit must then catch — paying twice for one number. Remove the incentive, keep the judgement.',
        },
        {
          id: 'd',
          label:
            'Demote it from target to instrument: no mandated number; coverage reports read as a MAP of the untested (an uncovered payment branch is a finding; an uncovered getter is noise), and review asks the only question that matters — what does this test promise, and what bug turns it red?',
          isCorrect: true,
          feedback:
            'Instruments inform; targets deform. The map shows gaps worth judging; the promise question filters what fills them.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What did the metric measure before it was a target?' },
        { level: 2, title: 'Concept', content: 'Goodhart: targets deform the measure. Instruments survive.' },
        { level: 3, title: 'Specific clue', content: 'What is genuinely informative about an UNCOVERED line?' },
        { level: 4, title: 'Guided solution', content: 'Map, not mandate.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Metric demoted' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The 100% push generated should-create specs for every file — a thousand tests, promising nothing, maintained forever.',
        },
      ],
      helpLinks: [{ topicId: 'test.behaviour', label: 'Testing behaviour' }],
      successFeedback: 'Coverage reads the gaps; promises fill them — the tool back in its lane.',
      failureFeedback: 'The bugs escaped through COVERED lines. What does that tell you about the number?',
    },
    {
      id: 'te-006-c2',
      type: 'code-review',
      title: 'Prune the Theatre',
      difficulty: 'medium',
      tags: ['testing'],
      storyContext: 'A spec file from the 90% era, up for honest review. Which tests promise, which perform?',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'era-specs',
          type: 'code',
          title: 'discount.service.spec.ts (from the coverage era)',
          language: 'ts',
          content:
            "it('should be created', () => {\n  expect(service).toBeTruthy();\n});\n\nit('should apply discounts', () => {\n  const spy = spyOn(service as any, 'applyRules').and.callThrough();\n  service.priceCart(makeCart({ coupons: ['SAVE25'] }));\n  expect(spy).toHaveBeenCalledWith(jasmine.any(Object));\n});\n\nit('caps stacked coupons at 40% total discount', () => {\n  const priced = service.priceCart(makeCart({ total: 100, coupons: ['SAVE25', 'SAVE25X'] }));\n  expect(priced.discount).toBe(40);\n});\n\nit('should handle errors', () => {\n  expect(() => service.priceCart(null as any)).not.toThrow();\n});",
        },
      ],
      findings: [
        {
          id: 'spy-on-private',
          label:
            '“should apply discounts” spies a PRIVATE method through an any-cast and asserts it was called with any object — no discount value is ever checked: pure theatre that also welds the spec to an internal method name',
          isCorrect: true,
          feedback:
            'Triple offence: was-called (promises nothing), private access (implementation coupling), jasmine.any(Object) (asserts the argument existed). The behaviour — a 25% discount — is one honest assertion away.',
        },
        {
          id: 'not-tothrow-null',
          label:
            '“should handle errors” asserts priceCart(null) does not throw — enshrining silent acceptance of garbage as the contract: if null input SHOULD be rejected, this test forbids the fix; if tolerated, the test still asserts nothing about what the caller receives',
          isCorrect: true,
          feedback:
            'not.toThrow() is the emptiest promise in testing: it blesses whatever happens as long as it happens quietly. Decide the null contract (reject loudly, or return a defined empty pricing) and assert THAT.',
        },
        {
          id: 'should-be-created',
          label: 'The creation smoke test is theatre — toBeTruthy on the injected service promises nothing and must be deleted',
          isCorrect: false,
          feedback:
            'Borderline but defensible: one creation test per suite verifies the TestBed wiring compiles (providers resolve, DI graph is sound) — a cheap canary whose failure mode (misconfigured module) is real. Not worth generating per-file by mandate, not worth deleting where it stands guard.',
        },
        {
          id: 'cap-magic-numbers',
          label: 'The 40%-cap test hardcodes magic values (100, 40) — it should derive expectations from the service’s own config constants',
          isCorrect: false,
          feedback:
            'Backwards: deriving the expectation from the code’s own constants makes the test agree with the code BY CONSTRUCTION — change the cap wrongly and the test follows along. Literal expected values are the promise; this is the file’s best test.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each test: what bug turns it red? Two have no answer.' },
        { level: 2, title: 'Concept', content: 'Promises assert observable outcomes with literal expectations.' },
        { level: 3, title: 'Specific clue', content: 'The cap test is the model — measure the others against it.' },
        { level: 4, title: 'Guided solution', content: 'Flag the private spy and the not.toThrow.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Theatre pruned' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The null-tolerance test blocked the fix that would have rejected garbage carts — the contract stayed accidentally permissive.',
        },
      ],
      helpLinks: [{ topicId: 'test.behaviour', label: 'Testing behaviour' }],
      successFeedback: 'Two performances cancelled, one canary spared, one exemplar recognised — review with a promise-meter.',
      failureFeedback: 'Apply the question uniformly: what bug reddens each test? Count the silences.',
    },
  ],
  reflectionPrompt: 'Run our coverage report, then pick the three most-covered files: how many of their tests could name the bug that turns them red?',
  rewards: [{ type: 'xp', amount: 10, label: 'Byproduct restored' }],
};
