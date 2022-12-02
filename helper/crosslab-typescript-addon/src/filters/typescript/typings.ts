import { OpenAPIV3_1 } from 'openapi-types'
import { formatName } from './format'

/**
 * Interface for the property of a destructured schema.
 */
interface DestructuredProperty {
    name: string
    declaration: string
    required: boolean
    description?: string
    top: boolean
}

/**
 * Typing for destructured schemas.
 */
type DestructuredSchema = DestructuredProperty[]

/**
 * Destructures a schema.
 * @param schema The schema to be destructured.
 * @param options.context
 * Other schemas which can be used to determine a changed required property.
 * @param options.prefixTypes
 * The prefix that should be appended to directly resolved types.
 * @returns Properties of provided schema.
 */
export function destructureSchema(
    schema: OpenAPIV3_1.SchemaObject, 
    options?: {
        prefixTypes?: string
        context?: OpenAPIV3_1.SchemaObject[]
    },
    first: boolean = true
): DestructuredSchema {
    const destructuredSchema: DestructuredSchema = []

    if (schema.type === "array" && first) {
        destructuredSchema.push({
            name: formatName(schema.title ?? "default", false),
            description: schema.description,
            declaration: schemaToTypeDeclaration(schema, {
                inline: true,
                resolveDirectly: false,
                context: options?.context,
                prefixTypes: options?.prefixTypes
            }).typeDeclaration,
            required: true,
            top: true
        })
    }

    if (schema.allOf) {
        for (const s of (schema.allOf as OpenAPIV3_1.SchemaObject[])) {
            destructuredSchema.push(...destructureSchema(s, options, false))
        }
    }

    if (schema.properties) {
        for (const propertyName in schema.properties) {
            const property = schema.properties[propertyName] as OpenAPIV3_1.SchemaObject
            destructuredSchema.push({
                name: propertyName,
                description: property.description,
                declaration: schemaToTypeDeclaration(property, {
                    inline: true,
                    resolveDirectly: true,
                    context: options?.context,
                    prefixTypes: options?.prefixTypes
                }).typeDeclaration,
                required: schema.required ? schema.required.includes(propertyName) : false,
                top: false
            })
        }
    }

    return destructuredSchema
}

/**
 * resolves the type declaration and type dependencies of a schema.
 * @param schema
 * SchemaObject for which to resolve type declaration and type dependencies.
 * @param options.inline
 * Determines if the output should be in one line.
 * @param options.resolveDirectly
 * Determines if a schema with a title should be resolved directly.
 * @param options.context
 * Other schemas which can be used to determine a changed required property.
 * @param options.prefixTypes
 * The prefix that should be appended to directly resolved types.
 * @returns comment, type declaration and type dependencies.
 */
