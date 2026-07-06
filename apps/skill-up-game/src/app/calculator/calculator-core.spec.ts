import { computePure } from './calculator-core';

describe('computePure', () => {
  it('adds', () => {
    expect(computePure('add', 2, 3)).toEqual({ ok: true, value: 5 });
  });

  it('subtracts', () => {
    expect(computePure('minus', 7, 4)).toEqual({ ok: true, value: 3 });
  });

  it('multiplies', () => {
    expect(computePure('multiply', 2, 3)).toEqual({ ok: true, value: 6 });
  });

  it('divides', () => {
    expect(computePure('divide', 8, 2)).toEqual({ ok: true, value: 4 });
  });

  it('returns an error for division by zero', () => {
    const result = computePure('divide', 8, 0);
    expect(result.ok).toBeFalse();
    if (!result.ok) {
      expect(result.error).toBe('Cannot divide by zero');
    }
  });
});
