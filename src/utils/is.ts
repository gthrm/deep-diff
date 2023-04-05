/**
 * Checks if the value is an instance of the specified type.
 * @param type - The type to check against.
 * @param value - The value to check.
 * @returns {boolean} - True if the value is an instance of the specified type, false otherwise.
 */
export function is<T>(
  type: new (...args: never[]) => T,
  value: unknown
): value is T {
  if (Array.isArray(value)) {
    return type.name === "Array";
  }

  if (typeof value === "number") {
    return type.name === "Number";
  }

  if (typeof value === "string") {
    return type.name === "String";
  }

  if (value?.constructor?.name) {
    return value.constructor.name === type.name;
  }
  return value instanceof type;
}
