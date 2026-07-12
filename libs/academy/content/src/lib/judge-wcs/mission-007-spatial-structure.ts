import { MissionDefinition } from '@academy/content-model';

/** WCS module mission 7 — spatial structure: the slot. */
export const judgeWcs007SpatialStructure: MissionDefinition = {
  id: 'judge-wcs-007-spatial-structure',
  campaignId: 'judge-wcs',
  title: 'Hold the Slot',
  summary:
    'West Coast Swing lives in a slot. Learn to judge whether the couple keeps their lane — and to allow the brief, legal direction changes the dance needs.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise slot structure',
    'Allow brief, purposeful direction changes that re-establish the slot',
    'Fault a couple that abandons the slot',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The slot is a narrow lane parallel to the audience. Figures may leave it for a moment — a whip — but must return. A couple that permanently wanders off has lost the structure.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jws-007-c1',
      type: 'multiple-choice',
      title: 'Legal Leave',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'west-coast-swing', 'spatial-structure'],
      storyContext:
        'During a whip, a couple briefly rotates off the slot line, then immediately re-establishes their lane parallel to the audience.',
      prompt: 'How does the spatial structure lens treat this brief departure?',
      options: [
        {
          id: 'a',
          label: 'Acceptable — a brief, purposeful direction change that re-establishes the slot is within the structure.',
          isCorrect: true,
          feedback:
            'Correct. The slot allows momentary departures for figures like the whip, provided the couple returns to it.',
        },
        {
          id: 'b',
          label: 'A fault — a slot dance must never rotate off the line for any reason.',
          isCorrect: false,
          feedback:
            'Too strict. A brief rotation that returns to the slot is legal, and figures like the whip require it.',
        },
        {
          id: 'c',
          label: 'A fault — leaving the line at all means the slot was abandoned.',
          isCorrect: false,
          feedback:
            'Momentarily is not abandonment. The slot is abandoned only when the couple stops returning to it.',
        },
        {
          id: 'd',
          label: 'It moves to floorcraft — direction changes are only about avoiding collisions.',
          isCorrect: false,
          feedback:
            'Floorcraft is related, but whether the couple keeps its slot is squarely spatial structure.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Did they abandon the slot, or leave and return?' },
        { level: 2, title: 'Concept', content: 'The slot permits brief, purposeful departures that re-establish the line.' },
        { level: 3, title: 'Specific clue', content: 'They immediately re-established the lane.' },
        { level: 4, title: 'Guided solution', content: 'Choose the acceptable, re-established departure.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Slot nuance judged' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Penalising a legal whip would teach couples to strip correct figures from their dancing.',
        },
      ],
      helpLinks: [{ topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' }],
      successFeedback: 'Brief, purposeful, re-established — the slot working as intended.',
      failureFeedback: 'The slot allows brief departures that return to the line; a whip’s rotation is legal.',
    },
    {
      id: 'jws-007-c2',
      type: 'multiple-choice',
      title: 'Wandering Off',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'west-coast-swing', 'spatial-structure'],
      storyContext:
        'Over the routine, a couple’s slot drifts and rotates until they are effectively dancing across the room at an angle, never re-establishing a consistent lane.',
      prompt: 'How does the spatial structure lens read this?',
      options: [
        {
          id: 'a',
          label: 'Fine — as long as individual figures were correct, the overall path does not matter.',
          isCorrect: false,
          feedback:
            'The overall slot is exactly what this lens judges. Correct figures do not excuse abandoning the lane.',
        },
        {
          id: 'b',
          label: 'Fine — covering more of the room is better use of the floor.',
          isCorrect: false,
          feedback:
            'WCS is a slot dance; spreading across the room is not better use of the floor, it is lost structure.',
        },
        {
          id: 'c',
          label: 'A spatial-structure fault — the couple has abandoned the slot, never re-establishing a consistent lane.',
          isCorrect: true,
          feedback:
            'Correct. A brief departure is fine, but permanently drifting off the slot is a real structural fault.',
        },
        {
          id: 'd',
          label: 'A character issue — it just looks a little disorganised.',
          isCorrect: false,
          feedback:
            'It may look disorganised, but the concrete problem is structural: the slot is gone.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Did they ever re-establish a consistent lane?' },
        { level: 2, title: 'Concept', content: 'Permanently drifting off the slot is abandoning the structure.' },
        { level: 3, title: 'Specific clue', content: 'Dancing across the room at an angle is not a slot.' },
        { level: 4, title: 'Guided solution', content: 'Choose the spatial-structure fault for abandoning the slot.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Abandonment caught' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Excusing an abandoned slot would put your structure marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' },
        { topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' },
      ],
      successFeedback: 'Brief leaves are fine; a slot that never returns is abandoned. You drew the line correctly.',
      failureFeedback: 'Permanently drifting off the slot without re-establishing a lane is a spatial-structure fault.',
    },
  ],
  reflectionPrompt: 'How many drifting patterns would it take before you decided a couple had genuinely abandoned their slot?',
  rewards: [{ type: 'xp', amount: 5, label: 'WCS structure trained' }],
};
