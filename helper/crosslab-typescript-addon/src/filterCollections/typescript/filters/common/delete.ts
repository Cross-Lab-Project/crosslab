import { Filter } from '@cross-lab-project/openapi-codegen'

export const deleteFilter: Filter = {
    name: 'delete',
    function: (object: any, key: string) => {
        delete object[key]
    },
}
