# 10 — Help Centre and Hint System

## Goal

Players should never be stuck, but the game should not immediately give away answers.

## Help Centre

The Help Centre is an always-available reference library.

It should be searchable and context-aware.

## Required Help Topics

### Angular Basics

- Components.
- Templates.
- Inputs.
- Outputs.
- Services.
- Dependency injection.
- Routing basics.
- Lifecycle basics.
- Signals or RxJS depending on app choice.

### TypeScript Basics

- Interfaces.
- Types.
- Union types.
- Optional properties.
- Narrowing.
- Generics.
- Strict null checks.
- Defensive coding.

### Nx Basics

- Apps.
- Libraries.
- Tags.
- Boundaries.
- Dependency graph.
- Affected builds.
- Shared libraries.
- Feature libraries.

### SCSS Basics

- Nesting.
- Variables.
- Mixins.
- Responsive layout.
- BEM-style naming or chosen convention.
- Avoiding overly coupled styles.

### Zod Basics

- Runtime validation.
- `z.object`.
- `safeParse`.
- Error handling.
- Transforming data.
- Default values.
- API boundary validation.

### REST/API Basics

- GET/POST/PUT/PATCH/DELETE.
- Status codes.
- Request/response shape.
- Error payloads.
- Contract drift.
- Java DTO awareness.

### AWS/S3/CloudFront Basics

- Static assets in S3.
- CDN behaviour.
- Cache invalidation.
- Hashed filenames.
- Origin.
- Edge locations.
- Deployment validation.

### Cloudflare Basics

- DNS.
- Edge caching.
- WAF.
- Routing.
- Headers.
- Browser cache vs edge cache.

### Git Basics

- Branches.
- Pull requests.
- Merge conflicts.
- Revert.
- Cherry-pick.
- Trunk-based development basics.

### Testing Basics

- Unit tests.
- Component tests.
- Mocking services.
- Testing error states.
- Contract test thinking.

### Incident Response

- Triage.
- Impact.
- Severity.
- Communication.
- Rollback vs hotfix.
- Root cause analysis.
- Post-incident review.

## Contextual Help

Challenge definitions should include `helpLinks`.

Example:
```json
{
  "helpLinks": [
    { "topicId": "zod.safeParse", "label": "Using safeParse" },
    { "topicId": "api.runtime-boundary", "label": "Runtime API boundaries" }
  ]
}
```

## Hint Ladder

Each challenge should provide four hint levels.

### Hint Level 1 — Direction

Small nudge.

### Hint Level 2 — Concept

Explain the relevant concept.

### Hint Level 3 — Specific Clue

Point to the relevant artefact or line.

### Hint Level 4 — Guided Solution

Walk through the solution but still ask the player to submit.

## Hint Cost

Hints may reduce final score but should never block progress.

Suggested:
- Hint 1: free.
- Hint 2: -5 XP.
- Hint 3: -10 XP.
- Hint 4: -20 XP.

## Help UX

Help must be:
- Searchable.
- Easy to close.
- Keyboard accessible.
- Available without losing challenge progress.
- Linked from feedback.

## Cross References

- Challenge engine: [05_CHALLENGE_ENGINE.md](05_CHALLENGE_ENGINE.md)
- Content schemas: [06_CONTENT_MODEL_AND_SCHEMAS.md](06_CONTENT_MODEL_AND_SCHEMAS.md)
