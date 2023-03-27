import { generateInvalidSchemas } from '../../schema-generation/invalidSchemas'
import { Filter } from '@cross-lab-project/openapi-codegen'

export const generateInvalidSchemasFilter: Filter = {
    name: 'generateInvalidSchemas',
    function: generateInvalidSchemas,
}
