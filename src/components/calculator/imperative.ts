export const mapLoop = <A, B>(xs: A[], fn: (a: A) => B): B[] => {
  const out: B[] = [];
  for (let i = 0; i < xs.length; i++) out.push(fn(xs[i]));
  return out;
};

// export const filterLoop = <A>(xs: A[], pred: (a: A) => boolean): A[] => {
//   const out: A[] = [];
//   for (let i = 0; i < xs.length; i++) {
//     if (pred(xs[i])) {
//       out.push(xs[i]);
//     }
//     return out;
//   }
// };

export const reduceLoop = <A, B>(xs: A[], seed: B, step: (acc: B, a: A) => B): B => {
  let acc = seed;
  for (let i = 0; i < xs.length; i++) acc = step(acc, xs[i]);
  return acc;
};
