import { OpenAPIV3_1 } from 'openapi-types';

import { Typing, TypingOptions, generateTyping } from '../typing';

export function handleArray(
  schema: OpenAPIV3_1.SchemaObject,
  comment: string,
  options: TypingOptions,
): Typing {
  const td = generateTyping((schema as OpenAPIV3_1.ArraySchemaObject).items, {
    ...options,
    resolveDirectly: true,
  });

  let min = 'undefined';
  let max = 'undefined';

  if (schema.minItems) min = schema.minItems.toString();
  if (schema.maxItems) max = schema.maxItems.toString();

  if (schema.minItems && schema.maxItems && schema.minItems > schema.maxItems) {
    throw new Error('minItems needs to be smaller than maxItems!');
  }

  return {
    typeDeclaration:
      min !== 'undefined' || max !== 'undefined'
        ? `SizedTuple<${td.typeDeclaration},${min},${max}>`
        : `${td.typeDeclaration}[]`,
    typeDependencies: td.typeDependencies,
    comment: comment,
  };
}
