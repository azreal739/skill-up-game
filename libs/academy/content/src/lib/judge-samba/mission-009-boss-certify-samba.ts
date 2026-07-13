import { MissionDefinition } from '@academy/content-model';

/** Samba module boss — certify a full Samba across every lens. */
export const judgeSamba009BossCertifySamba: MissionDefinition = {
  id: 'judge-samba-009-boss-certify-samba',
  campaignId: 'judge-samba',
  title: 'Boss: Certify the Samba',
  summary:
    'A certification-style Samba assessment. Confirm the dance, score every lens, and deliver a verdict you can sign.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply all six lenses to a Samba under assessment',
    'Weigh a mixed performance into one verdict',
    'Defend a Samba placement on the criteria',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Your Samba certification rehearsal. One routine, every lens, a signed verdict.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Confirm the 1-a-2 and the bounce, watch each lens, and combine honestly. Mind the traps: a flat, bounce-less Samba, and a faked upper-body hop instead of the knee-driven bounce.',
    },
  ],
  contextArtefacts: [
    {
      id: 'certification-samba',
      type: 'message',
      title: 'The routine on the floor',
      content:
        'Claimed dance: Samba. Observed: clean syncopated 1-a-2 timing; crisp, buoyant rhythm; a genuine knee-driven bounce action (motion); festive carnival character; correct whisks and samba walks but one botafogo that flattened out and lost its bounce, walked through evenly (figures marked); strong progressive travel with good floorcraft.',
    },
  ],
  challenges: [
    {
      id: 'jsm-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Confirm and Frame',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'samba'],
      storyContext: 'Before scoring, confirm the dance and set your expectations.',
      prompt: 'Is this a Samba, and what should you therefore expect?',
      options: [
        {
          id: 'a',
          label: 'No — one flat botafogo means it cannot be a Samba.',
          isCorrect: false,
          feedback:
            'A flat botafogo lowers one lens; it does not un-make the dance. The 1-a-2 and bounce action confirm a Samba.',
        },
        {
          id: 'b',
          label: 'Yes — a syncopated 1-a-2 with a knee-driven bounce confirms a Samba, so expect festive carnival character and progressive travel with floorcraft.',
          isCorrect: true,
          feedback:
            'Correct. Confirmed as a Samba, you hold it to bounce-and-carnival expectations across all six lenses.',
        },
        {
          id: 'c',
          label: 'Yes, but judge it as non-progressive since Samba never travels.',
          isCorrect: false,
          feedback:
            'The Samba’s travelling figures are progressive; applying a fully non-progressive expectation would misjudge it.',
        },
        {
          id: 'd',
          label: 'No — with a bounce it must be an East Coast Swing.',
          isCorrect: false,
          feedback:
            'The swing bounce is a big circular springing action; the Samba’s is a subtle knee-driven bounce on a 1-a-2 that travels the floor.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What confirms a Samba, and what does that commit you to expect?' },
        { level: 2, title: 'Concept', content: 'Confirm the dance, then hold it to its expectations.' },
        { level: 3, title: 'Specific clue', content: '1-a-2 + knee bounce = Samba = progressive with carnival character.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Yes" with bounce/carnival expectations.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Dance framed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Framing the dance wrongly would misapply expectations across the scorecard.',
        },
      ],
      helpLinks: [{ topicId: 'dance.samba', label: 'Judging the Samba' }],
      successFeedback: 'Confirmed and framed as a progressive, carnival Samba. The lenses carry the right expectations.',
      failureFeedback: 'A syncopated 1-a-2 with a knee-driven bounce confirms a progressive, festive Samba.',
    },
    {
      id: 'jsm-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Place the Weakness',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'samba'],
      storyContext: 'The one shortfall was a botafogo that flattened out and lost its bounce, walked through evenly instead of bouncing.',
      prompt: 'Where does this belong?',
      options: [
        {
          id: 'a',
          label: 'On timing — a flat botafogo means they were off the beat.',
          isCorrect: false,
          feedback:
            'The timing was clean; a lost bounce is not being off the beat.',
        },
        {
          id: 'b',
          label: 'On character — a flat botafogo just looks less festive.',
          isCorrect: false,
          feedback:
            'The character was correctly festive; the specific fault is a figure that lost its bounce.',
        },
        {
          id: 'c',
          label: 'On signature figures — a botafogo that flattens and loses its bounce is a figure executed without its Samba bounce and syncopation.',
          isCorrect: true,
          feedback:
            'Correct. The figure’s flawed execution is the signature-figures lens; motion, timing and character stay strong.',
        },
        {
          id: 'd',
          label: 'On spatial structure — a flat botafogo means they stopped travelling.',
          isCorrect: false,
          feedback:
            'The progression and floorcraft were good; the fault is the figure’s quality, not the travel.',
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
      successFeedback: 'Flat botafogo to signature figures. Motion, timing and character stay strong.',
      failureFeedback: 'A figure executed without its bounce and syncopation is a signature-figures fault, not timing or structure.',
    },
    {
      id: 'jsm-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign the Verdict',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'samba', 'process'],
      storyContext: 'Two final verdicts are drafted for this Samba. Sign the defensible one.',
      prompt: 'Which verdict do you sign?',
      options: [
        {
          id: 'a',
          label:
            'Verdict A: “A strong Samba — clean syncopated 1-a-2 and crisp rhythm, a genuine knee-driven bounce, festive carnival character and strong progressive travel with good floorcraft; held back on signature figures for a botafogo that flattened and lost its bounce.”',
          isCorrect: true,
          feedback:
            'Right. Independent lens scores combined honestly, with the one real weakness named on its lens.',
        },
        {
          id: 'b',
          label:
            'Verdict B: “One flat botafogo, so a low score overall — a Samba with any bounce-less figure is weak.”',
          isCorrect: false,
          feedback:
            'One flat figure lowers one lens; it does not erase clean timing, a genuine bounce and strong travel.',
        },
        {
          id: 'c',
          label:
            'Verdict C: “The bounce and energy were superb, so top marks everywhere.”',
          isCorrect: false,
          feedback:
            'Strong motion does not lift the figures lens. Top-marks-everywhere ignores the flat botafogo you saw.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Combine the lenses honestly — one flat figure should not define the whole.' },
        { level: 2, title: 'Concept', content: 'A verdict weighs independent lens scores and names specifics.' },
        { level: 3, title: 'Specific clue', content: 'Strong on most lenses; signature figures marked down.' },
        { level: 4, title: 'Guided solution', content: 'Choose the verdict that keeps the strengths and names the flat botafogo.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Samba verdict signed' }],
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
        { topicId: 'dance.samba', label: 'Judging the Samba' },
      ],
      successFeedback: 'Strengths kept, the flat botafogo named, verdict signed. A Samba certification judgement.',
      failureFeedback: 'A defensible verdict keeps the strengths and names the one weakness — nothing defines the whole.',
    },
  ],
  reflectionPrompt: 'Across the Samba module, which was harder to judge: the knee-driven bounce, or the crisp syncopation under a fast carnival tempo?',
  rewards: [{ type: 'xp', amount: 25, label: 'Samba certification passed' }],
};
