import "./App.css";
import { useState } from "react";
import { B, C, CLICK, STONE, colors } from "./constants";
import { useCache } from "./hooks";
import type { Board, BombMap, CLICK_TYPE, Pos } from "./types";
import { genBoard, open } from "./utils";

export const Minesweeper2 = () => {
  console.time("Minesweeper2");
  const [bombMap, setBombMap] = useState<BombMap>(
    // genBoard({ width: 9, height: 9 }, 0)
    genBoard({ width: 9, height: 9 }, 0).map((row, i) =>
      row.map((_, j) => (i === j || (i === 0 && j === 8) ? B : C)),
    ),
  );
  const [ClickHistory, setClickHistory] = useState<
    { x: number; y: number; type: CLICK_TYPE }[]
  >([]);
  const board: Board = genBoard({ width: 9, height: 9 }, STONE);

  const clickHandler = ({ x, y }: Pos) => {
    if (ClickHistory.length === 0) {
      // setBombMap(genBombs({ width: W, height: H, bombs: BN }, { x, y }));
    }
    setClickHistory((prev) => [...prev, { x, y, type: CLICK }]);
  };

  const cachedOpen = useCache(open);

  const computedBoard = ClickHistory.reduce((acc, { x, y, type }) => {
    if (type === CLICK) {
      return cachedOpen({ x, y }, acc, bombMap, cachedOpen);
    }
    return acc;
  }, board);
  console.timeEnd("Minesweeper2");
  return (
    <div className="App">
      <div>
        {computedBoard.map((row, r) => (
          <div key={r} style={{ display: "flex" }}>
            {row.map((cell, c) =>
              cell === STONE ? (
                <div
                  key={`${r}-${c}`}
                  style={{
                    width: 20,
                    height: 20,
                    border: "5px outset #bbb",
                    backgroundColor: "#888",
                  }}
                  onClick={() => clickHandler({ x: r, y: c })}
                  onKeyDown={() => clickHandler({ x: r, y: c })}
                />
              ) : (
                <div
                  key={`${r}-${c}`}
                  style={{
                    width: 28,
                    height: 28,
                    border: "1px solid black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: colors[cell],
                  }}
                  onClick={() => clickHandler({ x: r, y: c })}
                  onKeyDown={() => clickHandler({ x: r, y: c })}
                >
                  {cell}
                </div>
              ),
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setClickHistory((prev) => prev.slice(0, -1))}
      >
        Back
      </button>
    </div>
  );
};
