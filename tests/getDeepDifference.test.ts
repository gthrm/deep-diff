// tests/getDeepDifference.test.ts
import { getDeepDifference } from "../src/getDeepDifference";

describe("getDeepDifference", () => {
  test("should return deep difference between two different objects with equal values", () => {
    const obj1 = { a: 1, b: { c: 3, d: 4 } };
    const obj2 = { a: 1, b: { c: 3, d: 5 } };
    const expected = { b: { d: 5 } };
    expect(getDeepDifference(obj1, obj2)).toEqual(expected);
  });

  test("should return deep difference between two different arrays with equal values", () => {
    const data1 = [
      {
        id: "id1",
        level1: {
          level2_1: {
            level3_1: {
              level4_1: {
                level5_1: "value1",
                level5_2: 42,
                level5_3: true,
              },
              level4_2: [
                "value2",
                {
                  level5_4: "value3",
                },
              ],
            },
            level3_2: [
              {
                level4_3: {
                  level5_5: "value4",
                  level5_6: false,
                },
              },
              [
                {
                  level5_7: 15,
                },
              ],
            ],
          },
          level2_2: [
            {
              level3_3: {
                level4_4: {
                  level5_8: "value5",
                },
              },
            },
            [
              {
                level3_4: {
                  level4_5: [
                    {
                      level5_9: "value6",
                    },
                  ],
                },
              },
            ],
          ],
        },
      },
    ];

    const data2 = [
      {
        id: "id1",
        level1: {
          level2_1: {
            level3_1: {
              level4_1: {
                level5_1: "value1",
                level5_2: 42,
                level5_3: true,
              },
              level4_2: [
                "value2",
                {
                  level5_4: "value3",
                },
              ],
            },
            level3_2: [
              {
                level4_3: {
                  level5_5: "value4",
                  level5_6: false,
                },
              },
              [
                {
                  level5_7: 15,
                },
              ],
            ],
          },
          level2_2: [
            {
              level3_3: {
                level4_4: {
                  level5_8: "value5",
                },
              },
            },
            [
              {
                level3_4: {
                  level4_5: [
                    {
                      level5_9: "Hello!",
                    },
                  ],
                },
              },
            ],
          ],
        },
      },
    ];

    const expectResult = [
      {
        id: 'id1',
        level1: {
          level2_2: [
            [
              {
                level3_4: {
                  level4_5: [
                    {
                      level5_9: "Hello!",
                    },
                  ],
                },
              },
            ],
          ],
        },
      },
    ];
    expect(getDeepDifference(data1, data2)).toEqual(expectResult);
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
