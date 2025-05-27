import { describe, it, vi } from "vitest";

type RecursionNesterArraySetting<T> =
  | number
  | (() => any)
  | RecursionNesterArraySetting<T>[];

type RecursionNesterArrayReturn<T> =
  | number[]
  | (() => any)
  | RecursionNesterArraySetting<T>[];

const genNestedArray = <T extends RecursionNesterArraySetting<T>>(
  nestedArraySetting: T,
): RecursionNesterArrayReturn<T> =>
  typeof nestedArraySetting === "number"
    ? new Array(nestedArraySetting).map((_, i) => i)
    : typeof nestedArraySetting === "function"
      ? nestedArraySetting()
      : nestedArraySetting.map((item) => genNestedArray(item));

describe("Test Suite", () => {
  it("should pass the test", () => {
    const fn1 = vi.fn(() => "");
    // const nestedArray = genNestedArray(2);
    const nestedArray = genNestedArray([2, [1, [1, fn1]]] as const);
    const hoge = nestedArray;
  });
});
