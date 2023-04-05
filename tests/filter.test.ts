import { filter } from "../src/utils/filter";

describe("filter", () => {
  test("should return an array with filtered values", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(filter((x) => x % 2 === 0, arr)).toEqual([2, 4]);
  });
});
