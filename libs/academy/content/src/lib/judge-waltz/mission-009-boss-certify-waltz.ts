import { MissionDefinition } from '@academy/content-model';

/** Waltz module boss — certify a full Waltz across every lens. */
export const judgeWaltz009BossCertifyWaltz: MissionDefinition = {
  id: 'judge-waltz-009-boss-certify-waltz',
  campaignId: 'judge-waltz',
  title: 'Boss: Certify the Waltz',
  summary:
    'A certification-style Waltz assessment. Confirm the dance, score every lens, and deliver a verdict you can sign.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply all six lenses to a Waltz under assessment',
    'Weigh a mixed performance into one verdict',
    'Defend a Waltz placement on the criteria',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Your Waltz certification rehearsal. One routine, every lens, a signed verdict. This is the Waltz the module has been preparing you for.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Confirm it is a Waltz, watch each lens, and combine honestly. Remember the common trap: timing fine, rise and fall weak.',
    },
  ],
  contextArtefacts: [
    {
      id: 'certification-waltz',
      type: 'message',
      title: 'The routine on the floor',
      content:
        'Claimed dance: Waltz. Observed: clean 3/4 timing, accents on 1 and 4; flowing rhythm; strong, genuine rise and fall (motion); regal character but a slightly blank presence; only the box and one twinkle for figures; good counter-clockwise diagonal travel.',
    },
  ],
  challenges: [
    {
      id: 'jw-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Confirm and Frame',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'waltz'],
      storyContext: 'Before scoring, confirm the dance and set your expectations.',
      prompt: 'Is this a Waltz, and what should you therefore expect to judge?',
      options: [
        {
          id: 'a',
          label: 'No — without a rich figure set it cannot be called a Waltz at all.',
          isCorrect: false,
          feedback:
            'A thin figure vocabulary lowers one lens; it does not un-make the dance. The 3/4 time and rise and fall confirm a Waltz.',
        },
        {
          id: 'b',
          label: 'Yes — 3/4 time with rise and fall confirms a Waltz, so expect to judge timing, rhythm, motion, character, figures and progressive travel.',
          isCorrect: true,
          feedback:
            'Correct. Confirmed as a Waltz, you now hold it to Waltz expectations across all six lenses.',
        },
        {
          id: 'c',
          label: 'Yes, but judge it as a non-progressive dance since it stayed elegant and controlled.',
          isCorrect: false,
          feedback:
            'The Waltz is progressive; elegance does not change its structure. You would be applying the wrong expectation.',
        },
        {
          id: 'd',
          label: 'Cannot tell without the couple’s costume and music title.',
          isCorrect: false,
          feedback:
            'The dance is confirmed from time signature, motion and travel — not from costume or a title.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What confirms a Waltz, and what does confirming it commit you to?' },
        { level: 2, title: 'Concept', content: 'Confirm the dance, then hold it to that dance’s expectations on every lens.' },
        { level: 3, title: 'Specific clue', content: '3/4 with rise and fall = Waltz = progressive.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Yes" with the full Waltz expectations.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Dance framed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Framing the dance wrongly would misapply expectations across the entire scorecard.',
        },
      ],
      helpLinks: [{ topicId: 'dance.waltz', label: 'Judging the Waltz' }],
      successFeedback: 'Confirmed and framed as a Waltz. Now the lenses carry the right expectations.',
      failureFeedback: '3/4 time with rise and fall confirms a progressive Waltz — judge it against Waltz expectations.',
    },
    {
      id: 'jw-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Place the Two Weaknesses',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'waltz'],
      storyContext:
        'Two things fell short: a slightly blank presence, and a figure set of only a box and one twinkle.',
      prompt: 'Where do these two weaknesses belong?',
      options: [
        {
          id: 'a',
          label: 'Both on motion — anything that falls short is a body-action problem.',
          isCorrect: false,
          feedback:
            'Motion was actually a strength here. Neither the blank presence nor the thin vocabulary is a motion issue.',
        },
        {
          id: 'b',
          label: 'Both on timing — weaknesses always show up as being off the beat.',
          isCorrect: false,
          feedback:
            'Timing was clean. Presence and figure range have nothing to do with being on the beat.',
        },
        {
          id: 'c',
          label: 'Blank presence on signature figures; thin vocabulary on character.',
          isCorrect: false,
          feedback:
            'Reversed. Presence is a character matter; the number and range of figures is the signature-figures lens.',
        },
        {
          id: 'd',
          label: 'Blank presence on character; a thin box-and-twinkle vocabulary on signature figures.',
          isCorrect: true,
          feedback:
            'Correct. Presence is character; the range of figures is the signature-figures lens. Motion and timing stay strong.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Match each weakness to the lens that actually scores it.' },
        { level: 2, title: 'Concept', content: 'Presence = character; figure range = signature figures.' },
        { level: 3, title: 'Specific clue', content: 'Do not put either weakness on motion or timing — those were strong.' },
        { level: 4, title: 'Guided solution', content: 'Choose presence → character, thin figures → signature figures.' },
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
      successFeedback: 'Presence to character, thin figures to signature figures. Motion and timing stay clean.',
      failureFeedback: 'Presence is a character matter; the range of figures is the signature-figures lens.',
    },
    {
      id: 'jw-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign the Verdict',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'waltz', 'process'],
      storyContext: 'Two final verdicts are drafted for this Waltz. Sign the defensible one.',
      prompt: 'Which verdict do you sign?',
      options: [
        {
          id: 'a',
          label:
            'Verdict A: “A strong Waltz — clean timing and rhythm, genuine rise and fall, regal carriage and good progressive travel; held back on signature figures for a thin vocabulary and slightly on character for blank presence.”',
          isCorrect: true,
          feedback:
            'Right. Independent lens scores combined honestly, with both real weaknesses named on the correct lenses.',
        },
        {
          id: 'b',
          label:
            'Verdict B: “Weak overall — a couple that only boxes has not really danced a Waltz, so the whole score is low.”',
          isCorrect: false,
          feedback:
            'The thin vocabulary lowers one lens; it does not erase genuine rise and fall, clean timing and good travel.',
        },
        {
          id: 'c',
          label:
            'Verdict C: “Top marks — the rise and fall was genuine, and that is the heart of a Waltz, so everything scores high.”',
          isCorrect: false,
          feedback:
            'Strong motion does not lift character and figures. Top-marks-everywhere ignores the blank presence and thin vocabulary you saw.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Combine the lenses honestly — neither a single strength nor a single weakness defines it.' },
        { level: 2, title: 'Concept', content: 'A verdict weighs independent lens scores and names specifics.' },
        { level: 3, title: 'Specific clue', content: 'Strong on most lenses; figures and character marked down.' },
        { level: 4, title: 'Guided solution', content: 'Choose the verdict that keeps the strengths and names both weaknesses.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Waltz verdict signed' }],
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
        { topicId: 'dance.waltz', label: 'Judging the Waltz' },
      ],
      successFeedback: 'Strengths kept, both weaknesses named, verdict signed. That is a Waltz certification judgement.',
      failureFeedback: 'A defensible verdict combines the lenses honestly — no single strength or weakness gets to define the Waltz.',
    },
  ],
  reflectionPrompt: 'Across the whole Waltz module, which lens do you now feel most confident scoring, and which least?',
  rewards: [{ type: 'xp', amount: 25, label: 'Waltz certification passed' }],
};
