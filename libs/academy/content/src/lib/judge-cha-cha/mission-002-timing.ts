import { MissionDefinition } from '@academy/content-model';

/** Cha Cha module mission 2 — timing: the chasse and its accents. */
export const judgeChaCha002Timing: MissionDefinition = {
  id: 'judge-cha-cha-002-timing',
  campaignId: 'judge-cha-cha',
  title: 'Two, Three, Cha-Cha-Cha',
  summary:
    'The chasse — the quick 4&5 — is the Cha Cha’s timing signature. Learn to confirm it and hear where the accents fall.',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm the 4&5 chasse timing',
    'Place the musical accents on 1 and 5',
    'Separate musical accents from dance accents',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Count it: 2 3 4&1. The chasse is the crisp 4&5 — three steps across two beats. Musical accents sit on 1 and 5; the body often expresses on 2 and 6.',
    },
  ],
  contextArtefacts: [
    {
      id: 'chacha-count',
      type: 'message',
      title: 'Count sheet',
      content: '4/4: steps on 2, 3, then a chasse 4&5 (three steps across two beats). Musical accents on 1 and 5.',
    },
  ],
  challenges: [
    {
      id: 'jcc-002-c1',
      type: 'multiple-choice',
      title: 'Where the Chasse Lives',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'cha-cha', 'timing'],
      storyContext: 'A Cha Cha plays over the count sheet above.',
      prompt: 'Which counts carry the chasse — the crisp cha-cha-cha?',
      options: [
        {
          id: 'a',
          label: 'On 1 and 3 only — one step per beat, no triple.',
          isCorrect: false,
          feedback:
            'A single step per beat with no triple removes the chasse entirely — that is not a Cha Cha.',
        },
        {
          id: 'b',
          label: 'The 4&5 (and 8&) — three quick steps across two beats.',
          isCorrect: true,
          feedback:
            'Correct. The chasse is the quick 4&5 across two beats — the Cha Cha’s timing signature.',
        },
        {
          id: 'c',
          label: 'On every beat equally — the whole dance is a chasse.',
          isCorrect: false,
          feedback:
            'The chasse is a specific triple on 4&5, not the whole bar; the 2 and 3 are single steps.',
        },
        {
          id: 'd',
          label: 'On the 1 and 5 — the musical accents are the chasse.',
          isCorrect: false,
          feedback:
            '1 and 5 are the musical accents, not the chasse. The chasse is the 4&5 triple.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Where does the quick triple fall?' },
        { level: 2, title: 'Concept', content: 'The chasse is the 4&5 triple across two beats.' },
        { level: 3, title: 'Specific clue', content: 'Cha-cha-cha lands on 4-and-5.' },
        { level: 4, title: 'Guided solution', content: 'Choose the 4&5 (and 8&).' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Chasse placed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Mislocating the chasse would misjudge whether every couple danced the Cha Cha’s core timing.',
        },
      ],
      helpLinks: [{ topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' }],
      successFeedback: 'The chasse lives on 4&5. Timing signature confirmed.',
      failureFeedback: 'The chasse is the quick 4&5 triple across two beats, not the musical accents on 1 and 5.',
    },
    {
      id: 'jcc-002-c2',
      type: 'multiple-choice',
      title: 'Musical or Dance Accent?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'cha-cha', 'timing'],
      storyContext:
        'A judge argues a Cha Cha couple is "off the music" because their sharpest hip expression lands on 2, not on the musical accent at 1.',
      prompt: 'Is the couple off the music?',
      options: [
        {
          id: 'a',
          label: 'Yes — the hip expression must land exactly on the musical accent or the timing is wrong.',
          isCorrect: false,
          feedback:
            'The musical accent (1) and the dance accent (often 2) are deliberately different beats in the Cha Cha.',
        },
        {
          id: 'b',
          label: 'Yes — any expression off beat 1 is a timing fault.',
          isCorrect: false,
          feedback:
            'The Cha Cha expresses across the bar; a dance accent on 2 is normal, not a fault.',
        },
        {
          id: 'c',
          label: 'Cannot tell — timing cannot be judged once dance accents appear.',
          isCorrect: false,
          feedback:
            'Timing is judgeable here; you just need to know musical and dance accents are different beats.',
        },
        {
          id: 'd',
          label: 'No — expressing on 2 (a dance accent) while the music accents 1 is how the Cha Cha is built.',
          isCorrect: true,
          feedback:
            'Correct. The dance accent sits off the musical accent by design; the couple is on the music.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Are the musical and dance accents the same beat?' },
        { level: 2, title: 'Concept', content: 'Musical accents (1, 5) and dance accents (2, 6) differ by design.' },
        { level: 3, title: 'Specific clue', content: 'Expressing on 2 while the music accents 1 is correct.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — that is how the Cha Cha is built."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Accents distinguished' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Calling a correctly-phrased Cha Cha "off the music" would wrongly cost the couple on timing.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.timing', label: 'Timing and Time Signature' },
        { topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' },
      ],
      successFeedback: 'Musical accent on 1, dance accent on 2 — different beats, both correct.',
      failureFeedback: 'The dance accent is meant to sit off the musical accent; expressing on 2 is not being off the music.',
    },
  ],
  reflectionPrompt: 'How would you explain the chasse’s "4-and-5" timing to someone who has never counted a Cha Cha?',
  rewards: [{ type: 'xp', amount: 5, label: 'Cha Cha timing trained' }],
};
