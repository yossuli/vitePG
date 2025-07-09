import "./App.css";
import { useState } from "react";

type Size = { width: number; height: number };

type BasicSettings = Size & { bombs: number };
type Pos = { x: number; y: number };
type Board<T = number> = T[][];
type BOMB_MAP_TYPE = (typeof BOMB_MAP_TYPES)[number];
type CLICK_TYPE = (typeof CLICK_TYPES)[number];
type BombMap = Board<BOMB_MAP_TYPE>;

const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
] as const satisfies [number, number][];

const colors = ["#0000", "#66b", "#6b6", "#b66", "#668"];

const {
  width: W,
  height: H,
  bombs: BN,
} = { width: 9, height: 9, bombs: 10 } as const satisfies BasicSettings;

const CLICK_TYPES = [0, 1] as const;
const BOMB_MAP_TYPES = [0, 1] as const;

const [C, B] = BOMB_MAP_TYPES;
const [CLICK, FLAG] = CLICK_TYPES;
const STONE = -1;

const genBoard = <T extends number = 0>(
  { width, height }: Size,
  fill: T
): Board<T> =>
  Array.from({ length: width }, () =>
    Array.from({ length: height }, () => fill)
  );

const genBombs = (
  { width, height, bombs }: BasicSettings,
  { x, y }: Pos
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

const bombCount = ({ x, y }: Pos, bombMap: Board) =>
  bombMap
    .slice(Math.max(0, x - 1), Math.min(bombMap.length, x + 2))
    .map((row) => row.slice(Math.max(0, y - 1), Math.min(row.length, y + 2)))
    .flat()
    .filter((cell) => cell === B).length;

const minMax = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const around = ({ x, y }: Pos) =>
  DIRECTIONS.map(([dx, dy]) => ({
    x: minMax(x + dx, 0, W - 1),
    y: minMax(y + dy, 0, H - 1),
  }));

export const Minesweeper = () => {
  const [bombMap, setBombMap] = useState<BombMap>(
    genBoard({ width: 9, height: 9 }, 0)
  );
  const [ClickHistory, setClickHistory] = useState<
    { x: number; y: number; type: CLICK_TYPE }[]
  >([]);
  const board: Board = genBoard({ width: 9, height: 9 }, STONE);

  const clickHandler = ({ x, y }: Pos) => {
    if (ClickHistory.length === 0) {
      setBombMap(genBombs({ width: W, height: H, bombs: BN }, { x, y }));
    }
    setClickHistory((prev) => [...prev, { x, y, type: CLICK }]);
  };

  const open = ({ x, y }: Pos) => {
    console.log("open");
    const count = bombCount({ x, y }, bombMap);
    board[x][y] = count;
    if (count === 0) {
      around({ x, y }).forEach(({ x: nx, y: ny }) => {
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
  return (
    <div className="App">
      <div>
        {board.map((row, r) => (
          <div key={r} style={{ display: "flex" }}>
            {row.map((cell, c) =>
              cell === STONE ? (
                <div
                  key={`${r}-${c}`}
                  style={{
                    width: 20,
                    height: 20,
                    border: "5px outset #bbb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
