import { MissionDefinition } from '@academy/content-model';

/** Cha Cha module mission 5 — character: fiery, flirtatious, cheeky. */
export const judgeChaCha005Character: MissionDefinition = {
  id: 'judge-cha-cha-005-character',
  campaignId: 'judge-cha-cha',
  title: 'Fiery and Cheeky',
  summary:
    'The Cha Cha’s character is fiery, flirtatious and cheeky. Learn to judge that playful attitude apart from technique.',
  difficulty: 'medium',
  learningObjectives: [
    'Describe the Cha Cha’s intended character',
    'Judge playful attitude apart from technique',
    'Spot a Cha Cha danced with the wrong energy',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Cha Cha is cheeky — a flirtatious, fiery back-and-forth. A polite, reserved Cha Cha, however clean, has lost its character.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jcc-005-c1',
      type: 'multiple-choice',
      title: 'Too Polite',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'cha-cha', 'character'],
      storyContext:
        'A couple dances the Cha Cha figures accurately but with reserved, formal, almost apologetic energy — no cheek, no flirtation, no fire.',
      prompt: 'How does the character lens read this?',
      options: [
        {
          id: 'a',
          label: 'Higher — restraint and formality read as elegance.',
          isCorrect: false,
          feedback:
            'Elegance and formality are the Waltz’s character. For the Cha Cha, reserved energy is the wrong mood.',
        },
        {
          id: 'b',
          label: 'Unchanged — correct figures fix the character score at full.',
          isCorrect: false,
          feedback:
            'Character is its own lens. Correct figures do not supply the cheeky, fiery attitude the Cha Cha wants.',
        },
        {
          id: 'c',
          label: 'Lower — the Cha Cha’s character is fiery, flirtatious and cheeky, and a reserved, apologetic energy is the wrong personality.',
          isCorrect: true,
          feedback:
            'Correct. Accurate figures with the wrong energy is a character fault: this reads as a rehearsal, not a Cha Cha.',
        },
        {
          id: 'd',
          label: 'Higher on motion — restraint shows body control.',
          isCorrect: false,
          feedback:
            'Attitude and energy are the character lens; reserved energy is the wrong mood, and it would not lift motion.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the energy the energy a Cha Cha calls for?' },
        { level: 2, title: 'Concept', content: 'Character rewards the RIGHT mood — here, fiery and cheeky.' },
        { level: 3, title: 'Specific clue', content: 'Reserved and apologetic is the opposite of cheeky.' },
        { level: 4, title: 'Guided solution', content: 'Choose the lower character score for the wrong energy.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Mood judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding reserved energy would blur the Cha Cha’s fiery identity into something else.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Right figures, wrong mood — a character fault. The Cha Cha wants cheek.',
      failureFeedback: 'The Cha Cha’s character is fiery and cheeky; reserved, apologetic energy is the wrong mood.',
    },
    {
      id: 'jcc-005-c2',
      type: 'multiple-choice',
      title: 'Cheeky, Not Chaotic',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'cha-cha', 'character'],
      storyContext:
        'A couple brings huge, wild energy — but so uncontrolled that the fire spills into sloppy technique and a loss of the crisp chasse.',
      prompt: 'How should the character lens (and your overall read) treat energy that has become chaos?',
      options: [
        {
          id: 'a',
          label: 'Reward the character fully — the more fire, the better, whatever happens to technique.',
          isCorrect: false,
          feedback:
            'Fire is welcome, but character is expressive control, not chaos; and the sloppy technique still scores down on its own lenses.',
        },
        {
          id: 'b',
          label: 'Mark everything down to zero — wild energy ruins the whole performance.',
          isCorrect: false,
          feedback:
            'Too blunt. The energy has value; you credit the fire on character while marking the technical lapses on their own lenses.',
        },
        {
          id: 'c',
          label: 'Credit the fiery character, but let the lost crisp chasse and sloppy figures score down on rhythm and signature figures — energy does not excuse technique.',
          isCorrect: true,
          feedback:
            'Right. Character can be strong while rhythm and figures are marked down; the lenses stay independent.',
        },
        {
          id: 'd',
          label: 'Move it all to the character lens — technique is irrelevant when the energy is this big.',
          isCorrect: false,
          feedback:
            'Technique is never irrelevant. The lost chasse and sloppy figures belong to their own lenses regardless of energy.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does big energy excuse lost technique?' },
        { level: 2, title: 'Concept', content: 'Character and technique are independent lenses.' },
        { level: 3, title: 'Specific clue', content: 'Credit the fire; mark the lost chasse on rhythm/figures.' },
        { level: 4, title: 'Guided solution', content: 'Choose crediting character while faulting the technical lapses.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Energy weighed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Letting energy excuse technique would make your marks swing away from the panel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Fire credited, sloppy technique still marked. The lenses stayed independent.',
      failureFeedback: 'Credit the fiery character, but let the lost chasse and sloppy figures score down on their own lenses.',
    },
  ],
  reflectionPrompt: 'How would you coach a couple to be "cheeky but not chaotic" in a Cha Cha?',
  rewards: [{ type: 'xp', amount: 5, label: 'Cha Cha character trained' }],
};
