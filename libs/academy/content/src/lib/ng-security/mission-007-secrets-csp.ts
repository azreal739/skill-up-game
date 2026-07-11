import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — secrets and CSP: nothing in a front-end bundle is secret,
 * and Content-Security-Policy as a defence-in-depth layer.
 */
export const fnSec007SecretsCsp: MissionDefinition = {
  id: 'sec-007-secrets-csp',
  campaignId: 'ng-security',
  title: 'There Are No Secrets in the Bundle',
  summary:
    'Anything shipped to the browser is public — API keys in the front end are exposed by design — and Content-Security-Policy is a layer that limits what a breach can do.',
  difficulty: 'hard',
  learningObjectives: [
    'Recognise that front-end code and config are fully public',
    'Handle keys and secrets that must not reach the client',
    'Use CSP to reduce XSS blast radius as defence in depth',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session seven, a bill that hurt: a third-party API key hardcoded in our environment.ts, shipped in the bundle, scraped by a bot within days, and used to run up thousands in charges on our account. The key was “hidden” in a minified file. Minification is not encryption.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Rule: EVERYTHING you ship to the browser is public — source, config, env files, the lot. There are no secrets in a front-end bundle, only values you have not been caught publishing yet. Secrets that must stay secret live on a SERVER; the browser calls YOUR backend, which holds the key. And for the XSS you cannot fully prevent, Content-Security-Policy is a second wall: it restricts where scripts can load from and where data can be sent, so an injected script has far less it can actually do.',
    },
  ],
  contextArtefacts: [
    {
      id: 'secrets-and-csp',
      type: 'code',
      title: 'Secrets stay server-side; CSP limits the damage',
      language: 'text',
      content:
        'PUBLIC (shipped to browser): source, environment.ts, feature flags, any\n  "API key" in the bundle → assume the world can read it\nSECRET (server only): third-party keys, DB creds → browser calls YOUR\n  backend, which holds the secret and proxies the call\n\nCSP (defence in depth): a header that says\n  "scripts only from self; connect only to our API; no inline eval"\n  → an injected XSS payload can’t load remote code or exfiltrate to evil.com',
    },
  ],
  challenges: [
    {
      id: 'sec-007-c1',
      type: 'multiple-choice',
      title: 'The Key in the Bundle',
      difficulty: 'hard',
      tags: ['security'],
      storyContext:
        'A dev needs to call a paid third-party API (a geocoding service) from the app. They add the API key to environment.prod.ts. In review, someone flags it.',
      prompt: 'What is the correct architecture?',
      options: [
        {
          id: 'a',
          label:
            'The key must never reach the browser — anything in environment.prod.ts ships in the bundle and is world-readable. Route the call through YOUR backend: the browser calls your endpoint (authenticated as your user), the backend adds the secret key and calls the third-party API, and returns the result. The secret stays server-side; the backend can also rate-limit and cache. If the third-party truly only offers browser-side keys, use their key RESTRICTIONS (referrer/origin allowlist, quotas) to limit abuse — accepting it is semi-public.',
          isCorrect: true,
          feedback:
            'Secrets live server-side, full stop. The backend-proxy pattern keeps the key secret and adds rate-limiting and caching for free. Where a vendor forces a public key, their origin restrictions are the only mitigation — and you treat it as exposed.',
        },
        {
          id: 'b',
          label: 'Store the key in environment.prod.ts but add it to .gitignore so it is not committed — that keeps it private.',
          isCorrect: false,
          feedback:
            'Git hygiene is unrelated to the exposure: the key is COMPILED INTO THE BUNDLE regardless of whether the source file was committed. Users download the bundle; the key is right there. Not-in-git ≠ not-in-browser.',
        },
        {
          id: 'c',
          label: 'Base64-encode or lightly obfuscate the key in the bundle so scrapers cannot recognise it.',
          isCorrect: false,
          feedback:
            'Encoding is not encryption — base64 is trivially reversed, and any obfuscation is undone by watching the actual network request the app makes with the key. Obscuring a public value keeps it public.',
        },
        {
          id: 'd',
          label: 'Fetch the key at runtime from a config endpoint so it is not in the static bundle.',
          isCorrect: false,
          feedback:
            'Serving the secret to the browser at runtime is the same exposure with extra steps — whatever the browser receives, the attacker receives by opening the network tab. The secret must never be SENT to the client at all.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The browser must make the call with the key. Can the browser hold a secret?' },
        { level: 2, title: 'Concept', content: 'Secrets stay server-side; the backend proxies third-party calls.' },
        { level: 3, title: 'Specific clue', content: 'Whatever the browser receives at runtime, so does the network tab.' },
        { level: 4, title: 'Guided solution', content: 'Proxy through your backend; keep the key server-side.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Secret relocated' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The key shipped in environment.prod.ts — a scraper found it in a day and the next invoice carried the abuse charges.',
        },
      ],
      helpLinks: [{ topicId: 'sec.secrets', label: 'Secrets & config' }],
      successFeedback: 'Secrets server-side, the browser calls your backend — the key never leaves your control.',
      failureFeedback: 'Every option except one still sends the key to the browser eventually. Which one never does?',
    },
    {
      id: 'sec-007-c2',
      type: 'multiple-choice',
      title: 'The Second Wall',
      difficulty: 'hard',
      tags: ['security'],
      storyContext:
        'The team has hardened XSS well, but a security consultant recommends adding a Content-Security-Policy. A dev asks: “if we already sanitise everything, what does CSP add?”',
      prompt: 'What does CSP contribute that sanitisation does not?',
      options: [
        {
          id: 'a',
          label:
            'Defence in depth against the XSS you MISS: sanitisation aims to stop injection; CSP limits what an injected script can DO if one slips through. A strict policy (scripts only from self, no inline/eval, connect-src limited to your API) means an XSS payload cannot load attacker code from a remote host and cannot exfiltrate stolen data to evil.com — the injection may occur but its usefulness collapses. It is a second wall behind the first, not a replacement for it.',
          isCorrect: true,
          feedback:
            'Sanitisation and CSP defend different moments: prevention vs containment. No sanitiser is provably complete (a new dependency, a missed sink), and CSP is the layer that makes the inevitable miss far less catastrophic.',
        },
        {
          id: 'b',
          label: 'Nothing meaningful — if input is sanitised, no script is injected, so there is nothing for CSP to contain.',
          isCorrect: false,
          feedback:
            'That assumes perfect sanitisation forever, across every current and future sink and dependency — the same flawed assumption the whole block rejects. CSP exists for the day prevention fails.',
        },
        {
          id: 'c',
          label: 'CSP replaces sanitisation — a strict policy blocks all injection, so the sanitizer becomes redundant.',
          isCorrect: false,
          feedback:
            'CSP does not stop injection into the DOM (an injected onclick or a DOM-based sink can still execute in-policy) — it constrains capabilities. Drop the sanitizer and you widen the hole CSP was only ever meant to backstop.',
        },
        {
          id: 'd',
          label: 'CSP mainly improves performance by restricting resource origins, with security as a side benefit.',
          isCorrect: false,
          feedback:
            'CSP is a security control, not a performance one — its purpose is restricting where scripts/styles/connections may originate to contain attacks, not to speed up loading.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Sanitisation tries to PREVENT injection. What does CSP do AFTER an injection happens?' },
        { level: 2, title: 'Concept', content: 'CSP contains the blast radius of the XSS you failed to prevent.' },
        { level: 3, title: 'Specific clue', content: 'Where can an injected script load code from, or send cookies to, under a strict CSP?' },
        { level: 4, title: 'Guided solution', content: 'Pick the defence-in-depth containment answer.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Second wall raised' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'CSP was skipped as “redundant with sanitisation” — when one XSS later slipped through a dependency, it freely exfiltrated to an attacker host.',
        },
      ],
      helpLinks: [
        { topicId: 'sec.secrets', label: 'Secrets & config' },
        { topicId: 'sec.xss', label: 'Cross-site scripting' },
      ],
      successFeedback: 'Prevent with sanitisation, contain with CSP — two walls for the breach one wall misses.',
      failureFeedback: 'Assume one XSS gets through next year. What can it do WITH a strict CSP versus without one?',
    },
  ],
  reflectionPrompt: 'Search our bundle for anything key-shaped, and check for a CSP header: what secret is public today, and what would a slipped-through XSS be free to do?',
  rewards: [{ type: 'xp', amount: 15, label: 'Secrets and walls' }],
};
