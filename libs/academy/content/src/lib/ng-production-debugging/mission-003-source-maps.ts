import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — debugging production builds: source maps, minified stack
 * traces, and errors that only happen in prod.
 */
export const fnDbg003SourceMaps: MissionDefinition = {
  id: 'dbg-003-source-maps',
  campaignId: 'ng-production-debugging',
  title: 'The Stack Trace From Minified Code',
  summary:
    'Production errors arrive minified and unhelpful — source maps translate them back to your code, and some bugs exist ONLY in the production build.',
  difficulty: 'medium',
  learningObjectives: [
    'Use source maps to decode minified production stack traces',
    'Recognise bugs that appear only in production builds',
    'Reason about why dev and prod builds differ',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session three, the error that made no sense: "TypeError: n is not a function at a.js:1:48293". No file we recognised, no line we wrote — the minified production bundle. And it worked perfectly in dev. Two problems: reading a minified trace, and a bug that ONLY exists in prod.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Minified traces are unreadable by design — but SOURCE MAPS reverse it: a .map file maps minified positions back to your original source, so the monitoring tool (or DevTools) shows "PriceService.calc, line 42" instead of "a.js:1:48293". And prod-only bugs are real: production builds minify, tree-shake, enable optimizations, strip dev-mode checks, and run with production config — so a bug hidden by dev-mode leniency (or caused by an over-aggressive optimization, or a config difference) surfaces only there. Reproduce against a PRODUCTION build.',
    },
  ],
  contextArtefacts: [
    {
      id: 'sourcemaps-and-prod',
      type: 'code',
      title: 'Source maps + why prod differs',
      language: 'text',
      content:
        'MINIFIED:  "n is not a function at a.js:1:48293"  ← unreadable\n+ SOURCEMAP → "PriceService.calc (price.service.ts:42)" ← your code\n  (upload maps to your error monitor; keep them private, not public)\n\nPROD-ONLY causes: minification/mangling, tree-shaking removing "unused"\n  code that WAS used reflectively, prod-mode checks stripped, optimizer\n  assumptions, different environment config, real CDN/caching\n→ to reproduce a prod bug, build and run the PRODUCTION bundle locally',
    },
  ],
  challenges: [
    {
      id: 'dbg-003-c1',
      type: 'multiple-choice',
      title: 'Decoding a.js:1:48293',
      difficulty: 'medium',
      tags: ['incident-response'],
      storyContext:
        'The error monitor shows hundreds of "TypeError: n is not a function at a.js:1:48293" from real users. The team cannot tell what code it is.',
      prompt: 'What is the right way to make this trace actionable?',
      options: [
        {
          id: 'a',
          label:
            'Source maps: your build already produces .map files that translate minified positions back to original source. Upload them to the error monitor (privately — do not serve them publicly, or you hand attackers your source) so it de-minifies every trace to "PriceService.calc (price.service.ts:42)". Now the hundreds of errors point at a real function and line, and you can reproduce and fix.',
          isCorrect: true,
          feedback:
            'The .map file is the decoder ring. Uploaded to the monitor (kept private), it makes production traces as readable as dev ones — turning "a.js:1:48293" into an address in your own code.',
        },
        {
          id: 'b',
          label: 'Disable minification in the production build so future errors show readable names.',
          isCorrect: false,
          feedback:
            'Shipping unminified production code bloats the bundle for every user (the perf campaign’s double-price) to solve a problem source maps solve without any runtime cost. Keep minifying; upload maps.',
        },
        {
          id: 'c',
          label: 'Search the minified bundle for offset 48293 by hand to find the function.',
          isCorrect: false,
          feedback:
            'Manually decoding a byte offset in minified output is exactly the toil source maps automate — and it must be redone for every new error and every deploy. Use the map.',
        },
        {
          id: 'd',
          label: 'Serve the source maps publicly alongside the bundle so browsers de-minify automatically for everyone.',
          isCorrect: false,
          feedback:
            'Public source maps hand your original source (and any comments/logic) to anyone — a real disclosure risk (the security campaign’s "nothing in the bundle is secret", made worse). Upload maps PRIVATELY to your monitor instead.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What file translates minified positions back to your source?' },
        { level: 2, title: 'Concept', content: 'Upload source maps to the monitor — privately — to de-minify traces.' },
        { level: 3, title: 'Specific clue', content: 'Why should the maps NOT be served publicly?' },
        { level: 4, title: 'Guided solution', content: 'Private source-map upload to the error monitor.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Trace decoded' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Minification was disabled to read traces — the bundle ballooned and the LCP regressed for every user.',
        },
      ],
      helpLinks: [{ topicId: 'debug.source-maps', label: 'Source maps & prod builds' }],
      successFeedback: 'Maps uploaded, traces readable, source private — production errors point home.',
      failureFeedback: 'You need readable traces WITHOUT shipping readable (or public) code. Which option threads that needle?',
    },
    {
      id: 'dbg-003-c2',
      type: 'multiple-choice',
      title: 'Works in Dev, Breaks in Prod',
      difficulty: 'medium',
      tags: ['incident-response', 'angular'],
      storyContext:
        'A feature works flawlessly with `ng serve` but throws in the deployed prod build. A dev insists "the code is identical, so it must be a server/deployment problem, not our code".',
      prompt: 'Why can identical source behave differently in prod, and how do you debug it?',
      options: [
        {
          id: 'a',
          label:
            'The SOURCE is identical but the BUILD is not: production minifies and mangles names, tree-shakes "unused" exports (which breaks code referenced only reflectively, e.g. by string name), strips Angular’s dev-mode checks, applies optimizer assumptions, and runs with prod config/CDN. Any of these can surface a latent bug. Debug it by reproducing against a PRODUCTION build locally (build prod + serve the output, or use source maps on the deployed error) — not by assuming the server is at fault.',
          isCorrect: true,
          feedback:
            'Dev and prod are different programs generated from the same source. "Works in dev" narrows nothing until you reproduce on a prod build — the difference IS the clue (often a name mangled by minification, or a dev-only check that was masking the bug).',
        },
        {
          id: 'b',
          label: 'It cannot — identical source produces identical behaviour; the deployment or server config is definitely the cause.',
          isCorrect: false,
          feedback:
            'Demonstrably false: minification, tree-shaking, and stripped dev-mode checks make the prod PROGRAM different from the dev one. Blaming the server without reproducing on a prod build skips the actual investigation.',
        },
        {
          id: 'c',
          label: 'The issue is always tree-shaking removing code — mark everything as used with sideEffects: false to prevent it.',
          isCorrect: false,
          feedback:
            'Tree-shaking is ONE possible cause, not "always" — and sideEffects: false tells the bundler it CAN shake more, the opposite of preventing removal. Reproduce first to find which prod difference actually bites.',
        },
        {
          id: 'd',
          label: 'Add try/catch around the failing feature so the prod error is swallowed and the app keeps working.',
          isCorrect: false,
          feedback:
            'Swallowing the error hides the symptom while the feature stays broken for users — and destroys the very stack trace you need. Reproduce and fix the cause, do not muffle it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Is the deployed PROGRAM really identical to the dev one?' },
        { level: 2, title: 'Concept', content: 'Prod builds minify/tree-shake/strip dev checks — reproduce on a prod build.' },
        { level: 3, title: 'Specific clue', content: 'What happens to code referenced only by a string name when minifier mangles names?' },
        { level: 4, title: 'Guided solution', content: 'Pick the build-differs answer; reproduce against prod.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Prod build reproduced' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The team chased a "server problem" for a day — the bug was tree-shaken code referenced reflectively, reproducible in one prod build.',
        },
      ],
      helpLinks: [{ topicId: 'debug.source-maps', label: 'Source maps & prod builds' }],
      successFeedback: 'Same source, different program — reproduced on a prod build, the difference became the clue.',
      failureFeedback: 'List what the production build DOES to your source that ng serve does not. Any of those can bite.',
    },
  ],
  reflectionPrompt: 'Do our production errors arrive de-minified via uploaded source maps — and when a bug is prod-only, do we reproduce on a prod build or guess?',
  rewards: [{ type: 'xp', amount: 10, label: 'Prod builds understood' }],
};
