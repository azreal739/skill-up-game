import { MissionDefinition } from '@academy/content-model';

/** East Coast Swing module mission 8 — a full swing scored across all lenses. */
export const judgeEcs008JudgingScenario: MissionDefinition = {
  id: 'judge-ecs-008-judging-scenario',
  campaignId: 'judge-east-coast-swing',
  title: 'Scoring a Real East Coast Swing',
  summary:
    'A whole East Coast Swing, six lenses. Compare scorecards and pick the one that reads the bounce and the structure honestly.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply all six lenses to a full East Coast Swing',
    'Choose the more defensible scorecard',
    'Place the structural fault correctly',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Put the module together. Watch this East Coast Swing, then choose between two scorecards and defend the choice.',
    },
  ],
  contextArtefacts: [
    {
      id: 'ecs-routine',
      type: 'message',
      title: 'What you saw',
      content:
        'An East Coast Swing: clean triple-triple-rock timing; springy triples with the even-beat accent (rhythm); a genuine grounded down-up bounce (motion); lively, playful character; correct passes and underarm rotations; but it gradually drifted off down the line of dance instead of holding its circular spot (structure fault).',
    },
  ],
  challenges: [
    {
      id: 'jec-008-c1',
      type: 'contract-comparison',
      title: 'Two Scorecards',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'east-coast-swing', 'process'],
      storyContext: 'Two judges score the swing above and hand you their cards.',
      prompt: 'Which scorecard is the defensible reading?',
      options: [
        {
          id: 'a',
          label: 'Scorecard A: “Top marks everywhere — it was bouncy and full of energy.”',
          isCorrect: false,
          feedback:
            'Top-marks-everywhere ignores the drift off the spot you saw. Energy is not the whole spatial-structure score.',
        },
        {
          id: 'b',
          label: 'Scorecard B: “Low overall — drifting off the spot drags the whole swing down.”',
          isCorrect: false,
          feedback:
            'One weak area does not sink strong timing, rhythm, motion, character and figures. The lenses are independent.',
        },
        {
          id: 'c',
          label:
            'Scorecard C: “Strong timing, rhythm, motion, character and signature figures; spatial structure marked down because it drifted off down the line of dance instead of holding its circular spot.”',
          isCorrect: true,
          feedback:
            'This is defensible: each lens scored on its evidence, with the one fault placed on the spatial-structure lens.',
        },
        {
          id: 'd',
          label: 'Scorecard D: “Marked down on character — it was too playful.”',
          isCorrect: false,
          feedback:
            'Playful is correct for a swing; faulting character invents a weakness that was not there.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each card against what the artefact says you saw.' },
        { level: 2, title: 'Concept', content: 'A defensible card scores each lens on its own evidence.' },
        { level: 3, title: 'Specific clue', content: 'The one fault was drifting off the spot — the spatial-structure lens.' },
        { level: 4, title: 'Guided solution', content: 'Choose the card marking spatial structure for the drift.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Scorecard chosen' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Endorsing an all-high or all-low card would put your swing marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'dance.east-coast-swing', label: 'Judging the East Coast Swing' },
      ],
      successFeedback: 'Strengths kept, the drift marked on structure. A card you could defend.',
      failureFeedback: 'The defensible card is strong everywhere, marking spatial structure for drifting off the circular spot.',
    },
    {
      id: 'jec-008-c2',
      type: 'multiple-choice',
      title: 'One Line of Feedback',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'east-coast-swing', 'process'],
      storyContext: 'The couple’s coach asks for one concrete thing to work on after this East Coast Swing.',
      prompt: 'Which feedback is most useful and defensible?',
      options: [
        {
          id: 'a',
          label: '“Hold your spot — your timing, bounce, character and figures are strong; you just kept drifting off down the line instead of keeping the swing circular.”',
          isCorrect: true,
          feedback:
            'Right. It names the specific structural issue and keeps the strong bounce and playfulness, matching the scorecard.',
        },
        {
          id: 'b',
          label: '“Tone the whole thing down — it was too lively.”',
          isCorrect: false,
          feedback:
            'That would dull the correct playful energy; the issue is structure, not too much swing.',
        },
        {
          id: 'c',
          label: '“Travel more — cover the whole floor.”',
          isCorrect: false,
          feedback:
            'That breaks the swing’s circular, non-progressive structure — the exact opposite of the fix.',
        },
        {
          id: 'd',
          label: '“Nothing to fix — it was a fun swing.”',
          isCorrect: false,
          feedback:
            'You identified a real drift off the spot. "Nothing to fix" wastes the coach’s question.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Point at the real issue without dulling the dance.' },
        { level: 2, title: 'Concept', content: 'Useful feedback names a specific issue and fix.' },
        { level: 3, title: 'Specific clue', content: 'The weakness was drifting off the circular spot.' },
        { level: 4, title: 'Guided solution', content: 'Choose the "hold your spot" feedback that keeps the bounce.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Feedback delivered' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Vague or wrong feedback would dull the swing or leave the drift off the spot unaddressed.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Named the issue, kept the bounce. Useful feedback.',
      failureFeedback: 'The best feedback points at holding the circular spot while keeping the strong bounce — not "tone down" or "travel more".',
    },
  ],
  reflectionPrompt: 'Why is “travel more” tempting but wrong feedback for a swing that has drifted off its spot?',
  rewards: [{ type: 'xp', amount: 5, label: 'Swing scored end to end' }],
};
