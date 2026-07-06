# 00 — Project Brief

## Product Name

**Engineering Academy**

## Tagline

**Learn. Build. Defend. Lead.**

## One-Sentence Pitch

Engineering Academy is a story-driven training game where junior engineers become stronger Angular platform engineers by completing missions based on real technologies, real delivery patterns and realistic production incidents.

## Intended Users

Primary:
- Junior front-end engineers.
- Graduate engineers.
- Intermediate engineers who need stronger platform fundamentals.

Secondary:
- Senior engineers facilitating skill-up sessions.
- Team leads onboarding new joiners.
- Tech leads creating repeatable engineering enablement exercises.

## Target Team Context

The first version should focus on a team using:

- Angular
- TypeScript
- Nx monorepo architecture
- SCSS
- Zod for runtime validation
- Java back-end REST APIs
- AWS S3 static hosting
- AWS CloudFront CDN behaviour
- Cloudflare edge behaviour
- Git and pull request workflows
- CI/CD pipelines
- Feature flags
- Unit testing
- Production support

Do not make the first version generic across every programming ecosystem. The product should feel tailor-made for this stack.

## Problem Statement

Traditional skill-ups often become passive presentations or quizzes. They can teach syntax but fail to teach engineering judgement, communication, trade-offs, debugging, SDLC thinking and production ownership.

Engineering Academy solves this by turning technical learning into a mission-driven experience where engineers must investigate, reason, decide, repair and reflect.

## Product Outcome

A player should finish early campaigns understanding basics such as TypeScript types, Angular components, SCSS structure and Git workflow.

A player should finish later campaigns able to reason about Nx boundaries, Zod runtime validation, API contract drift, CDN caching, deployment failures, feature flag risk, incident response and production stabilisation.

## Scope of v1

The first production-quality implementation should include:

- Campaign hub.
- Player profile and progression.
- Mission engine.
- Challenge engine.
- Help centre.
- Hint system.
- XP and achievements.
- Local save state.
- One fully playable campaign.
- Framework for adding more campaigns without changing the engine.
- Polished UI, animation and sound foundation.

## Out of Scope for v1

These can be added later:

- Real multiplayer networking.
- Server-side accounts.
- Real AI API integration.
- Real LMS integration.
- Real Git provider integration.
- Company authentication.
- Backend persistence.

The first implementation may simulate these locally.

## Key Cross References

- Gameplay systems: [03_GAMEPLAY_SYSTEMS.md](03_GAMEPLAY_SYSTEMS.md)
- Challenge engine: [05_CHALLENGE_ENGINE.md](05_CHALLENGE_ENGINE.md)
- Technical architecture: [11_TECHNICAL_ARCHITECTURE.md](11_TECHNICAL_ARCHITECTURE.md)
- Claude instructions: [17_CLAUDE_CODE_INSTRUCTIONS.md](17_CLAUDE_CODE_INSTRUCTIONS.md)
