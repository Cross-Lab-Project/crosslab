import { resolveSchemas } from '../../resolve/resolveSchemas'
import { Filter } from '@cross-lab-project/openapi-codegen'
import { OpenAPIV3_1 } from 'openapi-types'

export const resolveSchemasFilter: Filter = {
    name: 'resolveSchemas',
    function: (api: OpenAPIV3_1.Document, isService = true) =>
        resolveSchemas(api, isService),
}
