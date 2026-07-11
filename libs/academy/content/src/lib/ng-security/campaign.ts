import { CampaignPack } from '@academy/content-model';
import { fnSec001TrustBoundaries } from './mission-001-trust-boundaries';
import { fnSec002Xss } from './mission-002-xss';
import { fnSec003TokensStorage } from './mission-003-tokens-storage';
import { fnSec004Csrf } from './mission-004-csrf';
import { fnSec005Authz } from './mission-005-authz';
import { fnSec006Dependencies } from './mission-006-dependencies';
import { fnSec007SecretsCsp } from './mission-007-secrets-csp';
import { fnSec008ThreatModeling } from './mission-008-threat-modeling';
import { fnSec009BossSecureFeature } from './mission-009-boss-secure-feature';

/**
 * DMM Field Notes campaign 14 — Security. The defence-in-depth block:
 * trust boundaries, XSS and Angular's sanitiser, token storage, CSRF,
 * server-side authorization, supply-chain risk, secrets and CSP, and
 * threat modeling — ending with a whole feature secured end to end.
 */
export const ngSecurityPack: CampaignPack = {
  campaign: {
    id: 'ng-security',
    title: 'Security',
    subtitle: 'Assume breach, defend in depth',
    description:
      'The security sessions end to end: trust boundaries and hostile input, XSS and the sanitiser (and the bypass footgun), token storage against exfiltration, CSRF and its defences, authorization that lives on the server, supply-chain risk, no-secrets-in-the-bundle and CSP containment, and threat modeling as a habit — closing on a feature secured in depth.',
    track: 'field-notes',
    difficulty: 'expert',
    requiredCampaignId: 'ng-accessibility',
    tags: ['security', 'angular'],
    missions: [
      'sec-001-trust-boundaries',
      'sec-002-xss',
      'sec-003-tokens-storage',
      'sec-004-csrf',
      'sec-005-authz',
      'sec-006-dependencies',
      'sec-007-secrets-csp',
      'sec-008-threat-modeling',
      'sec-009-boss-secure-feature',
    ],
    rewards: [{ type: 'badge', id: 'security-sentinel', label: 'Security Sentinel' }],
  },
  missions: [
    fnSec001TrustBoundaries,
    fnSec002Xss,
    fnSec003TokensStorage,
    fnSec004Csrf,
    fnSec005Authz,
    fnSec006Dependencies,
    fnSec007SecretsCsp,
    fnSec008ThreatModeling,
    fnSec009BossSecureFeature,
  ],
};
