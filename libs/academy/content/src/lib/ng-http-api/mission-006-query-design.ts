import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — query design: HttpParams immutability, and list endpoint
 * design — pagination, filtering, and the review that catches both.
 */
export const fnHt006QueryDesign: MissionDefinition = {
  id: 'ht-006-query-design',
  campaignId: 'ng-http-api',
  title: 'Ask Precisely',
  summary:
    'HttpParams is immutable like everything on the wire — and a list endpoint’s query design decides whether clients can ask precise questions.',
  difficulty: 'medium',
  learningObjectives: [
    'Build query strings with immutable HttpParams correctly',
    'Design list endpoints: pagination, filtering, stable ordering',
    'Review a list-fetching service against both',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session six, exhibit A: a search that ignored every filter. The code called params.set() three times and threw each result away — the bug we shipped with signals (the same week we learned immutable update there, too).',
    },
    {
      speaker: 'Senior Dev',
      text: 'HttpParams returns a NEW instance from every set — chain or reassign, never fire-and-forget. Then we went deeper: the endpoint itself is a language. limit and offset, cursor tokens, filter params — the design decides whether page 2 is stable while rows are being inserted above it.',
    },
  ],
  contextArtefacts: [
    {
      id: 'params-immutability',
      type: 'code',
      title: 'Exhibit A, and its fix',
      language: 'ts',
      content:
        "// BUG: set() returns new instances; all three discarded\nlet params = new HttpParams();\nparams.set('q', query);\nparams.set('status', 'active');\nparams.set('page', '2');\n\n// FIX: chain — each set feeds the next\nconst params = new HttpParams()\n  .set('q', query)\n  .set('status', 'active')\n  .set('page', '2');",
    },
  ],
  challenges: [
    {
      id: 'ht-006-c1',
      type: 'multiple-choice',
      title: 'Page 2 Moved',
      difficulty: 'medium',
      tags: ['api'],
      storyContext:
        'Bug report from the activity feed: “scrolling to page 2 shows three items I already saw on page 1.” The endpoint: GET /api/events?limit=20&offset=20, ordered by created_at DESC, on a table receiving inserts every second.',
      prompt: 'Why do items repeat, and which design fixes it?',
      options: [
        {
          id: 'a',
          label:
            'Offset counts rows from the CURRENT top: new events inserted above push page-1 rows down into offset 20–39, so page 2 re-serves them. A cursor fixes it — pass the last-seen sort key (?after=<created_at:id>) so page 2 means “strictly older than what I have”, immune to inserts above.',
          isCorrect: true,
          feedback:
            'Offset paginates a moving window by position; a cursor paginates by VALUE. Feeds and anything insert-heavy want the cursor.',
        },
        {
          id: 'b',
          label: 'The client cache is replaying page 1 — add a cache-busting timestamp param to every page request.',
          isCorrect: false,
          feedback:
            'The duplicates come fresh from the server, honestly computed — offset 20 genuinely contains ex-page-1 rows after inserts.',
        },
        {
          id: 'c',
          label: 'created_at DESC is non-deterministic for same-second events — adding id as a tiebreaker fully fixes pagination.',
          isCorrect: false,
          feedback:
            'A tiebreaker IS necessary (and the cursor needs it), but stable ordering alone cannot stop inserts from shifting every offset.',
        },
        {
          id: 'd',
          label: 'Pages should be fetched in one request with limit=40 and split client-side — server pagination is the flaw itself.',
          isCorrect: false,
          feedback: 'A bigger window is a slower version of the same moving window — the 41st insert reintroduces the bug.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Freeze time, insert three rows at the top, re-ask for offset 20. What is there now?' },
        { level: 2, title: 'Concept', content: 'Offset = position in a moving list; cursor = value-anchored continuation.' },
        { level: 3, title: 'Specific clue', content: '“Older than the last item I saw” cannot repeat, no matter what is inserted above.' },
        { level: 4, title: 'Guided solution', content: 'Pick the offset-shifts, cursor-fixes answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Pages anchored' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The feed kept stuttering repeats at every page boundary — users reported it as “the app double-posts”.',
        },
      ],
      helpLinks: [{ topicId: 'http.list-design', label: 'List endpoint design' }],
      successFeedback: 'Position vs value — the pagination distinction that survives production write rates.',
      failureFeedback: 'The server did nothing wrong. Re-compute offset 20 after three inserts and see what it returns.',
    },
    {
      id: 'ht-006-c2',
      type: 'code-review',
      title: 'Review the Search Service',
      difficulty: 'medium',
      tags: ['api', 'angular'],
      storyContext: 'The events-search service goes up for review, fresh from the params lesson.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'search-service',
          type: 'code',
          title: 'event-search.service.ts (proposed)',
          language: 'ts',
          content:
            "search(query: string, status?: string) {\n  let params = new HttpParams().set('q', query);\n  if (status) {\n    params.set('status', status);\n  }\n  return this.http\n    .get<EventPage>('/api/events', { params })\n    .pipe(map((page) => page.items.filter((e) => e.status === status)));\n}",
        },
      ],
      findings: [
        {
          id: 'discarded-set',
          label:
            'Inside the if, params.set("status", status) discards its return value — exhibit A again: the status param never reaches the wire',
          isCorrect: true,
          feedback:
            'HttpParams is immutable: params = params.set(…) or build the chain in one expression. The filter silently never applied — the session’s own bug, resubmitted.',
        },
        {
          id: 'client-refilter',
          label:
            'The map re-filters by status client-side — masking the broken param today, and silently discarding legitimate results whenever status is undefined (e.status === undefined filters everything out)',
          isCorrect: true,
          feedback:
            'Double trouble: it hid the real bug from every manual test, and for status-less searches it compares against undefined and empties the page. Trust the server’s answer or fix the question — never quietly re-answer.',
        },
        {
          id: 'optional-param',
          label: 'Optional filters must always be sent — omit-when-absent forces the server to guess; send status=all explicitly',
          isCorrect: false,
          feedback:
            'Omitting an absent filter is the cleanest contract — “no param” IS the explicit “unfiltered”. Sentinel values like all are the empty-string gift message of query strings.',
        },
        {
          id: 'typed-page',
          label: 'get<EventPage> types the envelope without validating it — this endpoint needs a schema parse before anything reads items',
          isCorrect: false,
          feedback:
            'By the mission-2 policy this is a read-only list feeding a view — tolerable blast radius, generic-typed is proportionate. Flagging every unvalidated GET makes the strict boundaries invisible.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Follow the status value: does it reach the wire? Then what does the map do without it?' },
        { level: 2, title: 'Concept', content: 'Immutable params must be reassigned; clients don’t silently re-answer the server.' },
        { level: 3, title: 'Specific clue', content: 'Run search("deploy") — no status — through the map line.' },
        { level: 4, title: 'Guided solution', content: 'Flag the discarded set and the client-side re-filter.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Service reviewed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The compensating client filter shipped — when the params bug was later fixed, the double-filter emptied every search.',
        },
      ],
      helpLinks: [
        { topicId: 'http.list-design', label: 'List endpoint design' },
        { topicId: 'fp.immutability', label: 'Immutability' },
      ],
      successFeedback: 'The wire asked precisely, the answer trusted fully — search review complete.',
      failureFeedback: 'Two findings describe healthy contracts. Trace query-only and query-plus-status calls end to end.',
    },
  ],
  reflectionPrompt: 'Which of our list endpoints paginates by offset under live inserts — and which client quietly re-filters what the server already answered?',
  rewards: [{ type: 'xp', amount: 10, label: 'Questions precise' }],
};
