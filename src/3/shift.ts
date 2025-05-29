export type ShiftL<
  Bits extends string[],
  n extends number,
  acc extends string[] = [],
> = Bits extends [infer First extends string, ...infer Rest extends string[]]
  ? acc["length"] extends n
    ? [...acc, First, ...Rest]
    : ShiftL<[...Rest, "0"], n, [...acc, First]>
  : never;

export type ShiftR<
  Bits extends string[],
  n extends number,
  acc extends string[] = [],
> = Bits extends [...infer Rest extends string[], infer Last extends string]
  ? acc["length"] extends n
    ? [...Rest, Last]
    : ShiftR<["0", ...Rest], n, [Last, ...acc]>
  : never;

if (import.meta.vitest) {
  const { describe, it, expectTypeOf } = import.meta.vitest;

  describe("ShiftL", () => {
    it("should shift bits to the left", () => {
      expectTypeOf<ShiftL<["1", "0", "1", "1"], 3>>().toEqualTypeOf<
        ["1", "0", "1", "1", "0", "0", "0"]
      >;
      expectTypeOf<ShiftL<["1", "1"], 3>>().toEqualTypeOf<
        ["1", "1", "0", "0", "0"]
      >;
    });
  });

  describe("ShiftR", () => {
    it("should shift bits to the right", () => {
      expectTypeOf<ShiftR<["1", "0", "1", "1"], 3>>().toEqualTypeOf<
        ["0", "0", "0", "1"]
      >;
      expectTypeOf<ShiftR<["1", "1"], 3>>().toEqualTypeOf<["0", "0"]>;
    });
  });
}
