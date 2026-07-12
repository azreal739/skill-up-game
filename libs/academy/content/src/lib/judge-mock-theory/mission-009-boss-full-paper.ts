import { MissionDefinition } from '@academy/content-model';

/** Mock Theory boss — the full mock theory paper. */
export const judgeTheory009BossFullPaper: MissionDefinition = {
  id: 'judge-theory-009-boss-full-paper',
  campaignId: 'judge-mock-theory',
  title: 'Boss: The Full Mock Paper',
  summary:
    'The complete mock theory exam — a mix of recall and application across every dance and lens.',
  difficulty: 'boss',
  learningObjectives: [
    'Recall and apply theory across all dances',
    'Map every question to its lens under exam pressure',
    'Answer from the criteria, not from hunches',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'This is the full paper. Recall, then apply. Name the lens, answer from what it judges, and do not invent faults the question did not describe.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'You have revised every dance. Trust the criteria and take each question on its own.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jt-009-c1',
      type: 'multiple-choice',
      title: 'Section A — Rapid Recall',
      difficulty: 'hard',
      tags: ['dance', 'judging'],
      storyContext: 'A rapid-recall question mixes all four studied dances.',
      prompt: 'Which statement is correct?',
      options: [
        {
          id: 'a',
          label: 'The Nightclub is progressive and travels the line of dance.',
          isCorrect: false,
          feedback:
            'Nightclub is non-progressive; the Waltz is the progressive one.',
        },
        {
          id: 'b',
          label: 'The Waltz is 3/4 with rise and fall; the Cha Cha is 4/4 with the 4&5 chasse and Cuban motion.',
          isCorrect: true,
          feedback:
            'Correct on both counts — time signatures, motions and rhythms all lined up.',
        },
        {
          id: 'c',
          label: 'West Coast Swing uses Cuban motion and Nightclub uses the anchor.',
          isCorrect: false,
          feedback:
            'Reversed: WCS uses the anchor; Cuban motion is the Cha Cha. Nightclub sways from the base.',
        },
        {
          id: 'd',
          label: 'The Cha Cha is the only studied dance in 3/4.',
          isCorrect: false,
          feedback:
            'The Waltz is the 3/4 dance; the Cha Cha is 4/4.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each half of every statement.' },
        { level: 2, title: 'Concept', content: 'Match time, motion and rhythm to the right dance.' },
        { level: 3, title: 'Specific clue', content: 'Waltz 3/4 + rise and fall; Cha Cha 4/4 + chasse.' },
        { level: 4, title: 'Guided solution', content: 'Choose the Waltz/Cha Cha statement.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Recall cleared' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'A wrong recall answer signals a gap that will resurface on the floor.',
        },
      ],
      helpLinks: [{ topicId: 'judging.criteria', label: 'The Six Judging Lenses' }],
      successFeedback: 'Every half checked out. Recall section cleared.',
      failureFeedback: 'The correct statement: Waltz 3/4 with rise and fall; Cha Cha 4/4 with the 4&5 chasse and Cuban motion.',
    },
    {
      id: 'jt-009-c2',
      type: 'multiple-choice',
      title: 'Section B — Identify the Fault',
      difficulty: 'hard',
      tags: ['dance', 'judging'],
      storyContext:
        'A West Coast Swing couple dances cleanly but never settles — each pattern rushes into the next with no grounded end.',
      prompt: 'Which lens takes the deduction, and why?',
      options: [
        {
          id: 'a',
          label: 'Character — rushing looks a bit frantic.',
          isCorrect: false,
          feedback:
            'It may look frantic, but the missing anchor is a body-action matter, not personality.',
        },
        {
          id: 'b',
          label: 'Timing — never settling means they were ahead of the beat.',
          isCorrect: false,
          feedback:
            'They can rush the anchor while still on the beat; the missing settle is motion, not timing.',
        },
        {
          id: 'c',
          label: 'Spatial structure — no anchor means they left the slot.',
          isCorrect: false,
          feedback:
            'The anchor is a settle, not a position on the slot; a missing anchor is motion, not structure.',
        },
        {
          id: 'd',
          label: 'Motion — the anchor settle is defining WCS motion, and a missing settle is a motion deduction.',
          isCorrect: true,
          feedback:
            'Correct. The anchor is the motion lens; the other lenses were clean and stay so.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What lens does the anchor settle belong to?' },
        { level: 2, title: 'Concept', content: 'The anchor is defining WCS motion.' },
        { level: 3, title: 'Specific clue', content: 'They rushed, but were still on the beat.' },
        { level: 4, title: 'Guided solution', content: 'Choose motion.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Fault identified' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Misfiling the anchor fault would repeat on every WCS you judge.',
        },
      ],
      helpLinks: [{ topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' }],
      successFeedback: 'Missing anchor → motion. The other lenses stay clean.',
      failureFeedback: 'The anchor settle is WCS motion; a missing settle is a motion deduction, not timing or structure.',
    },
    {
      id: 'jt-009-c3',
      type: 'contract-comparison',
      title: 'Section C — Mark the Paper',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'process'],
      storyContext:
        'Two candidates answer the final essay: "How should a judge treat a technically flawless dance performed with the wrong character for the style?"',
      prompt: 'Which answer earns the marks?',
      options: [
        {
          id: 'a',
          label:
            'Answer A: “Flawless technique cannot be marked down, so the performance should score at the top regardless of character.”',
          isCorrect: false,
          feedback:
            'The lenses are independent; character is scored on its own, and the wrong character loses character marks.',
        },
        {
          id: 'b',
          label:
            'Answer B: “Score the technical lenses (timing, rhythm, motion, figures, structure) on their own strong merits, but mark character down for the wrong energy — the lenses are independent, so a flawless-but-wrong-character dance loses character marks without losing the others.”',
          isCorrect: true,
          feedback:
            'Correct. This is the whole method: independent lenses, character marked for what character judges, technique credited on its own.',
        },
        {
          id: 'c',
          label:
            'Answer C: “Wrong character ruins everything, so mark the whole performance down to a low score.”',
          isCorrect: false,
          feedback:
            'One weak lens does not sink the others; the strong technical lenses still score as they earned.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Are the lenses independent or all-or-nothing?' },
        { level: 2, title: 'Concept', content: 'Score each lens on its own; character down, technique up.' },
        { level: 3, title: 'Specific clue', content: 'Neither top-marks-everywhere nor all-low.' },
        { level: 4, title: 'Guided solution', content: 'Choose the answer that scores technique and character independently.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Paper passed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'An all-or-nothing answer misrepresents how the panel scores and undermines fair marking.',
        },
        {
          type: 'severity',
          delta: 1,
          reason: 'Failing the core principle of independent lenses is a serious theory gap for a judge.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.criteria', label: 'The Six Judging Lenses' },
        { topicId: 'judging.process', label: 'The Judging Process' },
      ],
      successFeedback: 'Independent lenses: technique credited, character marked. The paper is passed.',
      failureFeedback: 'The marks go to independent scoring: strong technical lenses stand while character is marked for the wrong energy.',
    },
  ],
  reflectionPrompt: 'Which section of the paper would you most want to re-sit, and what would you revise first?',
  rewards: [{ type: 'xp', amount: 25, label: 'Mock theory passed' }],
};
