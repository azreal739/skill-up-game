# Repo guide for Claude sessions

Nx monorepo with two Angular 20 apps:

- `apps/skill-up-game` — legacy mini-game hub (stable, rarely touched).
- `apps/engineering-academy` — the main product: a story-driven learning game
  ("Engineering Mission Control"). Spec pack lives in `docs/engineering-academy/`
  (23 docs; `13_CAMPAIGN_CONTENT_PACKS.md` lists campaigns, `14_SAMPLE_MISSIONS.md`
  shows mission shape).

Academy libraries (`libs/academy/*`, tags enforced by ESLint module boundaries):
`content-model` (types, Zod schemas, scoring, ranks/levels, badges, meters) →
`content` (campaign packs + help topics, pure data) → `data-access` (ContentService,
GameStateService, MissionSessionService, persistence) → `ui` / `challenges`
(presentational) → app.

## Verify commands

- Build: `npx nx build engineering-academy`
- Tests (karma needs the Playwright chromium):
  `CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npx nx test engineering-academy --watch=false --browsers=ChromeHeadlessNoSandbox`
- Lint: `npx nx run-many -t lint`
- Lib specs are registered explicitly in `apps/engineering-academy/src/academy-libs.spec.ts` — add new spec files there.
- E2E smoke: serve on a port, drive with Playwright from
  `/opt/node22/lib/node_modules/playwright/index.mjs`, executablePath
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Seed progress via
  localStorage key `engineering-academy:save` (shape = `playerStateSchema` in
  `content-model/src/lib/player-state.ts`).

## Content authoring rules (enforced by `libs/academy/content/src/lib/content-integrity.spec.ts` — extend it, never weaken it)

- Challenge types are ONLY `multiple-choice` | `code-review` | `contract-comparison`.
  MC and CC support optional `multiSelect: true`.
- Single-select challenges have exactly ONE correct option; multiSelect ≥ 2.
  **Do not put the correct answer first by default** — distribute positions
  (a guard test caps any position at <45%). Evaluation is id-based, so option
  order is presentational.
- Consequences fire ONLY on wrong answers → they must model harm:
  `stability` < 0, `technical-debt` > 0, `team-confidence` < 0, `severity` ∈ {1,2}
  (index into 6 levels), `reason` phrased as the failure's cost.
- Hints: exactly levels 1–4 (Direction / Concept / Specific clue / Guided solution).
  Costs 0/5/10/20 XP. Tone: kind Senior Dev, never shaming.
- Real challenge XP comes from `difficulty` (intro/easy 10, medium 25, hard 50,
  boss 100) — challenge-level `rewards` xp amounts are display-only. Mission-level
  xp rewards DO count. Perfect +50, no-hint +25 per mission.
- Campaigns: linear unlock chain via `requiredCampaignId`; declare `difficulty`
  (beginner→expert, never decreasing along the chain); every campaign ends in
  exactly one `boss` mission (bosses get special UI automatically); badge ids
  must exist in `content-model/src/lib/badges.ts`; helpLink topicIds must exist
  in `content/src/lib/help-topics.ts`.
- New packs: register in `data-access/src/lib/content.service.ts`, export from
  `content/src/index.ts`, extend the packs array + unlock-chain map in
  content-integrity.spec.
- Rank/level curve is anchored to max earnable XP by a test — adding content
  changes the ceiling; rebalance `content-model/src/lib/ranks.ts` if it fails.

## Working agreement (user-confirmed)

- Branch: `claude/skill-up-game-review-x5t6o3`; reset it from `origin/main` per PR.
- Pure content PRs: create AND merge autonomously after green build/test/lint +
  a Playwright smoke. Engine/logic changes: ask for review first.
- `git config user.email noreply@anthropic.com`, `user.name Claude`. The stop
  hook flags GitHub's own merge commits (`noreply@github.com`) as unverified —
  that is a false positive; never rewrite commits already on main.
- Verify visually with screenshots; respect the reduced-motion setting in any
  new animation (global kill switch on `html/body.ea-reduced-motion`).
