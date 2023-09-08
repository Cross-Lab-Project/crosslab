import { Filter } from '@cross-lab-project/openapi-codegen';

/**
 * This function defines a filter which attempts to return an array which only
 * contains the requested attribute as its elements.
 * @param array The array to be filtered.
 * @param attributeName The name of the attribute.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function attribute(array: any[], attributeName: string): any[] {
  return array.map(item => item[attributeName]);
}

export const attributeFilter: Filter = {
  name: 'attribute',
  function: attribute,
};
