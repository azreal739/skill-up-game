import { MissionDefinition } from '@academy/content-model';

/** Polka module mission 6 — signature figures: skips, gallops, rotating chasses, weaves. */
export const judgePolka006SignatureFigures: MissionDefinition = {
  id: 'judge-polka-006-signature-figures',
  campaignId: 'judge-polka',
  title: 'Skips, Gallops, Chasses',
  summary:
    'The Polka drives through skips, gallops, rotating chasses and weaves. Learn to confirm its vocabulary keeps the lilt and the travel.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise core Polka figures',
    'Judge whether figures keep the lilt and drive',
    'Rule out other dances’ vocabularies',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Skips, gallops, rotating chasses, weaves — the Polka’s figures travel and spin at pace. Check they are present, and that they keep the lilt while driving.',
    },
  ],
  contextArtefacts: [
    {
      id: 'polka-figures',
      type: 'message',
      title: 'Core Polka figures',
      content: 'Skips · Gallops · Rotating chasses · Weaves — travelling, spinning figures at pace.',
    },
  ],
  challenges: [
    {
      id: 'jpk-006-c1',
      type: 'multiple-choice',
      title: 'Whose Figures?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'polka', 'signature-figures'],
      storyContext: 'Four figure sets are proposed as "core Polka figures".',
      prompt: 'Which set is genuinely Polka vocabulary?',
      options: [
        {
          id: 'a',
          label: 'Skips, gallops, rotating chasses, weaves.',
          isCorrect: true,
          feedback:
            'Correct — skips, gallops, rotating chasses and weaves are the driving Polka vocabulary.',
        },
        {
          id: 'b',
          label: 'Push, pass, whip.',
          isCorrect: false,
          feedback:
            'Those are West Coast Swing (slot) figures, not the Polka.',
        },
        {
          id: 'c',
          label: 'Diamonds, passes, rotations.',
          isCorrect: false,
          feedback:
            'That set is closer to Nightclub, a contained dance — not the driving Polka.',
        },
        {
          id: 'd',
          label: 'Box, twinkle, fallaway.',
          isCorrect: false,
          feedback:
            'Those are Waltz figures — a smooth dance’s vocabulary, not the Polka’s.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which names describe fast, travelling, spinning figures?' },
        { level: 2, title: 'Concept', content: 'Signature figures identify the dance.' },
        { level: 3, title: 'Specific clue', content: 'Skips and gallops drive down the floor.' },
        { level: 4, title: 'Guided solution', content: 'Choose skips, gallops, rotating chasses, weaves.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Vocabulary known' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Not knowing the vocabulary would let another dance’s figures pass as a Polka.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'Skips, gallops, rotating chasses, weaves — the Polka by its figures.',
      failureFeedback: 'Polka figures are skips, gallops, rotating chasses and weaves; the others belong to other dances.',
    },
    {
      id: 'jpk-006-c2',
      type: 'multiple-choice',
      title: 'A Figure That Drops the Lilt',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'polka', 'signature-figures'],
      storyContext:
        'A couple performs a correct rotating chasse, but during it the lilt flattens out and the drive stalls, so the figure trudges instead of springs.',
      prompt: 'How does the signature figures lens read a correct figure that loses the lilt and drive?',
      options: [
        {
          id: 'a',
          label: 'Full marks — the chasse was correct, and correctness is all the lens checks.',
          isCorrect: false,
          feedback:
            'Presence is not enough; a Polka figure should keep its lilt and drive, not trudge.',
        },
        {
          id: 'b',
          label: 'Zero — a trudging chasse counts as no figure at all.',
          isCorrect: false,
          feedback:
            'Too blunt; the chasse was recognisable. A dropped lilt reduces the score, not zeros it.',
        },
        {
          id: 'c',
          label: 'Marked down — the figure is present but flawed, because a Polka figure should keep its springing lilt and forward drive, not flatten and stall.',
          isCorrect: true,
          feedback:
            'Correct. Credited for presence, marked for losing the lilt and drive the dance needs.',
        },
        {
          id: 'd',
          label: 'It moves to the rhythm lens — a flat figure is only a rhythm matter.',
          isCorrect: false,
          feedback:
            'Rhythm is affected, but whether the specific figure was executed with its lilt and drive is the signature-figures lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Should a Polka figure keep its lilt and drive?' },
        { level: 2, title: 'Concept', content: 'Figures are judged on correct execution, including keeping the lilt.' },
        { level: 3, title: 'Specific clue', content: 'A chasse that flattens and stalls is flawed.' },
        { level: 4, title: 'Guided solution', content: 'Choose the mark-down for the flattened figure.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Execution judged' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Full marks for a flattened figure would teach couples the lilt and drive do not matter in figures.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.signature-figures', label: 'Signature Figures' },
        { topicId: 'dance.polka', label: 'Judging the Polka' },
      ],
      successFeedback: 'Correct but flattened — marked down. A Polka figure keeps its spring.',
      failureFeedback: 'A Polka figure should keep its lilt and drive; one that flattens and stalls is a flawed execution.',
    },
  ],
  reflectionPrompt: 'Where is the line between a figure that is merely fast and one that keeps the Polka’s genuine lilt?',
  rewards: [{ type: 'xp', amount: 5, label: 'Polka figures trained' }],
};
