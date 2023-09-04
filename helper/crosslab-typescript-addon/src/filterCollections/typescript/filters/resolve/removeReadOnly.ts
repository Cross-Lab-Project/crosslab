import { removeReadOnly } from '../../resolve/removeReadWriteOnly'
import { ExtendedSchema } from '../../types'
import { Filter } from '@cross-lab-project/openapi-codegen'

export const removeReadOnlyFilter: Filter = {
    name: 'removeReadOnly',
    function: (schema: ExtendedSchema) => removeReadOnly(schema),
}
