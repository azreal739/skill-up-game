import { MissionDefinition } from '@academy/content-model';

/** Mission — "SCSS Containment" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const mission007ScssContainment: MissionDefinition = {
  id: 'foundations-007-scss-containment',
  campaignId: 'foundations',
  title: 'SCSS Containment',
  summary:
    'A styling change in one card broke three unrelated screens. Contain the styles.',
  difficulty: 'medium',
  learningObjectives: [
    'Spot selectors that couple styles to DOM structure',
    'Recognise style leakage across component boundaries',
    'Prefer design tokens over hard-coded values',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Design QA filed a strange report: changing a button colour in the promo card restyled buttons on three unrelated screens. Styles are escaping their component.',
    },
    {
      speaker: 'Mission Control',
      text: 'Angular scopes component styles for a reason. Find the escape hatches in the promo card stylesheet and choose a containment strategy the whole team can live with.',
    },
  ],
  contextArtefacts: [
    {
      id: 'promo-card-scss',
      type: 'code',
      title: 'promo-card.component.scss',
      language: 'scss',
      content:
        ':host {\n  display: block;\n}\n\n.card {\n  .body {\n    .footer {\n      .actions {\n        button { border-radius: 4px; }\n      }\n    }\n  }\n}\n\n::ng-deep .toolbar button {\n  background: #7c3aed !important;\n}\n\n.card__cta {\n  background: var(--brand-primary);\n}',
    },
  ],
  challenges: [
    {
      id: 'foundations-007-c1',
      type: 'code-review',
      title: 'Find the Escape Hatches',
      difficulty: 'medium',
      tags: ['scss', 'angular'],
      storyContext:
        'Two patterns in this file are style-containment violations; two lines are healthy.',
      prompt:
        'Select every genuine styling issue in promo-card.component.scss.',
      findings: [
        {
          id: 'deep-nesting',
          label:
            'Four-level selector nesting (.card .body .footer .actions button)',
          isCorrect: true,
          feedback:
            'Deep nesting welds styles to today’s DOM structure — moving one wrapper breaks the styling. Keep selectors shallow and class-based.',
        },
        {
          id: 'host-display',
          label:
            ':host { display: block } overrides the component’s natural display',
          isCorrect: false,
          feedback:
            'Setting display on :host is normal and healthy for layout components.',
        },
        {
          id: 'ng-deep-important',
          label:
            '::ng-deep with !important restyles buttons outside this component',
          isCorrect: true,
          feedback:
            'This is the leak QA found: ::ng-deep pierces encapsulation and !important makes the escape nearly impossible to override. This rule reaches every .toolbar button in the app.',
        },
        {
          id: 'css-var',
          label: 'Using var(--brand-primary) instead of a hex colour',
          isCorrect: false,
          feedback:
            'That is the design-token pattern working as intended — one source of truth for brand colour.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'Ask of each rule: could this affect elements outside the promo card, or break when markup moves?',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Angular emulates style encapsulation per component. ::ng-deep deliberately punches through it, and deeply nested selectors depend on exact DOM shape — both make styles fragile at a distance.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'One offender is the nesting pyramid; the other combines two escape hatches in a single rule.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Flag the four-level nesting and the ::ng-deep + !important rule. The :host display and the CSS variable are good practice.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Leak located' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 15,
          reason:
            'Global style overrides accumulated and now fight each other.',
        },
      ],
      helpLinks: [
        { topicId: 'scss.component-styles', label: 'Component-scoped SCSS' },
      ],
      successFeedback:
        'Containment restored — styles stay inside the component and survive markup changes.',
      failureFeedback:
        'Look for rules that reach outside the component or depend on the exact DOM tree.',
    },
    {
      id: 'foundations-007-c2',
      type: 'multiple-choice',
      title: 'Choose the Containment Strategy',
      difficulty: 'medium',
      tags: ['scss'],
      storyContext:
        'The brand purple appears in 14 components. Design wants to be able to change it once.',
      prompt: 'How should the team share the brand colour across components?',
      options: [
        {
          id: 'c',
          label:
            'Define --brand-primary once as a design token on :root and reference var(--brand-primary) everywhere',
          isCorrect: true,
          feedback:
            'Design tokens give one source of truth with zero encapsulation leaks — components opt in by referencing the variable.',
        },
        {
          id: 'a',
          label: 'Copy the hex value #7c3aed into each component stylesheet',
          isCorrect: false,
          feedback:
            'Fourteen copies means fourteen edits (and inevitably thirteen) the next time the brand shifts.',
        },
        {
          id: 'b',
          label:
            'Put one global rule with ::ng-deep that recolours every button in the app',
          isCorrect: false,
          feedback:
            'That recreates exactly the leak this mission started with — unscoped overrides fighting component styles.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'The goal is one place to change the colour without any style reaching into other components.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'CSS custom properties inherit down the DOM. Declaring tokens at :root lets every component consume shared values while keeping its own rules scoped.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'This codebase already does it — look at how .card__cta gets its colour.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Choose the :root design-token option — declare once, consume with var() everywhere.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Tokens adopted' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 10,
          reason: 'Brand colours drifted apart across screens.',
        },
      ],
      helpLinks: [{ topicId: 'scss.component-styles', label: 'Design tokens' }],
      successFeedback: 'One token, fourteen consumers, zero leaks.',
      failureFeedback:
        'Duplicating values and global overrides both fail the “change it once, break nothing” test.',
    },
  ],
  reflectionPrompt:
    'When is ::ng-deep ever justified — and what would you document if you used it?',
  rewards: [{ type: 'xp', amount: 5, label: 'Styles contained' }],
};
