import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — component communication: parents mediate siblings, stores
 * mediate strangers, and output chains through layers are a smell.
 */
export const fnCa006Communication: MissionDefinition = {
  id: 'ca-006-communication',
  campaignId: 'ng-component-architecture',
  title: 'Who Talks to Whom',
  summary:
    'Siblings talk through their parent; strangers talk through a store — and an output relayed through four layers is a component asking to move.',
  difficulty: 'medium',
  learningObjectives: [
    'Route sibling communication through the shared parent',
    'Choose store mediation for distant components',
    'Recognise output-relay chains as structure feedback',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session six’s exhibit: the (filterChanged) output. Born in a dropdown, relayed by its toolbar, relayed by the toolbar’s section, relayed by the page — four hops of (filterChanged)="filterChanged.emit($event)" to reach the component that cares.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The routing table is short. Parent↔child: inputs and outputs, one hop. SIBLINGS: through the shared parent — it owns the state they share. STRANGERS (different pages, distant branches): through a store. And when an output needs relaying through layers that do not care, the structure is talking: either the state wants to live higher, or the components want to live closer.',
    },
  ],
  contextArtefacts: [
    {
      id: 'relay-chain',
      type: 'code',
      title: 'The four-hop relay',
      language: 'text',
      content:
        'FilterDropdown --(filterChanged)--> Toolbar --(filterChanged)--> \nSection --(filterChanged)--> Page ──> ResultsList [filter input]\n\nevery middle layer: @Output() filterChanged = new EventEmitter();\n                    (filterChanged)="filterChanged.emit($event)"\n(three components that do not care, contractually obliged to relay)',
    },
  ],
  challenges: [
    {
      id: 'ca-006-c1',
      type: 'multiple-choice',
      title: 'End the Relay',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'The four-hop (filterChanged) chain is on screen. The filter and the results list live on the same page, far apart in the tree.',
      prompt: 'What is the structural fix?',
      options: [
        {
          id: 'a',
          label:
            'The filter is page-level state that two distant branches share: lift it — a page-scoped store (or the URL, per the state campaign: filters are shareable choices) that the dropdown writes and the list reads. The three relay contracts are deleted, and new consumers subscribe without touching anyone.',
          isCorrect: true,
          feedback:
            'The relay was the tree telling you the state lived too low. Lifted (and honestly, ?filter= in the URL is its truest home), every layer between drops out of the conversation.',
        },
        {
          id: 'b',
          label: 'Keep the chain but generate the relays with a base class — RelayingComponent removes the boilerplate.',
          isCorrect: false,
          feedback:
            'Automating the relay preserves the coupling: every middle layer still re-compiles, re-tests and re-ships for a contract it does not care about.',
        },
        {
          id: 'c',
          label: 'Have the dropdown inject the ResultsList component directly and call setFilter on it.',
          isCorrect: false,
          feedback:
            'Component-injecting-component welds two leaves across the tree — untestable apart, unusable apart, and it breaks the moment the list moves.',
        },
        {
          id: 'd',
          label: 'A global EventBusService with a filterChanged$ subject — any component can emit, any can listen.',
          isCorrect: false,
          feedback:
            'The bus deletes the hops AND the structure: anonymous emitters, anonymous listeners, no owner — the debugging story is “search the app for who emits this string”.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The middle layers do not care. What does that say about where the state lives?' },
        { level: 2, title: 'Concept', content: 'Distant branches sharing state = lift to a store (or the URL).' },
        { level: 3, title: 'Specific clue', content: 'The state campaign already classified filters. What kind were they?' },
        { level: 4, title: 'Guided solution', content: 'Lift the filter; delete the relays.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Relay retired' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'A fifth hop was added for the export button — the relay chain became the page’s load-bearing wall.',
        },
      ],
      helpLinks: [
        { topicId: 'arch.io-contracts', label: 'Input/output contracts' },
        { topicId: 'state.kinds', label: 'Kinds of state' },
      ],
      successFeedback: 'State lifted to where its consumers can reach it — the middlemen are free.',
      failureFeedback: 'Count the components that must change to add ONE new filter consumer, per option.',
    },
    {
      id: 'ca-006-c2',
      type: 'code-review',
      title: 'Review the Conversations',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'The wizard feature lands: a stepper parent with three step children. Review how everyone talks.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'wizard-comms',
          type: 'code',
          title: 'wizard components (proposed)',
          language: 'ts',
          content:
            "// step-two.component.ts\nexport class StepTwoComponent {\n  private readonly wizard = inject(WizardComponent); // grab the parent\n  next() {\n    this.wizard.currentStep.set(3);\n    this.wizard.stepTwoData = this.form.getRawValue();\n  }\n}\n\n// step-three.component.ts\nexport class StepThreeComponent {\n  readonly summary = input.required<WizardSummary>();\n  readonly confirmed = output<void>();\n}\n\n// wizard.component.html\n<app-step-three\n  *ngIf=\"currentStep() === 3\"\n  [summary]=\"summary()\"\n  (confirmed)=\"submit()\"\n/>",
        },
      ],
      findings: [
        {
          id: 'child-injects-parent',
          label:
            'StepTwo injects WizardComponent and drives it directly — setting currentStep and writing stepTwoData onto the parent: the child steers the wizard, is welded to this exact parent class, and cannot be tested or reused without it',
          isCorrect: true,
          feedback:
            'Inverted control: children REPORT (stepCompleted output with the data); the parent decides what step comes next. Component-injection of parents is the relay chain’s evil twin — one hop, total coupling.',
        },
        {
          id: 'parent-property-write',
          label:
            'stepTwoData is a plain public property mutated from outside — no signal, no method, no owner: the wizard’s state can be poked by anything holding its reference, and nothing re-renders on the write',
          isCorrect: true,
          feedback:
            'Both the state campaign’s and mission 2’s rules in one line: state mutates through named methods on its owner, and view state that is not a signal is invisible to OnPush.',
        },
        {
          id: 'step-three-contract',
          label: 'StepThree’s input/output contract is under-powered — steps need a reference to the wizard for navigation, like StepTwo has',
          isCorrect: false,
          feedback:
            'Backwards: StepThree is the healthy one — summary in, intent out, parent decides. It is StepTwo that needs to become like StepThree, not the reverse.',
        },
        {
          id: 'ngif-recreation',
          label: 'The *ngIf destroys and recreates steps on navigation — steps should be hidden with CSS to preserve their form state',
          isCorrect: false,
          feedback:
            'Destroy-on-leave is a legitimate default (fresh validation, less live DOM); form persistence belongs in the parent’s state, not in keeping dead steps warm. A design choice, not a defect.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Compare StepTwo’s and StepThree’s relationships with the parent.' },
        { level: 2, title: 'Concept', content: 'Children report intent; parents own navigation and state.' },
        { level: 3, title: 'Specific clue', content: 'Who can write stepTwoData, and what notices when they do?' },
        { level: 4, title: 'Guided solution', content: 'Flag the parent injection and the naked property write.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Conversations reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'StepTwo steered the wizard past validation — users reached the summary with step data nobody checked.',
        },
      ],
      helpLinks: [
        { topicId: 'arch.io-contracts', label: 'Input/output contracts' },
        { topicId: 'state.signal-store', label: 'Signal stores' },
      ],
      successFeedback: 'Children report, parents decide, state has one owner — the wizard talks properly.',
      failureFeedback: 'One step is the pattern; one step is the anti-pattern. Which direction does control flow in each?',
    },
  ],
  reflectionPrompt: 'Grep our outputs for emit($event) one-liners: how many relay chains are asking for their state to be lifted?',
  rewards: [{ type: 'xp', amount: 10, label: 'Channels routed' }],
};
