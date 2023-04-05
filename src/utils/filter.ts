/**
 * Filters an array based on a predicate function.
 * @param predicate - The predicate function.
 * @param arr - The array to filter.
 * @returns {T[]} - The filtered array.
 */
export function filter<T>(predicate: (value: T) => boolean, arr: T[]): T[] {
  return arr.filter(predicate);
}
