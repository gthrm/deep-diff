import { union } from "../src/utils/union";

describe("union", () => {
  test("should return an array with the union of two arrays", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4];
    expect(union(arr1, arr2)).toEqual([1, 2, 3, 4]);
  });
});
