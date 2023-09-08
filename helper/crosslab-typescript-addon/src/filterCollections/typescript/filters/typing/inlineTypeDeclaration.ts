import { Filter } from '@cross-lab-project/openapi-codegen';
import { OpenAPIV3_1 } from 'openapi-types';

import { generateTyping } from '../../typings/typing';

/**
 * This function defines a filter which attempts to generate the inline type
 * declaration for a given schema.
 * @param schema The schema for which to generate the inline type declaration.
 * @returns The generated inline type declaration.
 */
function inlineTypeDeclaration(schema: OpenAPIV3_1.SchemaObject) {
  return generateTyping(schema, { inline: true }).typeDeclaration;
}

export const inlineTypeDeclarationFilter: Filter = {
  name: 'inlineTypeDeclaration',
  function: inlineTypeDeclaration,
};
