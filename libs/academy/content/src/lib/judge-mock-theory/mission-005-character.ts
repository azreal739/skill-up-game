import { MissionDefinition } from '@academy/content-model';

/** Mock Theory mission 5 — character recall across dances. */
export const judgeTheory005Character: MissionDefinition = {
  id: 'judge-theory-005-character',
  campaignId: 'judge-mock-theory',
  title: 'Paper IV — Character',
  summary: 'Revise the personality each dance is meant to project.',
  difficulty: 'medium',
  learningObjectives: [
    'Match each dance to its character',
    'Distinguish regal from cheeky from romantic from cool',
    'Recognise character described in exam language',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Regal, romantic, cool, cheeky — each dance has a personality. The exam expects you to name it and tell them apart.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jt-005-c1',
      type: 'multiple-choice',
      title: 'Match the Character',
      difficulty: 'easy',
      tags: ['dance', 'judging', 'character'],
      storyContext: 'An exam question pairs each dance with its intended character.',
      prompt: 'Which pairing is correct?',
      options: [
        {
          id: 'a',
          label: 'Waltz → fiery and cheeky.',
          isCorrect: false,
          feedback:
            'Fiery and cheeky is the Cha Cha. The Waltz is elegant, formal and regal.',
        },
        {
          id: 'b',
          label: 'Nightclub → soft, fluid and romantic.',
          isCorrect: true,
          feedback:
            'Correct. The Nightclub’s character is soft, fluid and romantic.',
        },
        {
          id: 'c',
          label: 'Cha Cha → cool and conversational.',
          isCorrect: false,
          feedback:
            'Cool and conversational is West Coast Swing. The Cha Cha is fiery and flirtatious.',
        },
        {
          id: 'd',
          label: 'West Coast Swing → elegant and regal.',
          isCorrect: false,
          feedback:
            'Elegant and regal is the Waltz. WCS is cool, grounded and conversational.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which dance is soft and romantic?' },
        { level: 2, title: 'Concept', content: 'Match each dance to its personality.' },
        { level: 3, title: 'Specific clue', content: 'Romantic and contained points to one dance.' },
        { level: 4, title: 'Guided solution', content: 'Choose Nightclub → soft, fluid, romantic.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Character matched' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 4,
          reason: 'Confusing characters would misjudge the character lens live.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Nightclub → romantic. Matched.',
      failureFeedback: 'Nightclub is romantic; Waltz regal, WCS cool/conversational, Cha Cha fiery/cheeky.',
    },
    {
      id: 'jt-005-c2',
      type: 'multiple-choice',
      title: 'Character in Exam Language',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'character'],
      storyContext:
        'A question describes a dance whose character should feel "grounded, understated, and like a private conversation between the partners rather than a show for the crowd".',
      prompt: 'Which dance is being described?',
      options: [
        {
          id: 'a',
          label: 'Waltz.',
          isCorrect: false,
          feedback:
            'The Waltz is grand and regal, presented outward — not understated and private.',
        },
        {
          id: 'b',
          label: 'Cha Cha.',
          isCorrect: false,
          feedback:
            'The Cha Cha is fiery and flirtatious, played outward — the opposite of understated.',
        },
        {
          id: 'c',
          label: 'Nightclub.',
          isCorrect: false,
          feedback:
            'Nightclub is romantic and soft, but the "grounded, conversational, not-a-show" wording points to another dance.',
        },
        {
          id: 'd',
          label: 'West Coast Swing.',
          isCorrect: true,
          feedback:
            'Correct. Cool, grounded and conversational — a dialogue between partners — is the WCS character.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which character is a partner conversation, not a show?' },
        { level: 2, title: 'Concept', content: 'Read the description and map it to a personality.' },
        { level: 3, title: 'Specific clue', content: 'Grounded and conversational is one dance’s signature.' },
        { level: 4, title: 'Guided solution', content: 'Choose West Coast Swing.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Character read' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Misreading character descriptions would cost marks and misjudge the character lens.',
        },
      ],
      helpLinks: [{ topicId: 'dance.west-coast-swing', label: 'Judging the West Coast Swing' }],
      successFeedback: 'Grounded, conversational, not a show — West Coast Swing.',
      failureFeedback: 'A grounded, conversational character that is a dialogue rather than a show is West Coast Swing.',
    },
  ],
  reflectionPrompt: 'Which two dances’ characters are easiest to confuse in words, and how do they differ in practice?',
  rewards: [{ type: 'xp', amount: 5, label: 'Paper IV character done' }],
};
