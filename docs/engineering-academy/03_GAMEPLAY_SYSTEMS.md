# 03 — Gameplay Systems

## Core Loop

```text
Mission Briefing
    ↓
Investigate Context
    ↓
Solve Challenge
    ↓
Submit Decision
    ↓
Receive Consequence
    ↓
Earn XP / Tools / Badges
    ↓
Unlock Next Node
```

## Main Systems

### Campaigns

Campaigns are themed collections of missions.

Example:
- Foundations of Angular.
- Zod Gate.
- Nx Monorepo Maze.
- CloudFront Outage.
- Save Production.

See [04_CAMPAIGN_AND_MISSION_DESIGN.md](04_CAMPAIGN_AND_MISSION_DESIGN.md).

### Missions

A mission is a playable scenario with a briefing, one or more challenges, rewards and an outcome.

### Challenges

Challenges are interactive tasks.

Types include:
- Multiple choice.
- Code review.
- Fill in missing code.
- Match concepts.
- Order workflow steps.
- Debug logs.
- Compare API contract to schema.
- Choose deployment action.

See [05_CHALLENGE_ENGINE.md](05_CHALLENGE_ENGINE.md).

### XP

XP rewards progress.

Suggested XP:
- Easy challenge: 10 XP.
- Medium challenge: 25 XP.
- Hard challenge: 50 XP.
- Boss challenge: 100 XP.
- Perfect mission bonus: 50 XP.
- No-hint bonus: 25 XP.
- Reflection bonus: 10 XP.

### Ranks

Ranks represent engineering growth:

1. Graduate Engineer
2. Junior Engineer
3. Software Engineer
4. Intermediate Engineer
5. Senior Engineer
6. Senior Specialist
7. Technical Lead
8. Principal Engineer
9. Staff Engineer
10. Architect
11. Chief Architect
12. Distinguished Engineer

Rank progression should require XP plus campaign milestones.

### Badges

Badges represent specific skills.

Examples:
- Type Guardian.
- Component Crafter.
- Zod Gatekeeper.
- Nx Cartographer.
- API Diplomat.
- CDN Detective.
- Production Defender.
- Refactor Ranger.
- Accessibility Advocate.
- CI Champion.

### Engineering Tools

Tools are consumable or rechargeable abilities.

#### Log Viewer

Reveals one additional clue.

#### AI Assistant

Provides a guided hint.

#### Rollback Token

Removes one deployment consequence.

#### Architecture Review

Highlights one design smell.

#### Test Runner

Runs a simulated test and reveals failing expectations.

#### Feature Flag Toggle

Allows safe isolation of risky features.

#### Cache Invalidation

Can resolve certain CDN incidents.

### Platform Meters

Use these to create game tension:

#### Platform Stability

Starts at 100. Incorrect decisions reduce it. Correct recovery actions increase it.

#### Technical Debt

Starts at 0. Shortcuts increase it. Refactoring and tests reduce it.

#### Incident Severity

Ranges from Info → Low → Medium → High → Critical → P1.

#### Team Confidence

Represents communication and clarity. Good explanations increase it.

## Victory and Failure

The game should avoid hard failure screens. Instead, failed missions can be completed with lower score, higher debt or additional recovery work.

A mission can end in:
- Perfect resolution.
- Stable resolution.
- Partial resolution.
- Escalated incident.
- Training retry.

## Replayability

Replaying a mission should allow:
- Better score.
- Different randomised details.
- Alternate answer paths.
- No-hint challenge.

## Cross References

- Challenge types: [05_CHALLENGE_ENGINE.md](05_CHALLENGE_ENGINE.md)
- Sample missions: [14_SAMPLE_MISSIONS.md](14_SAMPLE_MISSIONS.md)
- UI feedback: [08_AUDIO_ANIMATION_AND_FEEDBACK.md](08_AUDIO_ANIMATION_AND_FEEDBACK.md)
