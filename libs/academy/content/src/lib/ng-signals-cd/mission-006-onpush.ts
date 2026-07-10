import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — OnPush (knowledge pack 03 + help topic: checks only on input
 * reference change, component events, async-pipe emissions; in-place mutation
 * is invisible to it).
 */
export const fnSig006OnPush: MissionDefinition = {
  id: 'sig-006-onpush',
  campaignId: 'ng-signals-cd',
  title: 'OnPush and the Frozen View',
  summary:
    'OnPush skips a component unless its inputs change reference, it fires an event, or the async pipe emits — mutation freezes it.',
  difficulty: 'medium',
  learningObjectives: [
    'List the exact conditions under which an OnPush component re-renders',
    'Diagnose the mutated-input frozen view',
    'Review an OnPush component for invisible-update hazards',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session six: we switched the product list to OnPush, the profiler went quiet, and QA filed “edited name doesn’t show until you click somewhere”. Both facts have the same cause.',
    },
    {
      speaker: 'Senior Dev',
      text: 'OnPush is a contract, not a checkbox: the component re-checks when an @Input arrives with a NEW REFERENCE, when an event fires inside it, or when the async pipe it uses emits. Mutate an object in place and you have kept the old reference — so you have promised Angular nothing changed.',
    },
  ],
  contextArtefacts: [
    {
      id: 'frozen-edit',
      type: 'code',
      title: 'The edit that never shows',
      language: 'ts',
      content:
        '// parent (list is OnPush)\nrename(user: User, name: string) {\n  user.name = name; // same object, same reference\n}\n\n// fix: replace, don’t mutate\nrename(user: User, name: string) {\n  this.users.update((list) =>\n    list.map((u) => (u.id === user.id ? { ...u, name } : u))\n  );\n}',
    },
  ],
  challenges: [
    {
      id: 'sig-006-c1',
      type: 'multiple-choice',
      title: 'Diagnose the Freeze',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'QA’s repro: rename a user, nothing happens; click anywhere inside the row, the new name appears.',
      prompt: 'Why does the OnPush row show the edit only after a click?',
      options: [
        {
          id: 'a',
          label: 'OnPush batches updates for a frame or two; the click merely flushes the queue early.',
          isCorrect: false,
          feedback:
            'There is no queue holding the change — without a new reference the update would never render, not late.',
        },
        {
          id: 'b',
          label: 'The row’s trackBy is missing, so Angular cannot match the edited user to its row.',
          isCorrect: false,
          feedback: 'trackBy tunes list re-use; this row was found fine. It was skipped because its input looked unchanged.',
        },
        {
          id: 'c',
          label:
            'user.name = name mutated the object, so the @Input reference never changed — OnPush skipped the row as unchanged. The click fired an event INSIDE the component, which is one of OnPush’s re-check triggers, revealing the stale mutation.',
          isCorrect: true,
          feedback:
            'The full mechanism, including why the click “fixes” it — the event trigger repaints, exposing what the mutation hid.',
        },
        {
          id: 'd',
          label: 'OnPush components only re-render on observable emissions, and this row subscribes to nothing.',
          isCorrect: false,
          feedback:
            'Async-pipe emissions are ONE trigger of three — input reference changes and component events are the others, and the fix uses the first.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Two mysteries — the freeze AND the click-fix. One answer must explain both.' },
        { level: 2, title: 'Concept', content: 'OnPush triggers: new input reference, component event, async-pipe emission.' },
        { level: 3, title: 'Specific clue', content: 'A click inside the component is on that trigger list.' },
        { level: 4, title: 'Guided solution', content: 'Pick mutation-kept-the-reference, click-was-the-event.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Freeze diagnosed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Edits kept “not saving” for users — the data was right, the view lied, and trust in the app fell.',
        },
      ],
      helpLinks: [
        { topicId: 'angular.change-detection', label: 'OnPush change detection' },
        { topicId: 'signals.equality', label: 'Signal equality' },
      ],
      successFeedback: 'Freeze and click-fix, one mechanism — OnPush holds no more mysteries in that trace.',
      failureFeedback: 'The click is the clue: which OnPush trigger does a click inside the row satisfy?',
    },
    {
      id: 'sig-006-c2',
      type: 'code-review',
      title: 'Review the OnPush Component',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'A teammate converts the activity widget to OnPush and asks for a session-standards review.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'activity-widget',
          type: 'code',
          title: 'activity-widget.component.ts (proposed)',
          language: 'ts',
          content:
            "@Component({\n  selector: 'app-activity-widget',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  template: `\n    <h3>{{ feed.title }}</h3>\n    <p>{{ secondsIdle }}s idle</p>\n    <li *ngFor=\"let e of events$ | async\">{{ e.label }}</li>\n  `,\n})\nexport class ActivityWidgetComponent implements OnInit {\n  @Input({ required: true }) feed!: Feed;\n  events$ = inject(ActivityService).events$;\n  secondsIdle = 0;\n\n  ngOnInit() {\n    setInterval(() => (this.secondsIdle += 1), 1000);\n    this.feed.title = this.feed.title.trim();\n  }\n}",
        },
      ],
      findings: [
        {
          id: 'timer-plain-property',
          label:
            'secondsIdle is bumped by setInterval as a plain property — under OnPush nothing marks the component, so the idle counter freezes at 0',
          isCorrect: true,
          feedback:
            'A timer tick is not an input change, a component event or an async-pipe emission — the property climbs while the view stays frozen. A signal (or interval + async pipe) makes the tick visible.',
        },
        {
          id: 'async-pipe-events',
          label: 'events$ | async is unsafe under OnPush — the subscription should be manual with markForCheck',
          isCorrect: false,
          feedback:
            'Backwards: the async pipe is the OnPush-native choice — it marks the component on every emission and unsubscribes itself. Manual subscribe + markForCheck recreates it by hand, worse.',
        },
        {
          id: 'mutates-input',
          label:
            'ngOnInit mutates the incoming @Input (feed.title = …trim()) — editing a parent-owned object in place, invisible to reference checks',
          isCorrect: true,
          feedback:
            'Two sins in one line: children do not edit parent state, and in-place mutation is exactly the change OnPush cannot see — here or in any OTHER OnPush component reading the same feed.',
        },
        {
          id: 'onpush-choice',
          label: 'Choosing OnPush for a widget this small is premature optimisation — default strategy is safer here',
          isCorrect: false,
          feedback:
            'OnPush is the session standard, not an optimisation to defer — it makes the update contract explicit. The bugs above are contract violations, not reasons to abandon the contract.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check every state change against the three OnPush triggers.' },
        { level: 2, title: 'Concept', content: 'Plain property writes and in-place mutations are invisible to OnPush.' },
        { level: 3, title: 'Specific clue', content: 'The async pipe line is the HEALTHY one. Two writes are not.' },
        { level: 4, title: 'Guided solution', content: 'Flag the timer property and the input mutation; leave the rest.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Widget reviewed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The frozen idle counter shipped, and the “fix” PR added detectChanges calls on a timer.',
        },
      ],
      helpLinks: [{ topicId: 'angular.change-detection', label: 'OnPush change detection' }],
      successFeedback: 'You reviewed against the contract, not against taste — exactly what OnPush needs.',
      failureFeedback: 'For each line ask: when this value changes, which of the three triggers fires? If none — flag it.',
    },
  ],
  reflectionPrompt: 'Which of our OnPush components would freeze today if a timer or a mutation snuck into it?',
  rewards: [{ type: 'xp', amount: 10, label: 'Contract signed' }],
};
