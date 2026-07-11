import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — component tests: DOM-driven, contract-asserting, with
 * fixture mechanics (detectChanges, async) handled honestly.
 */
export const fnTe004ComponentTests: MissionDefinition = {
  id: 'te-004-component-tests',
  campaignId: 'ng-testing',
  title: 'The Component on the Bench',
  summary:
    'Component tests drive the rendered DOM through the fixture — inputs set, changes detected, clicks dispatched, contract asserted.',
  difficulty: 'medium',
  learningObjectives: [
    'Drive component tests through fixture, DOM and real events',
    'Handle detectChanges and async rendering honestly',
    'Assert the contract: rendered output and emitted intent',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session four put a component on the bench, live: the notification bell. Write the spec together, no shortcuts. The room’s first three suggestions were all shortcuts.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The architecture block gave us the WHAT (test the contract); this session is the HOW. The fixture is your hands: setInput to feed it, detectChanges to let it render (nothing renders for free in a test), nativeElement queries and real dispatched events to interact. If the spec never touches the DOM, it is testing a class that happens to have a template.',
    },
  ],
  contextArtefacts: [
    {
      id: 'bench-setup',
      type: 'code',
      title: 'The bench, standard issue',
      language: 'ts',
      content:
        "const fixture = TestBed.createComponent(NotificationBellComponent);\nfixture.componentRef.setInput('notifications', [makeNote(), makeNote()]);\nfixture.detectChanges(); // render the inputs — nothing renders for free\n\nconst badge = fixture.nativeElement.querySelector('[data-testid=\"badge\"]');\nexpect(badge.textContent.trim()).toBe('2');\n\nbadge.click();\nfixture.detectChanges(); // render the consequences\nexpect(fixture.nativeElement.querySelector('[data-testid=\"panel\"]')).toBeTruthy();",
    },
  ],
  challenges: [
    {
      id: 'te-004-c1',
      type: 'multiple-choice',
      title: 'Why the Badge Shows Nothing',
      difficulty: 'medium',
      tags: ['testing', 'angular'],
      storyContext:
        'First attempt on the bench: setInput called, then immediately querySelector — badge.textContent is "". The component works fine in the app.',
      prompt: 'Why is the badge empty in the test?',
      options: [
        {
          id: 'a',
          label:
            'Nothing has rendered: in the app, change detection runs automatically after events; on the bench, the TEST owns the clock — fixture.detectChanges() must run after every state change (setInput, clicks) for the template to reflect it. The empty badge is the DOM from before time started.',
          isCorrect: true,
          feedback:
            'The bench hands you the scheduler. detectChanges after arrange, detectChanges after act — the rhythm of every component spec.',
        },
        {
          id: 'b',
          label: 'setInput is asynchronous — await fixture.whenStable() before any DOM query.',
          isCorrect: false,
          feedback:
            'setInput applies synchronously — whenStable is for pending ASYNC work (timers, promises), not for the missing render pass.',
        },
        {
          id: 'c',
          label: 'querySelector cannot see Angular bindings — the test must read component.notifications().length instead.',
          isCorrect: false,
          feedback:
            'Retreating to the class abandons the point of the bench: the DOM is queryable — it just has not been rendered yet.',
        },
        {
          id: 'd',
          label: 'The testid attribute is stripped by the test build — query by class instead.',
          isCorrect: false,
          feedback: 'Nothing strips attributes — the element is found fine; its CONTENT awaits a render pass.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Who runs change detection in the app? Who runs it on the bench?' },
        { level: 2, title: 'Concept', content: 'Tests own the clock: detectChanges renders what state changed.' },
        { level: 3, title: 'Specific clue', content: 'The artefact calls detectChanges twice. Count why.' },
        { level: 4, title: 'Guided solution', content: 'Pick the-test-owns-the-clock.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Clock claimed' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'The empty badge got “fixed” with a setTimeout in the spec — the first flaky test of the next mission was born.',
        },
      ],
      helpLinks: [
        { topicId: 'test.behaviour', label: 'Testing behaviour' },
        { topicId: 'arch.testing-contracts', label: 'Testing contracts' },
      ],
      successFeedback: 'Arrange, render, act, render, assert — the bench’s heartbeat.',
      failureFeedback: 'In the app, what runs after every click that the bench does not run for you?',
    },
    {
      id: 'te-004-c2',
      type: 'multiple-choice',
      title: 'The Async Render',
      difficulty: 'medium',
      tags: ['testing', 'angular'],
      storyContext:
        'Next bench case: the bell’s panel loads notifications on open — toSignal over a service observable. The spec stubs the service with of(notes), clicks the bell, detectChanges — and SOMETIMES needs one more detectChanges depending on how the stub emits. The team debates making it deterministic.',
      prompt: 'What is the honest way to handle async rendering in component specs?',
      options: [
        {
          id: 'a',
          label: 'Sprinkle detectChanges until green, then delete one at a time until red, keep the minimum — empirically correct.',
          isCorrect: false,
          feedback:
            'Green-by-bisection encodes today’s emission timing as magic — the next RxJS operator change re-runs the ritual with no understanding gained.',
        },
        {
          id: 'b',
          label: 'await new Promise(r => setTimeout(r, 50)) after the click — real time settles all schedulers uniformly.',
          isCorrect: false,
          feedback:
            'Real sleeps are the flake factory: 50ms is forever on your laptop and sometimes-not-enough in CI. Time in tests should be controlled, never awaited.',
        },
        {
          id: 'c',
          label: 'Emit synchronously in stubs whenever possible (of() does); when the code genuinely schedules — timers, debounce — use fakeAsync with tick(300) to advance controlled time, then detectChanges. Deterministic by construction, and the tick documents the delay it stands for.',
          isCorrect: true,
          feedback:
            'Two honest modes: synchronous stubs where the code allows, controlled time where it schedules. Nothing waits for wall-clocks; every await is legible.',
        },
        {
          id: 'd',
          label: 'Move async component logic into the service layer so component specs never face scheduling at all.',
          isCorrect: false,
          feedback:
            'Sound instinct taken to dogma: debounced inputs and animations legitimately live in components — the bench needs a time tool, not a prohibition.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Separate “emits async by accident” from “schedules on purpose”.' },
        { level: 2, title: 'Concept', content: 'fakeAsync + tick = time as an input you control.' },
        { level: 3, title: 'Specific clue', content: 'What does tick(300) DOCUMENT that sleep(50) hides?' },
        { level: 4, title: 'Guided solution', content: 'Sync stubs + fakeAsync/tick for real scheduling.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Time controlled' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The sleep(50) style spread — the suite gained four minutes of pure waiting and a weather-dependent pass rate.',
        },
      ],
      helpLinks: [
        { topicId: 'test.flaky-discipline', label: 'Flaky tests' },
        { topicId: 'rx.observables', label: 'Observables' },
      ],
      successFeedback: 'Time became an input — the spec runs identically on every machine at any load.',
      failureFeedback: 'Which option produces a test that CANNOT behave differently under CI load?',
    },
  ],
  reflectionPrompt: 'Grep our specs for setTimeout: each one is a place where time is awaited instead of controlled. How many are there?',
  rewards: [{ type: 'xp', amount: 10, label: 'Bench mastered' }],
};
