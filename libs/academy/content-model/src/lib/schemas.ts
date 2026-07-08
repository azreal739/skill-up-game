/**
 * Zod schemas mirroring types.ts. All content and persisted save state is
 * validated at runtime — the game teaches Zod, so it models the behaviour.
 * Content quality rules from 06_CONTENT_MODEL_AND_SCHEMAS.md (at least one
 * objective, challenge, hint and help link, plus feedback both ways) are
 * enforced here rather than by convention.
 */
import { z } from 'zod';

export const difficultySchema = z.enum(['intro', 'easy', 'medium', 'hard', 'boss']);

export const artefactSchema = z.object({
  id: z.string().min(1),
  type: z.enum([
    'code',
    'log',
    'api-response',
    'diagram',
    'pipeline',
    'dashboard',
    'message',
    'ticket',
    'diff',
  ]),
  title: z.string().min(1),
  language: z.string().optional(),
  content: z.string().min(1),
});

export const narrativeBlockSchema = z.object({
  speaker: z.string().min(1),
  text: z.string().min(1),
});

export const hintSchema = z.object({
  level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  title: z.string().min(1),
  content: z.string().min(1),
  cost: z.number().int().nonnegative().optional(),
});

export const rewardSchema = z.object({
  type: z.enum(['xp', 'badge', 'tool', 'rank-progress', 'cosmetic']),
  amount: z.number().int().positive().optional(),
  id: z.string().optional(),
  label: z.string().min(1),
});

export const consequenceSchema = z.object({
  type: z.enum(['stability', 'technical-debt', 'severity', 'time', 'team-confidence']),
  delta: z.number(),
  reason: z.string().min(1),
});

export const helpLinkSchema = z.object({
  topicId: z.string().min(1),
  label: z.string().min(1),
});

export const challengeOptionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  isCorrect: z.boolean(),
  feedback: z.string().optional(),
});

const challengeBaseShape = {
  id: z.string().min(1),
  title: z.string().min(1),
  difficulty: difficultySchema,
  tags: z.array(z.string().min(1)).min(1),
  storyContext: z.string().min(1),
  prompt: z.string().min(1),
  artefacts: z.array(artefactSchema).optional(),
  hints: z.array(hintSchema).min(1),
  rewards: z.array(rewardSchema),
  consequences: z.array(consequenceSchema),
  helpLinks: z.array(helpLinkSchema).min(1),
  successFeedback: z.string().min(1),
  failureFeedback: z.string().min(1),
};

/** At least one option must be correct or the challenge is unwinnable. */
const hasCorrectOption = (options: Array<{ isCorrect: boolean }>) =>
  options.some((option) => option.isCorrect);

export const multipleChoiceChallengeSchema = z.object({
  ...challengeBaseShape,
  type: z.literal('multiple-choice'),
  options: z
    .array(challengeOptionSchema)
    .min(2)
    .refine(hasCorrectOption, { message: 'multiple-choice challenge needs a correct option' }),
  multiSelect: z.boolean().optional(),
});

export const codeReviewChallengeSchema = z.object({
  ...challengeBaseShape,
  type: z.literal('code-review'),
  findings: z
    .array(challengeOptionSchema)
    .min(2)
    .refine(hasCorrectOption, { message: 'code-review challenge needs at least one real issue' }),
});

export const contractComparisonChallengeSchema = z.object({
  ...challengeBaseShape,
  type: z.literal('contract-comparison'),
  options: z
    .array(challengeOptionSchema)
    .min(2)
    .refine(hasCorrectOption, { message: 'contract-comparison challenge needs a correct option' }),
  multiSelect: z.boolean().optional(),
});

export const challengeSchema = z.discriminatedUnion('type', [
  multipleChoiceChallengeSchema,
  codeReviewChallengeSchema,
  contractComparisonChallengeSchema,
]);

export const missionSchema = z.object({
  id: z.string().min(1),
  campaignId: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  difficulty: difficultySchema,
  learningObjectives: z.array(z.string().min(1)).min(1),
  briefing: z.array(narrativeBlockSchema).min(1),
  contextArtefacts: z.array(artefactSchema),
  challenges: z.array(challengeSchema).min(1),
  reflectionPrompt: z.string().optional(),
  rewards: z.array(rewardSchema),
});

export const campaignDifficultySchema = z.enum([
  'beginner',
  'intermediate',
  'advanced',
  'expert',
]);

export const campaignSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  difficulty: campaignDifficultySchema,
  requiredRank: z.string().optional(),
  requiredCampaignId: z.string().optional(),
  tags: z.array(z.string().min(1)).min(1),
  missions: z.array(z.string().min(1)).min(1),
  rewards: z.array(rewardSchema),
});

export const helpTopicSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  summary: z.string().min(1),
  content: z.string().min(1),
});

export const campaignPackSchema = z.object({
  campaign: campaignSchema,
  missions: z.array(missionSchema).min(1),
});
