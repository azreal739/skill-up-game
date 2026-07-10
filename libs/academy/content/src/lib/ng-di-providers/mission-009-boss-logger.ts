import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — the environment-aware logging stack: tokens for
 * config, factories for environment forks, aliases for migration, and a
 * test that proves the wiring without touching production code.
 */
export const fnDi009BossLogger: MissionDefinition = {
  id: 'di-009-boss-logger',
  campaignId: 'ng-di-providers',
  title: 'Boss: The Logging Stack',
  summary:
    'Design the team’s logging stack entirely in providers — environment forks, typed config, a legacy alias, and tests that prove it.',
  difficulty: 'boss',
  learningObjectives: [
    'Assemble tokens, factories and aliases into one provider design',
    'Review provider wiring against the whole block',
    'Sign off DI architecture that tests can take apart',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The block finale is a real ticket: replace our three ad-hoc loggers with one stack. Console in dev, batched HTTP to the log service in prod, the old LegacyLogger API kept alive for un-migrated code — and specs that prove each piece without network access.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The sheet is DI end to end: one Logger token everyone asks for; the environment decides what answers; config arrives typed; the legacy name aliases the new instance; and every decision lives in providers — no class knows which environment it is in.',
    },
  ],
  contextArtefacts: [
    {
      id: 'logger-sheet',
      type: 'code',
      title: 'The logging stack requirements sheet',
      language: 'text',
      content:
        '1. one Logger abstraction — consumers inject it, never a concrete class\n2. dev → ConsoleLogger; prod → HttpBatchLogger (decided at wiring, not in classes)\n3. batch size / endpoint arrive as typed config, defaultable in specs\n4. LegacyLogger keeps working, sharing the SAME instance (one buffer!)\n5. specs prove routing + batching with zero real HTTP',
    },
  ],
  challenges: [
    {
      id: 'di-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Wire the Stack',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'Requirements 1–4 in one providers array. Choose the wiring.',
      prompt: 'Which provider set matches the sheet?',
      options: [
        {
          id: 'a',
          label:
            'Logger as an abstract class token; { provide: Logger, useFactory: (env) => env.isProd ? new HttpBatchLogger(inject(LOG_CONFIG), inject(HttpClient)) : new ConsoleLogger(), deps: [EnvService] }; LOG_CONFIG as InjectionToken<LogConfig> with a factory default; { provide: LegacyLogger, useExisting: Logger }.',
          isCorrect: true,
          feedback:
            'Every sheet line has exactly one mechanism: abstract token, environment factory, typed defaultable config, alias for the migration. Nothing knows more than it must.',
        },
        {
          id: 'b',
          label:
            'HttpBatchLogger as providedIn: "root" with an isProd check inside log() that falls back to console.log; LegacyLogger extends HttpBatchLogger for compatibility.',
          isCorrect: false,
          feedback:
            'Requirement 2 violated twice: the CLASS decides the environment, and extends mints a second instance — two buffers, requirement 4 broken with it.',
        },
        {
          id: 'c',
          label:
            'Both loggers providedIn: "root"; consumers inject EnvService and pick which logger to call at each call site.',
          isCorrect: false,
          feedback:
            'Now EVERY consumer owns the wiring decision — the exact knowledge the block spent seven sessions relocating into providers.',
        },
        {
          id: 'd',
          label:
            "{ provide: 'logger', useClass: ConsoleLogger } in dev builds and { provide: 'logger', useClass: HttpBatchLogger } in prod builds, consumers injecting the 'logger' string.",
          isCorrect: false,
          feedback:
            'String tokens collide and carry no type (mission 5), useClass cannot receive the typed config, and nothing here aliases LegacyLogger.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Map each sheet line to one mechanism from the block before comparing options.' },
        { level: 2, title: 'Concept', content: 'Abstraction → token; environment fork → factory; config → InjectionToken; same-instance → useExisting.' },
        { level: 3, title: 'Specific clue', content: '“One buffer” kills every option that constructs twice.' },
        { level: 4, title: 'Guided solution', content: 'Token + factory + typed config + alias — the first full set.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Stack wired' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'Environment checks were sprinkled through consumers — the third environment (staging) required a 40-file PR.',
        },
      ],
      helpLinks: [
        { topicId: 'di.provider-recipes', label: 'Provider recipes' },
        { topicId: 'di.injection-token', label: 'InjectionToken' },
      ],
      successFeedback: 'Four requirements, four mechanisms, zero leaked knowledge — stage 1 clear.',
      failureFeedback: 'Score each option against line 2 AND line 4 — most fail one of the two.',
    },
    {
      id: 'di-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Wiring',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'A teammate implemented the stack. Review the providers file against the sheet.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'logger-providers',
          type: 'code',
          title: 'logging.providers.ts (proposed)',
          language: 'ts',
          content:
            "export const LOG_CONFIG = new InjectionToken<LogConfig>('log.config', {\n  factory: () => ({ endpoint: '/logs', batchSize: 20 }),\n});\n\nexport const loggingProviders = [\n  {\n    provide: Logger,\n    useFactory: () => {\n      const env = inject(EnvService);\n      return env.isProd\n        ? new HttpBatchLogger(inject(HttpClient), inject(LOG_CONFIG))\n        : new ConsoleLogger();\n    },\n  },\n  { provide: LegacyLogger, useClass: HttpBatchLogger },\n  { provide: ErrorHandler, useExisting: Logger },\n];",
        },
      ],
      findings: [
        {
          id: 'legacy-useclass',
          label:
            'LegacyLogger is wired with useClass: HttpBatchLogger — a SECOND logger instance with its own batch buffer, and in dev it is not even the same kind as Logger; the sheet demands useExisting: Logger',
          isCorrect: true,
          feedback:
            'The one-buffer requirement dies here: legacy callers batch into a buffer nobody flushes on the same schedule — and useClass also needs deps HttpBatchLogger cannot resolve positionally here.',
        },
        {
          id: 'factory-inject-calls',
          label: 'The factory calls inject() inside its body instead of declaring deps — inject is illegal inside useFactory functions',
          isCorrect: false,
          feedback:
            'Provider factories RUN in an injection context — inject() inside them is fully supported and often clearer than positional deps. This line is fine.',
        },
        {
          id: 'errorhandler-alias',
          label:
            'ErrorHandler aliased to Logger hands Angular an object without the handleError(error) contract — the first uncaught error calls a method that does not exist, killing error reporting exactly when it is needed',
          isCorrect: true,
          feedback:
            'useExisting only redirects tokens; it cannot make a Logger satisfy ErrorHandler’s interface. Error handling needs an adapter class that injects Logger and implements handleError.',
        },
        {
          id: 'config-default',
          label: 'LOG_CONFIG’s factory default means production can silently run on the default endpoint if the real config provider is forgotten',
          isCorrect: false,
          feedback:
            'The default is requirement 3 working as designed — specs and demos run with zero setup, and the app’s explicit provider overrides it. Making it throw instead would break sheet line 3.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check every provide: line for WHAT actually arrives when that token is asked.' },
        { level: 2, title: 'Concept', content: 'useExisting redirects, useClass constructs — and interfaces must still match.' },
        { level: 3, title: 'Specific clue', content: 'The factory and the token default are the healthy lines.' },
        { level: 4, title: 'Guided solution', content: 'Flag the useClass legacy alias and the ErrorHandler redirect.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Wiring reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The first production error hit the missing handleError — the error about errors erased the original stack trace.',
        },
      ],
      helpLinks: [
        { topicId: 'di.provider-recipes', label: 'Provider recipes' },
        { topicId: 'di.injector-tree', label: 'Injector hierarchy' },
      ],
      successFeedback: 'Instance counts checked, contracts checked — wiring review at block standard.',
      failureFeedback: 'For each provider ask two questions: how many instances, and does the arriving object honour the token’s contract?',
    },
    {
      id: 'di-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the Spec',
      difficulty: 'boss',
      tags: ['angular', 'testing'],
      storyContext: 'Requirement 5: prove prod routes to the batch logger and batching flushes at the configured size — zero real HTTP. Two specs remain.',
      prompt: 'Which spec meets the sheet?',
      options: [
        {
          id: 'a',
          label:
            'TestBed with the real loggingProviders and real HttpClient; spyOn(window, "fetch") to intercept the batch flush and assert on the intercepted payload.',
          isCorrect: false,
          feedback:
            'Patching fetch is asserting against transport internals — it breaks the moment HttpClient changes transport, and “zero real HTTP” achieved by interception is one missed spy from a live request.',
        },
        {
          id: 'b',
          label:
            'Instantiate new HttpBatchLogger(fakeHttp, config) directly in the spec — no TestBed — and call log() until the batch flushes; separately trust the factory because it is “too simple to break”.',
          isCorrect: false,
          feedback:
            'Half the sheet untested: requirement 5 says prove the ROUTING, and the factory holding the env fork is exactly the code that broke twice during the block. Too-simple-to-break is how it broke.',
        },
        {
          id: 'c',
          label:
            'TestBed providing loggingProviders plus { provide: EnvService, useValue: { isProd: true } }, { provide: HttpClient, useValue: httpSpy } and { provide: LOG_CONFIG, useValue: { batchSize: 2, endpoint: "/t" } } — assert inject(Logger) instanceof HttpBatchLogger, then two log() calls trigger exactly one httpSpy.post to /t.',
          isCorrect: true,
          feedback:
            'The whole block in one spec: the REAL factory runs against a faked environment, config arrives through its token, and the spy proves the batch contract — no transport patched, no network possible.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Requirement 5 names TWO proofs: routing AND batching. Which specs deliver both?' },
        { level: 2, title: 'Concept', content: 'Test the real wiring by faking its INPUTS (env, http, config) — never its transport.' },
        { level: 3, title: 'Specific clue', content: 'batchSize: 2 in the spec config makes the batching assertion cheap — tokens make tests configurable.' },
        { level: 4, title: 'Guided solution', content: 'Sign the real-providers, faked-env-http-config spec.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Stack signed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The untested factory shipped inverted — production logged to the console, and a week of incidents left no trail.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The DI block’s own capstone went out unproven — “do as we say” landed better than “do as we do”.',
        },
      ],
      helpLinks: [
        { topicId: 'di.testing', label: 'Overriding providers in tests' },
        { topicId: 'di.provider-recipes', label: 'Provider recipes' },
      ],
      successFeedback:
        'One token, environment-decided, typed config, aliased legacy, proven by spec — the logging stack ships. Campaign complete.',
      failureFeedback:
        'Hold each spec against line 5: does it run the real factory? Does it prove the batch size? Does it patch transport to do it?',
    },
  ],
  reflectionPrompt: 'Which wiring decision in our app has no spec — and what would faking its inputs (not its transport) look like?',
  rewards: [{ type: 'xp', amount: 25, label: 'Stack shipped' }],
};
