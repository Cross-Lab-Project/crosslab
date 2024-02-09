import { Filter } from '@cross-lab-project/openapi-codegen';

import { removeWriteOnly } from '../../resolve/removeReadWriteOnly';
import { ExtendedSchema } from '../../types';

export const removeWriteOnlyFilter: Filter = {
  name: 'removeWriteOnly',
  function: (schema: ExtendedSchema) => removeWriteOnly(schema),
};
