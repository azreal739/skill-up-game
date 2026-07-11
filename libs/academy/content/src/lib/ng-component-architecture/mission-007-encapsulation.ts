import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — encapsulation: style boundaries, :host, CSS custom
 * properties as the theming API, and why ::ng-deep is a loan shark.
 */
export const fnCa007Encapsulation: MissionDefinition = {
  id: 'ca-007-encapsulation',
  campaignId: 'ng-component-architecture',
  title: 'Walls With Doors',
  summary:
    'Style encapsulation keeps components from bleeding into each other — customisation goes through declared doors (custom properties), not through ::ng-deep holes.',
  difficulty: 'hard',
  learningObjectives: [
    'Explain what emulated view encapsulation actually does',
    'Expose a theming API with CSS custom properties',
    'Retire ::ng-deep piercings before they calcify',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session seven began with a war story: someone renamed an internal class inside the date-picker — .picker-cell to .picker-day — and four unrelated features broke. All four had ::ng-deep’d into it to restyle cells.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Encapsulation gives every component walls: emulated mode scopes your CSS with generated attributes, so .title here never hits .title there. ::ng-deep drills through the wall — and every drill hole couples you to someone’s PRIVATE markup. The civilised alternative: components declare DOORS — CSS custom properties (--picker-cell-bg) that pierce encapsulation BY DESIGN and are a contract, not a trespass.',
    },
  ],
  contextArtefacts: [
    {
      id: 'doors-not-holes',
      type: 'code',
      title: 'Holes vs doors',
      language: 'ts',
      content:
        '/* TRESPASS — coupled to private markup, breaks on rename */\n:host ::ng-deep .picker-cell { background: var(--brand-50); }\n\n/* the picker declares a DOOR (its public theming API) */\n.picker-cell { background: var(--picker-cell-bg, #fff); }\n\n/* consumers use the door — no knowledge of internals */\napp-date-picker { --picker-cell-bg: var(--brand-50); }',
    },
  ],
  challenges: [
    {
      id: 'ca-007-c1',
      type: 'multiple-choice',
      title: 'Four Features, One Rename',
      difficulty: 'hard',
      tags: ['angular', 'scss'],
      storyContext: 'The picker team renamed a private class; four ::ng-deep consumers broke. The retro asks for the systemic fix, not four patches.',
      prompt: 'What is the right settlement between the picker and its consumers?',
      options: [
        {
          id: 'a',
          label: 'The picker team must treat internal class names as public API — rename freezes and a deprecation cycle per class.',
          isCorrect: false,
          feedback:
            'That ratifies the trespass: every private div becomes forever-frozen API because someone might have drilled in. Components become unmaintainable museums.',
        },
        {
          id: 'b',
          label:
            'The picker declares a theming contract — CSS custom properties for the legitimately customisable (--picker-cell-bg, --picker-cell-radius…), documented like inputs; consumers migrate their ::ng-deep rules onto the doors, and a lint ban on new ::ng-deep keeps the wall closed. Internals become renameable again.',
          isCorrect: true,
          feedback:
            'Custom properties inherit through shadow boundaries by design — a door the platform built. The picker decides what is themeable; consumers get a contract that survives refactors.',
        },
        {
          id: 'c',
          label: 'Switch the picker to ViewEncapsulation.None so consumer styles apply without piercing syntax.',
          isCorrect: false,
          feedback:
            'Tearing down the picker’s OWN walls makes its styles leak OUT into the app and everyone’s leak IN — four broken features becomes a permanent style free-for-all.',
        },
        {
          id: 'd',
          label: 'Consumers should fork the picker when they need custom cells — visual divergence means it is a different component.',
          isCorrect: false,
          feedback:
            'Four forks of a date-picker for a background colour — mission 5’s wrong-abstraction lesson inverted into wrong-duplication.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'The consumers had a legitimate NEED and an illegitimate ROUTE. Fix the route.' },
        { level: 2, title: 'Concept', content: 'Custom properties pierce encapsulation by design — a declared, documented door.' },
        { level: 3, title: 'Specific clue', content: 'What can the picker rename freely once consumers only touch --variables?' },
        { level: 4, title: 'Guided solution', content: 'Theming API via custom properties + ::ng-deep ban.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Doors installed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'The rename freeze shipped instead — the picker’s internals fossilised, and its next feature took a quarter.',
        },
      ],
      helpLinks: [
        { topicId: 'arch.encapsulation', label: 'Style encapsulation' },
        { topicId: 'scss.component-styles', label: 'Component styles' },
      ],
      successFeedback: 'Walls for internals, doors for customisation — both teams can move again.',
      failureFeedback: 'The need was real. Which option serves it WITHOUT freezing the picker’s private markup?',
    },
    {
      id: 'ca-007-c2',
      type: 'multiple-choice',
      title: 'How the Wall Works',
      difficulty: 'hard',
      tags: ['angular', 'scss'],
      storyContext:
        'A teammate is confused: “if encapsulation is emulated, not real shadow DOM, how does my .title not hit the other component’s .title? And why does my style not apply to projected content I wrote myself?”',
      prompt: 'What does emulated encapsulation actually do?',
      options: [
        {
          id: 'a',
          label: 'It renames your classes at build time — .title becomes .app-card-title, keyed by component selector.',
          isCorrect: false,
          feedback:
            'Class names survive untouched — inspect the DOM: the scoping rides on generated ATTRIBUTES, not renamed classes.',
        },
        {
          id: 'b',
          label: 'It wraps each component in an iframe-like boundary the style engine respects natively.',
          isCorrect: false,
          feedback: 'No boundary object exists in emulated mode — it is CSS selector arithmetic, which is why it is “emulated”.',
        },
        {
          id: 'c',
          label:
            'Angular stamps generated attributes (_ngcontent-xx) on the component’s template elements and rewrites its CSS to .title[_ngcontent-xx] — the selector only matches elements carrying the stamp. Projected content is stamped by the component whose TEMPLATE declares it (the caller), which is why the panel’s styles miss it: your projected markup wears your stamp, not the panel’s.',
          isCorrect: true,
          feedback:
            'Attribute stamps + rewritten selectors — the whole trick. And the projection corollary falls out: content belongs stylistically to whoever wrote it, which is exactly the ownership model mission 3 taught.',
        },
        {
          id: 'd',
          label: 'Styles are injected in template order and later components simply override earlier ones by cascade position.',
          isCorrect: false,
          feedback: 'Cascade order cannot SCOPE anything — two .title rules would still both match without the stamps.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Open DevTools on any component — what extra attributes do its elements carry?' },
        { level: 2, title: 'Concept', content: 'Selector + stamp attribute = scoped rule, no shadow DOM needed.' },
        { level: 3, title: 'Specific clue', content: 'Whose template does projected content appear in? That template’s stamp is what it wears.' },
        { level: 4, title: 'Guided solution', content: 'Pick the attribute-stamping answer.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Wall understood' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason: 'Encapsulation stayed magic — the next styling mystery got a !important instead of a diagnosis.',
        },
      ],
      helpLinks: [{ topicId: 'arch.encapsulation', label: 'Style encapsulation' }],
      successFeedback: 'Stamps and rewritten selectors — the mechanism demystified, the projection corollary explained for free.',
      failureFeedback: 'Inspect a component’s elements and its stylesheet side by side. What was added to BOTH?',
    },
  ],
  reflectionPrompt: 'Grep our styles for ::ng-deep: which of those rules would a documented custom-property door replace?',
  rewards: [{ type: 'xp', amount: 15, label: 'Walls respected' }],
};
