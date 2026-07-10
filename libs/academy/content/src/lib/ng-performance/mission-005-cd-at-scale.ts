import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — change detection at scale: profiling CD cost, and
 * runOutsideAngular for high-frequency events that should not tick the app.
 */
export const fnPf005CdAtScale: MissionDefinition = {
  id: 'pf-005-cd-at-scale',
  campaignId: 'ng-performance',
  title: 'The Tick You Pay For',
  summary:
    'At scale, change detection itself becomes the hotspot — profile who gets checked, and keep high-frequency events from ticking the whole app.',
  difficulty: 'medium',
  learningObjectives: [
    'Recognise change-detection cost in a profile',
    'Run high-frequency listeners outside the zone deliberately',
    'Connect the signals migration to CD cost at scale',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session five reopened the signals campaign with a profiler attached. The dashboard: a mousemove-driven chart crosshair. Every pixel of mouse travel ticked change detection for the ENTIRE app — four hundred components checked per mousemove.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The zone patches mousemove like everything else — it cannot know your handler only moves a crosshair. Three tools, in order of preference: signals + OnPush so ticks CHECK almost nobody; runOutsideAngular for firehose events that should not tick at all (re-entering only when real state changes); and the endgame — zoneless — where nothing ticks without a signal saying so.',
    },
  ],
  contextArtefacts: [
    {
      id: 'outside-zone',
      type: 'code',
      title: 'The crosshair, taken off the app’s bill',
      language: 'ts',
      content:
        "constructor() {\n  const zone = inject(NgZone);\n  zone.runOutsideAngular(() => {\n    fromEvent<MouseEvent>(this.canvas, 'mousemove')\n      .pipe(takeUntilDestroyed())\n      .subscribe((e) => this.drawCrosshair(e)); // canvas draw — no app state\n  });\n}\n// selecting a point IS app state — re-enter deliberately:\n// zone.run(() => this.selection.set(point));",
    },
  ],
  challenges: [
    {
      id: 'pf-005-c1',
      type: 'multiple-choice',
      title: 'Four Hundred Checks per Pixel',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'The profile: mousemove → zone tick → 400 components checked, 60+ times a second. The crosshair handler itself takes 0.1ms; the ticks take 8ms.',
      prompt: 'What is the right treatment for the crosshair?',
      options: [
        {
          id: 'a',
          label:
            'Subscribe to mousemove inside runOutsideAngular and draw the crosshair directly (canvas/DOM) — no app state changes, so no tick is owed; re-enter the zone (or set a signal) only when the user actually selects a datapoint.',
          isCorrect: true,
          feedback:
            'The bill matched to the purchase: pure visual feedback pays for a draw call, not an app-wide tick. State changes re-enter deliberately — the boundary is explicit.',
        },
        {
          id: 'b',
          label: 'Throttle the mousemove to 10 events per second — fewer ticks, same architecture.',
          isCorrect: false,
          feedback:
            'A six-fold discount on the wrong bill — and a visibly laggy crosshair. Throttling is for when you need FEWER updates, not cheaper ones.',
        },
        {
          id: 'c',
          label: 'Mark the 400 components OnPush so the ticks check fewer of them.',
          isCorrect: false,
          feedback:
            'Right medicine, wrong disease order: OnPush shrinks each tick, but this handler owes NO tick — and the migration of 400 components should not be driven by a crosshair.',
        },
        {
          id: 'd',
          label: 'Move the chart into a web worker — mouse handling off the main thread ends the problem categorically.',
          isCorrect: false,
          feedback:
            'Workers cannot touch the DOM the crosshair draws on — the plumbing to bridge it back costs more than the ticks did.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does moving a crosshair change any APP state?' },
        { level: 2, title: 'Concept', content: 'No state change, no tick owed — runOutsideAngular is that statement in code.' },
        { level: 3, title: 'Specific clue', content: 'The handler is 0.1ms; the machinery is 8ms. Remove the machinery, keep the handler.' },
        { level: 4, title: 'Guided solution', content: 'Outside the zone, re-enter on selection.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Tick unbilled' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The crosshair kept ticking the app — dragging across the chart pinned a core at 100% on every laptop in ops.',
        },
      ],
      helpLinks: [
        { topicId: 'perf.rendering', label: 'Rendering performance' },
        { topicId: 'signals.cd-cycle', label: 'Change detection cycles' },
      ],
      successFeedback: 'Draw calls for drawings, ticks for state — each event pays exactly its own bill.',
      failureFeedback: 'Separate the handler’s cost from the machinery it triggers. Which one is 80× the other?',
    },
    {
      id: 'pf-005-c2',
      type: 'multiple-choice',
      title: 'Where the Migration Pays',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Post-fix debate: “we should migrate all 400 dashboard components to signals + OnPush this quarter.” The profile shows ticks are now rare (crosshair fixed) but each remaining tick still checks all 400.',
      prompt: 'What is the honest cost-benefit of the migration now?',
      options: [
        {
          id: 'a',
          label: 'Do it — every tick checking 400 components is unacceptable regardless of tick frequency.',
          isCorrect: false,
          feedback:
            '“Regardless of frequency” is how measurement dies: rare ticks × moderate cost may be nowhere near the top of the current profile.',
        },
        {
          id: 'b',
          label: 'Skip it permanently — with ticks rare, CD cost is solved and signals are churn without payoff.',
          isCorrect: false,
          feedback:
            'The dashboard grows and zoneless is the platform direction — “solved today” is not “never worth it”; it is “not the current bottleneck”.',
        },
        {
          id: 'c',
          label: 'Migrate only the 20 heaviest components — profiling per component finds where the check cost concentrates.',
          isCorrect: false,
          feedback:
            'Tempting, but per-component check cost is mostly UNIFORM overhead here — the win comes from precise marking (few components checked per change), which needs the data FLOW migrated, not the heaviest leaves.',
        },
        {
          id: 'd',
          label:
            'Measured verdict: not this quarter’s bottleneck (rare ticks make the 400-check cost background noise), but the RIGHT default for all new dashboard work and for components touched anyway — ratchet toward signals + OnPush so the eventual zoneless switch is a config change, not a rewrite. Re-profile when tick frequency rises.',
          isCorrect: true,
          feedback:
            'Rule one applied to your own favourite refactor: the profile ranks it, the ratchet advances it, and the endgame stays reachable without a big-bang quarter.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Apply mission 1 to this proposal: what does the CURRENT profile rank it?' },
        { level: 2, title: 'Concept', content: 'Ratchets beat big bangs: right default for new code, migrate what you touch.' },
        { level: 3, title: 'Specific clue', content: 'Rare ticks × 400 checks = how much of the profile, honestly?' },
        { level: 4, title: 'Guided solution', content: 'Pick the measured-ratchet answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Migration priced' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The big-bang quarter happened, half-finished — the dashboard froze mid-migration with two CD idioms fighting.',
        },
      ],
      helpLinks: [
        { topicId: 'perf.measure-first', label: 'Measure first' },
        { topicId: 'angular.change-detection', label: 'OnPush change detection' },
      ],
      successFeedback: 'Even the good refactor waits for its ranking — discipline is believing rule one about your own ideas.',
      failureFeedback: 'The crosshair fix changed the profile. Re-rank the migration against the NEW numbers.',
    },
  ],
  reflectionPrompt: 'What is our highest-frequency event listener — and does its handler change app state, or just pixels?',
  rewards: [{ type: 'xp', amount: 10, label: 'Ticks billed fairly' }],
};
