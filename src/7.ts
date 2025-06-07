import type { ArrayFrom } from "./3/arrayFrom";
import type { hoge_1, hoge_2_1 } from "./5";
type NNNum = [number, number, number];
type hoge<
  A extends number[],
  Out extends number[] = ArrayFrom<-1, A["length"]>,
  Mask extends number[] = ArrayFrom<number, A["length"]>,
  Acc extends number[] = [],
  Fg extends number[] = [],
> = Mask extends [number, ...infer Rest extends number[]]
  ? Acc["length"] extends 0
    ? Out extends [...infer T extends [number, number], ...number[]]
      ? T extends [0, -1]
        ? hoge<A, hoge_1<A, Out, []>, Rest, [...Acc, number], [...Fg, 1]>
        : hoge<A, Out, Rest, [...Acc, number], [...Fg]>
      : never
    : Mask["length"] extends 1
      ? Acc extends [...infer F extends number[], number]
        ? Out extends [...F, ...infer T extends [number, number]]
          ? T extends [-1, 0]
            ? hoge<A, hoge_2_1<A, Out, Acc>, Rest, [...Acc, number], [...Fg, 1]>
            : hoge<A, Out, Rest, [...Acc, number], [...Fg]>
          : never
        : never
      : Acc extends [...infer F extends number[], number]
        ? Out extends [...F, ...infer T extends NNNum, ...number[]]
          ? T extends [-1, 0, number] | [number, 0, -1]
            ? hoge<A, hoge_2_1<A, Out, Acc>, Rest, [...Acc, number], [...Fg, 1]>
            : hoge<A, Out, Rest, [...Acc, number], [...Fg]>
          : never
        : never
  : Fg["length"] extends 0
    ? Out
    : hoge<A, Out, ArrayFrom<number, A["length"]>, []>;
type S = -1;
type hoge_r = hoge<[0, 0, 1, 1, 1, 0, 0], [0, -1, -1, -1, -1, -1, 0]>;
type hoge_r2 = hoge<
  [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
  [0, S, S, S, S, S, 0, S, S, S, S, S, S, 0]
>;
