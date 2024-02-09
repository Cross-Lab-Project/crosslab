import { Filter } from '@cross-lab-project/openapi-codegen';

import { generateInvalidSchemas } from '../../schema-generation/invalidSchemas';

export const generateInvalidSchemasFilter: Filter = {
  name: 'generateInvalidSchemas',
  function: generateInvalidSchemas,
};
