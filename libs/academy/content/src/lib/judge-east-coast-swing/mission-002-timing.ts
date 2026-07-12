import { MissionDefinition } from '@academy/content-model';

/** East Coast Swing module mission 2 — timing: triple, triple, rock step and its gears. */
export const judgeEcs002Timing: MissionDefinition = {
  id: 'judge-ecs-002-timing',
  campaignId: 'judge-east-coast-swing',
  title: 'Triple, Triple, Rock',
  summary:
    'The East Coast Swing rides a triple-step, triple-step, rock-step count — with single- and double-time gears. Learn to confirm the count and recognise the variants as the same dance.',
  difficulty: 'medium',
  learningObjectives: [
    'Confirm the triple-triple-rock structure',
    'Recognise single- and double-time as the same dance in a different gear',
    'Distinguish a correct rock step from a missing one',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Count it: 1&2, 3&4, 5-6 — triple, triple, rock. The single-time (tap-step) and double-time (six-count) versions are gears of the same dance, not faults. What must always be there is the rock step resolving the basic.',
    },
  ],
  contextArtefacts: [
    {
      id: 'ecs-count',
      type: 'message',
      title: 'Count sheet',
      content: '4/4: 1&2 (triple) 3&4 (triple) 5-6 (rock step). Variants — single-time: step, step, rock-step; double-time: six counts, no triples. Same dance, different gear.',
    },
  ],
  challenges: [
    {
      id: 'jec-002-c1',
      type: 'multiple-choice',
      title: 'Same Dance, Different Gear',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'east-coast-swing', 'timing'],
      storyContext:
        'A couple dances a clean single-time East Coast Swing — step, step, rock-step — with no triples, matching a slower song. A new judge wants to fault it for "missing the triples".',
      prompt: 'How should the timing lens read this?',
      options: [
        {
          id: 'a',
          label: 'Fault it — an East Coast Swing without triples is always wrong.',
          isCorrect: false,
          feedback:
            'Single-time is a recognised gear of the same dance for slower music; the rock step is intact, so it is not a fault.',
        },
        {
          id: 'b',
          label: 'Fault it — only the six-count double-time version is a real swing.',
          isCorrect: false,
          feedback:
            'Both single- and double-time are legitimate gears; neither is "the only real swing".',
        },
        {
          id: 'c',
          label: 'Fault it — the couple should always add triples regardless of the music.',
          isCorrect: false,
          feedback:
            'Forcing triples onto slow music is the error; the single-time gear is the correct match here.',
        },
        {
          id: 'd',
          label: 'Accept it — single-time is a recognised gear of the same dance for slower music, with the rock step intact; it is not a timing fault.',
          isCorrect: true,
          feedback:
            'Correct. Single-, triple- and double-time are gears of one dance; the rock step is present, so the timing is sound.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is a triple-free swing automatically wrong?' },
        { level: 2, title: 'Concept', content: 'Single-, triple- and double-time are gears of the same dance.' },
        { level: 3, title: 'Specific clue', content: 'The rock step is intact and matches slower music.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Accept it — single-time is a recognised gear."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Gears recognised' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Faulting a legitimate gear would penalise couples for correctly matching the music.',
        },
      ],
      helpLinks: [{ topicId: 'dance.east-coast-swing', label: 'Judging the East Coast Swing' }],
      successFeedback: 'Single-time on slow music, rock step intact — a gear, not a fault. Well judged.',
      failureFeedback: 'Single-, triple- and double-time are gears of the same dance; a clean single-time with the rock step intact is sound.',
    },
    {
      id: 'jec-002-c2',
      type: 'multiple-choice',
      title: 'Where the Rock Step Lands',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'east-coast-swing', 'timing'],
      storyContext:
        'A couple triples cleanly but drops the rock step entirely, running straight from one triple into the next with no back-replace on 5-6.',
      prompt: 'How does the timing lens read a missing rock step?',
      options: [
        {
          id: 'a',
          label: 'A timing fault — the rock step (5-6) is a defining part of the East Coast Swing basic, and running triple into triple with no rock leaves the count incomplete.',
          isCorrect: true,
          feedback:
            'Correct. Clean triples do not excuse a dropped rock step; the basic is triple-triple-ROCK, and the rock is missing.',
        },
        {
          id: 'b',
          label: 'No issue — as long as the triples are clean, the rock step is optional.',
          isCorrect: false,
          feedback:
            'The rock step is not optional; it resolves the basic and is part of the count.',
        },
        {
          id: 'c',
          label: 'A character issue only — a missing rock just looks a little plain.',
          isCorrect: false,
          feedback:
            'It flattens the look, but the concrete problem is a missing part of the timed basic — a timing fault.',
        },
        {
          id: 'd',
          label: 'Better — dropping the rock keeps the dance moving faster.',
          isCorrect: false,
          feedback:
            'Speed is not the criterion; the rock step is a required part of the East Coast Swing basic.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the rock step part of the basic, or an optional extra?' },
        { level: 2, title: 'Concept', content: 'The basic is triple-triple-ROCK; the rock resolves it.' },
        { level: 3, title: 'Specific clue', content: 'Triple into triple with no back-replace leaves the count incomplete.' },
        { level: 4, title: 'Guided solution', content: 'Choose the timing fault for the missing rock step.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Rock step checked' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Ignoring a dropped rock step would put your timing marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.timing', label: 'Timing and Time Signature' },
        { topicId: 'dance.east-coast-swing', label: 'Judging the East Coast Swing' },
      ],
      successFeedback: 'Clean triples, missing rock — a timing fault. The basic is triple-triple-rock.',
      failureFeedback: 'The rock step (5-6) is a defining, required part of the East Coast Swing basic; dropping it is a timing fault.',
    },
  ],
  reflectionPrompt: 'How would you explain to a new judge why single-time is a gear but a missing rock step is a fault?',
  rewards: [{ type: 'xp', amount: 5, label: 'Swing timing trained' }],
};
