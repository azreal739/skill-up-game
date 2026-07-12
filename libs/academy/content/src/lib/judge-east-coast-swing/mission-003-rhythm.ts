import { MissionDefinition } from '@academy/content-model';

/** East Coast Swing module mission 3 — rhythm: springy triples and the even-beat accent. */
export const judgeEcs003Rhythm: MissionDefinition = {
  id: 'judge-ecs-003-rhythm',
  campaignId: 'judge-east-coast-swing',
  title: 'Spring and Accent',
  summary:
    'Swing rhythm is a springy triple with the accent on the even beats — the "back" of the rock. Learn to hear whether the triple springs and where the accent lands.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge the springing quality of the triple',
    'Locate the accent on the even beats',
    'Separate a springy swing from a flat, even shuffle',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The triple should spring, not shuffle flat, and the accent sits on the even beats — the back-half of the rock. Flatten the spring or push the accent onto the downbeat and the swing feel is gone.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jec-003-c1',
      type: 'multiple-choice',
      title: 'Spring or Shuffle',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'east-coast-swing', 'rhythm'],
      storyContext:
        'A couple keeps the triple-triple-rock count but runs every triple flat and even — a level shuffle with no spring, no lift between the steps.',
      prompt: 'How does the rhythm lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — hitting the count is all the rhythm lens checks.',
          isCorrect: false,
          feedback:
            'Arrival on the count is timing; the springing quality of the triple is a rhythm matter, and a flat shuffle has lost it.',
        },
        {
          id: 'b',
          label: 'Marked down — a flat, even shuffle loses the springing triple that gives the East Coast Swing its rhythm, even though the count lands.',
          isCorrect: true,
          feedback:
            'Correct. Landing on the count is timing; the spring of the triple is rhythm, and a flat shuffle scores down.',
        },
        {
          id: 'c',
          label: 'A motion fault only — how a triple feels has nothing to do with rhythm.',
          isCorrect: false,
          feedback:
            'How the triple is articulated — springy vs flat — is a rhythm quality, closely tied to but distinct from the body bounce.',
        },
        {
          id: 'd',
          label: 'Better — a flat, even triple is cleaner and easier to read.',
          isCorrect: false,
          feedback:
            'Legibility is not the criterion; a flat, even shuffle has lost the swing’s springing rhythm.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is landing on the count the same as a springing triple?' },
        { level: 2, title: 'Concept', content: 'Rhythm judges the springing quality of the triple.' },
        { level: 3, title: 'Specific clue', content: 'A flat, even shuffle is not a spring.' },
        { level: 4, title: 'Guided solution', content: 'Choose the rhythm mark-down for the flat shuffle.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Triple quality judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting a flat shuffle would let the swing’s springing rhythm erode unremarked.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'On the count, but flat — a rhythm mark-down. The triple springs.',
      failureFeedback: 'The rhythm lens judges the springing triple; a flat, even shuffle scores down even on the count.',
    },
    {
      id: 'jec-003-c2',
      type: 'multiple-choice',
      title: 'Where the Accent Lives',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'east-coast-swing', 'rhythm'],
      storyContext:
        'A new judge insists the East Coast Swing accents the downbeats — the odd, "1" and "3" counts — like a march.',
      prompt: 'Where does the East Coast Swing’s dance accent actually sit?',
      options: [
        {
          id: 'a',
          label: 'On the downbeats — swings always hit the "1".',
          isCorrect: false,
          feedback:
            'That is a march feel. The swing accent sits on the even beats — the back-half of the rock — not the downbeat.',
        },
        {
          id: 'b',
          label: 'Nowhere — swing has no accent, every beat is equal.',
          isCorrect: false,
          feedback:
            'An accent-less, even feel is exactly the flat shuffle a swing is not; the even-beat accent gives it its bounce.',
        },
        {
          id: 'c',
          label: 'On the even beats — the "back" of the rock — which is where the swing’s lift and bounce come from.',
          isCorrect: true,
          feedback:
            'Correct. The dance accent on the even beats is what gives the East Coast Swing its characteristic lift and swing.',
        },
        {
          id: 'd',
          label: 'Only on the very last beat of the phrase.',
          isCorrect: false,
          feedback:
            'The even-beat accent recurs throughout the basic, not just once a phrase.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Down-beat march, or even-beat swing?' },
        { level: 2, title: 'Concept', content: 'The dance accent sits on the even beats.' },
        { level: 3, title: 'Specific clue', content: 'The "back" of the rock carries the lift.' },
        { level: 4, title: 'Guided solution', content: 'Choose "On the even beats — the back of the rock."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Accent located' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Expecting a downbeat march accent would misjudge whether a swing has its bounce at all.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' },
        { topicId: 'dance.east-coast-swing', label: 'Judging the East Coast Swing' },
      ],
      successFeedback: 'Even beats, the back of the rock — where the swing lifts. Located.',
      failureFeedback: 'The East Coast Swing accents the even beats — the back of the rock — not the downbeat.',
    },
  ],
  reflectionPrompt: 'How do you tell a springy, even-beat swing apart from a flat downbeat march in one sentence?',
  rewards: [{ type: 'xp', amount: 5, label: 'Swing rhythm trained' }],
};
