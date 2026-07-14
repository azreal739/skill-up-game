# Proposal: Animated Persona Avatars + Text-to-Speech

Status: **exploration / awaiting review** — this is engine work (per the working
agreement, engine changes get review before implementation). Nothing here is
built yet.

## What exists today

- Five personas speak across all content, via the free-text `speaker` field on
  `NarrativeBlock` (`content-model/src/lib/types.ts`):

  | Persona | Blocks | Track(s) |
  |---|---|---|
  | Team Lead | 153 | field-notes |
  | Senior Dev | 153 | field-notes, mission-control |
  | Mentor Judge | 119 | dance-judging |
  | Mission Control | 92 | mission-control |
  | Head Judge | 46 | dance-judging |

- All dialogue renders through `MentorDialogueComponent`
  (`libs/academy/ui/src/lib/mentor-dialogue/`): an "incoming transmission"
  beat, a typewriter reveal (18 ms/tick), click-to-skip, an `instant` mode for
  reduced motion, and a visually-hidden full-text copy for screen readers.
- Accessibility infrastructure already in place: `settings.reducedMotion`
  toggles `html/body.ea-reduced-motion` (global animation kill switch);
  settings live in `playerStateSchema` (save v2) with Zod-validated defaults.
- Deployment constraint: the app now ships as an **offline local package**
  (family machines, no internet assumed). Anything added must work offline and
  not bloat the ~1 MB zip unreasonably.

## Part 1 — Animated persona avatars

### Recommended: inline SVG avatars with CSS state animation

Each persona gets a small hand-authored SVG bust/emblem (consistent with the
existing procedural `campaign-emblem` aesthetic — geometric, glowing, sci-fi
console style), rendered beside the speaker name in `MentorDialogueComponent`.
Two states driven by the component's existing signals:

- **talking** — while that block is typing: subtle mouth-bar equalizer pulse,
  eye glow, or waveform ring (CSS keyframes on SVG parts).
- **idle** — once the block settles: static with a slow blink/breathe loop.

Why this option:

- **Zero payload cost** that matters: ~1–2 KB per avatar inline, no image
  requests, crisp at any scale, recolourable with `currentColor`/CSS variables
  so they follow the existing theme and high-contrast mode.
- **Reduced-motion is free**: `.ea-reduced-motion` already kills CSS
  animations globally; avatars degrade to static portraits with no extra code.
- **No new deps, no engine rework**: a `PersonaBadgeComponent` in
  `libs/academy/ui` plus a persona registry (below). The dialogue component
  already knows which block is active and whether it is typing.

### Considered and not recommended (for now)

- **AI-generated character art (PNG/WebP portraits)**: nicer faces, but
  static unless we also build sprite states; adds ~50–200 KB per persona and a
  divergent art style next to the SVG/console UI. Could layer on later as a
  optional "portrait" upgrade.
- **Lottie/animation library**: real dependency + runtime for something CSS
  already does here; conflicts with "no new framework" leanings and bundle
  budgets.
- **Animated diagrams per challenge**: explicitly deferred in the spec pack;
  out of scope for personas.

### Persona registry (small, shared)

A `personas.ts` in `content-model` mapping the five known speaker strings to
`{ id, displayName, accentColor, avatarId, voiceHint }`. Unknown speakers fall
back to a generic avatar, so content stays free to introduce speakers without
engine changes. The content-integrity spec can (optionally) assert that all
`speaker` values used by packs exist in the registry — extending, not
weakening, the guardrails.

## Part 2 — Text-to-speech

> **Revised after user feedback (2026-07-13):** system voices via the Web
> Speech API were judged not good enough — the user wants a small open
> neural TTS model running locally in the background. The recommendation
> below is now **Kokoro-82M in the browser**; the original Web Speech
> analysis is kept at the end as the zero-cost fallback engine.

### Recommended: Kokoro-82M via `kokoro-js` (local neural TTS, opt-in)

[Kokoro](https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX) is an
82M-parameter Apache-2.0 TTS model whose naturalness benchmarks at the top of
the small-model class — near-human prosody, versus Piper's fast-but-robotic
output and far above OS system voices. `kokoro-js` (by the transformers.js
author) runs it 100% client-side: WebGPU when available (~10 s of speech
generated in ~1 s), WASM/CPU fallback (~1–2× realtime). The quantized model
is ~86 MB, cached in IndexedDB after first load.

Why it fits:

- **Fully offline** once the model is present — works in the family package
  with zero accounts/keys/network.
- **Real per-persona voices**: Kokoro ships ~50 distinct voices, so each
  persona gets its own actual voice (e.g. Mission Control = calm male,
  Team Lead = warm female, Head Judge = British male) instead of rate/pitch
  tricks on one system voice.
- **Quality**: independent 2026 comparisons grade Kokoro A/A- for
  naturalness vs Piper C+; it is the consensus "best small local TTS".

Trade-offs to decide before building:

1. **Package size.** Bundling the model in the local zip: ~1 MB → ~90 MB.
   Alternative: keep the zip small and download the model once when voice is
   first enabled (needs internet that one time; cached in IndexedDB after).
2. **Old hardware.** Without WebGPU, generation is roughly realtime on CPU —
   mitigated by generating each block *during* the typewriter animation and
   caching generated audio (IndexedDB) so every replay is instant.
3. **A real dependency** (`kokoro-js` + transformers.js/onnxruntime-web,
   ~1–2 MB JS), lazy-loaded only when voice is enabled so the initial bundle
   budget is untouched.

Alternative if speed on weak machines trumps quality: **Piper** (~75 MB,
WASM-only, 3–5× faster than realtime on plain CPU, works in every browser,
noticeably more mechanical). Same architecture slot either way.

### Engine shape (revised)

