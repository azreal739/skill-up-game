import { Component, signal } from '@angular/core';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { CalculatorService } from './calculator.service';
import { Operator } from './types';

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

  result = signal<{ ok: boolean; value?: number; error?: string } | null>(null);

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

  compute() {
    const res = this.calc.compute({ operator: this.op(), x: this.x(), y: this.y() });
    this.result.set(res.ok ? res : { ok: false, error: res.error });
  }
}
