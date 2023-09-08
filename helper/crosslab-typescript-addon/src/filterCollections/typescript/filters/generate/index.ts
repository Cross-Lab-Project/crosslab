import { Filter } from '@cross-lab-project/openapi-codegen';

import { generateBasicValidationFunctionsFilter } from './generateBasicValidationFunctions';
import { generateInvalidSchemasFilter } from './generateInvalidSchemas';
import { generateSchemasWithoutUnrequiredFilter } from './generateSchemasWithoutUnrequired';

export const generateFilters: Filter[] = [
  generateBasicValidationFunctionsFilter,
  generateInvalidSchemasFilter,
  generateSchemasWithoutUnrequiredFilter,
];
