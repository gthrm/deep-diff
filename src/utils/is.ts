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
  return value instanceof type;
}
