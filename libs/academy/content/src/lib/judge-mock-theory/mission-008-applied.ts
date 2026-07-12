import { MissionDefinition } from '@academy/content-model';

/** Mock Theory mission 8 — applied theory: comparing exam answers. */
export const judgeTheory008Applied: MissionDefinition = {
  id: 'judge-theory-008-applied',
  campaignId: 'judge-mock-theory',
  title: 'Paper VII — Applied Theory',
  summary:
    'Theory is only useful applied. Compare two candidate answers to a judging question and pick the defensible one.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply recalled theory to a judging question',
    'Compare two answers for defensibility',
    'Reject answers that mix up the lenses',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'The paper ends by applying theory. You will read a short scenario and two candidate answers, and choose the one that reasons correctly from the lenses.',
    },
  ],
  contextArtefacts: [
    {
      id: 'applied-scenario',
      type: 'message',
      title: 'The scenario',
      content:
        'A couple dances a technically clean Nightclub but travels steadily around the whole room, and their sway comes from tilting the upper body.',
    },
  ],
  challenges: [
    {
      id: 'jt-008-c1',
      type: 'contract-comparison',
      title: 'Two Candidate Answers',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'process'],
      storyContext: 'Two candidates answer: "Which lenses should be marked down, and why?"',
      prompt: 'Which answer is the defensible one?',
      options: [
        {
          id: 'a',
          label:
            'Answer A: “Timing — travelling around the room means they rushed the count.”',
          isCorrect: false,
          feedback:
            'They can travel perfectly on time. Travel is spatial structure, not timing; and the sway issue is motion.',
        },
        {
          id: 'b',
          label:
            'Answer B: “Character — a Nightclub that travels just looks unromantic.”',
          isCorrect: false,
          feedback:
            'The faults are structural and motion-based, not character. This misfiles both problems.',
        },
        {
          id: 'c',
          label:
            'Answer C: “Spatial structure — a Nightclub is non-progressive, so the constant travel is a structural fault; and motion — the sway is upper-body tilt, not base-driven.”',
          isCorrect: true,
          feedback:
            'Correct. Two faults, two lenses: travelling is spatial structure, upper-body sway is motion. Timing and character are unaffected.',
        },
        {
          id: 'd',
          label:
            'Answer D: “Nothing — technically clean dancing cannot be marked down.”',
          isCorrect: false,
          feedback:
            'Clean footwork does not excuse a structural fault and a faked motion. Both are real deductions.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Name the lens for each of the two faults.' },
        { level: 2, title: 'Concept', content: 'Travel = spatial structure; upper-body sway = motion.' },
        { level: 3, title: 'Specific clue', content: 'Two faults, two lenses — not timing or character.' },
        { level: 4, title: 'Guided solution', content: 'Choose the spatial-structure-and-motion answer.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Theory applied' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'A misfiled answer would put your marks out of line with the panel and the mark scheme.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.criteria', label: 'The Six Judging Lenses' },
        { topicId: 'dance.nightclub', label: 'Judging the Nightclub' },
      ],
      successFeedback: 'Two faults, two lenses — spatial structure and motion. Defensible.',
      failureFeedback: 'Travel is spatial structure; upper-body sway is motion. Neither is timing or character.',
    },
    {
      id: 'jt-008-c2',
      type: 'multiple-choice',
      title: 'One More Application',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'process'],
      storyContext:
        'A couple dances a Waltz on perfect 3/4 time with rich figures and regal character, but with no rise and fall at all.',
      prompt: 'Which single lens takes the deduction?',
      options: [
        {
          id: 'a',
          label: 'Motion — rise and fall is a body action, so its absence is a motion deduction; timing, figures and character stay strong.',
          isCorrect: true,
          feedback:
            'Correct. Rise and fall is the motion lens; the other lenses were strong and stay so.',
        },
        {
          id: 'b',
          label: 'Timing — no rise and fall must mean they were off the beat.',
          isCorrect: false,
          feedback:
            'They were on perfect 3/4 time. Rise and fall is not a timing matter.',
        },
        {
          id: 'c',
          label: 'Character — flat rise and fall makes the dance less regal.',
          isCorrect: false,
          feedback:
            'The character was regal. Rise and fall is a produced body action — the motion lens.',
        },
        {
          id: 'd',
          label: 'Signature figures — missing rise and fall means the figures were wrong.',
          isCorrect: false,
          feedback:
            'The figures were rich and correct. Rise and fall is motion, not a figure.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which lens does rise and fall belong to?' },
        { level: 2, title: 'Concept', content: 'Rise and fall is a body action — motion.' },
        { level: 3, title: 'Specific clue', content: 'Everything else was strong.' },
        { level: 4, title: 'Guided solution', content: 'Choose motion.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Application nailed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Filing rise and fall under the wrong lens would recur on every Waltz you judge.',
        },
      ],
      helpLinks: [{ topicId: 'dance.waltz', label: 'Judging the Waltz' }],
      successFeedback: 'Rise and fall → motion. The other lenses stay strong.',
      failureFeedback: 'Rise and fall is a body action — its absence is a motion deduction, not timing, character or figures.',
    },
  ],
  reflectionPrompt: 'When two faults appear at once, how do you keep from letting one bleed into the other’s lens?',
  rewards: [{ type: 'xp', amount: 5, label: 'Paper VII applied done' }],
};
