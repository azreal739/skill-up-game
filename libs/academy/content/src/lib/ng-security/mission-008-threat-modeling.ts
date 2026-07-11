import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — threat modeling a feature: thinking like an attacker,
 * and reviewing a feature design for security holes before it ships.
 */
export const fnSec008ThreatModeling: MissionDefinition = {
  id: 'sec-008-threat-modeling',
  campaignId: 'ng-security',
  title: 'Think Like the Attacker',
  summary:
    'Threat modeling asks, before a line ships: what could go wrong, who would want it to, and what stops them — turning security from reaction into design.',
  difficulty: 'hard',
  learningObjectives: [
    'Threat-model a feature by asset, actor and entry point',
    'Apply the block’s defences in a design review',
    'Prioritise threats by likelihood and impact',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session eight turned everything into a habit. Before we build a feature, we spend fifteen minutes asking three questions: what is worth attacking here (the ASSETS), who would attack it and why (the ACTORS), and how could they get in (the ENTRY POINTS). It is not a ceremony — it is the difference between designing security in and bolting it on after the incident.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Threat modeling is structured pessimism. Walk the data: where does it enter (trust boundaries), what is sensitive (assets), who touches it (actors, including insiders and the confused-deputy). Then for each threat, ask likelihood × impact and match a defence you already know — validate, encode, authorize server-side, store secrets away, contain with CSP. The output is a short list of “here is what could go wrong and what we did about it” — before the attacker writes their own version.',
    },
  ],
  contextArtefacts: [
    {
      id: 'threat-model',
      type: 'code',
      title: 'The fifteen-minute model',
      language: 'text',
      content:
        'ASSETS       what’s worth stealing/breaking? (user data, tokens, money, integrity)\nACTORS       who attacks & why? (external, malicious user, compromised account,\n             curious insider, automated bot)\nENTRY POINTS where can they act? (each trust boundary from mission 1)\nTHREATS      per entry × asset: what goes wrong? rank by likelihood × impact\nDEFENCES     match each real threat to a known control; note residual risk',
    },
  ],
  challenges: [
    {
      id: 'sec-008-c1',
      type: 'multiple-choice',
      title: 'Model the Feature',
      difficulty: 'hard',
      tags: ['security'],
      storyContext:
        'New feature: users upload a profile avatar (image), which is shown on their public profile and in comments across the app. Fifteen-minute threat model — where do you start?',
      prompt: 'Which threats does a good model surface first?',
      options: [
        {
          id: 'a',
          label:
            'Walk asset × entry point: the UPLOAD is an untrusted entry (validate file type/size server-side — a “png” can be an HTML/SVG file that executes if served inline; malicious filenames; zip-bomb / oversized DoS); the DISPLAY is an output sink shown to EVERYONE (an SVG avatar with an embedded script is stored XSS hitting every viewer — serve user images from a separate origin / with Content-Disposition, never inline SVG as-is); and STORAGE/serving (path traversal in filenames, serving other users’ private files). Rank: stored-XSS via avatar (high impact, affects all viewers) first.',
          isCorrect: true,
          feedback:
            'The model connects the block: upload = trust boundary needing validation, display = XSS sink needing safe rendering, and the highest likelihood×impact (stored XSS reaching every viewer) rises to the top. That is design-time security.',
        },
        {
          id: 'b',
          label: 'The main threat is bandwidth — large uploads cost money; add a file-size limit and the feature is secure.',
          isCorrect: false,
          feedback:
            'Size limits address one DoS vector but miss the headline threats: a malicious SVG/HTML “image” becoming stored XSS across every profile and comment, and serving issues. A model that stops at bandwidth is not a security model.',
        },
        {
          id: 'c',
          label: 'Avatars are low-risk decorative content — a full threat model is over-engineering for a profile picture.',
          isCorrect: false,
          feedback:
            '“Decorative” is exactly the assumption attackers love: a user-uploaded, app-wide-displayed file is one of the classic stored-XSS and malicious-file vectors. Low perceived importance, high actual blast radius.',
        },
        {
          id: 'd',
          label: 'Focus on authorization — ensure only the owner can change their avatar; that is the security-relevant part.',
          isCorrect: false,
          feedback:
            'Owner-only editing matters, but it is not the primary threat: the danger is what the uploaded CONTENT does to the thousands who VIEW it. A correct model surfaces the display-side stored-XSS as the top risk.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Trace the avatar: where it ENTERS (upload) and where it is SHOWN (everyone).' },
        { level: 2, title: 'Concept', content: 'Upload = trust boundary; display to all = XSS sink; rank by likelihood×impact.' },
        { level: 3, title: 'Specific clue', content: 'What is inside a file the user labelled “avatar.png” — and what if it is really an SVG with a script?' },
        { level: 4, title: 'Guided solution', content: 'Pick the asset×entry-point walk topping out at stored XSS.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Feature modeled' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The avatar feature shipped without modeling — a crafted SVG avatar became stored XSS on every profile that displayed it.',
        },
      ],
      helpLinks: [{ topicId: 'sec.threat-modeling', label: 'Threat modeling' }],
      successFeedback: 'Asset by entry point, ranked by impact — the model found the stored XSS before the attacker did.',
      failureFeedback: 'The avatar is shown to everyone. What is the worst a malicious “image” could do to all those viewers?',
    },
    {
      id: 'sec-008-c2',
      type: 'code-review',
      title: 'Review the Feature Design',
      difficulty: 'hard',
      tags: ['security'],
      storyContext: 'A "share dashboard via link" feature design arrives for security review. Threat-model it.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'share-design',
          type: 'code',
          title: 'share-dashboard design (proposed)',
          language: 'text',
          content:
            '1. "Share" generates a link: /shared/<dashboardId> where dashboardId is the\n   sequential DB id (e.g. /shared/1041); anyone with the link can view.\n2. The shared view calls GET /api/dashboards/1041 — the SAME endpoint the\n   owner uses; the client hides edit buttons for share-link visitors.\n3. The dashboard JSON includes the owner\'s email and the raw SQL of each\n   widget query "for transparency".\n4. Access is logged: we record the viewer\'s IP and the dashboardId.',
            },
          ],
      findings: [
        {
          id: 'sequential-id-enumeration',
          label:
            'Point 1: sequential dashboard ids mean anyone can enumerate /shared/1, /shared/2, … and walk every "shared" dashboard — and likely private ones on the same endpoint. Share links must use an unguessable random token (or signed, expiring URL), not the incrementing primary key',
          isCorrect: true,
          feedback:
            'Predictable ids turn "anyone with the link" into "anyone with a for-loop". A high-entropy random share token (decoupled from the DB id) makes enumeration infeasible; expiry and revocation harden it further.',
        },
        {
          id: 'client-hides-edit',
          label:
            'Point 2: the shared view uses the OWNER’S endpoint and only HIDES edit buttons client-side — a share-link visitor can call the mutating API directly (mission 5’s hidden-button fallacy); the server must treat share-link access as a distinct, read-only, scoped permission and reject writes',
          isCorrect: true,
          feedback:
            'Hiding edit buttons is UX; the server still authorizes the owner’s full API for anyone who reaches it. Share access needs its own server-enforced, read-only scope tied to the token — not the owner’s permissions with a cosmetic client filter.',
        },
        {
          id: 'access-logging-ip',
          label: 'Point 4: logging viewer IP and dashboardId is itself a privacy/security violation — access logs should never record identifying data',
          isCorrect: false,
          feedback:
            'Access logging of resource id + requester metadata is standard, legitimate security practice (detection, forensics, abuse response) — subject to normal retention/PII policy, but not a design flaw. Flagging routine audit logging as the vulnerability misreads the threat; the real holes are enumeration and missing server-side scope.',
        },
        {
          id: 'raw-sql-exposure',
          label:
            'Point 3: shipping each widget’s raw SQL and the owner’s email to every share-link viewer over-exposes sensitive data — the query internals invite injection probing and reveal schema, and the email is PII the viewer has no need for; return only the rendered results the view requires',
          isCorrect: true,
          feedback:
            'Least-privilege data: a viewer needs chart results, not the owner’s email or the SQL behind them. Exposing schema and queries aids attackers and leaks PII — trim the payload to exactly what the shared view renders.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Model it: guessable entry (ids), missing server-side scope, over-shared assets.' },
        { level: 2, title: 'Concept', content: 'Unguessable tokens, server-enforced read-only scope, least-privilege payloads.' },
        { level: 3, title: 'Specific clue', content: 'Three points are real holes; one describes normal, legitimate practice.' },
        { level: 4, title: 'Guided solution', content: 'Flag sequential ids, client-only edit hiding, and raw SQL/email exposure.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Design reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The sequential-id share links shipped — a scraper enumerated every dashboard, SQL and owner email included, in an afternoon.',
        },
      ],
      helpLinks: [
        { topicId: 'sec.threat-modeling', label: 'Threat modeling' },
        { topicId: 'sec.authz', label: 'Authorization' },
      ],
      successFeedback: 'Enumeration closed, scope server-enforced, payload trimmed — the design modeled before it shipped.',
      failureFeedback: 'One finding calls normal audit logging a vulnerability. The three real holes are entry, scope, and over-exposure.',
    },
  ],
  reflectionPrompt: 'Take a feature on our current roadmap: spend fifteen minutes on assets, actors, entry points. What is the top likelihood×impact threat, and is it addressed?',
  rewards: [{ type: 'xp', amount: 15, label: 'Attacker’s eyes' }],
};
