import { MissionDefinition } from '@academy/content-model';

/** Waltz module mission 7 — spatial structure: progressive, CCW, on diagonals. */
export const judgeWaltz007SpatialStructure: MissionDefinition = {
  id: 'judge-waltz-007-spatial-structure',
  campaignId: 'judge-waltz',
  title: 'Line of Dance',
  summary:
    'The Waltz travels. Learn to judge progressive, counter-clockwise movement on the diagonals — and to spot a Waltz that stalls.',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm the Waltz as a progressive dance',
    'Recognise counter-clockwise travel on diagonals',
    'Fault a Waltz that fails to progress along the line of dance',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'A Waltz should move counter-clockwise around the room along the line of dance, travelling on diagonals. A Waltz that circles on one spot has lost its structure.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jw-007-c1',
      type: 'multiple-choice',
      title: 'Travel or Stall',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'waltz', 'spatial-structure'],
      storyContext:
        'A Waltz couple stays in one corner of the floor, rotating on the spot for the whole routine and never progressing around the room.',
      prompt: 'How does the spatial structure lens read this?',
      options: [
        {
          id: 'a',
          label: 'Good — staying in one place shows control and avoids collisions.',
          isCorrect: false,
          feedback:
            'Control is welcome, but the Waltz is a progressive dance; refusing to travel is the wrong structure, not control.',
        },
        {
          id: 'b',
          label: 'Fine — the Waltz is non-progressive, so holding one spot is correct.',
          isCorrect: false,
          feedback:
            'The Waltz is progressive, not non-progressive. Holding one spot is precisely the fault here.',
        },
        {
          id: 'c',
          label: 'A character issue — it just looks a bit timid.',
          isCorrect: false,
          feedback:
            'It may read as timid, but the concrete problem is structural: a progressive dance that fails to progress.',
        },
        {
          id: 'd',
          label: 'A spatial-structure fault — the Waltz is progressive and should travel the line of dance, not stall in a corner.',
          isCorrect: true,
          feedback:
            'Correct. A Waltz that never progresses counter-clockwise around the room has failed the spatial-structure lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the Waltz progressive or non-progressive?' },
        { level: 2, title: 'Concept', content: 'A progressive dance must travel the line of dance.' },
        { level: 3, title: 'Specific clue', content: 'Rotating on one spot is a stall, not progression.' },
        { level: 4, title: 'Guided solution', content: 'Choose the spatial-structure fault for failing to travel.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Progression judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Treating a stalled Waltz as correct would blur progressive and non-progressive dances.',
        },
      ],
      helpLinks: [{ topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' }],
      successFeedback: 'A Waltz travels. A stall in the corner is a structural fault, and you caught it.',
      failureFeedback: 'The Waltz is progressive — rotating on one spot fails the spatial-structure lens.',
    },
    {
      id: 'jw-007-c2',
      type: 'multiple-choice',
      title: 'Diagonal or Straight',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'waltz', 'spatial-structure'],
      storyContext:
        'Two Waltz couples both travel counter-clockwise. Couple A moves on clean diagonals across the corners; couple B marches in straight lines hugging the wall.',
      prompt: 'On spatial structure, how do they compare?',
      options: [
        {
          id: 'a',
          label: 'Identical — both travel counter-clockwise, so both are structurally perfect.',
          isCorrect: false,
          feedback:
            'Direction is only part of it. Waltz travel is expected on diagonals; straight wall-hugging is weaker structure.',
        },
        {
          id: 'b',
          label: 'Couple A is stronger — diagonal travel across the floor is the expected Waltz structure; straight-line wall-hugging is weaker.',
          isCorrect: true,
          feedback:
            'Right. Both progress, but the Waltz uses diagonals to cover the floor; A demonstrates that structure more fully.',
        },
        {
          id: 'c',
          label: 'Couple B is stronger — hugging the wall is safer and shows better floorcraft.',
          isCorrect: false,
          feedback:
            'Safety alone does not make better structure. The Waltz’s expected pattern is diagonal travel, which B is not using.',
        },
        {
          id: 'd',
          label: 'Neither — diagonals versus straight lines is a motion question, not spatial structure.',
          isCorrect: false,
          feedback:
            'The path a couple travels across the floor is squarely spatial structure, not motion.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Both travel CCW — what distinguishes the paths?' },
        { level: 2, title: 'Concept', content: 'Waltz travel is expected on diagonals, using the whole floor.' },
        { level: 3, title: 'Specific clue', content: 'Diagonals across the corners are the fuller structure.' },
        { level: 4, title: 'Guided solution', content: 'Choose couple A for diagonal travel.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Diagonals judged' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Scoring the two as identical would ignore a real difference the panel will mark.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' },
        { topicId: 'dance.waltz', label: 'Judging the Waltz' },
      ],
      successFeedback: 'Both travel, but A owns the diagonals. That is the fuller Waltz structure.',
      failureFeedback: 'Waltz travel is expected on diagonals across the floor — that is stronger structure than hugging the wall.',
    },
  ],
  reflectionPrompt: 'Why might diagonal travel be built into the Waltz rather than simply circling the room?',
  rewards: [{ type: 'xp', amount: 5, label: 'Waltz structure trained' }],
};
