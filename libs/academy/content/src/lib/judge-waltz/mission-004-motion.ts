import { MissionDefinition } from '@academy/content-model';

/** Waltz module mission 4 — motion: rise and fall, swing and sway. */
export const judgeWaltz004Motion: MissionDefinition = {
  id: 'judge-waltz-004-motion',
  campaignId: 'judge-waltz',
  title: 'Rise and Fall',
  summary:
    'Rise and fall is the beating heart of Waltz motion. Learn to judge whether it is truly there — and where it comes from.',
  difficulty: 'medium',
  learningObjectives: [
    'Identify genuine rise and fall',
    'Distinguish it from bobbing or bending the knees',
    'Recognise swing and sway as part of Waltz motion',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The single most common Waltz fault is timing that is fine but rise and fall that is weak or faked. Learn what real rise and fall looks like so you can score its absence.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jw-004-c1',
      type: 'multiple-choice',
      title: 'Rise, or Bob?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'waltz', 'motion'],
      storyContext:
        'A couple bounces up and down by quickly bending and straightening their knees on each beat, keeping the upper body stiff.',
      prompt: 'Does this satisfy Waltz rise and fall?',
      options: [
        {
          id: 'a',
          label: 'Yes — any up-and-down movement is rise and fall.',
          isCorrect: false,
          feedback:
            'Vertical movement alone is not rise and fall. A stiff knee-bob is the classic substitute the lens should catch.',
        },
        {
          id: 'b',
          label: 'Yes — as long as it happens on the beat, the mechanism does not matter.',
          isCorrect: false,
          feedback:
            'On-time is a timing question. Rise and fall is judged on how the height change is produced, not just when.',
        },
        {
          id: 'c',
          label: 'No — genuine rise and fall is a smooth swing through the body and feet, not a stiff knee-bob.',
          isCorrect: true,
          feedback:
            'Correct. Real rise and fall flows through the ankles, knees and body as part of the swing; a bob is a shortcut.',
        },
        {
          id: 'd',
          label: 'No — because rise and fall belongs to the character lens, not motion.',
          isCorrect: false,
          feedback:
            'Rise and fall is squarely a motion (body action) quality; the reason it fails here is the stiff bob, not the lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the height change flowing through the body, or a stiff bounce?' },
        { level: 2, title: 'Concept', content: 'Rise and fall is a smooth swing through the feet and body.' },
        { level: 3, title: 'Specific clue', content: 'A quick knee-bob with a stiff torso is the fake, not the real thing.' },
        { level: 4, title: 'Guided solution', content: 'Choose "No — real rise and fall is a smooth swing, not a knee-bob."' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Rise and fall judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Accepting a knee-bob as rise and fall would reward the exact shortcut the Waltz is built to avoid.',
        },
      ],
      helpLinks: [{ topicId: 'dance.waltz', label: 'Judging the Waltz' }],
      successFeedback: 'Swing, not bob. You judged how the height change was produced.',
      failureFeedback: 'Rise and fall is a smooth swing through the body and feet — a stiff knee-bob does not satisfy it.',
    },
    {
      id: 'jw-004-c2',
      type: 'multiple-choice',
      title: 'Timing Fine, Motion Weak',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'waltz', 'motion'],
      storyContext:
        'A couple is perfectly on the 3/4 music, but their rise and fall is shallow and barely visible throughout the routine.',
      prompt: 'How should the scorecard reflect this?',
      options: [
        {
          id: 'a',
          label: 'Timing scores well; motion scores down for weak, shallow rise and fall.',
          isCorrect: true,
          feedback:
            'Correct. The lenses are independent: on-time keeps timing high, while shallow rise and fall lowers motion.',
        },
        {
          id: 'b',
          label: 'Everything scores down — weak rise and fall means the whole Waltz has failed.',
          isCorrect: false,
          feedback:
            'One weak lens does not sink the others. Their timing was genuinely good and should score as such.',
        },
        {
          id: 'c',
          label: 'Everything scores up — being on the music covers for the weak motion.',
          isCorrect: false,
          feedback:
            'Timing cannot rescue motion. Shallow rise and fall is a real motion fault regardless of good timing.',
        },
        {
          id: 'd',
          label: 'It cannot be judged — you can only fault motion when timing is also wrong.',
          isCorrect: false,
          feedback:
            'Motion is judged on every routine. Good timing with weak motion is a very common, very scorable combination.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Score each lens on its own evidence.' },
        { level: 2, title: 'Concept', content: 'On-time timing and weak motion coexist — mark them separately.' },
        { level: 3, title: 'Specific clue', content: 'Timing up, motion down; neither drags the other.' },
        { level: 4, title: 'Guided solution', content: 'Choose timing high, motion down for shallow rise and fall.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Lenses kept independent' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Letting good timing lift the motion score would make your marks disagree with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.motion', label: 'Motion and Body Action' },
        { topicId: 'judging.criteria', label: 'The Six Judging Lenses' },
      ],
      successFeedback: 'Timing up, motion down, scored independently. Exactly right.',
      failureFeedback: 'Independent lenses: good timing stays high while shallow rise and fall lowers motion.',
    },
  ],
  reflectionPrompt: 'Why do you think "good timing, weak rise and fall" is the most common Waltz combination a judge sees?',
  rewards: [{ type: 'xp', amount: 5, label: 'Waltz motion trained' }],
};
