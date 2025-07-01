import { describe, expectTypeOf, it } from "vitest";
import { EnsureUniqueStrArr } from "./types/4";

export const uniqueStrArr = <T extends string[]>(
  arr: EnsureUniqueStrArr<T>
): T => arr;

describe("uniqueStrArr", () => {
  it("should return the same array if all elements are unique", () => {
    const arr = uniqueStrArr(["a", "b", "c"] as const);
    expectTypeOf(arr).toEqualTypeOf<["a", "b", "c"]>();
  });
  it("should remove duplicates from the array", () => {
    const arr = uniqueStrArr(["a", "b", "c", "a"] as const);
    expectTypeOf(arr).toEqualTypeOf<["a", "b", "c", "a"]>();
  });
});
