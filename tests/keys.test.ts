import { keys } from "../src/utils/keys";

describe("keys", () => {
  test("should return an array of keys from an object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(keys(obj)).toEqual(["a", "b", "c"]);
  });
});
