import { Injectable } from '@angular/core';
import { CalculatorSettings, Operator, Result, ok, err } from './types';
// import { mapLoop, filterLoop, reduceLoop } from './imperative';
// import { mapHof, filterHof, reduceHof } from './functional';
import { computePure } from './calculator-core';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  // 1) One-shot compute via pure core
  compute({ operator, x, y }: CalculatorSettings): Result<number> {
    return computePure(operator, x, y);
  }

  // 2) Batch compute (NO HOFs) to demonstrate imperative pipelines
  // batchComputeLoop(settings: CalculatorSettings[], guard: (s: CalculatorSettings) => boolean): Result<number[]> {
  //   // filter invalid first
  //   const valid = filterLoop(settings, guard);
  //   // map to results
  //   const results = mapLoop(valid, s => computePure(s.operator, s.x, s.y));
  //   // collect Ok values only (show reduce)
  //   const collected = reduceLoop(results, [] as number[], (acc, r) => (r.ok ? [...acc, r.value] : acc));
  //   return ok(collected);
  // }

  // 3) Batch compute (WITH HOFs) to show declarative parity
  // batchComputeHof(settings: CalculatorSettings[], guard: (s: CalculatorSettings) => boolean): Result<number[]> {
  //   const valid = filterHof(settings, guard);
  //   const results = mapHof(valid, s => computePure(s.operator, s.x, s.y));
  //   const collected = reduceHof(results, [] as number[], (acc, r) => (r.ok ? [...acc, r.value] : acc));
  //   return ok(collected);
  // }

  // Bonus: tiny immutable Cart example to tie back to earlier lesson
  addItemImmutable = (cart: { id: string; items: string[] }, item: string) =>
    ({ ...cart, items: [...cart.items, item] });
}
