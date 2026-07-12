import { MissionDefinition } from '@academy/content-model';

/** Waltz module mission 6 — signature figures: box, twinkle, diamond, fallaway. */
export const judgeWaltz006SignatureFigures: MissionDefinition = {
  id: 'judge-waltz-006-signature-figures',
  campaignId: 'judge-waltz',
  title: 'Box, Twinkle, Fallaway',
  summary:
    'The Waltz has a defining figure vocabulary. Learn to check it is present, varied and correctly shaped.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise core Waltz figures',
    'Judge figure vocabulary for range, not just presence',
    'Treat a thin figure set as a scorable fault',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Box, twinkle, diamond, fallaway — these say "Waltz". A couple that only ever boxes has danced a Waltz, but a thin one. Judge the range.',
    },
  ],
  contextArtefacts: [
    {
      id: 'waltz-figures',
      type: 'message',
      title: 'Core Waltz figures',
      content: 'Box · Twinkle · Diamond · Fallaway — the recognisable vocabulary of the dance.',
    },
  ],
  challenges: [
    {
      id: 'jw-006-c1',
      type: 'multiple-choice',
      title: 'Identify the Figures',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'waltz', 'signature-figures'],
      storyContext:
        'You are checking whether a routine really uses Waltz vocabulary. Four figure names are proposed as "core Waltz figures".',
      prompt: 'Which set is genuinely core Waltz vocabulary?',
      options: [
        {
          id: 'a',
          label: 'Box, twinkle, diamond, fallaway.',
          isCorrect: true,
          feedback:
            'Correct — these are the recognisable core figures of the Waltz.',
        },
        {
          id: 'b',
          label: 'Push, pass, whip, anchor.',
          isCorrect: false,
          feedback:
            'Those are West Coast Swing figures — a slot dance vocabulary, not a Waltz’s.',
        },
        {
          id: 'c',
          label: 'Volta, whisk, botafogo, samba roll.',
          isCorrect: false,
          feedback:
            'Those are Samba figures. Recognising them is exactly how you would rule OUT a Waltz.',
        },
        {
          id: 'd',
          label: 'Lock, chasse, cucaracha, spot turn.',
          isCorrect: false,
          feedback:
            'Those live in Latin/rhythm dances like Cha Cha, not in the Waltz’s vocabulary.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which names go with a smooth, progressive 3/4 dance?' },
        { level: 2, title: 'Concept', content: 'Signature figures identify the dance; match them to the Waltz.' },
        { level: 3, title: 'Specific clue', content: 'The box and twinkle are unmistakably Waltz.' },
        { level: 4, title: 'Guided solution', content: 'Choose box, twinkle, diamond, fallaway.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Waltz vocabulary known' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Not knowing the Waltz vocabulary would let another dance’s figures pass as a Waltz.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'Box, twinkle, diamond, fallaway — you know a Waltz by its figures.',
      failureFeedback: 'The Waltz’s core figures are the box, twinkle, diamond and fallaway; the others belong to other dances.',
    },
    {
      id: 'jw-006-c2',
      type: 'multiple-choice',
      title: 'One Figure, All Routine',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'waltz', 'signature-figures'],
      storyContext:
        'A couple dances a clean, on-time Waltz — but repeats the box step for almost the entire routine, with only a single twinkle for variety.',
      prompt: 'How does the signature figures lens score this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — the box is a correct Waltz figure, and it was done well.',
          isCorrect: false,
          feedback:
            'Correct execution of one figure is not the whole lens. Range and variety of the vocabulary matter too.',
        },
        {
          id: 'b',
          label: 'Zero — repeating the box means no signature figures were shown at all.',
          isCorrect: false,
          feedback:
            'The box IS a signature figure, so it is not zero. A thin vocabulary is marked down, not marked out.',
        },
        {
          id: 'c',
          label: 'Marked down for a thin vocabulary — the figures shown are correct but lack the range the lens rewards.',
          isCorrect: true,
          feedback:
            'Right. Presence is met but range is not; a near-single-figure routine scores below a varied one.',
        },
        {
          id: 'd',
          label: 'It moves to the character lens — repetition is really a personality issue.',
          isCorrect: false,
          feedback:
            'Repetition may dull character, but whether the dance’s figure vocabulary is present and varied is this lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does this lens reward only presence, or range too?' },
        { level: 2, title: 'Concept', content: 'Signature figures are judged for presence AND variety.' },
        { level: 3, title: 'Specific clue', content: 'A correct box repeated all routine is thin, not absent.' },
        { level: 4, title: 'Guided solution', content: 'Choose "marked down for a thin vocabulary".' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Range judged' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Full marks for one repeated figure would tell couples that variety does not pay.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.signature-figures', label: 'Signature Figures' },
        { topicId: 'dance.waltz', label: 'Judging the Waltz' },
      ],
      successFeedback: 'Correct but thin. Range is part of the figures lens, and you scored it.',
      failureFeedback: 'The figures lens rewards presence AND range — a single figure repeated all routine is marked down.',
    },
  ],
  reflectionPrompt: 'How much figure variety would you want to see before you called a Waltz vocabulary "rich"?',
  rewards: [{ type: 'xp', amount: 5, label: 'Waltz figures trained' }],
};
