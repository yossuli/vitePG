import type { ArrayFrom } from "./arrayFrom";
import type { Bit2Dec } from "./bit2Dec";
import type { Mod2n, Pow2 } from "./calc";
import type { Fill } from "./fill";
import type { Xor } from "./op";
import type { ShiftL, ShiftR } from "./shift";
import type { SliceR } from "./slice";
export type Bit = "1" | "0";

type Random<Seed extends Bit[]> = Xor<
  Fill<SliceR<Seed, 16>, 16>,
  SliceR<ShiftL<Seed, 7>, 16>
> extends infer T extends string[]
  ? Xor<T, ShiftR<T, 9>>
  : never;

type genIndex<SEED extends Bit[], Size extends number> = Bit2Dec<
  Mod2n<Random<SEED>, ArrayFrom<"1", Size>>
>;
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
          genIndex<RRandomSeed, size>,
          genIndex<RandomSeed, size>,
        ] extends infer randomPair extends [number, number]
        ? randomPair extends acc[number]
          ? Random<RRandomSeed> extends infer RRR extends Bit[]
            ? RandomsBitsPair<RRR, n, size, acc>
            : never
          : RandomsBitsPair<RRandomSeed, n, size, [randomPair, ...acc]>
        : never
      : never
    : never;

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

type GameSetting<
  lv extends number,
  bombNum extends number,
  Seed extends Bit[],
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
