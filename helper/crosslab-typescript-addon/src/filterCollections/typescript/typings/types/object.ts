import { OpenAPIV3_1 } from 'openapi-types';

import { Typing, TypingOptions, generateTyping } from '../typing';

export function handleObject(
  schema: OpenAPIV3_1.SchemaObject,
  comment: string,
  options: TypingOptions,
): Typing {
  const required = schema.required ?? [];
  const properties = [];
  let dependencies: Array<string> = [];
  if (schema.properties) {
    for (const property of Object.keys(schema.properties)) {
      const td = generateTyping(schema.properties[property], options);
      properties.push(
        `${td.comment}${property}${required.includes(property) ? '' : '?'}: ${
          td.typeDeclaration
        }`,
      );
      dependencies = dependencies.concat(td.typeDependencies);
    }
  }
  if (schema.additionalProperties !== false) {
    if (
      schema.additionalProperties === true ||
      schema.additionalProperties === undefined
    ) {
      properties.push('[k: string]: unknown');
    } else {
      const td = generateTyping(schema.additionalProperties, options);
      properties.push(`${td.comment}[k: string]: ${td.typeDeclaration}`);
      dependencies = dependencies.concat(td.typeDependencies);
    }
  }
  if (options.inline)
    return {
      typeDeclaration: `{${properties.join(', ')}}`,
      typeDependencies: dependencies,
      comment: comment,
    };
  else
    return {
      typeDeclaration: `{\n\t${properties.join('\n').replace(/\n/gi, '\n\t')}\n}`,
      typeDependencies: dependencies,
      comment: comment,
    };
}
