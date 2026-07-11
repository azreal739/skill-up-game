import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — reviewing AI-generated code: the same scrutiny as human
 * code, plus the AI-specific failure modes.
 */
export const fnAi003ReviewingAiCode: MissionDefinition = {
  id: 'ai-003-reviewing-ai-code',
  campaignId: 'ai-assisted-engineering',
  title: 'Review It Like You Wrote It',
  summary:
    'AI-generated code needs the same review as any code — plus attention to its signature failures: hallucinated APIs, subtle logic bugs, outdated patterns, and missing edge cases.',
  difficulty: 'medium',
  learningObjectives: [
    'Apply full code-review scrutiny to AI output',
    'Watch for AI-specific failure modes',
    'Never merge AI code you do not understand',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session three: the code review discipline meets AI. Our worst AI incident was not a hallucination — it was a plausible, clean, well-formatted function with a subtle off-by-one that passed a cursory glance BECAUSE it looked so professional. The polish disarmed the reviewer. Human sloppy code gets scrutinised; AI’s confident polish gets waved through.',
    },
    {
      speaker: 'Senior Dev',
      text: 'AI code gets the FULL review — correctness, security, performance, tests, the lot — every principle from the testing and security and architecture campaigns. PLUS the AI-specific failure modes: hallucinated APIs (does this method exist?), subtle logic bugs hidden by clean formatting, OUTDATED patterns (trained on old code — NgModules when you use standalone, deprecated RxJS), missing edge cases (the happy path looks perfect), and security anti-patterns stated with confidence. The rule that prevents all of it: never merge code you do not UNDERSTAND, no matter how good it looks.',
    },
  ],
  contextArtefacts: [
    {
      id: 'ai-review-checklist',
      type: 'code',
      title: 'Reviewing AI code: normal + AI-specific',
      language: 'text',
      content:
        'NORMAL REVIEW  correctness, security, perf, tests, readability (as any code)\nAI-SPECIFIC\n  hallucinated  does this API/method/option actually exist? (check docs/types)\n  subtle bugs   clean formatting hides off-by-ones, wrong conditions — read it\n  outdated      trained on old code: NgModules vs standalone, deprecated APIs\n  edge cases    the happy path is polished; empty/null/error paths often missing\n  confident-wrong security anti-patterns stated as best practice\n\nrule: never merge code you don’t UNDERSTAND — polish is not correctness',
    },
  ],
  challenges: [
    {
      id: 'ai-003-c1',
      type: 'multiple-choice',
      title: 'Disarmed by Polish',
      difficulty: 'medium',
      tags: ['ai'],
      storyContext:
        'A reviewer approves an AI-generated pagination function in 30 seconds — "it looks clean and professional". It ships an off-by-one that skips every 20th record. The reviewer says "it looked correct".',
      prompt: 'What went wrong in the review, and what is the discipline?',
      options: [
        {
          id: 'a',
          label:
            'The reviewer graded on POLISH, not correctness — AI output is clean and confident, which disarms scrutiny that human sloppy code would trigger. AI code needs the SAME (or more) review than any code: actually read the logic, check boundaries, run it against edge cases, verify APIs exist. "Looks professional" is not a review — the formatting is exactly what makes AI’s subtle bugs slip through. Never approve code you have not genuinely understood, regardless of how good it looks.',
          isCorrect: true,
          feedback:
            'Polish is a hazard, not a signal: it lowers the reviewer’s guard precisely when AI’s subtle logic bugs need it raised. Apply full scrutiny — read the boundaries, test the edges — because clean formatting correlates with nothing about correctness.',
        },
        {
          id: 'b',
          label: 'The AI should have written tests for the pagination function; then the off-by-one would have been caught.',
          isCorrect: false,
          feedback:
            'AI-written tests need review too (they may test the buggy behaviour, or miss the boundary) and are no substitute for the reviewer understanding the code. The failure was a 30-second polish-based approval; tests help but the review discipline is the fix.',
        },
        {
          id: 'c',
          label: 'Off-by-ones are unavoidable in pagination; add a manual QA pass for all pagination features.',
          isCorrect: false,
          feedback:
            'Off-by-ones are very catchable by actually reading the boundary logic — the reviewer skipped that because the code looked clean. A manual QA backstop is fine, but the root cause is approving unreviewed AI output, not the inherent difficulty of pagination.',
        },
        {
          id: 'd',
          label: 'Trust AI for simple functions like pagination and only deeply review complex ones.',
          isCorrect: false,
          feedback:
            'The off-by-one WAS in a "simple" function — simplicity does not make AI output correct, and "simple" is exactly where reviewers relax and subtle bugs hide. All AI code gets real review; there is no safe tier to rubber-stamp.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What did the reviewer grade on in 30 seconds — appearance or logic?' },
        { level: 2, title: 'Concept', content: 'Polish disarms scrutiny; AI code needs full review, boundaries read.' },
        { level: 3, title: 'Specific clue', content: 'Would reading the boundary condition have caught the off-by-one?' },
        { level: 4, title: 'Guided solution', content: 'Pick review-for-correctness-not-polish; understand before approving.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Polish resisted' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The polished off-by-one shipped — every 20th record was silently skipped in reports for weeks before a customer noticed.',
        },
      ],
      helpLinks: [
        { topicId: 'ai.reviewing', label: 'Reviewing AI code' },
        { topicId: 'test.behaviour', label: 'Testing behaviour' },
      ],
      successFeedback: 'Graded on logic, not looks — AI’s polish no longer disarms the review.',
      failureFeedback: 'The code LOOKED correct. What did the reviewer skip that would have caught the off-by-one?',
    },
    {
      id: 'ai-003-c2',
      type: 'code-review',
      title: 'Review the AI’s Output',
      difficulty: 'medium',
      tags: ['ai', 'angular'],
      storyContext: 'An AI generated this Angular service on request. Review it for the AI-specific failure modes.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'ai-service',
          type: 'code',
          title: 'ai-generated user.service.ts',
          language: 'ts',
          content:
            "@NgModule({ providers: [UserService] })  // registers the service\nexport class UserModule {}\n\n@Injectable()\nexport class UserService {\n  constructor(private http: HttpClient) {}\n\n  getUser(id: string) {\n    return this.http.get<User>(`/api/users/${id}`)\n      .pipe(retryWhen(errors => errors.delay(1000)));  // retry on error\n  }\n\n  getActiveUsers(users: User[]) {\n    return users.filter(u => u.status = 'active');  // active users only\n  }\n}",
          },
        ],
      findings: [
        {
          id: 'assignment-in-filter',
          label:
            'getActiveUsers uses u.status = "active" (assignment) instead of === (comparison) inside filter — it ASSIGNS "active" to every user’s status (truthy), so it returns ALL users AND mutates them; a classic subtle bug hidden by clean formatting',
          isCorrect: true,
          feedback:
            'The signature AI subtle bug: = vs ===, invisible at a glance, catastrophic in effect (returns everyone, corrupts the input array). Exactly the kind of logic error polish hides — you catch it only by reading the condition.',
        },
        {
          id: 'deprecated-retrywhen',
          label:
            'retryWhen(errors => errors.delay(1000)) uses a DEPRECATED/outdated RxJS pattern (retryWhen is deprecated; errors.delay isn’t how it works) — the AI reproduced an old-training-data idiom instead of the current retry({ delay }) API',
          isCorrect: true,
          feedback:
            'The outdated-pattern failure mode: models trained on older code emit deprecated APIs (retryWhen) with confidence. The current, correct form is retry({ count, delay }) — this reproduces a stale idiom that may not even compile as written.',
        },
        {
          id: 'ngmodule-usage',
          label:
            'The service is registered via an @NgModule and @Injectable() has no providedIn — an outdated pattern for a standalone-components codebase; should be @Injectable({ providedIn: "root" }) with no module',
          isCorrect: true,
          feedback:
            'Another outdated-training artifact: NgModule registration in a standalone app. The modern form is providedIn: "root" (tree-shakable, no module) — the AI defaulted to the older idiom it saw more of in training.',
        },
        {
          id: 'http-get-generic',
          label: 'http.get<User> trusts the response shape without runtime validation — this is an unsafe boundary the AI should have Zod-parsed',
          isCorrect: false,
          feedback:
            'A fair general point (the HTTP/security campaigns favour boundary validation for high-blast-radius data), but a generic typed GET is proportionate and standard for a read like this, and flagging it here misses that it is NOT an AI-specific defect nor wrong as written — the three real issues (assignment bug, deprecated retry, NgModule) are the AI failure modes to catch. Over-flagging the routine line while those stand would be a weak review.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Read the filter CONDITION character by character, then check the RxJS and DI idioms for currency.' },
        { level: 2, title: 'Concept', content: 'AI-specific modes: subtle logic bug + outdated patterns (retryWhen, NgModule).' },
        { level: 3, title: 'Specific clue', content: 'One finding is a routine, proportionate line, not an AI defect.' },
        { level: 4, title: 'Guided solution', content: 'Flag the = vs ===, retryWhen, and NgModule; leave the typed GET.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'AI output reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The = vs === bug shipped — getActiveUsers returned everyone and silently mutated the array, corrupting downstream state.',
        },
      ],
      helpLinks: [{ topicId: 'ai.reviewing', label: 'Reviewing AI code' }],
      successFeedback: 'Subtle bug, deprecated RxJS, and NgModule caught; the routine line spared — AI review at full scrutiny.',
      failureFeedback: 'Three lines are AI failure modes (a logic bug and two outdated idioms). One is routine. Which three?',
    },
  ],
  reflectionPrompt: 'When we review AI-generated PRs, do we read the logic and check API currency — or does the clean formatting earn a faster approval than human code would?',
  rewards: [{ type: 'xp', amount: 10, label: 'AI code reviewed' }],
};
