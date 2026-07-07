import { MissionDefinition } from '@academy/content-model';

/** Component Forge 7 — "Component Review" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const cfMission007ComponentReview: MissionDefinition = {
  id: 'component-forge-007-component-review',
  campaignId: 'component-forge',
  title: 'Component Review',
  summary: 'Review a pull request that adds a new shared component before it merges.',
  difficulty: 'hard',
  learningObjectives: [
    'Apply the full reusable-component checklist under review',
    'Weigh reusability, accessibility and boundaries together',
    'Catch problems before they spread across teams',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'A new shared StatBadge component is up for review. Once it merges, every team will use it — so review it as the gatekeeper of the UI library.',
    },
  ],
  contextArtefacts: [
    {
      id: 'stat-badge',
      type: 'code',
      title: 'stat-badge.component.ts (proposed)',
      language: 'ts',
      content:
        "@Component({\n  selector: 'ui-stat-badge',\n  standalone: true,\n  template: `\n    <div (click)=\"clicked.emit()\" [style.color]=\"trend === 'up' ? 'green' : 'red'\">\n      {{ label }}: {{ value }}\n    </div>`,\n})\nexport class StatBadgeComponent {\n  @Input() label = '';\n  @Input() value: any;\n  @Output() clicked = new EventEmitter<void>();\n  constructor(private analytics: AnalyticsService) {}\n}",
    },
  ],
  challenges: [
    {
      id: 'component-forge-007-c1',
      type: 'code-review',
      title: 'Gate the Merge',
      difficulty: 'hard',
      tags: ['angular', 'a11y', 'typescript'],
      storyContext: 'Four candidate problems; three are real blockers for a shared component.',
      prompt: 'Select every genuine problem that should block this merge.',
      findings: [
        {
          id: 'service-dep',
          label: 'A shared presentational component injects AnalyticsService',
          isCorrect: true,
          feedback:
            'A service dependency ties every consumer to analytics and breaks reuse/testing. Emit an event and let containers decide.',
        },
        {
          id: 'value-any',
          label: 'value is typed any',
          isCorrect: true,
          feedback:
            'any on a shared component’s public API removes safety for every consumer. Type it (string | number).',
        },
        {
          id: 'clickable-div',
          label: 'A clickable div with colour-only trend is inaccessible',
          isCorrect: true,
          feedback:
            'Not keyboard-operable, no accessible name, and trend is colour-only — three a11y failures in one line.',
        },
        {
          id: 'selector-prefix',
          label: 'The ui- selector prefix is wrong for a shared library',
          isCorrect: false,
          feedback: 'A distinct prefix like ui- for shared components is good practice, not a problem.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Apply everything this campaign taught: reuse, typing, accessibility.' },
        {
          level: 2,
          title: 'Concept',
          content:
            'A shared component must be dependency-free, strongly typed at its API, and accessible — because its flaws multiply across every team that adopts it.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Three blockers: the injected service, the any-typed input, and the inaccessible clickable div.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Flag the service dependency, the any value, and the clickable div. The ui- prefix is fine.',
        },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Merge gated' }],
      consequences: [
        { type: 'technical-debt', delta: 15, reason: 'A flawed shared component was adopted platform-wide before review caught it.' },
      ],
      helpLinks: [
        { topicId: 'angular.presentational-vs-container', label: 'Presentational vs container' },
        { topicId: 'a11y.semantics', label: 'Accessible markup' },
      ],
      successFeedback: 'Held at the gate — the shared library stays clean, typed and accessible.',
      failureFeedback: 'Re-check against reuse (no services), typing (no any) and accessibility (no clickable div).',
    },
  ],
  reflectionPrompt: 'Why is the bar for a shared library component higher than for a one-off feature component?',
  rewards: [{ type: 'xp', amount: 5, label: 'Reviewer’s eye' }],
};
