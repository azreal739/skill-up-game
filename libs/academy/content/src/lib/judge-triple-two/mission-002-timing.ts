import { MissionDefinition } from '@academy/content-model';

/** Triple Two module mission 2 — timing: slow-slow-triple-triple. */
export const judgeTripleTwo002Timing: MissionDefinition = {
  id: 'judge-triple-two-002-timing',
  campaignId: 'judge-triple-two',
  title: 'Slow, Slow, Triple, Triple',
  summary:
    'The Triple Two rides a 4/4 slow-slow-triple-triple. Learn to confirm the pattern and its two-walk, two-triple shape.',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm the slow-slow-triple-triple pattern',
    'Distinguish it from the Cha Cha chasse',
    'Recognise the two walks that open the phrase',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Count it: two slow walks, then two triples. Not a single chasse like the Cha Cha — two triples, and they should shape opposite ways.',
    },
  ],
  contextArtefacts: [
    {
      id: 'tt-count',
      type: 'message',
      title: 'Count sheet',
      content: '4/4: slow (walk), slow (walk), triple (1&2), triple (3&4) — two walks then two triples.',
    },
  ],
  challenges: [
    {
      id: 'jtt-002-c1',
      type: 'multiple-choice',
      title: 'How Many Triples?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'triple-two', 'timing'],
      storyContext: 'A couple dances two walking steps then a single triple, repeating that as their basic.',
      prompt: 'Does this match the Triple Two timing?',
      options: [
        {
          id: 'a',
          label: 'Yes — one triple after the walks is the Triple Two.',
          isCorrect: false,
          feedback:
            'The Triple Two has TWO triples after the two walks — slow-slow-triple-triple, not one triple.',
        },
        {
          id: 'b',
          label: 'No — the Triple Two is slow-slow-triple-triple: two walks then TWO triples, not one.',
          isCorrect: true,
          feedback:
            'Correct. The name is the timing: two walks, two triples. A single triple is a timing fault here.',
        },
        {
          id: 'c',
          label: 'Yes — the number of triples does not matter as long as they triple at some point.',
          isCorrect: false,
          feedback:
            'The count is specific: two triples. Dropping one changes the basic and is a timing fault.',
        },
        {
          id: 'd',
          label: 'No — the Triple Two has no triples at all, only walks.',
          isCorrect: false,
          feedback:
            'It absolutely has triples — two of them. Walks alone would be a different dance.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The name tells you the count.' },
        { level: 2, title: 'Concept', content: 'Slow-slow-triple-triple: two walks, two triples.' },
        { level: 3, title: 'Specific clue', content: 'One triple is one too few.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — it should be two triples."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Pattern confirmed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting a single triple as the basic would mis-score the Triple Two’s core timing.',
        },
      ],
      helpLinks: [{ topicId: 'dance.triple-two', label: 'Judging the Triple Two' }],
      successFeedback: 'Two walks, two triples. A single triple is a timing fault.',
      failureFeedback: 'The Triple Two is slow-slow-triple-triple — two walks then two triples, not one.',
    },
    {
      id: 'jtt-002-c2',
      type: 'multiple-choice',
      title: 'Triple Two or Cha Cha?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'triple-two', 'timing'],
      storyContext:
        'A judge cannot decide whether a travelling, triple-using dance is a Triple Two or a Cha Cha.',
      prompt: 'Which timing feature most cleanly separates them?',
      options: [
        {
          id: 'a',
          label: 'They cannot be told apart by timing at all.',
          isCorrect: false,
          feedback:
            'They can: the Triple Two opens with two walks and uses two triples; the Cha Cha uses the single 4&5 chasse.',
        },
        {
          id: 'b',
          label: 'The Cha Cha is in 3/4 and the Triple Two in 4/4.',
          isCorrect: false,
          feedback:
            'Both are 4/4. The distinguishing feature is the count structure, not the time signature.',
        },
        {
          id: 'c',
          label: 'Only the character tells them apart, never the timing.',
          isCorrect: false,
          feedback:
            'Character differs, but the timing is decisive: slow-slow-triple-triple vs the single 4&5 chasse.',
        },
        {
          id: 'd',
          label: 'The Triple Two’s slow-slow-triple-triple versus the Cha Cha’s single 4&5 chasse in a contained area.',
          isCorrect: true,
          feedback:
            'Correct. Two walks and two triples travelling, versus a single crisp chasse staying put, is the cleanest separator.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Compare the count structures.' },
        { level: 2, title: 'Concept', content: 'Slow-slow-triple-triple vs a single 4&5 chasse.' },
        { level: 3, title: 'Specific clue', content: 'Triple Two travels; Cha Cha stays contained.' },
        { level: 4, title: 'Guided solution', content: 'Choose the count-structure difference.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Dances separated' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Confusing the two dances would misapply the wrong criteria to whichever is really on the floor.',
        },
      ],
      helpLinks: [
        { topicId: 'dance.triple-two', label: 'Judging the Triple Two' },
        { topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' },
      ],
      successFeedback: 'Count structure is decisive: slow-slow-triple-triple vs the single chasse.',
      failureFeedback: 'The Triple Two’s slow-slow-triple-triple (travelling) separates it from the Cha Cha’s single 4&5 chasse (contained).',
    },
  ],
  reflectionPrompt: 'Beyond timing, what would confirm a Triple Two over a Cha Cha at a glance?',
  rewards: [{ type: 'xp', amount: 5, label: 'Triple Two timing trained' }],
};
