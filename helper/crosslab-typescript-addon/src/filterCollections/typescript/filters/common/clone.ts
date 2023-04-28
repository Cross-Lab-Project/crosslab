import { Filter } from '@cross-lab-project/openapi-codegen'

/**
 * This function defines a filter that attempts to clone an object.
 * @param object The object to be cloned.
 */
function clone(object: any) {
    return JSON.parse(JSON.stringify(object))
}

export const cloneFilter: Filter = {
    name: 'clone',
    function: clone,
}
