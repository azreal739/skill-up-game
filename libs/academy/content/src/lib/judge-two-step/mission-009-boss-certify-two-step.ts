import { MissionDefinition } from '@academy/content-model';

/** Two Step module boss — certify a full Two Step across every lens. */
export const judgeTwoStep009BossCertifyTwoStep: MissionDefinition = {
  id: 'judge-two-step-009-boss-certify-two-step',
  campaignId: 'judge-two-step',
  title: 'Boss: Certify the Two Step',
  summary:
    'A certification-style Two Step assessment. Confirm the dance, score every lens, and deliver a verdict you can sign.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply all six lenses to a Two Step under assessment',
    'Weigh a mixed performance into one verdict',
    'Defend a Two Step placement on the criteria',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Your Two Step certification rehearsal. One routine, every lens, a signed verdict.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Confirm the QQSS and the glide, watch each lens, and combine honestly. Mind the traps: a bouncy Two Step that has borrowed swing’s pulse, and a drive that stalls instead of progressing.',
    },
  ],
  contextArtefacts: [
    {
      id: 'certification-two-step',
      type: 'message',
      title: 'The routine on the floor',
      content:
        'Claimed dance: Two Step. Observed: clean quick-quick-slow-slow timing; smooth, even rhythm; a genuine level gliding drive with no bounce (motion); cool, effortless character; correct promenades and underarm turns but one underarm turn that stalled and broke the glide, worked on the spot instead of travelling (figures marked); strong, smooth progression down the line with good floorcraft.',
    },
  ],
  challenges: [
    {
      id: 'jts-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Confirm and Frame',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'two-step'],
      storyContext: 'Before scoring, confirm the dance and set your expectations.',
      prompt: 'Is this a Two Step, and what should you therefore expect?',
      options: [
        {
          id: 'a',
          label: 'No — one stalled turn means it cannot be a Two Step.',
          isCorrect: false,
          feedback:
            'A stalled turn lowers one lens; it does not un-make the dance. The QQSS and gliding drive confirm a Two Step.',
        },
        {
          id: 'b',
          label: 'Yes — a quick-quick-slow-slow with a smooth level glide confirms a Two Step, so expect cool effortless character and strong progression down the line.',
          isCorrect: true,
          feedback:
            'Correct. Confirmed as a Two Step, you hold it to glide-and-travel expectations across all six lenses.',
        },
        {
          id: 'c',
          label: 'Yes, but judge it as non-progressive since one figure stayed on the spot.',
          isCorrect: false,
          feedback:
            'The Two Step is strongly progressive; applying a non-progressive expectation would misjudge it.',
        },
        {
          id: 'd',
          label: 'No — without triples it must be an incomplete Triple Two.',
          isCorrect: false,
          feedback:
            'No triples is exactly right for a Two Step; it is not a broken Triple Two.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What confirms a Two Step, and what does that commit you to expect?' },
        { level: 2, title: 'Concept', content: 'Confirm the dance, then hold it to its expectations.' },
        { level: 3, title: 'Specific clue', content: 'QQSS + smooth glide = Two Step = strongly progressive.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Yes" with glide/travel expectations.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Dance framed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Framing the dance wrongly would misapply expectations across the scorecard.',
        },
      ],
      helpLinks: [{ topicId: 'dance.two-step', label: 'Judging the Two Step' }],
      successFeedback: 'Confirmed and framed as a strongly progressive Two Step. The lenses carry the right expectations.',
      failureFeedback: 'A quick-quick-slow-slow with a smooth level glide confirms a strongly progressive Two Step.',
    },
    {
      id: 'jts-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Place the Weakness',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'two-step'],
      storyContext: 'The one shortfall was an underarm turn that stalled and broke the glide, worked on the spot instead of travelling.',
      prompt: 'Where does this belong?',
      options: [
        {
          id: 'a',
          label: 'On timing — a stalled turn means they were off the beat.',
          isCorrect: false,
          feedback:
            'The timing was clean; a stalled glide is not being off the beat.',
        },
        {
          id: 'b',
          label: 'On character — a stalled turn just looks less cool.',
          isCorrect: false,
          feedback:
            'The character was correctly cool; the specific fault is a figure that lost its glide and travel.',
        },
        {
          id: 'c',
          label: 'On signature figures — an underarm turn that stalls and breaks the glide is a figure executed without its Two Step travel and smoothness.',
          isCorrect: true,
          feedback:
            'Correct. The figure’s flawed execution is the signature-figures lens; timing, motion and overall structure stay strong.',
        },
        {
          id: 'd',
          label: 'On spatial structure — a stalled turn means they stopped travelling overall.',
          isCorrect: false,
          feedback:
            'The overall progression was strong with good floorcraft; the fault is one figure’s quality, not the travel as a whole.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which lens judges how a specific figure is executed?' },
        { level: 2, title: 'Concept', content: 'A flawed figure is the signature-figures lens.' },
        { level: 3, title: 'Specific clue', content: 'Do not put it on overall structure or timing — those were fine.' },
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
      successFeedback: 'Stalled turn to signature figures. Timing, motion and structure stay strong.',
      failureFeedback: 'A figure executed without its glide and travel is a signature-figures fault, not timing or overall structure.',
    },
    {
      id: 'jts-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign the Verdict',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'two-step', 'process'],
      storyContext: 'Two final verdicts are drafted for this Two Step. Sign the defensible one.',
      prompt: 'Which verdict do you sign?',
      options: [
        {
          id: 'a',
          label:
            'Verdict A: “A strong Two Step — clean quick-quick-slow-slow and smooth rhythm, a genuine level glide, cool effortless character and strong progression with good floorcraft; held back on signature figures for an underarm turn that stalled and broke the glide.”',
          isCorrect: true,
          feedback:
            'Right. Independent lens scores combined honestly, with the one real weakness named on its lens.',
        },
        {
          id: 'b',
          label:
            'Verdict B: “One stalled turn, so a low score overall — a Two Step with any stuck figure is weak.”',
          isCorrect: false,
          feedback:
            'One stalled figure lowers one lens; it does not erase clean timing, a genuine glide and strong progression.',
        },
        {
          id: 'c',
          label:
            'Verdict C: “The glide and travel were superb, so top marks everywhere.”',
          isCorrect: false,
          feedback:
            'Strong motion and travel do not lift the figures lens. Top-marks-everywhere ignores the stalled turn you saw.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Combine the lenses honestly — one stalled figure should not define the whole.' },
        { level: 2, title: 'Concept', content: 'A verdict weighs independent lens scores and names specifics.' },
        { level: 3, title: 'Specific clue', content: 'Strong on most lenses; signature figures marked down.' },
        { level: 4, title: 'Guided solution', content: 'Choose the verdict that keeps the strengths and names the stalled turn.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Two Step verdict signed' }],
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
        { topicId: 'dance.two-step', label: 'Judging the Two Step' },
      ],
      successFeedback: 'Strengths kept, the stalled turn named, verdict signed. A Two Step certification judgement.',
      failureFeedback: 'A defensible verdict keeps the strengths and names the one weakness — nothing defines the whole.',
    },
  ],
  reflectionPrompt: 'Across the Two Step module, which was harder to judge: the smooth no-bounce glide, or floorcraft while driving down a busy line?',
  rewards: [{ type: 'xp', amount: 25, label: 'Two Step certification passed' }],
};
