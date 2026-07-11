import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — the AI-assisted feature, end to end: design an AI
 * workflow that captures the leverage while keeping the human accountable.
 */
export const fnAi009BossAiWorkflow: MissionDefinition = {
  id: 'ai-009-boss-ai-workflow',
  campaignId: 'ai-assisted-engineering',
  title: 'Boss: Ship a Feature With AI',
  summary:
    'Design an AI-assisted workflow for a whole feature — routing tasks by strength, verifying against ground truth, guarding the risks, and keeping a human accountable throughout.',
  difficulty: 'boss',
  learningObjectives: [
    'Assemble the block into an end-to-end AI workflow',
    'Review an AI workflow for accountability and verification gaps',
    'Sign off a workflow that captures leverage safely',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The final boss of the whole academy: design how our team ships a real feature WITH AI — a new billing-history export. Use AI everywhere it helps, keep the human accountable everywhere it must be, and make it faster AND safer, not faster and riskier. This is the block, and the whole program, in one workflow.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The sheet is the block: route each task to AI or human by strength; prompt with real context and constraints; VERIFY output against ground truth (execution, human-grounded tests, docs — never AI-verifying-AI); guard the risks (no secrets in prompts, security review of generated code, no skill atrophy); scale oversight to any autonomy; and keep a human accountable for every merged line. There is no "the AI did it" — there is a workflow that captures the leverage without abandoning judgement.',
    },
  ],
  contextArtefacts: [
    {
      id: 'ai-workflow-sheet',
      type: 'code',
      title: 'The AI workflow sheet',
      language: 'text',
      content:
        '1. ROUTE   AI: boilerplate/scaffold, tests-for-existing, docs; human: novel logic, keys\n2. PROMPT  real context + constraints (conventions, security, our patterns)\n3. VERIFY  execution + human-grounded tests + docs — never AI-verifies-AI\n4. GUARD   no secrets in prompts · security-review generated code · practise fundamentals\n5. OVERSEE oversight scales with autonomy; human approves every merged diff\n6. OWN     a human is accountable for every line — "the agent did it" is no defense',
    },
  ],
  challenges: [
    {
      id: 'ai-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Design the Workflow',
      difficulty: 'hard',
      tags: ['ai'],
      storyContext: 'The billing-export feature: a service (fetch + transform billing data), a component (table + download), tests, and docs. Design the AI-assisted workflow.',
      prompt: 'Which workflow captures the leverage while keeping the human accountable?',
      options: [
        {
          id: 'a',
          label:
            'Route by strength: AI scaffolds the component/service boilerplate to our patterns (with context + constraints prompted: standalone, signals, our error shape, no new deps), drafts the docs, and proposes edge-case tests — while a human owns the billing TRANSFORM logic (correctness-critical money math) and any auth. Verify everything against ground truth: run it, and write/verify the key tests from the real billing spec (not AI-tests-of-AI-code). Guard: no live billing data or secrets pasted into external tools, security-review the generated code, and the human reads and understands every line before merge. A human is accountable for the merged result.',
          isCorrect: true,
          feedback:
            'Every sheet line applied: AI on its strengths with constrained prompts, human on correctness-critical money logic, ground-truth verification, the risks guarded (data, security), and human accountability at merge. Faster AND safer.',
        },
        {
          id: 'b',
          label:
            'Have an agent autonomously build the whole feature — service, component, tests, docs — run the tests, and open a green PR the team merges if CI is green, to maximise speed.',
          isCorrect: false,
          feedback:
            'Multiple block failures: no human owns the correctness-critical billing math, verification is AI-tests-of-AI-code gated only on green CI (which the agent could satisfy by weakening tests), oversight does not scale to the autonomy, and "merge if green" abandons human accountability. Fast and riskier, exactly what the sheet forbids.',
        },
        {
          id: 'c',
          label:
            'Use AI only to explain the existing billing code and write nothing with it — the feature is too money-critical to let AI touch any of it.',
          isCorrect: false,
          feedback:
            'Over-restrictive: AI can safely scaffold boilerplate, draft docs, and propose tests here WITH human review and ground-truth verification — reserving it for explanation only forfeits real leverage. The money-critical part (the transform) goes to the human; the rest is safely AI-assisted, not off-limits.',
        },
        {
          id: 'd',
          label:
            'AI writes everything including the billing transform, and to verify, ask the AI "is the money math correct?" and rely on the AI-generated tests passing.',
          isCorrect: false,
          feedback:
            'Two cardinal errors: AI owning the correctness-critical money logic (its weakest, highest-cost area), and circular verification (AI grading itself + AI-tests-of-AI-code proving self-consistency, not correctness). The transform needs a human, and verification must be grounded outside the model.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which part is correctness-critical money logic (human), and which is pattern-based (AI)?' },
        { level: 2, title: 'Concept', content: 'Route by strength, prompt with constraints, verify against ground truth, human owns the merge.' },
        { level: 3, title: 'Specific clue', content: 'Who should own the billing transform, and how must its tests be grounded?' },
        { level: 4, title: 'Guided solution', content: 'Pick the route-by-strength, ground-truth-verified, human-accountable workflow.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Workflow designed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The agent-builds-everything workflow shipped — an AI billing-transform bug, verified only by AI tests, mis-charged customers.',
        },
      ],
      helpLinks: [
        { topicId: 'ai.when-to-use', label: 'When to use AI' },
        { topicId: 'ai.verification', label: 'Verifying AI output' },
      ],
      successFeedback: 'AI on its strengths, human on the money math, ground-truth verification, accountable merge — stage 1 clear.',
      failureFeedback: 'Which workflow keeps a human on the correctness-critical transform AND verifies outside the model?',
    },
    {
      id: 'ai-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Workflow',
      difficulty: 'hard',
      tags: ['ai'],
      storyContext: 'A teammate’s proposed AI workflow for the export feature lands. Review it against the whole block.',
      prompt: 'Select every WEAK/unsafe step — and leave the sound ones.',
      artefacts: [
        {
          id: 'workflow-doc',
          type: 'code',
          title: 'proposed AI workflow',
          language: 'text',
          content:
            '1. Prompt the AI with our component conventions + constraints to scaffold the UI.\n2. To debug a failing prod export, paste the failing customer’s billing record\n   (incl. their PII and our internal IDs) into the public AI chat.\n3. Human writes the billing-transform tests from the finance spec; AI-generated\n   code must pass them.\n4. Verify the transform is correct by asking the AI to double-check its own math.\n5. Security-review all AI-generated code the same as human code before merge.',
            },
          ],
      findings: [
        {
          id: 'paste-pii',
          label:
            'Step 2 pastes a real customer’s PII and internal IDs into a PUBLIC AI tool — a data-leakage/privacy violation (the data leaves your control regardless of the AI’s intent); debug with synthetic/redacted data or an approved tool with a known data policy',
          isCorrect: true,
          feedback:
            'The data-leakage risk: customer PII and internal identifiers must never go to a tool whose data handling you don’t control. Use redacted/synthetic repro data (the reproduce-first discipline works without real PII) or enterprise tooling with a compliant policy.',
        },
        {
          id: 'ai-verifies-own-math',
          label:
            'Step 4 verifies the money math by asking the AI to double-check itself — circular verification from the same fallible source; correctness must be grounded outside the model (the human-written spec-based tests from step 3 ARE the real verification, plus executing against known values)',
          isCorrect: true,
          feedback:
            'AI-verifies-AI is the anti-pattern: the model that wrote the transform is confidently blind to its own error. Step 3’s human-grounded tests are the actual verification — step 4 adds nothing but false assurance and should be dropped in favour of execution against known-correct values.',
        },
        {
          id: 'constrained-scaffold',
          label: 'Step 1 (prompt with conventions + constraints to scaffold UI) is weak — the AI should design the UI freely for creativity, not be constrained to existing patterns',
          isCorrect: false,
          feedback:
            'Backwards: step 1 is exactly right — providing conventions and constraints is how you get output that FITS the codebase (the prompting lesson), and "free creativity" for a billing table produces the wrong-library, foreign-pattern mismatch the block warns against. This step is sound; leave it.',
        },
        {
          id: 'human-grounded-tests',
          label: 'Step 3 (human writes transform tests from the finance spec, AI code must pass them) is a bottleneck — the AI should generate the tests too, to save the human’s time',
          isCorrect: false,
          feedback:
            'The opposite of a flaw: human-written, spec-grounded tests are precisely what makes the AI transform VERIFIABLE (AI-tests-of-AI-code would only prove self-consistency). This is the correct, load-bearing step — "save time by AI-generating them" reintroduces the shared-assumption trap. Step 3 is sound.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Find the data that leaves your control, and the verification that never leaves the model.' },
        { level: 2, title: 'Concept', content: 'No PII to public tools; verification grounded outside the model (human spec-based tests + execution).' },
        { level: 3, title: 'Specific clue', content: 'Two steps (constrained scaffold, human spec-tests) are correct and load-bearing — spare them.' },
        { level: 4, title: 'Guided solution', content: 'Flag the PII paste and the AI-verifies-its-own-math step.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Workflow reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The PII paste and self-verified math shipped — a privacy incident and an unverified transform bug both reached production.',
        },
      ],
      helpLinks: [
        { topicId: 'ai.risks', label: 'AI risks & responsibilities' },
        { topicId: 'ai.verification', label: 'Verifying AI output' },
      ],
      successFeedback: 'PII leak and circular verification flagged, the sound steps spared — the workflow reviewed against the block.',
      failureFeedback: 'Two steps are correct and load-bearing (constrained scaffold, human spec-tests). Two are unsafe (PII paste, AI self-verify). Sort them.',
    },
    {
      id: 'ai-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the Practice',
      difficulty: 'boss',
      tags: ['ai'],
      storyContext: 'The final decision of the entire academy: two philosophies for how the team works with AI going forward. Sign off the one that lasts.',
      prompt: 'Which team practice ships?',
      options: [
        {
          id: 'a',
          label:
            'AI as an accountable collaborator: use it aggressively where it is strong (scaffolding, translation, tests-for-existing, docs, exploration, first-pass review), route correctness-critical and novel work to humans, verify all output against ground truth, guard the risks (data, security, IP), scale oversight to autonomy, keep a human accountable for every merged line, and — deliberately — keep practising the fundamentals so engineers can still review what the AI produces. Faster AND safer, with the review skill (the safeguard) actively maintained.',
          isCorrect: true,
          feedback:
            'The whole program in one practice: capture AI’s leverage without surrendering the judgement that makes it safe. The human stays accountable, verification stays grounded, and the review skill — the load-bearing safeguard — is deliberately kept sharp. This is how the field notes end.',
        },
        {
          id: 'b',
          label:
            'Maximise velocity: default to letting AI (and agents) do as much as possible autonomously, merge on green CI, and reserve human time only for what the AI flags as uncertain — trusting the tools to scale the team’s output.',
          isCorrect: false,
          feedback:
            'Every hazard of the block at once: no human accountability (merge on green), verification the AI can game (weaken tests), autonomy without proportionate oversight, and — worst long-term — engineers whose review skill atrophies until they cannot catch the confident-but-wrong output they now depend on. Fast today, unmaintainable and unsafe tomorrow.',
        },
        {
          id: 'c',
          label:
            'Minimise risk: forbid AI for anything correctness- or security-relevant, restrict it to comments and boilerplate only, and require everything else be hand-written as before, to keep full human control.',
          isCorrect: false,
          feedback:
            'Over-correction that forfeits most of AI’s real, safe leverage (tests-for-existing, translation, design exploration, first-pass review, debugging help — all usable WITH verification and human review). The block’s answer is disciplined USE, not avoidance; banning AI from real work cedes a large productivity edge for a safety the review discipline already provides.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which practice keeps BOTH the leverage and the human judgement that makes it safe?' },
        { level: 2, title: 'Concept', content: 'Accountable collaboration: aggressive where strong, human-owned where critical, verified, fundamentals kept sharp.' },
        { level: 3, title: 'Specific clue', content: 'One practice lets the review skill atrophy; one forfeits the leverage. What is the middle that lasts?' },
        { level: 4, title: 'Guided solution', content: 'Sign the accountable-collaborator practice.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Practice signed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The maximise-velocity practice shipped — output spiked, then quality collapsed as no one could still review what the AI produced.',
        },
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'Merge-on-green with atrophied review skills buried the codebase in confident-but-wrong AI code no human fully understood.',
        },
      ],
      helpLinks: [
        { topicId: 'ai.collaboration', label: 'AI collaboration mindset' },
        { topicId: 'ai.risks', label: 'AI risks & responsibilities' },
      ],
      successFeedback:
        'AI used aggressively where strong, humans owning what matters, output verified, risks guarded, accountability kept, and the review skill deliberately maintained — faster AND safer. The field notes are complete.',
      failureFeedback:
        'One practice trades away human judgement for speed; one trades away leverage for caution. Which keeps both — the acceleration AND the safeguard?',
    },
  ],
  reflectionPrompt: 'Does our team use AI as an accountable collaborator — aggressive where it is strong, human-owned where it matters, verified against ground truth, with our review skills kept sharp — or are we drifting toward one of the extremes?',
  rewards: [{ type: 'xp', amount: 25, label: 'AI workflow shipped' }],
};
