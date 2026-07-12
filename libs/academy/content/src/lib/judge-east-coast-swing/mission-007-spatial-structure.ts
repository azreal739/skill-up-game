import { MissionDefinition } from '@academy/content-model';

/** East Coast Swing module mission 7 — spatial structure: circular, non-progressive spot + floorcraft. */
export const judgeEcs007SpatialStructure: MissionDefinition = {
  id: 'judge-ecs-007-spatial-structure',
  campaignId: 'judge-east-coast-swing',
  title: 'Hold the Circle',
  summary:
    'The East Coast Swing works a circular spot — it does not travel the line of dance. Learn to judge that structure, and the floorcraft of sharing a crowded floor without drifting.',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm the swing as circular and non-progressive',
    'Fault a swing that travels like a progressive dance',
    'Judge floorcraft while holding a shared spot',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'A swing should hold its circular spot — rotating and exchanging places around a shared centre. Drifting off down the line of dance is a structural fault, and on a crowded floor, holding your spot is also good floorcraft.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jec-007-c1',
      type: 'multiple-choice',
      title: 'Circle, Not Line',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'east-coast-swing', 'spatial-structure'],
      storyContext:
        'An East Coast Swing couple gradually travels off down the line of dance, drifting across the floor like a progressive dance instead of holding their circular spot.',
      prompt: 'How does the spatial structure lens read this?',
      options: [
        {
          id: 'a',
          label: 'Good — travelling shows the swing is covering ground.',
          isCorrect: false,
          feedback:
            'The East Coast Swing is non-progressive; drifting down the line is a structural fault, not coverage to reward.',
        },
        {
          id: 'b',
          label: 'Fine — the swing is progressive, so travelling down the line is correct.',
          isCorrect: false,
          feedback:
            'The swing is circular and non-progressive; it should hold its spot, not travel the line of dance.',
        },
        {
          id: 'c',
          label: 'A character issue — it just looks a bit restless.',
          isCorrect: false,
          feedback:
            'It reads restless, but the concrete shortfall is structural: a non-progressive dance that has drifted off its spot.',
        },
        {
          id: 'd',
          label: 'A spatial-structure fault — the East Coast Swing is circular and non-progressive, and drifting off down the line of dance abandons its shared spot.',
          isCorrect: true,
          feedback:
            'Correct. A swing that travels like a progressive dance has lost its circular structure — a real fault.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Should a swing hold a spot or travel a line?' },
        { level: 2, title: 'Concept', content: 'The East Coast Swing is circular and non-progressive.' },
        { level: 3, title: 'Specific clue', content: 'Drifting down the line abandons the shared spot.' },
        { level: 4, title: 'Guided solution', content: 'Choose the spatial-structure fault for drifting off the spot.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Structure judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding a drifting swing would erase the standard for its circular, non-progressive structure.',
        },
      ],
      helpLinks: [{ topicId: 'dance.east-coast-swing', label: 'Judging the East Coast Swing' }],
      successFeedback: 'A swing holds its circle. Drifting down the line is a structural fault, and you caught it.',
      failureFeedback: 'The East Coast Swing is circular and non-progressive; drifting off down the line of dance is a spatial-structure fault.',
    },
    {
      id: 'jec-007-c2',
      type: 'multiple-choice',
      title: 'Floorcraft on a Crowded Spot',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'east-coast-swing', 'spatial-structure'],
      storyContext:
        'On a crowded social floor, one swing couple keeps their pattern compact and holds their spot cleanly beside their neighbours; another spreads their turns wide and repeatedly bumps the couples around them.',
      prompt: 'How does the spatial structure lens weigh the two?',
      options: [
        {
          id: 'a',
          label: 'The wide couple scores higher — bigger figures always look more impressive.',
          isCorrect: false,
          feedback:
            'Size is not the criterion; spreading wide and bumping neighbours is a floorcraft fault, not a credit.',
        },
        {
          id: 'b',
          label: 'The compact couple is stronger on structure — holding a clean, contained spot beside their neighbours is good floorcraft, while spreading wide and bumping others is a fault on this lens.',
          isCorrect: true,
          feedback:
            'Correct. Containing the circular pattern and sharing the floor cleanly is exactly the swing’s spatial-structure strength.',
        },
        {
          id: 'c',
          label: 'They are equal — floorcraft is not part of the spatial-structure lens.',
          isCorrect: false,
          feedback:
            'Floorcraft — sharing the floor without fouling neighbours — is part of spatial structure.',
        },
        {
          id: 'd',
          label: 'Neither matters — on a crowded floor collisions are unavoidable.',
          isCorrect: false,
          feedback:
            'A skilled couple contains their pattern precisely to avoid collisions; that judgement is exactly what the lens rewards.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is spreading wide and bumping neighbours a credit or a fault?' },
        { level: 2, title: 'Concept', content: 'Floorcraft — sharing the floor cleanly — is part of spatial structure.' },
        { level: 3, title: 'Specific clue', content: 'A contained, spot-holding pattern beats a wide, bumping one.' },
        { level: 4, title: 'Guided solution', content: 'Choose the compact, contained couple as stronger.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Floorcraft judged' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Rewarding a wide, bumping swing over a contained one would push your marks away from the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' },
        { topicId: 'dance.east-coast-swing', label: 'Judging the East Coast Swing' },
      ],
      successFeedback: 'Compact and contained beats wide and bumping. Floorcraft on the spot, judged.',
      failureFeedback: 'Holding a clean, contained circular spot is good floorcraft; spreading wide and bumping neighbours is a spatial-structure fault.',
    },
  ],
  reflectionPrompt: 'How do you distinguish a swing that is genuinely containing its spot from one that just happens to have room?',
  rewards: [{ type: 'xp', amount: 5, label: 'Swing structure trained' }],
};
