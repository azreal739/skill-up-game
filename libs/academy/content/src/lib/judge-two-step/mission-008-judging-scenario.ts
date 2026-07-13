import { MissionDefinition } from '@academy/content-model';

/** Two Step module mission 8 — a full Two Step scored across all lenses. */
export const judgeTwoStep008JudgingScenario: MissionDefinition = {
  id: 'judge-two-step-008-judging-scenario',
  campaignId: 'judge-two-step',
  title: 'Scoring a Real Two Step',
  summary:
    'A whole Two Step, six lenses. Compare scorecards and pick the one that reads the glide and the floorcraft honestly.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply all six lenses to a full Two Step',
    'Choose the more defensible scorecard',
    'Place the floorcraft fault correctly',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Put the module together. Watch this Two Step, then choose between two scorecards and defend the choice.',
    },
  ],
  contextArtefacts: [
    {
      id: 'two-step-routine',
      type: 'message',
      title: 'What you saw',
      content:
        'A Two Step: clean quick-quick-slow-slow timing; smooth, even rhythm; a genuine level gliding drive with no bounce (motion); cool, effortless character; correct promenades and underarm turns; but its strong travel repeatedly rode up on the slower couple ahead and darted through the lanes (poor floorcraft).',
    },
  ],
  challenges: [
    {
      id: 'jts-008-c1',
      type: 'contract-comparison',
      title: 'Two Scorecards',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'two-step', 'process'],
      storyContext: 'Two judges score the Two Step above and hand you their cards.',
      prompt: 'Which scorecard is the defensible reading?',
      options: [
        {
          id: 'a',
          label: 'Scorecard A: “Top marks everywhere — it was smooth and covered the floor.”',
          isCorrect: false,
          feedback:
            'Top-marks-everywhere ignores the poor floorcraft you saw. Travel is not the whole spatial-structure score.',
        },
        {
          id: 'b',
          label:
            'Scorecard B: “Strong timing, rhythm, motion, character and signature figures; spatial structure credited for travel but marked down for floorcraft — riding up on slower couples and darting through the lanes.”',
          isCorrect: true,
          feedback:
            'This is defensible: each lens scored on its evidence, with the travel credited and the floorcraft marked on the structure lens.',
        },
        {
          id: 'c',
          label: 'Scorecard C: “Low overall — the floorcraft fault drags the whole Two Step down.”',
          isCorrect: false,
          feedback:
            'One weak area does not sink strong timing, rhythm, motion, character and figures. The lenses are independent.',
        },
        {
          id: 'd',
          label: 'Scorecard D: “Marked down on motion — it was too smooth and level.”',
          isCorrect: false,
          feedback:
            'A smooth, level glide is correct for a Two Step; faulting motion invents a weakness that was not there.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each card against what the artefact says you saw.' },
        { level: 2, title: 'Concept', content: 'A defensible card scores each lens on its own evidence.' },
        { level: 3, title: 'Specific clue', content: 'The one fault was floorcraft — on the spatial-structure lens.' },
        { level: 4, title: 'Guided solution', content: 'Choose the card crediting the travel but marking floorcraft.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Scorecard chosen' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Endorsing an all-high or all-low card would put your Two Step marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'dance.two-step', label: 'Judging the Two Step' },
      ],
      successFeedback: 'Strengths kept, floorcraft marked on structure. A card you could defend.',
      failureFeedback: 'The defensible card is strong everywhere, crediting travel but marking floorcraft on spatial structure.',
    },
    {
      id: 'jts-008-c2',
      type: 'multiple-choice',
      title: 'One Line of Feedback',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'two-step', 'process'],
      storyContext: 'The couple’s coach asks for one concrete thing to work on after this Two Step.',
      prompt: 'Which feedback is most useful and defensible?',
      options: [
        {
          id: 'a',
          label: '“Ease off the couple ahead — your timing, glide, character and figures are strong; the travel is great but you kept riding up and darting through the lanes.”',
          isCorrect: true,
          feedback:
            'Right. It names the specific floorcraft issue and keeps the strong glide and travel, matching the scorecard.',
        },
        {
          id: 'b',
          label: '“Travel less — stay compact and stop covering ground.”',
          isCorrect: false,
          feedback:
            'That breaks the Two Step’s strong progression — the wrong advice; the issue is floorcraft, not too much travel.',
        },
        {
          id: 'c',
          label: '“Add some bounce to liven it up.”',
          isCorrect: false,
          feedback:
            'A bounce would break the correct smooth glide; the issue is floorcraft, not the motion.',
        },
        {
          id: 'd',
          label: '“Nothing to fix — it was a smooth Two Step.”',
          isCorrect: false,
          feedback:
            'You identified a real floorcraft problem. "Nothing to fix" wastes the coach’s question.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Point at the real issue without dulling the dance.' },
        { level: 2, title: 'Concept', content: 'Useful feedback names a specific issue and fix.' },
        { level: 3, title: 'Specific clue', content: 'The weakness was floorcraft under the travel.' },
        { level: 4, title: 'Guided solution', content: 'Choose the floorcraft feedback that keeps the travel.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Feedback delivered' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Vague or wrong feedback would dull the Two Step or leave the floorcraft unaddressed.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Named the issue, kept the travel. Useful feedback.',
      failureFeedback: 'The best feedback points at floorcraft while keeping the strong travel — not "travel less" or "add bounce".',
    },
  ],
  reflectionPrompt: 'Why is “travel less” tempting but wrong feedback for a Two Step with a floorcraft problem?',
  rewards: [{ type: 'xp', amount: 5, label: 'Two Step scored end to end' }],
};
