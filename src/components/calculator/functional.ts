export const mapHof = <A, B>(xs: A[], fn: (a: A) => B): B[] => xs.map(fn);
export const filterHof = <A>(xs: A[], pred: (a: A) => boolean): A[] => xs.filter(pred);
export const reduceHof = <A, B>(xs: A[], seed: B, step: (acc: B, a: A) => B): B =>
  xs.reduce(step, seed);
