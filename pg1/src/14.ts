const hoge = <T>(a: T): T => a;

const hoge2 = hoge([1, 2, 3] as const);

export {};
