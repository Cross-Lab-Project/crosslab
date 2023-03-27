import { formatExpressPath } from '../../format'
import { Filter } from '@cross-lab-project/openapi-codegen'

export const formatExpressPathFilter: Filter = {
    name: 'formatExpressPath',
    function: formatExpressPath,
}
