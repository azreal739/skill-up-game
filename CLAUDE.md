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
  a Playwright smoke. Engine/logic changes: proposal → user go-ahead → build on
  the branch → **open an MR and wait for the user's review/merge call** (2026-07-13:
  approval to build ≠ approval to merge; one MR per branch is fine when the work
  shares a branch).
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

## Done this session (branch `claude/engineering-academy-build-audit-wqabi2`)

- **Shareable local package (built + verified):** `node
  tools/package-academy-local.mjs` → `dist/EngineeringAcademy-local.zip`
  (~1 MB). Uses a `shareable` build configuration (hash routing via
  `environment.useHashRouting` + `baseHref: './'`), zero-dependency
  double-click launchers for Windows (PowerShell HttpListener) / macOS+Linux
  (core-Perl server) on fixed port **8377** (keeps the localStorage save
  origin stable), SPA fallback + MIME handling, family README. Verified
  end-to-end with Playwright from the unzipped artifact. Also fixed a
  pre-existing `>>` vs `>>>` NaN bug in `campaign-emblem.component.ts`.
- **Full content audit of both engineering tracks (25 packs, ~38.6k lines):**
  every challenge's correct answers, feedback, and hints checked. One factual
  error found and fixed — `fp-004-c2` (fp-typescript) claimed seedless
  `reduce` over `Cart[]` compiles to runtime garbage; in TS it's a TS2365
  compile error. Everything else accurate. 120/120 tests, lint, build green.
- **Persona avatars — SHIPPED:** `personas.ts` registry (content-model) +
  `PersonaAvatarComponent` (ui): five SVG mentor busts with talking/idle CSS
  states in mentor-dialogue; content-integrity guard rejects unregistered
  briefing speakers; reduced-motion safe.
- **All of this session's work is MERGED to main** (PR #73 the bulk, #74 + #75
  follow-up fixes below). The user also has a **live web deploy** at
  `engineering-academy.azreal739gmail-com.chatgpt.site` (built/deployed via
  Codex from main) — it has no bundled model, so voice there downloads from
  HuggingFace on first enable.
