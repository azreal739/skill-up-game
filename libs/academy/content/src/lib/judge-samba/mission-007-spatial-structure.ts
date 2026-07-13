import { MissionDefinition } from '@academy/content-model';

/** Samba module mission 7 — spatial structure: progressive travel + floorcraft. */
export const judgeSamba007SpatialStructure: MissionDefinition = {
  id: 'judge-samba-007-spatial-structure',
  campaignId: 'judge-samba',
  title: 'Travel the Carnival',
  summary:
    'The Samba’s travelling figures progress around the floor — which makes progression and floorcraft part of the score. Learn to judge both.',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm the Samba’s travelling figures as progressive',
    'Fault travelling figures that fail to progress',
    'Judge floorcraft under bouncing, travelling movement',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The Samba’s travelling figures should move around the floor along the line of dance — and as they travel, floorcraft matters. Judge both the progression and how the couple shares the floor.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jsm-007-c1',
      type: 'multiple-choice',
      title: 'Travel, Not Stall',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'samba', 'spatial-structure'],
      storyContext:
        'During its travelling figures — samba walks meant to progress down the floor — a couple keeps bouncing on the spot and barely moves along the line of dance.',
      prompt: 'How does the spatial structure lens read this?',
      options: [
        {
          id: 'a',
          label: 'A spatial-structure shortfall — the Samba’s travelling figures should progress along the line of dance, and bouncing on the spot when they should travel is a failure to progress.',
          isCorrect: true,
          feedback:
            'Correct. Travelling figures that fail to travel are a real structural shortfall for a Samba.',
        },
        {
          id: 'b',
          label: 'Good — staying on the spot is safer and more controlled.',
          isCorrect: false,
          feedback:
            'The travelling figures are meant to progress; staying on the spot is a structural shortfall, not control.',
        },
        {
          id: 'c',
          label: 'Fine — the Samba is entirely non-progressive, so staying put is always correct.',
          isCorrect: false,
          feedback:
            'The Samba’s travelling figures are progressive; failing to travel on them is a fault, even though it has some spot figures too.',
        },
        {
          id: 'd',
          label: 'A character issue — it just looks a bit timid.',
          isCorrect: false,
          feedback:
            'It reads timid, but the concrete shortfall is structural: travelling figures that fail to progress.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Should the travelling figures progress or stay put?' },
        { level: 2, title: 'Concept', content: 'The Samba’s travelling figures are progressive.' },
        { level: 3, title: 'Specific clue', content: 'Bouncing on the spot when they should travel is a shortfall.' },
        { level: 4, title: 'Guided solution', content: 'Choose the spatial-structure shortfall.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Travel judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding stalled travelling figures would drop the standard for the Samba’s progression.',
        },
      ],
      helpLinks: [{ topicId: 'dance.samba', label: 'Judging the Samba' }],
      successFeedback: 'Travelling figures should travel. Bouncing on the spot is a structural shortfall, and you caught it.',
      failureFeedback: 'The Samba’s travelling figures should progress along the line of dance; bouncing on the spot when they should travel is a spatial-structure shortfall.',
    },
    {
      id: 'jsm-007-c2',
      type: 'multiple-choice',
      title: 'Floorcraft in the Carnival',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'samba', 'spatial-structure'],
      storyContext:
        'A Samba couple progresses powerfully through their samba walks, but their big travelling bounce repeatedly swings them into the couples around them, forcing others to break stride.',
      prompt: 'How does the spatial structure lens weigh this strong but inconsiderate travel?',
      options: [
        {
          id: 'a',
          label: 'Top marks — strong travel is exactly what the Samba wants.',
          isCorrect: false,
          feedback:
            'Travel is wanted, but floorcraft is part of spatial structure; swinging into others is a real fault.',
        },
        {
          id: 'b',
          label: 'Zero — a Samba that causes disruption should score nothing.',
          isCorrect: false,
          feedback:
            'Too blunt; the strong progression has value. Credit it and mark the floorcraft.',
        },
        {
          id: 'c',
          label: 'No issue — other couples should just make room.',
          isCorrect: false,
          feedback:
            'Floorcraft is a shared responsibility judged on the travelling couple too; forcing others to break stride is a fault.',
        },
        {
          id: 'd',
          label: 'Credit the strong progression, but mark down the floorcraft — travelling well does not excuse swinging into the couples around them.',
          isCorrect: true,
          feedback:
            'Correct. The progression is a credit; the poor floorcraft under that travel is a separate deduction on the same lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does strong travel excuse poor floorcraft?' },
        { level: 2, title: 'Concept', content: 'Floorcraft is part of spatial structure, especially when travelling.' },
        { level: 3, title: 'Specific clue', content: 'Credit the drive, mark the swinging-into-others.' },
        { level: 4, title: 'Guided solution', content: 'Choose crediting the progression while marking the floorcraft.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Floorcraft judged' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Ignoring poor floorcraft would let one couple disrupt the floor for everyone else.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' },
        { topicId: 'dance.samba', label: 'Judging the Samba' },
      ],
      successFeedback: 'Drive credited, floorcraft marked. Both live on the spatial-structure lens.',
      failureFeedback: 'Credit the strong progression, but poor floorcraft — swinging into others — is a deduction too.',
    },
  ],
  reflectionPrompt: 'How do you balance rewarding a Samba’s travel against the floorcraft that a big travelling bounce demands?',
  rewards: [{ type: 'xp', amount: 5, label: 'Samba structure trained' }],
};
