import { MissionDefinition } from '@academy/content-model';

/** Final Certification boss — the integrated final judgement. Awards Apprentice Judge. */
export const judgeFinal009BossCertification: MissionDefinition = {
  id: 'judge-final-009-boss-certification',
  campaignId: 'judge-final-cert',
  title: 'Boss: The Certification Judgement',
  summary:
    'One last routine, judged whole. Identify it, score every lens, and deliver the verdict that certifies you as an Apprentice Judge.',
  difficulty: 'boss',
  learningObjectives: [
    'Identify and judge a dance end to end',
    'Combine six independent lenses into one verdict',
    'Deliver a fully defensible certification judgement',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'The final routine. Name the dance, judge every lens, and give me a verdict you can defend line by line. Do this, and you are an Apprentice Judge.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'You have judged every dance to get here. One more, whole. Trust the method.',
    },
  ],
  contextArtefacts: [
    {
      id: 'final-routine',
      type: 'message',
      title: 'The routine on the floor',
      content:
        'Claimed dance: West Coast Swing. Observed: clean back-beat six/eight-count timing; clean walks and triples; a genuine anchor with real extension and compression; cool conversational character; correct push and pass; the slot held throughout; but only a single whip across the whole routine (thin figure variety).',
    },
  ],
  challenges: [
    {
      id: 'jf-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Confirm and Frame',
      difficulty: 'hard',
      tags: ['dance', 'judging'],
      storyContext: 'Confirm the dance and set your expectations before scoring.',
      prompt: 'Is this a West Coast Swing, and what do you expect to judge?',
      options: [
        {
          id: 'a',
          label: 'No — only one whip means it cannot be a West Coast Swing.',
          isCorrect: false,
          feedback:
            'A thin figure vocabulary lowers one lens; it does not un-make the dance. The slot, anchor and push/pass confirm WCS.',
        },
        {
          id: 'b',
          label: 'Yes — the slot, anchor and push/pass confirm WCS, so expect slot structure, anchored patterns, extension/compression and a hybrid character.',
          isCorrect: true,
          feedback:
            'Correct. Confirmed as WCS, you hold it to slot-and-anchor expectations across all six lenses.',
        },
        {
          id: 'c',
          label: 'Yes, but judge it as a Cha Cha since it was contained.',
          isCorrect: false,
          feedback:
            'A slot with an anchor is not a Cha Cha; applying the wrong dance’s expectations would misjudge it.',
        },
        {
          id: 'd',
          label: 'Cannot tell without the music.',
          isCorrect: false,
          feedback:
            'The slot, anchor and figures confirm the dance, not the song.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What confirms a WCS, and what does that commit you to expect?' },
        { level: 2, title: 'Concept', content: 'Confirm the dance, then hold it to its expectations.' },
        { level: 3, title: 'Specific clue', content: 'Slot + anchor + push/pass = WCS.' },
        { level: 4, title: 'Guided solution', content: 'Choose "Yes" with slot/anchor expectations.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Dance framed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Letting a thin vocabulary redefine the dance would misapply expectations across the scorecard.',
        },
      ],
      helpLinks: [{ topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' }],
      successFeedback: 'Confirmed and framed as a WCS. The lenses carry the right expectations.',
      failureFeedback: 'Slot, anchor and push/pass confirm a WCS — the thin vocabulary is a fault within it, not a different dance.',
    },
    {
      id: 'jf-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Place the Weakness',
      difficulty: 'hard',
      tags: ['dance', 'judging'],
      storyContext: 'The one shortfall was a single whip across the whole routine.',
      prompt: 'Where does this belong?',
      options: [
        {
          id: 'a',
          label: 'On motion — fewer figures must mean weaker body action.',
          isCorrect: false,
          feedback:
            'Motion (the anchor, extension/compression) was genuine and strong. Figure count is not motion.',
        },
        {
          id: 'b',
          label: 'On spatial structure — one whip means they left the slot.',
          isCorrect: false,
          feedback:
            'The slot was held throughout; the shortfall is the figure variety, not the structure.',
        },
        {
          id: 'c',
          label: 'On timing — fewer figures means the timing suffered.',
          isCorrect: false,
          feedback:
            'The timing was clean. The number of figures has nothing to do with being on the beat.',
        },
        {
          id: 'd',
          label: 'On signature figures — a single whip across the routine is a thin figure vocabulary, and that lens rewards range.',
          isCorrect: true,
          feedback:
            'Correct. Figure range is the signature-figures lens; motion, timing, character and structure stay strong.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which lens rewards the range of figures?' },
        { level: 2, title: 'Concept', content: 'Figure variety is the signature-figures lens.' },
        { level: 3, title: 'Specific clue', content: 'Do not put it on motion or structure — those were strong.' },
        { level: 4, title: 'Guided solution', content: 'Choose signature figures.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Weakness placed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Filing the weakness under the wrong lens would scramble the certification scorecard.',
        },
      ],
      helpLinks: [{ topicId: 'judging.criteria', label: 'The Six Judging Lenses' }],
      successFeedback: 'Thin variety to signature figures. The rest stays strong.',
      failureFeedback: 'A single whip across the routine is a thin figure vocabulary — the signature-figures lens.',
    },
    {
      id: 'jf-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — The Certification Verdict',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'process'],
      storyContext: 'Two final verdicts are drafted. Sign the one that earns your certification.',
      prompt: 'Which verdict do you sign?',
      options: [
        {
          id: 'a',
          label:
            'Verdict A: “The anchor and connection were superb, so top marks everywhere.”',
          isCorrect: false,
          feedback:
            'Strong motion does not lift the figures lens; top-marks-everywhere ignores the thin vocabulary you saw.',
        },
        {
          id: 'b',
          label:
            'Verdict B: “Only one whip, so a low score overall — a WCS with thin vocabulary is weak.”',
          isCorrect: false,
          feedback:
            'The thin vocabulary lowers one lens; it does not erase clean timing, a genuine anchor, cool character and a held slot.',
        },
        {
          id: 'c',
          label:
            'Verdict C: “A strong West Coast Swing — clean back-beat timing and triples, a genuine anchor with real extension and compression, cool conversational character and a slot held throughout; held back on signature figures for a thin, single-whip vocabulary.”',
          isCorrect: true,
          feedback:
            'Correct. Six independent lenses combined honestly, the one real weakness named on its lens. That is a certification judgement.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Combine the lenses honestly — no single strength or weakness defines it.' },
        { level: 2, title: 'Concept', content: 'A verdict weighs independent lens scores and names specifics.' },
        { level: 3, title: 'Specific clue', content: 'Strong across five lenses; signature figures marked down.' },
        { level: 4, title: 'Guided solution', content: 'Choose the verdict that keeps the strengths and names the thin vocabulary.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Certified' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'A verdict that buries or inflates the truth would fail the couple and the panel that trusts you.',
        },
        {
          type: 'severity',
          delta: 2,
          reason: 'An indefensible final certification judgement is a serious failure for a qualifying judge.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.process', label: 'The Judging Process' },
        { topicId: 'judging.criteria', label: 'The Six Judging Lenses' },
      ],
      successFeedback:
        'Strengths kept, the weakness named, verdict signed. You judge every dance through the six lenses and defend every call — you are an Apprentice Judge.',
      failureFeedback:
        'A certification verdict combines the six lenses honestly and names the one weakness on its lens — nothing defines the whole.',
    },
  ],
  reflectionPrompt:
    'You have judged every dance in the path. Which lens do you now trust yourself on most — and how will you keep sharpening the rest?',
  rewards: [
    { type: 'xp', amount: 25, label: 'Assessment passed' },
    { type: 'badge', id: 'apprentice-judge', label: 'Apprentice Judge' },
  ],
};
