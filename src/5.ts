import type { ArrayFrom } from "./3/arrayFrom";

type GenOut<T extends number, IndexT extends number, Out extends number[]> = {
  [K in keyof Out]: `${IndexT}` extends K ? T : Out[K];
};

type hoge_1<
  A extends number[],
  Out extends number[],
  ACC extends number[],
  Acc extends number[],
  Loop extends number[],
  LoopAcc extends number[],
  IndexT extends number,
> = A extends [...ACC, infer T extends number, ...number[]]
  ? Loop extends [...infer Rest extends number[], number]
    ? T extends 0
      ? hoge_3<A, GenOut<T, IndexT, Out>, Acc, Rest, [...LoopAcc, number]>
      : GenOut<T, IndexT, Out>
    : Out
  : Out;

type hoge_2<
  A extends number[],
  Out extends number[],
  ACC extends number[],
  Acc extends number[],
  Loop extends number[],
  LoopAcc extends number[],
  IndexT extends number,
> = A extends [
  ...ACC,
  infer F extends number,
  infer T extends number,
  ...number[],
]
  ? Loop extends [...infer Rest extends number[], number]
    ? T extends 0
      ? hoge_3<A, GenOut<F, IndexT, Out>, Acc, Rest, LoopAcc>
      : GenOut<F, IndexT, Out>
    : Out
  : Out;

export type hoge_3<
  A extends number[],
  Out extends number[],
  Acc extends number[] = [],
  Loop extends number[] = ArrayFrom<number, 3>,
  LoopAcc extends number[] = [],
> = [...Acc, ...LoopAcc] extends infer ACC extends number[]
  ? hoge_1<A, Out, ACC, Acc, Loop, LoopAcc, ACC["length"]>
  : never;
export type hoge<
  A extends number[],
  Out extends number[],
  Acc extends number[] = [],
  Loop extends number[] = ArrayFrom<number, 3>,
  LoopAcc extends number[] = [],
> = [...Acc, ...LoopAcc] extends infer ACC extends number[]
  ? ACC["length"] extends 0
    ? hoge_1<A, Out, ACC, Acc, ArrayFrom<number, 2>, LoopAcc, ACC["length"]>
    : ACC extends [...infer ACCF extends number[], number]
      ? hoge_2<A, Out, ACCF, Acc, Loop, LoopAcc, ACCF["length"]>
      : never
  : never;

type hoge_r = hoge<
  Filter<Rolling3<[0, 0, 0, 0, 1, 0, 0, 0, 0]>>,
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ArrayFrom<number, 6>
>;

// type hoge_2 = hoge<
//   [1, 0, 1, 0],
//   hoge<
//     [1, 0, 1, 0],
//     hoge<
//       [1, 0, 1, 0],
//       hoge<
//         [1, 0, 1, 0],
//         hoge<[1, 0, 1, 0], [0, 0, 0, 0], ArrayFrom<number, 2>>,
//         ArrayFrom<number, 2>,
//         [number]
//       >,
//       ArrayFrom<number, 2>,
//       [number, number]
//     >,
//     ArrayFrom<number, 2>,
//     [number, number, number]
//   >,
//   ArrayFrom<number, 2>,
//   [number, number, number,]
// >;
