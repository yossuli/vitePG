import type { Bit } from ".";
import type { Fill } from "./fill";
import type { Xor } from "./op";
import type { ShiftL, ShiftR } from "./shift";
import type { SliceR } from "./slice";

export type Random<Seed extends Bit[]> = Xor<
  Fill<SliceR<Seed, 16>, 16>,
  SliceR<ShiftL<Seed, 7>, 16>
> extends infer T extends string[]
  ? Xor<T, ShiftR<T, 9>>
  : never;

if (import.meta.vitest) {
  const { describe, it, expectTypeOf } = import.meta.vitest;

  describe("Random", () => {
    it("should generate a random bit array based on the seed", () => {});
  });
}
