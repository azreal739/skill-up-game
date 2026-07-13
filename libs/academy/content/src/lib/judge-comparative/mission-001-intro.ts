import { MissionDefinition } from '@academy/content-model';

/** Dance Academy — Judge Path, Comparative Judging module mission 1. */
export const judgeComparative001Intro: MissionDefinition = {
  id: 'judge-comparative-001-intro',
  campaignId: 'judge-comparative',
  title: 'Placing a Field',
  summary:
    'Comparative judging places a field relative to each other, not one performance in isolation. Learn what changes when you must rank couples against one another.',
  difficulty: 'medium',
  learningObjectives: [
    'Understand comparative judging as placement, not isolated scoring',
    'Hold every entry to the same criteria',
    'Anchor on stating a concrete reason for each placement',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'On a panel you rarely score one couple alone — you place a field. The six lenses do not change, but now every couple is measured against the same criteria and ranked.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'The test of a placement is simple: can you state the concrete, criteria-based reason each couple placed where it did?',
    },
  ],
  contextArtefacts: [
    {
      id: 'comparative-signature',
      type: 'message',
      title: 'Comparative judging at a glance',
      content:
        'Place the field relative to each other, not in isolation. Same six lenses for every entry. Weigh strengths vs weaknesses. Judge different dances against their own criteria, then place on quality. Keep the order consistent (transitive). Break ties with a declared criterion. Guard against bias. Always state a concrete reason for each placement.',
    },
  ],
  challenges: [
    {
      id: 'jcp-001-c1',
      type: 'multiple-choice',
      title: 'Isolation or Field',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'A new panel judge scores each couple in complete isolation, writing a number for each without ever comparing them, then is surprised the placements feel arbitrary.',
      prompt: 'What does comparative judging require that isolated scoring misses?',
      options: [
        {
          id: 'a',
          label: 'Nothing — a number per couple is all a placement ever needs.',
          isCorrect: false,
          feedback:
            'Isolated numbers alone leave placements arbitrary; comparative judging requires measuring couples against each other on the same criteria.',
        },
        {
          id: 'b',
          label: 'Comparing the couples against each other on the same criteria and being able to state a concrete reason one placed above another.',
          isCorrect: true,
          feedback:
            'Correct. A placement is a relative judgement: each couple held to the same lenses, with a stated reason for the order.',
        },
        {
          id: 'c',
          label: 'Judging each couple against a different standard so everyone gets a fair chance.',
          isCorrect: false,
          feedback:
            'Different standards per couple make placements indefensible; every entry must be held to the SAME criteria.',
        },
        {
          id: 'd',
          label: 'Ranking by which couple the crowd cheered loudest.',
          isCorrect: false,
          feedback:
            'Crowd reaction is not the criterion; a placement rests on the six lenses applied equally, not applause.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is a placement about one couple, or the field?' },
        { level: 2, title: 'Concept', content: 'Comparative judging measures couples against each other on the same criteria.' },
        { level: 3, title: 'Specific clue', content: 'State a concrete reason for the order.' },
        { level: 4, title: 'Guided solution', content: 'Choose comparing on the same criteria with a stated reason.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Placement framed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Scoring in isolation with no comparison leaves placements arbitrary and impossible to defend.',
        },
      ],
      helpLinks: [{ topicId: 'judging.comparative', label: 'Comparative Judging and Placement' }],
      successFeedback: 'Same criteria, stated reasons — that is a placement.',
      failureFeedback: 'Comparative judging compares couples against each other on the same criteria, with a concrete reason for the order.',
    },
    {
      id: 'jcp-001-c2',
      type: 'multiple-choice',
      title: 'The Same Criteria',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'Placing two couples, a judge forgives one couple’s weak timing because they seemed nervous, but marks the other’s identical timing slip in full.',
      prompt: 'What comparative principle has the judge broken?',
      options: [
        {
          id: 'a',
          label: 'None — allowing for nerves is part of fair judging.',
          isCorrect: false,
          feedback:
            'Sympathy for one couple’s nerves but not the other’s applies the criteria unequally — the core comparative fault.',
        },
        {
          id: 'b',
          label: 'That placements should be based on crowd reaction.',
          isCorrect: false,
          feedback:
            'The problem is not the crowd; it is that identical faults were judged differently.',
        },
        {
          id: 'c',
          label: 'That different dances need different criteria.',
          isCorrect: false,
          feedback:
            'Both couples danced comparably here; the fault is unequal treatment of the same criteria, not a cross-dance issue.',
        },
        {
          id: 'd',
          label: 'Holding the field to the same criteria — an identical timing slip must be judged the same for both couples, not forgiven for one.',
          isCorrect: true,
          feedback:
            'Correct. Comparative judging demands the same criteria applied equally; forgiving one couple’s identical fault breaks it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Were the two identical slips treated the same?' },
        { level: 2, title: 'Concept', content: 'The same criteria must apply equally to every entry.' },
        { level: 3, title: 'Specific clue', content: 'Forgiving one couple’s identical fault is unequal treatment.' },
        { level: 4, title: 'Guided solution', content: 'Choose holding the field to the same criteria.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Equal treatment set' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Applying the criteria unequally would make your placements indefensible and out of line with the panel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.comparative', label: 'Comparative Judging and Placement' }],
      successFeedback: 'Identical faults judged identically — the criteria applied equally.',
      failureFeedback: 'Comparative judging holds the field to the same criteria; an identical slip must be judged the same for both couples.',
    },
  ],
  reflectionPrompt: 'How will placing a field change what you watch for compared with scoring one couple alone?',
  rewards: [{ type: 'xp', amount: 5, label: 'Comparative module opened' }],
};
