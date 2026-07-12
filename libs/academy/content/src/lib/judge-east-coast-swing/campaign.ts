import { CampaignPack } from '@academy/content-model';
import { judgeEcs001Intro } from './mission-001-intro';
import { judgeEcs002Timing } from './mission-002-timing';
import { judgeEcs003Rhythm } from './mission-003-rhythm';
import { judgeEcs004Motion } from './mission-004-motion';
import { judgeEcs005Character } from './mission-005-character';
import { judgeEcs006SignatureFigures } from './mission-006-signature-figures';
import { judgeEcs007SpatialStructure } from './mission-007-spatial-structure';
import { judgeEcs008JudgingScenario } from './mission-008-judging-scenario';
import { judgeEcs009BossCertifyEcs } from './mission-009-boss-certify-ecs';

/**
 * Dance Academy — Judge Path, East Coast Swing module. The most openly joyful
 * of the swing family — triple-triple-rock, a lively grounded bounce, playful
 * character, and a circular non-progressive spot. Sits after Polka and before
 * the Mock Theory Exam.
 */
export const judgeEastCoastSwingPack: CampaignPack = {
  campaign: {
    id: 'judge-east-coast-swing',
    title: 'East Coast Swing',
    subtitle: 'Triples, rock steps, and a circular bounce',
    description:
      'The liveliest dance on the floor. Judge the East Coast Swing across all six lenses — the triple-triple-rock count and its single/double-time gears, the springy even-beat rhythm, the grounded down-up bounce, the playful character, passes and underarm rotations, and its circular, non-progressive spot with floorcraft.',
    track: 'dance-judging',
    difficulty: 'advanced',
    requiredCampaignId: 'judge-polka',
    tags: ['dance', 'east-coast-swing'],
    missions: [
      'judge-ecs-001-intro',
      'judge-ecs-002-timing',
      'judge-ecs-003-rhythm',
      'judge-ecs-004-motion',
      'judge-ecs-005-character',
      'judge-ecs-006-signature-figures',
      'judge-ecs-007-spatial-structure',
      'judge-ecs-008-judging-scenario',
      'judge-ecs-009-boss-certify-ecs',
    ],
    rewards: [{ type: 'badge', id: 'ecs-judge', label: 'East Coast Swing Judge' }],
  },
  missions: [
    judgeEcs001Intro,
    judgeEcs002Timing,
    judgeEcs003Rhythm,
    judgeEcs004Motion,
    judgeEcs005Character,
    judgeEcs006SignatureFigures,
    judgeEcs007SpatialStructure,
    judgeEcs008JudgingScenario,
    judgeEcs009BossCertifyEcs,
  ],
};
