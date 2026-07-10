import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — signals meet OnPush (a template signal read registers the
 * component as a consumer and marks it precisely on change; untracked keeps
 * effects honest about their dependencies).
 */
export const fnSig007SignalsOnPush: MissionDefinition = {
  id: 'sig-007-signals-onpush',
  campaignId: 'ng-signals-cd',
  title: 'Signals Mark Their Own Territory',
  summary:
    'A signal read in a template registers the component as a consumer — changes mark exactly that component, no zone required.',
  difficulty: 'hard',
  learningObjectives: [
    'Explain how a template signal read schedules precise re-renders under OnPush',
    'Fix over-eager effects with untracked',
    'Recognise the read-write effect loop before it ships',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session seven closed the loop: the frozen idle counter from last week, fixed by changing one line — secondsIdle became a signal. No markForCheck, no zone tricks. Why did that work?',
    },
    {
      speaker: 'Senior Dev',
      text: 'Because the template read registers the component as that signal’s consumer. When the timer sets it, the signal notifies its consumers — and Angular marks exactly those components for check. The component tells on itself. That is the whole future: OnPush everywhere, signals doing the marking, zone.js increasingly decorative.',
    },
  ],
  contextArtefacts: [
    {
      id: 'one-line-fix',
      type: 'code',
      title: 'The one-line fix',
      language: 'ts',
      content:
        '// before: invisible under OnPush\nsecondsIdle = 0;\nsetInterval(() => (this.secondsIdle += 1), 1000);\n\n// after: marks its own component on every set\nreadonly secondsIdle = signal(0);\nsetInterval(() => this.secondsIdle.update((s) => s + 1), 1000);',
    },
  ],
  challenges: [
    {
      id: 'sig-007-c1',
      type: 'multiple-choice',
      title: 'Why One Line Was Enough',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'The diff is two lines. The frozen counter now ticks under OnPush. The quiz: explain the mechanism, precisely.',
      prompt: 'Why does turning secondsIdle into a signal un-freeze the OnPush view?',
      options: [
        {
          id: 'a',
          label: 'signal.update runs inside the zone, so each tick now triggers a global change-detection cycle.',
          isCorrect: false,
          feedback:
            'The interval callback was ALWAYS in the zone — global cycles ran before too. The component was skipped because nothing marked IT. The signal changes that, not the zone.',
        },
        {
          id: 'b',
          label: 'Signals bypass change detection and write their value straight into the DOM node.',
          isCorrect: false,
          feedback:
            'Rendering still goes through change detection — signals change who gets CHECKED, not how pixels are painted.',
        },
        {
          id: 'c',
          label: 'The signal makes secondsIdle immutable, and OnPush re-checks all immutable bindings each cycle.',
          isCorrect: false,
          feedback: 'There is no immutable-binding rule — and numbers were never the mutation problem. Consumer registration is the mechanism.',
        },
        {
          id: 'd',
          label:
            'Reading secondsIdle() in the template registered the component as the signal’s consumer — each update notifies consumers, and Angular marks exactly those components for check, satisfying OnPush without any manual markForCheck.',
          isCorrect: true,
          feedback:
            'Precision is the win: not “a cycle runs” but “THIS component is marked”. That is also the road to zoneless — the marking no longer needs the zone at all.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The question is not “does CD run” — it is “who gets marked”.' },
        { level: 2, title: 'Concept', content: 'Template reads register consumers; writes notify consumers; consumers get marked.' },
        { level: 3, title: 'Specific clue', content: 'markForCheck done automatically, and only where needed.' },
        { level: 4, title: 'Guided solution', content: 'Pick consumer-registration with precise marking.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Mechanism named' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -6,
          reason: '“Signals are zone magic” became the working theory, and the next stale view got detectChanges duct tape.',
        },
      ],
      helpLinks: [
        { topicId: 'angular.signals', label: 'Signals' },
        { topicId: 'angular.change-detection', label: 'OnPush change detection' },
      ],
      successFeedback: 'Consumers, notifications, precise marking — you just explained zoneless Angular a release early.',
      failureFeedback: 'Global cycles already ran before the fix. What did the skipped component lack?',
    },
    {
      id: 'sig-007-c2',
      type: 'multiple-choice',
      title: 'The Over-Eager Effect',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'An audit-log effect appends every result change: effect(() => this.log.update(l => [...l, `${this.result()} @ ${this.filter()}`])). It fires on every FILTER change too — flooding the log with duplicate results.',
      prompt: 'How do you keep the log entry rich but make the effect fire only when result changes?',
      options: [
        {
          id: 'a',
          label: 'Reorder the template literal so result() is read before filter() — first read wins dependency tracking.',
          isCorrect: false,
          feedback: 'Every read inside the effect registers, in any order — tracking has no “first wins” rule.',
        },
        {
          id: 'b',
          label:
            'Wrap the incidental read: `${this.result()} @ ${untracked(() => this.filter())}` — untracked reads the current value without registering it as a dependency, so only result triggers the effect.',
          isCorrect: true,
          feedback:
            'untracked is exactly this tool: “I want the value, not the subscription.” The effect now states its true trigger in code.',
        },
        {
          id: 'c',
          label: 'Split it into two effects, one reading result and one reading filter, appending half an entry each.',
          isCorrect: false,
          feedback:
            'Half-entries interleave into garbage — and the filter effect still fires on filter changes, which is the original complaint.',
        },
        {
          id: 'd',
          label: 'Snapshot the filter once in the constructor and use the captured value in every log line.',
          isCorrect: false,
          feedback: 'That fixes the trigger by making the data wrong — every entry logs the filter from app start.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The effect has two reads but should have one TRIGGER.' },
        { level: 2, title: 'Concept', content: 'Every signal read in an effect registers a dependency — unless you say otherwise.' },
        { level: 3, title: 'Specific clue', content: 'There is an API whose entire job is “read without tracking”.' },
        { level: 4, title: 'Guided solution', content: 'Wrap the filter read in untracked().' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Trigger tamed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The flooding log shipped, and the cleanup script that deduped it became load-bearing.',
        },
      ],
      helpLinks: [
        { topicId: 'signals.effects', label: 'Effects' },
        { topicId: 'angular.signals', label: 'Signals' },
      ],
      successFeedback: 'Dependencies declared on purpose — effects earn trust exactly this way.',
      failureFeedback: 'You want filter’s VALUE without filter’s NOTIFICATIONS. Which option separates the two?',
    },
  ],
  reflectionPrompt: 'Which of our effects reads more signals than it means to be triggered by?',
  rewards: [{ type: 'xp', amount: 15, label: 'Territory marked' }],
};
