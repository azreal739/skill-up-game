import { CampaignPack } from '@academy/content-model';
import { fnAi001AiAsTool } from './mission-001-ai-as-tool';
import { fnAi002Prompting } from './mission-002-prompting';
import { fnAi003ReviewingAiCode } from './mission-003-reviewing-ai-code';
import { fnAi004WhenToUse } from './mission-004-when-to-use';
import { fnAi005AiInSdlc } from './mission-005-ai-in-sdlc';
import { fnAi006Verification } from './mission-006-verification';
import { fnAi007Risks } from './mission-007-risks';
import { fnAi008Agentic } from './mission-008-agentic';
import { fnAi009BossAiWorkflow } from './mission-009-boss-ai-workflow';

/**
 * DMM Field Notes campaign 17 (final) — AI-Assisted Engineering and the AI
 * SDLC. The collaboration block: AI as a power tool not an oracle,
 * effective prompting, reviewing AI code, routing tasks by strength, AI
 * across the SDLC, grounded verification, the risks you own, agentic
 * autonomy — ending with an accountable AI workflow for a whole feature.
 */
export const aiAssistedEngineeringPack: CampaignPack = {
  campaign: {
    id: 'ai-assisted-engineering',
    title: 'AI-Assisted Engineering & the AI SDLC',
    subtitle: 'Amplify judgement, never replace it',
    description:
      'The final sessions end to end: AI as a fast, confident, fallible collaborator you stay accountable for; prompting as specification; reviewing AI code for its signature failure modes; routing tasks by AI strength; using AI across the whole SDLC (draft-then-decide); verifying against ground truth, never AI-verifying-AI; the risks you still own (data leakage, security, IP, skill atrophy); and agentic autonomy with oversight that scales — closing on an accountable end-to-end AI workflow.',
    track: 'field-notes',
    difficulty: 'expert',
    requiredCampaignId: 'fe-system-design',
    tags: ['ai', 'angular'],
    missions: [
      'ai-001-ai-as-tool',
      'ai-002-prompting',
      'ai-003-reviewing-ai-code',
      'ai-004-when-to-use',
      'ai-005-ai-in-sdlc',
      'ai-006-verification',
      'ai-007-risks',
      'ai-008-agentic',
      'ai-009-boss-ai-workflow',
    ],
    rewards: [{ type: 'badge', id: 'ai-collaborator', label: 'AI Collaborator' }],
  },
  missions: [
    fnAi001AiAsTool,
    fnAi002Prompting,
    fnAi003ReviewingAiCode,
    fnAi004WhenToUse,
    fnAi005AiInSdlc,
    fnAi006Verification,
    fnAi007Risks,
    fnAi008Agentic,
    fnAi009BossAiWorkflow,
  ],
};
