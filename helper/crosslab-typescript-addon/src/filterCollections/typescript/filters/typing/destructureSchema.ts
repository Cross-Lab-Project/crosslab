import { Filter } from '@cross-lab-project/openapi-codegen';
import { OpenAPIV3_1 } from 'openapi-types';

import { ExtendedSchema } from '../../types';
import { destructureSchema } from '../../typings/destructure';

export const destructureSchemaFilter: Filter = {
  name: 'destructureSchema',
  function: (
    schema: OpenAPIV3_1.SchemaObject,
    options?: {
      prefixTypes?: string;
      context?: ExtendedSchema[];
    },
  ) => destructureSchema(schema, options),
};
