/**
 * Wraps Date.now function to testing
 */
export const dateUtils = {
  now: () => new Date(Date.now()).setHours(0, 0, 0),
};

/**
 * Gets piped functions
 *
 * @param fns Functions to include in the pipe chain
 * @returns function chain
 */
export const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T) =>
    fns.reduce((acc, fn) => fn(acc), value);

/**
 * Groups array with given key selector
 *
 * @param arr array to group
 * @param fn key selector
 * @returns grouped array
 */
export function groupBy<T>(arr: T[], fn: (item: T) => any) {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return {...prev, [groupKey]: group};
  }, {});
}

export const nonNullable = <T>(typ: any): typ is T => !!typ;
