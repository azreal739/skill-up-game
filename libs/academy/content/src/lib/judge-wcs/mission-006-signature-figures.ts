import { MissionDefinition } from '@academy/content-model';

/** WCS module mission 6 — signature figures: push, pass, whip. */
export const judgeWcs006SignatureFigures: MissionDefinition = {
  id: 'judge-wcs-006-signature-figures',
  campaignId: 'judge-wcs',
  title: 'Push, Pass, Whip',
  summary:
    'The push, pass and whip are the backbone of West Coast Swing. Learn to confirm the vocabulary is present and correctly built.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise the core WCS figures',
    'Judge the whip as a genuine eight-count figure',
    'Rule out other dances’ vocabularies',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Push, pass, whip — these say West Coast Swing. The whip especially: a full eight-count figure that returns to the slot. Check they are present and correctly shaped.',
    },
  ],
  contextArtefacts: [
    {
      id: 'wcs-figures',
      type: 'message',
      title: 'Core WCS figures',
      content: 'Push (sugar push) · Pass (left/right side pass) · Whip — the backbone of the dance.',
    },
  ],
  challenges: [
    {
      id: 'jws-006-c1',
      type: 'multiple-choice',
      title: 'Whose Figures?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'west-coast-swing', 'signature-figures'],
      storyContext: 'Four figure sets are proposed as "core West Coast Swing figures".',
      prompt: 'Which set is genuinely WCS vocabulary?',
      options: [
        {
          id: 'a',
          label: 'Box, twinkle, fallaway.',
          isCorrect: false,
          feedback:
            'Those are Waltz figures — a progressive dance’s vocabulary, not WCS.',
        },
        {
          id: 'b',
          label: 'Volta, whisk, botafogo.',
          isCorrect: false,
          feedback:
            'Those are Samba figures; recognising them is how you would rule OUT West Coast Swing.',
        },
        {
          id: 'c',
          label: 'Diamonds, passes, rotations.',
          isCorrect: false,
          feedback:
            'That is closer to Nightclub. A "pass" appears in WCS, but the whole set here is not the WCS backbone.',
        },
        {
          id: 'd',
          label: 'Push, pass, whip.',
          isCorrect: true,
          feedback:
            'Correct — the sugar push, side pass and whip are the core West Coast Swing vocabulary.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which names go with a slotted, anchored dance?' },
        { level: 2, title: 'Concept', content: 'Signature figures identify the dance.' },
        { level: 3, title: 'Specific clue', content: 'The whip is unmistakably WCS.' },
        { level: 4, title: 'Guided solution', content: 'Choose push, pass, whip.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Vocabulary known' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Not knowing the vocabulary would let another dance’s figures pass as WCS.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'Push, pass, whip — West Coast Swing by its figures.',
      failureFeedback: 'WCS figures are the push, pass and whip; the others belong to other dances.',
    },
    {
      id: 'jws-006-c2',
      type: 'multiple-choice',
      title: 'A Whip That Leaves the Slot',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'west-coast-swing', 'signature-figures'],
      storyContext:
        'A couple leads a whip that travels well off the slot line and never returns to it, so the "whip" ends the couple facing a new direction entirely.',
      prompt: 'How does the signature figures lens read this whip?',
      options: [
        {
          id: 'a',
          label: 'Full marks — a whip was attempted, and attempting the figure is all the lens checks.',
          isCorrect: false,
          feedback:
            'Presence is not enough; the whip must be correctly built, which includes returning to the slot.',
        },
        {
          id: 'b',
          label: 'Marked down — a whip is correct only when it returns to the slot; one that abandons the slot is a flawed execution of the figure.',
          isCorrect: true,
          feedback:
            'Correct. The whip is an eight-count figure that re-establishes the slot; leaving it permanently is a flawed whip.',
        },
        {
          id: 'c',
          label: 'Full marks — travelling further makes the whip more impressive.',
          isCorrect: false,
          feedback:
            'Distance is not the criterion; a whip that abandons the slot has lost part of what makes it a whip.',
        },
        {
          id: 'd',
          label: 'It moves entirely to spatial structure — figure correctness is not this lens’s business.',
          isCorrect: false,
          feedback:
            'It touches spatial structure, but whether the specific figure is correctly executed is the signature-figures lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What makes a whip a whip — including how it ends?' },
        { level: 2, title: 'Concept', content: 'Signature figures are judged on correct execution, not just attempt.' },
        { level: 3, title: 'Specific clue', content: 'A whip re-establishes the slot; abandoning it is flawed.' },
        { level: 4, title: 'Guided solution', content: 'Choose the mark-down for the slot-abandoning whip.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Whip execution judged' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Full marks for a slot-abandoning whip would teach couples the figure’s structure does not matter.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.signature-figures', label: 'Signature Figures' },
        { topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' },
      ],
      successFeedback: 'A whip returns to the slot. One that abandons it is a flawed figure, and you marked it.',
      failureFeedback: 'A correct whip re-establishes the slot; one that permanently leaves it is a flawed execution.',
    },
  ],
  reflectionPrompt: 'Where is the line between a whip’s legal brief direction change and genuinely abandoning the slot?',
  rewards: [{ type: 'xp', amount: 5, label: 'WCS figures trained' }],
};
