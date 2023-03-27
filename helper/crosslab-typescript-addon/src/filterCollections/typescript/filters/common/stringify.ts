import { Filter } from '@cross-lab-project/openapi-codegen'

/**
 * This function defines a filter which attempts to stringify a given object.
 * @param object The object to be stringified.
 * @param indentation The indentation to be used during JSON.stringify.
 * @returns The stringified object.
 */
function stringify(object: any, indentation: number = 0): string {
    return JSON.stringify(object, null, indentation)
}

export const stringifyFilter: Filter = {
    name: 'stringify',
    function: stringify,
}
