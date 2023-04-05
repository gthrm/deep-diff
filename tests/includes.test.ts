import { includes } from "../src/utils/includes";

describe("includes", () => {
  test("should return true if a value is included in an array", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(includes(3, arr)).toBeTruthy();
  });

  test("should return false if a value is not included in an array", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(includes(6, arr)).toBeFalsy();
  });
});
