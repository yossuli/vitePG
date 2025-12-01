import type { ArrayFrom } from "./arrayFrom";
import type { Pow2 } from "./calc";
import type { RandomsBitsPair } from "./randomsBitsPair";
import type { SetBomb } from "./setBomb";
export type Bit = "1" | "0";

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

type bombMap = GameSetting<2, 16, SEED, [2, 2]>;
type bombMap2 = GameSetting<2, 6, SEED, [0, 0]>;
type SEED = ["1", "1", "0", "0", "1", "0", "0", "0", "0"];

// function fn1<T extends never>(_: T) {}
// declare const anyValue: any;
// fn1(anyValue);

declare const anyValue: any;
function fn2<T extends never>(): T {
  return anyValue;
}
