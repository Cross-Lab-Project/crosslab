import { generateBasicValidationFunctionsFilter } from './generateBasicValidationFunctions'
import { generateInvalidSchemasFilter } from './generateInvalidSchemas'
import { generateSchemasWithoutUnrequiredFilter } from './generateSchemasWithoutUnrequired'
import { Filter } from '@cross-lab-project/openapi-codegen'

export const generateFilters: Filter[] = [
    generateBasicValidationFunctionsFilter,
    generateInvalidSchemasFilter,
    generateSchemasWithoutUnrequiredFilter,
]
