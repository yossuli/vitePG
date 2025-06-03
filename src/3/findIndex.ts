export type FindIndex<T extends any[], U, Acc extends any[] = []> = T extends [
  infer F,
  ...infer R,
]
  ? F extends U
    ? Acc["length"]
    : FindIndex<R, U, [...Acc, F]>
  : -1;

export type FindIndexTuple<
  T extends any[][],
  U,
  Acc extends any[][] = [],
> = T extends [infer F extends any[], ...infer R extends any[][]]
  ? FindIndex<F, U> extends infer Index
    ? Index extends -1
      ? FindIndexTuple<R, U, [...Acc, F]>
      : [Acc["length"], Index]
    : never
  : -1;
type hoge = FindIndexTuple<[[1, 2], [3, 4], [5, 6]], 3>;

if (import.meta.vitest) {
  const { describe, it, expectTypeOf } = import.meta.vitest;

  describe("FindIndex", () => {
    it("should find the index of an element in an array", () => {
      expectTypeOf<FindIndex<[1, 2, 3, 4], 3>>().toEqualTypeOf<2>();
      expectTypeOf<FindIndex<["a", "b", "c"], "b">>().toEqualTypeOf<1>();
      expectTypeOf<FindIndex<[true, false, true], false>>().toEqualTypeOf<1>();
      expectTypeOf<FindIndex<[1, 2, 3], 4>>().toEqualTypeOf<-1>();
    });
  });

  describe("FindIndexTuple", () => {
    it("should find the index of an element in a tuple of arrays", () => {
      expectTypeOf<FindIndexTuple<[[1, 2], [3, 4], [5, 6]], 3>>().toEqualTypeOf<
        [1, 0]
      >();
      expectTypeOf<
        FindIndexTuple<[["a", "b"], ["c", "d"]], "c">
      >().toEqualTypeOf<[1, 0]>();
      expectTypeOf<FindIndexTuple<[[true], [false]], false>>().toEqualTypeOf<
        [1, 0]
      >();
      expectTypeOf<FindIndexTuple<[[1], [2]], 3>>().toEqualTypeOf<-1>();
    });
  });
}
