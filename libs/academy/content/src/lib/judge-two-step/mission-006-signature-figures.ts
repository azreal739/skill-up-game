import { MissionDefinition } from '@academy/content-model';

/** Two Step module mission 6 — signature figures: promenades, turns, sweethearts, wraps. */
export const judgeTwoStep006SignatureFigures: MissionDefinition = {
  id: 'judge-two-step-006-signature-figures',
  campaignId: 'judge-two-step',
  title: 'Promenades, Turns, Wraps',
  summary:
    'The Two Step travels through promenades, underarm turns, sweethearts and wraps. Learn to confirm its vocabulary keeps the smooth glide and the progression.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise core Two Step figures',
    'Judge whether figures keep the glide and travel',
    'Rule out other dances’ vocabularies',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Promenades, underarm turns, sweethearts, wraps, travelling turns — the Two Step’s figures keep moving down the line. Check they are present, and that they keep the smooth glide while they travel.',
    },
  ],
  contextArtefacts: [
    {
      id: 'two-step-figures',
      type: 'message',
      title: 'Core Two Step figures',
      content: 'Promenades · Underarm turns · Sweethearts · Wraps · Travelling turns — figures that keep gliding down the line of dance.',
    },
  ],
  challenges: [
    {
      id: 'jts-006-c1',
      type: 'multiple-choice',
      title: 'Whose Figures?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'two-step', 'signature-figures'],
      storyContext: 'Four figure sets are proposed as "core Two Step figures".',
      prompt: 'Which set is genuinely Two Step vocabulary?',
      options: [
        {
          id: 'a',
          label: 'Promenades, underarm turns, sweethearts, wraps.',
          isCorrect: true,
          feedback:
            'Correct — promenades, underarm turns, sweethearts and wraps are the travelling Two Step vocabulary.',
        },
        {
          id: 'b',
          label: 'Push, pass, whip.',
          isCorrect: false,
          feedback:
            'Those are West Coast Swing (slot) figures, not the Two Step.',
        },
        {
          id: 'c',
          label: 'Diamonds, passes, rotations.',
          isCorrect: false,
          feedback:
            'That set is closer to Nightclub, a contained dance — not the travelling Two Step.',
        },
        {
          id: 'd',
          label: 'Cuban breaks, New Yorkers, spot turns.',
          isCorrect: false,
          feedback:
            'That set belongs to the Cha Cha; the Two Step glides and travels rather than working Cuban motion on a spot.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which names describe smooth, travelling figures?' },
        { level: 2, title: 'Concept', content: 'Signature figures identify the dance.' },
        { level: 3, title: 'Specific clue', content: 'Promenades and wraps keep gliding down the line.' },
        { level: 4, title: 'Guided solution', content: 'Choose promenades, underarm turns, sweethearts, wraps.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Vocabulary known' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Not knowing the vocabulary would let another dance’s figures pass as a Two Step.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'Promenades, turns, sweethearts, wraps — the Two Step by its figures.',
      failureFeedback: 'Two Step figures are promenades, underarm turns, sweethearts and wraps; the others belong to other dances.',
    },
    {
      id: 'jts-006-c2',
      type: 'multiple-choice',
      title: 'A Figure That Stalls the Travel',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'two-step', 'signature-figures'],
      storyContext:
        'A couple performs a correct underarm turn, but during it the smooth glide breaks and the travel stalls, so the figure is worked on the spot instead of gliding down the line.',
      prompt: 'How does the signature figures lens read a correct figure that loses the glide and travel?',
      options: [
        {
          id: 'a',
          label: 'Full marks — the turn was correct, and correctness is all the lens checks.',
          isCorrect: false,
          feedback:
            'Presence is not enough; a Two Step figure should keep its glide and travel, not stall on the spot.',
        },
        {
          id: 'b',
          label: 'Zero — a stalled turn counts as no figure at all.',
          isCorrect: false,
          feedback:
            'Too blunt; the turn was recognisable. A stalled glide reduces the score, not zeros it.',
        },
        {
          id: 'c',
          label: 'Marked down — the figure is present but flawed, because a Two Step figure should keep its smooth glide and progression, not break the flow and stall on the spot.',
          isCorrect: true,
          feedback:
            'Correct. Credited for presence, marked for losing the glide and travel the dance needs.',
        },
        {
          id: 'd',
          label: 'It moves to the spatial-structure lens — a stalled figure is only a travel matter.',
          isCorrect: false,
          feedback:
            'Travel is affected, but whether the specific figure was executed with its glide is the signature-figures lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Should a Two Step figure keep its glide and travel?' },
        { level: 2, title: 'Concept', content: 'Figures are judged on correct execution, including keeping the glide.' },
        { level: 3, title: 'Specific clue', content: 'A turn that breaks the flow and stalls is flawed.' },
        { level: 4, title: 'Guided solution', content: 'Choose the mark-down for the stalled figure.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Execution judged' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Full marks for a stalled figure would teach couples the glide and travel do not matter in figures.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.signature-figures', label: 'Signature Figures' },
        { topicId: 'dance.two-step', label: 'Judging the Two Step' },
      ],
      successFeedback: 'Correct but stalled — marked down. A Two Step figure keeps its glide.',
      failureFeedback: 'A Two Step figure should keep its smooth glide and progression; one that stalls on the spot is a flawed execution.',
    },
  ],
  reflectionPrompt: 'Where is the line between a figure that is merely correct and one that keeps the Two Step’s genuine gliding travel?',
  rewards: [{ type: 'xp', amount: 5, label: 'Two Step figures trained' }],
};
