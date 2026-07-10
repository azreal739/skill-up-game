import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — higher-order functions & composition (knowledge pack 01/02:
 * functions that return functions; pipelines over nesting).
 */
export const fnFp006Composition: MissionDefinition = {
  id: 'fp-006-composition',
  campaignId: 'fp-typescript',
  title: 'Functions That Make Functions',
  summary:
    'Close over configuration to build specialised functions, and read pipe order without reversing it in your head.',
  difficulty: 'medium',
  learningObjectives: [
    'Write a function that returns a configured function',
    'Predict what a closure captures',
    'Order steps correctly in a pipeline',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The lightbulb moment of the session: makeTaxer(0.15) returning a ready-to-use taxer. Configuration goes in once; a specialised pure function comes out.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Then we composed them. The only recurring stumble was order: pipe(f, g) runs f first — data flows left to right, like reading.',
    },
  ],
  contextArtefacts: [
    {
      id: 'make-taxer',
      type: 'code',
      title: 'The factory from the whiteboard',
      language: 'ts',
      content:
        'function makeTaxer(rate: number) {\n  return (price: number) => price * (1 + rate);\n}\n\nconst vat = makeTaxer(0.15);\nconst luxury = makeTaxer(0.40);',
    },
  ],
  challenges: [
    {
      id: 'fp-006-c1',
      type: 'multiple-choice',
      title: 'What Does vat(200) Return?',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext: 'Prove you can read a closure before you write one.',
      prompt: 'vat(200) evaluates to…',
      options: [
        {
          id: 'a',
          label: '230 — vat closed over rate = 0.15 when makeTaxer created it, so 200 × 1.15.',
          isCorrect: true,
          feedback:
            'The returned arrow keeps its own rate — that captured value is the whole point of the factory.',
        },
        {
          id: 'b',
          label: '280 — the later makeTaxer(0.40) call updates rate for every taxer.',
          isCorrect: false,
          feedback:
            'Each call to makeTaxer creates a fresh closure — luxury’s 0.40 lives in a different capture than vat’s 0.15.',
        },
        {
          id: 'c',
          label: 'NaN — rate no longer exists once makeTaxer has returned.',
          isCorrect: false,
          feedback:
            'Closures are exactly the mechanism that keeps rate alive after the outer function returns.',
        },
        {
          id: 'd',
          label: 'A function — vat(200) returns another taxer awaiting a rate.',
          isCorrect: false,
          feedback:
            'makeTaxer is one level deep: it returns the price function, and vat(200) runs it to a number.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which rate was in scope at the moment vat was created?' },
        {
          level: 2,
          title: 'Concept',
          content: 'A closure captures the variables of its creation site — each factory call captures fresh ones.',
        },
        { level: 3, title: 'Specific clue', content: 'luxury has its own rate. vat never sees it.' },
        { level: 4, title: 'Guided solution', content: '200 × (1 + 0.15) = 230. Pick the closure explanation.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Closure read' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Closures stayed spooky, and the factory pattern was avoided where it fit best.',
        },
      ],
      helpLinks: [{ topicId: 'fp.composition', label: 'Composition & closures' }],
      successFeedback: 'Configuration in once, specialised function out — you read it exactly right.',
      failureFeedback: 'Trace creation time, not call time: what value did rate hold when vat was born?',
    },
    {
      id: 'fp-006-c2',
      type: 'multiple-choice',
      title: 'Order the Pipeline',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext:
        'Steps: normalise (trim + lowercase), validate (Result), format (wrap valid emails). Requirement: normalise BEFORE validate, format last.',
      prompt: 'With pipe(f, g, h) running f first, which composition is correct?',
      options: [
        {
          id: 'a',
          label: 'pipe(validate, normalise, format)',
          isCorrect: false,
          feedback:
            'Validation sees raw " USER@X.COM  " before normalise runs — the order the requirement forbids.',
        },
        {
          id: 'b',
          label: 'pipe(format, validate, normalise)',
          isCorrect: false,
          feedback:
            'This is compose order (right to left) — with pipe it formats first, exactly backwards.',
        },
        {
          id: 'c',
          label: 'pipe(normalise, validate, format)',
          isCorrect: true,
          feedback:
            'Left to right like reading: clean, then judge, then present. pipe order is data order.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Say the requirement out loud, then write the functions in that order.' },
        {
          level: 2,
          title: 'Concept',
          content: 'pipe(f, g, h)(x) is h(g(f(x))) — the list reads in execution order.',
        },
        { level: 3, title: 'Specific clue', content: 'If you reversed it, you were thinking of compose.' },
        { level: 4, title: 'Guided solution', content: 'normalise → validate → format, verbatim in pipe.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Pipeline ordered' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Validation ran on un-normalised input and rejected legitimate sign-ups.',
        },
      ],
      helpLinks: [{ topicId: 'fp.composition', label: 'Composition & closures' }],
      successFeedback: 'pipe reads like the requirement — that alignment is why we compose at all.',
      failureFeedback: 'pipe is left-to-right execution. Write the requirement, then transcribe it.',
    },
  ],
  reflectionPrompt: 'What configuration in your code could become a factory-made function like makeTaxer?',
  rewards: [{ type: 'xp', amount: 10, label: 'Functions composed' }],
};
