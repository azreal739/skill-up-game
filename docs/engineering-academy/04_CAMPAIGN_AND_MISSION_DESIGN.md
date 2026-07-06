# 04 — Campaign and Mission Design

## Campaign Structure

Each campaign should contain:

- Campaign intro cinematic.
- 6 to 12 missions.
- 1 mid-campaign checkpoint.
- 1 boss incident.
- Final retrospective.
- Campaign certificate.
- Unlockable badge or title.

## Mission Structure

Each mission should contain:

1. Title.
2. Difficulty.
3. Learning objectives.
4. Story briefing.
5. Context artefacts.
6. Challenges.
7. Hints.
8. Consequences.
9. Success explanation.
10. Reflection prompt.
11. Rewards.
12. Unlock conditions.

## Mission Types

### Training Mission

Low-pressure learning.

### Investigation Mission

Read clues and identify root cause.

### Build Mission

Create or complete code.

### Review Mission

Review code, architecture or SDLC artefacts.

### Incident Mission

Time pressure, logs, dashboards and business impact.

### Boss Mission

Multi-stage challenge combining everything from the campaign.

## Difficulty Model

### Level 1 — Learn

Simple guided tasks. Explain concepts.

### Level 2 — Apply

Small realistic scenarios.

### Level 3 — Investigate

Logs, broken code, unexpected data.

### Level 4 — Decide

Trade-offs, rollback/hotfix, architecture choices.

### Level 5 — Lead

Production incident, communication, prioritisation and retro.

## Campaign List

### Campaign 1 — Foundations of the Platform

Focus:
- Angular basics.
- TypeScript basics.
- Components.
- Templates.
- Inputs and outputs.
- Basic Git.
- Basic testing.

Theme:
The player is joining the Academy and learning how the platform works.

### Campaign 2 — Component Forge

Focus:
- Component design.
- Presentational vs container components.
- SCSS organisation.
- Responsive layout.
- Accessibility basics.
- Reusable UI patterns.

Theme:
The UI guild needs reusable components for the platform.

### Campaign 3 — TypeScript Trials

Focus:
- Interfaces.
- Type aliases.
- Union types.
- Narrowing.
- Generics.
- Optional values.
- Null safety.
- Safer refactoring.

Theme:
Weak typing has allowed defects into the platform. The player strengthens the codebase.

### Campaign 4 — Zod Gate

Focus:
- Runtime validation.
- API boundaries.
- Schema parsing.
- Safe fallbacks.
- Error states.
- Defensive integration.

Theme:
The Java API returned unexpected data. The front end must protect users from bad runtime data.

### Campaign 5 — Nx Monorepo Maze

Focus:
- Apps and libraries.
- Dependency boundaries.
- Shared UI.
- Feature libraries.
- Build graph.
- Affected commands.
- Ownership.

Theme:
The monorepo is growing. Without rules, it will become chaos.

### Campaign 6 — API Contract Crisis

Focus:
- REST integration.
- DTOs.
- Java service expectations.
- HTTP status codes.
- Contract drift.
- Error payloads.
- FE/BE alignment.

Theme:
The Angular app and Java back end disagree about the contract.

### Campaign 7 — CloudFront Outage

Focus:
- S3 hosting.
- CloudFront cache.
- Cache invalidation.
- Hashed assets.
- Environment files.
- Deployment validation.

Theme:
Customers are receiving old files after a deployment.

### Campaign 8 — Cloudflare Shield

Focus:
- DNS concepts.
- Edge behaviour.
- WAF basics.
- Headers.
- Caching.
- Routing.
- Access problems.

Theme:
Traffic behaves differently at the edge. The player must diagnose without guessing.

### Campaign 9 — Angular Upgrade Crisis

Focus:
- Angular upgrade process.
- Dependency compatibility.
- Deprecated APIs.
- Test stabilisation.
- CI failures.
- Incremental migration.

Theme:
The platform must upgrade safely while delivery continues.

### Campaign 10 — Micro Frontend Operations

Focus:
- Module boundaries.
- Federation concepts.
- Shared dependencies.
- Runtime loading.
- Independent release.
- Ownership.

Theme:
Multiple teams are deploying independently. The platform must remain stable.

### Campaign 11 — Save Production

Focus:
- Incident response.
- Logs.
- Monitoring.
- Feature flags.
- Rollback.
- Hotfix.
- Communication.
- Root cause analysis.

Theme:
Production is degraded. Restore service and explain what happened.

### Campaign 12 — AI Assisted Engineering

Focus:
- Prompting.
- AI review.
- Hallucinations.
- Secure usage.
- Validating generated code.
- Tests as guardrails.

Theme:
The AI assistant is useful but overconfident. Use it responsibly.

## Cross References

- Campaign content packs: [13_CAMPAIGN_CONTENT_PACKS.md](13_CAMPAIGN_CONTENT_PACKS.md)
- Sample missions: [14_SAMPLE_MISSIONS.md](14_SAMPLE_MISSIONS.md)
