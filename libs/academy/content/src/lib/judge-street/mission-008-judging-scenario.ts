import { MissionDefinition } from '@academy/content-model';

/** Street module mission 8 — a full Street solo scored across all lenses. */
export const judgeStreet008JudgingScenario: MissionDefinition = {
  id: 'judge-street-008-judging-scenario',
  campaignId: 'judge-street',
  title: 'Scoring a Real Street Solo',
  summary:
    'A whole Street solo, six lenses. Compare scorecards and pick the one that reads the musicality, isolation and styling-to-song honestly.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply all six lenses to a full Street solo',
    'Choose the more defensible scorecard',
    'Place the styling-to-song fault correctly',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Put the module together. Watch this Street solo, then choose between two scorecards and defend the choice.',
    },
  ],
  contextArtefacts: [
    {
      id: 'street-routine',
      type: 'message',
      title: 'What you saw',
      content:
        'A Street solo to a hard, funky hip-hop track: pops landing precisely on the accents (timing); deep groove and pocket (rhythm); clean isolation and upper/lower core control (motion); rich levels and good facing (spatial); correct popping and locking vocabulary; but the performer laced long passages of soft, lyrical contemporary movement that did not match the hard hip-hop track (styling not appropriate to the song).',
    },
  ],
  challenges: [
    {
      id: 'jst-008-c1',
      type: 'contract-comparison',
      title: 'Two Scorecards',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'street', 'process'],
      storyContext: 'Two judges score the Street solo above and hand you their cards.',
      prompt: 'Which scorecard is the defensible reading?',
      options: [
        {
          id: 'a',
          label: 'Scorecard A: “Top marks everywhere — the movement was beautiful and skilful.”',
          isCorrect: false,
          feedback:
            'Beauty and skill are real, but top-marks-everywhere ignores the styling-to-song mismatch you saw.',
        },
        {
          id: 'b',
          label: 'Scorecard B: “Low overall — the lyrical passages ruin the whole solo.”',
          isCorrect: false,
          feedback:
            'One weak area does not sink strong timing, rhythm, motion, spatial use and figures. The lenses are independent.',
        },
        {
          id: 'c',
          label:
            'Scorecard C: “Strong timing, rhythm, motion, spatial use and signature figures; marked down where the soft lyrical passages did not match the hard hip-hop track — styling not appropriate to the song.”',
          isCorrect: true,
          feedback:
            'This is defensible: each lens scored on its evidence, with the mismatch named as a styling-to-song fault.',
        },
        {
          id: 'd',
          label: 'Scorecard D: “Marked down on motion — the isolation was too controlled.”',
          isCorrect: false,
          feedback:
            'Clean isolation is a strength, not a fault; this invents a weakness that was not there.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each card against what the artefact says you saw.' },
        { level: 2, title: 'Concept', content: 'A defensible card scores each lens on its own evidence.' },
        { level: 3, title: 'Specific clue', content: 'The one fault was styling not matching the song.' },
        { level: 4, title: 'Guided solution', content: 'Choose the card naming the styling-to-song mismatch.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Scorecard chosen' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Endorsing an all-high or all-low card would put your Street marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'dance.street', label: 'Judging Street Styles' },
      ],
      successFeedback: 'Strengths kept, the styling mismatch named. A card you could defend.',
      failureFeedback: 'The defensible card is strong everywhere, marking the passages where styling did not match the song.',
    },
    {
      id: 'jst-008-c2',
      type: 'multiple-choice',
      title: 'One Line of Feedback',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'street', 'process'],
      storyContext: 'The performer asks for one concrete thing to work on after this solo.',
      prompt: 'Which feedback is most useful and defensible?',
      options: [
        {
          id: 'a',
          label: '“Match your style to the track — your popping, groove, isolation and space use are strong; the soft contemporary passages just did not fit the hard hip-hop song.”',
          isCorrect: true,
          feedback:
            'Right. It names the specific styling-to-song issue and keeps the strong technique, matching the scorecard.',
        },
        {
          id: 'b',
          label: '“Do fewer moves — it was too busy.”',
          isCorrect: false,
          feedback:
            'Busyness was not the issue; the styling did not match the song. Cutting moves misses the point.',
        },
        {
          id: 'c',
          label: '“Drop the popping — stick to the contemporary movement.”',
          isCorrect: false,
          feedback:
            'The popping fit the track; it is the lyrical passages that did not. This reverses the fix.',
        },
        {
          id: 'd',
          label: '“Nothing to fix — it was a skilful solo.”',
          isCorrect: false,
          feedback:
            'You identified a real styling-to-song mismatch. "Nothing to fix" wastes the performer’s question.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Point at the real issue without dulling the strengths.' },
        { level: 2, title: 'Concept', content: 'Useful feedback names a specific issue and fix.' },
        { level: 3, title: 'Specific clue', content: 'The weakness was styling not matching the song.' },
        { level: 4, title: 'Guided solution', content: 'Choose the styling-to-song feedback that keeps the strong technique.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Feedback delivered' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Vague or wrong feedback would dull the performer’s strengths or leave the styling mismatch unaddressed.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Named the issue, kept the strengths. Useful feedback.',
      failureFeedback: 'The best feedback points at matching style to the track while keeping the strong technique — not "fewer moves" or "drop the popping".',
    },
  ],
  reflectionPrompt: 'Why is “do fewer moves” tempting but wrong feedback for a solo with a styling-to-song problem?',
  rewards: [{ type: 'xp', amount: 5, label: 'Street scored end to end' }],
};
