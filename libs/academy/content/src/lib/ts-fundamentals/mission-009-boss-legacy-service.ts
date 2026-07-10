import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — everything from the session applied to one artefact:
 * the untyped payments helper that started the whole skill-up initiative.
 */
export const fnTs009BossLegacyService: MissionDefinition = {
  id: 'ts-fund-009-boss-legacy-service',
  campaignId: 'ts-fundamentals',
  title: 'Boss: Rescue the Legacy Payments Helper',
  summary:
    'The untyped helper that motivated the skill-up. Type its data, its states and its failures — for good.',
  difficulty: 'boss',
  learningObjectives: [
    'Apply unions, narrowing and Result to one real module',
    'Replace implicit any at a public boundary',
    'Choose types that make the invalid states unrepresentable',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'This is the file that started it all. Three production incidents traced back to payments.helper.ts — every one of them a type the compiler could have caught.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Everything from the sessions applies: model the states as a union, return failures as data, and let nothing cross this boundary unchecked. Take it slow — this is the real thing.',
    },
  ],
  contextArtefacts: [
    {
      id: 'legacy-helper',
      type: 'code',
      title: 'payments.helper.ts (as found)',
      language: 'ts',
      content:
        "export function processPayment(payment) {\n  if (payment.state == 'pending' || payment.state == 'retrying') {\n    const amount = Number(payment.amount);\n    if (isNaN(amount)) throw new Error('bad amount');\n    return { ok: true, charged: amount };\n  }\n  return false;\n}",
    },
  ],
  challenges: [
    {
      id: 'tsf-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Model the States',
      difficulty: 'hard',
      tags: ['typescript'],
      storyContext:
        "payment.state is compared against strings scattered through the file: 'pending', 'retrying', 'settled', 'failed'.",
      prompt: 'What should the state field become?',
      options: [
        {
          id: 'a',
          label: 'state: string — the values are already consistent in practice',
          isCorrect: false,
          feedback:
            "Practice is what produced incident #2: a 'canceled'/'cancelled' drift between two files.",
        },
        {
          id: 'b',
          label: 'state: boolean — pending true, settled false, retries handled elsewhere',
          isCorrect: false,
          feedback:
            'Four real states forced into two — retrying and failed become unrepresentable, so they get faked in other fields.',
        },
        {
          id: 'c',
          label: "state: 'pending' | 'retrying' | 'settled' | 'failed'",
          isCorrect: true,
          feedback:
            'The controlled set becomes the contract — every comparison in the file is now spell-checked by the compiler.',
        },
        {
          id: 'd',
          label: 'state: number — an index into a STATES array keeps it compact',
          isCorrect: false,
          feedback:
            'Magic numbers are magic strings with less readability — state 2 tells a reader nothing, and any number compiles.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The valid states are a small, known, fixed set.' },
        {
          level: 2,
          title: 'Concept',
          content: 'Literal unions turn a value set into a compile-time contract — mission 2, applied.',
        },
        { level: 3, title: 'Specific clue', content: 'Four states, four literals. Nothing more compact stays honest.' },
        {
          level: 4,
          title: 'Guided solution',
          content: "Choose the literal union of the four real states.",
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'States modelled' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The stringly state field survived its rescue and the drift class of bugs stayed open.',
        },
      ],
      helpLinks: [{ topicId: 'typescript.union-types', label: 'Union types' }],
      successFeedback: 'Contract locked: four states, spelled one way, everywhere.',
      failureFeedback: 'Mission 2’s lesson: a fixed value set belongs in the type, not in scattered strings.',
    },
    {
      id: 'tsf-009-c2',
      type: 'multiple-choice',
      title: 'Stage 2 — Return Failure as Data',
      difficulty: 'hard',
      tags: ['typescript'],
      storyContext:
        'Today the helper throws for bad amounts, returns false for wrong states, and returns an object on success — three exits, three shapes.',
      prompt: 'Which return design should the rescue adopt?',
      options: [
        {
          id: 'a',
          label:
            "type ProcessResult =\n  | { kind: 'charged'; amount: number }\n  | { kind: 'rejected'; reason: string };\n// throw only for programmer errors",
          isCorrect: true,
          feedback:
            'One channel, tagged and exhaustive — callers switch on kind and the compiler proves both cases handled.',
        },
        {
          id: 'b',
          label: 'Return boolean and log the details — callers only need success or failure',
          isCorrect: false,
          feedback:
            'Incident #3 was exactly this: the reason lived in a log nobody joined to the request. Callers needed it.',
        },
        {
          id: 'c',
          label: 'Keep throwing for every failure so callers cannot forget to handle errors',
          isCorrect: false,
          feedback:
            'Exceptions are invisible in signatures — the forgetting you fear is exactly what try-less call sites did.',
        },
        {
          id: 'd',
          label: 'Return { ok: boolean; charged?: number; reason?: string } — one shape fits all',
          isCorrect: false,
          feedback:
            'The optional-everything bag makes invalid states representable: ok: true with a reason, ok: false with a charge.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Mission 4’s pattern is built for exactly this function.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'A discriminated union returns success and failure as data on one channel, with nothing optional.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Beware the option where ok: true could coexist with a failure reason — representable invalid states.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Pick the tagged ProcessResult union; reserve throw for genuine programmer errors.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Failures made explicit' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Callers kept guessing which of three exits fired, and one guess was wrong in production.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.discriminated-unions', label: 'Discriminated unions' },
      ],
      successFeedback: 'Three exits became one honest channel. Incident #3 is structurally impossible now.',
      failureFeedback:
        'Count the exits a caller must handle today, then find the design that reduces them to one typed channel.',
    },
    {
      id: 'tsf-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the Boundary',
      difficulty: 'boss',
      tags: ['typescript', 'api'],
      storyContext:
        'Two final signatures are proposed for the rescued helper. Payments data arrives from the gateway as parsed JSON.',
      prompt: 'Which contract is safe to ship?',
      options: [
        {
          id: 'a',
          label:
            'export function processPayment(payment: Payment): ProcessResult\n// callers assert: processPayment(gatewayJson as Payment)',
          isCorrect: false,
          feedback:
            'The as at every call site is the same unverified trust the old helper had — moved, not removed.',
        },
        {
          id: 'b',
          label:
            'export function processPayment(input: unknown): ProcessResult\n// validates input to Payment inside, rejecting with kind: "rejected"',
          isCorrect: true,
          feedback:
            'The boundary owns its own validation: unknown in, checked Payment inside, tagged rejection out. Nothing crosses unverified.',
        },
        {
          id: 'c',
          label:
            'export function processPayment(payment: any): ProcessResult\n// any in, typed result out — pragmatic compromise',
          isCorrect: false,
          feedback:
            'any at the entrance lets a malformed payment reach the arithmetic — the typed result is a clean exit from a dirty room.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Where should the validation live: every caller, or the boundary itself?' },
        {
          level: 2,
          title: 'Concept',
          content:
            'Mission 8’s rule: boundary data is unknown until checked. The function that owns the boundary owns the check.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'One option centralises the check; the other two scatter or skip it.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Choose unknown-in, validated-inside, ProcessResult-out — the contract that cannot be called unsafely.',
        },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Boundary signed off' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The rescued helper still trusted its callers, and the next malformed payload walked straight in.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The rescue shipped with the old hole — the team’s faith in the refactor took the hit.',
        },
      ],
      helpLinks: [
        { topicId: 'typescript.unknown-vs-any', label: 'unknown vs any' },
        { topicId: 'zod.runtime-validation', label: 'Validating at boundaries' },
      ],
      successFeedback:
        'unknown in, evidence inside, tagged result out. The helper that caused three incidents now prevents them.',
      failureFeedback:
        'A contract is only safe if it cannot be called unsafely. Check what each signature lets a careless caller do.',
    },
  ],
  reflectionPrompt:
    'The rescue used unions, Result and unknown — which of the three would have prevented the earliest incident?',
  rewards: [{ type: 'xp', amount: 25, label: 'Legacy rescued' }],
};
