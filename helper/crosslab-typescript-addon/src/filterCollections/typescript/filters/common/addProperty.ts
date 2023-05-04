import { Filter } from '@cross-lab-project/openapi-codegen'

function addProperty(object: { [k: string]: any }, propertyName: string, value: any) {
    object[propertyName] = value
}

export const addPropertyFilter: Filter = {
    name: 'addProperty',
    function: addProperty,
}
