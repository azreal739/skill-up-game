import { MissionDefinition } from '@academy/content-model';

/** Mock Theory mission 4 — motion recall across dances. */
export const judgeTheory004Motion: MissionDefinition = {
  id: 'judge-theory-004-motion',
  campaignId: 'judge-mock-theory',
  title: 'Paper III — Motion',
  summary: 'Revise the defining body action of each dance — and the fake that mimics it.',
  difficulty: 'medium',
  learningObjectives: [
    'Match each dance to its motion',
    'Recall the common fake for each motion',
    'Reason about motion from the body, not the look',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Each dance produces movement its own way — rise and fall, base sway, the anchor, Cuban action. Each has a fake that looks similar from the audience.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jt-004-c1',
      type: 'multiple-choice',
      title: 'Match the Motion',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'motion'],
      storyContext: 'An exam question pairs each dance with its defining motion.',
      prompt: 'Which pairing is correct?',
      options: [
        {
          id: 'a',
          label: 'Nightclub → rise and fall.',
          isCorrect: false,
          feedback:
            'Rise and fall is the Waltz. Nightclub uses sway and counter-sway from the base.',
        },
        {
          id: 'b',
          label: 'Cha Cha → the anchor settle.',
          isCorrect: false,
          feedback:
            'The anchor settle is West Coast Swing. The Cha Cha uses Cuban motion.',
        },
        {
          id: 'c',
          label: 'Waltz → rise and fall with swing and sway.',
          isCorrect: true,
          feedback:
            'Correct. Rise and fall is the defining Waltz motion.',
        },
        {
          id: 'd',
          label: 'West Coast Swing → Cuban action.',
          isCorrect: false,
          feedback:
            'Cuban action is the Cha Cha. WCS motion is the anchor with extension and compression.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which dance rises and falls?' },
        { level: 2, title: 'Concept', content: 'Match each dance to its body action.' },
        { level: 3, title: 'Specific clue', content: 'Rise and fall belongs to the 3/4 dance.' },
        { level: 4, title: 'Guided solution', content: 'Choose Waltz → rise and fall.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Motion matched' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Mismatching motions to dances would misjudge the motion lens on the floor.',
        },
      ],
      helpLinks: [{ topicId: 'judging.motion', label: 'Motion and Body Action' }],
      successFeedback: 'Rise and fall → Waltz. Matched.',
      failureFeedback: 'Rise and fall is the Waltz; Nightclub sways from the base, WCS anchors, Cha Cha uses Cuban motion.',
    },
    {
      id: 'jt-004-c2',
      type: 'multiple-choice',
      title: 'Spot the Fakes',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'motion'],
      multiSelect: true,
      storyContext:
        'An exam question asks which of the following are the KNOWN FAKES that mimic a real motion from the audience.',
      prompt: 'Select every statement that describes a common motion fake.',
      options: [
        {
          id: 'a',
          label: 'Nightclub sway produced by tilting the upper body over a still base.',
          isCorrect: true,
          feedback:
            'Yes — real Nightclub sway is base-driven; an upper-body tilt is the fake.',
        },
        {
          id: 'b',
          label: 'Waltz rise and fall produced by a stiff, quick knee-bob with a rigid torso.',
          isCorrect: true,
          feedback:
            'Yes — real rise and fall is a smooth swing through the body; a knee-bob is the fake.',
        },
        {
          id: 'c',
          label: 'Cha Cha hip action driven from bending and straightening the knees.',
          isCorrect: false,
          feedback:
            'That is GENUINE Cuban motion, not a fake — knee-driven is exactly right.',
        },
        {
          id: 'd',
          label: 'Cha Cha hip action wagged from the waist over locked, straight legs.',
          isCorrect: true,
          feedback:
            'Yes — real Cuban action comes through the knees; waist-wagging over stiff legs is the fake.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'A fake looks right but is produced the wrong way.' },
        { level: 2, title: 'Concept', content: 'Genuine motion is driven from the correct part of the body.' },
        { level: 3, title: 'Specific clue', content: 'Knee-driven Cuban action is real; the other three are fakes.' },
        { level: 4, title: 'Guided solution', content: 'Select the upper-body sway, the knee-bob rise and fall, and the waist-wagged hips.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Fakes spotted' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Failing to recognise the fakes would let shortcuts pass as genuine motion on the floor.',
        },
      ],
      helpLinks: [
        { topicId: 'dance.nightclub', label: 'Judging the Nightclub' },
        { topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' },
      ],
      successFeedback: 'Three fakes, one genuine — you know how each motion is really produced.',
      failureFeedback: 'The fakes: upper-body sway, knee-bob rise and fall, waist-wagged hips. Knee-driven Cuban action is genuine.',
    },
  ],
  reflectionPrompt: 'What single question do you ask yourself to tell a genuine motion from its fake?',
  rewards: [{ type: 'xp', amount: 5, label: 'Paper III motion done' }],
};
