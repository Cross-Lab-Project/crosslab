import { generateSchemasWithoutUnrequired } from '../../schema-generation/withoutUnrequired'
import { Filter } from '@cross-lab-project/openapi-codegen'

export const generateSchemasWithoutUnrequiredFilter: Filter = {
    name: 'generateSchemasWithoutUnrequired',
    function: generateSchemasWithoutUnrequired,
}
