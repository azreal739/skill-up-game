import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — retiring subscribe-in-subscribe (knowledge pack 03/07:
 * dependent requests belong in one composed pipe).
 */
export const fnRx008NestedSubscribes: MissionDefinition = {
  id: 'rx-008-nested-subscribes',
  campaignId: 'rxjs-reactive',
  title: 'The Nested Subscribe Retirement',
  summary:
    'Dependent async work is composition, not nesting: one pipe, one subscriber, one cleanup.',
  difficulty: 'hard',
  learningObjectives: [
    'Recognise why nested subscribes multiply leaks and races',
    'Compose dependent requests with a flattening operator',
    'Combine parallel requests without nesting at all',
  ],
  briefing: [
    {
      speaker: 'Senior Dev',
      text: 'The audit found eleven subscribe-in-subscribe sites. Every one is a leak candidate, a race candidate, and unreadable — the pyramid of doom, reborn reactive.',
    },
    {
      speaker: 'Team Lead',
      text: 'The retirement rule: if request B needs request A’s result, that is a flattening operator. If A and B are independent, that is combineLatest or forkJoin. Nesting is never the answer.',
    },
  ],
  contextArtefacts: [
    {
      id: 'pyramid',
      type: 'code',
      title: 'Site #7 of 11, as found',
      language: 'ts',
      content:
        'this.route.paramMap.subscribe((params) => {\n  this.api.order(params.get(\'id\')!).subscribe((order) => {\n    this.api.customer(order.customerId).subscribe((customer) => {\n      this.vm = { order, customer };\n    });\n  });\n});',
    },
  ],
  challenges: [
    {
      id: 'rx-008-c1',
      type: 'multiple-choice',
      title: 'Flatten Site #7',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'Route param → order → customer, each step needing the previous result. Retire the pyramid.',
      prompt: 'Which composition replaces the nesting faithfully?',
      options: [
        {
          id: 'a',
          label:
            'forkJoin([this.route.paramMap, this.api.order(id), this.api.customer(cid)]) — run all three at once.',
          isCorrect: false,
          feedback:
            'forkJoin is for INDEPENDENT work — here order needs the param and customer needs the order; id and cid do not even exist yet.',
        },
        {
          id: 'b',
          label:
            'Three toSignal conversions and an effect that fires the next request when the previous signal changes.',
          isCorrect: false,
          feedback:
            'Requests cascading out of effects rebuilds the pyramid with signals — harder to cancel, easier to loop.',
        },
        {
          id: 'c',
          label: 'Keep the nesting but add takeUntilDestroyed to each of the three subscribes.',
          isCorrect: false,
          feedback:
            'That patches the leaks and keeps the races and the pyramid — retirement means removal, not decoration.',
        },
        {
          id: 'd',
          label:
            'this.route.paramMap.pipe(\n  switchMap((p) => this.api.order(p.get(\'id\')!)),\n  switchMap((order) => this.api.customer(order.customerId).pipe(\n    map((customer) => ({ order, customer }))\n  ))\n)',
          isCorrect: true,
          feedback:
            'One pipe, dependencies expressed as flattening steps, both values carried into one vm — and a route change cancels the whole stale chain.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Each step DEPENDS on the previous — that dependency names the operator.' },
        {
          level: 2,
          title: 'Concept',
          content: 'Sequential dependent async = chained switchMaps; carry earlier values with an inner map.',
        },
        { level: 3, title: 'Specific clue', content: 'Bonus of the right answer: a new route param cancels the in-flight chain.' },
        { level: 4, title: 'Guided solution', content: 'Pick the chained switchMap pipe with the inner map combining order + customer.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Pyramid razed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'Site #7 stayed nested and trained two more copies before the refactor landed.',
        },
      ],
      helpLinks: [{ topicId: 'rx.flattening', label: 'switchMap & friends' }],
      successFeedback: 'Dependencies as composition — cancellable, leak-free, readable top to bottom.',
      failureFeedback: 'The steps are sequential and dependent. Which operator EXPRESSES “needs the previous result”?',
    },
    {
      id: 'rx-008-c2',
      type: 'code-review',
      title: 'Review: The Refactor PR',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'A teammate retires site #4 — two INDEPENDENT lookups for one screen — and asks for review.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'refactor',
          type: 'code',
          title: 'site-4.component.ts (PR diff)',
          language: 'ts',
          content:
            "readonly vm = toSignal(\n  combineLatest([\n    this.api.profile$,\n    this.api.settings$,\n  ]).pipe(\n    map(([profile, settings]) => ({ profile, settings })),\n    tap((vm) => (this.lastVm = vm))\n  )\n);\nprivate lastVm: Vm | null = null;",
        },
      ],
      findings: [
        {
          id: 'combine-ok',
          label: 'combineLatest is wrong here — independent requests must use nested subscribes',
          isCorrect: false,
          feedback:
            'Backwards: combineLatest is exactly the tool for independent streams feeding one view.',
        },
        {
          id: 'tap-cache',
          label: 'The tap copies the vm into a mutable field, recreating the stale-snapshot problem beside the live signal',
          isCorrect: true,
          feedback:
            'Two sources of truth now exist: vm() (live) and lastVm (stale). The next reader will use the wrong one.',
        },
        {
          id: 'no-initial',
          label: 'toSignal without initialValue leaves vm() as Vm | undefined, and nothing guards the template',
          isCorrect: true,
          feedback:
            'The mission-7 gap, unhandled: before both streams emit, vm() is undefined and vm().profile throws.',
        },
        {
          id: 'map-combine',
          label: 'Mapping the tuple into a named object is unnecessary ceremony',
          isCorrect: false,
          feedback:
            'Naming the tuple is a kindness to every reader — ceremony well spent.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Check the two lessons this campaign already taught: gaps and duplicate truth.' },
        {
          level: 2,
          title: 'Concept',
          content: 'A signal plus a mutable copy of the same data is a divergence machine; an unguarded undefined is a crash.',
        },
        { level: 3, title: 'Specific clue', content: 'The operator choice is right. Both issues are in what surrounds it.' },
        { level: 4, title: 'Guided solution', content: 'Flag the tap-cache and the missing initialValue. combineLatest and the named map stand.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Refactor reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The unguarded undefined crashed the screen on slow connections — only in production, of course.',
        },
      ],
      helpLinks: [
        { topicId: 'rx.subscriptions', label: 'Subscription cleanup' },
        { topicId: 'angular.signals', label: 'Angular signals' },
      ],
      successFeedback: 'Right operator, two surrounding hazards — a review that makes the refactor actually safe.',
      failureFeedback: 'The composition is fine. Hunt the duplicate source of truth and the pre-emission gap.',
    },
  ],
  reflectionPrompt: 'Dependent or independent — classify the last two requests you wired together.',
  rewards: [{ type: 'xp', amount: 15, label: 'Nesting retired' }],
};
