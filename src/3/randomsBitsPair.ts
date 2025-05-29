import type { Bit } from ".";
import type { ArrayFrom } from "./arrayFrom";
import type { Bit2Dec } from "./bit2Dec";
import type { Mod2n } from "./calc";
import type { Random } from "./random";

type __genIndex<SEED extends Bit[], Size extends number> = Bit2Dec<
  Mod2n<Random<SEED>, ArrayFrom<"1", Size>>
>;

export type RandomsBitsPair<
  Seed extends Bit[],
  n extends number,
  size extends number,
  acc extends number[][] = [],
> = acc["length"] extends n
  ? acc
  : Random<Seed> extends infer RandomSeed extends Bit[]
    ? Random<RandomSeed> extends infer RRandomSeed extends Bit[]
      ? [
          __genIndex<RRandomSeed, size>,
          __genIndex<RandomSeed, size>,
        ] extends infer randomPair extends [number, number]
        ? randomPair extends acc[number]
          ? Random<RRandomSeed> extends infer RRR extends Bit[]
            ? RandomsBitsPair<RRR, n, size, acc>
            : never
          : RandomsBitsPair<RRandomSeed, n, size, [randomPair, ...acc]>
        : never
      : never
    : never;

if (import.meta.vitest) {
  const { describe, it, expectTypeOf } = import.meta.vitest;

  describe("RandomsBitsPair", () => {
    it("should generate unique random pairs of indices", () => {});
  });
}
