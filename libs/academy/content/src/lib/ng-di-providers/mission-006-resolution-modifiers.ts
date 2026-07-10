import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — resolution modifiers and NullInjectorError: optional,
 * self, skipSelf, host — steering the walk up the tree, and reading the
 * error when the walk finds nothing.
 */
export const fnDi006ResolutionModifiers: MissionDefinition = {
  id: 'di-006-resolution-modifiers',
  campaignId: 'ng-di-providers',
  title: 'Steering the Walk',
  summary:
    'inject() takes options — optional, self, skipSelf — that steer the tree walk; NullInjectorError is the walk reporting an empty-handed climb.',
  difficulty: 'medium',
  learningObjectives: [
    'Read a NullInjectorError as a failed tree walk',
    'Use optional, self and skipSelf to steer resolution',
    'Review DI wiring for modifier misuse',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session six was error-driven: we projected a real NullInjectorError from our logs — "No provider for ThemeService!" — and traced the walk it describes, injector by injector, until the message stopped being scary.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Then the steering wheel: inject(T, { optional: true }) returns null instead of throwing. { self: true } checks only your own injector. { skipSelf: true } starts the walk at your parent — how a nested form group finds its PARENT group instead of itself. Modifiers are rare; when you need one, you really need it.',
    },
  ],
  contextArtefacts: [
    {
      id: 'steering',
      type: 'code',
      title: 'The steering options',
      language: 'ts',
      content:
        "// null instead of NullInjectorError when absent\nconst tracing = inject(TracingService, { optional: true });\n\n// only THIS component's injector — no climbing\nconst local = inject(TabState, { self: true, optional: true });\n\n// start the climb at the parent — find the OUTER group\nconst parent = inject(FormGroupDirective, { skipSelf: true });",
    },
  ],
  challenges: [
    {
      id: 'di-006-c1',
      type: 'multiple-choice',
      title: 'Read the Error',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'The projected error: NullInjectorError: No provider for ThemeService! — thrown from a component deep inside a lazy-loaded admin route.',
      prompt: 'What does this error literally tell you?',
      options: [
        {
          id: 'a',
          label:
            'The resolution walk climbed from the component through every parent injector to the root and platform injectors, and NO level had a recipe for ThemeService — the token is unregistered everywhere on that path.',
          isCorrect: true,
          feedback:
            'The error is a complete negative search report. The fix is never “try/catch” — it is registering a provider somewhere on that path (or asking optionally if absence is legitimate).',
        },
        {
          id: 'b',
          label: 'ThemeService exists but was constructed too late — the component asked before the lazy route finished loading.',
          isCorrect: false,
          feedback:
            'Resolution is synchronous within a loaded route — there is no “too early”. The walk ran to completion and found no recipe at all.',
        },
        {
          id: 'c',
          label: 'ThemeService’s own constructor threw, and the injector reports it as a missing provider.',
          isCorrect: false,
          feedback: 'A throwing constructor surfaces as ITS error with a stack trace — NullInjector means construction never started.',
        },
        {
          id: 'd',
          label: 'The component asked with { self: true } and ThemeService lives higher up the tree.',
          isCorrect: false,
          feedback:
            'A self-limited miss reports from the component’s injector — NullInjector is the TOP of the climb, meaning the full walk happened.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'NullInjector is a PLACE — where in the tree does it sit?' },
        { level: 2, title: 'Concept', content: 'It is the empty injector above root: reaching it means every level said no.' },
        { level: 3, title: 'Specific clue', content: 'The error names a completed search, not a timing or construction failure.' },
        { level: 4, title: 'Guided solution', content: 'Pick the climbed-everything-found-nothing reading.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Error read' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The error was wrapped in try/catch “for robustness” — hiding a wiring hole behind a silent theme fallback.',
        },
      ],
      helpLinks: [
        { topicId: 'di.injector-tree', label: 'Injector hierarchy' },
        { topicId: 'di.injection-context', label: 'Injection context' },
      ],
      successFeedback: 'A NullInjectorError is a map of where recipes are NOT — you can now read the map.',
      failureFeedback: 'Whose injector is the NullInjector? Answer that and the message rewrites itself.',
    },
    {
      id: 'di-006-c2',
      type: 'code-review',
      title: 'Review the Steering',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'A teammate wires an analytics wrapper directive and asks for a review of the DI decisions.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'track-directive',
          type: 'code',
          title: 'track-clicks.directive.ts (proposed)',
          language: 'ts',
          content:
            "@Directive({ selector: '[trackClicks]' })\nexport class TrackClicksDirective {\n  // experiment service is only provided on some routes\n  private experiments = inject(ExperimentService);\n\n  // find the surrounding form — this directive sits on controls INSIDE it\n  private form = inject(FormGroupDirective, { self: true });\n\n  // theme affects event metadata\n  private theme = inject(ThemeService, { optional: true }) ?? DEFAULT_THEME;\n\n  private http = inject(HttpClient);\n}",
        },
      ],
      findings: [
        {
          id: 'experiments-required',
          label:
            'ExperimentService is described as “only provided on some routes” but injected as required — every route without it now throws NullInjectorError the moment the directive attaches',
          isCorrect: true,
          feedback:
            'A sometimes-provided dependency is the { optional: true } case by definition — the comment documents the crash instead of preventing it.',
        },
        {
          id: 'theme-fallback',
          label: 'The optional ThemeService with a ?? DEFAULT_THEME fallback silently masks broken theme wiring',
          isCorrect: false,
          feedback:
            'This is optional injection used exactly as intended: absence is a legitimate state with a sane default. Requiring it would make every themeless host crash for metadata.',
        },
        {
          id: 'self-on-form',
          label:
            'inject(FormGroupDirective, { self: true }) checks only the directive’s own injector — but the form it needs sits on an ANCESTOR element, so this returns nothing useful; the walk must be allowed to climb (or skipSelf from a control)',
          isCorrect: true,
          feedback:
            'self stops the walk before it reaches the ancestor that actually has the directive — steering exactly opposite to the stated intent of “find the surrounding form”.',
        },
        {
          id: 'httpclient-plain',
          label: 'HttpClient should also be injected with { optional: true } — network access is never guaranteed',
          isCorrect: false,
          feedback:
            'provideHttpClient makes it a reliably-rooted dependency; optional-ing it would force null-handling on every request for a failure mode DI does not model. Required is right.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check each inject against its own comment — two contradict themselves.' },
        { level: 2, title: 'Concept', content: 'Sometimes-provided → optional. Lives-on-ancestor → the walk must climb.' },
        { level: 3, title: 'Specific clue', content: 'The theme line is the healthy use of optional here.' },
        { level: 4, title: 'Guided solution', content: 'Flag the required ExperimentService and the self-limited form lookup.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Steering reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The directive crashed every non-experiment route on attach — an analytics helper took down checkout.',
        },
      ],
      helpLinks: [{ topicId: 'di.injector-tree', label: 'Injector hierarchy' }],
      successFeedback: 'Modifiers checked against intent, not vibes — steering review done right.',
      failureFeedback: 'Read each comment, then the code under it. Which two lines do the opposite of their comment?',
    },
  ],
  reflectionPrompt: 'Find the last NullInjectorError in our logs: what path did the walk take, and where should the recipe have been?',
  rewards: [{ type: 'xp', amount: 10, label: 'Walk steered' }],
};
