import { MissionDefinition } from '@academy/content-model';

/** Mission — "Binding the Signal" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const mission005BindingTheSignal: MissionDefinition = {
  id: 'foundations-005-binding-the-signal',
  campaignId: 'foundations',
  title: 'Binding the Signal',
  summary: 'The live visitors widget renders garbage. Learn how signals connect state to the view.',
  difficulty: 'easy',
  learningObjectives: [
    'Read a signal value in a template',
    'Update signal state so the view reacts',
    'Spot mutations that silently bypass a signal',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The operations page has a live visitors widget built with Angular signals. It compiles, but the widget shows something that is definitely not a number.',
    },
    {
      speaker: 'Mission Control',
      text: 'Signals are reactive values: read them by calling them, change them through set or update, and the view follows. Somewhere this widget breaks those rules.',
    },
  ],
  contextArtefacts: [
    {
      id: 'visitors-widget',
      type: 'code',
      title: 'live-visitors.component.ts',
      language: 'ts',
      content:
        "@Component({\n  selector: 'app-live-visitors',\n  standalone: true,\n  template: `\n    <span class=\"count\">{{ visitors }}</span>\n    <button (click)=\"increment()\">Simulate visitor</button>\n  `,\n})\nexport class LiveVisitorsComponent {\n  visitors = signal(0);\n  doubled = computed(() => this.visitors() * 2);\n  history = signal<number[]>([]);\n\n  increment() {\n    this.visitors.set(this.visitors() + 1);\n    this.history().push(this.visitors());\n  }\n}",
    },
  ],
  challenges: [
    {
      id: 'foundations-005-c1',
      type: 'multiple-choice',
      title: 'Read the Signal',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext: 'The count element shows "() => …" instead of a number.',
      prompt: 'How should the template render the current visitor count?',
      options: [
        {
          id: 'a',
          label: '{{ visitors.value }}',
          isCorrect: false,
          feedback: 'Signals have no .value property — that is a different framework’s API.',
        },
        {
          id: 'b',
          label: '{{ visitors() }}',
          isCorrect: true,
          feedback:
            'A signal is read by calling it. The template re-renders automatically whenever the signal changes.',
        },
        {
          id: 'c',
          label: '{{ visitors }}',
          isCorrect: false,
          feedback:
            'This interpolates the signal function itself — exactly the garbage the widget is showing.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Look closely at what the template interpolates versus what a signal is.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'A signal wraps a value. Reading the value means invoking the signal — visitors() — not referencing the wrapper.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'The widget renders a function body on screen. One option adds the missing parentheses.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose {{ visitors() }} — calling the signal returns its current value and registers the view as a dependent.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Signal read correctly' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The operations page kept rendering a broken visitors widget.',
        },
      ],
      helpLinks: [
        { topicId: 'angular.signals', label: 'Signals' },
        { topicId: 'angular.templates', label: 'Template syntax' },
      ],
      successFeedback: 'Calling the signal gives the view a live, reactive value.',
      failureFeedback: 'A signal is a function that returns its value — the template must call it.',
    },
    {
      id: 'foundations-005-c2',
      type: 'code-review',
      title: 'Review the Signal Usage',
      difficulty: 'easy',
      tags: ['angular', 'typescript'],
      storyContext:
        'Even after fixing the template, the history sparkline never updates. Review how the component manages its signals.',
      prompt: 'Select every genuine signal-handling issue in the component.',
      findings: [
        {
          id: 'computed-doubled',
          label: 'doubled uses computed(), which recalculates on every change — wasteful',
          isCorrect: false,
          feedback:
            'computed() is exactly right here: it memoises and only recalculates when visitors actually changes.',
        },
        {
          id: 'template-no-call',
          label: 'The template interpolates visitors without calling it',
          isCorrect: true,
          feedback:
            'Rendering {{ visitors }} shows the signal function itself. It must be {{ visitors() }}.',
        },
        {
          id: 'set-vs-update',
          label: 'increment() uses set() with the current value instead of update()',
          isCorrect: false,
          feedback:
            'update(v => v + 1) reads more clearly, but set(this.visitors() + 1) is functionally correct — style, not a defect.',
        },
        {
          id: 'push-mutation',
          label: 'history().push(...) mutates the array in place, so the signal never notifies',
          isCorrect: true,
          feedback:
            'Mutating the inner array changes data behind the signal’s back — no dependents re-render. Use history.update(h => [...h, value]).',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Two rules matter: how signals are read, and how their contents are changed.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Signals only notify when set or update is called with a new value. Reading one without calling it, or mutating an object inside one, both break reactivity silently.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'One issue is in the template line, the other is in how increment() records history.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Flag the uncalled {{ visitors }} interpolation and the history().push mutation. The computed and the set() call are fine.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Signals reviewed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 10,
          reason: 'A silent reactivity bug pattern spread to other widgets.',
        },
      ],
      helpLinks: [{ topicId: 'angular.signals', label: 'Signals' }],
      successFeedback:
        'The widget is fully reactive: values are read by calling, and every change goes through the signal.',
      failureFeedback:
        'Check each line against the two signal rules — call to read, set/update (with new references) to write.',
    },
  ],
  reflectionPrompt:
    'Why does mutating an array inside a signal fail silently, while update() with a new array works?',
  rewards: [{ type: 'xp', amount: 5, label: 'Signal bound' }],
};
