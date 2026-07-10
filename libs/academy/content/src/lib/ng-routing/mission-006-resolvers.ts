import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — resolvers and route data: fetch-before-activate, the
 * trade against in-component loading states, and reviewing a data wiring.
 */
export const fnRt006Resolvers: MissionDefinition = {
  id: 'rt-006-resolvers',
  campaignId: 'ng-routing',
  title: 'Data Before the Door Opens',
  summary:
    'A resolver fetches while the navigation is in flight — the component activates with data in hand, at the price of a delayed transition.',
  difficulty: 'medium',
  learningObjectives: [
    'Wire a functional resolver and read its data in the component',
    'Weigh resolver-first against activate-then-load UX',
    'Review route data wiring for the classic failure modes',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session six, the spinner debate: every detail page rendered instantly and then showed a spinner where the content should be. Product hated the “skeleton flash”. Someone said “resolvers fix this” — and someone else said “resolvers CAUSED our frozen nav last year”. Both were right.',
    },
    {
      speaker: 'Senior Dev',
      text: 'A resolver runs DURING navigation: the URL changes only after the data arrives, and the component is born with data. The cost is honesty about time — the click feels dead while the fetch runs unless you show navigation progress. It is a trade, not an upgrade.',
    },
  ],
  contextArtefacts: [
    {
      id: 'resolver-wiring',
      type: 'code',
      title: 'Functional resolver, wired',
      language: 'ts',
      content:
        "export const projectResolver: ResolveFn<Project> = (route) =>\n  inject(ProjectApi).byId(route.paramMap.get('id')!);\n\n{\n  path: 'project/:id',\n  component: ProjectDetailComponent,\n  resolve: { project: projectResolver },\n}\n\n// component — data arrives resolved, keyed by 'project'\nreadonly project = toSignal(\n  this.route.data.pipe(map((d) => d['project'] as Project))\n);",
    },
  ],
  challenges: [
    {
      id: 'rt-006-c1',
      type: 'multiple-choice',
      title: 'The Trade, Stated',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'The two war stories are on the table: skeleton flash without resolvers, frozen nav with them.',
      prompt: 'What is the honest statement of the resolver trade?',
      options: [
        {
          id: 'a',
          label: 'Resolvers are faster — fetching during navigation parallelises the request with route matching.',
          isCorrect: false,
          feedback:
            'The fetch takes the same time either way — the trade is about WHERE the waiting is felt, not how long it is.',
        },
        {
          id: 'b',
          label: 'Resolvers are legacy — signals and component fetching replaced them entirely.',
          isCorrect: false,
          feedback:
            'They remain the right tool when a page is meaningless without its data — the mechanism is current; only the dogma expired.',
        },
        {
          id: 'c',
          label: 'Resolvers eliminate loading states — the component simply never needs a spinner again.',
          isCorrect: false,
          feedback:
            'The loading state MOVED — from inside the page to the navigation itself. Pretending it vanished is how the frozen-nav year happened.',
        },
        {
          id: 'd',
          label:
            'A resolver moves the wait from inside the page (skeleton, then content pops in) to the navigation (click, pause, complete page) — right for pages meaningless without data, wrong without a visible navigation-progress indicator, and it must not swallow errors silently.',
          isCorrect: true,
          feedback:
            'Both war stories explained by one sentence: same wait, different location, and the location has UX obligations.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The fetch duration is fixed. What actually moves?' },
        { level: 2, title: 'Concept', content: 'Resolver = wait during navigation; component fetch = wait after activation.' },
        { level: 3, title: 'Specific clue', content: 'The frozen-nav story is what the trade looks like with no progress UI.' },
        { level: 4, title: 'Guided solution', content: 'Pick the wait-relocation answer with its obligations.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Trade stated' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'The resolver debate re-ran every sprint because nobody wrote the trade down.',
        },
      ],
      helpLinks: [{ topicId: 'routing.resolvers', label: 'Resolvers & route data' }],
      successFeedback: 'Waits relocate; they never vanish. Decisions get easy once that is said aloud.',
      failureFeedback: 'Where does the user spend the 800ms in each design? Answer per option.',
    },
    {
      id: 'rt-006-c2',
      type: 'code-review',
      title: 'Review the Data Wiring',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext: 'A teammate converts the invoice page to resolver-first. Review before merge.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'invoice-resolver',
          type: 'code',
          title: 'invoice.resolver.ts + component read (proposed)',
          language: 'ts',
          content:
            "export const invoiceResolver: ResolveFn<Invoice | null> = (route) =>\n  inject(InvoiceApi)\n    .byId(route.paramMap.get('id')!)\n    .pipe(catchError(() => of(null)));\n\n{ path: 'invoice/:id', component: InvoicePage, resolve: { invoice: invoiceResolver } }\n\n// invoice-page.component.ts\nexport class InvoicePage {\n  private readonly data = inject(ActivatedRoute).snapshot.data;\n  readonly invoice = this.data['invoice'] as Invoice;\n  readonly total = computed(() => this.invoice.lines.reduce((s, l) => s + l.amount, 0));\n}",
        },
      ],
      findings: [
        {
          id: 'swallow-to-null',
          label:
            'catchError(() => of(null)) makes a failed fetch “succeed” with null — navigation completes into a page whose data is a lie, and the typed-as-Invoice read crashes on .lines',
          isCorrect: true,
          feedback:
            'A resolver that cannot resolve should cancel or redirect (return a UrlTree, or let the error surface to a handler) — of(null) converts a network failure into a downstream TypeError with a clean stack.',
        },
        {
          id: 'resolvefn-inject',
          label: 'ResolveFn cannot use inject() — resolvers must be class-based with constructor injection to access services',
          isCorrect: false,
          feedback:
            'Functional resolvers run in an injection context — inject(InvoiceApi) is the intended modern form; class resolvers are the legacy one.',
        },
        {
          id: 'snapshot-data-read',
          label:
            'The component reads route data via snapshot at construction — invoice/7 → invoice/8 reuses the instance, the resolver re-runs, but this page keeps showing invoice 7',
          isCorrect: true,
          feedback:
            'Mission 2’s freeze, resolver edition: resolved data UPDATES on param change but the snapshot photo does not. Read route.data as a stream (or router-bound input).',
        },
        {
          id: 'total-computed',
          label: 'Deriving total in a computed duplicates server logic — the API should return the total and the client should trust it',
          isCorrect: false,
          feedback:
            'Displaying a sum of lines you already hold is presentation, not business logic — a memoised derivation is exactly the signals-campaign pattern. (Whether the SERVER also validates totals is a payment question, not this page’s.)',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Chase two failures: a fetch that fails, and a param that changes.' },
        { level: 2, title: 'Concept', content: 'Resolvers must fail loudly; resolved data is a stream like params.' },
        { level: 3, title: 'Specific clue', content: 'The inject() and the computed are the healthy lines.' },
        { level: 4, title: 'Guided solution', content: 'Flag the null-swallow and the snapshot data read.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Wiring reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Failed invoice fetches “navigated successfully” into a crash — the error report blamed the reduce().',
        },
      ],
      helpLinks: [
        { topicId: 'routing.resolvers', label: 'Resolvers & route data' },
        { topicId: 'routing.params', label: 'Route params' },
      ],
      successFeedback: 'Loud failures, live reads — resolver wiring that survives both war stories.',
      failureFeedback: 'Walk invoice/7 → invoice/8 through this code. Then walk a 500 response through it.',
    },
  ],
  reflectionPrompt: 'Which of our pages shows a skeleton flash that a resolver (plus a nav progress bar) would remove — and which resolver silently swallows its errors?',
  rewards: [{ type: 'xp', amount: 10, label: 'Data delivered' }],
};
