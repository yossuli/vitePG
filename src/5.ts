import type { ArrayFrom } from "./3/arrayFrom";

type GenOut<T extends number, ACC extends number[], Out extends number[]> = {
  [K in keyof Out]: `${ACC["length"]}` extends K ? T : Out[K];
};

type hoge_1<
  A extends number[],
  Out extends number[],
  ACC extends number[],
  Loop extends number[] = ArrayFrom<number, 2>,
  LoopAcc extends number[] = [],
> = A extends [...ACC, infer T extends number, ...number[]]
  ? Loop extends [...infer Rest extends number[], number]
    ? T extends 0
      ? hoge_1<
          A,
          GenOut<T, ACC, Out>,
          [...ACC, number],
          Rest,
          [...LoopAcc, number]
        >
      : GenOut<T, ACC, Out>
    : Out
  : Out;

type NumNum = [number, number];

type hoge_2<A, Out extends number[], ACC extends number[]> = A extends [
  ...ACC,
  ...infer T extends NumNum,
  ...number[],
]
  ? T[1] extends 0
    ? hoge_1<A, GenOut<T[0], ACC, Out>, [...ACC, number], NumNum>
    : GenOut<T[0], ACC, Out>
  : Out;

export type hoge<
  A extends number[],
  Out extends number[],
  Acc extends number[] = [],
> = Acc extends [...infer ACC extends number[], number]
  ? hoge_2<A, Out, ACC>
  : hoge_1<A, Out, Acc>;

if (import.meta.vitest) {
  const { describe, it, expectTypeOf } = import.meta.vitest;

  describe("border", () => {
    it("left", () => {
      expectTypeOf<
        hoge<
          Filter<Rolling3<[0, 0, 0, 0, 1, 0, 0, 0, 0]>>,
          [-1, -1, -1, -1, -1, -1, -1, -1, -1],
          ArrayFrom<number, 0>
        >
      >().toEqualTypeOf<[0, 0, -1, -1, -1, -1, -1, -1, -1]>();
    });
    it("right", () => {
      expectTypeOf<
        hoge<
          Filter<Rolling3<[0, 0, 0, 0, 1, 0, 0, 0, 0]>>,
          [-1, -1, -1, -1, -1, -1, -1, -1, -1],
          ArrayFrom<number, 8>
        >
      >().toEqualTypeOf<[-1, -1, -1, -1, -1, -1, -1, 0, 0]>();
    });
  });
  it("center", () => {
    it("left", () => {
      expectTypeOf<
        hoge<
          Filter<Rolling3<[0, 0, 0, 0, 1, 0, 0, 0, 0]>>,
          [-1, -1, -1, -1, -1, -1, -1, -1, -1],
          ArrayFrom<number, 1>
        >
      >().toEqualTypeOf<[0, 0, 0, -1, -1, -1, -1, -1, -1]>();
    });
    it("right", () => {
      expectTypeOf<
        hoge<
          Filter<Rolling3<[0, 0, 0, 0, 1, 0, 0, 0, 0]>>,
          [-1, -1, -1, -1, -1, -1, -1, -1, -1],
          ArrayFrom<number, 6>
        >
      >().toEqualTypeOf<[-1, -1, -1, -1, -1, 1, 0, 0, -1]>();
    });
  });
}
