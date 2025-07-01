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
type Count1s<T extends number[], Acc extends number[] = []> = T extends [
  infer F extends number,
  ...infer Rest extends number[],
]
  ? F extends 1
    ? Count1s<Rest, [...Acc, 1]>
    : Count1s<Rest, Acc>
  : Acc;

type Filter<T extends number[][]> = {
  [K in keyof T]: Count1s<T[K]>["length"];
};

type hoge = Filter<Rolling3<[0, 0, 0, 1, 0, 0]>>;
