import { MissionDefinition } from '@academy/content-model';

/** Final Certification mission 5 — station: figures and structure. */
export const judgeFinal005FiguresStructure: MissionDefinition = {
  id: 'judge-final-005-figures-structure',
  campaignId: 'judge-final-cert',
  title: 'Station 4 — Figures & Structure',
  summary: 'Confirm the right vocabulary and the right use of the floor for each dance.',
  difficulty: 'hard',
  learningObjectives: [
    'Confirm signature figures belong to the claimed dance',
    'Apply the correct spatial expectation',
    'Keep figures and structure distinct',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Fourth station: figures and structure. Do the figures match the claimed dance, and does the couple use the floor the way that dance demands?',
    },
  ],
  contextArtefacts: [],
  challenges: [
    {
      id: 'jf-005-c1',
      type: 'multiple-choice',
      title: 'Right Dance, Wrong Structure',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'spatial-structure'],
      storyContext:
        'A Waltz couple dances correct box and twinkle figures, but stays rooted in one corner, rotating on the spot and never travelling.',
      prompt: 'How does this score across figures and structure?',
      options: [
        {
          id: 'a',
          label: 'Figures fine, structure fine — staying put shows control.',
          isCorrect: false,
          feedback:
            'The Waltz is progressive; staying rooted is a structural fault, not control.',
        },
        {
          id: 'b',
          label: 'Figures credited (box and twinkle are correct Waltz figures), but spatial structure marked down — a progressive Waltz must travel the line of dance.',
          isCorrect: true,
          feedback:
            'Correct. The figures are right; the failure to progress is a separate spatial-structure fault.',
        },
        {
          id: 'c',
          label: 'Figures marked down — staying put means the figures were wrong.',
          isCorrect: false,
          feedback:
            'The box and twinkle were correct figures; the fault is the travel, not the figures.',
        },
        {
          id: 'd',
          label: 'Both marked down to zero — a rooted Waltz fails everything.',
          isCorrect: false,
          feedback:
            'One structural fault does not erase correct figures and the other strong lenses.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Were the figures wrong, or the use of the floor?' },
        { level: 2, title: 'Concept', content: 'Figures and structure are separate lenses.' },
        { level: 3, title: 'Specific clue', content: 'Correct figures, but a progressive dance that never travels.' },
        { level: 4, title: 'Guided solution', content: 'Choose figures credited, structure marked down.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Lenses split' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Merging figures and structure would put your marks out of line with the panel.',
        },
      ],
      helpLinks: [{ topicId: 'dance.waltz', label: 'Judging the Waltz' }],
      successFeedback: 'Figures credited, structure faulted — kept apart. Correct.',
      failureFeedback: 'Correct figures with no travel: credit the figures, mark spatial structure down.',
    },
    {
      id: 'jf-005-c2',
      type: 'multiple-choice',
      title: 'Borrowed Figures',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'signature-figures'],
      storyContext:
        'A couple claims a Cha Cha but performs push, pass and whip figures throughout, in a slot, with an anchored settle.',
      prompt: 'What is the correct judgement?',
      options: [
        {
          id: 'a',
          label: 'A perfect Cha Cha — plenty of figures were shown.',
          isCorrect: false,
          feedback:
            'The figures shown are West Coast Swing, not Cha Cha; quantity is not the point.',
        },
        {
          id: 'b',
          label: 'A strong Cha Cha with adventurous vocabulary.',
          isCorrect: false,
          feedback:
            'Push/pass/whip are not adventurous Cha Cha — they are a different dance’s vocabulary.',
        },
        {
          id: 'c',
          label: 'Cha Cha not evidenced — the figures and slot structure are West Coast Swing, not the claimed Cha Cha; the signature-figures lens fails badly.',
          isCorrect: true,
          feedback:
            'Correct. The vocabulary defines the dance; a "Cha Cha" made of WCS figures fails the figures lens.',
        },
        {
          id: 'd',
          label: 'Only a timing issue — the figures are fine, just mislabelled.',
          isCorrect: false,
          feedback:
            'Mislabelled figures are exactly a signature-figures failure, not a timing footnote.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Whose figures are push, pass and whip?' },
        { level: 2, title: 'Concept', content: 'The vocabulary must match the claimed dance.' },
        { level: 3, title: 'Specific clue', content: 'Push/pass/whip in a slot is West Coast Swing.' },
        { level: 4, title: 'Guided solution', content: 'Choose that the Cha Cha is not evidenced.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Vocabulary checked' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Passing WCS figures as a Cha Cha would let any dance masquerade as another.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'WCS figures do not make a Cha Cha. The figures lens failed it, correctly.',
      failureFeedback: 'Push/pass/whip in a slot is West Coast Swing; a "Cha Cha" made of them fails the figures lens.',
    },
  ],
  reflectionPrompt: 'How quickly can you rule out a claimed dance purely from the figures on the floor?',
  rewards: [{ type: 'xp', amount: 5, label: 'Station 4 cleared' }],
};
