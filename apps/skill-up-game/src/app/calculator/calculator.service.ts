import { Injectable } from '@angular/core';
import { CalculatorSettings, Result } from './types';
import { computePure } from './calculator-core';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  compute({ operator, x, y }: CalculatorSettings): Result<number> {
    return computePure(operator, x, y);
  }
}
