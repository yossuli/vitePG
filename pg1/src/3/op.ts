export type Xor<A extends string[], B extends string[]> = {
  // @ts-expect-error: 再帰にすればエラーにならないが...
  [K in keyof A]: A[K] extends B[K] ? "0" : "1";
};

if (import.meta.vitest) {
  const { describe, it, expectTypeOf } = import.meta.vitest;

  describe("Xor", () => {
    it("should return the XOR of two bit arrays", () => {
      expectTypeOf<Xor<["1", "0", "1", "1"], ["0", "1", "0", "1"]>>()
        .toEqualTypeOf<["1", "1", "1", "0"]>;
      expectTypeOf<Xor<["1", "1"], ["0", "0"]>>().toEqualTypeOf<["1", "1"]>;
    });
  });
}
