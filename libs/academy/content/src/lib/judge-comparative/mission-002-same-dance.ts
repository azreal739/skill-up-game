import { MissionDefinition } from '@academy/content-model';

/** Comparative Judging module mission 2 — comparing two couples in the same dance. */
export const judgeComparative002SameDance: MissionDefinition = {
  id: 'judge-comparative-002-same-dance',
  campaignId: 'judge-comparative',
  title: 'Two Couples, One Dance',
  summary:
    'The simplest comparison: two couples dancing the same dance. Learn to place them by walking the six lenses in parallel.',
  difficulty: 'medium',
  learningObjectives: [
    'Compare two couples lens by lens',
    'Place on the balance of concrete differences',
    'State the deciding lens',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Same dance, two couples. Walk the six lenses for each, note where they differ, and place on the balance — naming the lens that decided it.',
    },
  ],
  contextArtefacts: [
    {
      id: 'same-dance-card',
      type: 'message',
      title: 'Two Waltzes',
      content:
        'Couple A: clean 3/4 timing, strong rise and fall, elegant character, good travel; figures a little plain. Couple B: clean 3/4 timing, weaker rise and fall (flatter), elegant character, good travel; a richer figure vocabulary. Everything else comparable.',
    },
  ],
  challenges: [
    {
      id: 'jcp-002-c1',
      type: 'multiple-choice',
      title: 'Place the Two',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'Using the card, both Waltzes are strong and comparable on most lenses. A has stronger rise and fall (motion); B has a richer figure vocabulary.',
      prompt: 'How should you approach placing them?',
      options: [
        {
          id: 'a',
          label: 'Place at random — when couples are close, the order does not matter.',
          isCorrect: false,
          feedback:
            'Close does not mean arbitrary; you weigh the concrete differences — A’s stronger motion against B’s richer figures — and place on the balance.',
        },
        {
          id: 'b',
          label: 'Place B first automatically — more figures always wins.',
          isCorrect: false,
          feedback:
            'A richer vocabulary is one factor, not an automatic win; it must be weighed against A’s stronger rise and fall.',
        },
        {
          id: 'c',
          label: 'Weigh the concrete differences — A’s stronger rise and fall (a core Waltz motion) against B’s richer figures — and place on the balance, naming the deciding lens.',
          isCorrect: true,
          feedback:
            'Correct. You place on the balance of the real differences and can name which lens decided it — a defensible comparison.',
        },
        {
          id: 'd',
          label: 'Refuse to place them — couples this close should always tie.',
          isCorrect: false,
          feedback:
            'A genuine tie is rare and must itself be justified; here there are concrete differences to weigh, so a placement is possible.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What separates two otherwise-comparable couples?' },
        { level: 2, title: 'Concept', content: 'Weigh the concrete lens differences and place on the balance.' },
        { level: 3, title: 'Specific clue', content: 'A’s rise and fall vs B’s figures — name the deciding lens.' },
        { level: 4, title: 'Guided solution', content: 'Choose weighing the differences and placing on the balance.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Comparison made' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Placing at random or by a single automatic factor would make the order impossible to defend.',
        },
      ],
      helpLinks: [{ topicId: 'judging.comparative', label: 'Comparative Judging and Placement' }],
      successFeedback: 'Differences weighed, deciding lens named — a defensible placement.',
      failureFeedback: 'You weigh the concrete lens differences and place on the balance, naming the lens that decided it.',
    },
    {
      id: 'jcp-002-c2',
      type: 'contract-comparison',
      title: 'Two Placement Notes',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'comparative', 'process'],
      storyContext: 'Two judges write up their placement of the two Waltzes. One is defensible; one is not.',
      prompt: 'Which placement note would you sign?',
      options: [
        {
          id: 'a',
          label:
            'Note A: “A placed above B: on comparable timing, character and travel, A’s rise and fall was clearly stronger — the deciding Waltz motion — outweighing B’s slightly richer but not decisive figures.”',
          isCorrect: true,
          feedback:
            'Right. It names the deciding lens, acknowledges B’s strength, and rests the order on a concrete difference.',
        },
        {
          id: 'b',
          label:
            'Note B: “A placed above B: they just had something special about them that B didn’t.”',
          isCorrect: false,
          feedback:
            '"Something special" is not a criterion; a defensible note names the concrete lens that decided the order.',
        },
        {
          id: 'c',
          label:
            'Note C: “B placed above A: B’s costume and music choice were more appealing to me.”',
          isCorrect: false,
          feedback:
            'Costume and personal appeal are not the judging criteria; the placement must rest on the six lenses.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which note names a concrete, criteria-based reason?' },
        { level: 2, title: 'Concept', content: 'A defensible placement note states the deciding lens.' },
        { level: 3, title: 'Specific clue', content: 'Rise and fall decided it, not "something special".' },
        { level: 4, title: 'Guided solution', content: 'Choose the note naming the deciding Waltz motion.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Placement defended' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'A vague or taste-based placement note leaves the couples unable to trust or learn from the result.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.comparative', label: 'Comparative Judging and Placement' },
        { topicId: 'judging.process', label: 'The Judging Process' },
      ],
      successFeedback: 'Deciding lens named, both strengths acknowledged — a note you could sign.',
      failureFeedback: 'The defensible note rests the order on a concrete lens — here rise and fall — not "something special" or personal taste.',
    },
  ],
  reflectionPrompt: 'When two couples are close, how do you decide which lens should carry the placement?',
  rewards: [{ type: 'xp', amount: 5, label: 'Same-dance comparison trained' }],
};
