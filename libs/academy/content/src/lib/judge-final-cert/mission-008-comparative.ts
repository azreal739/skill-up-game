import { MissionDefinition } from '@academy/content-model';

/** Final Certification mission 8 — station: comparative placement. */
export const judgeFinal008Comparative: MissionDefinition = {
  id: 'judge-final-008-comparative',
  campaignId: 'judge-final-cert',
  title: 'Station 7 — Place the Couples',
  summary: 'Two couples, same dance. Place them on the criteria and defend the order.',
  difficulty: 'hard',
  learningObjectives: [
    'Compare two couples lens by lens',
    'Place them on concrete criteria',
    'Defend a placement without appeal to taste',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Seventh station: a head-to-head. Two Waltz couples. Hold them to the same lenses in the same order, and place them on the evidence.',
    },
  ],
  contextArtefacts: [
    {
      id: 'two-couples',
      type: 'message',
      title: 'The two couples',
      content:
        'Couple X: clean timing, flowing rhythm, strong genuine rise and fall, regal character, rich figures, good diagonal travel. Couple Y: clean timing, flowing rhythm, shallow rise and fall, regal character, rich figures, good diagonal travel.',
    },
  ],
  challenges: [
    {
      id: 'jf-008-c1',
      type: 'contract-comparison',
      title: 'Who Places Higher?',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'process'],
      storyContext: 'Both Waltz couples are strong; they differ on exactly one lens.',
      prompt: 'Which placement is defensible?',
      options: [
        {
          id: 'a',
          label:
            'Placement A: “Couple Y over X — Y’s shallower rise and fall looks more controlled and modern.”',
          isCorrect: false,
          feedback:
            'Shallow rise and fall is weaker motion, not a modern virtue. This inverts the evidence.',
        },
        {
          id: 'b',
          label:
            'Placement B: “Level — they were basically the same, so no meaningful order.”',
          isCorrect: false,
          feedback:
            'They differ clearly on motion; ducking the call is not neutrality when a lens separates them.',
        },
        {
          id: 'c',
          label:
            'Placement C: “Couple X over Y — identical on five lenses, but X had stronger, genuine rise and fall on the motion lens, which is the deciding difference.”',
          isCorrect: true,
          feedback:
            'Correct. Same on five lenses; the motion lens is the one real difference and decides the placement.',
        },
        {
          id: 'd',
          label:
            'Placement D: “Couple X over Y — I simply preferred watching X.”',
          isCorrect: false,
          feedback:
            'Right order, wrong reason. A placement must cite the lens, not personal preference.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'On which single lens do they differ?' },
        { level: 2, title: 'Concept', content: 'Place on the deciding lens, and name it.' },
        { level: 3, title: 'Specific clue', content: 'Only the rise and fall (motion) differs.' },
        { level: 4, title: 'Guided solution', content: 'Choose X over Y on the motion difference.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Placement made' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'A placement on taste rather than the deciding lens cannot be defended to the coaches.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'dance.waltz', label: 'Judging the Waltz' },
      ],
      successFeedback: 'Same on five lenses, decided on motion, and named. A defensible placement.',
      failureFeedback: 'Place on the deciding lens: X’s stronger rise and fall (motion) is the one real difference.',
    },
    {
      id: 'jf-008-c2',
      type: 'multiple-choice',
      title: 'Say It to the Coach',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'process'],
      storyContext: 'Couple Y’s coach asks why they placed below X.',
      prompt: 'Which explanation is defensible?',
      options: [
        {
          id: 'a',
          label: '“On five lenses you were level; X placed above on motion — their rise and fall was fuller and more genuine than yours. That is the area to develop.”',
          isCorrect: true,
          feedback:
            'Correct. Specific, lens-based, and actionable — exactly what a coach can work with.',
        },
        {
          id: 'b',
          label: '“X just had more of a spark on the day.”',
          isCorrect: false,
          feedback:
            'Spark is not a criterion; the coach cannot coach against it.',
        },
        {
          id: 'c',
          label: '“The other judges liked X more.”',
          isCorrect: false,
          feedback:
            'Deferring to others is not your judgement; cite the lens you scored.',
        },
        {
          id: 'd',
          label: '“It was very close, so it could have gone either way.”',
          isCorrect: false,
          feedback:
            'It was close, but a specific lens decided it — say which, so the coach can act.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Name the deciding lens and the fix.' },
        { level: 2, title: 'Concept', content: 'Defensible feedback is specific and actionable.' },
        { level: 3, title: 'Specific clue', content: 'The difference was rise and fall — motion.' },
        { level: 4, title: 'Guided solution', content: 'Choose the lens-based, actionable explanation.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Placement defended' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'A vague explanation leaves the coach with nothing to develop and erodes trust.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Named the deciding lens and the fix. Feedback a coach can use.',
      failureFeedback: 'Defensible feedback names the deciding lens (motion) and the specific area to develop.',
    },
  ],
  reflectionPrompt: 'When two couples differ on only one lens, how do you make sure that lens — and not a hunch — decides?',
  rewards: [{ type: 'xp', amount: 5, label: 'Station 7 cleared' }],
};
