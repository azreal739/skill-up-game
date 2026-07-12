import { MissionDefinition } from '@academy/content-model';

/** Triple Two module mission 4 — motion: whole-body shape, opposite in the triples. */
export const judgeTripleTwo004Motion: MissionDefinition = {
  id: 'judge-triple-two-004-motion',
  campaignId: 'judge-triple-two',
  title: 'Opposite Shape',
  summary:
    'Triple Two motion is whole-body shape — and the successive triples should shape OPPOSITE ways. Learn to judge the shaping, not just the steps.',
  difficulty: 'medium',
  learningObjectives: [
    'Identify whole-body shape in the triples',
    'Recognise the opposite shaping of successive triples',
    'Fault shape that is flat or repeats the same way',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The signature of Triple Two motion is shape — and crucially, the two triples shape opposite ways, one then the other, giving the dance its continuous, weaving flow.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jtt-004-c1',
      type: 'multiple-choice',
      title: 'Same or Opposite',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'triple-two', 'motion'],
      storyContext:
        'A couple keeps the timing and travels well, but shapes both triples the SAME way each basic, rather than opposite ways.',
      prompt: 'How does the motion lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — any body shape satisfies the motion lens.',
          isCorrect: false,
          feedback:
            'Shape is necessary but not sufficient; the Triple Two’s successive triples should shape OPPOSITE ways.',
        },
        {
          id: 'b',
          label: 'Full marks — as long as the timing is right, shaping direction does not matter.',
          isCorrect: false,
          feedback:
            'Timing is a different lens. The opposite shaping is a defining motion quality of the dance.',
        },
        {
          id: 'c',
          label: 'A motion fault — the successive triples should take opposite shape, and shaping both the same way loses the Triple Two’s defining continuous flow.',
          isCorrect: true,
          feedback:
            'Correct. The opposite shaping is what makes the dance weave and flow; same-way shaping is a real motion fault.',
        },
        {
          id: 'd',
          label: 'A spatial-structure fault — shaping is really about the floor path.',
          isCorrect: false,
          feedback:
            'The shaping is a body action (motion); the floor path is a separate spatial-structure matter.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which way should each successive triple shape?' },
        { level: 2, title: 'Concept', content: 'Successive Triple Two triples shape opposite ways.' },
        { level: 3, title: 'Specific clue', content: 'Both the same way loses the weaving flow.' },
        { level: 4, title: 'Guided solution', content: 'Choose the motion fault for same-way shaping.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Opposite shape judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting same-way shaping would erase the Triple Two’s defining opposite-shape motion.',
        },
      ],
      helpLinks: [{ topicId: 'dance.triple-two', label: 'Judging the Triple Two' }],
      successFeedback: 'Opposite shape is the point; shaping both the same way is a motion fault.',
      failureFeedback: 'Successive Triple Two triples should shape opposite ways; same-way shaping is a motion fault.',
    },
    {
      id: 'jtt-004-c2',
      type: 'multiple-choice',
      title: 'Flat, No Shape',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'triple-two', 'motion'],
      storyContext:
        'A couple dances the timing accurately but with a stiff, upright body and no shaping through the torso at all.',
      prompt: 'How does the motion lens read the flat, unshaped body?',
      options: [
        {
          id: 'a',
          label: 'A motion fault — the Triple Two’s defining motion is whole-body shape, and a stiff, unshaped body is missing it.',
          isCorrect: true,
          feedback:
            'Correct. Shape through the body is the motion of the dance; a stiff, upright frame scores down on motion.',
        },
        {
          id: 'b',
          label: 'Full marks — an upright frame shows control.',
          isCorrect: false,
          feedback:
            'A stiff frame is not control here; the Triple Two needs shape through the whole body.',
        },
        {
          id: 'c',
          label: 'A timing fault — no shape means they rushed.',
          isCorrect: false,
          feedback:
            'They kept the timing; the missing shape is a motion matter, not timing.',
        },
        {
          id: 'd',
          label: 'Irrelevant — shape is optional in the Triple Two.',
          isCorrect: false,
          feedback:
            'Shape is not optional; it is the defining motion of the dance.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What is the dance’s defining body action?' },
        { level: 2, title: 'Concept', content: 'Whole-body shape is the Triple Two’s motion.' },
        { level: 3, title: 'Specific clue', content: 'A stiff, upright frame is missing the shape.' },
        { level: 4, title: 'Guided solution', content: 'Choose the motion fault for the flat body.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Shape judged' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Rewarding a shapeless body would push the Triple Two away from its defining motion.',
        },
      ],
      helpLinks: [{ topicId: 'judging.motion', label: 'Motion and Body Action' }],
      successFeedback: 'No shape, no Triple Two motion. Marked down correctly.',
      failureFeedback: 'Whole-body shape is the Triple Two’s defining motion; a stiff, unshaped body is a motion fault.',
    },
  ],
  reflectionPrompt: 'What visual cue tells you the successive triples are genuinely shaping opposite ways?',
  rewards: [{ type: 'xp', amount: 5, label: 'Triple Two motion trained' }],
};
