import { Filter } from '@cross-lab-project/openapi-codegen'

/**
 * This function formats the path of an operation.
 * @param path The path of the operation.
 * @param method The method of the operation.
 * @param capitalize If true, the first letter will be capitalized.
 * @returns The formatted operation path.
 */
export function formatOperation(path: string, method: string, capitalize = false) {
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

export const formatOperationFilter: Filter = {
    name: 'formatOperation',
    function: formatOperation,
}
