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

## Done this session (branch `claude/engineering-academy-ui-enhancements-y6i2l1` + PR #125)

**Full-app UI/UX review + first two enhancement batches (PR #128, merged).**
A Playwright click-through of EVERY screen (desktop 1440×900 + mobile 390×844,
25 shots; script survives the sandbox voice-init overlay by disabling voice in
the save) produced an 18-item findings list (user-approved; kept in the plan
file `/root/.claude/plans/please-review-the-ui-streamed-hanrahan.md` — re-derive
from this summary if gone). Shipped in #128:
- Batch 1: challenge Submit button removed once the decision locks + verdict
  panel scrolls into view (challenge-host spec pins it); results zero-tiles
  dimmed; enrol form keeps a "set up voice & accessibility first" link; all
  progress-bar fills grow in via shared `ea-fill-grow` keyframe (kept FIRST in
  every animation list so state changes never restart it); `ea-meter` pulses on
  value change (health-colour flash, harder on drops).
- Batch 2: `ToastService` + `<ea-toast-host>` in the ui lib (bottom-centre,
  polite live region, 3.5s, stack cap 3) — wired for note saved/deleted (notes,
  help, mission feedback, review), progress reset, rank promotions; and
  `announce()` SR-only live region — the app shell announces every new
  comms-HUD line (app previously had ZERO aria-live).
**Still queued from the review** (build next, in order): mobile nav hamburger
drawer + compact mobile mission HUD; focus-trap directive for the 5 overlays
(mission-brief, help drawer, meet-the-mentors, voice-setup, save-migration);
then polish: shared empty-state component, consistent breadcrumbs, coach
marks, keyboard shortcuts + `?` overlay, route skeletons.
NOTE: a parallel Codex session restyled `apps/skill-up-game` with the Academy
design system (PR #127) — legacy app is no longer "rarely touched".

Earlier in this session — Claude-authored UI/voice refinement rounds, and a
review of a parallel agent PR. **All merged.**

**Claude-authored refinements (PRs #110-#123, incremental, each verified +
user-merged):** device-test feedback loop on the comms HUD and narration —
- **Narration content/ordering:** `SpeechService.sayAmbient()` (screen-arrival
  lines queue politely, never cut off the current line; one waiter, newer
  replaces; speak()/cancel() clears) fixed the enrolment collision where only
  the last of greeting/hub-rec/calibration played and cancelled lines still
  hit the comms log; `speakLine` token-guards recording (no ghost log
  entries). Path/campaign/hub drill-ins now speak their description +
  standing + next step, hub names its **path**. Mission narration announces
  "Mission: {title}" and "Challenge N of M — {title}"; feedback leads with
  "Correct."/"Incorrect." and frames each MC option ("Your answer — …" / "The
  correct answer."); Academy Review speaks its verdict too.
- **Comms HUD:** portrait top-aligned + bigger (116/88px), tail at the face,
  text clear of the name glow, **log collapsed by default**; bubble is a fixed
  size in every state (no jump) with an always-present control row (Pause/Stop
  while live, **Replay** when idle); 3-line window is scrollable; typewriter
  slowed to ~18 ch/s to track speech.
- **Other:** route-loader **glow sphere** + centred cluster fix; Mission Brief
  button moved out from under the HUD into a **sidebar Mission Briefing card**;
  mission-brief + contextual-help **drawers fly in from the LEFT** (HUD owns
  the right); **Archivist voice af_nicole → `bf_emma`** (was too sleepy) —
  bundled-voice list in package-academy-local.mjs updated to match.

**PR #125 (Sol/Codex agent, branch `agent/academy-immersive-hud-voice`) —
merged, Claude reviewed.** Six-item immersive pass; reproduced green
(build/lint, **166 tests**, smoke) + visual QA. What the next session must
know about it:
- **Wave background restored + enhanced** — it had vanished behind the
  `html { background }` white-flash fix; fixed with `isolation: isolate` on the
  `ea-root` `:host` (new stacking context). Additive `lighter` blend, 3-pass
  strokes, telemetry-packet dashes, vignette. Reduced-motion still draws one
  static frame.
- **Comms HUD moved BELOW the nav** (`top: 4.35rem` desktop / `7.8rem` mobile,
  z 55) so Clerk's account button is never covered; **compact mode** = mini
  avatar chip + bubble underneath (up-tail), bubble independently collapsible.
- **Briefing transmission equalizer** now gated to real playback
  (`briefingTransmitting`/`briefingPreparing` off `speech.nowPlaying()`);
  freezes + says "Transmission complete" when done.
- **Avatar speaking border**: idle glow softened (opacity .58) + a bright
  carrier segment travels the frame while speaking (SVG `pathLength`).
- **Pre-enrolment settings**: Settings route un-guarded; chosen prefs persist
  to `engineering-academy:preferences` (scoped like the save) and merge into
  the new profile at enrolment (then cleared). `GameStateService` gained a
  `pendingSettingsSignal`; Transfer/Progress sections hidden until a profile
  exists. Landing gained privacy line, 3 feature cards, "How the Academy
  works". **Note: voice still defaults ON pre-enrolment**, so a brand-new
  visitor can trigger the model download on the landing page — left as-is by
  user decision; flip `SETTINGS_DEFAULTS.voiceEnabled` to false if that
  becomes unwanted.

**Still pending (needs a real machine — HF blocked in this sandbox):** build
the full-model shareable zip (`node tools/package-academy-local.mjs`) and
publish it as a GitHub Release asset; on-device **voice listen-test** of the
whole narration stack now that bf_emma + ambient-queue + transmission-settle
are live. Dispatch (desktop app) or a plain local CLI session can do both;
`--cloud` cannot (cloud sandbox blocks HF).

## Done earlier (branch `claude/academy-auth-account-layer-uoa5ua`)

**Hosted auth (Clerk) is live — PR #122, merged.** The user built it (via
Codex, branch `codex/clerk-auth-poc`); Claude's role was PR review (two
rounds; all five actionable findings fixed in `ea19798`). What the next
session must know:

- **Two modes.** Local/dev/shareable builds stay 100% accountless:
  `app/core/auth/auth.provider.ts` provides `NoAuthService`. The `hosted`
  build configuration (project.json) swaps it for `auth.provider.clerk.ts`
  via `fileReplacements`. `npm run build:academy:site` = hosted build +
  `apps/engineering-academy/build-sites.mjs` → a Sites worker bundle
  (serves `/runtime-config.js` from `CLERK_PUBLISHABLE_KEY` env, SPA
  fallback, security headers, `no-cache` on all text/html).
- **Per-user local saves.** `SAVE_SCOPE` injection token
  (persistence.service.ts): hosted signed-in saves live at
  `engineering-academy:save:<clerkUserId>`; an existing accountless save
  triggers a one-time adopt/keep prompt (`SaveMigrationComponent`, copy
  semantics — the unscoped original is never deleted). Sign-out preserves
  saves. **Invariant: `SAVE_SCOPE` is captured once per page load**, so
  `syncUser()` forces a full document navigation on every auth transition —
  never convert that to SPA navigation.
- **Fragile coupling:** `@clerk/clerk-js` is pinned exactly (6.25.5) and
  loads the UI via the internal `__internal_ClerkUICtor` + `@clerk/ui@1`
  CDN URL — bump Clerk only deliberately, testing sign-in.
- **Security boundary:** the Angular guard is a client-side UX gate, NOT
  authorization — anonymous visitors would still get the JS bundle. **Do
  not make the Sites project public**; trusted testers only via Sites
  allowlist + Clerk waitlist. Threat model, pre-public checklist, and
  tester runbook: `docs/engineering-academy/22_HOSTED_AUTH_SECURITY.md`.
- The Supabase auth+sync spec drafted earlier this session was superseded
  by this Clerk POC before it was built. Cloud saves / cross-device sync
  remain NOT built (a future phase; the auth user id would be the owner
  key).

## Done earlier (branch `claude/engineering-academy-ui-enhancements-y6i2l1`, PRs #110-#112, all merged)

Seven user-requested UI enhancements + two device-test feedback rounds, all
verified (build/test/lint + committed smoke + a seeded-save Playwright visual
suite with screenshots):

- **HUD polish (PR #111, from device feedback):** live portrait top-aligned
  beside the bubble + bigger (96→116px, 72→88 small screens), tail moved up
  to point at the face, reading window dropped 0.45rem clear of the name/glow,
  comms log **collapsed by default** (`commsLogCollapsed` default true in
  SETTINGS_DEFAULTS + schema; stored prefs win, so pre-existing saves keep
  their old choice until toggled once).
- **Narration collisions fixed (PR #112, from device feedback):** on fresh
  enrolment the greeting / hub recommendation / calibration banter all raced
  at engine-ready — each speak() cancels the last, so only the final line
  played, and cancelled lines still hit the comms log (chunk arrived post-
  cancel). Now: `SpeechService.sayAmbient()` — screen-arrival lines (greeting,
  hub rec, path/campaign drill-ins, backlog nudge) queue politely behind the
  current line, one waiter max (newer replaces), explicit speak()/cancel()
  clears; `speakLine` token-guards recording (no ghost log entries);
  `ea-mentor-dialogue` got a `voice` input and the calibration overlay sets
  `voice=false` (its banter had parked speaks behind the loading engine and
  its ngOnDestroy cancel killed the greeting); path drill-in now speaks the
  track blurb first. **Found: `speech.service.spec.ts` was never registered
  in `academy-libs.spec.ts` and had silently never run — registered now.**

- **Header/HUD restructure:** topbar is now brand + player status (rank/XP)
  LEFT, nav CENTERED (flex spacers both sides), and the comms HUD moved from
  bottom-right to fixed TOP-right (z 60, over the nav bar's empty right
  column). HUD order flipped: live speaker panel first, comms log BELOW it,
  log newest-first (`past()` reversed, autoscroll to top), log bubbles
  right-anchored (row-reverse, avatar right, right-aligned name/actions).
- **Nav dropdown hover fix:** the 0.4rem gap between the Campaigns trigger and
  the menu fired mouseleave when entering from the left — invisible
  `::before` hover bridge on `.topbar__menu` closes the dead zone.
- **Route loader actually visible:** shows immediately on NavigationStart (no
  140ms debounce — SPA navs are near-instant so it never appeared), holds
  420ms (200ms reduced motion), fades out 180ms. Canvas render now starts
  from an `effect` on the `viewChild` signal (the old `queueMicrotask` raced
  change detection and drew nothing). **Plus the real bug:** `html` had no
  background, so router view transitions (two semi-transparent snapshots over
  the root canvas) flashed WHITE mid-cross-fade — `html { background:
  var(--ea-bg-0) }` fixes it.
- **Conversation on drill-in:** path view + campaign detail speak a Mission
  Control status line on open (once per id, voice+autoPlay gated, same
  pattern as the hub). Backlog speaks a Senior Dev encouragement on open.
- **Current path:** `TrackProgressService.lastActiveTrackId` (moved out of the
  hub) → "current path" ribbon on the hub card (absolute top-left, doesn't
  squeeze the heading), "Current path · recommended next mission" eyebrow,
  path-view header chip + "Your next step" panel.
- **Backlog nudge panel:** "Senior Dev suggests" callout with a CTA to the
  first open/reopened item.
- **Help Centre:** tag-chip filters (top 10 + "All tags…" expansion, counts),
  result count + clear-filters, tags on list items, clickable tags in the
  detail pane, "Related topics" (shared-tag) quick links. Selection falls
  back to the first result when filters hide the selected topic.

## Done earlier (branch `claude/persona-portrait-art-vyn8i4`, PRs #105 + #106, both merged)

- **Illustrated persona portraits:** `PersonaAvatarComponent` (ui) rebuilt as
  detailed layered SVG busts (per-persona skin/hair/accessory keyed by persona
  id in a ui-lib STYLES record; accent still from content-model). Video-call
  **active-speaker ring** (fade in → hold → fade out via `talking` +
  opacity transition), idle blink/breathe, CSS-only (reduced-motion safe).
- **"Meet the mentors" modal** (Settings) replaced the test-a-voice dropdown:
  cast as portrait cards (vertical: avatar+name/role on top, Play below),
  per-persona intro lines, ring lights while playing.
- **Comms HUD** (`shared/comms-hud`, mounted in AppComponent): bottom-right
  speaker panel (avatar + name + "transmitting" + typewriter of the current
  line) + collapsible group-chat log (per-persona colours, replay buttons).
  Backed by `SpeechService.spokenHistory` (capped 20, recorded on playback
  start, immediate-duplicate-skipping). Shown only when `status==='ready'` and
  something has been said.
- **Auto-play conversation** (mission-player effects, one-shot guards + reset
  on replay): briefing on arrival → question on challenge open (Mission
  Control) → post-answer debrief (**Mission Control if correct / Senior Dev if
  wrong**, verdict spoken first) → results debrief hand-off (MC outcome, Team
  Lead promotion, Senior Dev lessons, Archivist reflection) → hint reply on
  reveal. Academy Review reads the whole item on open (Senior Dev explanation
  + Archivist help-topic tips) — it's the learning surface.
- **Settings:** `autoPlay` (default on) + `displayTransmissions` (default off),
  schema-defaulted (save stays v2). Briefing screen shows an animated
  "transmitting" wave panel when voice carries the words; static text when
  voice is off/engine inactive/opted-in. Voice button "playing" state is now an
  animated equalizer ("transmitting…").
- User-authored fix on the branch (`c575e0b`): show briefing text when engine
  inactive, `speech.cancel()` on mission-player destroy, narration guards reset
  on replay + a lifecycle spec (mock MissionSessionService needs `result`).
- **Round 2 (PR #108, merged):** `toSpokenText` code-to-speech in data-access,
  applied ONLY at the TTS worker boundary (display text unchanged) — block
  code → "the code is shown on screen", operators → whiteboard words,
  identifier splitting, error-code spelling, `$`-observables → "stream";
  corpus spec sweeps every spoken field in all packs + help topics. Comms HUD
  speaker panel: big portrait RIGHT, speech bubble LEFT w/ 3-line bottom-
  anchored reading window + pause/stop; log messages are bubbles w/ mini
  avatar + 3-line clamp/expand; collapse persists (`commsLogCollapsed`).
  PersonaAvatar `stress` input (brow tilt + sweat) replaces the hint-panel
  emoji. Hub speaks the recommended mission. **Voice ON by default for new
  saves**: enrolment calibrates behind a "Getting things ready for you"
  overlay (copy inputs on voice-setup-overlay) then Mission Control greets
  "Welcome to the team, {name}"; returning = "Welcome back" after first
  gesture. SpeechService.enable() survives a throwing Worker constructor.
  Smoke updated: tolerates env voice-init errors, waits for settled outcomes.
- **Pending:** real-device listen-test of all narration + the code-to-speech
  phrasing (HF blocked in sandbox); local zip rebuild on a normal machine.

## Done earlier (branch `claude/engineering-academy-build-audit-wqabi2`)

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
