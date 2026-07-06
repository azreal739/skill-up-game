import { MissionDefinition } from '@academy/content-model';

/**
 * Mission 4 — "Mini Incident: Broken Card", adapted from Sample Mission 2
 * (14_SAMPLE_MISSIONS.md). First taste of a runtime contract mismatch.
 */
export const mission004BrokenCard: MissionDefinition = {
  id: 'foundations-004-broken-card',
  campaignId: 'foundations',
  title: 'Mini Incident: Broken Card',
  summary: 'The credit score card fails at runtime even though the app compiles. Find the contract mismatch.',
  difficulty: 'hard',
  learningObjectives: [
    'Understand that TypeScript does not validate runtime data',
    'Read a Java API payload against a front-end interface',
    'Choose a fix that protects the runtime boundary',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Incident declared: the credit score card is blank for some customers. The Angular app compiles cleanly and unit tests pass, yet production logs show runtime type errors.',
    },
    {
      speaker: 'Mission Control',
      text: 'The Java service shipped a release this morning. Compare what it actually returns with what the front end expects, and secure the boundary.',
    },
  ],
  contextArtefacts: [
    {
      id: 'api-payload',
      type: 'api-response',
      title: 'Actual Java API response (from production logs)',
      language: 'json',
      content: '{\n  "customerName": "Avery",\n  "creditScore": "720"\n}',
    },
    {
      id: 'ts-interface',
      type: 'code',
      title: 'Front-end interface',
      language: 'ts',
      content: 'interface CreditScoreResponse {\n  customerName: string;\n  creditScore: number;\n}',
    },
    {
      id: 'error-log',
      type: 'log',
      title: 'Production log excerpt',
      content: "TypeError: score.toFixed is not a function\n    at CreditScoreCard.render (main.js:1042)",
    },
  ],
  challenges: [
    {
      id: 'foundations-004-c1',
      type: 'contract-comparison',
      title: 'Find the Mismatch',
      difficulty: 'hard',
      tags: ['api', 'typescript', 'java'],
      storyContext: 'The payload, the interface and the stack trace disagree about one thing.',
      prompt: 'What is the actual contract mismatch breaking the card?',
      options: [
        {
          id: 'a',
          label: 'creditScore is returned as a string but the front end expects a number',
          isCorrect: true,
          feedback:
            'The payload has "creditScore": "720" (a string); the interface — and .toFixed — need a number. That is the runtime break.',
        },
        {
          id: 'b',
          label: 'customerName is missing from the API response',
          isCorrect: false,
          feedback: 'customerName is present and correctly a string — the name renders fine.',
        },
        {
          id: 'c',
          label: 'The interface property names do not match the payload keys',
          isCorrect: false,
          feedback: 'Both sides use customerName and creditScore — the names align; the types do not.',
        },
        {
          id: 'd',
          label: 'The API should return XML instead of JSON',
          isCorrect: false,
          feedback: 'The payload format is fine; the problem is inside one field of the JSON.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Read the stack trace: which operation failed, and on what kind of value does it exist?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'TypeScript interfaces are erased at build time. If the runtime payload disagrees with the interface, the compiler cannot save you — the failure appears wherever the value is first used as its declared type.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            '.toFixed exists on numbers. Look at the quotes around 720 in the payload artefact.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'The payload delivers creditScore as the string "720", the interface promises number, and .toFixed throws on strings. Select the string-vs-number mismatch.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Mismatch identified' }],
      consequences: [
        {
          type: 'severity',
          delta: 1,
          reason: 'The misdiagnosis let the incident spread to more customers.',
        },
        {
          type: 'stability',
          delta: -10,
          reason: 'The credit score card is still failing in production.',
        },
      ],
      helpLinks: [
        { topicId: 'api.contract-drift', label: 'Contract drift' },
        { topicId: 'zod.runtime-validation', label: 'Runtime validation' },
      ],
      successFeedback:
        'This is a runtime contract mismatch — TypeScript cannot protect the app once data crosses the network boundary.',
      failureFeedback:
        'Line up each payload field against the interface: same name, same type? One pair disagrees.',
    },
    {
      id: 'foundations-004-c2',
      type: 'multiple-choice',
      title: 'Secure the Boundary',
      difficulty: 'hard',
      tags: ['zod', 'api'],
      storyContext:
        'The Java team can fix their serialiser next sprint. Your card must stop breaking today, without lying about the data.',
      prompt: 'Which change best protects the front end right now?',
      options: [
        {
          id: 'a',
          label:
            'Validate and transform the response at the API boundary:\nconst CreditScoreResponseSchema = z.object({\n  customerName: z.string(),\n  creditScore: z.coerce.number()\n});',
          isCorrect: true,
          feedback:
            'A Zod schema at the boundary validates reality and coerces "720" to 720 — the rest of the app keeps its clean number type.',
        },
        {
          id: 'b',
          label: 'Change the interface to creditScore: string and update the card to parse it inline',
          isCorrect: false,
          feedback:
            'That spreads the API quirk through the codebase and breaks again the day the Java fix lands and the field becomes a number.',
        },
        {
          id: 'c',
          label: 'Cast the response: const data = response as CreditScoreResponse',
          isCorrect: false,
          feedback:
            'A cast only changes what the compiler believes. The runtime string sails straight through to .toFixed again.',
        },
        {
          id: 'd',
          label: 'Wrap the card render in try/catch and hide the card on error',
          isCorrect: false,
          feedback:
            'That silences the symptom for every future data problem too — customers lose the card and you lose the signal.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Where does external data first enter the front end? Defend that spot.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Runtime validation libraries like Zod check real data as it arrives. safeParse/parse with a transform can both verify and normalise a payload before components see it.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'One option both validates the shape and coerces the string to a number in a single schema.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Choose the Zod schema with z.coerce.number() — it validates at the boundary and hands the app the number it was promised.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Boundary secured' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 15,
          reason: 'A workaround was smeared across components instead of fixing the boundary.',
        },
      ],
      helpLinks: [
        { topicId: 'zod.safe-parse', label: 'Using safeParse' },
        { topicId: 'zod.runtime-validation', label: 'Runtime API boundaries' },
      ],
      successFeedback:
        'TypeScript helped at compile time, but Zod protected the runtime boundary. Platform stability improved.',
      failureFeedback:
        'Good thinking, but that fix only changes what the compiler believes. The runtime data can still be malformed — inspect the response before it reaches the component.',
    },
  ],
  reflectionPrompt:
    'Where else in your real projects does data cross a trust boundary without validation?',
  rewards: [
    { type: 'xp', amount: 10, label: 'Incident resolved' },
    { type: 'badge', id: 'api-diplomat', label: 'API Diplomat' },
  ],
};
