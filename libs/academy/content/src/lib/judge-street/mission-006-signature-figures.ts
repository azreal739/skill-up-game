import { MissionDefinition } from '@academy/content-model';

/** Street module mission 6 — signature figures: the vocabulary of each style. */
export const judgeStreet006SignatureFigures: MissionDefinition = {
  id: 'judge-street-006-signature-figures',
  campaignId: 'judge-street',
  title: 'Pops, Locks, Vogue',
  summary:
    'Each street style has its own named vocabulary — pops, locks, waacks, vogue elements, illusions — plus foundational foot positions. Learn to identify the style and judge its execution.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise the vocabulary of the main street styles',
    'Correctly label a style from its moves',
    'Judge whether a figure keeps its style’s defining quality',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Popping hits, locking points and freezes, waacking arms, vogue hands and catwalks, illusions — each has a name. Label the style correctly, then judge whether each figure keeps its quality.',
    },
  ],
  contextArtefacts: [
    {
      id: 'street-figures',
      type: 'message',
      title: 'Street vocabulary',
      content: 'Popping (contract-release hits) · Locking (points, freezes, twirls) · Waacking (whipping arms) · Voguing (hands, catwalk, duckwalk, spins, dips) · Illusions · Foot positions (1st, 2nd, 4th).',
    },
  ],
  challenges: [
    {
      id: 'jst-006-c1',
      type: 'multiple-choice',
      title: 'Name the Style',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'street', 'signature-figures'],
      storyContext:
        'A performer freezes into sharp points, twirls the wrists, and drops into crisp held poses with a bright, up-funk feel.',
      prompt: 'Which street style is this, by its vocabulary?',
      options: [
        {
          id: 'a',
          label: 'Locking — points, wrist twirls and crisp freezes are locking’s signature vocabulary.',
          isCorrect: true,
          feedback:
            'Correct. Points, twirls and freezes with a bright up-funk feel are locking.',
        },
        {
          id: 'b',
          label: 'Popping — any sharp street move is popping.',
          isCorrect: false,
          feedback:
            'Popping is the contract-release muscle hit; points, twirls and freezes are locking, a different style.',
        },
        {
          id: 'c',
          label: 'Voguing — any posing is voguing.',
          isCorrect: false,
          feedback:
            'Voguing is built on hands, catwalks, duckwalks and dips; points and freezes with an up-funk feel are locking.',
        },
        {
          id: 'd',
          label: 'Dancehall — any groovy street style is dancehall.',
          isCorrect: false,
          feedback:
            'Dancehall is a grounded Jamaican groove with named steps; this is locking’s points and freezes.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which style is built on points, twirls and freezes?' },
        { level: 2, title: 'Concept', content: 'Signature vocabulary identifies the style.' },
        { level: 3, title: 'Specific clue', content: 'Crisp freezes and wrist twirls, up-funk feel.' },
        { level: 4, title: 'Guided solution', content: 'Choose Locking.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Style named' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Mislabeling the style would apply the wrong expectations and vocabulary across the scorecard.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'Points, twirls, freezes — locking, named correctly.',
      failureFeedback: 'Points, wrist twirls and crisp freezes with an up-funk feel are locking, not popping or voguing.',
    },
    {
      id: 'jst-006-c2',
      type: 'multiple-choice',
      title: 'A Move Without Its Quality',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'street', 'signature-figures'],
      storyContext:
        'A performer executes a recognisable pop, but with no real contract-release — the muscle never truly snaps, so the "hit" is soft and mushy instead of sharp.',
      prompt: 'How does the signature figures lens read a correct-shaped figure that loses its defining quality?',
      options: [
        {
          id: 'a',
          label: 'Full marks — the pop was the right shape, and shape is all the lens checks.',
          isCorrect: false,
          feedback:
            'Shape is not enough; a pop is defined by its sharp contract-release, and a mushy hit has lost it.',
        },
        {
          id: 'b',
          label: 'Zero — a soft pop counts as no figure at all.',
          isCorrect: false,
          feedback:
            'Too blunt; the pop was recognisable. A lost snap reduces the score, not zeros it.',
        },
        {
          id: 'c',
          label: 'Marked down — the figure is present but flawed, because a pop is defined by its sharp contract-release, and a soft, mushy hit has lost that defining quality.',
          isCorrect: true,
          feedback:
            'Correct. Credited for presence, marked for losing the sharp hit that makes a pop a pop.',
        },
        {
          id: 'd',
          label: 'It moves to the rhythm lens — a soft hit is only a groove matter.',
          isCorrect: false,
          feedback:
            'Rhythm may be affected, but whether the specific figure kept its defining quality is the signature-figures lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Should a pop keep its sharp contract-release?' },
        { level: 2, title: 'Concept', content: 'Figures are judged on correct execution, including their defining quality.' },
        { level: 3, title: 'Specific clue', content: 'A soft, mushy hit is a flawed pop.' },
        { level: 4, title: 'Guided solution', content: 'Choose the mark-down for the soft pop.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Execution judged' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Full marks for a mushy pop would teach performers the sharp hit does not matter.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.signature-figures', label: 'Signature Figures' },
        { topicId: 'dance.street', label: 'Judging Street Styles' },
      ],
      successFeedback: 'Right shape, no snap — marked down. A pop needs its sharp hit.',
      failureFeedback: 'A pop is defined by its sharp contract-release; a soft, mushy hit is a flawed execution.',
    },
  ],
  reflectionPrompt: 'Where is the line between a figure that is the right shape and one that keeps its style’s genuine quality?',
  rewards: [{ type: 'xp', amount: 5, label: 'Street figures trained' }],
};
