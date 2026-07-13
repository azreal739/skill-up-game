import { MissionDefinition } from '@academy/content-model';

/** Comparative Judging module mission 4 — comparing different dances fairly. */
export const judgeComparative004CrossDance: MissionDefinition = {
  id: 'judge-comparative-004-cross-dance',
  campaignId: 'judge-comparative',
  title: 'Comparing Different Dances',
  summary:
    'The trickiest comparison: couples dancing different dances. Learn to judge each against its own criteria, then place on the quality of execution.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge each dance against its own criteria first',
    'Place on the quality of execution, not the dance chosen',
    'Avoid penalising a couple for the dance they were assigned',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'When couples dance different dances, never compare a Waltz to a Cha Cha directly. Judge each against ITS OWN criteria, then place on how well each executed its own dance.',
    },
  ],
  contextArtefacts: [
    {
      id: 'cross-dance-card',
      type: 'message',
      title: 'Cross-dance card',
      content:
        'Couple A dances a Waltz: excellent 3/4 timing, strong rise and fall, rich figures — near-flawless against Waltz criteria. Couple B dances a Cha Cha: timing a little rushed, Cuban motion inconsistent, a couple of crushed chasses — good but flawed against Cha Cha criteria.',
    },
  ],
  challenges: [
    {
      id: 'jcp-004-c1',
      type: 'multiple-choice',
      title: 'Apples and Oranges',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'A judge tries to place the Waltz and the Cha Cha by comparing their rise-and-fall directly — but the Cha Cha has no rise and fall at all.',
      prompt: 'How should different dances be compared for placement?',
      options: [
        {
          id: 'a',
          label: 'Judge each dance against its OWN criteria first — the Waltz on Waltz criteria, the Cha Cha on Cha Cha criteria — then place on how well each executed its own dance.',
          isCorrect: true,
          feedback:
            'Correct. You never compare a Waltz’s rise and fall to a Cha Cha directly; each is judged on its own criteria, then placed on quality of execution.',
        },
        {
          id: 'b',
          label: 'Compare their rise and fall directly and place the one with more.',
          isCorrect: false,
          feedback:
            'The Cha Cha has no rise and fall; comparing a Waltz trait directly across dances is meaningless and unfair.',
        },
        {
          id: 'c',
          label: 'Always place the Waltz above the Cha Cha — smooth dances outrank Latin.',
          isCorrect: false,
          feedback:
            'No dance outranks another by type; you place on how well each executed its own dance, not on which dance it is.',
        },
        {
          id: 'd',
          label: 'Pick whichever dance you personally prefer to watch.',
          isCorrect: false,
          feedback:
            'Personal preference for a dance is bias; place on the quality of execution against each dance’s own criteria.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Can you compare a Waltz trait directly to a Cha Cha?' },
        { level: 2, title: 'Concept', content: 'Judge each against its own criteria, then place on execution.' },
        { level: 3, title: 'Specific clue', content: 'Quality of execution, not the dance chosen.' },
        { level: 4, title: 'Guided solution', content: 'Choose judging each against its own criteria first.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Cross-dance framed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Comparing one dance’s traits directly against another’s would produce meaningless, unfair placements.',
        },
      ],
      helpLinks: [{ topicId: 'judging.comparative', label: 'Comparative Judging and Placement' }],
      successFeedback: 'Each judged on its own criteria, then placed on execution — fair cross-dance comparison.',
      failureFeedback: 'Judge each dance against its own criteria first, then place on how well each executed its own dance.',
    },
    {
      id: 'jcp-004-c2',
      type: 'multiple-choice',
      title: 'Place the Cross-Dance Field',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'Using the card: A’s Waltz is near-flawless against Waltz criteria; B’s Cha Cha is good but clearly flawed against Cha Cha criteria (rushed timing, inconsistent Cuban motion, crushed chasses).',
      prompt: 'How do you place them, and why?',
      options: [
        {
          id: 'a',
          label: 'Place B first — the Cha Cha is a harder, flashier dance, so it deserves the edge.',
          isCorrect: false,
          feedback:
            'Perceived difficulty or flash of the dance is not the criterion; you place on quality of execution against each dance’s own criteria.',
        },
        {
          id: 'b',
          label: 'Refuse to place — different dances can never be ranked.',
          isCorrect: false,
          feedback:
            'Different dances are routinely placed together by judging each on its own criteria and comparing quality of execution.',
        },
        {
          id: 'c',
          label: 'Place A first — A executed its dance near-flawlessly against Waltz criteria, while B executed its dance well but with clear flaws against Cha Cha criteria, so A’s quality of execution is higher.',
          isCorrect: true,
          feedback:
            'Correct. Each judged on its own criteria, A’s near-flawless execution outplaces B’s good-but-flawed one — a fair cross-dance placement.',
        },
        {
          id: 'd',
          label: 'Place A first — because Waltz always beats Cha Cha.',
          isCorrect: false,
          feedback:
            'A places first on quality of execution, not because of the dance type; a flawed Waltz could easily place below a strong Cha Cha.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which couple executed its own dance better?' },
        { level: 2, title: 'Concept', content: 'Place on quality of execution against each dance’s own criteria.' },
        { level: 3, title: 'Specific clue', content: 'Near-flawless beats good-but-flawed, whatever the dances.' },
        { level: 4, title: 'Guided solution', content: 'Choose placing A first on execution quality.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Cross-dance placed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Placing by dance type or perceived difficulty instead of execution would misalign you from the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.comparative', label: 'Comparative Judging and Placement' },
        { topicId: 'judging.process', label: 'The Judging Process' },
      ],
      successFeedback: 'Near-flawless execution outplaces good-but-flawed — a fair cross-dance placement.',
      failureFeedback: 'Place on quality of execution against each dance’s own criteria; A’s near-flawless Waltz outplaces B’s flawed Cha Cha.',
    },
  ],
  reflectionPrompt: 'How do you stop your personal preference for a dance from creeping into a cross-dance placement?',
  rewards: [{ type: 'xp', amount: 5, label: 'Cross-dance comparison trained' }],
};
