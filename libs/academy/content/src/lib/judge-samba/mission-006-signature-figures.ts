import { MissionDefinition } from '@academy/content-model';

/** Samba module mission 6 — signature figures: whisks, samba walks, botafogos, voltas. */
export const judgeSamba006SignatureFigures: MissionDefinition = {
  id: 'judge-samba-006-signature-figures',
  campaignId: 'judge-samba',
  title: 'Whisks, Walks, Botafogos',
  summary:
    'The Samba moves through whisks, samba walks, botafogos and voltas. Learn to confirm its vocabulary keeps the bounce and the syncopation.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise core Samba figures',
    'Judge whether figures keep the bounce and syncopation',
    'Rule out other dances’ vocabularies',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Whisks, samba walks, botafogos, voltas — the Samba’s figures carry the bounce and the 1-a-2. Check they are present, and that they keep the bounce action while they move.',
    },
  ],
  contextArtefacts: [
    {
      id: 'samba-figures',
      type: 'message',
      title: 'Core Samba figures',
      content: 'Whisks · Samba walks · Botafogos · Voltas — figures carrying the bounce action and the syncopated 1-a-2.',
    },
  ],
  challenges: [
    {
      id: 'jsm-006-c1',
      type: 'multiple-choice',
      title: 'Whose Figures?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'samba', 'signature-figures'],
      storyContext: 'Four figure sets are proposed as "core Samba figures".',
      prompt: 'Which set is genuinely Samba vocabulary?',
      options: [
        {
          id: 'a',
          label: 'Cuban breaks, New Yorkers, spot turns.',
          isCorrect: false,
          feedback:
            'That set belongs to the Cha Cha; the Samba carries its bounce through whisks and botafogos.',
        },
        {
          id: 'b',
          label: 'Whisks, samba walks, botafogos, voltas.',
          isCorrect: true,
          feedback:
            'Correct — whisks, samba walks, botafogos and voltas are the bounce-carrying Samba vocabulary.',
        },
        {
          id: 'c',
          label: 'Promenades, sweethearts, wraps.',
          isCorrect: false,
          feedback:
            'Those are Two Step figures — a smooth country traveller’s vocabulary, not the Samba’s.',
        },
        {
          id: 'd',
          label: 'Push, pass, whip.',
          isCorrect: false,
          feedback:
            'Those are West Coast Swing (slot) figures, not the Samba.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which names describe bounce-carrying Latin figures?' },
        { level: 2, title: 'Concept', content: 'Signature figures identify the dance.' },
        { level: 3, title: 'Specific clue', content: 'Botafogos and voltas carry the Samba bounce.' },
        { level: 4, title: 'Guided solution', content: 'Choose whisks, samba walks, botafogos, voltas.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Vocabulary known' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Not knowing the vocabulary would let another dance’s figures pass as a Samba.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'Whisks, samba walks, botafogos, voltas — the Samba by its figures.',
      failureFeedback: 'Samba figures are whisks, samba walks, botafogos and voltas; the others belong to other dances.',
    },
    {
      id: 'jsm-006-c2',
      type: 'multiple-choice',
      title: 'A Figure That Drops the Bounce',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'samba', 'signature-figures'],
      storyContext:
        'A couple performs a correct botafogo, but during it the bounce action flattens out and the syncopation goes even, so the figure walks through flatly instead of bouncing.',
      prompt: 'How does the signature figures lens read a correct figure that loses the bounce and syncopation?',
      options: [
        {
          id: 'a',
          label: 'Full marks — the botafogo was correct, and correctness is all the lens checks.',
          isCorrect: false,
          feedback:
            'Presence is not enough; a Samba figure should keep its bounce and syncopation, not flatten out.',
        },
        {
          id: 'b',
          label: 'Zero — a flat botafogo counts as no figure at all.',
          isCorrect: false,
          feedback:
            'Too blunt; the botafogo was recognisable. A dropped bounce reduces the score, not zeros it.',
        },
        {
          id: 'c',
          label: 'Marked down — the figure is present but flawed, because a Samba figure should keep its bounce action and syncopation, not flatten and even out.',
          isCorrect: true,
          feedback:
            'Correct. Credited for presence, marked for losing the bounce and syncopation the dance needs.',
        },
        {
          id: 'd',
          label: 'It moves to the motion lens — a flat figure is only a motion matter.',
          isCorrect: false,
          feedback:
            'Motion is affected, but whether the specific figure was executed with its bounce is the signature-figures lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Should a Samba figure keep its bounce and syncopation?' },
        { level: 2, title: 'Concept', content: 'Figures are judged on correct execution, including keeping the bounce.' },
        { level: 3, title: 'Specific clue', content: 'A botafogo that flattens and evens out is flawed.' },
        { level: 4, title: 'Guided solution', content: 'Choose the mark-down for the flattened figure.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Execution judged' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Full marks for a flattened figure would teach couples the bounce does not matter in figures.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.signature-figures', label: 'Signature Figures' },
        { topicId: 'dance.samba', label: 'Judging the Samba' },
      ],
      successFeedback: 'Correct but flattened — marked down. A Samba figure keeps its bounce.',
      failureFeedback: 'A Samba figure should keep its bounce action and syncopation; one that flattens and evens out is a flawed execution.',
    },
  ],
  reflectionPrompt: 'Where is the line between a figure that is merely correct and one that keeps the Samba’s genuine bounce?',
  rewards: [{ type: 'xp', amount: 5, label: 'Samba figures trained' }],
};
