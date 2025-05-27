type ShiftL<
  Bits extends string[],
  n extends number,
  EX extends string[] = [],
> = Bits extends [infer First extends string, ...infer Rest extends string[]]
  ? EX["length"] extends n
    ? [...EX, First, ...Rest]
    : [...ShiftL<Rest, n, [First, ...EX]>, "0"]
  : never;

type hoge = ShiftL<["1", "0", "1", "1"], 3>;

type ShiftR<
  Bits extends string[],
  n extends number,
  EX extends string[] = [],
> = Bits extends [...infer Rest extends string[], infer Last extends string]
  ? EX["length"] extends n
    ? [Last, ...Rest]
    : ["0", ...ShiftR<Rest, n, [...EX, Last]>]
  : Bits;
type hoge2 = ShiftR<Fill<["1", "0", "1", "1"], 16>, 3>;

type Xor<A extends string[], B extends string[]> = {
  [K in keyof A]: A[K] extends B[K] ? "0" : "1";
};

type hoge3 = Xor<["1", "0", "1", "1"], ["0", "1", "0", "1"]>;

type Fill<Bits extends string[], n extends number> = Bits["length"] extends n
  ? Bits
  : Fill<["0", ...Bits], n>;

type sliceLeft<
  Bits extends string[],
  n extends number,
> = Bits["length"] extends n
  ? Bits
  : Bits extends [infer _, ...infer Rest extends string[]]
    ? sliceLeft<Rest, n>
    : never;
type Bit = "1" | "0";

type Random<Seed extends Bit[]> = Xor<
  Fill<Seed, 16>,
  sliceLeft<ShiftL<Fill<Seed, 16>, 7>, 16>
> extends infer T
  ? T extends string[]
    ? Xor<T, Fill<ShiftR<T, 9>, 16>>
    : never
  : never;

type hoge5 = Random<["1", "0", "1", "1", "0", "1", "0", "1", "0"]>;

type Mod<Bits extends string[], Row extends Bit[]> = Fill<
  Row,
  Bits["length"]
> extends infer RowF
  ? [
      ...{
        [K in keyof Bits]: Bits[K] extends "1"
          ? RowF[K] extends "1"
            ? "1"
            : "0"
          : "0";
      },
    ]
  : never;

type hoge6 = Mod<["1", "0", "1", "1"], ["1", "0"]>;

type Pow2<Bits extends string[]> = Bits extends [
  infer _,
  ...infer Rest extends string[],
]
  ? [...Pow2<Rest>, ...Pow2<Rest>]
  : [""];

type hoge7 = Pow2<["1", "0", "1", "1"]>["length"];

type Bit2Dec<Bits extends string[]> = Bits extends [
  infer F,
  ...infer Rest extends string[],
]
  ? F extends "1"
    ? [...Pow2<Rest>, ...Bit2Dec<Rest>]
    : F extends string
      ? Bit2Dec<Rest>
      : [""]
  : [];

type hoge8 = Bit2Dec<["1", "0", "1", "1"]>["length"];

type random = Bit2Dec<
  Mod<Random<["1", "1", "1", "0", "1", "0", "0", "0", "1"]>, ["1", "1", "1"]>
>["length"];

type RandomsBitsPair<
  Seed extends Bit[],
  n extends number,
  acc extends Bit[][][] = [],
> = acc["length"] extends n
  ? acc
  : Random<Seed> extends infer RandomSeed
    ? RandomSeed extends Bit[]
      ? Random<RandomSeed> extends infer RRandomSeed
        ? RRandomSeed extends Bit[]
          ? [RRandomSeed, RandomSeed] extends acc[number]
            ? RandomsBitsPair<Random<RRandomSeed>, n, acc>
            : RandomsBitsPair<
                Random<RandomSeed>,
                n,
                [[RRandomSeed, RandomSeed], ...acc]
              >
          : never
        : never
      : never
    : never;

type hoge9 = RandomsBitsPair<["1", "0", "1", "1", "0", "1", "0", "1", "0"], 5>;

type RandomsDec<BitsS extends Bit[][][]> = {
  [K in keyof BitsS]: [
    Bit2Dec<Mod<Random<BitsS[K][0]>, ["1", "1", "1"]>>["length"],
    Bit2Dec<Mod<Random<BitsS[K][1]>, ["1", "1", "1"]>>["length"],
  ];
};

type Split<Str extends string> = Str extends `${infer Head},${infer Tail}`
  ? [Head, ...Split<Tail>]
  : [Str];

type hoge10 = RandomsDec<RandomsBitsPair<Split<"1,0,1,1,0,1,0,1,0">, 5>>;