export function schemaToTypeDeclaration(
    schema: OpenAPIV3_1.SchemaObject,
    options?: {
        prefixTypes?: string
        inline?: boolean
        resolveDirectly?: boolean
        context?: OpenAPIV3_1.SchemaObject[]
    }
): {
    comment?: string
    typeDeclaration: string
    typeDependencies: Array<string>
} {
    // set default values for options
    options = options ?? {}
    options.inline = options.inline ?? false
    options.resolveDirectly = options.resolveDirectly ?? true
    options.context = options.context ?? []

    const prefixTypes = options.prefixTypes ?? ""
    let comment = schema.description
        ? `/**\n * ${schema.description.replace(/\n/g, '')}\n */\n`
        : ''

    // Handle subtype and different required properties
    if (options.resolveDirectly && schema.title) {
        let prefix = ''
        let suffix = ''
        if (options.context) {
            if (schema.required) {
                const contextSchema = options.context.find((s) => {
                    return s.title === schema.title
                })
                const contextRequired = contextSchema?.required ?? []
                const newRequired = schema.required.filter(
                    (r) => !contextRequired.includes(r)
                )
                if (newRequired.length > 0) {
                    prefix = 'Require<'
                    suffix = `, ${newRequired.map((r) => `"${r}"`).join(' | ')}>`
                }
            }
        }
        if (options.context.find(s => s.title === schema.title && (s as any)['x-standalone'])) {
            return {
                typeDeclaration: prefix + prefixTypes + formatName(schema.title) + suffix,
                typeDependencies: [formatName(schema.title)],
                comment: comment,
            }
        }
    }

    // Handle allOf
    if (schema.allOf) {
        let type = undefined
        const typeDeclarations = []
        let dependencies: Array<string> = []
        for (const subschema of schema.allOf as Array<OpenAPIV3_1.SchemaObject>) {
            if (!type) type = subschema.type
            if (type != subschema.type) throw 'Error: cannot merge types for allOf'
            const td = schemaToTypeDeclaration(subschema, { context: options.context, prefixTypes: prefixTypes })
            typeDeclarations.push(td.typeDeclaration)
            dependencies = dependencies.concat(td.typeDependencies)
        }
        return {
            typeDeclaration: typeDeclarations.join(' & '),
            typeDependencies: dependencies,
            comment: comment,
        }
    }

    // Handle anyOf
    if (schema.anyOf) {
        const typeDeclarations = []
        let dependencies: Array<string> = []
        for (const subschema of schema.anyOf) {
            const td = schemaToTypeDeclaration(subschema, { context: options.context, prefixTypes: prefixTypes })
            typeDeclarations.push(td.typeDeclaration)
            dependencies = dependencies.concat(td.typeDependencies)
        }
        return {
            typeDeclaration: typeDeclarations.join(' | '),
            typeDependencies: dependencies,
            comment: comment,
        }
    }

    // Handle oneOf
    if (schema.oneOf) {
        const typeDeclarations = []
        let dependencies: Array<string> = []
        for (const subschema of schema.oneOf) {
            const td = schemaToTypeDeclaration(subschema, { context: options.context, prefixTypes: prefixTypes })
            typeDeclarations.push(td.typeDeclaration)
            dependencies = dependencies.concat(td.typeDependencies)
        }
        return {
            typeDeclaration: typeDeclarations.join(' | '),
            typeDependencies: dependencies,
            comment: comment,
        }
    }

    // Handle enum
    if (schema.enum) {
        return {
            typeDeclaration: '"' + schema.enum.join('" | "') + '"',
            typeDependencies: [],
            comment: comment,
        }
    }

    // Handle const
    if ((schema as any).const) {
        if (typeof (schema as any).const === 'string')
            return {
                typeDeclaration: `"${(schema as any).const}"`,
                typeDependencies: [],
                comment: comment,
            }
        else
            return {
                typeDeclaration: `${(schema as any).const}`,
                typeDependencies: [],
                comment: comment,
            }
    }

    // Handle the different possible types
    switch (schema.type) {
        case 'object':
            const required = schema.required ?? []
            const properties = []
            let dependencies: Array<string> = []
            if (schema.properties) {
                for (const property of Object.keys(schema.properties)) {
                    const td = schemaToTypeDeclaration(schema.properties[property], {
                        context: options.context,
                        prefixTypes: prefixTypes
                    })
                    properties.push(
                        `${td.comment}${property}${
                            required.includes(property) ? '' : '?'
                        }: ${td.typeDeclaration}`
                    )
                    dependencies = dependencies.concat(td.typeDependencies)
                }
            }
            if (schema.additionalProperties !== false) {
                properties.push('[k: string]: unknown')
            }
            if (options.inline)
                return {
                    typeDeclaration: `{${properties.join(', ')}}`,
                    typeDependencies: dependencies,
                    comment: comment,
                }
            else
                return {
                    typeDeclaration: `{\n\t${properties
                        .join('\n')
                        .replace(/\n/gi, '\n\t')}\n}`,
                    typeDependencies: dependencies,
                    comment: comment,
                }

        case 'array':
            const td = schemaToTypeDeclaration(
                (schema as OpenAPIV3_1.ArraySchemaObject).items,
                { context: options.context, prefixTypes: prefixTypes }
            )
            return {
                typeDeclaration: `${td.typeDeclaration}[]`,
                typeDependencies: td.typeDependencies,
                comment: comment,
            }

        case 'integer':
        case 'boolean':
        case 'string':
        case 'null':
        case 'number':
            return {
                typeDeclaration: schema.type === 'integer' ? 'number' : schema.type,
                typeDependencies: [],
                comment: comment,
            }
    }

    return {
        typeDeclaration: 'any',
        typeDependencies: [],
        comment: comment,
    }
}
