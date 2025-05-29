export type ArrayFrom<
  T,
  N extends number,
  R extends T[] = [],
> = R["length"] extends N ? R : ArrayFrom<T, N, [...R, T]>;
