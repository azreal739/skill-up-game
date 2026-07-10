import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — Core Web Vitals and perceived performance: LCP/INP/CLS as
 * user-experience proxies, and honest loading states.
 */
export const fnPf008WebVitals: MissionDefinition = {
  id: 'pf-008-web-vitals',
  campaignId: 'ng-performance',
  title: 'Vitals and the Feeling of Fast',
  summary:
    'LCP, INP and CLS measure moments users actually feel — and perceived performance is designed with skeletons, priorities and honest progress.',
  difficulty: 'hard',
  learningObjectives: [
    'Map LCP, INP and CLS to the user moments they proxy',
    'Choose loading UI that matches actual wait profiles',
    'Review a page against vitals with field data, not lab hunches',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session eight: marketing asked why our “fast” app scores poorly on the vitals we get judged by. The lab numbers on our fibre laptops were great. The FIELD numbers — real users, real devices — told the truth.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The three vitals are user moments with initials. LCP: when does the main thing APPEAR — asset and server latency. INP: when I interact, how long until the page RESPONDS — main-thread health, our mission 5 work. CLS: does the page hold STILL — mission 3’s reserved space. They are proxies for feelings; optimise the feeling and the number follows.',
    },
  ],
  contextArtefacts: [
    {
      id: 'vitals-map',
      type: 'code',
      title: 'Vitals → moments → usual suspects',
      language: 'text',
      content:
        'LCP  "the main content appeared"   ← hero image size/priority, server latency, render-blocking JS\nINP  "my tap did something"          ← long main-thread tasks, heavy handlers, oversized CD\nCLS  "the page held still"           ← unreserved images/banners/fonts\n\nlab data: your laptop, controlled  → for DEBUGGING\nfield data: real users, aggregated → for TRUTH (and for how you are judged)',
    },
  ],
  challenges: [
    {
      id: 'pf-008-c1',
      type: 'multiple-choice',
      title: 'Lab Lies, Field Truths',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'The numbers: lab LCP 1.1s (great), field LCP p75 4.8s (poor). Lab INP fine; field INP p75 620ms (poor). The team is confused — “it’s fast when we test it”.',
      prompt: 'How do you read this split, and where does it point?',
      options: [
        {
          id: 'a',
          label: 'Field data is polluted by users with broken extensions and ancient devices — trust the controlled lab numbers.',
          isCorrect: false,
          feedback:
            '“Polluted by real users” is the punchline, not a rebuttal — the p75 IS the product for a quarter of your users. The lab controls away exactly what hurts.',
        },
        {
          id: 'b',
          label: 'The 4× LCP gap means the CDN is failing in some regions — start with an infrastructure audit.',
          isCorrect: false,
          feedback:
            'Possible but premature: the INP gap points the same direction as the LCP gap — device CPU and network class — before any single-region theory.',
        },
        {
          id: 'c',
          label: 'The metrics disagree because they sample different sessions — align the time windows and the gap will mostly close.',
          isCorrect: false,
          feedback: 'A 4× gap is not a sampling artefact — it is the fibre-laptop assumption from mission 2, measured.',
        },
        {
          id: 'd',
          label:
            'The lab measures YOUR hardware; the field measures the USERS’. Both gaps point at device and network class: LCP 4.8s says assets/JS are heavy for real networks and CPUs; INP 620ms says main-thread tasks that fibre laptops hide (parse, CD, handlers) block real devices. Fix list: mission 2 (bundle), 3 (assets), 5 (main thread) — then re-check FIELD.',
          isCorrect: true,
          feedback:
            'The split is the diagnosis: everything the lab controls away — devices, networks, cold caches — is where the product actually lives. Debug in the lab; declare victory only in the field.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What exactly differs between the lab run and the p75 user?' },
        { level: 2, title: 'Concept', content: 'Lab = debugging instrument; field = ground truth.' },
        { level: 3, title: 'Specific clue', content: 'Both gaps widen together — what single variable widens both?' },
        { level: 4, title: 'Guided solution', content: 'Pick the your-hardware-vs-theirs reading.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Field trusted' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -6,
          reason: '“Fast when we test it” closed the ticket — the users who could not say the same closed their accounts.',
        },
      ],
      helpLinks: [{ topicId: 'perf.web-vitals', label: 'Web vitals & assets' }],
      successFeedback: 'Lab to find it, field to prove it — the two datasets finally doing their own jobs.',
      failureFeedback: 'List what the lab holds constant. Every item on that list is a way the field can differ.',
    },
    {
      id: 'pf-008-c2',
      type: 'code-review',
      title: 'Review the Loading Experience',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'The projects page gets a perceived-performance pass. Review the proposed loading design.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'loading-design',
          type: 'code',
          title: 'projects page loading design (proposed)',
          language: 'text',
          content:
            '1. full-screen branded spinner overlays the app until ALL page data\n   (projects + activity + stats) has arrived — "no half-rendered pages"\n2. project cards: skeleton placeholders matching final card geometry,\n   swapped as each card\'s image decodes\n3. the hero chart (LCP element) is lazy-loaded with loading="lazy"\n   like every other image, "for consistency"\n4. Save button: on click, optimistic tick + toast; errors roll back\n   with an inline retry message',
        },
      ],
      findings: [
        {
          id: 'all-or-nothing-spinner',
          label:
            'Design 1 gates the whole page on its SLOWEST request — the stats call holds projects hostage, users stare at brand instead of content, and LCP records the overlay era in full; render each section as its data lands (the skeletons in design 2 exist for exactly this)',
          isCorrect: true,
          feedback:
            '“No half-rendered pages” buys uniformity with the p75 user’s time: all-or-nothing loading turns the fastest 90% of the page into the slowest 10%. Progressive sections + geometry-true skeletons are strictly kinder.',
        },
        {
          id: 'lazy-lcp-element',
          label:
            'Design 3 lazy-loads the LCP element — “consistency” deprioritises the one image the metric (and the user’s eye) waits for: the hero needs priority/eager, not lazy',
          isCorrect: true,
          feedback:
            'loading="lazy" on the largest above-the-fold element tells the browser to fetch the main content LAST. The hero is the exception the rule exists for — priority hints exist to name it.',
        },
        {
          id: 'skeleton-geometry',
          label: 'Design 2’s geometry-matched skeletons are over-engineering — a simple pulsing block communicates loading equally well',
          isCorrect: false,
          feedback:
            'Geometry-true skeletons are the CLS defence (mission 3): matching final size means the swap shifts nothing. The “over-engineering” is doing structural work.',
        },
        {
          id: 'optimistic-save',
          label: 'Design 4’s optimistic tick shows success before the server confirms — saves must spin until the response arrives',
          isCorrect: false,
          feedback:
            'For a low-stakes, high-success rename-style save with honest rollback, optimism is the right perceived-perf tool — the money-flow caution (HTTP boss) does not generalise to every write.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Walk the p75 user through design 1, then find which image the LCP clock watches.' },
        { level: 2, title: 'Concept', content: 'Progressive beats all-or-nothing; the LCP element is the one image you never lazy-load.' },
        { level: 3, title: 'Specific clue', content: 'Two designs correctly apply earlier missions — the review must spare them.' },
        { level: 4, title: 'Guided solution', content: 'Flag the gating spinner and the lazy hero.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Experience reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The branded overlay shipped — the brand got 4.8 seconds of exposure per visit, billed as engagement.',
        },
      ],
      helpLinks: [{ topicId: 'perf.web-vitals', label: 'Web vitals & assets' }],
      successFeedback: 'Content over ceremony, priority where the eye goes — perceived performance designed, not hoped.',
      failureFeedback: 'Which design makes the FASTEST data wait for the slowest? Which one slows the metric’s own element?',
    },
  ],
  reflectionPrompt: 'Pull our field vitals for the top page: which of the three numbers is worst — and which mission of this block owns it?',
  rewards: [{ type: 'xp', amount: 15, label: 'Vitals owned' }],
};
