import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — the skill-up calculator rebuilt reactively: writable
 * signals for inputs, computed for results, effects only at the edge,
 * OnPush satisfied by signal reads.
 */
export const fnSig009BossCalculator: MissionDefinition = {
  id: 'sig-009-boss-calculator',
  campaignId: 'ng-signals-cd',
  title: 'Boss: The Reactive Calculator',
  summary:
    'The calculator that carried the FP sessions returns for its final form — signals in, computed through, effects at the edge, OnPush throughout.',
  difficulty: 'boss',
  learningObjectives: [
    'Partition state into writable signals, computed derivations and edge effects',
    'Review a reactive component against the whole campaign',
    'Sign off a component architecture that stays correct under OnPush',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The finale had to be the calculator — it taught pure functions, then higher-order functions, and tonight it teaches reactivity. Rebuild it so every lesson from this block is visible in the code.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The sheet: x, y and op are user-owned inputs; result must NEVER drift from them; the last ten calculations persist to localStorage; the component is OnPush and repaints precisely. Nothing on that list needs a zone.',
    },
  ],
  contextArtefacts: [
    {
      id: 'calculator-sheet',
      type: 'code',
      title: 'The calculator requirements sheet',
      language: 'text',
      content:
        '1. x, y, op: user-owned inputs — settable from the keypad\n2. result: derived from x/y/op — can never drift, never be set by hand\n3. history: last 10 calculations, persisted to localStorage\n4. OnPush; view repaints exactly when its state changes\n5. pure calculator core from the FP sessions stays pure',
    },
  ],
  challenges: [
    {
      id: 'sig-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Partition the State',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'Requirements 1–3 name three kinds of state. Choose the partition before writing a line.',
      prompt: 'Which state design matches the sheet?',
      options: [
        {
          id: 'a',
          label:
            'Signals for everything: x, y, op, result and history all writable, with the keypad handler setting result and pushing history after each keypress.',
          isCorrect: false,
          feedback:
            'A writable result is requirement 2 violated by construction — the handler becomes the one place allowed to drift, and eventually it will.',
        },
        {
          id: 'b',
          label: 'Model x, y and op as Subjects and combineLatest them into result — the RxJS campaign already solved this shape.',
          isCorrect: false,
          feedback:
            'It works, but every value here is current state, not an event over time — the session rule says signals hold what things ARE. The stream ceremony buys nothing.',
        },
        {
          id: 'c',
          label:
            'x, y, op as writable signals; result = computed(() => calc(this.x(), this.y(), this.op())) over the pure core; history persisted by an effect that reads the inputs and writes localStorage.',
          isCorrect: true,
          feedback:
            'The campaign in one component: user-owned facts writable, derivations computed off the pure core, the world reached only through an effect.',
        },
        {
          id: 'd',
          label:
            'x, y, op writable; result kept current by effect(() => this.result.set(calc(this.x(), this.y(), this.op()))) so the write is explicit and debuggable.',
          isCorrect: false,
          feedback:
            'Mission 3’s trap at boss level: derive-by-writing makes result a late, writable second truth. computed is the requirement-2 guarantee; an effect is a promise.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Classify each requirement: owned fact, derivation, or edge?' },
        { level: 2, title: 'Concept', content: 'Owned facts → writable signals. Never-drifts → computed. Touches-the-world → effect.' },
        { level: 3, title: 'Specific clue', content: '“Can never be set by hand” rules out every design where result is writable.' },
        { level: 4, title: 'Guided solution', content: 'Signals for x/y/op, computed result over the pure core, localStorage effect.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'State partitioned' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The writable-result design shipped, and “result drifted after rapid keypresses” opened within the week.',
        },
      ],
      helpLinks: [
        { topicId: 'signals.computed', label: 'Computed signals' },
        { topicId: 'signals.effects', label: 'Effects' },
      ],
      successFeedback: 'Facts, derivations, edges — the partition IS the architecture. Stage 1 clear.',
      failureFeedback: 'Read requirement 2 as a type constraint: which designs make drift impossible rather than unlikely?',
    },
    {
      id: 'sig-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Build',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'A teammate’s implementation of the partition. Hold it against all eight sessions.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'calculator-impl',
          type: 'code',
          title: 'calculator.component.ts (proposed)',
          language: 'ts',
          content:
            "@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  template: `\n    <output>{{ display() }}</output>\n    <small>≈ {{ approximate(x(), y(), op()) }}</small>\n  `,\n})\nexport class CalculatorComponent {\n  readonly x = signal(0);\n  readonly y = signal(0);\n  readonly op = signal<Op>('add');\n  readonly result = signal(0);\n  readonly display = computed(() => formatResult(this.result()));\n\n  constructor() {\n    effect(() => this.result.set(calc(this.x(), this.y(), this.op())));\n  }\n}",
        },
      ],
      findings: [
        {
          id: 'effect-derives-result',
          label:
            'result is a writable signal kept in sync by an effect — a derived value the sheet says can never drift, implemented as the thing that drifts',
          isCorrect: true,
          feedback:
            'Requirement 2 wants computed’s guarantee: derived, read-only, never late. The effect version leaves result settable by anyone and stale between change and effect run.',
        },
        {
          id: 'display-computed',
          label: 'display wraps result in ANOTHER computed just for formatting — an unnecessary layer that should be inlined into the template',
          isCorrect: false,
          feedback:
            'Chained derivations are the system working as designed — cheap, memoised, and it keeps formatResult out of the per-render path. Inlining it into the template is the anti-pattern.',
        },
        {
          id: 'template-fn-call',
          label:
            'approximate(x(), y(), op()) is a plain function call in the template — re-evaluated on every check of this component instead of memoised as a computed',
          isCorrect: true,
          feedback:
            'Mission 5’s profiler trace, reborn: template calls run every cycle the component is checked. readonly approx = computed(() => approximate(…)) runs it only when inputs change.',
        },
        {
          id: 'onpush-strategy',
          label: 'OnPush is unsafe here — keypad clicks mutate signals from outside the template, which OnPush cannot see',
          isCorrect: false,
          feedback:
            'Signal writes are exactly what OnPush + signals sees best: every template read registered this component as consumer, so each set marks it precisely. OnPush is the right call.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check the constructor against mission 3 and the template against mission 5.' },
        { level: 2, title: 'Concept', content: 'Derived state → computed; template expressions → memoised reads only.' },
        { level: 3, title: 'Specific clue', content: 'The two computed/OnPush findings describe healthy code.' },
        { level: 4, title: 'Guided solution', content: 'Flag the effect-set result and the template function call.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Build reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The approximate() call gained a big-decimal library and the keypad started dropping presses.',
        },
      ],
      helpLinks: [
        { topicId: 'signals.effects', label: 'Effects' },
        { topicId: 'signals.cd-cycle', label: 'Change detection cycles' },
      ],
      successFeedback: 'Both regressions caught, both healthy patterns spared — review like that keeps standards alive.',
      failureFeedback: 'One finding flags a chained computed, one flags OnPush itself — the campaign endorsed both.',
    },
    {
      id: 'sig-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the Component',
      difficulty: 'boss',
      tags: ['angular'],
      storyContext: 'Two rebuilds survived review. The sheet — all five lines — decides which one ships.',
      prompt: 'Which calculator meets the sheet?',
      options: [
        {
          id: 'a',
          label:
            'Default change detection; x, y, op as class properties set by the keypad; template binds {{ calc(x, y, op) }} directly “so it is always fresh”; history pushed onto an array property inside the keypad handler; localStorage written inline in the same handler.',
          isCorrect: false,
          feedback:
            'Three sheet lines down: requirement 4 (default CD, nothing precise about it), the calc-per-cycle template call, and history mutated in place — plus persistence tangled into the input handler instead of the edge.',
        },
        {
          id: 'b',
          label:
            'OnPush; x, y, op writable signals; result = computed over the pure core; history = signal<Calc[]>([]) appended immutably via update(h => [...h, entry].slice(-10)); one effect persists history() to localStorage.',
          isCorrect: true,
          feedback:
            'Every sheet line, one mechanism each: writable facts, computed derivation, immutable ten-deep history, a single edge effect, and OnPush satisfied by consumer registration. Signed.',
        },
        {
          id: 'c',
          label:
            'OnPush; x, y, op writable signals; result = computed over the pure core; history appended by effect(() => this.history.update(h => [...h, `${this.x()}${this.op()}${this.y()}=${this.result()}`])) with localStorage written in the same effect.',
          isCorrect: false,
          feedback:
            'Close — but the history effect reads x, y AND op, so setting x logs a half-finished calculation before y is even typed; and the effect both derives app state and persists it, two jobs in one lambda. Appending belongs to the equals-press handler; the effect should only persist.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Score each candidate line-by-line against the five sheet items.' },
        { level: 2, title: 'Concept', content: 'Owned facts writable, derivations computed, ONE job per effect — and history is an owned fact, appended by the user’s action.' },
        { level: 3, title: 'Specific clue', content: 'One candidate logs half-typed calculations; one re-runs calc every cycle.' },
        { level: 4, title: 'Guided solution', content: 'Sign the computed-result, immutable-history, persist-only-effect candidate.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Calculator signed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The signed-off calculator logged phantom half-calculations, and the history feature was quietly disabled.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The capstone of eight sessions shipped with a freshman bug — the block ended on an apology.',
        },
      ],
      helpLinks: [
        { topicId: 'signals.rxjs-interop', label: 'Signals ↔ RxJS interop' },
        { topicId: 'signals.equality', label: 'Signal equality' },
        { topicId: 'angular.change-detection', label: 'OnPush change detection' },
      ],
      successFeedback:
        'Inputs owned, result derived, history immutable, persistence at the edge, repaints precise — the calculator’s final form. Campaign complete.',
      failureFeedback:
        'Walk the sheet: which candidate can log a calculation the user never finished? Which one re-runs calc on every cycle?',
    },
  ],
  reflectionPrompt: 'Take our most complex component: which of its values are owned facts, which should be computed, and which effect is doing two jobs?',
  rewards: [{ type: 'xp', amount: 25, label: 'Calculator rebuilt' }],
};
