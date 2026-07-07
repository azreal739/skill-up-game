import { MissionDefinition } from '@academy/content-model';

/** API Contract Crisis 2 — "HTTP Status Investigation" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const apiMission002HttpStatus: MissionDefinition = {
  id: 'api-contract-crisis-002-http-status-investigation',
  campaignId: 'api-contract-crisis',
  title: 'HTTP Status Investigation',
  summary: 'The client treats every non-200 the same. Read the status codes and respond correctly.',
  difficulty: 'easy',
  learningObjectives: [
    'Map HTTP status classes to causes',
    'Distinguish a caller problem (4xx) from a server problem (5xx)',
    'Choose the right client behaviour per status',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Support is drowning in "something went wrong" reports. The client collapses every failure into one generic error. Read the actual status codes coming back and decide what each one means for the user and for retrying.',
    },
  ],
  contextArtefacts: [
    {
      id: 'log',
      type: 'log',
      title: 'Recent failed requests',
      content:
        'POST /orders        400  {"error":"itemCount must be >= 1"}\nGET  /orders/42      404  {"error":"not found"}\nGET  /orders         503  {"error":"upstream unavailable"}\nPOST /orders        401  {"error":"token expired"}',
    },
  ],
  challenges: [
    {
      id: 'api-contract-crisis-002-c1',
      type: 'multiple-choice',
      title: 'Read the Status Codes',
      difficulty: 'easy',
      tags: ['api'],
      storyContext: 'Different status classes call for different handling — retry, re-auth, fix the request, or show the resource is gone.',
      prompt: 'Which response is the right reading of these four failures?',
      options: [
        {
          id: 'a',
          label:
            'The 400 is a bad request to fix client-side, the 401 needs re-authentication, the 404 means show "not found", and only the 503 is worth retrying',
          isCorrect: true,
          feedback:
            'Correct. 4xx are caller problems (fix the request / re-auth / resource gone) and are not fixed by retrying; 5xx are server problems where a bounded retry can help.',
        },
        {
          id: 'b',
          label: 'Retry all of them a few times — most transient errors clear up',
          isCorrect: false,
          feedback: 'Retrying a 400 or 401 just repeats a request the server has already rejected for a reason. Only 5xx/timeouts are retry candidates.',
        },
        {
          id: 'c',
          label: 'Show the same generic error for all four; the user cannot act on status codes anyway',
          isCorrect: false,
          feedback: 'The user cannot read the code, but your handling must differ: re-auth on 401, a validation message on 400, and "not found" on 404 are all different UX.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Group the codes: which are caller problems and which are server problems?' },
        {
          level: 2,
          title: 'Concept',
          content:
            '2xx success, 4xx the caller must change something (400 malformed, 401 auth, 404 missing), 5xx the server failed. Retrying only helps 5xx and timeouts.',
        },
        { level: 3, title: 'Specific clue', content: 'Only one of these four (503) is a server problem worth retrying.' },
        { level: 4, title: 'Guided solution', content: 'Fix 400 client-side, re-auth 401, "not found" for 404, retry the 503.' },
      ],
      rewards: [{ type: 'xp', amount: 15, label: 'Statuses decoded' }],
      consequences: [{ type: 'team-confidence', delta: -5, reason: 'Collapsing every failure into one error hid real, actionable differences.' }],
      helpLinks: [{ topicId: 'api.status-codes', label: 'HTTP status codes' }],
      successFeedback: 'Each status now drives the right behaviour — fix, re-auth, not-found, or a bounded retry.',
      failureFeedback: '4xx are caller problems (do not retry); 5xx are server problems (retry may help). Only the 503 should be retried here.',
    },
  ],
  reflectionPrompt: 'Which is more dangerous: retrying a request the server already rejected, or never retrying one it might have served?',
  rewards: [{ type: 'xp', amount: 5, label: 'Status investigation done' }],
};
