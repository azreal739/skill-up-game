import { MissionDefinition } from '@academy/content-model';

/** Final Certification mission 7 — station: a mock score sheet. */
export const judgeFinal007ScoreSheet: MissionDefinition = {
  id: 'judge-final-007-score-sheet',
  campaignId: 'judge-final-cert',
  title: 'Station 6 — Mark the Sheet',
  summary: 'Fill a full score sheet across all six lenses, then defend one line of it.',
  difficulty: 'hard',
  learningObjectives: [
    'Score a full performance across six lenses',
    'Choose a defensible complete score sheet',
    'Justify a single line of the sheet',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Sixth station: a mock score sheet. Watch the routine, then choose the sheet that scores each lens on its own evidence.',
    },
  ],
  contextArtefacts: [
    {
      id: 'sheet-routine',
      type: 'message',
      title: 'The routine',
      content:
        'A Cha Cha: clean 4&5 chasse and crisp rhythm; genuine knee-driven Cuban motion; fiery cheeky character; correct basics and breaks but only one turn (thin variety); controlled floor with good floorcraft.',
    },
  ],
  challenges: [
    {
      id: 'jf-007-c1',
      type: 'contract-comparison',
      title: 'Choose the Sheet',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'process'],
      storyContext: 'Two completed score sheets are handed to you for the Cha Cha above.',
      prompt: 'Which sheet is defensible?',
      options: [
        {
          id: 'a',
          label:
            'Sheet A: “All six lenses top marks — it was a fun, clean Cha Cha.”',
          isCorrect: false,
          feedback:
            'Top-marks-everywhere ignores the thin, one-turn figure vocabulary you saw.',
        },
        {
          id: 'b',
          label:
            'Sheet B: “Timing, rhythm, motion, character and spatial structure strong; signature figures marked down for a thin, one-turn vocabulary.”',
          isCorrect: true,
          feedback:
            'Correct. Each lens scored on its evidence, with the one real weakness on signature figures.',
        },
        {
          id: 'c',
          label:
            'Sheet C: “Everything low — one turn means the whole routine is weak.”',
          isCorrect: false,
          feedback:
            'One thin lens does not sink strong timing, rhythm, motion, character and floor use.',
        },
        {
          id: 'd',
          label:
            'Sheet D: “Motion marked down — the Cuban action must have been faked.”',
          isCorrect: false,
          feedback:
            'The Cuban motion was genuine and knee-driven; faulting it invents a weakness.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each sheet against what you actually saw.' },
        { level: 2, title: 'Concept', content: 'A defensible sheet scores each lens on its own evidence.' },
        { level: 3, title: 'Specific clue', content: 'Only the figure variety was thin.' },
        { level: 4, title: 'Guided solution', content: 'Choose the sheet that marks only signature figures down.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Sheet chosen' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'An all-high or all-low sheet would put your marks out of line with the panel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Each lens on its evidence, figures marked. A defensible sheet.',
      failureFeedback: 'The defensible sheet keeps the strengths and marks only signature figures for thin variety.',
    },
    {
      id: 'jf-007-c2',
      type: 'multiple-choice',
      title: 'Defend the Line',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'process'],
      storyContext: 'A moderator asks you to justify the signature-figures line of your sheet.',
      prompt: 'Which justification holds up?',
      options: [
        {
          id: 'a',
          label: '“It just felt a bit thin to me.”',
          isCorrect: false,
          feedback:
            'A feeling is not a justification. Cite the specific evidence.',
        },
        {
          id: 'b',
          label: '“Their costume did not suit the figures.”',
          isCorrect: false,
          feedback:
            'Costume is not a lens; it has nothing to do with the figures score.',
        },
        {
          id: 'c',
          label: '“Other couples usually do more.”',
          isCorrect: false,
          feedback:
            'Comparison to a vague norm is not evidence; cite what this couple actually showed.',
        },
        {
          id: 'd',
          label: '“Across the whole routine they showed correct basics and breaks but only a single turn — a thin figure vocabulary, which the signature-figures lens rewards for range.”',
          isCorrect: true,
          feedback:
            'Correct. Specific, evidence-based, and tied to what the lens judges. That line holds up.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Cite specific evidence tied to the lens.' },
        { level: 2, title: 'Concept', content: 'Justify from what the couple showed, not feelings or costume.' },
        { level: 3, title: 'Specific clue', content: 'Only one turn across the routine.' },
        { level: 4, title: 'Guided solution', content: 'Choose the evidence-based justification.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Line defended' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'A score you cannot justify undermines the whole sheet and the panel’s credibility.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Specific, evidence-based, tied to the lens. The line holds up.',
      failureFeedback: 'Justify from evidence tied to the lens: correct basics and breaks but only one turn is a thin vocabulary.',
    },
  ],
  reflectionPrompt: 'Which line of a score sheet do you find hardest to justify out loud, and why?',
  rewards: [{ type: 'xp', amount: 5, label: 'Station 6 cleared' }],
};
