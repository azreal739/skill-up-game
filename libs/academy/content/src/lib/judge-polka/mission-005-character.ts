import { MissionDefinition } from '@academy/content-model';

/** Polka module mission 5 — character: energetic, bright, country. */
export const judgePolka005Character: MissionDefinition = {
  id: 'judge-polka-005-character',
  campaignId: 'judge-polka',
  title: 'Bright and Country',
  summary:
    'The Polka’s character is energetic, bright and country. Learn to judge that exuberance apart from technique — and to spot when it is missing.',
  difficulty: 'medium',
  learningObjectives: [
    'Describe the Polka’s intended character',
    'Judge exuberance apart from technique',
    'Spot a Polka danced with the wrong mood',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The Polka is joyful, bright and country — big, exuberant energy. A polite, subdued Polka, however clean, has lost its character.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jpk-005-c1',
      type: 'multiple-choice',
      title: 'Too Subdued',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'polka', 'character'],
      storyContext:
        'A couple dances the Polka figures accurately but with restrained, cool, understated energy — no exuberance, no brightness.',
      prompt: 'How does the character lens read this?',
      options: [
        {
          id: 'a',
          label: 'Higher — restraint reads as sophistication.',
          isCorrect: false,
          feedback:
            'Cool restraint is the wrong mood for a Polka; its character is bright, energetic and country.',
        },
        {
          id: 'b',
          label: 'Lower — the Polka’s character is energetic, bright and country, and restrained, cool energy is the wrong mood.',
          isCorrect: true,
          feedback:
            'Correct. Accurate figures with the wrong energy is a character fault: this reads as reserved, not a Polka.',
        },
        {
          id: 'c',
          label: 'Unchanged — correct figures fix the character score.',
          isCorrect: false,
          feedback:
            'Character is its own lens; correct figures do not supply the bright, country exuberance.',
        },
        {
          id: 'd',
          label: 'Higher on motion — restraint shows control.',
          isCorrect: false,
          feedback:
            'Energy and mood are the character lens, and cool restraint is the wrong mood, not a motion credit.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the energy the energy a Polka calls for?' },
        { level: 2, title: 'Concept', content: 'Character rewards the RIGHT mood — here, bright and country.' },
        { level: 3, title: 'Specific clue', content: 'Cool restraint is the opposite of exuberant.' },
        { level: 4, title: 'Guided solution', content: 'Choose the lower character score for the wrong mood.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Mood judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding cool restraint would blur the Polka’s bright, country identity.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Right figures, wrong mood — a character fault. The Polka is bright and country.',
      failureFeedback: 'The Polka’s character is energetic and country; cool, restrained energy is the wrong mood.',
    },
    {
      id: 'jpk-005-c2',
      type: 'multiple-choice',
      title: 'Bright, Not Reckless',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'polka', 'character'],
      storyContext:
        'A couple brings huge, exuberant energy — but so uncontrolled that they nearly collide with others and their footwork turns sloppy.',
      prompt: 'How should you weigh energy that has tipped into recklessness?',
      options: [
        {
          id: 'a',
          label: 'Full character marks — the more energy, the better, whatever else happens.',
          isCorrect: false,
          feedback:
            'Exuberance is welcome, but the sloppy footwork and near-collisions still score down on their own lenses.',
        },
        {
          id: 'b',
          label: 'Zero everywhere — reckless energy ruins the whole performance.',
          isCorrect: false,
          feedback:
            'Too blunt; the bright energy has value. Credit it on character while marking the technical and floorcraft lapses.',
        },
        {
          id: 'c',
          label: 'Reserve the top character marks for controlled brightness — and let sloppy footwork (rhythm/figures) and near-collisions (floorcraft/structure) score down on their own lenses.',
          isCorrect: true,
          feedback:
            'Right. Character can be strong while rhythm, figures and floorcraft are marked; the lenses stay independent.',
        },
        {
          id: 'd',
          label: 'Ignore the collisions — the crowd loved the energy.',
          isCorrect: false,
          feedback:
            'Floorcraft is judged regardless of crowd reaction; near-collisions are a real spatial-structure fault.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does big energy excuse sloppiness and collisions?' },
        { level: 2, title: 'Concept', content: 'Character and technique/floorcraft are independent lenses.' },
        { level: 3, title: 'Specific clue', content: 'Credit controlled brightness; mark the lapses.' },
        { level: 4, title: 'Guided solution', content: 'Choose crediting controlled brightness while faulting the lapses.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Energy weighed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Letting energy excuse recklessness would make your marks swing away from the panel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Brightness credited, sloppiness and collisions still marked. Lenses independent.',
      failureFeedback: 'Reward controlled brightness on character, but sloppy footwork and near-collisions score down on their own lenses.',
    },
  ],
  reflectionPrompt: 'How would you coach a couple to be "bright but not reckless" in a Polka?',
  rewards: [{ type: 'xp', amount: 5, label: 'Polka character trained' }],
};
