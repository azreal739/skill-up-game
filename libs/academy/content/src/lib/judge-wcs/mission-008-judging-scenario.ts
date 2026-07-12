import { MissionDefinition } from '@academy/content-model';

/** WCS module mission 8 — a full West Coast Swing scored across all lenses. */
export const judgeWcs008JudgingScenario: MissionDefinition = {
  id: 'judge-wcs-008-judging-scenario',
  campaignId: 'judge-wcs',
  title: 'Scoring a Real West Coast Swing',
  summary:
    'A whole WCS, six lenses. Compare scorecards and pick the one that reads the anchor and the slot honestly.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply all six lenses to a full WCS',
    'Choose the more defensible scorecard',
    'Place the anchor and connection faults correctly',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Put the module together. Watch this West Coast Swing, then choose between two scorecards and defend the choice.',
    },
  ],
  contextArtefacts: [
    {
      id: 'wcs-routine',
      type: 'message',
      title: 'What you saw',
      content:
        'A West Coast Swing: clean 4/4 six- and eight-count timing on the back-beat; clean walks and triples; a weak, rushed anchor settle and little extension/compression (motion); cool conversational character; correct pushes, passes and a whip; the slot held throughout.',
    },
  ],
  challenges: [
    {
      id: 'jws-008-c1',
      type: 'contract-comparison',
      title: 'Two Scorecards',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'west-coast-swing', 'process'],
      storyContext: 'Two judges score the WCS above and hand you their cards.',
      prompt: 'Which scorecard is the defensible reading?',
      options: [
        {
          id: 'a',
          label: 'Scorecard A: “Top marks everywhere — the figures were clean and it looked cool.”',
          isCorrect: false,
          feedback:
            'Top-marks-everywhere ignores the weak anchor and missing extension/compression you saw. Cool is not a per-lens score.',
        },
        {
          id: 'b',
          label:
            'Scorecard B: “Strong timing, rhythm, character, signature figures and slot; motion marked down for a weak anchor settle and little extension/compression.”',
          isCorrect: true,
          feedback:
            'This is defensible: each lens scored on its evidence, with the one real weakness placed on motion.',
        },
        {
          id: 'c',
          label: 'Scorecard C: “Low overall — the weak anchor drags the whole WCS down.”',
          isCorrect: false,
          feedback:
            'One weak lens does not sink strong timing, rhythm, character, figures and slot. The lenses are independent.',
        },
        {
          id: 'd',
          label: 'Scorecard D: “Marked down on signature figures — the sugar push is too basic to count.”',
          isCorrect: false,
          feedback:
            'The figures were correct; faulting them invents a weakness that was not on the floor.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each card against what the artefact says you saw.' },
        { level: 2, title: 'Concept', content: 'A defensible card scores each lens on its own evidence.' },
        { level: 3, title: 'Specific clue', content: 'Only the motion (anchor, extension/compression) was weak.' },
        { level: 4, title: 'Guided solution', content: 'Choose the card that keeps the strengths and marks motion down.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Scorecard chosen' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Endorsing an all-high or all-low card would put your WCS marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' },
      ],
      successFeedback: 'Strengths kept, the one weakness placed on motion. A card you could defend.',
      failureFeedback: 'The defensible card is strong everywhere but motion, marked down for the weak anchor and missing stretch.',
    },
    {
      id: 'jws-008-c2',
      type: 'multiple-choice',
      title: 'One Line of Feedback',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'west-coast-swing', 'process'],
      storyContext: 'The couple’s coach asks for one concrete thing to work on after this WCS.',
      prompt: 'Which feedback is most useful and defensible?',
      options: [
        {
          id: 'a',
          label: '“Add bigger tricks — it needs more wow for the audience.”',
          isCorrect: false,
          feedback:
            'Presentational tricks are not the weakness, and they cut against WCS character. This misses the real issue.',
        },
        {
          id: 'b',
          label: '“Travel more — use the whole floor.”',
          isCorrect: false,
          feedback:
            'That would break the slot — the opposite of correct WCS advice.',
        },
        {
          id: 'c',
          label: '“Settle the anchor and use more extension and compression — your timing, figures and slot are strong; the motion is holding the score back.”',
          isCorrect: true,
          feedback:
            'Right. It names the specific lens and fix, and matches the scorecard.',
        },
        {
          id: 'd',
          label: '“Nothing to fix — it was a clean WCS.”',
          isCorrect: false,
          feedback:
            'You identified a real motion weakness. "Nothing to fix" wastes the coach’s question.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Point at the lens that actually held the score back.' },
        { level: 2, title: 'Concept', content: 'Useful feedback names a specific lens and fix.' },
        { level: 3, title: 'Specific clue', content: 'The weakness was the anchor and stretch — motion.' },
        { level: 4, title: 'Guided solution', content: 'Choose the feedback about settling the anchor and using extension/compression.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Feedback delivered' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Vague or wrong feedback leaves the couple working on the wrong thing — or breaking their slot.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Named the lens, named the fix, kept the slot. Useful feedback.',
      failureFeedback: 'The best feedback points at the motion weakness: settle the anchor and use extension/compression.',
    },
  ],
  reflectionPrompt: 'Why is “travel more to use the floor” the wrong advice for a slot dance, even though it sounds helpful?',
  rewards: [{ type: 'xp', amount: 5, label: 'WCS scored end to end' }],
};
