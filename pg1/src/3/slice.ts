export type SliceR<
  Bits extends any[],
  n extends number,
  acc extends any[] = [],
> = Bits["length"] extends n
  ? Bits
  : Bits extends [infer First, ...infer Rest extends any[]]
    ? Rest["length"] extends 0
      ? [...acc, First]
      : SliceR<Rest, n, [...acc, First]>
    : never;

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
      expectTypeOf<SliceR<[1, 2], 5>>().toEqualTypeOf<[1, 2]>();
    });
  });
}

type Slice<
  T extends any[],
  Start extends any[],
  End extends any[],
  _T = T,
> = _T extends [...End, ...infer _U]
  ? T extends [...infer U, ..._U]
    ? U extends [...Start, ...infer V]
      ? V
      : []
    : T
  : never;

// type hoge = Slice<[1, 2, 3, 4, 5], [any], [any, any, any]>;

type Hoge<T, U extends any[] = []> = T extends [...U, ...infer V] ? V : never;

// type hoge = Hoge<[1, 2, 3, 4, 5], [any, any, any]>;

type hoge = [1, 2, 3, 4, 5] extends [...infer U, infer V extends 3, ...infer W]
  ? [U, V, W]
  : never;
