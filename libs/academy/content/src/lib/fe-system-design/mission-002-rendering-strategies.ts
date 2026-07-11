import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — rendering strategies: CSR, SSR, SSG, and hydration, chosen
 * by the page's requirements not by fashion.
 */
export const fnSys002RenderingStrategies: MissionDefinition = {
  id: 'sys-002-rendering-strategies',
  campaignId: 'fe-system-design',
  title: 'Where the HTML Comes From',
  summary:
    'CSR, SSR, SSG and hydration are tradeoffs between first-paint, freshness, and server cost — chosen per page by what that page actually needs.',
  difficulty: 'medium',
  learningObjectives: [
    'Compare CSR, SSR, SSG and their hydration cost',
    'Choose a rendering strategy per page from its requirements',
    'Explain hydration and its pitfalls',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session two: the rendering-strategy menu, and the fact that most teams pick ONE for the whole app when different PAGES want different answers. Our marketing homepage, our logged-in dashboard, and our public blog have completely different needs — and we were client-rendering all three, badly.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Four strategies, one axis: WHERE and WHEN the HTML is generated. CSR (client): blank shell, JS builds everything — great for private, interactive apps, terrible first paint and SEO. SSR (server, per request): HTML built on each request, then hydrated — fresh + SEO-friendly, at server cost and complexity. SSG (build time): HTML pre-generated, served static — fastest, cheapest, but stale until rebuilt (perfect for blogs/docs). Hydration: attaching JS to server HTML so it becomes interactive. Choose PER PAGE.',
    },
  ],
  contextArtefacts: [
    {
      id: 'rendering-menu',
      type: 'code',
      title: 'The rendering menu, per page',
      language: 'text',
      content:
        'CSR  client renders    blank→JS builds it  · best: private interactive app\n     - poor first paint & SEO, cheap server\nSSR  server per request  HTML then hydrate    · best: fresh + SEO (feed, PDP)\n     - server cost/complexity, good first paint\nSSG  build time         pre-rendered static   · best: blog/docs/marketing\n     - fastest & cheapest, stale until rebuild\nISR/hybrid: mix — static shell + client data, or SSG with revalidation\n\nHYDRATION: attach JS to server HTML → interactive (mind the mismatch trap)',
    },
  ],
  challenges: [
    {
      id: 'sys-002-c1',
      type: 'multiple-choice',
      title: 'Three Pages, Three Answers',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Three pages: (A) the marketing homepage — content changes weekly, must rank on Google and load instantly; (B) the logged-in analytics dashboard — private, highly interactive, per-user data; (C) the public blog — hundreds of articles, updated occasionally, SEO-critical.',
      prompt: 'Which rendering strategy fits each?',
      options: [
        {
          id: 'a',
          label:
            '(A) SSG/prerender — content changes weekly (rebuild handles that), needs SEO + instant load, which static HTML nails at near-zero server cost. (B) CSR — private (no SEO need), highly interactive, per-user data that can’t be pre-rendered; the blank-shell first paint is acceptable behind a login. (C) SSG — hundreds of rarely-changing, SEO-critical articles are the canonical static-generation case. Match the strategy to each page’s freshness/SEO/interactivity profile, not one strategy for all three.',
          isCorrect: true,
          feedback:
            'Per-page fit: static where content is stable and SEO matters (A, C), client-rendered where it’s private and interactive (B). One-size-fits-all rendering forces every page to pay for needs only some of them have.',
        },
        {
          id: 'b',
          label: 'SSR for all three — server rendering gives the best SEO and first paint everywhere, so standardise on it.',
          isCorrect: false,
          feedback:
            'SSR for the private, per-user dashboard adds server cost and complexity for zero SEO benefit and marginal first-paint gain behind a login; and SSR for stable blog content wastes per-request rendering that SSG does once at build. Uniform SSR overpays on two of three pages.',
        },
        {
          id: 'c',
          label: 'CSR for all three with a good loading skeleton — it is the simplest architecture and skeletons hide the blank paint.',
          isCorrect: false,
          feedback:
            'CSR fails the SEO requirement for the homepage and blog outright (crawlers see a shell) and the instant-load requirement on real devices — a skeleton is still not content for a crawler. Simplicity that violates the requirements is not simple.',
        },
        {
          id: 'd',
          label: 'SSG for all three, rebuilding on every data change — static is fastest, so make everything static.',
          isCorrect: false,
          feedback:
            'The private dashboard’s per-user, highly interactive data cannot be statically generated at build time (there’s no single HTML for all users), and rebuilding the whole site on every dashboard data change is absurd. SSG fits stable shared content, not per-user app state.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each page ask: SEO needed? content shared or per-user? how often does it change?' },
        { level: 2, title: 'Concept', content: 'Static for stable+SEO, client for private+interactive; choose per page.' },
        { level: 3, title: 'Specific clue', content: 'Can the per-user dashboard even HAVE one pre-rendered HTML for everyone?' },
        { level: 4, title: 'Guided solution', content: 'SSG for A and C, CSR for B.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Strategies matched' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'One uniform strategy shipped — the homepage failed SEO and the dashboard paid for SSR it never needed.',
        },
      ],
      helpLinks: [{ topicId: 'sysd.rendering', label: 'Rendering strategies' }],
      successFeedback: 'Each page rendered by its own needs — SEO where it matters, interactivity where it lives.',
      failureFeedback: 'Two pages need SEO + stable content; one is private + per-user. Which strategy fits each profile?',
    },
    {
      id: 'sys-002-c2',
      type: 'multiple-choice',
      title: 'The Hydration Trap',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'The SSR homepage flickers on load and the console warns of a "hydration mismatch". The header renders "Good evening" on the server but "Good morning" in the browser, and a timestamp shows a different value after hydration.',
      prompt: 'What is happening, and how is it avoided?',
      options: [
        {
          id: 'a',
          label:
            'Hydration mismatch: the server rendered HTML using server-side state (its timezone/clock, no user locale), then the client re-rendered with DIFFERENT state (browser timezone, Date.now()), so the DOM the client built didn’t match the server’s — forcing a re-render (the flicker) and breaking hydration’s benefit. Avoid it by ensuring server and client render the SAME output for the same inputs: don’t use non-deterministic values (Date.now(), random, browser-only APIs) during initial render; defer client-only differences to AFTER hydration, or pass the value from server to client so both agree.',
          isCorrect: true,
          feedback:
            'Hydration assumes the client will produce the identical DOM the server sent. Non-deterministic or environment-dependent values during initial render break that assumption — the fix is deterministic initial render, with client-only concerns deferred post-hydration.',
        },
        {
          id: 'b',
          label: 'The server is simply slow — add a loading spinner until hydration completes and the flicker will be hidden.',
          isCorrect: false,
          feedback:
            'A spinner hides a symptom while the mismatch (wrong greeting, jumping timestamp) persists and hydration still discards the server DOM. The cause is non-matching render output, not server speed.',
        },
        {
          id: 'c',
          label: 'Disable hydration and let the client re-render everything from scratch — simpler and avoids mismatches.',
          isCorrect: false,
          feedback:
            'Disabling hydration throws away SSR’s whole benefit (you’re back to a blank-then-rebuild client render), defeating the SEO/first-paint reason you chose SSR. Fix the determinism instead of abandoning the strategy.',
        },
        {
          id: 'd',
          label: 'Move all rendering logic into ngOnInit so it runs consistently on both server and client.',
          isCorrect: false,
          feedback:
            'ngOnInit runs on both, but if it still calls Date.now()/browser APIs it produces DIFFERENT values on each — the mismatch remains. The issue is non-deterministic INPUTS during initial render, not which lifecycle hook runs.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What must be TRUE about server output vs client output for hydration to work?' },
        { level: 2, title: 'Concept', content: 'Deterministic initial render; defer client-only values post-hydration.' },
        { level: 3, title: 'Specific clue', content: 'What do Date.now() and the browser timezone produce on the server vs the client?' },
        { level: 4, title: 'Guided solution', content: 'Pick the mismatch answer: identical initial render, defer client-only differences.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Hydration understood' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The mismatch shipped — every SSR page flickered and re-rendered on load, negating the first-paint win SSR was chosen for.',
        },
      ],
      helpLinks: [{ topicId: 'sysd.rendering', label: 'Rendering strategies' }],
      successFeedback: 'Server and client render the same for the same inputs — hydration attaches cleanly, no flicker.',
      failureFeedback: 'The server said evening, the client said morning. What input differed between them during render?',
    },
  ],
  reflectionPrompt: 'Do our pages use ONE rendering strategy for all, or the right one per page — and does any SSR page render non-deterministic values on first paint?',
  rewards: [{ type: 'xp', amount: 10, label: 'Rendering chosen' }],
};
