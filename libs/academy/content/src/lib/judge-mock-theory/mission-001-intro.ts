import { MissionDefinition } from '@academy/content-model';

/** Dance Academy — Judge Path, Mock Theory Exam module mission 1. */
export const judgeTheory001Intro: MissionDefinition = {
  id: 'judge-theory-001-intro',
  campaignId: 'judge-mock-theory',
  title: 'Sitting the Theory Paper',
  summary:
    'Before the practical certification comes the theory paper. Learn how it is marked, then revise everything the dances taught you.',
  difficulty: 'medium',
  learningObjectives: [
    'Understand how the theory exam is marked',
    'Recall the six lenses as an exam framework',
    'Approach recall questions methodically',
  ],
  briefing: [
    {
      speaker: 'Head Judge',
      text: 'The theory paper checks that you can name what you have been watching: the time signatures, rhythms, motions, characters, figures and structures of every dance you have studied.',
    },
    {
      speaker: 'Mentor Judge',
      text: 'Answer from the criteria, not from a hunch. If you can say which lens a question belongs to, you are halfway to the mark.',
    },
  ],
  contextArtefacts: [
    {
      id: 'exam-rubric',
      type: 'message',
      title: 'How the paper is marked',
      content:
        'Every question maps to one of the six lenses: Timing · Rhythm · Motion · Character · Signature Figures · Spatial Structure. Name the lens, then answer from what that lens actually judges.',
    },
  ],
  challenges: [
    {
      id: 'jt-001-c1',
      type: 'multiple-choice',
      title: 'Which Lens Is This?',
      difficulty: 'easy',
      tags: ['dance', 'judging'],
      storyContext:
        'An exam question asks: "In which time signature is the Waltz danced?"',
      prompt: 'Which lens does this question test?',
      options: [
        {
          id: 'a',
          label: 'Character.',
          isCorrect: false,
          feedback:
            'Character is the dance’s personality; a time signature is not about personality.',
        },
        {
          id: 'b',
          label: 'Timing.',
          isCorrect: true,
          feedback:
            'Correct. Time signature is a timing matter — the Waltz is in 3/4.',
        },
        {
          id: 'c',
          label: 'Signature figures.',
          isCorrect: false,
          feedback:
            'Signature figures are the named shapes of a dance, not its time signature.',
        },
        {
          id: 'd',
          label: 'Spatial structure.',
          isCorrect: false,
          feedback:
            'Spatial structure is how the couple uses the floor, not the time signature.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What does a time signature describe?' },
        { level: 2, title: 'Concept', content: 'Time signature belongs to the timing lens.' },
        { level: 3, title: 'Specific clue', content: 'The Waltz is 3/4 — a timing fact.' },
        { level: 4, title: 'Guided solution', content: 'Choose Timing.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Lens identified' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 4,
          reason: 'Mapping questions to the wrong lens would scatter your revision and your answers.',
        },
      ],
      helpLinks: [{ topicId: 'judging.criteria', label: 'The Six Judging Lenses' }],
      successFeedback: 'Time signature → timing. Naming the lens is half the mark.',
      failureFeedback: 'A time signature is a timing fact — it belongs to the timing lens.',
    },
    {
      id: 'jt-001-c2',
      type: 'multiple-choice',
      title: 'Answer From the Criteria',
      difficulty: 'medium',
      tags: ['dance', 'judging'],
      storyContext:
        'A question asks why a couple who danced beautifully but with the wrong energy for the dance still lost marks.',
      prompt: 'What is the best exam answer?',
      options: [
        {
          id: 'a',
          label: 'They must have been off the beat somewhere the judge noticed.',
          isCorrect: false,
          feedback:
            'The question says the energy was wrong, not the timing. Do not invent a different fault.',
        },
        {
          id: 'b',
          label: 'The judge simply did not like their style.',
          isCorrect: false,
          feedback:
            'A defensible answer cites criteria, not the judge’s taste. Wrong energy is a character matter.',
        },
        {
          id: 'c',
          label: 'Beautiful dancing cannot lose marks, so the premise is wrong.',
          isCorrect: false,
          feedback:
            'Beautiful-but-wrong-character is a very common, very real deduction. The premise stands.',
        },
        {
          id: 'd',
          label: 'The character lens marks the wrong energy down, independently of clean technique on the other lenses.',
          isCorrect: true,
          feedback:
            'Correct. Lenses are scored independently: strong technique with the wrong character still loses character marks.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which lens does "wrong energy" belong to?' },
        { level: 2, title: 'Concept', content: 'Lenses are scored independently.' },
        { level: 3, title: 'Specific clue', content: 'Wrong energy is a character deduction.' },
        { level: 4, title: 'Guided solution', content: 'Choose the character-lens answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Criteria answer given' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Answering from hunches rather than criteria would cost marks across the paper.',
        },
      ],
      helpLinks: [{ topicId: 'judging.process', label: 'The Judging Process' }],
      successFeedback: 'Answered from the criteria: wrong energy is a character deduction. That is the exam method.',
      failureFeedback: 'Answer from the criteria — wrong energy is a character-lens deduction, independent of technique.',
    },
  ],
  reflectionPrompt: 'Which of the six lenses do you feel least confident recalling facts about, and how will you revise it?',
  rewards: [{ type: 'xp', amount: 5, label: 'Theory paper opened' }],
};
