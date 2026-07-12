import { MissionDefinition } from '@academy/content-model';

/** Dance Academy — Judge Path, Triple Two module mission 1. */
export const judgeTripleTwo001Intro: MissionDefinition = {
  id: 'judge-triple-two-001-intro',
  campaignId: 'judge-triple-two',
  title: 'The Triple Two at a Glance',
  summary:
    'A soft, romantic dance that weaves down the floor. Learn its signature — slow-slow-triple-triple, opposite shape, curved progression — so you know it on sight.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise Triple Two from its rhythm and travel',
    'Contrast its curved progression with the Waltz’s diagonals',
    'Connect each trait to the lens that scores it',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Triple Two is smooth and romantic, but unlike the Nightclub it travels — weaving down the floor on a curved path. Slow-slow-triple-triple, with opposite shape in the triples.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Watch the triples shape opposite ways, and watch the couple flow on a curve rather than straight diagonals. That is your Triple Two.',
    },
  ],
  contextArtefacts: [
    {
      id: 'triple-two-signature',
      type: 'message',
      title: 'Triple Two signature',
      content:
        'Time: 4/4, slow-slow-triple-triple. Motion: whole-body shape, opposite in successive triples, soft and continuous. Character: smooth, soft, romantic. Figures: loops, laces, weaves. Space: progressive on a curved path.',
    },
  ],
  challenges: [
    {
      id: 'jtt-001-c1',
      type: 'multiple-choice',
      title: 'Name That Dance',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'triple-two'],
      storyContext:
        'A couple dances 4/4: two smooth walking steps then two triples, shaping softly through the body and weaving down the floor on a curving path.',
      prompt: 'Which dance is this, and which trait gives it away?',
      options: [
        {
          id: 'a',
          label: 'Nightclub — the soft romantic feel means Nightclub.',
          isCorrect: false,
          feedback:
            'Nightclub is soft and romantic too, but non-progressive; this couple travels and weaves, and uses triples.',
        },
        {
          id: 'b',
          label: 'Triple Two — slow-slow-triple-triple with soft body shape, weaving progressively on a curve.',
          isCorrect: true,
          feedback:
            'Correct. The slow-slow-triple-triple rhythm and curved, weaving progression identify the Triple Two.',
        },
        {
          id: 'c',
          label: 'Cha Cha — the triples mean Cha Cha.',
          isCorrect: false,
          feedback:
            'The Cha Cha’s triple is the crisp 4&5 chasse in a contained area; this is slow-slow-triple-triple travelling down the floor.',
        },
        {
          id: 'd',
          label: 'Waltz — travelling smoothly means Waltz.',
          isCorrect: false,
          feedback:
            'The Waltz is 3/4 on straight diagonals; this is 4/4 slow-slow-triple-triple weaving on a curve.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Note the rhythm and the shape of the travel.' },
        { level: 2, title: 'Concept', content: 'Rhythm plus curved progression identifies this dance.' },
        { level: 3, title: 'Specific clue', content: 'Slow-slow-triple-triple, weaving on a curve.' },
        { level: 4, title: 'Guided solution', content: 'Choose Triple Two.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Triple Two recognised' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Misidentifying the dance would apply the wrong criteria across every lens.',
        },
      ],
      helpLinks: [{ topicId: 'dance.triple-two', label: 'Judging the Triple Two' }],
      successFeedback: 'Slow-slow-triple-triple, weaving on a curve — Triple Two, confirmed.',
      failureFeedback: 'A 4/4 slow-slow-triple-triple dance weaving progressively on a curve is the Triple Two.',
    },
    {
      id: 'jtt-001-c2',
      type: 'multiple-choice',
      title: 'Curve, Not Diagonal',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'spatial-structure'],
      storyContext:
        'A new judge expects the Triple Two to travel in straight diagonals like a Waltz.',
      prompt: 'Is that the right spatial expectation?',
      options: [
        {
          id: 'a',
          label: 'Yes — all progressive dances travel in straight diagonals.',
          isCorrect: false,
          feedback:
            'Not all. The Triple Two is progressive but travels on a curved, weaving path, not straight diagonals.',
        },
        {
          id: 'b',
          label: 'Yes — straight lines are the most efficient way down the floor.',
          isCorrect: false,
          feedback:
            'Efficiency is not the criterion; the Triple Two’s structure is a curved, weaving progression.',
        },
        {
          id: 'c',
          label: 'No — the Triple Two is progressive but travels on a curved, weaving path, unlike the Waltz’s straight diagonals.',
          isCorrect: true,
          feedback:
            'Correct. Both travel, but the Triple Two curves and weaves where the Waltz cuts diagonals.',
        },
        {
          id: 'd',
          label: 'No — the Triple Two is non-progressive and stays in one place.',
          isCorrect: false,
          feedback:
            'The Triple Two is progressive; it does travel — just on a curve rather than a diagonal.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does the Triple Two travel straight or curved?' },
        { level: 2, title: 'Concept', content: 'Progressive dances can travel on different paths.' },
        { level: 3, title: 'Specific clue', content: 'Weaving implies a curve, not a diagonal.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — curved, weaving progression."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Path expectation set' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Expecting Waltz diagonals of a Triple Two would skew the panel’s structure marks.',
        },
      ],
      helpLinks: [{ topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' }],
      successFeedback: 'Progressive, but curved — the opposite of straight Waltz diagonals.',
      failureFeedback: 'The Triple Two is progressive on a curved, weaving path, unlike the Waltz’s straight diagonals.',
    },
  ],
  reflectionPrompt: 'What is the biggest difference in how you will watch a Triple Two versus a Waltz?',
  rewards: [{ type: 'xp', amount: 5, label: 'Triple Two module opened' }],
};
