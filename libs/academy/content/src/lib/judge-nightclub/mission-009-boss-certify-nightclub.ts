import { MissionDefinition } from '@academy/content-model';

/** Nightclub module boss — certify a full Nightclub across every lens. */
export const judgeNightclub009BossCertifyNightclub: MissionDefinition = {
  id: 'judge-nightclub-009-boss-certify-nightclub',
  campaignId: 'judge-nightclub',
  title: 'Boss: Certify the Nightclub',
  summary:
    'A certification-style Nightclub assessment. Confirm the dance, score every lens, and deliver a verdict you can sign.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply all six lenses to a Nightclub under assessment',
    'Weigh a mixed performance into one verdict',
    'Defend a Nightclub placement on the criteria',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Your Nightclub certification rehearsal. One routine, every lens, a signed verdict.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Confirm it is a Nightclub, watch each lens, and combine honestly. Watch the two classic traps: upper-body sway, and drifting into travel.',
    },
  ],
  contextArtefacts: [
    {
      id: 'certification-nightclub',
      type: 'message',
      title: 'The routine on the floor',
      content:
        'Claimed dance: Nightclub. Observed: clean 4/4 slow-quick-quick timing; soft connected rhythm; genuine base-driven sway and counter-sway (motion); warm romantic character; correct diamonds and passes but shaped small and flat; and the couple gradually drifted into travelling a quarter of the way around the floor.',
    },
  ],
  challenges: [
    {
      id: 'jn-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Confirm and Frame',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'nightclub'],
      storyContext: 'Before scoring, confirm the dance and set your expectations.',
      prompt: 'Is this a Nightclub, and what should you therefore expect?',
      options: [
        {
          id: 'a',
          label: 'Yes — 4/4 slow-quick-quick with soft base-driven sway confirms a Nightclub, so expect non-progressive, contained geometry.',
          isCorrect: true,
          feedback:
            'Correct. Confirmed as a Nightclub, you hold it to non-progressive expectations — which makes the drift into travel a real fault.',
        },
        {
          id: 'b',
          label: 'No — because it drifted into travel, it must actually be a progressive dance.',
          isCorrect: false,
          feedback:
            'The drift is a fault WITHIN a Nightclub, not evidence of a different dance. Timing, rhythm and sway confirm the Nightclub.',
        },
        {
          id: 'c',
          label: 'Yes, but judge it as progressive since it travelled part of the floor.',
          isCorrect: false,
          feedback:
            'A Nightclub is non-progressive by definition; letting the fault redefine the expectation would excuse the fault.',
        },
        {
          id: 'd',
          label: 'Cannot tell without the music title.',
          isCorrect: false,
          feedback:
            'The dance is confirmed from timing, rhythm and motion — not from a title.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What confirms a Nightclub, and what does that commit you to expect?' },
        { level: 2, title: 'Concept', content: 'Confirm the dance, then hold it to that dance’s expectations.' },
        { level: 3, title: 'Specific clue', content: 'Slow-quick-quick + base sway = Nightclub = non-progressive.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Yes" with non-progressive expectations.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Dance framed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Letting the travel fault redefine the dance would excuse the very error you are meant to catch.',
        },
      ],
      helpLinks: [{ topicId: 'dance.nightclub', label: 'Judging the Nightclub' }],
      successFeedback: 'Confirmed and framed as a non-progressive Nightclub. Now the drift reads as a fault.',
      failureFeedback: 'Slow-quick-quick with base sway confirms a Nightclub — non-progressive, so the travel is a fault within it.',
    },
    {
      id: 'jn-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Place the Two Weaknesses',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'nightclub'],
      storyContext:
        'Two things fell short: small, flat figure shaping, and a drift into travelling a quarter of the floor.',
      prompt: 'Where do these two weaknesses belong?',
      options: [
        {
          id: 'a',
          label: 'Both on motion — the sway must have caused them.',
          isCorrect: false,
          feedback:
            'Motion (sway) was actually a strength here. Neither flat figures nor travel is a motion issue.',
        },
        {
          id: 'b',
          label: 'Both on character — anything underwhelming is a mood problem.',
          isCorrect: false,
          feedback:
            'Character was warm. Flat shaping and travel are not mood; they are figures and spatial structure.',
        },
        {
          id: 'c',
          label: 'Flat shaping on signature figures; the drift into travel on spatial structure.',
          isCorrect: true,
          feedback:
            'Correct. Under-shaped figures are the signature-figures lens; travelling in a non-progressive dance is spatial structure.',
        },
        {
          id: 'd',
          label: 'Flat shaping on spatial structure; the travel on signature figures.',
          isCorrect: false,
          feedback:
            'Reversed. How the specific figures are shaped is the figures lens; where the couple goes on the floor is spatial structure.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Match each weakness to the lens that scores it.' },
        { level: 2, title: 'Concept', content: 'Figure shaping = signature figures; floor travel = spatial structure.' },
        { level: 3, title: 'Specific clue', content: 'Do not put either on motion or character — those were strong.' },
        { level: 4, title: 'Guided solution', content: 'Choose flat shaping → figures, drift → spatial structure.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Weaknesses placed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Filing the weaknesses under the wrong lenses would scramble the scorecard against the panel’s.',
        },
      ],
      helpLinks: [{ topicId: 'judging.criteria', label: 'The Six Judging Lenses' }],
      successFeedback: 'Flat shaping to figures, drift to spatial structure. Motion and character stay strong.',
      failureFeedback: 'Figure shaping is the signature-figures lens; travelling in a non-progressive dance is spatial structure.',
    },
    {
      id: 'jn-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign the Verdict',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'nightclub', 'process'],
      storyContext: 'Two final verdicts are drafted for this Nightclub. Sign the defensible one.',
      prompt: 'Which verdict do you sign?',
      options: [
        {
          id: 'a',
          label:
            'Verdict A: “Warm and romantic, so top marks — the feeling carried the whole dance.”',
          isCorrect: false,
          feedback:
            'Strong character does not lift figures and structure. Top-marks-everywhere ignores the flat shaping and the drift.',
        },
        {
          id: 'b',
          label:
            'Verdict B: “A pleasing Nightclub — clean timing and rhythm, genuine base-driven sway and warm character; held back on signature figures for flat shaping and on spatial structure for drifting into travel.”',
          isCorrect: true,
          feedback:
            'Right. Independent lens scores combined honestly, with both real weaknesses named on the correct lenses.',
        },
        {
          id: 'c',
          label:
            'Verdict C: “It wandered, so the whole thing fails — a Nightclub that travels is no Nightclub.”',
          isCorrect: false,
          feedback:
            'The drift lowers one lens; it does not erase clean timing, genuine sway and warm character.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Combine the lenses honestly — no single strength or weakness defines it.' },
        { level: 2, title: 'Concept', content: 'A verdict weighs independent lens scores and names specifics.' },
        { level: 3, title: 'Specific clue', content: 'Strong on timing, rhythm, motion, character; figures and structure marked down.' },
        { level: 4, title: 'Guided solution', content: 'Choose the verdict that keeps the strengths and names both weaknesses.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Nightclub verdict signed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'A verdict that buries or inflates the truth leaves the couple unable to trust or act on it.',
        },
        {
          type: 'severity',
          delta: 1,
          reason: 'An indefensible certification verdict is the kind of call that gets a judge reviewed.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'dance.nightclub', label: 'Judging the Nightclub' },
      ],
      successFeedback: 'Strengths kept, both weaknesses named, verdict signed. A Nightclub certification judgement.',
      failureFeedback: 'A defensible verdict combines the lenses honestly — no single strength or weakness defines the Nightclub.',
    },
  ],
  reflectionPrompt: 'Across the Nightclub module, which trap do you think catches new judges more — upper-body sway, or drifting into travel?',
  rewards: [{ type: 'xp', amount: 25, label: 'Nightclub certification passed' }],
};
