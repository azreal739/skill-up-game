import { MissionDefinition } from '@academy/content-model';

/** Waltz module mission 2 — timing: 3/4 and its accents. */
export const judgeWaltz002Timing: MissionDefinition = {
  id: 'judge-waltz-002-timing',
  campaignId: 'judge-waltz',
  title: 'Three-Beat Standard',
  summary:
    'The Waltz lives in 3/4. Learn where its musical accents fall — and how they differ from where the body expresses.',
  difficulty: 'easy',
  learningObjectives: [
    'Confirm 3/4 time from the count',
    'Place the musical accents on 1 and 4',
    'Separate musical accents from dance accents',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Count the Waltz over two bars: 1 2 3, 4 5 6. The music swells on 1 and 4. Where the couple extends — usually 2 and 5 — is a different thing entirely.',
    },
  ],
  contextArtefacts: [
    {
      id: 'waltz-count',
      type: 'message',
      title: 'Count sheet',
      content: 'Two 3/4 bars: 1 2 3 | 4 5 6. The music swells at the start of each bar.',
    },
  ],
  challenges: [
    {
      id: 'jw-002-c1',
      type: 'multiple-choice',
      title: 'Where the Music Swells',
      difficulty: 'easy',
      tags: ['dance', 'judging', 'waltz', 'timing'],
      storyContext: 'A Waltz plays over the two-bar count on the sheet.',
      prompt: 'Which counts carry the main musical accents?',
      options: [
        {
          id: 'a',
          label: '1 and 4 — the downbeat of each 3/4 bar.',
          isCorrect: true,
          feedback:
            'Correct. In a two-bar Waltz phrase the music swells on 1 and 4 — the couple’s rise should ride those.',
        },
        {
          id: 'b',
          label: '3 and 6 — the last beat of each bar.',
          isCorrect: false,
          feedback:
            'The end of each bar is the softest point, where the fall completes — not the accent.',
        },
        {
          id: 'c',
          label: 'Every beat equally — a Waltz is metronomic.',
          isCorrect: false,
          feedback:
            'Even emphasis is a metronome. A Waltz rises and falls; the music does not hit all six counts the same.',
        },
        {
          id: 'd',
          label: '2 and 5 — where the dancers extend.',
          isCorrect: false,
          feedback:
            '2 and 5 are commonly DANCE accents (where the body expresses). The MUSICAL accents are 1 and 4.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The downbeat of a 3/4 bar is beat 1.' },
        { level: 2, title: 'Concept', content: 'Musical accents fall on the downbeat of each bar: 1 and 4.' },
        { level: 3, title: 'Specific clue', content: 'Do not pick where the body extends (2 and 5).' },
        { level: 4, title: 'Guided solution', content: 'Choose 1 and 4.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Accents placed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 4,
          reason: 'Misplacing the musical accents would misjudge whether every Waltz couple is on the music.',
        },
      ],
      helpLinks: [{ topicId: 'judging.timing', label: 'Timing and Time Signature' }],
      successFeedback: 'Downbeats found: 1 and 4. Now the rise and fall has something to ride.',
      failureFeedback: 'Musical accents are the downbeats — 1 and 4 — not where the body extends (2 and 5).',
    },
    {
      id: 'jw-002-c2',
      type: 'multiple-choice',
      title: 'Musical or Dance Accent?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'waltz', 'timing'],
      storyContext:
        'A judge argues a Waltz couple is "off the music" because their biggest body extension lands on 2, not on the musical accent at 1.',
      prompt: 'Is the couple off the music?',
      options: [
        {
          id: 'a',
          label: 'Yes — the extension must always land exactly on the musical accent or the timing is wrong.',
          isCorrect: false,
          feedback:
            'Not so. The musical accent (1) and the dance accent (where the body extends, often 2) are meant to be different beats.',
        },
        {
          id: 'b',
          label: 'Yes — any body movement that is not on beat 1 is a timing fault in a Waltz.',
          isCorrect: false,
          feedback:
            'A Waltz moves across all three beats; expressing on 2 is normal, not a fault.',
        },
        {
          id: 'c',
          label: 'No — expressing on 2 (a dance accent) while the music accents 1 is exactly how a Waltz is built.',
          isCorrect: true,
          feedback:
            'Right. The dance accent sits off the musical accent by design; the couple is on the music.',
        },
        {
          id: 'd',
          label: 'Cannot tell — timing cannot be judged once dance accents are involved.',
          isCorrect: false,
          feedback:
            'Timing is perfectly judgeable here; you simply need to know musical and dance accents are different beats.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Are the musical accent and the dance accent supposed to be the same beat?' },
        { level: 2, title: 'Concept', content: 'Musical accents (1, 4) and dance accents (often 2, 5) are deliberately different.' },
        { level: 3, title: 'Specific clue', content: 'Extending on 2 while the music accents 1 is by design.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — that is how a Waltz is built."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Accents distinguished' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Calling a correctly-phrased Waltz "off the music" would wrongly cost the couple on timing.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.timing', label: 'Timing and Time Signature' },
        { topicId: 'dance.waltz', label: 'Judging the Waltz' },
      ],
      successFeedback: 'Musical accent on 1, dance accent on 2 — different beats, both correct.',
      failureFeedback: 'The dance accent is meant to sit off the musical accent; expressing on 2 is not being off the music.',
    },
  ],
  reflectionPrompt: 'How would you explain the difference between a musical accent and a dance accent to a new judge in one line?',
  rewards: [{ type: 'xp', amount: 5, label: 'Waltz timing trained' }],
};
