import { formatOperation } from '../../format'
import { Filter } from '@cross-lab-project/openapi-codegen'

export const formatOperationFilter: Filter = {
    name: 'formatOperation',
    function: formatOperation,
}
