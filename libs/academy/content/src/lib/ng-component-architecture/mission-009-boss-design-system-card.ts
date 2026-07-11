import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes boss — the design-system card: the whole block in one
 * component that every team will consume for years.
 */
export const fnCa009BossDesignSystemCard: MissionDefinition = {
  id: 'ca-009-boss-design-system-card',
  campaignId: 'ng-component-architecture',
  title: 'Boss: The Design System Card',
  summary:
    'Design the card component every team will build on — contract, slots, doors and specs, signed off as a public API.',
  difficulty: 'boss',
  learningObjectives: [
    'Design a long-lived component API from the block’s principles',
    'Review a design-system component as a public contract',
    'Sign off architecture that survives consumers you cannot foresee',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'The block finale is the highest-stakes component we own: the design-system Card. Forty teams will consume it; every mistake in its API gets copied forty times and frozen by usage. Design it like a public library, because it is one.',
    },
    {
      speaker: 'Senior Dev',
      text: 'The sheet: header/media/body/footer regions owned by consumers; interactive and elevation behaviour owned by the card; themeable without knowing internals; contract-tested; and — the hard one — evolvable: we must be able to refactor its internals next year without a migration guide.',
    },
  ],
  contextArtefacts: [
    {
      id: 'card-sheet',
      type: 'code',
      title: 'The card requirements sheet',
      language: 'text',
      content:
        '1. header / media / body / footer content: consumer-owned, freely composed\n2. behaviour the card OWNS: elevation, interactive hover/focus, disabled\n3. themeable per consumer — with zero knowledge of card internals\n4. spec-guarded as a CONTRACT (refactors pass, behaviour breaks fail)\n5. evolvable: internals renameable next year, no consumer migrations',
    },
  ],
  challenges: [
    {
      id: 'ca-009-c1',
      type: 'multiple-choice',
      title: 'Stage 1 — Design the API',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'Sheet lines 1–3 fix the API surface. Choose it.',
      prompt: 'Which API matches the sheet?',
      options: [
        {
          id: 'a',
          label:
            'Named projection slots for header/media/footer plus default slot for body; inputs only for owned behaviour (interactive, disabled, elevation: 0|1|2); documented --card-* custom properties as the theming door; internal classes and DOM explicitly private.',
          isCorrect: true,
          feedback:
            'Each sheet line has its mechanism from the block: slots for consumer content (m3), inputs for does-not-shows (m3), custom-property doors (m7), privacy for evolvability (m5, m7). This API can outlive its implementation.',
        },
        {
          id: 'b',
          label:
            'Inputs for everything: title, subtitle, imageUrl, imageAlt, footerActions: Action[], plus theme: "light"|"dark"|"brand" — a fully declarative card that renders itself from data.',
          isCorrect: false,
          feedback:
            'The 14-input biography, published to forty teams: every unforeseen header (a badge! a menu! a live timestamp!) becomes a design-system ticket. Line 1 said consumer-owned.',
        },
        {
          id: 'c',
          label:
            'A minimal shell plus documented internal class names (.card__header, .card__media…) that consumers style directly — CSS is the API, no inputs or slots needed.',
          isCorrect: false,
          feedback:
            'Publishing internal class names IS the ::ng-deep settlement that froze the date-picker — line 5 dies on day one: no internal rename is ever safe again.',
        },
        {
          id: 'd',
          label:
            'Slots for content, but theming via a CardThemeService consumers provide — programmatic theming beats CSS variables for type safety.',
          isCorrect: false,
          feedback:
            'A DI dependency for a colour: every consumer now provides a service to restyle a card, themes cannot cascade from plain CSS, and the card stops working in contexts without the provider. The platform door (custom properties) was already built.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Map lines 1, 2, 3 to the block’s mechanisms before reading options.' },
        { level: 2, title: 'Concept', content: 'Slots for shows, inputs for does, custom properties for theming, privacy for evolution.' },
        { level: 3, title: 'Specific clue', content: 'Which option lets a consumer add a header badge WITHOUT a design-system ticket?' },
        { level: 4, title: 'Guided solution', content: 'Slots + behaviour inputs + --card-* doors.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'API designed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 8,
          reason: 'The declarative card shipped — the design-system backlog became forty teams’ header requests in a queue.',
        },
      ],
      helpLinks: [
        { topicId: 'arch.content-projection', label: 'Content projection' },
        { topicId: 'arch.encapsulation', label: 'Style encapsulation' },
      ],
      successFeedback: 'An API of slots, behaviour and doors — forty teams can build without asking permission.',
      failureFeedback: 'Test each option against line 5: what can the card team rename next year?',
    },
    {
      id: 'ca-009-c2',
      type: 'code-review',
      title: 'Stage 2 — Review the Implementation',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext: 'The card’s first implementation arrives. Review it as the public API it is about to become.',
      prompt: 'Select every real issue — and nothing that is fine.',
      artefacts: [
        {
          id: 'card-impl',
          type: 'code',
          title: 'card.component.ts (proposed)',
          language: 'ts',
          content:
            "@Component({\n  selector: 'ds-card',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  template: `\n    <div class=\"card\" [class.card--interactive]=\"interactive()\">\n      <header><ng-content select=\"[card-header]\" /></header>\n      <ng-content select=\"[card-media]\" />\n      <div class=\"card__body\"><ng-content /></div>\n      <footer><ng-content select=\"[card-footer]\" /></footer>\n    </div>\n  `,\n})\nexport class CardComponent {\n  readonly interactive = input(false);\n  readonly elevation = input<0 | 1 | 2>(1);\n  readonly clicked = output<MouseEvent>();\n\n  @HostListener('click', ['$event'])\n  onClick(e: MouseEvent) {\n    this.clicked.emit(e);\n    (e.target as HTMLElement).closest('.card')?.classList.add('card--pressed');\n  }\n}",
        },
      ],
      findings: [
        {
          id: 'clicked-always-emits',
          label:
            'clicked emits on EVERY click — interactive or not, including clicks on projected buttons inside the footer: consumers wiring (clicked) get phantom activations from their own inner controls, and non-interactive cards still emit; the output must respect interactive() and ignore clicks originating in projected interactive content',
          isCorrect: true,
          feedback:
            'A design-system output is a promise at scale: “card activated” must mean the CARD, when interactive. As written, every footer button double-fires its parent’s card handler — forty teams will each rediscover this.',
        },
        {
          id: 'classlist-mutation',
          label:
            'The handler mutates the DOM directly (classList.add("card--pressed")) — imperative state outside Angular’s rendering: never removed (pressed forever), invisible to OnPush reasoning, and it bypasses the [class.x] binding pattern the same template already uses',
          isCorrect: true,
          feedback:
            'Pressed-state belongs to a signal bound in the template ([class.card--pressed]="pressed()") with proper add/remove lifecycle — imperative classList writes are furniture nailed to the floor mid-render.',
        },
        {
          id: 'elevation-unused',
          label: 'The elevation input is declared but not visibly consumed in the template — dead API that consumers will set with no effect',
          isCorrect: false,
          feedback:
            'It is consumed — via host binding or the stylesheet (host-context/[attr] patterns live outside the inline template snippet). Flagging inputs as dead from a template excerpt alone is a review overreach; verify before accusing.',
        },
        {
          id: 'mouseevent-payload',
          label: 'clicked’s MouseEvent payload leaks DOM mechanics — a design-system output should emit void or a semantic payload',
          isCorrect: false,
          feedback:
            'Defensible either way: activation events often legitimately carry the native event (modifier keys, coordinates for menus). Mission 2’s naming rule concerned the NAME and authority level; a MouseEvent payload on an activation output is a judgement call, not a defect.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Click a footer button as a consumer. Then find who ever removes card--pressed.' },
        { level: 2, title: 'Concept', content: 'Outputs promise semantics; view state lives in bound signals, not classList.' },
        { level: 3, title: 'Specific clue', content: 'Two findings are review overreach — one accuses from missing context, one relitigates a judgement call.' },
        { level: 4, title: 'Guided solution', content: 'Flag the unguarded output and the classList mutation.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Implementation reviewed' }],
      consequences: [
        {
          type: 'stability',
          delta: -7,
          reason: 'The phantom activations shipped to forty teams — “clicking Save also opens the card” became the design system’s first famous bug.',
        },
      ],
      helpLinks: [
        { topicId: 'arch.io-contracts', label: 'Input/output contracts' },
        { topicId: 'arch.encapsulation', label: 'Style encapsulation' },
      ],
      successFeedback: 'The output guarded, the imperative nail removed, the overreaches declined — a public API worth publishing.',
      failureFeedback: 'Play consumer: wire (clicked) to open a details view, then click the footer’s Delete button. What happens?',
    },
    {
      id: 'ca-009-c3',
      type: 'contract-comparison',
      title: 'Stage 3 — Sign Off the Card',
      difficulty: 'boss',
      tags: ['angular'],
      storyContext: 'Two finished cards remain, both implementing the slot/input/door API. Sheet lines 4 and 5 decide.',
      prompt: 'Which card ships to forty teams?',
      options: [
        {
          id: 'a',
          label:
            'Card A: contract specs (renders projected content per slot; interactive card emits on card-click, not footer-button clicks; disabled emits nothing; --card-* doors verified by computed-style assertions); internals undocumented and lint-guarded against consumer ::ng-deep; a published README documenting slots, inputs, outputs and doors as THE api.',
          isCorrect: true,
          feedback:
            'Lines 4 and 5 delivered: specs that pin behaviour consumers rely on (including the phantom-click regression), doors verified as contract, internals free to change because nothing outside the README is promised. This card can be refactored next year in silence. Signed.',
        },
        {
          id: 'b',
          label:
            'Card B: the same API plus a snapshot test of the full rendered DOM per variant (“maximum regression coverage”), and internal class names included in the README “for advanced consumers”.',
          isCorrect: false,
          feedback:
            'Two future freezes: DOM snapshots fail on every internal change (line 5’s refactor now requires blessing 40 snapshot diffs — teams learn to approve without reading), and documented internals are the date-picker settlement again — “advanced consumers” means “consumers you can never break”, which means internals you can never touch.',
        },
        {
          id: 'c',
          label:
            'Card B’s API with specs deferred to the consuming teams — “forty teams testing their own usage covers more ground than any central suite”.',
          isCorrect: false,
          feedback:
            'Line 4 outsourced is line 4 deleted: consumer tests pin consumer flows, not the card’s contract — the first card refactor breaks forty suites in forty different ways, and the card team learns about its own API from other people’s failures.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Line 5 is the discriminator: simulate “rename every internal class” against each candidate.' },
        { level: 2, title: 'Concept', content: 'Snapshots freeze implementations; contract specs freeze promises.' },
        { level: 3, title: 'Specific clue', content: '“For advanced consumers” is how privacy dies politely.' },
        { level: 4, title: 'Guided solution', content: 'Sign contract-specs-plus-guarded-privacy.' },
      ],
      rewards: [{ type: 'xp', amount: 100, label: 'Card signed' }],
      consequences: [
        {
          type: 'stability',
          delta: -8,
          reason: 'The snapshot card shipped — its first internal refactor produced forty diff approvals and one unnoticed real regression.',
        },
        {
          type: 'team-confidence',
          delta: -4,
          reason: 'The design system’s flagship became the component teams feared upgrading — adoption stalled at eleven of forty.',
        },
      ],
      helpLinks: [
        { topicId: 'arch.testing-contracts', label: 'Testing contracts' },
        { topicId: 'arch.reuse-boundaries', label: 'Reuse boundaries' },
      ],
      successFeedback:
        'Consumer-owned content, card-owned behaviour, doored theming, contract specs, private internals — a component built to outlive its implementation. Campaign complete.',
      failureFeedback:
        'Run next year’s refactor against each candidate: who has to approve what, and what real regression hides in the noise?',
    },
  ],
  reflectionPrompt: 'Take our most-consumed shared component: what is actually documented as its API — and what have consumers coupled to anyway?',
  rewards: [{ type: 'xp', amount: 25, label: 'Card published' }],
};
