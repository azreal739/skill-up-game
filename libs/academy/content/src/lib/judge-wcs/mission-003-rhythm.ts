import { MissionDefinition } from '@academy/content-model';

/** WCS module mission 3 — rhythm: walks and triples. */
export const judgeWcs003Rhythm: MissionDefinition = {
  id: 'judge-wcs-003-rhythm',
  campaignId: 'judge-wcs',
  title: 'Walks and Triples',
  summary:
    'West Coast Swing rhythm is built from walks and triples. Learn to hear whether the triples are clean and grounded, not rushed.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise the walk-and-triple rhythm',
    'Judge triple quality (clean vs rushed)',
    'Separate rhythm from being merely on the beat',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Patterns weave walking steps and triple steps. A rushed or skipped triple is a rhythm fault even when the count still "works".',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jws-003-c1',
      type: 'multiple-choice',
      title: 'Clean or Rushed Triple',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'west-coast-swing', 'rhythm'],
      storyContext:
        'A couple rushes each triple step into a hurried shuffle, so the &-count almost disappears, though they still arrive on the next beat.',
      prompt: 'How does the rhythm lens read this?',
      options: [
        {
          id: 'a',
          label: 'Marked down — a triple crushed into a hurried shuffle loses the clean walk-and-triple rhythm, even if they land on the next beat.',
          isCorrect: true,
          feedback:
            'Correct. Arriving on the beat is timing; the quality of the triple itself is rhythm, and a rushed triple scores down.',
        },
        {
          id: 'b',
          label: 'Full marks — they landed on the following beat, so the rhythm is fine.',
          isCorrect: false,
          feedback:
            'Landing on the beat is a timing matter. The rhythm lens also judges whether the triple itself was clean.',
        },
        {
          id: 'c',
          label: 'A motion fault only — footwork speed has nothing to do with rhythm.',
          isCorrect: false,
          feedback:
            'The articulation of the triple is exactly a rhythm quality; a crushed triple is a rhythm mark-down.',
        },
        {
          id: 'd',
          label: 'Better — a faster triple shows energy and commitment.',
          isCorrect: false,
          feedback:
            'A rushed, collapsed triple is not energetic precision; it loses the grounded walk-and-triple feel.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is landing on the beat the same as a clean triple?' },
        { level: 2, title: 'Concept', content: 'Rhythm judges the quality of the walks and triples, not just arrival.' },
        { level: 3, title: 'Specific clue', content: 'A crushed &-count is a rushed triple.' },
        { level: 4, title: 'Guided solution', content: 'Choose the rhythm mark-down for the rushed triple.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Triple quality judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting crushed triples would let a core WCS rhythm quality erode unremarked.',
        },
      ],
      helpLinks: [{ topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' }],
      successFeedback: 'On the beat, but the triple was crushed — a rhythm mark-down. Well heard.',
      failureFeedback: 'The rhythm lens judges triple quality; a rushed, collapsed triple scores down even when on the beat.',
    },
    {
      id: 'jws-003-c2',
      type: 'multiple-choice',
      title: 'Syncopation Over the Anchor',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'west-coast-swing', 'rhythm'],
      storyContext:
        'An advanced follower syncopates a triple with a controlled, musical hesitation, then resolves cleanly back onto the anchor.',
      prompt: 'How should the rhythm lens read this?',
      options: [
        {
          id: 'a',
          label: 'A fault — the follower changed the written triple, so it is wrong.',
          isCorrect: false,
          feedback:
            'Controlled, resolving syncopation is a rhythmic skill in WCS, not a violation of a fixed step.',
        },
        {
          id: 'b',
          label: 'A timing error — any deviation from the base triple is off-time.',
          isCorrect: false,
          feedback:
            'A deliberate, resolving syncopation is not the same as being off-time; it is intentional and lands the anchor cleanly.',
        },
        {
          id: 'c',
          label: 'Controlled syncopation — a deliberate, resolving play with the rhythm that lands cleanly on the anchor is a rhythmic credit.',
          isCorrect: true,
          feedback:
            'Right. WCS prizes musical syncopation when it is controlled and resolves; the rhythm lens rewards it.',
        },
        {
          id: 'd',
          label: 'A signature figure — syncopation is a named WCS figure.',
          isCorrect: false,
          feedback:
            'Syncopation is a rhythm quality, not a named figure like a push or whip.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Was it deliberate, and did it resolve onto the anchor?' },
        { level: 2, title: 'Concept', content: 'Controlled, resolving syncopation is a rhythmic skill in WCS.' },
        { level: 3, title: 'Specific clue', content: 'Musical hesitation that lands the anchor cleanly is a credit.' },
        { level: 4, title: 'Guided solution', content: 'Choose controlled syncopation.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Syncopation credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Marking skilled syncopation as an error would discourage exactly the musicality WCS prizes.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.rhythm', label: 'Rhythm: Slow, Quick and Syncopation' },
        { topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' },
      ],
      successFeedback: 'Deliberate, controlled, resolved onto the anchor — a rhythmic credit.',
      failureFeedback: 'Controlled, resolving syncopation that lands the anchor cleanly is a WCS rhythm credit, not a fault.',
    },
  ],
  reflectionPrompt: 'How would you tell a musical syncopation apart from a follower simply losing the triple?',
  rewards: [{ type: 'xp', amount: 5, label: 'WCS rhythm trained' }],
};
