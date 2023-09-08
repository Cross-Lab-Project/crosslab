import { Filter } from '@cross-lab-project/openapi-codegen';

/**
 * This function defines a filter which filters duplicate values from an array.
 * @param array The array to be filtered.
 * @returns The array without duplicate values.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function unique(array: any[]): any[] {
  return array.filter((v, i, s) => s.indexOf(v) === i);
}

export const uniqueFilter: Filter = {
  name: 'unique',
  function: unique,
};
