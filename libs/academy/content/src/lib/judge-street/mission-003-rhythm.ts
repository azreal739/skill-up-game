import { MissionDefinition } from '@academy/content-model';

/** Street module mission 3 — rhythm: groove and the pocket. */
export const judgeStreet003Rhythm: MissionDefinition = {
  id: 'judge-street-003-rhythm',
  campaignId: 'judge-street',
  title: 'Groove and the Pocket',
  summary:
    'Street rhythm is groove — sitting inside the music with feel and syncopation, not just stepping on the beat. Learn to hear whether a performer is in the pocket.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge groove and pocket, not just on-beat stepping',
    'Recognise syncopation and feel',
    'Separate a grooving performer from a metronomic one',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Groove is sitting inside the music — riding the syncopation and feel. A performer who only stamps the downbeat is on time but has no pocket.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jst-003-c1',
      type: 'multiple-choice',
      title: 'Pocket or Metronome',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'street', 'rhythm'],
      storyContext:
        'A performer stamps cleanly on every downbeat but never rides the syncopation or feel of the track — mechanically on the beat, with no groove.',
      prompt: 'How does the rhythm lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — hitting every downbeat is the strongest rhythm.',
          isCorrect: false,
          feedback:
            'Hitting the downbeat is timing; the groove and pocket — riding the syncopation and feel — is the rhythm lens, and it is missing.',
        },
        {
          id: 'b',
          label: 'A motion fault only — groove has nothing to do with rhythm.',
          isCorrect: false,
          feedback:
            'Groove — how a performer sits inside the music — is exactly a rhythm quality.',
        },
        {
          id: 'c',
          label: 'Better — a clean, mechanical downbeat is easier to read.',
          isCorrect: false,
          feedback:
            'Legibility is not the criterion; a metronomic downbeat with no pocket has lost the groove.',
        },
        {
          id: 'd',
          label: 'Marked down — mechanically stamping the downbeat with no groove or syncopation has lost the pocket that defines Street rhythm.',
          isCorrect: true,
          feedback:
            'Correct. On the beat is timing; sitting in the pocket with groove and feel is rhythm, and it is absent.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the performer riding the groove, or just stamping the beat?' },
        { level: 2, title: 'Concept', content: 'Rhythm judges groove and pocket, not just on-beat.' },
        { level: 3, title: 'Specific clue', content: 'A metronomic downbeat has no pocket.' },
        { level: 4, title: 'Guided solution', content: 'Choose the rhythm mark-down for no groove.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Groove judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting a metronomic performance would let the groove that defines Street rhythm go unrewarded and unrequired.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'On the beat, no pocket — a rhythm mark-down. Street grooves.',
      failureFeedback: 'The rhythm lens judges groove and pocket; a mechanical downbeat with no syncopation or feel scores down even on the beat.',
    },
    {
      id: 'jst-003-c2',
      type: 'multiple-choice',
      title: 'In the Pocket',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'street', 'rhythm'],
      storyContext:
        'A performer sits deep in the groove, riding the syncopation and swing of the track so the movement feels locked into the music’s feel.',
      prompt: 'What does the rhythm lens reward here?',
      options: [
        {
          id: 'a',
          label: 'Nothing extra — being in time is all that matters.',
          isCorrect: false,
          feedback:
            'Being in time is timing. Sitting deep in the groove with syncopation and feel is the rhythm quality the lens rewards.',
        },
        {
          id: 'b',
          label: 'The groove and pocket — riding the syncopation and feel so the movement locks into the music is Street rhythm at its best.',
          isCorrect: true,
          feedback:
            'Right. A performer locked into the pocket, riding the feel, is exactly what the rhythm lens rewards.',
        },
        {
          id: 'c',
          label: 'A spatial point — groove only affects how they use the floor.',
          isCorrect: false,
          feedback:
            'Groove is a rhythm quality; use of the floor is a separate spatial-structure matter.',
        },
        {
          id: 'd',
          label: 'A signature figure — a good groove is a named move.',
          isCorrect: false,
          feedback:
            'Groove is a rhythm quality, not a named figure like a waack or a lock.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What quality is the performer showing beyond being on time?' },
        { level: 2, title: 'Concept', content: 'Groove and pocket are the Street rhythm lens.' },
        { level: 3, title: 'Specific clue', content: 'Riding the syncopation and feel of the track.' },
        { level: 4, title: 'Guided solution', content: 'Choose the groove and pocket.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Pocket credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Failing to credit deep groove would tell a strong performer their best quality did not register.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' },
        { topicId: 'dance.street', label: 'Judging Street Styles' },
      ],
      successFeedback: 'Locked in the pocket — Street rhythm at its best.',
      failureFeedback: 'The lens rewards groove and pocket: riding the syncopation and feel so the movement locks into the music.',
    },
  ],
  reflectionPrompt: 'How would you describe the difference between "on the beat" and "in the pocket" in one sentence?',
  rewards: [{ type: 'xp', amount: 5, label: 'Street rhythm trained' }],
};
