import { MissionDefinition } from '@academy/content-model';

/** Mission 3 — "Type Safety Patrol" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const mission003TypeSafety: MissionDefinition = {
  id: 'foundations-003-type-safety',
  campaignId: 'foundations',
  title: 'Type Safety Patrol',
  summary:
    'Patrol a service file for weak typing before defects escape into production.',
  difficulty: 'medium',
  learningObjectives: [
    'Spot any-typed values that disable the compiler',
    'Recognise unsafe optional access',
    'Understand why narrowing beats assertions',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Defect reports are trickling in from the account page. The platform compiles, but QA keeps finding undefined values at runtime. Intelligence points to a recently merged service.',
    },
    {
      speaker: 'Mission Control',
      text: 'You are on type safety patrol. Review the service and flag every weakness that lets bad data slip past the compiler.',
    },
  ],
  contextArtefacts: [
    {
      id: 'account-service',
      type: 'code',
      title: 'account.service.ts (recently merged)',
      language: 'ts',
      content:
        "export class AccountService {\n  private cache: any = {};\n\n  getDisplayName(account?: Account): string {\n    return account!.firstName + ' ' + account!.lastName;\n  }\n\n  getBalance(id: string): number {\n    const entry = this.cache[id];\n    return entry.balance as number;\n  }\n}",
    },
  ],
  challenges: [
    {
      id: 'foundations-003-c1',
      type: 'code-review',
      title: 'Flag the Weak Typing',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext:
        'Every weakness you miss is a runtime defect waiting for a customer to find it.',
      prompt: 'Select every genuine type-safety issue in account.service.ts.',
      findings: [
        {
          id: 'any-cache',
          label: 'cache is typed as any, so every read from it is unchecked',
          isCorrect: true,
          feedback:
            'any switches the compiler off for everything that flows out of the cache. A Record<string, AccountCacheEntry> keeps reads honest.',
        },
        {
          id: 'string-concat',
          label:
            'Building the display name with + string concatenation is a type error',
          isCorrect: false,
          feedback:
            'Concatenating two strings is stylistically debatable but perfectly type-safe.',
        },
        {
          id: 'as-cast',
          label:
            'entry.balance as number asserts a type instead of validating it',
          isCorrect: true,
          feedback:
            'A cast changes what the compiler believes, not what the value is. If the cache entry is missing or malformed, this still explodes.',
        },
        {
          id: 'non-null-assertion',
          label:
            'account!.firstName uses non-null assertions on an optional parameter',
          isCorrect: true,
          feedback:
            'The ! operator tells the compiler to trust you — but account is genuinely optional, so this throws at runtime when it is undefined. Narrow with an if check instead.',
        },
        {
          id: 'private-cache',
          label: 'The cache field should not be private',
          isCorrect: false,
          feedback:
            'Keeping the cache private is good encapsulation, not a defect.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'Look for places where the code tells the compiler to stop checking.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'any, the non-null assertion (!) and as casts all silence the compiler. Under strict mode the safe alternatives are precise types, narrowing checks and validation.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'There are exactly three offenders: the cache declaration, the two assertions in getDisplayName, and the cast in getBalance.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Flag the any cache, the account! assertions and the as number cast. The string concatenation and the private modifier are fine.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Weak typing patrolled' }],
      consequences: [
        {
          type: 'stability',
          delta: -10,
          reason:
            'Unchecked values reached the account page and crashed it for some customers.',
        },
        {
          type: 'technical-debt',
          delta: 10,
          reason: 'Compiler escape hatches were left in a core service.',
        },
      ],
      helpLinks: [
        {
          topicId: 'typescript.strict-null-checks',
          label: 'Strict null checks',
        },
        { topicId: 'typescript.narrowing', label: 'Narrowing' },
      ],
      successFeedback:
        'The service is honest with the compiler again — strict mode can do its job.',
      failureFeedback:
        'Hunt for the three ways this file silences the compiler: an any, a pair of non-null assertions, and a cast.',
    },
    {
      id: 'foundations-003-c2',
      type: 'multiple-choice',
      title: 'Choose the Safe Fix',
      difficulty: 'medium',
      tags: ['typescript'],
      storyContext:
        'getDisplayName must never throw, even when no account is passed.',
      prompt:
        'Which rewrite of getDisplayName is the safest under strict mode?',
      options: [
        {
          id: 'a',
          label:
            "getDisplayName(account?: Account): string {\n  if (!account) {\n    return 'Guest';\n  }\n  return `${account.firstName} ${account.lastName}`;\n}",
          isCorrect: true,
          feedback:
            'Narrowing with an early return handles the undefined case explicitly, and the compiler verifies every property access after it.',
        },
        {
          id: 'b',
          label:
            "getDisplayName(account?: Account): string {\n  return account!.firstName + ' ' + account!.lastName;\n}",
          isCorrect: false,
          feedback:
            'The assertions remain — this still throws the moment account is undefined.',
        },
        {
          id: 'c',
          label:
            "getDisplayName(account?: any): string {\n  return account?.firstName + ' ' + account?.lastName;\n}",
          isCorrect: false,
          feedback:
            "any drops all checking and the optional chains produce 'undefined undefined' instead of a sensible fallback.",
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'The safest code makes the missing-account case explicit.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Narrowing means checking a value before using it; after the check, TypeScript knows the value exists. It beats assertions because the behaviour is defined for both cases.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'Only one option contains an if statement that handles undefined before any property access.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            "Pick the version with `if (!account) return 'Guest'` — it narrows the optional away and the template string after it is fully checked.",
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Safe fix chosen' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The account page still crashes for signed-out visitors.',
        },
      ],
      helpLinks: [{ topicId: 'typescript.narrowing', label: 'Narrowing' }],
      successFeedback:
        'Explicit narrowing gives defined behaviour for every input.',
      failureFeedback:
        'Assertions and any only hide the problem — look for the option that checks before it accesses.',
    },
  ],
  reflectionPrompt:
    'Why does a non-null assertion (!) feel like a fix but usually is not one? What would you do instead?',
  rewards: [
    { type: 'xp', amount: 5, label: 'Patrol complete' },
    { type: 'badge', id: 'type-guardian', label: 'Type Guardian' },
  ],
};
