import { getInvalidStatusCodeFilter } from './getInvalidStatusCode'
import { getPossibleScopeCombinationsFilter } from './getPossibleScopeCombinations'
import { Filter } from '@cross-lab-project/openapi-codegen'

export const helperFilters: Filter[] = [
    getInvalidStatusCodeFilter,
    getPossibleScopeCombinationsFilter,
]
