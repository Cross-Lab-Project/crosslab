import { Filter } from '@cross-lab-project/openapi-codegen';

/**
 * This function defines a filter which attempts to sort the given array into
 * subarrays using the provided attribute name.
 * @param array The array to be sorted.
 * @param attributeName The name of the attribute to sort the array by.
 * @returns A map containing the subarray for every value of the attribute.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sortByAttribute(array: any[], attributeName: string): { [k: string]: any[] } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sorted: { [k: string]: any[] } = {};

  for (const item of array) {
    if (!sorted[item[attributeName]]) sorted[item[attributeName]] = [];
    sorted[item[attributeName]].push(item);
  }

  delete sorted['undefined'];

  return sorted;
}

export const sortByAttributeFilter: Filter = {
  name: 'sortByAttribute',
  function: sortByAttribute,
};
