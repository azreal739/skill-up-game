/**
 * Technical Debt Review Loop data model (Review Loop spec 03/04/06).
 *
 * These shapes track first attempts, review attempts and learning progress
 * separately, so the game can distinguish first-attempt mastery from later
 * remediation. Like the rest of the persisted save they are Zod-validated;
 * a save that fails validation is discarded rather than trusted.
 */
import { z } from 'zod';

/** How an attempt was submitted: during a mission, or in Academy Review. */
export const attemptModeSchema = z.enum(['mission', 'review']);
export type AttemptMode = z.infer<typeof attemptModeSchema>;

/** A single submitted answer, kept permanently as history. */
export const challengeAttemptSchema = z.object({
  id: z.string().min(1),
  challengeId: z.string().min(1),
  missionId: z.string().min(1),
  campaignId: z.string().min(1),
  mode: attemptModeSchema,
  selectedAnswerIds: z.array(z.string()),
  isCorrect: z.boolean(),
  submittedAt: z.string(),
  xpAwarded: z.number().int().nonnegative(),
  consequenceIds: z.array(z.string()).optional(),
});
export type ChallengeAttempt = z.infer<typeof challengeAttemptSchema>;

/** Rolled-up progress for one challenge across every attempt. */
export const challengeProgressSchema = z.object({
  challengeId: z.string().min(1),
  missionId: z.string().min(1),
  campaignId: z.string().min(1),

  firstAttemptId: z.string().optional(),
  firstAttemptCorrect: z.boolean().optional(),
  firstAttemptSubmittedAt: z.string().optional(),

  latestAttemptId: z.string().optional(),
  latestAttemptCorrect: z.boolean().optional(),

  totalAttempts: z.number().int().nonnegative(),
  reviewAttempts: z.number().int().nonnegative(),

  isRemediated: z.boolean(),
  remediatedAt: z.string().optional(),

  technicalDebtItemId: z.string().optional(),
});
export type ChallengeProgress = z.infer<typeof challengeProgressSchema>;

/**
 * Lifecycle of a Technical Debt item (Review Loop spec 04):
 * open → in-review → remediated, or reopened when a review still misses.
 */
export const technicalDebtStatusSchema = z.enum([
  'open',
  'in-review',
  'remediated',
  'reopened',
]);
export type TechnicalDebtStatus = z.infer<typeof technicalDebtStatusSchema>;

/** A misunderstood concept discovered during a mission, filed for review. */
export const technicalDebtItemSchema = z.object({
  id: z.string().min(1),
  campaignId: z.string().min(1),
  missionId: z.string().min(1),
  challengeId: z.string().min(1),
  challengeTitle: z.string(),

  conceptTags: z.array(z.string()),
  status: technicalDebtStatusSchema,

  playerAnswerIds: z.array(z.string()),
  correctAnswerIds: z.array(z.string()),

  explanation: z.string(),
  whyItMatters: z.string(),
  relatedHelpTopicIds: z.array(z.string()),

  consequenceSummary: z.string(),

  createdAt: z.string(),
  updatedAt: z.string(),
  remediatedAt: z.string().optional(),

  reviewAttemptIds: z.array(z.string()),
  noteIds: z.array(z.string()),
});
export type TechnicalDebtItem = z.infer<typeof technicalDebtItemSchema>;

/** What a note can be attached to (Review Loop spec 06). */
export const noteLinkTypeSchema = z.enum([
  'campaign',
  'mission',
  'challenge',
  'technical-debt',
  'help-topic',
]);
export type NoteLinkType = z.infer<typeof noteLinkTypeSchema>;

/** A player-authored lesson, optionally linked to game content. */
export const playerNoteSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  pinned: z.boolean(),

  linkedEntityType: noteLinkTypeSchema,
  linkedEntityId: z.string(),

  createdAt: z.string(),
  updatedAt: z.string(),
});
export type PlayerNote = z.infer<typeof playerNoteSchema>;
