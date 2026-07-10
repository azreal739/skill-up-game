import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — the orders client: one service assembling the whole
 * block: cold-execution discipline, validated boundaries, interceptor
 * policy, aimed resilience, coherent caching and honoured contracts.
 */
export const fnHt009BossOrdersClient: MissionDefinition = {
  id: 'ht-009-boss-orders-client',
  campaignId: 'ng-http-api',
  title: 'Boss: The Orders Client',
  summary:
    'Rebuild the orders data layer to the sheet — every lesson of the block visible in one service, from idempotency keys to cache resets.',
  difficulty: 'boss',
  learningObjectives: [
    'Assemble the block’s patterns into one API client design',
    'Review an orders client against the whole block',
    'Sign off the client that handles money over an unreliable wire',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The block finale is the service that scared us into these sessions: orders. It double-charged in the flash sale, showed stale lists after cancellations, and broke mobile with a rename. Rebuild it as if the sessions had come first.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The sheet: list orders with a cache the mutations reset; place orders exactly once per user intent, safe under retries; validate what touches money; react to failures by class; and never break the promise the endpoints already made to mobile.',
    },
  ],
  contextArtefacts: [
    {
      id: 'orders-sheet',
      type: 'code',
      title: 'The orders client requirements sheet',
      language: 'text',
      content:
        '1. orders$ list: fetched once, shared, RESET by place/cancel mutations\n2. placeOrder: exactly one charge per user intent — safe even when responses are lost\n3. order payloads validated at the boundary (money = strict per policy)\n4. failures handled by class: 401 re-auth, 422 to the form, 5xx/0 transient-retry GETs only\n5. request decoration (auth, tracing) in interceptors — zero per-call headers',
    },
  ],
  challenges: [
    {
      id: 'ht-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Shape the Client',
      difficulty: 'hard',
      tags: ['api', 'angular'],
      storyContext: 'Requirements 1, 2 and 5 fix the service’s skeleton. Choose it.',
      prompt: 'Which design matches the sheet?',
      options: [
        {
          id: 'a',
          label:
            'orders$ = refresh$.pipe(switchMap(() => http.get(...).pipe(retryTransient())), shareReplay(1)); placeOrder(cmd) POSTs once with a client-generated Idempotency-Key header, taps refresh$.next() on success; auth/tracing live in interceptors.',
          isCorrect: true,
          feedback:
            'Sheet lines 1, 2 and 5 by construction: shared list with mutation-owned resets, one intent one key (retries dedupe server-side), decoration centralised. The skeleton the block was building all along.',
        },
        {
          id: 'b',
          label:
            'Each component fetches its own orders (no shared cache — freshness first); placeOrder uses retry(2) for reliability; auth headers added per call by a shared getAuthHeaders() helper.',
          isCorrect: false,
          feedback:
            'Three sheet lines down: per-component fetches are the 14-widget problem (line 1), blind retry on an unkeyed POST is the flash-sale double charge (line 2), and the helper is the 41-call-sites grep (line 5).',
        },
        {
          id: 'c',
          label:
            'orders$ cached in a service field on first fetch with a 60s TTL; placeOrder POSTs then mutates the cached array in place to append the new order; interceptors carry auth.',
          isCorrect: false,
          feedback:
            'TTL means up to a minute of lying after mutations (line 1 wants mutation-owned resets), and in-place cache mutation is the same-reference no-notification trap — the signals campaign and mission 7 both buried it.',
        },
        {
          id: 'd',
          label:
            'A WebSocket streams the order list so no cache exists to invalidate; placeOrder emits an order event over the socket; REST remains only for auth.',
          isCorrect: false,
          feedback:
            'An architecture swap the sheet never asked for — and “no cache” is false: the client-side list IS a cache, now with reconnect-and-replay semantics to design from scratch, plus line 4’s status-code taxonomy abandoned.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Map lines 1, 2, 5 to the missions that solved each before comparing.' },
        { level: 2, title: 'Concept', content: 'Shared stream + refresh subject; idempotency key per intent; interceptor decoration.' },
        { level: 3, title: 'Specific clue', content: '“Exactly once per user intent” with lost responses has exactly one known answer.' },
        { level: 4, title: 'Guided solution', content: 'Pick the refresh$/shareReplay/Idempotency-Key skeleton.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Skeleton chosen' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The freshness-first design shipped — the orders page became the app’s heaviest API consumer within a sprint.',
        },
      ],
      helpLinks: [
        { topicId: 'http.caching', label: 'Caching & revalidation' },
        { topicId: 'http.resilience', label: 'Retries & timeouts' },
      ],
      successFeedback: 'Three requirements, three mechanisms, one skeleton — stage 1 clear.',
      failureFeedback: 'Replay the flash sale against each option: where does the second charge come from?',
    },
    {
      id: 'ht-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Build',
      difficulty: 'hard',
      tags: ['api', 'angular'],
      storyContext: 'A teammate’s implementation of the skeleton. Hold it against all eight sessions.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'orders-service',
          type: 'code',
          title: 'orders.service.ts (proposed)',
          language: 'ts',
          content:
            "readonly orders$ = this.refresh$.pipe(\n  switchMap(() => this.http.get<unknown>('/api/orders').pipe(\n    map((body) => orderListSchema.parse(body)),\n    retry({ count: 2, delay: backoffTransient })\n  )),\n  shareReplay({ bufferSize: 1, refCount: true })\n);\n\nplaceOrder(cmd: PlaceOrder) {\n  const key = crypto.randomUUID();\n  return this.http\n    .post<unknown>('/api/orders', cmd, {\n      headers: { 'Idempotency-Key': key },\n    })\n    .pipe(\n      map((body) => orderSchema.parse(body)),\n      retry({ count: 2, delay: backoffTransient }),\n      tap(() => this.refresh$.next())\n    );\n}",
        },
      ],
      findings: [
        {
          id: 'retry-after-parse',
          label:
            'In orders$, retry sits AFTER the schema parse — a contract-drift ParseError gets “retried” twice like a network blip, refetching an endpoint that will fail identically and delaying the loud boundary failure the policy wants',
          isCorrect: true,
          feedback:
            'Order matters in pipes: retry belongs on the TRANSPORT (inside, next to the get), parse on the RESULT. As written, deterministic validation failures burn the retry budget before surfacing.',
        },
        {
          id: 'key-per-execution',
          label:
            'placeOrder generates the Idempotency-Key OUTSIDE the request but the retry re-executes only the cold POST with the SAME key — wait, the key is fixed per call… flag: the key should be regenerated per attempt so the server sees distinct requests',
          isCorrect: false,
          feedback:
            'Careful — the fixed key is the ENTIRE point: retries re-sending the same key is what lets the server deduplicate a possibly-already-processed order. Per-attempt keys would re-arm the double charge.',
        },
        {
          id: 'unvalidated-nothing',
          label: 'Both payloads are parsed with schemas per the money policy — but the parse happens before catchError exists anywhere: a 422’s error body is never unpacked for the form (sheet line 4)',
          isCorrect: true,
          feedback:
            'The service handles success and transport retries but line 4 is unimplemented: nothing maps HttpErrorResponse classes to reactions — 422 field errors, 401 re-auth. The caller receives raw transport errors.',
        },
        {
          id: 'refcount-cache',
          label: 'refCount: true drops the cache when the last subscriber leaves — the orders page unsubscribing means the next visit refetches; bufferSize alone should be used for a permanent cache',
          isCorrect: false,
          feedback:
            'Refetch-on-return is the SAFER default for mutable data like orders — a permanent buffer holds stale lists across long idle gaps. refCount here is a defensible, arguably correct choice, not a defect.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check pipe ORDER in orders$, then hunt for sheet line 4 anywhere.' },
        { level: 2, title: 'Concept', content: 'Retry transport, not parses; idempotency keys are fixed per INTENT.' },
        { level: 3, title: 'Specific clue', content: 'One finding argues FOR re-arming the double charge — do not take the bait.' },
        { level: 4, title: 'Guided solution', content: 'Flag the retry-after-parse and the missing error-class handling.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Build reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'Schema failures retried like blips — the drift incident surfaced minutes later than the boundary was built to report.',
        },
      ],
      helpLinks: [
        { topicId: 'http.resilience', label: 'Retries & timeouts' },
        { topicId: 'api.error-payloads', label: 'Error payloads' },
      ],
      successFeedback: 'Pipe order audited, missing requirement named, and the trap finding refused — review at block standard.',
      failureFeedback: 'One finding would reintroduce the flash-sale bug if accepted. Reread what idempotency keys are FOR.',
    },
    {
      id: 'ht-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the Client',
      difficulty: 'boss',
      tags: ['api', 'angular'],
      storyContext: 'Two finished clients remain. The sheet — all five lines — decides what handles the money.',
      prompt: 'Which orders client ships?',
      options: [
        {
          id: 'a',
          label:
            'Shared orders$ with mutation resets; placeOrder with idempotency key and transport-level retry; schemas on both payloads; a per-call catchError that toasts “Order failed — please retry” for every failure class; auth in interceptors.',
          isCorrect: false,
          feedback:
            'Four lines pass — and line 4 fails in the oldest way: one toast for four worlds. A 422 telling the user WHICH field is wrong, a 401 needing re-auth and a 503 worth retrying all collapse into the same apology.',
        },
        {
          id: 'b',
          label:
            'Shared orders$ with mutation resets; placeOrder exactly-once via idempotency key; strict schemas on money payloads; errors mapped by class (401 → re-auth flow with returnTo, 422 → typed field errors for the form, transient → auto-retry GETs and a retry OFFER on the order); auth and tracing interceptors, zero per-call headers.',
          isCorrect: true,
          feedback:
            'All five lines, each with its block mechanism — and the user-facing distinction that matters: the form learns its field errors, sessions restore themselves, and only genuinely transient failures spend the retry budget. Signed.',
        },
        {
          id: 'c',
          label:
            'Same as the signed design, but placeOrder auto-retries transparently on timeout (with its idempotency key) AND optimistically appends the order to the cached list before the response arrives, rolling back on failure.',
          isCorrect: false,
          feedback:
            'Close — the key makes the auto-retry SAFE, but showing an order as placed before any confirmation, on a MONEY flow, trades line 2’s spirit for perceived speed: a rollback after “order confirmed” is the worst message in commerce. Optimism belongs on renames, not charges.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'All three share the skeleton — the sheet’s line 4 and the money-UX judgement decide.' },
        { level: 2, title: 'Concept', content: 'Errors by class is not error tolerance — it is four different user experiences.' },
        { level: 3, title: 'Specific clue', content: 'Which candidate can show “order placed” for an order that never was?' },
        { level: 4, title: 'Guided solution', content: 'Sign the class-mapped, non-optimistic-on-money candidate.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Client signed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The optimistic variant shipped — support inherited “it said confirmed, then vanished” tickets within the week.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The block’s capstone repeated the one-toast mistake its own session three dissected.',
        },
      ],
      helpLinks: [
        { topicId: 'http.contract-design', label: 'API contract design' },
        { topicId: 'api.status-codes', label: 'Status codes' },
        { topicId: 'http.caching', label: 'Caching & revalidation' },
      ],
      successFeedback:
        'Shared and resettable, exactly-once, validated, class-handled, centrally decorated — the orders client the flash sale deserved. Campaign complete.',
      failureFeedback:
        'Hold each against line 4 first, then ask: on a MONEY flow, when may the UI claim success?',
    },
  ],
  reflectionPrompt: 'Take our riskiest write endpoint: which sheet line does its client fail today, and what would the flash-sale version of that failure look like?',
  rewards: [{ type: 'xp', amount: 25, label: 'Orders rebuilt' }],
};
