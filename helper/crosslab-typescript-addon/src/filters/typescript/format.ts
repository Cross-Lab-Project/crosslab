/**
 * This function formats the path of an operation.
 * @param path The path of the operation.
 * @param method The method of the operation.
 * @param capitalize If true, the first letter will be capitalized.
 * @returns The formatted operation path.
 */
export function formatOperation(
    path: string,
    method: string,
    capitalize: boolean = false
) {
    const splitPath = path.replace(/\{/g, '_by_').replace(/\}/g, '').split('/')
    const formattedPath = splitPath
        .map((s) =>
            s
                .split('_')
                .map((is) => is.charAt(0).toUpperCase() + is.slice(1))
                .join('')
        )
        .join('')
    const formattedMethod = capitalize
        ? method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()
        : method.toLowerCase()
    return formattedMethod + formattedPath
}

/**
 * formats the name of an object as follows:
 * device_id -> DeviceId
 * @param name name to be formatted
 * @param capitalize determines whether the first letter should be capitalized
 * @returns formatted name
 */
export function formatName(name: string, capitalize: boolean = true) {
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

    if (!capitalize)
        return result.charAt(0).toLowerCase() + result.slice(1)
    
    return result
}

/**
 * This function formats the path of an operation to an express path.
 * @param path The path of the operation.
 * @returns A valid express path.
 */
export function formatExpressPath(path: string) {
    return path.replace(/\{(.*?)\}/g, ':$1')
}
