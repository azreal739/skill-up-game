import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — securing a whole feature: threat model, review the
 * build against every mission, and sign off the security posture.
 */
export const fnSec009BossSecureFeature: MissionDefinition = {
  id: 'sec-009-boss-secure-feature',
  campaignId: 'ng-security',
  title: 'Boss: Ship It Secure',
  summary:
    'Take a rich, user-facing feature from threat model to signed-off build — every defence in the block applied where it belongs.',
  difficulty: 'boss',
  learningObjectives: [
    'Assemble the block’s defences into one secured feature',
    'Review an implementation for security across all layers',
    'Sign off a security posture, defence in depth included',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The block finale is a feature that touches every lesson: user-generated public comments with rich text, @mentions, and an embedded link preview — displayed to everyone, editable by the author, backed by our API. It is a trust-boundary festival. Secure it end to end.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The sheet: untrusted input validated at the boundary; rich text rendered without XSS; auth token stored to survive an XSS; state-changing calls defended against CSRF; edit/delete authorized on the SERVER, not just hidden; no secrets in the bundle; and a CSP to contain whatever we miss. Model it, build it, prove it.',
    },
  ],
  contextArtefacts: [
    {
      id: 'feature-sheet',
      type: 'code',
      title: 'The secure-feature requirements sheet',
      language: 'text',
      content:
        '1. comment input: validated at the boundary (shape, length); untrusted always\n2. rich text + link preview: rendered XSS-safe (sanitised, no bypass on user data)\n3. auth token: stored so a single XSS cannot exfiltrate it\n4. post/edit/delete: CSRF-defended (SameSite + token, or header auth)\n5. edit/delete: authorized on the SERVER per request, not client-hidden\n6. no secret (link-preview API key) in the bundle; CSP as the containment layer',
    },
  ],
  challenges: [
    {
      id: 'sec-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Model and Shape',
      difficulty: 'hard',
      tags: ['security'],
      storyContext: 'Sheet lines 1, 2 and 6 shape the rendering and secret-handling. Choose the design.',
      prompt: 'Which design matches the sheet?',
      options: [
        {
          id: 'a',
          label:
            'Validate comment shape/length at the boundary (reject oversize/malformed); render rich text via Angular’s sanitising [innerHTML] (formatting kept, scripts/handlers stripped — never bypassSecurityTrust on user text); generate the link PREVIEW server-side (the backend fetches the URL with the secret preview-API key and returns safe, pre-rendered title/description/image — key never ships) and render that preview through the sanitiser too; add a strict CSP as the containment layer.',
          isCorrect: true,
          feedback:
            'Every line served: boundary validation, sanitised rendering with no bypass, secret kept server-side via a backend proxy, and CSP behind it all. The link preview is the trap — fetching it client-side would leak the key and trust a third-party response.',
        },
        {
          id: 'b',
          label:
            'Sanitise the comment once on submit (strip anything script-like) and store the cleaned HTML; render it with [innerHTML]; fetch the link preview client-side with the preview API key from environment.ts.',
          isCorrect: false,
          feedback:
            'Two failures: store-time-only sanitisation bakes in whatever your filter missed (and is context-blind), and the preview key in environment.ts ships in the bundle (mission 7). Sanitise at RENDER via the framework, and proxy the key.',
        },
        {
          id: 'c',
          label:
            'Allow full HTML in comments for expressiveness, wrapped in bypassSecurityTrustHtml so formatting survives; fetch previews client-side but restrict the API key by referrer.',
          isCorrect: false,
          feedback:
            'bypassSecurityTrust on USER comments is the cardinal XSS sin (mission 2), and a referrer-restricted client key is still a public, abusable key. This design ships the two headline vulnerabilities of the block.',
        },
        {
          id: 'd',
          label:
            'Render comments as plain escaped text only (no rich text) and drop link previews entirely — the only fully safe feature is a featureless one.',
          isCorrect: false,
          feedback:
            'Over-correction throws away the feature: rich text CAN be safe via the sanitiser, and previews CAN be safe via a server proxy. Security engineering enables features safely, it does not delete them.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Map lines 1, 2, 6 to their missions; watch where the preview key lives.' },
        { level: 2, title: 'Concept', content: 'Boundary validation + sanitised render + server-side secret + CSP.' },
        { level: 3, title: 'Specific clue', content: 'Who should fetch the link preview — the browser (with the key) or your backend?' },
        { level: 4, title: 'Guided solution', content: 'Pick the sanitised-render + server-proxied-preview + CSP design.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Feature shaped' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The client-fetched-preview design shipped — the preview key was scraped and the store-time sanitiser missed a novel vector.',
        },
      ],
      helpLinks: [
        { topicId: 'sec.xss', label: 'Cross-site scripting' },
        { topicId: 'sec.secrets', label: 'Secrets & config' },
      ],
      successFeedback: 'Validated, sanitised, secret server-side, CSP behind — stage 1 clear.',
      failureFeedback: 'Two designs ship a public key; two mishandle user HTML. Which one does neither?',
    },
    {
      id: 'sec-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Build',
      difficulty: 'hard',
      tags: ['security', 'angular'],
      storyContext: 'The comment feature’s implementation lands. Hold it against the whole block.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'comment-impl',
          type: 'code',
          title: 'comment feature (proposed)',
          language: 'ts',
          content:
            "// rendering\n<div [innerHTML]=\"comment.html\"></div>   // via DomSanitizer — ok\n\n// auth\nlocalStorage.setItem('token', jwt);       // read in an interceptor for the header\n\n// delete\ndelete(id: string) {\n  // button hidden with @if (comment.authorId === me.id)\n  return this.http.delete(`/api/comments/${id}`); // server checks ownership? …\n}\n\n// mention lookup\nsearchUsers(q: string) {\n  return this.http.get(`/api/users?q=${q}`);  // q from the mention box\n}",
        },
      ],
      findings: [
        {
          id: 'token-in-localstorage',
          label:
            'The auth JWT lives in localStorage while the same feature renders user-generated rich text — the highest-risk XSS surface in the app sits next to a token any script can read: one missed vector = account takeover. Move the token to an httpOnly cookie (mission 3) so an XSS on this very feature cannot exfiltrate it',
          isCorrect: true,
          feedback:
            'This is the block’s two lessons colliding: rich-text rendering is where XSS is most likely, and localStorage is where the token is most exposed. Sheet line 3 exists precisely to break that pairing.',
        },
        {
          id: 'delete-client-authz',
          label:
            'Delete relies on the button being hidden for non-authors, and the comment only asks "server checks ownership? …" — if the DELETE endpoint does not independently verify the caller owns the comment, anyone can delete any comment via a direct call (mission 5). Server-side ownership authorization is mandatory, not optional',
          isCorrect: true,
          feedback:
            'The hidden button is UX; the server is the gate. As written, deletion authorization is unconfirmed on the only layer that matters — a curl DELETE to /api/comments/<any-id> is the test this must pass.',
        },
        {
          id: 'innerhtml-sanitised',
          label: 'Using [innerHTML] for comment.html is unsafe for user content — all user rich text must be plain-text escaped instead',
          isCorrect: false,
          feedback:
            'Backwards: [innerHTML] runs the DomSanitizer, which keeps safe formatting while stripping scripts/handlers — exactly right for sanctioned rich text (as long as no bypass is used, and it is not here). Forcing plain text would needlessly kill the rich-text feature. This line is correct.',
        },
        {
          id: 'mention-query-encoding',
          label: 'searchUsers interpolates q into the URL without encodeURIComponent — a mention like "a&b=c" corrupts the query, and unencoded user input in a URL is a hygiene/security smell',
          isCorrect: false,
          feedback:
            'A real hygiene nit worth a comment (use HttpParams / encodeURIComponent) — but not a security VULNERABILITY of the class this review targets: HttpClient encodes params when you use the params API, and the value lands in a query the server parameterises. Flag it as cleanup; the two real holes are the token and the delete authz. (Marking this as the critical finding while missing those would fail the review.)',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Find the token’s neighbourhood, then curl the delete endpoint in your head.' },
        { level: 2, title: 'Concept', content: 'XSS surface + localStorage token = takeover; hidden button ≠ authorization.' },
        { level: 3, title: 'Specific clue', content: 'Two findings attack correct/minor code; two are the real holes.' },
        { level: 4, title: 'Guided solution', content: 'Flag the localStorage token and the client-only delete authz.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Build reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The token stayed in localStorage beside the rich-text renderer, and delete authz stayed client-only — the feature shipped two critical holes.',
        },
      ],
      helpLinks: [
        { topicId: 'sec.tokens', label: 'Token storage' },
        { topicId: 'sec.authz', label: 'Authorization' },
      ],
      successFeedback: 'Token relocated, delete authorized server-side, correct code spared — review at block standard.',
      failureFeedback: 'The critical findings are the token’s location and the unproven delete authz. Two other lines are correct or cosmetic.',
    },
    {
      id: 'sec-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the Posture',
      difficulty: 'boss',
      tags: ['security'],
      storyContext: 'The feature is fixed. Two proposals for the overall security posture — the sheet decides what ships.',
      prompt: 'Which posture ships?',
      options: [
        {
          id: 'a',
          label:
            'Layered, assume-breach: boundary validation + sanitised rendering (no bypass) + httpOnly SameSite cookie for the token + anti-CSRF token on state-changing calls + server-side authorization on every comment mutation + link-preview key proxied server-side + a strict CSP (scripts self, connect-src our API) as containment — with a note of residual risks and a dependency-audit cadence for the rich-text/sanitiser libraries.',
          isCorrect: true,
          feedback:
            'Every sheet line met, defence in depth throughout, and — crucially — it assumes some layer will fail and contains that failure (CSP, httpOnly, server authz). It even watches the supply chain of the very libraries doing the sanitising. Signed.',
        },
        {
          id: 'b',
          label:
            'Prevention-maximised: an extremely thorough input sanitiser (allowlist tags, strip everything else) as the single, well-tested defence — with such strong sanitisation, CSP, httpOnly and server re-checks are redundant overhead that slow the team down.',
          isCorrect: false,
          feedback:
            'The block’s core error in one option: betting everything on one perfect layer. A future dependency, a novel vector, or a missed sink defeats the single wall — and with no httpOnly, no CSP, no server authz behind it, that one miss is total. Defence in depth is not overhead; it is the plan for when prevention fails.',
        },
        {
          id: 'c',
          label:
            'The full layered stack from option A, but with the token kept in localStorage (guarded by the strong sanitiser) to simplify the interceptor, and CSP in report-only mode indefinitely so it never risks breaking a legitimate resource.',
          isCorrect: false,
          feedback:
            'Two quiet downgrades undo the depth: localStorage re-pairs the token with the XSS surface (the sanitiser is exactly the layer assumed to occasionally fail), and a permanently report-only CSP observes attacks without BLOCKING them — containment that never contains. Close to right is still exposed.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which posture still protects the user when ONE layer fails next year?' },
        { level: 2, title: 'Concept', content: 'Assume breach: every control has a layer behind it; CSP must enforce, not just report.' },
        { level: 3, title: 'Specific clue', content: 'Option C’s two "simplifications" each remove a layer the others depend on.' },
        { level: 4, title: 'Guided solution', content: 'Sign the layered, enforcing, assume-breach posture.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Posture signed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The single-sanitiser posture shipped — one dependency CVE in the rich-text library later turned into stored XSS with nothing behind it.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The security block’s capstone bet on one perfect wall — the exact mindset session one set out to replace.',
        },
      ],
      helpLinks: [
        { topicId: 'sec.threat-modeling', label: 'Threat modeling' },
        { topicId: 'sec.secrets', label: 'Secrets & config' },
      ],
      successFeedback:
        'Validated, sanitised, token out of reach, CSRF-defended, server-authorized, secret server-side, CSP enforcing — a feature secured in depth, breach assumed. Campaign complete.',
      failureFeedback:
        'Play the tape forward: one layer fails next year. Which posture still protects the user — and which was one bug from catastrophe?',
    },
  ],
  reflectionPrompt: 'Take our riskiest user-generated-content feature: walk it against the six sheet lines. Which line has no layer behind it today?',
  rewards: [{ type: 'xp', amount: 25, label: 'Feature secured' }],
};
