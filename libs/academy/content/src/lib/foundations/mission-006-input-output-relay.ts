import { MissionDefinition } from '@academy/content-model';

/** Mission — "The Input/Output Relay" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const mission006InputOutputRelay: MissionDefinition = {
  id: 'foundations-006-input-output-relay',
  campaignId: 'foundations',
  title: 'The Input/Output Relay',
  summary: 'Wire two-way communication between a settings panel and its parent page.',
  difficulty: 'easy',
  learningObjectives: [
    'Send events from a child to its parent with @Output',
    'Combine an input and an output into two-way binding',
    'Recognise anti-patterns for child-to-parent communication',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'The notifications settings panel is a child component. The page needs to know the moment the user changes a preference — data flows down through inputs, and events must flow back up.',
    },
    {
      speaker: 'Mission Control',
      text: 'Complete the relay in both directions without coupling the components together.',
    },
  ],
  contextArtefacts: [
    {
      id: 'settings-panel',
      type: 'code',
      title: 'notification-settings.component.ts (child)',
      language: 'ts',
      content:
        "@Component({\n  selector: 'app-notification-settings',\n  standalone: true,\n  templateUrl: './notification-settings.component.html',\n})\nexport class NotificationSettingsComponent {\n  @Input({ required: true }) enabled!: boolean;\n  // TODO: notify the parent when the user toggles the preference\n}",
    },
  ],
  challenges: [
    {
      id: 'foundations-006-c1',
      type: 'multiple-choice',
      title: 'Send the Event Up',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext: 'The child must tell the parent that the user toggled notifications.',
      prompt: 'How should the child notify its parent?',
      options: [
        {
          id: 'a',
          label: 'Have the parent poll the child every second with setInterval',
          isCorrect: false,
          feedback: 'Polling wastes cycles and still misses the moment of change — events exist for this.',
        },
        {
          id: 'b',
          label: 'Store the value on window.notificationState so the parent can read it',
          isCorrect: false,
          feedback:
            'Global mutable state couples every component to a hidden channel and breaks change detection.',
        },
        {
          id: 'c',
          label:
            "@Output() enabledChange = new EventEmitter<boolean>();\n// on toggle:\nthis.enabledChange.emit(next);",
          isCorrect: true,
          feedback:
            'An @Output event is the Angular contract for child-to-parent communication — the parent listens with (enabledChange)="…".',
        },
        {
          id: 'd',
          label: 'Inject the parent component into the child and call parent.onToggled()',
          isCorrect: false,
          feedback:
            'Injecting the parent hard-couples the child to one host — it can never be reused elsewhere.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: 'Data flows down; something else flows up.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Angular components communicate upward through @Output events: the child emits, the parent binds a handler with (eventName)="…". Neither knows the other’s class.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'Only one option keeps the child reusable in any parent.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Choose the @Output() EventEmitter option — declare the output, emit on toggle, and let the parent subscribe in its template.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Event relayed' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 10,
          reason: 'A tightly-coupled communication hack was merged into the settings page.',
        },
      ],
      helpLinks: [{ topicId: 'angular.inputs-outputs', label: 'Inputs and outputs' }],
      successFeedback:
        'The relay is clean: the child announces changes without knowing who is listening.',
      failureFeedback:
        'Look for the option where the child stays decoupled — it should not know or poll its parent.',
    },
    {
      id: 'foundations-006-c2',
      type: 'multiple-choice',
      title: 'Close the Loop',
      difficulty: 'easy',
      tags: ['angular'],
      storyContext:
        'The page template wants the terse two-way form: <app-notification-settings [(enabled)]="notificationsOn" />.',
      prompt: 'Which input/output pair makes the two-way binding [(enabled)] work?',
      options: [
        {
          id: 'a',
          label: '@Input() enabled + @Output() onEnabled',
          isCorrect: false,
          feedback:
            'The output name must be the input name plus the exact suffix "Change" — onEnabled does not match the convention.',
        },
        {
          id: 'b',
          label: '@Input() enabled + @Output() enabledChange',
          isCorrect: true,
          feedback:
            'Banana-in-a-box [(enabled)] is sugar for [enabled]="…" plus (enabledChange)="… = $event" — the names must pair exactly.',
        },
        {
          id: 'c',
          label: '@Output() enabled + @Input() enabledChange',
          isCorrect: false,
          feedback: 'Reversed: data in through @Input, events out through @Output.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content: '[(x)] is shorthand for two separate bindings.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Two-way binding desugars to a property binding plus an event binding: [(enabled)] becomes [enabled] and (enabledChange). Angular matches them purely by naming convention.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content: 'The event name must be the input name with the suffix Change.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Pick @Input() enabled paired with @Output() enabledChange — the only pair the sugar recognises.',
        },
      ],
      rewards: [{ type: 'xp', amount: 10, label: 'Two-way loop closed' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The settings page and panel drifted out of sync for some users.',
        },
      ],
      helpLinks: [
        { topicId: 'angular.inputs-outputs', label: 'Inputs and outputs' },
        { topicId: 'angular.templates', label: 'Template syntax' },
      ],
      successFeedback: 'Input plus matching Change output — the relay now runs in both directions.',
      failureFeedback:
        'Remember what [(x)] expands to, and which direction each decorator handles.',
    },
  ],
  reflectionPrompt:
    'Why is emitting an event better than letting a child directly modify its parent’s state?',
  rewards: [{ type: 'xp', amount: 5, label: 'Relay complete' }],
};
