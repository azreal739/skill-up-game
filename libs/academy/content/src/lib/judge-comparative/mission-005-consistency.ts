import { MissionDefinition } from '@academy/content-model';

/** Comparative Judging module mission 5 — consistency and transitivity across a field. */
export const judgeComparative005Consistency: MissionDefinition = {
  id: 'judge-comparative-005-consistency',
  campaignId: 'judge-comparative',
  title: 'A Consistent Order',
  summary:
    'Ranking three or more means keeping the order consistent. Learn to spot and fix a cycle — where A beats B, B beats C, but C beats A.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise transitivity in a placement order',
    'Spot a cycle as an error to fix',
    'Keep the whole field internally consistent',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Across a field, your order must be consistent: if A places above B and B above C, then A must place above C. A cycle — A over B, B over C, C over A — is not a hard call, it is a mistake to catch and fix.',
    },
  ],
  contextArtefacts: [
    {
      id: 'cycle-card',
      type: 'message',
      title: 'Head-to-head notes',
      content:
        'Your pairwise notes read: A placed above B (stronger timing); B placed above C (richer figures); C placed above A (better travel). Asked for a final 1-2-3 order, the notes contradict themselves.',
    },
  ],
  challenges: [
    {
      id: 'jcp-005-c1',
      type: 'multiple-choice',
      title: 'Spot the Cycle',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'Your pairwise notes say A>B, B>C, and C>A. You are asked for a single 1-2-3 placement.',
      prompt: 'What has gone wrong, and what must you do?',
      options: [
        {
          id: 'a',
          label: 'Nothing — a three-way cycle is a valid final order.',
          isCorrect: false,
          feedback:
            'A cycle cannot be a valid 1-2-3 order; A>B>C>A is internally contradictory and must be resolved.',
        },
        {
          id: 'b',
          label: 'The order contains a cycle (A>B>C>A), which is internally inconsistent — you must re-examine the pairwise calls against the same criteria until the order is transitive.',
          isCorrect: true,
          feedback:
            'Correct. A cycle is an error, not a result; you revisit the head-to-heads on the same criteria until a consistent order emerges.',
        },
        {
          id: 'c',
          label: 'Just pick any order — the contradiction does not matter for the final card.',
          isCorrect: false,
          feedback:
            'Picking arbitrarily hides the error; you must resolve the inconsistency so the order is defensible.',
        },
        {
          id: 'd',
          label: 'Place them all equal first — a cycle means a three-way tie.',
          isCorrect: false,
          feedback:
            'A cycle is a contradiction to fix, not a tie; the couples differ on real lenses, so a consistent order exists once you re-examine.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Can A>B>C>A be a real 1-2-3 order?' },
        { level: 2, title: 'Concept', content: 'A consistent order is transitive; a cycle is an error.' },
        { level: 3, title: 'Specific clue', content: 'Re-examine the pairwise calls on the same criteria.' },
        { level: 4, title: 'Guided solution', content: 'Choose recognising the cycle and re-examining.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Cycle spotted' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Signing off a cyclic order would put a self-contradictory placement on the record.',
        },
      ],
      helpLinks: [{ topicId: 'judging.comparative', label: 'Comparative Judging and Placement' }],
      successFeedback: 'Cycle caught — re-examine until the order is transitive.',
      failureFeedback: 'A>B>C>A is an inconsistent cycle; re-examine the pairwise calls on the same criteria until the order is transitive.',
    },
    {
      id: 'jcp-005-c2',
      type: 'multiple-choice',
      title: 'Resolve It Consistently',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'Re-examining on the same criteria, you find your "C over A on travel" call was actually a personal-taste slip — on the criteria, A’s travel was at least as strong as C’s.',
      prompt: 'How do you resolve the field now?',
      options: [
        {
          id: 'a',
          label: 'Keep the cycle but label it "too close to call".',
          isCorrect: false,
          feedback:
            'The cycle came from an inconsistent call, not a genuine tie; once corrected, a consistent order exists.',
        },
        {
          id: 'b',
          label: 'Flip A and B instead, without revisiting the faulty C-over-A call.',
          isCorrect: false,
          feedback:
            'The faulty call was C over A; changing an unrelated pair leaves the real inconsistency unfixed.',
        },
        {
          id: 'c',
          label: 'Reverse only the mistaken call — A is at least as strong as C on travel — giving A > B > C, a consistent, transitive order.',
          isCorrect: true,
          feedback:
            'Correct. Correcting the one taste-based slip removes the cycle and yields a consistent A > B > C.',
        },
        {
          id: 'd',
          label: 'Re-rank at random until no cycle remains.',
          isCorrect: false,
          feedback:
            'Randomly reshuffling is not judging; you fix the specific inconsistent call on the criteria and let the order follow.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which specific call created the cycle?' },
        { level: 2, title: 'Concept', content: 'Fix the inconsistent call on the criteria; the order follows.' },
        { level: 3, title: 'Specific clue', content: 'C-over-A was the slip; corrected, it gives A>B>C.' },
        { level: 4, title: 'Guided solution', content: 'Choose reversing only the mistaken call.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Order resolved' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Reshuffling at random instead of fixing the faulty call would leave the placement indefensible.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.comparative', label: 'Comparative Judging and Placement' },
        { topicId: 'judging.process', label: 'The Judging Process' },
      ],
      successFeedback: 'One faulty call corrected — a consistent A > B > C.',
      failureFeedback: 'Reverse only the mistaken C-over-A call on the criteria; that removes the cycle and yields a consistent A > B > C.',
    },
  ],
  reflectionPrompt: 'How can keeping running pairwise notes help you catch a cycle before it reaches the final card?',
  rewards: [{ type: 'xp', amount: 5, label: 'Consistency trained' }],
};
