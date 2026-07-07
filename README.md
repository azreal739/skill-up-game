# Skill-Up Workspace

An Nx monorepo with two Angular 18 apps:

| App | What it is | Serve |
| --- | --- | --- |
| **Engineering Academy** (`apps/engineering-academy`) | A story-driven training game for Angular platform engineers — missions, challenges, XP, ranks, badges, hints and a Help Centre. Spec pack in [`docs/engineering-academy/`](docs/engineering-academy/README.md). | `npm run start:academy` |
| **Up Skill Game** (`apps/skill-up-game`) | A mini-game hub: tic-tac-toe, blackjack, chess, resolutions, calculator, with per-game history and an MSW mock API. | `npm start` |

## Engineering Academy

*Learn. Build. Defend. Lead.*

Two full campaigns ship today, each ending in a multi-stage boss incident:

- **Foundations of the Platform** (10 missions) — Angular, TypeScript, SCSS,
  Git and testing basics, culminating in the Dashboard v2 launch.
- **Zod Gate** (8 missions) — runtime validation at the API boundary; unlocks
  once Foundations is complete.

Both run on the same engine: multiple-choice, code-review and
contract-comparison challenges, a four-level hint ladder, contextual help,
platform meters, XP/rank/badge progression, campaign unlock gating and local
save state. Content is data-driven and validated with Zod; adding missions or
campaigns means adding data, not engine code.

Key entry points:

- `libs/academy/content-model` — types, Zod schemas, evaluation & scoring engine
- `libs/academy/content` — campaign packs and help topics (pure data)
- `libs/academy/data-access` — content loader, save state, mission session, audio
- `libs/academy/ui`, `libs/academy/challenges` — presentational and challenge components
- `docs/engineering-academy/IMPLEMENTATION_NOTES.md` — decisions and how to extend

## Development

```bash
npm install
npm run start:academy   # Engineering Academy — http://localhost:4200
npm start               # Up Skill Game — http://localhost:4200
```

## Build & test

```bash
npm run build           # nx run-many -t build (both apps)
npm test                # nx run-many -t test (Karma + Jasmine, both apps)
```

In containers/CI, point Karma at a Chrome binary and use the no-sandbox
launcher:

```bash
CHROME_BIN=/path/to/chromium npx nx run-many -t test -- --watch=false --browsers=ChromeHeadlessNoSandbox
```

## Workspace layout

```
apps/engineering-academy/   Academy app shell, routes, theme, feature screens
apps/skill-up-game/         mini-game hub app (+ MSW mock backend in backend/)
libs/academy/               academy libraries (content-model, content, data-access, ui, challenges)
docs/engineering-academy/   full specification pack (docs 00–20) + implementation notes
```
