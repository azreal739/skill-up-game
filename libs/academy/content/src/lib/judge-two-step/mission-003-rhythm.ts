import { MissionDefinition } from '@academy/content-model';

/** Two Step module mission 3 — rhythm: smooth, even, driving. */
export const judgeTwoStep003Rhythm: MissionDefinition = {
  id: 'judge-two-step-003-rhythm',
  campaignId: 'judge-two-step',
  title: 'Smooth and Even',
  summary:
    'Two Step rhythm is smooth, even and continuously driving. Learn to hear whether the flow is unbroken or choppy and stop-start.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge the smoothness of the rhythmic flow',
    'Recognise a continuous drive versus a choppy one',
    'Separate a smooth Two Step from a jerky one',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The Two Step flows — the quicks and slows connect into one continuous, smooth drive. Choppy, stop-start footwork breaks that flow even if every step lands on time.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jts-003-c1',
      type: 'multiple-choice',
      title: 'Choppy or Smooth',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'two-step', 'rhythm'],
      storyContext:
        'A couple keeps the quick-quick-slow-slow count but stabs each step separately, stopping between steps so the drive is jerky and stop-start rather than flowing.',
      prompt: 'How does the rhythm lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — landing on the count is all the rhythm lens checks.',
          isCorrect: false,
          feedback:
            'Arrival on the count is timing; the smooth, continuous flow of the drive is a rhythm quality, and a choppy stab has lost it.',
        },
        {
          id: 'b',
          label: 'Marked down — a jerky, stop-start drive loses the smooth, continuous flow that defines Two Step rhythm, even though the count lands.',
          isCorrect: true,
          feedback:
            'Correct. Landing on the count is timing; the smooth connected flow is rhythm, and a choppy drive scores down.',
        },
        {
          id: 'c',
          label: 'A structure issue only — choppiness has nothing to do with rhythm.',
          isCorrect: false,
          feedback:
            'Whether the drive flows smoothly or stabs is exactly a rhythm quality, distinct from where they travel.',
        },
        {
          id: 'd',
          label: 'Better — separating each step makes the count clearer.',
          isCorrect: false,
          feedback:
            'Clarity is not the criterion; a stabbing, stop-start drive has lost the Two Step’s smooth flow.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does the drive flow, or stop and start?' },
        { level: 2, title: 'Concept', content: 'Rhythm judges the smooth, continuous flow.' },
        { level: 3, title: 'Specific clue', content: 'A jerky, stabbing drive is not smooth.' },
        { level: 4, title: 'Guided solution', content: 'Choose the rhythm mark-down for the choppy drive.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Flow judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting a choppy drive would let the Two Step’s smooth flow erode unremarked.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'On the count, but choppy — a rhythm mark-down. The Two Step flows.',
      failureFeedback: 'The rhythm lens judges the smooth, continuous flow; a jerky, stop-start drive scores down even on the count.',
    },
    {
      id: 'jts-003-c2',
      type: 'multiple-choice',
      title: 'Continuous Drive',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'two-step', 'rhythm'],
      storyContext:
        'A couple connects every quick and slow into one unbroken, smooth-flowing drive, keeping the QQSS clean even at a brisk tempo.',
      prompt: 'What does the rhythm lens reward here?',
      options: [
        {
          id: 'a',
          label: 'Nothing extra — smooth footwork is just being on time.',
          isCorrect: false,
          feedback:
            'On time is timing. The unbroken, smooth flow at speed is the rhythm quality the lens rewards.',
        },
        {
          id: 'b',
          label: 'The smooth, continuous, connected drive that defines Two Step rhythm, held clean even at a brisk tempo.',
          isCorrect: true,
          feedback:
            'Right. An unbroken, smooth-flowing drive kept clean under a brisk tempo is Two Step rhythm at its best.',
        },
        {
          id: 'c',
          label: 'A signature figure — a smooth drive is a named Two Step figure.',
          isCorrect: false,
          feedback:
            'The smooth flow is a rhythm quality, not a named figure like a promenade or wrap.',
        },
        {
          id: 'd',
          label: 'A character issue — smoothness only affects the mood.',
          isCorrect: false,
          feedback:
            'It lifts the cool mood too, but a smooth continuous flow is fundamentally a rhythm quality.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What quality is being kept clean at speed?' },
        { level: 2, title: 'Concept', content: 'A smooth, continuous drive is the Two Step’s rhythm.' },
        { level: 3, title: 'Specific clue', content: 'Unbroken flow, even at a brisk tempo.' },
        { level: 4, title: 'Guided solution', content: 'Choose the smooth, continuous, connected drive.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Smooth drive credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Failing to credit a smooth drive at speed would tell a strong couple their best quality did not register.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' },
        { topicId: 'dance.two-step', label: 'Judging the Two Step' },
      ],
      successFeedback: 'Smooth, continuous, clean at speed — Two Step rhythm at its best.',
      failureFeedback: 'The lens rewards a smooth, continuous, connected drive, held clean even at a brisk tempo.',
    },
  ],
  reflectionPrompt: 'How do you tell a smooth, controlled drive apart from a rushed, choppy one at higher tempo?',
  rewards: [{ type: 'xp', amount: 5, label: 'Two Step rhythm trained' }],
};
