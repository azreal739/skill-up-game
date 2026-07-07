/**
 * Core content model for Engineering Academy.
 * See docs/engineering-academy/06_CONTENT_MODEL_AND_SCHEMAS.md.
 */

export type Difficulty = 'intro' | 'easy' | 'medium' | 'hard' | 'boss';

/**
 * Challenge types implemented in the vertical slice. The engine is
 * data-driven, so adding a type means extending this union, the Zod schema,
 * the evaluator and registering one new challenge component.
 */
export type ChallengeType = 'multiple-choice' | 'code-review' | 'contract-comparison';

export type ArtefactType =
  | 'code'
  | 'log'
  | 'api-response'
  | 'diagram'
  | 'pipeline'
  | 'dashboard'
  | 'message'
  | 'ticket'
  | 'diff';

export interface ArtefactDefinition {
  id: string;
  type: ArtefactType;
  title: string;
  language?: string;
  content: string;
}

/** One line of authored Game Master / mentor dialogue. */
export interface NarrativeBlock {
  speaker: string;
  text: string;
}

export interface HintDefinition {
  level: 1 | 2 | 3 | 4;
  title: string;
  content: string;
  /** XP cost override; defaults to the standard ladder cost for the level. */
  cost?: number;
}

export interface RewardDefinition {
  type: 'xp' | 'badge' | 'tool' | 'rank-progress' | 'cosmetic';
  amount?: number;
  id?: string;
  label: string;
}

export type ConsequenceType =
  | 'stability'
  | 'technical-debt'
  | 'severity'
  | 'time'
  | 'team-confidence';

export interface ConsequenceDefinition {
  type: ConsequenceType;
  delta: number;
  reason: string;
}

export interface HelpLinkDefinition {
  topicId: string;
  label: string;
}

/**
 * A selectable option. Used by every deterministic, ID-based challenge type:
 * answer options for multiple choice / contract comparison, candidate
 * findings for code review.
 */
export interface ChallengeOption {
  id: string;
  label: string;
  isCorrect: boolean;
  /** Explanation shown for this option after submission. */
  feedback?: string;
}

interface ChallengeBase {
  id: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  storyContext: string;
  prompt: string;
  artefacts?: ArtefactDefinition[];
  hints: HintDefinition[];
  rewards: RewardDefinition[];
  consequences: ConsequenceDefinition[];
  helpLinks: HelpLinkDefinition[];
  successFeedback: string;
  failureFeedback: string;
}

export interface MultipleChoiceChallenge extends ChallengeBase {
  type: 'multiple-choice';
  options: ChallengeOption[];
  /** When true the player may select several options; default single select. */
  multiSelect?: boolean;
}

export interface CodeReviewChallenge extends ChallengeBase {
  type: 'code-review';
  /** Candidate findings; the player must select every real issue and nothing else. */
  findings: ChallengeOption[];
}

export interface ContractComparisonChallenge extends ChallengeBase {
  type: 'contract-comparison';
  options: ChallengeOption[];
  /** When true the player may select several options; default single select. */
  multiSelect?: boolean;
}

export type ChallengeDefinition =
  | MultipleChoiceChallenge
  | CodeReviewChallenge
  | ContractComparisonChallenge;

export interface MissionDefinition {
  id: string;
  campaignId: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  learningObjectives: string[];
  briefing: NarrativeBlock[];
  contextArtefacts: ArtefactDefinition[];
  challenges: ChallengeDefinition[];
  /** Prompt shown on the results screen to encourage reflection. */
  reflectionPrompt?: string;
  rewards: RewardDefinition[];
}

export interface CampaignDefinition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  requiredRank?: string;
  /** Campaign that must be completed before this one unlocks. */
  requiredCampaignId?: string;
  tags: string[];
  /** Ordered mission IDs; each mission unlocks when the previous completes. */
  missions: string[];
  rewards: RewardDefinition[];
}

export interface HelpTopic {
  id: string;
  title: string;
  tags: string[];
  summary: string;
  content: string;
}

/** A whole content pack: one campaign plus its missions. */
export interface CampaignPack {
  campaign: CampaignDefinition;
  missions: MissionDefinition[];
}
