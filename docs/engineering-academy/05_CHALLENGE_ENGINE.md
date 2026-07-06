# 05 — Challenge Engine

## Purpose

The challenge engine renders and evaluates interactive learning tasks. It must be data-driven so that new challenges can be added without changing core UI logic.

## Challenge Lifecycle

1. Load challenge definition.
2. Render challenge type component.
3. Player interacts.
4. Player submits answer.
5. Engine evaluates response.
6. Engine calculates score.
7. Engine returns feedback and consequence.
8. State is saved.

## Challenge Definition Requirements

Every challenge should include:

- id
- title
- type
- difficulty
- tags
- storyContext
- prompt
- artefacts
- expectedAnswer
- validationRules
- hints
- successFeedback
- failureFeedback
- rewards
- consequences
- helpLinks

See [06_CONTENT_MODEL_AND_SCHEMAS.md](06_CONTENT_MODEL_AND_SCHEMAS.md).

## Challenge Types

### Multiple Choice

Use for conceptual checks and judgement decisions.

Requirements:
- 3 to 5 options.
- One or more correct answers.
- Explanation for each option.

### Code Review

Show a code snippet and ask the player to identify issues.

Issues can include:
- Bug.
- Bad naming.
- Unsafe optional access.
- Missing validation.
- Weak typing.
- Wrong RxJS usage.
- Angular anti-pattern.
- Accessibility gap.
- Performance problem.

### Fill Code Gap

Player fills missing TypeScript, Angular template, SCSS or Zod code.

For v1, this can be implemented as selectable code fragments rather than free typing.

### Order Steps

Player orders workflow steps.

Examples:
- SDLC stages.
- Git recovery process.
- Incident response process.
- CloudFront invalidation checklist.

### Match Pairs

Match concepts to meanings.

Examples:
- HTTP status to meaning.
- Nx library type to purpose.
- Zod method to use case.

### Debug Logs

Show logs and ask the player to identify the most likely root cause.

### Contract Comparison

Show:
- Java API response.
- TypeScript interface.
- Zod schema.

Ask player to identify mismatch.

### Architecture Decision

Show two or three architecture choices. Player chooses and explains the best option.

### Deployment Decision

Given test results, pipeline state and incident severity, player chooses:
- Proceed.
- Rollback.
- Hold release.
- Toggle feature flag.
- Invalidate cache.
- Escalate.

## Evaluation Strategy

Use deterministic evaluation for v1.

Examples:
- Option IDs.
- Selected issue IDs.
- Ordered step IDs.
- Matched pair IDs.
- Code fragment IDs.

Avoid free-text grading in v1 unless simulated.

## Feedback Design

Feedback must include:

- Result.
- Explanation.
- Real-world lesson.
- Game consequence.
- Optional retry guidance.

## Challenge Tags

Use tags to drive Help Centre context.

Examples:
- angular
- typescript
- nx
- scss
- zod
- api
- java
- aws
- s3
- cloudfront
- cloudflare
- git
- cicd
- testing
- incident-response

## Anti-Patterns to Avoid

Do not create trivia-only questions.

Bad:
> What command creates an Angular component?

Better:
> The feature library needs a presentational component with no service dependency. Which implementation keeps the Nx boundary clean?

## Cross References

- Content schema: [06_CONTENT_MODEL_AND_SCHEMAS.md](06_CONTENT_MODEL_AND_SCHEMAS.md)
- Help system: [10_HELP_CENTRE_AND_HINT_SYSTEM.md](10_HELP_CENTRE_AND_HINT_SYSTEM.md)
