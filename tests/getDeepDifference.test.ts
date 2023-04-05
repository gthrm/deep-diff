// tests/getDeepDifference.test.ts
import { getDeepDifference } from "../src/getDeepDifference";

describe("getDeepDifference", () => {
  test("should return deep difference between two different objects with equal values", () => {
    const obj1 = { a: 1, b: { c: 3, d: 4 } };
    const obj2 = { a: 1, b: { c: 3, d: 5 } };
    const expected = { b: { d: 5 } };
    expect(getDeepDifference(obj1, obj2)).toEqual(expected);
  });

  test("should return deep difference between two arrays", () => {
    const arr1 = [
      { id: 1, value: "a" },
      { id: 2, value: "b" },
    ];
    const arr2 = [
      { id: 1, value: "a" },
      { id: 2, value: "c" },
    ];
    expect(getDeepDifference(arr1, arr2)).toEqual([{ id: 2, value: "c" }]);
  });

  test("should return newEntity if prevEntity is empty or null", () => {
    const obj1 = { a: 1, b: 2 };
    // @ts-ignore
    expect(getDeepDifference({}, obj1)).toEqual(obj1);
    expect(getDeepDifference(null, obj1)).toEqual(obj1);
  });

  test("should return empty object or array if newEntity is empty or null", () => {
    const obj1 = { a: 1, b: 2 };
    // @ts-ignore
    expect(getDeepDifference(obj1, {})).toEqual({});
    expect(getDeepDifference(obj1, null)).toEqual({});
    // @ts-ignore
    expect(getDeepDifference([1, 2, 3], [])).toEqual([]);
    // @ts-ignore
    expect(getDeepDifference([1, 2, 3], null)).toEqual([]);
  });

  test("should return an empty object if no differences found in objects", () => {
    const obj1 = { a: 1, b: { c: 3, d: 4 } };
    expect(getDeepDifference(obj1, obj1)).toEqual({});
  });

  test("should return an empty array if no differences found in arrays", () => {
    const arr1 = [
      { id: 1, value: "a" },
      { id: 2, value: "b" },
    ];
    expect(getDeepDifference(arr1, arr1)).toEqual([]);
  });
});
