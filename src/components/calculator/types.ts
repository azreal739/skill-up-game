import {T} from '@angular/cdk/keycodes';
import {error} from 'jquery';

export type Operator = "add" | "minus" | "multiply" | "divide";

export type Validator<T> = (value: T) => Result<T>;

export interface CalculatorSettings {
  operator: Operator;
  x: number;
  y: number;
}

export interface SinceCalculator {
  sin: boolean,
  cos: boolean,
  tan: boolean,
  sqrt: boolean,
  log: boolean,
  ln: boolean,
  exp: boolean
  value: number
}

// A tiny Result type for explicit error handling (no thrown exceptions in pure logic)
export type Ok<T> = { ok: true; value: T };
export type Err<E> = { ok: false; error: E };
export type Result<T, E = string> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });
export const err = <E = string>(error: E): Err<E> => ({ ok: false, error });

// Simple FP helpers (teach composition)
export const pipe =
  <A>(a: A) =>
    (...fns: Array<(x: any) => any>) =>
      fns.reduce((v, f) => f(v), a);

export const curry2 =
  <A, B, R>(f: (a: A, b: B) => R) =>
    (a: A) =>
      (b: B) =>
        f(a, b);

//validators
const divideByZero: Validator<CalculatorSettings> = settings => settings.operator === "divide" && settings.y === 0 ? err("Cannot divide by zero") : ok(settings);

const finiteX: Validator<CalculatorSettings> = settings => Number.isFinite(settings.x) ? ok(settings) : err("X must be positive");

const finiteY: Validator<CalculatorSettings> = function (s) {
  if (Number.isFinite(s.y)) {
    return ok(s);
  }

  return err("YNotFinite");
};


const chain =
  <T>(...validators: Validator<T>[]) =>
    (value: T): Result<T> =>
      validators.reduce(
        (acc, v) => (acc.ok ? v(acc.value) : acc),
        ok(value) as Result<T>
      );



export const validate = chain(finiteX, divideByZero, finiteY);

const resultOfValidation =  validate({ operator: "divide", x: 10, y: 0});
// → err("DivideByZero")


const list: CalculatorSettings[] = [{operator: "divide", x: 1, y: 2}];

const suff: Validator<SinceCalculator> = x => x.sqrt ? ok(x) : err("SqrtNotDefined");
