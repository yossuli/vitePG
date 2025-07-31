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
import { B, C, CLICK, STONE } from "./constants";
import { useCache3 } from "./hooks";
import type { Board as BoardType, BombMap, CLICK_TYPE, Pos } from "./types";
import { genBoard, open } from "./utils";

export const Minesweeper5 = () => {
  console.time("Minesweeper5");
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

  const cachedOpen = useCache3(open);

  const computedBoard = ClickHistory.reduce((acc, { x, y, type }) => {
    if (type === CLICK) {
      return cachedOpen({ x, y }, acc, bombMap, cachedOpen);
    }
    return acc;
  }, board);
  console.timeEnd("Minesweeper5");
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
