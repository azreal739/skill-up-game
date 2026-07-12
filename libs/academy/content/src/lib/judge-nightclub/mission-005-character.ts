import { MissionDefinition } from '@academy/content-model';

/** Nightclub module mission 5 — character: soft, fluid, romantic. */
export const judgeNightclub005Character: MissionDefinition = {
  id: 'judge-nightclub-005-character',
  campaignId: 'judge-nightclub',
  title: 'Soft and Romantic',
  summary:
    'The Nightclub’s character is soft, fluid and romantic. Learn to judge that mood apart from technique — and to spot when it is missing.',
  difficulty: 'medium',
  learningObjectives: [
    'Describe the Nightclub’s intended character',
    'Judge romantic mood apart from technique',
    'Spot a Nightclub danced with sharp or aggressive energy',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Nightclub is an intimate, romantic conversation between two dancers — soft and fluid. Sharp, aggressive energy, however clean, is the wrong character.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jn-005-c1',
      type: 'multiple-choice',
      title: 'Wrong Mood',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'nightclub', 'character'],
      storyContext:
        'A couple dances the Nightclub figures accurately but with sharp, staccato, almost combative energy, faces tense and hard.',
      prompt: 'How does the character lens read this?',
      options: [
        {
          id: 'a',
          label: 'Lower — the Nightclub’s character is soft, fluid and romantic, and sharp, combative energy is the wrong mood.',
          isCorrect: true,
          feedback:
            'Correct. Accurate figures with the wrong mood is a character fault: this reads as a battle, not a romance.',
        },
        {
          id: 'b',
          label: 'Higher — intensity always makes a performance more compelling.',
          isCorrect: false,
          feedback:
            'Intensity has to be the right intensity. Sharp, combative energy is not the soft romance a Nightclub calls for.',
        },
        {
          id: 'c',
          label: 'Unchanged — if the figures are correct, character does not move.',
          isCorrect: false,
          feedback:
            'Character is its own lens. Correct figures with the wrong mood still score down on character.',
        },
        {
          id: 'd',
          label: 'Higher on motion — sharp energy shows strong body action.',
          isCorrect: false,
          feedback:
            'Mood is a character matter, and sharp energy is the wrong mood; it would not lift any lens here.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the mood the mood a Nightclub calls for?' },
        { level: 2, title: 'Concept', content: 'Character rewards the RIGHT mood, not merely intensity.' },
        { level: 3, title: 'Specific clue', content: 'Sharp and combative is the opposite of soft and romantic.' },
        { level: 4, title: 'Guided solution', content: 'Choose the lower character score for the wrong mood.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Mood judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding any intensity would erase the soft, romantic identity of the Nightclub.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Right figures, wrong mood — a character fault, cleanly seen.',
      failureFeedback: 'Character rewards the RIGHT mood; sharp, combative energy is wrong for a soft, romantic Nightclub.',
    },
    {
      id: 'jn-005-c2',
      type: 'multiple-choice',
      title: 'Soft, Not Sleepy',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'nightclub', 'character'],
      storyContext:
        'A couple keeps the mood soft — but so under-energised that the routine reads as sleepy and disengaged, with no connection between them.',
      prompt: 'How should the character lens weigh "soft" that has become "flat"?',
      options: [
        {
          id: 'a',
          label: 'Full marks — soft is the goal, so softer is always better.',
          isCorrect: false,
          feedback:
            'Soft is the texture, not the absence of energy. Romantic character needs connection and intent, which are missing.',
        },
        {
          id: 'b',
          label: 'Full marks — low energy reads as control and refinement.',
          isCorrect: false,
          feedback:
            'Disengagement is not refinement. A sleepy, disconnected couple is not showing romantic character.',
        },
        {
          id: 'c',
          label: 'Marked down — the Nightclub is soft but alive; sleepy disengagement is missing the romantic connection the character needs.',
          isCorrect: true,
          feedback:
            'Right. "Soft" still requires connection and intent; a flat, disengaged Nightclub scores down on character.',
        },
        {
          id: 'd',
          label: 'It moves to the motion lens — low energy is really a body-action problem.',
          isCorrect: false,
          feedback:
            'The missing element is romantic connection and intent — a character matter, not how the body produces movement.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is "soft" the same as "low energy"?' },
        { level: 2, title: 'Concept', content: 'Romantic character needs connection and intent, not just softness.' },
        { level: 3, title: 'Specific clue', content: 'Sleepy and disconnected is flat, not soft.' },
        { level: 4, title: 'Guided solution', content: 'Choose the character mark-down for missing connection.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Connection weighed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Treating flatness as softness would make character scores swing between judges.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Soft, but alive. You marked the missing connection, not the softness.',
      failureFeedback: 'Nightclub character is soft but alive — sleepy, disconnected dancing scores down.',
    },
  ],
  reflectionPrompt: 'How would you coach a couple to be "soft but not sleepy" in one sentence?',
  rewards: [{ type: 'xp', amount: 5, label: 'Nightclub character trained' }],
};
