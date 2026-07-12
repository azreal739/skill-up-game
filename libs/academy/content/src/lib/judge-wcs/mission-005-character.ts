import { MissionDefinition } from '@academy/content-model';

/** WCS module mission 5 — character: cool, grounded, conversational. */
export const judgeWcs005Character: MissionDefinition = {
  id: 'judge-wcs-005-character',
  campaignId: 'judge-wcs',
  title: 'Cool and Conversational',
  summary:
    'West Coast Swing’s character is cool, grounded and conversational — a dialogue between partners. Learn to judge it apart from technique.',
  difficulty: 'medium',
  learningObjectives: [
    'Describe the WCS character',
    'Judge partner conversation and connection',
    'Spot a WCS danced with the wrong energy',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'WCS is a conversation — a cool, grounded give-and-take between two dancers who listen to each other. Frantic or theatrical energy misses that character.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jws-005-c1',
      type: 'multiple-choice',
      title: 'Wrong Energy',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'west-coast-swing', 'character'],
      storyContext:
        'A couple performs WCS patterns accurately but with big, presentational, ballroom-theatrical flourishes aimed at the audience rather than each other.',
      prompt: 'How does the character lens read this?',
      options: [
        {
          id: 'a',
          label: 'Higher — playing to the audience always lifts character.',
          isCorrect: false,
          feedback:
            'Presentation to the crowd is not the WCS character. Its energy is a grounded conversation between partners.',
        },
        {
          id: 'b',
          label: 'Unchanged — correct patterns fix the character score at full.',
          isCorrect: false,
          feedback:
            'Character is its own lens. Correct patterns do not guarantee the cool, conversational energy WCS wants.',
        },
        {
          id: 'c',
          label: 'Lower — WCS character is cool, grounded and conversational, and big theatrical presentation is the wrong energy for it.',
          isCorrect: true,
          feedback:
            'Correct. Accurate figures with the wrong energy is a character fault: this reads as a show, not a conversation.',
        },
        {
          id: 'd',
          label: 'Higher on motion — big flourishes show strong body action.',
          isCorrect: false,
          feedback:
            'Energy and mood are the character lens, and theatrical presentation is the wrong mood here.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the energy aimed at the partner or the crowd?' },
        { level: 2, title: 'Concept', content: 'WCS character is a cool, grounded partner conversation.' },
        { level: 3, title: 'Specific clue', content: 'Big presentational flourishes are the wrong energy.' },
        { level: 4, title: 'Guided solution', content: 'Choose the lower character score for the wrong energy.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Energy judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding theatrical presentation would push WCS away from its grounded, conversational identity.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Right figures, wrong energy — a character fault. WCS is a conversation, not a show.',
      failureFeedback: 'WCS character is cool and conversational; big theatrical presentation is the wrong energy.',
    },
    {
      id: 'jws-005-c2',
      type: 'multiple-choice',
      title: 'Cool, Not Careless',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'west-coast-swing', 'character'],
      storyContext:
        'A couple keeps a cool look — but so detached that they barely connect or respond to each other, dancing side by side rather than together.',
      prompt: 'How should the character lens weigh "cool" that has become "disconnected"?',
      options: [
        {
          id: 'a',
          label: 'Marked down — WCS character is cool but connected; a detached, non-responsive couple is missing the conversation the dance is built on.',
          isCorrect: true,
          feedback:
            'Right. "Cool" is a texture, not the absence of connection; a disconnected couple scores down on character.',
        },
        {
          id: 'b',
          label: 'Full marks — the cooler and more detached, the better.',
          isCorrect: false,
          feedback:
            'Detachment is not the goal. WCS is a partner conversation; disconnection is a character weakness.',
        },
        {
          id: 'c',
          label: 'Full marks — low reactivity shows control and confidence.',
          isCorrect: false,
          feedback:
            'Ignoring your partner is not control. The lens wants a cool, connected dialogue, not a disconnected one.',
        },
        {
          id: 'd',
          label: 'It moves to the motion lens — connection is really a body-action question.',
          isCorrect: false,
          feedback:
            'Physical connection has a motion component, but partner responsiveness and dialogue are the character lens here.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is "cool" the same as "disconnected"?' },
        { level: 2, title: 'Concept', content: 'WCS character is cool AND connected.' },
        { level: 3, title: 'Specific clue', content: 'Dancing side by side is missing the conversation.' },
        { level: 4, title: 'Guided solution', content: 'Choose the character mark-down for disconnection.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Connection weighed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Treating detachment as cool would make character scores swing between judges.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Cool, but disconnected — a character mark-down. The conversation was missing.',
      failureFeedback: 'WCS character is cool but connected; a detached, non-responsive couple scores down.',
    },
  ],
  reflectionPrompt: 'How would you coach a couple to be "cool but not careless" in a West Coast Swing?',
  rewards: [{ type: 'xp', amount: 5, label: 'WCS character trained' }],
};
