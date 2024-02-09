import { Filter } from '@cross-lab-project/openapi-codegen';

import { generateSchemasWithoutUnrequired } from '../../schema-generation/withoutUnrequired';

export const generateSchemasWithoutUnrequiredFilter: Filter = {
  name: 'generateSchemasWithoutUnrequired',
  function: generateSchemasWithoutUnrequired,
};
