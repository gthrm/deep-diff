import { equals } from "../src/utils/equals";

describe("equals", () => {
  test("should return true for equal values", () => {
    expect(equals(1, 1)).toBeTruthy();
    expect(equals("test", "test")).toBeTruthy();
    expect(equals([1, 2, 3], [1, 2, 3])).toBeTruthy();
    expect(equals({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeTruthy();
  });

  test("should return false for non-equal values", () => {
    // @ts-ignore
    expect(equals(1, "1")).toBeFalsy();
    expect(equals("test", "Test")).toBeFalsy();
    expect(equals([1, 2, 3], [1, 2, 4])).toBeFalsy();
    expect(equals({ a: 1, b: 2 }, { a: 1, b: 3 })).toBeFalsy();
  });
});