- `SpeechService` in `data-access` defines a small engine interface;
  `KokoroEngine` is the primary implementation, running generation in a **web
  worker**, speaking one briefing block per utterance, cancelling on skip,
  navigation and destroy, and caching generated audio per `(voice, text)` in
  IndexedDB. The Web Speech API engine (below) remains as a no-download
  fallback for devices that can't run the model.
- Settings: `voiceEnabled` (default **off**), persona→voice map in
  `personas.ts` (`voiceHint` becomes a concrete Kokoro voice id).
- Avatar sync: the avatar's `talking` state keys off actual audio playback
  when voice is on, off the typewriter when it's off.

### Fallback engine: Web Speech API (`speechSynthesis`), opt-in

The browser's built-in `speechSynthesis` reads each block aloud as it types.
(Original recommendation, now demoted to fallback — kept for reference.)

Why this fits *this* app:

- **Free and offline.** Windows, macOS and most Linux desktops ship local
  system voices; Chromium exposes them. No network, no API keys, no cost —
  works inside the local family package.
- **Zero bundle impact.** Pre-generating audio (e.g. with a cloud TTS voice)
  for 563 dialogue blocks ≈ 2–3 hours of speech ≈ 60–150 MB of MP3s — a
  100–150× zip-size increase, re-generated on every content edit. Not worth it
  for v1; revisit only if system voices disappoint.
- **Per-persona differentiation without per-persona voices.** Voice
  availability varies wildly by OS, so we differentiate primarily with
  guaranteed knobs: `rate`/`pitch` per persona (e.g. Mission Control slightly
  low/flat, Mentor Judge warmer/slower), and *prefer* distinct system voices
  when several exist (pick by `voiceHint`: language + gender-ish name
  heuristics), falling back gracefully to the default voice.

### Engine shape

- `SpeechService` in `libs/academy/data-access`:
  - wraps `speechSynthesis` with the known gotchas handled: `getVoices()`
    loads async (listen for `voiceschanged`); speak **one block per
    utterance** (avoids Chromium's long-utterance cutoff); `cancel()` on
    route change, on skip, on component destroy, and when a new block starts.
  - exposes `speak(personaId, text)`, `stop()`, `readonly speaking` signal.
- `MentorDialogueComponent`: when voice is enabled, each block's utterance
  starts as its typing starts; Skip stops speech immediately. The avatar's
  "talking" state can key off `speaking` for a nice sync.
- **Settings**: add `voiceEnabled: boolean` (default **false** — opt-in, so
  nothing starts talking unexpectedly) and optionally `voiceRate`. This is a
  `settingsSchema` change → **save v2 stays compatible** if added with
  `.default(false)` / handled in the v2 migration path; needs the usual
  schema-test updates.
- **Accessibility interplay**: TTS is a *reading assist*, not a screen-reader
  replacement. Screen-reader users already get instant full text
  (`ea-visually-hidden`); the settings copy should note that voice + screen
  reader will double-speak, and voice stays off by default.

### Known limitations to accept up front

- Voice quality/choice differs per machine (a Windows Jnr and a macOS Jnr
  will hear different voices). Rate/pitch keeps personas *distinct* on any
  machine even when they share one voice.
- Some Chromium/Linux setups have no local voices at all → the toggle shows
  "no voices available on this device" and stays off, app unaffected.

## Build order (updated)

1. **Persona registry + SVG avatars with talking/idle states** — ✅ **DONE**
   (shipped 2026-07-13: `personas.ts`, `PersonaAvatarComponent`, integrated
   into mentor-dialogue with a content-integrity speaker guard).
2. **Kokoro TTS** — ✅ **DONE** (user chose Option A, shipped 2026-07-13):
   `SpeechService` + `speech.worker.ts` in data-access (WASM q8, per-block
   generation queue, in-session audio cache, fetch interception serving
   `/assets/tts/model/` first with HuggingFace fallback for dev/web),
   `EA_SPEECH_PLAYER` port in ui so mentor-dialogue stays presentational,
   `voiceEnabled` setting (default off, back-compat default in schema),
   persona→`voiceId` map, transmission-style "bringing voice systems online"
   overlay with mentor banter + real progress, COOP/COEP headers in both
   launchers (wasm threads), packaging script bundles model+voices
   (`--skip-tts` for the small zip). NOTE: model files could not be
   downloaded in the dev sandbox (HF blocked) — run
   `node tools/package-academy-local.mjs` on a normal machine to produce
   the fully-offline ~90 MB package; end-to-end audio still needs a
   listen-test there.
3. **Latency pass — ✅ DONE (2026-07-13):** sentence-streaming playback
   (kokoro `stream()` + TextSplitterStream — audio starts after the first
   sentence), next-block `prefetch()` during playback, post-ready warm-up
   generation, and WebGPU/fp32 device selection for deployments without the
   bundled q8 model (local packages stay WASM/q8 for the offline guarantee).
4. **Voice check + resilience + persistence — ✅ DONE (2026-07-13):**
   calibration ends with Mission Control audibly speaking the check line;
   briefings started during engine warm-up wait for readiness instead of
   staying silent; generated narration persists across sessions in
   IndexedDB (`SpeechAudioCache`, pruned at 300 lines).
5. **Voice everywhere — ✅ DONE (2026-07-14):** reusable `ea-voice-button`
   (ui) with idle/generating-spinner/playing/paused states driven by new
   `nowPlaying()/pause()/resume()` on the `EA_SPEECH_PLAYER` port; wired
   into challenge questions (Mission Control reads story+prompt), revealed
   hints (Senior Dev), and Help Centre topics (new calm **Academy
   Archivist** persona, `af_nicole`, round-spectacles avatar). Buttons
   render nothing when voice is off.
6. Optional later: per-persona portrait art.
