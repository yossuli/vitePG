export type ArrayFrom<
  T,
  N extends number,
  R extends T[] = [],
> = R["length"] extends N ? R : ArrayFrom<T, N, [...R, T]>;

if (import.meta.vitest) {
  const { describe, it, expectTypeOf } = import.meta.vitest;

  describe("ArrayFrom", () => {
    it("should create an array of length N filled with T", () => {
      expectTypeOf<ArrayFrom<"1", 4>>().toEqualTypeOf<["1", "1", "1", "1"]>();
      expectTypeOf<ArrayFrom<"0", 6>>().toEqualTypeOf<
        ["0", "0", "0", "0", "0", "0"]
      >();
      expectTypeOf<ArrayFrom<"A", 3>>().toEqualTypeOf<["A", "A", "A"]>();
    });
  });
}
