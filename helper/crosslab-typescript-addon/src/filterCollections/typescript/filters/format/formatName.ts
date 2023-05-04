import { Filter } from '@cross-lab-project/openapi-codegen'

/**
 * formats the name of an object as follows:
 * device_id -> DeviceId
 * @param name name to be formatted
 * @param capitalize determines whether the first letter should be capitalized
 * @returns formatted name
 */
export function formatName(name: string, capitalize = true) {
    const split = name.split(/[ _-]/)
    const result = split
        .map((el) => {
            if (el.length > 1) {
                return el.charAt(0).toUpperCase() + el.slice(1)
            } else {
                return el.toUpperCase()
            }
        })
        .join('')

    if (!capitalize) return result.charAt(0).toLowerCase() + result.slice(1)

    return result
}

export const formatNameFilter: Filter = {
    name: 'formatName',
    function: formatName,
}
