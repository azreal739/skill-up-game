import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — single source of truth: local copies of shared state,
 * two-way sync traps, and deriving views instead of duplicating them.
 */
export const fnSt004SingleSource: MissionDefinition = {
  id: 'st-004-single-source',
  campaignId: 'ng-state-management',
  title: 'Copies Always Drift',
  summary:
    'The moment state is copied — into a component field, a second store, a form — the copies begin to disagree; read through, derive, or own explicitly.',
  difficulty: 'medium',
  learningObjectives: [
    'Spot local copies of shared state and the sync code that betrays them',
    'Read through to the source with computed views instead',
    'Handle the legitimate copy: editing drafts that diverge on purpose',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session four, one bug three ways: the user renames a project in the dialog, and the dialog shows the new name, the sidebar the old one, the tab title the older one still. Three components, three private copies of one project.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Every copy needs sync code, and sync code is where truth goes to die. The default is: do not copy — read THROUGH to the store with a computed. The one honest copy is the editing draft: a form deliberately diverging from the source until save or cancel. The difference is intent: a draft knows it is a draft.',
    },
  ],
  contextArtefacts: [
    {
      id: 'read-through',
      type: 'code',
      title: 'Copy vs read-through',
      language: 'ts',
      content:
        '// COPY — born stale, needs sync code forever\nngOnInit() {\n  this.project = this.store.projectById(this.id());\n}\n\n// READ-THROUGH — one truth, always current\nreadonly project = computed(() =>\n  this.store.projectById(this.id())\n);',
    },
  ],
  challenges: [
    {
      id: 'st-004-c1',
      type: 'multiple-choice',
      title: 'Three Names, One Project',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'The rename bug on screen: dialog fresh, sidebar stale, tab staler. Each component captured the project in ngOnInit.',
      prompt: 'What is the structural fix?',
      options: [
        {
          id: 'a',
          label: 'Emit a projectRenamed event on a shared bus; each component listens and refreshes its copy.',
          isCorrect: false,
          feedback:
            'Now every component needs a listener per mutation type — rename today, archive tomorrow, transfer next week. Sync code compounding, not shrinking.',
        },
        {
          id: 'b',
          label:
            'Delete the copies: each component holds only the project ID and reads the project itself through a computed against the store. A rename updates the store once; every reader is current by construction — there is nothing left to drift.',
          isCorrect: true,
          feedback:
            'The fix is subtraction: no copies, no sync, no event choreography. IDs travel; objects stay home.',
        },
        {
          id: 'c',
          label: 'Have the rename dialog push the new name into the sidebar and tab components via their inputs.',
          isCorrect: false,
          feedback:
            'The dialog now knows every consumer of project names — add a breadcrumb next sprint and the dialog must learn it exists. Inverted, unscalable coupling.',
        },
        {
          id: 'd',
          label: 'Reload the route after renaming so all components re-run ngOnInit against fresh data.',
          isCorrect: false,
          feedback:
            'A page reload to synchronise three fields — the SPA reboots (routing campaign, mission 1) to hide a state-shape mistake.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Count the copies. The best sync strategy is having nothing to sync.' },
        { level: 2, title: 'Concept', content: 'Hold IDs; read entities through computeds against the store.' },
        { level: 3, title: 'Specific clue', content: 'After the fix, what code runs when a rename lands? (Answer: none — that is the point.)' },
        { level: 4, title: 'Guided solution', content: 'Pick delete-the-copies, read-through.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Copies deleted' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The event-bus sync shipped; the archive feature forgot to emit, and stale projects haunted the sidebar again.',
        },
      ],
      helpLinks: [{ topicId: 'state.single-source', label: 'Single source of truth' }],
      successFeedback: 'Nothing to sync because nothing was copied — drift solved by subtraction.',
      failureFeedback: 'For each option: what NEW code must exist for the NEXT mutation type to stay consistent?',
    },
    {
      id: 'st-004-c2',
      type: 'multiple-choice',
      title: 'The Honest Copy',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Counter-example from the floor: the settings form BINDS the form controls straight to the store’s signals via a custom two-way sync, “so read-through applies everywhere”. Users complain: typing half an email address instantly breaks notifications app-wide, and Cancel does nothing.',
      prompt: 'What did over-applying read-through miss?',
      options: [
        {
          id: 'a',
          label: 'Only debouncing — sync the keystrokes to the store 300ms later and both complaints disappear.',
          isCorrect: false,
          feedback:
            'Debounce ships the half-typed email 300ms later instead — and Cancel still cannot un-ship what already synced.',
        },
        {
          id: 'b',
          label: 'Validation — the store should reject invalid emails on write, keeping the app-wide state clean.',
          isCorrect: false,
          feedback:
            'Store-side validation blocks the WORST writes but the model is still wrong: every valid intermediate state (an old but complete email) also ships before the user decides.',
        },
        {
          id: 'c',
          label: 'Nothing — live-sync settings are a UX choice, and Cancel buttons are legacy from the submit era.',
          isCorrect: false,
          feedback:
            'The complaints in the ticket are the argument against — users express INTENT with save/cancel, and half-typed truth broke real notifications.',
        },
        {
          id: 'd',
          label:
            'That editing is the legitimate copy: a form is a DRAFT — deliberately divergent state, initialised from the store, owned by the form while editing, committed to the store on save and discarded on cancel. Read-through is for displaying truth; drafts are for proposing it.',
          isCorrect: true,
          feedback:
            'The rule has one exception, and it is principled: drafts diverge on purpose, with an explicit commit/discard boundary. Display reads through; editing drafts.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What is a form, in state terms — a view of truth or a proposal for new truth?' },
        { level: 2, title: 'Concept', content: 'Drafts are intentional divergence with commit/discard semantics.' },
        { level: 3, title: 'Specific clue', content: 'What must Cancel be able to do — and what does that require?' },
        { level: 4, title: 'Guided solution', content: 'Pick the form-is-a-draft answer.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Draft honoured' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Live-synced settings shipped — a user’s half-typed email broke their alerts during an incident window.',
        },
      ],
      helpLinks: [
        { topicId: 'state.single-source', label: 'Single source of truth' },
        { topicId: 'forms.typed-controls', label: 'Typed controls' },
      ],
      successFeedback: 'Display reads through; editing drafts; commit is the boundary — the exception that proves the rule.',
      failureFeedback: 'The Cancel button is the tell: what does it need that read-through cannot give?',
    },
  ],
  reflectionPrompt: 'Find one ngOnInit in our app that copies store data into a field: what sync code keeps it honest today — and what happens if that code is deleted?',
  rewards: [{ type: 'xp', amount: 10, label: 'Truth singular' }],
};
