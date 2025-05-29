export type SliceR<
  Bits extends any[],
  n extends number,
  acc extends any[] = [],
> = acc["length"] extends n
  ? acc
  : Bits extends [infer First, ...infer Rest extends any[]]
    ? SliceR<Rest, n, Rest>
    : [];

if (import.meta.vitest) {
  const { describe, it, expectTypeOf } = import.meta.vitest;
  describe("SliceR", () => {
    it("should slice the last n elements from an array", () => {
      expectTypeOf<SliceR<[1, 2, 3, 4, 5], 3>>().toEqualTypeOf<[3, 4, 5]>();
      expectTypeOf<SliceR<["a", "b", "c", "d"], 2>>().toEqualTypeOf<
        ["c", "d"]
      >();
      expectTypeOf<SliceR<[true, false, true], 1>>().toEqualTypeOf<[true]>();
    });
    it("should return an empty array if n is greater than the length of the array", () => {
      expectTypeOf<SliceR<[1, 2], 5>>().toEqualTypeOf<[]>();
    });
  });
}
