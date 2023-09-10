import { OpenAPIV3_1 } from 'openapi-types';

import { Typing } from '../typing';

export function handleEnum(schema: OpenAPIV3_1.SchemaObject, comment: string): Typing {
  return {
    typeDeclaration: '"' + schema.enum?.join('" | "') + '"',
    typeDependencies: [],
    comment: comment,
  };
}
