import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — verification and testing of AI output: trust but verify,
 * and the tests that catch what confidence hides.
 */
export const fnAi006Verification: MissionDefinition = {
  id: 'ai-006-verification',
  campaignId: 'ai-assisted-engineering',
  title: 'Trust Nothing, Verify Everything',
  summary:
    'AI output is a hypothesis until verified — by tests, by execution, by checking against ground truth — because its confidence is decoupled from its correctness.',
  difficulty: 'hard',
  learningObjectives: [
    'Treat AI output as unverified until proven',
    'Verify by execution, tests, and ground-truth checks',
    'Avoid the circular trap of AI verifying AI',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session six is the discipline that makes all of this safe: verification. The whole block’s hazard — confident, plausible, sometimes wrong — has exactly one antidote, and it is not "read it more carefully" (the polished off-by-one defeats that). It is VERIFY: run it, test it, check it against reality.',
    },
    {
      speaker: 'Senior Dev',
      text: 'AI output is a HYPOTHESIS until verified. Verify by EXECUTION (does it actually run and produce the right result?), by TESTS (does it pass tests that assert the REAL requirement — that YOU wrote or verified, not just AI-generated tests of AI code), and by GROUND TRUTH (does this API exist in the docs? is this fact real?). The trap to avoid: asking AI to verify its own output — "is this correct?" gets you another confident answer from the same fallible source. Verification must be grounded in something outside the model: execution, real tests, authoritative sources.',
    },
  ],
  contextArtefacts: [
    {
      id: 'verify-grounded',
      type: 'code',
      title: 'Verification must touch ground truth',
      language: 'text',
      content:
        'EXECUTION    run it — does it actually work and produce the right output?\nTESTS        pass tests that assert the REAL requirement (you wrote/verified them;\n             AI-tests-of-AI-code can both encode the same wrong assumption)\nGROUND TRUTH docs/types/reality — does this API exist? is this fact true?\n\nANTI-PATTERN asking AI "is this correct?" → another confident answer, same source\n             verification must be grounded OUTSIDE the model',
    },
  ],
  challenges: [
    {
      id: 'ai-006-c1',
      type: 'multiple-choice',
      title: 'AI Verifying AI',
      difficulty: 'hard',
      tags: ['ai'],
      storyContext:
        'An engineer, unsure whether AI-generated code is correct, pastes it back and asks the AI "is this correct and bug-free?". The AI replies "Yes, this code is correct and follows best practices." The engineer ships it.',
      prompt: 'What is wrong with this verification approach?',
      options: [
        {
          id: 'a',
          label:
            'It is circular: asking the same fallible source to grade its own output yields another CONFIDENT answer with no independent grounding — the model that wrote the bug is equally confident the bug is not there (its confidence is decoupled from correctness). Real verification touches something OUTSIDE the model: execute the code and check the result, run tests that assert the real requirement (that you wrote or verified), and check APIs/facts against docs. "The AI said it’s correct" is not verification; it is the same hypothesis restated.',
          isCorrect: true,
          feedback:
            'AI cannot be its own oracle — its self-assessment is just more generation from the source of the error. Verification must be grounded in execution, real tests, or authoritative sources, not in a second confident opinion from the same model.',
        },
        {
          id: 'b',
          label: 'Nothing wrong — asking the AI to double-check its work is a reasonable second pass that catches many errors.',
          isCorrect: false,
          feedback:
            'A self-review sometimes catches surface issues, but it is NOT verification — the model that confidently wrote a subtle bug is confidently blind to it, and "yes it’s correct" carries the same zero correctness-signal as the original. You need grounding outside the model.',
        },
        {
          id: 'c',
          label: 'The fix is to ask a DIFFERENT AI model to verify it — a second independent model provides real verification.',
          isCorrect: false,
          feedback:
            'A second model reduces some correlated errors but is still not grounded in reality — both can share training biases, hallucinate the same plausible-but-wrong pattern, and neither executes the code against the real requirement. Better than self-review, still not verification; run it and test it.',
        },
        {
          id: 'd',
          label: 'Ask the AI to explain WHY it is correct — if the explanation is sound, the code is verified.',
          isCorrect: false,
          feedback:
            'A fluent, plausible explanation of WHY buggy code is "correct" is exactly what a confident model produces — the explanation is generated from the same flawed reasoning and can rationalise the bug convincingly. Explanations are not execution; verify against ground truth.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the model that wrote the bug a reliable judge of whether it wrote a bug?' },
        { level: 2, title: 'Concept', content: 'Verification must be grounded OUTSIDE the model: execution, real tests, docs.' },
        { level: 3, title: 'Specific clue', content: 'What does "yes it’s correct" from the same source actually tell you?' },
        { level: 4, title: 'Guided solution', content: 'Pick the circular-trap answer; verify with execution/tests/ground truth.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Circularity avoided' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'Code was "verified" by asking the AI if it was correct — the bug it confidently wrote and confidently blessed shipped to production.',
        },
      ],
      helpLinks: [{ topicId: 'ai.verification', label: 'Verifying AI output' }],
      successFeedback: 'Grounded in execution, tests, and docs — not in the model’s opinion of itself.',
      failureFeedback: 'The model that wrote the bug also said it was correct. What must verification be grounded in instead?',
    },
    {
      id: 'ai-006-c2',
      type: 'multiple-choice',
      title: 'Tests for AI Code',
      difficulty: 'hard',
      tags: ['ai', 'testing'],
      storyContext:
        'To verify an AI-generated pricing function, an engineer asks the AI to ALSO generate its tests. Both are AI-written; the tests pass. Is the function verified?',
      prompt: 'What is the flaw, and how should AI code be tested?',
      options: [
        {
          id: 'a',
          label:
            'AI-generated tests of AI-generated code can encode the SAME wrong assumption — if the AI misunderstood the rounding rule, it writes both the buggy code AND tests that assert the buggy behaviour, so they pass in perfect agreement while both are wrong. The tests must assert the REAL requirement, which means a human writes them (or writes the key cases and verifies the AI’s) from the actual spec — the testing campaign’s "a test’s value is the behaviour it can catch breaking". Green AI-tests-on-AI-code proves the AI is consistent with itself, not correct.',
          isCorrect: true,
          feedback:
            'Consistency is not correctness: co-generated code and tests share the source’s misunderstanding and agree with each other while both diverge from the requirement. Ground the tests in the real spec via a human — then they can actually catch the AI’s bug.',
        },
        {
          id: 'b',
          label: 'It is verified — passing tests are passing tests regardless of who wrote them; green is green.',
          isCorrect: false,
          feedback:
            'Green means the code matches the TESTS, but if the same AI wrote both from the same wrong assumption, they match each other while both are wrong (the rounding-that-was-never-asserted lesson). Whose understanding the tests encode matters — AI-tests-of-AI-code can be a closed loop of agreement.',
        },
        {
          id: 'c',
          label: 'Have the AI generate the tests first (TDD-style), then the code — that ordering makes the tests independent.',
          isCorrect: false,
          feedback:
            'Order does not break the shared-source problem: if the AI misunderstands the requirement, it writes wrong tests FIRST and then code that passes them — still a closed loop encoding one misunderstanding. Independence comes from a HUMAN grounding the tests in the real spec, not from generation order.',
        },
        {
          id: 'd',
          label: 'Run the AI tests with coverage; if coverage is high, the function is well-verified.',
          isCorrect: false,
          feedback:
            'High coverage of AI-tests-on-AI-code just means the buggy code is thoroughly exercised by tests that assert its buggy behaviour (the coverage-as-target lesson). Coverage measures execution, not whether the tests encode the RIGHT requirement — which they may not, sharing the AI’s error.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'If the AI misunderstood the requirement, what do its code AND its tests both encode?' },
        { level: 2, title: 'Concept', content: 'AI-tests-of-AI-code prove self-consistency, not correctness — ground tests in the real spec via a human.' },
        { level: 3, title: 'Specific clue', content: 'Both were written from the same (possibly wrong) understanding. What do they agree with?' },
        { level: 4, title: 'Guided solution', content: 'Pick the shared-assumption flaw; human writes/verifies tests from the spec.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Tests grounded' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'AI wrote both the pricing code and its tests from one wrong rounding assumption — they passed together and shipped the rounding bug.',
        },
      ],
      helpLinks: [
        { topicId: 'ai.verification', label: 'Verifying AI output' },
        { topicId: 'test.behaviour', label: 'Testing behaviour' },
      ],
      successFeedback: 'Tests grounded in the real requirement by a human — able to catch the AI’s bug, not agree with it.',
      failureFeedback: 'Code and tests from the same AI share its understanding. What do they prove — correctness, or self-consistency?',
    },
  ],
  reflectionPrompt: 'When we verify AI output, do we execute it and test it against the real requirement — or do we ask the AI if it is right and trust AI-written tests of AI code?',
  rewards: [{ type: 'xp', amount: 15, label: 'Verification grounded' }],
};
