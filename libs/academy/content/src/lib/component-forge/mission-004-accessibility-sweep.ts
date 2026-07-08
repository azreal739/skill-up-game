import { MissionDefinition } from '@academy/content-model';

/** Component Forge 4 — "Accessibility Sweep" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const cfMission004Accessibility: MissionDefinition = {
  id: 'component-forge-004-accessibility-sweep',
  campaignId: 'component-forge',
  title: 'Accessibility Sweep',
  summary:
    'Keyboard and screen-reader users can’t use the new tile. Sweep the a11y gaps.',
  difficulty: 'medium',
  learningObjectives: [
    'Use semantic elements instead of clickable divs',
    'Give interactive controls an accessible name',
    'Never convey meaning by colour alone',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Accessibility QA rejected the tile: it can’t be reached by keyboard, and the status is announced as nothing. The platform serves everyone — fix it.',
    },
  ],
  contextArtefacts: [
    {
      id: 'tile-template',
      type: 'code',
      title: 'customer-tile.component.html',
      language: 'html',
      content:
        '<div class="tile" (click)="selected.emit(customer)">\n  <span class="name">{{ customer.name }}</span>\n  <span class="dot" [class.online]="customer.online"></span>\n</div>',
    },
  ],
  challenges: [
    {
      id: 'component-forge-004-c1',
      type: 'code-review',
      title: 'Sweep the Gaps',
      difficulty: 'medium',
      tags: ['angular', 'a11y'],
      storyContext:
        'Three real accessibility problems hide here; one concern is unfounded.',
      prompt: 'Select every genuine accessibility issue.',
      findings: [
        {
          id: 'span-name',
          label: 'Using a <span> for the name is invalid',
          isCorrect: false,
          feedback: 'A span for text content is perfectly fine — not an issue.',
        },
        {
          id: 'div-click',
          label: 'The clickable <div> is not keyboard-focusable or operable',
          isCorrect: true,
          feedback:
            'A div with (click) is invisible to keyboards and screen readers. Use a <button> so it is focusable and operable for free.',
        },
        {
          id: 'no-name',
          label:
            'The tile has no accessible name describing what activating it does',
          isCorrect: true,
          feedback:
            'A screen-reader user hears only the customer name with no hint it is actionable. An aria-label like "Open {{ customer.name }}" fixes it.',
        },
        {
          id: 'status-colour',
          label: 'Online status is shown only by the dot’s colour',
          isCorrect: true,
          feedback:
            'Colour-blind and screen-reader users get nothing. Add text or an aria-label ("Online"/"Offline") — never colour alone.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'Try to use the tile with only a keyboard, then with your eyes closed.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'Native semantic elements are focusable and announced correctly; interactive controls need an accessible name; and status must be conveyed by text/label, not colour alone.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'Three issues: the clickable div, the missing accessible name, and the colour-only status.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content:
            'Flag the div-click, the missing name, and the colour-only status. The span is fine.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Swept' }],
      consequences: [
        {
          type: 'team-confidence',
          delta: -5,
          reason:
            'An inaccessible component reached QA and had to bounce back.',
        },
      ],
      helpLinks: [
        { topicId: 'a11y.semantics', label: 'Accessible markup and semantics' },
      ],
      successFeedback:
        'A real button, a clear name, and status conveyed in more than colour — usable by everyone.',
      failureFeedback:
        'Reach for keyboard access, an accessible name, and non-colour status. The span is a red herring.',
    },
  ],
  reflectionPrompt:
    'Which is easier: building accessibly from the start, or retrofitting it? Why?',
  rewards: [{ type: 'xp', amount: 5, label: 'Accessible tile' }],
};
