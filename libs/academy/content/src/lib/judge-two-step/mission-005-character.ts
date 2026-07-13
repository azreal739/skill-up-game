import { MissionDefinition } from '@academy/content-model';

/** Two Step module mission 5 — character: cool, smooth, easy, effortless. */
export const judgeTwoStep005Character: MissionDefinition = {
  id: 'judge-two-step-005-character',
  campaignId: 'judge-two-step',
  title: 'Cool and Effortless',
  summary:
    'The Two Step’s character is cool, smooth, easy and effortless. Learn to judge that understated confidence apart from technique — and to spot when it is missing.',
  difficulty: 'medium',
  learningObjectives: [
    'Describe the Two Step’s intended character',
    'Judge effortless cool apart from technique',
    'Spot a Two Step danced with the wrong mood',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'The Two Step is cool and effortless — understated country confidence, not flashy or frantic. A tense, over-worked Two Step, however clean, has lost its character.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jts-005-c1',
      type: 'multiple-choice',
      title: 'Tense and Frantic',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'two-step', 'character'],
      storyContext:
        'A couple dances the Two Step figures accurately but with tense, effortful, frantic energy — visibly working hard, nothing easy or cool about it.',
      prompt: 'How does the character lens read this?',
      options: [
        {
          id: 'a',
          label: 'Higher — visible effort shows commitment.',
          isCorrect: false,
          feedback:
            'Frantic effort is the wrong mood for a Two Step; its character is cool, easy and effortless.',
        },
        {
          id: 'b',
          label: 'Unchanged — correct figures fix the character score.',
          isCorrect: false,
          feedback:
            'Character is its own lens; correct figures do not supply the cool, effortless ease the dance needs.',
        },
        {
          id: 'c',
          label: 'Lower — the Two Step’s character is cool, smooth and effortless, and tense, frantic energy is the wrong mood.',
          isCorrect: true,
          feedback:
            'Correct. Accurate figures with the wrong energy is a character fault: this reads as effortful, not a cool Two Step.',
        },
        {
          id: 'd',
          label: 'Higher on motion — tension shows control.',
          isCorrect: false,
          feedback:
            'Energy and mood are the character lens, and tense franticness is the wrong mood, not a motion credit.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the energy the energy a Two Step calls for?' },
        { level: 2, title: 'Concept', content: 'Character rewards the RIGHT mood — here, cool and effortless.' },
        { level: 3, title: 'Specific clue', content: 'Tense franticness is the opposite of easy cool.' },
        { level: 4, title: 'Guided solution', content: 'Choose the lower character score for the wrong mood.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Mood judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding tense franticness would blur the Two Step’s cool, effortless identity.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Right figures, wrong mood — a character fault. The Two Step is cool and effortless.',
      failureFeedback: 'The Two Step’s character is cool, smooth and effortless; tense, frantic energy is the wrong mood.',
    },
    {
      id: 'jts-005-c2',
      type: 'multiple-choice',
      title: 'Effortless, Not Lazy',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'two-step', 'character'],
      storyContext:
        'A couple looks so relaxed and casual that the ease tips into laziness — the drive goes soft, the steps stop reaching, and the travel down the floor slows to a stroll.',
      prompt: 'How should you weigh cool that has tipped into laziness?',
      options: [
        {
          id: 'a',
          label: 'Full character marks — the more relaxed, the cooler, whatever else happens.',
          isCorrect: false,
          feedback:
            'Cool is welcome, but a soft drive and stalled travel still score down on their own lenses.',
        },
        {
          id: 'b',
          label: 'Reserve the top character marks for effortless cool that still drives — and let the soft drive (motion) and stalled travel (structure) score down on their own lenses.',
          isCorrect: true,
          feedback:
            'Right. Character can read cool while motion and structure are marked; the lenses stay independent.',
        },
        {
          id: 'c',
          label: 'Zero everywhere — a lazy Two Step ruins the whole performance.',
          isCorrect: false,
          feedback:
            'Too blunt; the cool ease has value. Credit it on character while marking the soft drive and stall.',
        },
        {
          id: 'd',
          label: 'Ignore the stall — looking relaxed is the whole point.',
          isCorrect: false,
          feedback:
            'Looking cool does not excuse a Two Step that stops driving; the motion and travel are judged on their own.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does looking relaxed excuse a soft, stalling drive?' },
        { level: 2, title: 'Concept', content: 'Character and motion/structure are independent lenses.' },
        { level: 3, title: 'Specific clue', content: 'Credit effortless cool; mark the soft drive and stall.' },
        { level: 4, title: 'Guided solution', content: 'Choose crediting cool while faulting the soft drive and stall.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Ease weighed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Letting cool excuse a stalling drive would make your marks swing away from the panel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Cool credited, soft drive and stall still marked. Lenses independent.',
      failureFeedback: 'Reward effortless cool that still drives, but a soft drive and stalled travel score down on their own lenses.',
    },
  ],
  reflectionPrompt: 'How would you coach a couple to be "effortless but not lazy" in a Two Step?',
  rewards: [{ type: 'xp', amount: 5, label: 'Two Step character trained' }],
};
