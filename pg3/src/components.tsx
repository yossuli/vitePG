import "./App.css";

import type { ReactNode } from "react";
import React from "react";
import { colors } from "./constants";
import type { Board as BoardType, NonNull, NullableTuple } from "./types";

export const Conditional = ({
  condition,
  children: [exprTrue, exprFalse],
}: {
  condition: boolean;
  children: [ExprTrueElement, ExprFalseElement];
}) => <>{condition ? exprTrue : exprFalse}</>;

type ExprTrueElement = ReactNode;
type ExprFalseElement = ReactNode;

export const True = ({ children }: { children: ReactNode }) => children;

export const False = ({ children }: { children: ReactNode }) => children;

export const Define = <T extends NonNull[]>({
  nullableProps,
  children,
}: {
  nullableProps: NullableTuple<T>;
  children: (props: T) => ReactNode;
}) => {
  if (nullableProps.some((prop) => prop === null || prop === undefined)) {
    return null;
  }
  const nonNullProps = nullableProps.filter(
    (prop): prop is T[number] => prop !== null && prop !== undefined,
  ) as T;
  return <>{children(nonNullProps)}</>;
};

export const Board = ({
  board,
  children,
}: {
  board: BoardType;
  children: (cell: number, x: number, y: number) => ReactNode;
}) => (
  <div className="board">
    {board.map((row, i) =>
      row.map((cell, j) => (
        <React.Fragment key={`${i}-${j}`}>
          {children(cell, i, j)}
        </React.Fragment>
      )),
    )}
  </div>
);

export const Stone = ({ open }: { open: () => void }) => (
  <div onClick={open} onKeyDown={open} className="stone" />
);

export const Blank = ({ number }: { number: number }) => (
  <div className="blank" style={{ color: colors[number] }}>
    {number}
  </div>
);
