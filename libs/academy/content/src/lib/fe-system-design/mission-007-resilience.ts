import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — designing for failure: graceful degradation, offline, and
 * the front-end's role when backends fail.
 */
export const fnSys007Resilience: MissionDefinition = {
  id: 'sys-007-resilience',
  campaignId: 'fe-system-design',
  title: 'Design for When It Breaks',
  summary:
    'A resilient front end assumes the network and backends will fail — degrading gracefully, working offline where it must, and never showing the user a dead white screen.',
  difficulty: 'hard',
  learningObjectives: [
    'Design graceful degradation for partial backend failure',
    'Decide where offline support is a requirement, not a feature',
    'Keep one failure from taking down the whole page',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session seven: the demo always assumes the happy path; production never gets it. Our dashboard aggregated six backend services, and when ONE of them — the least important, a "recommended articles" widget — was down, the ENTIRE dashboard showed a white error screen. One optional service failing blanked six working ones.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Resilience is a design property, not an error handler bolted on. GRACEFUL DEGRADATION: one failing part degrades to a fallback (an error state in that widget), it does not take down the page — isolate failures per section. OFFLINE: for some apps (field tools, transit, note-taking) offline is a REQUIREMENT — service workers, local-first data, sync-on-reconnect — decided at design time, not retrofitted. And ALWAYS: never a dead white screen; there is always a meaningful fallback UI. Assume failure; design the fallback first.',
    },
  ],
  contextArtefacts: [
    {
      id: 'resilience-design',
      type: 'code',
      title: 'Designing for failure',
      language: 'text',
      content:
        'GRACEFUL DEGRADATION isolate failures per section → one widget errors,\n                     the page survives (error boundary per region)\nOFFLINE (if required) service worker + local-first data + sync-on-reconnect\n                     → a design-time DECISION for field/transit/notes apps\nNEVER a white screen  every failure state has a meaningful fallback UI\n                     (retry, cached data, "unavailable" — not a blank page)\n\nassume the network and every backend WILL fail; design the fallback first',
    },
  ],
  challenges: [
    {
      id: 'sys-007-c1',
      type: 'multiple-choice',
      title: 'One Widget Blanks the Page',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'The dashboard fetches six services’ data, then renders. When the optional "recommended articles" service 500s, the whole render throws and the user sees a white error screen — losing the five services that returned fine.',
      prompt: 'What is the resilient design?',
      options: [
        {
          id: 'a',
          label:
            'Isolate failures per section: each widget fetches and renders INDEPENDENTLY, with its own loading/error/empty states, so a failure is contained to that widget’s box (showing a small "couldn’t load recommendations — retry" fallback) while the other five render normally. The page composition must not be all-or-nothing — one optional service failing degrades ONE widget, never the whole dashboard. Critical vs optional widgets can even differ in how loudly they fail.',
          isCorrect: true,
          feedback:
            'Graceful degradation is architectural: compose the page from independently-failing sections so blast radius is one widget, not the page. The white screen happened because six fetches shared one all-or-nothing render — isolate them.',
        },
        {
          id: 'b',
          label: 'Wrap the whole dashboard data fetch in a try/catch and show a "dashboard unavailable, retry" page on any error.',
          isCorrect: false,
          feedback:
            'A page-level catch keeps the white screen from being blank but STILL loses the five working services to one optional failure — the user gets "unavailable" for a dashboard that is 5/6 fine. The failure must be isolated to the widget, not caught at the page.',
        },
        {
          id: 'c',
          label: 'Make the recommended-articles service more reliable so it stops failing.',
          isCorrect: false,
          feedback:
            'Improving one service’s reliability does not fix the DESIGN flaw: ANY of the six failing would blank the page, and services will always fail sometimes. Resilience means the page survives failures, not that failures never happen.',
        },
        {
          id: 'd',
          label: 'Fetch the recommended articles last and ignore its result if the others succeeded first.',
          isCorrect: false,
          feedback:
            'Special-casing one widget’s ordering is brittle and does not generalise — the next optional widget has the same problem, and "ignore if others succeeded" is racy and drops data the widget could show. Isolate every section’s failure structurally, not by fetch ordering.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Why did ONE service failing lose the other FIVE? What did they share?' },
        { level: 2, title: 'Concept', content: 'Independently-failing sections: one widget errors, the page survives.' },
        { level: 3, title: 'Specific clue', content: 'Should six fetches share one all-or-nothing render, or fail per widget?' },
        { level: 4, title: 'Guided solution', content: 'Pick per-section failure isolation.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Failures isolated' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The all-or-nothing render shipped — every optional service blip blanked the whole dashboard for all users.',
        },
      ],
      helpLinks: [{ topicId: 'sysd.resilience', label: 'Designing for failure' }],
      successFeedback: 'One widget fails, five survive — the page degrades gracefully instead of blanking.',
      failureFeedback: 'The five working services were lost because they shared one render with the failing one. What isolates them?',
    },
    {
      id: 'sys-007-c2',
      type: 'multiple-choice',
      title: 'Is Offline a Requirement',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'Two apps in design. (A) A warehouse inventory tool used by staff on handheld scanners in areas with no reliable signal — they must keep scanning and recording when offline. (B) A public marketing site. A junior proposes adding full offline support (service worker, local-first sync) to BOTH "for resilience".',
      prompt: 'How should offline support be decided for each?',
      options: [
        {
          id: 'a',
          label:
            'Offline is a REQUIREMENT decided by usage context, not a blanket resilience feature. (A) genuinely needs it — staff must record scans with no signal, so local-first data + a service worker + sync-on-reconnect are core architecture, designed in from the start (retrofitting offline is very hard). (B) does not — a marketing site visited online occasionally gains little from full offline support and pays real complexity (cache invalidation, stale content, sync bugs) for it. Decide offline per app from whether users are actually offline while needing it.',
          isCorrect: true,
          feedback:
            'Offline is expensive architecture justified by a real usage requirement (A: no-signal field work), not a universal "resilience" upgrade. Adding it to a marketing site (B) buys complexity and staleness bugs for a scenario its users rarely hit. Requirement-driven, per app.',
        },
        {
          id: 'b',
          label: 'Add full offline support to both — offline capability is strictly more resilient, so more is better.',
          isCorrect: false,
          feedback:
            'Offline support is not free resilience: service workers add cache-invalidation and stale-content hazards, and local-first sync adds conflict-resolution complexity. For a marketing site whose users are online, that complexity is cost with almost no benefit. More capability is not automatically better.',
        },
        {
          id: 'c',
          label: 'Add it to neither now — offline can always be retrofitted later if users ask for it.',
          isCorrect: false,
          feedback:
            'For the warehouse tool (A), offline is a CORE requirement its users hit constantly — shipping without it means the tool fails in the field, and offline/local-first is notoriously hard to retrofit onto an online-first architecture. It must be designed in from the start.',
        },
        {
          id: 'd',
          label: 'Add a basic service-worker cache to both for faster repeat loads, but skip full offline sync.',
          isCorrect: false,
          feedback:
            'A cache-only service worker gives the warehouse tool NONE of what it needs (recording scans offline requires local-first data + sync, not just cached assets) while still adding invalidation complexity to the marketing site. It under-serves A and over-complicates B — decide per real requirement.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Are the app’s users actually offline WHILE needing to use it?' },
        { level: 2, title: 'Concept', content: 'Offline is a requirement-driven architecture, not a universal resilience add-on.' },
        { level: 3, title: 'Specific clue', content: 'Can the warehouse tool’s core job (recording scans) work if offline is retrofitted later?' },
        { level: 4, title: 'Guided solution', content: 'Offline core for A, skip for B.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Offline scoped' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Offline was bolted onto the marketing site and skipped on the warehouse tool — complexity where it was not needed, and a field tool that failed without signal.',
        },
      ],
      helpLinks: [{ topicId: 'sysd.resilience', label: 'Designing for failure' }],
      successFeedback: 'Offline where users are offline, skipped where they are not — decided by requirement, not reflex.',
      failureFeedback: 'One app’s users are in a no-signal warehouse; the other’s are online. Which one NEEDS offline as core architecture?',
    },
  ],
  reflectionPrompt: 'If our least-important backend service failed right now, would one widget degrade — or would the whole page blank?',
  rewards: [{ type: 'xp', amount: 15, label: 'Resilience designed' }],
};
