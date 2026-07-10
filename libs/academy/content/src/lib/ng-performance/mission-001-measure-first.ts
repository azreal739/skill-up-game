import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — measure before optimising: profiles over hunches, and the
 * difference between actual and perceived performance.
 */
export const fnPf001MeasureFirst: MissionDefinition = {
  id: 'pf-001-measure-first',
  campaignId: 'ng-performance',
  title: 'Guesses Optimise Nothing',
  summary:
    'Performance work starts with a measurement — the profiler names the cost, and the hunch is usually wrong about where it lives.',
  difficulty: 'intro',
  learningObjectives: [
    'Insist on a profile before touching “slow” code',
    'Read a performance trace for the dominant cost',
    'Separate actual latency from perceived latency',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'New block: performance. It opened with a confession of mine. Two years ago I spent a week micro-optimising a sorting function on the reports page because it FELT like the slow part. It was 3% of the load time. The images were 61%.',
    },
    {
      speaker: 'Senior Dev',
      text: 'So rule one, carved in stone: no optimisation without a measurement, no measurement without a number someone can re-run. The DevTools profiler, the network waterfall, and Lighthouse are the instruments. Hunches choose WHERE to point them — never what to fix.',
    },
  ],
  contextArtefacts: [
    {
      id: 'reports-profile',
      type: 'code',
      title: 'The reports page, actually measured',
      language: 'text',
      content:
        'reports page — load breakdown (Lighthouse + waterfall)\n  images (12 unoptimised PNGs)……… 61%\n  main bundle parse/execute………… 22%\n  API calls (sequential)……………… 14%\n  sortReports()………………………………… 3%   ← the week I spent',
    },
  ],
  challenges: [
    {
      id: 'pf-001-c1',
      type: 'multiple-choice',
      title: 'The Week That Bought 3%',
      difficulty: 'intro',
      tags: ['angular'],
      storyContext: 'The confession slide is up. A junior asks how a senior spent a week on the smallest slice.',
      prompt: 'What discipline prevents the wasted week?',
      options: [
        {
          id: 'a',
          label: 'Better intuition — with experience, engineers learn to feel where the real cost is.',
          isCorrect: false,
          feedback:
            'The confession IS an experienced engineer’s intuition failing — code you wrote feels slow; code you did not write is invisible. Intuition picks where to LOOK, never what to fix.',
        },
        {
          id: 'b',
          label:
            'Measure first: profile the page, rank the costs, and only optimise the top of the ranking — because optimisation effort pays proportionally to the slice it targets, and hunches systematically point at interesting code instead of expensive code.',
          isCorrect: true,
          feedback:
            'A week on 3% caps your win at 3%. Ten minutes of measurement would have redirected the week to the 61% — measurement is the highest-leverage performance tool that exists.',
        },
        {
          id: 'c',
          label: 'Optimise everything as you write it — performance-first habits make profiling unnecessary.',
          isCorrect: false,
          feedback:
            'Optimising everything means optimising the 3% forty times — premature optimisation trades readability everywhere for wins mostly nowhere.',
        },
        {
          id: 'd',
          label: 'Set a bundle-size budget in CI — automated limits catch slowness before humans have to.',
          isCorrect: false,
          feedback:
            'Budgets are a fine guardrail for ONE cost class — they would have said nothing about the 12 PNGs dominating this page.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What is the maximum win from optimising a 3% slice to zero?' },
        { level: 2, title: 'Concept', content: 'Effort pays proportionally to the slice it targets — so rank slices first.' },
        { level: 3, title: 'Specific clue', content: 'Why did the sort FEEL slow while the images did not?' },
        { level: 4, title: 'Guided solution', content: 'Pick measure-rank-then-optimise.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Rule one carved' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'A quarter of hunch-driven optimisations left the code trickier and the page exactly as slow.',
        },
      ],
      helpLinks: [{ topicId: 'perf.measure-first', label: 'Measure first' }],
      successFeedback: 'Numbers before knives — the block’s only unbreakable rule.',
      failureFeedback: 'Compute the ceiling: what is the best possible outcome of a week on the 3% slice?',
    },
    {
      id: 'pf-001-c2',
      type: 'multiple-choice',
      title: 'Two Kinds of Fast',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'Two tickets, same page: “export takes 8 seconds” and “the page freezes while typing in the filter box”. The team has budget for one this sprint.',
      prompt: 'How do the two problems differ, and which matters more?',
      options: [
        {
          id: 'a',
          label: 'Same problem, different symptoms — fix the export first since 8s is objectively longer than a typing stutter.',
          isCorrect: false,
          feedback:
            'Duration is not severity: users forgive a progress bar for 8 seconds; they do not forgive a keyboard that fights back on every key.',
        },
        {
          id: 'b',
          label: 'The freeze is a bug, not performance — route it to the defect backlog and spend the budget on the export.',
          isCorrect: false,
          feedback:
            'Main-thread contention IS performance — filed under a different name it just gets fixed later by someone with less context.',
        },
        {
          id: 'c',
          label: 'Fix neither yet — batch performance work into a dedicated hardening sprint where it can be done properly.',
          isCorrect: false,
          feedback: 'Deferring an every-keystroke freeze to a someday-sprint is choosing to lose users politely.',
        },
        {
          id: 'd',
          label:
            'Different kinds: the export is LATENCY on a rare, expectable operation — perceived cost is managed with progress feedback; the freeze is RESPONSIVENESS on a continuous interaction — the main thread is blocked during input, which no spinner can excuse. Responsiveness wins the budget.',
          isCorrect: true,
          feedback:
            'Latency can be bought off with honest feedback; a blocked main thread cannot. Interaction responsiveness is the floor under everything else.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Which problem can a progress bar make acceptable?' },
        { level: 2, title: 'Concept', content: 'Latency vs responsiveness — waiting vs fighting the UI.' },
        { level: 3, title: 'Specific clue', content: 'How often does each user hit each problem per session?' },
        { level: 4, title: 'Guided solution', content: 'Pick the latency-vs-responsiveness distinction.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Fast disambiguated' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'The export got faster while typing stayed broken — the survey said “the app feels slower” anyway.',
        },
      ],
      helpLinks: [{ topicId: 'perf.measure-first', label: 'Measure first' }],
      successFeedback: 'Waiting is negotiable; fighting the keyboard is not — budget aimed correctly.',
      failureFeedback: 'Picture both users: one watches a bar for 8s; one loses keystrokes every minute. Who churns?',
    },
  ],
  reflectionPrompt: 'What is our slowest page — measured, not felt? If nobody knows the answer, that IS the answer.',
  rewards: [{ type: 'xp', amount: 5, label: 'Instruments out' }],
};
