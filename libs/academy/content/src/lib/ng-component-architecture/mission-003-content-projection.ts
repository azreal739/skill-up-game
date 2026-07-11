import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — content projection: ng-content and named slots as the
 * composition tool that ends configuration-flag sprawl.
 */
export const fnCa003ContentProjection: MissionDefinition = {
  id: 'ca-003-content-projection',
  campaignId: 'ng-component-architecture',
  title: 'Holes on Purpose',
  summary:
    'ng-content lets a component own the frame while callers own the filling — the alternative is an input flag for every variation forever.',
  difficulty: 'easy',
  learningObjectives: [
    'Use ng-content and named slots for caller-owned content',
    'Recognise when input flags are projection refusing to happen',
    'Keep the frame’s responsibilities separate from the filling’s',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session three, the panel component’s biography: born with a title input; gained titleIcon, titleLink, showBadge, badgeText, badgeColor, subtitleTemplate; currently 14 inputs, 12 of which describe things living in the header.',
    },
    {
      speaker: 'Senior Dev',
      text: 'That biography is what happens when a component insists on rendering content it does not own. The panel’s actual job is the frame: border, padding, collapse behaviour. The HEADER CONTENT belongs to the caller — <ng-content select="[panel-title]"> hands it over, and twelve inputs evaporate.',
    },
  ],
  contextArtefacts: [
    {
      id: 'slots',
      type: 'code',
      title: 'The panel, with holes on purpose',
      language: 'ts',
      content:
        '// panel template — owns the FRAME, punches holes for the rest\n<section class="panel">\n  <header class="panel__header">\n    <ng-content select="[panel-title]" />\n    <ng-content select="[panel-actions]" />\n  </header>\n  <div class="panel__body"><ng-content /></div>\n</section>\n\n// caller — owns the FILLING\n<app-panel>\n  <h3 panel-title>Deploys <app-env-badge env="prod" /></h3>\n  <button panel-actions (click)="refresh()">↻</button>\n  <app-deploy-list />\n</app-panel>',
    },
  ],
  challenges: [
    {
      id: 'ca-003-c1',
      type: 'multiple-choice',
      title: 'The 14-Input Biography',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext: 'Ticket 15: “panel header needs an optional live-updating timestamp, right-aligned”. The pattern says: input number fifteen.',
      prompt: 'What is the structural way out?',
      options: [
        {
          id: 'a',
          label: 'Add headerTemplate: TemplateRef input — one input replaces the twelve, and callers pass arbitrary header content.',
          isCorrect: false,
          feedback:
            'Directionally right, wrong tool first: TemplateRef inputs are projection with extra ceremony (template refs, context objects) — reach for them when content needs per-item CONTEXT (mission 4), not for static slots.',
        },
        {
          id: 'b',
          label:
            'Give the panel projection slots — ng-content select for title and actions areas — and delete the twelve content inputs: callers compose whatever header they need (icons, badges, timestamps) out of components they already own; the panel keeps only frame concerns (collapsed, variant).',
          isCorrect: true,
          feedback:
            'The variation was never the panel’s to model: slots move ownership of the filling to the people who keep inventing new fillings. Ticket 15 becomes caller markup, and ticket 16 will too.',
        },
        {
          id: 'c',
          label: 'Accept input 15 — inputs are cheap, and a documented component with 15 options is still one component.',
          isCorrect: false,
          feedback:
            'Each flag input multiplies the state space the panel must render, test and document — the biography has no final chapter under this policy.',
        },
        {
          id: 'd',
          label: 'Fork it: PanelWithTimestampComponent extends the base panel for callers who need the new header.',
          isCorrect: false,
          feedback:
            'Inheritance forks per variation are the flag explosion with worse ergonomics — ticket 16 forks the fork.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Whose content keeps varying — the frame’s or the callers’?' },
        { level: 2, title: 'Concept', content: 'Own the frame, project the filling.' },
        { level: 3, title: 'Specific clue', content: 'Twelve of fourteen inputs describe ONE region. That region wants to be a hole.' },
        { level: 4, title: 'Guided solution', content: 'Named ng-content slots; delete the content inputs.' },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Holes punched' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 6,
          reason: 'Input 15 shipped, then 16 and 17 — the panel’s spec file crossed a thousand lines of flag combinations.',
        },
      ],
      helpLinks: [{ topicId: 'arch.content-projection', label: 'Content projection' }],
      successFeedback: 'The panel renders frames; callers render headers — the biography ends here.',
      failureFeedback: 'Project ticket 16 under each option. Which one makes it a non-event?',
    },
    {
      id: 'ca-003-c2',
      type: 'multiple-choice',
      title: 'What Stays an Input',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Post-refactor review: someone proposes going all the way — “project EVERYTHING; the panel should have zero inputs, including collapsed and variant=warning”.',
      prompt: 'Which things rightly stay inputs, and why?',
      options: [
        {
          id: 'a',
          label: 'Nothing — a pure projection shell is the end state; callers style collapse and variants with classes on projected content.',
          isCorrect: false,
          feedback:
            'Collapse BEHAVIOUR (animating the body, toggling aria-expanded) is the frame’s job — pushing it to every caller un-builds the component.',
        },
        {
          id: 'b',
          label: 'Everything current — the refactor went far enough; inputs vs projection is taste beyond this point.',
          isCorrect: false,
          feedback: 'There is a principle, not taste: it decides ticket 16 and every one after.',
        },
        {
          id: 'c',
          label: 'Whatever has primitive types — strings and booleans stay inputs; anything renderable projects.',
          isCorrect: false,
          feedback:
            'badgeText was a string input and deserved deletion — the type is not the axis; ownership of the concern is.',
        },
        {
          id: 'd',
          label:
            'Frame concerns stay inputs: collapsed and variant configure BEHAVIOUR and APPEARANCE the panel itself implements (animation, aria, border colour). The rule: inputs configure what the component DOES; projection supplies what the caller SHOWS.',
          isCorrect: true,
          feedback:
            'Does-vs-shows is the durable axis: the panel does collapsing and warning-styling; it merely displays your header. Ticket triage becomes one question.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Who implements the collapse animation — the panel or the caller?' },
        { level: 2, title: 'Concept', content: 'Inputs configure behaviour the component owns; projection fills regions the caller owns.' },
        { level: 3, title: 'Specific clue', content: 'variant=warning changes the FRAME’s border. Whose concern is the frame?' },
        { level: 4, title: 'Guided solution', content: 'Pick does-vs-shows.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Axis drawn' }],
      consequences: [
        {
          type: 'stability',
          delta: -4,
          reason: 'The zero-input purge shipped — five callers reimplemented collapse, three forgot aria-expanded.',
        },
      ],
      helpLinks: [{ topicId: 'arch.content-projection', label: 'Content projection' }],
      successFeedback: 'Does versus shows — one question that triages every future panel ticket.',
      failureFeedback: 'For collapsed: if it moves to callers, how many implementations of the same animation exist next quarter?',
    },
  ],
  reflectionPrompt: 'Find our component with the most inputs: how many configure behaviour it implements, and how many describe content a caller owns?',
  rewards: [{ type: 'xp', amount: 10, label: 'Filling freed' }],
};
