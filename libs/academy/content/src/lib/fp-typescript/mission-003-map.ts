import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — map (knowledge pack 07: "Using map for side effects";
 * prevention: ask what array it returns and whether it is used).
 */
export const fnFp003Map: MissionDefinition = {
  id: 'fp-003-map',
  campaignId: 'fp-typescript',
  title: 'map Changes Data',
  summary: 'map transforms an array into a new array — if the result is ignored, it is the wrong tool.',
  difficulty: 'easy',
  learningObjectives: [
    'Use map for pure element-wise transformation',
    'Choose forEach (or a loop) for side effects',
    'Apply the “what array does this return?” review question',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'Half the room used map as “a nicer for loop”. The tell: a map whose return value nobody assigns. That is a side-effect loop wearing a transformation’s clothes.',
    },
    {
      speaker: 'Team Lead',
      text: 'The review question we adopted: what array does this map return, and are we using it? No answer, no map.',
    },
  ],
  contextArtefacts: [
    {
      id: 'prices',
      type: 'code',
      title: 'From the session: prices with tax',
      language: 'ts',
      content: 'const prices = [100, 250, 400];\n// goal: a new array with 15% tax applied',
    },
  ],
  challenges: [
    {
      id: 'fp-003-c1',
      type: 'multiple-choice',
      title: 'Tax the Prices',
      difficulty: 'easy',
      tags: ['typescript'],
      storyContext: 'Produce withTax — every price times 1.15 — leaving prices untouched.',
      prompt: 'Which line is the right use of map?',
      options: [
        {
          id: 'a',
          label: 'prices.map((price, i) => (prices[i] = price * 1.15));',
          isCorrect: false,
          feedback:
            'Assigning back into prices mutates the input — a side effect smuggled inside a transformation.',
        },
        {
          id: 'b',
          label: 'const withTax = prices.map((price) => price * 1.15);',
          isCorrect: true,
          feedback:
            'Element in, element out, result assigned — this is exactly what map is for.',
        },
        {
          id: 'c',
          label: 'prices.map((price) => console.log(price * 1.15));',
          isCorrect: false,
          feedback:
            'The returned array is undefined[] and nobody uses it — logging is a job for forEach.',
        },
        {
          id: 'd',
          label: 'const withTax = prices.map((price) => { price * 1.15; });',
          isCorrect: false,
          feedback:
            'The braces swallow the value: no return means withTax is an array of undefined.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Ask the review question: what array comes back, and is it used?' },
        {
          level: 2,
          title: 'Concept',
          content: 'map calls your function per element and collects the RETURNED values into a new array.',
        },
        { level: 3, title: 'Specific clue', content: 'Watch for the missing return in the braces version — a classic.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Pick const withTax = prices.map(price => price * 1.15) — transformation assigned to a name.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Prices transformed' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'An arrow-with-braces map produced an array of undefined that reached the invoice.',
        },
      ],
      helpLinks: [{ topicId: 'fp.higher-order-functions', label: 'map, filter, reduce' }],
      successFeedback: 'New array out, input untouched, result used — textbook map.',
      failureFeedback: 'Two traps here: mutating the source, and forgetting to return inside braces.',
    },
    {
      id: 'fp-003-c2',
      type: 'multiple-choice',
      title: 'The Ignored Return',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext:
        'Found in review: users.map((user) => auditLog.record(user.id)); — the result is never assigned.',
      prompt: 'What is the session-approved verdict?',
      options: [
        {
          id: 'a',
          label: 'Fine as-is: map is the modern replacement for every loop.',
          isCorrect: false,
          feedback:
            '“Modern” was never the argument — map signals transformation, and this transforms nothing.',
        },
        {
          id: 'b',
          label: 'Make it const results = users.map(...) so the return value is used somewhere.',
          isCorrect: false,
          feedback:
            'Assigning an array of ignored undefineds to a name is the same confusion with extra steps.',
        },
        {
          id: 'c',
          label: 'Wrap it in void users.map(...) to mark the return as intentionally discarded.',
          isCorrect: false,
          feedback:
            'void documents the smell without removing it — the reader is still told “transformation” where none exists.',
        },
        {
          id: 'd',
          label: 'Change it to users.forEach((user) => auditLog.record(user.id)); — this is a side effect, not a transformation.',
          isCorrect: true,
          feedback:
            'Exactly the checklist ruling: side effects get forEach or a loop; map is reserved for building new data.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is this code building data, or doing something?' },
        {
          level: 2,
          title: 'Concept',
          content: 'map’s contract is its return value. Code that ignores it is signalling the wrong intent.',
        },
        { level: 3, title: 'Specific clue', content: 'The fix changes the verb, not where the result goes.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose forEach — the tool whose contract is “do something per element, return nothing”.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Intent restored' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'map-as-loop spread through the codebase, and readers stopped trusting what map means.',
        },
      ],
      helpLinks: [{ topicId: 'fp.higher-order-functions', label: 'map, filter, reduce' }],
      successFeedback: 'map changes data; forEach observes it. The next reader thanks you.',
      failureFeedback: 'The question is intent: no new data is being built here, so map is the wrong signal.',
    },
  ],
  reflectionPrompt: 'Search your memory for a map whose result nobody used. What was it really doing?',
  rewards: [{ type: 'xp', amount: 10, label: 'Right tool, right verb' }],
};
