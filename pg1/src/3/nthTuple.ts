export type NthTuple<
  T,
  n extends number,
  acc extends T[] = [],
> = acc["length"] extends n ? acc : NthTuple<T, n, [T, ...acc]>;

if (import.meta.vitest) {
  const { describe, it, expectTypeOf } = import.meta.vitest;

  describe("Bit2Dec", () => {
    it("should convert a bit array to its decimal representation", () => {
      expectTypeOf<NthTuple<"1", 4>>().toEqualTypeOf<["1", "1", "1", "1"]>();
      expectTypeOf<NthTuple<"0", 6>>().toEqualTypeOf<
        ["0", "0", "0", "0", "0", "0"]
      >();
      expectTypeOf<NthTuple<"1", 4>>().toEqualTypeOf<["1", "1", "1", "1"]>();
    });
  });
}
