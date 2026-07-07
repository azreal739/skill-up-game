import { MissionDefinition } from '@academy/content-model';

/**
 * API Contract Crisis boss — "Save the Integration"
 * (13_CAMPAIGN_CONTENT_PACKS.md). Combines the campaign: read the DTO, handle
 * status and error payloads, adapt at the boundary, and release safely.
 */
export const apiMission008BossSaveTheIntegration: MissionDefinition = {
  id: 'api-contract-crisis-008-boss-save-the-integration',
  campaignId: 'api-contract-crisis',
  title: 'Boss: Save the Integration',
  summary: 'A live integration is failing on real data. Read it, adapt it, handle its errors, and ship the fix safely.',
  difficulty: 'boss',
  learningObjectives: [
    'Diagnose contract drift from a DTO under pressure',
    'Adapt at the boundary and handle the error path',
    'Release the fix without risking a second incident',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The Invoices integration is down in production. The client was written from assumptions, the error path crashes twice, and there is pressure to just push a fix. Do it properly: read the contract, adapt the boundary, handle failures, and release so a surprise stays small.',
    },
    {
      speaker: 'Mission Control',
      text: 'Four moves save the integration: understand the drift, normalise at the edge, make the error path safe, and roll out under control. Bring it back online.',
    },
  ],
  contextArtefacts: [
    {
      id: 'incident',
      type: 'ticket',
      title: 'INC-501 — Invoices integration failing',
      content:
        'Symptoms: dashboard throws on load; a failed request crashes a second time.\nDTO: amount is a String, dueDate is epoch millis, note is nullable.\nHistory: this integration caused a customer-facing incident last quarter.',
    },
  ],
  challenges: [
    {
      id: 'api-contract-crisis-008-c1',
      type: 'contract-comparison',
      title: 'Stage 1 — Read the Drift',
      difficulty: 'medium',
      tags: ['api', 'java'],
      storyContext: 'The InvoiceDto is the source of truth; the front-end model was a guess.',
      prompt: 'Select every field where the model disagrees with the DTO.',
      options: [
        {
          id: 'amount',
          label: 'amount — model number vs DTO String ("240.00")',
          isCorrect: true,
          feedback: 'A numeric string, not a number — must be coerced.',
        },
        {
          id: 'dueDate',
          label: 'dueDate — model ISO string vs DTO epoch millis (number)',
          isCorrect: true,
          feedback: 'Millis vs ISO: new Date must receive the number, not a string.',
        },
        {
          id: 'note',
          label: 'note — model required string vs DTO nullable',
          isCorrect: true,
          feedback: 'A nullable field read as guaranteed crashes on a normal invoice with no note.',
        },
        {
          id: 'id',
          label: 'id — both string',
          isCorrect: false,
          feedback: 'id matches on both sides.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Compare each field’s type and nullability.' },
        { level: 2, title: 'Concept', content: 'Classic drift: string amount, epoch millis date, nullable field.' },
        { level: 3, title: 'Specific clue', content: 'Three disagree; id matches.' },
        { level: 4, title: 'Guided solution', content: 'Flag amount, dueDate and note.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Drift understood' }],
      consequences: [{ type: 'stability', delta: -5, reason: 'Assumption-based model crashed on real invoices.' }],
      helpLinks: [{ topicId: 'api.dto', label: 'Reading a DTO' }],
      successFeedback: 'All three disagreements found.',
      failureFeedback: 'amount, dueDate and note disagree by type or nullability; id matches.',
    },
    {
      id: 'api-contract-crisis-008-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Adapt at the Boundary',
      difficulty: 'hard',
      tags: ['api'],
      storyContext: 'The DTO is public and cannot change. The app needs a clean Invoice model.',
      prompt: 'How do you make the app see clean data?',
      options: [
        {
          id: 'a',
          label: 'One boundary adapter that safeParses the DTO, coerces amount to number, millis to Date, and allows note to be null',
          isCorrect: true,
          feedback: 'A single validate-and-transform seam cleans the payload once; the app never sees the quirks.',
        },
        {
          id: 'b',
          label: 'Coerce the fields inline at each component that reads an invoice',
          isCorrect: false,
          feedback: 'Scattered coercions guarantee one call site forgets. Normalise once.',
        },
        {
          id: 'c',
          label: 'Ask the back end for a second, front-end-shaped endpoint',
          isCorrect: false,
          feedback: 'A per-consumer endpoint bloats the API; adapt at your own edge.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Fix the shape exactly once.' },
        { level: 2, title: 'Concept', content: 'Validate-and-transform at the boundary into a clean model.' },
        { level: 3, title: 'Specific clue', content: 'One adapter, not every call site, not a new endpoint.' },
        { level: 4, title: 'Guided solution', content: 'A single boundary adapter that validates and normalises.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Boundary built' }],
      consequences: [{ type: 'technical-debt', delta: 10, reason: 'Scattered coercions would have re-created the drift.' }],
      helpLinks: [{ topicId: 'zod.transform', label: 'Transforming with Zod' }],
      successFeedback: 'One adapter cleans the payload; the app sees a proper Invoice.',
      failureFeedback: 'Normalise once at the boundary — not inline, not via a bespoke endpoint.',
    },
    {
      id: 'api-contract-crisis-008-c3',
      type: 'multiple-choice',
      title: 'Stage 3 — Make the Error Path Safe',
      difficulty: 'hard',
      tags: ['api'],
      storyContext: 'A failed request currently crashes a second time reading an error body that changed shape.',
      prompt: 'How do you stop the error path cascading?',
      options: [
        {
          id: 'a',
          label: 'Validate the error body with its own schema and a fallback message, and branch on status (retry 5xx, re-auth 401, show 4xx detail)',
          isCorrect: true,
          feedback: 'Error bodies are data too — validate with a fallback and let status drive behaviour so one failure stays one failure.',
        },
        {
          id: 'b',
          label: 'Wrap the error handler in another try/catch and swallow whatever it throws',
          isCorrect: false,
          feedback: 'Swallowing hides the message and the drift; the user sees nothing and you learn nothing.',
        },
        {
          id: 'c',
          label: 'Retry every failure a few times; most errors are transient',
          isCorrect: false,
          feedback: 'Retrying a 400 or 401 just repeats a rejected request. Only 5xx/timeouts are retry candidates.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Treat the error body as untrusted input, and let status codes guide handling.' },
        { level: 2, title: 'Concept', content: 'Validate error payloads with a fallback; 4xx are caller problems, 5xx retryable.' },
        { level: 3, title: 'Specific clue', content: 'Fallback-validate the body AND branch on status.' },
        { level: 4, title: 'Guided solution', content: 'Schema-validate the error body with a default and switch on status class.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Error path hardened' }],
      consequences: [{ type: 'stability', delta: -5, reason: 'An unvalidated error path had been turning one failure into two.' }],
      helpLinks: [
        { topicId: 'api.error-payloads', label: 'Error payloads' },
        { topicId: 'api.status-codes', label: 'HTTP status codes' },
      ],
      successFeedback: 'The error path validates its input and lets status drive behaviour — no more double crash.',
      failureFeedback: 'Don’t swallow or blanket-retry. Validate the error body with a fallback and branch on status.',
    },
    {
      id: 'api-contract-crisis-008-c4',
      type: 'multiple-choice',
      title: 'Stage 4 — Release Under Control',
      difficulty: 'boss',
      tags: ['api', 'cicd'],
      storyContext: 'This integration burned customers once already, and the back end can still change.',
      prompt: 'How do you ship the fix so a surprise stays small?',
      options: [
        {
          id: 'a',
          label: 'Add a contract test in CI, ship behind a feature flag, ramp gradually while watching error rates, and keep the flag as an instant off-switch',
          isCorrect: true,
          feedback:
            'The contract test catches future drift early; the flag separates deploy from release so any residual surprise hits a fraction of traffic and can be switched off without a deploy. That is a controlled, reversible release.',
        },
        {
          id: 'b',
          label: 'Push to 100% now — the adapter and tests are green, so it is safe',
          isCorrect: false,
          feedback: 'Green proves today’s payload; it can’t prove tomorrow’s. Big-bang forfeits the safety of a gradual rollout.',
        },
        {
          id: 'c',
          label: 'Hold the fix until the back end guarantees the DTO is frozen forever',
          isCorrect: false,
          feedback: 'You can’t freeze another team’s roadmap, and the bug is live now. Ship safely instead of waiting for an impossible guarantee.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Make the release observable and reversible.' },
        { level: 2, title: 'Concept', content: 'Contract test + feature flag + gradual ramp = controlled release.' },
        { level: 3, title: 'Specific clue', content: 'The answer combines a CI contract test with a flagged, gradual rollout.' },
        { level: 4, title: 'Guided solution', content: 'Contract test in CI, ship behind a flag, ramp while monitoring.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Integration saved' }],
      consequences: [{ type: 'severity', delta: -15, reason: 'A flagged, monitored rollout kept the release contained and reversible.' }],
      helpLinks: [
        { topicId: 'delivery.feature-flags', label: 'Feature flags and gradual rollout' },
        { topicId: 'testing.contract-tests', label: 'Contract test thinking' },
      ],
      successFeedback:
        'Drift understood, boundary adapted, error path safe, release flagged and monitored — the integration is back online and stays that way. Crisis over.',
      failureFeedback: 'A green build doesn’t justify big-bang, and you can’t wait for a frozen DTO. Contract test + flagged gradual rollout.',
    },
  ],
  reflectionPrompt:
    'Across the crisis — which mattered most for saving the integration: reading the contract, adapting the boundary, handling errors, or the controlled release? Defend your pick.',
  rewards: [
    { type: 'xp', amount: 25, label: 'Integration restored' },
    { type: 'badge', id: 'api-diplomat', label: 'API Diplomat' },
  ],
};
