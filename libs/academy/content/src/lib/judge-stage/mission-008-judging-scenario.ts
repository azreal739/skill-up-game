import { MissionDefinition } from '@academy/content-model';

/** Stage module mission 8 — a full Stage number scored across all lenses. */
export const judgeStage008JudgingScenario: MissionDefinition = {
  id: 'judge-stage-008-judging-scenario',
  campaignId: 'judge-stage',
  title: 'Scoring a Real Stage Number',
  summary:
    'A whole Stage number, six lenses. Compare scorecards and pick the one that reads the technique, the stagecraft and the era authenticity honestly.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply all six lenses to a full Stage number',
    'Choose the more defensible scorecard',
    'Place the era-authenticity fault correctly',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Put the module together. Watch this Stage number, then choose between two scorecards and defend the choice.',
    },
  ],
  contextArtefacts: [
    {
      id: 'stage-routine',
      type: 'message',
      title: 'What you saw',
      content:
        'A number billed as a 1920s Charleston: strong theatrical musicality catching the accents (timing); clean jumps, spotted turns and controlled kicks (motion); big projection to the house (character projection); rich stage use with good facings (spatial); correct Charleston swivels and steps; but the body styling ran on flat, grounded modern contemporary lines with none of the bouncy 1920s carriage — the era authenticity was off (styling not true to the billed period).',
    },
  ],
  challenges: [
    {
      id: 'jsg-008-c1',
      type: 'contract-comparison',
      title: 'Two Scorecards',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'stage', 'process'],
      storyContext: 'Two judges score the Stage number above and hand you their cards.',
      prompt: 'Which scorecard is the defensible reading?',
      options: [
        {
          id: 'a',
          label: 'Scorecard A: “Top marks everywhere — the technique and projection were excellent.”',
          isCorrect: false,
          feedback:
            'Technique and projection were strong, but top-marks-everywhere ignores the era-authenticity miss you saw.',
        },
        {
          id: 'b',
          label:
            'Scorecard B: “Strong timing, motion, projection, stagecraft and figures; marked down on era authenticity because the flat modern contemporary body styling was not true to the billed 1920s Charleston.”',
          isCorrect: true,
          feedback:
            'This is defensible: each lens scored on its evidence, with the mismatch named as an era-authenticity fault.',
        },
        {
          id: 'c',
          label: 'Scorecard C: “Low overall — the wrong styling ruins the whole number.”',
          isCorrect: false,
          feedback:
            'One weak area does not sink strong timing, motion, projection, stagecraft and figures. The lenses are independent.',
        },
        {
          id: 'd',
          label: 'Scorecard D: “Marked down on motion — the jumps and turns were too clean.”',
          isCorrect: false,
          feedback:
            'Clean jumps and turns are a strength, not a fault; this invents a weakness that was not there.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each card against what the artefact says you saw.' },
        { level: 2, title: 'Concept', content: 'A defensible card scores each lens on its own evidence.' },
        { level: 3, title: 'Specific clue', content: 'The one fault was era authenticity — the styling was not true to the period.' },
        { level: 4, title: 'Guided solution', content: 'Choose the card naming the era-authenticity miss.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Scorecard chosen' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Endorsing an all-high or all-low card would put your Stage marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'dance.stage', label: 'Judging Stage and Era Styles' },
      ],
      successFeedback: 'Strengths kept, the era miss named. A card you could defend.',
      failureFeedback: 'The defensible card is strong everywhere, marking the era authenticity where the styling was not true to the period.',
    },
    {
      id: 'jsg-008-c2',
      type: 'multiple-choice',
      title: 'One Line of Feedback',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'stage', 'process'],
      storyContext: 'The performer asks for one concrete thing to work on after this number.',
      prompt: 'Which feedback is most useful and defensible?',
      options: [
        {
          id: 'a',
          label: '“Find the 1920s body — your technique, projection and stagecraft are strong; the styling just ran on flat modern lines instead of the bouncy Charleston carriage the era needs.”',
          isCorrect: true,
          feedback:
            'Right. It names the specific era-authenticity issue and keeps the strong technique, matching the scorecard.',
        },
        {
          id: 'b',
          label: '“Do fewer tricks — it was too busy.”',
          isCorrect: false,
          feedback:
            'Busyness was not the issue; the styling was not true to the era. Cutting tricks misses the point.',
        },
        {
          id: 'c',
          label: '“Tone down the projection — it was too much for the house.”',
          isCorrect: false,
          feedback:
            'The projection was a strength; the issue is era authenticity, not too much performance.',
        },
        {
          id: 'd',
          label: '“Nothing to fix — it was a polished number.”',
          isCorrect: false,
          feedback:
            'You identified a real era-authenticity miss. "Nothing to fix" wastes the performer’s question.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Point at the real issue without dulling the strengths.' },
        { level: 2, title: 'Concept', content: 'Useful feedback names a specific issue and fix.' },
        { level: 3, title: 'Specific clue', content: 'The weakness was the styling not being true to the era.' },
        { level: 4, title: 'Guided solution', content: 'Choose the era-authenticity feedback that keeps the strong technique.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Feedback delivered' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Vague or wrong feedback would dull the performer’s strengths or leave the era miss unaddressed.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Named the issue, kept the strengths. Useful feedback.',
      failureFeedback: 'The best feedback points at the era authenticity while keeping the strong technique — not "fewer tricks" or "tone down".',
    },
  ],
  reflectionPrompt: 'Why is “do fewer tricks” tempting but wrong feedback for a number with an era-authenticity problem?',
  rewards: [{ type: 'xp', amount: 5, label: 'Stage scored end to end' }],
};
