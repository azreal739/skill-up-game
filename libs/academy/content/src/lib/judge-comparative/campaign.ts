import { CampaignPack } from '@academy/content-model';
import { judgeComparative001Intro } from './mission-001-intro';
import { judgeComparative002SameDance } from './mission-002-same-dance';
import { judgeComparative003WeighingTradeoffs } from './mission-003-weighing-tradeoffs';
import { judgeComparative004CrossDance } from './mission-004-cross-dance';
import { judgeComparative005Consistency } from './mission-005-consistency';
import { judgeComparative006TieBreaking } from './mission-006-tie-breaking';
import { judgeComparative007BiasFairness } from './mission-007-bias-fairness';
import { judgeComparative008PlaceTheField } from './mission-008-place-the-field';
import { judgeComparative009BossIntegrated } from './mission-009-boss-integrated-comparative';

/**
 * Dance Academy — Judge Path, Comparative Judging module. The capstone skill:
 * placing a field relative to each other rather than scoring in isolation —
 * comparing on the same criteria, weighing trade-offs, judging different dances
 * fairly, keeping the order consistent, breaking ties and guarding against bias.
 * Sits after Stage and before the Mock Theory Exam.
 */
export const judgeComparativePack: CampaignPack = {
  campaign: {
    id: 'judge-comparative',
    title: 'Comparative Judging',
    subtitle: 'Placing a field, fairly and consistently',
    description:
      'The capstone judging skill. Learn to place a field relative to each other — comparing couples on the same criteria, weighing strengths against weaknesses, judging different dances against their own criteria, keeping the order consistent, breaking ties with a declared criterion, and guarding against flashiness, crowd and reputation — then defend the whole placement.',
    track: 'dance-judging',
    difficulty: 'advanced',
    requiredCampaignId: 'judge-stage',
    tags: ['dance', 'judging', 'comparative'],
    missions: [
      'judge-comparative-001-intro',
      'judge-comparative-002-same-dance',
      'judge-comparative-003-weighing-tradeoffs',
      'judge-comparative-004-cross-dance',
      'judge-comparative-005-consistency',
      'judge-comparative-006-tie-breaking',
      'judge-comparative-007-bias-fairness',
      'judge-comparative-008-place-the-field',
      'judge-comparative-009-boss-integrated-comparative',
    ],
    rewards: [{ type: 'badge', id: 'comparative-judge', label: 'Comparative Judge' }],
  },
  missions: [
    judgeComparative001Intro,
    judgeComparative002SameDance,
    judgeComparative003WeighingTradeoffs,
    judgeComparative004CrossDance,
    judgeComparative005Consistency,
    judgeComparative006TieBreaking,
    judgeComparative007BiasFairness,
    judgeComparative008PlaceTheField,
    judgeComparative009BossIntegrated,
  ],
};
