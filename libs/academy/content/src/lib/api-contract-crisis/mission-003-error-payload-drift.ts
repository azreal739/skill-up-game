import { MissionDefinition } from '@academy/content-model';

/** API Contract Crisis 3 — "Error Payload Drift" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const apiMission003ErrorPayloadDrift: MissionDefinition = {
  id: 'api-contract-crisis-003-error-payload-drift',
  campaignId: 'api-contract-crisis',
  title: 'Error Payload Drift',
  summary: 'A failed request crashes a second time on the error path. The error body changed shape.',
  difficulty: 'medium',
  learningObjectives: [
    'Treat error responses as data with their own contract',
    'Validate error payloads instead of assuming their shape',
    'Stop one failure cascading into a second crash',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'A 400 used to return { message } and the UI showed err.message. The back end migrated to { error: { code, detail } }. Now the error handler itself throws — reading err.message on a body that no longer has it. One failure has become two.',
    },
  ],
  contextArtefacts: [
    {
      id: 'old-new',
      type: 'api-response',
      title: 'Error body: before vs after',
      content:
        'BEFORE (400):  { "message": "itemCount must be >= 1" }\nAFTER  (400):  { "error": { "code": "VALIDATION", "detail": "itemCount must be >= 1" } }',
    },
    {
      id: 'handler',
      type: 'code',
      title: 'error-handler.ts',
      language: 'ts',
      content:
        'catch (e: unknown) {\n  const body = (e as HttpErrorResponse).error;\n  // crashes: body.message is undefined, then .toUpperCase() throws\n  showToast(body.message.toUpperCase());\n}',
    },
  ],
  challenges: [
    {
      id: 'api-contract-crisis-003-c1',
      type: 'multiple-choice',
      title: 'Stop the Cascade',
      difficulty: 'medium',
      tags: ['api'],
      storyContext: 'The error path assumed a shape that drifted. It needs to read the new shape defensively.',
      prompt: 'What is the right fix for the error handler?',
      options: [
        {
          id: 'a',
          label:
            'Validate the error body against a schema (with a fallback message), then read error.detail — so an unexpected shape degrades to a safe message instead of throwing',
          isCorrect: true,
          feedback:
            'Error bodies have a contract too. Parsing against a schema with a fallback means a drifted or missing shape yields a friendly message, never a second crash.',
        },
        {
          id: 'b',
          label: 'Wrap the toast in another try/catch so the second crash is swallowed',
          isCorrect: false,
          feedback: 'That hides the symptom and shows the user nothing. The error message — the whole point — is lost, and the drift stays invisible.',
        },
        {
          id: 'c',
          label: 'Change the UI back to reading body.message and ask the back end to revert',
          isCorrect: false,
          feedback: 'You cannot freeze the back end. The client must read the current contract defensively, not depend on an old one being restored.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The error body is untrusted input like any response — what do we do with untrusted input?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Validate the error payload with its own schema and a fallback. Then read the field that exists now (error.detail). An unexpected shape should degrade gracefully, not throw on the error path.',
        },
        { level: 3, title: 'Specific clue', content: 'Parse with a fallback message, then read error.detail.' },
        { level: 4, title: 'Guided solution', content: 'Schema-validate the error body with a default, and surface error.detail.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Cascade stopped' }],
      consequences: [{ type: 'stability', delta: -10, reason: 'An unvalidated error path turned one failure into two.' }],
      helpLinks: [
        { topicId: 'api.error-payloads', label: 'Error payloads' },
        { topicId: 'zod.runtime-validation', label: 'Runtime validation with Zod' },
      ],
      successFeedback: 'The error path now validates its own input and falls back safely — one failure stays one failure.',
      failureFeedback: 'Swallowing or reverting does not fix drift. Validate the error body with a fallback and read the field that exists now.',
    },
  ],
  reflectionPrompt: 'Why is the error path more dangerous to leave unvalidated than the happy path?',
  rewards: [{ type: 'xp', amount: 5, label: 'Error drift handled' }],
};
