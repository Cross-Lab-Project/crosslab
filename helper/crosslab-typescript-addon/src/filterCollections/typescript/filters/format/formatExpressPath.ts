import { Filter } from '@cross-lab-project/openapi-codegen';

/**
 * This function formats the path of an operation to an express path.
 * @param path The path of the operation.
 * @returns A valid express path.
 */
export function formatExpressPath(path: string) {
  return path.replace(/\{(.*?)\}/g, ':$1');
}

export const formatExpressPathFilter: Filter = {
  name: 'formatExpressPath',
  function: formatExpressPath,
};
