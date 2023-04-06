import { is, isEmpty, keys, union, equals } from "./utils/index";

interface EntityWithId {
  id: number | string;
}

function isEntityWithId(obj: any): obj is EntityWithId {
  return obj.hasOwnProperty("id");
}

/**
 * @function getDeepDifference
 * @description Calculates the deep difference between two objects or arrays of objects.
 * @param {ArrayOrObject<T>} prevEntity - The previous object or array of objects.
 * @param {ArrayOrObject<T>} newEntity - The new object or array of objects.
 * @returns {ArrayOrObject<T>} The deep difference between prevEntity and newEntity.
 * @template T
 */
export function getDeepDifference<T extends Record<string, unknown>>(
  prevEntity: T | T[] | unknown,
  newEntity: T | T[] | unknown
): T | T[] | unknown {
  if (prevEntity === null || isEmpty(prevEntity)) {
    return newEntity;
  }
  if (newEntity === null || isEmpty(newEntity)) {
    return Array.isArray(prevEntity) ? ([] as T[]) : ({} as T);
  }

  if (Array.isArray(prevEntity) && Array.isArray(newEntity)) {
    return newEntity
      .map((item: unknown, index: number) => {
        if (!Array.isArray(item) && Object.keys(item || {}).length) {
          const diff = getDeepDifference<T>(prevEntity[index], item);
          return isEmpty(diff)
            ? null
            : isEntityWithId(item)
            ? { ...(diff as Object), ...(item?.id && { id: item.id }) }
            : diff;
        }
        return equals(prevEntity[index], item) ? null : item;
      })
      .filter(Boolean);
  }

  const allKeys = union(keys(prevEntity as T), keys(newEntity as T));

  return allKeys.reduce((diff, key) => {
    const val1 = (prevEntity as T)[key] as unknown;
    const val2 = (newEntity as T)[key] as unknown;

    if (is(Object, val1) && is(Object, val2)) {
      const nestedDiff = getDeepDifference<T>(val1, val2);
      if (!isEmpty(nestedDiff)) {
        (diff[key as keyof T] as unknown) = isEntityWithId(val2)
          ? { ...(nestedDiff as Object), ...(val2?.id && { id: val2.id }) }
          : nestedDiff;
      }
    } else if (is(Array, val1) && is(Array, val2)) {
      const arrayDiff = getDeepDifference(val1, val2);
      if ((arrayDiff as T[]).length > 0) {
        (diff[key as keyof T] as unknown) = arrayDiff;
      }
    } else if (!equals(val1, val2)) {
      (diff[key as keyof T] as unknown) = val2;
    }

    return diff;
  }, {} as T);
}
