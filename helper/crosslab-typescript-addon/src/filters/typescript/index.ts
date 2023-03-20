import { OpenAPIV3_1 } from 'openapi-types'
import { formatName, formatOperation, formatExpressPath } from './format'
import {
    ExtendedSchema,
    generateInvalidSchemas,
    generateSchemasWithoutUnrequired,
    resolveOperations,
    resolveSchemas,
    SimplifiedOperation,
} from './resolve'
import { destructureSchema, schemaToTypeDeclaration } from './typings'
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
    return schemaToTypeDeclaration(schema, { ...options, context: extendedSchemas })
        .typeDeclaration
}

/**
 * This function defines a filter which attempts to find the type dependencies for
 * a given schema.
 * @param schema The schema for which to find the type dependencies.
 * @returns The found type dependencies.
 */
function typeDependencies_filter(
    schema: OpenAPIV3_1.SchemaObject,
    extendedSchemas: ExtendedSchema[] = []
) {
    return schemaToTypeDeclaration(schema, { context: extendedSchemas }).typeDependencies
}

/**
 * This function defines a filter which generates the typings for all provided
 * schemas which have the property 'x-standalone' set to true.
 * @param extendedSchemas The schemas for which to generate the typings.
 * @returns The typings of the schemas.
 */
function standaloneTypings_filter(extendedSchemas: ExtendedSchema[]) {
    const standaloneSchemas = extendedSchemas.filter(
        (extendedSchema) =>
            extendedSchema['x-standalone'] && extendedSchema['x-schema-type'] === 'all'
    )

    const mappedStandaloneSchemas = standaloneSchemas.map((extendedSchema) => {
        const requestSchema = extendedSchemas.find(
            (es) => es['x-location'] === extendedSchema['x-location'] + '_request'
        )
        const responseSchema = extendedSchemas.find(
            (es) => es['x-location'] === extendedSchema['x-location'] + '_response'
        )
        if (!requestSchema || !responseSchema)
            throw new Error('Could not find request-/response-schema')
        return {
            all: extendedSchema,
            request: requestSchema,
            response: responseSchema,
        }
    })

    return mappedStandaloneSchemas
        .map((schemas) => {
            const name = schemas.all.title
                ? formatName(schemas.all.title)
                : 'MISSING_NAME'
            const tdAll = schemaToTypeDeclaration(schemas.all, {
                inline: false,
                resolveDirectly: false,
                context: standaloneSchemas,
            })
            const tdRequest = schemaToTypeDeclaration(schemas.request, {
                inline: false,
                resolveDirectly: false,
                context: standaloneSchemas,
            })
            const tdResponse = schemaToTypeDeclaration(schemas.response, {
                inline: false,
                resolveDirectly: false,
                context: standaloneSchemas,
            })
            return `
                ${tdAll.comment}export type ${name}<T extends "request"|"response"|"all" = "all"> = T extends "all" 
                    ? ${tdAll.typeDeclaration}
                    : T extends "request" 
                    ? ${tdRequest.typeDeclaration}
                    : T extends "response"
                    ? ${tdResponse.typeDeclaration}
                    : never
                `
        })
        .join('\n\n')
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
 * @param api The OpenAPI document for which to resolve the schemas.
 * @param isService
 * If true the UserType schema is added and method path will be used for
 * naming. Otherwise the operationId will be used for naming.
 * @returns
 * The resolved schemas with additional properties 'x-name', 'x-standalone'
 * and 'x-location'.
 */
function resolveSchemas_filter(
    api: OpenAPIV3_1.Document,
    isService = true
): ExtendedSchema[] {
    return resolveSchemas(api, isService)
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
function stringify_filter(o: any, indentation = 0): string {
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
function sort_by_attribute_filter(
    arr: any[],
    attributeName: string
): {
    [k: string]: any[]
} {
    const sorted: {
        [k: string]: any[]
    } = {}

    for (const item of arr) {
        if (!sorted[item[attributeName]]) sorted[item[attributeName]] = []
        sorted[item[attributeName]].push(item)
    }

    delete sorted['undefined']

    return sorted
}

/**
 * This function defines a filter that applies prettier to a string.
 * @param string The string to apply prettier on.
 * @returns The formatted string
 */
function prettier_filter(string: string) {
    return format(string, { parser: 'typescript', tabWidth: 4, singleQuote: true })
}

/**
 * This function defines a filter that checks if a given string ends with the
 * provided search string.
 * @param string The string to be checked.
 * @param searchString The search string.
 * @returns True if the given string ends with the search string, else false.
 */
function endswith_filter(string: string, searchString: string) {
    return string.endsWith(searchString as string)
}

/**
 * This function defines a filter that checks if a given string starts with the
 * provided search string.
 * @param string The string to be checked.
 * @param searchString The search string.
 * @returns True if the given string ends with the search string, else false.
 */
function startswith_filter(string: string, searchString: string) {
    return string.startsWith(searchString as string)
}

/**
 * This function defines a filter that splits a given string into an array of
 * substrings divided by the provided split string.
 * @param string The string to be split.
 * @param splitString The split string.
 * @example
 * ```
 * "This is a test" | split(" ") = ["This", "is", "a", "test"]
 * ```
 * @returns The array of substrings.
 */
function split_filter(string: string, splitString: string) {
    return string.split(splitString)
}

/**
 * This function defines a filter that attempts to destructure a schema.
 * @param schema The schema to be destructured.
 * @param options.prefixTypes A prefix to be appended to property types.
 * @param options.context List of schemas used to resolve property types.
 * @returns The destructured schema
 */
function destructureSchema_filter(
    schema: OpenAPIV3_1.SchemaObject,
    options?: {
        prefixTypes?: string
        context?: OpenAPIV3_1.SchemaObject[]
    }
) {
    return destructureSchema(schema, options)
}

/**
 * This function defines a filter that attempts to delete a property of an object.
 * @param object The object from which to delete the property.
 * @param key The key of the property to be deleted.
 */
function delete_filter(object: any, key: string) {
    delete object[key]
}

/**
 * This function defines a filter that attempts to clone an object.
 * @param object The object to be cloned.
 */
function clone_filter(object: any) {
    return JSON.parse(JSON.stringify(object))
}

/**
 * This function gets an invalid status code for an operation.
 * @param operation The operation for which to get the invalid status code.
 * @returns An invalid status code for the provided operation.
 */
function getInvalidStatusCode_filter(operation: SimplifiedOperation) {
    const invalidStatusCodes: number[] = []

    for (let i = 100; i < 600; i++) {
        invalidStatusCodes.push(i)
    }

    for (const response of operation.responses ?? []) {
        if (response.status.endsWith('XX')) {
            const start = parseInt(response.status.replace(/X/g, '0'))
            for (let i = start; i < start + 100; i++) {
                const foundIndex = invalidStatusCodes.findIndex(
                    (statusCode) => statusCode === i
                )
                if (foundIndex > -1) invalidStatusCodes.splice(foundIndex, 1)
            }
        } else {
            const parsedStatusCode = parseInt(response.status)
            const foundIndex = invalidStatusCodes.findIndex(
                (statusCode) => statusCode === parsedStatusCode
            )
            if (foundIndex > -1) invalidStatusCodes.splice(foundIndex, 1)
        }
    }

    return invalidStatusCodes.length > 0 ? invalidStatusCodes[0] : undefined
}

function includes_filter(string: string, searchString: string) {
    return string.includes(searchString)
}

function addProperty_filter(obj: { [k: string]: any }, propertyName: string, value: any) {
    obj[propertyName] = value
}

function append_filter(array: any[], value: any) {
    array.push(value)
}

function getPossibleScopeCombinations(security?: OpenAPIV3_1.SecurityRequirementObject[]) {
    const possibleCombinations: [string,string][][] = []
    for (const securityRequirement of security ?? []) {
        let combinations: [string,string][][] = []
        for (const key in securityRequirement) {
            const scopes = securityRequirement[key]
            if (combinations.length === 0) {
                for (const scope of scopes) {
                    combinations.push([[key,scope]])
                }
            } else {
                for (const scope of scopes) {
                    combinations = combinations.map((comb) => [...comb,[key,scope]])
                }
            }
        }
        possibleCombinations.push(...combinations)
    }

    return possibleCombinations
}

/**
 * The filter collection for typescript.
 */
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
            function: formatOperation,
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
            function: sort_by_attribute_filter,
        },
        {
            name: 'prettier',
            function: prettier_filter,
        },
        {
            name: 'endswith',
            function: endswith_filter,
        },
        {
            name: 'destructureSchema',
            function: destructureSchema_filter,
        },
        {
            name: 'split',
            function: split_filter,
        },
        {
            name: 'startswith',
            function: startswith_filter,
        },
        {
            name: 'delete',
            function: delete_filter,
        },
        {
            name: 'clone',
            function: clone_filter,
        },
        {
            name: 'generateInvalidSchemas',
            function: generateInvalidSchemas,
        },
        {
            name: 'generateSchemasWithoutUnrequired',
            function: generateSchemasWithoutUnrequired,
        },
        {
            name: 'getInvalidStatusCode',
            function: getInvalidStatusCode_filter,
        },
        {
            name: 'includes',
            function: includes_filter
        },
        {
            name: 'addProperty',
            function: addProperty_filter
        },
        {
            name: 'append',
            function: append_filter
        },
        {
            name: 'possibleScopeCombinations',
            function: getPossibleScopeCombinations
        }
    ],
}
