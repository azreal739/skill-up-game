import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — how change detection actually runs (zone.js patches async
 * entry points; default strategy re-checks the whole tree; template
 * expressions re-evaluate every cycle).
 */
export const fnSig005CdCycle: MissionDefinition = {
  id: 'sig-005-cd-cycle',
  campaignId: 'ng-signals-cd',
  title: 'The Machine That Repaints',
  summary:
    'Before OnPush and signals make sense, meet the default machine: zone.js wakes it, and it re-checks every binding in the tree.',
  difficulty: 'medium',
  learningObjectives: [
    'Describe what triggers a change-detection cycle under zone.js',
    'Explain why template function calls re-run on every cycle',
    'Predict the cost profile of default change detection at scale',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session five started with a profiler trace: one keystroke in the search box, four hundred calls to a scoring function nowhere near the search box. Nobody could explain it. That was the point.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The default machine is simple and brutal: zone.js patches the async entry points — DOM events, timers, promises, XHR — and when any of them fires, Angular re-checks every binding in the component tree. Every. Binding.',
    },
  ],
  contextArtefacts: [
    {
      id: 'profiler-trace',
      type: 'code',
      title: 'The innocent-looking binding',
      language: 'ts',
      content:
        '// product-card.component.html — 100 cards on screen\n<span class="score">{{ expensiveScore(product) }}</span>\n\n// one keystroke elsewhere → 1 CD cycle → 100 re-evaluations\n// 4 keystrokes → 400 calls, zero products changed',
    },
  ],
  challenges: [
    {
      id: 'sig-005-c1',
      type: 'multiple-choice',
      title: 'Four Hundred Calls',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'The trace is on the projector: expensiveScore, called 400 times by four keystrokes in an unrelated input.',
      prompt: 'Why does typing in the search box run the product cards’ scoring function?',
      options: [
        {
          id: 'a',
          label: 'The search box must be accidentally two-way-bound to the products list.',
          isCorrect: false,
          feedback:
            'No binding connects them — that is what made the trace spooky. The connection is the cycle itself, not the data.',
        },
        {
          id: 'b',
          label:
            'Each keystroke is a zone-patched event, so it triggers a full change-detection cycle — and a template function call is re-evaluated every cycle in every component, whether or not its inputs changed.',
          isCorrect: true,
          feedback:
            'The default contract: any async activity anywhere re-checks every binding everywhere. Function calls in templates put arbitrary work inside that loop.',
        },
        {
          id: 'c',
          label: 'expensiveScore is memoised wrongly — a correct cache key would stop the calls.',
          isCorrect: false,
          feedback:
            'Caching treats the symptom at best. The machine will still CALL it 400 times; the real fix moves the work out of the per-cycle path.',
        },
        {
          id: 'd',
          label: 'Keystroke events bubble to document, and Angular re-renders whichever component the event passes through.',
          isCorrect: false,
          feedback:
            'Bubbling is DOM routing, not the trigger. Zone.js flags the turn as “something happened” — Angular then checks the whole tree, bubble path or not.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The keystroke and the cards share no data. What DO they share?' },
        { level: 2, title: 'Concept', content: 'zone.js patches async entry points; each one ends in a tree-wide check.' },
        { level: 3, title: 'Specific clue', content: 'Calling a function directly in the template means it runs once per component, per change-detection cycle, forever.' },
        { level: 4, title: 'Guided solution', content: 'Pick the every-cycle-re-evaluates answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Trace explained' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The scoring call gained an HTTP lookup and the search box began lagging by whole seconds.',
        },
      ],
      helpLinks: [{ topicId: 'signals.cd-cycle', label: 'Change detection cycles' }],
      successFeedback: 'You can read a CD trace now — half of Angular performance work is exactly this diagnosis.',
      failureFeedback: 'Stop looking for a data path between the input and the cards. What runs after ANY event?',
    },
    {
      id: 'sig-005-c2',
      type: 'multiple-choice',
      title: 'What Wakes the Machine',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'Whiteboard quiz before the break: “list what starts a change-detection cycle — no guessing.”',
      prompt: 'Under the default zone.js setup, what triggers change detection?',
      options: [
        {
          id: 'a',
          label: 'Only writes to component properties that appear in a template binding.',
          isCorrect: false,
          feedback:
            'Angular has no property watchers at all — a plain write triggers nothing. That is exactly why the timer-property view in mission 6 freezes.',
        },
        {
          id: 'b',
          label: 'Only explicit calls to markForCheck or detectChanges.',
          isCorrect: false,
          feedback: 'Those exist as manual overrides — the default machine runs constantly without anyone calling them.',
        },
        {
          id: 'c',
          label: 'Every rendered binding polls its expression on a fixed interval.',
          isCorrect: false,
          feedback: 'No polling clock exists — cycles are event-driven. An idle app runs zero cycles.',
        },
        {
          id: 'd',
          label:
            'Completion of anything zone.js has patched: DOM event handlers, setTimeout/setInterval callbacks, resolved promises, XHR — each one schedules a tree-wide check.',
          isCorrect: true,
          feedback:
            'The patched-async list, exactly. Note what is NOT on it: plain property writes — code that changes state outside the zone repaints nothing.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Think “what does zone.js patch?”, not “what does Angular watch?”.' },
        { level: 2, title: 'Concept', content: 'CD is scheduled by async completion, not by observing your data.' },
        { level: 3, title: 'Specific clue', content: 'Events, timers, promises, XHR — one option is that exact list.' },
        { level: 4, title: 'Guided solution', content: 'Choose the patched-async-entry-points answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Triggers listed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: '“Angular watches your properties” went unchallenged — and the next freeze took a day to diagnose.',
        },
      ],
      helpLinks: [
        { topicId: 'signals.cd-cycle', label: 'Change detection cycles' },
        { topicId: 'angular.change-detection', label: 'OnPush change detection' },
      ],
      successFeedback: 'Events in, tree-check out — with the trigger list in hand, OnPush is about to make perfect sense.',
      failureFeedback: 'Angular never watches values. Which option describes triggers rather than watching?',
    },
  ],
  reflectionPrompt: 'Open our heaviest page: how many function calls sit in its templates, running once per component per cycle?',
  rewards: [{ type: 'xp', amount: 10, label: 'Machine understood' }],
};
