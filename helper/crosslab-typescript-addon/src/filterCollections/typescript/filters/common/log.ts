import { Filter } from '@cross-lab-project/openapi-codegen';

/**
 * This function defines a filter which filters duplicate values from an array.
 * @param input The input to be logged.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function log(input: unknown): void {
  console.log(JSON.stringify(input));
}

export const logFilter: Filter = {
  name: 'log',
  function: log,
};
