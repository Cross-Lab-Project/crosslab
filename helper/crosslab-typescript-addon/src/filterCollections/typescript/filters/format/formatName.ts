import { formatName } from '../../format'
import { Filter } from '@cross-lab-project/openapi-codegen'

export const formatNameFilter: Filter = {
    name: 'formatName',
    function: formatName,
}
