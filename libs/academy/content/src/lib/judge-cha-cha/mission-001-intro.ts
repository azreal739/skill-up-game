import { MissionDefinition } from '@academy/content-model';

/** Dance Academy — Judge Path, Cha Cha module mission 1. */
export const judgeChaCha001Intro: MissionDefinition = {
  id: 'judge-cha-cha-001-intro',
  campaignId: 'judge-cha-cha',
  title: 'The Cha Cha at a Glance',
  summary:
    'From the cool WCS to the cheeky Cha Cha. Learn its signature — the 4&5 chasse, Cuban motion, fiery flirtatious character — so you know it on sight.',
  difficulty: 'easy',
  learningObjectives: [
    'Recognise a Cha Cha from its chasse and motion',
    'Connect its traits to the six lenses',
    'Set expectations before the couple begins',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'The Cha Cha is fiery and flirtatious — a 4/4 dance whose signature is the chasse, that crisp cha-cha-cha on 4&5. Cuban motion, cheeky character, controlled space.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Listen for the chasse and watch the hips. Learn to expect Cuban motion and a playful attitude before the couple moves.',
    },
  ],
  contextArtefacts: [
    {
      id: 'chacha-signature',
      type: 'message',
      title: 'Cha Cha signature',
      content:
        'Time: 4/4 with the 4&5 (and 8&) chasse. Motion: Cuban action from the knees and hips. Character: fiery, flirtatious, cheeky. Figures: basics, breaks (New Yorkers), rotations. Space: controlled, largely non-progressive.',
    },
  ],
  challenges: [
    {
      id: 'jcc-001-c1',
      type: 'multiple-choice',
      title: 'Name That Dance',
      difficulty: 'easy',
      tags: ['dance', 'judging', 'cha-cha'],
      storyContext:
        'A couple dances a 4/4 Latin number: crisp triple chasses on the "and" counts, hip action rolling through bent-and-straightening knees, playful and sharp, staying in a small area.',
      prompt: 'Which dance is this, and which trait gives it away?',
      options: [
        {
          id: 'a',
          label: 'Nightclub — the small area means it must be Nightclub.',
          isCorrect: false,
          feedback:
            'Nightclub is soft, slow-quick-quick with sway. Crisp chasses and Cuban hip action are not Nightclub.',
        },
        {
          id: 'b',
          label: 'West Coast Swing — the triples mean WCS.',
          isCorrect: false,
          feedback:
            'WCS triples live in a slot with an anchor. A chasse with Cuban motion in a contained Latin number is a Cha Cha.',
        },
        {
          id: 'c',
          label: 'Cha Cha — the 4&5 chasse plus Cuban hip action is the signature.',
          isCorrect: true,
          feedback:
            'Correct. The crisp chasse on the "and" counts and Cuban motion identify the Cha Cha.',
        },
        {
          id: 'd',
          label: 'Waltz — the rolling hip action is a kind of rise and fall.',
          isCorrect: false,
          feedback:
            'Cuban hip action is not rise and fall, and the Waltz is 3/4 and progressive. This is a Cha Cha.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Listen for the chasse and watch the hips.' },
        { level: 2, title: 'Concept', content: 'The chasse plus Cuban motion identifies the Cha Cha.' },
        { level: 3, title: 'Specific clue', content: 'A crisp cha-cha-cha on 4&5 is unmistakable.' },
        { level: 4, title: 'Guided solution', content: 'Choose Cha Cha.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Cha Cha recognised' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 4,
          reason: 'Misidentifying the dance would apply the wrong criteria across every lens.',
        },
      ],
      helpLinks: [{ topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' }],
      successFeedback: 'Chasse plus Cuban motion — Cha Cha, confirmed.',
      failureFeedback: 'A 4&5 chasse with Cuban hip action in a contained Latin number is a Cha Cha.',
    },
    {
      id: 'jcc-001-c2',
      type: 'multiple-choice',
      title: 'Trait to Lens',
      difficulty: 'easy',
      tags: ['dance', 'judging', 'cha-cha'],
      storyContext:
        'You note four things to watch: the chasse timing, the Cuban hip action, the cheeky attitude, and the New Yorker breaks.',
      prompt: 'Which pairing of trait to lens is correct?',
      options: [
        {
          id: 'a',
          label: 'Cuban hip action → the motion lens, and the cheeky attitude → the character lens.',
          isCorrect: true,
          feedback:
            'Correct. Cuban action is a produced body movement (motion); attitude and playfulness are character.',
        },
        {
          id: 'b',
          label: 'The chasse → the character lens.',
          isCorrect: false,
          feedback:
            'The chasse is a timing/rhythm matter, not character.',
        },
        {
          id: 'c',
          label: 'New Yorker breaks → the motion lens.',
          isCorrect: false,
          feedback:
            'Breaks are named figures, so they belong to the signature-figures lens, not motion.',
        },
        {
          id: 'd',
          label: 'Cuban hip action → the timing lens.',
          isCorrect: false,
          feedback:
            'Cuban action is a body movement — the motion lens — not timing.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Match each trait to the lens that scores it.' },
        { level: 2, title: 'Concept', content: 'Motion = how the body moves; character = attitude and energy.' },
        { level: 3, title: 'Specific clue', content: 'Hip action is motion; cheekiness is character.' },
        { level: 4, title: 'Guided solution', content: 'Choose Cuban action → motion, cheeky attitude → character.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Traits mapped' }],
      consequences: [
        {
          type: 'stability',
          delta: -3,
          reason: 'Filing traits under the wrong lenses would scatter the scorecard and split the panel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.criteria', label: 'The Six Judging Lenses' }],
      successFeedback: 'Hip action to motion, cheekiness to character. Your scorecard lines up.',
      failureFeedback: 'Cuban hip action is a body movement (motion); the cheeky attitude is character.',
    },
  ],
  reflectionPrompt: 'What is the single biggest difference in how you will watch a Cha Cha versus a West Coast Swing?',
  rewards: [{ type: 'xp', amount: 5, label: 'Cha Cha module opened' }],
};
