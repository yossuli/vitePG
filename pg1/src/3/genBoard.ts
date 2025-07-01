import type { Bit } from ".";

// type GenBoard<
//   Bomb extends Bit[][],
//   UserInputs extends Bit[][],
//   AccRows extends Bit[][] = [],
//   AccCols extends Bit[][] = [],
//   visited extends [number, number][] = [],
// > = Bomb extends [
//   infer BombRow extends Bit[],
//   ...infer RestRows extends Bit[][],
// ]
//   ? UserInputs extends [
//       infer UserRow extends Bit[],
//       ...infer RestUserRows extends Bit[][],
//     ]
//     ? BombRow
//     : never
//   : never;

type MergeRows<A extends number[], B extends number[]> = {
  // @ts-ignore
  [K in keyof A]: A[K] extends -1 ? B[K] : B[K] extends -1 ? A[K] : never;
};

type GenRow<
  BombRow extends Bit[],
  UserInputsRow extends Bit[],
  Acc extends number[] = [],
  visited extends number[] = [],
> = UserInputsRow extends [
  // BombRow extends [infer Bomb extends Bit, ...infer RestBomb extends Bit[]] ?
  infer UserInput extends Bit,
  ...infer RestUserInputs extends Bit[],
]
  ? UserInput extends "1"
    ? // Acc extends [...infer RestAcc extends number[], number]
      //   ? Acc["length"] extends visited[number]
      //     ? Acc
      //     : GenRow<
      //         BombRow,
      //         ["0", ...UserInputsRow],
      //         RestAcc,
      //         [...visited, Acc["length"]]
      //       >
      //   : Acc
      GenRow<BombRow, RestUserInputs, [...Acc, 0], [...visited, Acc["length"]]>
    : GenRow<BombRow, RestUserInputs, [...Acc, -1], visited>
  : Acc;
// : never;
type hoge = GenRow<["0", "0", "0", "1", "0"], ["0", "0", "1", "0", "0"]>;

if (import.meta.vitest) {
  const { describe, it, expectTypeOf } = import.meta.vitest;

  describe("GenBoard", () => {
    it("hoge", () => {});
  });
}
