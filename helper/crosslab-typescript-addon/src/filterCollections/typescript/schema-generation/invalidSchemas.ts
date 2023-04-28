import { OpenAPIV3_1 } from 'openapi-types'

/**
 * This function attempts to generate invalid versions of a given schema by recursively removing
 * required attributes or replacing them with invalid types / formats.
 * @param schema The schema to use as a template.
 * @param prefix A prefix to generate the path to the removed property.
 * @returns A list of invalid versions of the template schema with the path of the removed property.
 */
export function generateInvalidSchemas(
    schema: OpenAPIV3_1.SchemaObject,
    prefix = 'schema'
): {
    schema: OpenAPIV3_1.SchemaObject
    path: string
    operation: 'remove' | 'change-type' | 'remove-format' | 'remove-enum' | 'negate-type'
}[] {
    const invalidSchemas: ReturnType<typeof generateInvalidSchemas> = []

    const anySchemas: OpenAPIV3_1.SchemaObject[] = [
        {
            type: 'array',
            items: {},
        },
        {
            type: 'boolean',
        },
        {
            type: 'integer',
        },
        {
            type: 'null',
        },
        {
            type: 'number',
        },
        {
            type: 'object',
        },
        {
            type: 'string',
        },
    ]

    if (schema.allOf) {
        for (const [index, subSchema] of schema.allOf.entries()) {
            const invalidSubSchemas = generateInvalidSchemas(
                subSchema,
                `${prefix}.allOf[${index}]`
            )
            invalidSchemas.push(...invalidSubSchemas)
        }
    }

    if (schema.anyOf) {
        for (const [index, subSchema] of schema.anyOf.entries()) {
            const invalidSubSchemas = generateInvalidSchemas(
                subSchema,
                `${prefix}.anyOf[${index}]`
            )
            invalidSchemas.push(...invalidSubSchemas)
        }
    }

    if (schema.oneOf) {
        for (const [index, subSchema] of schema.oneOf.entries()) {
            const invalidSubSchemas = generateInvalidSchemas(
                subSchema,
                `${prefix}.oneOf[${index}]`
            )
            invalidSchemas.push(...invalidSubSchemas)
        }
    }

    // remove format
    if (schema.format) {
        const invalidSchema = {
            ...schema,
        }
        delete invalidSchema.format

        invalidSchemas.push({
            schema: invalidSchema,
            path: `${prefix}`,
            operation: 'remove-format',
        })
    }

    // remove enum
    if (schema.enum) {
        const invalidSchema = {
            ...schema,
        }
        delete invalidSchema.enum

        invalidSchemas.push({
            schema: invalidSchema,
            path: `${prefix}`,
            operation: 'remove-enum',
        })
    }

    // change type
    if (schema.type) {
        invalidSchemas.push({
            schema: {
                anyOf: [...anySchemas.filter((s) => s.type !== schema.type)],
            },
            path: `${prefix}`,
            operation: 'change-type',
        })
    }

    invalidSchemas.push({
        schema: {
            not: schema,
        },
        path: `${prefix}`,
        operation: 'negate-type',
    })

    switch (schema.type) {
        case 'object':
            if (schema.properties) {
                // remove required properties
                if (schema.required) {
                    for (const requiredProperty of schema.required) {
                        const removedSchema = {
                            ...schema,
                            properties: {
                                ...schema.properties,
                            },
                        }
                        removedSchema.required = removedSchema.required?.filter(
                            (r) => r !== requiredProperty
                        )
                        delete removedSchema.properties![requiredProperty]

                        invalidSchemas.push({
                            schema: removedSchema,
                            path: `${prefix}.${requiredProperty}`,
                            operation: 'remove',
                        })
                    }
                }

                // recurse into properties
                for (const propertyName in schema.properties) {
                    const property = schema.properties[
                        propertyName
                    ] as OpenAPIV3_1.SchemaObject

                    const invalidPropertySchemas = generateInvalidSchemas(
                        property,
                        `${prefix}.${propertyName}`
                    )

                    for (const invalidPropertySchema of invalidPropertySchemas) {
                        const invalidSchema = {
                            ...schema,
                            properties: {
                                ...schema.properties,
                            },
                        }
                        invalidSchema.properties[propertyName] =
                            invalidPropertySchema.schema

                        if (!invalidSchema.required?.find((r) => r === propertyName)) {
                            if (!invalidSchema.required)
                                invalidSchema.required = [propertyName]
                            else invalidSchema.required.push(propertyName)
                        }

                        invalidSchemas.push({
                            ...invalidPropertySchema,
                            schema: invalidSchema,
                        })
                    }
                }
            }
            break
        case 'array': {
            const invalidItemsSchemas = generateInvalidSchemas(
                schema.items,
                `${prefix}.items`
            )
            for (const invalidItemsSchema of invalidItemsSchemas) {
                const currentSchema = schema
                invalidSchemas.push({
                    ...invalidItemsSchema,
                    schema: {
                        ...currentSchema,
                        items: invalidItemsSchema.schema,
                    },
                })
            }
            break
        }
        default:
            break
    }

    return invalidSchemas
}
