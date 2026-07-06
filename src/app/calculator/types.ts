export type Operator = 'add' | 'minus' | 'multiply' | 'divide';

export interface CalculatorSettings {
  operator: Operator;
  x: number;
  y: number;
}

// A tiny Result type for explicit error handling (no thrown exceptions in pure logic)
export type Ok<T> = { ok: true; value: T };
export type Err<E> = { ok: false; error: E };
export type Result<T, E = string> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });
export const err = <E = string>(error: E): Err<E> => ({ ok: false, error });
