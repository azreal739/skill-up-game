import { MissionDefinition } from '@academy/content-model';

/** Comparative Judging module mission 3 — weighing strengths against weaknesses. */
export const judgeComparative003WeighingTradeoffs: MissionDefinition = {
  id: 'judge-comparative-003-weighing-tradeoffs',
  campaignId: 'judge-comparative',
  title: 'Strengths Against Weaknesses',
  summary:
    'The hard case: one couple strong where another is weak, and vice versa. Learn to weigh trade-offs across the lenses instead of fixating on one moment.',
  difficulty: 'medium',
  learningObjectives: [
    'Weigh a spread of strengths and weaknesses',
    'Avoid letting one dazzling moment or one slip decide the whole',
    'Place on the overall balance across lenses',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'When one couple is strong where the other is weak, resist the single dazzling trick or the single slip. Weigh the whole spread across the lenses and place on the overall balance.',
    },
  ],
  contextArtefacts: [
    {
      id: 'tradeoff-card',
      type: 'message',
      title: 'Trade-off card',
      content:
        'Couple A: excellent timing, rhythm and figures across the whole routine; one small balance wobble mid-way. Couple B: one spectacular high-difficulty trick, but loose timing and thin figures for most of the routine.',
    },
  ],
  challenges: [
    {
      id: 'jcp-003-c1',
      type: 'multiple-choice',
      title: 'Trick or Body of Work',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'Couple B landed one spectacular trick; Couple A was consistently strong across the whole routine with one small wobble.',
      prompt: 'How should you weigh the two?',
      options: [
        {
          id: 'a',
          label: 'Place B first — one spectacular trick outweighs everything else.',
          isCorrect: false,
          feedback:
            'A single dazzling moment does not outweigh a whole routine of loose timing and thin figures; weigh the full spread.',
        },
        {
          id: 'b',
          label: 'Place A first — a consistently strong routine across the lenses outweighs one spectacular trick set against loose timing and thin figures, and a single small wobble does not undo that body of work.',
          isCorrect: true,
          feedback:
            'Correct. You weigh the whole spread: A’s sustained quality across the lenses beats B’s one moment amid weak fundamentals.',
        },
        {
          id: 'c',
          label: 'Place A first — but only because B’s trick doesn’t count at all.',
          isCorrect: false,
          feedback:
            'B’s trick does count on its lens; A places first because the overall balance favours sustained quality, not because the trick is ignored.',
        },
        {
          id: 'd',
          label: 'Place B first — A’s wobble is a fault, and any fault loses.',
          isCorrect: false,
          feedback:
            'One small wobble does not undo a routine of strong timing, rhythm and figures; no single fault decides the whole.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does one trick — or one wobble — decide the whole?' },
        { level: 2, title: 'Concept', content: 'Weigh the overall spread across the lenses.' },
        { level: 3, title: 'Specific clue', content: 'Sustained quality beats one moment amid weak fundamentals.' },
        { level: 4, title: 'Guided solution', content: 'Choose placing A first on the body of work.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Trade-off weighed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Letting one trick or one slip decide the placement would distort the field against the panel’s.',
        },
      ],
      helpLinks: [{ topicId: 'judging.comparative', label: 'Comparative Judging and Placement' }],
      successFeedback: 'Body of work over one moment — the overall balance weighed.',
      failureFeedback: 'You weigh the whole spread: sustained quality across the lenses outweighs one spectacular trick amid weak fundamentals.',
    },
    {
      id: 'jcp-003-c2',
      type: 'multiple-choice',
      title: 'When the Weakness Is Central',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'Now a different field: Couple C is strong everywhere except its timing is genuinely off the beat for much of the routine; Couple D is a touch less polished on figures but keeps clean timing throughout.',
      prompt: 'How does weighing change when the weakness is a core lens like timing?',
      options: [
        {
          id: 'a',
          label: 'It does not change — polish always beats clean timing.',
          isCorrect: false,
          feedback:
            'Timing is a foundational lens; being off the beat for much of a routine is a central fault that polish elsewhere does not outweigh.',
        },
        {
          id: 'b',
          label: 'Place D above C — sustained clean timing is a foundational strength, and C being off the beat for much of the routine is a central weakness that a touch more polish elsewhere does not outweigh.',
          isCorrect: true,
          feedback:
            'Correct. A central-lens failure (timing) weighs more heavily than a lesser shortfall (a touch less figure polish); D places above C.',
        },
        {
          id: 'c',
          label: 'Place C above D — more polish always wins regardless of timing.',
          isCorrect: false,
          feedback:
            'Polish does not win over a foundational timing failure; being off the beat for much of the routine is the heavier fault.',
        },
        {
          id: 'd',
          label: 'Tie them — a strength and a weakness always cancel out.',
          isCorrect: false,
          feedback:
            'Strengths and weaknesses are weighed by importance, not cancelled one-for-one; a central timing fault outweighs a minor polish gap.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is a central-lens fault the same weight as a minor one?' },
        { level: 2, title: 'Concept', content: 'Weigh faults by how foundational the lens is.' },
        { level: 3, title: 'Specific clue', content: 'Off-the-beat timing outweighs slightly less polish.' },
        { level: 4, title: 'Guided solution', content: 'Choose placing D above C.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Weighting judged' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Treating a central timing failure as equal to a minor polish gap would push your placements away from the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.comparative', label: 'Comparative Judging and Placement' },
        { topicId: 'judging.timing', label: 'Timing and Time Signature' },
      ],
      successFeedback: 'Central timing fault weighed heavier than a polish gap — D above C.',
      failureFeedback: 'A foundational fault like off-the-beat timing weighs more than a minor polish gap; D places above C.',
    },
  ],
  reflectionPrompt: 'How do you decide when a weakness is central enough to outweigh strengths elsewhere?',
  rewards: [{ type: 'xp', amount: 5, label: 'Trade-off weighing trained' }],
};
