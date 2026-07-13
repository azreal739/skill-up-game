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

### Recommended: Web Speech API (`speechSynthesis`), opt-in

The browser's built-in `speechSynthesis` reads each block aloud as it types.

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

## Suggested build order (each step independently shippable)

1. **Persona registry + SVG avatars with talking/idle states** — pure UI,
   biggest visible win, no save-schema change. (~1 PR)
2. **SpeechService + voice toggle in settings** — the TTS core, opt-in,
   settings-schema addition + tests. (~1 PR)
3. Optional later: per-persona portrait art, per-block "replay voice" button,
   pre-generated premium audio for the intro missions only.

Steps 1–2 respect all existing guardrails: reduced-motion kill switch, OnPush,
no new dependencies, bundle budgets untouched.
