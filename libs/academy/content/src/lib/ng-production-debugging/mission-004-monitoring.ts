import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — observability: error monitoring, breadcrumbs, and knowing
 * a bug exists before users tell you.
 */
export const fnDbg004Monitoring: MissionDefinition = {
  id: 'dbg-004-monitoring',
  campaignId: 'ng-production-debugging',
  title: 'Know Before They Tell You',
  summary:
    'Error monitoring turns invisible production failures into alerts with context — breadcrumbs, release tags and user impact — so you find bugs before support does.',
  difficulty: 'medium',
  learningObjectives: [
    'Capture unhandled errors with context, not just a message',
    'Use breadcrumbs and release tags to reconstruct failures',
    'Measure impact to prioritise what to fix',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session four, an uncomfortable metric: a bug had been failing 4% of checkouts for three weeks. We learned about it from a Twitter complaint, not our own systems. Every one of those failures happened in a browser we could not see. We were blind to our own production.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Observability is refusing to be blind. An error monitor (Sentry-style) catches unhandled errors and rejected promises and ships them to you WITH CONTEXT: the de-minified stack, BREADCRUMBS (the clicks and navigations before the crash), the RELEASE version (so you know which deploy introduced it), browser/OS, and how MANY users hit it. That last number is the priority signal — a crash hitting 4% of checkouts outranks a cosmetic bug hitting one power user, no matter which was reported louder.',
    },
  ],
  contextArtefacts: [
    {
      id: 'error-context',
      type: 'code',
      title: 'An error worth acting on carries context',
      language: 'ts',
      content:
        "// global handler → monitor, with context that makes it actionable\n@Injectable()\nclass MonitoringErrorHandler implements ErrorHandler {\n  handleError(err: unknown) {\n    monitor.capture(err, {\n      release: APP_VERSION,          // which deploy?\n      breadcrumbs: recentUserActions(), // what led here?\n      user: anonymizedUserId(),      // how many distinct users?\n      // → de-minified via uploaded source maps (last mission)\n    });\n  }\n}",
    },
  ],
  challenges: [
    {
      id: 'dbg-004-c1',
      type: 'multiple-choice',
      title: 'Three Weeks Blind',
      difficulty: 'medium',
      tags: ['incident-response'],
      storyContext:
        'The 4%-of-checkouts bug, discovered via Twitter after three weeks. The team wants to make sure they are never blind like this again. A dev proposes "add more console.error calls so we can see errors".',
      prompt: 'What actually fixes the blindness?',
      options: [
        {
          id: 'a',
          label:
            'console.error only writes to the USER’s console, which you never see. Install real error monitoring: a global ErrorHandler (and unhandledrejection listener) that ships every unhandled error to a monitoring service with context — de-minified stack (via source maps), release version, breadcrumbs, and distinct-user count — plus alerting on error-rate spikes. Then a new failure pages you within minutes, with the deploy that caused it and how many users are hurt, instead of surfacing on social media weeks later.',
          isCorrect: true,
          feedback:
            'The gap was not too few logs — it was that logs live on the user’s machine. Monitoring exports errors WITH context to where you can act, and alerts turn a three-week silence into a three-minute page.',
        },
        {
          id: 'b',
          label: 'Add console.error everywhere and ask support to have users send screenshots of their console.',
          isCorrect: false,
          feedback:
            'That depends on users noticing, opening DevTools, and reporting — the exact chain that failed for three weeks. Errors must be exported automatically, not left on the user’s machine for them to relay.',
        },
        {
          id: 'c',
          label: 'Increase QA coverage before releases so bugs like this are caught pre-production.',
          isCorrect: false,
          feedback:
            'Better QA reduces SOME escapes but never all — production has browsers, data, and conditions QA cannot fully cover (this bug hit a specific browser/data combo). You still need to SEE the failures that inevitably escape.',
        },
        {
          id: 'd',
          label: 'Poll a /health endpoint and alert if the server is down — uptime monitoring covers production issues.',
          isCorrect: false,
          feedback:
            'Uptime monitoring catches server-DOWN, not client-side errors on a perfectly healthy server — the checkout bug threw in the browser while every server health check was green. You need front-end error monitoring.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Where does console.error actually go — and can you see it?' },
        { level: 2, title: 'Concept', content: 'Export unhandled errors with context to a monitor; alert on spikes.' },
        { level: 3, title: 'Specific clue', content: 'The bug hit a healthy server. What would a /health check have shown?' },
        { level: 4, title: 'Guided solution', content: 'Global ErrorHandler → monitor with context + alerting.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Blindness cured' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'console.errors were sprinkled everywhere and never seen — the next silent failure again surfaced via a user complaint.',
        },
      ],
      helpLinks: [{ topicId: 'debug.monitoring', label: 'Error monitoring' }],
      successFeedback: 'Errors exported with context, spikes alerted — the three-week blind spot closed.',
      failureFeedback: 'console.error writes to a console you cannot read. What sends the error somewhere you CAN?',
    },
    {
      id: 'dbg-004-c2',
      type: 'multiple-choice',
      title: 'Which Error to Fix First',
      difficulty: 'medium',
      tags: ['incident-response'],
      storyContext:
        'The monitor now shows a busy dashboard: (A) a null-deref hitting 6% of all sessions, low visibility (silent, no user-facing break); (B) a loud console error affecting 1 known power user who files daily tickets; (C) 4,000 identical "ResizeObserver loop limit exceeded" warnings that break nothing. Limited time.',
      prompt: 'How do you prioritise?',
      options: [
        {
          id: 'a',
          label:
            'Prioritise by IMPACT (users affected × severity of effect), not by loudness. (A) — 6% of sessions with a null-deref that may be silently corrupting behaviour — is the top priority despite no one shouting. (B) is one user; fix it, but after the widespread one. (C) is a famously benign browser warning breaking nothing — filter it out as noise so it stops drowning the signal. The daily-ticket user and the 4,000-count warning are LOUD, not IMPACTFUL.',
          isCorrect: true,
          feedback:
            'Monitoring’s value is turning volume into IMPACT. Loudest ≠ worst: a silent 6% is a real business problem; a benign warning at count 4,000 is just noise to suppress; a single vocal user is a one-off. Rank by users×severity.',
        },
        {
          id: 'b',
          label: 'Fix C first — 4,000 occurrences is by far the highest count, so it affects the most users.',
          isCorrect: false,
          feedback:
            'Count is not impact: "ResizeObserver loop limit exceeded" is a well-known benign warning that breaks nothing. High count of a harmless event is noise to FILTER, not the top fix — and it is drowning your real signals.',
        },
        {
          id: 'c',
          label: 'Fix B first — a user filing daily tickets is your most engaged customer and clearly the most affected.',
          isCorrect: false,
          feedback:
            'Vocal ≠ widespread. One power user’s daily tickets are loud, but the silent 6%-of-sessions null-deref affects vastly more people who simply left without complaining. Prioritise reach × severity.',
        },
        {
          id: 'd',
          label: 'Fix them in the order they first appeared — oldest bugs have caused the most cumulative harm.',
          isCorrect: false,
          feedback:
            'Age is a weak proxy for harm — a new bug hitting 6% of sessions outranks an old cosmetic one. Prioritise by current impact, not by discovery date.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Separate LOUD (visible/frequent/vocal) from IMPACTFUL (users × severity).' },
        { level: 2, title: 'Concept', content: 'Prioritise by reach × severity; filter benign noise.' },
        { level: 3, title: 'Specific clue', content: 'Which of the three is a known-benign browser warning?' },
        { level: 4, title: 'Guided solution', content: 'Fix the silent 6% first; filter the ResizeObserver noise.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Impact ranked' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The team chased the loud single-user tickets and the 4,000 benign warnings — the silent 6% null-deref ran for another month.',
        },
      ],
      helpLinks: [{ topicId: 'debug.monitoring', label: 'Error monitoring' }],
      successFeedback: 'Impact over volume — the silent majority fixed first, the noise filtered out.',
      failureFeedback: 'Two of these are loud but not impactful. Which one quietly affects the most users?',
    },
  ],
  reflectionPrompt: 'Would we know within minutes if a new deploy started failing 5% of a critical flow — or would we hear it from a user first?',
  rewards: [{ type: 'xp', amount: 10, label: 'Observability gained' }],
};
