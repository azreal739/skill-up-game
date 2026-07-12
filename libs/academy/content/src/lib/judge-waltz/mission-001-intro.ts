import { MissionDefinition } from '@academy/content-model';

/** Dance Academy — Judge Path, Waltz module mission 1: the dance at a glance. */
export const judgeWaltz001Intro: MissionDefinition = {
  id: 'judge-waltz-001-intro',
  campaignId: 'judge-waltz',
  title: 'The Waltz at a Glance',
  summary:
    'Your first specialist dance. Learn the signature of a Waltz — 3/4 time, rise and fall, regal character — so you know it the moment it starts.',
  difficulty: 'intro',
  learningObjectives: [
    'Recognise a Waltz from its defining traits',
    'Connect each trait to the lens that scores it',
    'Set expectations before the couple begins',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'You have the fundamentals; now we specialise. The Waltz is the most formal dance you will score — 3/4 time, a smooth rise and fall, and a regal carriage. Learn its signature.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Before a Waltz couple takes a step, you should already know what a good one looks like. That is what this module builds.',
    },
  ],
  contextArtefacts: [
    {
      id: 'waltz-signature',
      type: 'message',
      title: 'Waltz signature',
      content:
        'Time: 3/4, counted 1–6. Motion: rise and fall with swing and sway. Character: elegant, formal, regal. Figures: box, twinkle, diamond, fallaway. Travel: progressive, counter-clockwise on diagonals.',
    },
  ],
  challenges: [
    {
      id: 'jw-001-c1',
      type: 'multiple-choice',
      title: 'Name That Dance',
      difficulty: 'easy',
      tags: ['dance', 'judging', 'waltz'],
      storyContext:
        'A couple begins: three-beat bars, a smooth vertical rise and fall through each figure, elegant upright carriage, travelling around the floor.',
      prompt: 'Which dance is this, and which trait gives it away most directly?',
      options: [
        {
          id: 'a',
          label: 'Cha Cha — the rise and fall is really a Cuban hip action.',
          isCorrect: false,
          feedback:
            'Cha Cha is 4/4 with Cuban motion, not a three-beat bar with vertical rise and fall. Different time and different motion.',
        },
        {
          id: 'b',
          label: 'Waltz — the three-beat bar with a smooth vertical rise and fall is its clearest signature.',
          isCorrect: true,
          feedback:
            'Correct. 3/4 time plus rise and fall is the Waltz signature; the regal carriage and progressive travel confirm it.',
        },
        {
          id: 'c',
          label: 'Nightclub — the smooth travelling look means Nightclub.',
          isCorrect: false,
          feedback:
            'Nightclub is 4/4, slow-quick-quick, and non-progressive. A three-beat bar travelling the floor is not Nightclub.',
        },
        {
          id: 'd',
          label: 'Two Step — any progressive travelling dance is a Two Step.',
          isCorrect: false,
          feedback:
            'Plenty of dances travel. Two Step is 4/4 quick-quick-slow-slow; the three-beat bar rules it out.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Count the beats in a bar and watch the vertical motion.' },
        { level: 2, title: 'Concept', content: 'Time signature plus the motion signature identifies a dance fastest.' },
        { level: 3, title: 'Specific clue', content: 'Three-beat bars with rise and fall point to one dance.' },
        { level: 4, title: 'Guided solution', content: 'Choose Waltz, identified by the 3/4 bar and rise and fall.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Waltz recognised' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 4,
          reason: 'Misidentifying the dance would apply the wrong dance’s criteria to every lens.',
        },
      ],
      helpLinks: [{ topicId: 'dance.waltz', label: 'Judging the Waltz' }],
      successFeedback: 'Three-beat bar, rise and fall — Waltz, confirmed on sight.',
      failureFeedback: 'Time signature and motion identify a dance fastest: a 3/4 bar with rise and fall is a Waltz.',
    },
    {
      id: 'jw-001-c2',
      type: 'multiple-choice',
      title: 'Trait to Lens',
      difficulty: 'easy',
      tags: ['dance', 'judging', 'waltz'],
      storyContext:
        'You jot down four things you will watch in this Waltz: the three-beat timing, the rise and fall, the regal carriage, and the box and twinkle figures.',
      prompt: 'Which pairing of trait to lens is correct?',
      options: [
        {
          id: 'a',
          label: 'Rise and fall → the timing lens.',
          isCorrect: false,
          feedback:
            'Rise and fall is a body action — it belongs to the motion lens, not timing.',
        },
        {
          id: 'b',
          label: 'The box and twinkle → the character lens.',
          isCorrect: false,
          feedback:
            'Figures like the box and twinkle are scored under signature figures, not character.',
        },
        {
          id: 'c',
          label: 'Three-beat timing → the timing lens; regal carriage → the character lens.',
          isCorrect: false,
          feedback:
            'Both halves are right individually — but read carefully, the fully-correct single pairing is the one that also keeps rise and fall under motion.',
        },
        {
          id: 'd',
          label: 'Regal carriage → the character lens, and rise and fall → the motion lens.',
          isCorrect: true,
          feedback:
            'Correct. Carriage and energy are character; rise and fall is a produced body action, so it is motion.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Match each trait to the lens that actually scores it.' },
        { level: 2, title: 'Concept', content: 'Motion = how the body moves; character = personality and carriage.' },
        { level: 3, title: 'Specific clue', content: 'Rise and fall is a body action, not timing or character.' },
        { level: 4, title: 'Guided solution', content: 'Choose regal carriage → character and rise and fall → motion.' },
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
      successFeedback: 'Carriage to character, rise and fall to motion. Your scorecard will line up.',
      failureFeedback: 'Rise and fall is a body action (motion); carriage and energy are character.',
    },
  ],
  reflectionPrompt: 'Before scoring any Waltz, what one trait would you check first to be sure it is a Waltz at all?',
  rewards: [{ type: 'xp', amount: 5, label: 'Waltz module opened' }],
};
