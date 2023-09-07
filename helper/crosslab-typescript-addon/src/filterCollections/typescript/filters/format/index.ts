import { formatExpressPathFilter } from './formatExpressPath'
import { formatNameFilter } from './formatName'
import { formatOperationFilter } from './formatOperation'
import { Filter } from '@cross-lab-project/openapi-codegen'

export const formatFilters: Filter[] = [
    formatExpressPathFilter,
    formatNameFilter,
    formatOperationFilter,
]
