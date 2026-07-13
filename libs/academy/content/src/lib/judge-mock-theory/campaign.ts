import { CampaignPack } from '@academy/content-model';
import { judgeTheory001Intro } from './mission-001-intro';
import { judgeTheory002TimeSignatures } from './mission-002-time-signatures';
import { judgeTheory003Rhythms } from './mission-003-rhythms';
import { judgeTheory004Motion } from './mission-004-motion';
import { judgeTheory005Character } from './mission-005-character';
import { judgeTheory006SignatureFigures } from './mission-006-signature-figures';
import { judgeTheory007SpatialStructure } from './mission-007-spatial-structure';
import { judgeTheory008Applied } from './mission-008-applied';
import { judgeTheory009BossFullPaper } from './mission-009-boss-full-paper';

/**
 * Dance Academy — Judge Path, campaign 6: Mock Theory Exam. A cross-dance
 * revision and application paper — recall and apply the six lenses across every
 * dance studied so far. Follows Cha Cha; precedes the Final Certification.
 */
export const judgeMockTheoryPack: CampaignPack = {
  campaign: {
    id: 'judge-mock-theory',
    title: 'Mock Theory Exam',
    subtitle: 'Recall and apply, across every dance',
    description:
      'Before the practical certification, sit the theory paper. Revise the time signatures, rhythms, motions, characters, signature figures and spatial structures of every dance you have judged, then apply them to real questions — capped by a full mock paper.',
    track: 'dance-judging',
    difficulty: 'advanced',
    requiredCampaignId: 'judge-street',
    tags: ['dance', 'judging'],
    missions: [
      'judge-theory-001-intro',
      'judge-theory-002-time-signatures',
      'judge-theory-003-rhythms',
      'judge-theory-004-motion',
      'judge-theory-005-character',
      'judge-theory-006-signature-figures',
      'judge-theory-007-spatial-structure',
      'judge-theory-008-applied',
      'judge-theory-009-boss-full-paper',
    ],
    rewards: [{ type: 'badge', id: 'theory-certified', label: 'Theory Certified' }],
  },
  missions: [
    judgeTheory001Intro,
    judgeTheory002TimeSignatures,
    judgeTheory003Rhythms,
    judgeTheory004Motion,
    judgeTheory005Character,
    judgeTheory006SignatureFigures,
    judgeTheory007SpatialStructure,
    judgeTheory008Applied,
    judgeTheory009BossFullPaper,
  ],
};
