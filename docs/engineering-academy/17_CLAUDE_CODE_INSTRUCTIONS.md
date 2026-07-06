# 17 — Claude Code Instructions

## Role

You are the implementation agent for Engineering Academy.

Build the application from these specifications.

## Working Principles

1. Read the spec files before coding.
2. Build incrementally.
3. Keep architecture clean.
4. Prefer maintainability over cleverness.
5. Make reasonable coding decisions where the spec is silent.
6. Document important decisions.
7. Do not ask for unnecessary clarification.
8. Implement a usable vertical slice first.

## First Implementation Target

Build a polished vertical slice:

- Angular/Nx project.
- Landing screen.
- Player profile.
- Campaign hub.
- Mission player.
- One full campaign with at least 3 playable missions.
- Challenge engine with at least:
  - multiple choice
  - code review
  - contract comparison
- Help centre with contextual help.
- XP and basic badge system.
- Local save.
- Basic sound toggles.
- Basic animations.

## Decision Authority

You may choose:
- Exact Angular version.
- Styling approach.
- Animation library or native Angular animations.
- Content storage format.
- State management approach.
- Syntax highlighting approach.

But you must preserve:
- Data-driven content.
- Angular/Nx architecture.
- Zod validation.
- Extensible challenge engine.
- Accessible UI.
- Story-driven tone.

## Avoid

Do not:
- Hardcode all missions into components.
- Mix content and engine logic.
- Build only a static quiz.
- Ignore accessibility.
- Add unnecessary backend complexity.
- Send sensitive data anywhere.
- Over-engineer before the vertical slice works.

## Implementation Sequence

1. Scaffold workspace.
2. Create core models and schemas.
3. Create content loader.
4. Create player progress service.
5. Create campaign hub.
6. Create mission player.
7. Implement first challenge type.
8. Add sample missions.
9. Add XP/rewards.
10. Add Help Centre.
11. Add polish.

## Done Means

The user can run the app, create a profile, start a campaign, complete missions, get feedback, earn XP, use help and return later with saved progress.

## Cross References

- Project brief: [00_PROJECT_BRIEF.md](00_PROJECT_BRIEF.md)
- Technical architecture: [11_TECHNICAL_ARCHITECTURE.md](11_TECHNICAL_ARCHITECTURE.md)
- Implementation roadmap: [18_IMPLEMENTATION_ROADMAP.md](18_IMPLEMENTATION_ROADMAP.md)
