import { MissionDefinition } from '@academy/content-model';

/** Cha Cha module mission 8 — a full Cha Cha scored across all lenses. */
export const judgeChaCha008JudgingScenario: MissionDefinition = {
  id: 'judge-cha-cha-008-judging-scenario',
  campaignId: 'judge-cha-cha',
  title: 'Scoring a Real Cha Cha',
  summary:
    'A whole Cha Cha, six lenses. Compare scorecards and pick the one that reads the chasse and the motion honestly.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply all six lenses to a full Cha Cha',
    'Choose the more defensible scorecard',
    'Place the motion fault on the right lens',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Put the module together. Watch this Cha Cha, then choose between two scorecards and defend the choice.',
    },
  ],
  contextArtefacts: [
    {
      id: 'chacha-routine',
      type: 'message',
      title: 'What you saw',
      content:
        'A Cha Cha: clean 4&5 chasse timing with a sharp "&"; crisp rhythm; hip movement wagged from the waist over fairly stiff knees (motion); fiery cheeky character; correct basics, breaks and spot turns; and controlled, contained use of the floor.',
    },
  ],
  challenges: [
    {
      id: 'jcc-008-c1',
      type: 'contract-comparison',
      title: 'Two Scorecards',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'cha-cha', 'process'],
      storyContext: 'Two judges score the Cha Cha above and hand you their cards.',
      prompt: 'Which scorecard is the defensible reading?',
      options: [
        {
          id: 'a',
          label: 'Scorecard A: “Top marks everywhere — it was fiery and fun.”',
          isCorrect: false,
          feedback:
            'Top-marks-everywhere ignores the waist-wagged, knee-stiff hip action you saw. Fun is not a per-lens score.',
        },
        {
          id: 'b',
          label: 'Scorecard B: “Low overall — the weak Cuban motion drags the whole Cha Cha down.”',
          isCorrect: false,
          feedback:
            'One weak lens does not sink strong timing, rhythm, character, figures and floor use. The lenses are independent.',
        },
        {
          id: 'c',
          label: 'Scorecard C: “Marked down on character — it was too wild.”',
          isCorrect: false,
          feedback:
            'The character was correctly fiery and cheeky; faulting it invents a weakness that was not there.',
        },
        {
          id: 'd',
          label:
            'Scorecard D: “Strong timing, rhythm, character, signature figures and spatial control; motion marked down for hip action wagged from the waist rather than driven through the knees.”',
          isCorrect: true,
          feedback:
            'This is defensible: each lens scored on its evidence, with the one real weakness placed on motion.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each card against what the artefact says you saw.' },
        { level: 2, title: 'Concept', content: 'A defensible card scores each lens on its own evidence.' },
        { level: 3, title: 'Specific clue', content: 'Only the motion (faked Cuban action) was weak.' },
        { level: 4, title: 'Guided solution', content: 'Choose the card that keeps the strengths and marks motion down.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Scorecard chosen' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Endorsing an all-high or all-low card would put your Cha Cha marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' },
      ],
      successFeedback: 'Strengths kept, the one weakness placed on motion. A card you could defend.',
      failureFeedback: 'The defensible card is strong everywhere but motion, marked down for waist-wagged hip action.',
    },
    {
      id: 'jcc-008-c2',
      type: 'multiple-choice',
      title: 'One Line of Feedback',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'cha-cha', 'process'],
      storyContext: 'The couple’s coach asks for one concrete thing to work on after this Cha Cha.',
      prompt: 'Which feedback is most useful and defensible?',
      options: [
        {
          id: 'a',
          label: '“Tone the fire down — it was a bit too cheeky.”',
          isCorrect: false,
          feedback:
            'The cheeky character was correct; toning it down cuts against the Cha Cha and misses the real issue.',
        },
        {
          id: 'b',
          label: '“Travel more — cover the floor.”',
          isCorrect: false,
          feedback:
            'That pushes against the Cha Cha’s contained structure — the wrong advice.',
        },
        {
          id: 'c',
          label: '“Drive the Cuban motion from the knees — your timing, figures and character are strong; the motion is holding the score back.”',
          isCorrect: true,
          feedback:
            'Right. It names the specific lens and fix, and matches the scorecard.',
        },
        {
          id: 'd',
          label: '“Nothing to fix — it was a lively Cha Cha.”',
          isCorrect: false,
          feedback:
            'You identified a real motion weakness. "Nothing to fix" wastes the coach’s question.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Point at the lens that actually held the score back.' },
        { level: 2, title: 'Concept', content: 'Useful feedback names a specific lens and fix.' },
        { level: 3, title: 'Specific clue', content: 'The weakness was faked Cuban motion — fixed at the knees.' },
        { level: 4, title: 'Guided solution', content: 'Choose the feedback about driving Cuban motion from the knees.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Feedback delivered' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Vague or wrong feedback leaves the couple working on the wrong thing — or dulling their character.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Named the lens, named the fix, kept the character. Useful feedback.',
      failureFeedback: 'The best feedback points at the motion weakness: drive the Cuban action from the knees.',
    },
  ],
  reflectionPrompt: 'Why is “tone the fire down” tempting but usually wrong feedback for a Cha Cha?',
  rewards: [{ type: 'xp', amount: 5, label: 'Cha Cha scored end to end' }],
};
