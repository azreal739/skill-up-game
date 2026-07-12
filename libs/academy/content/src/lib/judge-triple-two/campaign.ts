import { CampaignPack } from '@academy/content-model';
import { judgeTripleTwo001Intro } from './mission-001-intro';
import { judgeTripleTwo002Timing } from './mission-002-timing';
import { judgeTripleTwo003Rhythm } from './mission-003-rhythm';
import { judgeTripleTwo004Motion } from './mission-004-motion';
import { judgeTripleTwo005Character } from './mission-005-character';
import { judgeTripleTwo006SignatureFigures } from './mission-006-signature-figures';
import { judgeTripleTwo007SpatialStructure } from './mission-007-spatial-structure';
import { judgeTripleTwo008JudgingScenario } from './mission-008-judging-scenario';
import { judgeTripleTwo009BossCertifyTripleTwo } from './mission-009-boss-certify-triple-two';

/**
 * Dance Academy — Judge Path, Triple Two module. A soft, romantic travelling
 * dance — slow-slow-triple-triple, opposite shape in the triples, curved
 * progression. Sits after Cha Cha and before the Mock Theory Exam.
 */
export const judgeTripleTwoPack: CampaignPack = {
  campaign: {
    id: 'judge-triple-two',
    title: 'Triple Two',
    subtitle: 'Slow-slow-triple-triple, opposite shape, curved travel',
    description:
      'A soft, romantic dance that weaves down the floor. Judge the Triple Two across all six lenses — slow-slow-triple-triple timing, smooth ball-flat triples, whole-body opposite shaping, romantic character, loops/laces/weaves, and curved progressive travel.',
    track: 'dance-judging',
    difficulty: 'advanced',
    requiredCampaignId: 'judge-cha-cha',
    tags: ['dance', 'triple-two'],
    missions: [
      'judge-triple-two-001-intro',
      'judge-triple-two-002-timing',
      'judge-triple-two-003-rhythm',
      'judge-triple-two-004-motion',
      'judge-triple-two-005-character',
      'judge-triple-two-006-signature-figures',
      'judge-triple-two-007-spatial-structure',
      'judge-triple-two-008-judging-scenario',
      'judge-triple-two-009-boss-certify-triple-two',
    ],
    rewards: [{ type: 'badge', id: 'triple-two-judge', label: 'Triple Two Judge' }],
  },
  missions: [
    judgeTripleTwo001Intro,
    judgeTripleTwo002Timing,
    judgeTripleTwo003Rhythm,
    judgeTripleTwo004Motion,
    judgeTripleTwo005Character,
    judgeTripleTwo006SignatureFigures,
    judgeTripleTwo007SpatialStructure,
    judgeTripleTwo008JudgingScenario,
    judgeTripleTwo009BossCertifyTripleTwo,
  ],
};
