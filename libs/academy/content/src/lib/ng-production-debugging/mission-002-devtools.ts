import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — browser DevTools as instruments: network, sources,
 * breakpoints, and reading them instead of guessing.
 */
export const fnDbg002DevTools: MissionDefinition = {
  id: 'dbg-002-devtools',
  campaignId: 'ng-production-debugging',
  title: 'The Instruments You Already Have',
  summary:
    'DevTools answer most front-end questions directly — network, breakpoints, the console — if you interrogate them instead of console.logging in the dark.',
  difficulty: 'easy',
  learningObjectives: [
    'Pick the DevTools panel that answers the question',
    'Use conditional breakpoints over scattered console.logs',
    'Read the network tab for the truth of a request',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session two, a humbling exercise: we watched a senior debug a "data not showing" bug in ninety seconds — open network tab, see the 403, done — while a script of console.logs would have taken an hour to reach the same fact. The tools already know; most of us just do not ask them.',
    },
    {
      speaker: 'Senior Dev',
      text: 'DevTools are instruments, and each panel answers a question. NETWORK: did the request go out, what came back, which status, what headers — the first stop for anything data-shaped. SOURCES + BREAKPOINTS: pause execution and inspect real values, including CONDITIONAL breakpoints that only fire when quantity < 0. CONSOLE for quick probes, but a conditional breakpoint beats twenty console.logs you have to add, rebuild, and remove. Learn which instrument answers which question.',
    },
  ],
  contextArtefacts: [
    {
      id: 'panel-to-question',
      type: 'code',
      title: 'Which panel answers which question',
      language: 'text',
      content:
        '"data isn’t showing"        → Network: did it send? status? response body/shape?\n"value is wrong here"       → Sources: conditional breakpoint (x < 0), inspect scope\n"it’s slow"                 → Performance: flame chart (the perf campaign’s tools)\n"memory grows"              → Memory: heap snapshots (the perf leak workflow)\n"layout looks off"          → Elements: computed styles, box model\n\nconsole.log: fine for a quick probe; a breakpoint beats 20 you must add/remove',
    },
  ],
  challenges: [
    {
      id: 'dbg-002-c1',
      type: 'multiple-choice',
      title: 'Ninety Seconds vs an Hour',
      difficulty: 'easy',
      tags: ['incident-response'],
      storyContext:
        'Bug: a list renders empty. A dev starts adding console.log to the component, the service, and the mapping function to trace where the data is lost.',
      prompt: 'What is the faster first move?',
      options: [
        {
          id: 'a',
          label:
            'Open the Network tab and look at the actual request: did it fire at all? What status came back (200 with empty array? 403? 500? never sent)? What is the response body’s real shape? This one panel distinguishes "no request", "auth failure", "server returned nothing", and "data arrived but mapping dropped it" — before writing a single console.log, and it tells you WHICH layer to investigate next.',
          isCorrect: true,
          feedback:
            'The network tab collapses four hypotheses into one observation. console.logs would eventually reach the same fact, but the instrument already recorded it — ask the instrument first.',
        },
        {
          id: 'b',
          label: 'Add the console.logs — tracing the data through each layer is the systematic approach and will find where it is lost.',
          isCorrect: false,
          feedback:
            'Systematic but slow: each log needs adding, rebuilding, reading, removing. And if the request 403’d, none of your component/service/mapping logs even run — an hour to discover what the network tab shows instantly.',
        },
        {
          id: 'c',
          label: 'Check the component template for an *ngIf that might be hiding the populated list.',
          isCorrect: false,
          feedback:
            'A reasonable LATER check, but it assumes the data arrived — the network tab first tells you whether there is any data to hide. Verify the input before debugging the display.',
        },
        {
          id: 'd',
          label: 'Set a breakpoint in the mapping function to inspect the incoming data.',
          isCorrect: false,
          feedback:
            'Good instrument, wrong starting point: if the request failed or returned empty, the mapping function receives nothing or never runs. Start at the network boundary and move inward once you know data arrived.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Before tracing where data is LOST, confirm whether it ever ARRIVED.' },
        { level: 2, title: 'Concept', content: 'The network tab distinguishes no-request / auth-fail / empty / mapping-loss at once.' },
        { level: 3, title: 'Specific clue', content: 'If the request 403’d, would any of the console.logs even fire?' },
        { level: 4, title: 'Guided solution', content: 'Open Network first; read status and response.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Right panel first' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'An hour of console.logs traced the "missing data" to a 403 the network tab showed in one glance.',
        },
      ],
      helpLinks: [{ topicId: 'debug.devtools', label: 'DevTools' }],
      successFeedback: 'Ask the instrument that already recorded the answer — ninety seconds, not an hour.',
      failureFeedback: 'Where does the data cross into your app, and what panel records that crossing?',
    },
    {
      id: 'dbg-002-c2',
      type: 'multiple-choice',
      title: 'The Breakpoint You Need',
      difficulty: 'medium',
      tags: ['incident-response', 'angular'],
      storyContext:
        'A list of 5,000 rows renders one row wrong — a negative quantity where there should never be one. The rendering function runs 5,000 times per render. A dev adds console.log(qty) inside it "to find the bad one".',
      prompt: 'What is the better tool?',
      options: [
        {
          id: 'a',
          label:
            'A CONDITIONAL breakpoint: right-click the line, break only when qty < 0. Execution pauses exactly on the offending row with the full scope live — you can inspect the row object, walk the call stack to see where the negative came from, and read every surrounding variable, all without editing code or drowning in 5,000 log lines. The condition turns "find the needle" into "stop at the needle".',
          isCorrect: true,
          feedback:
            'Conditional breakpoints are the precision instrument: they fire only on the interesting case and hand you the entire live state and call stack — far more than a logged value, and with zero log-noise from the other 4,999 rows.',
        },
        {
          id: 'b',
          label: 'Keep the console.log but wrap it in if (qty < 0) so only the bad row logs.',
          isCorrect: false,
          feedback:
            'Better than logging all 5,000, but it still requires editing and rebuilding, gives you only the logged value (not the live scope or call stack), and must be removed later. The conditional breakpoint does all this with none of the friction.',
        },
        {
          id: 'c',
          label: 'Add a Zod/validation check that throws on negative quantity so the error surfaces with a stack trace.',
          isCorrect: false,
          feedback:
            'A great DEFENSIVE addition for the long term (fail loud at the boundary), but as a debugging step it means editing code and reproducing again — the conditional breakpoint inspects the existing run immediately. Do both, in that order.',
        },
        {
          id: 'd',
          label: 'Log the entire rows array before rendering and search the console output for the negative value.',
          isCorrect: false,
          feedback:
            'Dumping 5,000 rows to the console to eyeball a negative is exactly the noise conditional breakpoints exist to avoid — and it still does not tell you WHERE the negative was introduced.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'You want to stop ONLY on the bad row, with everything inspectable.' },
        { level: 2, title: 'Concept', content: 'Conditional breakpoint: break when qty < 0, inspect live scope + stack.' },
        { level: 3, title: 'Specific clue', content: 'What does a paused breakpoint give you that a logged value cannot?' },
        { level: 4, title: 'Guided solution', content: 'Pick the conditional breakpoint.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Precision paused' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'A 5,000-line console dump shipped in a debug build — it found the value but not where it came from, so the hunt restarted.',
        },
      ],
      helpLinks: [{ topicId: 'debug.devtools', label: 'DevTools' }],
      successFeedback: 'Break on the needle, inspect everything — the conditional breakpoint earns its keep.',
      failureFeedback: 'You need the live scope and call stack at the bad row, not just its value. What provides that?',
    },
  ],
  reflectionPrompt: 'When did we last reach for console.log where a conditional breakpoint or the network tab would have answered faster?',
  rewards: [{ type: 'xp', amount: 10, label: 'Instruments learned' }],
};
