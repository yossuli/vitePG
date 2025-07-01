export type Duplicate<
  T extends readonly string[],
  Acc extends string = never
> = T extends [infer U extends string, ...infer V extends string[]]
  ? U extends V[number]
    ? Duplicate<V, Acc | U>
    : Duplicate<V, Acc>
  : Acc;
