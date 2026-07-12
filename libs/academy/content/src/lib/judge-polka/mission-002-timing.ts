import { MissionDefinition } from '@academy/content-model';

/** Polka module mission 2 — timing: the 1&2 3&4 lilt. */
export const judgePolka002Timing: MissionDefinition = {
  id: 'judge-polka-002-timing',
  campaignId: 'judge-polka',
  title: 'One-and-Two',
  summary:
    'The Polka rides a bright 1&2 3&4 lilt. Learn to confirm the count and hear the springing "and".',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm the 1&2 3&4 structure',
    'Hear the "&" that gives the lilt',
    'Distinguish it from an even march',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Count it: 1&2, 3&4. The "and" is where the lilt lives — a quick spring between the numbered beats. Flatten the "and" and the Polka is gone.',
    },
  ],
  contextArtefacts: [
    {
      id: 'polka-count',
      type: 'message',
      title: 'Count sheet',
      content: '4/4 or 2/4: 1 & 2, 3 & 4 — a springing triple feel, ball-ball-ball-flat.',
    },
  ],
  challenges: [
    {
      id: 'jpk-002-c1',
      type: 'multiple-choice',
      title: 'Where the Lilt Lives',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'polka', 'timing'],
      storyContext: 'A Polka plays over the count sheet above.',
      prompt: 'Where does the Polka’s lilt come from in the count?',
      options: [
        {
          id: 'a',
          label: 'From landing hard on 1 and 3 only, with nothing between.',
          isCorrect: false,
          feedback:
            'Hitting only the numbers with nothing between is a flat march — the lilt lives in the "and".',
        },
        {
          id: 'b',
          label: 'From the "&" between the numbers — the quick spring of 1&2, 3&4 gives the lilt.',
          isCorrect: true,
          feedback:
            'Correct. The springing "and" between beats is exactly where the Polka’s lilt comes from.',
        },
        {
          id: 'c',
          label: 'From slowing every step down evenly.',
          isCorrect: false,
          feedback:
            'Even, slowed steps remove the bright spring; the lilt is quick and up.',
        },
        {
          id: 'd',
          label: 'From holding beat 2 and 4 long.',
          isCorrect: false,
          feedback:
            'Holding the even beats long flattens the lilt; the spring is on the "and", not a held beat.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Say the count aloud: one-and-two.' },
        { level: 2, title: 'Concept', content: 'The "&" carries the lilt.' },
        { level: 3, title: 'Specific clue', content: 'A quick spring between the numbers.' },
        { level: 4, title: 'Guided solution', content: 'Choose the "&" between the numbers.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Lilt located' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Missing where the lilt lives would misjudge whether a Polka has its bounce at all.',
        },
      ],
      helpLinks: [{ topicId: 'dance.polka', label: 'Judging the Polka' }],
      successFeedback: 'The lilt lives in the "and". Located.',
      failureFeedback: 'The Polka’s lilt comes from the springing "&" between the numbers — 1&2, 3&4.',
    },
    {
      id: 'jpk-002-c2',
      type: 'multiple-choice',
      title: 'Lilt or March',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'polka', 'timing'],
      storyContext:
        'A couple keeps the 1-2-3-4 count perfectly but hits every beat flat and even, with no spring on the "and" — a flat march.',
      prompt: 'How does the timing/feel read against a Polka?',
      options: [
        {
          id: 'a',
          label: 'Perfect — hitting every beat evenly is the strongest timing.',
          isCorrect: false,
          feedback:
            'A flat, even march is exactly what a Polka is not; the springing "and" is part of the feel.',
        },
        {
          id: 'b',
          label: 'Fine — the lilt is optional as long as the numbers are on time.',
          isCorrect: false,
          feedback:
            'The lilt is not optional; without it the dance loses its Polka character and feel.',
        },
        {
          id: 'c',
          label: 'Better — an even march is easier to follow.',
          isCorrect: false,
          feedback:
            'Ease of following is not the criterion; the flat march has lost the Polka’s bright lilt.',
        },
        {
          id: 'd',
          label: 'It reads against the style — a flat, even march has lost the springing "and" that gives a Polka its lilt.',
          isCorrect: true,
          feedback:
            'Correct. On the numbers but with no "&" spring is a timing/feel fault for a Polka.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is a flat, even march a Polka?' },
        { level: 2, title: 'Concept', content: 'The springing "and" is part of the Polka feel.' },
        { level: 3, title: 'Specific clue', content: 'No lilt = a flat march, not a Polka.' },
        { level: 4, title: 'Guided solution', content: 'Choose that it reads against the style.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'March caught' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Rewarding a flat march as a clean Polka would put your marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.timing', label: 'Timing and Time Signature' },
        { topicId: 'dance.polka', label: 'Judging the Polka' },
      ],
      successFeedback: 'On the numbers, no lilt — reads against the style. Well heard.',
      failureFeedback: 'A flat, even march has lost the springing "and" that gives a Polka its lilt.',
    },
  ],
  reflectionPrompt: 'How would you describe the difference between a Polka’s lilt and a flat march in one sentence?',
  rewards: [{ type: 'xp', amount: 5, label: 'Polka timing trained' }],
};
