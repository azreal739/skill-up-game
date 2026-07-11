import { MissionDefinition } from '@academy/content-model';

/** Core Fundamentals mission 7 — the Spatial Structure lens. */
export const judgeCore007SpatialStructure: MissionDefinition = {
  id: 'judge-core-007-spatial-structure',
  campaignId: 'judge-core-fundamentals',
  title: 'Using the Floor: The Spatial Structure Lens',
  summary:
    'Progressive or contained? Slotted or free? Judge whether the couple uses the floor the way the dance demands — and dances safely on it.',
  difficulty: 'medium',
  learningObjectives: [
    'Distinguish progressive from non-progressive dances',
    'Recognise slot structure and its allowed direction changes',
    'Judge floorcraft alongside spatial structure',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Some dances travel the line of dance; some hold a shape parallel to the audience. West Coast Swing lives in a slot. Using the wrong structure is a fault — and so is a collision.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jc-007-c1',
      type: 'multiple-choice',
      title: 'Too Much Travel',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'spatial-structure'],
      storyContext:
        'A Nightclub couple travels continuously counter-clockwise all the way around the floor, like a progressive dance.',
      prompt: 'How does the spatial structure lens read this?',
      options: [
        {
          id: 'a',
          label: 'A spatial-structure fault — Nightclub is non-progressive and should hold a contained shape, not travel the line of dance.',
          isCorrect: true,
          feedback:
            'Correct. Nightclub keeps a contained geometric area parallel to the audience; circling the floor is the wrong structure.',
        },
        {
          id: 'b',
          label: 'Good use of space — covering the whole floor always impresses a panel.',
          isCorrect: false,
          feedback:
            'Covering the floor is only good when the dance is progressive. For a non-progressive dance it is a structural error.',
        },
        {
          id: 'c',
          label: 'A timing fault — travelling too far means the couple rushed the counts.',
          isCorrect: false,
          feedback:
            'They can travel the whole floor perfectly on time. Where they go is spatial structure, not timing.',
        },
        {
          id: 'd',
          label: 'Fine as long as they avoid other couples — only collisions matter here.',
          isCorrect: false,
          feedback:
            'Floorcraft matters too, but even with no collisions, a non-progressive dance that circles the floor uses the wrong structure.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is Nightclub progressive or non-progressive?' },
        { level: 2, title: 'Concept', content: 'Non-progressive dances hold a contained shape rather than travelling the line of dance.' },
        { level: 3, title: 'Specific clue', content: 'Continuous travel around the floor is the progressive pattern, wrong for Nightclub.' },
        { level: 4, title: 'Guided solution', content: 'Choose the spatial-structure fault.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Structure judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding a non-progressive dance for travelling would blur the line between whole categories of dance.',
        },
      ],
      helpLinks: [{ topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' }],
      successFeedback: 'Contained means contained. You judged the structure the dance actually calls for.',
      failureFeedback: 'Non-progressive dances hold a shape; circling the floor is the progressive pattern and the wrong structure here.',
    },
    {
      id: 'jc-007-c2',
      type: 'multiple-choice',
      title: 'Leaving the Slot',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'spatial-structure'],
      storyContext:
        'A West Coast Swing couple briefly changes direction to lead a whip, then immediately re-establishes their line parallel to the audience.',
      prompt: 'How should the spatial structure lens treat this brief direction change?',
      options: [
        {
          id: 'a',
          label: 'A fault — a slot dance must never change direction for any reason.',
          isCorrect: false,
          feedback:
            'Too strict. A brief, purposeful direction change that returns to the slot is allowed, even expected, in figures like the whip.',
        },
        {
          id: 'b',
          label: 'A fault — leaving the line parallel to the audience is always abandoning the slot.',
          isCorrect: false,
          feedback:
            'Momentarily is not the same as abandoning. The slot is abandoned when the couple stops returning to it, not for one figure.',
        },
        {
          id: 'c',
          label: 'It moves this to floorcraft — direction changes are only about avoiding collisions.',
          isCorrect: false,
          feedback:
            'Floorcraft is a related concern, but whether the couple keeps their slot is squarely the spatial-structure lens.',
        },
        {
          id: 'd',
          label: 'Acceptable — a brief, purposeful direction change that re-establishes the slot is within the structure.',
          isCorrect: true,
          feedback:
            'Right. The slot allows momentary direction changes for figures like the whip, as long as the couple returns to it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Did they abandon the slot, or briefly leave and return?' },
        { level: 2, title: 'Concept', content: 'The slot permits brief, purposeful direction changes that re-establish the line.' },
        { level: 3, title: 'Specific clue', content: 'They immediately re-established the line parallel to the audience.' },
        { level: 4, title: 'Guided solution', content: 'Choose the option that accepts the brief, re-established change.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Slot nuance judged' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Penalising a legal whip would teach couples to strip their dancing of correct figures.',
        },
      ],
      helpLinks: [{ topicId: 'judging.spatial-structure', label: 'Spatial Structure and Floorcraft' }],
      successFeedback: 'Brief, purposeful, re-established. That is the slot working as intended.',
      failureFeedback: 'The slot is abandoned only when a couple stops returning to it — not for one purposeful figure.',
    },
  ],
  reflectionPrompt: 'How many direction changes would it take before you decided a couple had genuinely abandoned their slot?',
  rewards: [{ type: 'xp', amount: 5, label: 'Spatial structure lens trained' }],
};
