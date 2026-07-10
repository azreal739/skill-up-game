import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — subscription cleanup (knowledge pack 07: "Manual
 * subscriptions without cleanup"; every subscription must answer
 * "who unsubscribes?").
 */
export const fnRx003Cleanup: MissionDefinition = {
  id: 'rx-003-subscription-cleanup',
  campaignId: 'rxjs-reactive',
  title: 'Who Unsubscribes?',
  summary:
    'Subscriptions outlive components unless someone ends them. Prefer the tools that answer the question for you.',
  difficulty: 'easy',
  learningObjectives: [
    'State the cleanup question every subscribe must answer',
    'Choose async pipe / takeUntilDestroyed / toSignal over manual teardown',
    'Spot the leak in a real component',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The memory leak that paged us: a dashboard component subscribed to interval(1000) and never unsubscribed. Every visit stacked another timer — by afternoon, forty of them were fighting over change detection.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The review rule since: every manual subscribe must answer “who unsubscribes?” out loud. If the answer is awkward, use the async pipe, takeUntilDestroyed or toSignal instead.',
    },
  ],
  contextArtefacts: [
    {
      id: 'leak',
      type: 'code',
      title: 'dashboard.component.ts (as paged)',
      language: 'ts',
      content:
        'export class DashboardComponent implements OnInit {\n  ticks = 0;\n  ngOnInit(): void {\n    interval(1000).subscribe(() => this.ticks++);\n  }\n}',
    },
  ],
  challenges: [
    {
      id: 'rx-003-c1',
      type: 'multiple-choice',
      title: 'End the Timer',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'Fix the artefact’s leak with the smallest modern change — the component just shows elapsed seconds.',
      prompt: 'Which fix answers “who unsubscribes?” best?',
      options: [
        {
          id: 'a',
          label:
            'Store the Subscription in a field and add ngOnDestroy() { this.sub.unsubscribe(); }',
          isCorrect: false,
          feedback:
            'Correct but ceremonial — two fields and a lifecycle hook that modern Angular can hand you for free. The session called this the last resort.',
        },
        {
          id: 'b',
          label: 'Wrap the callback in NgZone.runOutsideAngular so leaks stop costing change detection.',
          isCorrect: false,
          feedback:
            'That hides the cost without ending the leak — forty timers still tick, just more quietly.',
        },
        {
          id: 'c',
          label: 'Call interval(1000).pipe(take(3600)) — nobody stays an hour anyway.',
          isCorrect: false,
          feedback:
            'A guess dressed as a fix: the subscription still outlives the component for up to an hour, times every visit.',
        },
        {
          id: 'd',
          label:
            'interval(1000).pipe(takeUntilDestroyed()).subscribe(() => this.ticks++); — bound to the component’s DestroyRef.',
          isCorrect: true,
          feedback:
            'The framework answers the question: when the component is destroyed, the stream completes. One operator, zero ceremony.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Whose lifetime should the subscription share?' },
        {
          level: 2,
          title: 'Concept',
          content: 'takeUntilDestroyed ties a stream to the injection context’s DestroyRef — destruction completes it.',
        },
        { level: 3, title: 'Specific clue', content: 'Reject anything that limits or hides the leak instead of ending it at destroy.' },
        { level: 4, title: 'Guided solution', content: 'Pick takeUntilDestroyed in the pipe — the modern one-liner.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Leak sealed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Stacked interval subscriptions degraded the dashboard until the tab was killed.',
        },
      ],
      helpLinks: [{ topicId: 'rx.subscriptions', label: 'Subscription cleanup' }],
      successFeedback: 'Stream lifetime = component lifetime. The question has a permanent answer.',
      failureFeedback: 'The right fix ENDS the subscription at destroy — not later, not quieter.',
    },
    {
      id: 'rx-003-c2',
      type: 'code-review',
      title: 'Review: The Subscribe Audit',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Three stream usages from the same feature, pulled for the post-incident audit. Judge each one.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'audit',
          type: 'code',
          title: 'Three usages from the audit',
          language: 'ts',
          content:
            '// A — orders.component.ts\nthis.filters$.subscribe((f) => {\n  this.api.search(f).subscribe((r) => (this.rows = r));\n});\n\n// B — orders.component.html\n@if (summary$ | async; as summary) { {{ summary.total }} }\n\n// C — badge.component.ts\nreadonly count = toSignal(this.cart.count$, { initialValue: 0 });',
        },
      ],
      findings: [
        {
          id: 'nested-subscribe',
          label: 'A: a subscribe inside a subscribe, with neither cleaned up',
          isCorrect: true,
          feedback:
            'The double offence from our incident: two leaks, plus stale inner results landing out of order. This is switchMap’s job.',
        },
        {
          id: 'async-pipe',
          label: 'B: the async pipe subscription is never manually unsubscribed',
          isCorrect: false,
          feedback:
            'The async pipe unsubscribes itself when the view goes — that is exactly why the session recommends it.',
        },
        {
          id: 'to-signal',
          label: 'C: toSignal hides a subscription that nobody tears down',
          isCorrect: false,
          feedback:
            'toSignal cleans up with the injection context — a sanctioned answer to “who unsubscribes?”.',
        },
        {
          id: 'rows-field',
          label: 'A also copies stream data into a mutable field, losing reactivity downstream',
          isCorrect: true,
          feedback:
            'this.rows = r turns a live stream into a stale snapshot — templates rebind only by luck of change detection.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each usage: who unsubscribes, and where does the data live?' },
        {
          level: 2,
          title: 'Concept',
          content: 'async pipe and toSignal carry their own teardown; raw nested subscribes carry neither teardown nor ordering.',
        },
        { level: 3, title: 'Specific clue', content: 'Both real issues live in snippet A.' },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Flag the nested subscribe and the mutable rows copy. B and C are the sanctioned patterns.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Audit filed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'The nested-subscribe pattern was copied into two more features before the audit caught it.',
        },
      ],
      helpLinks: [
        { topicId: 'rx.subscriptions', label: 'Subscription cleanup' },
        { topicId: 'rx.flattening', label: 'switchMap & friends' },
      ],
      successFeedback: 'You flagged the leaks and cleared the sanctioned patterns — audit-grade review.',
      failureFeedback: 'async pipe and toSignal clean up after themselves. Focus on what snippet A does twice.',
    },
  ],
  reflectionPrompt: 'Pick one manual subscribe you own. Who unsubscribes it — honestly?',
  rewards: [{ type: 'xp', amount: 10, label: 'Lifetimes bound' }],
};
