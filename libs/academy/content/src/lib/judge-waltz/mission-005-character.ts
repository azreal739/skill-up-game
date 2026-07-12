import { MissionDefinition } from '@academy/content-model';

/** Waltz module mission 5 — character: elegant, formal, regal. */
export const judgeWaltz005Character: MissionDefinition = {
  id: 'judge-waltz-005-character',
  campaignId: 'judge-waltz',
  title: 'Regal Carriage',
  summary:
    'The Waltz is the most formal dance on the floor. Learn to judge its elegant, regal character apart from its technique.',
  difficulty: 'medium',
  learningObjectives: [
    'Describe the Waltz’s intended character',
    'Judge character apart from technique',
    'Spot a Waltz danced with the wrong energy',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'A Waltz should feel elegant, formal, regal — carriage lifted, presence calm and grand. A bouncy, casual Waltz has lost its character, however clean the feet.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jw-005-c1',
      type: 'multiple-choice',
      title: 'Wrong Energy',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'waltz', 'character'],
      storyContext:
        'A couple dances the Waltz figures accurately but with a bouncy, playful, grinning energy, as if it were a lively social dance.',
      prompt: 'How does the character lens read this?',
      options: [
        {
          id: 'a',
          label: 'High — energy and fun always lift the character score.',
          isCorrect: false,
          feedback:
            'Energy has to be the RIGHT energy. Playful bounce is not the Waltz’s elegant, regal character.',
        },
        {
          id: 'b',
          label: 'Lower — the Waltz’s character is elegant and regal, and a bouncy, playful energy is the wrong personality.',
          isCorrect: true,
          feedback:
            'Correct. Accurate figures with the wrong energy is a character fault: this reads as a social dance, not a Waltz.',
        },
        {
          id: 'c',
          label: 'Unchanged — as long as the figures are correct, character does not move.',
          isCorrect: false,
          feedback:
            'Character is its own lens with its own score. Correct figures do not guarantee correct character.',
        },
        {
          id: 'd',
          label: 'Higher on signature figures — the playful energy shows off the figures.',
          isCorrect: false,
          feedback:
            'Energy is a character matter, not a figures one; and the wrong energy would not raise any lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the energy the energy a Waltz calls for?' },
        { level: 2, title: 'Concept', content: 'Character is the RIGHT personality, not merely high energy.' },
        { level: 3, title: 'Specific clue', content: 'Bouncy and playful is a social-dance energy, not a regal Waltz.' },
        { level: 4, title: 'Guided solution', content: 'Choose the lower character score for the wrong energy.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Wrong energy caught' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding any high energy would erase the distinction between a Waltz and a social dance.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Right dance, wrong energy — a character fault, cleanly seen.',
      failureFeedback: 'Character rewards the RIGHT personality; a bouncy, playful Waltz has the wrong energy.',
    },
    {
      id: 'jw-005-c2',
      type: 'multiple-choice',
      title: 'Elegant but Empty?',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'waltz', 'character'],
      storyContext:
        'A couple holds a beautifully lifted, regal frame — but their faces and connection are completely blank, with no sense of grandeur or intent behind the posture.',
      prompt: 'How should the character lens weigh correct posture with no expression?',
      options: [
        {
          id: 'a',
          label: 'Full marks — a regal frame is the entire character score.',
          isCorrect: false,
          feedback:
            'Posture is part of it, but character is also presence and intent. A blank, empty frame is not full character.',
        },
        {
          id: 'b',
          label: 'Zero — without full expression, the posture counts for nothing at all.',
          isCorrect: false,
          feedback:
            'Too harsh. A genuinely regal frame is worth something; the missing presence lowers the score, not erases it.',
        },
        {
          id: 'c',
          label: 'It moves to the motion lens — posture is really about body action.',
          isCorrect: false,
          feedback:
            'Carriage and presence are the character lens. How the body produces movement is motion; how it carries and expresses is character.',
        },
        {
          id: 'd',
          label: 'Partial — the regal frame earns credit, but blank presence and connection hold the character score back.',
          isCorrect: true,
          feedback:
            'Right. Character rewards carriage AND presence; correct posture with empty expression lands between full and zero.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is character only posture, or posture plus presence?' },
        { level: 2, title: 'Concept', content: 'Character is carriage and presence together.' },
        { level: 3, title: 'Specific clue', content: 'A regal frame with a blank face is somewhere between full and zero.' },
        { level: 4, title: 'Guided solution', content: 'Choose the partial-credit option.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Presence weighed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Treating posture as the whole of character would make character scores swing between judges.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Frame credited, empty presence marked down. Character is carriage and intent together.',
      failureFeedback: 'Character rewards carriage AND presence — a regal frame with a blank face earns partial credit.',
    },
  ],
  reflectionPrompt: 'In one word each, how would you contrast the character of a Waltz with that of a Cha Cha?',
  rewards: [{ type: 'xp', amount: 5, label: 'Waltz character trained' }],
};
