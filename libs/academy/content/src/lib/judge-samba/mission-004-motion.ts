import { MissionDefinition } from '@academy/content-model';

/** Samba module mission 4 — motion: the knee-driven Samba bounce. */
export const judgeSamba004Motion: MissionDefinition = {
  id: 'judge-samba-004-motion',
  campaignId: 'judge-samba',
  title: 'The Samba Bounce',
  summary:
    'Samba motion is the bounce action — a controlled down-up pulse from the knees and ankles, tied to the syncopation. Learn to judge whether the bounce is genuine and knee-driven.',
  difficulty: 'medium',
  learningObjectives: [
    'Identify the genuine knee-driven bounce action',
    'Recognise the bounce tied to the 1-a-2',
    'Fault a flat Samba or a faked upper-body hop',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The Samba bounce comes from the knees and ankles — a fine, controlled down-up pulse timed to the "a". Flat and static it is missing; hopped from the upper body it is faked.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jsm-004-c1',
      type: 'multiple-choice',
      title: 'Bounce or Flat',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'samba', 'motion'],
      storyContext:
        'A couple keeps the timing and travels, but stays flat and static — no bounce action in the knees at all, just steps on the syncopation.',
      prompt: 'How does the motion lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — stepping on the syncopation is enough.',
          isCorrect: false,
          feedback:
            'Steps alone are not the Samba’s motion; the knee-driven bounce action is defining, and it is missing.',
        },
        {
          id: 'b',
          label: 'Full marks — as long as they travel, the bounce does not matter.',
          isCorrect: false,
          feedback:
            'Travel is spatial structure. The bounce action is the motion of the dance, and it is absent.',
        },
        {
          id: 'c',
          label: 'A motion fault — the knee-driven bounce action is the Samba’s defining body action, and a flat, static body is missing it.',
          isCorrect: true,
          feedback:
            'Correct. The bounce is the dance’s engine; a flat, static body scores down on motion.',
        },
        {
          id: 'd',
          label: 'A character issue — flatness just looks a little less festive.',
          isCorrect: false,
          feedback:
            'It dulls the carnival feel too, but the concrete problem is the missing bounce action — a motion quality.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the body bouncing from the knees, or flat and static?' },
        { level: 2, title: 'Concept', content: 'The knee-driven bounce action is the Samba’s defining motion.' },
        { level: 3, title: 'Specific clue', content: 'Flat and static is missing the bounce.' },
        { level: 4, title: 'Guided solution', content: 'Choose the motion fault for the flat body.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Bounce judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding a flat Samba would erase its defining bounce action.',
        },
      ],
      helpLinks: [{ topicId: 'dance.samba', label: 'Judging the Samba' }],
      successFeedback: 'No bounce, no Samba motion. Marked down correctly.',
      failureFeedback: 'The knee-driven bounce action is the Samba’s defining motion; a flat, static body is a motion fault.',
    },
    {
      id: 'jsm-004-c2',
      type: 'multiple-choice',
      title: 'Knee-Driven or Hopped',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'samba', 'motion'],
      storyContext:
        'One couple fakes the bounce with a big up-and-down hop from the shoulders while the legs stay stiff; a second couple keeps the frame steady and drives a subtle, controlled bounce from the knees and ankles on the "a".',
      prompt: 'On the motion lens, how do the two compare?',
      options: [
        {
          id: 'a',
          label: 'The first couple is better — a bigger, more visible bounce shows more energy.',
          isCorrect: false,
          feedback:
            'A big hop from the shoulders is a fake; the Samba bounce is a controlled knee-driven action, not a visible upper-body hop.',
        },
        {
          id: 'b',
          label: 'The second couple is genuine — the Samba bounce should be a controlled knee-and-ankle action tied to the syncopation, while the first faked it with an upper-body hop over stiff legs.',
          isCorrect: true,
          feedback:
            'Right. A controlled knee-driven bounce is real Samba motion; a shoulder hop over stiff legs is a fake.',
        },
        {
          id: 'c',
          label: 'They are equal — any up-and-down movement counts as the bounce.',
          isCorrect: false,
          feedback:
            'Not any movement — the Samba bounce is specifically a controlled knee-and-ankle action, not a shoulder hop.',
        },
        {
          id: 'd',
          label: 'Neither — the Samba should have no vertical movement at all.',
          isCorrect: false,
          feedback:
            'The Samba is defined by its bounce action; removing all bounce removes the motion.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Where should the bounce come from — the knees or the shoulders?' },
        { level: 2, title: 'Concept', content: 'Genuine Samba motion is a controlled knee-and-ankle bounce.' },
        { level: 3, title: 'Specific clue', content: 'A big shoulder hop over stiff legs is a fake.' },
        { level: 4, title: 'Guided solution', content: 'Choose the second, knee-driven couple as genuine.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Genuine bounce credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Crediting a faked hop over a knee-driven bounce would teach couples to bounce from the shoulders.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.motion', label: 'Motion and Body Action' },
        { topicId: 'dance.samba', label: 'Judging the Samba' },
      ],
      successFeedback: 'Knee-driven bounce beats a shoulder hop. Motion, judged.',
      failureFeedback: 'Genuine Samba motion is a controlled knee-and-ankle bounce tied to the syncopation; a shoulder hop over stiff legs is a fake.',
    },
  ],
  reflectionPrompt: 'How would you coach a couple to find the bounce "in the knees" rather than hopping from the shoulders?',
  rewards: [{ type: 'xp', amount: 5, label: 'Samba motion trained' }],
};
