import { MissionDefinition } from '@academy/content-model';

/** Final Certification mission 4 — station: motion and character. */
export const judgeFinal004MotionCharacter: MissionDefinition = {
  id: 'judge-final-004-motion-character',
  campaignId: 'judge-final-cert',
  title: 'Station 3 — Motion & Character',
  summary: 'Judge how the body moves and whether the couple embodies the dance — kept separate.',
  difficulty: 'hard',
  learningObjectives: [
    'Judge motion by its source, not its look',
    'Judge character as the right personality',
    'Keep motion and character apart',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Third station: motion and character. How the movement is produced is motion; the personality it projects is character. They are easy to blur — do not.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jf-004-c1',
      type: 'multiple-choice',
      title: 'Look vs Source',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'motion'],
      storyContext:
        'A Nightclub couple looks like they are swaying beautifully — but the movement is all upper-body tilt over a motionless base.',
      prompt: 'How does the motion lens score this?',
      options: [
        {
          id: 'a',
          label: 'Low — genuine Nightclub sway is base-driven; an upper-body tilt over a still base is a motion fault, however good it looks.',
          isCorrect: true,
          feedback:
            'Correct. Motion judges the source of movement, not the audience impression.',
        },
        {
          id: 'b',
          label: 'High — if it looks like sway from the audience, it is sway.',
          isCorrect: false,
          feedback:
            'The look is not enough; base-driven sway is the dance, and this is the fake.',
        },
        {
          id: 'c',
          label: 'Unaffected — motion cannot be judged on sway alone.',
          isCorrect: false,
          feedback:
            'Sway is exactly a motion quality, and this one is produced the wrong way.',
        },
        {
          id: 'd',
          label: 'It is a character issue — it only looks less romantic.',
          isCorrect: false,
          feedback:
            'The root problem is where the movement is generated — the motion lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Where is the movement generated?' },
        { level: 2, title: 'Concept', content: 'Motion judges the source, not the look.' },
        { level: 3, title: 'Specific clue', content: 'Upper-body tilt over a still base is the fake.' },
        { level: 4, title: 'Guided solution', content: 'Choose the low motion score for upper-body sway.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Source judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding a good-looking fake would pass shortcuts as genuine motion.',
        },
      ],
      helpLinks: [{ topicId: 'dance.nightclub', label: 'Judging the Nightclub' }],
      successFeedback: 'Judged the source, not the look. Motion fault caught.',
      failureFeedback: 'Motion judges the source: base-driven sway is genuine, upper-body tilt is a fault.',
    },
    {
      id: 'jf-004-c2',
      type: 'multiple-choice',
      title: 'Right Steps, Wrong Personality',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'character'],
      storyContext:
        'A Cha Cha couple executes every figure precisely, with genuine Cuban motion, but with a reserved, formal, almost solemn attitude.',
      prompt: 'Which lens takes the deduction?',
      options: [
        {
          id: 'a',
          label: 'Motion — solemnity dulls the hip action.',
          isCorrect: false,
          feedback:
            'The Cuban motion was genuine; the problem is the attitude, which is character.',
        },
        {
          id: 'b',
          label: 'Timing — a solemn Cha Cha must be dragging the beat.',
          isCorrect: false,
          feedback:
            'Nothing says they were off the beat; solemnity is a character matter.',
        },
        {
          id: 'c',
          label: 'Character — the Cha Cha should be fiery and cheeky, and a solemn attitude is the wrong personality.',
          isCorrect: true,
          feedback:
            'Correct. Correct figures and motion with the wrong energy is a character deduction.',
        },
        {
          id: 'd',
          label: 'Signature figures — solemnity means the figures were wrong.',
          isCorrect: false,
          feedback:
            'The figures were precise; the shortfall is the attitude, which is character.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What is wrong — the movement, or the energy?' },
        { level: 2, title: 'Concept', content: 'Wrong energy is a character deduction.' },
        { level: 3, title: 'Specific clue', content: 'Cha Cha should be cheeky; solemn is wrong.' },
        { level: 4, title: 'Guided solution', content: 'Choose character.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Character placed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Filing the wrong-energy fault under motion or figures would scramble the scorecard.',
        },
      ],
      helpLinks: [{ topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' }],
      successFeedback: 'Right steps, wrong personality — a character deduction. Kept apart from motion.',
      failureFeedback: 'Correct figures and motion with the wrong energy is a character deduction.',
    },
  ],
  reflectionPrompt: 'How do you stop a strong motion score from bleeding into character, or vice versa?',
  rewards: [{ type: 'xp', amount: 5, label: 'Station 3 cleared' }],
};
