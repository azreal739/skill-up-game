import { MissionDefinition } from '@academy/content-model';

/** Street module mission 5 — character: style-appropriate attitude and performance. */
export const judgeStreet005Character: MissionDefinition = {
  id: 'judge-street-005-character',
  campaignId: 'judge-street',
  title: 'Attitude and Performance',
  summary:
    'Street character is committed, style-appropriate attitude — waacking’s drama, voguing’s lines, dancehall’s groove. Learn to judge whether the performance carries the right attitude.',
  difficulty: 'medium',
  learningObjectives: [
    'Describe how character differs by street style',
    'Judge committed performance apart from technique',
    'Spot a style danced with the wrong attitude',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Each street style carries its own attitude — waacking is dramatic, voguing is sharp and fierce, dancehall is grounded and cool. Technique without the style’s attitude is only half the performance.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jst-005-c1',
      type: 'multiple-choice',
      title: 'Right Moves, No Attitude',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'street', 'character'],
      storyContext:
        'A performer executes waacking arm technique accurately but with a blank face and no drama or attitude — technically correct, emotionally empty.',
      prompt: 'How does the character lens read this?',
      options: [
        {
          id: 'a',
          label: 'Higher — a neutral delivery keeps the focus on the technique.',
          isCorrect: false,
          feedback:
            'Neutral delivery is the wrong read for waacking; its character is dramatic, and blank delivery misses it.',
        },
        {
          id: 'b',
          label: 'Lower — waacking’s character is dramatic and attitude-driven, and a blank, empty delivery is the wrong performance for the style.',
          isCorrect: true,
          feedback:
            'Correct. Accurate arms with no drama is a character fault: the style’s attitude is absent.',
        },
        {
          id: 'c',
          label: 'Unchanged — correct technique fixes the character score.',
          isCorrect: false,
          feedback:
            'Character is its own lens; correct arms do not supply the drama and attitude the style needs.',
        },
        {
          id: 'd',
          label: 'Higher on motion — a blank face shows control.',
          isCorrect: false,
          feedback:
            'Attitude and performance are the character lens, and a blank delivery is the wrong performance, not a motion credit.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does the performance carry the style’s attitude?' },
        { level: 2, title: 'Concept', content: 'Character rewards the RIGHT attitude for the style.' },
        { level: 3, title: 'Specific clue', content: 'Waacking is dramatic; blank delivery misses it.' },
        { level: 4, title: 'Guided solution', content: 'Choose the lower character score for the missing attitude.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Attitude judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding blank delivery would blur each street style’s defining attitude.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Right arms, no drama — a character fault. Waacking needs its attitude.',
      failureFeedback: 'Waacking’s character is dramatic and attitude-driven; a blank, empty delivery is the wrong performance for the style.',
    },
    {
      id: 'jst-005-c2',
      type: 'multiple-choice',
      title: 'Committed, Not Overacted',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'street', 'character'],
      storyContext:
        'A performer throws so much theatrical attitude — mugging, exaggerated faces — that the isolation gets sloppy and the hits lose their sharpness.',
      prompt: 'How should you weigh attitude that has tipped into overacting?',
      options: [
        {
          id: 'a',
          label: 'Full character marks — the more theatrical, the better, whatever else happens.',
          isCorrect: false,
          feedback:
            'Attitude is welcome, but the sloppy isolation and soft hits still score down on their own lenses.',
        },
        {
          id: 'b',
          label: 'Zero everywhere — overacting ruins the whole performance.',
          isCorrect: false,
          feedback:
            'Too blunt; the committed energy has value. Credit it on character while marking the technical lapses.',
        },
        {
          id: 'c',
          label: 'Ignore the sloppiness — big performance energy is what wins a crowd.',
          isCorrect: false,
          feedback:
            'Crowd energy is not the criterion; sloppy isolation and soft hits are real faults on their lenses.',
        },
        {
          id: 'd',
          label: 'Reserve the top character marks for committed attitude that stays clean — and let sloppy isolation (motion) and soft hits (timing) score down on their own lenses.',
          isCorrect: true,
          feedback:
            'Right. Character can be strong while motion and timing are marked; the lenses stay independent.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does big theatrical attitude excuse sloppy isolation?' },
        { level: 2, title: 'Concept', content: 'Character and technique are independent lenses.' },
        { level: 3, title: 'Specific clue', content: 'Credit committed clean attitude; mark the sloppy isolation and soft hits.' },
        { level: 4, title: 'Guided solution', content: 'Choose crediting committed clean attitude while faulting the lapses.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Performance weighed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Letting theatrics excuse sloppiness would make your marks swing away from the panel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Attitude credited, sloppy isolation and soft hits still marked. Lenses independent.',
      failureFeedback: 'Reward committed attitude that stays clean, but sloppy isolation and soft hits score down on their own lenses.',
    },
  ],
  reflectionPrompt: 'How would you coach a performer to be "committed but not overacted" in a street style?',
  rewards: [{ type: 'xp', amount: 5, label: 'Street character trained' }],
};
