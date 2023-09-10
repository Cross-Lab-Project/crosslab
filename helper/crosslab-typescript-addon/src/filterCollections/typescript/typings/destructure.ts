import { OpenAPIV3_1 } from 'openapi-types';

import { formatName } from '../filters/format/formatName';
import { DestructuredSchema, ExtendedSchema } from '../types';
import { generateTyping } from './typing';

export function destructureSchema(
  schema: OpenAPIV3_1.SchemaObject,
  options?: {
    prefixDirectlyResolved?: string;
    context?: ExtendedSchema[];
  },
  first = true,
): DestructuredSchema {
  const destructuredSchema: DestructuredSchema = [];

  if (schema.type === 'array' && first) {
    destructuredSchema.push({
      name: formatName(schema.title ?? 'default', false),
      description: schema.description,
      declaration: generateTyping(schema, {
        inline: true,
        resolveDirectly: false,
        context: options?.context,
        prefixDirectlyResolved: options?.prefixDirectlyResolved,
      }).typeDeclaration,
      required: true,
      top: true,
    });
  }

  if (schema.allOf) {
    for (const s of schema.allOf as OpenAPIV3_1.SchemaObject[]) {
      destructuredSchema.push(...destructureSchema(s, options, false));
    }
  }

  if (schema.properties) {
    for (const propertyName in schema.properties) {
      const property = schema.properties[propertyName] as OpenAPIV3_1.SchemaObject;
      destructuredSchema.push({
        name: propertyName,
        description: property.description,
        declaration: generateTyping(property, {
          inline: true,
          resolveDirectly: true,
          context: options?.context,
          prefixDirectlyResolved: options?.prefixDirectlyResolved,
        }).typeDeclaration,
        required: schema.required ? schema.required.includes(propertyName) : false,
        top: false,
      });
    }
  }

  return destructuredSchema;
}
