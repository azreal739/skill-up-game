import { MissionDefinition } from '@academy/content-model';

/** Polka module mission 3 — rhythm: the bright, springing lilt. */
export const judgePolka003Rhythm: MissionDefinition = {
  id: 'judge-polka-003-rhythm',
  campaignId: 'judge-polka',
  title: 'Bright and Springing',
  summary:
    'Polka rhythm is a light, springing ball-ball-ball-flat lilt. Learn to hear whether the spring is bright or heavy and grounded.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge the lightness of the lilt',
    'Recognise ball-ball-ball-flat footwork',
    'Separate a bright spring from a heavy stomp',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The Polka springs off the balls of the feet — light and bright. Stomped flat and heavy, it loses the lilt even if the count lands.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jpk-003-c1',
      type: 'multiple-choice',
      title: 'Spring or Stomp',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'polka', 'rhythm'],
      storyContext:
        'A couple keeps the 1&2 count but lands every step flat and heavy, stomping into the floor rather than springing off the balls of the feet.',
      prompt: 'How does the rhythm lens read this?',
      options: [
        {
          id: 'a',
          label: 'Marked down — a heavy, flat stomp loses the bright, springing ball-ball-ball-flat lilt, even though the count lands.',
          isCorrect: true,
          feedback:
            'Correct. Landing on the count is timing; the lightness and spring of the lilt is rhythm, and a stomp scores down.',
        },
        {
          id: 'b',
          label: 'Full marks — landing on the count means the rhythm is fine.',
          isCorrect: false,
          feedback:
            'Arrival is a timing matter. The rhythm lens also judges the springing quality of the lilt.',
        },
        {
          id: 'c',
          label: 'A motion fault only — footwork weight has nothing to do with rhythm.',
          isCorrect: false,
          feedback:
            'How the lilt is articulated — light spring vs heavy stomp — is a rhythm quality.',
        },
        {
          id: 'd',
          label: 'Better — heavier landings show energy and commitment.',
          isCorrect: false,
          feedback:
            'A heavy stomp is not the Polka’s energy; its energy is a bright, light spring.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is landing on the count the same as a bright lilt?' },
        { level: 2, title: 'Concept', content: 'Rhythm judges the springing quality of the lilt.' },
        { level: 3, title: 'Specific clue', content: 'A flat, heavy stomp is not a spring.' },
        { level: 4, title: 'Guided solution', content: 'Choose the rhythm mark-down for the stomp.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Lilt quality judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting a heavy stomp would let the Polka’s bright lilt erode unremarked.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'On the count, but stomped — a rhythm mark-down. The Polka springs.',
      failureFeedback: 'The rhythm lens judges the springing lilt; a flat, heavy stomp scores down even on the count.',
    },
    {
      id: 'jpk-003-c2',
      type: 'multiple-choice',
      title: 'Bright, Not Frantic',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'polka', 'rhythm'],
      storyContext:
        'A couple springs brightly and lightly through every lilt, keeping the ball-ball-ball-flat clean even at a fast tempo.',
      prompt: 'What does the rhythm lens reward here?',
      options: [
        {
          id: 'a',
          label: 'Nothing extra — light footwork is just being on time.',
          isCorrect: false,
          feedback:
            'On time is timing. The bright, clean spring at speed is the rhythm quality the lens rewards.',
        },
        {
          id: 'b',
          label: 'A signature figure — a clean lilt is a named Polka figure.',
          isCorrect: false,
          feedback:
            'The lilt is a rhythm quality, not a named figure like a gallop or weave.',
        },
        {
          id: 'c',
          label: 'The bright, light, clean ball-ball-ball-flat lilt that defines Polka rhythm, held even at speed.',
          isCorrect: true,
          feedback:
            'Right. A springing, clean lilt kept light under a fast tempo is Polka rhythm at its best.',
        },
        {
          id: 'd',
          label: 'A character issue — brightness only affects the mood.',
          isCorrect: false,
          feedback:
            'It lifts the mood too, but a clean springing lilt is fundamentally a rhythm quality.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What quality is being kept clean at speed?' },
        { level: 2, title: 'Concept', content: 'A bright, light, clean lilt is the Polka’s rhythm.' },
        { level: 3, title: 'Specific clue', content: 'Springing ball-ball-ball-flat, even fast.' },
        { level: 4, title: 'Guided solution', content: 'Choose the bright, light, clean lilt.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Bright lilt credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Failing to credit a clean lilt at speed would tell a strong couple their best quality did not register.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' },
        { topicId: 'dance.polka', label: 'Judging the Polka' },
      ],
      successFeedback: 'Bright, light, clean at speed — Polka rhythm at its best.',
      failureFeedback: 'The lens rewards a bright, light, clean ball-ball-ball-flat lilt, held even at a fast tempo.',
    },
  ],
  reflectionPrompt: 'How do you tell a bright, controlled lilt apart from a frantic, scrambling one at high tempo?',
  rewards: [{ type: 'xp', amount: 5, label: 'Polka rhythm trained' }],
};
