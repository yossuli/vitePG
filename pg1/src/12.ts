type Nullable<T> = T | null;

const nullableArr: Nullable<number | string> = [1, "2", null] as const;

const nonNullArr = [1, 2, 3] as const;

const result1 = nullableArr.every((item) => item !== null);
const result3 = nullableArr.filter((item) => item !== null);

if (result1) {
  const [a, b, c] = nullableArr;
}
const result2 = nonNullArr.every((item) => item !== null);

if (result2) {
  const [a, b, c] = nonNullArr;
}
