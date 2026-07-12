import { MissionDefinition } from '@academy/content-model';

/** WCS module mission 4 — motion: anchor settle, extension and compression. */
export const judgeWcs004Motion: MissionDefinition = {
  id: 'judge-wcs-004-motion',
  campaignId: 'judge-wcs',
  title: 'Settle on the Anchor',
  summary:
    'The anchor settle and the stretch of extension and compression are the heart of WCS motion. Learn to judge whether they are truly there.',
  difficulty: 'medium',
  learningObjectives: [
    'Identify a genuine anchor settle',
    'Recognise extension and compression through the connection',
    'Fault a rushed or missing anchor',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Every pattern ends by settling on the anchor — grounded, connected, not rushing into the next move. The give-and-take of extension and compression drives the whole dance.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jws-004-c1',
      type: 'multiple-choice',
      title: 'Anchor or Rush',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'west-coast-swing', 'motion'],
      storyContext:
        'A couple never quite settles: at the end of each pattern they immediately bounce into the next move, with no grounded anchor and no moment of connected stretch.',
      prompt: 'How does the motion lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — constant motion shows energy and keeps the dance exciting.',
          isCorrect: false,
          feedback:
            'Constant motion at the cost of the anchor is a fault. The settle is defining WCS motion, not dead time to skip.',
        },
        {
          id: 'b',
          label: 'A motion fault — a missing or rushed anchor settle removes the grounded end each WCS pattern needs.',
          isCorrect: true,
          feedback:
            'Correct. The anchor is where the pattern settles and the connection resolves; skipping it is a real motion fault.',
        },
        {
          id: 'c',
          label: 'A timing fault — rushing just means they are ahead of the beat.',
          isCorrect: false,
          feedback:
            'They can rush the anchor while still on the beat. The missing settle is about how the motion resolves, not when.',
        },
        {
          id: 'd',
          label: 'A character issue — it only makes the dance look a little frantic.',
          isCorrect: false,
          feedback:
            'It may read frantic, but the concrete problem is a missing anchor settle — a motion quality.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does each pattern settle, or bounce onward?' },
        { level: 2, title: 'Concept', content: 'The anchor settle is defining WCS motion.' },
        { level: 3, title: 'Specific clue', content: 'No grounded end and no stretch is a missing anchor.' },
        { level: 4, title: 'Guided solution', content: 'Choose the motion fault for the missing anchor settle.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Anchor judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding constant motion over the anchor would erase a core WCS quality across the panel.',
        },
      ],
      helpLinks: [{ topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' }],
      successFeedback: 'No settle, no anchor — a real motion fault. You did not mistake rushing for energy.',
      failureFeedback: 'The anchor settle is defining WCS motion; a missing or rushed anchor is a motion fault.',
    },
    {
      id: 'jws-004-c2',
      type: 'multiple-choice',
      title: 'Give and Take',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'west-coast-swing', 'motion'],
      storyContext:
        'A strong couple stretches the connection (extension) as the follower travels, then compresses it as they change direction, using the give-and-take to power the patterns.',
      prompt: 'What is the couple demonstrating on the motion lens?',
      options: [
        {
          id: 'a',
          label: 'Over-dancing — pulling on the connection should be marked down.',
          isCorrect: false,
          feedback:
            'Extension and compression are not yanking; they are the controlled give-and-take that defines WCS motion.',
        },
        {
          id: 'b',
          label: 'A timing fault — stretching the connection must throw off the count.',
          isCorrect: false,
          feedback:
            'Extension and compression coexist with correct timing; they are a motion quality, not a timing error.',
        },
        {
          id: 'c',
          label: 'A signature figure — extension/compression is a named WCS figure.',
          isCorrect: false,
          feedback:
            'They are a connection/motion quality present across figures, not a named figure like the push or whip.',
        },
        {
          id: 'd',
          label: 'Genuine WCS motion — controlled extension and compression through the connection is exactly what the lens rewards.',
          isCorrect: true,
          feedback:
            'Right. The stretch-and-settle of extension and compression, resolving on the anchor, is WCS motion at its best.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is controlled stretch a fault or the point?' },
        { level: 2, title: 'Concept', content: 'Extension and compression drive WCS motion.' },
        { level: 3, title: 'Specific clue', content: 'Give-and-take that powers the patterns is the credit.' },
        { level: 4, title: 'Guided solution', content: 'Choose genuine WCS motion (extension/compression).' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Stretch credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Marking genuine extension/compression as over-dancing would discourage correct WCS motion.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.motion', label: 'Motion and Body Action' },
        { topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' },
      ],
      successFeedback: 'Stretch and settle through the connection — WCS motion, credited.',
      failureFeedback: 'Controlled extension and compression through the connection is the intended WCS motion, not over-dancing.',
    },
  ],
  reflectionPrompt: 'Why do you think the anchor — a moment of settling — is built into a dance that otherwise flows constantly?',
  rewards: [{ type: 'xp', amount: 5, label: 'WCS motion trained' }],
};
