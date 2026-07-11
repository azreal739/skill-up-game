import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — authorization: the client enforces UX, the server enforces
 * security; never trust the front-end to gatekeep.
 */
export const fnSec005Authz: MissionDefinition = {
  id: 'sec-005-authz',
  campaignId: 'ng-security',
  title: 'The Client Cannot Say No',
  summary:
    'Front-end access checks are UX, not security — the server must independently authorize every request, because the client is fully under the attacker’s control.',
  difficulty: 'hard',
  learningObjectives: [
    'Distinguish client-side UX gating from server-side authorization',
    'Recognise the hidden-button and disabled-route fallacies',
    'Design authorization that assumes a hostile client',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session five, the myth that has caused more breaches than any clever exploit: “the admin panel is safe because we hide it from non-admins”. A junior — correctly — opened the network tab, saw the /api/admin/users call, replayed it from their own non-admin session with curl, and got the whole user list. The button was hidden. The endpoint was wide open.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The entire front end runs on the ATTACKER’S machine. They can edit your JavaScript, flip your feature flags, un-hide your buttons, forge your requests, ignore your route guards. So client-side checks are USER EXPERIENCE — show the right things to the right people. SECURITY is the server independently authorizing every single request against the real identity. If only the client checks, there is no check.',
    },
  ],
  contextArtefacts: [
    {
      id: 'client-vs-server',
      type: 'code',
      title: 'Two different jobs',
      language: 'ts',
      content:
        "// CLIENT: UX only — hide what this user shouldn't bother with\n@if (user.isAdmin()) { <a routerLink=\"/admin\">Admin</a> }\ncanActivate: [adminGuard]   // stops honest navigation, NOT curl\n\n// SERVER: the ONLY real gate — every request re-checks identity\n// POST /api/admin/users → verify token → load real role → 403 if not admin\n// the client's claim of \"isAdmin\" is never trusted; the server decides",
    },
  ],
  challenges: [
    {
      id: 'sec-005-c1',
      type: 'multiple-choice',
      title: 'The Hidden Admin Panel',
      difficulty: 'hard',
      tags: ['security', 'angular'],
      storyContext: 'The replayed /api/admin/users call. A dev proposes fixing it by “adding an admin route guard so non-admins cannot reach the page”.',
      prompt: 'Why does that not fix the breach?',
      options: [
        {
          id: 'a',
          label:
            'The route guard stops honest NAVIGATION in the browser, but the breach bypassed the browser entirely — curl (or the network tab’s replay) called the API directly, never touching Angular’s router. The fix is on the SERVER: /api/admin/users must verify the caller’s real role from their token and return 403 for non-admins. The guard is worth keeping for UX, but it guards a door the attacker walked around.',
          isCorrect: true,
          feedback:
            'Guards, hidden buttons and disabled fields all live in the client — the attacker skips the client. Only the server, re-checking identity per request, actually authorizes. The guard improves UX; it is not the fix.',
        },
        {
          id: 'b',
          label: 'It does fix it — with the guard in place, non-admins cannot load the component that makes the call.',
          isCorrect: false,
          feedback:
            'The attacker never loaded the component — they called the endpoint with curl. Nothing about a client route guard reaches an out-of-band HTTP request.',
        },
        {
          id: 'c',
          label: 'The real fix is to obfuscate/minify the bundle so attackers cannot find the /api/admin/users URL.',
          isCorrect: false,
          feedback:
            'Security through obscurity fails instantly — the URL is visible in the network tab the moment ANY admin uses the feature, and minification hides nothing from a proxy. The endpoint must reject unauthorized callers, found or not.',
        },
        {
          id: 'd',
          label: 'Add the user’s role to the request body so the server knows who is calling and can check it.',
          isCorrect: false,
          feedback:
            'A client-supplied role is attacker-controlled — they will send {"role":"admin"}. The server must derive identity from the authenticated TOKEN it verifies, never from a field the client fills in.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The attack used curl. Which of these defences does curl even encounter?' },
        { level: 2, title: 'Concept', content: 'Client guards = UX; the server is the only real authorizer.' },
        { level: 3, title: 'Specific clue', content: 'Where must the caller’s role be checked so that an out-of-band request cannot skip it?' },
        { level: 4, title: 'Guided solution', content: 'Server verifies role per request; return 403.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Real gate found' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'Another guard was added and the endpoint stayed open — the user list remained one curl command from any logged-in account.',
        },
      ],
      helpLinks: [{ topicId: 'sec.authz', label: 'Authorization' }],
      successFeedback: 'The server is the gate; the client is the sign on the door — the breach closes on the server.',
      failureFeedback: 'Replay the attack with curl in your head. Which listed defence stops it?',
    },
    {
      id: 'sec-005-c2',
      type: 'multiple-choice',
      title: 'What the Client SHOULD Do',
      difficulty: 'hard',
      tags: ['security', 'angular'],
      storyContext:
        'Over-correcting, a dev argues: “since the server is the only real security, we should DELETE all our route guards and role checks from the client — they are security theatre”.',
      prompt: 'What is the right role for client-side checks?',
      options: [
        {
          id: 'a',
          label:
            'Keep them — as UX, not security. Client checks give the RIGHT EXPERIENCE: don’t show an admin link to non-admins, don’t let a user navigate to a page that will only 403, disable a submit the server will reject. This is real value (usability, fewer confusing errors), it is just not a SECURITY boundary. The mental model: client checks decide what to SHOW; the server decides what to ALLOW. Both exist; they do different jobs.',
          isCorrect: true,
          feedback:
            'Deleting client checks makes a correctly-secured app hostile to use — users click into dead 403s. The lesson was never “client checks are worthless”; it was “client checks are not SECURITY”. Keep them for UX, secure on the server.',
        },
        {
          id: 'b',
          label: 'Delete them — any client check risks lulling the team into thinking the client is secure; a clean server-only model is safer.',
          isCorrect: false,
          feedback:
            'Removing UX gating does not make the server more secure — it just degrades the experience (dead links, confusing 403s) while the server does the identical job it already did. The risk is miscommunication, fixed by understanding, not deletion.',
        },
        {
          id: 'c',
          label: 'Keep them but treat matching client and server rules as a security requirement — they must never diverge.',
          isCorrect: false,
          feedback:
            'Enforced parity sounds tidy but misframes it: the server is authoritative REGARDLESS of what the client thinks, so a divergence is a UX bug (wrong thing shown), never a security hole. Chasing perfect parity as a security control wastes effort on the non-authoritative layer.',
        },
        {
          id: 'd',
          label: 'Replace them with a single top-level check that hides the whole app section, simpler than per-route guards.',
          isCorrect: false,
          feedback:
            'Granularity is a UX design choice, not the point — coarse or fine, it is still only UX. The question is the ROLE of client checks, and the answer is “experience, not security”, at whatever granularity serves users.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'If you delete client checks, what happens to a non-admin’s experience?' },
        { level: 2, title: 'Concept', content: 'Client decides what to SHOW; server decides what to ALLOW.' },
        { level: 3, title: 'Specific clue', content: 'A user clicking into a page that only ever 403s — is that good UX?' },
        { level: 4, title: 'Guided solution', content: 'Keep client checks as UX; secure on the server.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Roles clarified' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The guards were deleted as “theatre” — non-admins now hit raw 403s across the app and flooded support with “broken” reports.',
        },
      ],
      helpLinks: [{ topicId: 'sec.authz', label: 'Authorization' }],
      successFeedback: 'Show vs allow — client and server each doing the job only they can.',
      failureFeedback: 'The server’s security does not change if you delete client checks. What DOES change for the user?',
    },
  ],
  reflectionPrompt: 'Pick one privileged endpoint: if an attacker replays it from a non-privileged session with curl, what stops them — a client guard, or the server?',
  rewards: [{ type: 'xp', amount: 15, label: 'Authorization real' }],
};
