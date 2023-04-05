/**
 * Checks if two values are deeply equal.
 * @param a - The first value.
 * @param b - The second value.
 * @returns {boolean} - True if the values are deeply equal, false otherwise.
 */
export function equals<T>(a: T, b: T): boolean {
  if (a === b) return true;

  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null
  )
    return false;

  const keysA = Object.keys(a) as Array<keyof T>;
  const keysB = Object.keys(b) as Array<keyof T>;

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (typeof a[key] === "object" && typeof b[key] === "object") {
      if (!equals(a[key] as unknown as T, b[key] as unknown as T)) return false;
    } else if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}
