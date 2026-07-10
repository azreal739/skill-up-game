import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — interceptors: cross-cutting request concerns in one place,
 * immutable request cloning, and chain ordering.
 */
export const fnHt004Interceptors: MissionDefinition = {
  id: 'ht-004-interceptors',
  campaignId: 'ng-http-api',
  title: 'One Gate for Every Request',
  summary:
    'Interceptors see every request and response — auth headers, logging and error policy live once, and requests are cloned, never mutated.',
  difficulty: 'medium',
  learningObjectives: [
    'Move per-call cross-cutting concerns into a functional interceptor',
    'Clone requests immutably instead of mutating them',
    'Reason about interceptor chain ordering',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session four began with a grep: getAuthHeaders() appeared in 41 call sites. Site 42 — the new export feature — forgot it, and shipped a feature that only worked for the developer who was logged in twice.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Cross-cutting concerns go in the pipe every request flows through: an interceptor. Function takes request and next, decorates, forwards. And requests are IMMUTABLE — you clone with changes, you never poke headers onto the original. The DI campaign taught where the decision lives; this is the HTTP edition.',
    },
  ],
  contextArtefacts: [
    {
      id: 'auth-interceptor',
      type: 'code',
      title: 'The 41 call sites, replaced',
      language: 'ts',
      content:
        "export const authInterceptor: HttpInterceptorFn = (req, next) => {\n  const token = inject(TokenStore).current();\n  return token\n    ? next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))\n    : next(req);\n};\n\nprovideHttpClient(withInterceptors([authInterceptor, loggingInterceptor]));",
    },
  ],
  challenges: [
    {
      id: 'ht-004-c1',
      type: 'multiple-choice',
      title: 'Why Clone',
      difficulty: 'medium',
      tags: ['angular', 'api'],
      storyContext:
        'A teammate’s first draft mutated instead: req.headers = req.headers.set("Authorization", ...) — and TypeScript refused, since HttpRequest fields are readonly.',
      prompt: 'Why are requests immutable, forcing the clone?',
      options: [
        {
          id: 'a',
          label: 'Performance — frozen objects let the HTTP backend skip defensive copies when queuing requests.',
          isCorrect: false,
          feedback: 'Any perf effect is incidental — the design reason is correctness under retries and multi-interceptor flows.',
        },
        {
          id: 'b',
          label: 'Serialisation — mutable requests could change while being written to the socket, corrupting the wire format.',
          isCorrect: false,
          feedback: 'Serialisation snapshots the request at send — the danger is earlier, in the chain and in re-execution.',
        },
        {
          id: 'c',
          label:
            'A request can be executed more than once — retries, resubscribes — and flows through a chain of interceptors. If handlers mutated the original, a retry would re-decorate an already-decorated request (double Authorization, doubled params) and interceptors would see each other’s side effects. Immutable + clone means every execution starts from the same clean description.',
          isCorrect: true,
          feedback:
            'The cold-observable model again: the request is a reusable DESCRIPTION. Descriptions that mutate on use cannot be safely reused — the FP sessions called this years ago.',
        },
        {
          id: 'd',
          label: 'Security — immutability prevents malicious code from tampering with requests after they are signed.',
          isCorrect: false,
          feedback:
            'Code in your bundle can always construct new requests — immutability here is about accidental corruption across executions, not adversaries.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Remember: cold observables re-EXECUTE. What re-executes with them?' },
        { level: 2, title: 'Concept', content: 'One description, many executions — mutation would leak state between them.' },
        { level: 3, title: 'Specific clue', content: 'Picture a retry flowing through the auth interceptor a second time.' },
        { level: 4, title: 'Guided solution', content: 'Pick the re-execution + chain-isolation answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Clone justified' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'Readonly was “worked around” with a cast — the double-header bug arrived with the first retry.',
        },
      ],
      helpLinks: [
        { topicId: 'http.interceptors', label: 'Interceptors' },
        { topicId: 'fp.immutability', label: 'Immutability' },
      ],
      successFeedback: 'Descriptions stay clean, executions stay identical — immutability earning its keep on the wire.',
      failureFeedback: 'What happens to a MUTATED request when the retry operator executes it again?',
    },
    {
      id: 'ht-004-c2',
      type: 'multiple-choice',
      title: 'Order the Chain',
      difficulty: 'medium',
      tags: ['angular', 'api'],
      storyContext:
        'Three interceptors exist: auth (adds the token), retry (re-executes transient failures), logging (records request + outcome for observability). The team must order withInterceptors([...]).',
      prompt: 'Which ordering reasoning is correct?',
      options: [
        {
          id: 'a',
          label:
            'Order: [auth, logging, retry] — requests flow through the array in order, so auth decorates first, logging records the FINAL decorated request, and retry sitting last re-executes only its downstream (the actual send), keeping retried attempts tokened and each attempt logged.',
          isCorrect: true,
          feedback:
            'The mental model: each interceptor wraps everything AFTER it. Retry last means “retry the send”; logging after auth means logs show what actually left; auth first means every attempt carries the token.',
        },
        {
          id: 'b',
          label: 'Order is irrelevant — interceptors are independent decorators and the framework composes them commutatively.',
          isCorrect: false,
          feedback:
            'They nest, not commute: retry BEFORE auth would re-run auth per attempt (fine) but logging placed wrong logs undecorated requests or misses retried attempts entirely.',
        },
        {
          id: 'c',
          label: 'Order: [retry, logging, auth] — cheap concerns first, expensive decoration last, so failures skip unnecessary work.',
          isCorrect: false,
          feedback:
            '“Cheap first” is a compute heuristic, not a nesting design: here logging sits inside retry but outside auth — it records tokenless requests that never quite match what was sent.',
        },
        {
          id: 'd',
          label: 'Put retry first always — outermost retry guarantees every other interceptor participates in each attempt.',
          isCorrect: false,
          feedback:
            'Sometimes right, but stated as a law it re-runs token FETCHES per attempt and — with a logging interceptor outside retry — collapses N attempts into one log line, blinding observability exactly during incidents.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Draw it as nesting: first in the array wraps all the rest.' },
        { level: 2, title: 'Concept', content: 'Ask per pair: should THIS one see/repeat THAT one’s work?' },
        { level: 3, title: 'Specific clue', content: 'Two requirements pin it: logs must show real requests; every retry attempt must be visible AND tokened.' },
        { level: 4, title: 'Guided solution', content: 'auth → logging → retry.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Chain ordered' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Logs showed one clean request while the server saw three tokenless retries — the incident review chased ghosts.',
        },
      ],
      helpLinks: [{ topicId: 'http.interceptors', label: 'Interceptors' }],
      successFeedback: 'Wrapping order as design decision — the chain now says what the team means.',
      failureFeedback: 'For each ordering, answer: what EXACTLY appears in the logs when a request fails twice and succeeds?',
    },
  ],
  reflectionPrompt: 'What request concern is copy-pasted across our services today that one interceptor should own?',
  rewards: [{ type: 'xp', amount: 10, label: 'Gate installed' }],
};
