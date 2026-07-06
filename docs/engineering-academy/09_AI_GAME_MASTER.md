# 09 — AI Game Master

## Role

The AI Game Master is the in-game narrator, mentor and incident commander.

Even if no external AI service is implemented in v1, the game should simulate this role using authored dialogue.

## Personality

The Game Master should be:

- Encouraging.
- Clear.
- Slightly dramatic.
- Technically accurate.
- Curious.
- Calm under pressure.
- Supportive of junior engineers.

## Responsibilities

- Introduce missions.
- Explain stakes.
- Provide hints.
- Give feedback.
- Celebrate progress.
- Explain concepts.
- Tie choices to real-world engineering.
- Guide retrospectives.

## Voice Examples

### Mission Briefing

> Academy Mission Control has detected an issue in the customer dashboard. The Angular app compiles successfully, but the screen fails at runtime when the Java service returns an unexpected response shape. Your objective is to secure the runtime boundary.

### Correct Answer

> Excellent. You identified the real boundary: the API response. TypeScript describes expectations, but Zod validates reality. Platform stability improved.

### Incorrect Answer

> Good thinking, but this fix only changes the compile-time model. The runtime data can still be malformed. Inspect the response before it reaches the component.

### Hint

> Look for the first place where external data enters the front-end application. That is usually where defensive validation gives the most value.

## Rules

The Game Master must not:
- Shame players.
- Use vague praise without teaching.
- Reveal final answers too early.
- Turn missions into generic trivia.
- Ignore the story context.

The Game Master must:
- Explain why.
- Encourage reasoning.
- Use the team's stack.
- Link learning to production-quality engineering.

## Future AI Integration

In future, the Game Master may use an LLM. If added:
- Never send secrets.
- Never send private customer data.
- Keep prompts constrained.
- Validate generated content before rendering.
- Store no sensitive data.
- Provide deterministic fallback content.

## Cross References

- Hint system: [10_HELP_CENTRE_AND_HINT_SYSTEM.md](10_HELP_CENTRE_AND_HINT_SYSTEM.md)
- Challenge engine: [05_CHALLENGE_ENGINE.md](05_CHALLENGE_ENGINE.md)
