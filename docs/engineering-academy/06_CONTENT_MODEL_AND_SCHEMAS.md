# 06 — Content Model and Schemas

## Goal

Mission and challenge content should be structured, validated and extensible.

Use TypeScript interfaces and Zod schemas to validate local content files at runtime or build time.

This is important because the game itself teaches Zod, so the implementation should model good behaviour.

## Recommended Content Organisation

```text
src/
  assets/
    content/
      campaigns/
        foundations/
          campaign.json
          missions/
            mission-001.json
            mission-002.json
        zod-gate/
          campaign.json
          missions/
```

Alternatively, content may be TypeScript constants if easier for type safety. The key requirement is separation between engine and content.

## Core Types

```ts
export type Difficulty = 'intro' | 'easy' | 'medium' | 'hard' | 'boss';

export type ChallengeType =
  | 'multiple-choice'
  | 'code-review'
  | 'fill-code-gap'
  | 'order-steps'
  | 'match-pairs'
  | 'debug-logs'
  | 'contract-comparison'
  | 'architecture-decision'
  | 'deployment-decision';

export interface CampaignDefinition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  requiredRank?: string;
  tags: string[];
  missions: string[];
  rewards: RewardDefinition[];
}

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
  completion: MissionCompletionDefinition;
  rewards: RewardDefinition[];
}
```

## Challenge Interface

```ts
export interface ChallengeDefinition {
  id: string;
  type: ChallengeType;
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
}
```

## Artefacts

Artefacts are pieces of context shown to the player.

```ts
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
```

## Rewards

```ts
export interface RewardDefinition {
  type: 'xp' | 'badge' | 'tool' | 'rank-progress' | 'cosmetic';
  amount?: number;
  id?: string;
  label: string;
}
```

## Consequences

```ts
export interface ConsequenceDefinition {
  type: 'stability' | 'technical-debt' | 'severity' | 'time' | 'team-confidence';
  delta: number;
  reason: string;
}
```

## Hints

```ts
export interface HintDefinition {
  level: 1 | 2 | 3 | 4;
  title: string;
  content: string;
  cost?: number;
}
```

## Zod Validation Example

```ts
import { z } from 'zod';

export const difficultySchema = z.enum(['intro', 'easy', 'medium', 'hard', 'boss']);

export const rewardSchema = z.object({
  type: z.enum(['xp', 'badge', 'tool', 'rank-progress', 'cosmetic']),
  amount: z.number().optional(),
  id: z.string().optional(),
  label: z.string()
});
```

## Mission IDs

Use stable IDs.

Example:
- `foundations-001-welcome-platform`
- `zod-gate-003-runtime-boundary`
- `cloudfront-006-cache-invalidation`

## Content Quality Rules

Each mission must include:

- At least one learning objective.
- At least one challenge.
- At least one help link.
- Success feedback.
- Failure feedback.
- A real-world explanation.

## Cross References

- Challenge engine: [05_CHALLENGE_ENGINE.md](05_CHALLENGE_ENGINE.md)
- Sample missions: [14_SAMPLE_MISSIONS.md](14_SAMPLE_MISSIONS.md)
- Angular/Nx implementation: [12_ANGULAR_NX_IMPLEMENTATION_GUIDE.md](12_ANGULAR_NX_IMPLEMENTATION_GUIDE.md)
