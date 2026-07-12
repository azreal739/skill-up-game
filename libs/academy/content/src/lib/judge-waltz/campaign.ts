import { CampaignPack } from '@academy/content-model';
import { judgeWaltz001Intro } from './mission-001-intro';
import { judgeWaltz002Timing } from './mission-002-timing';
import { judgeWaltz003Rhythm } from './mission-003-rhythm';
import { judgeWaltz004Motion } from './mission-004-motion';
import { judgeWaltz005Character } from './mission-005-character';
import { judgeWaltz006SignatureFigures } from './mission-006-signature-figures';
import { judgeWaltz007SpatialStructure } from './mission-007-spatial-structure';
import { judgeWaltz008JudgingScenario } from './mission-008-judging-scenario';
import { judgeWaltz009BossCertifyWaltz } from './mission-009-boss-certify-waltz';

/**
 * Dance Academy — Judge Path, campaign 2: Waltz. Applies the six lenses to the
 * first specialist dance — 3/4 time, rise and fall, regal character, box/twinkle
 * figures and progressive diagonal travel. Follows Core Judging Fundamentals.
 */
export const judgeWaltzPack: CampaignPack = {
  campaign: {
    id: 'judge-waltz',
    title: 'Waltz',
    subtitle: 'Three-four time, rise and fall, regal character',
    description:
      'Your first specialist dance. Judge the Waltz across all six lenses — its 3/4 timing and accents, flowing rhythm, rise and fall, regal character, box-and-twinkle vocabulary, and progressive travel along the line of dance.',
    track: 'dance-judging',
    difficulty: 'intermediate',
    requiredCampaignId: 'judge-core-fundamentals',
    tags: ['dance', 'waltz'],
    missions: [
      'judge-waltz-001-intro',
      'judge-waltz-002-timing',
      'judge-waltz-003-rhythm',
      'judge-waltz-004-motion',
      'judge-waltz-005-character',
      'judge-waltz-006-signature-figures',
      'judge-waltz-007-spatial-structure',
      'judge-waltz-008-judging-scenario',
      'judge-waltz-009-boss-certify-waltz',
    ],
    rewards: [{ type: 'badge', id: 'waltz-judge', label: 'Waltz Judge' }],
  },
  missions: [
    judgeWaltz001Intro,
    judgeWaltz002Timing,
    judgeWaltz003Rhythm,
    judgeWaltz004Motion,
    judgeWaltz005Character,
    judgeWaltz006SignatureFigures,
    judgeWaltz007SpatialStructure,
    judgeWaltz008JudgingScenario,
    judgeWaltz009BossCertifyWaltz,
  ],
};
