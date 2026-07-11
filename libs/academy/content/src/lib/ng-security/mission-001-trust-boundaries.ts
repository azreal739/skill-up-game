import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — the security mindset: trust boundaries, and treating all
 * input as hostile until validated at the boundary.
 */
export const fnSec001TrustBoundaries: MissionDefinition = {
  id: 'sec-001-trust-boundaries',
  campaignId: 'ng-security',
  title: 'Nothing From Outside Is Trusted',
  summary:
    'Security starts with a map of trust boundaries — every place data crosses from outside your control to inside it is a checkpoint where input must be treated as hostile.',
  difficulty: 'intro',
  learningObjectives: [
    'Identify the trust boundaries in a front-end app',
    'Treat all external input as untrusted until validated',
    'Locate where validation and encoding must happen',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'New block: security. It opened not with an attack but with a MAP. We drew every arrow where data enters our app — URL params, form fields, API responses, localStorage, postMessage, uploaded files — and marked each as a border crossing. Most of the room had never thought of an API response as untrusted input.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The whole discipline hangs off one idea: TRUST BOUNDARIES. Inside the boundary is code you control; outside is everything else — users, other services, the network, even your own backend after it has touched user data. At every crossing, input is GUILTY until proven innocent: validated for shape (the Zod lessons), encoded for its destination (next missions). A boundary you did not know existed is a boundary with no guard.',
    },
  ],
  contextArtefacts: [
    {
      id: 'boundary-map',
      type: 'code',
      title: 'The trust boundary map',
      language: 'text',
      content:
        'OUTSIDE (untrusted)              → BOUNDARY (validate/encode) → INSIDE (trusted)\nURL params, query strings        → parse + validate            → route logic\nform input                       → validate (client AND server) → app state\nAPI responses (yes, these too)   → schema-parse at the edge     → typed models\nlocalStorage / postMessage       → validate on read             → app state\nuploaded file names/contents     → validate + sanitise          → storage/display\n\nrule: data does not become trusted by TRAVELLING — only by being CHECKED',
    },
  ],
  challenges: [
    {
      id: 'sec-001-c1',
      type: 'multiple-choice',
      title: 'The Response You Trusted',
      difficulty: 'intro',
      tags: ['security'],
      storyContext:
        'A teammate objects to validating API responses: “our OWN backend returns that data — it is inside our system, so it is trusted. Validating it is paranoia.”',
      prompt: 'Why is the backend response still across a trust boundary?',
      options: [
        {
          id: 'a',
          label: 'It is not — code you deploy on both ends shares a trust domain; validating your own API is wasted effort.',
          isCorrect: false,
          feedback:
            'The response crosses the NETWORK (interceptable, replayable) and, more importantly, the backend forwards data that ORIGINATED with other users — a comment, a profile name, a filename. Your backend is a courier, not an author.',
        },
        {
          id: 'b',
          label:
            'Because the data inside that response largely came from OUTSIDE — other users’ input the backend stored and is now handing you — and it travelled the untrusted network to reach you. “Our backend sent it” describes the courier, not the origin. The boundary is the browser’s edge; everything arriving there is validated and encoded regardless of who relayed it.',
          isCorrect: true,
          feedback:
            'The HTTP campaign’s drift lesson meets security: a response is a promise, not a proof. And most of its dangerous content (names, comments, HTML fields) was authored by strangers your backend merely stored.',
        },
        {
          id: 'c',
          label: 'Only if the backend is compromised — assume-breach is a valid model, but for a healthy backend the response is trustworthy.',
          isCorrect: false,
          feedback:
            'No breach required: a perfectly healthy backend faithfully stores and returns a malicious username someone signed up with. The threat rode in through the front door as legitimate data.',
        },
        {
          id: 'd',
          label: 'The concern is real but belongs on the backend — if the server validates on write, the client can trust on read.',
          isCorrect: false,
          feedback:
            'Server-side validation is essential AND insufficient: the client still must ENCODE that data correctly for wherever it renders it (XSS lives in the browser), and defence in depth means neither end assumes the other is flawless.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Where did the data in that response ORIGINALLY come from?' },
        { level: 2, title: 'Concept', content: 'Data is trusted by being CHECKED, not by who relayed it.' },
        { level: 3, title: 'Specific clue', content: 'A username someone chose at signup — who authored it, and where does it render?' },
        { level: 4, title: 'Guided solution', content: 'Pick the courier-not-author answer.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Boundary drawn' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: '“Our own backend” was trusted blindly — a malicious display name stored months ago rendered as active markup.',
        },
      ],
      helpLinks: [
        { topicId: 'sec.trust-boundaries', label: 'Trust boundaries' },
        { topicId: 'zod.runtime-validation', label: 'Runtime validation' },
      ],
      successFeedback: 'The boundary is the browser’s edge — everything crossing it is checked, whoever the courier was.',
      failureFeedback: 'Trace one field in that response back to its author. Was it your code, or a stranger?',
    },
    {
      id: 'sec-001-c2',
      type: 'multiple-choice',
      title: 'Where the Guard Stands',
      difficulty: 'easy',
      tags: ['security'],
      storyContext:
        'The team maps a feature: a URL like /search?q=<user text> feeds a results page that echoes "Results for {{ q }}" and also passes q to an analytics call and a "recent searches" localStorage list.',
      prompt: 'Where must q be treated as untrusted?',
      options: [
        {
          id: 'a',
          label: 'Only at the point it is displayed — echoing it into the DOM is the one risky use; analytics and storage are internal.',
          isCorrect: false,
          feedback:
            'Every USE has its own encoding need: displaying wants HTML-context encoding, the analytics URL wants URL-encoding, and the stored value re-enters as untrusted when READ back later. One guard is not enough.',
        },
        {
          id: 'b',
          label:
            'At EVERY use, encoded for THAT destination: displaying "Results for {{ q }}" needs HTML-context safety (Angular interpolation gives this by default — don’t bypass it); the analytics call needs URL/param encoding; and the localStorage value is untrusted AGAIN when read back next visit, so it is validated/encoded on read too. q is guilty at every crossing, and "the right encoding" depends on where it lands.',
          isCorrect: true,
          feedback:
            'Encoding is contextual: the same hostile string is defused differently for HTML, for a URL, for an attribute. And data written to storage crosses back OUT and in again — the read is a fresh boundary.',
        },
        {
          id: 'c',
          label: 'Sanitise q once on arrival (strip anything suspicious) and then it is safe for all three uses.',
          isCorrect: false,
          feedback:
            'A single up-front sanitise cannot serve three contexts — what is safe HTML is not safe in a URL, and aggressive stripping corrupts legitimate searches ("C++ & C#"). Encode per destination, don’t mangle once.',
        },
        {
          id: 'd',
          label: 'Validate q against a strict allowlist (alphanumeric only) at the URL boundary; then all downstream uses are safe.',
          isCorrect: false,
          feedback:
            'Allowlisting is great WHERE the input format is constrained, but a free-text search legitimately contains symbols — over-restricting breaks the feature, and even validated input still needs correct per-context encoding.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'List q’s three destinations. Does “safe” mean the same thing for each?' },
        { level: 2, title: 'Concept', content: 'Encoding is contextual; stored data is untrusted again on read.' },
        { level: 3, title: 'Specific clue', content: 'What is safe in HTML vs in a URL query parameter?' },
        { level: 4, title: 'Guided solution', content: 'Encode at every use, for that destination.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Guards placed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'A single up-front sanitise shipped — it corrupted legitimate searches AND still let a crafted string through into the analytics URL.',
        },
      ],
      helpLinks: [{ topicId: 'sec.trust-boundaries', label: 'Trust boundaries' }],
      successFeedback: 'Guilty at every crossing, encoded for every destination — the guard stands at each gate.',
      failureFeedback: 'One hostile string, three destinations. What defuses it differs per destination — which option respects that?',
    },
  ],
  reflectionPrompt: 'Draw our app’s trust-boundary map: every arrow where outside data enters. Which crossings have no guard today?',
  rewards: [{ type: 'xp', amount: 5, label: 'Map drawn' }],
};
