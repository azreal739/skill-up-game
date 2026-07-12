import { MissionDefinition } from '@academy/content-model';

/** Cha Cha module boss — certify a full Cha Cha across every lens. */
export const judgeChaCha009BossCertifyChaCha: MissionDefinition = {
  id: 'judge-cha-cha-009-boss-certify-cha-cha',
  campaignId: 'judge-cha-cha',
  title: 'Boss: Certify the Cha Cha',
  summary:
    'A certification-style Cha Cha assessment. Confirm the dance, score every lens, and deliver a verdict you can sign.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply all six lenses to a Cha Cha under assessment',
    'Weigh a mixed performance into one verdict',
    'Defend a Cha Cha placement on the criteria',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Your Cha Cha certification rehearsal. One routine, every lens, a signed verdict.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Confirm the chasse and Cuban motion, watch each lens, and combine honestly. Mind the traps: faked Cuban motion, and the wrong motion for the music.',
    },
  ],
  contextArtefacts: [
    {
      id: 'certification-chacha',
      type: 'message',
      title: 'The routine on the floor',
      content:
        'Claimed dance: Cha Cha to a rolling Latin-country number. Observed: clean 4&5 chasse timing with a sharp "&"; crisp rhythm; genuine knee-driven Cuban motion that suited the rolling music; fiery cheeky character; correct basics and breaks but only a single spot turn (thin figure variety); controlled, contained floor use with good floorcraft.',
    },
  ],
  challenges: [
    {
      id: 'jcc-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Confirm and Frame',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'cha-cha'],
      storyContext: 'Before scoring, confirm the dance and set your expectations.',
      prompt: 'Is this a Cha Cha, and what should you therefore expect?',
      options: [
        {
          id: 'a',
          label: 'No — a rolling country number cannot be a Cha Cha.',
          isCorrect: false,
          feedback:
            'Cha Cha is danced to many styles, including rolling Latin-country music; the chasse and Cuban motion confirm it.',
        },
        {
          id: 'b',
          label: 'Yes, but judge it as progressive since it is energetic.',
          isCorrect: false,
          feedback:
            'Energy does not make the Cha Cha progressive; it is largely non-progressive, and applying the wrong structure would misjudge it.',
        },
        {
          id: 'c',
          label: 'Yes — the 4&5 chasse with knee-driven Cuban motion confirms a Cha Cha, so expect Cuban motion, cheeky character and controlled, largely non-progressive space.',
          isCorrect: true,
          feedback:
            'Correct. Confirmed as a Cha Cha, you hold it to Cha Cha expectations across all six lenses.',
        },
        {
          id: 'd',
          label: 'Cannot tell without seeing the couple’s costumes.',
          isCorrect: false,
          feedback:
            'Costume never confirms a dance; the chasse and Cuban motion do.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What confirms a Cha Cha, and what does that commit you to expect?' },
        { level: 2, title: 'Concept', content: 'Confirm the dance, then hold it to Cha Cha expectations.' },
        { level: 3, title: 'Specific clue', content: '4&5 chasse + Cuban motion = Cha Cha = largely non-progressive.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Yes" with Cha Cha expectations.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Dance framed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Framing the dance wrongly (e.g. as progressive) would misapply expectations across the scorecard.',
        },
      ],
      helpLinks: [{ topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' }],
      successFeedback: 'Confirmed and framed as a Cha Cha. Now the lenses carry the right expectations.',
      failureFeedback: 'The 4&5 chasse with Cuban motion confirms a Cha Cha — judge it against Cha Cha expectations.',
    },
    {
      id: 'jcc-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Place the Weakness',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'cha-cha'],
      storyContext:
        'The one shortfall was a thin figure vocabulary — only a single spot turn across the whole routine.',
      prompt: 'Where does this weakness belong?',
      options: [
        {
          id: 'a',
          label: 'On signature figures — a routine that shows only one turn has a thin figure vocabulary, and that lens rewards range.',
          isCorrect: true,
          feedback:
            'Correct. The number and range of figures is the signature-figures lens; motion, timing and character were strong.',
        },
        {
          id: 'b',
          label: 'On motion — a lack of turns must be a body-action problem.',
          isCorrect: false,
          feedback:
            'Motion was strong (genuine Cuban action). Figure variety is not a motion matter.',
        },
        {
          id: 'c',
          label: 'On timing — fewer figures means the timing must have suffered.',
          isCorrect: false,
          feedback:
            'Timing was clean. The number of figures shown has nothing to do with being on the beat.',
        },
        {
          id: 'd',
          label: 'On character — a thin routine just feels flat.',
          isCorrect: false,
          feedback:
            'Character was fiery and correct. Figure range is the signature-figures lens, not character.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which lens rewards the range of figures?' },
        { level: 2, title: 'Concept', content: 'Figure variety is the signature-figures lens.' },
        { level: 3, title: 'Specific clue', content: 'Do not put it on motion or timing — those were strong.' },
        { level: 4, title: 'Guided solution', content: 'Choose signature figures.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Weakness placed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Filing the weakness under the wrong lens would scramble the scorecard against the panel’s.',
        },
      ],
      helpLinks: [{ topicId: 'judging.criteria', label: 'The Six Judging Lenses' }],
      successFeedback: 'Thin variety to signature figures. Motion, timing and character stay strong.',
      failureFeedback: 'A thin figure vocabulary is the signature-figures lens — motion and timing were strong.',
    },
    {
      id: 'jcc-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign the Verdict',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'cha-cha', 'process'],
      storyContext: 'Two final verdicts are drafted for this Cha Cha. Sign the defensible one.',
      prompt: 'Which verdict do you sign?',
      options: [
        {
          id: 'a',
          label:
            'Verdict A: “Only one turn, so the whole routine is weak — a Cha Cha with no variety is no Cha Cha.”',
          isCorrect: false,
          feedback:
            'The thin vocabulary lowers one lens; it does not erase clean chasse timing, genuine Cuban motion and fiery character.',
        },
        {
          id: 'b',
          label:
            'Verdict B: “Genuine Cuban motion and fire, so top marks everywhere.”',
          isCorrect: false,
          feedback:
            'Strong motion and character do not lift the figures lens. Top-marks-everywhere ignores the thin vocabulary you saw.',
        },
        {
          id: 'c',
          label:
            'Verdict C: “A strong Cha Cha — clean chasse timing and crisp rhythm, genuine knee-driven Cuban motion suited to the music, fiery cheeky character and good floor control; held back on signature figures for a thin, one-turn vocabulary.”',
          isCorrect: true,
          feedback:
            'Right. Independent lens scores combined honestly, with the one real weakness named on the correct lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Combine the lenses honestly — one thin lens should not define the whole.' },
        { level: 2, title: 'Concept', content: 'A verdict weighs independent lens scores and names specifics.' },
        { level: 3, title: 'Specific clue', content: 'Strong on most lenses; signature figures marked down.' },
        { level: 4, title: 'Guided solution', content: 'Choose the verdict that keeps the strengths and names the thin vocabulary.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Cha Cha verdict signed' }],
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
        { topicId: 'dance.cha-cha', label: 'Judging the Cha Cha' },
      ],
      successFeedback: 'Strengths kept, the thin vocabulary named, verdict signed. A Cha Cha certification judgement.',
      failureFeedback: 'A defensible verdict keeps the strengths and names the one weakness — it does not define the whole.',
    },
  ],
  reflectionPrompt: 'Across the Cha Cha module, which was harder to judge: genuine Cuban motion, or the right motion for the music?',
  rewards: [{ type: 'xp', amount: 25, label: 'Cha Cha certification passed' }],
};
