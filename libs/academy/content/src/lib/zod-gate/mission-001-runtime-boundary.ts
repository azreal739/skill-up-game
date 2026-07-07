import { MissionDefinition } from '@academy/content-model';

/** Zod Gate 1 — "Runtime Boundary" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const zodMission001RuntimeBoundary: MissionDefinition = {
  id: 'zod-gate-001-runtime-boundary',
  campaignId: 'zod-gate',
  title: 'Runtime Boundary',
  summary: 'Find the one place external data enters the app and decide what belongs there.',
  difficulty: 'easy',
  learningObjectives: [
    'Locate the runtime trust boundary in a data flow',
    'Understand why the boundary is where validation belongs',
    'Distinguish compile-time types from runtime guarantees',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Welcome to the Zod Gate. The Java services feed our Angular app, and lately they have been feeding it surprises. Before we validate anything, you need to see where the danger enters.',
    },
    {
      speaker: 'Mission Control',
      text: 'Trace the customer data from the network to the component and mark the boundary — the exact seam where you stop trusting and start verifying.',
    },
  ],
  contextArtefacts: [
    {
      id: 'data-flow',
      type: 'diagram',
      title: 'Customer data flow',
      content:
        'Java API  →  HttpClient.get<Customer>()  →  CustomerService  →  DashboardComponent  →  template',
    },
    {
      id: 'http-call',
      type: 'code',
      title: 'customer.service.ts',
      language: 'ts',
      content:
        "getCustomer(id: string): Observable<Customer> {\n  return this.http.get<Customer>(`/api/customers/${id}`);\n}",
    },
  ],
  challenges: [
    {
      id: 'zod-gate-001-c1',
      type: 'multiple-choice',
      title: 'Mark the Boundary',
      difficulty: 'easy',
      tags: ['api', 'typescript', 'zod'],
      storyContext: 'The <Customer> generic on http.get looks like validation, but it is not.',
      prompt: 'Where is the runtime trust boundary, and what does http.get<Customer>() actually guarantee?',
      options: [
        {
          id: 'a',
          label:
            'The boundary is the HTTP response; http.get<Customer>() only casts the type — it performs no runtime check',
          isCorrect: true,
          feedback:
            'Exactly. The generic is a compile-time promise the server may break; the response is the seam where a schema must verify reality.',
        },
        {
          id: 'b',
          label: 'The boundary is the template; Angular validates bindings at runtime',
          isCorrect: false,
          feedback:
            'By the template the bad data has already flowed through the whole app — and Angular checks bindings, not payload shape.',
        },
        {
          id: 'c',
          label: 'There is no boundary; the <Customer> generic guarantees the shape at runtime',
          isCorrect: false,
          feedback:
            'Generics are erased at build time. http.get<Customer> returns whatever the server sent, typed as Customer on faith.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Ask which step in the flow is the first that the front end does not control.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'A trust boundary is where data crosses from a system you do not control into one you do. TypeScript generics describe expectations; they never inspect the actual bytes at runtime.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'http.get<Customer> types the result but runs no check — so the boundary is the response itself.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'The HTTP response is the boundary, and the <Customer> generic is only a cast. Select that option.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Boundary marked' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Unverified payloads kept flowing straight into components.',
        },
      ],
      helpLinks: [
        { topicId: 'zod.runtime-validation', label: 'Runtime validation' },
        { topicId: 'api.contract-drift', label: 'Contract drift' },
      ],
      successFeedback:
        'The boundary is the response, and a generic is not a guard. That is where the Zod Gate stands.',
      failureFeedback:
        'Follow the data: the boundary is the first step the front end cannot control, and a generic never checks runtime data.',
    },
  ],
  reflectionPrompt: 'In your own codebase, how many HTTP calls use a generic as if it were validation?',
  rewards: [{ type: 'xp', amount: 5, label: 'Gate opened' }],
};
