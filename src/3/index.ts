import type { Bit2Dec } from "./bit2Dec";
import type { Mod2n, Pow2 } from "./calc";
import type { Fill } from "./fill";
import type { NthTuple } from "./nthTuple";
import type { Xor } from "./op";
import type { ShiftL, ShiftR } from "./shift";
export type Bit = "1" | "0";

type Random<Seed extends NthTuple<Bit, 9>> = Xor<
  Fill<Seed, 16>,
  ShiftL<Seed, 7>
> extends infer T extends string[]
  ? Xor<T, ShiftR<T, 9>>
  : never;

type RandomsBitsPair<
  Seed extends NthTuple<Bit, 9>,
  n extends number,
  size extends number,
  acc extends number[][] = [],
> = acc["length"] extends n
  ? acc
  : Random<Seed> extends [
        ...NthTuple<Bit, 7>,
        ...infer RandomSeed extends NthTuple<Bit, 9>,
      ]
    ? Random<RandomSeed> extends [
        ...NthTuple<Bit, 7>,
        ...infer RRandomSeed extends NthTuple<Bit, 9>,
      ]
      ? [
          Bit2Dec<Mod2n<RRandomSeed, ArrayFrom<"1", size>>>,
          Bit2Dec<Mod2n<RandomSeed, ArrayFrom<"1", size>>>,
        ] extends infer randomPair extends [number, number]
        ? randomPair extends acc[number]
          ? Random<RRandomSeed> extends [
              ...NthTuple<Bit, 7>,
              ...infer RRR extends NthTuple<Bit, 9>,
            ]
            ? RandomsBitsPair<RRR, n, size, acc>
            : never
          : RandomsBitsPair<RRandomSeed, n, size, [randomPair, ...acc]>
        : never
      : never
    : never;

type hoge9 = RandomsBitsPair<
  ["1", "0", "1", "1", "0", "1", "0", "1", "0"],
  4,
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
    : ____SetBomb<Rest, Bombs, K, [...acc, "_"]>
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

// @ts-ignore
type hoge10 = SetBomb<Field, RandomsBitsPair<SEED, 5, 2>>;

type GameSetting<
  lv extends number,
  bombNum extends number,
  Seed extends NthTuple<Bit, 9>,
  FirstClick extends [number, number],
  // @ts-expect-error: そうそう再帰上限には引っかからないはず...
> = Pow2<ArrayFrom<"", lv>>["length"] extends infer Size extends number
  ? RandomsBitsPair<Seed, bombNum, lv, [FirstClick]> extends [
      ...infer Bombs extends number[][],
      infer _,
    ]
    ? SetBomb<ArrayFrom<ArrayFrom<"0", Size>, Size>, Bombs>
    : never
  : never;

type bombMap = GameSetting<2, 16, SEED, [0, 0]>;
type bombMap2 = GameSetting<2, 6, SEED, [0, 0]>;
type SEED = ["1", "1", "1", "0", "1", "0", "0", "0", "1"];
