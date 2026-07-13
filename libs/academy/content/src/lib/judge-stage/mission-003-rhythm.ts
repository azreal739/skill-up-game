import { MissionDefinition } from '@academy/content-model';

/** Stage module mission 3 — rhythm: the era's rhythmic feel. */
export const judgeStage003Rhythm: MissionDefinition = {
  id: 'judge-stage-003-rhythm',
  campaignId: 'judge-stage',
  title: 'The Era’s Feel',
  summary:
    'Each era carries its own rhythmic feel — the swung Charleston bounce, the four-on-the-floor Disco drive. Learn to hear whether a performer captures the period’s groove.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise the rhythmic feel of different eras',
    'Judge whether the groove matches the period',
    'Separate an era-true feel from a generic one',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Charleston swings with a bouncy 1920s lilt; Disco drives four-on-the-floor; each era has a feel. A performer must capture the period’s groove, not wash it into a generic beat.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jsg-003-c1',
      type: 'multiple-choice',
      title: 'Swung or Straight',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'stage', 'rhythm'],
      storyContext:
        'A Charleston number, whose 1920s music swings with a bouncy lilt, is danced dead straight and even — the swung feel flattened into a metronomic on-beat step.',
      prompt: 'How does the rhythm lens read this?',
      options: [
        {
          id: 'a',
          label: 'Marked down — the Charleston’s 1920s feel is a swung, bouncy lilt, and flattening it into a straight, even step has lost the era’s groove.',
          isCorrect: true,
          feedback:
            'Correct. Landing on the beat is timing; capturing the era’s swung feel is rhythm, and a straight step has lost it.',
        },
        {
          id: 'b',
          label: 'Full marks — landing on the beat is all the rhythm lens checks.',
          isCorrect: false,
          feedback:
            'Landing on the beat is timing; the era’s swung, bouncy feel is the rhythm quality, and it is flattened.',
        },
        {
          id: 'c',
          label: 'A motion fault only — the feel of a step has nothing to do with rhythm.',
          isCorrect: false,
          feedback:
            'Whether the movement captures the era’s swung groove is exactly a rhythm quality.',
        },
        {
          id: 'd',
          label: 'Better — a straight, even feel is cleaner and more precise.',
          isCorrect: false,
          feedback:
            'Precision is not the criterion; a straight step has lost the Charleston’s swung 1920s feel.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does the movement swing like the era, or run straight?' },
        { level: 2, title: 'Concept', content: 'Rhythm judges whether the era’s feel is captured.' },
        { level: 3, title: 'Specific clue', content: 'A flattened, straight Charleston has lost its swing.' },
        { level: 4, title: 'Guided solution', content: 'Choose the rhythm mark-down for the lost swing.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Era feel judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting a flattened groove would let the era’s defining feel go unrewarded and unrequired.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'Straight where it should swing — a rhythm mark-down. The era has a feel.',
      failureFeedback: 'The rhythm lens judges the era’s feel; flattening a swung Charleston into a straight step scores down even on the beat.',
    },
    {
      id: 'jsg-003-c2',
      type: 'multiple-choice',
      title: 'Capturing the Period',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'stage', 'rhythm'],
      storyContext:
        'A Disco number is danced with a driving, grounded four-on-the-floor pulse that locks into the period’s relentless groove.',
      prompt: 'What does the rhythm lens reward here?',
      options: [
        {
          id: 'a',
          label: 'Capturing the era’s rhythmic feel — locking into Disco’s driving four-on-the-floor groove is exactly what the rhythm lens rewards for Stage.',
          isCorrect: true,
          feedback:
            'Right. A performer who captures the period’s groove — here, Disco’s relentless drive — scores well on rhythm.',
        },
        {
          id: 'b',
          label: 'Nothing extra — a steady pulse is just being on the beat.',
          isCorrect: false,
          feedback:
            'On the beat is timing. Locking into the era’s specific groove is the rhythm quality the lens rewards.',
        },
        {
          id: 'c',
          label: 'A spatial point — the groove only affects how they use the stage.',
          isCorrect: false,
          feedback:
            'The era’s groove is a rhythm quality; use of the stage is a separate spatial matter.',
        },
        {
          id: 'd',
          label: 'A signature figure — a good groove is a named move.',
          isCorrect: false,
          feedback:
            'The era’s feel is a rhythm quality, not a named figure like a swing-out or hustle.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What is being captured — the beat, or the era’s groove?' },
        { level: 2, title: 'Concept', content: 'Rhythm rewards capturing the period’s feel.' },
        { level: 3, title: 'Specific clue', content: 'Disco’s driving four-on-the-floor groove.' },
        { level: 4, title: 'Guided solution', content: 'Choose capturing the era’s rhythmic feel.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Period groove credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Failing to credit an era-true groove would tell a performer their best quality did not register.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' },
        { topicId: 'dance.stage', label: 'Judging Stage and Era Styles' },
      ],
      successFeedback: 'Locked into Disco’s drive — the era’s feel, credited.',
      failureFeedback: 'The rhythm lens rewards capturing the era’s feel: locking into Disco’s driving four-on-the-floor groove.',
    },
  ],
  reflectionPrompt: 'How would you describe the difference between the Charleston’s feel and Disco’s feel in one sentence each?',
  rewards: [{ type: 'xp', amount: 5, label: 'Stage rhythm trained' }],
};
