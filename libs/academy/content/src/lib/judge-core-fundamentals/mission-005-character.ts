import { MissionDefinition } from '@academy/content-model';

/** Core Fundamentals mission 5 — the Character lens. */
export const judgeCore005Character: MissionDefinition = {
  id: 'judge-core-005-character',
  campaignId: 'judge-core-fundamentals',
  title: 'The Personality of the Dance: The Character Lens',
  summary:
    'Every dance has a personality. Character judges whether the couple embodies it — not their costume, their carriage.',
  difficulty: 'medium',
  learningObjectives: [
    'Judge whether a couple embodies a dance’s personality',
    'Separate character from costume and technique',
    'Recognise a technically clean but characterless performance',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'A clean routine danced with the wrong energy reads as a rehearsal. Waltz is regal, Cha Cha is cheeky, Nightclub is romantic. Character is carriage and interpretation, not sequins.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jc-005-c1',
      type: 'multiple-choice',
      title: 'Clean, but Flat',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'character'],
      storyContext:
        'A Cha Cha couple hits every step, count and figure precisely — but with blank faces and no cheeky, flirtatious energy at all.',
      prompt: 'How should the character lens score this, given the technique is flawless?',
      options: [
        {
          id: 'a',
          label: 'High — flawless technique is the highest form of character.',
          isCorrect: false,
          feedback:
            'Technique is other lenses. Character asks whether the dance’s personality is present, and here it is missing.',
        },
        {
          id: 'b',
          label: 'High — character is subjective, so it should not really move the score.',
          isCorrect: false,
          feedback:
            'Character is a real, scorable lens. "Subjective" does not mean "ignore it" — it means judge it against the dance’s known personality.',
        },
        {
          id: 'c',
          label: 'Neutral — you cannot score character unless the couple is in costume.',
          isCorrect: false,
          feedback:
            'Character has nothing to do with costume. It is carriage, energy and interpretation, which this couple is not showing.',
        },
        {
          id: 'd',
          label: 'Lower on character specifically — Cha Cha’s cheeky, flirtatious personality is absent, however clean the steps are.',
          isCorrect: true,
          feedback:
            'Right. Character is its own lens: flawless-but-flat scores well on technique and low on character.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the dance’s personality on the floor?' },
        { level: 2, title: 'Concept', content: 'Character is scored separately from technique.' },
        { level: 3, title: 'Specific clue', content: 'Cha Cha should be cheeky and flirtatious; blank faces are not.' },
        { level: 4, title: 'Guided solution', content: 'Choose the option lowering character specifically.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Character judged apart from technique' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Letting clean technique cover for missing character would erase the lens entirely over a season.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Flawless and flat: high technique, low character. Two lenses, two scores.',
      failureFeedback: 'Character asks if the dance’s personality is present — clean steps do not supply it.',
    },
    {
      id: 'jc-005-c2',
      type: 'multiple-choice',
      title: 'Costume Is Not Character',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'character'],
      storyContext:
        'A couple arrives in a stunning, elaborate Waltz costume, but dances with slouched carriage and casual, offhand energy.',
      prompt: 'What does the character lens reward here?',
      options: [
        {
          id: 'a',
          label: 'Nothing extra — costume is not character; the slouched carriage and casual energy score low.',
          isCorrect: true,
          feedback:
            'Correct. Character is carriage, poise and interpretation. A gown cannot supply the regal energy the dancers are not.',
        },
        {
          id: 'b',
          label: 'A bonus — an elaborate costume signals commitment and lifts character.',
          isCorrect: false,
          feedback:
            'Presentation is not the character lens. Judges score the dancing’s personality, not the wardrobe budget.',
        },
        {
          id: 'c',
          label: 'Full marks — dressing the part is the main thing character measures.',
          isCorrect: false,
          feedback:
            'Dressing the part is not embodying it. The lens rewards regal carriage and interpretation, which are absent here.',
        },
        {
          id: 'd',
          label: 'It cannot be judged — costume makes character impossible to assess objectively.',
          isCorrect: false,
          feedback:
            'Look past the costume to the carriage and energy; those are perfectly judgeable, and here they are casual and slouched.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Separate the wardrobe from the dancing.' },
        { level: 2, title: 'Concept', content: 'Character is carriage and interpretation, not costume.' },
        { level: 3, title: 'Specific clue', content: 'Slouched, casual energy in a regal dance scores low regardless of the gown.' },
        { level: 4, title: 'Guided solution', content: 'Choose the option that says costume is not character.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Costume set aside' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Rewarding costume over carriage would tell couples that wardrobe beats dancing.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'You judged the carriage, not the couture. That is the character lens.',
      failureFeedback: 'Character lives in carriage and interpretation — a costume cannot supply energy the dancers lack.',
    },
  ],
  reflectionPrompt: 'How would you describe, in one sentence, the character a Waltz should project?',
  rewards: [{ type: 'xp', amount: 5, label: 'Character lens trained' }],
};
