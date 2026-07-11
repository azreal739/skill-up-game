import { MissionDefinition } from '@academy/content-model';

/** Core Fundamentals boss — the six lenses applied to one full routine. */
export const judgeCore009BossFirstPanel: MissionDefinition = {
  id: 'judge-core-009-boss-first-panel',
  campaignId: 'judge-core-fundamentals',
  title: 'Boss: Sit the First Panel',
  summary:
    'Certification-style assessment. One routine, every lens, a final defensible verdict. Take it slow and score what you see.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply all six lenses under assessment conditions',
    'Weigh independent lens scores into one verdict',
    'Defend a final placement on the criteria',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'This is your certification rehearsal. You will judge one routine across the lenses, then deliver a verdict you can defend. Everything from the fundamentals applies at once.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Slow down. Name the dance, watch each lens on its own, and only then combine them. A verdict you cannot explain is a verdict you have not earned.',
    },
  ],
  contextArtefacts: [
    {
      id: 'assessment-routine',
      type: 'message',
      title: 'The routine on the floor',
      content:
        'Claimed dance: West Coast Swing to a 4/4 blues track. Observed: solid back-beat timing; clear slot held with one legal whip; pushes and passes present and clean; anchor settle is weak and rushed; character is confident and connected; no floorcraft issues.',
    },
  ],
  challenges: [
    {
      id: 'jc-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Confirm the Dance',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'signature-figures'],
      storyContext:
        'Before scoring, confirm the couple is dancing the dance they claimed: West Coast Swing.',
      prompt: 'Do the observations confirm West Coast Swing, and on what basis?',
      options: [
        {
          id: 'a',
          label: 'Yes — a held slot with pushes, passes and a legal whip are the signature figures and structure of West Coast Swing.',
          isCorrect: true,
          feedback:
            'Correct. The slot plus push/pass/whip vocabulary identifies the dance; you can score it as a West Coast Swing.',
        },
        {
          id: 'b',
          label: 'No — without rise and fall it cannot be West Coast Swing.',
          isCorrect: false,
          feedback:
            'Rise and fall is a Waltz feature, not a West Coast Swing requirement. You are checking the wrong dance’s signatures.',
        },
        {
          id: 'c',
          label: 'Cannot tell — the dance can only be confirmed from the couple’s costume.',
          isCorrect: false,
          feedback:
            'Costume never confirms a dance. The figures and structure on the floor do, and here they are West Coast Swing.',
        },
        {
          id: 'd',
          label: 'No — any 4/4 blues track means the dance must be judged as a blues dance.',
          isCorrect: false,
          feedback:
            'The music’s genre does not rename the dance. West Coast Swing is routinely danced to blues; the figures confirm it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which observed figures identify the dance?' },
        { level: 2, title: 'Concept', content: 'Signature figures and structure confirm the claimed dance.' },
        { level: 3, title: 'Specific clue', content: 'Slot + push + pass + whip = West Coast Swing.' },
        { level: 4, title: 'Guided solution', content: 'Choose “Yes”, confirmed by slot and the push/pass/whip vocabulary.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Dance confirmed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Failing to confirm the dance first would misapply another dance’s criteria to the whole scorecard.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'Dance confirmed from its own figures. Now the lenses mean something.',
      failureFeedback: 'Confirm the dance from its signature figures and structure — slot with push/pass/whip is West Coast Swing.',
    },
    {
      id: 'jc-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Score the Weakness',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'motion'],
      storyContext:
        'Everything is strong except the anchor settle, which is weak and rushed.',
      prompt: 'Where does the weak, rushed anchor settle belong on the scorecard?',
      options: [
        {
          id: 'a',
          label: 'On timing — a rushed anchor is only ever a matter of being off the beat.',
          isCorrect: false,
          feedback:
            'It can be rushed while still on the beat. The problem is how the settle is produced, not merely when.',
        },
        {
          id: 'b',
          label: 'On character — a weak anchor just means the couple looked unconfident.',
          isCorrect: false,
          feedback:
            'They were judged confident and connected. The anchor issue is about the movement quality, not the personality.',
        },
        {
          id: 'c',
          label: 'On spatial structure — the anchor is about where the couple is on the slot.',
          isCorrect: false,
          feedback:
            'The slot was held cleanly. The anchor problem is the settle itself — how it is danced — not the couple’s position.',
        },
        {
          id: 'd',
          label: 'On motion — the anchor settle is a body action, and a weak, rushed settle is a motion-quality fault.',
          isCorrect: true,
          feedback:
            'Right. The settle is a produced body action; scoring it under motion keeps timing, structure and character honest.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the anchor about when, where, who, or how the body moves?' },
        { level: 2, title: 'Concept', content: 'The quality of a produced body action is the motion lens.' },
        { level: 3, title: 'Specific clue', content: 'The slot was fine and they were on time — so it is not structure or timing.' },
        { level: 4, title: 'Guided solution', content: 'Choose motion.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Weakness placed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Filing the anchor fault under the wrong lens would make your card disagree with the panel for no real reason.',
        },
      ],
      helpLinks: [{ topicId: 'judging.motion', label: 'Motion and Body Action' }],
      successFeedback: 'Weak settle scored under motion. The other lenses stay clean and honest.',
      failureFeedback: 'A weak, rushed anchor settle is a body-action quality problem — it belongs on the motion lens.',
    },
    {
      id: 'jc-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Deliver the Verdict',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'process'],
      storyContext:
        'Two final verdicts are drafted for this West Coast Swing. Choose the one you would sign.',
      prompt: 'Which verdict is defensible?',
      options: [
        {
          id: 'a',
          label:
            'Verdict A: “Weak anchor, so a low score overall — one flawed element defines the routine.”',
          isCorrect: false,
          feedback:
            'One weak lens does not define the whole. Strong timing, structure, figures and character still count independently.',
        },
        {
          id: 'b',
          label:
            'Verdict B: “Strong on timing, structure, signature figures and character; marked down on motion for a weak anchor settle — a good routine with one clear area to develop.”',
          isCorrect: true,
          feedback:
            'This is the defensible verdict: independent lens scores combined honestly, with the one weakness named specifically.',
        },
        {
          id: 'c',
          label:
            'Verdict C: “Everything was great — the pushes and passes were clean, so the whole routine is top marks.”',
          isCorrect: false,
          feedback:
            'Clean figures do not erase the observed weak anchor. Top-marks-everywhere ignores a real motion fault you saw.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Combine the lenses honestly — neither one weakness nor one strength defines it.' },
        { level: 2, title: 'Concept', content: 'A verdict weighs independent lens scores and names specifics.' },
        { level: 3, title: 'Specific clue', content: 'Strong across most lenses; motion down for the anchor.' },
        { level: 4, title: 'Guided solution', content: 'Choose the verdict that keeps the strengths and names the motion weakness.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Verdict signed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'A verdict that either buries or inflates the truth leaves the couple unable to trust or act on it.',
        },
        {
          type: 'severity',
          delta: 1,
          reason: 'An indefensible final verdict is the kind of call that gets a judge’s certification questioned.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'judging.criteria', label: 'The Six Judging Lenses' },
      ],
      successFeedback:
        'Strengths kept, weakness named, verdict signed. That is a Level 1 judgement.',
      failureFeedback:
        'A defensible verdict combines the lenses honestly — neither one fault nor one flourish gets to define the routine.',
    },
  ],
  reflectionPrompt:
    'Across all six lenses, which was hardest for you to score without letting the others bleed in?',
  rewards: [{ type: 'xp', amount: 25, label: 'First panel survived' }],
};
