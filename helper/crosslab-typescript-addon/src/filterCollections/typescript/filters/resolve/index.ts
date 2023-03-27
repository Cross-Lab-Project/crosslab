import { resolveOperationsFilter } from './resolveOperations'
import { resolveSchemasFilter } from './resolveSchemas'
import { Filter } from '@cross-lab-project/openapi-codegen'

export const resolveFilters: Filter[] = [resolveOperationsFilter, resolveSchemasFilter]
