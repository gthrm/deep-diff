import { is } from "../src/utils/is";

describe("is", () => {
  test("should return true if the value is an instance of the specified type", () => {
    class Foo {}
    const fooInstance = new Foo();
    expect(is(Number, 5)).toBeTruthy();
    expect(is(String, "test")).toBeTruthy();
    expect(is(Object, {})).toBe(true);
    expect(is(Array, [])).toBe(true);
    expect(is(Foo, fooInstance)).toBe(true);
  });

  test("should return false if the value is not an instance of the specified type", () => {
    class Foo {}
    const fooInstance = new Foo();

    expect(is(Object, [])).toBe(false);
    expect(is(Array, {})).toBe(false);
    expect(is(Foo, {})).toBe(false);
    expect(is(Number, "not a number")).toBe(false);
    expect(is(Object, fooInstance)).toBe(false);
  });
});
