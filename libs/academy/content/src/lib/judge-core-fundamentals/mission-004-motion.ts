import { MissionDefinition } from '@academy/content-model';

/** Core Fundamentals mission 4 — the Motion lens. */
export const judgeCore004Motion: MissionDefinition = {
  id: 'judge-core-004-motion',
  campaignId: 'judge-core-fundamentals',
  title: 'How the Body Moves: The Motion Lens',
  summary:
    'Correct footwork with the wrong body action tells the wrong story. Judge how movement is produced, and whether it fits the music.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge the quality and source of body movement',
    'Match motion to the music, not just the steps',
    'Spot correct footwork paired with inappropriate motion',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Motion is where the movement comes from and how it is produced — rise and fall, sway from the base, Cuban action. Right steps with the wrong motion is a classic fault.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jc-004-c1',
      type: 'multiple-choice',
      title: 'Where the Sway Comes From',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'motion'],
      storyContext:
        'A Nightclub couple sways gently — but the movement is coming entirely from tilting the upper body side to side, with a still base.',
      prompt: 'How does the motion lens read this?',
      options: [
        {
          id: 'a',
          label: 'Good — any visible sway satisfies Nightclub’s soft, romantic feel.',
          isCorrect: false,
          feedback:
            'The look is not enough; Nightclub sway should be driven from the base, not faked by tipping the upper body.',
        },
        {
          id: 'b',
          label: 'A motion fault — Nightclub sway should be driven from the base, not the upper body.',
          isCorrect: true,
          feedback:
            'Correct. The source of the movement matters: base-driven sway is the dance; upper-body tilt is a substitute the lens should catch.',
        },
        {
          id: 'c',
          label: 'Irrelevant — as long as the timing is right, motion does not affect the score.',
          isCorrect: false,
          feedback:
            'Motion is its own lens with its own score. Correct timing does not excuse movement produced the wrong way.',
        },
        {
          id: 'd',
          label: 'A character fault, not a motion one — it only affects how romantic it looks.',
          isCorrect: false,
          feedback:
            'It may dull the character too, but the root issue is HOW the movement is generated — that is the motion lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Ask where the movement is generated, not just whether it is visible.' },
        { level: 2, title: 'Concept', content: 'Motion judges the source and quality of movement; Nightclub sway comes from the base.' },
        { level: 3, title: 'Specific clue', content: 'A still base with a tilting upper body is the substitute, not the real action.' },
        { level: 4, title: 'Guided solution', content: 'Choose the motion fault about base-driven sway.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Source of motion judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting upper-body fake-sway would reward a shortcut the dance is built to avoid.',
        },
      ],
      helpLinks: [{ topicId: 'judging.motion', label: 'Motion and Body Action' }],
      successFeedback: 'You judged where the movement came from, not just that it happened.',
      failureFeedback: 'Motion is about how movement is produced — base-driven sway, not a tilting upper body.',
    },
    {
      id: 'jc-004-c2',
      type: 'multiple-choice',
      title: 'Right Steps, Wrong Motion',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'motion'],
      storyContext:
        'A rolling, country-flavoured Cha Cha song is playing. A couple performs textbook Cha Cha footwork — but with sharp, staccato Latin (Cuban) motion that fights the rolling music.',
      prompt: 'What does the motion lens conclude?',
      options: [
        {
          id: 'a',
          label: 'Top marks — the footwork is textbook, so the motion must be right too.',
          isCorrect: false,
          feedback:
            'Footwork and motion are different lenses. Correct steps can carry motion that does not suit the music.',
        },
        {
          id: 'b',
          label: 'Cannot be judged — motion only matters when the footwork is wrong.',
          isCorrect: false,
          feedback:
            'Motion is judged on every performance, including clean-footed ones. Here the clean feet make the motion mismatch stand out.',
        },
        {
          id: 'c',
          label: 'A motion fault — the body action does not match the music, even though the steps are correct.',
          isCorrect: true,
          feedback:
            'Exactly. Motion must suit the music; sharp Cuban action against rolling country music is the wrong action for the song.',
        },
        {
          id: 'd',
          label: 'A timing fault — mismatched motion is really just being off the beat.',
          isCorrect: false,
          feedback:
            'They can be perfectly on the beat and still use motion that fights the music. That is a motion issue, not timing.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does the body action suit THIS song?' },
        { level: 2, title: 'Concept', content: 'Motion must match the music, not just the step pattern.' },
        { level: 3, title: 'Specific clue', content: 'Sharp Cuban action against rolling country music is a mismatch.' },
        { level: 4, title: 'Guided solution', content: 'Choose the motion fault for action that does not match the music.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Motion matched to music' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Scoring clean footwork as clean motion blurred two lenses and skewed the marks.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.motion', label: 'Motion and Body Action' },
        { topicId: 'judging.criteria', label: 'The Six Judging Lenses' },
      ],
      successFeedback: 'Right steps, wrong body action, judged on the motion lens. Cleanly separated.',
      failureFeedback: 'Correct footwork does not guarantee correct motion — judge whether the action suits the music.',
    },
  ],
  reflectionPrompt: 'Can you think of a dance where the "correct steps, wrong motion" trap would be easiest to miss?',
  rewards: [{ type: 'xp', amount: 5, label: 'Motion lens trained' }],
};
