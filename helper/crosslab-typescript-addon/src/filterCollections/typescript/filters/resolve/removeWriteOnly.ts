import { removeWriteOnly } from '../../resolve/removeReadWriteOnly'
import { ExtendedSchema } from '../../types'
import { Filter } from '@cross-lab-project/openapi-codegen'

export const removeWriteOnlyFilter: Filter = {
    name: 'removeWriteOnly',
    function: (schema: ExtendedSchema) => removeWriteOnly(schema),
}
