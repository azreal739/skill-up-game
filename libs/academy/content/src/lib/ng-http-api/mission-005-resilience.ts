import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — resilience: retry only what is safe to repeat, back off
 * exponentially, time out deliberately, and place catchError with intent.
 */
export const fnHt005Resilience: MissionDefinition = {
  id: 'ht-005-resilience',
  campaignId: 'ng-http-api',
  title: 'Retry What You Dare',
  summary:
    'Retries are re-executions — safe for idempotent reads on transient failures, catastrophic for payments; back off, cap, and time out on purpose.',
  difficulty: 'medium',
  learningObjectives: [
    'Decide which requests may be retried, and on which failures',
    'Configure exponential backoff with caps and jitter rationale',
    'Set timeouts that fail fast instead of hanging forever',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session five had a scar to show: the flash sale. Payment service slowed, a well-meaning retry(3) on the checkout POST turned every slow payment into four payments. The refund script ran for a week.',
    },
    {
      speaker: 'Senior Dev',
      text: 'A retry is a re-execution — mission 1 with a scheduler. So the first question is never “how many times” but “is running this TWICE safe?” GET a product list: yes. POST a payment: catastrophically no. Then WHICH failures: a 503 might heal; a 422 is deterministic — retrying it is just being wrong slower.',
    },
  ],
  contextArtefacts: [
    {
      id: 'retry-policy',
      type: 'code',
      title: 'A retry with a conscience',
      language: 'ts',
      content:
        "this.http.get<Product[]>('/api/products').pipe(\n  timeout(5000),\n  retry({\n    count: 2,\n    delay: (err, attempt) =>\n      isTransient(err) // 5xx, 429, network (0) — never 4xx\n        ? timer(1000 * 2 ** (attempt - 1)) // 1s, 2s\n        : throwError(() => err),\n  }),\n  catchError(showProductsUnavailable)\n)",
    },
  ],
  challenges: [
    {
      id: 'ht-005-c1',
      type: 'multiple-choice',
      title: 'The Four Payments',
      difficulty: 'medium',
      tags: ['api', 'angular'],
      storyContext: 'The post-mortem slide: retry(3) on POST /api/payments, added “for flaky wifi”, quadrupled charges under load.',
      prompt: 'What made this retry catastrophic, and what is the safe design?',
      options: [
        {
          id: 'a',
          label: 'The count was too high — retry(1) would have merely doubled the charges, an acceptable blast radius.',
          isCorrect: false,
          feedback: 'Half a catastrophe is still one — the flaw is retrying a non-idempotent operation at all, not the multiplier.',
        },
        {
          id: 'b',
          label:
            'A timed-out POST may have SUCCEEDED server-side — the response was lost, not the charge. Re-executing it charges again. Safe design: no blind retries on non-idempotent requests; make the operation idempotent with a client-generated idempotency key the server deduplicates on, then retries become safe.',
          isCorrect: true,
          feedback:
            'The heart of it: “no response” ≠ “nothing happened”. Idempotency keys turn “did it work?” from a gamble into a safe question to re-ask.',
        },
        {
          id: 'c',
          label: 'The retry lacked backoff — spacing the attempts out would have let the payment service recover between charges.',
          isCorrect: false,
          feedback: 'Backoff spaces the duplicate charges politely apart. The duplicates are the disease; pacing is a symptom treatment.',
        },
        {
          id: 'd',
          label: 'Retries belong in the interceptor, not per-call — centralising the policy would have caught this in review.',
          isCorrect: false,
          feedback:
            'A centralised WRONG policy multiplies charges on every endpoint at once — placement does not answer the idempotency question.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The timeout fired. What state might the SERVER be in at that moment?' },
        { level: 2, title: 'Concept', content: 'Idempotent = safe to re-execute. GET yes; unguarded payment POST no.' },
        { level: 3, title: 'Specific clue', content: 'There is a header pattern that lets servers deduplicate re-sent operations.' },
        { level: 4, title: 'Guided solution', content: 'Pick lost-response-not-lost-charge, fixed with idempotency keys.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Charges singular' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The refund script became a permanent fixture — retries stayed blind and the sale scar re-opened quarterly.',
        },
      ],
      helpLinks: [{ topicId: 'http.resilience', label: 'Retries & timeouts' }],
      successFeedback: '“No response” is not “nothing happened” — the sentence that ends duplicate charges.',
      failureFeedback: 'Walk the timeline: request sent, server processes, response lost, retry fires. Count the charges.',
    },
    {
      id: 'ht-005-c2',
      type: 'multiple-choice',
      title: 'Tune the Policy',
      difficulty: 'medium',
      tags: ['api', 'angular'],
      storyContext:
        'The dashboard’s GET endpoints get a shared retry policy. Proposal on the table: retry every failure 5 times, immediately, no timeout — “maximum resilience”.',
      prompt: 'What is wrong with maximum resilience, and what does a tuned policy look like?',
      options: [
        {
          id: 'a',
          label: 'Only the missing timeout — infinite waits are the sole flaw; five immediate retries on all failures is standard.',
          isCorrect: false,
          feedback: 'The timeout matters, but retrying 4xx and hammering instantly are each their own incident.',
        },
        {
          id: 'b',
          label: 'It retries too few times — resilient systems retry until success, with the UI showing a spinner throughout.',
          isCorrect: false,
          feedback:
            'Retry-until-success turns every outage into an infinite spinner and an accidental DDoS from your own users.',
        },
        {
          id: 'c',
          label: 'GETs never need retries — they are cheap for users to trigger again by hand; put the effort into error messages.',
          isCorrect: false,
          feedback:
            'One transparent retry saves a real fraction of transient blips — abandoning the tool overcorrects; tuning it is the job.',
        },
        {
          id: 'd',
          label:
            'Three flaws: retrying DETERMINISTIC failures (4xx) is being wrong slower; immediate re-fire hammers a service precisely when it is drowning (exponential backoff exists to let it breathe); and no timeout means slow failures hang the UI for minutes. Tuned: timeout(5s), retry transient-only (5xx/429/0), 2–3 attempts, exponential delay.',
          isCorrect: true,
          feedback:
            'Resilience is not maximised, it is AIMED: at transient failures, with mercy for the struggling server and a fast honest failure for the user.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Test the proposal against a 422, a 503 under load, and a black-holed request.' },
        { level: 2, title: 'Concept', content: 'Retry transient only; back off exponentially; time out deliberately.' },
        { level: 3, title: 'Specific clue', content: 'Immediate retries during an outage are extra load at the worst moment — from every client at once.' },
        { level: 4, title: 'Guided solution', content: 'Pick the three-flaws answer with the tuned policy.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Policy tuned' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: '“Maximum resilience” shipped — the next backend blip arrived with a 5x self-inflicted load multiplier.',
        },
      ],
      helpLinks: [
        { topicId: 'http.resilience', label: 'Retries & timeouts' },
        { topicId: 'api.status-codes', label: 'Status codes' },
      ],
      successFeedback: 'Aimed, spaced and bounded — resilience that helps the server instead of finishing it off.',
      failureFeedback: 'Simulate the 503-under-load case: what do five immediate retries from every open tab do to the service?',
    },
  ],
  reflectionPrompt: 'Which of our requests has a retry today — and for each: is it idempotent, and does the policy skip 4xx?',
  rewards: [{ type: 'xp', amount: 10, label: 'Failures tamed' }],
};
