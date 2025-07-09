import { useRef, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useCache = <T extends any[], U>(fn: (...args: T) => U) => {
  const cache = useRef<Record<string, U>>({});

  const cachedFn = useCallback(
    (...args: T) => {
      const strKey = JSON.stringify(args);
      if (cache.current[strKey]) {
        return cache.current[strKey];
      }

      const result = fn(...args);

      cache.current[strKey] = result;
      return result;
    },
    [fn, cache]
  );

  return cachedFn;
};
