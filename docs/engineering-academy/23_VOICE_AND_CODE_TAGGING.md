# 23 — Voice & Code Tagging Conventions

How content should be written so the Kokoro TTS narrator reads it well, and how
code inside content should be tagged. Two of the improvements sketched here are
**deferred** (the richer read-out/highlight renderer, and expanded wrong-answer
explanations) — this doc records the convention and the roadmap so the work can
roll out consistently across all 40 paths.

## What the voice actually reads

The narrator (`SpeechService`) speaks these fields, per mission:

- `mission.title`, `mission.summary`, `mission.reflectionPrompt`
- every `briefing[].text`
- per challenge: `storyContext`, `prompt`, `successFeedback`, `failureFeedback`,
  each option/finding `feedback`, and every `hint.content` (+ `hint.title`)
- help topics: `title`, `summary`, `content`

**Option/finding `label`s are NOT spoken** during the question — only when their
`feedback` is read back after an answer. So code-shaped *labels* are fine (they
also render in the mono `isCode()` style); code-shaped *spoken fields* are not.

Everything spoken passes through `toSpokenText()`
(`libs/academy/data-access/src/lib/speech-text.ts`) at the TTS boundary only —
the on-screen text keeps its original wording.

## What `toSpokenText()` already handles (write freely, it will read well)

- **Multi-line code blocks** → "the code is shown on screen" (never read token
  by token). Put real code in a `contextArtefacts` entry (`type: 'code'`), not
  in a spoken field — the code-viewer renders it and the voice steps over it.
- **Operators**: `===` "triple equals", `!==`/`!=` "not equals", `=>` "arrow",
  `>=`/`<=` "greater/less or equal", `&&` "and", `||` "or", `??` "nullish
  coalescing", `?.` "optional chaining", `...` "spread", `++` "plus plus".
- **Arithmetic/comparison between operands** (spaces on both sides):
  `a * b` "times", `a % b` "modulo", `a < b` "less than", `a > b` "greater
  than", and the dancer's `1 & 2 & 3` "and".
- **Prose equations**: ` = ` "equals", ` + ` "plus".
- **Generics** `<User>` → "of User"; `<string[]>` → "of string array".
- **Identifiers**: `getActiveUsers` → "get Active Users", `snake_case` split,
  acronym runs (DTO, HTTP) kept; `NaN` → "nan" (not "Na N").
- **Observables**: `customers$` → "customers stream".
- **Error codes**: `TS2365` → "T S 2365". **Decorators**: `@Input` → "at Input".

The corpus spec (`speech-text.spec.ts`) sweeps **every** spoken field in every
pack and asserts the output is clean of ``` ` {} === !== => || && ``` and a raw
`NaN`. **Extend that guard, never weaken it.**

## Authoring rules for spoken fields

1. **No multi-statement code inline.** Don't write
   `function total(seats) { return seats * 55; }` inside a `storyContext`.
   Either move it to a `code` artefact and *describe* it in the prose ("a helper
   multiplies a seats parameter by the ticket price"), or reword to plain words.
2. **Don't lean on a visual code distinction the ear can't hear.** Feedback like
   "it must be `{{ visitors() }}`, not `{{ visitors }}`" collapses to the same
   sound. Say the difference in words: "the template must call the signal — with
   parentheses — to read its value."
3. **No template interpolation braces in spoken fields.** `{{ count }}` reads as
   a pause. Write "interpolating count without calling it".
4. **Identifiers are fine** — `noImplicitAny`, `takeUntilDestroyed`, `unknown`,
   `any` all read cleanly; no need to reword them into English.
5. **Keep hint tone** as a kind Senior Dev (see content-authoring rules in
   `CLAUDE.md`); these are the same strings the voice reads.

## Code tagging — current state and the deferred renderer

Today, prose fields (`storyContext`, `prompt`, `feedback`, `hint.content`) are
rendered with plain `{{ }}` interpolation, so **backticks would show literally**.
That is why this pass tags code by *placement* (real code → `code` artefacts;
inline mentions → identifiers that read well) rather than by sprinkling
backticks into interpolated prose.

**Deferred — richer read-out + highlight (the user's "later"):** add an
`ea-rich-text` presentational component that parses inline `` `code` `` spans in
prose fields into styled `<code>` (and, later, syntax-highlighted) elements.
Once it exists:

- Backtick-tagging inline code in spoken fields becomes safe for display, and
  authors can tag freely.
- Give the voice a *spoken alias* for tagged code (a display/voice split) so the
  ear hears a described form while the eye sees the exact token — e.g. tag
  `` `visitors()` `` and let the narrator say "visitors, called". The plumbing
  hook is the same `toSpokenText` boundary; add an optional per-span override.

Until that lands, keep following the authoring rules above.

## Deferred — better wrong-answer explanations

The user wants a stronger learning moment on a wrong answer, especially when the
player used no hints: summarise and explain the concept so it lands. Design
sketch for when this is built:

- On an incorrect first attempt (the locked attempt that creates a Technical
  Debt item — see the Technical Debt Review Loop in `CLAUDE.md`), assemble an
  **explanation** from material already in the challenge: the correct option's
  `feedback`, the `hints` the player *didn't* spend (levels 2–4 give Concept →
  Specific clue → Guided solution), and any `helpLinks` topic summary.
- Surface it in the results/debrief screen and read it via the existing
  `debriefLines` narration hand-off (Senior Dev voice), gated so a player who
  *did* use hints isn't re-taught what they already unlocked.
- No new content authoring required — it reuses existing fields — so it is an
  engine/UI change (propose → go-ahead → MR per the working agreement).
