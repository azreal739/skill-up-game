# 11 — Technical Architecture

## Recommended Application Architecture

Use Angular with Nx.

Suggested workspace structure:

```text
apps/
  engineering-academy/

libs/
  core/
    game-state/
    content-loader/
    persistence/
    audio/
    animation/
  features/
    campaign-hub/
    mission-player/
    help-centre/
    player-profile/
    settings/
  ui/
    shell/
    hud/
    cards/
    buttons/
    code-viewer/
    meters/
  challenges/
    multiple-choice/
    code-review/
    fill-code-gap/
    order-steps/
    match-pairs/
    debug-logs/
    contract-comparison/
    architecture-decision/
    deployment-decision/
  content/
    campaigns/
    help/
```

## Architectural Principles

- Separate engine from content.
- Keep challenge evaluation deterministic.
- Prefer pure functions for scoring.
- Keep UI components presentational where possible.
- Keep state transitions explicit.
- Validate content with Zod.
- Persist progress locally.
- Make campaigns lazy-loadable.

## State Model

Core state includes:

- Player profile.
- XP.
- Rank.
- Badges.
- Unlocked campaigns.
- Mission completion.
- Settings.
- Current session.
- Tool inventory.
- Platform meters.

## Persistence

Use localStorage or IndexedDB for v1.

Persist:
- Profile.
- Progress.
- Settings.
- Achievements.
- Completed missions.
- Best scores.

Avoid storing sensitive information.

## Routing

Suggested routes:

- `/`
- `/profile`
- `/campaigns`
- `/campaigns/:campaignId`
- `/missions/:missionId`
- `/help`
- `/settings`

## Content Loading

Content can be loaded from local JSON files or TypeScript constants.

If using JSON:
- Validate using Zod.
- Fail gracefully with developer-friendly errors.

## Error Handling

User-facing:
- Friendly error screen.
- Option to return to hub.

Developer-facing:
- Console error with content ID.
- Validation failure detail.

## Cross References

- Angular/Nx details: [12_ANGULAR_NX_IMPLEMENTATION_GUIDE.md](12_ANGULAR_NX_IMPLEMENTATION_GUIDE.md)
- Content model: [06_CONTENT_MODEL_AND_SCHEMAS.md](06_CONTENT_MODEL_AND_SCHEMAS.md)
