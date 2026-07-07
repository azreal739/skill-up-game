import { MissionDefinition } from '@academy/content-model';

/** Zod Gate 7 — "Contract Test Thinking" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const zodMission007ContractTestThinking: MissionDefinition = {
  id: 'zod-gate-007-contract-test-thinking',
  campaignId: 'zod-gate',
  title: 'Contract Test Thinking',
  summary: 'Stop finding drift in production. Catch it in CI with a contract test.',
  difficulty: 'hard',
  learningObjectives: [
    'Understand what a contract test asserts',
    'Choose a test that fails on drift before customers do',
    'Distinguish contract tests from mocked unit tests',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Twice this campaign the back end changed a payload and we found out from a customer. The gate protects users at runtime — but we are still reacting.',
    },
    {
      speaker: 'Mission Control',
      text: 'Move the discovery earlier. Design a test that turns silent schema drift into a loud CI failure the day it happens.',
    },
  ],
  contextArtefacts: [
    {
      id: 'recorded-payload',
      type: 'code',
      title: 'A recorded real response, committed as a fixture',
      language: 'ts',
      content:
        "// fixtures/customer.sample.json — captured from the staging API\n{\n  \"id\": \"42\",\n  \"name\": \"Avery Chen\",\n  \"score\": 720\n}",
    },
  ],
  challenges: [
    {
      id: 'zod-gate-007-c1',
      type: 'multiple-choice',
      title: 'Design the Contract Test',
      difficulty: 'hard',
      tags: ['testing', 'zod', 'api'],
      storyContext: 'You want CI to fail the moment the payload stops matching CustomerSchema.',
      prompt: 'Which test actually guards the contract?',
      options: [
        {
          id: 'a',
          label:
            "it('customer payload matches the schema', () => {\n  expect(CustomerSchema.safeParse(recordedPayload).success).toBe(true);\n});\n// with the fixture refreshed from staging in CI",
          isCorrect: true,
          feedback:
            'Validating a real recorded payload against the schema fails the instant the back end drifts — the drift surfaces in CI, not production.',
        },
        {
          id: 'b',
          label:
            "it('parses a customer', () => {\n  const mock = { id: '1', name: 'Test', score: 1 };\n  expect(CustomerSchema.safeParse(mock).success).toBe(true);\n});",
          isCorrect: false,
          feedback:
            'This only tests that a hand-written object you built to match the schema matches the schema — it can never detect real API drift.',
        },
        {
          id: 'c',
          label:
            "it('renders the dashboard', () => {\n  // mount the component with a mocked service\n  expect(fixture.nativeElement.textContent).toContain('Avery');\n});",
          isCorrect: false,
          feedback:
            'A component test with a mocked service proves your UI works against your mock, not against what the API sends.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The test must involve data that actually came from the API.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'A contract test checks a real or recorded API payload against your schema. Tests built on hand-written mocks only confirm your mock matches your schema — they are blind to the back end.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Look for the option that validates a recorded/staging payload, not a hand-made object.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Choose the test that runs safeParse over the recorded payload fixture refreshed from staging.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Contract pinned' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Drift kept reaching production because only mocks were tested.',
        },
      ],
      helpLinks: [
        { topicId: 'testing.contract-tests', label: 'Contract test thinking' },
        { topicId: 'api.contract-drift', label: 'Contract drift' },
      ],
      successFeedback: 'CI now fails on drift the day it happens — no more learning it from customers.',
      failureFeedback:
        'A test that only validates your own mock cannot see the back end. The contract test needs real payload data.',
    },
  ],
  reflectionPrompt:
    'Why does a passing suite of mock-based tests still leave you exposed to contract drift?',
  rewards: [{ type: 'xp', amount: 5, label: 'Drift caught early' }],
};
