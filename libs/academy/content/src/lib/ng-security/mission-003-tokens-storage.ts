import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — auth tokens in the browser: where to store them, the
 * localStorage-vs-cookie tradeoff, and XSS as the amplifier.
 */
export const fnSec003TokensStorage: MissionDefinition = {
  id: 'sec-003-tokens-storage',
  campaignId: 'ng-security',
  title: 'Where Tokens Sleep',
  summary:
    'Auth tokens in localStorage are readable by any script — so XSS becomes account takeover; httpOnly cookies move the token out of JavaScript’s reach entirely.',
  difficulty: 'medium',
  learningObjectives: [
    'Compare token storage options by their exposure to XSS',
    'Explain why httpOnly cookies resist token theft',
    'Weigh the CSRF tradeoff that cookies introduce',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session three connected two ideas: the XSS from last session, and where we keep our auth token. We kept it in localStorage. Which meant the cookie-stealing comment payload could have grabbed the TOKEN instead — and a stolen token is a logged-in attacker, no password needed.',
    },
    {
      speaker: 'Senior Dev',
      text: 'localStorage is readable by ANY JavaScript on your origin — including injected scripts. So token-in-localStorage means one XSS equals full account takeover. An httpOnly cookie is invisible to JavaScript: the browser attaches it to requests automatically, but document.cookie cannot read it, so XSS cannot exfiltrate it. The cost: cookies are sent automatically, which opens CSRF — a tradeoff, not a free win.',
    },
  ],
  contextArtefacts: [
    {
      id: 'storage-tradeoff',
      type: 'code',
      title: 'The storage tradeoff',
      language: 'text',
      content:
        'localStorage / sessionStorage  → readable by ANY script on the origin\n                                → XSS can steal the token = account takeover\n                                → no automatic CSRF (you attach it manually)\n\nhttpOnly + Secure + SameSite    → invisible to JavaScript (XSS can’t read it)\n  cookie                        → browser attaches automatically\n                                → introduces CSRF risk → needs CSRF defence\n\nin-memory (a variable)          → gone on refresh; safe from persistent theft,\n                                → paired with httpOnly refresh cookie = strong',
    },
  ],
  challenges: [
    {
      id: 'sec-003-c1',
      type: 'multiple-choice',
      title: 'One XSS, Full Takeover',
      difficulty: 'medium',
      tags: ['security'],
      storyContext:
        'The team stores a JWT in localStorage and reads it in an interceptor to add the Authorization header. Someone asks: “if we already prevent XSS, does storage location even matter?”',
      prompt: 'What is the right way to think about this?',
      options: [
        {
          id: 'a',
          label:
            'Storage location is defence in DEPTH: preventing XSS is the goal, but you will never be certain you have caught every vector (a dependency, a future feature, a missed sink). Token-in-localStorage means the FIRST XSS that slips through escalates straight to account takeover; an httpOnly cookie means that same XSS cannot read the token at all. You harden both — reduce XSS AND reduce the blast radius when one gets through.',
          isCorrect: true,
          feedback:
            'Security is layered because no single layer is perfect. The question “if we prevent XSS, does storage matter?” assumes perfect prevention — the assumption security engineering refuses to make.',
        },
        {
          id: 'b',
          label: 'No — if XSS is prevented, nothing can read localStorage maliciously, so the token is equally safe there.',
          isCorrect: false,
          feedback:
            'That bets everything on never having a single XSS bug, ever, including in third-party code you did not write. Defence in depth exists precisely because that bet loses eventually.',
        },
        {
          id: 'c',
          label: 'Location does not matter because JWTs are signed — even a stolen token cannot be tampered with.',
          isCorrect: false,
          feedback:
            'Signing prevents FORGERY, not THEFT — a stolen valid token is used as-is, no tampering needed. The attacker does not modify it; they simply are you until it expires.',
        },
        {
          id: 'd',
          label: 'Move the token to sessionStorage instead — it clears on tab close, which limits exposure enough.',
          isCorrect: false,
          feedback:
            'sessionStorage is just as readable by injected script during the session — the XSS runs WHILE the tab is open, exactly when the token is present. Clearing on close does nothing for an active attack.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Can you guarantee zero XSS bugs forever, including in dependencies?' },
        { level: 2, title: 'Concept', content: 'Defence in depth: reduce the blast radius when a layer fails.' },
        { level: 3, title: 'Specific clue', content: 'What can an httpOnly cookie do that localStorage cannot — resist being READ?' },
        { level: 4, title: 'Guided solution', content: 'Pick the defence-in-depth answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Blast radius reduced' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The token stayed in localStorage on the assumption XSS was impossible — a third-party script bug later proved otherwise.',
        },
      ],
      helpLinks: [{ topicId: 'sec.tokens', label: 'Token storage' }],
      successFeedback: 'Layers, not a single wall — the token survives a breach of the first line.',
      failureFeedback: 'The question assumes perfect XSS prevention. What does security engineering say about that assumption?',
    },
    {
      id: 'sec-003-c2',
      type: 'multiple-choice',
      title: 'The Cookie’s Own Risk',
      difficulty: 'medium',
      tags: ['security'],
      storyContext:
        'Convinced, the team moves the session token to an httpOnly cookie. A security reviewer says “good, but you just took on a new risk you have not addressed”.',
      prompt: 'What new risk, and how is it mitigated?',
      options: [
        {
          id: 'a',
          label:
            'CSRF: because the browser now attaches the cookie AUTOMATICALLY to every request to your origin, a malicious site can make the user’s browser fire an authenticated request (a hidden form post, an image tag) without the user’s intent. Mitigate with SameSite=Lax/Strict on the cookie (the browser withholds it on cross-site requests) PLUS an anti-CSRF token or origin check for state-changing endpoints.',
          isCorrect: true,
          feedback:
            'The httpOnly cookie trades XSS-exfiltration for CSRF-abuse — you fixed one risk and inherited another. SameSite closes most of it; a CSRF token or origin verification closes the rest. Neither risk is “solved” alone.',
        },
        {
          id: 'b',
          label: 'The risk is cookie size limits — tokens may exceed 4KB and get truncated; use a session id instead of a full JWT.',
          isCorrect: false,
          feedback:
            'Session-id-vs-JWT is a real design choice, but it is not the SECURITY risk the reviewer means — the automatic-attachment behaviour that enables CSRF is.',
        },
        {
          id: 'c',
          label: 'The risk is that httpOnly cookies cannot be read by the app, so the client no longer knows if the user is logged in.',
          isCorrect: false,
          feedback:
            'A minor ergonomic point (solved with a separate non-sensitive “is-authenticated” flag or a /me call) — not a security vulnerability, and not what a security reviewer flags.',
        },
        {
          id: 'd',
          label: 'None — httpOnly + Secure is strictly safer than localStorage with no new downsides; the reviewer is being cautious.',
          isCorrect: false,
          feedback:
            'There genuinely IS a new risk: automatic attachment enables CSRF. Treating the cookie move as a free win leaves state-changing endpoints exposed to cross-site request forgery.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What does the browser now do with the cookie WITHOUT the app asking?' },
        { level: 2, title: 'Concept', content: 'Automatic attachment = CSRF risk; SameSite + tokens mitigate it.' },
        { level: 3, title: 'Specific clue', content: 'A hidden form on evil.com posting to your API — what rides along automatically?' },
        { level: 4, title: 'Guided solution', content: 'Pick CSRF, mitigated by SameSite + anti-CSRF token.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Tradeoff addressed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The cookie move shipped without SameSite or CSRF tokens — a cross-site forged request changed user settings unnoticed.',
        },
      ],
      helpLinks: [
        { topicId: 'sec.tokens', label: 'Token storage' },
        { topicId: 'sec.csrf', label: 'CSRF' },
      ],
      successFeedback: 'One risk traded for another, both addressed — the cookie move done properly.',
      failureFeedback: 'The browser now sends the cookie on EVERY request to your origin. What attack does that enable?',
    },
  ],
  reflectionPrompt: 'Where does our app keep its auth token today — and what is the worst a single XSS bug could do with it?',
  rewards: [{ type: 'xp', amount: 10, label: 'Tokens secured' }],
};
