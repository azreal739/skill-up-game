import { MissionDefinition } from '@academy/content-model';

/** Waltz module mission 3 — rhythm: the flowing three-beat feel. */
export const judgeWaltz003Rhythm: MissionDefinition = {
  id: 'judge-waltz-003-rhythm',
  campaignId: 'judge-waltz',
  title: 'The Flowing Three',
  summary:
    'A Waltz is not marched 1-2-3; it flows. Learn to hear the continuous swing that carries the three beats together.',
  difficulty: 'easy',
  learningObjectives: [
    'Recognise the flowing, connected three-beat rhythm',
    'Tell a flowing Waltz from a marched, stepped one',
    'Score rhythm apart from being merely on the beat',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Two couples can both hit 1-2-3 on time. The one that wins the rhythm lens connects those beats with continuous swing — flowing, not stamping.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jw-003-c1',
      type: 'multiple-choice',
      title: 'Flow or March',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'waltz', 'rhythm'],
      storyContext:
        'A couple lands every beat perfectly on time, but each step is a separate, flat stamp — 1, 2, 3 — with no connection between them.',
      prompt: 'How does the rhythm lens read this, given the timing is spotless?',
      options: [
        {
          id: 'a',
          label: 'Top marks — perfect timing is the same as perfect rhythm.',
          isCorrect: false,
          feedback:
            'Timing and rhythm are different lenses. On-time but disconnected steps satisfy timing, not the flowing Waltz rhythm.',
        },
        {
          id: 'b',
          label: 'Cannot be judged — rhythm only matters in slow-quick dances.',
          isCorrect: false,
          feedback:
            'Every dance has a rhythm to express. The Waltz’s is a flowing, connected three — very much judgeable.',
        },
        {
          id: 'c',
          label: 'Full character marks — a crisp stamp shows commitment.',
          isCorrect: false,
          feedback:
            'A flat stamp is neither the Waltz’s rhythm nor its regal character. This is a rhythm question, and the flow is missing.',
        },
        {
          id: 'd',
          label: 'Lower on rhythm — the Waltz’s flowing, connected three is missing, even though the beats are on time.',
          isCorrect: true,
          feedback:
            'Correct. The rhythm lens wants the continuous swing carrying the three beats; stamped, disconnected beats score down.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is being on the beat the same as expressing the rhythm?' },
        { level: 2, title: 'Concept', content: 'Waltz rhythm is a flowing, connected three, not three separate stamps.' },
        { level: 3, title: 'Specific clue', content: 'On-time but disconnected belongs to the rhythm lens, marked down.' },
        { level: 4, title: 'Guided solution', content: 'Choose the option lowering rhythm for missing flow.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Flow judged' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Scoring a stamped Waltz as clean rhythm would put you out of step with the rest of the panel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'On time is not the same as in rhythm. You heard the missing flow.',
      failureFeedback: 'Waltz rhythm is a flowing, connected three — on-time but stamped steps score down on rhythm.',
    },
    {
      id: 'jw-003-c2',
      type: 'multiple-choice',
      title: 'Where the Swing Lives',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'waltz', 'rhythm'],
      storyContext:
        'A strong Waltz couple gathers energy through beat 1, lets it carry across 2, and settles it into 3 — a continuous pendulum, repeating each bar.',
      prompt: 'What is the couple demonstrating on the rhythm lens?',
      options: [
        {
          id: 'a',
          label: 'A timing error — energy should be identical on all three beats.',
          isCorrect: false,
          feedback:
            'Equal energy on every beat is the marched feel you are meant to avoid. The pendulum swing is the goal.',
        },
        {
          id: 'b',
          label: 'The flowing swing that defines Waltz rhythm — energy carried continuously across the three beats.',
          isCorrect: true,
          feedback:
            'Right. Gathering, carrying and settling the swing across the bar is exactly the connected three the rhythm lens rewards.',
        },
        {
          id: 'c',
          label: 'A signature figure — the pendulum is a named Waltz figure.',
          isCorrect: false,
          feedback:
            'Swing is a quality of movement/rhythm, not a named figure like the box or twinkle.',
        },
        {
          id: 'd',
          label: 'A spatial-structure trait — it only describes how they travel.',
          isCorrect: false,
          feedback:
            'The pendulum swing is about how the rhythm is carried through the body, not where the couple goes on the floor.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What quality carries the three beats together here?' },
        { level: 2, title: 'Concept', content: 'Continuous swing across the bar is the Waltz’s flowing rhythm.' },
        { level: 3, title: 'Specific clue', content: 'Gather, carry, settle — a pendulum, not three stamps.' },
        { level: 4, title: 'Guided solution', content: 'Choose the flowing swing that defines Waltz rhythm.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Swing recognised' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Failing to credit genuine swing would tell a strong couple their best quality did not count.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' },
        { topicId: 'dance.waltz', label: 'Judging the Waltz' },
      ],
      successFeedback: 'Gather, carry, settle — the flowing three. That is Waltz rhythm at its best.',
      failureFeedback: 'A continuous pendulum carrying the three beats together is the flowing swing the rhythm lens rewards.',
    },
  ],
  reflectionPrompt: 'What visual cue tells you a couple is flowing through the three beats rather than stamping them?',
  rewards: [{ type: 'xp', amount: 5, label: 'Waltz rhythm trained' }],
};
