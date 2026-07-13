import { MissionDefinition } from '@academy/content-model';

/** Stage module mission 5 — character: theatrical projection and era authenticity. */
export const judgeStage005Character: MissionDefinition = {
  id: 'judge-stage-005-character',
  campaignId: 'judge-stage',
  title: 'Projection and Authenticity',
  summary:
    'Stage character is theatrical projection and era authenticity — embodying the period and projecting it to the house. Learn to judge whether the performance sells the era.',
  difficulty: 'medium',
  learningObjectives: [
    'Describe theatrical projection and era character',
    'Judge performance apart from technique',
    'Spot a number that embodies the wrong era or fails to project',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'A stage number must be sold to the back row — projected — and it must embody its era. Correct steps with no projection, or the wrong era’s attitude, is a character fault.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jsg-005-c1',
      type: 'multiple-choice',
      title: 'Steps Without the House',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'stage', 'character'],
      storyContext:
        'A performer executes a Broadway number accurately but internally — eyes down, no projection, nothing reaching past the front of the stage to the audience.',
      prompt: 'How does the character lens read this?',
      options: [
        {
          id: 'a',
          label: 'Higher — an internal, understated delivery is more sincere.',
          isCorrect: false,
          feedback:
            'Internal delivery is the wrong read for Broadway; its character is projected outward to the house.',
        },
        {
          id: 'b',
          label: 'Unchanged — correct steps fix the character score.',
          isCorrect: false,
          feedback:
            'Character is its own lens; correct steps do not supply the projection the number needs.',
        },
        {
          id: 'c',
          label: 'Lower — Broadway character must be projected out to the house, and an internal delivery that never reaches the audience is a projection failure.',
          isCorrect: true,
          feedback:
            'Correct. Accurate steps with no projection is a character fault: the performance never reaches the audience.',
        },
        {
          id: 'd',
          label: 'Higher on motion — staying internal shows control.',
          isCorrect: false,
          feedback:
            'Projection and performance are the character lens, and an internal delivery is a projection fault, not a motion credit.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does the performance reach the audience?' },
        { level: 2, title: 'Concept', content: 'Character rewards theatrical projection to the house.' },
        { level: 3, title: 'Specific clue', content: 'Eyes down, nothing reaching past the stage front.' },
        { level: 4, title: 'Guided solution', content: 'Choose the lower character score for the projection failure.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Projection judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding an unprojected number would drop the standard for theatrical performance.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Right steps, no projection — a character fault. Sell it to the back row.',
      failureFeedback: 'Broadway character must be projected out to the house; an internal delivery that never reaches the audience is a projection failure.',
    },
    {
      id: 'jsg-005-c2',
      type: 'multiple-choice',
      title: 'Committed to the Era',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'stage', 'character'],
      storyContext:
        'A performer projects huge theatrical energy to the house — but the attitude is a generic modern "showface" that never commits to the specific 1970s Disco character the number calls for.',
      prompt: 'How should you weigh strong projection that misses the era’s character?',
      options: [
        {
          id: 'a',
          label: 'Full marks — big projection is all the character lens needs.',
          isCorrect: false,
          feedback:
            'Projection is half of it; character also asks whether the performer embodied the specific era, and here they did not.',
        },
        {
          id: 'b',
          label: 'Zero — a generic showface ruins the whole number.',
          isCorrect: false,
          feedback:
            'Too blunt; the projection has value. Credit the projection while marking the missing era authenticity.',
        },
        {
          id: 'c',
          label: 'Credit the strong projection, but mark down the era authenticity — a generic modern showface is not the specific 1970s Disco character the number calls for.',
          isCorrect: true,
          feedback:
            'Right. Projection is a credit; failing to embody the specific era is a separate deduction on the same lens.',
        },
        {
          id: 'd',
          label: 'Ignore the era — as long as the crowd is entertained, character is full marks.',
          isCorrect: false,
          feedback:
            'Entertainment is not the whole criterion; embodying the specific era is part of the character lens for Stage.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does big projection excuse missing the era’s character?' },
        { level: 2, title: 'Concept', content: 'Character is projection AND era authenticity.' },
        { level: 3, title: 'Specific clue', content: 'Credit the projection, mark the generic showface.' },
        { level: 4, title: 'Guided solution', content: 'Choose crediting projection while marking era authenticity.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Character weighed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Letting projection excuse a missing era character would make your marks swing away from the panel.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Projection credited, missing era character marked. Both live on the character lens.',
      failureFeedback: 'Credit the strong projection, but a generic modern showface is not the specific 1970s Disco character the number calls for.',
    },
  ],
  reflectionPrompt: 'How would you coach a performer who projects strongly but never commits to the specific era?',
  rewards: [{ type: 'xp', amount: 5, label: 'Stage character trained' }],
};
