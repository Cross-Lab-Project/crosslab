import { Filter } from '@cross-lab-project/openapi-codegen';

import { removeReadOnly } from '../../resolve/removeReadWriteOnly';
import { ExtendedSchema } from '../../types';

export const removeReadOnlyFilter: Filter = {
  name: 'removeReadOnly',
  function: (schema: ExtendedSchema) => removeReadOnly(schema),
};
