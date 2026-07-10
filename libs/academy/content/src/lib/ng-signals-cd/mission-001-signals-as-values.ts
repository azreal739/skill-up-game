import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — signals as reactive value containers (knowledge pack 03:
 * read by calling, updated with set/update; the calculator inputs reborn).
 */
export const fnSig001SignalsAsValues: MissionDefinition = {
  id: 'sig-001-signals-as-values',
  campaignId: 'ng-signals-cd',
  title: 'A Value You Can Watch',
  summary:
    'Signals are reactive value containers — read them by calling them, change them with set and update.',
  difficulty: 'intro',
  learningObjectives: [
    'Say what a signal is mechanically — container, call-to-read, notify-on-change',
    'Read a signal correctly in a template',
    'Choose between set and update for a write',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'New session block: how the view actually updates. We started where the FP sessions ended — the calculator came back, with x, y and op reborn as signals.',
    },
    {
      speaker: 'Senior Dev',
      text: 'First lesson was embarrassing and important: someone bound {{ count }} instead of {{ count() }} and shipped a template that rendered a function. A signal is a container. Reading it means calling it.',
    },
  ],
  contextArtefacts: [
    {
      id: 'calculator-signals',
      type: 'code',
      title: 'The calculator, as signals',
      language: 'ts',
      content:
        "readonly x = signal(0);\nreadonly y = signal(0);\nreadonly op = signal<'add' | 'sub'>('add');\n\nsetX(next: number) { this.x.set(next); }\n// template: <span>{{ x() }}</span>",
    },
  ],
  challenges: [
    {
      id: 'sig-001-c1',
      type: 'multiple-choice',
      title: 'What a Signal Is',
      difficulty: 'intro',
      tags: ['angular'],
      storyContext:
        'The {{ count }} incident is on screen: the page renders the function’s source text instead of a number.',
      prompt: 'Mechanically, what is a signal?',
      options: [
        {
          id: 'a',
          label: 'A special component property that Angular watches through zone.js for you.',
          isCorrect: false,
          feedback:
            'Signals need no zone at all — that independence is the point. Nothing watches the property; readers register themselves.',
        },
        {
          id: 'b',
          label:
            'A reactive value container: you read it by CALLING it — count() — write it with set or update, and everything that read it is notified when it changes.',
          isCorrect: true,
          feedback:
            'Container, call-to-read, notify-on-change — three facts that explain both the {{ count }} bug and everything in the sessions ahead.',
        },
        {
          id: 'c',
          label: 'An RxJS Subject with nicer syntax — you still subscribe to get values out.',
          isCorrect: false,
          feedback:
            'No subscription anywhere: a signal always HAS a current value you read synchronously. Streams model events; signals model state.',
        },
        {
          id: 'd',
          label: 'A template-only binding primitive — it cannot be read from TypeScript code.',
          isCorrect: false,
          feedback: 'count() works identically in TS and templates — same call, same current value.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Explain the bug first: why did {{ count }} render garbage?' },
        {
          level: 2,
          title: 'Concept',
          content: 'A signal is a function-shaped container: calling it reads the current value and registers the reader.',
        },
        { level: 3, title: 'Specific clue', content: 'No zone, no subscribe — the readers themselves are tracked.' },
        { level: 4, title: 'Guided solution', content: 'Pick the container / call-to-read / notify answer.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Signal defined' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'Signals stayed “new syntax for properties” in half the team’s heads — the sessions built on sand.',
        },
      ],
      helpLinks: [{ topicId: 'angular.signals', label: 'Signals' }],
      successFeedback: 'Container, call, notify — you can now read every slide that follows.',
      failureFeedback: 'Start from the bug: what does {{ count }} bind if count is a function?',
    },
    {
      id: 'sig-001-c2',
      type: 'multiple-choice',
      title: 'set or update',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext: 'Next slide: a click counter. The team writes four increments on the whiteboard.',
      prompt: 'Which write increments the counter correctly, and why?',
      options: [
        {
          id: 'a',
          label: 'clicks.set(clicks + 1) — set with the bumped value.',
          isCorrect: false,
          feedback:
            'clicks is the container, not the number — this adds 1 to a function. The read needs the call: clicks().',
        },
        {
          id: 'b',
          label: 'clicks() = clicks() + 1 — read it, bump it, assign it back.',
          isCorrect: false,
          feedback: 'A call expression is not assignable. Writes go through the API: set or update.',
        },
        {
          id: 'c',
          label: 'Reach into the internals: clicks.value += 1.',
          isCorrect: false,
          feedback:
            'There is no public value property — and a backdoor write would notify nobody, which defeats the container.',
        },
        {
          id: 'd',
          label:
            'clicks.update(n => n + 1) — update derives the next value from the current one; set is for values that do not depend on the old one.',
          isCorrect: true,
          feedback:
            'The rule of thumb from the session: depends on the previous value → update; fresh value from outside → set.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Does the next value depend on the current one? That chooses the API.' },
        { level: 2, title: 'Concept', content: 'set(next) replaces; update(fn) transforms current → next.' },
        { level: 3, title: 'Specific clue', content: 'Two options forget that reading requires the call.' },
        { level: 4, title: 'Guided solution', content: 'Choose update with the n => n + 1 transformer.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Write chosen' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'The counter compiled with a coerced function-plus-one and rendered NaN in the demo.',
        },
      ],
      helpLinks: [{ topicId: 'angular.signals', label: 'Signals' }],
      successFeedback: 'Depends-on-previous → update. You will use that rule weekly.',
      failureFeedback: 'First eliminate the options that read the signal without calling it.',
    },
  ],
  reflectionPrompt: 'Which piece of component state in our app is still a plain property that the view silently watches?',
  rewards: [{ type: 'xp', amount: 5, label: 'Signals read' }],
};
