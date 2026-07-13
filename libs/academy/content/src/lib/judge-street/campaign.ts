import { CampaignPack } from '@academy/content-model';
import { judgeStreet001Intro } from './mission-001-intro';
import { judgeStreet002Timing } from './mission-002-timing';
import { judgeStreet003Rhythm } from './mission-003-rhythm';
import { judgeStreet004Motion } from './mission-004-motion';
import { judgeStreet005Character } from './mission-005-character';
import { judgeStreet006SignatureFigures } from './mission-006-signature-figures';
import { judgeStreet007SpatialStructure } from './mission-007-spatial-structure';
import { judgeStreet008JudgingScenario } from './mission-008-judging-scenario';
import { judgeStreet009BossCertifyStreet } from './mission-009-boss-certify-street';

/**
 * Dance Academy — Judge Path, Street module. A family of solo urban styles —
 * popping, locking, waacking, voguing, dancehall — judged as one performer on
 * musicality, isolation and style-appropriate performance. Sits after Samba and
 * before the Mock Theory Exam.
 */
export const judgeStreetPack: CampaignPack = {
  campaign: {
    id: 'judge-street',
    title: 'Street',
    subtitle: 'Solo styles, musicality and isolation',
    description:
      'Not one dance but a family of solo urban styles. Judge Street across all six lenses — musicality (hitting the music), groove and pocket, the isolation and upper/lower core control of popping and locking, style-appropriate attitude, the vocabulary of each style, and a soloist’s use of the performance space — all anchored by styling appropriate to the song.',
    track: 'dance-judging',
    difficulty: 'advanced',
    requiredCampaignId: 'judge-samba',
    tags: ['dance', 'street'],
    missions: [
      'judge-street-001-intro',
      'judge-street-002-timing',
      'judge-street-003-rhythm',
      'judge-street-004-motion',
      'judge-street-005-character',
      'judge-street-006-signature-figures',
      'judge-street-007-spatial-structure',
      'judge-street-008-judging-scenario',
      'judge-street-009-boss-certify-street',
    ],
    rewards: [{ type: 'badge', id: 'street-judge', label: 'Street Judge' }],
  },
  missions: [
    judgeStreet001Intro,
    judgeStreet002Timing,
    judgeStreet003Rhythm,
    judgeStreet004Motion,
    judgeStreet005Character,
    judgeStreet006SignatureFigures,
    judgeStreet007SpatialStructure,
    judgeStreet008JudgingScenario,
    judgeStreet009BossCertifyStreet,
  ],
};
