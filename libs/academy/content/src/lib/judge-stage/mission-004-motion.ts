import { MissionDefinition } from '@academy/content-model';

/** Stage module mission 4 — motion: technical quality of jumps, turns, kicks. */
export const judgeStage004Motion: MissionDefinition = {
  id: 'judge-stage-004-motion',
  campaignId: 'judge-stage',
  title: 'Jumps, Turns, Kicks',
  summary:
    'Stage motion is the technical quality of the common vocabulary — jumps, turns and kicks — plus era-appropriate body line. Learn to judge elevation, control and spotting.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge the technical quality of jumps, turns and kicks',
    'Recognise control, elevation and spotting',
    'Fault an out-of-control trick attempted beyond a performer’s control',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Jumps need elevation and a controlled landing; turns need spotting and control; kicks need height WITH control. A big trick thrown out of control is a motion fault, not a highlight.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jsg-004-c1',
      type: 'multiple-choice',
      title: 'Big or Controlled',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'stage', 'motion'],
      storyContext:
        'A performer throws a huge multiple turn but has no spotting and crashes out of it off balance, staggering to recover before the next move.',
      prompt: 'How does the motion lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — attempting a big multiple turn is impressive whatever the landing.',
          isCorrect: false,
          feedback:
            'Ambition is not the standard; a turn needs spotting and control, and crashing out off balance is a motion fault.',
        },
        {
          id: 'b',
          label: 'A motion fault — a turn needs spotting and control, and one that crashes out off balance and staggers to recover is executed beyond the performer’s control.',
          isCorrect: true,
          feedback:
            'Correct. Elevation and difficulty do not excuse lost control; a crashed turn scores down on motion.',
        },
        {
          id: 'c',
          label: 'A character issue — a wobbly landing just looks a bit nervous.',
          isCorrect: false,
          feedback:
            'It reads nervous, but the concrete problem is a turn executed beyond control — a motion matter.',
        },
        {
          id: 'd',
          label: 'A timing fault — crashing out means they lost the count.',
          isCorrect: false,
          feedback:
            'They may keep the count; the fault is the lack of spotting and control — a motion quality.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Was the turn controlled, or thrown beyond control?' },
        { level: 2, title: 'Concept', content: 'Motion judges the technical quality — control and spotting.' },
        { level: 3, title: 'Specific clue', content: 'A crashed, staggering turn is out of control.' },
        { level: 4, title: 'Guided solution', content: 'Choose the motion fault for the crashed turn.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Control judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding out-of-control tricks would drop the standard for the technical quality Stage motion demands.',
        },
      ],
      helpLinks: [{ topicId: 'dance.stage', label: 'Judging Stage and Era Styles' }],
      successFeedback: 'Big but out of control — a motion fault. A turn needs spotting and control.',
      failureFeedback: 'A turn needs spotting and control; one that crashes out off balance is executed beyond the performer’s control.',
    },
    {
      id: 'jsg-004-c2',
      type: 'multiple-choice',
      title: 'Height With Control',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'stage', 'motion'],
      storyContext:
        'One performer throws high kicks that fling the leg up but drop it uncontrolled; another kicks to the same height with a controlled lift and placement, landing back precisely on balance.',
      prompt: 'On the motion lens, how do the two compare?',
      options: [
        {
          id: 'a',
          label: 'They are equal — both kicks reached the same height, and height is all that counts.',
          isCorrect: false,
          feedback:
            'Height alone is not the standard; a kick needs height WITH control, so the controlled kick is stronger.',
        },
        {
          id: 'b',
          label: 'The first is better — flinging the leg higher shows more commitment.',
          isCorrect: false,
          feedback:
            'A flung, uncontrolled kick is the fault, not the strength; controlled height is what the motion lens rewards.',
        },
        {
          id: 'c',
          label: 'The first is better — control makes a kick look too careful.',
          isCorrect: false,
          feedback:
            'Control is not over-carefulness; a controlled kick to full height is exactly the technical quality wanted.',
        },
        {
          id: 'd',
          label: 'The second is stronger — a kick needs height WITH control, and a controlled lift and placement landing on balance beats a flung, uncontrolled leg.',
          isCorrect: true,
          feedback:
            'Right. Same height, but the controlled kick shows the technical quality the motion lens rewards.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is height alone enough, or does control matter?' },
        { level: 2, title: 'Concept', content: 'A kick needs height WITH control.' },
        { level: 3, title: 'Specific clue', content: 'A controlled lift and placement beats a flung leg.' },
        { level: 4, title: 'Guided solution', content: 'Choose the controlled kick as stronger.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Controlled height credited' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Crediting a flung kick over a controlled one would teach performers to sacrifice control for height.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.motion', label: 'Motion and Body Action' },
        { topicId: 'dance.stage', label: 'Judging Stage and Era Styles' },
      ],
      successFeedback: 'Controlled height beats a flung leg. Stage motion, judged.',
      failureFeedback: 'A kick needs height WITH control; a controlled lift and placement landing on balance beats a flung, uncontrolled leg.',
    },
  ],
  reflectionPrompt: 'How do you weigh ambition against control when a performer attempts a trick at the edge of their ability?',
  rewards: [{ type: 'xp', amount: 5, label: 'Stage motion trained' }],
};
