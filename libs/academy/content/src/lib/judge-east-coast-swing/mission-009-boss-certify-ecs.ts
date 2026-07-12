import { MissionDefinition } from '@academy/content-model';

/** East Coast Swing module boss — certify a full East Coast Swing across every lens. */
export const judgeEcs009BossCertifyEcs: MissionDefinition = {
  id: 'judge-ecs-009-boss-certify-ecs',
  campaignId: 'judge-east-coast-swing',
  title: 'Boss: Certify the East Coast Swing',
  summary:
    'A certification-style East Coast Swing assessment. Confirm the dance, score every lens, and deliver a verdict you can sign.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply all six lenses to an East Coast Swing under assessment',
    'Weigh a mixed performance into one verdict',
    'Defend an East Coast Swing placement on the criteria',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Your East Coast Swing certification rehearsal. One routine, every lens, a signed verdict.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Confirm the triples, rock step and bounce, watch each lens, and combine honestly. Mind the traps: a stiff, bounce-less swing, and a swing that drifts off its circular spot.',
    },
  ],
  contextArtefacts: [
    {
      id: 'certification-ecs',
      type: 'message',
      title: 'The routine on the floor',
      content:
        'Claimed dance: East Coast Swing. Observed: clean triple-triple-rock timing; springy triples with the even-beat accent (rhythm); genuine grounded down-up bounce (motion); lively, playful character; correct passes and underarm rotations but one underarm rotation that went stiff and slack, walking around instead of swinging (figures marked); held its circular spot cleanly with good floorcraft.',
    },
  ],
  challenges: [
    {
      id: 'jec-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Confirm and Frame',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'east-coast-swing'],
      storyContext: 'Before scoring, confirm the dance and set your expectations.',
      prompt: 'Is this an East Coast Swing, and what should you therefore expect?',
      options: [
        {
          id: 'a',
          label: 'No — one stiff rotation means it cannot be an East Coast Swing.',
          isCorrect: false,
          feedback:
            'A stiff rotation lowers one lens; it does not un-make the dance. The triples, rock step and bounce confirm a swing.',
        },
        {
          id: 'b',
          label: 'Yes — triple-triple-rock with a grounded bounce confirms an East Coast Swing, so expect lively playful character and a circular, non-progressive spot.',
          isCorrect: true,
          feedback:
            'Correct. Confirmed as a swing, you hold it to bounce-and-circle expectations across all six lenses.',
        },
        {
          id: 'c',
          label: 'Yes, but judge it as progressive since it covered some ground.',
          isCorrect: false,
          feedback:
            'The East Coast Swing is circular and non-progressive; applying a progressive expectation would misjudge it.',
        },
        {
          id: 'd',
          label: 'Cannot tell without the music tempo.',
          isCorrect: false,
          feedback:
            'The triples, rock step and bounce confirm the dance; tempo only sets which gear (single/triple/double) to expect.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What confirms an East Coast Swing, and what does that commit you to expect?' },
        { level: 2, title: 'Concept', content: 'Confirm the dance, then hold it to its expectations.' },
        { level: 3, title: 'Specific clue', content: 'Triples + rock + bounce = swing = circular, non-progressive.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Yes" with bounce/circle expectations.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Dance framed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Framing the dance wrongly would misapply expectations across the scorecard.',
        },
      ],
      helpLinks: [{ topicId: 'dance.east-coast-swing', label: 'Judging the East Coast Swing' }],
      successFeedback: 'Confirmed and framed as a circular, non-progressive East Coast Swing. The lenses carry the right expectations.',
      failureFeedback: 'Triple-triple-rock with a grounded bounce confirms a circular, non-progressive East Coast Swing.',
    },
    {
      id: 'jec-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Place the Weakness',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'east-coast-swing'],
      storyContext: 'The one shortfall was an underarm rotation that went stiff and slack, walking around instead of swinging.',
      prompt: 'Where does this belong?',
      options: [
        {
          id: 'a',
          label: 'On spatial structure — a stiff rotation means they left their spot.',
          isCorrect: false,
          feedback:
            'The couple held their circular spot with good floorcraft; the fault is the figure’s quality, not the structure.',
        },
        {
          id: 'b',
          label: 'On timing — a stiff rotation means they were off the beat.',
          isCorrect: false,
          feedback:
            'The timing was clean; a stiff, slack feel is not being off the beat.',
        },
        {
          id: 'c',
          label: 'On signature figures — an underarm rotation that goes stiff and slack is a figure executed without its swing bounce and connection.',
          isCorrect: true,
          feedback:
            'Correct. The figure’s flawed execution is the signature-figures lens; timing, motion and character stay strong.',
        },
        {
          id: 'd',
          label: 'On character — a stiff rotation just looks less joyful.',
          isCorrect: false,
          feedback:
            'The character was correctly lively; the specific fault is a figure that lost its bounce and connection.',
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
      successFeedback: 'Stiff rotation to signature figures. Timing, motion and character stay strong.',
      failureFeedback: 'A figure executed without its bounce and connection is a signature-figures fault, not timing or structure.',
    },
    {
      id: 'jec-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign the Verdict',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'east-coast-swing', 'process'],
      storyContext: 'Two final verdicts are drafted for this East Coast Swing. Sign the defensible one.',
      prompt: 'Which verdict do you sign?',
      options: [
        {
          id: 'a',
          label:
            'Verdict A: “A strong East Coast Swing — clean triple-triple-rock and springy rhythm, a genuine grounded bounce, lively playful character and a well-held circular spot; held back on signature figures for an underarm rotation that went stiff and slack.”',
          isCorrect: true,
          feedback:
            'Right. Independent lens scores combined honestly, with the one real weakness named on its lens.',
        },
        {
          id: 'b',
          label:
            'Verdict B: “One stiff rotation, so a low score overall — a swing with any dead figure is weak.”',
          isCorrect: false,
          feedback:
            'One stiff figure lowers one lens; it does not erase clean timing, a genuine bounce and a well-held spot.',
        },
        {
          id: 'c',
          label:
            'Verdict C: “The bounce and energy were superb, so top marks everywhere.”',
          isCorrect: false,
          feedback:
            'Strong motion does not lift the figures lens. Top-marks-everywhere ignores the stiff rotation you saw.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Combine the lenses honestly — one stiff figure should not define the whole.' },
        { level: 2, title: 'Concept', content: 'A verdict weighs independent lens scores and names specifics.' },
        { level: 3, title: 'Specific clue', content: 'Strong on most lenses; signature figures marked down.' },
        { level: 4, title: 'Guided solution', content: 'Choose the verdict that keeps the strengths and names the stiff rotation.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Swing verdict signed' }],
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
        { topicId: 'dance.east-coast-swing', label: 'Judging the East Coast Swing' },
      ],
      successFeedback: 'Strengths kept, the stiff rotation named, verdict signed. An East Coast Swing certification judgement.',
      failureFeedback: 'A defensible verdict keeps the strengths and names the one weakness — nothing defines the whole.',
    },
  ],
  reflectionPrompt: 'Across the East Coast Swing module, which was harder to judge: the grounded bounce, or holding the circular spot on a crowded floor?',
  rewards: [{ type: 'xp', amount: 25, label: 'East Coast Swing certification passed' }],
};
