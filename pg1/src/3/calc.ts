import type { Bit } from ".";
import type { Fill } from "./fill";

export type Mod2n<Bits extends string[], Row extends Bit[]> = Fill<
  Row,
  Bits["length"]
> extends infer RowF
  ? {
      [K in keyof Bits]: Bits[K] extends "1"
        ? // @ts-expect-error: 再帰にすればエラーにならないが...
          RowF[K] extends "1"
          ? "1"
          : "0"
        : "0";
    }
  : never;

export type Pow2<Bits extends string[]> = Bits extends [
  infer _,
  ...infer Rest extends string[],
]
  ? [...Pow2<Rest>, ...Pow2<Rest>]
  : [""];

if (import.meta.vitest) {
  const { describe, it, expectTypeOf } = import.meta.vitest;

  describe("Mod2n", () => {
    it("should return the modulo 2n of a bit array with a given row", () => {
      expectTypeOf<Mod2n<["1", "0", "1", "1"], ["1", "1"]>>().toEqualTypeOf<
        ["0", "0", "1", "1"]
      >;
    });
  });
  describe("Pow2", () => {
    it("should return the powers of 2 for a given bit array", () => {
      expectTypeOf<Pow2<["1", "1"]>>().toEqualTypeOf<["", "", "", ""]>;
    });
  });
}
