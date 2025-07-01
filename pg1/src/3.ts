type ShiftL<
  Bits extends string[],
  n extends number,
  EX extends string[] = [],
> = Bits extends [infer First extends string, ...infer Rest extends string[]]
  ? EX["length"] extends n
    ? [First, ...Rest]
    : [...ShiftL<Rest, n, [First, ...EX]>, "0"]
  : [Bits];

type hoge = ShiftL<["1", "0", "1", "1"], 3>;

// type Random<Seed extends string, Length extends number> = {};
