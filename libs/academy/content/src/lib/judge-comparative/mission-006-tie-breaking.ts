import { MissionDefinition } from '@academy/content-model';

/** Comparative Judging module mission 6 — breaking a genuine tie. */
export const judgeComparative006TieBreaking: MissionDefinition = {
  id: 'judge-comparative-006-tie-breaking',
  campaignId: 'judge-comparative',
  title: 'Breaking a Tie',
  summary:
    'Sometimes two entries really are level. Learn to break a genuine tie with a declared, defensible criterion applied equally — not a coin-flip or a whim.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise a genuine tie from the criteria',
    'Break it with a declared, event-weighted criterion',
    'Apply the tie-break equally to both entries',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'A real tie is rare, but when two entries are level across the lenses, break it with a declared criterion — often the lens the event weights most — applied equally to both. Never a coin-flip, never a whim.',
    },
  ],
  contextArtefacts: [
    {
      id: 'tie-card',
      type: 'message',
      title: 'Tie card',
      content:
        'Two couples in the same dance are genuinely level across timing, rhythm, motion, character and structure. The event’s published emphasis for this dance is on musicality (timing). On that lens, one couple caught the music’s accents slightly more precisely throughout.',
    },
  ],
  challenges: [
    {
      id: 'jcp-006-c1',
      type: 'multiple-choice',
      title: 'A Real Tie',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'Two couples are genuinely level across every lens; you must still produce an order.',
      prompt: 'How should you break the tie?',
      options: [
        {
          id: 'a',
          label: 'Flip a coin — when it is this close, chance is as fair as anything.',
          isCorrect: false,
          feedback:
            'A coin-flip is not judging; a tie is broken with a declared, defensible criterion applied equally, not by chance.',
        },
        {
          id: 'b',
          label: 'Give it to whichever couple you liked more overall.',
          isCorrect: false,
          feedback:
            'Personal preference is exactly the bias a tie-break must avoid; use a declared, criteria-based tie-break.',
        },
        {
          id: 'c',
          label: 'Break the tie on a declared criterion — here the event’s published emphasis on musicality — applied equally, placing the couple that caught the accents slightly more precisely first.',
          isCorrect: true,
          feedback:
            'Correct. A declared, event-weighted criterion applied equally is a defensible tie-break.',
        },
        {
          id: 'd',
          label: 'Leave them tied and let the other judges’ cards decide.',
          isCorrect: false,
          feedback:
            'Passing your own responsibility off is not judging; you owe a defensible order using a declared criterion.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is chance or a declared criterion the fair tie-break?' },
        { level: 2, title: 'Concept', content: 'Break ties with a declared, event-weighted criterion applied equally.' },
        { level: 3, title: 'Specific clue', content: 'The event emphasises musicality; use it.' },
        { level: 4, title: 'Guided solution', content: 'Choose the declared-criterion tie-break.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Tie broken' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Breaking a tie by chance or whim would put an indefensible placement on the record.',
        },
      ],
      helpLinks: [{ topicId: 'judging.comparative', label: 'Comparative Judging and Placement' }],
      successFeedback: 'Declared criterion, applied equally — a defensible tie-break.',
      failureFeedback: 'Break a genuine tie with a declared, event-weighted criterion applied equally — not a coin-flip or a whim.',
    },
    {
      id: 'jcp-006-c2',
      type: 'multiple-choice',
      title: 'Manufacturing a Difference',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'comparative'],
      storyContext:
        'A colleague breaks the same tie by suddenly marking down one couple for their costume — a factor they never applied to anyone else all day.',
      prompt: 'What is wrong with this tie-break?',
      options: [
        {
          id: 'a',
          label: 'Nothing — any difference is fair game to break a tie.',
          isCorrect: false,
          feedback:
            'Not any difference: a tie-break must use a declared criterion applied equally, not a factor invented for one couple.',
        },
        {
          id: 'b',
          label: 'It invents a criterion (costume) that was never applied to the rest of the field, so it is neither declared nor applied equally — it manufactures a difference rather than breaking the tie fairly.',
          isCorrect: true,
          feedback:
            'Correct. A tie-break criterion must be declared and applied to everyone equally; reaching for costume only now is bias dressed up as a decision.',
        },
        {
          id: 'c',
          label: 'It is fine as long as the costume really was worse.',
          isCorrect: false,
          feedback:
            'Even if true, a criterion not applied to the rest of the field cannot fairly decide this tie; it was not declared or applied equally.',
        },
        {
          id: 'd',
          label: 'Nothing — costume is always part of the score anyway.',
          isCorrect: false,
          feedback:
            'Costume is not one of the six lenses; introducing it only to break one tie is an inconsistent, indefensible criterion.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Was the tie-break criterion applied to the whole field?' },
        { level: 2, title: 'Concept', content: 'A tie-break must be declared and applied equally.' },
        { level: 3, title: 'Specific clue', content: 'Costume was invented only for this couple.' },
        { level: 4, title: 'Guided solution', content: 'Choose that it manufactures an unequal, undeclared criterion.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Bias caught' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Endorsing an invented, unequal tie-break would put your placements out of line with a fair panel.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.comparative', label: 'Comparative Judging and Placement' },
        { topicId: 'judging.process', label: 'The Judging Process' },
      ],
      successFeedback: 'An undeclared, unequal criterion — not a fair tie-break. Caught it.',
      failureFeedback: 'A tie-break must use a declared criterion applied equally; reaching for costume only now manufactures an unfair difference.',
    },
  ],
  reflectionPrompt: 'Why is a declared tie-break criterion fairer than simply trusting your overall impression?',
  rewards: [{ type: 'xp', amount: 5, label: 'Tie-breaking trained' }],
};
