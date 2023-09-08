import { OpenAPIV3_1 } from 'openapi-types';

import { Typing, TypingOptions, generateTyping } from '../typing';

export function handleAllOf(
  schema: OpenAPIV3_1.SchemaObject,
  comment: string,
  options: TypingOptions,
): Typing {
  let type = undefined;
  const typeDeclarations = [];
  let dependencies: Array<string> = [];
  for (const subschema of schema.allOf as Array<OpenAPIV3_1.SchemaObject>) {
    if (!type) type = subschema.type;
    if (type != subschema.type) throw 'Error: cannot merge types for allOf';
    const td = generateTyping(subschema, options);
    typeDeclarations.push(td.typeDeclaration);
    dependencies = dependencies.concat(td.typeDependencies);
  }
  return {
    typeDeclaration: typeDeclarations.join(' & '),
    typeDependencies: dependencies,
    comment: comment,
  };
}
