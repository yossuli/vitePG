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
import { useCache } from "./hooks";
import type { Board as BoardType, BombMap, CLICK_TYPE, Pos } from "./types";
import { around, bombCount, genBoard } from "./utils";

export const Minesweeper3 = () => {
  console.time("Minesweeper3");
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

  const open = useCache(({ x, y }: Pos, board: BoardType): BoardType => {
    const count = bombCount({ x, y }, bombMap);
    // biome-ignore lint: allow
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
          open({ x: nx, y: ny }, board);
        }
      });
    }
    return board;
  });

  const computedBoard = ClickHistory.reduce((acc, { x, y, type }) => {
    if (type === CLICK) {
      return open({ x, y }, acc);
    }
    return acc;
  }, board);
  console.timeEnd("Minesweeper3");
  return (
    <div className="App">
      <Board board={computedBoard}>
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
