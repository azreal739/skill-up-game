import { MissionDefinition } from '@academy/content-model';

/** Nightclub module mission 3 — rhythm: the soft, connected slow-quick-quick. */
export const judgeNightclub003Rhythm: MissionDefinition = {
  id: 'judge-nightclub-003-rhythm',
  campaignId: 'judge-nightclub',
  title: 'The Soft Answer',
  summary:
    'Nightclub rhythm is not just the right durations — it is the soft, ball-flat quality that connects them. Learn to hear it.',
  difficulty: 'easy',
  learningObjectives: [
    'Recognise ball-flat footwork in the rhythm',
    'Judge the soft, connected quality of the slow-quick-quick',
    'Separate correct durations from correct feel',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The durations can be perfect and the rhythm still wrong. Nightclub answers its slow with soft, ball-flat quicks — never a hard heel stab.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jn-003-c1',
      type: 'multiple-choice',
      title: 'Ball-Flat or Heel-Stab',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'nightclub', 'rhythm'],
      storyContext:
        'A couple keeps perfect slow-quick-quick durations, but drives each quick down onto a hard heel, making the rhythm feel sharp and percussive.',
      prompt: 'How does the rhythm lens read this?',
      options: [
        {
          id: 'a',
          label: 'Top marks — correct durations are all the rhythm lens checks.',
          isCorrect: false,
          feedback:
            'Durations are only half of it. The Nightclub’s rhythm is soft and ball-flat; hard heel stabs are the wrong quality.',
        },
        {
          id: 'b',
          label: 'Top marks — a sharp, percussive feel adds excitement.',
          isCorrect: false,
          feedback:
            'Sharp and percussive is the wrong flavour for a soft, romantic Nightclub — it works against the rhythm, not for it.',
        },
        {
          id: 'c',
          label: 'Marked down on rhythm — the durations are right but the hard, heel-driven quality is not the Nightclub’s soft ball-flat feel.',
          isCorrect: true,
          feedback:
            'Correct. Rhythm includes quality: the slow-quick-quick should stay soft and ball-flat, not stab into the floor.',
        },
        {
          id: 'd',
          label: 'It is a motion fault only — footwork has nothing to do with rhythm.',
          isCorrect: false,
          feedback:
            'Ball-flat versus heel-stab is exactly how the rhythm is articulated; it is a rhythm-quality matter here.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the rhythm only durations, or quality too?' },
        { level: 2, title: 'Concept', content: 'Nightclub rhythm is soft and ball-flat, not hard and percussive.' },
        { level: 3, title: 'Specific clue', content: 'Right durations, wrong feel is a rhythm mark-down.' },
        { level: 4, title: 'Guided solution', content: 'Choose the rhythm mark-down for the hard, heel-driven quality.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Quality judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding a hard, percussive Nightclub would blur its soft rhythm into a different style.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'Right durations, wrong feel — a rhythm mark-down. The Nightclub stays soft.',
      failureFeedback: 'Nightclub rhythm is soft and ball-flat; correct durations with a hard heel-stab still score down.',
    },
    {
      id: 'jn-003-c2',
      type: 'multiple-choice',
      title: 'Connected, Not Stamped',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'nightclub', 'rhythm'],
      storyContext:
        'A couple flows the slow into the two quicks as one soft, connected phrase, ball-flat throughout, matching the romantic music.',
      prompt: 'What does the rhythm lens reward here?',
      options: [
        {
          id: 'a',
          label: 'Nothing extra — flowing the steps together is just being on time.',
          isCorrect: false,
          feedback:
            'On time is timing. Flowing the durations into a soft, connected phrase is the rhythm quality the lens rewards.',
        },
        {
          id: 'b',
          label: 'A signature figure — a connected phrase is a named Nightclub figure.',
          isCorrect: false,
          feedback:
            'Connectedness is a rhythm quality, not a named figure like a diamond or pass.',
        },
        {
          id: 'c',
          label: 'The soft, connected slow-quick-quick that defines Nightclub rhythm, matched to the romantic music.',
          isCorrect: true,
          feedback:
            'Right. Soft, ball-flat and connected — the slow-quick-quick expressed as one flowing phrase is Nightclub rhythm at its best.',
        },
        {
          id: 'd',
          label: 'A spatial-structure trait — flow only describes how they use the floor.',
          isCorrect: false,
          feedback:
            'Flow here is about how the rhythm is carried through the body, not where the couple travels.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What quality carries the durations together?' },
        { level: 2, title: 'Concept', content: 'Soft, connected articulation is the Nightclub’s rhythm.' },
        { level: 3, title: 'Specific clue', content: 'Ball-flat, flowing the slow into the quicks.' },
        { level: 4, title: 'Guided solution', content: 'Choose the soft, connected slow-quick-quick.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Connection recognised' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Failing to credit genuine soft phrasing would tell a couple their best quality did not register.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' },
        { topicId: 'dance.nightclub', label: 'Judging the Nightclub' },
      ],
      successFeedback: 'Soft, ball-flat, connected — Nightclub rhythm as intended.',
      failureFeedback: 'The lens rewards the soft, connected slow-quick-quick matched to the romantic music.',
    },
  ],
  reflectionPrompt: 'How would you describe, in one phrase, the difference between "on time" and "in rhythm" for a Nightclub?',
  rewards: [{ type: 'xp', amount: 5, label: 'Nightclub rhythm trained' }],
};
