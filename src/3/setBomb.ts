type ____SetBomb<
  Field extends string[],
  Bombs extends number[][],
  K extends number,
  acc extends string[] = [],
> = Field extends [infer _, ...infer Rest extends string[]]
  ? [acc["length"], K] extends Bombs[number]
    ? ____SetBomb<Rest, Bombs, K, [...acc, "B"]>
    : ____SetBomb<Rest, Bombs, K, [...acc, "_"]>
  : acc;

type __SetBomb<
  Field extends string[][],
  Bombs extends number[][],
  acc extends string[][] = [],
> = Field extends [infer F extends string[], ...infer Rest extends string[][]]
  ? __SetBomb<Rest, Bombs, [...acc, ____SetBomb<F, Bombs, acc["length"]>]>
  : acc;

export type SetBomb<
  Field extends string[][],
  Bombs extends number[][],
> = __SetBomb<Field, Bombs>;
