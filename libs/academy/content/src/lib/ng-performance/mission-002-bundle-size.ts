import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — bundle size: analysis, tree-shaking and the imports that
 * quietly defeat it.
 */
export const fnPf002BundleSize: MissionDefinition = {
  id: 'pf-002-bundle-size',
  campaignId: 'ng-performance',
  title: 'Every Byte Ships Twice',
  summary:
    'Bundle bytes cost twice — download and parse/execute — and the biggest offenders are imports that quietly drag whole libraries past the tree-shaker.',
  difficulty: 'easy',
  learningObjectives: [
    'Read a bundle analysis and name the heavy dependencies',
    'Explain what tree-shaking can and cannot remove',
    'Fix the import styles that defeat it',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session two: we ran the bundle analyzer on our own app, live. The room went quiet when a date-picker we removed from the UI last year showed up at 180KB — still imported by one forgotten barrel file.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Two lessons in one treemap. Bytes cost twice: once over the network, once in parse-and-execute on the user’s CPU — a low-end phone pays triple your laptop. And tree-shaking is real but literal: it removes what is provably unreachable. Import the whole library, and reachable is what you asked for.',
    },
  ],
  contextArtefacts: [
    {
      id: 'import-styles',
      type: 'code',
      title: 'Imports the shaker can and cannot save',
      language: 'ts',
      content:
        "import _ from 'lodash';                    // whole library: ~70KB ships\nimport { debounce } from 'lodash';         // classic build: often STILL most of it\nimport debounce from 'lodash-es/debounce'; // ES module path: just the function\n\nimport * as utils from './utils';          // fine IF ./utils is side-effect-free\nimport './polyfills-just-in-case';         // side-effect import: never shaken",
    },
  ],
  challenges: [
    {
      id: 'pf-002-c1',
      type: 'multiple-choice',
      title: 'The Ghost Date-Picker',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'The treemap shows the removed date-picker at 180KB. Grep finds one import left: a barrel file re-exporting it, which nothing imports FROM — but the barrel itself is imported for other exports.',
      prompt: 'Why does the picker still ship, and what is the fix?',
      options: [
        {
          id: 'a',
          label:
            'The barrel re-export keeps the picker reachable, and the picker package registers things on import (side effects), so the shaker must keep it. Fix: drop the re-export from the barrel (and prefer importing specific files over barrels for heavy optional widgets).',
          isCorrect: true,
          feedback:
            'Barrels bundle fates together: import one export, and every side-effectful sibling rides along. The treemap catches what grep forgets.',
        },
        {
          id: 'b',
          label: 'Tree-shaking only runs in dev builds — production keeps everything for source-map fidelity.',
          isCorrect: false,
          feedback: 'Backwards: production is exactly where shaking runs hardest. The picker survived because it stayed reachable.',
        },
        {
          id: 'c',
          label: 'The bundler caches old chunks — a clean build directory would drop the picker.',
          isCorrect: false,
          feedback: 'Stale caches produce stale HASHES, not phantom dependencies — the import graph genuinely includes it.',
        },
        {
          id: 'd',
          label: 'npm keeps the package in node_modules until pruned — uninstalling it is the whole fix.',
          isCorrect: false,
          feedback:
            'Uninstalling would just break the build at the barrel import — node_modules contents never ship unless imported; the import is the problem.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The shaker keeps what is REACHABLE. Trace reachability through the barrel.' },
        { level: 2, title: 'Concept', content: 'Barrels couple exports; side-effect imports are never removable.' },
        { level: 3, title: 'Specific clue', content: 'Nothing imports the picker FROM the barrel — but who imports the barrel?' },
        { level: 4, title: 'Guided solution', content: 'Remove the re-export; import heavy widgets by direct path.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Ghost exorcised' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'The 180KB ghost shipped for another year — every user paid for a widget nobody could see.',
        },
      ],
      helpLinks: [{ topicId: 'perf.bundle-size', label: 'Bundle size' }],
      successFeedback: 'Reachability traced, barrel decoupled — the treemap is your grep for bytes.',
      failureFeedback: 'Follow the imports: app → barrel → ? What keeps the picker in the graph?',
    },
    {
      id: 'pf-002-c2',
      type: 'multiple-choice',
      title: 'Why Parse Time Matters',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'A teammate waves the ticket off: “our users are on fibre — 500KB more JS is 40ms of download. Bundle size is a 2015 problem.”',
      prompt: 'What does the fibre argument miss?',
      options: [
        {
          id: 'a',
          label: 'CDN costs — half a megabyte per visit multiplies into real bandwidth bills at scale.',
          isCorrect: false,
          feedback: 'True but trivial next to the real miss — the user’s CPU, which fibre does nothing for.',
        },
        {
          id: 'b',
          label: 'Caching — bigger bundles bust caches more often, so returning visitors re-download more.',
          isCorrect: false,
          feedback: 'Hash-per-chunk mostly contains this — and it still argues about DOWNLOAD, which was the weaker half.',
        },
        {
          id: 'c',
          label:
            'Bytes cost twice: after download, every byte is parsed, compiled and executed on the MAIN THREAD — on a mid-range phone that 500KB is hundreds of milliseconds of frozen UI, and fibre does not ship a faster CPU. Download is the cheap half.',
          isCorrect: true,
          feedback:
            'The second price is the one that regressed the metrics: parse/execute blocks interaction, scales with the user’s worst device, and no network upgrade touches it.',
        },
        {
          id: 'd',
          label: 'Mobile data plans — fibre at the office ignores the commute, where downloads genuinely hurt.',
          isCorrect: false,
          feedback:
            'A fair point about networks — but it concedes the frame. The argument fails even ON fibre, because of the CPU price.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What happens to JavaScript AFTER it downloads?' },
        { level: 2, title: 'Concept', content: 'Download cost scales with network; execute cost scales with the user’s CPU.' },
        { level: 3, title: 'Specific clue', content: 'Which device in your user base runs the parse — and how fast is it?' },
        { level: 4, title: 'Guided solution', content: 'Pick the parse/execute-on-main-thread answer.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Second price paid' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: '“Fibre users” won the argument — and the interaction metrics on mid-range Androids fell off a cliff.',
        },
      ],
      helpLinks: [{ topicId: 'perf.bundle-size', label: 'Bundle size' }],
      successFeedback: 'Network is one bill; the main thread is the other — and only one of them upgrades with fibre.',
      failureFeedback: 'Grant the 40ms download. Where do the OTHER hundreds of milliseconds come from?',
    },
  ],
  reflectionPrompt: 'Run the analyzer on our app today: what is the largest dependency — and can anyone name the feature that justifies it?',
  rewards: [{ type: 'xp', amount: 5, label: 'Bytes audited' }],
};
