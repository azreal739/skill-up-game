import { MissionDefinition } from '@academy/content-model';

/** Mock Theory mission 7 — spatial structure recall across dances. */
export const judgeTheory007SpatialStructure: MissionDefinition = {
  id: 'judge-theory-007-spatial-structure',
  campaignId: 'judge-mock-theory',
  title: 'Paper VI — Space',
  summary: 'Revise which dances travel, which stay contained, and which live in a slot.',
  difficulty: 'medium',
  learningObjectives: [
    'Classify each dance as progressive or non-progressive',
    'Recall the slot as a distinct structure',
    'Apply the right spatial expectation',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Progressive, non-progressive, slotted — the wrong spatial expectation is one of the easiest ways to misjudge a dance. Know each one.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jt-007-c1',
      type: 'multiple-choice',
      title: 'Travels or Stays',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'spatial-structure'],
      storyContext: 'An exam question asks which studied dance is PROGRESSIVE — travelling the line of dance.',
      prompt: 'Which dance is progressive?',
      options: [
        {
          id: 'a',
          label: 'Nightclub.',
          isCorrect: false,
          feedback:
            'Nightclub is non-progressive — contained geometry parallel to the audience.',
        },
        {
          id: 'b',
          label: 'Cha Cha.',
          isCorrect: false,
          feedback:
            'The Cha Cha is largely non-progressive, working a controlled area.',
        },
        {
          id: 'c',
          label: 'West Coast Swing.',
          isCorrect: false,
          feedback:
            'WCS lives in a slot — a fixed lane, not travelling around the room.',
        },
        {
          id: 'd',
          label: 'Waltz.',
          isCorrect: true,
          feedback:
            'Correct. The Waltz is progressive, travelling counter-clockwise on the diagonals.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which dance travels around the room?' },
        { level: 2, title: 'Concept', content: 'Progressive dances travel the line of dance.' },
        { level: 3, title: 'Specific clue', content: 'Diagonals, counter-clockwise.' },
        { level: 4, title: 'Guided solution', content: 'Choose Waltz.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Structure classified' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Applying the wrong spatial expectation would misjudge the structure lens live.',
        },
      ],
      helpLinks: [{ topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' }],
      successFeedback: 'The Waltz travels; the others stay or slot. Classified.',
      failureFeedback: 'The Waltz is progressive; Nightclub and Cha Cha are non-progressive, WCS is slotted.',
    },
    {
      id: 'jt-007-c2',
      type: 'multiple-choice',
      title: 'The Slot Is Its Own Thing',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'spatial-structure'],
      storyContext:
        'A candidate writes that "the slot is just a non-progressive dance staying in one place".',
      prompt: 'Is that the right way to describe the slot?',
      options: [
        {
          id: 'a',
          label: 'Yes — the slot and non-progressive geometry are the same structure.',
          isCorrect: false,
          feedback:
            'They differ: the slot is a lane in which the follower travels back and forth, not a contained geometric area.',
        },
        {
          id: 'b',
          label: 'No — the slot is a distinct structure: a narrow lane in which the follower travels back and forth, with brief legal departures like the whip.',
          isCorrect: true,
          feedback:
            'Correct. The slot is its own category — not progressive travel, and not Nightclub-style contained geometry.',
        },
        {
          id: 'c',
          label: 'Yes — both simply mean "not travelling around the room".',
          isCorrect: false,
          feedback:
            'That is too coarse; the slot has back-and-forth travel along a line, unlike contained geometry.',
        },
        {
          id: 'd',
          label: 'No — the slot is actually a progressive structure around the room.',
          isCorrect: false,
          feedback:
            'The slot does not progress around the room; the follower travels along a fixed lane, not the line of dance.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does the slot involve travel, and of what kind?' },
        { level: 2, title: 'Concept', content: 'The slot is a distinct structure, not the same as contained geometry.' },
        { level: 3, title: 'Specific clue', content: 'Back-and-forth along a lane, with legal brief departures.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — the slot is a distinct structure."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Slot distinguished' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Collapsing the slot into "non-progressive" would misjudge WCS structure on the floor.',
        },
      ],
      helpLinks: [{ topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' }],
      successFeedback: 'The slot is its own category. Distinguished.',
      failureFeedback: 'The slot is a distinct structure — a lane with back-and-forth travel — not the same as contained geometry.',
    },
  ],
  reflectionPrompt: 'How would you explain the three spatial categories — progressive, non-progressive, slotted — in one sentence each?',
  rewards: [{ type: 'xp', amount: 5, label: 'Paper VI space done' }],
};
