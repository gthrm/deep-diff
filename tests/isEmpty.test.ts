import { isEmpty } from "../src/utils/isEmpty";

describe("isEmpty", () => {
  test("should return true for empty values", () => {
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty([])).toBeTruthy();
  });

  test("should return false for non-empty values", () => {
    expect(isEmpty({ a: 1 })).toBeFalsy();
    expect(isEmpty([1])).toBeFalsy();
  });
});
