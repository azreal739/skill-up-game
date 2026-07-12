import { CampaignPack } from '@academy/content-model';
import { judgeFinal001Intro } from './mission-001-intro';
import { judgeFinal002Identify } from './mission-002-identify';
import { judgeFinal003TimingRhythm } from './mission-003-timing-rhythm';
import { judgeFinal004MotionCharacter } from './mission-004-motion-character';
import { judgeFinal005FiguresStructure } from './mission-005-figures-structure';
import { judgeFinal006SpotTheError } from './mission-006-spot-the-error';
import { judgeFinal007ScoreSheet } from './mission-007-score-sheet';
import { judgeFinal008Comparative } from './mission-008-comparative';
import { judgeFinal009BossCertification } from './mission-009-boss-certification';

/**
 * Dance Academy — Judge Path, campaign 7: Final Certification Assessment. The
 * capstone — identify dances, judge every lens, spot errors, mark a score
 * sheet, place couples, and deliver a final integrated verdict. Passing the
 * boss awards the Apprentice Judge badge. Follows the Mock Theory Exam.
 */
export const judgeFinalCertPack: CampaignPack = {
  campaign: {
    id: 'judge-final-cert',
    title: 'Final Certification Assessment',
    subtitle: 'Every dance, every lens, one sitting',
    description:
      'The capstone of the Judge Path. Across seven stations — identify the dance, timing & rhythm, motion & character, figures & structure, spot the error, a mock score sheet and a comparative placement — judge everything you have learned, then deliver the integrated verdict that certifies you as an Apprentice Judge.',
    track: 'dance-judging',
    difficulty: 'expert',
    requiredCampaignId: 'judge-mock-theory',
    tags: ['dance', 'judging'],
    missions: [
      'judge-final-001-intro',
      'judge-final-002-identify',
      'judge-final-003-timing-rhythm',
      'judge-final-004-motion-character',
      'judge-final-005-figures-structure',
      'judge-final-006-spot-the-error',
      'judge-final-007-score-sheet',
      'judge-final-008-comparative',
      'judge-final-009-boss-certification',
    ],
    rewards: [{ type: 'badge', id: 'apprentice-judge', label: 'Apprentice Judge' }],
  },
  missions: [
    judgeFinal001Intro,
    judgeFinal002Identify,
    judgeFinal003TimingRhythm,
    judgeFinal004MotionCharacter,
    judgeFinal005FiguresStructure,
    judgeFinal006SpotTheError,
    judgeFinal007ScoreSheet,
    judgeFinal008Comparative,
    judgeFinal009BossCertification,
  ],
};
