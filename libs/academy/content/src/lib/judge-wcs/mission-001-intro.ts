import { MissionDefinition } from '@academy/content-model';

/** Dance Academy — Judge Path, West Coast Swing module mission 1. */
export const judgeWcs001Intro: MissionDefinition = {
  id: 'judge-wcs-001-intro',
  campaignId: 'judge-wcs',
  title: 'The West Coast Swing at a Glance',
  summary:
    'A cool, grounded, conversational dance in a slot. Learn its signature — six/eight-count patterns, the anchor, push/pass/whip — so you know it on sight.',
  difficulty: 'easy',
  learningObjectives: [
    'Recognise West Coast Swing from its slot and anchor',
    'Understand its hybrid smooth-rhythm identity',
    'Set expectations before the couple begins',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'West Coast Swing is unlike anything so far: danced in a narrow slot, six- and eight-count patterns, every one settling on an anchor. Cool, grounded, conversational.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'It is a hybrid — smooth glide with rhythmic check steps, extension and compression through the connection. Learn to expect the slot and the anchor.',
    },
  ],
  contextArtefacts: [
    {
      id: 'wcs-signature',
      type: 'message',
      title: 'West Coast Swing signature',
      content:
        'Time: 4/4, six- and eight-count patterns, back-beat feel. Motion: smooth glide + rhythmic checks, extension/compression, settle on the anchor. Character: cool, grounded, conversational. Figures: push, pass, whip. Space: the slot.',
    },
  ],
  challenges: [
    {
      id: 'jws-001-c1',
      type: 'multiple-choice',
      title: 'Name That Dance',
      difficulty: 'easy',
      tags: ['dance', 'judging', 'west-coast-swing'],
      storyContext:
        'A couple dances in a narrow lane pointed at the audience: the follower travels up and back along it, each pattern ending in a grounded settle, with a stretchy give-and-take through the hands.',
      prompt: 'Which dance is this, and which trait gives it away?',
      options: [
        {
          id: 'a',
          label: 'Nightclub — the grounded, stretchy feel means Nightclub.',
          isCorrect: false,
          feedback:
            'Nightclub is non-progressive geometry with soft sway — not a narrow slot with an anchored settle and extension/compression.',
        },
        {
          id: 'b',
          label: 'Waltz — travelling back and forth is a kind of progression.',
          isCorrect: false,
          feedback:
            'The Waltz travels around the room in 3/4. This is 4/4 in a fixed slot with an anchor — a different structure entirely.',
        },
        {
          id: 'c',
          label: 'West Coast Swing — the slot, the anchored settle and the extension/compression are its signature.',
          isCorrect: true,
          feedback:
            'Correct. A narrow slot, a settle on the anchor, and stretch through the connection identify West Coast Swing.',
        },
        {
          id: 'd',
          label: 'Cha Cha — the give-and-take through the hands is a Cuban action.',
          isCorrect: false,
          feedback:
            'Extension/compression is a connection quality, not Cuban motion; and Cha Cha is not danced in a slot with an anchor.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Watch the lane the follower travels and how each pattern ends.' },
        { level: 2, title: 'Concept', content: 'The slot plus the anchor identifies this dance fastest.' },
        { level: 3, title: 'Specific clue', content: 'A narrow slot with a grounded settle is unmistakable.' },
        { level: 4, title: 'Guided solution', content: 'Choose West Coast Swing.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'WCS recognised' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 4,
          reason: 'Misidentifying the dance would apply the wrong criteria, especially the wrong spatial expectation.',
        },
      ],
      helpLinks: [{ topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' }],
      successFeedback: 'Slot, anchor, stretch — West Coast Swing, confirmed.',
      failureFeedback: 'A narrow slot with an anchored settle and extension/compression is West Coast Swing.',
    },
    {
      id: 'jws-001-c2',
      type: 'multiple-choice',
      title: 'A Hybrid Identity',
      difficulty: 'easy',
      tags: ['dance', 'judging', 'west-coast-swing', 'character'],
      storyContext:
        'A new judge insists West Coast Swing must be either purely smooth or purely rhythm, and wants to fault the couple for "mixing".',
      prompt: 'Is mixing smooth and rhythm a fault in West Coast Swing?',
      options: [
        {
          id: 'a',
          label: 'No — West Coast Swing is a hybrid by design: smooth glide combined with rhythmic check steps is exactly its identity.',
          isCorrect: true,
          feedback:
            'Correct. The blend of smooth travel and rhythmic checks is the dance, not a fault to penalise.',
        },
        {
          id: 'b',
          label: 'Yes — a dance must commit to one style, so mixing should be marked down.',
          isCorrect: false,
          feedback:
            'That rule fits some dances, but WCS is explicitly a hybrid; penalising the blend would penalise the dance itself.',
        },
        {
          id: 'c',
          label: 'Yes — smooth and rhythm belong to different competitions entirely.',
          isCorrect: false,
          feedback:
            'Within West Coast Swing, smooth and rhythm coexist by design; they are not separate here.',
        },
        {
          id: 'd',
          label: 'Only when the music is slow — fast WCS should be pure rhythm.',
          isCorrect: false,
          feedback:
            'Tempo does not remove the hybrid identity; the smooth-plus-rhythm blend is present across tempos.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is WCS a single-style dance?' },
        { level: 2, title: 'Concept', content: 'West Coast Swing has a hybrid smooth-rhythm identity.' },
        { level: 3, title: 'Specific clue', content: 'Smooth glide + rhythmic checks is the dance, not a mix-up.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — it is a hybrid by design."' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Hybrid understood' }],
      consequences: [
        {
          type: 'stability',
          delta: -3,
          reason: 'Penalising the hybrid identity would put your marks at odds with the panel and the dance.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Smooth and rhythm together — that is West Coast Swing, not a fault.',
      failureFeedback: 'WCS is a hybrid by design; the smooth-plus-rhythm blend is its identity, not something to mark down.',
    },
  ],
  reflectionPrompt: 'What is the single biggest difference in how you will watch a West Coast Swing versus a Nightclub?',
  rewards: [{ type: 'xp', amount: 5, label: 'WCS module opened' }],
};
