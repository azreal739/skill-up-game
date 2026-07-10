import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — RxJS ↔ signals interop (knowledge pack 03/07: toSignal,
 * initialValue, and choosing the consumption style per case).
 */
export const fnRx007SignalsInterop: MissionDefinition = {
  id: 'rx-007-signals-interop',
  campaignId: 'rxjs-reactive',
  title: 'Streams Meet Signals',
  summary:
    'Modern Angular consumes streams as signals: toSignal with an honest initial value, cleanup included.',
  difficulty: 'hard',
  learningObjectives: [
    'Convert a stream to a signal with toSignal',
    'Choose the initialValue deliberately',
    'Pick async pipe vs toSignal vs subscribe per case',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The interop session: our data still arrives as streams — HTTP, sockets, form changes — but templates increasingly want signals. toSignal is the bridge, and its sharp edge is the moment before the first emission.',
    },
    {
      speaker: 'Senior Dev',
      text: 'A signal must ALWAYS have a value; a stream may not have emitted yet. That gap is why toSignal asks about initialValue — answer it honestly or it answers with undefined.',
    },
  ],
  contextArtefacts: [
    {
      id: 'bridge',
      type: 'code',
      title: 'The bridge, from the session',
      language: 'ts',
      content:
        'readonly cartCount = toSignal(this.cart.count$, { initialValue: 0 });\n// template: {{ cartCount() }} — no async pipe, no subscribe',
    },
  ],
  challenges: [
    {
      id: 'rx-007-c1',
      type: 'multiple-choice',
      title: 'The Gap Before First Emission',
      difficulty: 'hard',
      tags: ['angular', 'typescript'],
      storyContext:
        'A teammate writes toSignal(this.user.profile$) with no options, and the template reads profile().name.',
      prompt: 'What does the compiler (rightly) complain about?',
      options: [
        {
          id: 'a',
          label: 'toSignal cannot be called outside a component constructor, so this fails to build at all.',
          isCorrect: false,
          feedback:
            'Field initialisers run in the injection context — that part is fine. The problem is the value type.',
        },
        {
          id: 'b',
          label: 'profile$ must be a BehaviorSubject before conversion; plain Observables are rejected.',
          isCorrect: false,
          feedback:
            'Any Observable converts — a BehaviorSubject merely happens to have a first value already.',
        },
        {
          id: 'c',
          label:
            'Without initialValue the signal’s type is Profile | undefined — the gap before first emission is in the type, so .name needs a guard.',
          isCorrect: true,
          feedback:
            'The gap made visible: until the stream emits, the signal holds undefined, and the type says so honestly.',
        },
        {
          id: 'd',
          label: 'Signals cannot hold object values, only primitives — Profile must be flattened first.',
          isCorrect: false,
          feedback: 'Signals hold anything; the undefined in the union is the only complaint here.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What is the signal’s value BEFORE profile$ first emits?' },
        {
          level: 2,
          title: 'Concept',
          content: 'toSignal without initialValue types as T | undefined — the pre-emission gap encoded.',
        },
        { level: 3, title: 'Specific clue', content: 'The complaint is a union member, not a lifecycle rule.' },
        { level: 4, title: 'Guided solution', content: 'Pick the Profile | undefined explanation.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Gap acknowledged' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'A pre-emission undefined reached the template and crashed the profile header.',
        },
      ],
      helpLinks: [
        { topicId: 'rx.observables', label: 'Observables' },
        { topicId: 'angular.signals', label: 'Angular signals' },
      ],
      successFeedback: 'The union IS the gap — and now you can close it deliberately.',
      failureFeedback: 'Signals always have a value; streams may not have one yet. Where does that mismatch surface?',
    },
    {
      id: 'rx-007-c2',
      type: 'multiple-choice',
      title: 'Three Consumers, Three Tools',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'Three needs: (1) render a live count in a template; (2) run an imperative side effect (toast on error events); (3) feed a computed() that derives from the count.',
      prompt: 'Which assignment of tools fits the session’s guidance?',
      options: [
        {
          id: 'a',
          label:
            '(1) toSignal + {{ count() }}; (2) events$.pipe(takeUntilDestroyed()).subscribe(showToast); (3) computed(() => count() * price)',
          isCorrect: true,
          feedback:
            'Each consumer gets its native tool: signals for templates and derivation, a cleaned-up subscribe for the genuinely imperative bit.',
        },
        {
          id: 'b',
          label: 'Subscribe manually for all three and store results in component fields.',
          isCorrect: false,
          feedback:
            'Three subscriptions, three mutable fields, zero derivation — the pattern the whole campaign has been retiring.',
        },
        {
          id: 'c',
          label: 'Convert everything with toSignal, including the toast — effect(() => showToast(events())).',
          isCorrect: false,
          feedback:
            'Events are discrete happenings, not state; modelling them as a signal replays the LAST event to every new effect — a stale toast waiting to fire.',
        },
        {
          id: 'd',
          label: 'Use the async pipe for all three, wiring the computed through a template-local variable.',
          isCorrect: false,
          feedback:
            'The async pipe lives in templates — computed() and imperative side effects cannot reach it.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Separate state (has a current value) from events (things that happen).' },
        {
          level: 2,
          title: 'Concept',
          content: 'State → signals (template + computed). Events → a subscription with lifecycle cleanup.',
        },
        { level: 3, title: 'Specific clue', content: 'A toast is an event. What goes wrong when an event becomes “current value”?' },
        { level: 4, title: 'Guided solution', content: 'Pick the mixed answer: toSignal, cleaned subscribe, computed.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Tools matched' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'Every stream got the same consumption pattern, whether it was state or events.',
        },
      ],
      helpLinks: [
        { topicId: 'rx.subscriptions', label: 'Subscription cleanup' },
        { topicId: 'angular.signals', label: 'Angular signals' },
      ],
      successFeedback: 'State as signals, events as subscriptions — interop with intent.',
      failureFeedback: 'One of the three needs is an EVENT. Which tool is honest about events?',
    },
  ],
  reflectionPrompt: 'Which stream in your feature is really state, and which is really events?',
  rewards: [{ type: 'xp', amount: 15, label: 'Bridge crossed' }],
};
