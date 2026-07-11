import { CampaignPack } from '@academy/content-model';
import { judgeCore001WhatJudgesWatch } from './mission-001-what-judges-watch';
import { judgeCore002Timing } from './mission-002-timing';
import { judgeCore003Rhythm } from './mission-003-rhythm';
import { judgeCore004Motion } from './mission-004-motion';
import { judgeCore005Character } from './mission-005-character';
import { judgeCore006SignatureFigures } from './mission-006-signature-figures';
import { judgeCore007SpatialStructure } from './mission-007-spatial-structure';
import { judgeCore008JudgingScenario } from './mission-008-judging-scenario';
import { judgeCore009BossFirstPanel } from './mission-009-boss-first-panel';

/**
 * Dance Academy — Judge Path, campaign 1: Core Judging Fundamentals.
 * Root of the dance-judging track. Teaches the six lenses a UCWDC judge
 * scores through (timing, rhythm, motion, character, signature figures,
 * spatial structure) before any single dance is studied. Reuses the existing
 * engine, progression and XP — only the content is dance-themed.
 */
export const judgeCoreFundamentalsPack: CampaignPack = {
  campaign: {
    id: 'judge-core-fundamentals',
    title: 'Core Judging Fundamentals',
    subtitle: 'Learn to see before you score',
    description:
      'Your apprenticeship on the panel. Learn the six lenses every dance is judged through — timing, rhythm, motion, character, signature figures and spatial structure — and how to turn a reaction into a defensible score.',
    track: 'dance-judging',
    difficulty: 'beginner',
    tags: ['dance', 'judging'],
    missions: [
      'judge-core-001-what-judges-watch',
      'judge-core-002-timing',
      'judge-core-003-rhythm',
      'judge-core-004-motion',
      'judge-core-005-character',
      'judge-core-006-signature-figures',
      'judge-core-007-spatial-structure',
      'judge-core-008-judging-scenario',
      'judge-core-009-boss-first-panel',
    ],
    rewards: [{ type: 'badge', id: 'judge-foundations', label: 'Judge Foundations' }],
  },
  missions: [
    judgeCore001WhatJudgesWatch,
    judgeCore002Timing,
    judgeCore003Rhythm,
    judgeCore004Motion,
    judgeCore005Character,
    judgeCore006SignatureFigures,
    judgeCore007SpatialStructure,
    judgeCore008JudgingScenario,
    judgeCore009BossFirstPanel,
  ],
};
