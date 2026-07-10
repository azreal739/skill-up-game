import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — memory leaks: subscriptions, timers, detached DOM and the
 * heap snapshot workflow that finds them.
 */
export const fnPf006MemoryLeaks: MissionDefinition = {
  id: 'pf-006-memory-leaks',
  campaignId: 'ng-performance',
  title: 'The App That Remembered Everything',
  summary:
    'Leaks are references that outlive their purpose — subscriptions, timers and captured components — found by comparing heap snapshots, not by reading code harder.',
  difficulty: 'medium',
  learningObjectives: [
    'Run the three-snapshot workflow to prove and locate a leak',
    'Name the usual suspects: subscriptions, timers, static caches, detached DOM',
    'Review lifecycle code for references that outlive components',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session six was forensic. The ops dashboard — the tab that stays open for eight-hour shifts — grew from 300MB to 2.1GB by end of shift. Nobody ever saw it happen; everyone saw the 3pm crash.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Leak hunting is a measurement discipline, not a reading discipline. The workflow: snapshot, do the suspected action ten times, snapshot again, and diff — leaked objects show up ten-fold. Then read the RETAINER chain: it names exactly who is holding the corpse. It is always a reference that outlived its purpose — a subscription, a timer, a static Map, a detached DOM node in a closure.',
    },
  ],
  contextArtefacts: [
    {
      id: 'snapshot-workflow',
      type: 'code',
      title: 'The three-snapshot workflow',
      language: 'text',
      content:
        '1. heap snapshot A (baseline)\n2. open + close the incident panel ×10\n3. heap snapshot B — diff against A\n   → 10 × IncidentPanelComponent   ← the corpse count matches the action count\n4. pick one → Retainers:\n   IncidentPanelComponent ← closure ← listener ← WebSocketService.listeners[]\n   (the socket service still holds the panel’s callback — there’s the leak)',
    },
  ],
  challenges: [
    {
      id: 'pf-006-c1',
      type: 'multiple-choice',
      title: 'Ten Corpses, One Retainer',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'The workflow ran: ten IncidentPanelComponent instances in the diff, retainer chain ending at WebSocketService.listeners[]. The panel subscribes in ngOnInit: this.socket.on("incident", (i) => this.show(i)).',
      prompt: 'Why do closed panels survive, and what is the fix?',
      options: [
        {
          id: 'a',
          label: 'Angular destroys components lazily — the ten instances would be collected on the next major GC anyway.',
          isCorrect: false,
          feedback:
            'GC ran during the snapshot — the panels survived it because they are REACHABLE: destruction removes them from the DOM, not from the listener array.',
        },
        {
          id: 'b',
          label:
            'The callback closure captures `this` — the whole component — and socket.on stores it in a service that outlives every panel. Destroyed panels stay reachable through the listeners array, along with everything THEY reference. Fix: deregister on destroy — takeUntilDestroyed on a stream wrapper, or socket.off in DestroyRef.onDestroy.',
          isCorrect: true,
          feedback:
            'The leak equation: long-lived holder + captured short-lived object = immortal short-lived object. Every subscription to a service-owned source needs a death plan.',
        },
        {
          id: 'c',
          label: 'The panels are cached by the router’s reuse strategy — configure the route to disable reuse.',
          isCorrect: false,
          feedback:
            'The retainer chain already names the holder, and it is not the router — reading the chain beats guessing at frameworks.',
        },
        {
          id: 'd',
          label: 'show(i) mutates component state from outside the zone, pinning the instances until a tick releases them.',
          isCorrect: false,
          feedback: 'Zones schedule work; they do not pin memory. Reachability is the only thing GC respects.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The retainer chain is the answer sheet — read it bottom-up.' },
        { level: 2, title: 'Concept', content: 'A closure captures this; a long-lived array holds the closure; GC sees reachable.' },
        { level: 3, title: 'Specific clue', content: 'Who removes the callback from listeners[] — and when did that ever run?' },
        { level: 4, title: 'Guided solution', content: 'Pick the captured-this + deregister-on-destroy answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Retainer read' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The 3pm crash stayed on schedule — ops learned to restart the tab at lunch, which became the documented fix.',
        },
      ],
      helpLinks: [{ topicId: 'perf.memory-leaks', label: 'Memory leaks' }],
      successFeedback: 'Corpse counted, retainer named, death plan installed — forensics over folklore.',
      failureFeedback: 'GC collects the UNREACHABLE. Trace one path that still reaches a closed panel.',
    },
    {
      id: 'pf-006-c2',
      type: 'code-review',
      title: 'Review the Lifecycles',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'The fix PR also touches two sibling components “while we are at it”. Review all the lifecycle code.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'lifecycle-code',
          type: 'code',
          title: 'dashboard components (proposed)',
          language: 'ts',
          content:
            "// clock-widget.component.ts\nexport class ClockWidgetComponent {\n  readonly now = signal(new Date());\n  constructor() {\n    setInterval(() => this.now.set(new Date()), 1000);\n  }\n}\n\n// incident-history.service.ts\n@Injectable({ providedIn: 'root' })\nexport class IncidentHistoryService {\n  private static readonly viewedIncidents = new Map<string, IncidentDetail>();\n  record(incident: IncidentDetail) {\n    IncidentHistoryService.viewedIncidents.set(incident.id, incident);\n  }\n}\n\n// status-feed.component.ts\nexport class StatusFeedComponent {\n  readonly statuses = toSignal(\n    inject(StatusApi).stream$.pipe(takeUntilDestroyed()),\n    { initialValue: [] as Status[] }\n  );\n}",
    },
      ],
      findings: [
        {
          id: 'interval-no-cleanup',
          label:
            'ClockWidgetComponent starts a setInterval and never clears it — every destroyed widget leaves an immortal timer whose closure pins the component (and its now signal) forever, ticking a corpse once a second',
          isCorrect: true,
          feedback:
            'Timers are subscriptions without the courtesy of an unsubscribe API in sight: capture the id and clearInterval in DestroyRef.onDestroy (the DI campaign’s composable cleanup), or model it as interval() + takeUntilDestroyed.',
        },
        {
          id: 'static-unbounded-map',
          label:
            'The static viewedIncidents Map grows for the life of the tab with no eviction — on eight-hour shifts every viewed incident’s full detail object accumulates: an unbounded cache is a leak with a business justification',
          isCorrect: true,
          feedback:
            'The dashboard’s 2.1GB had a co-author. Caches need bounds (LRU, max entries, TTL) — and static state is the longest-lived holder in the app, so it needs them most.',
        },
        {
          id: 'tud-in-tosignal',
          label: 'takeUntilDestroyed inside the toSignal pipe is redundant at best and a double-unsubscribe hazard at worst — toSignal already cleans up',
          isCorrect: false,
          feedback:
            'Redundant, yes — toSignal does manage its subscription — but harmless-redundant, not hazardous: completing an already-managed stream early is safe. Style note, not a defect; the two leaks are the defects.',
        },
        {
          id: 'signal-date-alloc',
          label: 'Allocating a new Date every second churns the GC — the clock should mutate a shared Date instance instead',
          isCorrect: false,
          feedback:
            'One small allocation per second is nanoscopic GC pressure — and a MUTATED Date in a signal is the equality trap (same reference, no notification). The allocation is correct.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each holder ask: what removes entries/timers/listeners, and when?' },
        { level: 2, title: 'Concept', content: 'Leaks = references without death plans; unbounded caches count.' },
        { level: 3, title: 'Specific clue', content: 'static is the longest lifetime in the app — audit what it accumulates.' },
        { level: 4, title: 'Guided solution', content: 'Flag the uncleared interval and the unbounded static Map.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Lifecycles reviewed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The unbounded cache shipped as “history feature” — the next leak hunt found it wearing a product name.',
        },
      ],
      helpLinks: [
        { topicId: 'perf.memory-leaks', label: 'Memory leaks' },
        { topicId: 'di.injection-context', label: 'Injection context' },
      ],
      successFeedback: 'Timers cleared, caches bounded, redundancy tolerated — review calibrated to actual harm.',
      failureFeedback: 'Two findings describe real accumulation; two describe style. Which objects grow without bound?',
    },
  ],
  reflectionPrompt: 'Which of our tabs stays open longest — and when did anyone last snapshot its heap at hour four?',
  rewards: [{ type: 'xp', amount: 10, label: 'Memory bounded' }],
};
