type Rolling3<
  A extends number[],
  Acc extends number[][] = [],
> = Acc["length"] extends 0
  ? A extends [infer M extends number, infer L extends number, ...number[]]
    ? Rolling3<A, [[M, L]]>
    : never
  : A["length"] extends 2
    ? [...Acc, [A[0], A[1]]]
    : __Rolling3<A, Acc>;

type __Rolling3<A extends number[], Acc extends number[][] = []> = A extends [
  infer F extends number,
  infer M extends number,
  infer L extends number,
  ...infer Rest extends number[],
]
  ? Rolling3<[M, L, ...Rest], [...Acc, [F, M, L]]>
  : never;

type hoge = Rolling3<[1, 2, 3]>;
