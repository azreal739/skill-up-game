import { MissionDefinition } from '@academy/content-model';

/** Cha Cha module mission 4 — motion: Cuban action, matched to the music. */
export const judgeChaCha004Motion: MissionDefinition = {
  id: 'judge-cha-cha-004-motion',
  campaignId: 'judge-cha-cha',
  title: 'Cuban Motion',
  summary:
    'Cuban action — hip movement driven through the knees — is the Cha Cha’s motion. Learn to judge whether it is genuine and suited to the music.',
  difficulty: 'medium',
  learningObjectives: [
    'Identify genuine Cuban motion',
    'Reject faked hip-swinging over stiff legs',
    'Match the body action to the music',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Cuban motion comes from bending and straightening the knees, letting the hips settle — not from wagging the hips over locked legs. And the action must suit the song being played.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jcc-004-c1',
      type: 'multiple-choice',
      title: 'Cuban or Faked',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'cha-cha', 'motion'],
      storyContext:
        'A couple swings their hips side to side energetically — but their knees stay locked and straight, so the hip movement is pushed from the waist rather than driven from the legs.',
      prompt: 'How does the motion lens read this?',
      options: [
        {
          id: 'a',
          label: 'Full marks — plenty of visible hip movement is exactly what Cuban motion means.',
          isCorrect: false,
          feedback:
            'Visible hip swing is not the same as Cuban motion. Genuine Cuban action is driven through the knees, not the waist.',
        },
        {
          id: 'b',
          label: 'Full marks — as long as the timing is right, how the hips move does not matter.',
          isCorrect: false,
          feedback:
            'Timing is a different lens. Motion judges HOW the hip action is produced, and this one is faked.',
        },
        {
          id: 'c',
          label: 'A character issue — it just looks a little forced.',
          isCorrect: false,
          feedback:
            'It may look forced, but the concrete problem is how the movement is generated — the motion lens.',
        },
        {
          id: 'd',
          label: 'A motion fault — genuine Cuban action is driven through the bending and straightening of the knees, not wagged from the waist over locked legs.',
          isCorrect: true,
          feedback:
            'Correct. The source matters: real Cuban motion flows through the knees; hip-wagging over stiff legs is the fake.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Watch the knees, not just the hips.' },
        { level: 2, title: 'Concept', content: 'Cuban motion is generated through the knees.' },
        { level: 3, title: 'Specific clue', content: 'Locked legs with waist-wagging is the fake.' },
        { level: 4, title: 'Guided solution', content: 'Choose the motion fault about knee-driven Cuban action.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Cuban action judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting waist-wagging as Cuban motion would reward the exact shortcut the action is built to avoid.',
        },
      ],
      helpLinks: [{ topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' }],
      successFeedback: 'You looked at the knees. That is where Cuban motion is generated.',
      failureFeedback: 'Cuban motion flows through the knees; hip-wagging over locked legs is a motion fault.',
    },
    {
      id: 'jcc-004-c2',
      type: 'multiple-choice',
      title: 'Right Motion for the Music',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'cha-cha', 'motion'],
      storyContext:
        'A rolling, Latin-flavoured country Cha Cha is playing. Couple A dances with smooth, rolling Cuban motion that matches the music; couple B drives sharp, staccato, hard-edged action that fights the rolling feel.',
      prompt: 'On the motion lens, how do they compare?',
      options: [
        {
          id: 'a',
          label: 'Identical — both moved their hips, so both satisfy the motion lens.',
          isCorrect: false,
          feedback:
            'Motion must suit the music. Rolling music calls for rolling Cuban action, not a sharp, staccato drive.',
        },
        {
          id: 'b',
          label: 'Couple A is stronger — smooth, rolling Cuban motion suits this rolling music, while B’s sharp, staccato action fights it.',
          isCorrect: true,
          feedback:
            'Right. The action must match the song; A’s Cuban motion fits the rolling feel, B’s does not.',
        },
        {
          id: 'c',
          label: 'Couple B is stronger — sharper action always looks more committed.',
          isCorrect: false,
          feedback:
            'Sharpness is not the criterion; the action that suits the music wins the motion lens here.',
        },
        {
          id: 'd',
          label: 'Neither — matching motion to music is a character question, not motion.',
          isCorrect: false,
          feedback:
            'Whether the body action suits the song is exactly the motion lens, not character.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which action suits THIS rolling music?' },
        { level: 2, title: 'Concept', content: 'Motion must match the song, not just be present.' },
        { level: 3, title: 'Specific clue', content: 'Rolling music wants rolling Cuban action.' },
        { level: 4, title: 'Guided solution', content: 'Choose couple A for motion that matches the music.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Motion matched to music' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Scoring the two as identical would ignore a real difference the panel will mark.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.motion', label: 'Motion and Body Action' },
        { topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' },
      ],
      successFeedback: 'Rolling music, rolling Cuban action — A matched the song. That is the motion lens.',
      failureFeedback: 'Motion must suit the music: rolling music calls for rolling Cuban action, not a sharp, staccato drive.',
    },
  ],
  reflectionPrompt: 'What visual cue tells you Cuban motion is coming from the knees rather than being pushed from the waist?',
  rewards: [{ type: 'xp', amount: 5, label: 'Cha Cha motion trained' }],
};
