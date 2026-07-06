# Engineering Academy — Implementation Notes

Decisions made where the spec pack delegates choice to the coding agent
(17_CLAUDE_CODE_INSTRUCTIONS.md "Decision Authority", 12_ANGULAR_NX "Implementation
Flexibility"). The vertical slice ships everything listed under doc 17's
"First Implementation Target".

## Workspace layout

Doc 11 suggests many small libs. The slice consolidates to five academy
libraries with clear boundaries (tags declared in each `project.json`):

| Project | Tags | Contents |
| --- | --- | --- |
| `apps/engineering-academy` | `type:app, scope:academy` | Shell, routes, theme, feature screens |
| `libs/academy/content-model` | `type:util` | Types, Zod schemas, evaluation, scoring, ranks, badges, meters, player-state |
| `libs/academy/content` | `type:content` | Campaign packs + help topics (data only — no Angular imports) |
| `libs/academy/data-access` | `type:data-access` | Content loader, persistence, game state, mission session, audio |
| `libs/academy/ui` | `type:ui` | Presentational components (HUD, meters, code viewer, dialogue, badges) |
| `libs/academy/challenges` | `type:feature, scope:challenge` | Challenge host + per-type interaction components |

Feature screens live inside the app (`src/app/features/*`) rather than one
lib per feature: the app is their only consumer and the engine/content/UI
boundaries are the ones that matter. Splitting them out later is mechanical.
No ESLint is configured in this repo yet, so boundary rules are declared as
tags but not machine-enforced; adding `@nx/eslint` + `enforce-module-boundaries`
is the natural next infra step.

## Choices doc 17 delegates

- **Angular version**: 18.2 (matches the existing workspace).
- **State management**: Angular signals with explicit mutation methods on
  `GameStateService`; no NgRx. Mission play is a small state machine in
  `MissionSessionService` (briefing → challenge → results).
- **Content storage**: typed TypeScript constants (not JSON files), still
  validated with Zod at load time in `ContentService` — author-time type
  safety plus real runtime validation, per doc 06's allowance.
- **Syntax highlighting**: styled `pre/code` blocks (doc 12 explicitly says
  don't let highlighting block the project).
- **Animation**: CSS keyframes + transitions; all effectively disabled by the
  reduced-motion setting (body class) and `prefers-reduced-motion`.
- **Audio**: WebAudio-generated tone patterns behind an `AudioService` with
  master/sfx/music volumes and mute persisted in save state. Swapping in real
  samples only touches `audio.service.ts`. The music slider is plumbed but
  reserved (no ambience yet) and labelled as such in Settings.

## Gameplay rules the spec leaves open

- **Challenge XP** = difficulty base (10/10/25/50/100) − hint costs
  (0/5/10/20 by level, content can override), floored at 0. Challenge-level
  `xp` rewards in content are display labels; the engine derives XP from
  difficulty so scoring stays consistent.
- **Mission outcomes**: `perfect` (all first-try) / `stable` (all correct
  eventually) / `partial` (something accepted at partial credit). After two
  failed attempts a challenge offers "Accept partial result & continue" so
  nobody is ever hard-stuck (docs 03/10).
- **Replays credit only the improvement** over the best previous run —
  replaying for a better score is worthwhile, grinding is not.
- **Meters**: wrong submissions apply the challenge's authored consequences;
  finishing a mission applies a small +5 stability / +5 team-confidence
  recovery.
- **Ranks** are XP-threshold based for the slice; campaign-milestone
  requirements can be layered on when more campaigns ship.

## Testing

Lib specs are co-located with their code. The Angular karma builder only
discovers specs under the app source root, so
`apps/engineering-academy/src/academy-libs.spec.ts` imports them into the
app's single test run (55 specs). `karma.conf.js` defines a
`ChromeHeadlessNoSandbox` launcher for containers/CI.

## Adding content (the doc 01 extensibility contract)

A new mission = a new file in `libs/academy/content/src/lib/<campaign>/` and
an entry in the campaign's `missions` array. A new campaign = a new
`CampaignPack` registered in `ContentService`'s pack list. The content
integrity spec automatically validates schemas, unique IDs, help-link
references and badge references for every registered pack.
