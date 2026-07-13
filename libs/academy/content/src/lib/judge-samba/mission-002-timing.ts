import { MissionDefinition } from '@academy/content-model';

/** Samba module mission 2 — timing: the syncopated 1-a-2. */
export const judgeSamba002Timing: MissionDefinition = {
  id: 'judge-samba-002-timing',
  campaignId: 'judge-samba',
  title: 'One-a-Two',
  summary:
    'The Samba rides a syncopated 1-a-2 in 2/4. Learn to confirm the count and hear the quick "a" that splits the beat.',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm the syncopated 1-a-2 structure',
    'Hear the "a" that splits the beat unevenly',
    'Distinguish it from an even 1-2',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Count it: 1 a 2. The beat is split unevenly — a long "1", a quick "a", then "2". Flatten it into an even 1-2 and the Samba syncopation is gone.',
    },
  ],
  contextArtefacts: [
    {
      id: 'samba-count',
      type: 'message',
      title: 'Count sheet',
      content: '2/4: "1 a 2" — an uneven split (roughly ¾ · ¼ · 1). The quick "a" is the syncopation that drives the Samba.',
    },
  ],
  challenges: [
    {
      id: 'jsm-002-c1',
      type: 'multiple-choice',
      title: 'Where the Syncopation Lives',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'samba', 'timing'],
      storyContext: 'A Samba plays over the count sheet above.',
      prompt: 'Where does the Samba’s syncopation come from in the count?',
      options: [
        {
          id: 'a',
          label: 'From landing evenly on 1 and 2 with nothing between.',
          isCorrect: false,
          feedback:
            'Even 1-2 with nothing between is exactly the un-syncopated fault; the syncopation lives in the quick "a".',
        },
        {
          id: 'b',
          label: 'From holding both beats equally long.',
          isCorrect: false,
          feedback:
            'Equal-length beats remove the uneven split; the syncopation is the quick "a", not equal beats.',
        },
        {
          id: 'c',
          label: 'From the quick "a" that splits the beat unevenly — the 1-a-2 with its long-quick-slow feel gives the syncopation.',
          isCorrect: true,
          feedback:
            'Correct. The quick "a" splitting the beat unevenly is exactly where the Samba’s syncopation comes from.',
        },
        {
          id: 'd',
          label: 'From slowing every step down evenly.',
          isCorrect: false,
          feedback:
            'Even, slowed steps remove the syncopation; the "a" is quick and uneven.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Say the count aloud: one-a-two.' },
        { level: 2, title: 'Concept', content: 'The "a" carries the syncopation.' },
        { level: 3, title: 'Specific clue', content: 'A quick split between the numbers.' },
        { level: 4, title: 'Guided solution', content: 'Choose the quick "a" that splits the beat.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Syncopation located' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Missing where the syncopation lives would misjudge whether a Samba has its drive at all.',
        },
      ],
      helpLinks: [{ topicId: 'dance.samba', label: 'Judging the Samba' }],
      successFeedback: 'The syncopation lives in the quick "a". Located.',
      failureFeedback: 'The Samba’s syncopation comes from the quick "a" that splits the beat unevenly — 1 a 2.',
    },
    {
      id: 'jsm-002-c2',
      type: 'multiple-choice',
      title: 'Syncopated or Even',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'samba', 'timing'],
      storyContext:
        'A couple keeps the tempo but steps an even 1-2, evening out the split so the quick "a" disappears entirely.',
      prompt: 'How does the timing lens read this against a Samba?',
      options: [
        {
          id: 'a',
          label: 'Perfect — even beats are the cleanest timing.',
          isCorrect: false,
          feedback:
            'An even 1-2 is exactly what a Samba is not; the syncopated "a" is part of the timing.',
        },
        {
          id: 'b',
          label: 'A timing fault — evening the split into a flat 1-2 has lost the syncopated "a" that gives the Samba its rhythm.',
          isCorrect: true,
          feedback:
            'Correct. On the tempo but with no "a" split is a timing fault for a Samba.',
        },
        {
          id: 'c',
          label: 'Fine — the syncopation is optional as long as the tempo holds.',
          isCorrect: false,
          feedback:
            'The syncopation is not optional; without it the dance loses its Samba timing and feel.',
        },
        {
          id: 'd',
          label: 'Better — an even count is easier to follow.',
          isCorrect: false,
          feedback:
            'Ease of following is not the criterion; the flat 1-2 has lost the Samba’s syncopation.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is an even 1-2 a Samba?' },
        { level: 2, title: 'Concept', content: 'The syncopated "a" is part of the Samba timing.' },
        { level: 3, title: 'Specific clue', content: 'No "a" = an even count, not a Samba.' },
        { level: 4, title: 'Guided solution', content: 'Choose the timing fault for the flat 1-2.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Even count caught' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Rewarding an even 1-2 as a clean Samba would put your marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.timing', label: 'Timing and Time Signature' },
        { topicId: 'dance.samba', label: 'Judging the Samba' },
      ],
      successFeedback: 'On tempo, no "a" — a timing fault. The Samba is syncopated.',
      failureFeedback: 'Evening the split into a flat 1-2 has lost the syncopated "a" that gives a Samba its rhythm.',
    },
  ],
  reflectionPrompt: 'How would you describe the difference between a syncopated 1-a-2 and an even 1-2 in one sentence?',
  rewards: [{ type: 'xp', amount: 5, label: 'Samba timing trained' }],
};
