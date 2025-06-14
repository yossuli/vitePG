type N = keyof NumDict;

type NumDict = {
  0: [];
  1: [N];
  2: [N, N];
  3: [N, N, N];
  4: [N, N, N, N];
  5: [N, N, N, N, N];
  6: [N, N, N, N, N, N];
  7: [N, N, N, N, N, N, N];
  8: [N, N, N, N, N, N, N, N];
  9: [N, N, N, N, N, N, N, N, N];
};
type OF = [N, N, N, N, N, N, N, N, N, N];

type SumDig<
  A extends N[],
  B extends N[],
  Acc extends string = "",
  Over extends N[] = [],
> = [A, B] extends [
  [...infer AF extends N[], infer AR extends N],
  [...infer BF extends N[], infer BR extends N],
]
  ? [...NumDict[AR], ...NumDict[BR], ...Over] extends infer R extends N[]
    ? R extends [...OF, ...infer D]
      ? SumDig<AF, BF, `${D["length"]}${Acc}`, [N]>
      : SumDig<AF, BF, `${R["length"]}${Acc}`>
    : never
  : [...A, ...B] extends [...infer AF extends N[], infer AR extends N]
    ? [...NumDict[AR], ...Over] extends infer R extends N[]
      ? R extends [...OF, ...infer D]
        ? SumDig<AF, [], `${D["length"]}${Acc}`, [N]>
        : SumDig<AF, [], `${R["length"]}${Acc}`>
      : never
    : Over extends []
      ? Acc
      : `1${Acc}`;

type Split<S extends string> = S extends `${infer A extends N}${infer B}`
  ? [A, ...Split<B>]
  : [];

type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint,
> = [`${A}`, `${B}`] extends [infer A1 extends string, infer B1 extends string]
  ? SumDig<Split<A1>, Split<B1>>
  : never;
