import { MissionDefinition } from '@academy/content-model';

/** Mock Theory mission 6 — signature figures recall across dances. */
export const judgeTheory006SignatureFigures: MissionDefinition = {
  id: 'judge-theory-006-signature-figures',
  campaignId: 'judge-mock-theory',
  title: 'Paper V — Signature Figures',
  summary: 'Revise which figures belong to which dance — and select the whole set.',
  difficulty: 'medium',
  learningObjectives: [
    'Match figures to their dance',
    'Select a complete figure set',
    'Rule out figures borrowed from other dances',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Figures identify a dance. Know each vocabulary well enough to pick the whole set out of a mixed list.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jt-006-c1',
      type: 'multiple-choice',
      title: 'One From Each',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'signature-figures'],
      storyContext: 'An exam question pairs a figure with its dance.',
      prompt: 'Which pairing is correct?',
      options: [
        {
          id: 'a',
          label: 'Whip → West Coast Swing.',
          isCorrect: true,
          feedback:
            'Correct. The whip is a core West Coast Swing figure.',
        },
        {
          id: 'b',
          label: 'Twinkle → Cha Cha.',
          isCorrect: false,
          feedback:
            'The twinkle is a Waltz figure, not a Cha Cha one.',
        },
        {
          id: 'c',
          label: 'New Yorker → Nightclub.',
          isCorrect: false,
          feedback:
            'The New Yorker break is a Cha Cha figure, not Nightclub.',
        },
        {
          id: 'd',
          label: 'Botafogo → Waltz.',
          isCorrect: false,
          feedback:
            'The botafogo is a Samba figure — not part of the Waltz vocabulary.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which figure belongs to a slotted dance?' },
        { level: 2, title: 'Concept', content: 'Figures identify the dance.' },
        { level: 3, title: 'Specific clue', content: 'The whip lives in the slot.' },
        { level: 4, title: 'Guided solution', content: 'Choose Whip → West Coast Swing.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Figure matched' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Mismatching figures to dances would let the wrong dance pass as another on the floor.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'Whip → WCS. Matched.',
      failureFeedback: 'The whip is West Coast Swing; the twinkle is Waltz, the New Yorker is Cha Cha, the botafogo is Samba.',
    },
    {
      id: 'jt-006-c2',
      type: 'multiple-choice',
      title: 'Select the Waltz Set',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'signature-figures'],
      multiSelect: true,
      storyContext: 'From a mixed list of figures, an exam question asks you to pick out the Waltz vocabulary.',
      prompt: 'Select every figure that belongs to the Waltz.',
      options: [
        {
          id: 'a',
          label: 'Push (sugar push).',
          isCorrect: false,
          feedback:
            'The sugar push is West Coast Swing, not Waltz.',
        },
        {
          id: 'b',
          label: 'Box.',
          isCorrect: true,
          feedback:
            'Yes — the box is a core Waltz figure.',
        },
        {
          id: 'c',
          label: 'Twinkle.',
          isCorrect: true,
          feedback:
            'Yes — the twinkle is a core Waltz figure.',
        },
        {
          id: 'd',
          label: 'Fallaway.',
          isCorrect: true,
          feedback:
            'Yes — the fallaway is a Waltz figure.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which figures belong to a smooth, progressive 3/4 dance?' },
        { level: 2, title: 'Concept', content: 'The Waltz set is box, twinkle, diamond, fallaway.' },
        { level: 3, title: 'Specific clue', content: 'The push is the odd one out — it is WCS.' },
        { level: 4, title: 'Guided solution', content: 'Select box, twinkle and fallaway; leave the push.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Waltz set selected' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Selecting the wrong figures would confuse whole vocabularies on the paper and the floor.',
        },
      ],
      helpLinks: [{ topicId: 'dance.waltz', label: 'Judging the Waltz' }],
      successFeedback: 'Box, twinkle, fallaway — the Waltz set, minus the WCS push.',
      failureFeedback: 'The Waltz set here is box, twinkle and fallaway; the sugar push is West Coast Swing.',
    },
  ],
  reflectionPrompt: 'Which figure name is most likely to trip a candidate because it appears (in some form) in more than one dance?',
  rewards: [{ type: 'xp', amount: 5, label: 'Paper V figures done' }],
};
