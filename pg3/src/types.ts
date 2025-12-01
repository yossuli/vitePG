import type { BOMB_MAP_TYPES, CLICK_TYPES } from "./constants";

export type Size = { width: number; height: number };
export type BasicSettings = Size & { bombs: number };
export type Pos = { x: number; y: number };
export type Board<T = number> = T[][];
export type BOMB_MAP_TYPE = (typeof BOMB_MAP_TYPES)[number];
export type CLICK_TYPE = (typeof CLICK_TYPES)[number];
export type BombMap = Board<BOMB_MAP_TYPE>;

export type DeepReadonly<T> = T extends (infer U)[]
  ? readonly DeepReadonly<U>[]
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

export type NonNull = number | string | boolean | object;

export type NullableTuple<T> = {
  [K in keyof T]: T[K] | null | undefined;
};

export type NonNullableTuple<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};
