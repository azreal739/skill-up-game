import { MissionDefinition } from '@academy/content-model';

/** Triple Two module mission 6 — signature figures: loops, laces, weaves. */
export const judgeTripleTwo006SignatureFigures: MissionDefinition = {
  id: 'judge-triple-two-006-signature-figures',
  campaignId: 'judge-triple-two',
  title: 'Loops, Laces, Weaves',
  summary:
    'The Triple Two weaves through loops, laces and weaves. Learn to confirm its vocabulary and that the figures keep flowing.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise core Triple Two figures',
    'Judge whether figures keep the continuous flow',
    'Rule out other dances’ vocabularies',
  ],
  briefing: [
    {
      speaker: 'Mentor Judge',
      text: 'Loops, laces, weaves — the Triple Two threads the couple together and apart while travelling. Check the figures are present and that they never stall the flow.',
    },
  ],
  contextArtefacts: [
    {
      id: 'tt-figures',
      type: 'message',
      title: 'Core Triple Two figures',
      content: 'Loops · Laces · Weaves — threading figures that travel and flow.',
    },
  ],
  challenges: [
    {
      id: 'jtt-006-c1',
      type: 'multiple-choice',
      title: 'Whose Figures?',
      difficulty: 'medium',
      tags: ['dance', 'judging', 'triple-two', 'signature-figures'],
      storyContext: 'Four figure sets are proposed as "core Triple Two figures".',
      prompt: 'Which set is genuinely Triple Two vocabulary?',
      options: [
        {
          id: 'a',
          label: 'Loops, laces, weaves.',
          isCorrect: true,
          feedback:
            'Correct — loops, laces and weaves are the threading figures of the Triple Two.',
        },
        {
          id: 'b',
          label: 'Push, pass, whip.',
          isCorrect: false,
          feedback:
            'Those are West Coast Swing (slot) figures, not the Triple Two.',
        },
        {
          id: 'c',
          label: 'Box, twinkle, fallaway.',
          isCorrect: false,
          feedback:
            'Those are Waltz figures — a different progressive dance’s vocabulary.',
        },
        {
          id: 'd',
          label: 'New Yorker, spot turn, cucaracha.',
          isCorrect: false,
          feedback:
            'Those are Cha Cha / Latin figures, not the Triple Two.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which names describe threading, weaving figures?' },
        { level: 2, title: 'Concept', content: 'Signature figures identify the dance.' },
        { level: 3, title: 'Specific clue', content: 'Loops and laces thread the couple together and apart.' },
        { level: 4, title: 'Guided solution', content: 'Choose loops, laces, weaves.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Vocabulary known' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 5,
          reason: 'Not knowing the vocabulary would let another dance’s figures pass as a Triple Two.',
        },
      ],
      helpLinks: [{ topicId: 'judging.signature-figures', label: 'Signature Figures' }],
      successFeedback: 'Loops, laces, weaves — the Triple Two by its figures.',
      failureFeedback: 'Triple Two figures are loops, laces and weaves; the others belong to other dances.',
    },
    {
      id: 'jtt-006-c2',
      type: 'multiple-choice',
      title: 'A Figure That Stalls',
      difficulty: 'hard',
      tags: ['dance', 'judging', 'triple-two', 'signature-figures'],
      storyContext:
        'A couple performs a correct lace, but stops travelling and pauses in place to complete it, breaking the continuous progression.',
      prompt: 'How does the signature figures lens read a correct figure that stalls the flow?',
      options: [
        {
          id: 'a',
          label: 'Full marks — the lace was correct, and correctness is all the lens checks.',
          isCorrect: false,
          feedback:
            'Presence is not enough; in the Triple Two the figures must keep the continuous, travelling flow.',
        },
        {
          id: 'b',
          label: 'Zero — stalling means the figure did not count at all.',
          isCorrect: false,
          feedback:
            'Too blunt; the figure was recognisable. A stall reduces the score, it does not zero it.',
        },
        {
          id: 'c',
          label: 'Marked down — the lace is present but flawed, because Triple Two figures should thread while keeping the dance travelling, not pause in place.',
          isCorrect: true,
          feedback:
            'Correct. The figure is credited for presence but marked for breaking the continuous progression the dance needs.',
        },
        {
          id: 'd',
          label: 'It moves entirely to spatial structure — pausing is only about the floor path.',
          isCorrect: false,
          feedback:
            'It touches structure, but whether the specific figure keeps its flow is the signature-figures lens.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Should a Triple Two figure keep travelling?' },
        { level: 2, title: 'Concept', content: 'Figures are judged on correct execution, including keeping the flow.' },
        { level: 3, title: 'Specific clue', content: 'A lace that pauses in place breaks the progression.' },
        { level: 4, title: 'Guided solution', content: 'Choose the mark-down for the stalling figure.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Flow judged' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -3,
          reason: 'Full marks for a stalling figure would teach couples the flow does not matter.',
        },
      ],
      helpLinks: [
        { topicId: 'judging.signature-figures', label: 'Signature Figures' },
        { topicId: 'dance.triple-two', label: 'Judging the Triple Two' },
      ],
      successFeedback: 'Correct but stalling — marked down. The figure should keep travelling.',
      failureFeedback: 'Triple Two figures should thread while keeping the dance travelling; a figure that pauses in place is flawed.',
    },
  ],
  reflectionPrompt: 'Where is the line between a controlled, momentary shape and a figure that genuinely stalls the flow?',
  rewards: [{ type: 'xp', amount: 5, label: 'Triple Two figures trained' }],
};
