import { OpenAPIV3_1 } from 'openapi-types';

/**
 * Generates versions of a given schema without one of the unrequired properties.
 * @param schema The schema for which to generate the versions.
 * @param prefix A prefix to generate the path to the removed property.
 * @returns A list of schemas with each one missing an unrequired property.
 */
export function generateSchemasWithoutUnrequired(
  schema: OpenAPIV3_1.SchemaObject,
  prefix = 'schema',
): {
  schema: OpenAPIV3_1.SchemaObject;
  path: string;
}[] {
  const schemasWithoutUnrequired: ReturnType<typeof generateSchemasWithoutUnrequired> =
    [];

  if (schema.properties) {
    for (const propertyName in schema.properties) {
      // top-level
      if (!schema.required?.find(r => r === propertyName)) {
        const schemaWithoutUnrequired = {
          ...schema,
          properties: {
            ...schema.properties,
          },
        };
        delete schemaWithoutUnrequired.properties![propertyName];

        schemasWithoutUnrequired.push({
          schema: schemaWithoutUnrequired,
          path: `${prefix}.${propertyName}`,
        });
      }

      // recurse
      const propertySchemasWithoutUnrequired = generateSchemasWithoutUnrequired(
        schema.properties[propertyName],
        `${prefix}.${propertyName}`,
      );

      for (const propertySchemaWithoutUnrequired of propertySchemasWithoutUnrequired) {
        const schemaWithoutUnrequired = {
          ...schema,
          properties: {
            ...schema.properties,
          },
        };
        schemaWithoutUnrequired.properties[propertyName] =
          propertySchemaWithoutUnrequired.schema;

        schemasWithoutUnrequired.push({
          ...propertySchemaWithoutUnrequired,
          schema: schemaWithoutUnrequired,
        });
      }
    }
  }

  return schemasWithoutUnrequired;
}
