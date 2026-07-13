import { MissionDefinition } from '@academy/content-model';

/** Street module mission 7 — spatial structure: solo use of performance space. */
export const judgeStreet007SpatialStructure: MissionDefinition = {
  id: 'judge-street-007-spatial-structure',
  campaignId: 'judge-street',
  title: 'Own the Space',
  summary:
    'Street spatial structure is a soloist’s use of performance space — levels, directions and facing the audience — not travel around a line of dance. Learn to judge how a performer owns the space.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge solo use of levels and directions',
    'Recognise facing and projection to the audience',
    'Fault a performer stuck on one level or facing away',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'A soloist owns the space with levels — standing, mid, floor — with changes of facing and direction, and by projecting to the audience. Stuck on one spot facing one way is a spatial shortfall.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jst-007-c1',
      type: 'multiple-choice',
      title: 'Levels and Facings',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'street', 'spatial-structure'],
      storyContext:
        'A performer stays rooted on one spot at a single standing level, facing one direction the entire routine, never using floor work, levels or changes of facing.',
      prompt: 'How does the spatial structure lens read this?',
      options: [
        {
          id: 'a',
          label: 'Good — staying on one spot and level keeps it clean and focused.',
          isCorrect: false,
          feedback:
            'For a soloist, owning the space with levels and facings is part of the score; staying static is a shortfall, not focus.',
        },
        {
          id: 'b',
          label: 'Fine — a soloist has no spatial-structure lens to judge.',
          isCorrect: false,
          feedback:
            'A soloist very much has a spatial lens: use of levels, directions and facing the audience.',
        },
        {
          id: 'c',
          label: 'A character issue — standing still just looks a bit shy.',
          isCorrect: false,
          feedback:
            'It reads shy, but the concrete shortfall is spatial: no use of levels, directions or facing.',
        },
        {
          id: 'd',
          label: 'A spatial-structure shortfall — a soloist should own the space with levels, directions and changes of facing, and staying rooted on one spot and level is a failure to use the performance space.',
          isCorrect: true,
          feedback:
            'Correct. Failing to use levels, directions and facings is a real spatial-structure shortfall for a soloist.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the performer using the space, or stuck on one spot?' },
        { level: 2, title: 'Concept', content: 'A soloist owns the space with levels and facings.' },
        { level: 3, title: 'Specific clue', content: 'One spot, one level, one facing is a shortfall.' },
        { level: 4, title: 'Guided solution', content: 'Choose the spatial-structure shortfall.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Space use judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding a static soloist would drop the standard for using the performance space.',
        },
      ],
      helpLinks: [{ topicId: 'dance.street', label: 'Judging Street Styles' }],
      successFeedback: 'One spot, one level, one facing — a spatial shortfall, and you caught it.',
      failureFeedback: 'A soloist should own the space with levels, directions and facings; staying rooted on one spot and level is a spatial-structure shortfall.',
    },
    {
      id: 'jst-007-c2',
      type: 'multiple-choice',
      title: 'Facing the House',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'street', 'spatial-structure'],
      storyContext:
        'A performer uses rich levels and floor work, but spends long stretches with their back to the audience and key hits thrown while facing directly away from the house.',
      prompt: 'How does the spatial structure lens weigh rich space use undercut by facing away?',
      options: [
        {
          id: 'a',
          label: 'Top marks — rich levels and floor work are all that the spatial lens checks.',
          isCorrect: false,
          feedback:
            'Level variety is a credit, but projecting to the audience is part of the lens; throwing key hits away from the house is a fault.',
        },
        {
          id: 'b',
          label: 'Credit the rich use of levels and floor, but mark down the facing — a soloist should project key moments to the audience, and throwing hits with the back to the house undercuts the performance.',
          isCorrect: true,
          feedback:
            'Correct. The level variety is a credit; the poor facing and projection is a separate deduction on the same lens.',
        },
        {
          id: 'c',
          label: 'Zero — facing away ruins the whole routine.',
          isCorrect: false,
          feedback:
            'Too blunt; the rich space use has value. Credit it and mark the facing.',
        },
        {
          id: 'd',
          label: 'No issue — where a soloist faces is entirely their choice.',
          isCorrect: false,
          feedback:
            'Projecting to the audience is judged; throwing key hits away from the house is a real spatial fault.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does rich level use excuse facing away for key hits?' },
        { level: 2, title: 'Concept', content: 'Projection to the audience is part of the spatial lens.' },
        { level: 3, title: 'Specific clue', content: 'Credit the levels, mark the back-to-house hits.' },
        { level: 4, title: 'Guided solution', content: 'Choose crediting the level use while marking the facing.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Facing judged' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Ignoring facing away for key moments would misalign your marks from a panel that watches projection.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' },
        { topicId: 'dance.street', label: 'Judging Street Styles' },
      ],
      successFeedback: 'Levels credited, facing marked. Both live on the spatial-structure lens.',
      failureFeedback: 'Credit the rich use of levels and floor, but throwing key hits with the back to the house is a facing deduction too.',
    },
  ],
  reflectionPrompt: 'How do you balance rewarding rich, varied space use against a performer who forgets the audience?',
  rewards: [{ type: 'xp', amount: 5, label: 'Street structure trained' }],
};
