type Duplicate<
  T extends readonly string[],
  Acc extends string = never
> = T extends [infer U extends string, ...infer V extends string[]]
  ? U extends V[number]
    ? Duplicate<V, Acc | U>
    : Duplicate<V, Acc>
  : Acc;

export type EnsureUniqueStrArr<T extends readonly string[]> =
  Duplicate<T> extends infer D
    ? {
        [K in keyof T]: T[K] extends D ? never : T[K];
      }
    : never;
