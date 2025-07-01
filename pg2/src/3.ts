import { describe, expectTypeOf, it } from "vitest";
import { Duplicate } from "./types/3";

const duplicate = <T extends string[]>(t: T): Duplicate<T> => {
  return t[0] as Duplicate<T>;
};

describe("Duplicate", () => {
  it("should return the first duplicate in the array", () => {
    const result = duplicate(["a", "b", "c", "a", "d"] as const);
    expectTypeOf(result).toEqualTypeOf<"a">();
  });

  it("should return an empty string if there are no duplicates", () => {
    const result = duplicate(["a", "b", "c"]);
    expectTypeOf(result).toEqualTypeOf<never>();
  });
});
