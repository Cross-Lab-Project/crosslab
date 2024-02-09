import { Filter } from '@cross-lab-project/openapi-codegen';

/**
 * This function defines a filter which adds quotation marks to the elements of a
 * given string array.
 * @param array The string array for which to add quotation marks to its elements.
 * @returns The string array with quotation marks around its elements.
 */
function toStrings(array: string[]): string[] {
  return array.map(s => `"${s}"`);
}

export const toStringsFilter: Filter = {
  name: 'toStrings',
  function: toStrings,
};
