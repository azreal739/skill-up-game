import { MissionDefinition } from '@academy/content-model';

/** Triple Two module mission 3 — rhythm: even, ball-flat triples. */
export const judgeTripleTwo003Rhythm: MissionDefinition = {
  id: 'judge-triple-two-003-rhythm',
  campaignId: 'judge-triple-two',
  title: 'Even and Ball-Flat',
  summary:
    'Triple Two rhythm is smooth, even triples on a ball-flat action. Learn to hear whether the triples are clean or rushed.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge triple evenness and ball-flat quality',
    'Separate correct durations from correct feel',
    'Recognise a rushed or heavy triple',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The walks are heel-flat; the triples are ball-flat and smooth. A rushed or heavy-heeled triple loses the soft, even feel.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jtt-003-c1',
      type: 'multiple-choice',
      title: 'Smooth or Rushed',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'triple-two', 'rhythm'],
      storyContext:
        'A couple keeps the slow-slow-triple-triple count but crushes each triple into a hurried, uneven scramble, though they arrive on the next slow.',
      prompt: 'How does the rhythm lens read this?',
      options: [
        {
          id: 'a',
          label: 'Marked down — a crushed, uneven triple loses the smooth, even Triple Two rhythm, even though they land on the next slow.',
          isCorrect: true,
          feedback:
            'Correct. Arriving is timing; the evenness and smoothness of the triple is rhythm, and a rushed triple scores down.',
        },
        {
          id: 'b',
          label: 'Full marks — landing on the next slow means the rhythm is fine.',
          isCorrect: false,
          feedback:
            'Arrival is a timing matter. The rhythm lens also judges whether the triple itself was even and smooth.',
        },
        {
          id: 'c',
          label: 'A motion fault only — triple speed has nothing to do with rhythm.',
          isCorrect: false,
          feedback:
            'The articulation of the triple is exactly a rhythm quality; a crushed triple is a rhythm mark-down.',
        },
        {
          id: 'd',
          label: 'Better — a faster triple shows energy.',
          isCorrect: false,
          feedback:
            'A rushed, uneven scramble is not energy; it loses the smooth, even feel the Triple Two needs.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is arriving the same as an even triple?' },
        { level: 2, title: 'Concept', content: 'Rhythm judges triple evenness and smoothness.' },
        { level: 3, title: 'Specific clue', content: 'A crushed, uneven scramble is a rushed triple.' },
        { level: 4, title: 'Guided solution', content: 'Choose the rhythm mark-down.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Triple quality judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting crushed triples would let a core Triple Two rhythm quality erode unremarked.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'On the count, but the triple was crushed — a rhythm mark-down.',
      failureFeedback: 'The rhythm lens judges triple evenness; a crushed, uneven triple scores down even when on the count.',
    },
    {
      id: 'jtt-003-c2',
      type: 'multiple-choice',
      title: 'Ball-Flat, Not Heel-Heavy',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'triple-two', 'rhythm'],
      storyContext:
        'A couple drives each triple down onto hard heels, making the triples heavy and percussive instead of smooth and ball-flat.',
      prompt: 'How does the rhythm lens read the heel-heavy triples?',
      options: [
        {
          id: 'a',
          label: 'Fine — heavier triples are easier to see.',
          isCorrect: false,
          feedback:
            'Visibility is not the criterion; the Triple Two triples should be smooth and ball-flat, not heel-heavy.',
        },
        {
          id: 'b',
          label: 'Fine — as long as the count is right, footwork quality does not matter.',
          isCorrect: false,
          feedback:
            'Footwork quality is exactly how the rhythm is articulated; heavy heels are the wrong quality.',
        },
        {
          id: 'c',
          label: 'Marked down — the triples should be smooth and ball-flat, and a hard, heel-heavy action is the wrong quality for the rhythm.',
          isCorrect: true,
          feedback:
            'Correct. Rhythm includes the quality of the action; ball-flat is the goal, heel-heavy is a mark-down.',
        },
        {
          id: 'd',
          label: 'A character fault — heavy triples just look less romantic.',
          isCorrect: false,
          feedback:
            'It may dull the romance, but the concrete issue is how the triple is articulated — a rhythm quality.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Should the triples be ball-flat or heel-heavy?' },
        { level: 2, title: 'Concept', content: 'Rhythm includes the quality of the footwork.' },
        { level: 3, title: 'Specific clue', content: 'Hard heels are the wrong action for these triples.' },
        { level: 4, title: 'Guided solution', content: 'Choose the rhythm mark-down for heel-heavy triples.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Action judged' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Rewarding heavy triples would push the Triple Two away from its smooth feel and split the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' },
        { topicId: 'dance.triple-two', label: 'Judging the Triple Two' },
      ],
      successFeedback: 'Ball-flat is the goal; heel-heavy is a rhythm mark-down.',
      failureFeedback: 'Triple Two triples should be smooth and ball-flat; a hard, heel-heavy action is the wrong rhythm quality.',
    },
  ],
  reflectionPrompt: 'How would you describe the difference between a smooth ball-flat triple and a heavy one to a coach?',
  rewards: [{ type: 'xp', amount: 5, label: 'Triple Two rhythm trained' }],
};
