import { safeInternalReturnUrl } from './auth-page.component';

describe('safeInternalReturnUrl', () => {
  it('keeps internal Academy routes', () => {
    expect(safeInternalReturnUrl('/campaigns?track=mission-control#next')).toBe(
      '/campaigns?track=mission-control#next'
    );
  });

  it('rejects protocol-relative and absolute return targets', () => {
    expect(safeInternalReturnUrl('//example.com/phish')).toBe('/');
    expect(safeInternalReturnUrl('https://example.com/phish')).toBe('/');
  });

  it('prevents redirects back into the authentication screens', () => {
    expect(safeInternalReturnUrl('/sign-in')).toBe('/');
    expect(safeInternalReturnUrl('/waitlist')).toBe('/');
  });
});
