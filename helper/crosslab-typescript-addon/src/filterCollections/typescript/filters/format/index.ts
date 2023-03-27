import { formatExpressPathFilter } from './formatExpressPath'
import { formatNameFilter } from './formatName'
import { formatOperationFilter } from './formatOperation'
import { prettierFilter } from './prettier'
import { Filter } from '@cross-lab-project/openapi-codegen'

export const formatFilters: Filter[] = [
    formatExpressPathFilter,
    formatNameFilter,
    formatOperationFilter,
    prettierFilter,
]
