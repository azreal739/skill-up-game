import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — images, fonts and LCP: the largest paint is usually an
 * asset problem, and the fixes are attributes, not algorithms.
 */
export const fnPf003AssetsLcp: MissionDefinition = {
  id: 'pf-003-assets-lcp',
  campaignId: 'ng-performance',
  title: 'The 61% Nobody Profiled',
  summary:
    'The reports page’s 61% was images — sizing, format, lazy-loading and priority are attribute-level fixes with algorithm-level wins.',
  difficulty: 'easy',
  learningObjectives: [
    'Serve images sized and formatted for what the layout renders',
    'Lazy-load below-the-fold media and prioritise the LCP element',
    'Prevent layout shift with reserved dimensions',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session three went back to my confession: the 61%. Twelve PNG screenshots, 2400px wide, rendered into 320px cards — every user downloaded a poster and squinted at a stamp, twelve times.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Asset performance is unglamorous and enormous. Right size (srcset lets the browser pick), right format (WebP/AVIF at a fraction of PNG), right time (loading="lazy" below the fold, priority for the hero), and right SPACE — width/height attributes so the page does not reflow when pixels arrive. No algorithms. Attributes.',
    },
  ],
  contextArtefacts: [
    {
      id: 'img-fixes',
      type: 'code',
      title: 'The reports page fix, in full',
      language: 'text',
      content:
        '<img\n  ngSrc="report-thumb.png"      ← NgOptimizedImage: srcset + format negotiation\n  width="320" height="200"      ← space reserved: no layout shift on load\n  loading="lazy"                 ← below-the-fold: fetched when approached\n/>\n<!-- the hero chart (the LCP element) instead gets priority: -->\n<img ngSrc="hero-chart.webp" width="960" height="480" priority />',
    },
  ],
  challenges: [
    {
      id: 'pf-003-c1',
      type: 'multiple-choice',
      title: 'Poster to Stamp',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext: 'The 2400px PNGs into 320px cards. A teammate proposes “compress the PNGs harder” as the sprint fix.',
      prompt: 'What is the full-value fix, and why does harder compression fall short?',
      options: [
        {
          id: 'a',
          label: 'Convert to JPEG at quality 60 — screenshots compress well and the pipeline stays untouched.',
          isCorrect: false,
          feedback:
            'Still 2400px of pixels nobody renders — recompressing the poster misses that the LAYOUT only needs a stamp.',
        },
        {
          id: 'b',
          label: 'Inline the images as base64 to save twelve round-trips.',
          isCorrect: false,
          feedback:
            'Inlining moves the megabytes INTO the critical bundle (mission 2’s double price) and defeats image caching entirely.',
        },
        {
          id: 'c',
          label:
            'Serve what the layout renders: resized variants via srcset/NgOptimizedImage so a 320px card downloads ~320px pixels, in WebP/AVIF — compression on top of right-sizing, not instead of it. That alone is most of the 61%.',
          isCorrect: true,
          feedback:
            'Dimension is the multiplier: a 2400→320 resize cuts ~98% of pixels before any format tricks. Compress the right-sized image, not the poster.',
        },
        {
          id: 'd',
          label: 'Lazy-load all twelve — deferred images cost nothing regardless of size.',
          isCorrect: false,
          feedback:
            'Deferred posters are still posters when scrolled to — and the above-the-fold ones defer nothing. Lazy is the WHEN fix; this is a HOW-BIG problem.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Compare pixels downloaded to pixels rendered.' },
        { level: 2, title: 'Concept', content: 'Right size first (srcset), then right format — order matters.' },
        { level: 3, title: 'Specific clue', content: '2400px into 320px: what fraction of the download is discarded?' },
        { level: 4, title: 'Guided solution', content: 'Pick right-sizing via srcset with modern formats.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Stamps served' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'Harder compression shipped a blurry poster that was still a poster — the page stayed slow, now uglier.',
        },
      ],
      helpLinks: [{ topicId: 'perf.web-vitals', label: 'Web vitals & assets' }],
      successFeedback: 'Serve the stamp, skip the poster — the cheapest 60% you will ever win.',
      failureFeedback: 'The card is 320px wide. How many of the 2400px survive rendering?',
    },
    {
      id: 'pf-003-c2',
      type: 'multiple-choice',
      title: 'The Jumping Page',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'New ticket after the image fix: “I go to tap Export and the button jumps — I tap an ad-hoc banner instead.” The banner and images pop in as they load, shoving content down.',
      prompt: 'What is the mechanism and the fix?',
      options: [
        {
          id: 'a',
          label:
            'Layout shift: elements without reserved space insert themselves on load, moving everything below — measured as CLS. Fix: reserve the space up front — width/height on images (the browser computes the box before pixels arrive), fixed-size containers for banners, skeletons that occupy the final geometry.',
          isCorrect: true,
          feedback:
            'The page must know its geometry before its pixels: reserved space makes loading a fill-in, not a shove. The mis-tap is CLS with a body count.',
        },
        {
          id: 'b',
          label: 'Slow rendering — the tap lands before Angular finishes hydrating the button’s click handler.',
          isCorrect: false,
          feedback: 'The tap LANDED fine — on the banner that had shoved the button down. Geometry moved, not handlers.',
        },
        {
          id: 'c',
          label: 'Debounce taps for 500ms after load so late-moving layouts settle before clicks register.',
          isCorrect: false,
          feedback: 'Punishing every tap to tolerate the shove — the jump is the defect; the tap was perfect.',
        },
        {
          id: 'd',
          label: 'Load the banner first, synchronously, so it is in place before users can reach for anything.',
          isCorrect: false,
          feedback:
            'Blocking the page on its least important element inverts the priority ladder — reserve its box instead and let it fill in whenever.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The button did not misfire — it MOVED. What moved it?' },
        { level: 2, title: 'Concept', content: 'CLS: late content without reserved space shoves the layout.' },
        { level: 3, title: 'Specific clue', content: 'Why do width/height attributes prevent the shove even before the image loads?' },
        { level: 4, title: 'Guided solution', content: 'Pick reserve-the-space.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Page steadied' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The jumping Export button kept redirecting taps into the banner — the most-clicked ad nobody wanted.',
        },
      ],
      helpLinks: [{ topicId: 'perf.web-vitals', label: 'Web vitals & assets' }],
      successFeedback: 'Geometry first, pixels later — the page stopped moving under people’s fingers.',
      failureFeedback: 'Replay the tap frame by frame: what occupied the button’s coordinates at tap time, and why?',
    },
  ],
  reflectionPrompt: 'Open our heaviest page with the network tab sorted by size: how many downloaded pixels does the layout actually render?',
  rewards: [{ type: 'xp', amount: 10, label: 'Assets tamed' }],
};
