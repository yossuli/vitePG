import { describe, expectTypeOf, it } from "vitest";
import { O_nType } from "./types/1";

const O_N = <T extends string[], U extends string>(
  t: T,
  u: U,
  r: O_nType<T, U>
) => r;

describe("O_N", () => {
  it("should return true for a valid type", () => {
    expectTypeOf(
      O_N(["a", "b", "c"] as const, "a", true)
    ).toEqualTypeOf<true>();
  });

  it("should return false for an invalid type", () => {
    expectTypeOf(
      O_N(["a", "b", "c"] as const, "d", false)
    ).toEqualTypeOf<false>();
  });

  it("should handle empty arrays", () => {
    expectTypeOf(O_N([] as const, "a", false)).toEqualTypeOf<false>();
  });
});
