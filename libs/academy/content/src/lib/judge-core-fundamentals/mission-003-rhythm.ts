import { MissionDefinition } from '@academy/content-model';

/** Core Fundamentals mission 3 — the Rhythm lens. */
export const judgeCore003Rhythm: MissionDefinition = {
  id: 'judge-core-003-rhythm',
  campaignId: 'judge-core-fundamentals',
  title: 'Slow, Quick, Quick: The Rhythm Lens',
  summary:
    'Timing puts you on the beat; rhythm is the slow/quick pattern each style rides on. Learn to hear the pattern, not just the pulse.',
  difficulty: 'easy',
  learningObjectives: [
    'Distinguish timing (on the beat) from rhythm (the slow/quick pattern)',
    'Recognise a style by its rhythmic signature',
    'Tell controlled syncopation from poor timing',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Two couples can both be on the beat and still dance different rhythms. Rhythm is the pattern of durations — slow, quick, triple — that gives a style its feel.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jc-003-c1',
      type: 'multiple-choice',
      title: 'Name the Pattern',
      difficulty: 'easy',
      tags: ['dance', 'judging', 'rhythm'],
      storyContext:
        'A Nightclub couple moves with a long, settled first step followed by two shorter ones, over and over.',
      prompt: 'Which rhythmic pattern are they dancing?',
      options: [
        {
          id: 'a',
          label: 'Quick, quick, slow, slow.',
          isCorrect: false,
          feedback:
            'That is the Two Step feel — two shorts leading into two longs. Nightclub leads with the long step.',
        },
        {
          id: 'b',
          label: 'Even, even, even — one duration repeated.',
          isCorrect: false,
          feedback:
            'A single repeated duration has no slow/quick shape; Nightclub is built on contrast between long and short.',
        },
        {
          id: 'c',
          label: 'Slow, quick, quick.',
          isCorrect: true,
          feedback:
            'Correct — the settled long step then two quicker ones is the Nightclub signature: slow, quick, quick.',
        },
        {
          id: 'd',
          label: 'Triple, triple, walk, walk.',
          isCorrect: false,
          feedback:
            'Triples belong to dances like Triple Two and East Coast Swing — this couple leads with a single long step, not a triple.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Describe the lengths in order: long first, then what?' },
        { level: 2, title: 'Concept', content: 'Rhythm is the pattern of durations; name each step slow or quick.' },
        { level: 3, title: 'Specific clue', content: 'One long, then two short — in that order.' },
        { level: 4, title: 'Guided solution', content: 'Choose slow, quick, quick.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Pattern named' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 4,
          reason: 'Mislabelling the rhythmic pattern would misjudge whether the couple danced the correct style.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'You heard the pattern, not just the pulse. That is the rhythm lens.',
      failureFeedback: 'Say the durations in order — a long lead step then two quick ones is slow, quick, quick.',
    },
    {
      id: 'jc-003-c2',
      type: 'multiple-choice',
      title: 'Syncopation or Sloppy?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'rhythm'],
      storyContext:
        'A dancer delays a step off its expected accent, holds the tension, then lands cleanly back on the pattern a beat later — and does it once, on purpose.',
      prompt: 'How should the rhythm lens read this?',
      options: [
        {
          id: 'a',
          label: 'As controlled syncopation — a deliberate displacement that resolves back to the pattern is a rhythmic skill.',
          isCorrect: true,
          feedback:
            'Right. Syncopation that is intentional and resolves is musicality, and the rhythm lens rewards it.',
        },
        {
          id: 'b',
          label: 'As a timing error — any departure from the beat is a fault, full stop.',
          isCorrect: false,
          feedback:
            'Not every departure is a fault. A controlled, resolving displacement is syncopation, which is skilful, not sloppy.',
        },
        {
          id: 'c',
          label: 'As irrelevant — rhythm only scores the base pattern, never variations.',
          isCorrect: false,
          feedback:
            'Rhythm absolutely scores expressive variation; syncopation is one of the clearest ways a couple shows rhythmic command.',
        },
        {
          id: 'd',
          label: 'As a character choice — it belongs to the character lens, not rhythm.',
          isCorrect: false,
          feedback:
            'It affects character too, but a deliberate displacement of the beat pattern is fundamentally a rhythm event.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Was the departure deliberate, and did it resolve?' },
        { level: 2, title: 'Concept', content: 'Syncopation is a controlled, resolving displacement — a skill, not an error.' },
        { level: 3, title: 'Specific clue', content: 'Once, on purpose, landing cleanly back on the pattern.' },
        { level: 4, title: 'Guided solution', content: 'Choose the option reading it as controlled syncopation.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Syncopation read' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Marking deliberate syncopation as an error would tell a skilled couple to stop doing the right thing.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'Deliberate, controlled, resolved — that is syncopation, and it is a credit.',
      failureFeedback: 'A displacement that is intentional and returns to the pattern is syncopation, not sloppiness.',
    },
  ],
  reflectionPrompt: 'What would tell you a syncopation was accidental rather than deliberate?',
  rewards: [{ type: 'xp', amount: 5, label: 'Rhythm lens trained' }],
};
