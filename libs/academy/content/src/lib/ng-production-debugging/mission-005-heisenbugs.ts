import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — intermittent bugs: races, timing, and environment-specific
 * failures that vanish when you look.
 */
export const fnDbg005Heisenbugs: MissionDefinition = {
  id: 'dbg-005-heisenbugs',
  campaignId: 'ng-production-debugging',
  title: 'The Bug That Vanishes When You Look',
  summary:
    'Intermittent bugs are usually races, timing, or environment differences — “random” is a description of your ignorance, not the bug.',
  difficulty: 'hard',
  learningObjectives: [
    'Treat “random” as unfound conditions, not true randomness',
    'Diagnose race conditions and timing-dependent failures',
    'Isolate environment-specific behaviour',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session five, the bugs that break people’s spirit: the ones that vanish the moment you add a breakpoint. Our worst was a search that "sometimes" showed results for the PREVIOUS query — impossible to reproduce on demand, gone under the debugger. The team had labelled it "just a flaky race, unfixable".',
    },
    {
      speaker: 'Senior Dev',
      text: '"Random" is never random — it is CONDITIONS you have not identified yet. Intermittent bugs cluster into: RACES (two async operations whose ORDER varies — the previous-query results are a slow response landing after a fast one, the RxJS switchMap lesson as an incident), TIMING (something assumed instant that occasionally is not), and ENVIRONMENT (a specific browser, network speed, data shape, or clock). The breakpoint "fixes" it because pausing changes the timing — which is itself the clue: timing-sensitive means a race.',
    },
  ],
  contextArtefacts: [
    {
      id: 'heisenbug-classes',
      type: 'code',
      title: 'Classes of “random”',
      language: 'text',
      content:
        'RACE         two async ops, order varies → stale results, double writes\n             tell: a breakpoint/slowdown changes the outcome (timing-sensitive)\n             fix: cancel/serialize (switchMap, exhaustMap, sequence numbers)\nTIMING       assumed-instant thing occasionally isn’t → undefined, empty\n             tell: fails under load / on slow devices / cold cache\nENVIRONMENT  specific browser, locale, network, data shape, timezone\n             tell: clusters by user-agent / region / a data attribute\n\n"random" = conditions you haven’t named yet',
    },
  ],
  challenges: [
    {
      id: 'dbg-005-c1',
      type: 'multiple-choice',
      title: 'Results for the Wrong Query',
      difficulty: 'hard',
      tags: ['incident-response', 'rxjs'],
      storyContext:
        'The search bug: type "shoes", quickly change to "shirts", and results for "shoes" sometimes appear under "shirts". It vanishes under a breakpoint. Each keystroke fires an independent HTTP search.',
      prompt: 'What is the bug, and how does the breakpoint clue help?',
      options: [
        {
          id: 'a',
          label:
            'A race: "shoes" and "shirts" requests are in flight together, and if the slower "shoes" response lands AFTER "shirts", it overwrites the display with stale results. The breakpoint "fixes" it precisely because pausing serialises the requests — timing-sensitivity is the signature of a race. Fix by cancelling superseded requests (switchMap, which unsubscribes the previous inner request) or discarding responses that do not match the current query (a sequence/latest-query guard).',
          isCorrect: true,
          feedback:
            'The RxJS flattening lesson as a production incident: independent per-keystroke requests with no cancellation race, and last-to-arrive wins regardless of last-requested. switchMap makes "latest wins" structural; the breakpoint’s "fix" confirmed timing was the variable.',
        },
        {
          id: 'b',
          label: 'A caching bug — the previous query’s results are cached and served for the new query; clear the cache on each search.',
          isCorrect: false,
          feedback:
            'The clue points at TIMING, not caching: it only fails when you type FAST (requests overlap) and vanishes under a breakpoint (requests serialise). A cache bug would not be timing-sensitive like that. It is a race.',
        },
        {
          id: 'c',
          label: 'True randomness in the server’s response order — add a retry so the correct results eventually load.',
          isCorrect: false,
          feedback:
            'It is not random and not the server’s fault: the client fired two requests and rendered whichever returned last. Retries add more racing requests. The client must cancel or filter superseded responses.',
        },
        {
          id: 'd',
          label: 'Add a 300ms delay before each render so responses have time to settle into order.',
          isCorrect: false,
          feedback:
            'A fixed delay is the sleep-in-tests anti-pattern for production: it makes the race RARER (masking it) without removing it, and slows every search. Cancel the superseded request instead of hoping it loses the race.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Why does typing FAST trigger it and a breakpoint HIDE it? What variable is that?' },
        { level: 2, title: 'Concept', content: 'Timing-sensitive = race: overlapping requests, last-to-arrive wins.' },
        { level: 3, title: 'Specific clue', content: 'Which RxJS operator makes "only the latest request counts" structural?' },
        { level: 4, title: 'Guided solution', content: 'Pick the race; fix with switchMap / query-match guard.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Race identified' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The team labelled it "flaky, unfixable" and added a retry — the stale-results race stayed, now firing extra requests.',
        },
      ],
      helpLinks: [
        { topicId: 'debug.heisenbugs', label: 'Intermittent bugs' },
        { topicId: 'rx.flattening', label: 'Flattening strategies' },
      ],
      successFeedback: 'The breakpoint that "fixed" it named the variable: timing. Race found, latest-wins made structural.',
      failureFeedback: 'What is different when you type fast vs slow, or pause vs run? That variable IS the bug class.',
    },
    {
      id: 'dbg-005-c2',
      type: 'multiple-choice',
      title: 'Only on Their Machine',
      difficulty: 'hard',
      tags: ['incident-response'],
      storyContext:
        'A dashboard crashes for exactly one region’s users — reproducible for them every time, never for anyone else. The monitor shows the same stack: a date-parsing error. The team cannot reproduce it locally at all.',
      prompt: 'How do you approach an environment-specific bug you cannot reproduce?',
      options: [
        {
          id: 'a',
          label:
            'Mine the monitoring for what that cohort SHARES: the crash clusters by region and hits a date parser — so hypothesise an environment variable that differs there (locale date format like DD/MM/YYYY vs MM/DD/YYYY, timezone, or a right-to-left/locale-specific data value) and REPRODUCE it by adopting those conditions locally — set your browser/OS locale and timezone to match, feed the same data shape. "Cannot reproduce" means "have not matched their environment yet"; the cluster tells you which variable to change.',
          isCorrect: true,
          feedback:
            'Environment bugs are deterministic once you match the environment. The monitoring cluster (one region, date parser) hands you the hypothesis: change YOUR locale/timezone/data to theirs and it will reproduce every time — then fix the parser to be locale-robust.',
        },
        {
          id: 'b',
          label: 'It is unreproducible by definition — add defensive try/catch around the date parser so it stops crashing for them.',
          isCorrect: false,
          feedback:
            'Swallowing the parse error leaves those users with wrong/blank dates and hides the real cause. And it IS reproducible — you just have not matched their locale/timezone yet. Reproduce, then fix the parsing correctly.',
        },
        {
          id: 'c',
          label: 'Ship a fix that forces all dates to ISO 8601 everywhere and assume that resolves the region-specific crash.',
          isCorrect: false,
          feedback:
            'Standardising on ISO is often a GOOD fix — but shipping it blind, without reproducing to confirm the cause, is the guess-and-hope this block rejects. Reproduce with their locale first, prove ISO handling fixes it, then ship.',
        },
        {
          id: 'd',
          label: 'Ask the affected users to switch their browser language to English as a workaround.',
          isCorrect: false,
          feedback:
            'Telling users to change their locale to use your app is not a fix — it abandons the users whose environment your code should support. Reproduce their conditions and make the parser locale-correct.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What do all the affected users SHARE that you have not matched locally?' },
        { level: 2, title: 'Concept', content: 'Environment bug = deterministic once you replicate the environment.' },
        { level: 3, title: 'Specific clue', content: 'A date parser + one region: what differs about dates by locale?' },
        { level: 4, title: 'Guided solution', content: 'Match their locale/timezone/data locally to reproduce, then fix the parser.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Environment matched' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The bug was declared unreproducible and try/catch’d — the region’s users kept seeing blank dashboards behind a swallowed error.',
        },
      ],
      helpLinks: [{ topicId: 'debug.heisenbugs', label: 'Intermittent bugs' }],
      successFeedback: '"Only on their machine" became "always, once I matched their locale" — reproduced and fixed for real.',
      failureFeedback: 'The cluster is one region + a date parser. What environment variable would you change to join that cluster?',
    },
  ],
  reflectionPrompt: 'Which bug have we written off as "flaky" or "random"? What conditions have we NOT yet tried to pin down — timing, order, or environment?',
  rewards: [{ type: 'xp', amount: 15, label: 'Heisenbugs demystified' }],
};
