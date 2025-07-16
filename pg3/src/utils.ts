import { B, C, DIRECTIONS, STONE } from "./constants";
// 共通ユーティリティ関数
import type { BasicSettings, Board, BombMap, Pos, Size } from "./types";

export const genBoard = <T extends number = 0>(
  { width, height }: Size,
  fill: T,
): Board<T> =>
  Array.from({ length: width }, () =>
    Array.from({ length: height }, () => fill),
  );

export const genBombs = (
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

export const bombCount = ({ x, y }: Pos, bombMap: Board) =>
  bombMap
    .slice(Math.max(0, x - 1), Math.min(bombMap.length, x + 2))
    .map((row) => row.slice(Math.max(0, y - 1), Math.min(row.length, y + 2)))
    .flat()
    .filter((cell) => cell === B).length;

export const minMax = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const around = ({ x, y }: Pos, { width, height }: Size) =>
  DIRECTIONS.map(([dx, dy]) => ({
    x: minMax(x + dx, 0, width - 1),
    y: minMax(y + dy, 0, height - 1),
  }));

export const open = <
  T extends (pos: Pos, board: Board, bombMap: BombMap, open: T) => Board,
>(
  { x, y }: Pos,
  argBoard: Board,
  bombMap: BombMap,
  open: T,
): Board => {
  const board: Board = JSON.parse(JSON.stringify(argBoard));
  const count = bombCount({ x, y }, bombMap);
  board[x][y] = count;
  if (count === 0) {
    return around(
      { x, y },
      {
        width: board[0].length,
        height: board.length,
      },
    ).reduce((acc, { x: nx, y: ny }) => {
      if (board[nx][ny] === STONE) {
        return open({ x: nx, y: ny }, acc, bombMap, open);
      }
      return acc;
    }, board as Board);
  }
  return board;
};
