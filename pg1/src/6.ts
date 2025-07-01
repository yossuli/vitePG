import type { ArrayFrom } from "./3/arrayFrom";

type GenOut<Val extends number, Index extends number, Arr extends number[]> = {
  [K in keyof Arr]: `${Index}` extends K ? Val : Arr[K];
};

type ProcessAsType1<
  A extends number[],
  Out extends number[],
  OriginalAcc extends number[],
  CurrentLoop extends number[],
  CurrentLoopAcc extends number[],
  CombinedAcc extends number[],
> = A extends [...CombinedAcc, infer T extends number, ...number[]]
  ? CurrentLoop extends [...infer NextLoop extends number[], number]
    ? T extends 0
      ? RecursiveDispatcher<
          A,
          GenOut<T, CombinedAcc["length"], Out>,
          OriginalAcc,
          NextLoop,
          [...CurrentLoopAcc, number]
        >
      : GenOut<T, CombinedAcc["length"], Out>
    : Out
  : Out;

type ProcessAsType2<
  A extends number[],
  Out extends number[],
  OriginalAcc extends number[],
  CurrentLoop extends number[],
  CurrentLoopAcc extends number[],
  CombinedAccFront extends number[],
> = A extends [
  ...CombinedAccFront,
  infer F extends number,
  infer T extends number,
  ...number[],
]
  ? CurrentLoop extends [...infer NextLoop extends number[], number]
    ? T extends 0
      ? RecursiveDispatcher<
          A,
          GenOut<F, CombinedAccFront["length"], Out>,
          OriginalAcc,
          NextLoop,
          CurrentLoopAcc
        >
      : GenOut<F, CombinedAccFront["length"], Out>
    : Out
  : Out;

export type RecursiveDispatcher<
  A extends number[],
  Out extends number[],
  OAcc extends number[],
  CLoop extends number[],
  CLoopAcc extends number[],
> = ProcessAsType1<A, Out, OAcc, CLoop, CLoopAcc, [...OAcc, ...CLoopAcc]>;

export type SimplifiedHoge<
  A extends number[],
  Out extends number[],
  InitialOriginalAcc extends number[] = [],
  LoopForType2AndRecursiveDefault extends number[] = ArrayFrom<number, 3>,
  LoopForInitialType1EmptyAcc extends number[] = ArrayFrom<number, 2>,
> = [...InitialOriginalAcc, ...[]] extends infer InitialCombinedAcc extends
  number[]
  ? InitialCombinedAcc["length"] extends 0
    ? ProcessAsType1<
        A,
        Out,
        InitialOriginalAcc,
        LoopForInitialType1EmptyAcc,
        [],
        InitialCombinedAcc
      >
    : InitialCombinedAcc extends [
          ...infer InitialCombinedAccFront extends number[],
          number,
        ]
      ? ProcessAsType2<
          A,
          Out,
          InitialOriginalAcc,
          LoopForType2AndRecursiveDefault,
          [],
          InitialCombinedAccFront
        >
      : Out
  : never;

if (import.meta.vitest) {
  const { describe, it, expectTypeOf } = import.meta.vitest;

  describe("border", () => {
    it("left", () => {
      expectTypeOf<
        SimplifiedHoge<
          Filter<Rolling3<[0, 0, 0, 0, 1, 0, 0, 0, 0]>>,
          [-1, -1, -1, -1, -1, -1, -1, -1, -1],
          ArrayFrom<number, 0>
        >
      >().toEqualTypeOf<[0, 0, -1, -1, -1, -1, -1, -1, -1]>();
    });
    it("right", () => {
      expectTypeOf<
        SimplifiedHoge<
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
        SimplifiedHoge<
          Filter<Rolling3<[0, 0, 0, 0, 1, 0, 0, 0, 0]>>,
          [-1, -1, -1, -1, -1, -1, -1, -1, -1],
          ArrayFrom<number, 1>
        >
      >().toEqualTypeOf<[0, 0, 0, -1, -1, -1, -1, -1, -1]>();
    });
    it("right", () => {
      expectTypeOf<
        SimplifiedHoge<
          Filter<Rolling3<[0, 0, 0, 0, 1, 0, 0, 0, 0]>>,
          [-1, -1, -1, -1, -1, -1, -1, -1, -1],
          ArrayFrom<number, 6>
        >
      >().toEqualTypeOf<[-1, -1, -1, -1, -1, 1, 0, 0, -1]>();
    });
  });
}
