import { MissionDefinition } from '@academy/content-model';

/** Street module boss — certify a full Street solo across every lens. */
export const judgeStreet009BossCertifyStreet: MissionDefinition = {
  id: 'judge-street-009-boss-certify-street',
  campaignId: 'judge-street',
  title: 'Boss: Certify the Street Solo',
  summary:
    'A certification-style Street assessment. Confirm the style, score every lens, and deliver a verdict you can sign.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply all six lenses to a Street solo under assessment',
    'Weigh a mixed performance into one verdict',
    'Defend a Street placement on the criteria',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Your Street certification rehearsal. One solo, every lens, a signed verdict.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Confirm the style and check it fits the song, watch each lens, and combine honestly. Mind the traps: a whole-body wobble where isolation should be clean, and styling that drifts from the track.',
    },
  ],
  contextArtefacts: [
    {
      id: 'certification-street',
      type: 'message',
      title: 'The solo on the floor',
      content:
        'Claimed style: locking, to a bright up-funk track. Observed: points and freezes landing precisely on the accents (timing); strong groove (rhythm); clean upper/lower isolation and control (motion); committed, bright locking attitude that fit the song (character); rich levels and good facing (spatial); correct locking vocabulary but one pass of "pops" thrown in that stayed soft and mushy with no real contract-release (figures marked).',
    },
  ],
  challenges: [
    {
      id: 'jst-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Confirm and Frame',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'street'],
      storyContext: 'Before scoring, confirm the style and check it against the song.',
      prompt: 'Is this locking, does it fit the song, and what should you therefore expect?',
      options: [
        {
          id: 'a',
          label: 'No — one soft pop means it cannot be locking.',
          isCorrect: false,
          feedback:
            'A soft pop lowers one lens; it does not un-make the style. The points, freezes and up-funk feel confirm locking.',
        },
        {
          id: 'b',
          label: 'Yes, but judge it as popping since there were pops in it.',
          isCorrect: false,
          feedback:
            'A single thrown-in pass does not make it popping; the routine is locking, and the soft pop is a figure fault within it.',
        },
        {
          id: 'c',
          label: 'Cannot tell — the style is impossible to name.',
          isCorrect: false,
          feedback:
            'The points, freezes and bright up-funk feel clearly name locking.',
        },
        {
          id: 'd',
          label: 'Yes — points and freezes with a bright up-funk feel confirm locking, and it fits the up-funk track, so expect committed locking attitude and crisp freezes throughout.',
          isCorrect: true,
          feedback:
            'Correct. Confirmed as locking that fits the song, you hold it to locking’s expectations across all six lenses.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What style is it, and does it match the track?' },
        { level: 2, title: 'Concept', content: 'Confirm the style, check styling-to-song, then hold it to expectations.' },
        { level: 3, title: 'Specific clue', content: 'Points + freezes + up-funk = locking, fitting the up-funk track.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Yes — locking, fits the track."' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Style framed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Framing the style wrongly would misapply expectations across the scorecard.',
        },
      ],
      helpLinks: [{ topicId: 'dance.street', label: 'Judging Street Styles' }],
      successFeedback: 'Confirmed and framed as locking that fits the song. The lenses carry the right expectations.',
      failureFeedback: 'Points and freezes with a bright up-funk feel confirm locking, and it fits the up-funk track.',
    },
    {
      id: 'jst-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Place the Weakness',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'street'],
      storyContext: 'The one shortfall was a pass of "pops" thrown in that stayed soft and mushy, with no real contract-release.',
      prompt: 'Where does this belong?',
      options: [
        {
          id: 'a',
          label: 'On timing — a soft pop means they were off the beat.',
          isCorrect: false,
          feedback:
            'The timing was clean; a lost snap is not being off the beat.',
        },
        {
          id: 'b',
          label: 'On signature figures — a pop thrown without its sharp contract-release is a figure executed without its defining quality.',
          isCorrect: true,
          feedback:
            'Correct. The figure’s flawed execution is the signature-figures lens; timing, motion and character stay strong.',
        },
        {
          id: 'c',
          label: 'On character — a soft pop just looks less committed.',
          isCorrect: false,
          feedback:
            'The character and attitude were strong; the specific fault is a figure that lost its defining quality.',
        },
        {
          id: 'd',
          label: 'On spatial structure — a soft pop means they misused the space.',
          isCorrect: false,
          feedback:
            'The levels and facing were good; the fault is the figure’s execution, not the use of space.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which lens judges how a specific figure is executed?' },
        { level: 2, title: 'Concept', content: 'A flawed figure is the signature-figures lens.' },
        { level: 3, title: 'Specific clue', content: 'Do not put it on timing or space — those were fine.' },
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
      successFeedback: 'Soft pop to signature figures. Timing, motion and character stay strong.',
      failureFeedback: 'A figure executed without its defining quality is a signature-figures fault, not timing or space.',
    },
    {
      id: 'jst-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign the Verdict',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'street', 'process'],
      storyContext: 'Two final verdicts are drafted for this Street solo. Sign the defensible one.',
      prompt: 'Which verdict do you sign?',
      options: [
        {
          id: 'a',
          label:
            'Verdict A: “A strong locking solo — points and freezes on the accents, deep groove, clean isolation and control, committed style-appropriate attitude and rich space use; held back on signature figures for a pass of soft, mushy pops with no real contract-release.”',
          isCorrect: true,
          feedback:
            'Right. Independent lens scores combined honestly, with the one real weakness named on its lens.',
        },
        {
          id: 'b',
          label:
            'Verdict B: “One soft pop, so a low score overall — a solo with any mushy move is weak.”',
          isCorrect: false,
          feedback:
            'One soft figure lowers one lens; it does not erase precise timing, clean isolation and committed character.',
        },
        {
          id: 'c',
          label:
            'Verdict C: “The groove and isolation were superb, so top marks everywhere.”',
          isCorrect: false,
          feedback:
            'Strong motion does not lift the figures lens. Top-marks-everywhere ignores the soft pops you saw.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Combine the lenses honestly — one soft figure should not define the whole.' },
        { level: 2, title: 'Concept', content: 'A verdict weighs independent lens scores and names specifics.' },
        { level: 3, title: 'Specific clue', content: 'Strong on most lenses; signature figures marked down.' },
        { level: 4, title: 'Guided solution', content: 'Choose the verdict that keeps the strengths and names the soft pops.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Street verdict signed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'A verdict that buries or inflates the truth leaves the performer unable to trust or act on it.',
        },
        {
          type: 'severity',
          delta: 1,
          reason: 'An indefensible certification verdict is the kind of call that gets a judge reviewed.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'dance.street', label: 'Judging Street Styles' },
      ],
      successFeedback: 'Strengths kept, the soft pops named, verdict signed. A Street certification judgement.',
      failureFeedback: 'A defensible verdict keeps the strengths and names the one weakness — nothing defines the whole.',
    },
  ],
  reflectionPrompt: 'Across the Street module, which was harder to judge: clean isolation and control, or whether the styling truly fit the song?',
  rewards: [{ type: 'xp', amount: 25, label: 'Street certification passed' }],
};
