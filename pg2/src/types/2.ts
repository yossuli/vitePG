export type O_n2Type<
  T extends readonly string[][],
  U extends string,
  Acc extends boolean[] = []
> = T extends [infer F, ...infer R extends readonly string[][]]
  ? F extends readonly string[]
    ? O_n2Type<R, U, [...Acc, U extends F[number] ? true : false]>
    : never
  : Acc;
