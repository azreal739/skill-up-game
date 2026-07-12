import { MissionDefinition } from '@academy/content-model';

/** WCS module boss — certify a full West Coast Swing across every lens. */
export const judgeWcs009BossCertifyWcs: MissionDefinition = {
  id: 'judge-wcs-009-boss-certify-wcs',
  campaignId: 'judge-wcs',
  title: 'Boss: Certify the West Coast Swing',
  summary:
    'A certification-style WCS assessment. Confirm the dance, score every lens, and deliver a verdict you can sign.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply all six lenses to a WCS under assessment',
    'Weigh a mixed performance into one verdict',
    'Defend a WCS placement on the criteria',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Your West Coast Swing certification rehearsal. One routine, every lens, a signed verdict.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Confirm the slot and anchor, watch each lens, and combine honestly. Mind the traps: a rushed anchor, and a whip that abandons the slot.',
    },
  ],
  contextArtefacts: [
    {
      id: 'certification-wcs',
      type: 'message',
      title: 'The routine on the floor',
      content:
        'Claimed dance: West Coast Swing. Observed: clean back-beat timing across six- and eight-count patterns; clean walks and triples; a genuine anchor settle with real extension and compression (motion); cool conversational character; correct pushes and passes, but one whip travelled off the slot and never re-established the lane; the slot otherwise held.',
    },
  ],
  challenges: [
    {
      id: 'jws-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Confirm and Frame',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'west-coast-swing'],
      storyContext: 'Before scoring, confirm the dance and set your expectations.',
      prompt: 'Is this a West Coast Swing, and what should you therefore expect?',
      options: [
        {
          id: 'a',
          label: 'Yes — a held slot with an anchor and push/pass/whip confirms WCS, so expect slot structure, anchored patterns and extension/compression.',
          isCorrect: true,
          feedback:
            'Correct. Confirmed as WCS, you hold it to slot-and-anchor expectations — which makes the wandering whip a real fault.',
        },
        {
          id: 'b',
          label: 'No — because one whip left the slot, it cannot be a West Coast Swing.',
          isCorrect: false,
          feedback:
            'One flawed whip is a fault within a WCS, not evidence of a different dance. The slot, anchor and figures confirm it.',
        },
        {
          id: 'c',
          label: 'Yes, but judge it as a non-progressive geometric dance since it stayed mostly in place.',
          isCorrect: false,
          feedback:
            'WCS is a slot dance, not Nightclub-style geometry; applying the wrong structure would misjudge it.',
        },
        {
          id: 'd',
          label: 'Cannot tell without the music genre.',
          isCorrect: false,
          feedback:
            'WCS is danced to many genres; the slot, anchor and figures confirm the dance, not the song.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What confirms a WCS, and what does that commit you to expect?' },
        { level: 2, title: 'Concept', content: 'Confirm the dance, then hold it to slot-and-anchor expectations.' },
        { level: 3, title: 'Specific clue', content: 'Slot + anchor + push/pass/whip = WCS.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Yes" with slot/anchor expectations.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Dance framed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Letting one flawed whip redefine the dance would excuse the very error you are meant to catch.',
        },
      ],
      helpLinks: [{ topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' }],
      successFeedback: 'Confirmed and framed as a WCS. Now the wandering whip reads as a fault within it.',
      failureFeedback: 'Slot, anchor and push/pass/whip confirm a WCS — the wandering whip is a fault within it.',
    },
    {
      id: 'jws-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Place the Weakness',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'west-coast-swing'],
      storyContext:
        'The one clear fault was the whip that travelled off the slot and never re-established the lane.',
      prompt: 'Where does this fault belong, and does it touch more than one lens?',
      options: [
        {
          id: 'a',
          label: 'Only on timing — leaving the slot must mean they were off the count.',
          isCorrect: false,
          feedback:
            'They can leave the slot perfectly on time. This is not a timing fault.',
        },
        {
          id: 'b',
          label: 'Only on character — a wandering whip just looks a bit off.',
          isCorrect: false,
          feedback:
            'It is not a mood issue. A slot-abandoning whip is about the figure and the structure, not personality.',
        },
        {
          id: 'c',
          label: 'On signature figures (a flawed whip) and on spatial structure (the slot briefly abandoned) — one fault touching two lenses.',
          isCorrect: true,
          feedback:
            'Correct. A whip that abandons the slot is both a flawed figure and a structural lapse; note it on both, in proportion.',
        },
        {
          id: 'd',
          label: 'Only on motion — the anchor was involved.',
          isCorrect: false,
          feedback:
            'The anchor and extension/compression were actually strong here; the fault is the figure and the slot, not motion.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Can one fault legitimately touch two lenses?' },
        { level: 2, title: 'Concept', content: 'A slot-abandoning whip is a flawed figure and a structural lapse.' },
        { level: 3, title: 'Specific clue', content: 'Do not put it on motion — the anchor was strong.' },
        { level: 4, title: 'Guided solution', content: 'Choose signature figures AND spatial structure.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Weakness placed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Filing the fault under the wrong lens would scramble the scorecard against the panel’s.',
        },
      ],
      helpLinks: [{ topicId: 'judging.criteria', label: 'The Six Judging Lenses' }],
      successFeedback: 'One fault, two lenses — figures and structure. Motion and timing stay strong.',
      failureFeedback: 'A slot-abandoning whip is both a flawed figure and a structural lapse — note it on both, in proportion.',
    },
    {
      id: 'jws-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign the Verdict',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'west-coast-swing', 'process'],
      storyContext: 'Two final verdicts are drafted for this West Coast Swing. Sign the defensible one.',
      prompt: 'Which verdict do you sign?',
      options: [
        {
          id: 'a',
          label:
            'Verdict A: “A strong West Coast Swing — clean back-beat timing and triples, a genuine anchor with real extension and compression, cool character and a held slot; held back slightly on signature figures and spatial structure for one whip that abandoned the slot.”',
          isCorrect: true,
          feedback:
            'Right. Independent lens scores combined honestly, with the one real fault named on the two lenses it touches, in proportion.',
        },
        {
          id: 'b',
          label:
            'Verdict B: “One whip left the slot, so the whole routine fails — a WCS that leaves the slot is no WCS.”',
          isCorrect: false,
          feedback:
            'One flawed whip lowers two lenses slightly; it does not erase clean timing, a genuine anchor and correct figures.',
        },
        {
          id: 'c',
          label:
            'Verdict C: “The anchor and connection were superb, so top marks everywhere.”',
          isCorrect: false,
          feedback:
            'Strong motion does not lift figures and structure. Top-marks-everywhere ignores the wandering whip you saw.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Combine the lenses honestly — one fault should not define the whole.' },
        { level: 2, title: 'Concept', content: 'A verdict weighs independent lens scores and names specifics in proportion.' },
        { level: 3, title: 'Specific clue', content: 'Strong across most lenses; figures and structure slightly down for the whip.' },
        { level: 4, title: 'Guided solution', content: 'Choose the verdict that keeps the strengths and names the whip fault in proportion.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'WCS verdict signed' }],
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
        { topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' },
      ],
      successFeedback: 'Strengths kept, the whip fault named in proportion, verdict signed. A WCS certification judgement.',
      failureFeedback: 'A defensible verdict keeps the strengths and names the one fault in proportion — it does not define the whole.',
    },
  ],
  reflectionPrompt: 'Across the WCS module, which was harder to judge: the anchor settle, or whether the slot was truly abandoned?',
  rewards: [{ type: 'xp', amount: 25, label: 'WCS certification passed' }],
};
