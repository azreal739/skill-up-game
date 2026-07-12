import { MissionDefinition } from '@academy/content-model';

/** Nightclub module mission 7 — spatial structure: non-progressive geometry. */
export const judgeNightclub007SpatialStructure: MissionDefinition = {
  id: 'judge-nightclub-007-spatial-structure',
  campaignId: 'judge-nightclub',
  title: 'Geometry, Not Travel',
  summary:
    'The Nightclub holds a contained geometric area parallel to the audience. Learn to reward volume in place — and to fault a Nightclub that wanders.',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm the Nightclub as non-progressive',
    'Recognise geometry held parallel to the audience edge',
    'Fault continuous travel around the floor',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The Nightclub builds squares, diamonds and circles in one area, facing the audience. If it drifts into circling the room, it has borrowed a progressive dance’s structure.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jn-007-c1',
      type: 'multiple-choice',
      title: 'The Wandering Nightclub',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'nightclub', 'spatial-structure'],
      storyContext:
        'A Nightclub couple gradually travels counter-clockwise all the way around the floor, as if dancing a Waltz.',
      prompt: 'How does the spatial structure lens read this?',
      options: [
        {
          id: 'a',
          label: 'Good — covering the whole floor shows ambition and stagecraft.',
          isCorrect: false,
          feedback:
            'Ambition is not the criterion. For a non-progressive dance, circling the floor is the wrong structure.',
        },
        {
          id: 'b',
          label: 'Fine — direction is all that matters, and counter-clockwise is correct.',
          isCorrect: false,
          feedback:
            'Direction is not the issue; the Nightclub is not meant to progress around the room at all.',
        },
        {
          id: 'c',
          label: 'A spatial-structure fault — the Nightclub is non-progressive and should hold a contained area, not travel the line of dance.',
          isCorrect: true,
          feedback:
            'Correct. A Nightclub that circles the room has borrowed a progressive dance’s structure — a real fault.',
        },
        {
          id: 'd',
          label: 'A character issue — wandering just looks a little aimless.',
          isCorrect: false,
          feedback:
            'It may read as aimless, but the concrete problem is structural: a non-progressive dance that progresses.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the Nightclub progressive or non-progressive?' },
        { level: 2, title: 'Concept', content: 'Non-progressive dances hold a contained area, not the line of dance.' },
        { level: 3, title: 'Specific clue', content: 'Circling the floor is the progressive pattern, wrong here.' },
        { level: 4, title: 'Guided solution', content: 'Choose the spatial-structure fault.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Wandering caught' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding a wandering Nightclub would blur progressive and non-progressive dances.',
        },
      ],
      helpLinks: [{ topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' }],
      successFeedback: 'Contained means contained. A wandering Nightclub is a structural fault.',
      failureFeedback: 'The Nightclub is non-progressive — travelling the line of dance is the wrong structure.',
    },
    {
      id: 'jn-007-c2',
      type: 'multiple-choice',
      title: 'Volume in Place',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'nightclub', 'spatial-structure'],
      storyContext:
        'Two Nightclub couples both stay in one area. Couple A shapes full diamonds and circles facing the audience, using real depth; couple B mostly shuffles in a tight, flat knot.',
      prompt: 'On spatial structure, how do they compare?',
      options: [
        {
          id: 'a',
          label: 'Couple A is stronger — holding the area is only half of it; A also shapes genuine geometry and depth parallel to the audience.',
          isCorrect: true,
          feedback:
            'Right. Both are non-progressive, but the lens also rewards shaping real volume; A builds geometry, B merely stays put.',
        },
        {
          id: 'b',
          label: 'Identical — both stayed in one area, so both are structurally perfect.',
          isCorrect: false,
          feedback:
            'Staying put is necessary but not sufficient. The Nightclub should shape volume and depth, which B is not doing.',
        },
        {
          id: 'c',
          label: 'Couple B is stronger — a tight, compact knot is safer and more contained.',
          isCorrect: false,
          feedback:
            'Contained does not mean cramped and shapeless. The lens rewards geometry and depth, which B lacks.',
        },
        {
          id: 'd',
          label: 'Neither — geometry versus shuffling is a figures question, not spatial structure.',
          isCorrect: false,
          feedback:
            'How the couple uses the floor area — shaping volume vs staying flat — is squarely spatial structure.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Both stay put — what distinguishes the use of space?' },
        { level: 2, title: 'Concept', content: 'Nightclub structure rewards shaped volume and depth, not just staying in place.' },
        { level: 3, title: 'Specific clue', content: 'A builds geometry; B merely does not travel.' },
        { level: 4, title: 'Guided solution', content: 'Choose couple A for shaping genuine geometry.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Volume judged' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Scoring the two as identical would ignore a real difference the panel will mark.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' },
        { topicId: 'dance.nightclub', label: 'Judging the Nightclub' },
      ],
      successFeedback: 'Both stay put, but A shapes real volume. That is the fuller structure.',
      failureFeedback: 'Nightclub structure rewards shaped geometry and depth, not merely staying in one place.',
    },
  ],
  reflectionPrompt: 'How would you explain to a couple that "non-progressive" does not mean "stand still"?',
  rewards: [{ type: 'xp', amount: 5, label: 'Nightclub structure trained' }],
};
