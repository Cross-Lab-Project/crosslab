import { Filter } from '@cross-lab-project/openapi-codegen';
import { OpenAPIV3_1 } from 'openapi-types';

import { ExtendedSchema } from '../../types';
import { TypingOptions, generateTyping } from '../../typings/typing';

/**
 * This function defines a filter which attempts to generate the type declaration
 * for a given schema.
 * @param schema The schema for which to generate the type declaration.
 * @returns The generated type declaration.
 */
function typeDeclaration(
  schema: OpenAPIV3_1.SchemaObject,
  extendedSchemas: ExtendedSchema[] = [],
  options?: TypingOptions,
) {
  return generateTyping(schema, { ...options, context: extendedSchemas }).typeDeclaration;
}

export const typeDeclarationFilter: Filter = {
  name: 'typeDeclaration',
  function: typeDeclaration,
};
