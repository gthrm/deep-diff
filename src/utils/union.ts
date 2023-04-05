/**
 * Creates an array of unique values from two input arrays.
 * @param a - The first array.
 * @param b - The second array.
 * @returns {T[]} - An array of unique values.
 */
export function union<T>(a: T[], b: T[]): T[] {
  return Array.from(new Set([...a, ...b]));
}
