import { ExtendedSchema } from '../../types'
import { generateTyping } from '../../typings/typing'
import { formatName } from '../format/formatName'
import { Filter } from '@cross-lab-project/openapi-codegen'

/**
 * This function defines a filter which generates the typings for all provided
 * schemas which have the property 'x-standalone' set to true.
 * @param extendedSchemas The schemas for which to generate the typings.
 * @returns The typings of the schemas.
 */
function standaloneTypings(extendedSchemas: ExtendedSchema[]) {
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
            const tdAll = generateTyping(schemas.all, {
                inline: false,
                resolveDirectly: false,
                context: standaloneSchemas,
            })
            const tdRequest = generateTyping(schemas.request, {
                inline: false,
                resolveDirectly: false,
                context: standaloneSchemas,
                schemaType: 'request',
            })
            const tdResponse = generateTyping(schemas.response, {
                inline: false,
                resolveDirectly: false,
                context: standaloneSchemas,
                schemaType: 'response',
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

export const standaloneTypingsFilter: Filter = {
    name: 'standaloneTypings',
    function: standaloneTypings,
}
