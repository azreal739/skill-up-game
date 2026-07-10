import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — calculator parity (knowledge pack 05: batchComputeLoop
 * vs batchComputeHof must produce identical results; single-reduce variant).
 */
export const fnFp009BossCalculator: MissionDefinition = {
  id: 'fp-009-boss-calculator',
  campaignId: 'fp-typescript',
  title: 'Boss: Calculator Parity',
  summary:
    'The exercise finale: prove the loop version and the pipeline version of batchCompute are the same program.',
  difficulty: 'boss',
  learningObjectives: [
    'Implement one behaviour imperatively and declaratively',
    'Keep Results honest across a whole batch',
    'Choose the pipeline that reads like the requirement',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The final exercise ran both worlds side by side: batchComputeLoop with for-loops, batchComputeHof as a pipeline. Same inputs, provably identical outputs — parity was the pass mark.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Requirement, verbatim from the sheet: keep valid settings, compute each value, collect only the successes, return the totals. Loop it, pipe it — same answer, every time.',
    },
  ],
  contextArtefacts: [
    {
      id: 'requirement',
      type: 'code',
      title: 'The behaviour both versions must share',
      language: 'ts',
      content:
        "interface Setting { id: string; input: number; enabled: boolean; }\n\n// 1. keep enabled settings\n// 2. compute(input) → Result<number> for each\n// 3. keep only ok results\n// 4. return their values",
    },
  ],
  challenges: [
    {
      id: 'fp-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — The Pipeline Version',
      difficulty: 'hard',
      tags: ['typescript'],
      storyContext: 'batchComputeHof must transcribe the four requirement lines into stages.',
      prompt: 'Which pipeline matches the requirement exactly?',
      options: [
        {
          id: 'a',
          label:
            'settings\n  .map((s) => compute(s.input))\n  .filter((s) => s.enabled)\n  .filter((r) => r.kind === \'ok\')\n  .map((r) => r.value)',
          isCorrect: false,
          feedback:
            'compute ran before the enabled gate — disabled settings were computed (and the second filter no longer even has settings to check).',
        },
        {
          id: 'b',
          label:
            'settings\n  .filter((s) => s.enabled)\n  .map((s) => compute(s.input))\n  .filter((r) => r.kind === \'err\')\n  .map((r) => r.reason)',
          isCorrect: false,
          feedback:
            'This collects the FAILURES — a useful report, but the requirement asks for successful values.',
        },
        {
          id: 'c',
          label:
            'settings\n  .filter((s) => s.enabled)\n  .map((s) => compute(s.input))\n  .filter((r): r is Ok<number> => r.kind === \'ok\')\n  .map((r) => r.value)',
          isCorrect: true,
          feedback:
            'Gate, compute, keep the oks (with a type-guard predicate so map sees Ok), extract — the requirement, transcribed.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The four requirement lines ARE the four stages, in order.' },
        {
          level: 2,
          title: 'Concept',
          content: 'Pipelines transcribe requirements: filter gates first, then transform, then narrow, then extract.',
        },
        { level: 3, title: 'Specific clue', content: 'Anything computing before the enabled check does wasted (and wrong) work.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose filter(enabled) → map(compute) → filter(ok) → map(value).',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Pipeline transcribed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Disabled settings were computed anyway, and one of them threw on a null input.',
        },
      ],
      helpLinks: [
        { topicId: 'fp.higher-order-functions', label: 'map, filter, reduce' },
        { topicId: 'typescript.narrowing', label: 'Type narrowing' },
      ],
      successFeedback: 'Four lines of requirement, four stages of pipeline — parity’s first half is in.',
      failureFeedback: 'Match stage order to requirement order. The enabled gate comes first for a reason.',
    },
    {
      id: 'fp-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Loop Version',
      difficulty: 'hard',
      tags: ['typescript'],
      storyContext:
        'A teammate’s batchComputeLoop must reach parity with your pipeline. Review it against the requirement.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'loop-version',
          type: 'code',
          title: 'batch-compute-loop.ts (parity candidate)',
          language: 'ts',
          content:
            "export function batchComputeLoop(settings: Setting[]): number[] {\n  const out: number[] = [];\n  for (const s of settings) {\n    const result = compute(s.input);\n    if (!s.enabled) continue;\n    if (result.kind === 'ok') {\n      out.push(result.value);\n    }\n  }\n  return out;\n}",
        },
      ],
      findings: [
        {
          id: 'compute-before-gate',
          label: 'compute runs before the enabled check, so disabled settings are still computed',
          isCorrect: true,
          feedback:
            'Order breaks parity: the pipeline never computes disabled settings; this loop computes every one.',
        },
        {
          id: 'push-mutation',
          label: 'out.push mutates an array, which the sessions forbid',
          isCorrect: false,
          feedback: 'out is this function’s own local array — building your own result by push is fine.',
        },
        {
          id: 'continue-style',
          label: 'continue is unreadable and should be replaced with nested ifs',
          isCorrect: false,
          feedback: 'Early continue is a fine imperative idiom — the problem is what runs before it, not the keyword.',
        },
        {
          id: 'ok-check',
          label: "The result.kind === 'ok' check narrows correctly and needs no cast",
          isCorrect: false,
          feedback:
            'True — and that makes it healthy, not an issue. The review asks only for problems.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Trace one DISABLED setting through both versions. Do they behave the same?' },
        {
          level: 2,
          title: 'Concept',
          content: 'Parity means same work and same result — computing what the pipeline skips is a real difference.',
        },
        { level: 3, title: 'Specific clue', content: 'Only one finding describes a behavioural difference.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Flag compute-before-gate only. Local push, continue and the ok check are all healthy.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Parity reviewed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The loop and pipeline versions silently diverged, and “identical” became folklore.',
        },
      ],
      helpLinks: [{ topicId: 'fp.pure-functions', label: 'Pure functions' }],
      successFeedback: 'One behavioural diff found, zero style noise — parity review done right.',
      failureFeedback: 'Review for behaviour differences against the pipeline, not for imperative style.',
    },
    {
      id: 'fp-009-c3',
      type: 'multiple-choice',
      title: 'Stage 3 — The Single-Pass Fold',
      difficulty: 'boss',
      tags: ['typescript'],
      storyContext:
        'Final flourish from the sheet: express the whole behaviour as ONE reduce — gate, compute, collect — in a single pass.',
      prompt: 'Which reduce is the faithful single-pass version?',
      options: [
        {
          id: 'a',
          label:
            "settings.reduce((acc: number[], s) => {\n  if (!s.enabled) return acc;\n  const r = compute(s.input);\n  if (r.kind === 'ok') acc.push(r.value);\n  return acc;\n}, [])",
          isCorrect: false,
          feedback:
            'Behaviourally right — but it mutates the shared accumulator with push. The sheet asked for the immutable fold; one option gives it.',
        },
        {
          id: 'b',
          label:
            "settings.reduce((acc: number[], s) => {\n  if (!s.enabled) return acc;\n  const r = compute(s.input);\n  return r.kind === 'ok' ? [...acc, r.value] : acc;\n}, [])",
          isCorrect: true,
          feedback:
            'Gate, compute, immutably append on ok, seed supplied — the whole pipeline in one honest pass.',
        },
        {
          id: 'c',
          label:
            "settings.reduce((acc: number[], s) => {\n  const r = compute(s.input);\n  return r.kind === 'ok' && s.enabled ? [...acc, r.value] : acc;\n})",
          isCorrect: false,
          feedback:
            'Two regressions at once: compute runs before the gate, and the missing seed makes acc a Setting on pass one.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'All previous lessons meet here: gate order, immutability, and the seed.' },
        {
          level: 2,
          title: 'Concept',
          content: 'A fold can filter+map+collect at once: return acc unchanged to skip, a new array to keep.',
        },
        { level: 3, title: 'Specific clue', content: 'Check every option for the seed and for [...acc] versus push.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Pick the seeded fold that returns [...acc, r.value] on ok and acc otherwise.',
        },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Parity proven' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The seedless fold crashed the batch on its first run against an empty settings list.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The finale fizzled, and the team left unsure the two styles really were equivalent.',
        },
      ],
      helpLinks: [
        { topicId: 'fp.higher-order-functions', label: 'map, filter, reduce' },
        { topicId: 'fp.immutability', label: 'Immutability' },
      ],
      successFeedback:
        'Loop, pipeline, single fold — three shapes, one behaviour. Parity achieved; campaign complete.',
      failureFeedback:
        'Grade each option on the campaign’s three lessons: gate order, immutable accumulation, explicit seed.',
    },
  ],
  reflectionPrompt:
    'Loop, pipeline or single fold — which would you ship for this requirement, and why?',
  rewards: [{ type: 'xp', amount: 25, label: 'Exercise complete' }],
};
