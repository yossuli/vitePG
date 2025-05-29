type FilterTarget<
  T extends string,
  Array extends readonly string[],
> = Array extends [infer U, ...infer V extends string[]]
  ? U extends T
    ? [U, ...FilterTarget<T, V>]
    : FilterTarget<T, V>
  : [];

export type EnsureUniqueStrArr<T extends readonly string[]> = {
  [K in keyof T]: FilterTarget<T[K], T>["length"] extends 1 ? T[K] : never;
};

export const uniqueStrArr = <T extends string[]>(
  arr: EnsureUniqueStrArr<T>,
): T => arr;

uniqueStrArr(["a", "b", "c", "a"] as const);

type hoge = [...(readonly ["a", "b", "c", "a"])];
type lv3 = EnsureUniqueStrArr<readonly ["a", "b", "c", "a"]>;

type lv3a = FilterTarget<"a", readonly ["a", "b", "c", "a"]>;

type EnsureUniqueStrArrTest<T extends readonly string[]> = {
  [K in keyof T]: T[K] extends "b" | "c" ? T[K] : never;
};
type lv2 = EnsureUniqueStrArrTest<readonly ["a", "b", "c", "a"]>;

// const hoge3 = uniqueStrArr(["a", "b", "c", "a"] as const);

// type hoge<T extends readonly string[]> = {
//   [K in keyof T]: T[K] extends "a" ? never : T[K];
// };

// const fn = <T extends readonly string[]>(a: hoge<T>): T => a;

// const test = fn(["a", "b", "c", "a"] as const);

// type hoge2 = hoge<readonly ["a", "b", "c", "a"]>;

// uniqueStrArr;

type test<T extends readonly string[]> = T extends (infer U)[] ? U : never;

type hoge4 = test<readonly ["a", "b", "c", "a"]>;

if (import.meta.vitest) {
  const { describe, it } = import.meta.vitest;
  describe("", () => {
    it("should pass the test", () => {});
  });
}
