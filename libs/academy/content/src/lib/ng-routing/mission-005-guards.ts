import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — route guards: functional canActivate, UrlTree redirects
 * versus bare false, and what guards must never do.
 */
export const fnRt005Guards: MissionDefinition = {
  id: 'rt-005-guards',
  campaignId: 'ng-routing',
  title: 'Guards at the Gate',
  summary:
    'canActivate decides whether a navigation proceeds — allow with true, redirect with a UrlTree, and never strand the user on false.',
  difficulty: 'medium',
  learningObjectives: [
    'Write a functional canActivate guard with inject()',
    'Return a UrlTree redirect instead of a dead false',
    'Keep guards pure deciders — no side-effect navigation',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session five began with a support ticket: “clicked a report link from my email, page just… did nothing.” The user was logged out, the guard returned false, and the app sat there silently on a blank outlet.',
    },
    {
      speaker: 'Senior Dev',
      text: 'A guard is a function the router calls mid-navigation: true means proceed, false means cancel, and a UrlTree means go THERE instead. False is almost never what you want a human to experience — the guard that knows why you cannot enter also knows where you should go.',
    },
  ],
  contextArtefacts: [
    {
      id: 'auth-guard',
      type: 'code',
      title: 'The guard, said properly',
      language: 'ts',
      content:
        "export const authGuard: CanActivateFn = (route, state) => {\n  const auth = inject(AuthService);\n  const router = inject(Router);\n  return auth.isLoggedIn()\n    ? true\n    : router.createUrlTree(['/login'], {\n        queryParams: { returnTo: state.url },\n      });\n};\n\n// { path: 'reports', canActivate: [authGuard], loadChildren: … }",
    },
  ],
  challenges: [
    {
      id: 'rt-005-c1',
      type: 'multiple-choice',
      title: 'The Silent Nothing',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'The old guard: return this.auth.isLoggedIn(); — logged-out users click, the navigation cancels, no feedback.',
      prompt: 'What is the right guard behaviour for the logged-out case?',
      options: [
        {
          id: 'a',
          label: 'Keep returning false but add a global router-events listener that shows a toast on NavigationCancel.',
          isCorrect: false,
          feedback:
            'A global toast guesses at WHY navigation cancelled — guards cancel for many reasons. The knowledge lives in the guard; the reaction should too.',
        },
        {
          id: 'b',
          label: 'Return false and call router.navigate(["/login"]) inside the guard before returning.',
          isCorrect: false,
          feedback:
            'A navigation INSIDE a navigation — two racing router operations, history pollution, and the exact reentrancy the UrlTree return exists to prevent.',
        },
        {
          id: 'c',
          label:
            'Return router.createUrlTree(["/login"], { queryParams: { returnTo: state.url } }) — the router cancels the blocked navigation and atomically redirects, and after login the user lands where the email pointed.',
          isCorrect: true,
          feedback:
            'One return value, three wins: no dead click, no racing navigations, and returnTo preserves the user’s actual intent.',
        },
        {
          id: 'd',
          label: 'Throw an UnauthorizedError from the guard so the global error handler routes to login.',
          isCorrect: false,
          feedback:
            'Being logged out is an expected state, not an exception — routing policy through error handlers makes every log line a lie.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The guard KNOWS why entry is denied. Which option keeps that knowledge in one place?' },
        { level: 2, title: 'Concept', content: 'Guard returns: true = proceed, false = dead stop, UrlTree = redirect atomically.' },
        { level: 3, title: 'Specific clue', content: 'The email link should still work AFTER login — something must carry the URL.' },
        { level: 4, title: 'Guided solution', content: 'UrlTree to /login with returnTo.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Gate humanised' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Dead clicks from every expired session — users diagnosed it as “the site is down” and called support.',
        },
      ],
      helpLinks: [{ topicId: 'routing.guards', label: 'Route guards' }],
      successFeedback: 'Deny with a destination — the gate now explains itself.',
      failureFeedback: 'Compare false and UrlTree from the USER’s chair: what happens on screen for each?',
    },
    {
      id: 'rt-005-c2',
      type: 'multiple-choice',
      title: 'Where the Guard Sits',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Review question: the admin area is lazy (loadChildren) and needs an admin-role check. A teammate put roleGuard in canActivate on every one of the 14 admin child routes.',
      prompt: 'What is the better placement, and what extra win does laziness offer?',
      options: [
        {
          id: 'a',
          label:
            'Move the guard UP: canActivate on the admin parent covers every child in one declaration — and canMatch goes further, rejecting before the router even downloads the lazy chunk, so non-admins never fetch admin code.',
          isCorrect: true,
          feedback:
            'Guards inherit down the tree — one parent declaration beats 14 copies. canMatch adds the bandwidth win: no match, no chunk.',
        },
        {
          id: 'b',
          label: 'Keep all 14 — per-route guards are required because children can be deep-linked directly.',
          isCorrect: false,
          feedback:
            'Deep links traverse the PARENT route too — its canActivate runs on every path into the subtree. That is the whole point of placing it there.',
        },
        {
          id: 'c',
          label: 'Replace the guard with an *ngIf on the admin layout that hides content for non-admins.',
          isCorrect: false,
          feedback:
            'Template hiding still runs resolvers, still downloads the chunk, and still puts admin routes in history — decoration, not access control.',
        },
        {
          id: 'd',
          label: 'Check the role once at login and store an isAdmin flag; guards on routes are redundant after that.',
          isCorrect: false,
          feedback:
            'The flag EXISTS so guards can read it — but something must still consult it per navigation, or any URL paste walks in.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: '14 copies of one rule is the smell. Where does the rule belong?' },
        { level: 2, title: 'Concept', content: 'Guards on a parent cover the subtree; canMatch guards the chunk download itself.' },
        { level: 3, title: 'Specific clue', content: 'What does a non-admin’s browser download under each option?' },
        { level: 4, title: 'Guided solution', content: 'One parent-level guard; canMatch for the bandwidth bonus.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Gate placed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'Route 15 was added without the guard — the copy-paste rule missed exactly once, which was enough.',
        },
      ],
      helpLinks: [
        { topicId: 'routing.guards', label: 'Route guards' },
        { topicId: 'routing.lazy-loading', label: 'Lazy loading' },
      ],
      successFeedback: 'One rule, one place, enforced before the download — gate architecture done.',
      failureFeedback: 'Ask of each option: what stops the 15th route from forgetting the rule?',
    },
  ],
  reflectionPrompt: 'Which of our guards returns a bare false — and what does the user see when it fires?',
  rewards: [{ type: 'xp', amount: 10, label: 'Gates guarded' }],
};
