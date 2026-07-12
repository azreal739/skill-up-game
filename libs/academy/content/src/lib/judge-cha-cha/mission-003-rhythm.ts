import { MissionDefinition } from '@academy/content-model';

/** Cha Cha module mission 3 — rhythm: a crisp, even chasse with & emphasis. */
export const judgeChaCha003Rhythm: MissionDefinition = {
  id: 'judge-cha-cha-003-rhythm',
  campaignId: 'judge-cha-cha',
  title: 'Crisp, Not Crushed',
  summary:
    'Cha Cha rhythm lives in a crisp, even chasse with sharp emphasis on the "&". Learn to hear whether the triple is clean or blurred.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge chasse crispness and evenness',
    'Hear the sharp "&" emphasis',
    'Separate a clean chasse from a blurred shuffle',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The chasse should be three crisp, even steps with a sharp "and". Blurred into a mushy shuffle, the rhythm is gone even if the count still lands.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jcc-003-c1',
      type: 'multiple-choice',
      title: 'Even Chasse',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'cha-cha', 'rhythm'],
      storyContext:
        'A couple blurs the 4&5 into a soft, uneven shuffle — the middle "&" step almost vanishing — though they still land on the following 1.',
      prompt: 'How does the rhythm lens read this?',
      options: [
        {
          id: 'a',
          label: 'Marked down — a blurred, uneven chasse loses the crisp Cha Cha rhythm, even though they land on the next beat.',
          isCorrect: true,
          feedback:
            'Correct. Landing on 1 is timing; the crispness and evenness of the chasse is rhythm, and a mushy chasse scores down.',
        },
        {
          id: 'b',
          label: 'Full marks — landing on the next 1 means the rhythm is fine.',
          isCorrect: false,
          feedback:
            'Arrival is timing. The rhythm lens also judges whether the chasse itself was crisp and even.',
        },
        {
          id: 'c',
          label: 'A motion fault only — footwork clarity has nothing to do with rhythm.',
          isCorrect: false,
          feedback:
            'The articulation of the chasse is a rhythm quality; a blurred triple is a rhythm mark-down.',
        },
        {
          id: 'd',
          label: 'Better — softening the chasse makes it look smoother.',
          isCorrect: false,
          feedback:
            'A soft, blurred chasse is not smoothness; it loses the crisp cha-cha-cha the rhythm needs.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is landing on 1 the same as a crisp chasse?' },
        { level: 2, title: 'Concept', content: 'Rhythm judges chasse crispness and evenness.' },
        { level: 3, title: 'Specific clue', content: 'A vanishing "&" is a blurred chasse.' },
        { level: 4, title: 'Guided solution', content: 'Choose the rhythm mark-down for the blurred chasse.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Chasse quality judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting blurred chasses would let the Cha Cha’s core rhythm quality erode unremarked.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'On the beat, but the chasse was mushy — a rhythm mark-down. Sharp ears.',
      failureFeedback: 'The rhythm lens judges chasse crispness; a blurred, uneven triple scores down even when on the beat.',
    },
    {
      id: 'jcc-003-c2',
      type: 'multiple-choice',
      title: 'Playing the And',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'cha-cha', 'rhythm'],
      storyContext:
        'An advanced couple sharpens the emphasis on the 4& and 8& — a controlled, musical accent that lands cleanly back into the basic.',
      prompt: 'How should the rhythm lens read this?',
      options: [
        {
          id: 'a',
          label: 'A fault — adding emphasis changes the written rhythm, so it is wrong.',
          isCorrect: false,
          feedback:
            'Strong "&" emphasis is part of the Cha Cha, not a deviation from it; controlled accenting is a credit.',
        },
        {
          id: 'b',
          label: 'A timing error — any extra emphasis must throw off the count.',
          isCorrect: false,
          feedback:
            'Controlled emphasis coexists with correct timing; it is a rhythm quality, not a timing error.',
        },
        {
          id: 'c',
          label: 'A rhythmic credit — sharp, controlled emphasis on the 4& and 8& is exactly the Cha Cha’s signature rhythm.',
          isCorrect: true,
          feedback:
            'Right. The strong "&" emphasis is core to the Cha Cha; the rhythm lens rewards it when controlled and musical.',
        },
        {
          id: 'd',
          label: 'A signature figure — accenting the "&" is a named figure.',
          isCorrect: false,
          feedback:
            'Accenting is a rhythm quality, not a named figure like a New Yorker or spot turn.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is strong "&" emphasis part of the Cha Cha or a deviation?' },
        { level: 2, title: 'Concept', content: 'The 4& and 8& emphasis is core Cha Cha rhythm.' },
        { level: 3, title: 'Specific clue', content: 'Controlled, musical accenting that resolves is a credit.' },
        { level: 4, title: 'Guided solution', content: 'Choose the rhythmic credit for the "&" emphasis.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Emphasis credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Marking correct "&" emphasis as an error would discourage the Cha Cha’s signature rhythm.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' },
        { topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' },
      ],
      successFeedback: 'Sharp, controlled "&" — the Cha Cha’s signature rhythm, credited.',
      failureFeedback: 'Strong, controlled emphasis on the 4& and 8& is core Cha Cha rhythm, not a fault.',
    },
  ],
  reflectionPrompt: 'How would you tell a crisp, intentional chasse apart from one that just happens to be fast?',
  rewards: [{ type: 'xp', amount: 5, label: 'Cha Cha rhythm trained' }],
};
