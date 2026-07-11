import { CampaignPack } from '@academy/content-model';
import { fnA11y001SemanticHtml } from './mission-001-semantic-html';
import { fnA11y002Keyboard } from './mission-002-keyboard';
import { fnA11y003Aria } from './mission-003-aria';
import { fnA11y004FormsA11y } from './mission-004-forms-a11y';
import { fnA11y005FocusManagement } from './mission-005-focus-management';
import { fnA11y006ColorContrast } from './mission-006-color-contrast';
import { fnA11y007LiveRegions } from './mission-007-live-regions';
import { fnA11y008TestingA11y } from './mission-008-testing-a11y';
import { fnA11y009BossAccessibleDataTable } from './mission-009-boss-accessible-datatable';

/**
 * DMM Field Notes campaign 13 — Accessibility. The inclusion block:
 * semantic HTML, full keyboard operability, ARIA that stays true,
 * accessible forms, SPA focus management, colour and contrast, live
 * announcements, and the automation-floor/human-ceiling of a11y testing
 * — ending with the accessible data table.
 */
export const ngAccessibilityPack: CampaignPack = {
  campaign: {
    id: 'ng-accessibility',
    title: 'Accessibility',
    subtitle: 'Usable by everyone, proven not assumed',
    description:
      'The accessibility sessions end to end: native semantics before ARIA, keyboard operability and focus visibility, ARIA name/role/state kept true, labelled forms that speak their errors, SPA focus management, colour never carrying meaning alone, live-region announcements at the right politeness, and automated-plus-manual testing — closing on the accessible data table.',
    track: 'field-notes',
    difficulty: 'advanced',
    requiredCampaignId: 'ng-testing',
    tags: ['a11y', 'angular'],
    missions: [
      'a11y-001-semantic-html',
      'a11y-002-keyboard',
      'a11y-003-aria',
      'a11y-004-forms-a11y',
      'a11y-005-focus-management',
      'a11y-006-color-contrast',
      'a11y-007-live-regions',
      'a11y-008-testing-a11y',
      'a11y-009-boss-accessible-datatable',
    ],
    rewards: [{ type: 'badge', id: 'access-champion', label: 'Access Champion' }],
  },
  missions: [
    fnA11y001SemanticHtml,
    fnA11y002Keyboard,
    fnA11y003Aria,
    fnA11y004FormsA11y,
    fnA11y005FocusManagement,
    fnA11y006ColorContrast,
    fnA11y007LiveRegions,
    fnA11y008TestingA11y,
    fnA11y009BossAccessibleDataTable,
  ],
};
