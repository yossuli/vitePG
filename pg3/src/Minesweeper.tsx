import "./App.css";
import { useState } from "react";
import {
  Blank,
  Board,
  Conditional,
  ExprFalse,
  ExprTrue,
  Stone,
} from "./components";
import { B, C, CLICK, H, STONE, W } from "./constants";
import type {
  BasicSettings,
  Board as BoardType,
  BombMap,
  CLICK_TYPE,
  Pos,
} from "./types";
import { around, bombCount, genBoard } from "./utils";

const genBombs = (
  { width, height, bombs }: BasicSettings,
  { x, y }: Pos,
): BombMap => {
  const board: BombMap = genBoard({ width, height }, 0);
  let placedBombs = 0;
  board[x][y] = B;

  while (placedBombs < bombs) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    if (board[x][y] !== B) {
      board[x][y] = B;
      placedBombs++;
    }
  }
  board[x][y] = C;
  return board;
};

export const Minesweeper = () => {
  console.time("Minesweeper");
  const [bombMap, setBombMap] = useState<BombMap>(
    // genBoard({ width: 9, height: 9 }, 0)
    genBoard({ width: 9, height: 9 }, 0).map((row, i) =>
      row.map((_, j) => (i === j || (i === 0 && j === 8) ? B : C)),
    ),
  );
  const [ClickHistory, setClickHistory] = useState<
    { x: number; y: number; type: CLICK_TYPE }[]
  >([]);
  const board: BoardType = genBoard({ width: 9, height: 9 }, STONE);

  const clickHandler = ({ x, y }: Pos) => {
    if (ClickHistory.length === 0) {
      // setBombMap(genBombs({ width: W, height: H, bombs: BN }, { x, y }));
    }
    setClickHistory((prev) => [...prev, { x, y, type: CLICK }]);
  };

  const open = ({ x, y }: Pos) => {
    const count = bombCount({ x, y }, bombMap);
    board[x][y] = count;
    if (count === 0) {
      around(
        { x, y },
        {
          width: W,
          height: H,
        },
      ).forEach(({ x: nx, y: ny }) => {
        if (board[nx][ny] === STONE) {
          open({ x: nx, y: ny });
        }
      });
    }
  };

  ClickHistory.forEach(({ x, y, type }) => {
    if (type === CLICK) {
      open({ x, y });
    }
  });
  console.timeEnd("Minesweeper");
  return (
    <div className="App">
      <Board board={board}>
        {(cell, x, y) => (
          <Conditional condition={cell === STONE}>
            <ExprTrue>
              <Stone open={() => clickHandler({ x, y })} />
            </ExprTrue>
            <ExprFalse>
              <Blank number={cell} />
            </ExprFalse>
          </Conditional>
        )}
      </Board>
      <button
        type="button"
        onClick={() => setClickHistory((prev) => prev.slice(0, -1))}
      >
        Back
      </button>
    </div>
  );
};
