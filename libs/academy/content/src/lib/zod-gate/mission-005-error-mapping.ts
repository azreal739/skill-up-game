import { MissionDefinition } from '@academy/content-model';

/** Zod Gate 5 — "Error Mapping" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const zodMission005ErrorMapping: MissionDefinition = {
  id: 'zod-gate-005-error-mapping',
  campaignId: 'zod-gate',
  title: 'Error Mapping',
  summary:
    'The API’s error responses have shapes too. Handle the unhappy path without a second crash.',
  difficulty: 'medium',
  learningObjectives: [
    'Treat error payloads as untrusted, validated data',
    'Map HTTP status codes to user-facing outcomes',
    'Avoid crashing on the error path',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Good news: the happy path is solid. Bad news: when the API returns a 4xx, the dashboard crashes a second time — this time reading a property off an error body that isn’t shaped the way we assumed.',
    },
    {
      speaker: 'Mission Control',
      text: 'Error responses are data too. Validate them and map them to something the customer can act on.',
    },
  ],
  contextArtefacts: [
    {
      id: 'error-body',
      type: 'api-response',
      title: '403 response body',
      language: 'json',
      content:
        '{\n  "error": {\n    "code": "FORBIDDEN",\n    "message": "You do not have access to this customer."\n  }\n}',
    },
    {
      id: 'error-handler',
      type: 'code',
      title: 'The crashing error handler',
      language: 'ts',
      content:
        'error: (err: HttpErrorResponse) => {\n  // assumes err.error.detail exists\n  this.message = err.error.detail.text;\n}',
    },
  ],
  challenges: [
    {
      id: 'zod-gate-005-c1',
      type: 'code-review',
      title: 'Audit the Error Path',
      difficulty: 'medium',
      tags: ['api', 'zod'],
      storyContext:
        'Two real problems hide in how this handler treats the error body.',
      prompt: 'Select every genuine issue with the error handling.',
      findings: [
        {
          id: 'uses-httperror',
          label: 'Typing the parameter as HttpErrorResponse is wrong',
          isCorrect: false,
          feedback:
            'HttpErrorResponse is the correct type for an HttpClient error — that part is right.',
        },
        {
          id: 'assumes-shape',
          label:
            'It reads err.error.detail.text but the real body has error.code / error.message',
          isCorrect: true,
          feedback:
            'The handler assumes an error shape that does not exist, so it throws a TypeError — a crash on the crash path.',
        },
        {
          id: 'sets-message',
          label: 'Assigning to this.message to show the user is a bad pattern',
          isCorrect: false,
          feedback:
            'Surfacing a message to the user is exactly what the error path should do.',
        },
        {
          id: 'no-validation',
          label:
            'The error body is used without being validated against a schema',
          isCorrect: true,
          feedback:
            'Error payloads are untrusted input too. Parse them with an ApiErrorSchema before reading fields, exactly like success payloads.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'Compare the shape the handler reads with the shape the API actually sends.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'The error path deserves the same discipline as the success path: validate the body against a schema, then read known fields. Assuming a shape is how one failure triggers a second.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'The body has error.code and error.message; the handler reaches for error.detail.text.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Flag the wrong-shape access and the missing validation. The HttpErrorResponse type and showing a message are both fine.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Error path hardened' }],
      consequences: [
        {
          type: 'severity',
          delta: 1,
          reason:
            'A crash on the error path masked the original problem and escalated the incident.',
        },
      ],
      helpLinks: [
        { topicId: 'api.error-payloads', label: 'Error payloads' },
        { topicId: 'api.status-codes', label: 'HTTP status codes' },
      ],
      successFeedback:
        'The error path is now as trustworthy as the happy path — no second crash.',
      failureFeedback:
        'Look for where the handler assumes a shape the API never sends, and where it skips validation entirely.',
    },
    {
      id: 'zod-gate-005-c2',
      type: 'multiple-choice',
      title: 'Map Status to Outcome',
      difficulty: 'easy',
      tags: ['api'],
      storyContext:
        'The dashboard should react differently by status, not show one generic error for everything.',
      prompt: 'Which mapping of status code to user outcome is correct?',
      options: [
        {
          id: 'a',
          label:
            '401 → prompt to sign in · 403 → “no access” message · 404 → “customer not found” · 500 → “try again later”',
          isCorrect: true,
          feedback:
            'Each status carries different meaning and calls for a different response — authentication, authorisation, missing resource, server fault.',
        },
        {
          id: 'b',
          label: 'Every 4xx and 5xx → the same “Something went wrong” toast',
          isCorrect: false,
          feedback:
            'One generic message throws away actionable information — a 401 the user can fix by signing in looks identical to a 500 they cannot.',
        },
        {
          id: 'c',
          label:
            '404 → retry automatically · 500 → prompt to sign in · 403 → “not found”',
          isCorrect: false,
          feedback:
            'These mappings are scrambled: 500 is not an auth problem and 403 is not a missing resource.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'What can the user actually do about each status?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            '401 means authenticate, 403 means you lack permission, 404 means the resource is missing, 5xx means the server failed. Different causes deserve different responses.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'The correct option is the one where 401 leads to sign-in and 500 leads to “try again later”.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Pick the mapping that treats 401, 403, 404 and 500 as four distinct, sensible outcomes.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Statuses mapped' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'One generic error hid a fixable auth problem from users.',
        },
      ],
      helpLinks: [{ topicId: 'api.status-codes', label: 'HTTP status codes' }],
      successFeedback:
        'Each status now leads the customer to the right next action.',
      failureFeedback:
        'A single catch-all message discards what the status code was telling you.',
    },
  ],
  reflectionPrompt:
    'Why does the error path deserve the same schema discipline as the success path?',
  rewards: [
    { type: 'xp', amount: 5, label: 'Errors mapped' },
    { type: 'badge', id: 'api-diplomat', label: 'API Diplomat' },
  ],
};
