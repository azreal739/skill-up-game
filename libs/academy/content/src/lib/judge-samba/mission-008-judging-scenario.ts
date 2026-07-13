import { MissionDefinition } from '@academy/content-model';

/** Samba module mission 8 — a full Samba scored across all lenses. */
export const judgeSamba008JudgingScenario: MissionDefinition = {
  id: 'judge-samba-008-judging-scenario',
  campaignId: 'judge-samba',
  title: 'Scoring a Real Samba',
  summary:
    'A whole Samba, six lenses. Compare scorecards and pick the one that reads the bounce and the floorcraft honestly.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply all six lenses to a full Samba',
    'Choose the more defensible scorecard',
    'Place the floorcraft fault correctly',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Put the module together. Watch this Samba, then choose between two scorecards and defend the choice.',
    },
  ],
  contextArtefacts: [
    {
      id: 'samba-routine',
      type: 'message',
      title: 'What you saw',
      content:
        'A Samba: clean syncopated 1-a-2 timing; crisp, buoyant rhythm; a genuine knee-driven bounce action (motion); festive carnival character; correct whisks and botafogos; but during its travelling samba walks the big bounce repeatedly swung the couple into others, forcing them to break stride (poor floorcraft).',
    },
  ],
  challenges: [
    {
      id: 'jsm-008-c1',
      type: 'contract-comparison',
      title: 'Two Scorecards',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'samba', 'process'],
      storyContext: 'Two judges score the Samba above and hand you their cards.',
      prompt: 'Which scorecard is the defensible reading?',
      options: [
        {
          id: 'a',
          label: 'Scorecard A: “Top marks everywhere — it was festive and full of bounce.”',
          isCorrect: false,
          feedback:
            'Top-marks-everywhere ignores the poor floorcraft you saw. Travel is not the whole spatial-structure score.',
        },
        {
          id: 'b',
          label:
            'Scorecard B: “Strong timing, rhythm, motion, character and signature figures; spatial structure credited for travel but marked down for floorcraft — swinging into other couples during the samba walks.”',
          isCorrect: true,
          feedback:
            'This is defensible: each lens scored on its evidence, with the travel credited and the floorcraft marked on the structure lens.',
        },
        {
          id: 'c',
          label: 'Scorecard C: “Low overall — the floorcraft fault drags the whole Samba down.”',
          isCorrect: false,
          feedback:
            'One weak area does not sink strong timing, rhythm, motion, character and figures. The lenses are independent.',
        },
        {
          id: 'd',
          label: 'Scorecard D: “Marked down on character — it was too festive.”',
          isCorrect: false,
          feedback:
            'Festive is correct for a Samba; faulting character invents a weakness that was not there.',
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
          reason: 'Endorsing an all-high or all-low card would put your Samba marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'dance.samba', label: 'Judging the Samba' },
      ],
      successFeedback: 'Strengths kept, floorcraft marked on structure. A card you could defend.',
      failureFeedback: 'The defensible card is strong everywhere, crediting travel but marking floorcraft on spatial structure.',
    },
    {
      id: 'jsm-008-c2',
      type: 'multiple-choice',
      title: 'One Line of Feedback',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'samba', 'process'],
      storyContext: 'The couple’s coach asks for one concrete thing to work on after this Samba.',
      prompt: 'Which feedback is most useful and defensible?',
      options: [
        {
          id: 'a',
          label: '“Rein in the travel near others — your timing, bounce, character and figures are strong; the samba walks were great but kept swinging you into other couples.”',
          isCorrect: true,
          feedback:
            'Right. It names the specific floorcraft issue and keeps the strong bounce and travel, matching the scorecard.',
        },
        {
          id: 'b',
          label: '“Lose the bounce — it was too much.”',
          isCorrect: false,
          feedback:
            'The bounce is the Samba’s defining motion; losing it would break the dance. The issue is floorcraft, not the bounce.',
        },
        {
          id: 'c',
          label: '“Stop travelling — keep every figure on the spot.”',
          isCorrect: false,
          feedback:
            'That breaks the Samba’s progressive travelling figures — the wrong advice.',
        },
        {
          id: 'd',
          label: '“Nothing to fix — it was a lively Samba.”',
          isCorrect: false,
          feedback:
            'You identified a real floorcraft problem. "Nothing to fix" wastes the coach’s question.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Point at the real issue without dulling the dance.' },
        { level: 2, title: 'Concept', content: 'Useful feedback names a specific issue and fix.' },
        { level: 3, title: 'Specific clue', content: 'The weakness was floorcraft under the travelling bounce.' },
        { level: 4, title: 'Guided solution', content: 'Choose the floorcraft feedback that keeps the bounce and travel.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Feedback delivered' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Vague or wrong feedback would dull the Samba or leave the floorcraft unaddressed.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Named the issue, kept the bounce and travel. Useful feedback.',
      failureFeedback: 'The best feedback points at floorcraft while keeping the strong bounce and travel — not "lose the bounce" or "stop travelling".',
    },
  ],
  reflectionPrompt: 'Why is “lose the bounce” tempting but wrong feedback for a Samba with a floorcraft problem?',
  rewards: [{ type: 'xp', amount: 5, label: 'Samba scored end to end' }],
};
