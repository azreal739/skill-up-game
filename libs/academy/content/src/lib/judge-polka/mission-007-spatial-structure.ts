import { MissionDefinition } from '@academy/content-model';

/** Polka module mission 7 — spatial structure: aggressive progression + floorcraft at speed. */
export const judgePolka007SpatialStructure: MissionDefinition = {
  id: 'judge-polka-007-spatial-structure',
  campaignId: 'judge-polka',
  title: 'Drive and Share',
  summary:
    'The Polka drives aggressively down the floor — which makes floorcraft at speed part of the score. Learn to judge both.',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm the Polka as aggressively progressive',
    'Fault an under-powered, stalling Polka',
    'Judge floorcraft under fast, driving travel',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'A Polka should cover the floor with drive — but the faster it travels, the more its floorcraft matters. Judge both the progression and the sharing of space.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jpk-007-c1',
      type: 'multiple-choice',
      title: 'Drive, Not Amble',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'polka', 'spatial-structure'],
      storyContext:
        'A Polka couple travels, but slowly and tentatively, barely covering ground and never really driving down the floor.',
      prompt: 'How does the spatial structure lens read this?',
      options: [
        {
          id: 'a',
          label: 'Good — a gentle Polka is safer and more controlled.',
          isCorrect: false,
          feedback:
            'The Polka is aggressively progressive; an under-powered amble is a structural shortfall, not control.',
        },
        {
          id: 'b',
          label: 'Fine — the Polka is non-progressive, so slow travel is correct.',
          isCorrect: false,
          feedback:
            'The Polka is very progressive; it should drive down the floor, not amble.',
        },
        {
          id: 'c',
          label: 'A character issue — it just looks a bit timid.',
          isCorrect: false,
          feedback:
            'It reads timid, but the concrete shortfall is structural: a Polka that fails to drive down the floor.',
        },
        {
          id: 'd',
          label: 'A spatial-structure shortfall — the Polka is aggressively progressive and should drive down the floor, not amble tentatively.',
          isCorrect: true,
          feedback:
            'Correct. Under-powered travel is a real structural shortfall for a Polka.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'How hard should a Polka travel?' },
        { level: 2, title: 'Concept', content: 'The Polka is aggressively progressive.' },
        { level: 3, title: 'Specific clue', content: 'A tentative amble is under-powered.' },
        { level: 4, title: 'Guided solution', content: 'Choose the spatial-structure shortfall.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Drive judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding an under-powered Polka would drop the standard for its defining drive.',
        },
      ],
      helpLinks: [{ topicId: 'dance.polka', label: 'Judging the Polka' }],
      successFeedback: 'A Polka drives. A tentative amble is a structural shortfall, and you caught it.',
      failureFeedback: 'The Polka is aggressively progressive; an under-powered amble is a spatial-structure shortfall.',
    },
    {
      id: 'jpk-007-c2',
      type: 'multiple-choice',
      title: 'Floorcraft at Speed',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'polka', 'spatial-structure'],
      storyContext:
        'A Polka couple drives powerfully down the floor — but repeatedly bears down on slower couples ahead, forcing them to scatter out of the way.',
      prompt: 'How does the spatial structure lens weigh this powerful but inconsiderate travel?',
      options: [
        {
          id: 'a',
          label: 'Top marks — strong drive is exactly what a Polka wants.',
          isCorrect: false,
          feedback:
            'Drive is wanted, but floorcraft is part of spatial structure; forcing others to scatter is a real fault.',
        },
        {
          id: 'b',
          label: 'Credit the strong progression, but mark down the floorcraft — driving hard does not excuse bearing down on slower couples.',
          isCorrect: true,
          feedback:
            'Correct. The progression is a credit; the poor floorcraft under that speed is a separate deduction on the same lens.',
        },
        {
          id: 'c',
          label: 'Zero — a Polka that causes chaos should score nothing.',
          isCorrect: false,
          feedback:
            'Too blunt; the strong progression has value. Credit it and mark the floorcraft.',
        },
        {
          id: 'd',
          label: 'No issue — slower couples should just get out of the way.',
          isCorrect: false,
          feedback:
            'Floorcraft is a shared responsibility judged on the driving couple too; forcing others to scatter is a fault.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does strong drive excuse poor floorcraft?' },
        { level: 2, title: 'Concept', content: 'Floorcraft is part of spatial structure, especially at speed.' },
        { level: 3, title: 'Specific clue', content: 'Credit the drive, mark the bearing-down.' },
        { level: 4, title: 'Guided solution', content: 'Choose crediting the progression while marking the floorcraft.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Floorcraft judged' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Ignoring poor floorcraft at speed would let one couple spoil the floor for everyone else.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' },
        { topicId: 'dance.polka', label: 'Judging the Polka' },
      ],
      successFeedback: 'Drive credited, floorcraft marked. Both live on the spatial-structure lens.',
      failureFeedback: 'Credit the strong progression, but poor floorcraft — bearing down on slower couples — is a deduction too.',
    },
  ],
  reflectionPrompt: 'How do you balance rewarding a Polka’s drive against the floorcraft that drive demands?',
  rewards: [{ type: 'xp', amount: 5, label: 'Polka structure trained' }],
};
