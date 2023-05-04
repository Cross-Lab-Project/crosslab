import { ExtendedSchema } from '../../types'
import { generateTyping } from '../../typings/typing'
import { Filter } from '@cross-lab-project/openapi-codegen'
import { OpenAPIV3_1 } from 'openapi-types'

/**
 * This function defines a filter which attempts to find the type dependencies for
 * a given schema.
 * @param schema The schema for which to find the type dependencies.
 * @returns The found type dependencies.
 */
function typeDependencies(
    schema: OpenAPIV3_1.SchemaObject,
    extendedSchemas: ExtendedSchema[] = []
) {
    return generateTyping(schema, { context: extendedSchemas }).typeDependencies
}

export const typeDependenciesFilter: Filter = {
    name: 'typeDependencies',
    function: typeDependencies,
}
