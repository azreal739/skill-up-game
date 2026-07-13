import { MissionDefinition } from '@academy/content-model';

/** Stage module mission 6 — signature figures: each era's named vocabulary. */
export const judgeStage006SignatureFigures: MissionDefinition = {
  id: 'judge-stage-006-signature-figures',
  campaignId: 'judge-stage',
  title: 'Swivels, Swing-Outs, Hustle',
  summary:
    'Each era has its own named vocabulary — Charleston swivels, Lindy swing-outs, Disco hustle — plus the shared jumps, turns and kicks. Learn to identify the era and judge its execution.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise the vocabulary of the main era styles',
    'Correctly label an era from its figures',
    'Judge whether a figure keeps its era’s defining quality',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Charleston swivels and steps, Lindy swing-outs, Disco hustle and points, Bollywood gestures — each era has named figures. Label the era correctly, then judge whether each figure keeps its quality.',
    },
  ],
  contextArtefacts: [
    {
      id: 'stage-figures',
      type: 'message',
      title: 'Era vocabulary',
      content: 'Charleston (swivels, steps, kicks) · Lindy (swing-outs, aerials) · Disco (hustle, points, spins) · Bollywood (gestures, expressions) · Broadway (staging) · Shared: jumps, turns, kicks.',
    },
  ],
  challenges: [
    {
      id: 'jsg-006-c1',
      type: 'multiple-choice',
      title: 'Name the Era',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'stage', 'signature-figures'],
      storyContext:
        'A performer bounces through toe-in/toe-out swivels, flapping low kicks and hands-crossing-knees gags to bright, swung 1920s music.',
      prompt: 'Which era style is this, by its vocabulary?',
      options: [
        {
          id: 'a',
          label: 'Disco — any energetic era style is Disco.',
          isCorrect: false,
          feedback:
            'Disco is 1970s hustle, points and spins to four-on-the-floor; swivels and crossing-knees gags to swung 1920s music are Charleston.',
        },
        {
          id: 'b',
          label: 'Bollywood — any expressive style is Bollywood.',
          isCorrect: false,
          feedback:
            'Bollywood has its own gestures and music; toe-swivels and knee-crossing gags to 1920s swing are Charleston.',
        },
        {
          id: 'c',
          label: 'Lindy — any swung style is Lindy.',
          isCorrect: false,
          feedback:
            'Lindy is built on partnered swing-outs and aerials; solo swivels and knee gags to 1920s music are Charleston.',
        },
        {
          id: 'd',
          label: 'Charleston — toe-in/toe-out swivels, flapping kicks and crossing-knees gags to swung 1920s music are the Charleston’s signature vocabulary.',
          isCorrect: true,
          feedback:
            'Correct. Swivels, flapping kicks and knee-crossing gags to bright 1920s swing are the Charleston.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which era owns toe-swivels and knee-crossing gags?' },
        { level: 2, title: 'Concept', content: 'Signature vocabulary identifies the era.' },
        { level: 3, title: 'Specific clue', content: 'Swivels and gags to swung 1920s music.' },
        { level: 4, title: 'Guided solution', content: 'Choose Charleston.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Era named' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Mislabeling the era would apply the wrong expectations and vocabulary across the scorecard.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'Swivels, flapping kicks, knee gags — Charleston, named correctly.',
      failureFeedback: 'Toe-in/toe-out swivels and knee-crossing gags to swung 1920s music are the Charleston, not Disco or Lindy.',
    },
    {
      id: 'jsg-006-c2',
      type: 'multiple-choice',
      title: 'A Figure Without Its Quality',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'stage', 'signature-figures'],
      storyContext:
        'A performer executes a recognisable Lindy swing-out, but with no swing, stretch or connection — the shape is traced through mechanically, with none of the figure’s momentum.',
      prompt: 'How does the signature figures lens read a correct-shaped figure that loses its defining quality?',
      options: [
        {
          id: 'a',
          label: 'Full marks — the swing-out was the right shape, and shape is all the lens checks.',
          isCorrect: false,
          feedback:
            'Shape is not enough; a swing-out is defined by its swing, stretch and momentum, and a mechanical trace has lost them.',
        },
        {
          id: 'b',
          label: 'Marked down — the figure is present but flawed, because a swing-out is defined by its swing, stretch and momentum, and a mechanical trace has lost that defining quality.',
          isCorrect: true,
          feedback:
            'Correct. Credited for presence, marked for losing the swing and momentum that make a swing-out what it is.',
        },
        {
          id: 'c',
          label: 'Zero — a mechanical swing-out counts as no figure at all.',
          isCorrect: false,
          feedback:
            'Too blunt; the swing-out was recognisable. A lost quality reduces the score, not zeros it.',
        },
        {
          id: 'd',
          label: 'It moves to the rhythm lens — a mechanical figure is only a groove matter.',
          isCorrect: false,
          feedback:
            'Rhythm may be affected, but whether the specific figure kept its defining quality is the signature-figures lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Should a swing-out keep its swing and momentum?' },
        { level: 2, title: 'Concept', content: 'Figures are judged on correct execution, including their defining quality.' },
        { level: 3, title: 'Specific clue', content: 'A mechanically traced swing-out is flawed.' },
        { level: 4, title: 'Guided solution', content: 'Choose the mark-down for the mechanical swing-out.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Execution judged' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Full marks for a mechanical figure would teach performers the swing and momentum do not matter.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.signature-figures', label: 'Signature Figures' },
        { topicId: 'dance.stage', label: 'Judging Stage and Era Styles' },
      ],
      successFeedback: 'Right shape, no swing — marked down. A swing-out needs its momentum.',
      failureFeedback: 'A swing-out is defined by its swing, stretch and momentum; a mechanical trace of the shape is a flawed execution.',
    },
  ],
  reflectionPrompt: 'Where is the line between a figure that is the right shape and one that keeps its era’s genuine quality?',
  rewards: [{ type: 'xp', amount: 5, label: 'Stage figures trained' }],
};
