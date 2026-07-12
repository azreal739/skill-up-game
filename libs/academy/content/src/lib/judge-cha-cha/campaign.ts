import { CampaignPack } from '@academy/content-model';
import { judgeChaCha001Intro } from './mission-001-intro';
import { judgeChaCha002Timing } from './mission-002-timing';
import { judgeChaCha003Rhythm } from './mission-003-rhythm';
import { judgeChaCha004Motion } from './mission-004-motion';
import { judgeChaCha005Character } from './mission-005-character';
import { judgeChaCha006SignatureFigures } from './mission-006-signature-figures';
import { judgeChaCha007SpatialStructure } from './mission-007-spatial-structure';
import { judgeChaCha008JudgingScenario } from './mission-008-judging-scenario';
import { judgeChaCha009BossCertifyChaCha } from './mission-009-boss-certify-cha-cha';

/**
 * Dance Academy — Judge Path, campaign 5: Cha Cha. Applies the six lenses to a
 * fiery Latin dance — the 4&5 chasse, Cuban motion matched to the music, cheeky
 * character, basics/breaks/turns, controlled space. Follows West Coast Swing.
 */
export const judgeChaChaPack: CampaignPack = {
  campaign: {
    id: 'judge-cha-cha',
    title: 'Cha Cha',
    subtitle: 'The chasse, Cuban motion, and cheek',
    description:
      'A fiery, flirtatious Latin dance. Judge the Cha Cha across all six lenses — the 4&5 chasse and its accents, crisp rhythm, knee-driven Cuban motion matched to the music, cheeky character, basics/breaks/turns, and controlled, largely non-progressive floor use.',
    track: 'dance-judging',
    difficulty: 'advanced',
    requiredCampaignId: 'judge-wcs',
    tags: ['dance', 'cha-cha'],
    missions: [
      'judge-cha-cha-001-intro',
      'judge-cha-cha-002-timing',
      'judge-cha-cha-003-rhythm',
      'judge-cha-cha-004-motion',
      'judge-cha-cha-005-character',
      'judge-cha-cha-006-signature-figures',
      'judge-cha-cha-007-spatial-structure',
      'judge-cha-cha-008-judging-scenario',
      'judge-cha-cha-009-boss-certify-cha-cha',
    ],
    rewards: [{ type: 'badge', id: 'chacha-judge', label: 'Cha Cha Judge' }],
  },
  missions: [
    judgeChaCha001Intro,
    judgeChaCha002Timing,
    judgeChaCha003Rhythm,
    judgeChaCha004Motion,
    judgeChaCha005Character,
    judgeChaCha006SignatureFigures,
    judgeChaCha007SpatialStructure,
    judgeChaCha008JudgingScenario,
    judgeChaCha009BossCertifyChaCha,
  ],
};
