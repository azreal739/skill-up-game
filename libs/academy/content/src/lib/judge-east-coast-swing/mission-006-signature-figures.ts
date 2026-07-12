import { MissionDefinition } from '@academy/content-model';

/** East Coast Swing module mission 6 — signature figures: passes, rotations, Lindy patterns. */
export const judgeEcs006SignatureFigures: MissionDefinition = {
  id: 'judge-ecs-006-signature-figures',
  campaignId: 'judge-east-coast-swing',
  title: 'Passes, Turns, Lindy',
  summary:
    'The East Coast Swing swings through passes, underarm rotations and Lindy-derived patterns. Learn to confirm its vocabulary keeps the bounce and the connection.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise core swing figures',
    'Judge whether figures keep the bounce and connection',
    'Rule out other dances’ vocabularies',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Passes, underarm turns, Lindy-derived patterns — the swing’s figures exchange places and rotate around the spot. Check they are present, and that they keep the bounce and the connection while they turn.',
    },
  ],
  contextArtefacts: [
    {
      id: 'ecs-figures',
      type: 'message',
      title: 'Core swing figures',
      content: 'Passes · Underarm rotations (turns) · Lindy-derived patterns — exchanging places and rotating around the shared spot.',
    },
  ],
  challenges: [
    {
      id: 'jec-006-c1',
      type: 'multiple-choice',
      title: 'Whose Figures?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'east-coast-swing', 'signature-figures'],
      storyContext: 'Four figure sets are proposed as "core East Coast Swing figures".',
      prompt: 'Which set is genuinely East Coast Swing vocabulary?',
      options: [
        {
          id: 'a',
          label: 'Box, twinkle, fallaway.',
          isCorrect: false,
          feedback:
            'Those are Waltz figures — a smooth travelling dance’s vocabulary, not the swing’s.',
        },
        {
          id: 'b',
          label: 'Skips, gallops, weaves.',
          isCorrect: false,
          feedback:
            'Those are Polka figures, built to drive down the floor — not the swing’s spot-based turns.',
        },
        {
          id: 'c',
          label: 'Passes, underarm rotations, Lindy-derived patterns.',
          isCorrect: true,
          feedback:
            'Correct — passes, underarm rotations and Lindy-derived patterns are the swing’s spot-based vocabulary.',
        },
        {
          id: 'd',
          label: 'Cuban breaks, New Yorkers, spot turns.',
          isCorrect: false,
          feedback:
            'That set belongs to the Cha Cha; the swing turns and passes on the bounce, without Cuban motion.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which names describe passes and turns around a spot?' },
        { level: 2, title: 'Concept', content: 'Signature figures identify the dance.' },
        { level: 3, title: 'Specific clue', content: 'Passes and underarm rotations exchange places on the spot.' },
        { level: 4, title: 'Guided solution', content: 'Choose passes, underarm rotations, Lindy-derived patterns.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Vocabulary known' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Not knowing the vocabulary would let another dance’s figures pass as an East Coast Swing.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'Passes, underarm rotations, Lindy patterns — the swing by its figures.',
      failureFeedback: 'Swing figures are passes, underarm rotations and Lindy-derived patterns; the others belong to other dances.',
    },
    {
      id: 'jec-006-c2',
      type: 'multiple-choice',
      title: 'A Turn That Drops the Bounce',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'east-coast-swing', 'signature-figures'],
      storyContext:
        'A couple performs a correct underarm rotation, but during it the bounce flattens out and the connection goes slack, so the turn walks around stiffly instead of swinging.',
      prompt: 'How does the signature figures lens read a correct figure that loses the bounce and connection?',
      options: [
        {
          id: 'a',
          label: 'Full marks — the rotation was correct, and correctness is all the lens checks.',
          isCorrect: false,
          feedback:
            'Presence is not enough; a swing figure should keep its bounce and connection, not walk around stiffly.',
        },
        {
          id: 'b',
          label: 'Zero — a stiff, slack rotation counts as no figure at all.',
          isCorrect: false,
          feedback:
            'Too blunt; the rotation was recognisable. A dropped bounce reduces the score, not zeros it.',
        },
        {
          id: 'c',
          label: 'It moves to the motion lens — a flat figure is only a motion matter.',
          isCorrect: false,
          feedback:
            'Motion is affected, but whether the specific figure was executed with its bounce and connection is the signature-figures lens.',
        },
        {
          id: 'd',
          label: 'Marked down — the figure is present but flawed, because a swing figure should keep its bounce and connection, not flatten and go slack.',
          isCorrect: true,
          feedback:
            'Correct. Credited for presence, marked for losing the bounce and connection the dance needs.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Should a swing figure keep its bounce and connection?' },
        { level: 2, title: 'Concept', content: 'Figures are judged on correct execution, including keeping the bounce.' },
        { level: 3, title: 'Specific clue', content: 'A rotation that flattens and goes slack is flawed.' },
        { level: 4, title: 'Guided solution', content: 'Choose the mark-down for the flattened figure.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Execution judged' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Full marks for a flattened figure would teach couples the bounce and connection do not matter in figures.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.signature-figures', label: 'Signature Figures' },
        { topicId: 'dance.east-coast-swing', label: 'Judging the East Coast Swing' },
      ],
      successFeedback: 'Correct but flattened — marked down. A swing figure keeps its bounce.',
      failureFeedback: 'A swing figure should keep its bounce and connection; one that flattens and goes slack is a flawed execution.',
    },
  ],
  reflectionPrompt: 'Where is the line between a turn that is merely correct and one that keeps the swing’s genuine bounce and connection?',
  rewards: [{ type: 'xp', amount: 5, label: 'Swing figures trained' }],
};
