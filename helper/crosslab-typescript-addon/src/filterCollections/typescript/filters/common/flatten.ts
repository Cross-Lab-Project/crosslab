import { Filter } from '@cross-lab-project/openapi-codegen';

/**
 * This function defines a filter which flattens an array.
 * @param array The array to be flattened.
 * @returns The flattened array.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function flatten(array: any[]): any[] {
  const newArray = [];
  for (const item of array) {
    if (Array.isArray(item)) newArray.push(...flatten(item));
    else newArray.push(item);
  }
  return newArray;
}

export const flattenFilter: Filter = {
  name: 'flatten',
  function: flatten,
};
