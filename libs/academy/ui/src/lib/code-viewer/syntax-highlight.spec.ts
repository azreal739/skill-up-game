import { highlight } from './syntax-highlight';

describe('highlight', () => {
  it('escapes HTML before tinting so content can never inject markup', () => {
    const html = highlight('<script>alert(1)</script>', 'ts', 'code');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('tints keywords, strings and numbers for TypeScript', () => {
    const html = highlight("const total = 42; // sum\nconst name = 'Ada';", 'ts', 'code');
    expect(html).toContain('<span class="tok-keyword">const</span>');
    expect(html).toContain('<span class="tok-number">42</span>');
    expect(html).toContain(`<span class="tok-string">'Ada'</span>`);
    expect(html).toContain('<span class="tok-comment">// sum</span>');
  });

  it('does not treat the // in URLs as a comment', () => {
    const html = highlight('curl https://app.example.com/health', 'bash', 'code');
    expect(html).not.toContain('tok-comment');
  });

  it('tints added and removed lines in diffs', () => {
    const html = highlight('+added line\n-removed line\n context', undefined, 'diff');
    expect(html).toContain('<span class="tok-add">+added line</span>');
    expect(html).toContain('<span class="tok-del">-removed line</span>');
  });

  it('leaves unknown languages readable with only generic tokens', () => {
    const html = highlight('plain text with 7 words', undefined, 'ticket');
    expect(html).toContain('<span class="tok-number">7</span>');
    expect(html).not.toContain('tok-keyword');
  });
});
