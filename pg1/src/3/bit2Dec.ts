import type { Pow2 } from "./calc";

type __Bit2Dec<Bits extends string[]> = Bits extends [
  infer F,
  ...infer Rest extends string[],
]
  ? F extends "1"
    ? [...Pow2<Rest>, ...__Bit2Dec<Rest>]
    : F extends string
      ? __Bit2Dec<Rest>
      : [""]
  : [];
export type Bit2Dec<Bits extends string[]> = __Bit2Dec<Bits>["length"];

if (import.meta.vitest) {
  const { describe, it, expectTypeOf } = import.meta.vitest;

  describe("Bit2Dec", () => {
    it("should convert a bit array to its decimal representation", () => {
      expectTypeOf<Bit2Dec<["1", "0", "1", "1"]>>().toEqualTypeOf<11>();
      expectTypeOf<Bit2Dec<["1", "1"]>>().toEqualTypeOf<3>();
      expectTypeOf<Bit2Dec<["0", "0", "0"]>>().toEqualTypeOf<0>();
    });
  });
}
