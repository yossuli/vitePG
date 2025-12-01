type FlatArgs<T> = T extends readonly [infer First, ...infer Rest]
  ? FlatArgs<First> extends infer _F
    ? _F extends readonly any[]
      ? [..._F, ...FlatArgs<Rest>]
      : [_F, ...FlatArgs<Rest>]
    : never
  : T;

type ChooseColumns<T extends readonly (readonly any[])[], U extends number> = {
  [K in keyof T]: T[K] extends infer V
    ? V extends readonly any[]
      ? V[U]
      : never
    : never;
};

const hogeFn = <T extends any[]>(...args: T): FlatArgs<T> => {
  return [...args] as unknown as FlatArgs<T>;
};

const hoge = hogeFn(...([1, [2, 3], [[4, 5], 6], [[[7]]]] as const));

const hoge2 = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
] as const;
type Hoge2 = typeof hoge2;

const selectedColumns: ChooseColumns<Hoge2, 0> = [0, 2, 4, 6];

type Condition = string | [boolean, string[]];
type _Keys<T extends Condition, Rest extends string[] = []> = T extends string
  ? [T, ...Rest]
  : T extends [boolean, infer U extends string[]]
  ? [...U, ...Rest]
  : Rest;

type Keys<T extends Condition[]> = //
  T extends readonly [infer First extends Condition, ...infer Rest]
    ? Rest extends Condition[]
      ? _Keys<First, Keys<Rest>>
      : _Keys<First>
    : [];

type Tuple<T> = T extends readonly [infer First, ...infer Rest]
  ? [First, ...Tuple<Rest>]
  : [];

const _and =
  (conditionDict: Record<string, boolean>) =>
  <T extends Array<string | [boolean, string[]]>>(
    ...keys: T
  ): [boolean, Keys<T>] => {
    return [
      keys.every((key) => (Array.isArray(key) ? key[0] : conditionDict[key])),
      keys.flatMap((key) => (Array.isArray(key) ? key[1] : key)) as Keys<T>,
    ];
  };

const _or =
  (conditionDict: Record<string, boolean>) =>
  <T extends Array<string | [boolean, string[]]>>(
    ...keys: T
  ): [boolean, Keys<T>] => {
    return [
      keys.some((key) => (Array.isArray(key) ? key[0] : conditionDict[key])),
      keys.flatMap((key) => (Array.isArray(key) ? key[1] : key)) as Keys<T>,
    ];
  };

const _ignore =
  () =>
  <T extends readonly string[]>(...args: T) => {
    return [true, args] as unknown as [true, Tuple<T>];
  };

const generateConditionalList = <
  T extends Record<string, boolean>,
  U extends (
    and: ReturnType<typeof _and>,
    or: ReturnType<typeof _or>,
    ignore: ReturnType<typeof _ignore>
  ) => [[boolean, Obj2KeyArray<T>], any][]
>(
  conditionDict: T,
  conditionItems: U
): ChooseColumns<ReturnType<U>, 1> => {
  const and = _and(conditionDict);
  const or = _or(conditionDict);
  const ignore = _ignore();

  return conditionItems(and, or, ignore)
    .filter(([[condition]]) => condition)
    .map(([, item]) => item) as ChooseColumns<ReturnType<U>, 1>;
};

const result = generateConditionalList(
  { isA: true, isB: false, isC: true, isD: true },
  (and, or, ignore) =>
    [
      [and("isA", or(and("isB", "isC"), "isD")), { name: "item1" }],
      [and("isA", or(and("isB", "isC"), "isD")), { name: "item1" }],
      [and("isA", ignore("isB", "isC", "isD")), { name: "item2" }],
    ] as const
);
console.log(result);

const hoge3 = ((a: any) => {
  a;
})((() => {})());

type KeysArray<T> = T extends Record<string, any>
  ? {
      [K in keyof T]: K;
    }[keyof T][]
  : never;

type TestKeysArray = KeysArray<{
  foo: number;
  bar: string;
  baz: boolean;
}>;

type MakeFn<T> = T extends any ? () => T : never;

type Union2Array<T, U = MakeFn<T>> = [T] extends [never]
  ? []
  : U extends () => infer R
  ? [...Union2Array<Exclude<T, R>>, R]
  : never;

type Obj2KeyArray<T> = Union2Array<keyof T>;
type hoge4 = Union2Array<1 | 2 | 3>;

export {};
