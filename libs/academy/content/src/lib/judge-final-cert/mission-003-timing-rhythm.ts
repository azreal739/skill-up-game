import { MissionDefinition } from '@academy/content-model';

/** Final Certification mission 3 — station: timing and rhythm. */
export const judgeFinal003TimingRhythm: MissionDefinition = {
  id: 'judge-final-003-timing-rhythm',
  campaignId: 'judge-final-cert',
  title: 'Station 2 — Timing & Rhythm',
  summary: 'Judge whether each couple is on the music and expressing the correct pattern.',
  difficulty: 'hard',
  learningObjectives: [
    'Separate being on the beat from expressing the rhythm',
    'Judge accents and patterns per dance',
    'Distinguish syncopation from lateness',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Second station: timing and rhythm. On the beat is timing; the pattern and its feel is rhythm. Keep them apart.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jf-003-c1',
      type: 'multiple-choice',
      title: 'On Time, Wrong Feel',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'timing'],
      storyContext:
        'A Waltz couple lands every beat on time but stamps each of the three counts flat and separate, with no flowing swing.',
      prompt: 'How do timing and rhythm score?',
      options: [
        {
          id: 'a',
          label: 'Both high — being on the beat covers both lenses.',
          isCorrect: false,
          feedback:
            'On the beat is timing only; the flat, stamped feel is a rhythm fault.',
        },
        {
          id: 'b',
          label: 'Both low — anything imperfect fails both.',
          isCorrect: false,
          feedback:
            'Their timing was genuinely on the beat; only rhythm should drop.',
        },
        {
          id: 'c',
          label: 'Rhythm high, timing low — the flat feel means they were off the beat.',
          isCorrect: false,
          feedback:
            'Reversed. They were on the beat (timing high); the missing flow is a rhythm issue.',
        },
        {
          id: 'd',
          label: 'Timing high, rhythm low — on the beat, but the flowing Waltz feel is missing.',
          isCorrect: true,
          feedback:
            'Correct. Independent lenses: on-beat keeps timing up, stamped flatness lowers rhythm.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which is being on the beat, and which is the feel?' },
        { level: 2, title: 'Concept', content: 'Timing = on the beat; rhythm = the pattern’s feel.' },
        { level: 3, title: 'Specific clue', content: 'Stamped and flat is a rhythm fault, not timing.' },
        { level: 4, title: 'Guided solution', content: 'Choose timing high, rhythm low.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Lenses split' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Merging timing and rhythm would put your marks out of line with the panel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'Timing up, rhythm down — kept apart. Correct.',
      failureFeedback: 'On the beat keeps timing high; the missing flowing feel lowers rhythm.',
    },
    {
      id: 'jf-003-c2',
      type: 'multiple-choice',
      title: 'Syncopation or Late',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'rhythm'],
      storyContext:
        'A West Coast Swing follower delays a triple with a controlled hesitation, then lands cleanly back onto the anchor — once, on purpose.',
      prompt: 'How should this score?',
      options: [
        {
          id: 'a',
          label: 'A timing fault — any delay is being late.',
          isCorrect: false,
          feedback:
            'A deliberate, resolving delay is syncopation, not lateness.',
        },
        {
          id: 'b',
          label: 'A rhythmic credit — controlled, resolving syncopation that lands the anchor cleanly is a skill.',
          isCorrect: true,
          feedback:
            'Correct. WCS prizes musical syncopation when it is controlled and resolves.',
        },
        {
          id: 'c',
          label: 'A motion fault — the anchor was involved.',
          isCorrect: false,
          feedback:
            'The anchor was landed cleanly; this is a rhythm event, not a motion fault.',
        },
        {
          id: 'd',
          label: 'A structural fault — hesitating leaves the slot.',
          isCorrect: false,
          feedback:
            'A rhythmic hesitation does not abandon the slot; the couple stayed in the lane.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Was it deliberate and did it resolve?' },
        { level: 2, title: 'Concept', content: 'Controlled, resolving syncopation is a rhythmic credit.' },
        { level: 3, title: 'Specific clue', content: 'Once, on purpose, landing the anchor cleanly.' },
        { level: 4, title: 'Guided solution', content: 'Choose the rhythmic credit.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Syncopation judged' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Marking skilled syncopation as lateness would penalise exactly the musicality being certified.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'Deliberate, controlled, resolved — a rhythmic credit.',
      failureFeedback: 'Controlled, resolving syncopation that lands the anchor cleanly is a credit, not lateness.',
    },
  ],
  reflectionPrompt: 'What tells you a hesitation was musical syncopation rather than a couple simply running late?',
  rewards: [{ type: 'xp', amount: 5, label: 'Station 2 cleared' }],
};
