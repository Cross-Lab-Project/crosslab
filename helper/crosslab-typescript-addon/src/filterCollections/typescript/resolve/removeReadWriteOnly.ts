import { ExtendedSchema } from '../types'
import { OpenAPIV3_1 } from 'openapi-types'

export function removeReadOnly(schema: ExtendedSchema): ExtendedSchema {
    const newSchema = removeReadOrWriteOnly(schema, 'readOnly')
    return {
        ...appendToRefs(newSchema, '_request'),
        'x-location': schema['x-location'],
        'x-name': schema['x-name'],
        'x-schema-type': schema['x-schema-type'],
        'x-service-name': schema['x-service-name'],
        'x-standalone': schema['x-standalone'],
    }
}

export function removeWriteOnly(schema: ExtendedSchema): ExtendedSchema {
    const newSchema = removeReadOrWriteOnly(schema, 'writeOnly')
    return {
        ...appendToRefs(newSchema, '_response'),
        'x-location': schema['x-location'],
        'x-name': schema['x-name'],
        'x-schema-type': schema['x-schema-type'],
        'x-service-name': schema['x-service-name'],
        'x-standalone': schema['x-standalone'],
    }
}

function appendToRefs(schema: OpenAPIV3_1.SchemaObject, appendString: string) {
    const stringifiedSchema = JSON.stringify(schema)
    const appendedStringifiedSchema = stringifiedSchema.replace(
        /"(\$ref":".*?)"/g,
        `"$1${appendString}"`
    )
    return JSON.parse(appendedStringifiedSchema)
}

function removeReadOrWriteOnly(
    schema: OpenAPIV3_1.SchemaObject,
    readOrWriteOnly: 'readOnly' | 'writeOnly'
): OpenAPIV3_1.SchemaObject {
    const newSchema = JSON.parse(JSON.stringify(schema)) as ExtendedSchema

    switch (newSchema.type) {
        case 'array':
            return handleArray(newSchema, readOrWriteOnly)
        case 'boolean':
            return newSchema
        case 'integer':
            return newSchema
        case 'null':
            return newSchema
        case 'number':
            return newSchema
        case 'object':
            return handleObject(newSchema, readOrWriteOnly)
        case 'string':
            return newSchema
        default:
            return handleUndefined(newSchema, readOrWriteOnly)
    }
}

function handleArray(
    schema: OpenAPIV3_1.SchemaObject,
    readOrWriteOnly: 'readOnly' | 'writeOnly'
): OpenAPIV3_1.SchemaObject {
    if (schema.type !== 'array') throw new Error("Schema is not of type 'array'")

    schema.items = removeReadOrWriteOnly(schema.items, readOrWriteOnly)

    return schema
}

function handleObject(
    schema: OpenAPIV3_1.SchemaObject,
    readOrWriteOnly: 'readOnly' | 'writeOnly'
): OpenAPIV3_1.SchemaObject {
    if (schema.type !== 'object') throw new Error("Schema is not of type 'object'")

    for (const propertyName in schema.properties) {
        if (
            (schema.properties[propertyName] as OpenAPIV3_1.SchemaObject)[readOrWriteOnly]
        ) {
            delete schema.properties[propertyName]
            if (schema.required?.includes(propertyName)) {
                schema.required = schema.required.filter((name) => name !== propertyName)
            }
        } else {
            schema.properties[propertyName] = removeReadOrWriteOnly(
                schema.properties[propertyName],
                readOrWriteOnly
            )
        }
    }

    schema.allOf = schema.allOf
        ?.map((allOfSchema) => removeReadOrWriteOnly(allOfSchema, readOrWriteOnly))
        .filter((allOfSchema) => !allOfSchema[readOrWriteOnly])

    schema.anyOf = schema.anyOf
        ?.map((anyOfSchema) => removeReadOrWriteOnly(anyOfSchema, readOrWriteOnly))
        .filter((anyOfSchema) => !anyOfSchema[readOrWriteOnly])

    schema.oneOf = schema.oneOf
        ?.map((oneOfSchema) => removeReadOrWriteOnly(oneOfSchema, readOrWriteOnly))
        .filter((oneOfSchema) => !oneOfSchema[readOrWriteOnly])

    return schema
}

function handleUndefined(
    schema: OpenAPIV3_1.SchemaObject,
    readOrWriteOnly: 'readOnly' | 'writeOnly'
): OpenAPIV3_1.SchemaObject {
    if (schema.type) throw new Error('Schema type is not undefined')

    schema.allOf = schema.allOf
        ?.map((allOfSchema) => removeReadOrWriteOnly(allOfSchema, readOrWriteOnly))
        .filter((allOfSchema) => !allOfSchema[readOrWriteOnly])

    schema.anyOf = schema.anyOf
        ?.map((anyOfSchema) => removeReadOrWriteOnly(anyOfSchema, readOrWriteOnly))
        .filter((anyOfSchema) => !anyOfSchema[readOrWriteOnly])

    schema.oneOf = schema.oneOf
        ?.map((oneOfSchema) => removeReadOrWriteOnly(oneOfSchema, readOrWriteOnly))
        .filter((oneOfSchema) => !oneOfSchema[readOrWriteOnly])

    return schema
}
