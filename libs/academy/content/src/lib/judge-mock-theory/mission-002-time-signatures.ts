import { MissionDefinition } from '@academy/content-model';

/** Mock Theory mission 2 — time signatures and counts across dances. */
export const judgeTheory002TimeSignatures: MissionDefinition = {
  id: 'judge-theory-002-time-signatures',
  campaignId: 'judge-mock-theory',
  title: 'Paper I — Time and Count',
  summary:
    'Revise the time signatures and counting structures of every dance you have studied.',
  difficulty: 'medium',
  learningObjectives: [
    'Recall each dance’s time signature',
    'Recall each dance’s counting structure',
    'Distinguish dances by count',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The fastest way to identify a dance is its time and count. The Waltz alone is 3/4; the rest sit in 4/4 with different structures.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jt-002-c1',
      type: 'multiple-choice',
      title: 'The Odd One Out',
      difficulty: 'easy',
      tags: ['dance', 'judging', 'timing'],
      storyContext: 'Of the dances you have studied, one sits in a different time signature from the others.',
      prompt: 'Which dance is in 3/4 while the others are in 4/4?',
      options: [
        {
          id: 'a',
          label: 'Waltz.',
          isCorrect: true,
          feedback:
            'Correct. The Waltz is in 3/4; Nightclub, West Coast Swing and Cha Cha are all 4/4.',
        },
        {
          id: 'b',
          label: 'Nightclub.',
          isCorrect: false,
          feedback:
            'Nightclub is 4/4 (slow-quick-quick), not 3/4.',
        },
        {
          id: 'c',
          label: 'West Coast Swing.',
          isCorrect: false,
          feedback:
            'WCS is 4/4, danced in six- and eight-count patterns.',
        },
        {
          id: 'd',
          label: 'Cha Cha.',
          isCorrect: false,
          feedback:
            'Cha Cha is 4/4 with the 4&5 chasse.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which dance counts in threes?' },
        { level: 2, title: 'Concept', content: 'Only one studied dance is 3/4.' },
        { level: 3, title: 'Specific clue', content: 'Rise and fall over six counts.' },
        { level: 4, title: 'Guided solution', content: 'Choose Waltz.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Signature recalled' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 4,
          reason: 'Confusing the time signatures would misidentify dances on sight.',
        },
      ],
      helpLinks: [{ topicId: 'judging.timing', label: 'Timing and Time Signature' }],
      successFeedback: 'Waltz in 3/4, the rest in 4/4. Time signature identifies fastest.',
      failureFeedback: 'The Waltz is the 3/4 dance; Nightclub, WCS and Cha Cha are all 4/4.',
    },
    {
      id: 'jt-002-c2',
      type: 'multiple-choice',
      title: 'Match the Count',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'timing'],
      storyContext: 'An exam question pairs each dance with its counting structure.',
      prompt: 'Which pairing is correct?',
      options: [
        {
          id: 'a',
          label: 'Nightclub → the 4&5 chasse.',
          isCorrect: false,
          feedback:
            'The 4&5 chasse is the Cha Cha. Nightclub is slow-quick-quick.',
        },
        {
          id: 'b',
          label: 'Waltz → quick-quick-slow-slow.',
          isCorrect: false,
          feedback:
            'Quick-quick-slow-slow is the Two Step feel; the Waltz counts an even 1-2-3.',
        },
        {
          id: 'c',
          label: 'Cha Cha → the 4&5 (and 8&) chasse.',
          isCorrect: true,
          feedback:
            'Correct. The chasse on 4&5 is the Cha Cha’s counting signature.',
        },
        {
          id: 'd',
          label: 'West Coast Swing → a single fixed six-count only.',
          isCorrect: false,
          feedback:
            'WCS uses BOTH six- and eight-count patterns, not a single fixed length.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which dance owns the chasse?' },
        { level: 2, title: 'Concept', content: 'Match each dance to its counting structure.' },
        { level: 3, title: 'Specific clue', content: 'Cha-cha-cha lands on 4&5.' },
        { level: 4, title: 'Guided solution', content: 'Choose Cha Cha → the 4&5 chasse.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Counts matched' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Mismatching counts to dances would cost marks and misjudge live dancing.',
        },
      ],
      helpLinks: [
        { topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' },
        { topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' },
      ],
      successFeedback: 'Cha Cha owns the 4&5 chasse. Counts matched.',
      failureFeedback: 'The 4&5 chasse is the Cha Cha; WCS uses both six- and eight-count patterns.',
    },
  ],
  reflectionPrompt: 'Which two dances would be easiest to confuse by count alone, and what else would you check?',
  rewards: [{ type: 'xp', amount: 5, label: 'Paper I timing done' }],
};
