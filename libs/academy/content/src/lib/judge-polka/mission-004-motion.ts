import { MissionDefinition } from '@academy/content-model';

/** Polka module mission 4 — motion: the up/down pulse and forward poise. */
export const judgePolka004Motion: MissionDefinition = {
  id: 'judge-polka-004-motion',
  campaignId: 'judge-polka',
  title: 'Up, Down, Drive',
  summary:
    'Polka motion is a springy up/down pulse over a forward poise that drives the couple down the floor. Learn to judge whether the pulse is genuine.',
  difficulty: 'medium',
  learningObjectives: [
    'Identify the genuine up/down pulse',
    'Recognise forward poise driving the travel',
    'Fault a flat, pulse-less Polka',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The pulse rises and falls with the lilt, and a forward poise sends that energy down the floor. Flat, upright and static, the Polka has lost its engine.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jpk-004-c1',
      type: 'multiple-choice',
      title: 'Pulse or Flat',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'polka', 'motion'],
      storyContext:
        'A couple keeps the timing and travels, but stays flat and level — no up/down pulse in the body at all, just feet moving.',
      prompt: 'How does the motion lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — moving the feet is enough.',
          isCorrect: false,
          feedback:
            'Feet alone are not the Polka’s motion; the springy up/down pulse through the body is defining.',
        },
        {
          id: 'b',
          label: 'Full marks — as long as they travel, the pulse does not matter.',
          isCorrect: false,
          feedback:
            'Travel is spatial structure. The up/down pulse is the motion of the dance, and it is missing.',
        },
        {
          id: 'c',
          label: 'A motion fault — the springy up/down pulse is the Polka’s defining body action, and a flat, level body is missing it.',
          isCorrect: true,
          feedback:
            'Correct. The pulse is the dance’s engine; a flat, level body scores down on motion.',
        },
        {
          id: 'd',
          label: 'A character issue — flatness just looks less energetic.',
          isCorrect: false,
          feedback:
            'It dulls the energy, but the concrete problem is the missing pulse — a motion quality.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the body pulsing up and down, or flat?' },
        { level: 2, title: 'Concept', content: 'The up/down pulse is the Polka’s defining motion.' },
        { level: 3, title: 'Specific clue', content: 'Flat and level is missing the pulse.' },
        { level: 4, title: 'Guided solution', content: 'Choose the motion fault for the flat body.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Pulse judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding a flat Polka would erase its defining up/down pulse.',
        },
      ],
      helpLinks: [{ topicId: 'dance.polka', label: 'Judging the Polka' }],
      successFeedback: 'No pulse, no Polka motion. Marked down correctly.',
      failureFeedback: 'The springy up/down pulse is the Polka’s defining motion; a flat, level body is a motion fault.',
    },
    {
      id: 'jpk-004-c2',
      type: 'multiple-choice',
      title: 'Forward Poise',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'polka', 'motion'],
      storyContext:
        'A strong couple carries a slight forward poise that channels the up/down pulse into powerful forward travel down the floor.',
      prompt: 'What is the couple demonstrating on the motion lens?',
      options: [
        {
          id: 'a',
          label: 'Genuine Polka motion — a forward poise channelling the pulse into driving travel is exactly what the lens rewards.',
          isCorrect: true,
          feedback:
            'Right. The forward poise turning the pulse into drive is the Polka’s motion working as intended.',
        },
        {
          id: 'b',
          label: 'A balance fault — leaning forward means they are off balance.',
          isCorrect: false,
          feedback:
            'A controlled forward poise is not falling; it is the deliberate engine of the Polka’s drive.',
        },
        {
          id: 'c',
          label: 'A timing fault — poise must throw off the count.',
          isCorrect: false,
          feedback:
            'Forward poise coexists with correct timing; it is a motion quality, not a timing error.',
        },
        {
          id: 'd',
          label: 'A spatial-structure trait — poise only describes the floor path.',
          isCorrect: false,
          feedback:
            'Poise is a body action driving the travel; the floor path itself is a separate structure matter.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is controlled forward poise a fault or the engine?' },
        { level: 2, title: 'Concept', content: 'Forward poise channels the pulse into drive.' },
        { level: 3, title: 'Specific clue', content: 'Poise turns the up/down into forward power.' },
        { level: 4, title: 'Guided solution', content: 'Choose genuine Polka motion.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Poise credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Marking genuine forward poise as a balance fault would discourage correct Polka motion.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.motion', label: 'Motion and Body Action' },
        { topicId: 'dance.polka', label: 'Judging the Polka' },
      ],
      successFeedback: 'Forward poise turning pulse into drive — Polka motion, credited.',
      failureFeedback: 'A controlled forward poise channelling the pulse into driving travel is the intended Polka motion.',
    },
  ],
  reflectionPrompt: 'How would you tell a controlled forward poise apart from a couple simply falling forward?',
  rewards: [{ type: 'xp', amount: 5, label: 'Polka motion trained' }],
};
