import { MissionDefinition } from '@academy/content-model';

/** Core Fundamentals mission 8 — applying all six lenses to a scenario. */
export const judgeCore008JudgingScenario: MissionDefinition = {
  id: 'judge-core-008-judging-scenario',
  campaignId: 'judge-core-fundamentals',
  title: 'Your First Scorecard',
  summary:
    'A whole performance, six lenses, one defensible verdict. Compare competing scorecards and choose the one you could stand behind.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply all six lenses to a single performance',
    'Choose the more defensible of two judgements',
    'State a placement in terms of criteria, not impression',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Time to put it together. You will read a performance, then two judges will hand you their scorecards. Pick the one that holds up — and know why the other does not.',
    },
  ],
  contextArtefacts: [
    {
      id: 'the-routine',
      type: 'message',
      title: 'What you saw',
      content:
        'A Waltz: clean 3/4 timing with accents on 1 and 4; elegant regal character; but weak rise and fall (motion), and only one recognisable signature figure across the routine. Good diagonal travel; no floorcraft issues.',
    },
  ],
  challenges: [
    {
      id: 'jc-008-c1',
      type: 'contract-comparison',
      title: 'Two Scorecards',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'process'],
      storyContext:
        'Two judges score the same Waltz above. Their scorecards disagree on where the couple is strong and weak.',
      prompt: 'Which scorecard is the more defensible reading of what happened?',
      options: [
        {
          id: 'a',
          label:
            'Scorecard A: “High across the board — timing was on, and it looked polished, so everything gets top marks.”',
          isCorrect: false,
          feedback:
            'Top marks everywhere ignores what you saw: weak rise and fall and only one signature figure. Polish is not a per-lens score.',
        },
        {
          id: 'b',
          label:
            'Scorecard B: “Strong timing and character; motion marked down for weak rise and fall; signature figures marked down for a thin figure vocabulary; good spatial travel.”',
          isCorrect: true,
          feedback:
            'This is the defensible reading: each lens scored on what actually happened, strengths and weaknesses named separately.',
        },
        {
          id: 'c',
          label:
            'Scorecard C: “Low overall — one weak lens (motion) drags the whole performance down to a poor score.”',
          isCorrect: false,
          feedback:
            'Lenses are scored independently; one weak lens does not sink strong timing and character. That is not how the six lenses work.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Compare each card against what the artefact says you saw.' },
        { level: 2, title: 'Concept', content: 'A defensible scorecard marks each lens on its own evidence.' },
        { level: 3, title: 'Specific clue', content: 'Weak rise and fall and a thin figure vocabulary must show up somewhere.' },
        { level: 4, title: 'Guided solution', content: 'Choose the scorecard that marks motion and signature figures down while keeping timing and character up.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Scorecard defended' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Endorsing an all-high or all-low card would put your marks out of line with the rest of the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'judging.criteria', label: 'The Six Judging Lenses' },
      ],
      successFeedback: 'Each lens marked on its own evidence — a card you could hand to a coach.',
      failureFeedback: 'The defensible card scores each lens separately: strong timing/character, weaker motion and figures.',
    },
    {
      id: 'jc-008-c2',
      type: 'multiple-choice',
      title: 'Say Why',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'process'],
      storyContext:
        'A coach asks why you placed this Waltz couple below another that scored similarly on timing and character.',
      prompt: 'Which answer is a defensible placement?',
      options: [
        {
          id: 'a',
          label: '“They just did not have the same spark — I went with my gut.”',
          isCorrect: false,
          feedback:
            'Gut and spark are not criteria. A coach cannot coach against them, and a panel cannot check them.',
        },
        {
          id: 'b',
          label: '“The other couple had a more expensive costume and better music.”',
          isCorrect: false,
          feedback:
            'Neither costume nor music choice is a judging lens. This is exactly the kind of reason a placement must avoid.',
        },
        {
          id: 'c',
          label:
            '“The other couple showed clearer rise and fall and a richer figure vocabulary — stronger on the motion and signature-figures lenses.”',
          isCorrect: true,
          feedback:
            'Right. You named the specific lenses and what happened on them — a placement the coach can act on and the panel can verify.',
        },
        {
          id: 'd',
          label: '“The audience clearly preferred the other couple.”',
          isCorrect: false,
          feedback:
            'Crowd reaction is not a lens. The placement has to rest on what the couples did against the criteria.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'A defensible reason names lenses and evidence.' },
        { level: 2, title: 'Concept', content: 'State placements in terms of specific criteria, not impression.' },
        { level: 3, title: 'Specific clue', content: 'The difference was in motion and signature figures.' },
        { level: 4, title: 'Guided solution', content: 'Choose the answer citing clearer rise and fall and richer figures.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Placement justified' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'A placement explained by “gut” leaves a coach with nothing to work on and erodes trust in the panel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Named lenses, named evidence. That is a placement that survives the coaches’ table.',
      failureFeedback: 'A defensible placement cites specific lenses and what happened on them — not spark, costume or crowd.',
    },
  ],
  reflectionPrompt: 'Think of a time you preferred one option over another “on instinct” — could you have named the criteria behind it?',
  rewards: [{ type: 'xp', amount: 5, label: 'First scorecard complete' }],
};
