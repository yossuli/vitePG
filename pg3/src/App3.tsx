type ErrorResponse = { message: string };

type Result<T> =
  | { isFailure: true; error: ErrorResponse }
  | { isFailure: false; value: T | null };

interface User {
  id: string;
  name: string;
}

const fetchBase = <T,>(..._args: any[]): Promise<Result<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ isFailure: false, value: null });
    }, 1000);
  });
};
/** 任意の個数の引数を中継するfetch<T>のラッパー関数の型定義 */
type Fetcher<T> = (...args: never[]) => ReturnType<typeof fetchBase<T>>;

type hoge<T> = T extends Promise<Result<infer U>> ? U : never;

/**
 * 任意の引数を持つデータ取得関数を受け取り、その関数のデータ取得結果を状態管理するフック
 * @param fetcher データ取得関数
 * @template T データ取得関数の戻り値の型 (指定不要)
 * @template U データ取得関数の型 (指定不要)
 */
const useFetch = <T, U extends Fetcher<T>>(fetcher: U) => {
  const [data, setData] = useState<hoge<ReturnType<U>> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const fetch = async (...args: Parameters<U>) => {
    setIsLoading(true);
    const result = await fetcher(...args);
    if (result.isFailure) {
      setError(result.error);
    }
    if (!result.isFailure) {
      setData(result.value);
      setIsLoading(false);
    }
  };

  return { fetch, data, isLoading, error };
};

import { useState } from "react";
import "./App.css";

const fetcher = <T,>(_id: string): Promise<Result<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ isFailure: false, value: null });
    }, 1000);
  });
};

function App() {
  const fetchUsers = (id: string) => fetcher<User>(id);

  const id = "some-id";
  const { fetch, data } = useFetch(fetchUsers);

  return (
    <div className="App">
      <button onClick={() => fetch(id)} type="button">
        Fetch
      </button>
      {data && <div>{data.name}</div>}
    </div>
  );
}

export default App;
