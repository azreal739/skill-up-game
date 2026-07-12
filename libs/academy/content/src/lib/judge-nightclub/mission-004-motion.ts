import { MissionDefinition } from '@academy/content-model';

/** Nightclub module mission 4 — motion: sway and counter-sway from the base. */
export const judgeNightclub004Motion: MissionDefinition = {
  id: 'judge-nightclub-004-motion',
  campaignId: 'judge-nightclub',
  title: 'Sway From the Base',
  summary:
    'Nightclub sway must come from the base — feet, ankles, legs — not from tipping the upper body. Learn to judge where the movement is generated.',
  difficulty: 'medium',
  learningObjectives: [
    'Locate the source of the sway (base vs upper body)',
    'Reject upper-body tilt as a substitute',
    'Recognise genuine counter-sway',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The Nightclub’s signature fault: a couple looks like they are swaying, but it is all upper-body tilt over a dead base. Real sway grows from the floor up.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jn-004-c1',
      type: 'multiple-choice',
      title: 'Where the Sway Grows',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'nightclub', 'motion'],
      storyContext:
        'A couple produces a lovely-looking sway — but on a close look, their feet and legs are still, and the movement is entirely the torso tipping side to side.',
      prompt: 'How does the motion lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — the sway looks good from the audience, and that is what counts.',
          isCorrect: false,
          feedback:
            'The look is not enough. Nightclub sway must grow from the base; an upper-body tilt over a dead base is the classic fault.',
        },
        {
          id: 'b',
          label: 'Full marks — as long as the timing is right, the source of the movement is irrelevant.',
          isCorrect: false,
          feedback:
            'Timing is a different lens. Motion judges how the sway is produced, and this one is produced the wrong way.',
        },
        {
          id: 'c',
          label: 'A character issue — it only affects how romantic it looks.',
          isCorrect: false,
          feedback:
            'It may dull the romance, but the concrete problem is where the movement is generated — that is the motion lens.',
        },
        {
          id: 'd',
          label: 'A motion fault — genuine sway grows from the base (feet, ankles, legs), not from a tilting upper body over a still base.',
          isCorrect: true,
          feedback:
            'Correct. The source matters: base-driven sway is the dance; upper-body tilt is the substitute the lens must catch.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Watch the feet and legs, not just the torso.' },
        { level: 2, title: 'Concept', content: 'Nightclub sway is generated from the base.' },
        { level: 3, title: 'Specific clue', content: 'A still base with a tipping torso is the fake sway.' },
        { level: 4, title: 'Guided solution', content: 'Choose the motion fault about base-driven sway.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Source of sway judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting upper-body-tilt sway would reward the exact shortcut the dance is built to avoid.',
        },
      ],
      helpLinks: [{ topicId: 'dance.nightclub', label: 'Judging the Nightclub' }],
      successFeedback: 'You looked past the torso to the base. That is where Nightclub sway lives.',
      failureFeedback: 'Nightclub sway grows from the base; a tilting upper body over a still base is a motion fault.',
    },
    {
      id: 'jn-004-c2',
      type: 'multiple-choice',
      title: 'Counter-Sway',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'nightclub', 'motion'],
      storyContext:
        'A strong couple sways from the base one way, then answers it with a controlled counter-sway back through the base, keeping the frame soft and connected.',
      prompt: 'What is the couple demonstrating?',
      options: [
        {
          id: 'a',
          label: 'A timing fault — swaying two directions cannot be on time.',
          isCorrect: false,
          feedback:
            'Sway and counter-sway are perfectly compatible with correct timing; they are a motion quality, not a timing error.',
        },
        {
          id: 'b',
          label: 'Genuine base-driven motion — sway answered by a controlled counter-sway is exactly what the motion lens rewards.',
          isCorrect: true,
          feedback:
            'Right. Sway and counter-sway from the base, kept soft and connected, is Nightclub motion at its best.',
        },
        {
          id: 'c',
          label: 'A signature figure — counter-sway is a named Nightclub figure.',
          isCorrect: false,
          feedback:
            'Counter-sway is a motion quality, not a named figure like a diamond or pass.',
        },
        {
          id: 'd',
          label: 'Over-dancing — any extra movement should be marked down.',
          isCorrect: false,
          feedback:
            'Controlled counter-sway is not excess; it is the intended, credited body action for the Nightclub.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is a controlled answer to the sway a fault or a credit?' },
        { level: 2, title: 'Concept', content: 'Sway and counter-sway from the base are the Nightclub’s motion.' },
        { level: 3, title: 'Specific clue', content: 'Base-driven, soft and connected is the goal.' },
        { level: 4, title: 'Guided solution', content: 'Choose the genuine base-driven motion option.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Counter-sway credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Marking genuine counter-sway as over-dancing would discourage correct Nightclub motion.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.motion', label: 'Motion and Body Action' },
        { topicId: 'dance.nightclub', label: 'Judging the Nightclub' },
      ],
      successFeedback: 'Sway answered by counter-sway, all from the base. Credited, not faulted.',
      failureFeedback: 'Controlled sway and counter-sway from the base is the intended Nightclub motion — a credit.',
    },
  ],
  reflectionPrompt: 'What visual cue most reliably tells you a sway is base-driven rather than an upper-body tilt?',
  rewards: [{ type: 'xp', amount: 5, label: 'Nightclub motion trained' }],
};
