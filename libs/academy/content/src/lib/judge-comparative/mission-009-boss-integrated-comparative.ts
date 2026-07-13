import { MissionDefinition } from '@academy/content-model';

/** Comparative Judging module boss — an integrated comparative judgement. */
export const judgeComparative009BossIntegrated: MissionDefinition = {
  id: 'judge-comparative-009-boss-integrated-comparative',
  campaignId: 'judge-comparative',
  title: 'Boss: The Integrated Comparative Judgement',
  summary:
    'A certification-style comparative judgement. Place a mixed field, catch a consistency error, break a tie fairly, and sign a defensible order.',
  difficulty: 'boss',
  learningObjectives: [
    'Place a mixed, cross-dance field on the criteria',
    'Catch and fix a consistency error and a tie',
    'Defend a full placement order under assessment',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'Your comparative certification rehearsal — the integrated judgement the Final Certification will ask of you. One mixed field, placed, checked and signed.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Judge each dance on its own criteria, weigh the field honestly, keep the order consistent, and break any tie with a declared criterion. Mind the traps: a cross-dance bias and a hidden cycle.',
    },
  ],
  contextArtefacts: [
    {
      id: 'boss-field-card',
      type: 'message',
      title: 'The mixed field',
      content:
        'Four couples. P: a near-flawless Waltz. Q: a strong Cha Cha, one crushed chasse. R: a good Cha Cha, level with Q across the lenses; the event emphasises musicality, on which R caught the accents slightly more precisely. S: a flashy crowd-favourite with one big trick but loose timing and thin figures.',
    },
  ],
  challenges: [
    {
      id: 'jcp-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Judge Each on Its Own Criteria',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'The field mixes a Waltz (P) and Cha Chas (Q, R) and a flashy entry (S). Before placing, set your approach.',
      prompt: 'How do you begin placing this mixed field?',
      options: [
        {
          id: 'a',
          label: 'Compare the Waltz’s rise and fall directly against the Cha Chas’ Cuban motion and rank by that.',
          isCorrect: false,
          feedback:
            'You never compare a Waltz trait directly to a Cha Cha; judge each dance on its own criteria, then place on quality of execution.',
        },
        {
          id: 'b',
          label: 'Judge each couple against ITS OWN dance’s criteria first — P as a Waltz, Q and R as Cha Chas, S on its own execution — then place on quality of execution, ignoring the crowd.',
          isCorrect: true,
          feedback:
            'Correct. Each judged on its own criteria, then placed on execution quality — the fair basis for a mixed field.',
        },
        {
          id: 'c',
          label: 'Place the flashy crowd-favourite S first to keep the room happy, then sort the rest.',
          isCorrect: false,
          feedback:
            'The crowd is not a lens; S’s loose timing and thin figures must be judged, not rewarded for noise.',
        },
        {
          id: 'd',
          label: 'Rank the dances by type first — Waltz over Cha Cha — then slot the couples in.',
          isCorrect: false,
          feedback:
            'No dance outranks another by type; you place on how well each executed its own dance, not on the dance chosen.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Can you compare a Waltz trait directly to a Cha Cha?' },
        { level: 2, title: 'Concept', content: 'Judge each on its own criteria, then place on execution.' },
        { level: 3, title: 'Specific clue', content: 'Ignore the crowd and the dance type.' },
        { level: 4, title: 'Guided solution', content: 'Choose judging each against its own dance’s criteria first.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Approach set' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Starting from dance type or the crowd would bias the whole placement before it began.',
        },
      ],
      helpLinks: [{ topicId: 'judging.comparative', label: 'Comparative Judging and Placement' }],
      successFeedback: 'Each on its own criteria, crowd ignored — the fair basis set.',
      failureFeedback: 'Judge each couple on its own dance’s criteria first, then place on quality of execution, ignoring the crowd and the dance type.',
    },
    {
      id: 'jcp-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Tie and Consistency',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'Q and R are level Cha Chas except Q had one crushed chasse, and on the event’s emphasised musicality R caught the accents slightly more precisely. A draft order also reads P>Q, Q>S, S>P — and P is the near-flawless Waltz.',
      prompt: 'How do you resolve the Q/R tie and the P/Q/S order?',
      options: [
        {
          id: 'a',
          label: 'Break Q/R by coin-flip, and keep P>Q, Q>S, S>P as a valid three-way result.',
          isCorrect: false,
          feedback:
            'A coin-flip is not a tie-break, and P>Q>S>P is an inconsistent cycle that cannot stand.',
        },
        {
          id: 'b',
          label: 'Place Q over R for the cleaner chasse, and leave the P/Q/S cycle since cycles are allowed.',
          isCorrect: false,
          feedback:
            'R’s stronger musicality (the event’s emphasis) and Q’s crushed chasse favour R; and the P>Q>S>P cycle is an error, not an allowed result.',
        },
        {
          id: 'c',
          label: 'Break Q/R with the event’s declared emphasis (musicality), placing R above Q; and fix the cycle — the near-flawless Waltz P should not sit below the flashy, loose S, so the mistaken S>P call is corrected to P>S.',
          isCorrect: true,
          feedback:
            'Correct. A declared tie-break settles Q/R, and correcting the mistaken S>P call removes the cycle into a consistent order.',
        },
        {
          id: 'd',
          label: 'Place S at the top to resolve everything, since the crowd loved S.',
          isCorrect: false,
          feedback:
            'The crowd is not a criterion; S’s loose timing and thin figures keep it low, and the cycle must be fixed on the lenses.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Use a declared criterion for the tie; find the faulty call in the cycle.' },
        { level: 2, title: 'Concept', content: 'Declared tie-break, and fix the inconsistent call to break the cycle.' },
        { level: 3, title: 'Specific clue', content: 'Musicality settles Q/R (R up); S>P is the wrong call.' },
        { level: 4, title: 'Guided solution', content: 'Choose the declared tie-break plus correcting S>P to P>S.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Tie and cycle resolved' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'A coin-flip tie-break or an unresolved cycle would put a self-contradictory, indefensible card on the record.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.comparative', label: 'Comparative Judging and Placement' },
        { topicId: 'judging.process', label: 'The Judging Process' },
      ],
      successFeedback: 'Musicality settles Q/R; the S>P slip corrected — a consistent order.',
      failureFeedback: 'Break Q/R on the declared musicality emphasis (R up), and fix the cycle by correcting the mistaken S>P call to P>S.',
    },
    {
      id: 'jcp-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign the Placement',
      difficulty: 'boss',
      tags: ['dance', 'judging', 'comparative', 'process'],
      storyContext: 'Two final placement cards for the field are drafted. Sign the defensible one.',
      prompt: 'Which placement card do you sign?',
      options: [
        {
          id: 'a',
          label:
            'Card A: “1 P — a near-flawless Waltz on Waltz criteria. 2 R — a strong Cha Cha, edging level Q on the event’s musicality emphasis. 3 Q — a strong Cha Cha held back by one crushed chasse. 4 S — one big trick but loose timing and thin figures, below the more complete rounds despite the crowd.”',
          isCorrect: true,
          feedback:
            'Right. Each judged on its own criteria, the tie broken on a declared emphasis, the order consistent, every position reasoned — a card you can defend.',
        },
        {
          id: 'b',
          label:
            'Card B: “1 S — the crowd favourite. 2 P. 3 Q. 4 R. The room decides the top and the rest fall in behind.”',
          isCorrect: false,
          feedback:
            'The crowd is not a criterion; S’s loose fundamentals place it last, not first, and the rest are not reasoned.',
        },
        {
          id: 'c',
          label:
            'Card C: “1 P, 2 Q, 3 S, 4 R — roughly how it felt, and Waltz beats Cha Cha anyway.”',
          isCorrect: false,
          feedback:
            '"How it felt" and "Waltz beats Cha Cha" are not criteria; this ignores the tie-break and dance-type bias, and leaves R wrongly last.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which card judges each on its own criteria and reasons every position?' },
        { level: 2, title: 'Concept', content: 'A defensible card is consistent, bias-free and reasoned throughout.' },
        { level: 3, title: 'Specific clue', content: 'P, R, Q, S — with the tie broken on musicality and S last.' },
        { level: 4, title: 'Guided solution', content: 'Choose the card that reasons every position on the criteria.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Placement signed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'A crowd-led or "how it felt" card leaves the whole field unable to trust or learn from the result.',
        },
        {
          type: 'severity',
          delta: 1,
          reason: 'An indefensible certification placement is the kind of call that gets a judge reviewed.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.comparative', label: 'Comparative Judging and Placement' },
        { topicId: 'judging.process', label: 'The Judging Process' },
      ],
      successFeedback: 'Each on its own criteria, tie broken fairly, order consistent and reasoned — a comparative certification judgement.',
      failureFeedback: 'The defensible card judges each on its own criteria, breaks the tie on a declared emphasis, stays consistent, and reasons every position.',
    },
  ],
  reflectionPrompt: 'Across the module, which is hardest to hold onto under pressure: fairness, consistency, or the discipline to defend every placement?',
  rewards: [{ type: 'xp', amount: 25, label: 'Comparative certification passed' }],
};
