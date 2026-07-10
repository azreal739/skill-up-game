import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — HttpClient returns cold observables: no subscribe, no
 * request; two subscribes, two requests.
 */
export const fnHt001ColdRequests: MissionDefinition = {
  id: 'ht-001-cold-requests',
  campaignId: 'ng-http-api',
  title: 'Cold Until Asked',
  summary:
    'Every HttpClient call returns a cold observable — the request fires per subscription: zero subscribers, zero requests; two subscribers, two requests.',
  difficulty: 'intro',
  learningObjectives: [
    'Explain why an unsubscribed HttpClient call sends nothing',
    'Predict duplicate requests from multiple subscriptions',
    'Connect HTTP behaviour back to the cold-observable model',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'New block: HTTP and API design. It opened with a confession round. Winner: “I once debugged CORS for an hour because my save request never appeared in the network tab. I had not subscribed.”',
    },
    {
      speaker: 'Senior Dev',
      text: 'The RxJS block already taught this — we just had not cashed it in: http.post() BUILDS a request description. Cold. Each subscribe executes it. None: nothing sent. Two: the server sees two. Every HTTP mystery this week reduces to that sentence.',
    },
  ],
  contextArtefacts: [
    {
      id: 'cold-post',
      type: 'code',
      title: 'The confession, reconstructed',
      language: 'ts',
      content:
        "save(draft: Draft) {\n  this.http.post('/api/drafts', draft); // builds it. sends NOTHING.\n}\n\n// meanwhile, elsewhere:\nconst users$ = this.http.get<User[]>('/api/users');\nusers$.subscribe(render);   // request #1\nusers$.subscribe(count);    // request #2 — same line, second execution",
    },
  ],
  challenges: [
    {
      id: 'ht-001-c1',
      type: 'multiple-choice',
      title: 'The Request That Never Was',
      difficulty: 'intro',
      tags: ['angular', 'api'],
      storyContext: 'The confession on screen: this.http.post("/api/drafts", draft); as a full statement. Network tab: empty. CORS: innocent.',
      prompt: 'Why was nothing ever sent?',
      options: [
        {
          id: 'a',
          label: 'The POST body failed serialisation silently — a circular reference in draft cancelled the request.',
          isCorrect: false,
          feedback: 'Serialisation happens at EXECUTION — and execution is exactly what never got triggered.',
        },
        {
          id: 'b',
          label:
            'http.post returns a cold observable — a description of a request. With no subscribe (and no async pipe, no toSignal, no await of firstValueFrom), the description is never executed, so no bytes ever leave the browser.',
          isCorrect: true,
          feedback:
            'The RxJS lesson, cashed in: cold means per-subscription execution, and zero subscriptions means the network tab stays honest and empty.',
        },
        {
          id: 'c',
          label: 'POST requests need an explicit Content-Type header before Angular will dispatch them.',
          isCorrect: false,
          feedback: 'Angular sets JSON headers for you — and a missing header would produce a failed request, not a missing one.',
        },
        {
          id: 'd',
          label: 'The interceptor chain dropped it — some interceptor must be filtering unauthenticated POSTs.',
          isCorrect: false,
          feedback: 'Interceptors run per executed request. Nothing executed, so no interceptor ever saw it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What does http.post RETURN, and what did the code do with it?' },
        { level: 2, title: 'Concept', content: 'Cold observable: a recipe, executed once per subscriber.' },
        { level: 3, title: 'Specific clue', content: 'Count the subscribers to that post. The answer is the request count.' },
        { level: 4, title: 'Guided solution', content: 'Pick the cold-description-never-executed answer.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Cold case closed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'An hour of CORS archaeology for a missing subscribe — and the story repeated with the next hire.',
        },
      ],
      helpLinks: [
        { topicId: 'http.client-observables', label: 'HttpClient & observables' },
        { topicId: 'rx.observables', label: 'Observables' },
      ],
      successFeedback: 'No subscriber, no request — the emptiest network tab is now the easiest diagnosis.',
      failureFeedback: 'Before blaming headers or CORS: did anything EXECUTE the request description?',
    },
    {
      id: 'ht-001-c2',
      type: 'multiple-choice',
      title: 'One Line, Two Orders',
      difficulty: 'easy',
      tags: ['angular', 'api'],
      storyContext:
        'Ops reports every order submits twice. The template: two async pipes reading the same submit$ = this.http.post(...) property set on button click.',
      prompt: 'Why two POSTs, and what is the principled fix?',
      options: [
        {
          id: 'a',
          label: 'A browser retry — POSTs over slow connections are automatically re-sent by the fetch layer.',
          isCorrect: false,
          feedback: 'Browsers never auto-retry POSTs — non-idempotent requests are exactly what retry logic must not touch (mission 5).',
        },
        {
          id: 'b',
          label: 'Angular change detection runs twice in dev mode, doubling any request bound in a template.',
          isCorrect: false,
          feedback: 'CD re-runs re-EVALUATE bindings; the doubling here comes from two SUBSCRIPTIONS to one cold source.',
        },
        {
          id: 'c',
          label: 'The two async pipes race and the slower one wins — remove one pipe and the issue disappears only by luck.',
          isCorrect: false,
          feedback:
            'No race: each async pipe independently subscribes, and each subscription faithfully executes the cold POST. Removing one pipe hides today’s bug and leaves the model misunderstood.',
        },
        {
          id: 'd',
          label:
            'Each async pipe subscribed to the cold POST, and each subscription executed it. Fix by making execution single: submit once in the handler (or share the execution with shareReplay) and let the template read the RESULT, not re-execute the request.',
          isCorrect: true,
          feedback:
            'Cold + two subscribers = two orders, every time. Mutations deserve exactly-one execution wired on purpose — templates read outcomes.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Count subscriptions to submit$. Each async pipe is one.' },
        { level: 2, title: 'Concept', content: 'Cold executes per subscriber — sharing or single-subscribing makes it once.' },
        { level: 3, title: 'Specific clue', content: 'The fix must survive a third async pipe being added next sprint.' },
        { level: 4, title: 'Guided solution', content: 'Pick two-subscriptions-two-executions with the share-the-result fix.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Double order stopped' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Customers were charged twice; support refunded by hand while the “CORS issue” was investigated.',
        },
      ],
      helpLinks: [{ topicId: 'http.client-observables', label: 'HttpClient & observables' }],
      successFeedback: 'Executions counted, mutation made single — the model holds under pressure.',
      failureFeedback: 'The POST is cold. How many things subscribe to it in that template?',
    },
  ],
  reflectionPrompt: 'Where in our app does more than one thing subscribe to the same HTTP call — and which of those calls is a mutation?',
  rewards: [{ type: 'xp', amount: 5, label: 'Wire understood' }],
};
