/**
 * Dependency-free syntax tinting for artefact code blocks. Escapes the source
 * first, then wraps comments / strings / keywords / numbers in classed spans,
 * so the resulting HTML can never execute content. Deliberately small: this
 * is visual seasoning, not a parser.
 */

const KEYWORDS: Record<string, string[]> = {
  ts: [
    'abstract', 'as', 'async', 'await', 'boolean', 'break', 'case', 'catch', 'class', 'const',
    'continue', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally',
    'for', 'from', 'function', 'if', 'implements', 'import', 'in', 'instanceof', 'interface',
    'let', 'new', 'null', 'number', 'of', 'private', 'protected', 'public', 'readonly', 'return',
    'static', 'string', 'super', 'switch', 'this', 'throw', 'true', 'try', 'type', 'typeof',
    'undefined', 'unknown', 'var', 'void', 'while',
  ],
  java: [
    'abstract', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue',
    'default', 'do', 'double', 'else', 'enum', 'extends', 'false', 'final', 'finally', 'float',
    'for', 'if', 'implements', 'import', 'instanceof', 'int', 'interface', 'long', 'new', 'null',
    'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch',
    'this', 'throw', 'throws', 'true', 'try', 'void', 'while', 'String', 'Integer', 'Long',
  ],
  json: ['true', 'false', 'null'],
  bash: ['if', 'then', 'else', 'fi', 'for', 'do', 'done', 'echo', 'export', 'while', 'case', 'esac'],
};

const ALIASES: Record<string, string> = {
  ts: 'ts', tsx: 'ts', js: 'ts', jsx: 'ts', typescript: 'ts', javascript: 'ts',
  java: 'java',
  json: 'json',
  bash: 'bash', sh: 'bash', shell: 'bash',
};

function escapeHtml(source: string): string {
  return source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function span(cls: string, text: string): string {
  return `<span class="${cls}">${text}</span>`;
}

/**
 * Escape, then tint, one artefact body. Unknown languages return escaped text
 * with only strings/numbers/comments tinted; `diff` tints added/removed lines.
 */
export function highlight(source: string, language?: string, artefactType?: string): string {
  const escaped = escapeHtml(source);

  if (artefactType === 'diff') {
    return escaped
      .split('\n')
      .map((line) => {
        if (line.startsWith('+')) return span('tok-add', line);
        if (line.startsWith('-')) return span('tok-del', line);
        if (line.startsWith('@@')) return span('tok-comment', line);
        return line;
      })
      .join('\n');
  }

  const lang = ALIASES[(language ?? '').toLowerCase()] ?? '';
  const keywords = KEYWORDS[lang] ?? [];
  const keywordAlt = keywords.length
    ? `\\b(?:${keywords.join('|')})\\b`
    : '(?!)'; // never matches

  // One alternation, matched in priority order: comments, strings, keywords,
  // numbers. Operates on escaped text, so only & is transformed inside tokens.
  const pattern = new RegExp(
    [
      String.raw`((?<!:)\/\/[^\n]*|\/\*[\s\S]*?\*\/|(?:^|(?<=\n))\s*#[^\n]*)`, // comment (":" guard keeps URLs intact)
      String.raw`('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|\x60(?:[^\x60\\]|\\.)*\x60)`, // string
      `(${keywordAlt})`, // keyword
      String.raw`(\b\d+(?:\.\d+)?\b)`, // number
    ].join('|'),
    'g'
  );

  return escaped.replace(pattern, (match, comment, str, keyword, num) => {
    if (comment !== undefined) return span('tok-comment', comment);
    if (str !== undefined) return span('tok-string', str);
    if (keyword !== undefined) return span('tok-keyword', keyword);
    if (num !== undefined) return span('tok-number', num);
    return match;
  });
}
