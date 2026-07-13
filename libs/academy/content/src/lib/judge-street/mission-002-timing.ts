import { MissionDefinition } from '@academy/content-model';

/** Street module mission 2 — timing: hitting the music. */
export const judgeStreet002Timing: MissionDefinition = {
  id: 'judge-street-002-timing',
  campaignId: 'judge-street',
  title: 'Hitting the Music',
  summary:
    'Street timing is musicality — landing pops, hits and freezes exactly on the accents. Learn to judge whether a hit is on the beat or early/late.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge whether hits land on the musical accent',
    'Separate on-time hits from early or late ones',
    'Recognise musicality as the timing lens for Street',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'A pop or a freeze should land exactly on the accent it is answering. Land it early or late and, however clean the shape, the timing is off.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jst-002-c1',
      type: 'multiple-choice',
      title: 'On the Hit or Off',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'street', 'timing'],
      storyContext:
        'A popper throws clean, sharp hits — but each one lands a fraction after the musical accent it is meant to catch, consistently late.',
      prompt: 'How does the timing lens read this?',
      options: [
        {
          id: 'a',
          label: 'A timing fault — however clean the hit, landing consistently after the accent means it is not on the music.',
          isCorrect: true,
          feedback:
            'Correct. Street timing is musicality; a clean hit that lands late has missed the accent it was answering.',
        },
        {
          id: 'b',
          label: 'Full marks — a clean, sharp hit is all the timing lens checks.',
          isCorrect: false,
          feedback:
            'Sharpness is execution; whether the hit lands ON the accent is the timing lens, and it is late.',
        },
        {
          id: 'c',
          label: 'A character issue — being late just looks a little less confident.',
          isCorrect: false,
          feedback:
            'It reads less confident, but the concrete problem is a hit off the accent — a timing fault.',
        },
        {
          id: 'd',
          label: 'Better — landing just after the beat is more relaxed and stylish.',
          isCorrect: false,
          feedback:
            'A deliberate laid-back pocket is a rhythm choice; a hit meant to catch an accent but landing late is simply off.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does the hit land on the accent, or after it?' },
        { level: 2, title: 'Concept', content: 'Street timing is hitting the music precisely.' },
        { level: 3, title: 'Specific clue', content: 'A clean hit that lands late has missed the accent.' },
        { level: 4, title: 'Guided solution', content: 'Choose the timing fault for the late hit.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Musicality judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding late hits would drop the standard for the musicality that defines Street timing.',
        },
      ],
      helpLinks: [{ topicId: 'judging.timing', label: 'Timing and Time Signature' }],
      successFeedback: 'Clean but late — a timing fault. The hit must land on the accent.',
      failureFeedback: 'Street timing is hitting the music; a clean hit that lands consistently late has missed its accent.',
    },
    {
      id: 'jst-002-c2',
      type: 'multiple-choice',
      title: 'Catching the Accents',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'street', 'timing'],
      storyContext:
        'A performer catches the song’s specific accents — a horn stab, a snare, a vocal hit — landing a pop precisely on each one.',
      prompt: 'What does the timing lens reward here?',
      options: [
        {
          id: 'a',
          label: 'Nothing extra — hitting the beat is just being on time.',
          isCorrect: false,
          feedback:
            'Catching specific accents — not just the beat — is exactly the musicality the timing lens rewards.',
        },
        {
          id: 'b',
          label: 'A character point only — accenting just looks confident.',
          isCorrect: false,
          feedback:
            'It reads confident too, but precisely catching the accents is fundamentally the timing lens.',
        },
        {
          id: 'c',
          label: 'Precise musicality — landing pops exactly on the song’s specific accents is the timing lens at its best for Street.',
          isCorrect: true,
          feedback:
            'Right. Catching the actual accents of the track, not just the steady beat, is top-tier Street timing.',
        },
        {
          id: 'd',
          label: 'A signature figure — catching an accent is a named move.',
          isCorrect: false,
          feedback:
            'Catching an accent is a timing quality, not a named figure like a pop or a lock.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What is being caught — the steady beat, or the song’s accents?' },
        { level: 2, title: 'Concept', content: 'Musicality means catching the specific accents.' },
        { level: 3, title: 'Specific clue', content: 'A pop landing on each horn stab and snare.' },
        { level: 4, title: 'Guided solution', content: 'Choose precise musicality.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Accents credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Failing to credit precise musicality would tell a strong performer their best quality did not register.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.timing', label: 'Timing and Time Signature' },
        { topicId: 'dance.street', label: 'Judging Street Styles' },
      ],
      successFeedback: 'Every accent caught — Street timing at its best.',
      failureFeedback: 'The timing lens rewards precise musicality: landing pops exactly on the song’s specific accents.',
    },
  ],
  reflectionPrompt: 'How do you tell deliberate laid-back pocket apart from a hit that is simply landing late?',
  rewards: [{ type: 'xp', amount: 5, label: 'Street timing trained' }],
};
