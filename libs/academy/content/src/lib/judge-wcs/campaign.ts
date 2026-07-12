import { CampaignPack } from '@academy/content-model';
import { judgeWcs001Intro } from './mission-001-intro';
import { judgeWcs002Timing } from './mission-002-timing';
import { judgeWcs003Rhythm } from './mission-003-rhythm';
import { judgeWcs004Motion } from './mission-004-motion';
import { judgeWcs005Character } from './mission-005-character';
import { judgeWcs006SignatureFigures } from './mission-006-signature-figures';
import { judgeWcs007SpatialStructure } from './mission-007-spatial-structure';
import { judgeWcs008JudgingScenario } from './mission-008-judging-scenario';
import { judgeWcs009BossCertifyWcs } from './mission-009-boss-certify-wcs';

/**
 * Dance Academy — Judge Path, campaign 4: West Coast Swing. Applies the six
 * lenses to a slotted, anchored hybrid dance — six/eight-count patterns,
 * back-beat feel, extension/compression, push/pass/whip. Follows Nightclub.
 */
export const judgeWcsPack: CampaignPack = {
  campaign: {
    id: 'judge-wcs',
    title: 'West Coast Swing',
    subtitle: 'Hold the slot, settle the anchor',
    description:
      'A cool, grounded, conversational dance in a slot. Judge West Coast Swing across all six lenses — six/eight-count back-beat timing, walks and triples, the anchor settle with extension and compression, hybrid character, push/pass/whip figures, and slot structure.',
    track: 'dance-judging',
    difficulty: 'advanced',
    requiredCampaignId: 'judge-nightclub',
    tags: ['dance', 'west-coast-swing'],
    missions: [
      'judge-wcs-001-intro',
      'judge-wcs-002-timing',
      'judge-wcs-003-rhythm',
      'judge-wcs-004-motion',
      'judge-wcs-005-character',
      'judge-wcs-006-signature-figures',
      'judge-wcs-007-spatial-structure',
      'judge-wcs-008-judging-scenario',
      'judge-wcs-009-boss-certify-wcs',
    ],
    rewards: [{ type: 'badge', id: 'wcs-judge', label: 'West Coast Swing Judge' }],
  },
  missions: [
    judgeWcs001Intro,
    judgeWcs002Timing,
    judgeWcs003Rhythm,
    judgeWcs004Motion,
    judgeWcs005Character,
    judgeWcs006SignatureFigures,
    judgeWcs007SpatialStructure,
    judgeWcs008JudgingScenario,
    judgeWcs009BossCertifyWcs,
  ],
};
