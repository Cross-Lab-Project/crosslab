import { commonFilters } from './common'
import { formatFilters } from './format'
import { generateFilters } from './generate'
import { helperFilters } from './helper'
import { resolveFilters } from './resolve'
import { typingFilters } from './typing'
import { Filter } from '@cross-lab-project/openapi-codegen'

export const filters: Filter[] = [
    ...commonFilters,
    ...formatFilters,
    ...generateFilters,
    ...helperFilters,
    ...resolveFilters,
    ...typingFilters,
]
