import { MissionDefinition } from '@academy/content-model';

/** Polka module boss — certify a full Polka across every lens. */
export const judgePolka009BossCertifyPolka: MissionDefinition = {
  id: 'judge-polka-009-boss-certify-polka',
  campaignId: 'judge-polka',
  title: 'Boss: Certify the Polka',
  summary:
    'A certification-style Polka assessment. Confirm the dance, score every lens, and deliver a verdict you can sign.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply all six lenses to a Polka under assessment',
    'Weigh a mixed performance into one verdict',
    'Defend a Polka placement on the criteria',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Your Polka certification rehearsal. One routine, every lens, a signed verdict.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Confirm the lilt and the drive, watch each lens, and combine honestly. Mind the traps: a flat, pulse-less Polka, and poor floorcraft at speed.',
    },
  ],
  contextArtefacts: [
    {
      id: 'certification-polka',
      type: 'message',
      title: 'The routine on the floor',
      content:
        'Claimed dance: Polka. Observed: clean 1&2 lilt timing; bright light rhythm; genuine up/down pulse with strong forward drive (motion); energetic country character; correct skips and gallops but a flat, feel-less rotating chasse each time (figures marked); good aggressive progression with clean floorcraft.',
    },
  ],
  challenges: [
    {
      id: 'jpk-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Confirm and Frame',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'polka'],
      storyContext: 'Before scoring, confirm the dance and set your expectations.',
      prompt: 'Is this a Polka, and what should you therefore expect?',
      options: [
        {
          id: 'a',
          label: 'No — a flat chasse means it cannot be a Polka.',
          isCorrect: false,
          feedback:
            'A flat chasse lowers one lens; it does not un-make the dance. The lilt, pulse and drive confirm a Polka.',
        },
        {
          id: 'b',
          label: 'Yes — a 1&2 lilt with an up/down pulse and aggressive drive confirms a Polka, so expect bright country character and strong progression with floorcraft.',
          isCorrect: true,
          feedback:
            'Correct. Confirmed as a Polka, you hold it to lilt-and-drive expectations across all six lenses.',
        },
        {
          id: 'c',
          label: 'Yes, but judge it as non-progressive since the figures were contained.',
          isCorrect: false,
          feedback:
            'The Polka is aggressively progressive; applying a non-progressive expectation would misjudge it.',
        },
        {
          id: 'd',
          label: 'Cannot tell without the music tempo.',
          isCorrect: false,
          feedback:
            'The lilt, pulse and drive confirm the dance, not the exact tempo.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What confirms a Polka, and what does that commit you to expect?' },
        { level: 2, title: 'Concept', content: 'Confirm the dance, then hold it to its expectations.' },
        { level: 3, title: 'Specific clue', content: 'Lilt + pulse + drive = Polka = aggressively progressive.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Yes" with lilt/drive expectations.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Dance framed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Framing the dance wrongly would misapply expectations across the scorecard.',
        },
      ],
      helpLinks: [{ topicId: 'dance.polka', label: 'Judging the Polka' }],
      successFeedback: 'Confirmed and framed as an aggressively progressive Polka. The lenses carry the right expectations.',
      failureFeedback: 'A 1&2 lilt with an up/down pulse and drive confirms an aggressively progressive Polka.',
    },
    {
      id: 'jpk-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Place the Weakness',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'polka'],
      storyContext: 'The one shortfall was a rotating chasse that went flat and feel-less each time.',
      prompt: 'Where does this belong?',
      options: [
        {
          id: 'a',
          label: 'On spatial structure — a flat chasse means they stopped travelling.',
          isCorrect: false,
          feedback:
            'The progression and floorcraft were good; the fault is the figure’s quality, not the travel.',
        },
        {
          id: 'b',
          label: 'On character — a flat chasse just looks less joyful.',
          isCorrect: false,
          feedback:
            'The character was correctly energetic; the specific fault is a figure that lost its lilt.',
        },
        {
          id: 'c',
          label: 'On timing — a flat chasse means they were off the beat.',
          isCorrect: false,
          feedback:
            'The timing was clean; a flat feel is not being off the beat.',
        },
        {
          id: 'd',
          label: 'On signature figures — a rotating chasse that goes flat and feel-less is a figure executed without its Polka lilt and drive.',
          isCorrect: true,
          feedback:
            'Correct. The figure’s flawed execution is the signature-figures lens; motion, timing and character stay strong.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which lens judges how a specific figure is executed?' },
        { level: 2, title: 'Concept', content: 'A flawed figure is the signature-figures lens.' },
        { level: 3, title: 'Specific clue', content: 'Do not put it on structure or timing — those were fine.' },
        { level: 4, title: 'Guided solution', content: 'Choose signature figures.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Weakness placed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Filing the flawed figure under the wrong lens would scramble the scorecard against the panel’s.',
        },
      ],
      helpLinks: [{ topicId: 'judging.criteria', label: 'The Six Judging Lenses' }],
      successFeedback: 'Flat chasse to signature figures. Motion, timing and character stay strong.',
      failureFeedback: 'A figure executed without its lilt and drive is a signature-figures fault, not timing or structure.',
    },
    {
      id: 'jpk-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign the Verdict',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'polka', 'process'],
      storyContext: 'Two final verdicts are drafted for this Polka. Sign the defensible one.',
      prompt: 'Which verdict do you sign?',
      options: [
        {
          id: 'a',
          label:
            'Verdict A: “A strong Polka — clean 1&2 lilt and bright rhythm, a genuine pulse and powerful drive, energetic country character and clean floorcraft; held back on signature figures for a rotating chasse that went flat and feel-less.”',
          isCorrect: true,
          feedback:
            'Right. Independent lens scores combined honestly, with the one real weakness named on its lens.',
        },
        {
          id: 'b',
          label:
            'Verdict B: “One flat chasse, so a low score overall — a Polka with any dead figure is weak.”',
          isCorrect: false,
          feedback:
            'One flat figure lowers one lens; it does not erase clean timing, genuine pulse and strong drive.',
        },
        {
          id: 'c',
          label:
            'Verdict C: “The drive and pulse were superb, so top marks everywhere.”',
          isCorrect: false,
          feedback:
            'Strong motion does not lift the figures lens. Top-marks-everywhere ignores the flat chasse you saw.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Combine the lenses honestly — one flat figure should not define the whole.' },
        { level: 2, title: 'Concept', content: 'A verdict weighs independent lens scores and names specifics.' },
        { level: 3, title: 'Specific clue', content: 'Strong on most lenses; signature figures marked down.' },
        { level: 4, title: 'Guided solution', content: 'Choose the verdict that keeps the strengths and names the flat chasse.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Polka verdict signed' }],
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
        { topicId: 'dance.polka', label: 'Judging the Polka' },
      ],
      successFeedback: 'Strengths kept, the flat chasse named, verdict signed. A Polka certification judgement.',
      failureFeedback: 'A defensible verdict keeps the strengths and names the one weakness — nothing defines the whole.',
    },
  ],
  reflectionPrompt: 'Across the Polka module, which was harder to judge: the up/down pulse, or floorcraft under aggressive drive?',
  rewards: [{ type: 'xp', amount: 25, label: 'Polka certification passed' }],
};
