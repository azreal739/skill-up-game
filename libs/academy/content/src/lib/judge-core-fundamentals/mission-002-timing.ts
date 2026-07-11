import { MissionDefinition } from '@academy/content-model';

/** Core Fundamentals mission 2 — the Timing lens. */
export const judgeCore002Timing: MissionDefinition = {
  id: 'judge-core-002-timing',
  campaignId: 'judge-core-fundamentals',
  title: 'On the Music: The Timing Lens',
  summary:
    'Timing asks one question — are the dancers where the music says they should be? Learn to read the count before you score it.',
  difficulty: 'easy',
  learningObjectives: [
    'Identify a dance’s time signature from its count',
    'Separate musical accents from dance accents',
    'Recognise being off the beat versus dancing the wrong structure',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Before you judge anything else, find the music. What time signature is playing, what is the count, and where are the accents? A couple can move beautifully and still be off the music.',
    },
  ],
  contextArtefacts: [
    {
      id: 'waltz-pulse',
      type: 'message',
      title: 'Count sheet — a Waltz phrase',
      content:
        'Six counts: 1 2 3 4 5 6. The music swells on 1 and again on 4. Time signature: 3/4.',
    },
  ],
  challenges: [
    {
      id: 'jc-002-c1',
      type: 'multiple-choice',
      title: 'Read the Accents',
      difficulty: 'easy',
      tags: ['dance', 'judging', 'timing'],
      storyContext:
        'A Waltz is playing. Across the six-count phrase on the count sheet, the music clearly swells twice.',
      prompt: 'Which counts carry the main musical accents in this Waltz?',
      options: [
        {
          id: 'a',
          label: 'Every count, 1 through 6 — a Waltz accents them all equally.',
          isCorrect: false,
          feedback:
            'Even emphasis is a metronome, not a Waltz. The music rises and falls; it does not hit every count the same.',
        },
        {
          id: 'b',
          label: '1 and 4 — the two swells across the six-count phrase.',
          isCorrect: true,
          feedback:
            'Correct. The Waltz carries its musical accents on 1 and 4; that is what the couple’s rise and fall should ride.',
        },
        {
          id: 'c',
          label: '2 and 5 — the beats where the dancers extend.',
          isCorrect: false,
          feedback:
            '2 and 5 are where the body often expresses — those are DANCE accents. The MUSICAL accents are 1 and 4.',
        },
        {
          id: 'd',
          label: '3 and 6 — the end of each triple.',
          isCorrect: false,
          feedback:
            'The ends of the triples are the softest part of the phrase, not the accent — listen for where the music swells.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The artefact tells you exactly where the music swells.' },
        {
          level: 2,
          title: 'Concept',
          content: 'Musical accents are where the music is strong; in a six-count Waltz phrase that is 1 and 4.',
        },
        { level: 3, title: 'Specific clue', content: 'Do not confuse where the body extends (2 and 5) with where the music hits.' },
        { level: 4, title: 'Guided solution', content: 'Choose 1 and 4.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Accents read' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 4,
          reason: 'Misreading the musical accents would misjudge every couple’s timing in the round.',
        },
      ],
      helpLinks: [{ topicId: 'judging.timing', label: 'Timing and Time Signature' }],
      successFeedback: 'You found the music before you judged the movement. Always in that order.',
      failureFeedback: 'Musical accents are where the music swells (1 and 4), not where the body extends (2 and 5).',
    },
    {
      id: 'jc-002-c2',
      type: 'multiple-choice',
      title: 'Beautiful, but Off',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'timing'],
      storyContext:
        'A couple dances a clean, elegant routine — but their steps consistently land a fraction after each beat of the music.',
      prompt: 'How should the timing lens score this, and why?',
      options: [
        {
          id: 'a',
          label: 'High — the routine looked polished and the figures were clean.',
          isCorrect: false,
          feedback:
            'Polish is motion and figures, not timing. Those are other lenses; timing scores their relationship to the beat.',
        },
        {
          id: 'b',
          label: 'High — landing just after the beat is a stylistic choice that shows musicality.',
          isCorrect: false,
          feedback:
            'A deliberate, resolving delay can be musical — but a consistent lag on every step is lateness, not phrasing.',
        },
        {
          id: 'c',
          label: 'Neutral — timing cannot really be judged unless the couple is wildly off.',
          isCorrect: false,
          feedback:
            'Timing is judged on a spectrum, not just at the extremes. A consistent fractional lag is a real, scorable timing fault.',
        },
        {
          id: 'd',
          label: 'Lower on timing specifically — consistent lag behind the beat is a timing fault, even when the dancing is pretty.',
          isCorrect: true,
          feedback:
            'Exactly. Score each lens on its own: the motion may be lovely, but timing marks the relationship to the music, and they are behind it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which lens are you scoring — and does polish belong to it?' },
        {
          level: 2,
          title: 'Concept',
          content: 'Timing is judged independently of how pretty the movement is.',
        },
        { level: 3, title: 'Specific clue', content: 'A consistent lag on every beat is lateness, not phrasing.' },
        { level: 4, title: 'Guided solution', content: 'Choose the option that lowers timing specifically for consistent lag.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Lenses kept separate' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Letting polish rescue a timing score made the panel’s marks inconsistent between judges.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.timing', label: 'Timing and Time Signature' },
        { topicId: 'judging.criteria', label: 'The Six Judging Lenses' },
      ],
      successFeedback: 'Pretty is a different lens. Timing marks the music, and they were behind it.',
      failureFeedback: 'Score timing on its own: a consistent lag behind the beat is a timing fault regardless of polish.',
    },
  ],
  reflectionPrompt: 'How would you tell a deliberate, musical delay apart from a couple simply running late?',
  rewards: [{ type: 'xp', amount: 5, label: 'Timing lens trained' }],
};
