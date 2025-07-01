export type Fill<
  Bits extends string[],
  n extends number,
> = Bits["length"] extends n ? Bits : Fill<["0", ...Bits], n>;

if (import.meta.vitest) {
  const { describe, it, expectTypeOf } = import.meta.vitest;

  describe("Fill", () => {
    it("should fill bits to the left until the length matches n", () => {
      expectTypeOf<Fill<["1", "0", "1", "1"], 7>>().toEqualTypeOf<
        ["0", "0", "0", "1", "0", "1", "1"]
      >;
      expectTypeOf<Fill<["1", "1"], 5>>().toEqualTypeOf<
        ["0", "0", "0", "1", "1"]
      >;
    });
  });
}
