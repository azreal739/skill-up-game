import { MissionDefinition } from '@academy/content-model';

/** Nightclub module mission 2 — timing: 4/4 slow-quick-quick. */
export const judgeNightclub002Timing: MissionDefinition = {
  id: 'judge-nightclub-002-timing',
  campaignId: 'judge-nightclub',
  title: 'Slow, Quick, Quick',
  summary:
    'The Nightclub rides a 4/4 slow-quick-quick. Learn to confirm the timing and hear the long step that leads each phrase.',
  difficulty: 'easy',
  learningObjectives: [
    'Confirm 4/4 time for the Nightclub',
    'Recognise the slow-quick-quick placement',
    'Tell a mis-timed quick-quick-slow from the correct pattern',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Count it: slow… quick-quick. The long step opens the phrase; the two quicks answer it. Get the order wrong and you have a different dance.',
    },
  ],
  contextArtefacts: [
    {
      id: 'nc-count',
      type: 'message',
      title: 'Count sheet',
      content: '4/4: a long step held across two beats (slow), then two single-beat steps (quick, quick).',
    },
  ],
  challenges: [
    {
      id: 'jn-002-c1',
      type: 'multiple-choice',
      title: 'Which Beats Are Long?',
      difficulty: 'easy',
      tags: ['dance', 'judging', 'nightclub', 'timing'],
      storyContext: 'A Nightclub plays over the count sheet above.',
      prompt: 'Where does the long (slow) step fall in the slow-quick-quick pattern?',
      options: [
        {
          id: 'a',
          label: 'Last — the two quicks lead, then the slow finishes the phrase.',
          isCorrect: false,
          feedback:
            'That is quick-quick-slow, the Two Step feel. The Nightclub opens with the slow.',
        },
        {
          id: 'b',
          label: 'First — the long slow step opens the phrase, then two quicks answer it.',
          isCorrect: true,
          feedback:
            'Correct. Slow leads, quick-quick follows — the Nightclub signature.',
        },
        {
          id: 'c',
          label: 'In the middle — quick, slow, quick.',
          isCorrect: false,
          feedback:
            'A slow sandwiched between quicks is neither the Nightclub nor a standard pattern; the slow leads here.',
        },
        {
          id: 'd',
          label: 'There is no long step — all three are equal.',
          isCorrect: false,
          feedback:
            'Equal steps would erase the slow-quick-quick contrast that defines the rhythm.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Say the pattern aloud: slow-quick-quick.' },
        { level: 2, title: 'Concept', content: 'The slow leads the Nightclub phrase.' },
        { level: 3, title: 'Specific clue', content: 'Long step first, two quicks after.' },
        { level: 4, title: 'Guided solution', content: 'Choose "First — the slow opens the phrase."' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Slow placed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 4,
          reason: 'Mis-hearing the pattern would confuse the Nightclub with a quick-quick-slow dance.',
        },
      ],
      helpLinks: [{ topicId: 'dance.nightclub', label: 'Judging the Nightclub' }],
      successFeedback: 'Slow first, then quick-quick. The phrase reads correctly.',
      failureFeedback: 'The Nightclub opens with the slow: slow-quick-quick, not quick-quick-slow.',
    },
    {
      id: 'jn-002-c2',
      type: 'multiple-choice',
      title: 'Right Steps, Wrong Order',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'nightclub', 'timing'],
      storyContext:
        'A couple dances cleanly and on the beat, but consistently leads with two quicks and finishes on the slow — quick-quick-slow — across the whole routine.',
      prompt: 'How does the timing lens read this?',
      options: [
        {
          id: 'a',
          label: 'Fine — they are on the beat, and the order of slow and quick does not matter.',
          isCorrect: false,
          feedback:
            'Being on the beat is necessary but not sufficient. The rhythmic ORDER defines the dance, and theirs is inverted.',
        },
        {
          id: 'b',
          label: 'Fine — quick-quick-slow and slow-quick-quick are the same pattern reversed.',
          isCorrect: false,
          feedback:
            'They are not interchangeable. Quick-quick-slow is a different dance’s feel; for a Nightclub it is a timing fault.',
        },
        {
          id: 'c',
          label: 'Top marks on character — committing fully to a pattern shows confidence.',
          isCorrect: false,
          feedback:
            'Confidence is character, and this is a timing question. Confidently dancing the wrong pattern is still a timing fault.',
        },
        {
          id: 'd',
          label: 'A timing fault — leading with the quicks inverts the Nightclub’s slow-quick-quick, even though they are on the beat.',
          isCorrect: true,
          feedback:
            'Correct. On-beat but wrong order is a real timing fault for a Nightclub; the slow must open the phrase.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does the order of slow and quick matter?' },
        { level: 2, title: 'Concept', content: 'The rhythmic order defines the dance, not just being on the beat.' },
        { level: 3, title: 'Specific clue', content: 'Quick-quick-slow is inverted for a Nightclub.' },
        { level: 4, title: 'Guided solution', content: 'Choose the timing fault for inverted order.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Order judged' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Accepting an inverted pattern as correct would put your timing marks out of step with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.timing', label: 'Timing and Time Signature' },
        { topicId: 'dance.nightclub', label: 'Judging the Nightclub' },
      ],
      successFeedback: 'On the beat, wrong order — still a timing fault. The slow leads a Nightclub.',
      failureFeedback: 'The rhythmic order defines the dance; leading with quicks inverts the Nightclub’s slow-quick-quick.',
    },
  ],
  reflectionPrompt: 'Which other dance does a quick-quick-slow pattern belong to, and how would you tell them apart otherwise?',
  rewards: [{ type: 'xp', amount: 5, label: 'Nightclub timing trained' }],
};
