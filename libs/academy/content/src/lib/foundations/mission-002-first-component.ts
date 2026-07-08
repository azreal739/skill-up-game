import { MissionDefinition } from '@academy/content-model';

/** Mission 2 — "First Component Online" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const mission002FirstComponent: MissionDefinition = {
  id: 'foundations-002-first-component',
  campaignId: 'foundations',
  title: 'First Component Online',
  summary: 'Bring a status card component online and wire its input correctly.',
  difficulty: 'easy',
  learningObjectives: [
    'Recognise the parts of a standalone Angular component',
    'Pass data into a component with a typed @Input',
    'Spot template bindings that will not compile',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The operations dashboard needs a new status card. A teammate started a standalone component but had to rotate onto incident duty. You are taking it over.',
    },
    {
      speaker: 'Mission Control',
      text: 'Bring the card online: the parent template must pass the service status into the component, and the binding has to be one the compiler accepts.',
    },
  ],
  contextArtefacts: [
    {
      id: 'status-card-component',
      type: 'code',
      title: 'status-card.component.ts (as your teammate left it)',
      language: 'ts',
      content:
        "@Component({\n  selector: 'app-status-card',\n  standalone: true,\n  imports: [CommonModule],\n  templateUrl: './status-card.component.html',\n})\nexport class StatusCardComponent {\n  @Input({ required: true }) status!: 'online' | 'degraded' | 'offline';\n}",
    },
  ],
  challenges: [
    {
      id: 'foundations-002-c1',
      type: 'multiple-choice',
      title: 'Wire the Input',
      difficulty: 'easy',
      tags: ['angular', 'typescript'],
      storyContext:
        "The parent dashboard component has a property `serviceStatus: 'online' | 'degraded' | 'offline'` and must hand it to the card.",
      prompt:
        'Which parent template usage correctly passes the status into the component?',
      options: [
        {
          id: 'b',
          label: '<app-status-card status="serviceStatus"></app-status-card>',
          isCorrect: false,
          feedback:
            "Without brackets this passes the literal string 'serviceStatus', which is not a valid status — strictTemplates rejects it.",
        },
        {
          id: 'c',
          label: '<app-status-card (status)="serviceStatus"></app-status-card>',
          isCorrect: false,
          feedback:
            'Parentheses bind to an @Output event. status is an @Input, so there is no event to listen to.',
        },
        {
          id: 'a',
          label: '<app-status-card [status]="serviceStatus"></app-status-card>',
          isCorrect: true,
          feedback:
            'Square brackets create a property binding, so the typed value flows from parent to child and the compiler checks it.',
        },
        {
          id: 'd',
          label: '<app-status-card>{{ serviceStatus }}</app-status-card>',
          isCorrect: false,
          feedback:
            'Interpolating into the content projects text; it never reaches the @Input, which stays unset and fails the required check.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'Think about which binding syntax sends data *into* a component.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Angular has three binding styles: [property]="expr" passes data in, (event)="handler" listens to outputs, and attribute="text" passes a literal string.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'status is a required @Input typed as a union of three strings. Only a property binding evaluates serviceStatus as an expression.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Because status expects a typed value from the parent class, wrap the input name in square brackets: [status]="serviceStatus". Select that option and submit.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Input wired' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason:
            'The status card rendered without live data on the operations dashboard.',
        },
      ],
      helpLinks: [
        { topicId: 'angular.inputs-outputs', label: 'Inputs and outputs' },
        { topicId: 'angular.templates', label: 'Template binding syntax' },
      ],
      successFeedback:
        'Property binding keeps the data typed end to end — the compiler now guards this seam.',
      failureFeedback:
        'Check what each binding syntax actually does; only one of them evaluates the parent expression and feeds the @Input.',
    },
    {
      id: 'foundations-002-c2',
      type: 'code-review',
      title: 'Review the Template',
      difficulty: 'easy',
      tags: ['angular', 'scss'],
      storyContext:
        'Before the card ships, review the template your teammate drafted. Flag every real problem — and nothing that is actually fine.',
      prompt: 'Select every issue that is genuinely present in the template.',
      artefacts: [
        {
          id: 'status-card-template',
          type: 'code',
          title: 'status-card.component.html',
          language: 'html',
          content:
            '<div class="card" onclick="refresh()">\n  <h3>{{ title }}</h3>\n  <span class="badge">{{ status }}</span>\n</div>',
        },
      ],
      findings: [
        {
          id: 'onclick',
          label:
            'Uses the DOM onclick attribute instead of the Angular (click) event binding',
          isCorrect: true,
          feedback:
            'onclick bypasses Angular entirely and refresh() would be looked up on the global scope — use (click)="refresh()".',
        },
        {
          id: 'badge-span',
          label: 'Using a <span> for the badge is invalid HTML',
          isCorrect: false,
          feedback: 'A span is perfectly valid here — this is not an issue.',
        },
        {
          id: 'missing-title',
          label:
            'Binds {{ title }} but the component class declares no title property',
          isCorrect: true,
          feedback:
            'strictTemplates fails the build for unknown members. The class only declares status.',
        },
        {
          id: 'interpolation',
          label: 'Interpolating {{ status }} in the template is unsafe',
          isCorrect: false,
          feedback:
            'Interpolation is the normal, safe way to render component state as text.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'Compare the template against the component class, and look at how the click is handled.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Angular templates can only reference members that exist on the component class, and DOM event attributes like onclick are not Angular event bindings.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'Two things are wrong: line 1 handles the click the non-Angular way, and one interpolated property does not exist on the class.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Flag the onclick attribute and the missing title property. The span and the status interpolation are fine — leave them unselected.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Template reviewed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 10,
          reason:
            'Unreviewed template issues were merged into the component library.',
        },
      ],
      helpLinks: [
        { topicId: 'angular.templates', label: 'Template syntax' },
        { topicId: 'angular.components', label: 'Component basics' },
      ],
      successFeedback:
        'Clean review — the card now compiles under strictTemplates and handles clicks inside Angular.',
      failureFeedback:
        'Re-check each candidate against the component class and Angular binding rules before flagging it.',
    },
  ],
  reflectionPrompt:
    'What is the difference between [status]="expr", (click)="handler()" and status="text" — and when would you use each?',
  rewards: [
    { type: 'xp', amount: 5, label: 'Component online' },
    { type: 'badge', id: 'component-crafter', label: 'Component Crafter' },
  ],
};
