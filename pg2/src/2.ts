import { describe, expect, it } from "vitest";
import { O_n2Type } from "./types/2";

const O_N2 = <T extends string[][], U extends string>(
  t: T,
  u: U,
  r: O_n2Type<T, U>
) => r;

describe("O_N2", () => {
  it("should return an array of booleans indicating if U is in each sub-array of T", () => {
    const result = O_N2([["a", "b"], ["c", "d"], ["e"]] as const, "a", [
      true,
      false,
      false,
    ]);
    expect(result).toEqual([true, false, false]);
  });

  it("should handle empty arrays", () => {
    const result = O_N2([], "a", []);
    expect(result).toEqual([]);
  });
});
