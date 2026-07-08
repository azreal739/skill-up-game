import { MissionDefinition } from '@academy/content-model';

/** Component Forge 5 — "Responsive Layout" (13_CAMPAIGN_CONTENT_PACKS.md). */
export const cfMission005Responsive: MissionDefinition = {
  id: 'component-forge-005-responsive-layout',
  campaignId: 'component-forge',
  title: 'Responsive Layout',
  summary:
    'The tile grid overflows on phones. Make it adapt without a pile of breakpoints.',
  difficulty: 'medium',
  learningObjectives: [
    'Prefer intrinsic layout over fixed pixel widths',
    'Let the grid reflow with minmax + auto-fill',
    'Reach for breakpoints only when layout truly changes',
  ],
  briefing: [
    {
      speaker: 'Mission Control',
      text: 'Support reports the dashboard is unusable on phones — the tile grid runs off the screen and needs horizontal scrolling. Make the grid adapt.',
    },
  ],
  contextArtefacts: [
    {
      id: 'grid-scss',
      type: 'code',
      title: 'dashboard.component.scss (current)',
      language: 'scss',
      content:
        '.tiles {\n  display: grid;\n  grid-template-columns: repeat(4, 320px);\n  gap: 1rem;\n}',
    },
  ],
  challenges: [
    {
      id: 'component-forge-005-c1',
      type: 'multiple-choice',
      title: 'Make It Reflow',
      difficulty: 'medium',
      tags: ['scss'],
      storyContext:
        'Four fixed 320px columns need 1280px+ — phones are ~360px wide.',
      prompt:
        'Which grid definition adapts across screen sizes without hard-coded breakpoints?',
      options: [
        {
          id: 'b',
          label: 'Keep repeat(4, 320px) and add overflow-x: auto so it scrolls',
          isCorrect: false,
          feedback:
            'Horizontal scrolling is the very complaint — it hides content instead of adapting.',
        },
        {
          id: 'c',
          label:
            'repeat(4, 320px), then a @media query for every device width resetting the columns',
          isCorrect: false,
          feedback:
            'A media query per device is brittle and endless. Intrinsic layout adapts to any width without enumerating them.',
        },
        {
          id: 'a',
          label:
            'grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));',
          isCorrect: true,
          feedback:
            'auto-fill + minmax lets the grid fit as many columns as space allows and drop to one on narrow screens — intrinsically responsive, no media queries.',
        },
      ],
      hints: [
        {
          level: 1,
          title: 'Direction',
          content:
            'Fixed pixel columns can’t shrink — let the grid decide how many fit.',
        },
        {
          level: 2,
          title: 'Concept',
          content:
            'repeat(auto-fill, minmax(<min>, 1fr)) fits as many columns as will fit and lets each flex, reflowing to fewer columns as the viewport narrows — no breakpoints needed.',
        },
        {
          level: 3,
          title: 'Specific clue',
          content:
            'The winning option uses auto-fill and minmax with a min() cap so it never exceeds 100%.',
        },
        {
          level: 4,
          title: 'Guided solution',
          content: 'Choose the auto-fill + minmax(min(100%, 18rem), 1fr) grid.',
        },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Grid reflows' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The dashboard stayed broken on mobile for another release.',
        },
      ],
      helpLinks: [
        { topicId: 'scss.responsive', label: 'Responsive layout with SCSS' },
      ],
      successFeedback:
        'One intrinsic grid rule adapts from phone to widescreen — no device list to maintain.',
      failureFeedback:
        'Scrolling and per-device media queries both dodge the fix. Let the grid reflow intrinsically.',
    },
  ],
  reflectionPrompt:
    'When is a media query genuinely necessary, versus intrinsic layout doing the job?',
  rewards: [{ type: 'xp', amount: 5, label: 'Responsive grid' }],
};
