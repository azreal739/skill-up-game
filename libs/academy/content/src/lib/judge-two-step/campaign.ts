import { CampaignPack } from '@academy/content-model';
import { judgeTwoStep001Intro } from './mission-001-intro';
import { judgeTwoStep002Timing } from './mission-002-timing';
import { judgeTwoStep003Rhythm } from './mission-003-rhythm';
import { judgeTwoStep004Motion } from './mission-004-motion';
import { judgeTwoStep005Character } from './mission-005-character';
import { judgeTwoStep006SignatureFigures } from './mission-006-signature-figures';
import { judgeTwoStep007SpatialStructure } from './mission-007-spatial-structure';
import { judgeTwoStep008JudgingScenario } from './mission-008-judging-scenario';
import { judgeTwoStep009BossCertifyTwoStep } from './mission-009-boss-certify-two-step';

/**
 * Dance Academy — Judge Path, Two Step module. The smooth traveller of the
 * country floor — quick-quick-slow-slow, a level gliding drive with no bounce,
 * cool effortless character, and strong progression down the line of dance.
 * Sits after East Coast Swing and before the Mock Theory Exam.
 */
export const judgeTwoStepPack: CampaignPack = {
  campaign: {
    id: 'judge-two-step',
    title: 'Two Step',
    subtitle: 'Quick-quick-slow-slow, a smooth gliding drive',
    description:
      'The smooth traveller of the country floor. Judge the Two Step across all six lenses — the quick-quick-slow-slow count with no triples, the smooth even rhythm, the level gliding drive with no bounce, the cool effortless character, promenades and turns and wraps, and its strong progression down the line of dance with floorcraft.',
    track: 'dance-judging',
    difficulty: 'advanced',
    requiredCampaignId: 'judge-east-coast-swing',
    tags: ['dance', 'two-step'],
    missions: [
      'judge-two-step-001-intro',
      'judge-two-step-002-timing',
      'judge-two-step-003-rhythm',
      'judge-two-step-004-motion',
      'judge-two-step-005-character',
      'judge-two-step-006-signature-figures',
      'judge-two-step-007-spatial-structure',
      'judge-two-step-008-judging-scenario',
      'judge-two-step-009-boss-certify-two-step',
    ],
    rewards: [{ type: 'badge', id: 'two-step-judge', label: 'Two Step Judge' }],
  },
  missions: [
    judgeTwoStep001Intro,
    judgeTwoStep002Timing,
    judgeTwoStep003Rhythm,
    judgeTwoStep004Motion,
    judgeTwoStep005Character,
    judgeTwoStep006SignatureFigures,
    judgeTwoStep007SpatialStructure,
    judgeTwoStep008JudgingScenario,
    judgeTwoStep009BossCertifyTwoStep,
  ],
};
