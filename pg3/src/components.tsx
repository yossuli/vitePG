import "./App.css";

import type { ReactNode } from "react";
import React from "react";
import { colors } from "./constants";
import type { Board as BoardType } from "./types";

export const Conditional = ({
  condition,
  children,
}: {
  condition: boolean;
  children: [ReactNode, ReactNode];
}) => {
  const [exprTrue, exprFalse] = children;
  return <>{condition ? exprTrue : exprFalse}</>;
};

export const ExprTrue = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);
export const ExprFalse = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);

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
