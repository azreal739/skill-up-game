import { MissionDefinition } from '@academy/content-model';

/** Dance Academy — Judge Path, Polka module mission 1. */
export const judgePolka001Intro: MissionDefinition = {
  id: 'judge-polka-001-intro',
  campaignId: 'judge-polka',
  title: 'The Polka at a Glance',
  summary:
    'Bright, bouncy and driving down the floor. Learn the Polka’s signature — 1&2 lilt, up/down pulse, aggressive travel — so you know it on sight.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise the Polka from its lilt and drive',
    'Contrast its aggressive travel with the Waltz',
    'Connect each trait to the lens that scores it',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'The Polka is the most energetic traveller: a bright 1&2 lilt, a springy up/down pulse, and aggressive forward drive down the floor. Country to its core.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Watch the pulse and the drive. If it lilts and covers ground with attack, you are looking at a Polka.',
    },
  ],
  contextArtefacts: [
    {
      id: 'polka-signature',
      type: 'message',
      title: 'Polka signature',
      content:
        'Time: 4/4 or 2/4, 1&2 3&4 lilt, ball-ball-ball-flat. Motion: springy up/down pulse with forward poise. Character: energetic, bright, country. Figures: skips, gallops, rotating chasses, weaves. Space: aggressively progressive.',
    },
  ],
  challenges: [
    {
      id: 'jpk-001-c1',
      type: 'multiple-choice',
      title: 'Name That Dance',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'polka'],
      storyContext:
        'A couple dances a bright, up-tempo number with a springy up/down lilt on a 1&2 feel, driving forward and covering the whole floor with attack.',
      prompt: 'Which dance is this, and which trait gives it away?',
      options: [
        {
          id: 'a',
          label: 'Waltz — travelling smoothly means Waltz.',
          isCorrect: false,
          feedback:
            'The Waltz is 3/4 and smooth on diagonals; this is a bright lilting pulse driving aggressively — a Polka.',
        },
        {
          id: 'b',
          label: 'Nightclub — the energy could be a lively Nightclub.',
          isCorrect: false,
          feedback:
            'Nightclub is soft, slow-quick-quick and non-progressive; a driving, lilting traveller is not a Nightclub.',
        },
        {
          id: 'c',
          label: 'Polka — the 1&2 lilt, up/down pulse and aggressive forward drive are the signature.',
          isCorrect: true,
          feedback:
            'Correct. The springy lilt and hard-driving progression identify the Polka.',
        },
        {
          id: 'd',
          label: 'Triple Two — any travelling triple feel is a Triple Two.',
          isCorrect: false,
          feedback:
            'The Triple Two is smooth, soft and curved; the Polka lilts, pulses and drives hard down the floor.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Watch the pulse and the drive.' },
        { level: 2, title: 'Concept', content: 'Lilt plus aggressive travel identifies this dance.' },
        { level: 3, title: 'Specific clue', content: 'A springy 1&2 pulse covering the floor with attack.' },
        { level: 4, title: 'Guided solution', content: 'Choose Polka.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Polka recognised' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Misidentifying the dance would apply the wrong criteria across every lens.',
        },
      ],
      helpLinks: [{ topicId: 'dance.polka', label: 'Judging the Polka' }],
      successFeedback: 'Lilt, pulse, aggressive drive — Polka, confirmed.',
      failureFeedback: 'A bright 1&2 lilt with an up/down pulse driving hard down the floor is a Polka.',
    },
    {
      id: 'jpk-001-c2',
      type: 'multiple-choice',
      title: 'How Much Travel?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'polka', 'spatial-structure'],
      storyContext:
        'A new judge expects the Polka to travel gently, like a relaxed Waltz.',
      prompt: 'Is that the right spatial expectation?',
      options: [
        {
          id: 'a',
          label: 'Yes — all progressive dances travel gently.',
          isCorrect: false,
          feedback:
            'Not the Polka. It is aggressively progressive — it should drive hard down the floor, not amble.',
        },
        {
          id: 'b',
          label: 'No — the Polka is aggressively progressive and should drive down the floor with attack, more than a gentle Waltz.',
          isCorrect: true,
          feedback:
            'Correct. A relaxed, gentle traveller would be under-powered for a Polka.',
        },
        {
          id: 'c',
          label: 'No — the Polka is non-progressive and stays in one place.',
          isCorrect: false,
          feedback:
            'The Polka is very progressive — the opposite of staying put.',
        },
        {
          id: 'd',
          label: 'Yes — travelling too hard always looks out of control.',
          isCorrect: false,
          feedback:
            'Controlled aggressive drive is exactly what the Polka wants; gentle travel is under-powered for it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'How hard should a Polka travel?' },
        { level: 2, title: 'Concept', content: 'The Polka is aggressively progressive.' },
        { level: 3, title: 'Specific clue', content: 'A gentle amble is under-powered for a Polka.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — aggressively progressive."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Drive expectation set' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Expecting gentle travel of a Polka would skew the panel’s structure marks.',
        },
      ],
      helpLinks: [{ topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' }],
      successFeedback: 'Aggressively progressive — the Polka drives, it does not amble.',
      failureFeedback: 'The Polka is aggressively progressive; it should drive down the floor with attack, not travel gently.',
    },
  ],
  reflectionPrompt: 'What is the biggest difference in how you will watch a Polka versus a Waltz?',
  rewards: [{ type: 'xp', amount: 5, label: 'Polka module opened' }],
};