- **Voice fix (PR #74, merged):** transformers.js 3.8's onnxruntime loads the
  unified **jsep** wasm build even for the plain wasm backend — the assets glob
  must ship all four `ort-wasm-simd-threaded*` files or the engine dies with
  "no available backend found" (exactly what happened on the first web deploy).
- **Voice latency pass (PR #75, merged):** worker streams audio **per
  sentence** (kokoro `stream()` + `TextSplitterStream`); dialogue **prefetches
  the next block** while the current one plays (`EaSpeechPlayer.prefetch?`);
  a **warm-up** generation right after 'ready' absorbs session-compile cost;
  **device selection** — bundled q8 model present (local package) → WASM/q8
  offline guarantee; no bundle + real WebGPU adapter (web deploys) → fp32 on
  GPU (~10× faster, ~330MB one-time download), fallback WASM/q8. Perf ranking:
  GPU machine hosted ≫ CPU; GPU-less machines: local package beats hosted
  (launchers send COOP/COEP → threaded wasm; chatgpt.site host doesn't).
  Pending: user listen-test feedback (speed + sentence-seam quality).
- **Voice check + late-ready fix (follow-up MR):** calibration now ends with
  Mission Control audibly speaking `VOICE_CHECK_LINE` (`speech-shared.ts`)
  before the overlay closes — only on user-initiated enables
  (`enable({voiceCheck})`; boot warms silently, no surprise audio). And the
  reported "DMM Field Notes audio not playing": briefings that start while
  the engine is still booting no longer skip narration — `active()` includes
  'loading' and `speak()` parks on `waitForReady()` (60s cap), so the block
  holds until the engine is hot, then speaks. Worker guards generate-before-
  init with a clean audio-error.
- **Narration persistence + hygiene (merged):** `SpeechAudioCache`
  (data-access) keeps generated wavs in IndexedDB across sessions (pruned at
  300 lines, failure-silent; karma tests hit real IndexedDB). Component-style
  budget warning bumped to 12kB (mission-player scss was permanently warning).
- **Voice buttons everywhere (merged):** `ea-voice-button` (ui) — reusable
  play/pause/generating-spinner control on the extended `EA_SPEECH_PLAYER`
  port (`nowPlaying()/pause()/resume()` backed by a SpeechService signal);
  drop it next to any text. Wired: challenge questions (Mission Control),
  revealed hints (Senior Dev), Help Centre (new **Academy Archivist**
  persona, af_nicole — remember to bundle new voices in
  package-academy-local.mjs TTS_FILES). Hidden entirely when voice is off.
- **Round 2 enhancements (merged):** npm audit → 0 vulns via package.json
  `overrides` (all dev-tooling chains; patched leaves within existing
  majors). Spoken answer feedback (Senior Dev reads success/failure + option
  feedback via `spokenFeedback()`), per-line replay buttons on settled
  dialogue blocks (= the reduced-motion narration path; voice-button clicks
  stopPropagation so they don't trigger click-to-skip), whole-briefing
  prefetch on start. `voiceSpeed` setting (0.7–1.4, schema-defaulted; speed
  is in cache keys). `coi-sw.js` + main.ts registration: header-less web
  hosts get COOP/COEP via service worker → threaded wasm (verified
  crossOriginIsolated=true on a plain python http.server); no-op where
  launchers already send headers. `tools/e2e-smoke.mjs` committed — run
  `node tools/e2e-smoke.mjs [--url ...]` for the deploy smoke.
- **Round 3 — voice everywhere + sequence mode (merged, PRs #88-#93):**
  `speakAll(lines)` on SpeechService/port + `[lines]` input on
  `ea-voice-button` = play a whole briefing as one cancellable sequence.
  Listen buttons added: contextual help drawer, player notes (Archivist),
  Mission Briefing popup title + live briefing screen title ("Play
  briefing" reads title/summary then each block). Settings: test-a-voice
  dropdown (full cast), Recalibrate button (disable+enable w/ voiceCheck),
  expanded Mentor voice copy. Console breadcrumb when a live briefing
  starts with the engine inactive.
- **User-authored fix (PR #91) — LESSONS:** (1) the speech worker queue is
  serial — NEVER enqueue prefetches before the line the player asked for
  (speakAll speaks line 1 first, then prefetches the rest via an
  onPlaybackStart hook; dialogue-level lookahead prefetch was removed for
  the same reason — do not reintroduce). (2) main.ts gates bootstrap
  behind ensureCrossOriginIsolation() so the COI reload can't discard user
  input. (3) Smoke checks must assert real outcomes (enrolment asserts the
  /campaigns heading, not a tautology).
- **Round 4 — UX polish (merged, PRs #96-#101):** hint voice reads the
  full section (Senior Dev framing + level/title + content), not just the
  clue; live briefing speaks a Mission Control **intro** (title/summary)
  first and only starts the transmission at the persona voices — new
  `introLine` input + public `replay()` on ea-mentor-dialogue (reduced
  motion keeps the voice-only Play button); Campaign Hub recommendation
  prefers the **last active path** (track of the latest `completedAt`);
  **route-transition loader** (`shared/route-loader`, concentric sine-wave
  rings on a canvas rAF loop outside Angular, debounced 140ms, reduced-
  motion static); **backlog filters** (status chips + concept dropdown) +
  **collapsible sections**. anyComponentStyle budget warning now 14kB.
- **Mentor narration (Kokoro-82M TTS) — SHIPPED (user approved Option A):**
  `SpeechService` + `speech.worker.ts` (data-access, kokoro-js WASM q8, npm
  install needs `--ignore-scripts` for onnxruntime-node's postinstall);
  `EA_SPEECH_PLAYER` token keeps ui presentational; `voiceEnabled` setting
  (schema-defaulted, saves stay v2); "bringing voice systems online"
  calibration overlay in Settings with mentor banter + progress; worker
  intercepts kokoro's hardcoded HF URLs → `/assets/tts/model/` first (HTML
  responses = missing), HF fallback for dev/web; launchers send COOP/COEP +
  404 under /assets/. `node tools/package-academy-local.mjs` bundles model +
  6 persona voices (~90MB zip; `--skip-tts` for small zip that downloads
  once on first enable). **HF is blocked in this sandbox** — the full-model
  zip must be produced on a normal machine, and real audio still needs a
  listen-test there. See `21_PERSONA_AVATARS_TTS_PROPOSAL.md` build-order
  for deferred bits (IndexedDB audio cache, WebGPU).
