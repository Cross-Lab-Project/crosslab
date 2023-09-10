import { Filter } from '@cross-lab-project/openapi-codegen';

export const deleteFilter: Filter = {
  name: 'delete',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (object: any, key: string) => {
    delete object[key];
  },
};
