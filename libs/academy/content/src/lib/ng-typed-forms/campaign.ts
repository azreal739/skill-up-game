import { CampaignPack } from '@academy/content-model';
import { fnTf001TypedControls } from './mission-001-typed-controls';
import { fnTf002Nullability } from './mission-002-nullability';
import { fnTf003NonNullable } from './mission-003-nonnullable';
import { fnTf004GroupTyping } from './mission-004-group-typing';
import { fnTf005ValueVsRaw } from './mission-005-value-vs-raw';
import { fnTf006Validators } from './mission-006-validators';
import { fnTf007ValueChanges } from './mission-007-valuechanges';
import { fnTf008Submission } from './mission-008-submission';
import { fnTf009BossCheckout } from './mission-009-boss-checkout';

/**
 * DMM Field Notes campaign 4 — Angular Typed Forms. The team's forms
 * deep-dive: typed controls, the null that reset() brings,
 * NonNullableFormBuilder, value vs getRawValue (the half-address bug),
 * pure validators, valueChanges as a stream — ending with the typed
 * checkout rebuilt to the requirements sheet.
 */
export const ngTypedFormsPack: CampaignPack = {
  campaign: {
    id: 'ng-typed-forms',
    title: 'Angular Typed Forms',
    subtitle: 'Model user input safely',
    description:
      'The forms session end to end: typed controls, reset-to-null and NonNullableFormBuilder, group typing and its Partial truth, value vs getRawValue, validators as pure verdicts, and valueChanges with the RxJS toolkit — closing on the rebuilt typed checkout.',
    track: 'field-notes',
    difficulty: 'intermediate',
    requiredCampaignId: 'rxjs-reactive',
    tags: ['angular', 'typescript'],
    missions: [
      'tf-001-typed-controls',
      'tf-002-nullability',
      'tf-003-nonnullable',
      'tf-004-group-typing',
      'tf-005-value-vs-raw',
      'tf-006-validators',
      'tf-007-valuechanges',
      'tf-008-submission',
      'tf-009-boss-checkout',
    ],
    rewards: [{ type: 'badge', id: 'form-warden', label: 'Form Warden' }],
  },
  missions: [
    fnTf001TypedControls,
    fnTf002Nullability,
    fnTf003NonNullable,
    fnTf004GroupTyping,
    fnTf005ValueVsRaw,
    fnTf006Validators,
    fnTf007ValueChanges,
    fnTf008Submission,
    fnTf009BossCheckout,
  ],
};
