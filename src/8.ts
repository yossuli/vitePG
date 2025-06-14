type Hoge<T extends any[]> = T extends [
  ...infer U extends boolean[],
  ...infer V extends number[],
]
  ? [U, V]
  : never;

type Test1 = Hoge<[true, false, true, 1, 2, 3]>; // [3, 3]
