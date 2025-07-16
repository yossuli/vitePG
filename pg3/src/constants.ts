export const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
] as const;

export const colors = ["#0000", "#66b", "#6b6", "#b66", "#668"];

export const CLICK_TYPES = [0, 1] as const;
export const BOMB_MAP_TYPES = [0, 1] as const;

export const [C, B] = BOMB_MAP_TYPES;
export const [CLICK, FLAG] = CLICK_TYPES;
export const STONE = -1;

export const W = 9;
export const H = 9;
export const BN = 10;
