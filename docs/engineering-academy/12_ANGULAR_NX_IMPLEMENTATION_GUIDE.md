# 12 — Angular/Nx Implementation Guide

## Goal

Provide implementation direction while allowing the coding agent to make final decisions.

## Angular Style

Prefer modern Angular patterns.

Recommended:
- Standalone components.
- Strict TypeScript.
- OnPush change detection where appropriate.
- Signals for local reactive UI state if suitable.
- RxJS where streams make sense.
- Lazy routes.
- Strongly typed inputs.

## Nx Structure

Use Nx libraries to enforce boundaries.

Suggested tags:
- `type:app`
- `type:feature`
- `type:ui`
- `type:util`
- `type:data-access`
- `scope:game`
- `scope:content`
- `scope:challenge`

Suggested dependency rules:
- Apps can depend on features and UI.
- Features can depend on UI, data-access and util.
- UI should not depend on feature.
- Content should not depend on UI.
- Challenges should depend on shared challenge contracts.

## SCSS

Use SCSS modules or component-level SCSS.

Guidelines:
- Use design tokens.
- Avoid deep selectors.
- Avoid global style leakage.
- Use mixins for common responsive patterns.
- Support high contrast and reduced motion.

## Zod Usage

Use Zod to validate:
- Campaign definitions.
- Mission definitions.
- Challenge definitions.
- Save state if loaded from storage.
- Optional simulated API responses.

This reinforces the learning theme.

## Testing

Recommended:
- Unit test scoring functions.
- Unit test content validation.
- Component test challenge rendering.
- Test persistence service.
- Test reducers/state transitions if used.

## Code Editor Display

For code challenges, implement a code display component.

Options:
- Lightweight syntax highlighting library.
- Simple styled pre/code blocks for v1.

Do not let syntax highlighting complexity block the project.

## Audio and Animation

Keep audio manager separate from components.

Keep animation utilities reusable.

## Implementation Flexibility

If a suggested library is unavailable or too heavy, choose a simpler implementation and document the choice.

## Cross References

- Technical architecture: [11_TECHNICAL_ARCHITECTURE.md](11_TECHNICAL_ARCHITECTURE.md)
- Testing: [15_TESTING_AND_QUALITY_STRATEGY.md](15_TESTING_AND_QUALITY_STRATEGY.md)
