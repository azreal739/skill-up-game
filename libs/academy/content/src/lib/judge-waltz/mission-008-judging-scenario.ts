import { MissionDefinition } from '@academy/content-model';

/** Waltz module mission 8 — a full Waltz scored across all lenses. */
export const judgeWaltz008JudgingScenario: MissionDefinition = {
  id: 'judge-waltz-008-judging-scenario',
  campaignId: 'judge-waltz',
  title: 'Scoring a Real Waltz',
  summary:
    'A whole Waltz, six lenses. Compare competing scorecards and pick the one that reads what actually happened on the floor.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply all six lenses to a full Waltz',
    'Choose the more defensible of two scorecards',
    'Place strengths and weaknesses on the right lenses',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Put the module together. Watch this Waltz, then choose between two scorecards — and be ready to say why the other one fails.',
    },
  ],
  contextArtefacts: [
    {
      id: 'waltz-routine',
      type: 'message',
      title: 'What you saw',
      content:
        'A Waltz: clean 3/4 timing with accents on 1 and 4; flowing rhythm; but shallow rise and fall (motion); elegant regal character; a rich figure vocabulary (box, twinkle, diamond, fallaway); good diagonal, progressive travel.',
    },
  ],
  challenges: [
    {
      id: 'jw-008-c1',
      type: 'contract-comparison',
      title: 'Two Scorecards',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'waltz', 'process'],
      storyContext: 'Two judges score the same Waltz described above and hand you their cards.',
      prompt: 'Which scorecard is the defensible reading?',
      options: [
        {
          id: 'a',
          label:
            'Scorecard A: “Top marks everywhere — it looked like a lovely, elegant Waltz.”',
          isCorrect: false,
          feedback:
            'Top-marks-everywhere ignores the shallow rise and fall you actually saw. Elegance is not a per-lens score.',
        },
        {
          id: 'b',
          label:
            'Scorecard B: “Low overall — the weak rise and fall drags the whole Waltz down to a poor score.”',
          isCorrect: false,
          feedback:
            'One weak lens does not sink strong timing, rhythm, character, figures and travel. The lenses are independent.',
        },
        {
          id: 'c',
          label:
            'Scorecard C: “Strong timing, rhythm, character, signature figures and travel; motion marked down for shallow rise and fall.”',
          isCorrect: true,
          feedback:
            'This is defensible: each lens scored on its own evidence, with the one real weakness placed exactly where it belongs.',
        },
        {
          id: 'd',
          label:
            'Scorecard D: “Marked down on signature figures — the box and twinkle are too basic to count for much.”',
          isCorrect: false,
          feedback:
            'The vocabulary was rich and correct; faulting figures here invents a weakness that was not on the floor.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each card against what the artefact says you saw.' },
        { level: 2, title: 'Concept', content: 'A defensible card scores each lens on its own evidence.' },
        { level: 3, title: 'Specific clue', content: 'Only the motion (rise and fall) was weak; everything else was strong.' },
        { level: 4, title: 'Guided solution', content: 'Choose the card that keeps the strengths and marks motion down.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Scorecard chosen' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Endorsing an all-high or all-low card would put your Waltz marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'dance.waltz', label: 'Judging the Waltz' },
      ],
      successFeedback: 'Strengths kept, the one weakness placed on motion. A card you could defend.',
      failureFeedback: 'The defensible card scores each lens on its evidence: strong everywhere but motion, marked down for shallow rise and fall.',
    },
    {
      id: 'jw-008-c2',
      type: 'multiple-choice',
      title: 'One Line of Feedback',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'waltz', 'process'],
      storyContext:
        'The couple’s coach asks for one concrete thing to work on after this Waltz.',
      prompt: 'Which feedback is most useful and defensible?',
      options: [
        {
          id: 'a',
          label: '“Deepen the rise and fall — the timing, figures and travel are already strong; the motion is what is holding the score back.”',
          isCorrect: true,
          feedback:
            'Right. It names the specific lens and the specific fix, and it is consistent with the scorecard.',
        },
        {
          id: 'b',
          label: '“Just add more energy — it needs more life overall.”',
          isCorrect: false,
          feedback:
            'Vague and not what you saw; the character was already elegant. This does not point at the real weakness.',
        },
        {
          id: 'c',
          label: '“Change the costume — presentation is what let them down.”',
          isCorrect: false,
          feedback:
            'Costume is not a lens, and it was not the issue. This is exactly the kind of feedback to avoid.',
        },
        {
          id: 'd',
          label: '“Nothing to fix — it was a lovely Waltz.”',
          isCorrect: false,
          feedback:
            'You identified a real, specific weakness in motion. "Nothing to fix" wastes the coach’s question.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Point at the lens that actually held the score back.' },
        { level: 2, title: 'Concept', content: 'Useful feedback names a specific lens and a specific fix.' },
        { level: 3, title: 'Specific clue', content: 'The weakness was shallow rise and fall — motion.' },
        { level: 4, title: 'Guided solution', content: 'Choose the feedback about deepening the rise and fall.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Feedback delivered' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Vague or wrong feedback leaves the couple working on the wrong thing between rounds.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Named the lens, named the fix. Feedback the coach can actually use.',
      failureFeedback: 'The best feedback points at the real weak lens — motion — with a specific fix: deepen the rise and fall.',
    },
  ],
  reflectionPrompt: 'When a routine is strong on five lenses and weak on one, how do you keep the one weakness in proportion?',
  rewards: [{ type: 'xp', amount: 5, label: 'Waltz scored end to end' }],
};
