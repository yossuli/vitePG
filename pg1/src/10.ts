export type MapAny<T extends any[]> = {
  [K in keyof T]: any;
};

export type MaxArrayLength<
  T extends any[][],
  Result extends any[] = [],
> = T extends [infer F, ...infer Rest extends any[][]]
  ? F extends [...Result, ...infer V]
    ? MaxArrayLength<Rest, [...Result, ...{ [K in keyof V]: any }]>
    : MaxArrayLength<Rest, Result>
  : Result["length"];

export type hoge_1 = MaxArrayLength<
  [[], [1, 0], [0, 0, [0, 4], 5], [1, 1], [never, true, "0", any[], 5, 6]]
>;

// type Slice<
//   T extends any[],
//   Start extends any[],
//   End extends any[],
// > = T extends [...infer U extends End, ...any[]]
//   ? U extends [...Start, ...infer V]
//     ? V
//     : []
//   : T;

export type hoge_2 = Slice<[1, 2, 3, 4, 5], [any, any], [any, any, any, any]>;

type Slice<
  T extends any[],
  Start extends any[],
  End extends any[],
  _T = T
> = _T extends [...End, ...infer _U]
  ? T extends [...infer U, ..._U]
    ? U extends [...Start, ...infer V]
      ? V
      : []
    : T
  : never;