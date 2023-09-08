import { Filter } from '@cross-lab-project/openapi-codegen';
import { OpenAPIV3_1 } from 'openapi-types';

import { resolveOperations } from '../../resolve/resolveOperations';

export const resolveOperationsFilter: Filter = {
  name: 'resolveOperations',
  function: (api: OpenAPIV3_1.Document) => resolveOperations(api),
};
