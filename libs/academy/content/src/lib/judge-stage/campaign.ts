import { CampaignPack } from '@academy/content-model';
import { judgeStage001Intro } from './mission-001-intro';
import { judgeStage002Timing } from './mission-002-timing';
import { judgeStage003Rhythm } from './mission-003-rhythm';
import { judgeStage004Motion } from './mission-004-motion';
import { judgeStage005Character } from './mission-005-character';
import { judgeStage006SignatureFigures } from './mission-006-signature-figures';
import { judgeStage007SpatialStructure } from './mission-007-spatial-structure';
import { judgeStage008JudgingScenario } from './mission-008-judging-scenario';
import { judgeStage009BossCertifyStage } from './mission-009-boss-certify-stage';

/**
 * Dance Academy — Judge Path, Stage module. Era and theatrical styles —
 * Charleston, Lindy, Disco, Bollywood, Broadway and the jazz/ballet/modern base
 * — judged as a performance number for era authenticity, technical vocabulary
 * (jumps, turns, kicks) and theatrical projection. Sits after Street and before
 * the Mock Theory Exam.
 */
export const judgeStagePack: CampaignPack = {
  campaign: {
    id: 'judge-stage',
    title: 'Stage',
    subtitle: 'Era styles, technique and theatricality',
    description:
      'Era and theatrical styles, from Charleston to Broadway. Judge Stage across all six lenses — theatrical musicality, the era’s rhythmic feel, the technical quality of jumps/turns/kicks, theatrical projection and era character, each era’s vocabulary, and stagecraft — all anchored by authenticity to the era being danced.',
    track: 'dance-judging',
    difficulty: 'advanced',
    requiredCampaignId: 'judge-street',
    tags: ['dance', 'stage'],
    missions: [
      'judge-stage-001-intro',
      'judge-stage-002-timing',
      'judge-stage-003-rhythm',
      'judge-stage-004-motion',
      'judge-stage-005-character',
      'judge-stage-006-signature-figures',
      'judge-stage-007-spatial-structure',
      'judge-stage-008-judging-scenario',
      'judge-stage-009-boss-certify-stage',
    ],
    rewards: [{ type: 'badge', id: 'stage-judge', label: 'Stage Judge' }],
  },
  missions: [
    judgeStage001Intro,
    judgeStage002Timing,
    judgeStage003Rhythm,
    judgeStage004Motion,
    judgeStage005Character,
    judgeStage006SignatureFigures,
    judgeStage007SpatialStructure,
    judgeStage008JudgingScenario,
    judgeStage009BossCertifyStage,
  ],
};
