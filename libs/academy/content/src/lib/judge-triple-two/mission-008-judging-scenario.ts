import { MissionDefinition } from '@academy/content-model';

/** Triple Two module mission 8 — a full Triple Two scored across all lenses. */
export const judgeTripleTwo008JudgingScenario: MissionDefinition = {
  id: 'judge-triple-two-008-judging-scenario',
  campaignId: 'judge-triple-two',
  title: 'Scoring a Real Triple Two',
  summary:
    'A whole Triple Two, six lenses. Compare scorecards and pick the one that reads the shaping and the flow honestly.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply all six lenses to a full Triple Two',
    'Choose the more defensible scorecard',
    'Place the opposite-shape fault correctly',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Put the module together. Watch this Triple Two, then choose between two scorecards and defend the choice.',
    },
  ],
  contextArtefacts: [
    {
      id: 'tt-routine',
      type: 'message',
      title: 'What you saw',
      content:
        'A Triple Two: clean slow-slow-triple-triple timing; smooth even ball-flat triples; but both triples shaped the SAME way each basic rather than opposite (motion); soft romantic character; correct loops and laces; good curved progressive travel.',
    },
  ],
  challenges: [
    {
      id: 'jtt-008-c1',
      type: 'contract-comparison',
      title: 'Two Scorecards',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'triple-two', 'process'],
      storyContext: 'Two judges score the Triple Two above and hand you their cards.',
      prompt: 'Which scorecard is the defensible reading?',
      options: [
        {
          id: 'a',
          label: 'Scorecard A: “Top marks everywhere — it was smooth and pretty.”',
          isCorrect: false,
          feedback:
            'Top-marks-everywhere ignores the same-way shaping you saw. Pretty is not a per-lens score.',
        },
        {
          id: 'b',
          label: 'Scorecard B: “Low overall — the shaping fault drags the whole Triple Two down.”',
          isCorrect: false,
          feedback:
            'One weak lens does not sink strong timing, rhythm, character, figures and travel. The lenses are independent.',
        },
        {
          id: 'c',
          label:
            'Scorecard C: “Strong timing, rhythm, character, signature figures and travel; motion marked down because the successive triples shaped the same way instead of opposite.”',
          isCorrect: true,
          feedback:
            'This is defensible: each lens scored on its evidence, with the one real weakness placed on motion.',
        },
        {
          id: 'd',
          label: 'Scorecard D: “Marked down on spatial structure — the curved travel is too fussy.”',
          isCorrect: false,
          feedback:
            'The curved travel is correct for a Triple Two; faulting it invents a weakness that was not there.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each card against what the artefact says you saw.' },
        { level: 2, title: 'Concept', content: 'A defensible card scores each lens on its own evidence.' },
        { level: 3, title: 'Specific clue', content: 'Only the motion (same-way shaping) was weak.' },
        { level: 4, title: 'Guided solution', content: 'Choose the card that keeps the strengths and marks motion down.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Scorecard chosen' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Endorsing an all-high or all-low card would put your Triple Two marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'dance.triple-two', label: 'Judging the Triple Two' },
      ],
      successFeedback: 'Strengths kept, the one weakness placed on motion. A card you could defend.',
      failureFeedback: 'The defensible card is strong everywhere but motion, marked down for same-way shaping.',
    },
    {
      id: 'jtt-008-c2',
      type: 'multiple-choice',
      title: 'One Line of Feedback',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'triple-two', 'process'],
      storyContext: 'The couple’s coach asks for one concrete thing to work on after this Triple Two.',
      prompt: 'Which feedback is most useful and defensible?',
      options: [
        {
          id: 'a',
          label: '“Shape the successive triples opposite ways — your timing, figures, character and travel are strong; the same-way shaping is what is holding the motion score back.”',
          isCorrect: true,
          feedback:
            'Right. It names the specific lens and fix, and it matches the scorecard.',
        },
        {
          id: 'b',
          label: '“Add more energy — it needs more life.”',
          isCorrect: false,
          feedback:
            'Vague and not the issue; the character was already soft and correct. This misses the real weakness.',
        },
        {
          id: 'c',
          label: '“Travel in straight lines to cover more floor.”',
          isCorrect: false,
          feedback:
            'That would break the curved progression — the wrong advice for a Triple Two.',
        },
        {
          id: 'd',
          label: '“Nothing to fix — it was lovely.”',
          isCorrect: false,
          feedback:
            'You identified a real motion weakness. "Nothing to fix" wastes the coach’s question.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Point at the lens that actually held the score back.' },
        { level: 2, title: 'Concept', content: 'Useful feedback names a specific lens and fix.' },
        { level: 3, title: 'Specific clue', content: 'The weakness was same-way shaping — motion.' },
        { level: 4, title: 'Guided solution', content: 'Choose the feedback about opposite shaping.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Feedback delivered' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Vague or wrong feedback leaves the couple working on the wrong thing — or straightening their travel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Named the lens, named the fix. Useful feedback.',
      failureFeedback: 'The best feedback points at the motion weakness: shape the successive triples opposite ways.',
    },
  ],
  reflectionPrompt: 'Why is “travel in straight lines” tempting but wrong advice for a Triple Two?',
  rewards: [{ type: 'xp', amount: 5, label: 'Triple Two scored end to end' }],
};
