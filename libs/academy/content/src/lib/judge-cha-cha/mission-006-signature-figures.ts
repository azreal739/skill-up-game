import { MissionDefinition } from '@academy/content-model';

/** Cha Cha module mission 6 — signature figures: basics, breaks, rotations. */
export const judgeChaCha006SignatureFigures: MissionDefinition = {
  id: 'judge-cha-cha-006-signature-figures',
  campaignId: 'judge-cha-cha',
  title: 'Basics, Breaks, Turns',
  summary:
    'The Cha Cha builds from basics, breaks (New Yorkers) and rotations. Learn to confirm the vocabulary is present and cleanly shaped.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise core Cha Cha figures',
    'Judge whether breaks and turns keep their timing',
    'Rule out other dances’ vocabularies',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Basics, New Yorker breaks, spot turns — the Cha Cha vocabulary. Check the figures are present, and that they keep the chasse timing through the turn.',
    },
  ],
  contextArtefacts: [
    {
      id: 'chacha-figures',
      type: 'message',
      title: 'Core Cha Cha figures',
      content: 'Basics · Breaks (New Yorkers) · Rotations (spot turns) — the recognisable vocabulary.',
    },
  ],
  challenges: [
    {
      id: 'jcc-006-c1',
      type: 'multiple-choice',
      title: 'Whose Figures?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'cha-cha', 'signature-figures'],
      storyContext: 'Four figure sets are proposed as "core Cha Cha figures".',
      prompt: 'Which set is genuinely Cha Cha vocabulary?',
      options: [
        {
          id: 'a',
          label: 'Push, pass, whip.',
          isCorrect: false,
          feedback:
            'Those are West Coast Swing (slot) figures, not Cha Cha vocabulary.',
        },
        {
          id: 'b',
          label: 'Basics, New Yorker breaks, spot turns.',
          isCorrect: true,
          feedback:
            'Correct — the basic, the New Yorker break and the spot turn are core Cha Cha figures.',
        },
        {
          id: 'c',
          label: 'Box, twinkle, fallaway.',
          isCorrect: false,
          feedback:
            'Those are Waltz figures — a progressive dance’s vocabulary, not the Cha Cha’s.',
        },
        {
          id: 'd',
          label: 'Diamonds, passes, rotations.',
          isCorrect: false,
          feedback:
            'That set is closer to Nightclub. The Cha Cha rotates in spot turns, but this whole set is not its vocabulary.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which names go with a cheeky Latin spot dance?' },
        { level: 2, title: 'Concept', content: 'Signature figures identify the dance.' },
        { level: 3, title: 'Specific clue', content: 'The New Yorker break is unmistakably Cha Cha.' },
        { level: 4, title: 'Guided solution', content: 'Choose basics, New Yorker breaks, spot turns.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Vocabulary known' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Not knowing the vocabulary would let another dance’s figures pass as a Cha Cha.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'Basics, breaks, turns — the Cha Cha by its figures.',
      failureFeedback: 'Cha Cha figures are basics, New Yorker breaks and spot turns; the others belong to other dances.',
    },
    {
      id: 'jcc-006-c2',
      type: 'multiple-choice',
      title: 'A Turn That Loses the Chasse',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'cha-cha', 'signature-figures'],
      storyContext:
        'A couple performs a spot turn, but rushes through it so the chasse timing collapses and they arrive early, cutting the "cha-cha-cha".',
      prompt: 'How does the signature figures lens read a figure that loses its own timing?',
      options: [
        {
          id: 'a',
          label: 'Full marks — a spot turn was performed, and performing the figure is all the lens checks.',
          isCorrect: false,
          feedback:
            'Presence is not enough. A figure that collapses its own chasse timing is not correctly executed.',
        },
        {
          id: 'b',
          label: 'Zero — a rushed turn counts the same as never attempting one.',
          isCorrect: false,
          feedback:
            'Too blunt. A recognisable-but-rushed turn is not identical to absence; it scores between, not at zero.',
        },
        {
          id: 'c',
          label: 'It moves to the timing lens — this is purely a timing issue.',
          isCorrect: false,
          feedback:
            'Timing is affected too, but whether the specific figure was executed correctly — chasse intact — is the signature-figures lens.',
        },
        {
          id: 'd',
          label: 'Marked down — the turn is present but flawed, because a correct spot turn keeps the chasse timing through the rotation.',
          isCorrect: true,
          feedback:
            'Right. The lens rewards correct execution: a turn that collapses its chasse is recognisable but reduced.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Was the figure executed correctly, timing and all?' },
        { level: 2, title: 'Concept', content: 'Signature figures are judged on correct execution.' },
        { level: 3, title: 'Specific clue', content: 'A spot turn should keep the chasse timing through the rotation.' },
        { level: 4, title: 'Guided solution', content: 'Choose the mark-down for the timing-losing turn.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Execution judged' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Full marks for a timing-losing turn would teach couples that clean execution does not matter.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.signature-figures', label: 'Signature Figures' },
        { topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' },
      ],
      successFeedback: 'Present but flawed — a turn that loses its chasse is marked down. Well judged.',
      failureFeedback: 'A correct spot turn keeps the chasse timing; a turn that collapses it is a flawed figure.',
    },
  ],
  reflectionPrompt: 'Where is the line between a figure that is "rushed" and one that has genuinely lost its timing?',
  rewards: [{ type: 'xp', amount: 5, label: 'Cha Cha figures trained' }],
};
