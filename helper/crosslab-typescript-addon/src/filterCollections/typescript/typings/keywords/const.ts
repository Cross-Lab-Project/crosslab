import { OpenAPIV3_1 } from 'openapi-types';

import { Typing } from '../typing';

export function handleConst(schema: OpenAPIV3_1.SchemaObject, comment: string): Typing {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof (schema as any).const === 'string')
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeDeclaration: `"${(schema as any).const}"`,
      typeDependencies: [],
      comment: comment,
    };
  else
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeDeclaration: `${(schema as any).const}`,
      typeDependencies: [],
      comment: comment,
    };
}
