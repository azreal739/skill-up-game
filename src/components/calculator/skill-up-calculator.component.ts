import { Component, signal } from '@angular/core';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { CalculatorService } from './calculator.service';
import {CalculatorSettings, Operator, validate, Validator} from './types';

@Component({
  selector: 'skill-up-calculator',
  standalone: true,
  imports: [NgIf, NgFor, DecimalPipe],
  templateUrl: 'skill-up-calculator.component.html',
  styleUrl: 'skill-up-calculator.component.scss'
})
export class SkillUpCalculatorComponent {
  operators: Operator[] = ['add', 'minus', 'multiply', 'divide'];

  x = signal<number>(10);
  y = signal<number>(5);
  op = signal<Operator>('add');

  oneResult = signal<{ ok: boolean; value?: number; error?: string } | null>(null);
  batchParity = signal<{ equal: boolean; loop: number[]; hof: number[] } | null>(null);

  constructor(private readonly calc: CalculatorService) {}

  onXInput(ev: Event) {
    const input = ev.target as HTMLInputElement | null;
    this.x.set(
      (input?.valueAsNumber ?? Number((input?.value ?? '').trim())) || 0
    );
  }

  onYInput(ev: Event) {
    const input = ev.target as HTMLInputElement | null;
    this.y.set(
      (input?.valueAsNumber ?? Number((input?.value ?? '').trim())) || 0
    );
  }

  onOpChange(ev: Event) {
    const select = ev.target as HTMLSelectElement | null;
    this.op.set((select?.value as Operator) ?? 'add');
  }


  runOnce() {
    const res = this.calc.compute({ operator: this.op(), x: this.x(), y: this.y() });
    this.oneResult.set(res.ok ? res : { ok: false, error: res.error! });
  }

  runBatch() {
    const seed: CalculatorSettings[] = [
      { operator: this.op(), x: this.x(), y: this.y() },
      { operator: 'multiply', x: 2, y: 3 },
      { operator: 'minus',    x: 7, y: 4 },
      { operator: 'divide',   x: 8, y: 2 },
    ];

    // let validationResult;
    //
    // for(let i = 0; i < seed.length; i++){
    //   this.validationResult = validate(seed[i]);
    // }

    const guard = (s: CalculatorSettings) => Number.isFinite(s.x) && Number.isFinite(s.y);

    // const loop = this.calc.batchComputeLoop(seed, guard);
    // const hof  = this.calc.batchComputeHof(seed, guard);

    // const loopVals = loop.ok ? loop.value : [];
    // const hofVals  = hof.ok ? hof.value  : [];

    // this.batchParity.set({
    //   equal: JSON.stringify(loopVals) === JSON.stringify(hofVals),
    //   loop: loopVals,
    //   hof: hofVals,
    // });
  }
}
