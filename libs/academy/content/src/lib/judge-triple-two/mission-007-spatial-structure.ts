import { MissionDefinition } from '@academy/content-model';

/** Triple Two module mission 7 — spatial structure: curved progression. */
export const judgeTripleTwo007SpatialStructure: MissionDefinition = {
  id: 'judge-triple-two-007-spatial-structure',
  campaignId: 'judge-triple-two',
  title: 'Curve and Progress',
  summary:
    'The Triple Two travels the floor on a curved, weaving path. Learn to judge continuous curved progression — and to fault a stall or a straight line.',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm the Triple Two as progressive on a curve',
    'Fault travel that stalls or straightens out',
    'Distinguish it from the Waltz’s diagonals',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The Triple Two flows down the floor on a curving, weaving path. Stalling in place, or cutting straight lines like a Waltz, both lose the structure.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jtt-007-c1',
      type: 'multiple-choice',
      title: 'Flow or Stall',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'triple-two', 'spatial-structure'],
      storyContext:
        'A Triple Two couple repeatedly stops travelling and works figures on the spot, then moves a little, then stalls again.',
      prompt: 'How does the spatial structure lens read this?',
      options: [
        {
          id: 'a',
          label: 'Good — pausing shows control of the figures.',
          isCorrect: false,
          feedback:
            'The Triple Two is progressive; repeatedly stalling is a structural fault, not control.',
        },
        {
          id: 'b',
          label: 'Fine — the Triple Two is non-progressive, so staying put is correct.',
          isCorrect: false,
          feedback:
            'The Triple Two is progressive; it should keep travelling, not stall.',
        },
        {
          id: 'c',
          label: 'A character issue — stalling just looks a little hesitant.',
          isCorrect: false,
          feedback:
            'It may read hesitant, but the concrete problem is structural: a progressive dance that keeps stalling.',
        },
        {
          id: 'd',
          label: 'A spatial-structure fault — the Triple Two should travel continuously on a curve, and repeated stalling breaks the progression.',
          isCorrect: true,
          feedback:
            'Correct. Continuous curved progression is the structure; stalling repeatedly is a real fault.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the Triple Two progressive?' },
        { level: 2, title: 'Concept', content: 'A progressive dance should keep travelling.' },
        { level: 3, title: 'Specific clue', content: 'Repeated stalling breaks the progression.' },
        { level: 4, title: 'Guided solution', content: 'Choose the spatial-structure fault for stalling.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Progression judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding a stalled Triple Two would blur progressive and non-progressive dances.',
        },
      ],
      helpLinks: [{ topicId: 'dance.triple-two', label: 'Judging the Triple Two' }],
      successFeedback: 'It travels. Repeated stalling is a structural fault, and you caught it.',
      failureFeedback: 'The Triple Two travels continuously on a curve; repeated stalling is a spatial-structure fault.',
    },
    {
      id: 'jtt-007-c2',
      type: 'multiple-choice',
      title: 'Curve, Not Straight',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'triple-two', 'spatial-structure'],
      storyContext:
        'Two Triple Two couples both travel and progress. Couple A flows on a curving, weaving path; couple B marches in straight lines like a Waltz.',
      prompt: 'On spatial structure, how do they compare?',
      options: [
        {
          id: 'a',
          label: 'Identical — both progress, so both are structurally perfect.',
          isCorrect: false,
          feedback:
            'Both progress, but the Triple Two’s structure is a curving, weaving path, not straight lines.',
        },
        {
          id: 'b',
          label: 'Couple A is stronger — the Triple Two travels on a curving, weaving path, and B’s straight-line marching is the wrong structure for the dance.',
          isCorrect: true,
          feedback:
            'Correct. Both travel, but A demonstrates the curved, weaving progression the Triple Two calls for.',
        },
        {
          id: 'c',
          label: 'Couple B is stronger — straight lines cover ground more efficiently.',
          isCorrect: false,
          feedback:
            'Efficiency is not the criterion; the Triple Two’s expected path is curved and weaving.',
        },
        {
          id: 'd',
          label: 'Neither — curve versus straight is a motion question, not structure.',
          isCorrect: false,
          feedback:
            'The path a couple travels across the floor is squarely spatial structure.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Both travel — what distinguishes the paths?' },
        { level: 2, title: 'Concept', content: 'The Triple Two travels on a curving, weaving path.' },
        { level: 3, title: 'Specific clue', content: 'Straight-line marching is the Waltz’s pattern, not this.' },
        { level: 4, title: 'Guided solution', content: 'Choose couple A for the curved progression.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Path judged' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Scoring the two as identical would ignore a real difference the panel will mark.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' },
        { topicId: 'dance.triple-two', label: 'Judging the Triple Two' },
      ],
      successFeedback: 'Both travel, but A owns the curve. That is the Triple Two structure.',
      failureFeedback: 'The Triple Two travels on a curving, weaving path; straight-line marching is the wrong structure.',
    },
  ],
  reflectionPrompt: 'Why do you think the Triple Two curves and weaves rather than cutting straight diagonals like the Waltz?',
  rewards: [{ type: 'xp', amount: 5, label: 'Triple Two structure trained' }],
};
