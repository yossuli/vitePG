type hoge<
  A extends number[],
  // B extends number[],
  Mask extends number[],
  MaskAcc extends number[] = [],
  Acc extends number[] = [],
> = Mask extends [infer Head extends number, ...infer Rest extends number[]]
  ? A extends [...MaskAcc, infer T, ...infer Tail extends number[]]
    ? T extends 1
      ? hoge<A, Rest, [...MaskAcc, Head], [...Acc, MaskAcc["length"]]>
      : hoge<A, Rest, [...MaskAcc, Head], [...Acc, 0]>
    : Acc
  : Acc;

type hoge_1 = hoge<
  [0, 0, 0, 1],
  // [1, 2, 3, 4, 5],
  [number, number, number, number]
>;

// | 0 | 0 0 1
// | 0 | 1 0 0
// 0 | 0 | 0 1
// 0 | 1 | 0 0