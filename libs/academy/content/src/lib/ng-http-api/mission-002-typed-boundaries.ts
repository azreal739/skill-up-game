import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — typed requests and honest boundaries: http.get<T> is a
 * promise you make, not a check the wire performs; validate what matters.
 */
export const fnHt002TypedBoundaries: MissionDefinition = {
  id: 'ht-002-typed-boundaries',
  campaignId: 'ng-http-api',
  title: 'The Type Is a Promise',
  summary:
    'http.get<User[]> types your code, not the wire — the generic is an assertion you make about the server, and boundaries that matter get validated.',
  difficulty: 'easy',
  learningObjectives: [
    'Say precisely what http.get<T> does and does not guarantee',
    'Decide which responses deserve runtime validation',
    'Design DTOs that keep wire shapes out of app models',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session two started with a production stack trace: “toFixed is not a function” — deep in the invoice page, weeks after an API “cleanup” quietly turned amounts from numbers into strings.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The client code was typed http.get<Invoice[]> the whole time. The generic never checked anything — it is YOU promising the compiler what the server sends. When the server broke the promise, the compiler had no idea. TypeScript ends at the wire; the wire is where validation begins.',
    },
  ],
  contextArtefacts: [
    {
      id: 'promise-not-check',
      type: 'code',
      title: 'Promise vs check',
      language: 'ts',
      content:
        "// a PROMISE — no runtime effect whatsoever\nthis.http.get<Invoice[]>('/api/invoices');\n\n// a CHECK — the boundary made honest\nthis.http.get<unknown>('/api/invoices').pipe(\n  map((body) => invoiceListSchema.parse(body)) // throws loudly on drift\n);",
    },
  ],
  challenges: [
    {
      id: 'ht-002-c1',
      type: 'multiple-choice',
      title: 'What the Generic Does',
      difficulty: 'easy',
      tags: ['typescript', 'api'],
      storyContext: 'The stack trace and the typed call are side by side. A teammate asks how a typed request produced an untyped crash.',
      prompt: 'What does the generic in http.get<Invoice[]> actually do?',
      options: [
        {
          id: 'a',
          label:
            'It types the OBSERVABLE for your code — a compile-time assertion about what the server will send, with zero runtime presence: whatever JSON arrives is handed over as-is, matching or not.',
          isCorrect: true,
          feedback:
            'The generic is erased like every TS type (the DI campaign’s erasure lesson, at the wire): your code is consistent with your promise — and the promise itself is unverified.',
        },
        {
          id: 'b',
          label: 'It makes Angular validate the response shape and throw an HttpErrorResponse on mismatch.',
          isCorrect: false,
          feedback:
            'Nothing validates — if it did, the toFixed crash would have been a clean boundary error at the fetch instead of a mystery two components later.',
        },
        {
          id: 'c',
          label: 'It sets the Accept header so the server knows which schema version to return.',
          isCorrect: false,
          feedback: 'Headers are runtime; generics are compile-time. The server never learns anything from your type parameter.',
        },
        {
          id: 'd',
          label: 'It coerces the parsed JSON — string amounts arriving where numbers are declared get converted.',
          isCorrect: false,
          feedback: 'No coercion exists — the string sailed through typed-as-number, which is precisely how toFixed found it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Compile time or runtime — where does a generic live?' },
        { level: 2, title: 'Concept', content: 'Type erasure: the wire never sees your types.' },
        { level: 3, title: 'Specific clue', content: 'If the generic checked anything, where would the crash have surfaced?' },
        { level: 4, title: 'Guided solution', content: 'Pick the compile-time-promise answer.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Promise named' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The team kept trusting generics as guarantees — the next API drift also debuted as a component crash.',
        },
      ],
      helpLinks: [
        { topicId: 'api.dto', label: 'DTOs' },
        { topicId: 'zod.runtime-validation', label: 'Runtime validation' },
      ],
      successFeedback: 'A promise you make, not a check the wire performs — boundaries stay honest once that lands.',
      failureFeedback: 'Trace the string amount: at what point COULD anything have objected, given only a generic?',
    },
    {
      id: 'ht-002-c2',
      type: 'multiple-choice',
      title: 'Where to Spend Validation',
      difficulty: 'easy',
      tags: ['typescript', 'api'],
      storyContext:
        'The reaction PR validates every response in the app with strict schemas — including the analytics beacon ack and a 3rd-party weather widget.',
      prompt: 'What is the right validation policy?',
      options: [
        {
          id: 'a',
          label: 'Ship it — every byte crossing the wire must be schema-checked or the boundary is theatre.',
          isCorrect: false,
          feedback:
            'Uniform strictness has a cost: the weather widget’s harmless extra field now CRASHES a page that only wanted a temperature. Proportion is part of the design.',
        },
        {
          id: 'b',
          label: 'Revert it all — the generic plus good server-side tests make client validation redundant.',
          isCorrect: false,
          feedback:
            'The invoice crash happened WITH a well-tested server — drift arrives via deploys, proxies and third parties the server tests never see.',
        },
        {
          id: 'c',
          label:
            'Validate by blast radius: strict schemas where wrong shapes corrupt money, state or storage (invoices, orders, the save file); tolerant parsing with safe fallbacks for cosmetic data (weather, acks) — and every validation failure logged loudly, never swallowed.',
          isCorrect: true,
          feedback:
            'Validation is insurance — priced by what the crash costs. Strict where drift corrupts, tolerant where drift merely disappoints, loud everywhere.',
        },
        {
          id: 'd',
          label: 'Validate only in dev and strip schemas from production builds to keep the bundle lean.',
          isCorrect: false,
          feedback:
            'Drift happens in production BY DEFINITION — dev-only validation checks the one environment where the server matches by construction.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Ask per endpoint: what breaks, and how badly, if this shape is wrong?' },
        { level: 2, title: 'Concept', content: 'Blast radius pricing: strict for money/state, tolerant for cosmetics.' },
        { level: 3, title: 'Specific clue', content: 'The weather widget crashing a dashboard is the over-validation failure mode.' },
        { level: 4, title: 'Guided solution', content: 'Pick the proportional, loud-on-failure policy.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Budget spent' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'All-or-nothing validation flip-flopped twice — each reversal rewrote the same twenty services.',
        },
      ],
      helpLinks: [
        { topicId: 'zod.safe-parse', label: 'safeParse' },
        { topicId: 'api.contract-drift', label: 'Contract drift' },
      ],
      successFeedback: 'Insurance priced by blast radius — a policy the team can actually sustain.',
      failureFeedback: 'Compare failure modes: unvalidated invoice drift vs a weather widget rejecting an extra field.',
    },
  ],
  reflectionPrompt: 'Which of our endpoints could change shape tomorrow and corrupt something that persists — and is anything checking it today?',
  rewards: [{ type: 'xp', amount: 5, label: 'Boundary honest' }],
};
