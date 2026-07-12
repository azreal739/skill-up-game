import { MissionDefinition } from '@academy/content-model';

/** Nightclub module mission 8 — a full Nightclub scored across all lenses. */
export const judgeNightclub008JudgingScenario: MissionDefinition = {
  id: 'judge-nightclub-008-judging-scenario',
  campaignId: 'judge-nightclub',
  title: 'Scoring a Real Nightclub',
  summary:
    'A whole Nightclub, six lenses. Compare scorecards and pick the one that reads the sway and the space honestly.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply all six lenses to a full Nightclub',
    'Choose the more defensible scorecard',
    'Place the base-sway and spatial faults correctly',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Put the module together. Watch this Nightclub, then choose between two scorecards and be ready to defend the choice.',
    },
  ],
  contextArtefacts: [
    {
      id: 'nc-routine',
      type: 'message',
      title: 'What you saw',
      content:
        'A Nightclub: clean 4/4 slow-quick-quick timing; soft, connected rhythm; but sway that came mostly from the upper body over a still base (motion); warm romantic character; correct diamonds and passes; and it stayed nicely contained parallel to the audience.',
    },
  ],
  challenges: [
    {
      id: 'jn-008-c1',
      type: 'contract-comparison',
      title: 'Two Scorecards',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'nightclub', 'process'],
      storyContext: 'Two judges score the Nightclub above and hand you their cards.',
      prompt: 'Which scorecard is the defensible reading?',
      options: [
        {
          id: 'a',
          label:
            'Scorecard A: “Top marks everywhere — it was a warm, pretty Nightclub.”',
          isCorrect: false,
          feedback:
            'Top-marks-everywhere ignores the upper-body sway you saw. Warmth is not a per-lens score.',
        },
        {
          id: 'b',
          label:
            'Scorecard B: “Strong timing, rhythm, character, figures and spatial structure; motion marked down for sway coming from the upper body rather than the base.”',
          isCorrect: true,
          feedback:
            'This is defensible: each lens scored on its evidence, with the one real weakness placed on motion.',
        },
        {
          id: 'c',
          label:
            'Scorecard C: “Low overall — the sway fault drags the whole Nightclub down.”',
          isCorrect: false,
          feedback:
            'One weak lens does not sink strong timing, rhythm, character, figures and structure. The lenses are independent.',
        },
        {
          id: 'd',
          label:
            'Scorecard D: “Marked down on spatial structure — staying contained is too safe.”',
          isCorrect: false,
          feedback:
            'Staying contained is correct for a Nightclub; faulting it invents a weakness that was not there.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each card against what the artefact says you saw.' },
        { level: 2, title: 'Concept', content: 'A defensible card scores each lens on its own evidence.' },
        { level: 3, title: 'Specific clue', content: 'Only the motion (upper-body sway) was weak; the rest was strong.' },
        { level: 4, title: 'Guided solution', content: 'Choose the card that keeps the strengths and marks motion down.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Scorecard chosen' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Endorsing an all-high or all-low card would put your Nightclub marks out of line with the panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'dance.nightclub', label: 'Judging the Nightclub' },
      ],
      successFeedback: 'Strengths kept, the one weakness placed on motion. A card you could defend.',
      failureFeedback: 'The defensible card is strong everywhere but motion, marked down for upper-body sway.',
    },
    {
      id: 'jn-008-c2',
      type: 'multiple-choice',
      title: 'One Line of Feedback',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'nightclub', 'process'],
      storyContext: 'The couple’s coach asks for one concrete thing to work on after this Nightclub.',
      prompt: 'Which feedback is most useful and defensible?',
      options: [
        {
          id: 'a',
          label: '“Warm it up more — it needed more feeling overall.”',
          isCorrect: false,
          feedback:
            'Vague and not what you saw; the character was already warm. This misses the real weakness.',
        },
        {
          id: 'b',
          label: '“Travel more around the floor to fill the space.”',
          isCorrect: false,
          feedback:
            'That would break the Nightclub’s non-progressive structure — the exact opposite of correct advice.',
        },
        {
          id: 'c',
          label: '“Drive the sway from the base — your timing, figures and shaping are strong; the motion is what is holding the score back.”',
          isCorrect: true,
          feedback:
            'Right. It names the specific lens and the specific fix, and it matches the scorecard.',
        },
        {
          id: 'd',
          label: '“Nothing to fix — it was a lovely Nightclub.”',
          isCorrect: false,
          feedback:
            'You identified a real motion weakness. "Nothing to fix" wastes the coach’s question.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Point at the lens that actually held the score back.' },
        { level: 2, title: 'Concept', content: 'Useful feedback names a specific lens and fix.' },
        { level: 3, title: 'Specific clue', content: 'The weakness was upper-body sway — motion, fixed at the base.' },
        { level: 4, title: 'Guided solution', content: 'Choose the feedback about driving the sway from the base.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Feedback delivered' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Vague or wrong feedback leaves the couple working on the wrong thing — or breaking their structure.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Named the lens, named the fix, kept the structure. Useful feedback.',
      failureFeedback: 'The best feedback points at the motion weakness with a specific fix: drive the sway from the base.',
    },
  ],
  reflectionPrompt: 'Why is "travel more to fill the space" the wrong advice for a Nightclub, even though it sounds helpful?',
  rewards: [{ type: 'xp', amount: 5, label: 'Nightclub scored end to end' }],
};
