import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — CSRF: forged authenticated requests, SameSite, and the
 * token pattern; plus why token-in-header auth is naturally resistant.
 */
export const fnSec004Csrf: MissionDefinition = {
  id: 'sec-004-csrf',
  campaignId: 'ng-security',
  title: 'Requests You Didn’t Send',
  summary:
    'CSRF tricks a logged-in user’s browser into making authenticated requests they never intended — defended with SameSite cookies, anti-CSRF tokens, or header-based auth.',
  difficulty: 'medium',
  learningObjectives: [
    'Explain the mechanism of a CSRF attack',
    'Apply SameSite and anti-CSRF token defences',
    'Understand why Authorization-header auth resists CSRF',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session four, a demo that made the room uneasy. On a throwaway app, I put a single line on a random web page — <img src="https://our-app/api/transfer?to=me&amount=all"> — and when a logged-in user merely VIEWED that page, their browser made the transfer. They clicked nothing. The cookie rode along automatically.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Cross-site request forgery abuses AMBIENT authority: if auth is a cookie the browser sends automatically, any site can make the user’s browser fire authenticated requests to you. The user’s intent is irrelevant. Three defences: SameSite cookies (browser withholds the cookie cross-site — the baseline now); an anti-CSRF token the attacker cannot read or guess; and header-based auth (Authorization: Bearer …), which is not sent automatically, so cross-site requests simply lack it.',
    },
  ],
  contextArtefacts: [
    {
      id: 'csrf-defenses',
      type: 'code',
      title: 'Why header auth resists CSRF',
      language: 'text',
      content:
        'COOKIE auth:   browser attaches the cookie to cross-site requests automatically\n               → attacker’s page can forge authenticated calls\n               → needs SameSite + anti-CSRF token\n\nHEADER auth:   Authorization: Bearer … is set by YOUR JS, never automatic\n               → a cross-site <img>/<form> cannot add it\n               → naturally CSRF-resistant (but back to XSS-exposure tradeoffs)\n\nSameSite=Lax:  cookie withheld on cross-site subrequests; default in modern browsers',
    },
  ],
  challenges: [
    {
      id: 'sec-004-c1',
      type: 'multiple-choice',
      title: 'The Transfer Nobody Clicked',
      difficulty: 'medium',
      tags: ['security'],
      storyContext: 'The <img> transfer demo. A dev asks: “our transfer endpoint requires login — how did an unauthenticated attacker’s page trigger it?”',
      prompt: 'What actually happened?',
      options: [
        {
          id: 'a',
          label:
            'The attacker was never authenticated — the VICTIM was. The victim’s browser, seeing a request to your origin, automatically attached the victim’s session cookie, so from your server’s view it was a legitimate logged-in request. CSRF does not steal credentials; it borrows the browser’s ambient authority to send a request the user never intended.',
          isCorrect: true,
          feedback:
            'The attack rides the VICTIM’s standing login. Nothing was stolen — the browser helpfully authenticated a request the attacker composed. That is why “requires login” alone does not stop it.',
        },
        {
          id: 'b',
          label: 'The endpoint must have had a CORS misconfiguration allowing the attacker’s origin to call it.',
          isCorrect: false,
          feedback:
            'CORS governs whether JS can READ the RESPONSE — it does not stop the REQUEST from being sent and processed. A simple <img>/<form> post triggers the side effect regardless of CORS; the transfer happens even if the attacker never sees the response.',
        },
        {
          id: 'c',
          label: 'The attacker guessed or stole the victim’s session token and replayed it.',
          isCorrect: false,
          feedback:
            'No theft occurred — that is the unsettling part. The attacker never saw the token; the browser attached it automatically. CSRF needs no token knowledge, only that the victim is logged in.',
        },
        {
          id: 'd',
          label: 'The GET-based transfer was the only flaw — making it a POST would fully prevent the attack.',
          isCorrect: false,
          feedback:
            'Using POST helps (an <img> cannot POST) but is NOT sufficient — a hidden auto-submitting <form> posts cross-site just fine. Method choice is hygiene; SameSite / CSRF tokens are the actual defence.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Who was logged in — the attacker, or the victim whose browser sent the request?' },
        { level: 2, title: 'Concept', content: 'CSRF borrows the victim’s ambient authority; it steals nothing.' },
        { level: 3, title: 'Specific clue', content: 'What did the victim’s browser attach automatically to a request to your origin?' },
        { level: 4, title: 'Guided solution', content: 'Pick the borrowed-ambient-authority answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Mechanism understood' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The team assumed “requires login” was enough — the forged-transfer class of bug stayed open across every cookie-authed endpoint.',
        },
      ],
      helpLinks: [{ topicId: 'sec.csrf', label: 'CSRF' }],
      successFeedback: 'Ambient authority borrowed, not credentials stolen — the attack’s true shape.',
      failureFeedback: 'The attacker was never logged in. Whose session made the request succeed, and how did it attach?',
    },
    {
      id: 'sec-004-c2',
      type: 'multiple-choice',
      title: 'Choosing the Defence',
      difficulty: 'medium',
      tags: ['security', 'angular'],
      storyContext:
        'The team must pick a CSRF strategy. Their API uses session COOKIES (httpOnly, chosen last mission for XSS resistance). Options are debated.',
      prompt: 'What is the right defence given cookie-based auth?',
      options: [
        {
          id: 'a',
          label:
            'Layer it: SameSite=Lax (or Strict) on the session cookie as the baseline — the browser then withholds it on cross-site requests, killing the simple <img>/<form> attacks — PLUS an anti-CSRF token pattern for state-changing endpoints (a token the server sets and the client echoes in a header; Angular’s HttpClient supports the cookie-to-header XSRF-TOKEN convention). Belt and braces, because SameSite has edge cases and older browsers.',
          isCorrect: true,
          feedback:
            'SameSite is the cheap, high-value baseline; the token defends the residual cases (subdomain quirks, browser gaps, Lax’s top-level-GET allowance). Cookie auth earns its XSS resistance by taking CSRF seriously.',
        },
        {
          id: 'b',
          label: 'Switch entirely to Authorization-header tokens — header auth is CSRF-immune, so the problem disappears.',
          isCorrect: false,
          feedback:
            'It DOES resist CSRF — but it walks straight back into the XSS-exfiltration risk you chose httpOnly cookies to avoid (last mission). Swapping one class of risk for another is not a decision to make casually mid-CSRF-fix.',
        },
        {
          id: 'c',
          label: 'Check the Referer/Origin header on every request and reject mismatches — that alone stops cross-site requests.',
          isCorrect: false,
          feedback:
            'Origin checks are a useful ADDITIONAL signal, but Referer can be absent or stripped (privacy settings, some proxies), so relying on it alone both misses attacks and rejects legitimate requests. Use it to reinforce, not as the sole defence.',
        },
        {
          id: 'd',
          label: 'Add a CAPTCHA to state-changing actions so automated forged requests fail the challenge.',
          isCorrect: false,
          feedback:
            'CAPTCHA fights bots, not CSRF — a forged request carries the victim’s session and can be a one-off targeted action; and CAPTCHA-ing every transfer destroys usability. Wrong tool for this threat.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'You chose cookies for XSS resistance — keep that, and defend the CSRF it introduced.' },
        { level: 2, title: 'Concept', content: 'SameSite baseline + anti-CSRF token for state-changing endpoints.' },
        { level: 3, title: 'Specific clue', content: 'Angular HttpClient has a built-in cookie-to-header XSRF convention.' },
        { level: 4, title: 'Guided solution', content: 'Layer SameSite + CSRF token.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Defence layered' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'A single Referer check shipped as the whole defence — stripped Referer headers let forged requests through and blocked some real users.',
        },
      ],
      helpLinks: [
        { topicId: 'sec.csrf', label: 'CSRF' },
        { topicId: 'sec.tokens', label: 'Token storage' },
      ],
      successFeedback: 'SameSite baseline, token for the rest — cookie auth’s CSRF debt paid in full.',
      failureFeedback: 'You picked cookies to resist XSS. Which option defends CSRF WITHOUT undoing that choice?',
    },
  ],
  reflectionPrompt: 'For our state-changing endpoints: is auth a cookie or a header — and if a cookie, is SameSite plus a CSRF token in place?',
  rewards: [{ type: 'xp', amount: 10, label: 'CSRF defended' }],
};
