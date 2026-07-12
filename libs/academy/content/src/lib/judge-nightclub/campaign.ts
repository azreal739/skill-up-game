import { CampaignPack } from '@academy/content-model';
import { judgeNightclub001Intro } from './mission-001-intro';
import { judgeNightclub002Timing } from './mission-002-timing';
import { judgeNightclub003Rhythm } from './mission-003-rhythm';
import { judgeNightclub004Motion } from './mission-004-motion';
import { judgeNightclub005Character } from './mission-005-character';
import { judgeNightclub006SignatureFigures } from './mission-006-signature-figures';
import { judgeNightclub007SpatialStructure } from './mission-007-spatial-structure';
import { judgeNightclub008JudgingScenario } from './mission-008-judging-scenario';
import { judgeNightclub009BossCertifyNightclub } from './mission-009-boss-certify-nightclub';

/**
 * Dance Academy — Judge Path, campaign 3: Nightclub. Applies the six lenses to
 * a soft, non-progressive dance — 4/4 slow-quick-quick, base-driven sway,
 * romantic character, diamonds and passes, contained geometry. Follows Waltz.
 */
export const judgeNightclubPack: CampaignPack = {
  campaign: {
    id: 'judge-nightclub',
    title: 'Nightclub',
    subtitle: 'Slow-quick-quick, sway from the base, contained romance',
    description:
      'The Waltz’s spatial opposite. Judge the Nightclub across all six lenses — 4/4 slow-quick-quick timing, soft connected rhythm, base-driven sway, romantic character, diamonds and passes, and non-progressive geometry parallel to the audience.',
    track: 'dance-judging',
    difficulty: 'intermediate',
    requiredCampaignId: 'judge-waltz',
    tags: ['dance', 'nightclub'],
    missions: [
      'judge-nightclub-001-intro',
      'judge-nightclub-002-timing',
      'judge-nightclub-003-rhythm',
      'judge-nightclub-004-motion',
      'judge-nightclub-005-character',
      'judge-nightclub-006-signature-figures',
      'judge-nightclub-007-spatial-structure',
      'judge-nightclub-008-judging-scenario',
      'judge-nightclub-009-boss-certify-nightclub',
    ],
    rewards: [{ type: 'badge', id: 'nightclub-judge', label: 'Nightclub Judge' }],
  },
  missions: [
    judgeNightclub001Intro,
    judgeNightclub002Timing,
    judgeNightclub003Rhythm,
    judgeNightclub004Motion,
    judgeNightclub005Character,
    judgeNightclub006SignatureFigures,
    judgeNightclub007SpatialStructure,
    judgeNightclub008JudgingScenario,
    judgeNightclub009BossCertifyNightclub,
  ],
};
