import { OpenAPIV3_1 } from 'openapi-types'
import { formatName, formatMethodPath, formatExpressPath } from './format'
import {
    ExtendedSchema,
    resolveOperations,
    resolveSchemas,
    SimplifiedOperation,
} from './resolve'
import { schemaToTypeDeclaration } from './typings'
import { validation_filter } from './validation'
import { FilterCollection } from '@cross-lab-project/openapi-codegen'
import { format } from 'prettier'

/**
 * This function defines a filter which attempts to generate the inline type
 * declaration for a given schema.
 * @param schema The schema for which to generate the inline type declaration.
 * @returns The generated inline type declaration.
 */
function inlineTypeDeclaration_filter(schema: OpenAPIV3_1.SchemaObject) {
    return schemaToTypeDeclaration(schema, { inline: true }).typeDeclaration
}

/**
 * This function defines a filter which attempts to generate the type declaration
 * for a given schema.
 * @param schema The schema for which to generate the type declaration.
 * @returns The generated type declaration.
 */
function typeDeclaration_filter(
    schema: OpenAPIV3_1.SchemaObject,
    extendedSchemas: ExtendedSchema[] = [],
    options?: {
        prefixTypes?: string
        inline?: boolean
        resolveDirectly?: boolean
        context?: OpenAPIV3_1.SchemaObject[]
    }
) {
    return schemaToTypeDeclaration(schema, { ...options, context: extendedSchemas }).typeDeclaration
}

/**
 * This function defines a filter which attempts to find the type dependencies for
 * a given schema.
 * @param schema The schema for which to find the type dependencies.
 * @returns The found type dependencies.
 */
function typeDependencies_filter(schema: OpenAPIV3_1.SchemaObject) {
    return schemaToTypeDeclaration(schema).typeDependencies
}

/**
 * This function defines a filter which generates the typings for all provided
 * schemas which have the property 'x-standalone' set to true.
 * @param extendedSchemas The schemas for which to generate the typings.
 * @returns The typings of the schemas.
 */
function standaloneTypings_filter(extendedSchemas: ExtendedSchema[]) {
    const standaloneSchemas = extendedSchemas.filter((sd) => sd['x-standalone'])

    return (
        standaloneSchemas
            .map((schema) => {
                const name = schema.title ? formatName(schema.title) : 'MISSING_NAME'
                const td = schemaToTypeDeclaration(schema, {
                    inline: false,
                    resolveDirectly: false,
                    context: standaloneSchemas,
                })
                return `${td.comment}export type ${name} = ${td.typeDeclaration}`
            })
            .join('\n\n')
    )
}

/**
 * This function defines a filter which flattens an array.
 * @param array The array to be flattened.
 * @returns The flattened array.
 */
function flatten_filter(array: any[]): any[] {
    const newArray = []
    for (const item of array) {
        if (Array.isArray(item)) newArray.push(...flatten_filter(item))
        else newArray.push(item)
    }
    return newArray
}

/**
 * This function defines a filter which filters duplicate values from an array.
 * @param array The array to be filtered.
 * @returns The array without duplicate values.
 */
function unique_filter(array: any[]): any[] {
    return array.filter((v, i, s) => s.indexOf(v) === i)
}

/**
 * This function defines a filter which attempts to resolve the schemas of a given
 * OpenAPI document.
 * @param api The OpenAPI document for which to resolve the schemas
 * @returns
 * The resolved schemas with additional properties 'x-name', 'x-standalone'
 * and 'x-location'
 */
function resolveSchemas_filter(api: OpenAPIV3_1.Document): ExtendedSchema[] {
    return resolveSchemas(api)
}

/**
 * This function defines a filter which attempts to resolve the operations of a
 * given OpenAPI document.
 * @param api The OpenAPI document for which to resolve the operations.
 * @returns The resolved operations.
 */
function resolveOperations_filter(api: OpenAPIV3_1.Document): SimplifiedOperation[] {
    return resolveOperations(api)
}

/**
 * This function defines a filter which capitalizes the first letter of a given string.
 * @param s The string to be capitalized.
 * @returns The capitalized string.
 */
function capitalize_filter(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

/**
 * This function defines a filter which adds quotation marks to the elements of a
 * given string array.
 * @param arr The string array for which to add quotation marks to its elements.
 * @returns The string array with quotation marks around its elements.
 */
function strings_filter(arr: string[]): string[] {
    return arr.map((s) => `"${s}"`)
}

/**
 * This function defines a filter which attempts to stringify a given object.
 * @param o The object to be stringified.
 * @param indentation The indentation to be used during JSON.stringify.
 * @returns The stringified object.
 */
function stringify_filter(o: any, indentation: number = 0): string {
    return JSON.stringify(o, null, indentation)
}

/**
 * This function defines a filter which attempts to return an array which only 
 * contains the requested attribute as its elements.
 * @param arr The array to be filtered.
 * @param attributeName The name of the attribute.
 */
function attribute_filter(arr: any[], attributeName: string): any[] {
    return arr.map((o) => o[attributeName])
}

/**
 * This function defines a filter which attempts to sort the given array into
 * subarrays using the provided attribute name.
 * @param arr The array to be sorted.
 * @param attributeName The name of the attribute to sort the array by.
 * @returns A map containing the subarray for every value of the attribute.
 */
function sort_by_attribute_filter(arr: any[], attributeName: string): { 
    [k: string]: any[] 
} {
    const sorted: {
        [k: string]: any[]
    } = {}

    for (const item of arr) {
        if (!sorted[item[attributeName]])
            sorted[item[attributeName]] = []
        sorted[item[attributeName]].push(item)
    }
    
    delete sorted["undefined"]

    return sorted
}

/**
 * This function defines a filter that applies prettier to a string.
 * @param string The string to apply prettier on.
 * @returns The formatted string
 */
function prettier_filter(string: string) {
    return format(string, { parser: 'typescript', tabWidth: 4 })
}

export const TypeScriptFilterCollection: FilterCollection = {
    name: 'typescript',
    filters: [
        {
            name: 'inlineTypeDeclaration',
            function: inlineTypeDeclaration_filter,
        },
        {
            name: 'typeDeclaration',
            function: typeDeclaration_filter,
        },
        {
            name: 'resolveSchemas',
            function: resolveSchemas_filter,
        },
        {
            name: 'standaloneTypings',
            function: standaloneTypings_filter,
        },
        {
            name: 'formatMethodPath',
            function: formatMethodPath,
        },
        {
            name: 'typeDependencies',
            function: typeDependencies_filter,
        },
        {
            name: 'flatten',
            function: flatten_filter,
        },
        {
            name: 'unique',
            function: unique_filter,
        },
        {
            name: 'validation',
            function: validation_filter,
        },
        {
            name: 'cap',
            function: capitalize_filter,
        },
        {
            name: 'resolveOperations',
            function: resolveOperations_filter,
        },
        {
            name: 'expressPath',
            function: formatExpressPath,
        },
        {
            name: 'formatName',
            function: formatName,
        },
        {
            name: 'strings',
            function: strings_filter,
        },
        {
            name: 'stringify',
            function: stringify_filter,
        },
        {
            name: 'attribute',
            function: attribute_filter,
        },
        {
            name: 'sortByAttribute',
            function: sort_by_attribute_filter
        },
        {
            name: 'prettier',
            function: prettier_filter
        }
    ],
}
