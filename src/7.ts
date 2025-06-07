import type { ArrayFrom } from "./3/arrayFrom";
import type { hoge_1, hoge_2_1 } from "./5";

type MatchPre<
  A extends number[],
  Out extends number[],
  Rest extends number[],
  Acc extends number[] = [],
  Fg extends number[] = [],
> = Out extends [...Acc, ...infer T extends [number, number], ...number[]]
  ? T extends [0, -1]
    ? hoge<A, hoge_1<A, Out, Acc>, Rest, [...Acc, number], [...Fg, 1]>
    : hoge<A, Out, Rest, [...Acc, number], Fg>
  : Out;

type MatchSuf<
  A extends number[],
  Out extends number[],
  Rest extends number[],
  Acc extends number[] = [],
  Fg extends number[] = [],
> = Acc extends [...infer First extends number[], number]
  ? Out extends [...First, ...infer T extends [number, number], ...number[]]
    ? T extends [-1, 0]
      ? hoge<A, hoge_2_1<A, Out, Acc>, Rest, [...Acc, number], [...Fg, 1]>
      : Out
    : never
  : never;

type hoge<
  A extends number[],
  Out extends number[],
  Mask extends number[] = ArrayFrom<number, A["length"]>,
  Acc extends number[] = [],
  Fg extends number[] = [],
> = Mask extends [number, ...infer Rest extends [...number[]]]
  ? Acc["length"] extends 0
    ? MatchPre<A, Out, Rest, Acc, Fg>
    : MatchPre<A, MatchSuf<A, Out, Rest, Acc, Fg>, Rest, Acc, Fg>
  : Fg["length"] extends 0
    ? Out
    : hoge<A, Out, ArrayFrom<number, A["length"]>, []>;
type S = -1;

type hoge_r = hoge<[0, 0, 1, 0, 0], [-1, 0, -1, -1, 0]>;
type hoge_r2 = hoge<
  [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
  [0, S, S, S, S, S, 0, S, S, S, S, S, S, 0]
>;
