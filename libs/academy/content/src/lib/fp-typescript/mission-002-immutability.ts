import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — immutability (knowledge pack 07: "Mutating input data";
 * prevention tip: review for push, splice, direct assignment, in-place sort).
 */
export const fnFp002Immutability: MissionDefinition = {
  id: 'fp-002-immutability',
  campaignId: 'fp-typescript',
  title: 'Copy, Don’t Mutate',
  summary:
    'Shared references make mutation a spooky action at a distance. Copy-on-write keeps every caller safe.',
  difficulty: 'easy',
  learningObjectives: [
    'Explain why mutating a parameter leaks beyond the function',
    'Use spreads and non-mutating array methods',
    'Run the team’s mutation checklist on real code',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The bug that sold immutability: a sort inside a chart component reordered the shared products array — and every other screen holding that reference reordered with it.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Our review checklist since that day: look for push, splice, direct property assignment and in-place sort on anything you did not create in this function.',
    },
  ],
  contextArtefacts: [
    {
      id: 'shared-sort',
      type: 'code',
      title: 'The chart that reordered the world',
      language: 'ts',
      content:
        'function topThree(products: Product[]): Product[] {\n  return products.sort((a, b) => b.sales - a.sales).slice(0, 3);\n}',
    },
  ],
  challenges: [
    {
      id: 'fp-002-c1',
      type: 'multiple-choice',
      title: 'Defuse the Sort',
      difficulty: 'easy',
      tags: ['typescript'],
      storyContext:
        'topThree must keep returning the three best sellers — without rearranging the caller’s array.',
      prompt: 'Which rewrite fixes the leak?',
      options: [
        {
          id: 'a',
          label: 'return products.slice(0, 3).sort((a, b) => b.sales - a.sales);',
          isCorrect: false,
          feedback:
            'slice-then-sort no longer mutates the input — but it sorts only the first three items, so the answer is wrong.',
        },
        {
          id: 'b',
          label: 'Add a comment: // do not reuse this array after calling topThree.',
          isCorrect: false,
          feedback:
            'A comment cannot protect callers who never read it — the mutation still escapes.',
        },
        {
          id: 'c',
          label: 'return products.reverse().slice(0, 3);',
          isCorrect: false,
          feedback:
            'reverse mutates in place too — and reversing is not sorting by sales.',
        },
        {
          id: 'd',
          label: 'return [...products].sort((a, b) => b.sales - a.sales).slice(0, 3);',
          isCorrect: true,
          feedback:
            'Copy first, then sort the copy: the caller’s array is untouched and the top three are correct.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'sort works in place. What must happen before it runs?' },
        {
          level: 2,
          title: 'Concept',
          content: 'Copy-on-write: spread into a new array, then apply the mutating method to the copy.',
        },
        { level: 3, title: 'Specific clue', content: 'Order matters twice — copy before sort, and sort before slice.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose [...products].sort(...).slice(0, 3) — copy, order, then take three.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Sort defused' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The shared products array kept reordering under every screen that held it.',
        },
      ],
      helpLinks: [{ topicId: 'fp.immutability', label: 'Immutability' }],
      successFeedback: 'The caller’s data survives the call — that is the whole contract.',
      failureFeedback:
        'Two requirements: right answer AND untouched input. Test each option against both.',
    },
    {
      id: 'fp-002-c2',
      type: 'code-review',
      title: 'Review: The Mutation Checklist',
      difficulty: 'easy',
      tags: ['typescript'],
      storyContext:
        'Run the team checklist — push, splice, direct assignment, in-place sort — over this cart helper.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'cart-helper',
          type: 'code',
          title: 'apply-discount.ts',
          language: 'ts',
          content:
            'export function applyDiscount(cart: Cart, pct: number): Cart {\n  cart.total = cart.total * (1 - pct);\n  const items = cart.items.map((item) => ({\n    ...item,\n    price: item.price * (1 - pct),\n  }));\n  items.push(FREE_SHIPPING_LINE);\n  return { ...cart, items, total: cart.total };\n}',
        },
      ],
      findings: [
        {
          id: 'total-assignment',
          label: 'cart.total is assigned directly, mutating the caller’s cart',
          isCorrect: true,
          feedback:
            'Direct property assignment on a parameter — the caller’s cart total changes even if they ignore the return value.',
        },
        {
          id: 'map-copy',
          label: 'items.map with spread copies is wasteful; it should edit each item in place',
          isCorrect: false,
          feedback:
            'That map is the healthy pattern here — new array, new item objects, originals untouched.',
        },
        {
          id: 'push-on-new',
          label: 'items.push(FREE_SHIPPING_LINE) mutates the caller’s items array',
          isCorrect: false,
          feedback:
            'items is the brand-new array map just returned — pushing onto your own local copy is fine.',
        },
        {
          id: 'stale-total',
          label: 'The returned total reads cart.total after it was already mutated, hiding the bug',
          isCorrect: true,
          feedback:
            'Because of the earlier assignment, return and mutation agree — which is why nobody noticed for a sprint.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Apply the checklist line by line: who owns each object being changed?' },
        {
          level: 2,
          title: 'Concept',
          content: 'Mutating what you created locally is fine; mutating what a caller handed you is the leak.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'One real issue is an assignment on the parameter; the other is how that assignment hides itself.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Flag the cart.total assignment and the stale-total return. The map and the local push are healthy.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Checklist applied' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The mutating discount helper shipped and other code began depending on the side effect.',
        },
      ],
      helpLinks: [{ topicId: 'fp.immutability', label: 'Immutability' }],
      successFeedback:
        'Ownership is the test: local copies may change, parameters may not. You applied it precisely.',
      failureFeedback:
        'Do not flag mutation itself — flag mutation of things the function does not own.',
    },
  ],
  reflectionPrompt: 'Which of push / splice / sort / direct assignment shows up most in our code today?',
  rewards: [{ type: 'xp', amount: 5, label: 'References respected' }],
};
