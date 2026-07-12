import { MissionDefinition } from '@academy/content-model';

/** Dance Academy — Judge Path, Nightclub module mission 1: the dance at a glance. */
export const judgeNightclub001Intro: MissionDefinition = {
  id: 'judge-nightclub-001-intro',
  campaignId: 'judge-nightclub',
  title: 'The Nightclub at a Glance',
  summary:
    'From the regal Waltz to the romantic Nightclub. Learn its signature — 4/4 slow-quick-quick, base-driven sway, contained geometry — so you know it on sight.',
  difficulty: 'intro',
  learningObjectives: [
    'Recognise a Nightclub from its defining traits',
    'Contrast it with the progressive Waltz',
    'Connect each trait to the lens that scores it',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'The Nightclub is the Waltz’s opposite in space: soft, romantic, and content to stay in one area. 4/4 slow-quick-quick, sway from the base, geometry parallel to the audience.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Where the Waltz travels, the Nightclub stays and shapes. Learn to expect that difference before the couple begins.',
    },
  ],
  contextArtefacts: [
    {
      id: 'nightclub-signature',
      type: 'message',
      title: 'Nightclub signature',
      content:
        'Time: 4/4, slow-quick-quick. Motion: soft sway/counter-sway from the base. Character: soft, fluid, romantic. Figures: diamonds, passes, rotations. Space: non-progressive geometry parallel to the audience edge.',
    },
  ],
  challenges: [
    {
      id: 'jn-001-c1',
      type: 'multiple-choice',
      title: 'Name That Dance',
      difficulty: 'easy',
      tags: ['dance', 'judging', 'nightclub'],
      storyContext:
        'A couple dances softly to a 4/4 ballad, slow-quick-quick, swaying gently and shaping diamonds in one area of the floor without travelling around the room.',
      prompt: 'Which dance is this, and which trait gives it away?',
      options: [
        {
          id: 'a',
          label: 'Nightclub — 4/4 slow-quick-quick with soft sway, holding a contained area rather than travelling.',
          isCorrect: true,
          feedback:
            'Correct. The slow-quick-quick rhythm, romantic sway and non-progressive geometry are the Nightclub signature.',
        },
        {
          id: 'b',
          label: 'Waltz — the gentle swaying means it must be a Waltz.',
          isCorrect: false,
          feedback:
            'The Waltz is 3/4 and progressive. A 4/4 slow-quick-quick dance staying in one area is not a Waltz.',
        },
        {
          id: 'c',
          label: 'Polka — any 4/4 dance with energy is a Polka.',
          isCorrect: false,
          feedback:
            'Polka is aggressively progressive and energetic, not a soft, contained ballad dance.',
        },
        {
          id: 'd',
          label: 'Two Step — travelling dances are always Two Step.',
          isCorrect: false,
          feedback:
            'This couple is NOT travelling around the room — the opposite of Two Step’s progressive track-and-rail.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Note the rhythm and whether the couple travels.' },
        { level: 2, title: 'Concept', content: 'Rhythm plus spatial habit identifies a dance quickly.' },
        { level: 3, title: 'Specific clue', content: 'Slow-quick-quick and staying in one area point to one dance.' },
        { level: 4, title: 'Guided solution', content: 'Choose Nightclub.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Nightclub recognised' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 4,
          reason: 'Misidentifying the dance would apply the wrong criteria — especially the wrong spatial expectation.',
        },
      ],
      helpLinks: [{ topicId: 'dance.nightclub', label: 'Judging the Nightclub' }],
      successFeedback: 'Slow-quick-quick, soft and contained — Nightclub, confirmed.',
      failureFeedback: 'A 4/4 slow-quick-quick dance that stays in one area with soft sway is a Nightclub, not a Waltz.',
    },
    {
      id: 'jn-001-c2',
      type: 'multiple-choice',
      title: 'Opposite of the Waltz',
      difficulty: 'easy',
      tags: ['dance', 'judging', 'nightclub', 'spatial-structure'],
      storyContext:
        'A new judge assumes every ballroom-style dance should travel counter-clockwise around the floor, as the Waltz does.',
      prompt: 'Is that the right spatial expectation for a Nightclub?',
      options: [
        {
          id: 'a',
          label: 'Yes — all smooth dances travel around the floor.',
          isCorrect: false,
          feedback:
            'Not all. The Nightclub is non-progressive; expecting it to travel like a Waltz would misjudge every couple.',
        },
        {
          id: 'b',
          label: 'Yes — travelling is always better use of the floor.',
          isCorrect: false,
          feedback:
            'For a non-progressive dance, travelling around the room is a fault, not better use of the floor.',
        },
        {
          id: 'c',
          label: 'No — the Nightclub is non-progressive and holds a contained geometric area parallel to the audience.',
          isCorrect: true,
          feedback:
            'Correct. Nightclub shapes volume and depth in one area; travelling the line of dance is the wrong structure for it.',
        },
        {
          id: 'd',
          label: 'No — the Nightclub travels clockwise instead of counter-clockwise.',
          isCorrect: false,
          feedback:
            'It is not about direction of travel; the Nightclub is not meant to progress around the floor at all.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does the Nightclub progress around the floor?' },
        { level: 2, title: 'Concept', content: 'Progressive vs non-progressive is a core spatial distinction.' },
        { level: 3, title: 'Specific clue', content: 'Nightclub holds a contained shape parallel to the audience.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — non-progressive, contained geometry."' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Spatial expectation set' }],
      consequences: [
        {
          type: 'stability',
          delta: -3,
          reason: 'Carrying the Waltz’s progressive expectation into a Nightclub would skew the whole panel’s spatial marks.',
        },
      ],
      helpLinks: [{ topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' }],
      successFeedback: 'Non-progressive and contained — the opposite spatial habit to the Waltz.',
      failureFeedback: 'The Nightclub is non-progressive: it holds a contained shape rather than travelling the line of dance.',
    },
  ],
  reflectionPrompt: 'What is the single biggest difference in how you will watch a Nightclub versus a Waltz?',
  rewards: [{ type: 'xp', amount: 5, label: 'Nightclub module opened' }],
};
