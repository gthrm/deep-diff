/**
 * Checks if a value is empty.
 * @param value - The value to check.
 * @returns {boolean} - True if the value is empty, false otherwise.
 */
export function isEmpty(value: unknown): boolean {
  return (
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (Array.isArray(value) && value.length === 0)
  );
}
