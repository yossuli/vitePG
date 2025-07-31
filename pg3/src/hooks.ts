import { useCallback, useRef } from "react";

export const useCache = <T extends any[], U>(fn: (...args: T) => U) => {
  const cache = useRef<Record<string, U>>({});

  const cachedFn = useCallback(
    (...args: T) => {
      const strKey = JSON.stringify(args);
      if (cache.current[strKey]) {
        return structuredClone(cache.current[strKey]);
      }

      const result = fn(...args);

      cache.current[strKey] = structuredClone(result);
      return result;
    },
    [fn],
  );

  return cachedFn;
};
export const useCache2 = <T extends any[], U>(fn: (...args: T) => U) => {
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
    [fn],
  );

  return cachedFn;
};

export const useCache3 = <T extends any[], U>(fn: (...args: T) => U) => {
  const cache = useRef<Record<string, string>>({});

  const cachedFn = useCallback(
    (...args: T) => {
      const strKey = JSON.stringify(args);
      if (cache.current[strKey]) {
        return JSON.parse(cache.current[strKey]) as U;
      }

      const result = fn(...args);

      cache.current[strKey] = JSON.stringify(result);
      return result;
    },
    [fn],
  );

  return cachedFn;
};
