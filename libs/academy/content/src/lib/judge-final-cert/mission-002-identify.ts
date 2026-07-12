import { MissionDefinition } from '@academy/content-model';

/** Final Certification mission 2 — station: identify the dance. */
export const judgeFinal002Identify: MissionDefinition = {
  id: 'judge-final-002-identify',
  campaignId: 'judge-final-cert',
  title: 'Station 1 — Name the Dance',
  summary: 'Identify each dance from its traits alone, quickly and correctly.',
  difficulty: 'hard',
  learningObjectives: [
    'Identify a dance from mixed traits',
    'Use the fastest distinguishing feature',
    'Avoid being misled by a single shared trait',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'First station: name the dance. Use time signature and the one signature feature that separates it from its neighbours.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jf-002-c1',
      type: 'multiple-choice',
      title: 'Traits to Dance',
      difficulty: 'hard',
      tags: ['dance', 'judging'],
      storyContext:
        'A couple dances 4/4, in a narrow lane pointed at the audience, each pattern ending in a grounded settle with a stretch through the hands.',
      prompt: 'Which dance is this?',
      options: [
        {
          id: 'a',
          label: 'West Coast Swing — the slot, the anchor and the extension/compression identify it.',
          isCorrect: true,
          feedback:
            'Correct. Slot + anchor + stretch is unmistakably West Coast Swing.',
        },
        {
          id: 'b',
          label: 'Nightclub — the grounded feel means Nightclub.',
          isCorrect: false,
          feedback:
            'Nightclub is contained geometry with base sway, not a slot with an anchored settle.',
        },
        {
          id: 'c',
          label: 'Cha Cha — the hand stretch is a Cuban action.',
          isCorrect: false,
          feedback:
            'Extension/compression is a connection quality, not Cuban motion, and the Cha Cha is not slotted.',
        },
        {
          id: 'd',
          label: 'Waltz — travelling in a lane is a kind of progression.',
          isCorrect: false,
          feedback:
            'The Waltz is 3/4 and travels the room; a 4/4 slot with an anchor is not a Waltz.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What is the lane and the settle called?' },
        { level: 2, title: 'Concept', content: 'The slot and anchor identify one dance.' },
        { level: 3, title: 'Specific clue', content: 'Grounded settle + stretch = anchor + extension/compression.' },
        { level: 4, title: 'Guided solution', content: 'Choose West Coast Swing.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Dance named' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Misnaming the dance would misapply every lens that follows.',
        },
      ],
      helpLinks: [{ topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' }],
      successFeedback: 'Slot and anchor — West Coast Swing. Named.',
      failureFeedback: 'A 4/4 slot with an anchored settle and extension/compression is West Coast Swing.',
    },
    {
      id: 'jf-002-c2',
      type: 'multiple-choice',
      title: 'Do Not Be Misled',
      difficulty: 'hard',
      tags: ['dance', 'judging'],
      storyContext:
        'A couple uses hip action — but in 4/4, with a chasse on 4&5 and a fiery, flirtatious energy in a contained area.',
      prompt: 'Which dance is this, despite the hip action that might suggest several styles?',
      options: [
        {
          id: 'a',
          label: 'Nightclub — hips and a contained area mean Nightclub.',
          isCorrect: false,
          feedback:
            'Nightclub sways from the base and is slow-quick-quick, not a 4&5 chasse with fiery energy.',
        },
        {
          id: 'b',
          label: 'West Coast Swing — hip action and 4/4 mean WCS.',
          isCorrect: false,
          feedback:
            'WCS is slotted and anchored with a cool character; a 4&5 chasse with fire is not WCS.',
        },
        {
          id: 'c',
          label: 'Cha Cha — the 4&5 chasse plus Cuban hip action and cheeky energy identify it.',
          isCorrect: true,
          feedback:
            'Correct. The chasse, Cuban motion and fiery character pin it as a Cha Cha.',
        },
        {
          id: 'd',
          label: 'Waltz — the flirtatious energy could be a playful Waltz.',
          isCorrect: false,
          feedback:
            'The Waltz is 3/4 and regal; a 4/4 chasse with cheeky fire is not a Waltz.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which single feature is decisive — the chasse.' },
        { level: 2, title: 'Concept', content: 'Do not let a shared trait (hips) mislead; use the decisive one.' },
        { level: 3, title: 'Specific clue', content: 'A 4&5 chasse belongs to one dance.' },
        { level: 4, title: 'Guided solution', content: 'Choose Cha Cha.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Not misled' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Letting a shared trait mislead you would misidentify the dance and misjudge it.',
        },
      ],
      helpLinks: [{ topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' }],
      successFeedback: 'The chasse is decisive — Cha Cha. You were not misled by the hips.',
      failureFeedback: 'The 4&5 chasse with Cuban motion and fiery character is a Cha Cha, whatever traits it shares.',
    },
  ],
  reflectionPrompt: 'When two dances share a trait like hip action, what single feature do you reach for to separate them?',
  rewards: [{ type: 'xp', amount: 5, label: 'Station 1 cleared' }],
};
