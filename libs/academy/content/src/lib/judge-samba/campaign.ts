import { CampaignPack } from '@academy/content-model';
import { judgeSamba001Intro } from './mission-001-intro';
import { judgeSamba002Timing } from './mission-002-timing';
import { judgeSamba003Rhythm } from './mission-003-rhythm';
import { judgeSamba004Motion } from './mission-004-motion';
import { judgeSamba005Character } from './mission-005-character';
import { judgeSamba006SignatureFigures } from './mission-006-signature-figures';
import { judgeSamba007SpatialStructure } from './mission-007-spatial-structure';
import { judgeSamba008JudgingScenario } from './mission-008-judging-scenario';
import { judgeSamba009BossCertifySamba } from './mission-009-boss-certify-samba';

/**
 * Dance Academy — Judge Path, Samba module. The carnival of the Latin floor —
 * a syncopated 1-a-2, the knee-driven Samba bounce, festive character, and
 * progressive travel around the floor. Sits after Two Step and before the Mock
 * Theory Exam.
 */
export const judgeSambaPack: CampaignPack = {
  campaign: {
    id: 'judge-samba',
    title: 'Samba',
    subtitle: 'Syncopated 1-a-2, the carnival bounce',
    description:
      'The carnival of the Latin floor. Judge the Samba across all six lenses — the syncopated 1-a-2, the crisp buoyant rhythm, the knee-driven Samba bounce action, the festive carnival character, whisks and botafogos and voltas, and its progressive travel around the floor with floorcraft.',
    track: 'dance-judging',
    difficulty: 'advanced',
    requiredCampaignId: 'judge-two-step',
    tags: ['dance', 'samba'],
    missions: [
      'judge-samba-001-intro',
      'judge-samba-002-timing',
      'judge-samba-003-rhythm',
      'judge-samba-004-motion',
      'judge-samba-005-character',
      'judge-samba-006-signature-figures',
      'judge-samba-007-spatial-structure',
      'judge-samba-008-judging-scenario',
      'judge-samba-009-boss-certify-samba',
    ],
    rewards: [{ type: 'badge', id: 'samba-judge', label: 'Samba Judge' }],
  },
  missions: [
    judgeSamba001Intro,
    judgeSamba002Timing,
    judgeSamba003Rhythm,
    judgeSamba004Motion,
    judgeSamba005Character,
    judgeSamba006SignatureFigures,
    judgeSamba007SpatialStructure,
    judgeSamba008JudgingScenario,
    judgeSamba009BossCertifySamba,
  ],
};
