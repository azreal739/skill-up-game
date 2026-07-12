import { MissionDefinition } from '@academy/content-model';

/** Mock Theory mission 3 — rhythm patterns across dances. */
export const judgeTheory003Rhythms: MissionDefinition = {
  id: 'judge-theory-003-rhythms',
  campaignId: 'judge-mock-theory',
  title: 'Paper II — Rhythm',
  summary: 'Revise the slow/quick and triple rhythms that give each dance its feel.',
  difficulty: 'medium',
  learningObjectives: [
    'Recall each dance’s rhythmic pattern',
    'Distinguish slow-quick-quick from quick-quick-slow',
    'Match a rhythm to its dance',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Two dances can share a time signature but ride different rhythms. Know each pattern by heart.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jt-003-c1',
      type: 'multiple-choice',
      title: 'Whose Rhythm?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'rhythm'],
      storyContext: 'An exam question gives a rhythm: a long step leading two shorter ones.',
      prompt: 'Which dance rides slow-quick-quick?',
      options: [
        {
          id: 'a',
          label: 'Cha Cha.',
          isCorrect: false,
          feedback:
            'The Cha Cha rides the 4&5 chasse, not slow-quick-quick.',
        },
        {
          id: 'b',
          label: 'Waltz.',
          isCorrect: false,
          feedback:
            'The Waltz flows an even three, not slow-quick-quick.',
        },
        {
          id: 'c',
          label: 'West Coast Swing.',
          isCorrect: false,
          feedback:
            'WCS is built from walks and triples across six- and eight-count patterns, not a slow-quick-quick.',
        },
        {
          id: 'd',
          label: 'Nightclub.',
          isCorrect: true,
          feedback:
            'Correct. Nightclub leads with the slow, then two quicks — slow-quick-quick.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which dance opens each phrase with a long step?' },
        { level: 2, title: 'Concept', content: 'Slow-quick-quick is one dance’s signature.' },
        { level: 3, title: 'Specific clue', content: 'Soft, romantic, contained.' },
        { level: 4, title: 'Guided solution', content: 'Choose Nightclub.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Rhythm matched' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Confusing rhythms would misidentify dances and misjudge their timing.',
        },
      ],
      helpLinks: [{ topicId: 'dance.nightclub', label: 'Judging the Nightclub' }],
      successFeedback: 'Slow-quick-quick is the Nightclub. Recalled.',
      failureFeedback: 'Slow-quick-quick — a long lead step then two quicks — is the Nightclub.',
    },
    {
      id: 'jt-003-c2',
      type: 'multiple-choice',
      title: 'Order Matters',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'rhythm'],
      storyContext: 'A candidate writes that slow-quick-quick and quick-quick-slow are "the same rhythm reversed, so interchangeable".',
      prompt: 'Is that correct?',
      options: [
        {
          id: 'a',
          label: 'Yes — reversing a pattern keeps it the same dance.',
          isCorrect: false,
          feedback:
            'Reversing the order changes which dance it is; the two are not interchangeable.',
        },
        {
          id: 'b',
          label: 'No — the order defines the dance: slow-quick-quick (Nightclub) is not the same as quick-quick-slow (Two Step feel).',
          isCorrect: true,
          feedback:
            'Correct. Order is not cosmetic; it distinguishes dances and is judged as timing/rhythm.',
        },
        {
          id: 'c',
          label: 'Yes — as long as the durations exist, order is a stylistic choice.',
          isCorrect: false,
          feedback:
            'Order is not merely stylistic; leading with the slow vs the quicks is a different dance.',
        },
        {
          id: 'd',
          label: 'Only fast dances care about order.',
          isCorrect: false,
          feedback:
            'Tempo is irrelevant; the order of slow and quick defines the pattern at any speed.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does leading with the slow vs the quick change the dance?' },
        { level: 2, title: 'Concept', content: 'Rhythmic order defines the dance.' },
        { level: 3, title: 'Specific clue', content: 'Slow-quick-quick ≠ quick-quick-slow.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — order defines the dance."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Order understood' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Treating patterns as interchangeable would confuse whole dances on the paper and the floor.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'Order defines the dance. Not interchangeable.',
      failureFeedback: 'Rhythmic order defines the dance: slow-quick-quick is not the same as quick-quick-slow.',
    },
  ],
  reflectionPrompt: 'Beyond rhythm, what would you check to separate two dances that share a time signature?',
  rewards: [{ type: 'xp', amount: 5, label: 'Paper II rhythm done' }],
};
