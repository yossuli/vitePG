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
  size extends number,
  acc extends number[][] = [],
> = acc["length"] extends n
  ? acc
  : Random<Seed> extends infer RandomSeed extends Bit[]
    ? Random<RandomSeed> extends infer RRandomSeed extends Bit[]
      ? [
          Bit2Dec<Mod<RRandomSeed, ArrayFrom<"1", size>>>["length"],
          Bit2Dec<Mod<RandomSeed, ArrayFrom<"1", size>>>["length"],
        ] extends infer randomPair
        ? randomPair extends number[]
          ? randomPair extends acc[number]
            ? RandomsBitsPair<Random<RRandomSeed>, n, size, acc>
            : RandomsBitsPair<Random<RandomSeed>, n, size, [randomPair, ...acc]>
          : never
        : never
      : never
    : never;

type hoge9 = RandomsBitsPair<
  ["1", "0", "1", "1", "0", "1", "0", "1", "0"],
  16,
  2
>;

type ArrayFrom<T, N extends number, R extends T[] = []> = R["length"] extends N
  ? R
  : ArrayFrom<T, N, [...R, T]>;

type Field = ArrayFrom<ArrayFrom<"0", 4>, 4>;

type ____SetBomb<
  Field extends string[],
  Bombs extends number[][],
  K extends number,
  acc extends string[] = [],
> = Field extends [infer _, ...infer Rest extends string[]]
  ? [acc["length"], K] extends Bombs[number]
    ? ____SetBomb<Rest, Bombs, K, [...acc, "B"]>
    : ____SetBomb<Rest, Bombs, K, [...acc, "0"]>
  : acc;

type __SetBomb<
  Field extends string[][],
  Bombs extends number[][],
  acc extends string[][] = [],
> = Field extends [infer F extends string[], ...infer Rest extends string[][]]
  ? __SetBomb<Rest, Bombs, [...acc, ____SetBomb<F, Bombs, acc["length"]>]>
  : acc;

type SetBomb<Field extends string[][], Bombs extends number[][]> = __SetBomb<
  Field,
  Bombs
>;

type Split<Bits extends string> = Bits extends `${infer F}${infer R}`
  ? [F, ...Split<R>]
  : [];

// @ts-ignore
type hoge10 = SetBomb<Field, RandomsBitsPair<SEED, 5, 2>>;

type GameSetting<
  lv extends number,
  bombNum extends number,
  Seed extends Bit[],
  FirstClick extends [number, number],
  // @ts-ignore
> = Pow2<ArrayFrom<"", lv>>["length"] extends infer Size extends number
  ? RandomsBitsPair<Seed, bombNum, lv, [FirstClick]> extends [
      ...infer Bombs extends number[][],
      infer _,
    ]
    ? // @ts-ignore
      SetBomb<
        // @ts-ignore
        ArrayFrom<ArrayFrom<"0", Size>, Size>,
        Bombs
      >
    : never
  : never;

type hoge11 = GameSetting<2, 15, SEED, [0, 0]>;

type SEED = ["1", "0", "1", "1", "0", "1", "0", "1", "0"];
