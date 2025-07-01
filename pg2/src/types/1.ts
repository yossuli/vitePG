export type O_nType<T extends string[], U extends string> = U extends T[number]
  ? true
  : false;
