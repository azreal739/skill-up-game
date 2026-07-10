import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — filter & reduce (knowledge pack 05: the prices pipeline;
 * common mistake: forgetting the seed value in reduce).
 */
export const fnFp004FilterReduce: MissionDefinition = {
  id: 'fp-004-filter-reduce',
  campaignId: 'fp-typescript',
  title: 'The Pipeline: filter & reduce',
  summary:
    'Finish the session’s pipeline: tax the prices, keep what clears 200, and fold the rest into one total.',
  difficulty: 'medium',
  learningObjectives: [
    'Keep elements declaratively with filter',
    'Fold an array to one value with reduce',
    'Never forget the reduce seed again',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The exercise: apply 15% tax, keep values over 200, sum the result. First imperatively with three loops — then as one declarative pipeline.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The pipeline reads like the requirement: map, filter, reduce. The only landmine is reduce’s second argument. Forget the seed and you inherit surprises.',
    },
  ],
  contextArtefacts: [
    {
      id: 'pipeline',
      type: 'code',
      title: 'The session pipeline',
      language: 'ts',
      content:
        'const prices = [100, 250, 400];\n\nconst total = prices\n  .map((price) => price * 1.15)\n  .filter((price) => price > 200)\n  .reduce((sum, price) => sum + price, 0);',
    },
  ],
  challenges: [
    {
      id: 'fp-004-c1',
      type: 'multiple-choice',
      title: 'Trace the Pipeline',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext: 'Before trusting a pipeline, the session made everyone trace one by hand.',
      prompt: 'What is total for prices = [100, 250, 400]?',
      options: [
        {
          id: 'a',
          label: '747.5 — [115, 287.5, 460] → [287.5, 460] → 747.5',
          isCorrect: true,
          feedback:
            'Perfect trace: tax first, 115 fails the >200 gate, and the fold starts from the 0 seed.',
        },
        {
          id: 'b',
          label: '862.5 — all three taxed prices survive the filter and sum together',
          isCorrect: false,
          feedback: '115 does not clear 200 — the filter drops it before the fold.',
        },
        {
          id: 'c',
          label: '650 — the filter runs before the tax, so 250 and 400 sum untaxed',
          isCorrect: false,
          feedback: 'Order is the pipeline: map runs first, so the filter sees taxed values.',
        },
        {
          id: 'd',
          label: '747.5, but only because reduce defaults its accumulator to zero',
          isCorrect: false,
          feedback:
            'The value is right; the reasoning is the landmine — that 0 is the explicit seed, not a default.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Walk each stage: what array leaves map? What leaves filter?' },
        {
          level: 2,
          title: 'Concept',
          content: 'Each stage feeds the next: map transforms, filter gates, reduce folds from its seed.',
        },
        { level: 3, title: 'Specific clue', content: '100 × 1.15 = 115 — does that survive the > 200 gate?' },
        {
          level: 4,
          title: 'Guided solution',
          content: '[115, 287.5, 460] → [287.5, 460] → 0 + 287.5 + 460 = 747.5, seed included by hand.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Pipeline traced' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Pipelines stayed “magic” — and magic gets copy-pasted, not reasoned about.',
        },
      ],
      helpLinks: [{ topicId: 'fp.higher-order-functions', label: 'map, filter, reduce' }],
      successFeedback: 'You can trace it, so you can trust it — and debug it when data changes.',
      failureFeedback: 'Run the three stages on paper in order. The filter sees taxed values.',
    },
    {
      id: 'fp-004-c2',
      type: 'multiple-choice',
      title: 'The Missing Seed',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext:
        'A teammate removes the seed: carts.reduce((sum, cart) => sum + cart.total). carts is Cart[].',
      prompt: 'What actually goes wrong?',
      options: [
        {
          id: 'a',
          label: 'Nothing — reduce always starts from zero when no seed is given.',
          isCorrect: false,
          feedback:
            'Without a seed, reduce starts from the FIRST ELEMENT — here a whole Cart object, not zero.',
        },
        {
          id: 'b',
          label: 'It only breaks on an empty array; otherwise the behaviour is identical.',
          isCorrect: false,
          feedback:
            'The empty-array TypeError is real, but not alone — the first cart is also consumed as the accumulator.',
        },
        {
          id: 'c',
          label:
            'The accumulator starts as a Cart object, so the sum becomes object-plus-number garbage — and an empty array throws.',
          isCorrect: true,
          feedback:
            'Both failures at once: a Cart as the starting “sum”, and a TypeError the day carts is empty.',
        },
        {
          id: 'd',
          label: 'TypeScript rejects seedless reduce entirely, so this cannot compile.',
          isCorrect: false,
          feedback:
            'Seedless reduce is legal — the compiler infers Cart as the accumulator and the + produces the garbage.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Without a seed, what is the accumulator on iteration one?' },
        {
          level: 2,
          title: 'Concept',
          content: 'Seedless reduce uses element[0] as the initial accumulator and starts from element[1].',
        },
        { level: 3, title: 'Specific clue', content: 'The accumulator here is a Cart, and Cart + number is nonsense.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose the double failure: wrong accumulator type AND the empty-array TypeError.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Seed defended' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The seedless fold crashed on the first empty cart list in production.',
        },
      ],
      helpLinks: [{ topicId: 'fp.higher-order-functions', label: 'map, filter, reduce' }],
      successFeedback: 'The seed is the contract: it fixes the type AND the empty case in one argument.',
      failureFeedback: 'Play iteration one in your head without a seed: what is sum, and where did it come from?',
    },
  ],
  reflectionPrompt: 'Write the pipeline’s requirement as a sentence. Notice how the code already says it.',
  rewards: [{ type: 'xp', amount: 10, label: 'Pipeline shipped' }],
};
