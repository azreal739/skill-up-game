import { MissionDefinition } from '@academy/content-model';

/** Nightclub module mission 6 — signature figures: diamonds, passes, rotations. */
export const judgeNightclub006SignatureFigures: MissionDefinition = {
  id: 'judge-nightclub-006-signature-figures',
  campaignId: 'judge-nightclub',
  title: 'Diamonds and Passes',
  summary:
    'The Nightclub shapes diamonds, passes and rotations within its contained area. Learn to confirm its vocabulary is present and shaped.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise core Nightclub figures',
    'Judge whether the figures shape genuine volume',
    'Rule out other dances’ vocabularies',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Diamonds, passes, rotations — the Nightclub builds volume and depth from these within one area. Check they are present, and that they actually shape space.',
    },
  ],
  contextArtefacts: [
    {
      id: 'nc-figures',
      type: 'message',
      title: 'Core Nightclub figures',
      content: 'Diamonds · Passes · Rotations — shaping volume and depth in a contained area.',
    },
  ],
  challenges: [
    {
      id: 'jn-006-c1',
      type: 'multiple-choice',
      title: 'Whose Figures?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'nightclub', 'signature-figures'],
      storyContext: 'Four figure sets are proposed as "core Nightclub figures".',
      prompt: 'Which set is genuinely Nightclub vocabulary?',
      options: [
        {
          id: 'a',
          label: 'Box, twinkle, fallaway.',
          isCorrect: false,
          feedback:
            'Those are Waltz figures — a progressive dance’s vocabulary, not the Nightclub’s.',
        },
        {
          id: 'b',
          label: 'Diamonds, passes, rotations.',
          isCorrect: true,
          feedback:
            'Correct — the Nightclub shapes diamonds, passes and rotations within its contained area.',
        },
        {
          id: 'c',
          label: 'Push, pass, whip, anchor.',
          isCorrect: false,
          feedback:
            'Those are West Coast Swing (slot) figures. A "pass" exists in several dances, but this whole set is WCS.',
        },
        {
          id: 'd',
          label: 'Volta, whisk, botafogo.',
          isCorrect: false,
          feedback:
            'Those are Samba figures — recognising them is how you would rule OUT a Nightclub.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which names fit a soft, non-progressive dance?' },
        { level: 2, title: 'Concept', content: 'Signature figures identify the dance.' },
        { level: 3, title: 'Specific clue', content: 'Diamonds and rotations shape a contained area.' },
        { level: 4, title: 'Guided solution', content: 'Choose diamonds, passes, rotations.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Vocabulary known' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Not knowing the vocabulary would let another dance’s figures pass as a Nightclub.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'Diamonds, passes, rotations — the Nightclub by its figures.',
      failureFeedback: 'Nightclub figures are diamonds, passes and rotations; the others belong to other dances.',
    },
    {
      id: 'jn-006-c2',
      type: 'multiple-choice',
      title: 'Shape or Sketch',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'nightclub', 'signature-figures'],
      storyContext:
        'A couple names all the right figures but dances them tiny and flat — the "diamonds" barely leave centre, shaping almost no volume or depth.',
      prompt: 'How does the signature figures lens score figures that are present but shape no volume?',
      options: [
        {
          id: 'a',
          label: 'Full marks — the correct figures were performed, and that is the whole lens.',
          isCorrect: false,
          feedback:
            'Presence is necessary but not sufficient. Nightclub figures are meant to shape volume and depth; flat ones fall short.',
        },
        {
          id: 'b',
          label: 'Zero — tiny figures count exactly the same as no figures.',
          isCorrect: false,
          feedback:
            'Too blunt. Recognisable-but-flat figures are not identical to absence; they score between, not at zero.',
        },
        {
          id: 'c',
          label: 'It moves to spatial structure — figure size is really about floor use.',
          isCorrect: false,
          feedback:
            'Whether the dance’s own figures are shaped fully is the signature-figures lens; floor use overall is spatial structure.',
        },
        {
          id: 'd',
          label: 'Partial — the figures are present so the dance is identifiable, but flat, volume-less shapes lower the score.',
          isCorrect: true,
          feedback:
            'Right. The lens rewards presence AND full shaping; recognisable-but-flat diamonds earn reduced credit.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Do the figures shape the volume the dance intends?' },
        { level: 2, title: 'Concept', content: 'Signature figures are judged on presence and full shaping.' },
        { level: 3, title: 'Specific clue', content: 'Tiny, flat diamonds are recognisable but incomplete.' },
        { level: 4, title: 'Guided solution', content: 'Choose the partial-credit option.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Shaping weighed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Full marks for flat figures would tell couples that shaping the space does not pay.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.signature-figures', label: 'Signature Figures' },
        { topicId: 'dance.nightclub', label: 'Judging the Nightclub' },
      ],
      successFeedback: 'Present but flat lands between full and zero. Shaping is part of the figures lens.',
      failureFeedback: 'Nightclub figures should shape volume; recognisable-but-flat shapes earn partial credit.',
    },
  ],
  reflectionPrompt: 'How would you tell a genuinely small, controlled diamond apart from a flat, under-shaped one?',
  rewards: [{ type: 'xp', amount: 5, label: 'Nightclub figures trained' }],
};
