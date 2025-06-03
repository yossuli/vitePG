import type { ArrayFrom } from "./3/arrayFrom";

export type hoge<
  A extends number[],
  Out extends number[],
  Mask extends number[],
  Acc extends number[] = [],
  MaskAcc extends number[] = [],
> = A extends [...MaskAcc, ...Acc, infer T extends number, ...number[]]
  ? [...Acc, ...MaskAcc]["length"] extends infer IndexT extends number
    ? Mask extends [...infer Rest extends number[], number]
      ? T extends 1
        ? hoge<
            A,
            {
              [K in keyof Out]: `${IndexT}` extends K ? 1 : Out[K];
            },
            Rest,
            Acc,
            [...MaskAcc, number]
          >
        : MaskAcc["length"] extends 0
          ? hoge<A, Out, ArrayFrom<number, 2>, [...Acc, number]>
          : hoge<
              A,
              {
                [K in keyof Out]: `${IndexT}` extends K ? 0 : Out[K];
              },
              Rest,
              Acc,
              [...MaskAcc, number]
            >
      : hoge<A, Out, ArrayFrom<number, 2>, [...Acc, number]>
    : never
  : Out;

type hoge_1 = hoge<[1, 0, 0, 1], [-1, -1, -1, -1], ArrayFrom<number, 2>>;

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
