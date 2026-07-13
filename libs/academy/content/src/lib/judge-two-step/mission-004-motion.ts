import { MissionDefinition } from '@academy/content-model';

/** Two Step module mission 4 — motion: the smooth level glide, no bounce. */
export const judgeTwoStep004Motion: MissionDefinition = {
  id: 'judge-two-step-004-motion',
  campaignId: 'judge-two-step',
  title: 'Glide, Don’t Bounce',
  summary:
    'Two Step motion is a smooth, level glide — long reaching steps driving down the floor with no bounce. Learn to judge the glide and fault a borrowed swing bounce.',
  difficulty: 'medium',
  learningObjectives: [
    'Identify the smooth, level gliding drive',
    'Recognise long reaching steps that travel',
    'Fault a bouncy Two Step that has borrowed swing’s pulse',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The Two Step glides — the head stays level and the steps reach long down the floor. A bounce or up/down pulse belongs to swing, not here; a bouncing Two Step has borrowed the wrong motion.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jts-004-c1',
      type: 'multiple-choice',
      title: 'Level or Bouncing',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'two-step', 'motion'],
      storyContext:
        'A couple keeps the timing and travels, but bounces up and down through every step — a springy swing-style pulse in the knees rather than a level glide.',
      prompt: 'How does the motion lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — energy in the knees always looks lively.',
          isCorrect: false,
          feedback:
            'That bounce belongs to swing; the Two Step’s motion is a smooth, level glide, and the pulse is a fault here.',
        },
        {
          id: 'b',
          label: 'Full marks — as long as they travel, the bounce does not matter.',
          isCorrect: false,
          feedback:
            'Travel is spatial structure. The smooth, level glide is the motion of the dance, and a bounce breaks it.',
        },
        {
          id: 'c',
          label: 'A character issue — the bounce just looks a bit too energetic.',
          isCorrect: false,
          feedback:
            'It dulls the cool mood too, but the concrete problem is a bounce where there should be a level glide — a motion fault.',
        },
        {
          id: 'd',
          label: 'A motion fault — the Two Step’s defining motion is a smooth, level glide, and an up/down bounce has borrowed swing’s pulse instead of gliding.',
          isCorrect: true,
          feedback:
            'Correct. The bounce is the classic Two Step motion fault; the drive should stay level and smooth.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the body gliding level, or bouncing up and down?' },
        { level: 2, title: 'Concept', content: 'The smooth, level glide is the Two Step’s defining motion.' },
        { level: 3, title: 'Specific clue', content: 'A bounce is borrowed from swing — a fault here.' },
        { level: 4, title: 'Guided solution', content: 'Choose the motion fault for the bounce.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Glide judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding a bouncy Two Step would blur its smooth, level glide into swing.',
        },
      ],
      helpLinks: [{ topicId: 'dance.two-step', label: 'Judging the Two Step' }],
      successFeedback: 'A bounce where there should be a glide — marked down correctly. The Two Step stays level.',
      failureFeedback: 'The Two Step’s motion is a smooth, level glide; an up/down bounce has borrowed swing’s pulse and is a motion fault.',
    },
    {
      id: 'jts-004-c2',
      type: 'multiple-choice',
      title: 'Long Reaching Drive',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'two-step', 'motion'],
      storyContext:
        'A strong couple keeps the head level and reaches long through each step, sending a smooth, powerful glide down the floor with no vertical movement at all.',
      prompt: 'What is the couple demonstrating on the motion lens?',
      options: [
        {
          id: 'a',
          label: 'Genuine Two Step motion — a level head and long reaching steps driving a smooth glide is exactly what the lens rewards.',
          isCorrect: true,
          feedback:
            'Right. The level, long-reaching, gliding drive is the Two Step’s motion working as intended.',
        },
        {
          id: 'b',
          label: 'A fault — staying level with no bounce looks flat and lifeless.',
          isCorrect: false,
          feedback:
            'Level and smooth is not flat; it is the correct Two Step motion. A bounce would be the fault, not the strength.',
        },
        {
          id: 'c',
          label: 'A timing fault — long steps must throw off the count.',
          isCorrect: false,
          feedback:
            'Long reaching steps coexist with correct QQSS timing; they are a motion quality, not a timing error.',
        },
        {
          id: 'd',
          label: 'A spatial-structure trait — reach only describes the floor path.',
          isCorrect: false,
          feedback:
            'The reach is a body action driving the travel; the floor path itself is a separate structure matter.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is a level, long-reaching glide correct or a fault?' },
        { level: 2, title: 'Concept', content: 'Long reaching steps drive the smooth glide.' },
        { level: 3, title: 'Specific clue', content: 'Level head, no bounce, powerful reach.' },
        { level: 4, title: 'Guided solution', content: 'Choose genuine Two Step motion.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Glide credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Marking a correct level glide as flat would discourage the true Two Step motion.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.motion', label: 'Motion and Body Action' },
        { topicId: 'dance.two-step', label: 'Judging the Two Step' },
      ],
      successFeedback: 'Level head, long reach, smooth glide — Two Step motion, credited.',
      failureFeedback: 'A level head and long reaching steps driving a smooth glide is the intended Two Step motion, not a flat fault.',
    },
  ],
  reflectionPrompt: 'How would you coach a swing dancer to lose the bounce and find the Two Step glide?',
  rewards: [{ type: 'xp', amount: 5, label: 'Two Step motion trained' }],
};
