/**
 * Checks if an array includes a specific value.
 * @param value - The value to search for.
 * @param arr - The array to search in.
 * @returns {boolean} - True if the array includes the value, false otherwise.
 */
export function includes<T>(value: T, arr: T[]): boolean {
  return arr.includes(value);
}
