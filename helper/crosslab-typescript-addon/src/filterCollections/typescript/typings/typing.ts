import { formatName } from '../filters/format/formatName'
import { ExtendedSchema } from '../types'
import { handleAllOf } from './keywords/allOf'
import { handleAnyOf } from './keywords/anyOf'
import { handleConst } from './keywords/const'
import { handleEnum } from './keywords/enum'
import { handleOneOf } from './keywords/oneOf'
import { handleArray } from './types/array'
import { handleBoolean } from './types/boolean'
import { handleInteger } from './types/integer'
import { handleNull } from './types/null'
import { handleNumber } from './types/number'
import { handleObject } from './types/object'
import { handleString } from './types/string'
import { OpenAPIV3_1 } from 'openapi-types'

export type TypingOptions = {
    prefixDirectlyResolved?: string
    inline?: boolean
    resolveDirectly?: boolean
    context?: ExtendedSchema[]
    schemaType?: 'request' | 'response' | 'all'
}

export type Typing = {
    comment?: string
    typeDeclaration: string
    typeDependencies: Array<string>
}

export function generateTyping(
    schema: OpenAPIV3_1.SchemaObject,
    options?: TypingOptions
): Typing {
    // set default values for options
    options ??= {}
    options.inline ??= false
    options.resolveDirectly ??= true
    options.context ??= []
    options.schemaType ??= 'all'
    options.prefixDirectlyResolved ??= ''

    let comment = schema.description
        ? `/**\n * ${schema.description.replace(/\n/g, '\n * ')}\n */\n`
        : ''

    const contextSchema = options.context.find(
        (contextSchema) =>
            contextSchema.title === schema.title && contextSchema['x-standalone']
    )

    // Handle subtype and different required properties
    if (options.resolveDirectly && schema.title && contextSchema) {
        return resolveSchemaDirectly(
            { ...schema, title: schema.title },
            contextSchema,
            comment,
            options
        )
    }

    // Handle allOf
    if (schema.allOf) return handleAllOf(schema, comment, options)

    // Handle anyOf
    if (schema.anyOf) return handleAnyOf(schema, comment, options)

    // Handle oneOf
    if (schema.oneOf) return handleOneOf(schema, comment, options)

    // Handle enum
    if (schema.enum) return handleEnum(schema, comment)

    // Handle const
    if (schema.const) return handleConst(schema, comment)

    // Handle the different possible types
    switch (schema.type) {
        case 'object':
            return handleObject(schema, comment, options)
        case 'array':
            return handleArray(schema, comment, options)
        case 'integer':
            return handleInteger(comment)
        case 'boolean':
            return handleBoolean(comment)
        case 'string':
            return handleString(comment)
        case 'null':
            return handleNull(comment)
        case 'number':
            return handleNumber(comment)
    }

    return {
        typeDeclaration: 'any',
        typeDependencies: [],
        comment: comment,
    }
}

function resolveSchemaDirectly(
    schema: OpenAPIV3_1.SchemaObject & { title: string },
    contextSchema: ExtendedSchema,
    comment: string,
    options: TypingOptions
) {
    // check if schema has new required properties compared to
    // contextSchema and if so add them via the Require type
    let prefix = ''
    let suffix = ''
    if (options.context) {
        if (schema.required) {
            const contextRequired = contextSchema.required ?? []
            const newRequired = schema.required.filter(
                (required) => !contextRequired.includes(required)
            )
            if (newRequired.length > 0) {
                prefix = 'Require<'
                suffix = `, ${newRequired.map((r) => `"${r}"`).join(' | ')}>`
            }
        }
    }
    return {
        typeDeclaration:
            prefix +
            options.prefixDirectlyResolved +
            formatName(schema.title) +
            (options.schemaType === 'request' ? '<"request">' : '') +
            (options.schemaType === 'response' ? '<"response">' : '') +
            suffix,
        typeDependencies: [formatName(schema.title)],
        comment: comment,
    }
}
