import { MissionDefinition } from '@academy/content-model';

/** Triple Two module mission 5 — character: smooth, soft, romantic. */
export const judgeTripleTwo005Character: MissionDefinition = {
  id: 'judge-triple-two-005-character',
  campaignId: 'judge-triple-two',
  title: 'Smooth and Romantic',
  summary:
    'The Triple Two’s character is smooth, soft and romantic — but flowing down the floor. Learn to judge it apart from technique.',
  difficulty: 'medium',
  learningObjectives: [
    'Describe the Triple Two’s intended character',
    'Judge romantic flow apart from technique',
    'Spot energy that fights the smooth character',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Like the Nightclub, the Triple Two is romantic — but it travels. The character is continuous, soft flow, not sharp or staccato.',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jtt-005-c1',
      type: 'multiple-choice',
      title: 'Sharp Against Smooth',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'triple-two', 'character'],
      storyContext:
        'A couple dances the Triple Two figures accurately but with sharp, staccato, aggressive energy that breaks up the flow.',
      prompt: 'How does the character lens read this?',
      options: [
        {
          id: 'a',
          label: 'Higher — sharpness adds excitement.',
          isCorrect: false,
          feedback:
            'Sharp, aggressive energy is the wrong mood; the Triple Two’s character is smooth and continuous.',
        },
        {
          id: 'b',
          label: 'Lower — the Triple Two’s character is smooth and romantic, and sharp, staccato energy breaks the continuous flow it should have.',
          isCorrect: true,
          feedback:
            'Correct. Accurate figures with the wrong energy is a character fault: the flow is broken.',
        },
        {
          id: 'c',
          label: 'Unchanged — correct figures fix the character score.',
          isCorrect: false,
          feedback:
            'Character is its own lens; correct figures do not supply the smooth, romantic flow.',
        },
        {
          id: 'd',
          label: 'Higher on rhythm — sharp energy sharpens the triples.',
          isCorrect: false,
          feedback:
            'Energy and mood are the character lens; and staccato aggression is the wrong mood, not a rhythm credit.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the energy smooth or sharp?' },
        { level: 2, title: 'Concept', content: 'Character rewards the smooth, romantic flow.' },
        { level: 3, title: 'Specific clue', content: 'Staccato aggression breaks the continuous flow.' },
        { level: 4, title: 'Guided solution', content: 'Choose the lower character score for sharp energy.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Mood judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Rewarding sharp energy would blur the Triple Two’s smooth, romantic identity.',
        },
      ],
      helpLinks: [{ topicId: 'judging.character', label: 'Character and Expression' }],
      successFeedback: 'Right figures, wrong mood — a character fault. The Triple Two flows.',
      failureFeedback: 'The Triple Two’s character is smooth and romantic; sharp, staccato energy breaks its flow.',
    },
    {
      id: 'jtt-005-c2',
      type: 'multiple-choice',
      title: 'Romantic, but Which Dance?',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'triple-two', 'character'],
      storyContext:
        'A candidate says the Triple Two and the Nightclub have "the same romantic character, so they are judged the same on that lens".',
      prompt: 'Is that a safe assumption?',
      options: [
        {
          id: 'a',
          label: 'Yes — both are romantic, so the character lens treats them identically.',
          isCorrect: false,
          feedback:
            'Both are romantic, but the Triple Two’s romance flows and travels while the Nightclub’s is contained and still — the expression differs.',
        },
        {
          id: 'b',
          label: 'Yes — romance is romance, regardless of the dance.',
          isCorrect: false,
          feedback:
            'The character lens judges romance as expressed BY that dance; a travelling flow reads differently from a contained sway.',
        },
        {
          id: 'c',
          label: 'No — both are romantic, but the Triple Two expresses it through continuous travelling flow, while the Nightclub expresses it through contained, base-driven sway.',
          isCorrect: true,
          feedback:
            'Correct. Same broad mood, different expression; a Triple Two danced with a static Nightclub feel is not quite right.',
        },
        {
          id: 'd',
          label: 'No — the Triple Two is not romantic at all.',
          isCorrect: false,
          feedback:
            'The Triple Two is romantic; the point is that it expresses that romance while travelling, unlike the contained Nightclub.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Do both dances express romance the same way?' },
        { level: 2, title: 'Concept', content: 'Character is romance AS EXPRESSED by that dance.' },
        { level: 3, title: 'Specific clue', content: 'Triple Two flows and travels; Nightclub is contained.' },
        { level: 4, title: 'Guided solution', content: 'Choose the answer distinguishing the expression.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Expression distinguished' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Treating two dances’ characters as identical would blur how each should be judged.',
        },
      ],
      helpLinks: [
        { topicId: 'dance.triple-two', label: 'Judging the Triple Two' },
        { topicId: 'dance.nightclub', label: 'Judging the Nightclub' },
      ],
      successFeedback: 'Same mood, different expression — travelling flow versus contained sway.',
      failureFeedback: 'Both are romantic, but the Triple Two expresses it through travelling flow, the Nightclub through contained sway.',
    },
  ],
  reflectionPrompt: 'How would you tell a Triple Two danced with a "Nightclub" feel that it is missing something, in one sentence?',
  rewards: [{ type: 'xp', amount: 5, label: 'Triple Two character trained' }],
};
