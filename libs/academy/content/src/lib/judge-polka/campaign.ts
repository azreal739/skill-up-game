import { CampaignPack } from '@academy/content-model';
import { judgePolka001Intro } from './mission-001-intro';
import { judgePolka002Timing } from './mission-002-timing';
import { judgePolka003Rhythm } from './mission-003-rhythm';
import { judgePolka004Motion } from './mission-004-motion';
import { judgePolka005Character } from './mission-005-character';
import { judgePolka006SignatureFigures } from './mission-006-signature-figures';
import { judgePolka007SpatialStructure } from './mission-007-spatial-structure';
import { judgePolka008JudgingScenario } from './mission-008-judging-scenario';
import { judgePolka009BossCertifyPolka } from './mission-009-boss-certify-polka';

/**
 * Dance Academy — Judge Path, Polka module. A bright, energetic, hard-driving
 * dance — 1&2 lilt, up/down pulse, aggressive progressive travel. Sits after
 * Triple Two and before the Mock Theory Exam.
 */
export const judgePolkaPack: CampaignPack = {
  campaign: {
    id: 'judge-polka',
    title: 'Polka',
    subtitle: 'Lilt, pulse, and aggressive drive',
    description:
      'The most energetic traveller. Judge the Polka across all six lenses — the 1&2 lilt, bright ball-ball-ball-flat rhythm, springy up/down pulse and forward drive, energetic country character, skips/gallops/rotating chasses/weaves, and aggressive progressive travel with floorcraft.',
    track: 'dance-judging',
    difficulty: 'advanced',
    requiredCampaignId: 'judge-triple-two',
    tags: ['dance', 'polka'],
    missions: [
      'judge-polka-001-intro',
      'judge-polka-002-timing',
      'judge-polka-003-rhythm',
      'judge-polka-004-motion',
      'judge-polka-005-character',
      'judge-polka-006-signature-figures',
      'judge-polka-007-spatial-structure',
      'judge-polka-008-judging-scenario',
      'judge-polka-009-boss-certify-polka',
    ],
    rewards: [{ type: 'badge', id: 'polka-judge', label: 'Polka Judge' }],
  },
  missions: [
    judgePolka001Intro,
    judgePolka002Timing,
    judgePolka003Rhythm,
    judgePolka004Motion,
    judgePolka005Character,
    judgePolka006SignatureFigures,
    judgePolka007SpatialStructure,
    judgePolka008JudgingScenario,
    judgePolka009BossCertifyPolka,
  ],
};
