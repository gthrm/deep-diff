/**
 * Gets the keys of an object.
 * @param obj - The object to get the keys from.
 * @returns {Array<keyof T>} - An array of keys.
 */
export function keys<T extends Record<string, unknown>>(
  obj: T
): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}
