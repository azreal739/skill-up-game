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
- Campaigns declare a `track` (`mission-control` story sims | `field-notes`
  DMM past learnings — `content-model/src/lib/tracks.ts`). Each track is its
  own linear unlock chain via `requiredCampaignId` (exactly one root per
  track; prerequisites never cross tracks); declare `difficulty`
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
- Active development branch has also been `claude/engineering-academy-enhancements-t0g5is`
  (reset from `origin/main` per PR, force-with-lease over already-merged history).

## Project status / history (keep current for the next session)

**Engineering Academy is feature-complete against its spec pack.** Built so far:

- **Engine — Technical Debt Review Loop (MR1–MR4, merged):** first attempt is
  locked (no brute-force retry); a wrong first attempt earns 0 challenge XP,
  applies its consequence once, and creates a **Technical Debt** backlog item;
  players remediate later in **Academy Review Mode** (~40% XP back, never
  restores perfect-mission eligibility). Save is `playerStateSchema`
  (`version: 2`, migrated from v1); `GameStateService` is the single writer.
  Features: `backlog`, `review/:debtItemId`, `notes`, learning-dashboard
  `profile`, richer results screens, programmatic badges.
- **Track/Path system:** two tracks in `content-model/src/lib/tracks.ts` for
  engineering (`mission-control` story sims, `field-notes` DMM learnings) plus
  **`dance-judging`**. Path overview at `/paths/:trackId`, nav "Campaigns"
  dropdown, profile grouped by path. Each track is its own linear
  `requiredCampaignId` chain.
- **Rank rename:** RANKS are the futuristic **Mission Operator** ladder (ids kept
  as junior-*/…/distinguished-*). LEVELS re-themed. Top tier (`distinguished-3`,
  "Mission Sovereign III") anchored at ~90% of max earnable XP; current tiers
  **38000 / 44000 / 50000**, max earnable **≈55.8k** (final — curriculum
  complete). Rebalance in `ranks.ts` + `ranks.spec.ts` only if the anchor guard
  fails.
- **Dance Academy — Judge Path (`dance-judging` track) — COMPLETE.** 13
  specialist modules + 2 exams, each shipped as its own verified auto-merged
  content PR (this session: #66–#71). Unlock chain, in order:
  `judge-core-fundamentals → judge-waltz → judge-nightclub → judge-wcs →
  judge-cha-cha → judge-triple-two → judge-polka → judge-east-coast-swing →
  judge-two-step → judge-samba → judge-street → judge-stage → judge-comparative
  → judge-mock-theory → judge-final-cert`. Dances judged through six lenses
  (timing/rhythm/motion/character/signature-figures/spatial-structure); Street &
  Stage are solo/era families; Comparative Judging is the placement skill. All
  reuse the 3 challenge types — no new framework. Spec pack extracted at
  `/tmp/.../scratchpad/dance-path/Dance_Academy_Judge_Path_Full_Spec` (re-extract
  from the uploaded zip if gone).
- **Bundle budgets** (`apps/engineering-academy/project.json`) grew with content:
  initial `maximumWarning: 3.25MB` / `maximumError: 3.75MB`. Bump as needed.

Deferred (NOT built — would be engine work, ask for review first): fully
interactive challenge types (animated diagrams, metronome timing, mock-sheet UI)
and a per-path terminology re-skin (e.g. "Judge Points").

## Next up (new session): build & package for local sharing

Goal: let the user run Engineering Academy **locally on family machines** (their
Jnrs' and husband's) to play the game — a shareable local build, not a hosted
deploy. Starting points: the app is a static Angular SPA — `npx nx build
engineering-academy` emits `dist/apps/engineering-academy`. It uses
`localStorage` only (no backend), so any static file server works, but the SPA
needs a fallback rewrite to `index.html` for its routes. Consider: a documented
`serve dist` recipe, a tiny bundled static server, and/or checking `baseHref`
for file-path vs served hosting. Confirm target OSes and how non-technical
family members will launch it before choosing an approach.
