import { MissionDefinition } from '@academy/content-model';

/** Samba module mission 5 — character: festive, joyful, carnival. */
export const judgeSamba005Character: MissionDefinition = {
  id: 'judge-samba-005-character',
  campaignId: 'judge-samba',
  title: 'Festive and Carnival',
  summary:
    'The Samba’s character is festive, joyful and carnival. Learn to judge that party energy apart from technique — and to spot when it is missing.',
  difficulty: 'medium',
  learningObjectives: [
    'Describe the Samba’s intended character',
    'Judge carnival energy apart from technique',
    'Spot a Samba danced with the wrong mood',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The Samba is carnival — festive, joyful, celebratory. A cool, buttoned-up Samba, however clean, has lost its character.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jsm-005-c1',
      type: 'multiple-choice',
      title: 'Too Cool',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'samba', 'character'],
      storyContext:
        'A couple dances the Samba figures accurately but with cool, reserved, buttoned-up energy — no festivity, no carnival joy.',
      prompt: 'How does the character lens read this?',
      options: [
        {
          id: 'a',
          label: 'Higher — cool reserve reads as sophistication.',
          isCorrect: false,
          feedback:
            'Cool reserve is the wrong mood for a Samba; its character is festive, joyful and carnival.',
        },
        {
          id: 'b',
          label: 'Unchanged — correct figures fix the character score.',
          isCorrect: false,
          feedback:
            'Character is its own lens; correct figures do not supply the festive, carnival joy the dance needs.',
        },
        {
          id: 'c',
          label: 'Higher on motion — reserve shows control.',
          isCorrect: false,
          feedback:
            'Energy and mood are the character lens, and cool reserve is the wrong mood, not a motion credit.',
        },
        {
          id: 'd',
          label: 'Lower — the Samba’s character is festive, joyful and carnival, and cool, reserved energy is the wrong mood.',
          isCorrect: true,
          feedback:
            'Correct. Accurate figures with the wrong energy is a character fault: this reads as buttoned-up, not a carnival Samba.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the energy the energy a Samba calls for?' },
        { level: 2, title: 'Concept', content: 'Character rewards the RIGHT mood — here, festive and carnival.' },
        { level: 3, title: 'Specific clue', content: 'Cool reserve is the opposite of festive joy.' },
        { level: 4, title: 'Guided solution', content: 'Choose the lower character score for the wrong mood.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Mood judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding cool reserve would blur the Samba’s festive, carnival identity.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Right figures, wrong mood — a character fault. The Samba is festive and carnival.',
      failureFeedback: 'The Samba’s character is festive, joyful and carnival; cool, reserved energy is the wrong mood.',
    },
    {
      id: 'jsm-005-c2',
      type: 'multiple-choice',
      title: 'Festive, Not Frantic',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'samba', 'character'],
      storyContext:
        'A couple brings huge, festive energy — but so uncontrolled that the bounce action turns into a wild flail and the syncopation gets sloppy.',
      prompt: 'How should you weigh festivity that has tipped into loss of control?',
      options: [
        {
          id: 'a',
          label: 'Reserve the top character marks for controlled festivity — and let the flailing bounce (motion) and sloppy syncopation (rhythm) score down on their own lenses.',
          isCorrect: true,
          feedback:
            'Right. Character can be strong while motion and rhythm are marked; the lenses stay independent.',
        },
        {
          id: 'b',
          label: 'Full character marks — the more festive, the better, whatever else happens.',
          isCorrect: false,
          feedback:
            'Festivity is welcome, but the flailing bounce and sloppy syncopation still score down on their own lenses.',
        },
        {
          id: 'c',
          label: 'Zero everywhere — uncontrolled energy ruins the whole performance.',
          isCorrect: false,
          feedback:
            'Too blunt; the festive energy has value. Credit it on character while marking the technical lapses.',
        },
        {
          id: 'd',
          label: 'Ignore the sloppiness — the crowd loved the energy.',
          isCorrect: false,
          feedback:
            'Crowd reaction is not the criterion; the flailing bounce and sloppy syncopation are real faults on their lenses.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does big festive energy excuse a flailing bounce?' },
        { level: 2, title: 'Concept', content: 'Character and technique are independent lenses.' },
        { level: 3, title: 'Specific clue', content: 'Credit controlled festivity; mark the flail and sloppy "a".' },
        { level: 4, title: 'Guided solution', content: 'Choose crediting controlled festivity while faulting the lapses.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Energy weighed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Letting festivity excuse a loss of control would make your marks swing away from the panel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Festivity credited, flail and sloppy "a" still marked. Lenses independent.',
      failureFeedback: 'Reward controlled festivity on character, but a flailing bounce and sloppy syncopation score down on their own lenses.',
    },
  ],
  reflectionPrompt: 'How would you coach a couple to be "festive but not frantic" in a Samba?',
  rewards: [{ type: 'xp', amount: 5, label: 'Samba character trained' }],
};
