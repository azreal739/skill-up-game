import { Operator, Result, ok, err } from './types';

export const opsTable: Record<Operator, (x: number, y: number) => Result<number>> = {
  add:   (x, y) => ok(x + y),
  minus: (x, y) => ok(x - y),
  multiply: (x, y) => ok(x * y),
  divide: (x, y) => (y === 0 ? err('Cannot divide by zero') : ok(x / y)),
};

export const computePure = (op: Operator, x: number, y: number): Result<number> =>
  opsTable[op](x, y);
