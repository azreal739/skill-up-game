import { MissionDefinition } from '@academy/content-model';

/** Triple Two module boss — certify a full Triple Two across every lens. */
export const judgeTripleTwo009BossCertifyTripleTwo: MissionDefinition = {
  id: 'judge-triple-two-009-boss-certify-triple-two',
  campaignId: 'judge-triple-two',
  title: 'Boss: Certify the Triple Two',
  summary:
    'A certification-style Triple Two assessment. Confirm the dance, score every lens, and deliver a verdict you can sign.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply all six lenses to a Triple Two under assessment',
    'Weigh a mixed performance into one verdict',
    'Defend a Triple Two placement on the criteria',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Your Triple Two certification rehearsal. One routine, every lens, a signed verdict.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Confirm the slow-slow-triple-triple and the curved progression, watch each lens, and combine honestly. Mind the traps: same-way shaping, and stalling the travel.',
    },
  ],
  contextArtefacts: [
    {
      id: 'certification-tt',
      type: 'message',
      title: 'The routine on the floor',
      content:
        'Claimed dance: Triple Two. Observed: clean slow-slow-triple-triple timing; smooth even ball-flat triples; genuine whole-body shape with opposite shaping in the triples (motion); soft romantic character; correct loops but only a single weave (thin figure variety); good curved progression, though it briefly stalled once.',
    },
  ],
  challenges: [
    {
      id: 'jtt-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Confirm and Frame',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'triple-two'],
      storyContext: 'Before scoring, confirm the dance and set your expectations.',
      prompt: 'Is this a Triple Two, and what should you therefore expect?',
      options: [
        {
          id: 'a',
          label: 'No — a thin figure set means it cannot be a Triple Two.',
          isCorrect: false,
          feedback:
            'A thin vocabulary lowers one lens; it does not un-make the dance. The rhythm and shaping confirm a Triple Two.',
        },
        {
          id: 'b',
          label: 'Yes — slow-slow-triple-triple with opposite shaping confirms a Triple Two, so expect curved progressive travel and continuous romantic flow.',
          isCorrect: true,
          feedback:
            'Correct. Confirmed as a Triple Two, you hold it to curved-progression expectations — which makes the brief stall a fault.',
        },
        {
          id: 'c',
          label: 'Yes, but judge it as non-progressive since it stalled once.',
          isCorrect: false,
          feedback:
            'The Triple Two is progressive; a single stall is a fault within it, not a reason to change the expectation.',
        },
        {
          id: 'd',
          label: 'Cannot tell without the music title.',
          isCorrect: false,
          feedback:
            'The rhythm and shaping confirm the dance, not a title.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What confirms a Triple Two, and what does that commit you to expect?' },
        { level: 2, title: 'Concept', content: 'Confirm the dance, then hold it to its expectations.' },
        { level: 3, title: 'Specific clue', content: 'Slow-slow-triple-triple + opposite shaping = Triple Two = curved progressive.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Yes" with curved-progression expectations.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Dance framed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Letting the stall redefine the dance would excuse the very error you are meant to catch.',
        },
      ],
      helpLinks: [{ topicId: 'dance.triple-two', label: 'Judging the Triple Two' }],
      successFeedback: 'Confirmed and framed as a progressive Triple Two. The stall reads as a fault within it.',
      failureFeedback: 'Slow-slow-triple-triple with opposite shaping confirms a progressive Triple Two — the stall is a fault within it.',
    },
    {
      id: 'jtt-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Place the Two Weaknesses',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'triple-two'],
      storyContext:
        'Two things fell short: only a single weave (thin variety), and one brief stall in the travel.',
      prompt: 'Where do these two weaknesses belong?',
      options: [
        {
          id: 'a',
          label: 'Both on motion — the shaping must have caused them.',
          isCorrect: false,
          feedback:
            'Motion (opposite shaping) was a strength here. Neither the thin variety nor the stall is a motion issue.',
        },
        {
          id: 'b',
          label: 'Both on timing — weaknesses always show as being off the count.',
          isCorrect: false,
          feedback:
            'The timing was clean. Figure variety and travel are not timing matters.',
        },
        {
          id: 'c',
          label: 'Thin variety on signature figures; the brief stall on spatial structure.',
          isCorrect: true,
          feedback:
            'Correct. Figure range is the signature-figures lens; a stall in a progressive dance is spatial structure.',
        },
        {
          id: 'd',
          label: 'Thin variety on spatial structure; the stall on signature figures.',
          isCorrect: false,
          feedback:
            'Reversed. Figure range is the figures lens; where the couple travels (or stalls) is spatial structure.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Match each weakness to the lens that scores it.' },
        { level: 2, title: 'Concept', content: 'Figure range = signature figures; travel/stall = spatial structure.' },
        { level: 3, title: 'Specific clue', content: 'Do not put either on motion or timing — those were strong.' },
        { level: 4, title: 'Guided solution', content: 'Choose thin variety → figures, stall → spatial structure.' },
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
      successFeedback: 'Thin variety to figures, stall to spatial structure. Motion and timing stay strong.',
      failureFeedback: 'Figure range is signature figures; a stall in a progressive dance is spatial structure.',
    },
    {
      id: 'jtt-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign the Verdict',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'triple-two', 'process'],
      storyContext: 'Two final verdicts are drafted for this Triple Two. Sign the defensible one.',
      prompt: 'Which verdict do you sign?',
      options: [
        {
          id: 'a',
          label:
            'Verdict A: “A pleasing Triple Two — clean timing and smooth triples, genuine opposite shaping and soft romantic character, with good curved travel; held back on signature figures for a thin, single-weave vocabulary and slightly on spatial structure for one brief stall.”',
          isCorrect: true,
          feedback:
            'Right. Independent lens scores combined honestly, with both real weaknesses named on the correct lenses.',
        },
        {
          id: 'b',
          label:
            'Verdict B: “It stalled once, so the whole routine fails — a Triple Two that stops is no Triple Two.”',
          isCorrect: false,
          feedback:
            'A single stall lowers one lens slightly; it does not erase clean timing, genuine shaping and good travel.',
        },
        {
          id: 'c',
          label:
            'Verdict C: “The shaping was genuine, so top marks everywhere.”',
          isCorrect: false,
          feedback:
            'Strong motion does not lift figures and structure. Top-marks-everywhere ignores the thin vocabulary and the stall.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Combine the lenses honestly — no single strength or weakness defines it.' },
        { level: 2, title: 'Concept', content: 'A verdict weighs independent lens scores and names specifics.' },
        { level: 3, title: 'Specific clue', content: 'Strong on most lenses; figures and structure marked slightly down.' },
        { level: 4, title: 'Guided solution', content: 'Choose the verdict that keeps the strengths and names both weaknesses.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Triple Two verdict signed' }],
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
        { topicId: 'dance.triple-two', label: 'Judging the Triple Two' },
      ],
      successFeedback: 'Strengths kept, both weaknesses named, verdict signed. A Triple Two certification judgement.',
      failureFeedback: 'A defensible verdict keeps the strengths and names the weaknesses in proportion — nothing defines the whole.',
    },
  ],
  reflectionPrompt: 'Across the Triple Two module, which was harder to judge: the opposite shaping, or the curved progression?',
  rewards: [{ type: 'xp', amount: 25, label: 'Triple Two certification passed' }],
};
