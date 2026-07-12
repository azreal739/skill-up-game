import { MissionDefinition } from '@academy/content-model';

/** East Coast Swing module mission 4 — motion: the bouncy pulse and hip swing. */
export const judgeEcs004Motion: MissionDefinition = {
  id: 'judge-ecs-004-motion',
  campaignId: 'judge-east-coast-swing',
  title: 'Bounce and Swing',
  summary:
    'Swing motion is a lively down-up bounce from the knees and ankles, with a hip swing and release on the triples. Learn to judge whether the bounce is genuine and grounded.',
  difficulty: 'medium',
  learningObjectives: [
    'Identify the genuine down-up bounce from the base',
    'Recognise the hip swing and release on the triples',
    'Fault a stiff, bounce-less swing',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The bounce comes from the knees and ankles — grounded, springy, down-up — not from bobbing the head or shoulders. Add a hip swing on the triples and the swing comes alive. Stiff and level, and the motion is gone.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jec-004-c1',
      type: 'multiple-choice',
      title: 'Bounce or Stiff',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'east-coast-swing', 'motion'],
      storyContext:
        'A couple keeps the timing and rotates on the spot, but stays stiff and level — no down-up bounce through the knees at all, just feet changing.',
      prompt: 'How does the motion lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — moving the feet is enough for the motion lens.',
          isCorrect: false,
          feedback:
            'Feet alone are not the swing’s motion; the lively down-up bounce through the base is defining, and it is missing.',
        },
        {
          id: 'b',
          label: 'Full marks — as long as they rotate on the spot, the bounce does not matter.',
          isCorrect: false,
          feedback:
            'Rotating on the spot is spatial structure. The down-up bounce is the motion of the dance, and it is absent.',
        },
        {
          id: 'c',
          label: 'A motion fault — the lively down-up bounce from the knees and ankles is the East Coast Swing’s defining body action, and a stiff, level body is missing it.',
          isCorrect: true,
          feedback:
            'Correct. The bounce is the dance’s engine; a stiff, level body scores down on motion.',
        },
        {
          id: 'd',
          label: 'A character issue only — stiffness just looks a bit joyless.',
          isCorrect: false,
          feedback:
            'It dulls the joy, but the concrete problem is the missing bounce — a motion quality.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the body bouncing down-up, or held stiff and level?' },
        { level: 2, title: 'Concept', content: 'The down-up bounce is the swing’s defining motion.' },
        { level: 3, title: 'Specific clue', content: 'Stiff and level is missing the bounce.' },
        { level: 4, title: 'Guided solution', content: 'Choose the motion fault for the stiff body.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Bounce judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding a stiff swing would erase its defining down-up bounce.',
        },
      ],
      helpLinks: [{ topicId: 'dance.east-coast-swing', label: 'Judging the East Coast Swing' }],
      successFeedback: 'No bounce, no swing motion. Marked down correctly.',
      failureFeedback: 'The lively down-up bounce from the knees and ankles is the swing’s defining motion; a stiff, level body is a motion fault.',
    },
    {
      id: 'jec-004-c2',
      type: 'multiple-choice',
      title: 'Where the Bounce Comes From',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'east-coast-swing', 'motion'],
      storyContext:
        'One couple bobs the bounce with their heads and shoulders while the legs stay stiff; a second couple keeps the head level and springs the bounce from grounded knees and ankles with a hip swing on the triples.',
      prompt: 'On the motion lens, how do the two compare?',
      options: [
        {
          id: 'a',
          label: 'The second couple is genuine — the bounce should spring from grounded knees and ankles with a hip swing, while the first faked the look by bobbing the head and shoulders over stiff legs.',
          isCorrect: true,
          feedback:
            'Right. A grounded down-up bounce from the base with a hip swing is real swing motion; head-and-shoulder bobbing over stiff legs is a fake.',
        },
        {
          id: 'b',
          label: 'The first couple is better — visible head and shoulder movement shows more energy.',
          isCorrect: false,
          feedback:
            'Visible bobbing is not the swing’s motion; a bounce faked from the top over stiff legs is the fault, not the strength.',
        },
        {
          id: 'c',
          label: 'They are equal — any up-and-down movement counts as the bounce.',
          isCorrect: false,
          feedback:
            'Not any movement — the swing’s bounce is specifically a grounded down-up from the knees and ankles, not head-and-shoulder bobbing.',
        },
        {
          id: 'd',
          label: 'Neither — the East Coast Swing should have no vertical movement at all.',
          isCorrect: false,
          feedback:
            'The swing is defined by its lively down-up bounce; removing all vertical movement removes the motion.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Where should the bounce come from — the base or the top?' },
        { level: 2, title: 'Concept', content: 'Genuine swing motion springs from grounded knees and ankles.' },
        { level: 3, title: 'Specific clue', content: 'Head-and-shoulder bobbing over stiff legs is a fake.' },
        { level: 4, title: 'Guided solution', content: 'Choose the second, grounded couple as genuine.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Genuine bounce credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Crediting a faked bounce over a grounded one would teach couples to bob from the top instead of spring from the base.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.motion', label: 'Motion and Body Action' },
        { topicId: 'dance.east-coast-swing', label: 'Judging the East Coast Swing' },
      ],
      successFeedback: 'Grounded bounce with a hip swing beats head-and-shoulder bobbing. Motion, judged.',
      failureFeedback: 'Genuine swing motion springs from grounded knees and ankles with a hip swing; bobbing the head and shoulders over stiff legs is a fake.',
    },
  ],
  reflectionPrompt: 'How would you tell a couple to find the bounce "in the floor" rather than in their shoulders?',
  rewards: [{ type: 'xp', amount: 5, label: 'Swing motion trained' }],
};
