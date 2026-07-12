import { MissionDefinition } from '@academy/content-model';

/** Polka module mission 8 — a full Polka scored across all lenses. */
export const judgePolka008JudgingScenario: MissionDefinition = {
  id: 'judge-polka-008-judging-scenario',
  campaignId: 'judge-polka',
  title: 'Scoring a Real Polka',
  summary:
    'A whole Polka, six lenses. Compare scorecards and pick the one that reads the pulse and the floorcraft honestly.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply all six lenses to a full Polka',
    'Choose the more defensible scorecard',
    'Place the floorcraft fault correctly',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Put the module together. Watch this Polka, then choose between two scorecards and defend the choice.',
    },
  ],
  contextArtefacts: [
    {
      id: 'polka-routine',
      type: 'message',
      title: 'What you saw',
      content:
        'A Polka: clean 1&2 lilt timing; bright, light rhythm; genuine up/down pulse and forward drive (motion); energetic country character; correct skips and gallops; but its powerful travel repeatedly forced slower couples to scatter (poor floorcraft).',
    },
  ],
  challenges: [
    {
      id: 'jpk-008-c1',
      type: 'contract-comparison',
      title: 'Two Scorecards',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'polka', 'process'],
      storyContext: 'Two judges score the Polka above and hand you their cards.',
      prompt: 'Which scorecard is the defensible reading?',
      options: [
        {
          id: 'a',
          label: 'Scorecard A: “Top marks everywhere — it was bright and full of drive.”',
          isCorrect: false,
          feedback:
            'Top-marks-everywhere ignores the poor floorcraft you saw. Drive is not the whole spatial-structure score.',
        },
        {
          id: 'b',
          label: 'Scorecard B: “Low overall — the floorcraft fault drags the whole Polka down.”',
          isCorrect: false,
          feedback:
            'One weak area does not sink strong timing, rhythm, motion, character and figures. The lenses are independent.',
        },
        {
          id: 'c',
          label:
            'Scorecard C: “Strong timing, rhythm, motion, character and signature figures; spatial structure credited for drive but marked down for floorcraft — forcing slower couples to scatter.”',
          isCorrect: true,
          feedback:
            'This is defensible: each lens scored on its evidence, with the drive credited and the floorcraft marked on the structure lens.',
        },
        {
          id: 'd',
          label: 'Scorecard D: “Marked down on character — it was too energetic.”',
          isCorrect: false,
          feedback:
            'Energetic is correct for a Polka; faulting character invents a weakness that was not there.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each card against what the artefact says you saw.' },
        { level: 2, title: 'Concept', content: 'A defensible card scores each lens on its own evidence.' },
        { level: 3, title: 'Specific clue', content: 'The one fault was floorcraft — on the spatial-structure lens.' },
        { level: 4, title: 'Guided solution', content: 'Choose the card crediting the drive but marking floorcraft.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Scorecard chosen' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Endorsing an all-high or all-low card would put your Polka marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'dance.polka', label: 'Judging the Polka' },
      ],
      successFeedback: 'Strengths kept, floorcraft marked on structure. A card you could defend.',
      failureFeedback: 'The defensible card is strong everywhere, crediting drive but marking floorcraft on spatial structure.',
    },
    {
      id: 'jpk-008-c2',
      type: 'multiple-choice',
      title: 'One Line of Feedback',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'polka', 'process'],
      storyContext: 'The couple’s coach asks for one concrete thing to work on after this Polka.',
      prompt: 'Which feedback is most useful and defensible?',
      options: [
        {
          id: 'a',
          label: '“Watch your floorcraft — your timing, pulse, character and figures are strong; the drive is great but it kept forcing slower couples to scatter.”',
          isCorrect: true,
          feedback:
            'Right. It names the specific issue and keeps the strong drive, matching the scorecard.',
        },
        {
          id: 'b',
          label: '“Calm the whole thing down — it was too much.”',
          isCorrect: false,
          feedback:
            'That would dull the correct energy and drive; the issue is floorcraft, not too much Polka.',
        },
        {
          id: 'c',
          label: '“Travel less — stay in one spot.”',
          isCorrect: false,
          feedback:
            'That breaks the Polka’s aggressive progression — the wrong advice.',
        },
        {
          id: 'd',
          label: '“Nothing to fix — it was a lively Polka.”',
          isCorrect: false,
          feedback:
            'You identified a real floorcraft problem. "Nothing to fix" wastes the coach’s question.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Point at the real issue without dulling the dance.' },
        { level: 2, title: 'Concept', content: 'Useful feedback names a specific issue and fix.' },
        { level: 3, title: 'Specific clue', content: 'The weakness was floorcraft under the drive.' },
        { level: 4, title: 'Guided solution', content: 'Choose the floorcraft feedback that keeps the drive.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Feedback delivered' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Vague or wrong feedback would dull the Polka or leave the floorcraft unaddressed.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Named the issue, kept the drive. Useful feedback.',
      failureFeedback: 'The best feedback points at floorcraft while keeping the strong drive — not "calm down" or "travel less".',
    },
  ],
  reflectionPrompt: 'Why is “calm down” or “travel less” tempting but wrong feedback for a Polka with a floorcraft problem?',
  rewards: [{ type: 'xp', amount: 5, label: 'Polka scored end to end' }],
};
