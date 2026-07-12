import { MissionDefinition } from '@academy/content-model';

/** Cha Cha module mission 7 — spatial structure: controlled, largely non-progressive. */
export const judgeChaCha007SpatialStructure: MissionDefinition = {
  id: 'judge-cha-cha-007-spatial-structure',
  campaignId: 'judge-cha-cha',
  title: 'Controlled Space',
  summary:
    'The Cha Cha works a contained area with only limited travel. Learn to judge controlled use of space — and floorcraft — without demanding progression.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise the Cha Cha as largely non-progressive',
    'Allow limited, controlled travel',
    'Judge floorcraft alongside spatial structure',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The Cha Cha is largely non-progressive — a contained, controlled area, with only limited travel. Don’t demand it circle the floor, but do expect floorcraft.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jcc-007-c1',
      type: 'multiple-choice',
      title: 'Do Not Demand Travel',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'cha-cha', 'spatial-structure'],
      storyContext:
        'A Cha Cha couple works a tight, controlled area, breaking and turning on the spot, travelling only a little. A judge wants to fault them for "not using the floor".',
      prompt: 'Is "not travelling around the floor" a fault for a Cha Cha?',
      options: [
        {
          id: 'a',
          label: 'No — the Cha Cha is largely non-progressive; working a controlled area with limited travel is correct, not a fault.',
          isCorrect: true,
          feedback:
            'Correct. The Cha Cha is not a progressive dance; a contained, controlled area is exactly its structure.',
        },
        {
          id: 'b',
          label: 'Yes — every dance should cover as much floor as possible.',
          isCorrect: false,
          feedback:
            'Covering the floor is only good for progressive dances. Faulting a Cha Cha for staying contained applies the wrong expectation.',
        },
        {
          id: 'c',
          label: 'Yes — staying in place always looks timid to a panel.',
          isCorrect: false,
          feedback:
            'Controlled containment is not timidity; it is the correct structure for the Cha Cha.',
        },
        {
          id: 'd',
          label: 'Only if the music is fast — fast Cha Chas must travel.',
          isCorrect: false,
          feedback:
            'Tempo does not turn the Cha Cha into a progressive dance; it remains largely non-progressive.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the Cha Cha progressive?' },
        { level: 2, title: 'Concept', content: 'The Cha Cha is largely non-progressive — a controlled area.' },
        { level: 3, title: 'Specific clue', content: 'Limited travel is correct, not a fault.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — controlled area is correct."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Expectation set' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Demanding travel of a non-progressive dance would put your marks out of line with the panel.',
        },
      ],
      helpLinks: [{ topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' }],
      successFeedback: 'Contained and controlled is correct for a Cha Cha. You did not demand travel it does not owe.',
      failureFeedback: 'The Cha Cha is largely non-progressive; working a controlled area with limited travel is correct.',
    },
    {
      id: 'jcc-007-c2',
      type: 'multiple-choice',
      title: 'Floorcraft Still Counts',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'cha-cha', 'spatial-structure'],
      storyContext:
        'A Cha Cha couple stays contained, as expected — but repeatedly drifts into a neighbouring couple’s space, forcing others to dodge them.',
      prompt: 'How does the spatial structure lens read this, given the Cha Cha is non-progressive?',
      options: [
        {
          id: 'a',
          label: 'No issue — a non-progressive dance cannot have a spatial fault.',
          isCorrect: false,
          feedback:
            'Non-progressive does not mean floorcraft-free. Repeatedly invading others’ space is a real spatial-structure fault.',
        },
        {
          id: 'b',
          label: 'No issue — collisions are the other couples’ problem to avoid.',
          isCorrect: false,
          feedback:
            'Floorcraft is a shared responsibility judged on this couple too; forcing others to dodge is a fault.',
        },
        {
          id: 'c',
          label: 'A spatial-structure fault — poor floorcraft (invading neighbouring space, forcing others to dodge) is judged even in a non-progressive dance.',
          isCorrect: true,
          feedback:
            'Correct. Floorcraft is part of spatial structure; a couple that keeps intruding on others is marked down.',
        },
        {
          id: 'd',
          label: 'A character issue — it just looks a little rude.',
          isCorrect: false,
          feedback:
            'It may read as rude, but the concrete problem is floorcraft — a spatial-structure matter.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does non-progressive mean floorcraft does not matter?' },
        { level: 2, title: 'Concept', content: 'Floorcraft is judged as part of spatial structure.' },
        { level: 3, title: 'Specific clue', content: 'Forcing others to dodge is a floorcraft fault.' },
        { level: 4, title: 'Guided solution', content: 'Choose the spatial-structure fault for poor floorcraft.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Floorcraft judged' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Ignoring poor floorcraft would let a couple spoil the floor for everyone else unremarked.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' },
        { topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' },
      ],
      successFeedback: 'Non-progressive, but floorcraft still counts. You marked the intrusion.',
      failureFeedback: 'Floorcraft is part of spatial structure even in a non-progressive dance; invading others’ space is a fault.',
    },
  ],
  reflectionPrompt: 'How do you weigh a couple’s own dancing against their impact on the couples around them?',
  rewards: [{ type: 'xp', amount: 5, label: 'Cha Cha structure trained' }],
};
