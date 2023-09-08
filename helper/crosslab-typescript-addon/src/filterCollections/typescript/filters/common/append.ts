import { Filter } from '@cross-lab-project/openapi-codegen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function append(array: any[], value: any) {
  array.push(value);
}

export const appendFilter: Filter = {
  name: 'append',
  function: append,
};
