import { Filter } from '@cross-lab-project/openapi-codegen'

function append(array: any[], value: any) {
    array.push(value)
}

export const appendFilter: Filter = {
    name: 'append',
    function: append,
}
