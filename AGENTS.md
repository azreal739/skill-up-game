# Agent guide (Codex, and any non-Claude AI tooling)

This repo is pair-maintained by AI agents. **CLAUDE.md is the authoritative,
always-current guide** — read it first; this file is a condensed map plus the
bits Codex needs to build and deploy without breaking the conventions.

## What this repo is

Nx monorepo, Angular 20, two apps:

- `apps/engineering-academy` — the product: a story-driven learning game
  ("Engineering Mission Control"). Spec pack: `docs/engineering-academy/`.
- `apps/skill-up-game` — legacy mini-game hub; rarely touched.

Academy libraries (`libs/academy/*`, dependency direction enforced by ESLint
module boundaries — do not import "upward"):

```
content-model (types, Zod schemas, scoring, ranks, badges, personas)
  → content (campaign packs + help topics, pure data)
  → data-access (ContentService, GameStateService, SpeechService, persistence)
  → ui / challenges (presentational; ui talks to services only via injection
    tokens like EA_SPEECH_PLAYER)
  → app
```

## Build / verify

- Build: `npx nx build engineering-academy`
- Lint: `npx nx run-many -t lint`
- Tests (Karma; register new lib spec files in
  `apps/engineering-academy/src/academy-libs.spec.ts`):
  `npx nx test engineering-academy --watch=false`
- Install note: `npm ci --ignore-scripts` (onnxruntime-node's postinstall
  downloads a native binary this project never uses).
- Deployable output: `dist/apps/engineering-academy/browser` (static SPA,
  localStorage-only, no backend). The `shareable` build configuration switches
  to hash routing + relative baseHref for dumb static hosts.

## Rules that tests enforce (don't fight them, extend them)

- Content packs live in `libs/academy/content/src/lib/<pack>/`;
  `content-integrity.spec.ts` validates schemas, unlock chains, badge/help
  references, hint ladders (levels 1–4), single-correct-answer counts,
  correct-answer position distribution (<45% per position), and that every
  briefing `speaker` is registered in `content-model/src/lib/personas.ts`.
- Challenge types are ONLY `multiple-choice` | `code-review` |
  `contract-comparison`.
- XP comes from challenge `difficulty` (intro/easy 10, medium 25, hard 50,
  boss 100); the rank curve is anchored to max earnable XP by a test.
- Saves are Zod-validated (`playerStateSchema`, v2). New settings fields need
  schema defaults so existing saves keep parsing.

## Mentor voice (Kokoro TTS) — deployment facts

- The voice engine runs client-side in a web worker
  (`libs/academy/data-access/src/lib/speech.worker.ts`).
- `assets/tts/ort/` must contain ALL FOUR `ort-wasm-simd-threaded*` files
  (the jsep pair is what actually loads) — the project.json assets glob
  handles this; don't trim it.
- Model files: the worker fetches `/assets/tts/model/...` first and falls back
  to HuggingFace (browser-cached). Web deploys need no model files bundled;
  the offline local package bundles them via
  `node tools/package-academy-local.mjs`.
- Device selection is automatic: bundled q8 model → WASM (offline guarantee);
  otherwise WebGPU + fp32 when a GPU adapter exists (larger one-time
  download), WASM/q8 fallback.
- If the host can send headers, `Cross-Origin-Opener-Policy: same-origin` +
  `Cross-Origin-Embedder-Policy: require-corp` unlock multithreaded WASM
  (faster CPU generation). Safe here: all assets are same-origin and
  HuggingFace sends CORS headers.

## Process

- Never commit directly to `main` — branch, open a PR, and let the user merge
  engine/logic changes. See CLAUDE.md "Working agreement" for the full flow
  and current project status/history.
