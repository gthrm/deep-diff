import { is } from "./utils/is";
import { equals } from "./utils/equals";
import { keys } from "./utils/keys";
import { union } from "./utils/union";
import { filter } from "./utils/filter";
import { includes } from "./utils/includes";
import { isEmpty } from "./utils/isEmpty";

type DataType<T> = T | Array<DataType<T>> | null;
type NestedEntity<T> = T | DataType<T>[] | null;

/**
 * Compare two entities and return an entity that contains only the
 * changed keys of the second entity.
 *
 * @template T - The type of input entities.
 * @param {NestedEntity<T> | DataType<T>} prevEntity - The previous entity.
 * @param {NestedEntity<T> | DataType<T>} newEntity - The new entity.
 * @returns {NestedEntity<T> | DataType<T>} - An entity with the differences or null if no differences were found.
 */
export function getDeepDifference<T extends Record<string, unknown>>(
  prevEntity: NestedEntity<T> | DataType<T>,
  newEntity: NestedEntity<T> | DataType<T>
): NestedEntity<T> {
  // If prevEntity is empty or null, return newEntity
  if (prevEntity === null || isEmpty(prevEntity)) return newEntity;

  // If newEntity is empty or null, return an empty object or array, depending on the type of prevEntity
  if (newEntity === null || isEmpty(newEntity))
    return Array.isArray(prevEntity)
      ? ([] as NestedEntity<T>)
      : ({} as NestedEntity<T>);

  // If both entities are arrays
  if (Array.isArray(prevEntity) && Array.isArray(newEntity)) {
    // Map through newEntity and find differences between the two arrays
    return newEntity
      .map((item) => {
        // Find a corresponding item in prevEntity with the same id
        const prevItem = prevEntity.find(
          (prev) => (prev as T).id === (item as T).id
        );
        if (prevItem) {
          // Calculate the difference between the two items
          const diff = getDeepDifference(prevItem, item);
          // If there is a difference, return the difference object with the id, otherwise return null
          return isEmpty(diff) ? null : { ...diff, id: (item as T).id };
        }
        // If there is no corresponding item in prevEntity, return the item from newEntity
        return item;
      })
      .filter(Boolean) as NestedEntity<T>; // Filter out null values
  }

  // If both entities are objects
  const allKeys = union(keys(prevEntity as T), keys(newEntity as T));

  // Reduce the keys to a single object containing the differences
  return allKeys.reduce((diff: Partial<T>, key: keyof T) => {
    const val1 = (prevEntity as T)[key];
    const val2 = (newEntity as T)[key];

    // If both values are objects, calculate the nested difference and add it to the diff object if not empty
    if (is(Object, val1) && is(Object, val2)) {
      const nestedDiff = getDeepDifference(
        val1 as NestedEntity<T>,
        val2 as NestedEntity<T>
      );
      if (!isEmpty(nestedDiff)) {
        if (diff[key]) {
          (diff[key] as NestedEntity<T>) = nestedDiff;
        }
      }
    } else if (is(Array, val1) && is(Array, val2)) {
      // If both values are arrays, calculate the difference between the arrays and add it to the diff object if not empty
      const arrayDiff = filter(
        (item) => !includes(item, val1 as DataType<T>[]),
        val2 as DataType<T>[]
      );
      if (arrayDiff.length > 0) {
        (diff[key] as DataType<T>[]) = arrayDiff;
      }
    } else if (!equals(val1, val2)) {
      // If the values are not equal, add the new value to the diff object
      diff[key] = val2;
    }

    return diff;
  }, {}) as NestedEntity<T>;
}
