import { MissionDefinition } from '@academy/content-model';

/** Stage module boss — certify a full Stage number across every lens. */
export const judgeStage009BossCertifyStage: MissionDefinition = {
  id: 'judge-stage-009-boss-certify-stage',
  campaignId: 'judge-stage',
  title: 'Boss: Certify the Stage Number',
  summary:
    'A certification-style Stage assessment. Confirm the era, score every lens, and deliver a verdict you can sign.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply all six lenses to a Stage number under assessment',
    'Weigh a mixed performance into one verdict',
    'Defend a Stage placement on the criteria',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Your Stage certification rehearsal. One number, every lens, a signed verdict.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Confirm the era and check the styling is authentic, watch each lens, and combine honestly. Mind the traps: a big trick thrown out of control, and styling that drifts from the period.',
    },
  ],
  contextArtefacts: [
    {
      id: 'certification-stage',
      type: 'message',
      title: 'The number on the stage',
      content:
        'Billed era: Disco, to driving 1970s four-on-the-floor. Observed: strong theatrical musicality catching the accents (timing); a genuine driving Disco groove (rhythm); authentic cool 1970s Disco character projected to the house (character); rich stage use with good staging (spatial); correct hustle and points; but one big multiple turn was thrown with no spotting and crashed out off balance, staggering to recover (motion marked).',
    },
  ],
  challenges: [
    {
      id: 'jsg-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Confirm and Frame',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'stage'],
      storyContext: 'Before scoring, confirm the era and check the styling against it.',
      prompt: 'Is this Disco, is the styling authentic, and what should you therefore expect?',
      options: [
        {
          id: 'a',
          label: 'No — one crashed turn means it cannot be Disco.',
          isCorrect: false,
          feedback:
            'A crashed turn lowers the motion lens; it does not un-make the era. The hustle, points and driving groove confirm Disco.',
        },
        {
          id: 'b',
          label: 'Yes, but judge it as contemporary since one turn went wrong.',
          isCorrect: false,
          feedback:
            'A single mistimed turn does not change the era; the styling is authentic Disco, and the crashed turn is a motion fault within it.',
        },
        {
          id: 'c',
          label: 'Yes — hustle and points to a driving four-on-the-floor groove with cool 1970s character confirm authentic Disco, so expect that era’s feel and projection throughout.',
          isCorrect: true,
          feedback:
            'Correct. Confirmed as authentic Disco, you hold it to that era’s expectations across all six lenses.',
        },
        {
          id: 'd',
          label: 'Cannot tell — the era is impossible to name.',
          isCorrect: false,
          feedback:
            'The hustle, points and driving 1970s groove clearly name authentic Disco.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What era is it, and is the styling authentic?' },
        { level: 2, title: 'Concept', content: 'Confirm the era, check authenticity, then hold it to expectations.' },
        { level: 3, title: 'Specific clue', content: 'Hustle + points + four-on-the-floor + cool character = authentic Disco.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Yes — authentic Disco."' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Era framed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Framing the era wrongly would misapply expectations across the scorecard.',
        },
      ],
      helpLinks: [{ topicId: 'dance.stage', label: 'Judging Stage and Era Styles' }],
      successFeedback: 'Confirmed and framed as authentic Disco. The lenses carry the right expectations.',
      failureFeedback: 'Hustle and points to a driving four-on-the-floor groove with cool 1970s character confirm authentic Disco.',
    },
    {
      id: 'jsg-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Place the Weakness',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'stage'],
      storyContext: 'The one shortfall was a big multiple turn thrown with no spotting that crashed out off balance and staggered to recover.',
      prompt: 'Where does this belong?',
      options: [
        {
          id: 'a',
          label: 'On motion — a turn thrown with no spotting that crashes out off balance is a failure of technical control, which is the motion lens.',
          isCorrect: true,
          feedback:
            'Correct. The crashed turn is a motion (technical control) fault; timing, rhythm, character and staging stay strong.',
        },
        {
          id: 'b',
          label: 'On character — a crashed turn just looks less confident.',
          isCorrect: false,
          feedback:
            'The character and projection were strong; the specific fault is a technical loss of control — the motion lens.',
        },
        {
          id: 'c',
          label: 'On era authenticity — a crashed turn means the styling was wrong.',
          isCorrect: false,
          feedback:
            'The styling was authentic Disco; the fault is the technical control of one turn, not the era.',
        },
        {
          id: 'd',
          label: 'On timing — a crashed turn means they lost the count.',
          isCorrect: false,
          feedback:
            'The timing was strong; the crash was a loss of spotting and control, not being off the beat.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which lens judges the technical control of a trick?' },
        { level: 2, title: 'Concept', content: 'A crashed, uncontrolled turn is a motion fault.' },
        { level: 3, title: 'Specific clue', content: 'Do not put it on era or timing — those were fine.' },
        { level: 4, title: 'Guided solution', content: 'Choose motion.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Weakness placed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Filing the crashed turn under the wrong lens would scramble the scorecard against the panel’s.',
        },
      ],
      helpLinks: [{ topicId: 'judging.criteria', label: 'The Six Judging Lenses' }],
      successFeedback: 'Crashed turn to motion. Timing, rhythm, character and staging stay strong.',
      failureFeedback: 'A turn thrown with no spotting that crashes out off balance is a motion (technical control) fault, not era or timing.',
    },
    {
      id: 'jsg-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign the Verdict',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'stage', 'process'],
      storyContext: 'Two final verdicts are drafted for this Stage number. Sign the defensible one.',
      prompt: 'Which verdict do you sign?',
      options: [
        {
          id: 'a',
          label:
            'Verdict A: “The groove and projection were superb, so top marks everywhere.”',
          isCorrect: false,
          feedback:
            'Strong rhythm and character do not lift the motion lens. Top-marks-everywhere ignores the crashed turn you saw.',
        },
        {
          id: 'b',
          label:
            'Verdict B: “A strong Disco number — sharp musicality, a driving authentic groove, cool projected 1970s character and rich staging, with correct hustle and points; held back on motion for a big multiple turn thrown without spotting that crashed out off balance.”',
          isCorrect: true,
          feedback:
            'Right. Independent lens scores combined honestly, with the one real weakness named on its lens.',
        },
        {
          id: 'c',
          label:
            'Verdict C: “One crashed turn, so a low score overall — a number with any blown trick is weak.”',
          isCorrect: false,
          feedback:
            'One crashed turn lowers the motion lens; it does not erase sharp musicality, an authentic groove and strong staging.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Combine the lenses honestly — one crashed turn should not define the whole.' },
        { level: 2, title: 'Concept', content: 'A verdict weighs independent lens scores and names specifics.' },
        { level: 3, title: 'Specific clue', content: 'Strong on most lenses; motion marked down.' },
        { level: 4, title: 'Guided solution', content: 'Choose the verdict that keeps the strengths and names the crashed turn.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Stage verdict signed' }],
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
        { topicId: 'dance.stage', label: 'Judging Stage and Era Styles' },
      ],
      successFeedback: 'Strengths kept, the crashed turn named, verdict signed. A Stage certification judgement.',
      failureFeedback: 'A defensible verdict keeps the strengths and names the one weakness — nothing defines the whole.',
    },
  ],
  reflectionPrompt: 'Across the Stage module, which was harder to judge: the technical control of jumps, turns and kicks, or the authenticity of the era styling?',
  rewards: [{ type: 'xp', amount: 25, label: 'Stage certification passed' }],
};
