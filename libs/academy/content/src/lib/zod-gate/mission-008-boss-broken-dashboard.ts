import { MissionDefinition } from '@academy/content-model';

/**
 * Zod Gate boss — "Stop the Broken Dashboard" (13_CAMPAIGN_CONTENT_PACKS.md).
 * A live incident combining the whole campaign: diagnose the drift, fix the
 * boundary, harden the error path, and prevent recurrence.
 */
export const zodMission008BossBrokenDashboard: MissionDefinition = {
  id: 'zod-gate-008-boss-broken-dashboard',
  campaignId: 'zod-gate',
  title: 'Boss: Stop the Broken Dashboard',
  summary: 'A dawn API release broke the dashboard for everyone. Diagnose, fix, harden, prevent.',
  difficulty: 'boss',
  learningObjectives: [
    'Diagnose a live runtime contract failure from logs',
    'Fix it at the boundary with validation and transformation',
    'Prevent recurrence with a contract test',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'P1. At 05:00 the customers service shipped a release. Since then the dashboard is blank or crashing for every user. On-call paged you. This is what the Zod Gate was built for.',
    },
    {
      speaker: 'Mission Control',
      text: 'Four moves: read the logs and diagnose, fix the boundary, harden the error path, and make sure this never surprises us again. Go.',
    },
  ],
  contextArtefacts: [
    {
      id: 'incident-log',
      type: 'log',
      title: 'Production logs since 05:00',
      content:
        "[05:03] ZodError: customers/*: Expected number, received string at \"balance\"\n[05:03] ZodError: customers/*: Required field \"name\" missing\n[05:04] TypeError: Cannot read properties of undefined (reading 'text')  ← error handler\n[05:06] Dashboard fallback shown for 100% of sessions",
    },
    {
      id: 'new-payload',
      type: 'api-response',
      title: 'Current payload — GET /api/customers/42',
      language: 'json',
      content:
        '{\n  "id": "42",\n  "displayName": "Avery Chen",\n  "balance": "1240.50"\n}',
    },
    {
      id: 'old-schema',
      type: 'code',
      title: 'customer.schema.ts (pre-incident)',
      language: 'ts',
      content:
        'export const CustomerSchema = z.object({\n  id: z.string(),\n  name: z.string(),\n  balance: z.number(),\n});',
    },
  ],
  challenges: [
    {
      id: 'zod-gate-008-c1',
      type: 'contract-comparison',
      title: 'Stage 1 — Diagnose from the Logs',
      difficulty: 'hard',
      tags: ['zod', 'api', 'java'],
      storyContext: 'The logs name two schema failures. Confirm both against the payload.',
      prompt: 'What changed in the payload to break validation?',
      options: [
        {
          id: 'a',
          label: '"name" was renamed to "displayName", and "balance" is now a string ("1240.50") not a number',
          isCorrect: true,
          feedback:
            'Both ZodErrors line up: the required name is missing under a new key, and balance arrives as a numeric string. Two drifts in one release.',
        },
        {
          id: 'b',
          label: 'The "id" field changed from a number to a string',
          isCorrect: false,
          feedback: 'id is a string in both the payload and the schema — no drift there.',
        },
        {
          id: 'c',
          label: 'The response is missing the customers array wrapper',
          isCorrect: false,
          feedback: 'This endpoint returns a single customer object; there is no array to miss.',
        },
        {
          id: 'd',
          label: 'Only the error handler is broken; the payload is fine',
          isCorrect: false,
          feedback:
            'The error handler crash is a second-order effect. The logs show two ZodErrors on the payload itself.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The two ZodError lines name the exact fields — check each against the payload.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'ZodError messages carry the failing path and the expected vs received type. Read them as a precise diff between schema and reality.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'One error is a missing required field; the other is a string where a number was expected.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'name → displayName (missing required field) and balance became a string. Select that.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Diagnosed' }],
      consequences: [
        { type: 'severity', delta: 1, reason: 'Misreading the logs delayed the fix during a P1.' },
      ],
      helpLinks: [
        { topicId: 'zod.error-handling', label: 'Handling validation errors' },
        { topicId: 'api.contract-drift', label: 'Contract drift' },
      ],
      successFeedback: 'Two drifts, both confirmed from the logs. Now fix the boundary.',
      failureFeedback: 'Read each ZodError path and match it to the payload — two fields changed.',
    },
    {
      id: 'zod-gate-008-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Fix the Boundary',
      difficulty: 'hard',
      tags: ['zod'],
      storyContext: 'You consume name and balance. Fix the schema to accept today’s payload cleanly.',
      prompt: 'Which schema restores the dashboard?',
      options: [
        {
          id: 'a',
          label:
            'z.object({\n  id: z.string(),\n  displayName: z.string(),\n  balance: z.coerce.number(),\n}).transform(c => ({ id: c.id, name: c.displayName, balance: c.balance }))',
          isCorrect: true,
          feedback:
            'Reads displayName, coerces the string balance to a number, and maps back to your internal { name } shape — components need no changes.',
        },
        {
          id: 'b',
          label: 'z.object({ id: z.string(), name: z.string(), balance: z.number() }).strict()',
          isCorrect: false,
          feedback: 'This is the pre-incident schema plus .strict() — it still fails on both drifted fields.',
        },
        {
          id: 'c',
          label: 'Cast the payload: const c = data as Customer; and move on',
          isCorrect: false,
          feedback: 'A cast validates nothing and leaves balance as a string — the crash returns downstream.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Fix both drifts: the rename and the string number.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Map the renamed field to your internal name and coerce the numeric string — the same boundary techniques from Schema Drift and Transforming Responses, applied together.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'The right schema uses z.coerce.number() on balance and a transform mapping displayName → name.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose the schema that reads displayName, coerces balance, and transforms back to { name }.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Boundary fixed' }],
      consequences: [
        { type: 'stability', delta: -10, reason: 'The dashboard stayed down while a non-fix was tried.' },
      ],
      helpLinks: [
        { topicId: 'zod.transform', label: 'Transforming with Zod' },
        { topicId: 'zod.runtime-validation', label: 'Runtime validation' },
      ],
      successFeedback: 'Dashboard restored — the boundary absorbs the drift and components are untouched.',
      failureFeedback: 'Only one option fixes both the rename and the string balance without a cast.',
    },
    {
      id: 'zod-gate-008-c3',
      type: 'code-review',
      title: 'Stage 3 — Harden the Error Path',
      difficulty: 'hard',
      tags: ['api', 'zod'],
      storyContext: 'The log also showed the error handler crashing. Fix it before you close the incident.',
      artefacts: [
        {
          id: 'boss-error-handler',
          type: 'code',
          title: 'The error handler that threw at 05:04',
          language: 'ts',
          content:
            "error: (err: HttpErrorResponse) => {\n  this.message = err.error.detail.text;\n  this.customer = { id: '', name: '', balance: 0 };\n}",
        },
      ],
      prompt: 'Select every genuine problem with this error handler.',
      findings: [
        {
          id: 'wrong-shape',
          label: 'Reads err.error.detail.text without validating the error body’s shape',
          isCorrect: true,
          feedback:
            'This is the 05:04 TypeError — an assumed error shape that does not exist. Validate the error body with a schema first.',
        },
        {
          id: 'fabricated-customer',
          label: 'Fabricates an empty customer ({ id: "", name: "", balance: 0 }) on error',
          isCorrect: true,
          feedback:
            'Fake data shows a real customer a balance of 0 and hides the failure — render an explicit error state instead.',
        },
        {
          id: 'http-error-type',
          label: 'Using HttpErrorResponse as the parameter type',
          isCorrect: false,
          feedback: 'That is the correct type for an HttpClient error.',
        },
        {
          id: 'sets-message',
          label: 'Setting this.message at all',
          isCorrect: false,
          feedback: 'Surfacing a message is good — the problem is where the message comes from, not that it exists.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The log points at line one; the Fallback UI lesson points at line two.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Validate error payloads like any input, and never fabricate data to paper over a failure — show a designed error state.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Two defects: an unvalidated wrong-shape read, and a fake empty customer.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Flag the unvalidated err.error.detail.text and the fabricated empty customer. The type and the message assignment are fine.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Error path hardened' }],
      consequences: [
        { type: 'severity', delta: 1, reason: 'The error-path crash kept masking the root cause.' },
      ],
      helpLinks: [
        { topicId: 'api.error-payloads', label: 'Error payloads' },
        { topicId: 'zod.error-handling', label: 'Handling validation errors' },
      ],
      successFeedback: 'The error path no longer crashes or lies — the incident can be closed cleanly.',
      failureFeedback: 'Look for the assumed error shape and the fabricated customer object.',
    },
    {
      id: 'zod-gate-008-c4',
      type: 'multiple-choice',
      title: 'Stage 4 — Prevent Recurrence',
      difficulty: 'boss',
      tags: ['testing', 'cicd', 'api'],
      storyContext:
        'The dashboard is back. Now make sure the next payload change fails in CI, not in production at 05:00.',
      prompt: 'What is the highest-leverage prevention step?',
      options: [
        {
          id: 'a',
          label:
            'Add a contract test that validates a payload recorded from staging against CustomerSchema, run in CI',
          isCorrect: true,
          feedback:
            'A contract test converts the next silent drift into a red build before release — exactly the discovery-shifting move from Contract Test Thinking.',
        },
        {
          id: 'b',
          label: 'Add a comment to the schema asking the API team not to change the payload',
          isCorrect: false,
          feedback: 'A comment enforces nothing and will not be seen by the service that drifts.',
        },
        {
          id: 'c',
          label: 'Wrap every component in a try/catch so future crashes are swallowed',
          isCorrect: false,
          feedback: 'Swallowing crashes hides drift instead of catching it — the opposite of prevention.',
        },
        {
          id: 'd',
          label: 'Increase the on-call rotation so someone is always ready to fix it faster',
          isCorrect: false,
          feedback: 'Faster reaction is still reaction. The goal is to catch drift before customers do.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Prevention means finding drift earlier than production.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'A contract test asserts a real payload still satisfies the schema, failing CI on drift. It shifts discovery left, from 05:00 production to the pull request.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'One option runs in CI against a recorded real payload.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Add the CI contract test validating the recorded staging payload against CustomerSchema.',
        },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Recurrence prevented' }],
      consequences: [
        { type: 'stability', delta: -5, reason: 'Without a contract test, the next drift will page on-call again.' },
      ],
      helpLinks: [
        { topicId: 'testing.contract-tests', label: 'Contract test thinking' },
        { topicId: 'delivery.feature-flags', label: 'Feature flags' },
      ],
      successFeedback:
        'The gate held, the dashboard is stable, and CI will now catch the next drift before any customer does. Production is safe in your hands.',
      failureFeedback:
        'Comments, blanket try/catch and more on-call all react to drift — prevention means catching it in CI.',
    },
  ],
  reflectionPrompt:
    'Across the Zod Gate — where in your real projects does untrusted data cross a boundary today with only a TypeScript generic guarding it?',
  rewards: [{ type: 'xp', amount: 25, label: 'Zod Gate boss defeated' }],
};
