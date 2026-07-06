# 02 — Player Experience

## First-Time User Journey

1. Player opens Engineering Academy.
2. Animated Academy intro appears.
3. Player creates or selects a profile.
4. Player receives the first rank: Graduate Engineer.
5. Player enters the Campaign Hub.
6. Only Campaign 1 is unlocked.
7. Player starts Mission 1: Welcome to the Platform.
8. The AI mentor explains the mission.
9. Player completes a simple Angular/TypeScript challenge.
10. Player earns XP and sees progress.
11. Player unlocks the next mission.

## Returning User Journey

1. Player opens the game.
2. Save state loads automatically.
3. Dashboard shows:
   - Current rank.
   - Active campaign.
   - Recent achievements.
   - Next recommended mission.
4. Player continues, replays old missions or opens Help Centre.

## Session Modes

### Solo Mode

One player works through missions independently.

### Facilitated Team Mode

A facilitator runs the game with a team. The group discusses answers before submitting.

### Classroom Mode

Future mode. Multiple groups compete or collaborate.

For v1, implement Solo Mode and provide UI labels that do not prevent facilitated use.

## Emotional Arc

### Early Game

The player should feel welcomed, safe and curious.

### Mid Game

The player should feel challenged but capable.

### Late Game

The player should feel trusted with meaningful engineering decisions.

### Victory

The player should feel proud and able to explain what they learned.

## Player Feedback Principles

When correct:
- Celebrate.
- Explain why it works.
- Connect it to real-world engineering.

When incorrect:
- Avoid shame.
- Explain the likely misunderstanding.
- Offer a hint or recovery step.
- Show the consequence in game terms.

## Example Feedback

Correct:
> Nice work. You protected the dashboard from an unexpected API shape. TypeScript helped at compile time, but Zod protected the runtime boundary. Platform stability improved.

Incorrect:
> Good attempt. The issue is that the TypeScript interface only describes what we expect. It does not validate what the Java service actually returns at runtime. Try looking at the API boundary.

## Player Progression

See [03_GAMEPLAY_SYSTEMS.md](03_GAMEPLAY_SYSTEMS.md) for detailed ranks, XP and badges.

## UX Requirement

The player must always understand:

- What is happening in the story.
- What they are being asked to do.
- Why the challenge matters.
- What happens after their answer.
- How to get help.
