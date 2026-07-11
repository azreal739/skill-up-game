import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — composition over configuration: template context for
 * per-item rendering, and directives as attachable behaviour.
 */
export const fnCa004Composition: MissionDefinition = {
  id: 'ca-004-composition',
  campaignId: 'ng-component-architecture',
  title: 'Compose, Don’t Configure',
  summary:
    'When variation needs per-item context, templates carry it; when behaviour must attach to anything, directives carry it — both beat another flag.',
  difficulty: 'medium',
  learningObjectives: [
    'Pass templates with context for caller-defined item rendering',
    'Extract cross-cutting behaviour into attribute directives',
    'Choose between slots, templates and directives by the variation’s shape',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session four picked up mission 3’s loose end: the data-table. Simple slots cannot help it — every consumer wants to render CELLS differently, and a cell renderer needs the row it is rendering. Static holes have no way to say “here is your item”.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Two tools finish the composition kit. Templates-with-context: the caller hands a TemplateRef, the table stamps it per row with let-row — projection that carries data. And directives: behaviour like “copy on click” or “tooltip on hover” attaches to ANY element as an attribute — behaviour composed on, not configured in.',
    },
  ],
  contextArtefacts: [
    {
      id: 'template-context',
      type: 'code',
      title: 'Projection that carries data',
      language: 'ts',
      content:
        '<!-- caller: defines HOW a cell renders, receives WHICH row -->\n<app-data-table [rows]="orders()">\n  <ng-template let-row #statusCell>\n    <app-status-chip [status]="row.status" />\n  </ng-template>\n</app-data-table>\n\n<!-- table: stamps the caller’s template per row -->\n<ng-container\n  *ngTemplateOutlet="statusCell(); context: { $implicit: row }"\n/>',
    },
  ],
  challenges: [
    {
      id: 'ca-004-c1',
      type: 'multiple-choice',
      title: 'The Cell Renderer Problem',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'The table today: cellType input per column — "text" | "badge" | "currency" | "date" | "link" | "progress", a switch in the template, and a backlog asking for three more types.',
      prompt: 'Why do simple slots not work here, and what does?',
      options: [
        {
          id: 'a',
          label: 'Slots work fine — one ng-content per column lets callers project their cell markup directly.',
          isCorrect: false,
          feedback:
            'Projected content is stamped ONCE where it is written — a static slot cannot render per-row, and the caller’s markup has no way to receive “this row”.',
        },
        {
          id: 'b',
          label: 'Keep the switch but move it to a CellRendererComponent — centralising the types at least contains the growth.',
          isCorrect: false,
          feedback:
            'The switch relocates; the backlog remains: every new cell type is still a table-team PR instead of caller markup.',
        },
        {
          id: 'c',
          label:
            'Templates with context: callers pass an ng-template per column; the table stamps it per row via ngTemplateOutlet with { $implicit: row }. The caller owns cell rendering AND receives the data to do it — the type switch and its backlog dissolve.',
          isCorrect: true,
          feedback:
            'The missing piece named: projection carries no data, templates-with-context do. Custom cells become caller markup, and the table team leaves the cell business.',
        },
        {
          id: 'd',
          label: 'Emit a (renderCell) output per cell and let parents return HTML strings to inject.',
          isCorrect: false,
          feedback:
            'Outputs cannot return values by design — and string-injected HTML abandons sanitisation, binding and components in one move.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What must the caller’s markup RECEIVE to render a cell? Can ng-content pass it?' },
        { level: 2, title: 'Concept', content: 'ng-template + outlet context = projection that carries per-item data.' },
        { level: 3, title: 'Specific clue', content: 'let-row is the whole trick — find the option that provides it.' },
        { level: 4, title: 'Guided solution', content: 'Templates with { $implicit: row } context.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Cells liberated' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'cellType grew to eleven variants — the table team became the bottleneck for every feature that showed data.',
        },
      ],
      helpLinks: [{ topicId: 'arch.composition', label: 'Composition patterns' }],
      successFeedback: 'Projection that carries data — the table renders rows; callers render cells.',
      failureFeedback: 'The caller needs the ROW inside their markup. Which mechanisms can hand it to them?',
    },
    {
      id: 'ca-004-c2',
      type: 'multiple-choice',
      title: 'Behaviour That Attaches',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Next ticket: “copy-to-clipboard on click, with a ✓ flash” — needed on the order id in the table, the API key field, and the invite link button. Three different components, one behaviour.',
      prompt: 'Where does the behaviour live?',
      options: [
        {
          id: 'a',
          label:
            'An attribute directive: <span appCopyOnClick [copyValue]="order.id"> — the behaviour (clipboard write, flash feedback, aria-live announcement) attaches to any element, implemented once, composed onto all three sites without touching their components.',
          isCorrect: true,
          feedback:
            'Directives are behaviour’s home: cross-cutting, element-agnostic, individually testable — the third leg of the composition kit alongside slots and templates.',
        },
        {
          id: 'b',
          label: 'A CopyableTextComponent wrapping the content — components are the unit of reuse and this keeps the kit uniform.',
          isCorrect: false,
          feedback:
            'Wrapping forces every site to restructure its markup around the wrapper — and the invite BUTTON cannot wrap in a text component at all. Behaviour is not a frame.',
        },
        {
          id: 'c',
          label: 'A copyToClipboard(value) util function each of the three components calls from its own click handler.',
          isCorrect: false,
          feedback:
            'The clipboard call is one line — the BEHAVIOUR is click wiring + flash + aria announcement, and the util leaves all of that copy-pasted three times.',
        },
        {
          id: 'd',
          label: 'Add copyable: boolean inputs to the three components — smallest diff, clearest ownership.',
          isCorrect: false,
          feedback:
            'Three components each grow a flag, a handler and a flash — the 14-input biography starting three new volumes at once.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The behaviour must attach to a span, an input field and a button. What attaches to anything?' },
        { level: 2, title: 'Concept', content: 'Directives = behaviour as an attribute; components = structure.' },
        { level: 3, title: 'Specific clue', content: 'Count implementations of the ✓ flash under each option.' },
        { level: 4, title: 'Guided solution', content: 'One attribute directive, three attachment sites.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Behaviour attached' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'Three hand-rolled copies of the copy behaviour drifted — one site flashed forever, one never announced to screen readers.',
        },
      ],
      helpLinks: [{ topicId: 'arch.composition', label: 'Composition patterns' }],
      successFeedback: 'Structure from components, holes from slots, data-holes from templates, behaviour from directives — kit complete.',
      failureFeedback: 'The three sites share no markup, only BEHAVIOUR. Which tool packages behaviour alone?',
    },
  ],
  reflectionPrompt: 'Which behaviour in our app is implemented more than once because it was never given a directive to live in?',
  rewards: [{ type: 'xp', amount: 10, label: 'Kit assembled' }],
};
