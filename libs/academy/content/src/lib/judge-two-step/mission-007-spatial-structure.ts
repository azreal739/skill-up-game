import { MissionDefinition } from '@academy/content-model';

/** Two Step module mission 7 — spatial structure: progressive travel + floorcraft. */
export const judgeTwoStep007SpatialStructure: MissionDefinition = {
  id: 'judge-two-step-007-spatial-structure',
  campaignId: 'judge-two-step',
  title: 'Drive the Line',
  summary:
    'The Two Step travels down the line of dance — which makes progression and floorcraft part of the score. Learn to judge both.',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm the Two Step as strongly progressive',
    'Fault a stalling Two Step that fails to travel',
    'Judge floorcraft under smooth, travelling drive',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'A Two Step should cover the floor down the line of dance — and as it travels, its floorcraft matters. Judge both the progression and how the couple shares the line with others.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jts-007-c1',
      type: 'multiple-choice',
      title: 'Travel, Not Stall',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'two-step', 'spatial-structure'],
      storyContext:
        'A Two Step couple keeps the timing and glide but barely moves down the floor, working their figures almost on the spot instead of progressing down the line of dance.',
      prompt: 'How does the spatial structure lens read this?',
      options: [
        {
          id: 'a',
          label: 'Good — staying compact is safer and more controlled.',
          isCorrect: false,
          feedback:
            'The Two Step is strongly progressive; a couple that fails to travel is a structural shortfall, not control.',
        },
        {
          id: 'b',
          label: 'A spatial-structure shortfall — the Two Step is strongly progressive and should drive down the line of dance, not stall almost on the spot.',
          isCorrect: true,
          feedback:
            'Correct. Failing to progress down the line is a real structural shortfall for a Two Step.',
        },
        {
          id: 'c',
          label: 'Fine — the Two Step is non-progressive, so staying put is correct.',
          isCorrect: false,
          feedback:
            'The Two Step is strongly progressive; it should travel down the line, not work a spot.',
        },
        {
          id: 'd',
          label: 'A character issue — it just looks a bit timid.',
          isCorrect: false,
          feedback:
            'It reads timid, but the concrete shortfall is structural: a Two Step that fails to travel down the line.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'How much should a Two Step travel?' },
        { level: 2, title: 'Concept', content: 'The Two Step is strongly progressive.' },
        { level: 3, title: 'Specific clue', content: 'Working on the spot is a failure to progress.' },
        { level: 4, title: 'Guided solution', content: 'Choose the spatial-structure shortfall.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Travel judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding a stalling Two Step would drop the standard for its defining travel.',
        },
      ],
      helpLinks: [{ topicId: 'dance.two-step', label: 'Judging the Two Step' }],
      successFeedback: 'A Two Step travels the line. Stalling on the spot is a structural shortfall, and you caught it.',
      failureFeedback: 'The Two Step is strongly progressive; stalling almost on the spot is a spatial-structure shortfall.',
    },
    {
      id: 'jts-007-c2',
      type: 'multiple-choice',
      title: 'Sharing the Line',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'two-step', 'spatial-structure'],
      storyContext:
        'A Two Step couple travels well down the line of dance, but repeatedly rides up on the slower couple ahead and darts around them into the inside lane, disrupting the flow.',
      prompt: 'How does the spatial structure lens weigh this strong but inconsiderate travel?',
      options: [
        {
          id: 'a',
          label: 'Top marks — strong travel is exactly what a Two Step wants.',
          isCorrect: false,
          feedback:
            'Travel is wanted, but floorcraft is part of spatial structure; riding up and darting around others is a real fault.',
        },
        {
          id: 'b',
          label: 'Zero — a Two Step that disrupts the flow should score nothing.',
          isCorrect: false,
          feedback:
            'Too blunt; the strong progression has value. Credit it and mark the floorcraft.',
        },
        {
          id: 'c',
          label: 'Credit the strong progression, but mark down the floorcraft — travelling well does not excuse riding up on slower couples and darting through the lanes.',
          isCorrect: true,
          feedback:
            'Correct. The progression is a credit; the poor lane discipline is a separate deduction on the same lens.',
        },
        {
          id: 'd',
          label: 'No issue — slower couples should keep to the inside.',
          isCorrect: false,
          feedback:
            'Floorcraft and lane discipline are judged on the faster couple too; darting around others is a fault.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does strong travel excuse poor lane discipline?' },
        { level: 2, title: 'Concept', content: 'Floorcraft is part of spatial structure, especially when travelling.' },
        { level: 3, title: 'Specific clue', content: 'Credit the drive, mark the riding-up and darting.' },
        { level: 4, title: 'Guided solution', content: 'Choose crediting the progression while marking the floorcraft.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Floorcraft judged' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Ignoring poor lane discipline would let one couple disrupt the line for everyone else.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' },
        { topicId: 'dance.two-step', label: 'Judging the Two Step' },
      ],
      successFeedback: 'Drive credited, floorcraft marked. Both live on the spatial-structure lens.',
      failureFeedback: 'Credit the strong progression, but poor floorcraft — riding up and darting through lanes — is a deduction too.',
    },
  ],
  reflectionPrompt: 'How do you balance rewarding a Two Step’s travel against the floorcraft that travelling the line demands?',
  rewards: [{ type: 'xp', amount: 5, label: 'Two Step structure trained' }],
};
