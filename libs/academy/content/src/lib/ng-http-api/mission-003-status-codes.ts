import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — status codes and error anatomy: 4xx vs 5xx as blame
 * assignment, HttpErrorResponse's shape, and error bodies worth reading.
 */
export const fnHt003StatusCodes: MissionDefinition = {
  id: 'ht-003-status-codes',
  campaignId: 'ng-http-api',
  title: 'Codes Assign Blame',
  summary:
    '4xx says “your request is wrong”, 5xx says “we broke” — and the reaction to each should be as different as the blame.',
  difficulty: 'easy',
  learningObjectives: [
    'Read status classes as blame assignment driving different reactions',
    'Navigate HttpErrorResponse — status, error body, and their traps',
    'Choose codes on the API side that tell clients the truth',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session three: I pulled a week of our error logs. Four hundred “Something went wrong” toasts — behind them: expired sessions, validation rejections, one genuine outage and a misspelled URL. One toast for four different worlds.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The status code is the API assigning blame. 401: who are you again? 403: I know you, and no. 404: nothing here. 422: I understood you and your data is wrong. 5xx: we broke, not you. Each deserves a DIFFERENT reaction — retry, redirect, form feedback or apology. One toast means we read none of them.',
    },
  ],
  contextArtefacts: [
    {
      id: 'error-anatomy',
      type: 'code',
      title: 'HttpErrorResponse, dissected',
      language: 'ts',
      content:
        "catchError((err: HttpErrorResponse) => {\n  err.status;  // 0 = network/CORS — the request never got an answer\n  err.error;   // the response BODY: the server's structured complaint\n               // { code: 'VALIDATION', fieldErrors: { email: 'taken' } }\n  ...\n})",
    },
  ],
  challenges: [
    {
      id: 'ht-003-c1',
      type: 'multiple-choice',
      title: 'Four Worlds, One Toast',
      difficulty: 'easy',
      tags: ['api'],
      storyContext: 'The log review: 401s, 422s with field errors, 500s and status-0s — all rendered as the same toast.',
      prompt: 'What should each class of error have done instead?',
      options: [
        {
          id: 'a',
          label: 'Show the raw status code in the toast — “Error 422” — so users can report it accurately.',
          isCorrect: false,
          feedback:
            'Codes are for the CODE to read — surfacing them raw outsources the interpretation to the least equipped party.',
        },
        {
          id: 'b',
          label: 'Retry everything twice before toasting — most errors are transient anyway.',
          isCorrect: false,
          feedback:
            'A 422 is deterministic — retrying re-rejects identically, twice as slowly. Only transient classes earn retries (mission 5).',
        },
        {
          id: 'c',
          label: 'Toast only 5xx and stay silent on 4xx, since client errors are the user’s own doing.',
          isCorrect: false,
          feedback:
            'Silent 401s and 422s are dead clicks — the routing campaign buried those. Client errors need the MOST specific feedback, not the least.',
        },
        {
          id: 'd',
          label:
            'React per class: 401 → refresh the session or route to login with returnTo; 422 → unpack err.error.fieldErrors into the form; 5xx → apologise and offer retry; status 0 → network/offline messaging. The toast is only the fallback for the unclassified.',
          isCorrect: true,
          feedback:
            'Blame read, reaction matched — the four worlds get four experiences, and the generic toast shrinks to the genuinely unknown.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each code ask: whose fault, and what can the APP do about it?' },
        { level: 2, title: 'Concept', content: '4xx = fix the request (or session); 5xx = not your fault; 0 = no answer at all.' },
        { level: 3, title: 'Specific clue', content: 'The 422 body carries field errors — something in the UI is shaped exactly like that.' },
        { level: 4, title: 'Guided solution', content: 'Pick the per-class reactions.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Blame read' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Support kept translating “Something went wrong” by hand — four hundred times, one ticket each.',
        },
      ],
      helpLinks: [
        { topicId: 'api.status-codes', label: 'Status codes' },
        { topicId: 'api.error-payloads', label: 'Error payloads' },
      ],
      successFeedback: 'One toast became four reactions — the logs will read like a triage board now.',
      failureFeedback: 'Take the expired session: what is the BEST possible experience, and which option delivers it?',
    },
    {
      id: 'ht-003-c2',
      type: 'multiple-choice',
      title: 'Design the Verdict',
      difficulty: 'medium',
      tags: ['api'],
      storyContext:
        'Now the API side: our own POST /api/registrations returns 200 with { success: false, reason: "email taken" } for rejected registrations. The mobile team just shipped a bug because of it.',
      prompt: 'What is wrong with 200-but-failed, and what should the endpoint return?',
      options: [
        {
          id: 'a',
          label: 'Nothing wrong — the transport succeeded, and success flags in the body are a legitimate style.',
          isCorrect: false,
          feedback:
            'Legitimate and costly: every client must know the private convention, generic HTTP tooling (caches, monitors, interceptors) reads it as success, and one forgetful client ships the mobile bug forever.',
        },
        {
          id: 'b',
          label:
            'A 200 that means failure makes every standard tool lie — error interceptors skip it, monitoring counts it as success, retries never engage. Return 409 (or 422) with a structured body: { code: "EMAIL_TAKEN", field: "email" } — the status routes the handling, the body carries the specifics.',
          isCorrect: true,
          feedback:
            'Status for the CLASS of outcome, body for the DETAIL — every client, interceptor and dashboard now reads the same truth without a secret handshake.',
        },
        {
          id: 'c',
          label: 'Return 500 — from the registering user’s perspective the operation failed, and 5xx guarantees clients treat it as an error.',
          isCorrect: false,
          feedback:
            '500 assigns blame to the SERVER — pagers fire, retries engage against a deterministic rejection, and the real signal (fix your email field) is buried.',
        },
        {
          id: 'd',
          label: 'Keep 200 but add an X-Success: false header so machines can detect failure without parsing bodies.',
          isCorrect: false,
          feedback:
            'A custom header is the same secret handshake at a different address — the standard channel for outcome class already exists and every tool reads it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'List everything that reads status codes WITHOUT reading bodies.' },
        { level: 2, title: 'Concept', content: 'Status = outcome class (machine-routable); body = specifics (human/form-routable).' },
        { level: 3, title: 'Specific clue', content: 'Whose pager should ring for “email taken”? That rules out one option instantly.' },
        { level: 4, title: 'Guided solution', content: 'Pick 409/422 with the structured body.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Verdict designed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The 200-but-failed convention spread to three more endpoints — each client re-learned it by shipping the bug.',
        },
      ],
      helpLinks: [
        { topicId: 'api.status-codes', label: 'Status codes' },
        { topicId: 'api.error-payloads', label: 'Error payloads' },
      ],
      successFeedback: 'Standard channel, structured detail — an API that strangers can use correctly first try.',
      failureFeedback: 'The mobile bug is the tell: what did their generic error handling see when registration failed?',
    },
  ],
  reflectionPrompt: 'Which of our endpoints returns 200 for outcomes that are not success — and which client bug is it currently incubating?',
  rewards: [{ type: 'xp', amount: 10, label: 'Codes honoured' }],
};
