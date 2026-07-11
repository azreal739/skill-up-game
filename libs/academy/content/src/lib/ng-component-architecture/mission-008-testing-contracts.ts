import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — testing component contracts: specs against inputs,
 * outputs and rendered DOM, never against private internals.
 */
export const fnCa008TestingContracts: MissionDefinition = {
  id: 'ca-008-testing-contracts',
  campaignId: 'ng-component-architecture',
  title: 'Test the Door, Not the Furniture',
  summary:
    'A component’s spec exercises its contract — set inputs, interact with the DOM, assert render and outputs — so refactors pass and behaviour changes fail.',
  difficulty: 'hard',
  learningObjectives: [
    'Write specs that drive components through inputs and DOM events',
    'Assert on rendered output and emitted intent, not private fields',
    'Recognise internals-coupled tests as refactoring handcuffs',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session eight opened with a metric: the last presentational-layer refactor — zero behaviour change, confirmed by QA — broke 41 specs. Every one asserted on something users can’t see: private fields, method call counts, internal class names.',
    },
    {
      speaker: 'Senior Dev',
      text: 'A spec should fail when BEHAVIOUR changes and pass when IMPLEMENTATION changes. The way to get that: test through the same contract the parent uses — set inputs, click rendered elements, read rendered text, spy the outputs. If the spec mentions something the template and the parent cannot see, it is testing furniture arrangement.',
    },
  ],
  contextArtefacts: [
    {
      id: 'contract-spec',
      type: 'code',
      title: 'A contract spec',
      language: 'ts',
      content:
        "it('requests deletion when the delete action is chosen', () => {\n  const fixture = TestBed.createComponent(OrderRowComponent);\n  fixture.componentRef.setInput('order', makeOrder({ id: '42' }));\n  const deleted = jasmine.createSpy();\n  fixture.componentInstance.deleteRequested.subscribe(deleted);\n  fixture.detectChanges();\n\n  fixture.nativeElement.querySelector('[data-testid=\"delete\"]').click();\n\n  expect(deleted).toHaveBeenCalledWith('42');\n});",
    },
  ],
  challenges: [
    {
      id: 'ca-008-c1',
      type: 'multiple-choice',
      title: 'The 41 Broken Specs',
      difficulty: 'hard',
      tags: ['angular', 'testing'],
      storyContext:
        'Sample from the 41: expect(component["isExpanded"]).toBe(true); expect(component.toggleSpy).toHaveBeenCalledTimes(2); expect(el.querySelector(".row__inner--v2")).toBeTruthy().',
      prompt: 'What is wrong with these specs, precisely?',
      options: [
        {
          id: 'a',
          label: 'Nothing intrinsic — they broke because the refactor forgot to update them; specs and code move together.',
          isCorrect: false,
          feedback:
            '“Update the specs to match the new internals” means the specs verify whatever the code currently does — a test that can never catch a regression, only a diff.',
        },
        {
          id: 'b',
          label: 'They are under-specified — asserting internals AND rendered output together would have survived.',
          isCorrect: false,
          feedback: 'Adding contract assertions on top of internals assertions keeps the handcuffs and adds a watch.',
        },
        {
          id: 'c',
          label:
            'Each asserts implementation, not contract: a private field (users see the expanded PANEL, not the flag), a call count (users see effects, not invocations), an internal class name (the rename that broke four features in mission 7, as a test). Rewritten against the contract — click, then assert the panel is visible — all 41 would have passed the refactor and still catch real breaks.',
          isCorrect: true,
          feedback:
            'The refactor was the test OF the tests, and they failed it: green on behaviour change is the only failure a spec suite cannot afford — but red on refactor is the failure it pays daily.',
        },
        {
          id: 'd',
          label: 'They use string selectors — component harnesses would have absorbed the changes automatically.',
          isCorrect: false,
          feedback:
            'Harnesses are a fine tool, but they package the same principle — interact via public surface. Adopting them while still asserting private fields changes nothing.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each assertion ask: can the PARENT or the USER observe this?' },
        { level: 2, title: 'Concept', content: 'Fail on behaviour change, pass on implementation change — the spec quality bar.' },
        { level: 3, title: 'Specific clue', content: 'What does the user see when isExpanded flips? Assert THAT.' },
        { level: 4, title: 'Guided solution', content: 'Pick the implementation-vs-contract answer.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Handcuffs named' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The 41 specs were “fixed” to match the new internals — the suite became a mirror that always agrees.',
        },
      ],
      helpLinks: [
        { topicId: 'arch.testing-contracts', label: 'Testing contracts' },
        { topicId: 'testing.unit-tests', label: 'Unit tests' },
      ],
      successFeedback: 'Specs aimed at the contract — refactors sail, regressions ring.',
      failureFeedback: 'The refactor changed zero behaviour. What property must a spec have to pass it?',
    },
    {
      id: 'ca-008-c2',
      type: 'code-review',
      title: 'Review the Spec',
      difficulty: 'hard',
      tags: ['angular', 'testing'],
      storyContext: 'A teammate rewrites the expander’s spec “contract-style” after the session. Review it.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'expander-spec',
          type: 'code',
          title: 'expander.component.spec.ts (proposed)',
          language: 'ts',
          content:
            "it('expands when the header is clicked', () => {\n  fixture.componentRef.setInput('label', 'Details');\n  fixture.detectChanges();\n\n  fixture.componentInstance.toggle(); // simulate the click\n  fixture.detectChanges();\n\n  expect(fixture.nativeElement.querySelector('.expander__body')).toBeTruthy();\n});\n\nit('emits collapsed state', () => {\n  const emitted: boolean[] = [];\n  fixture.componentInstance.toggled.subscribe((v: boolean) => emitted.push(v));\n\n  fixture.componentInstance['expanded'].set(true);\n  fixture.componentInstance['expanded'].set(false);\n\n  expect(emitted).toEqual([]); // BUG? we expected [true, false]\n  // note: output only fires from toggle(); setting the signal directly skips it.\n  // keeping assertion as [] so the test passes.\n});",
        },
      ],
      findings: [
        {
          id: 'toggle-not-click',
          label:
            'The first spec calls componentInstance.toggle() instead of clicking the rendered header — the template wiring (the click binding, the button’s existence, its disabled state) is exactly what goes untested, so a template that loses its (click) still passes',
          isCorrect: true,
          feedback:
            '“Simulate the click” by skipping the click tests the method, not the component: dispatch the real DOM click on the header — the one thing users actually do.',
        },
        {
          id: 'assert-empty-kept',
          label:
            'The second spec drives a PRIVATE signal, observes the output not firing, and then enshrines that as the expectation ([]) so the test passes — a spec reverse-engineered from broken interaction, asserting that nothing happens',
          isCorrect: true,
          feedback:
            'A test written to pass rather than to specify: drive the contract (real clicks), expect the contract ([true, false] emitted). As written it guards nothing and documents confusion.',
        },
        {
          id: 'css-class-query',
          label: 'querySelector(".expander__body") couples the spec to a style class name — it must use a data-testid instead',
          isCorrect: false,
          feedback:
            'A fair PREFERENCE (testids decouple from styling), but a stable structural class is a defensible query — this is convention, not a defect on par with the two broken specs.',
        },
        {
          id: 'no-collapse-assert',
          label: 'The first spec never asserts the body is ABSENT before the click — expansion tests need the before-state proven',
          isCorrect: false,
          feedback:
            'Nice-to-have rigour, cheap to add — but the body defaults collapsed via the component’s initial state, and its absence-before is implied by the creation test above it (not shown). Missing polish, not a broken spec.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Find every line where the spec bypasses the DOM or the public API.' },
        { level: 2, title: 'Concept', content: 'Drive with real interactions; expect the contract, not the current behaviour.' },
        { level: 3, title: 'Specific clue', content: 'The comment in spec two confesses. Read it as a bug report.' },
        { level: 4, title: 'Guided solution', content: 'Flag the toggle() shortcut and the enshrined-empty assertion.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Spec reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The template lost its click binding in a merge — the suite stayed green while the expander stopped expanding.',
        },
      ],
      helpLinks: [
        { topicId: 'arch.testing-contracts', label: 'Testing contracts' },
        { topicId: 'di.testing', label: 'Overriding providers in tests' },
      ],
      successFeedback: 'Real clicks in, contract expectations out — the spec now guards the component, not the mood.',
      failureFeedback: 'Which spec would stay green if the header’s (click) binding vanished? That is the tell.',
    },
  ],
  reflectionPrompt: 'Take our most-refactored component: would its spec survive a zero-behaviour rewrite — and would it catch a lost click binding?',
  rewards: [{ type: 'xp', amount: 15, label: 'Contracts guarded' }],
};
