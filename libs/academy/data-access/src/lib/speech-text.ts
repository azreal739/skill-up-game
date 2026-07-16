/**
 * Code-to-speech: rewrite code-flavoured prose into something a voice can say.
 * Applied ONLY to the text sent to the TTS engine — displayed text (dialogue,
 * comms log, feedback panels) always keeps the original wording.
 *
 * Rules, in order:
 *  1. Block code (multi-line, brace/decorator-shaped) is never read token by
 *     token — the eyes have the code; the voice says so and carries on.
 *  2. Inline code spans and bare operators become the words an engineer would
 *     say at a whiteboard (`===` → "triple equals", `=>` → "arrow", …).
 *  3. camelCase / PascalCase / snake_case identifiers are split into words;
 *     runs of capitals (DTO, HTTP) stay spelled out.
 *  4. Error codes like TS2365 are read as "T S 2365".
 *  5. Leftover code punctuation in prose turns into pauses, not noise.
 */

const BLOCK_CODE_PLACEHOLDER = ' — the code is shown on screen — ';

/** A segment "looks like real code" when it spans lines and carries syntax. */
const BLOCK_CODE = /(^|\n)[^\n]*[{};=()][^\n]*\n[\s\S]*?[{};()][^\n]*/;

/** Operators and symbols, longest first so `!==` wins over `!=` and `=`. */
const OPERATORS: ReadonlyArray<[RegExp, string]> = [
  [/===/g, ' triple equals '],
  [/!==/g, ' not equals '],
  [/==/g, ' double equals '],
  [/!=/g, ' not equals '],
  [/=>/g, ' arrow '],
  [/>=/g, ' greater or equal '],
  [/<=/g, ' less or equal '],
  [/&&/g, ' and '],
  [/\|\|/g, ' or '],
  [/\?\?/g, ' nullish coalescing '],
  [/\?\./g, ' optional chaining '],
  [/\.{3}/g, ' spread '],
  [/\+\+/g, ' plus plus '],
  [/\[\]/g, ' array '],
  [/\(\)/g, ' '],
];

/** `<User>` / `<string[]>` generics → "of User" / "of string array". */
const GENERIC = /<([A-Za-z_$][\w$]*(?:\[\])?)>/g;

/** TS2365 and friends → "T S 2365". */
const ERROR_CODE = /\b([A-Z]{2,4})(\d{3,5})\b/g;

/** Split camelCase / PascalCase; keep acronym runs together (HTTPServer). */
function splitIdentifier(word: string): string {
  return word
    .replace(/_/g, ' ')
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

/** Any word containing an inner capital or underscore is an identifier. */
const IDENTIFIER = /\b[A-Za-z][a-z\d$]*(?:[A-Z][A-Za-z\d$]*|_[A-Za-z\d$]+)+\b/g;

/** Angular-style trailing-$ observables: customers$ → "customers stream". */
const OBSERVABLE = /\b([A-Za-z][\w]*)\$(?=[^\w]|$)/g;

function speakInline(text: string): string {
  let out = text;
  out = out.replace(GENERIC, (_, name: string) =>
    ` of ${splitIdentifier(name.replace(/\[\]$/, ' array'))} `
  );
  for (const [pattern, spoken] of OPERATORS) {
    out = out.replace(pattern, spoken);
  }
  out = out.replace(OBSERVABLE, '$1 stream');
  out = out.replace(ERROR_CODE, (_, letters: string, digits: string) =>
    `${letters.split('').join(' ')} ${digits}`
  );
  out = out.replace(IDENTIFIER, (word) => splitIdentifier(word));
  // Decorators and member access read naturally as words with pauses.
  out = out.replace(/@([A-Za-z])/g, 'at $1');
  // Remaining code punctuation becomes a soft pause (or vanishes).
  // Semicolons stay — they're ordinary prose punctuation the voice reads well.
  out = out.replace(/[{}[\]<>`]/g, ', ');
  out = out.replace(/\s*,(\s*,)+/g, ', ');
  return out;
}

/**
 * Rewrite one narration line for the TTS engine. Pure and deterministic —
 * safe to call repeatedly and to use in cache keys on either side.
 */
export function toSpokenText(text: string): string {
  let out = text;

  // 1. Replace whole code blocks before touching anything inline.
  while (BLOCK_CODE.test(out)) {
    out = out.replace(BLOCK_CODE, BLOCK_CODE_PLACEHOLDER);
  }

  // 2. Inline code spans first (backticks removed, content spoken)…
  out = out.replace(/`([^`]+)`/g, (_, code: string) => ` ${speakInline(code)} `);
  // …then the same treatment for code that isn't backticked.
  out = speakInline(out);

  // 3. Prose-level `=`/`+` between spaces ("timing = on the beat").
  out = out.replace(/(\s)=(\s)/g, '$1equals$2');
  out = out.replace(/(\s)\+(\s)/g, '$1plus$2');

  // 4. Whitespace cleanup so pacing stays natural.
  out = out.replace(/\s+/g, ' ').replace(/\s+([.,!?;:])/g, '$1').trim();
  return out;
}
