import { removeReadOnlyFilter } from './removeReadOnly'
import { removeWriteOnlyFilter } from './removeWriteOnly'
import { resolveOperationsFilter } from './resolveOperations'
import { resolveSchemasFilter } from './resolveSchemas'
import { Filter } from '@cross-lab-project/openapi-codegen'

export const resolveFilters: Filter[] = [
    removeReadOnlyFilter,
    removeWriteOnlyFilter,
    resolveOperationsFilter,
    resolveSchemasFilter,
]
